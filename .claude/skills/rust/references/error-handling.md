# Error Handling

## Result and Option Fundamentals

```rust
// Result<T, E> — operation that can fail
fn parse_port(s: &str) -> Result<u16, std::num::ParseIntError> {
    s.parse::<u16>()
}

// Option<T> — value that might not exist
fn find_user(id: u64) -> Option<User> {
    users.get(&id).cloned()
}
```

## The ? Operator

Propagates errors, calling `From::from()` to convert error types.

```rust
// RIGHT: clean propagation
fn read_config(path: &str) -> Result<Config, AppError> {
    let contents = std::fs::read_to_string(path)?;  // io::Error -> AppError via From
    let config: Config = serde_json::from_str(&contents)?;  // serde::Error -> AppError
    Ok(config)
}

// WRONG: manual matching everywhere
fn read_config(path: &str) -> Result<Config, AppError> {
    let contents = match std::fs::read_to_string(path) {
        Ok(c) => c,
        Err(e) => return Err(AppError::Io(e)),  // Unnecessary boilerplate
    };
    // ...
}
```

## thiserror — For Libraries

```rust
use thiserror::Error;

#[derive(Debug, Error)]
pub enum DbError {
    #[error("connection failed: {0}")]
    Connection(String),

    #[error("query failed: {0}")]
    Query(#[from] sqlx::Error),        // Auto From<sqlx::Error>

    #[error("record not found: {table}/{id}")]
    NotFound { table: &'static str, id: i64 },

    #[error(transparent)]              // Delegates Display to inner
    Other(#[from] anyhow::Error),
}
```

## anyhow — For Applications

```rust
use anyhow::{Context, Result, bail, ensure};

// Return type is anyhow::Result<T> = Result<T, anyhow::Error>
fn load_config(path: &str) -> Result<Config> {
    let contents = std::fs::read_to_string(path)
        .context("failed to read config file")?;         // Adds context to error chain

    let config: Config = serde_json::from_str(&contents)
        .with_context(|| format!("invalid JSON in {path}"))?;  // Lazy context

    ensure!(config.port > 0, "port must be positive, got {}", config.port);

    if config.name.is_empty() {
        bail!("config name cannot be empty");             // Early return with error
    }

    Ok(config)
}
```

## Custom Error Enum with Nested Variants

```rust
#[derive(Debug, Error)]
pub enum AppError {
    #[error("database error")]
    Db(#[from] DbError),

    #[error("authentication failed: {reason}")]
    Auth { reason: String },

    #[error("validation error: {0}")]
    Validation(String),
}

// Converts: DbError -> AppError automatically via ?
// Converts: sqlx::Error -> DbError -> AppError (chained From)
```

## Error Conversion Chains

```rust
// Manual From implementation when thiserror #[from] isn't enough
impl From<std::io::Error> for AppError {
    fn from(err: std::io::Error) -> Self {
        match err.kind() {
            std::io::ErrorKind::NotFound => AppError::Validation("file not found".into()),
            _ => AppError::Db(DbError::Connection(err.to_string())),
        }
    }
}
```

## When to Use Which

| Approach | Use when | Tradeoffs |
|----------|----------|-----------|
| `thiserror` | Library crate, public API | Structured types, good for matching |
| `anyhow` | Application/binary crate | Easy context chaining, can't match variants |
| `std` only | Minimal deps, simple errors | More boilerplate, no derive |
| `Box<dyn Error>` | Prototyping | Loses type info, hard to handle specifically |

## Option Methods

```rust
let maybe: Option<i32> = Some(42);

// Transform
maybe.map(|v| v * 2)                     // Some(84)
maybe.and_then(|v| if v > 0 { Some(v) } else { None })  // Some(42)

// Provide defaults
maybe.unwrap_or(0)                        // 42 (or 0 if None)
maybe.unwrap_or_else(|| expensive_default())

// Convert to Result
maybe.ok_or(AppError::NotFound)?          // Ok(42) or Err(AppError::NotFound)
maybe.ok_or_else(|| AppError::NotFound)?  // Lazy error construction

// Filter
maybe.filter(|v| *v > 100)               // None
```

## Result Methods

```rust
let res: Result<i32, String> = Ok(42);

// Transform value
res.map(|v| v * 2)                        // Ok(84)
res.and_then(|v| validate(v))             // Chains fallible ops

// Transform error
res.map_err(|e| AppError::Validation(e))  // Convert error type

// Provide defaults
res.unwrap_or(0)
res.unwrap_or_else(|_| default_value())
```

## When Panic is Acceptable

```rust
// Tests — unwrap freely
#[test]
fn test_parse() {
    let result = parse("valid").unwrap();
    assert_eq!(result, expected);
}

// Setup/initialization — truly unrecoverable
fn main() {
    let config = Config::load().expect("FATAL: cannot load config");
    // App cannot function without config
}

// Known-valid data — document the invariant
let addr: SocketAddr = "127.0.0.1:8080".parse().expect("valid literal");

// WRONG: unwrap in library/handler code
fn handle_request(req: Request) -> Response {
    let body = req.body().unwrap();  // Crash on bad input!
}
```

## Common Pitfalls

### .unwrap() in Production

```rust
// WRONG: server crashes on bad input
let id: u64 = params.get("id").unwrap().parse().unwrap();

// RIGHT: propagate errors
let id: u64 = params.get("id")
    .ok_or(AppError::Validation("missing id".into()))?
    .parse()
    .map_err(|_| AppError::Validation("invalid id".into()))?;
```

### Stringly-Typed Errors

```rust
// WRONG: callers can't match on error types
fn connect() -> Result<Conn, String> {
    Err("connection refused".to_string())
}

// RIGHT: structured error types
fn connect() -> Result<Conn, DbError> {
    Err(DbError::Connection("connection refused".into()))
}
```

### Losing Error Context

```rust
// WRONG: original error discarded
let data = fs::read_to_string(path)
    .map_err(|_| AppError::Generic("failed to read"))?;

// RIGHT: preserve the cause chain
let data = fs::read_to_string(path)
    .map_err(|e| AppError::Io { source: e, path: path.into() })?;
// Or with anyhow:
let data = fs::read_to_string(path)
    .context("failed to read config")?;
```

### Box<dyn Error> Limitations

```rust
// Problem: can't match on concrete error type easily
fn handle(err: Box<dyn std::error::Error>) {
    // Have to downcast, fragile
    if let Some(io_err) = err.downcast_ref::<std::io::Error>() { /* ... */ }
}

// Prefer: thiserror enum in libraries, anyhow in apps
```

### Mixing thiserror and anyhow

```rust
// RIGHT pattern: thiserror at boundaries, anyhow internally
// lib/errors.rs
#[derive(Debug, Error)]
pub enum ApiError { /* thiserror variants */ }

// handlers — use anyhow internally, convert at boundary
async fn handler() -> Result<Response, ApiError> {
    let result = internal_logic().map_err(|e| ApiError::Internal(e.to_string()))?;
    Ok(result.into())
}
```
