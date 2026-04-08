---
name: es:go
description: "Go development mastery. Use for Go modules, goroutines, channels, error handling, interfaces, Gin/Echo APIs, gRPC, sqlc/GORM, Cobra CLIs, testing, benchmarks, Docker builds, linting."
license: Apache-2.0
argument-hint: "[topic or pattern]"
metadata:
  author: claudekit
  version: 1.0.0
  category: backend
  tags: [go, golang, backend, microservices, concurrency, cli]
---

# Go Development Skill

Authoritative Go knowledge graph — idiomatic patterns, common pitfalls, framework guidance. Prevents hallucination by grounding decisions in Go's philosophy: simplicity, readability, explicit error handling, composition over inheritance.

## When to Activate

- Writing or reviewing Go code
- Designing Go project structure or module layout
- Implementing concurrent systems (goroutines, channels)
- Building REST/gRPC APIs with Go frameworks
- Creating CLI tools in Go
- Debugging Go-specific errors (nil pointer, data race, deadlock)
- Optimizing Go performance or reducing allocations
- Writing or fixing Go tests and benchmarks

## Go Philosophy (Core Principles)

1. **Simplicity over cleverness** — if it needs a comment to explain, simplify it
2. **Explicit over implicit** — no hidden control flow, no magic
3. **Composition over inheritance** — embed, don't extend
4. **Errors are values** — handle them, don't panic
5. **Share memory by communicating** — channels over mutexes when possible
6. **Accept interfaces, return structs** — depend on behavior, not implementation
7. **Make the zero value useful** — `var buf bytes.Buffer` works immediately
8. **A little copying is better than a little dependency** — avoid unnecessary imports

## Quick Start

```bash
go mod init example.com/myapp    # initialize module
go mod tidy                      # sync dependencies
go build ./...                   # build all packages
go test ./... -race -cover       # test with race detection + coverage
go vet ./...                     # static analysis
```

## Standard Project Layout

```
cmd/myapp/main.go       # entry point — thin, wires dependencies
internal/               # private packages — not importable externally
  handler/              # HTTP/gRPC handlers
  service/              # business logic
  repository/           # data access
pkg/                    # public reusable packages (use sparingly)
api/                    # protobuf definitions, OpenAPI specs
```

## Framework Selection

| Need | Framework | Why |
|------|-----------|-----|
| REST API (batteries) | **Gin** | Fastest router, middleware ecosystem, validation |
| REST API (minimal) | **Echo** | Clean API, auto TLS, good docs |
| REST API (stdlib) | **net/http** + ServeMux | Zero dependencies, Go 1.22+ pattern matching |
| High-perf REST | **Fiber** | fasthttp-based, Express-like API |
| Microservices | **gRPC** | Type-safe, streaming, code generation |
| CLI tool | **Cobra** + Viper | Industry standard (kubectl, docker, gh use it) |
| TUI app | **Bubbletea** | Elm architecture, composable |

## Key Idioms Quick Reference

```go
// Error handling — ALWAYS check, NEVER ignore
if err != nil {
    return fmt.Errorf("operation failed: %w", err) // wrap with %w
}

// Interface — small, behavior-focused
type Reader interface { Read(p []byte) (n int, err error) }

// Table-driven test
tests := []struct{ name string; input int; want int }{
    {"positive", 5, 25},
    {"zero", 0, 0},
}
for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) { /* ... */ })
}

// Goroutine with context cancellation
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
defer cancel()
go func() { results <- process(ctx, data) }()

// Functional options pattern
type Option func(*Server)
func WithPort(p int) Option { return func(s *Server) { s.port = p } }
```

## Common Pitfalls (Hallucination Prevention)

- **No** `try/catch` — Go uses `if err != nil`, period
- **No** generics before Go 1.18 — check `go.mod` version
- **No** ternary operator — use `if/else`
- **No** default parameter values — use functional options or config structs
- `defer` runs at function exit, not block exit
- `range` loop variable is reused (pre-Go 1.22) — capture in closure
- `nil` slice is valid (length 0) — don't check `slice == nil` before `append`
- Goroutine leaks: always ensure goroutines can exit (context, done channel)
- `sync.Mutex` is not reentrant — never lock twice from same goroutine

## Best Practices

1. Run `gofmt` / `goimports` — non-negotiable formatting
2. Run `golangci-lint` — catches 90% of issues before review
3. Use `context.Context` as first parameter for cancellation/timeout
4. Prefer `errors.Is` / `errors.As` over string matching (Go 1.13+)
5. Use `go test -race` in CI — data races are silent bugs
6. Keep interfaces small (1-3 methods) and define them where consumed
7. Return concrete types, accept interfaces
8. Use `internal/` to prevent accidental public API exposure

## References

Load as needed for deep knowledge:

- [Project Structure & Modules](references/project-structure-and-modules.md) — go.mod, workspaces, package layout, versioning
- [Concurrency Patterns](references/concurrency-patterns.md) — goroutines, channels, select, sync, errgroup, worker pools
- [Error Handling & Interfaces](references/error-handling-and-interfaces.md) — wrapping, sentinel errors, custom types, interface design
- [Web Frameworks & HTTP](references/web-frameworks-and-http.md) — Gin, Echo, Fiber, net/http, middleware, shutdown
- [gRPC & Microservices](references/grpc-and-microservices.md) — protobuf, streaming, interceptors, service mesh
- [Database & ORM Patterns](references/database-and-orm-patterns.md) — database/sql, sqlc, GORM, migrations
- [CLI Development](references/cli-development.md) — Cobra, Viper, bubbletea, flag
- [Testing & Benchmarking](references/testing-and-benchmarking.md) — table tests, testify, httptest, pprof, coverage
- [Style & Code Quality](references/style-and-code-quality.md) — Google/Uber style, golangci-lint, naming
- [DevOps & Builds](references/devops-and-builds.md) — Docker multi-stage, cross-compile, GoReleaser

## External Resources

- Effective Go: https://go.dev/doc/effective_go
- Go Proverbs: https://go-proverbs.github.io
- Go Wiki: https://go.dev/wiki
- Go Blog: https://go.dev/blog

## Scope

This skill covers Go language mastery, idioms, and ecosystem. For technology stack selection and architecture decisions, use `ck:backend-development`. For test execution workflows, use `ck:test`. For vulnerability scanning, use `ck:security`.
