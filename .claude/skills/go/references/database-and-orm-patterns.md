# Database & ORM Patterns in Go

## database/sql: Connection Pooling

```go
// RIGHT: configure pool settings
db, err := sql.Open("postgres", dsn)
if err != nil {
    return fmt.Errorf("open db: %w", err)
}
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(5)
db.SetConnMaxLifetime(5 * time.Minute)
db.SetConnMaxIdleTime(1 * time.Minute)

// WRONG: unbounded connections (default is unlimited open, 2 idle)
db, _ := sql.Open("postgres", dsn)
// leads to "too many connections" under load
```

`sql.Open` does NOT connect -- call `db.Ping()` or `db.PingContext()` to verify.

## Prepared Statements & sql.Named

```go
// Positional params (driver-dependent: $1 for postgres, ? for mysql)
row := db.QueryRowContext(ctx, "SELECT name FROM users WHERE id = $1", userID)

// Named parameters
rows, err := db.NamedQueryContext(ctx,
    "SELECT * FROM users WHERE age > :min_age",
    sql.Named("min_age", 18))
```

## Query Patterns & Pitfalls

```go
// RIGHT: always close rows
rows, err := db.QueryContext(ctx, "SELECT id, name FROM users")
if err != nil {
    return err
}
defer rows.Close() // MUST defer close

for rows.Next() {
    var u User
    if err := rows.Scan(&u.ID, &u.Name); err != nil {
        return err
    }
    users = append(users, u)
}
return rows.Err() // check iteration errors

// WRONG: forgetting rows.Close() -> connection leak -> pool exhaustion
// Error: "driver: bad connection" or connections hang
```

```go
// RIGHT: handle sql.ErrNoRows explicitly
err := db.QueryRowContext(ctx, "SELECT name FROM users WHERE id=$1", id).Scan(&name)
if errors.Is(err, sql.ErrNoRows) {
    return ErrNotFound
}

// WRONG: treating ErrNoRows as a server error
if err != nil {
    return fmt.Errorf("query failed: %w", err) // 500 for a missing row
}
```

## Transaction Pattern

```go
func (r *Repo) Transfer(ctx context.Context, from, to int, amount float64) error {
    tx, err := r.db.BeginTx(ctx, nil)
    if err != nil {
        return err
    }
    defer tx.Rollback() // no-op if committed

    if _, err := tx.ExecContext(ctx, "UPDATE accounts SET bal=bal-$1 WHERE id=$2", amount, from); err != nil {
        return err
    }
    if _, err := tx.ExecContext(ctx, "UPDATE accounts SET bal=bal+$1 WHERE id=$2", amount, to); err != nil {
        return err
    }
    return tx.Commit()
}
```

## sqlc: SQL-First Code Generation

```yaml
# sqlc.yaml
version: "2"
sql:
  - engine: "postgresql"
    queries: "query/"
    schema: "schema/"
    gen:
      go:
        package: "db"
        out: "internal/db"
        sql_package: "pgx/v5"
        emit_json_tags: true
```

```sql
-- query/users.sql
-- name: GetUser :one
SELECT id, name, email FROM users WHERE id = $1;

-- name: ListUsers :many
SELECT id, name, email FROM users ORDER BY name;

-- name: CreateUser :one
INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;
```

Run `sqlc generate` -- produces type-safe Go functions. No runtime reflection.

## GORM

```go
// Model definition
type User struct {
    gorm.Model           // ID, CreatedAt, UpdatedAt, DeletedAt
    Name    string       `gorm:"size:100;not null"`
    Email   string       `gorm:"uniqueIndex"`
    Orders  []Order      `gorm:"foreignKey:UserID"` // has_many
    Profile Profile      `gorm:"constraint:OnDelete:CASCADE"` // has_one
}

type Order struct {
    ID     uint
    UserID uint   // belongs_to
    User   User
    Amount float64
}
```

```go
// RIGHT: preload to avoid N+1
var users []User
db.Preload("Orders").Find(&users)

// WRONG: N+1 query problem
db.Find(&users)
for _, u := range users {
    db.Where("user_id = ?", u.ID).Find(&u.Orders) // query per user
}
```

```go
// Query scopes
func ActiveUsers(db *gorm.DB) *gorm.DB {
    return db.Where("active = ?", true)
}
db.Scopes(ActiveUsers).Find(&users)

// Hooks
func (u *User) BeforeCreate(tx *gorm.DB) error {
    u.Email = strings.ToLower(u.Email)
    return nil
}
```

**Auto-migration**: `db.AutoMigrate(&User{}, &Order{})` -- dev only, use migration tools for prod.

## pgx: PostgreSQL Native Driver

```go
// pgx advantages over lib/pq: faster, COPY support, listen/notify, pgx types
conn, err := pgxpool.New(ctx, "postgres://user:pass@localhost:5432/db")
// Use pgxpool (not single pgx.Conn) for connection pooling
```

pgx is the recommended PostgreSQL driver. lib/pq is in maintenance mode.

## Migration Tools

| Tool | Direction | Format | Notes |
|------|-----------|--------|-------|
| goose | up/down | SQL or Go | `goose -dir migrations postgres "dsn" up` |
| golang-migrate | up/down | SQL | `migrate -path db/migrations -database "dsn" up` |

```sql
-- migrations/001_create_users.sql (goose)
-- +goose Up
CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT NOT NULL);

-- +goose Down
DROP TABLE users;
```

## Repository Pattern

```go
// Define interface for testability
type UserRepository interface {
    GetByID(ctx context.Context, id int) (*User, error)
    Create(ctx context.Context, u *User) error
    List(ctx context.Context, filter UserFilter) ([]*User, error)
}

// Concrete implementation
type pgUserRepo struct {
    db *sql.DB
}

func (r *pgUserRepo) GetByID(ctx context.Context, id int) (*User, error) {
    var u User
    err := r.db.QueryRowContext(ctx,
        "SELECT id, name, email FROM users WHERE id = $1", id).
        Scan(&u.ID, &u.Name, &u.Email)
    if errors.Is(err, sql.ErrNoRows) {
        return nil, ErrNotFound
    }
    return &u, err
}
```

## Common Pitfalls Summary

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| No `rows.Close()` | Connection pool exhaustion | Always `defer rows.Close()` |
| Ignoring `sql.ErrNoRows` | 500 on missing records | `errors.Is(err, sql.ErrNoRows)` |
| No pool config | `too many connections` | Set `MaxOpenConns`, `MaxIdleConns` |
| GORM N+1 | Slow list queries | Use `Preload()` or `Joins()` |
| `sql.Open` without `Ping` | Silent connection failure | Call `db.PingContext(ctx)` after Open |
| String interpolation in SQL | SQL injection | Always use parameterized queries |
