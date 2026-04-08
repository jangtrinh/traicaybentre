# DevOps & Builds for Go

## Docker Multi-Stage Builds

```dockerfile
# RIGHT: multi-stage with minimal final image
FROM golang:1.23 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /app/server ./cmd/server

FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=builder /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]

# WRONG: shipping the build toolchain
FROM golang:1.23
COPY . .
RUN go build -o /server ./cmd/server
CMD ["/server"]
# Image: ~1.2GB vs ~15MB with distroless
```

### scratch vs distroless vs Alpine

| Base | Size | Has shell | TLS certs | tzdata | Use when |
|------|------|-----------|-----------|--------|----------|
| `scratch` | ~0MB | No | No | No | Pure static binary, add certs manually |
| `distroless/static` | ~2MB | No | Yes | Yes | Most Go services |
| `alpine` | ~7MB | Yes | Yes | Yes | Need shell for debugging |

## Cross-Compilation

```bash
# Build for Linux from macOS
GOOS=linux GOARCH=amd64 go build -o myapp-linux ./cmd/myapp

# Build for ARM (Raspberry Pi, AWS Graviton)
GOOS=linux GOARCH=arm64 go build -o myapp-arm64 ./cmd/myapp

# Common targets
GOOS=darwin GOARCH=arm64   # macOS Apple Silicon
GOOS=windows GOARCH=amd64  # Windows
GOOS=linux GOARCH=amd64    # Linux x86_64
```

**CGO_ENABLED=0 is critical for cross-compilation.** CGO links to C libraries on the build host -- breaks on target OS.

```bash
# WRONG: cross-compile with CGO (links host libc)
GOOS=linux go build -o server  # may fail or produce broken binary

# RIGHT: disable CGO for cross-compilation
CGO_ENABLED=0 GOOS=linux go build -o server
```

## Build Flags

```bash
# Version injection via ldflags
go build -ldflags="-X main.version=1.2.3 -X main.commit=$(git rev-parse --short HEAD) -X main.date=$(date -u +%Y-%m-%dT%H:%M:%SZ)" ./cmd/myapp

# In code
var (
    version = "dev"
    commit  = "none"
    date    = "unknown"
)

# Strip debug info + symbol table (smaller binary)
go build -ldflags="-s -w" ./cmd/myapp

# Reproducible builds
go build -trimpath ./cmd/myapp  # removes local filesystem paths from binary
```

## Binary Size Optimization

| Technique | Savings | Command |
|-----------|---------|---------|
| Strip symbols | ~30% | `-ldflags="-s -w"` |
| UPX compression | ~60-70% | `upx --best myapp` |
| `-trimpath` | Minimal | Removes paths, aids reproducibility |

```bash
# Full optimization chain
CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o myapp ./cmd/myapp
upx --best myapp  # optional, increases startup time slightly
```

## GoReleaser

```yaml
# .goreleaser.yaml
version: 2
builds:
  - main: ./cmd/myapp
    env: [CGO_ENABLED=0]
    goos: [linux, darwin, windows]
    goarch: [amd64, arm64]
    ldflags:
      - -s -w
      - -X main.version={{.Version}}
      - -X main.commit={{.Commit}}

archives:
  - format: tar.gz
    format_overrides:
      - goos: windows
        format: zip

dockers:
  - image_templates: ["ghcr.io/myorg/myapp:{{.Version}}"]
    dockerfile: Dockerfile
    build_flag_templates: ["--label=org.opencontainers.image.version={{.Version}}"]

changelog:
  sort: asc
  filters:
    exclude: ["^docs:", "^test:"]
```

```bash
goreleaser release --snapshot --clean  # test locally
goreleaser release                      # full release (needs GITHUB_TOKEN)
```

## Makefile Patterns

```makefile
.PHONY: build test lint run clean

VERSION ?= $(shell git describe --tags --always --dirty)
LDFLAGS := -s -w -X main.version=$(VERSION)

build:
	CGO_ENABLED=0 go build -trimpath -ldflags="$(LDFLAGS)" -o bin/myapp ./cmd/myapp

test:
	go test -race -cover ./...

test-integration:
	go test -race -tags=integration ./...

lint:
	golangci-lint run ./...

run: build
	./bin/myapp serve

clean:
	rm -rf bin/

docker:
	docker build -t myapp:$(VERSION) .

ci: lint test build  ## Run full CI pipeline
```

## Static vs Dynamic Linking

```bash
# Static (default when CGO_ENABLED=0)
CGO_ENABLED=0 go build -o myapp    # self-contained, works in scratch

# Dynamic (when CGO needed, e.g., SQLite)
CGO_ENABLED=1 go build -o myapp    # requires libc on target
# Use alpine as base with: apk add --no-cache libc6-compat
```

## Health Check & Graceful Shutdown

```go
// Health endpoint
mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("ok"))
})
mux.HandleFunc("/readyz", func(w http.ResponseWriter, r *http.Request) {
    if err := db.PingContext(r.Context()); err != nil {
        w.WriteHeader(http.StatusServiceUnavailable)
        return
    }
    w.WriteHeader(http.StatusOK)
})

// Graceful shutdown (SIGTERM from container runtime)
srv := &http.Server{Addr: ":8080", Handler: mux}

go func() { srv.ListenAndServe() }()

quit := make(chan os.Signal, 1)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
<-quit

ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()
srv.Shutdown(ctx) // finishes in-flight requests
```

```dockerfile
# Dockerfile health check
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD ["/myapp", "healthcheck"]  # or wget/curl if available
```

## CI Pipeline Pattern

```yaml
# GitHub Actions
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: '1.23' }
      - run: go vet ./...
      - run: golangci-lint run ./...
      - run: go test -race -coverprofile=coverage.out ./...
      - run: CGO_ENABLED=0 go build ./cmd/myapp
```

## Common Pitfalls

| Pitfall | Error/Symptom | Fix |
|---------|---------------|-----|
| CGO + cross-compile | `cannot find -lgcc` or wrong ELF class | `CGO_ENABLED=0` |
| scratch + TLS | `x509: certificate signed by unknown authority` | Copy `/etc/ssl/certs` or use distroless |
| scratch + timezones | `unknown time zone` | Copy `zoneinfo.zip` or use distroless |
| Alpine + DNS | `dial tcp: lookup host: no such host` | Add `RUN apk add --no-cache ca-certificates` |
| No SIGTERM handler | Container killed after timeout (SIGKILL) | Handle SIGTERM, shutdown gracefully |
| UPX + Go race detector | Crash at startup | Don't UPX debug/test builds |
| Missing `go.sum` in Docker | `missing go.sum entry` | Copy `go.sum` in COPY layer |
