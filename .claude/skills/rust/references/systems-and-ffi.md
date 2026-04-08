# Systems Programming and FFI in Rust

## FFI Basics

```rust
// Expose Rust function to C
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}

// Call C function from Rust
extern "C" {
    fn abs(input: i32) -> i32;
    fn strlen(s: *const std::ffi::c_char) -> usize;
}

fn main() {
    let result = unsafe { abs(-5) };  // must be unsafe
}
```

## Calling C from Rust (bindgen)

Auto-generates Rust bindings from C headers.

```toml
[build-dependencies]
bindgen = "0.71"
```

```rust
// build.rs
fn main() {
    println!("cargo:rustc-link-lib=mylib");
    println!("cargo:rerun-if-changed=wrapper.h");

    let bindings = bindgen::Builder::default()
        .header("wrapper.h")
        .generate()
        .expect("Unable to generate bindings");

    let out_path = std::path::PathBuf::from(std::env::var("OUT_DIR").unwrap());
    bindings.write_to_file(out_path.join("bindings.rs")).unwrap();
}

// src/lib.rs
include!(concat!(env!("OUT_DIR"), "/bindings.rs"));
```

## Calling Rust from C (cbindgen)

Generates C/C++ headers from Rust code.

```toml
# cbindgen.toml
language = "C"
include_guard = "MY_LIB_H"

[export]
include = ["MyStruct", "process"]
```

```bash
cbindgen --config cbindgen.toml --crate mylib --output mylib.h
```

```rust
// Must use repr(C) for structs crossing FFI
#[repr(C)]
pub struct MyStruct {
    pub x: i32,
    pub y: f64,
}

#[no_mangle]
pub extern "C" fn process(s: *const MyStruct) -> i32 {
    let s = unsafe { &*s };
    s.x
}
```

## Unsafe -- What It Unlocks

| Action | Requires `unsafe` |
|--------|-------------------|
| Dereference raw pointers | Yes |
| Call `extern` functions | Yes |
| Access/modify mutable statics | Yes |
| Implement unsafe traits (`Send`, `Sync`) | Yes |
| Access union fields | Yes |
| Call safe Rust functions | No |
| Create raw pointers | No (only deref is unsafe) |

## Unsafe Best Practices

```rust
// WRONG: large unsafe block
unsafe {
    let ptr = get_ptr();
    validate(ptr);         // safe operation buried in unsafe
    let val = *ptr;
    process(val);          // safe operation buried in unsafe
}

// RIGHT: minimize unsafe scope, wrap in safe API
fn safe_read(ptr: *const i32) -> Option<i32> {
    if ptr.is_null() {
        return None;
    }
    // SAFETY: we checked ptr is non-null. Caller guarantees
    // ptr points to valid, aligned, initialized i32.
    Some(unsafe { *ptr })
}
```

Document invariants with `// SAFETY:` comments on every unsafe block.

## Memory Layout

```rust
#[repr(C)]           // C-compatible layout, predictable field order
struct FfiStruct { a: u8, b: u32 }

#[repr(packed)]      // no padding (may cause unaligned access)
struct Packed { a: u8, b: u32 }

#[repr(transparent)] // same layout as inner field (for newtypes)
struct Wrapper(u32);

// Default Rust repr: compiler may reorder fields for optimization
struct RustStruct { a: u8, b: u32 }  // field order NOT guaranteed
```

## Raw Pointers

```rust
let x = 42;
let ptr: *const i32 = &x;           // create (safe)
let val = unsafe { *ptr };          // deref (unsafe)

let mut y = 10;
let mut_ptr: *mut i32 = &mut y;
unsafe { *mut_ptr = 20; }

// Pointer arithmetic
let arr = [1, 2, 3];
let ptr = arr.as_ptr();
let second = unsafe { *ptr.add(1) };  // arr[1]

// Casting between pointer types
let void_ptr = ptr as *const std::ffi::c_void;
let back = void_ptr as *const i32;
```

## CString / CStr for FFI Strings

```rust
use std::ffi::{CString, CStr, c_char};

// Rust -> C: create null-terminated string
let c_string = CString::new("hello").expect("CString::new failed");
let ptr: *const c_char = c_string.as_ptr();
// IMPORTANT: c_string must outlive ptr

// C -> Rust: borrow C string
unsafe {
    let c_str = CStr::from_ptr(some_c_ptr);
    let rust_str: &str = c_str.to_str().expect("invalid UTF-8");
}
```

**Pitfall:** `CString::new("has\0null")` returns `Err` because C strings can't contain interior nulls.

## WebAssembly

### wasm-bindgen

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}

// Import JS function
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Expose struct to JS
#[wasm_bindgen]
pub struct Counter { count: u32 }

#[wasm_bindgen]
impl Counter {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self { Self { count: 0 } }

    pub fn increment(&mut self) { self.count += 1; }
    pub fn value(&self) -> u32 { self.count }
}
```

### wasm-pack build workflow

```bash
wasm-pack build --target web       # for ES modules
wasm-pack build --target bundler   # for webpack/vite
wasm-pack build --target nodejs    # for Node.js
```

### web-sys / js-sys

```rust
use web_sys::{window, Document, HtmlElement};

let document = window().unwrap().document().unwrap();
let body = document.body().unwrap();
body.set_inner_html("<h1>Hello from Rust</h1>");

// js-sys for JS builtins
let now = js_sys::Date::now();  // milliseconds since epoch
```

### WASI (Server-Side WASM)

```bash
# Build for WASI
rustup target add wasm32-wasip1
cargo build --target wasm32-wasip1

# Run with wasmtime
wasmtime target/wasm32-wasip1/debug/myapp.wasm
```

## Cross-Compilation

```bash
# Add target
rustup target add aarch64-unknown-linux-gnu

# Build (needs linker configured)
cargo build --target aarch64-unknown-linux-gnu

# Using cargo-cross (Docker-based, handles linkers)
cargo install cross
cross build --target aarch64-unknown-linux-gnu
```

### Target Tiers

| Tier | Guarantee | Example |
|------|-----------|---------|
| 1 | Guaranteed to work, CI-tested | `x86_64-unknown-linux-gnu`, `x86_64-apple-darwin` |
| 2 | Guaranteed to build | `aarch64-unknown-linux-gnu`, `wasm32-unknown-unknown` |
| 3 | Exists but not guaranteed | `riscv64gc-unknown-linux-gnu` |

## Static Linking for Deployment

```bash
# musl for fully static Linux binaries
rustup target add x86_64-unknown-linux-musl
cargo build --release --target x86_64-unknown-linux-musl
# Result: single binary with no libc dependency
```

```toml
# .cargo/config.toml -- set default target
[build]
target = "x86_64-unknown-linux-musl"
```

## Common Pitfalls

| Pitfall | Detail |
|---------|--------|
| Forgetting `#[repr(C)]` on FFI structs | Rust may reorder fields; C side sees garbage |
| Dangling pointers across FFI | `CString` dropped before C reads ptr; use `let cs = CString::new(...); call(cs.as_ptr());` keeping `cs` alive |
| UB in unsafe code | Compiler assumes no UB; violations cause unpredictable optimizations |
| WASM binary size | Enable `lto = true`, `opt-level = "z"`, run `wasm-opt -Oz` post-build |
| Missing `#[no_mangle]` | Rust name-mangles by default; C can't find the symbol |
| `panic` across FFI boundary | UB before Rust 1.71; use `extern "C-unwind"` or catch panics with `std::panic::catch_unwind` |
| Interior nulls in CString | `CString::new("ab\0c")` errors; sanitize input or use `CStr` directly |
