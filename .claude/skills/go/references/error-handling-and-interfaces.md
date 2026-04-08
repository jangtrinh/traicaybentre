# Go Error Handling and Interfaces

## Error Handling Philosophy

Errors are values. Handle them explicitly -- no exceptions, no try/catch.

```go
// WRONG: ignoring errors
data, _ := os.ReadFile("config.yaml")

// RIGHT: always check
data, err := os.ReadFile("config.yaml")
if err != nil {
    return fmt.Errorf("reading config: %w", err)
}
```

## Wrapping Errors with %w

```go
// Wraps the original error -- callers can unwrap it
return fmt.Errorf("loading user %d: %w", id, err)

// %v does NOT wrap -- original error is lost for Is/As checking
return fmt.Errorf("loading user %d: %v", id, err) // WRONG if you need unwrapping
```

## errors.Is and errors.As

```go
// errors.Is: check if any error in chain matches a sentinel
if errors.Is(err, sql.ErrNoRows) {
    return nil, ErrNotFound
}

// errors.As: extract a specific error type from chain
var pathErr *os.PathError
if errors.As(err, &pathErr) {
    log.Printf("failed path: %s", pathErr.Path)
}
```

```go
// WRONG: direct comparison breaks with wrapped errors
if err == sql.ErrNoRows { ... }

// RIGHT: use errors.Is which unwraps
if errors.Is(err, sql.ErrNoRows) { ... }
```

## Sentinel Errors

```go
// Define at package level; prefix with Err
var (
    ErrNotFound     = errors.New("not found")
    ErrUnauthorized = errors.New("unauthorized")
    ErrConflict     = errors.New("conflict")
)

// Usage
func GetUser(id int) (*User, error) {
    u, err := db.Find(id)
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return nil, ErrNotFound
        }
        return nil, fmt.Errorf("querying user: %w", err)
    }
    return u, nil
}
```

## Custom Error Types

```go
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation: %s - %s", e.Field, e.Message)
}

// Wrapping another error
type OpError struct {
    Op  string
    Err error
}

func (e *OpError) Error() string { return fmt.Sprintf("%s: %s", e.Op, e.Err) }
func (e *OpError) Unwrap() error { return e.Err }
```

## When to Wrap vs Return Raw

| Situation | Action |
|-----------|--------|
| Adding context (which operation failed) | Wrap with `%w` |
| Crossing package boundary | Wrap to add context |
| Returning a sentinel for callers to check | Return raw or wrap with `%w` |
| Error already has sufficient context | Return raw |
| Hiding internal implementation details | Use `%v` (no unwrap) or new sentinel |

## Error String Conventions

```go
// WRONG: capitalized, ends with punctuation
errors.New("User not found.")
fmt.Errorf("Failed to connect: %w", err)

// RIGHT: lowercase, no trailing punctuation
errors.New("user not found")
fmt.Errorf("connecting to database: %w", err)
```

Errors are often combined: `fmt.Errorf("loading config: %w", err)` produces `loading config: reading file: permission denied`. Capital letters and periods break this chain.

---

## Interface Design

### Accept Interfaces, Return Structs

```go
// WRONG: returning an interface
func NewStore() Store { return &pgStore{} }

// RIGHT: return concrete type; accept interface in consumers
func NewStore(dsn string) *PGStore { return &PGStore{dsn: dsn} }

func ProcessOrders(store OrderReader) error {
    // store is an interface -- easy to mock in tests
}
```

### Keep Interfaces Small

```go
// WRONG: large interface (hard to implement, hard to mock)
type UserService interface {
    Create(u User) error
    Update(u User) error
    Delete(id int) error
    GetByID(id int) (*User, error)
    GetByEmail(email string) (*User, error)
    ListAll() ([]User, error)
    // ... 10 more methods
}

// RIGHT: small, focused interfaces
type UserReader interface {
    GetByID(ctx context.Context, id int) (*User, error)
}

type UserWriter interface {
    Save(ctx context.Context, u *User) error
}
```

### Define Interfaces at the Consumer

```go
// WRONG: interface defined in the provider package alongside implementation
// provider/store.go
type Store interface { ... }
type pgStore struct { ... }

// RIGHT: interface defined where it's used
// handler/order.go
type OrderFetcher interface {
    GetOrder(ctx context.Context, id string) (*Order, error)
}

type Handler struct {
    orders OrderFetcher
}
```

### Implicit Satisfaction

No `implements` keyword. A type satisfies an interface if it has the right methods.

```go
type Writer interface {
    Write(p []byte) (n int, err error)
}

// bytes.Buffer satisfies io.Writer automatically
var w Writer = &bytes.Buffer{}
```

Compile-time check:
```go
var _ Writer = (*MyWriter)(nil)
```

## Type Assertions and Type Switches

```go
// Type assertion
val, ok := i.(string)
if !ok {
    // i is not a string
}

// Type switch
switch v := i.(type) {
case string:
    fmt.Println("string:", v)
case int:
    fmt.Println("int:", v)
case error:
    fmt.Println("error:", v.Error())
default:
    fmt.Printf("unexpected type: %T\n", v)
}
```

## Empty Interface (any)

```go
// any == interface{} (alias since Go 1.18)
// Avoid when possible -- loses type safety

// WRONG: using any when concrete type works
func Process(data any) { ... }

// RIGHT: use generics or specific types
func Process[T Processable](data T) { ... }
func Process(data *Order) { ... }
```

Valid uses of `any`: JSON unmarshaling, logging frameworks, reflection-heavy code.

## Common Pitfalls

### Nil Interface vs Nil Pointer in Interface

```go
type MyErr struct{}
func (e *MyErr) Error() string { return "err" }

func getErr() error {
    var e *MyErr  // nil pointer
    return e      // returns non-nil interface holding nil pointer!
}

err := getErr()
fmt.Println(err == nil) // false! Interface is (type=*MyErr, value=nil)

// RIGHT: return nil explicitly
func getErr() error {
    var e *MyErr
    if e == nil {
        return nil
    }
    return e
}
```

### Errors Should Not Be Compared by String

```go
// WRONG: fragile, breaks if message changes
if err.Error() == "not found" { ... }

// RIGHT: use sentinel or errors.Is
if errors.Is(err, ErrNotFound) { ... }
```

### Forgetting to Handle All Error Paths

```go
// WRONG: deferred close may shadow the real error
func readFile(path string) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close() // Close error ignored -- usually fine for reads

    return io.ReadAll(f)
}

// For writes, check Close error using named return:
// defer func() { if cerr := f.Close(); retErr == nil { retErr = cerr } }()
```
