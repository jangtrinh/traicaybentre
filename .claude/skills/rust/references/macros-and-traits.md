# Macros and Traits in Rust

## Trait Basics

```rust
trait Summary {
    fn title(&self) -> &str;

    // Default method
    fn preview(&self) -> String {
        format!("{}...", &self.title()[..20])
    }
}

// Supertrait: Display required to impl Summary
trait Summary: std::fmt::Display {
    fn title(&self) -> &str;
}

impl Summary for Article {
    fn title(&self) -> &str { &self.title }
}
```

## Common std Traits -- When to Implement

| Trait | When | Derive? |
|-------|------|---------|
| `Debug` | Always -- every public type | `#[derive(Debug)]` |
| `Display` | User-facing output | Manual impl |
| `Clone` | Value needs explicit duplication | `#[derive(Clone)]` |
| `Copy` | Small, stack-only types (no heap) | `#[derive(Copy, Clone)]` |
| `PartialEq`/`Eq` | Comparison/HashMap keys | `#[derive(PartialEq, Eq)]` |
| `Hash` | HashMap/HashSet keys | `#[derive(Hash)]` (requires `Eq`) |
| `Default` | Type has a sensible zero/empty value | `#[derive(Default)]` |
| `From`/`Into` | Infallible conversion | Manual `impl From<T>` (gives `Into` free) |
| `TryFrom` | Fallible conversion | Manual impl |
| `AsRef<T>` | Cheap reference conversion | Manual impl |
| `Deref` | Smart pointer types ONLY | Manual impl |
| `Iterator` | Custom iteration | Manual impl |
| `IntoIterator` | Type can be iterated with `for` | Manual impl |
| `Serialize`/`Deserialize` | Serialization with serde | `#[derive(Serialize, Deserialize)]` |

## Trait Objects

```rust
// Dynamic dispatch via vtable
fn log_all(items: &[Box<dyn Summary>]) {
    for item in items {
        println!("{}", item.title());
    }
}

// dyn Trait must be behind a pointer: &dyn T, Box<dyn T>, Arc<dyn T>
```

### Object Safety Rules

A trait is object-safe if it does NOT have:

```rust
// NOT object-safe: returns Self
trait Clonable { fn clone(&self) -> Self; }

// NOT object-safe: generic method
trait Processor { fn process<T>(&self, val: T); }

// NOT object-safe: requires Sized
trait Foo: Sized { fn bar(&self); }

// Compiler error:
// error[E0038]: the trait `Clonable` cannot be made into an object
// because method `clone` references the `Self` type in its return type
```

## Generics and Trait Bounds

```rust
// Trait bound syntax
fn print_it<T: Display>(val: T) { println!("{val}"); }

// Multiple bounds
fn process<T: Display + Debug + Clone>(val: T) { /* ... */ }

// Where clause (cleaner for complex bounds)
fn process<T>(val: T)
where
    T: Display + Debug + Clone,
{ /* ... */ }

// impl Trait in argument position (anonymous generic)
fn print_it(val: impl Display) { println!("{val}"); }

// impl Trait in return position (single concrete type)
fn make_iter() -> impl Iterator<Item = i32> {
    (0..10).filter(|x| x % 2 == 0)
}
```

## Associated Types vs Type Parameters

```rust
// Associated type: one impl per type (Iterator pattern)
trait Iterator {
    type Item;  // fixed once implemented
    fn next(&mut self) -> Option<Self::Item>;
}
// Can only have ONE Iterator impl per type

// Generic param: multiple impls per type
trait Convertible<T> {
    fn convert(&self) -> T;
}
// Can impl Convertible<String> AND Convertible<i32> for same type
```

**Rule:** use associated types when there's one natural choice; generics when multiple impls make sense.

## Derive Macros

```rust
#[derive(Debug, Clone, PartialEq, Eq, Hash, Default)]
#[derive(serde::Serialize, serde::Deserialize)]
struct Config {
    name: String,
    port: u16,
    #[serde(default)]
    debug: bool,
}
```

## Attribute Macros

```rust
#[tokio::main]       // transforms fn main() to async runtime setup
async fn main() { }

#[test]              // marks function as test
fn it_works() { }

// Custom attribute macros require a proc-macro crate
#[route(GET, "/api/users")]
async fn list_users() -> Json<Vec<User>> { /* ... */ }
```

## macro_rules! (Declarative Macros)

```rust
// Basic pattern matching
macro_rules! vec_of_strings {
    ($($x:expr),* $(,)?) => {
        vec![$($x.to_string()),*]
    };
}
let v = vec_of_strings!["hello", "world"];  // Vec<String>

// Multiple match arms
macro_rules! log {
    (error, $($arg:tt)*) => { eprintln!("[ERROR] {}", format!($($arg)*)) };
    (info, $($arg:tt)*)  => { println!("[INFO] {}", format!($($arg)*)) };
}
log!(error, "failed: {}", reason);
```

### Fragment specifiers

| Specifier | Matches |
|-----------|---------|
| `$x:expr` | Any expression |
| `$x:ty` | A type |
| `$x:ident` | An identifier |
| `$x:pat` | A pattern |
| `$x:tt` | A single token tree |
| `$x:stmt` | A statement |
| `$x:path` | A path (`std::io::Error`) |

## Procedural Macros (Overview)

Requires a separate crate with `proc-macro = true` in Cargo.toml.

```toml
[lib]
proc-macro = true

[dependencies]
proc-macro2 = "1"
syn = { version = "2", features = ["full"] }
quote = "1"
```

```rust
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro_derive(MyTrait)]
pub fn derive_my_trait(input: TokenStream) -> TokenStream {
    let input = parse_macro_input!(input as DeriveInput);
    let name = input.ident;

    let expanded = quote! {
        impl MyTrait for #name {
            fn describe(&self) -> &'static str {
                stringify!(#name)
            }
        }
    };
    TokenStream::from(expanded)
}
```

**When to build custom proc macros:** reduce significant boilerplate across 5+ types; otherwise prefer `macro_rules!` or manual impl.

## Blanket Implementations

```rust
// Implement ToString for everything that implements Display
impl<T: Display> ToString for T {
    fn to_string(&self) -> String { format!("{self}") }
}

// Your own blanket impl
trait Loggable {
    fn log(&self);
}

impl<T: Debug> Loggable for T {
    fn log(&self) { println!("{:?}", self); }
}
```

## Newtype Pattern

```rust
// Wrap primitive for type safety
struct UserId(u64);
struct OrderId(u64);

fn get_user(id: UserId) -> User { /* ... */ }

// WRONG: compiler catches misuse
// get_user(OrderId(42));
// error[E0308]: mismatched types
//   expected `UserId`, found `OrderId`

impl From<u64> for UserId {
    fn from(val: u64) -> Self { Self(val) }
}
```

## Common Pitfalls

### Orphan Rule

```rust
// WRONG: can't impl external trait for external type
impl Display for Vec<i32> { /* ... */ }
// error[E0117]: only traits defined in the current crate can be implemented
// for types defined outside of the crate

// RIGHT: use newtype wrapper
struct MyVec(Vec<i32>);
impl Display for MyVec { /* ... */ }
```

### Object Safety

```rust
// WRONG: using non-object-safe trait as dyn
trait Cloneable { fn clone_box(&self) -> Self; }
let x: Box<dyn Cloneable>;  // E0038

// RIGHT: return Box<dyn Trait> instead of Self
trait Cloneable {
    fn clone_box(&self) -> Box<dyn Cloneable>;
}
```

### Conflicting Blanket Impls

```rust
// WRONG: two blanket impls that could overlap
impl<T: Display> MyTrait for T { }
impl<T: Debug> MyTrait for T { }
// error[E0119]: conflicting implementations of trait `MyTrait`
// (many types implement both Display and Debug)

// RIGHT: pick one bound, or use specialization (nightly)
```

### Derive Requires Bounds on Fields

```rust
// WRONG: derive(Clone) when field type doesn't impl Clone
#[derive(Clone)]
struct Wrapper<T> { inner: T }
// error[E0277]: the trait bound `T: Clone` is not satisfied

// RIGHT: add bound -- #[derive(Clone)] struct Wrapper<T: Clone> { inner: T }
```
