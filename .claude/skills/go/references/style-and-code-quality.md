# Style & Code Quality in Go

## gofmt / goimports -- Non-Negotiable

```bash
gofmt -w .        # formats all Go files
goimports -w .    # formats + manages imports
```

Every Go project must use `gofmt`. No debates. Configure editor to run on save.

## Naming Conventions

### General Rules

| Rule | Right | Wrong |
|------|-------|-------|
| Exported: MixedCaps | `ReadConfig` | `Read_Config`, `Readconfig` |
| Unexported: mixedCaps | `parseHeader` | `parse_header` |
| Acronyms: all caps | `HTTPClient`, `UserID` | `HttpClient`, `UserId` |
| Short receivers | `func (s *Server)` | `func (this *Server)`, `func (server *Server)` |
| Interface -er suffix | `Reader`, `Stringer` | `IReader`, `ReadInterface` |
| No stuttering | `user.Name` | `user.UserName` |
| Package: lowercase, single word | `http`, `strconv` | `httpUtils`, `str_conv` |

### Naming by Scope

```go
// Short names for short scopes
for i, v := range items { ... }
if err := doThing(); err != nil { ... }

// Descriptive names for wide scopes
var defaultTransportMaxIdleConns = 100
type DatabaseConnectionPool struct { ... }
```

## Google Go Style Guide -- Key Rules

1. **Clarity > simplicity > concision** -- prioritize in this order
2. **MixedCaps** for all names, never underscores
3. **Package names**: short, no underscores, no mixedCaps (`transport`, not `httpTransport`)
4. **Getters**: `Name()` not `GetName()` (except where ambiguous)
5. **Error strings**: lowercase, no punctuation: `fmt.Errorf("open file: %w", err)`
6. **Context first**: `func Do(ctx context.Context, ...)` always first param
7. **Return early**: reduce nesting with guard clauses

```go
// RIGHT: guard clause
func process(data []byte) error {
    if len(data) == 0 {
        return errors.New("empty data")
    }
    // main logic at top level
    return nil
}

// WRONG: deep nesting
func process(data []byte) error {
    if len(data) > 0 {
        // deeply nested main logic
        return nil
    }
    return errors.New("empty data")
}
```

## Uber Go Style Guide -- Key Rules

1. **No goroutines in init()** or package-level
2. **Prefer `sync.Mutex`** over channels for protecting state
3. **Use `errgroup`** for goroutine error handling
4. **Avoid global mutable state** -- inject dependencies
5. **Prefer `strconv` over `fmt`** for primitive conversions (faster)
6. **Enums start at iota + 1**, keep zero value as unknown/invalid

```go
// RIGHT: zero value is invalid (catches uninitialized vars)
type Status int
const (
    StatusUnknown Status = iota
    StatusActive
    StatusInactive
)

// WRONG: valid status at zero value
const (
    StatusActive Status = iota  // 0 -- same as zero value
    StatusInactive
)
```

## golangci-lint Configuration

```yaml
# .golangci.yml
run:
  timeout: 5m

linters:
  enable:
    - errcheck       # unchecked errors
    - govet          # go vet checks
    - staticcheck    # advanced static analysis
    - revive         # replacement for golint
    - gosec          # security issues
    - ineffassign    # useless assignments
    - unconvert      # unnecessary conversions
    - gocritic       # opinionated checks
    - misspell       # spelling in comments
    - prealloc       # slice preallocation hints
    - nolintlint     # bad //nolint directives

linters-settings:
  revive:
    rules:
      - name: exported
        arguments: [checkPrivateReceivers]
      - name: var-naming
  gocritic:
    enabled-tags:
      - diagnostic
      - style
      - performance

issues:
  exclude-rules:
    - path: _test\.go
      linters: [errcheck, gosec]
```

Run: `golangci-lint run ./...`

## go vet

Built-in, always run. Catches:
- Printf format mismatches
- Unreachable code
- Copying locks
- Struct tag validity
- Shadowed variables (with `shadow` analyzer)

```bash
go vet ./...
go vet -vettool=$(which shadow) ./...  # shadow analyzer
```

## Comment Conventions (godoc)

```go
// Package http provides HTTP client and server implementations.
package http

// Client is an HTTP client. It is safe for concurrent use.
//
// A nil Client is equivalent to DefaultClient.
type Client struct { ... }

// Get issues a GET request to the specified URL.
// It follows redirects, up to a maximum of 10.
//
// An error is returned if there were too many redirects
// or if there was an HTTP protocol error.
func (c *Client) Get(url string) (*Response, error) { ... }
```

Rules:
- Package comment: `// Package <name> ...`
- Exported names: `// <Name> ...` (starts with the name)
- Full sentences, end with period
- Use `//` not `/* */` for doc comments

## Code Organization

```
myproject/
  cmd/
    myapp/main.go       # entry point only
  internal/             # private packages
    server/
      server.go
      handler.go
      middleware.go
    store/
      postgres.go
      store.go          # interface
  pkg/                  # public packages (optional, many projects skip)
  go.mod
  go.sum
```

- One package per directory, one concern per package
- `internal/` prevents external import -- use for business logic
- File names: lowercase, underscore ok (`user_handler.go`)

## Common Anti-Patterns

### Stuttering

```go
// WRONG
package user
type UserService struct{}  // user.UserService

// RIGHT
package user
type Service struct{}      // user.Service
```

### Interface Pollution

```go
// WRONG: defining interface in provider package
package db
type Store interface { Get(id int) (*Item, error) }
type store struct { ... }

// RIGHT: define interface where it's consumed (accept interfaces, return structs)
package handler
type Store interface { Get(id int) (*Item, error) }
type Handler struct { store Store }
```

### Premature Abstraction

```go
// WRONG: abstracting before you have 2+ implementations
type Fetcher interface { Fetch(url string) ([]byte, error) }

// RIGHT: start concrete, extract interface when needed
type HTTPClient struct { ... }
func (c *HTTPClient) Fetch(url string) ([]byte, error) { ... }
// Later, when tests need a mock, define interface at consumption site
```

## Go Proverbs as Style Compass

| Proverb | Implication |
|---------|------------|
| Don't communicate by sharing memory; share memory by communicating | Use channels for coordination |
| A little copying is better than a little dependency | Don't import a lib for one function |
| The bigger the interface, the weaker the abstraction | Keep interfaces small (1-3 methods) |
| Make the zero value useful | `var buf bytes.Buffer` works without init |
| Errors are values | Handle them, don't just check them |
| Clear is better than clever | Readable > fancy |
