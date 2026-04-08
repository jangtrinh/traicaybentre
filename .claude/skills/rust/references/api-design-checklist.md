# Rust API Design Checklist

Based on the [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/).

## Naming Conventions (C-CASE)

| Item | Convention | Example |
|------|-----------|---------|
| Types, Traits | PascalCase | `HttpRequest`, `IntoIterator` |
| Functions, Methods | snake_case | `read_to_string`, `is_empty` |
| Constants, Statics | SCREAMING_SNAKE | `MAX_RETRIES`, `DEFAULT_PORT` |
| Modules, Crates | snake_case | `std::collections` |
| Type params | Single uppercase or short PascalCase | `T`, `K`, `Item` |
| Lifetimes | Short lowercase | `'a`, `'de` |

### Method Name Conventions (C-CONV)

| Prefix | Meaning | Signature pattern |
|--------|---------|-------------------|
| `as_` | Cheap ref-to-ref conversion | `&self -> &T` |
| `to_` | Expensive conversion | `&self -> T` |
| `into_` | Consuming conversion | `self -> T` |
| `is_` / `has_` | Boolean query | `&self -> bool` |
| `with_` | Builder-style setter | `self, T -> Self` |
| `try_` | Fallible variant | returns `Result` |

```rust
// RIGHT
impl Url {
    fn as_str(&self) -> &str { &self.inner }
    fn to_string(&self) -> String { self.inner.clone() }  // expensive
    fn into_string(self) -> String { self.inner }          // consumes
}

// WRONG
impl Url {
    fn get_string(&self) -> String { }  // "get_" not idiomatic Rust
    fn convert(self) -> String { }      // no prefix, unclear semantics
}
```

### Iterator Naming (C-ITER)

| Method | Returns |
|--------|---------|
| `iter()` | `Iterator<Item = &T>` |
| `iter_mut()` | `Iterator<Item = &mut T>` |
| `into_iter()` | `Iterator<Item = T>` (consuming) |

## Interoperability -- Standard Trait Implementations

Every public type should implement where applicable:

```rust
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct UserId(u64);

// Display for user-facing output
impl fmt::Display for UserId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "user-{}", self.0)
    }
}

// Default when a sensible zero value exists
impl Default for Config {
    fn default() -> Self { Self { timeout: Duration::from_secs(30), retries: 3 } }
}

// From for conversions (gives Into for free)
impl From<u64> for UserId {
    fn from(val: u64) -> Self { Self(val) }
}

// Serialize/Deserialize for data types
#[derive(serde::Serialize, serde::Deserialize)]
pub struct ApiResponse { /* ... */ }
```

**Checklist:** `Debug` (always), `Display` (if user-visible), `Clone` (if not resource handle), `Default` (if zero value exists), `Send + Sync` (ensure unless intentionally !Send).

## Documentation

```rust
/// Short summary line.
///
/// Longer explanation if needed.
///
/// # Examples
///
/// ```
/// use mycrate::Config;
/// let config = Config::builder().port(8080).build()?;
/// # Ok::<(), Box<dyn std::error::Error>>(())
/// ```
///
/// # Errors
///
/// Returns `ConfigError::InvalidPort` if port is 0.
///
/// # Panics
///
/// Panics if called before `init()`.
pub fn build(self) -> Result<Config, ConfigError> { /* ... */ }
```

**Rules:**
- All `pub` items must have doc comments
- Include `# Examples` with runnable code
- Document `# Errors` (what error variants and when)
- Document `# Panics` (if it can panic)

## Predictability

```rust
// Deref only for smart-pointer types
// WRONG: Deref for convenient field access
impl Deref for UserWrapper {
    type Target = User;
    fn deref(&self) -> &User { &self.inner }
}

// RIGHT: explicit method
impl UserWrapper {
    pub fn user(&self) -> &User { &self.inner }
}

// Constructors: use new() or Default
impl Server {
    pub fn new(addr: SocketAddr) -> Self { /* ... */ }
}
// For zero-arg construction, impl Default
```

## Flexibility

```rust
// RIGHT: accept borrowed data
fn process(name: &str) { /* ... */ }         // not String
fn read_from(r: &mut impl Read) { /* ... */ }  // not File

// RIGHT: return owned data
fn get_name(&self) -> String { /* ... */ }    // caller decides lifetime

// RIGHT: use Into for ergonomic APIs
fn connect(addr: impl Into<SocketAddr>) { /* ... */ }
// caller can pass SocketAddr, (&str, u16), etc.
```

## Type Safety

```rust
// WRONG: boolean parameters
fn create_user(name: &str, admin: bool, active: bool) { }
create_user("alice", true, false);  // which bool is which?

// RIGHT: use enums
enum Role { Admin, User }
enum Status { Active, Inactive }
fn create_user(name: &str, role: Role, status: Status) { }
create_user("alice", Role::Admin, Status::Inactive);  // self-documenting

// WRONG: stringly-typed
fn query(table: &str, column: &str) { }

// RIGHT: newtypes
struct TableName(String);
struct ColumnName(String);
fn query(table: &TableName, column: &ColumnName) { }
```

### Builder Pattern for Complex Construction

```rust
pub struct ServerBuilder {
    port: u16,
    host: String,
    max_connections: Option<usize>,
}

impl ServerBuilder {
    pub fn new(port: u16) -> Self {
        Self { port, host: "localhost".into(), max_connections: None }
    }
    pub fn host(mut self, host: impl Into<String>) -> Self {
        self.host = host.into(); self
    }
    pub fn max_connections(mut self, n: usize) -> Self {
        self.max_connections = Some(n); self
    }
    pub fn build(self) -> Result<Server, BuildError> { /* validate and build */ }
}

// Usage
let server = ServerBuilder::new(8080).host("0.0.0.0").max_connections(100).build()?;
```

Also consider the `bon` or `typed-builder` crates for derive-based builders.

## Future-Proofing

```rust
// Non-exhaustive: adding variants won't break downstream
#[non_exhaustive]
pub enum Error {
    NotFound,
    PermissionDenied,
    // can add new variants in minor releases
}

// Non-exhaustive struct: adding fields won't break downstream
#[non_exhaustive]
pub struct Config {
    pub port: u16,
    pub host: String,
}
// Forces users to use constructor, can't do Config { port: 80, host: "".into() }

// Sealed trait: public but can't be implemented externally
mod private { pub trait Sealed {} }
pub trait MyTrait: private::Sealed {
    fn method(&self);
}
// Only types in your crate can impl Sealed, so only you can impl MyTrait
```

## Error Design

```rust
#[derive(Debug)]
pub enum DbError {
    ConnectionFailed { host: String, source: std::io::Error },
    QueryFailed { query: String, source: sqlx::Error },
    NotFound { table: String, id: i64 },
}

impl fmt::Display for DbError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::ConnectionFailed { host, .. } =>
                write!(f, "failed to connect to database at {host}"),
            Self::QueryFailed { query, .. } =>
                write!(f, "query failed: {query}"),
            Self::NotFound { table, id } =>
                write!(f, "{table} with id {id} not found"),
        }
    }
}

impl std::error::Error for DbError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Self::ConnectionFailed { source, .. } => Some(source),
            Self::QueryFailed { source, .. } => Some(source),
            Self::NotFound { .. } => None,
        }
    }
}
```

**Or use `thiserror` for less boilerplate:**

```rust
#[derive(Debug, thiserror::Error)]
pub enum DbError {
    #[error("failed to connect to {host}")]
    ConnectionFailed { host: String, #[source] source: std::io::Error },
}
```

## API Evolution -- Breaking vs Non-Breaking

| Change | Breaking? |
|--------|-----------|
| Add `#[non_exhaustive]` enum variant | No (if already non_exhaustive) |
| Add pub field to `#[non_exhaustive]` struct | No |
| Remove pub item | **Yes** |
| Change fn signature | **Yes** |
| Add required trait method (no default) | **Yes** |
| Add trait method with default impl | No |
| Tighten generic bounds | **Yes** |
| Loosen generic bounds | No |
| Change `pub` to `pub(crate)` | **Yes** |
| Add new pub module | No |

## Common Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Stringly-typed APIs | No compile-time validation | Newtypes, enums |
| Boolean params | Unclear at call site | Enum with descriptive variants |
| God structs (20+ fields) | Hard to construct, hard to maintain | Builder pattern, split into sub-structs |
| Leaking impl details | Internal types in public API | `pub` wrapper types, `impl Trait` returns |
| `clone()` everywhere | Performance cost, hides ownership issues | Use references, `Cow<'_, T>`, or redesign ownership |
| `unwrap()` in library code | Panics callers can't handle | Return `Result`, use `expect()` only for invariants |
| `pub` fields on mutable state | No validation on mutation | Private fields with getter/setter methods |
