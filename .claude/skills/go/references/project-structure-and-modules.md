# Go Project Structure and Modules

## go.mod Anatomy

```go
module github.com/company/myapp   // module path (import prefix)

go 1.22                            // minimum Go version

require (
    github.com/gin-gonic/gin v1.9.1         // direct dependency
    golang.org/x/sync v0.5.0                // direct dependency
)

require (
    github.com/bytedance/sonic v1.10.0 // indirect
)

// Override dependency (local dev or fork)
replace github.com/broken/lib => ../local-fix

// Prevent specific versions from being used
retract (
    v1.0.0 // Published accidentally
    [v1.1.0, v1.2.0] // Contains critical bug
)
```

| Directive | Purpose |
|-----------|---------|
| `module` | Declares module path; used as import prefix |
| `go` | Minimum Go toolchain version |
| `require` | Dependencies with exact versions |
| `replace` | Redirect to fork/local path |
| `exclude` | Skip specific dependency version |
| `retract` | Mark own versions as broken |

## go.sum

- Contains cryptographic hashes of dependencies
- **Always commit go.sum** -- ensures reproducible builds
- Run `go mod tidy` to clean up stale entries
- Never edit manually

## Go Workspaces (go.work)

For multi-module repos where modules reference each other locally:

```go
// go.work
go 1.22

use (
    ./api
    ./shared
    ./worker
)
```

```bash
go work init ./api ./shared ./worker
go work sync   # sync go.work.sum
```

**Do NOT commit go.work in libraries.** It's for local dev convenience only.

## Standard Project Layout

```
myapp/
  cmd/
    api/main.go          # entrypoint for API binary
    worker/main.go       # entrypoint for worker binary
  internal/
    auth/                # private: only importable within myapp
    database/
  pkg/
    httputil/            # public: importable by external projects
  go.mod
  go.sum
```

| Directory | When to Use |
|-----------|------------|
| `cmd/` | One sub-dir per binary; each has `main.go` |
| `internal/` | Code that must NOT be imported externally (enforced by Go compiler) |
| `pkg/` | Code intended for external consumption; skip if not building a library |

**Skip `pkg/` for applications** -- use `internal/` by default, expose only when needed.

## Package Naming Rules

```
// WRONG
package httpUtils       // no camelCase
package http_utils      // no underscores
package models          // no plural (use model)
package common          // too vague
package base            // meaningless

// RIGHT
package httputil        // short, lowercase, descriptive
package auth
package user
package store
```

Rules:
- Lowercase only, no underscores, no mixedCase
- Short and descriptive (one word preferred)
- Singular, not plural
- Avoid `util`, `common`, `base`, `shared` as standalone packages
- Package name should not repeat parent: `store/user` not `store/storeuser`

## internal/ Enforced Visibility

```
// File: github.com/company/myapp/internal/auth/token.go
package auth

func Validate(token string) bool { ... }
```

```go
// WRONG: External module trying to import internal package
// Error: use of internal package github.com/company/myapp/internal/auth not allowed
import "github.com/company/myapp/internal/auth"

// RIGHT: Code within github.com/company/myapp can import it
import "github.com/company/myapp/internal/auth"
```

## Semantic Import Versioning (v2+)

When releasing v2+, the module path MUST include major version:

```go
// go.mod for v2
module github.com/company/myapp/v2

// Importers use:
import "github.com/company/myapp/v2/pkg/httputil"
```

Directory strategy (preferred):
```
myapp/
  v2/
    go.mod    // module github.com/company/myapp/v2
```

Or major-branch strategy: separate `v2` branch with updated `go.mod`.

## Common Pitfalls

### Import Cycle

```
// Error: import cycle not allowed
// package a imports package b
// package b imports package a
```

**Fix:** Extract shared types into a third package, or merge the two packages.

### replace Directive in Libraries

```go
// WRONG: replace in a library's go.mod -- ignored by consumers
replace github.com/dep/lib => ../local-lib

// RIGHT: Only use replace in applications (final binaries)
// For libraries, use proper versioned dependencies
```

`replace` directives are **ignored** when your module is consumed as a dependency.

### Missing go.sum Entries

```bash
# Error: missing go.sum entry for module providing package X
# Fix:
go mod tidy

# If vendoring:
go mod vendor
```

### Accidental Dependency on Unreleased Code

```bash
# WRONG: go.mod points to pseudo-version you don't control
require github.com/other/lib v0.0.0-20240101120000-abcdef123456

# RIGHT: depend on tagged releases
require github.com/other/lib v1.2.3
```

### go mod tidy Removes Needed Dependency

This happens when no `.go` file imports the package. Ensure test files or build-tagged files reference it, or use a `tools.go` pattern:

```go
//go:build tools

package tools

import (
    _ "github.com/sqlc-dev/sqlc/cmd/sqlc"
    _ "google.golang.org/protobuf/cmd/protoc-gen-go"
)
```
