# Project Structure and Cargo

## Cargo.toml Anatomy

```toml
[package]
name = "my-service"
version = "0.1.0"
edition = "2021"          # 2015, 2018, 2021, 2024
rust-version = "1.75.0"   # MSRV — cargo will refuse older toolchains
authors = ["Team <team@example.com>"]
description = "Short description"
license = "MIT"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }

[dev-dependencies]
tokio = { version = "1", features = ["test-util"] }

[build-dependencies]
tonic-build = "0.11"

[features]
default = ["json"]
json = ["serde_json"]
full = ["json", "tracing"]

[profile.release]
opt-level = 3
lto = true
strip = true
```

## Workspace Setup

```toml
# Root Cargo.toml
[workspace]
members = ["crates/*"]
resolver = "2"            # Required for edition 2021+

[workspace.package]
version = "0.1.0"
edition = "2021"

[workspace.dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
```

```toml
# crates/my-lib/Cargo.toml
[package]
name = "my-lib"
version.workspace = true
edition.workspace = true

[dependencies]
serde.workspace = true
my-other-lib = { path = "../my-other-lib" }
```

Typical layout:
```
my-project/
  Cargo.toml          # workspace root
  crates/
    api/              # bin crate — the HTTP server
    domain/           # lib crate — business logic
    db/               # lib crate — persistence
```

## Features and Conditional Compilation

```toml
[features]
default = ["json"]
json = ["dep:serde_json"]   # dep: prefix — optional dependency activation
postgres = ["sqlx/postgres"]
```

```rust
// RIGHT: conditional compilation
#[cfg(feature = "json")]
pub fn parse_json(input: &str) -> Result<Value, Error> { /* ... */ }

// RIGHT: conditional dependency import
#[cfg(feature = "postgres")]
use sqlx::PgPool;

// WRONG: feature checked at runtime — doesn't exist
// if cfg!(feature = "json") { ... }  // This compiles but is a macro, not a gate
// cfg! is fine for conditional logic, but won't remove code from binary
```

## Crate Types

| Type | `crate-type` | Use case |
|------|-------------|----------|
| Binary | `bin` | Executable (default with `src/main.rs`) |
| Library | `lib` | Rust library (default with `src/lib.rs`) |
| Proc macro | `proc-macro` | Custom derive, attribute, function-like macros |
| C dynamic lib | `cdylib` | FFI shared library (.so/.dylib/.dll) |
| C static lib | `staticlib` | FFI static library (.a/.lib) |

```toml
[lib]
crate-type = ["cdylib", "lib"]  # Multiple types allowed
```

## Build Scripts (build.rs)

Use for: code generation (protobuf, bindgen), setting env vars, native C compilation.

```rust
// build.rs
fn main() {
    // Rerun only when proto changes
    println!("cargo:rerun-if-changed=proto/service.proto");
    tonic_build::compile_protos("proto/service.proto").unwrap();
}
```

```rust
// build.rs — setting cfg flags
fn main() {
    if std::env::var("DATABASE_URL").is_ok() {
        println!("cargo:rustc-cfg=has_database");
    }
}
```

## Dependency Management

```toml
# Version requirements
serde = "1.0"              # ^1.0.0 (>=1.0.0, <2.0.0)
serde = "=1.0.193"         # Exact version
serde = ">=1.0, <1.5"      # Range

# Git dependency
my-lib = { git = "https://github.com/org/repo", branch = "main" }
my-lib = { git = "https://github.com/org/repo", rev = "abc123" }

# Path dependency (workspace-local)
my-lib = { path = "../my-lib" }

# Optional dependency
serde_json = { version = "1.0", optional = true }

# Patching a dependency workspace-wide
[patch.crates-io]
hyper = { git = "https://github.com/hyperium/hyper", branch = "fix" }
```

## cargo-edit Commands

```bash
cargo add serde --features derive      # Add dependency
cargo add tokio -F full                 # Short form
cargo add --dev mockall                 # Dev dependency
cargo add --build tonic-build           # Build dependency
cargo rm serde_json                     # Remove dependency
```

## Cargo Profiles

```toml
[profile.dev]
opt-level = 0
debug = true

[profile.release]
opt-level = 3
lto = "thin"          # "fat" for max optimization, slower build
strip = "symbols"
codegen-units = 1     # Slower build, better optimization
panic = "abort"       # Smaller binary, no unwinding

# Custom profile inheriting from release
[profile.bench-profiling]
inherits = "release"
debug = true          # Release speed + debug symbols for profiling
```

```bash
cargo build --profile bench-profiling
```

## Common Pitfalls

**Circular dependencies** -- Not allowed. Restructure with a shared `common` crate.
```
# ERROR: crate `a` depends on `b`, and `b` depends on `a`
# Fix: extract shared types into crate `common`
```

**Feature unification** -- All features are additive and unified across the dependency graph.
```toml
# WRONG mental model: "I disabled feature X in my Cargo.toml"
# If ANY crate in your tree enables a feature, it's on for ALL users

# RIGHT: design features to be purely additive, never subtractive
```

**Edition mismatches in workspace** -- Each crate can have its own edition, but mixing causes confusion.
```toml
# RIGHT: use workspace-level edition
[workspace.package]
edition = "2021"
```

**Forgetting resolver = "2"** -- Without it, features behave differently for dev-dependencies.
```toml
# WRONG (for edition 2021+ workspace)
[workspace]
members = ["crates/*"]

# RIGHT
[workspace]
members = ["crates/*"]
resolver = "2"
```
