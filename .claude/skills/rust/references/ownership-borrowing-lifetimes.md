# Ownership, Borrowing, and Lifetimes

## Ownership Rules

1. Every value has exactly one owner
2. When the owner goes out of scope, the value is dropped
3. Assignment moves ownership (for non-Copy types)

```rust
// WRONG: use after move
let s1 = String::from("hello");
let s2 = s1;
println!("{s1}");
// error[E0382]: borrow of moved value: `s1`
//   value moved here: `let s2 = s1;`

// RIGHT: clone if you need both
let s1 = String::from("hello");
let s2 = s1.clone();
println!("{s1}"); // OK
```

## Copy vs Clone

| Copy (implicit, cheap) | Clone (explicit, potentially expensive) |
|---|---|
| `i32`, `f64`, `bool`, `char` | `String`, `Vec<T>`, `HashMap` |
| `&T` (shared references) | `Box<T>`, `PathBuf` |
| Tuples of Copy types | Any type implementing Clone |
| `[T; N]` where T: Copy | `Rc<T>`, `Arc<T>` (cheap clone) |

```rust
// Implement Copy for simple types
#[derive(Clone, Copy)]
struct Point { x: f64, y: f64 }

// Cannot implement Copy if type contains non-Copy fields
#[derive(Clone)]  // Clone only — String is not Copy
struct User { name: String, age: u32 }
```

## Borrowing Rules

Two rules enforced at compile time:
1. Any number of shared references `&T` **OR** exactly one mutable reference `&mut T`
2. References must always be valid (no dangling)

```rust
// WRONG: mutable + immutable borrow overlap
let mut v = vec![1, 2, 3];
let first = &v[0];       // immutable borrow
v.push(4);               // mutable borrow
println!("{first}");      // immutable borrow used here
// error[E0502]: cannot borrow `v` as mutable because it is also borrowed as immutable

// RIGHT: immutable borrow ends before mutable borrow
let mut v = vec![1, 2, 3];
let first = v[0];         // Copy the value, no borrow held
v.push(4);
println!("{first}");
```

```rust
// WRONG: two mutable borrows
let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s;
println!("{r1} {r2}");
// error[E0499]: cannot borrow `s` as mutable more than once at a time

// RIGHT: sequential mutable borrows
let mut s = String::from("hello");
let r1 = &mut s;
r1.push_str(" world");
// r1 no longer used after this point
let r2 = &mut s;  // OK — NLL sees r1 is done
```

## Lifetime Annotations

```rust
// Elision handles most cases. You need annotations when:
// - Function returns a reference derived from multiple inputs
// - Struct holds references

// RIGHT: explicit lifetime — return borrows from input
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// WRONG: missing lifetime on returned reference
fn longest(x: &str, y: &str) -> &str { x }
// error[E0106]: missing lifetime specifier
//   this function's return type contains a borrowed value,
//   but the signature does not say whether it is borrowed from `x` or `y`
```

### Lifetime Elision Rules

1. Each input reference gets its own lifetime
2. If exactly one input lifetime, output gets that lifetime
3. If `&self` or `&mut self`, output gets self's lifetime

```rust
fn first_word(s: &str) -> &str { /* elision rule 2 */ }
// Equivalent to: fn first_word<'a>(s: &'a str) -> &'a str
```

### Struct with References

```rust
struct Excerpt<'a> {
    text: &'a str,
}

// WRONG: struct outlives borrowed data
let excerpt;
{
    let novel = String::from("Call me Ishmael...");
    excerpt = Excerpt { text: &novel };
}
println!("{}", excerpt.text);
// error[E0597]: `novel` does not live long enough
```

## Interior Mutability

| Type | Thread-safe | Checked | Use when |
|------|------------|---------|----------|
| `Cell<T>` | No | Compile-time | T: Copy, single-thread mutation |
| `RefCell<T>` | No | Runtime (panics) | Single-thread, need &mut through &self |
| `Mutex<T>` | Yes | Runtime (poison) | Multi-thread shared mutation |
| `RwLock<T>` | Yes | Runtime | Multi-thread, many readers few writers |

```rust
use std::cell::RefCell;

let data = RefCell::new(vec![1, 2, 3]);
// WRONG: two mutable borrows at runtime — panics!
let mut a = data.borrow_mut();
let mut b = data.borrow_mut();  // panic: already borrowed

// RIGHT: scope the borrow
{
    let mut a = data.borrow_mut();
    a.push(4);
}  // borrow released
let mut b = data.borrow_mut();  // OK
```

## Cow (Clone-on-Write)

```rust
use std::borrow::Cow;

fn normalize(input: &str) -> Cow<'_, str> {
    if input.contains('\t') {
        Cow::Owned(input.replace('\t', "    "))  // Allocates only when needed
    } else {
        Cow::Borrowed(input)                      // Zero-cost
    }
}
```

## Smart Pointers

| Pointer | Ownership | Thread-safe | Use case |
|---------|-----------|------------|----------|
| `Box<T>` | Single | Send if T: Send | Heap allocation, recursive types, trait objects |
| `Rc<T>` | Shared | No | Single-thread shared ownership |
| `Arc<T>` | Shared | Yes | Multi-thread shared ownership |
| `Pin<P>` | Varies | Varies | Prevent moves (async futures, self-referential) |

```rust
// WRONG: Rc across threads
use std::rc::Rc;
let data = Rc::new(42);
std::thread::spawn(move || println!("{data}"));
// error[E0277]: `Rc<i32>` cannot be sent between threads safely

// RIGHT: Arc for multi-threaded sharing
use std::sync::Arc;
let data = Arc::new(42);
std::thread::spawn(move || println!("{data}"));
```

## Common Pitfalls with Exact Errors

```rust
// "cannot move out of borrowed content"
fn take_first(v: &Vec<String>) -> String {
    v[0]  // tries to move out of borrowed vec
}
// error[E0507]: cannot move out of index of `Vec<String>`
// Fix: return &str, clone, or use v.swap_remove(0) on &mut Vec

// "use of moved value" in loop
let s = String::from("hello");
for _ in 0..3 {
    let _x = s;  // moves s on first iteration
}
// error[E0382]: use of moved value: `s`
// Fix: clone in loop or use &s

// Returning reference to local
fn dangling() -> &str {
    let s = String::from("hello");
    &s
}
// error[E0515]: cannot return reference to local variable `s`
// Fix: return String (owned), not &str
```

## Patterns Summary

```rust
// Prefer borrowing over ownership in function params
fn process(data: &[u8]) {}          // RIGHT: borrows slice
fn process(data: Vec<u8>) {}        // WRONG: takes ownership unnecessarily

// Accept &str not &String
fn greet(name: &str) {}             // RIGHT: accepts &str and &String
fn greet(name: &String) {}          // WRONG: unnecessarily restrictive
// clippy::ptr_arg will catch this

// Use Into<String> when you need ownership but want flexibility
fn set_name(name: impl Into<String>) { let _n = name.into(); }
```
