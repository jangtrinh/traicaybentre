# Testing & Benchmarking in Go

## Testing Basics

```go
func TestAdd(t *testing.T) {
    got := Add(2, 3)
    if got != 5 {
        t.Errorf("Add(2,3) = %d, want 5", got)
    }
}

// t.Helper marks function as helper -- errors report caller's line
func assertEqual(t *testing.T, got, want int) {
    t.Helper()
    if got != want {
        t.Errorf("got %d, want %d", got, want)
    }
}

// t.Cleanup runs after test completes (even on failure)
func TestWithDB(t *testing.T) {
    db := setupTestDB(t)
    t.Cleanup(func() { db.Close() })
    // test logic
}
```

## Table-Driven Tests (Canonical Form)

```go
func TestParseSize(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        want    int64
        wantErr bool
    }{
        {name: "bytes", input: "100B", want: 100},
        {name: "kilobytes", input: "2KB", want: 2048},
        {name: "empty", input: "", wantErr: true},
        {name: "invalid", input: "abc", wantErr: true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := ParseSize(tt.input)
            if (err != nil) != tt.wantErr {
                t.Fatalf("error = %v, wantErr %v", err, tt.wantErr)
            }
            if got != tt.want {
                t.Errorf("ParseSize(%q) = %d, want %d", tt.input, got, tt.want)
            }
        })
    }
}
```

## testify: assert, require, suite, mock

```go
import (
    "github.com/stretchr/testify/assert"   // non-fatal assertions
    "github.com/stretchr/testify/require"   // fatal assertions (stops test)
)

func TestUser(t *testing.T) {
    user, err := GetUser(1)
    require.NoError(t, err)          // fatal if err != nil (no point continuing)
    assert.Equal(t, "Alice", user.Name) // non-fatal, test continues
    assert.NotEmpty(t, user.Email)
    assert.Len(t, user.Roles, 2)
    assert.Contains(t, user.Roles, "admin")
}
```

**When to use which**: `require` for preconditions (setup, nil checks). `assert` for actual assertions.

```go
// Mock with testify
type MockStore struct { mock.Mock }

func (m *MockStore) GetUser(id int) (*User, error) {
    args := m.Called(id)
    return args.Get(0).(*User), args.Error(1)
}

func TestHandler(t *testing.T) {
    store := new(MockStore)
    store.On("GetUser", 1).Return(&User{Name: "Alice"}, nil)

    h := NewHandler(store)
    // test h...

    store.AssertExpectations(t)
}
```

## httptest: Testing HTTP Handlers

```go
// Test a handler directly (no server needed)
func TestHealthHandler(t *testing.T) {
    req := httptest.NewRequest("GET", "/health", nil)
    w := httptest.NewRecorder()

    HealthHandler(w, req)

    resp := w.Result()
    assert.Equal(t, 200, resp.StatusCode)

    body, _ := io.ReadAll(resp.Body)
    assert.JSONEq(t, `{"status":"ok"}`, string(body))
}

// Test with a full server (integration)
func TestAPI(t *testing.T) {
    srv := httptest.NewServer(NewRouter())
    defer srv.Close()

    resp, err := http.Get(srv.URL + "/api/users")
    require.NoError(t, err)
    defer resp.Body.Close()
    assert.Equal(t, 200, resp.StatusCode)
}
```

## Testing with Interfaces (DI)

```go
// RIGHT: depend on interface, inject in tests
type EmailSender interface {
    Send(to, subject, body string) error
}

type Service struct { mailer EmailSender }

// In tests: use a fake
type fakeMailer struct { sent []string }
func (f *fakeMailer) Send(to, subject, body string) error {
    f.sent = append(f.sent, to)
    return nil
}

func TestService(t *testing.T) {
    mailer := &fakeMailer{}
    svc := Service{mailer: mailer}
    svc.Register("alice@example.com")
    assert.Equal(t, []string{"alice@example.com"}, mailer.sent)
}
```

## Test Fixtures & Golden Files

```go
// Fixtures: testdata/ directory (ignored by go build)
func TestParse(t *testing.T) {
    input, err := os.ReadFile("testdata/input.json")
    require.NoError(t, err)

    got, err := Parse(input)
    require.NoError(t, err)

    // Golden file: update with -update flag
    golden := "testdata/expected.golden"
    if *update {
        os.WriteFile(golden, []byte(got), 0644)
    }
    want, _ := os.ReadFile(golden)
    assert.Equal(t, string(want), got)
}

var update = flag.Bool("update", false, "update golden files")
```

## testcontainers-go: Integration Tests

```go
func TestPostgres(t *testing.T) {
    if testing.Short() { t.Skip("skipping integration test") }

    ctx := context.Background()
    pg, err := postgres.Run(ctx, "postgres:16",
        postgres.WithDatabase("testdb"),
        postgres.WithUsername("test"),
        postgres.WithPassword("test"),
        testcontainers.WithWaitStrategy(
            wait.ForLog("ready to accept connections").WithOccurrence(2)),
    )
    require.NoError(t, err)
    t.Cleanup(func() { pg.Terminate(ctx) })

    connStr, _ := pg.ConnectionString(ctx, "sslmode=disable")
    db, err := sql.Open("postgres", connStr)
    require.NoError(t, err)
    // run tests against real postgres
}
```

## Build Tags for Integration Tests

```go
//go:build integration

package myapp_test
// Only runs with: go test -tags=integration ./...
```

## Benchmarks

```go
func BenchmarkEncode(b *testing.B) {
    data := loadTestData()
    b.ResetTimer()       // exclude setup time
    b.ReportAllocs()     // report allocations

    for b.Loop() {       // Go 1.24+; use i := 0; i < b.N; i++ for older
        Encode(data)
    }
}

// Sub-benchmarks
func BenchmarkHash(b *testing.B) {
    sizes := []int{64, 256, 1024, 4096}
    for _, size := range sizes {
        b.Run(fmt.Sprintf("size=%d", size), func(b *testing.B) {
            data := make([]byte, size)
            b.ResetTimer()
            for b.Loop() {
                sha256.Sum256(data)
            }
        })
    }
}
```

Run: `go test -bench=. -benchmem ./...`

## Profiling with pprof

```bash
# CPU profile
go test -cpuprofile=cpu.prof -bench=BenchmarkEncode ./...
go tool pprof cpu.prof    # then: top, list FuncName, web

# Memory profile
go test -memprofile=mem.prof -bench=. ./...

# In running server (import _ "net/http/pprof")
go tool pprof http://localhost:6060/debug/pprof/heap
go tool pprof http://localhost:6060/debug/pprof/goroutine
```

Profile types: `cpu`, `heap`, `goroutine`, `block`, `mutex`.

## Coverage

```bash
go test -cover ./...                           # summary
go test -coverprofile=coverage.out ./...       # detailed
go tool cover -html=coverage.out -o cover.html # visual report
go tool cover -func=coverage.out               # per-function
```

## Common Pitfalls

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Shared state between tests | Flaky, order-dependent | Use `t.Parallel()` + isolated state |
| `time.Now()` in code | Non-deterministic tests | Inject a clock interface |
| Race conditions | `-race` failures | Run `go test -race ./...` in CI |
| No `t.Parallel()` | Slow test suite | Add where tests are independent |
| Test file in wrong package | Can't test unexported | `package foo` for whitebox, `package foo_test` for blackbox |
| Large `TestMain` setup | All tests fail together | Use `t.Cleanup` per-test instead |
