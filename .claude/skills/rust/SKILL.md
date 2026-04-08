---
name: es:rust
description: "Rust development mastery. Use for Cargo, ownership/borrowing, lifetimes, Result/Option, async/tokio, Axum/Actix web, SQLx/SeaORM, Clap CLIs, testing, FFI, WebAssembly, macros, traits."
license: Apache-2.0
argument-hint: "[topic or pattern]"
metadata:
  author: claudekit
  version: 1.0.0
  category: backend
  tags: [rust, systems, performance, safety, wasm, async]
---

# Rust Development Skill

Authoritative Rust knowledge graph — ownership model, idiomatic patterns, ecosystem guidance. Prevents hallucination by grounding decisions in Rust's philosophy: zero-cost abstractions, fearless concurrency, memory safety without garbage collection.

## When to Activate

- Writing or reviewing Rust code
- Debugging borrow checker / lifetime errors
- Designing Rust project structure or Cargo workspace
- Implementing async systems with tokio
- Building web services with Axum/Actix
- Creating CLI tools with Clap
- Working with unsafe code, FFI, or WebAssembly
- Optimizing Rust performance or binary size
- Designing error handling strategy (thiserror vs anyhow)
- Writing or fixing Rust tests

## Rust Philosophy (Core Principles)

1. **Zero-cost abstractions** — high-level code compiles to optimal machine code
2. **Ownership is the law** — every value has exactly one owner; when owner goes out of scope, value is dropped
3. **Borrowing over cloning** — prefer `&T` and `&mut T` over `.clone()`
4. **Make illegal states unrepresentable** — use enums and the type system to prevent bugs at compile time
5. **Errors are types, not exceptions** — `Result<T, E>` for recoverable, `panic!` only for unrecoverable
6. **Fearless concurrency** — ownership + type system prevent data races at compile time
7. **Explicit over implicit** — no implicit conversions, no null, no exceptions
8. **If it compiles, it's probably correct** — lean on the compiler, not runtime checks
9. **Prefer `&str` over `String`** in function parameters — accept borrowed, return owned

## Quick Start

```bash
cargo new myapp                  # create binary project
cargo new mylib --lib            # create library
cargo build --release            # optimized build
cargo test                       # run all tests
cargo clippy -- -W clippy::pedantic  # strict linting
cargo fmt                        # format code
```

## Project Layout

```
Cargo.toml              # manifest — dependencies, features, metadata
src/
  main.rs               # binary entry point
  lib.rs                # library root (pub modules)
  error.rs              # custom error types
  config.rs             # configuration
tests/                  # integration tests (separate compilation)
benches/                # benchmarks (cargo bench)
examples/               # runnable examples (cargo run --example)
```

## Framework Selection

| Need | Framework | Why |
|------|-----------|-----|
| Web API (modern) | **Axum** | Tower-based, extractors, best async ergonomics |
| Web API (max perf) | **Actix-web** | Fastest benchmarks, actor model |
| Web API (ergonomic) | **Rocket** | Macro-based, auto validation, good DX |
| Async runtime | **Tokio** | Industry standard, multi-threaded, io_uring |
| CLI tool | **Clap** (derive) | Type-safe args, completions, derive macro |
| Serialization | **Serde** | Zero-overhead, derive-based, universal |
| Database (async) | **SQLx** | Compile-time checked queries, no ORM overhead |
| Database (ORM) | **SeaORM** | Active record, async, migrations |
| Error (libraries) | **thiserror** | Derive Error impls, zero runtime cost |
| Error (applications) | **anyhow** | Dynamic errors, context chaining |

## Ownership Quick Reference

```rust
let s1 = String::from("hello");
let s2 = s1;              // MOVE — s1 is invalid now
let s3 = s2.clone();      // CLONE — explicit deep copy
let r1 = &s3;             // BORROW (shared) — read only
let r2 = &mut s3;         // BORROW (exclusive) — read + write
// Rule: many &T OR one &mut T, never both simultaneously
```

**Decision:** Use `&T` by default → `&mut T` if mutation needed → `T` (move) if ownership transfer needed → `.clone()` as last resort.

## Error Handling Quick Reference

```rust
// Library code — use thiserror for typed errors
#[derive(Debug, thiserror::Error)]
enum AppError {
    #[error("database error: {0}")]
    Db(#[from] sqlx::Error),
    #[error("not found: {0}")]
    NotFound(String),
}

// Application code — use anyhow for convenience
fn main() -> anyhow::Result<()> {
    let config = load_config().context("failed to load config")?;
    Ok(())
}

// The ? operator — propagate errors, never .unwrap() in production
let file = File::open(path)?;
```

## Common Pitfalls (Hallucination Prevention)

- **No** garbage collector — ownership + RAII handles memory
- **No** null — use `Option<T>` instead
- **No** exceptions — use `Result<T, E>` with `?`
- **No** inheritance — use traits + composition
- **Never** `.unwrap()` or `.expect()` in production code — handle the error
- `String` vs `&str`: `String` is owned heap data, `&str` is a borrowed slice
- `Vec<T>` vs `&[T]`: accept `&[T]` in params, return `Vec<T>`
- `async fn` requires a runtime (tokio/async-std) — it won't run without one
- `Send + Sync` bounds matter for async — not all types are thread-safe
- Lifetimes don't change how long data lives — they describe existing relationships
- `Box<dyn Trait>` has dynamic dispatch overhead — prefer generics for hot paths

## Best Practices

1. Run `cargo clippy -- -W clippy::pedantic` — catches subtle issues
2. Run `cargo fmt` — non-negotiable formatting
3. Use `#[must_use]` on functions where ignoring return value is a bug
4. Prefer `impl Trait` over `Box<dyn Trait>` when possible
5. Use `#[non_exhaustive]` on public enums for forward compatibility
6. Implement `Display` + `Error` for all error types (or derive with thiserror)
7. Use `cargo test` in CI with `--no-fail-fast` to see all failures
8. Prefer `&str` / `&[T]` in function parameters, owned types in return
9. Use `Arc<T>` for shared ownership across threads, `Rc<T>` for single-threaded
10. Keep `unsafe` blocks minimal and document safety invariants

## References

Load as needed for deep knowledge:

- [Project Structure & Cargo](references/project-structure-and-cargo.md) — Cargo.toml, workspaces, features, build scripts
- [Ownership, Borrowing & Lifetimes](references/ownership-borrowing-lifetimes.md) — move semantics, borrow rules, interior mutability, Cow
- [Error Handling](references/error-handling.md) — Result/Option, thiserror, anyhow, error propagation patterns
- [Async Programming](references/async-programming.md) — tokio, async/await, spawn, select!, channels, Pin
- [Web Frameworks](references/web-frameworks.md) — Axum, Actix-web, Rocket, tower middleware
- [Database Patterns](references/database-patterns.md) — SQLx, SeaORM, Diesel, migrations, repositories
- [CLI Development](references/cli-development.md) — Clap v4, dialoguer, indicatif, config
- [Testing](references/testing.md) — unit/integration/doc tests, proptest, mockall, nextest
- [Macros & Traits](references/macros-and-traits.md) — derive/proc macros, trait objects, generics, common traits
- [Systems Programming & FFI](references/systems-and-ffi.md) — extern "C", unsafe, bindgen, cross-compilation
- [API Design Checklist](references/api-design-checklist.md) — naming, interop, docs, type safety (from official guidelines)

## External Resources

- The Rust Book: https://doc.rust-lang.org/book/
- Rust by Example: https://doc.rust-lang.org/rust-by-example/
- Rust API Guidelines: https://rust-lang.github.io/api-guidelines/
- cheats.rs: https://cheats.rs

## Scope

This skill covers Rust language mastery, idioms, and ecosystem. For technology stack selection and architecture decisions, use `ck:backend-development`. For test execution workflows, use `ck:test`. For vulnerability scanning, use `ck:security`.
