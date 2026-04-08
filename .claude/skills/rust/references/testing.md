# Testing in Rust

## Unit Tests

```rust
// src/lib.rs or any src file
pub fn add(a: i32, b: i32) -> i32 { a + b }

#[cfg(test)]  // only compiled during `cargo test`
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn test_add_negative() {
        assert_ne!(add(-1, 1), 2);  // assert not equal
    }

    #[test]
    #[should_panic(expected = "overflow")]
    fn test_overflow_panics() {
        add(i32::MAX, 1);  // panics with "overflow" in message
    }

    #[test]
    fn test_result() -> Result<(), String> {
        // Tests can return Result; Err = failure
        let val = "42".parse::<i32>().map_err(|e| e.to_string())?;
        assert_eq!(val, 42);
        Ok(())
    }
}
```

## Integration Tests

```
tests/
  integration_test.rs   <-- each file is a separate crate
  common/
    mod.rs              <-- shared helpers (NOT compiled as a test)
```

```rust
// tests/common/mod.rs
pub fn setup_db() -> TestDb { /* ... */ }

// tests/integration_test.rs
mod common;

#[test]
fn test_full_workflow() {
    let db = common::setup_db();
    // test against public API of your crate
}
```

## Doc Tests

```rust
/// Adds two numbers.
///
/// ```
/// # // hidden setup line (not shown in docs)
/// # use mycrate::add;
/// assert_eq!(add(2, 3), 5);
/// ```
///
/// Negative numbers:
/// ```
/// # use mycrate::add;
/// assert_eq!(add(-1, 1), 0);
/// ```
///
/// This example shows a compile failure:
/// ```compile_fail
/// add("not", "numbers");
/// ```
///
/// This is ignored (not run):
/// ```ignore
/// expensive_operation();
/// ```
pub fn add(a: i32, b: i32) -> i32 { a + b }
```

## Test Organization

```
src/
  parser.rs        -> contains mod tests { } at bottom
  validator.rs     -> contains mod tests { } at bottom
tests/
  api_tests.rs     -> integration tests for public API
  common/mod.rs    -> shared test utilities
```

**Rule:** one `#[cfg(test)] mod tests` per source file, shared utilities in `tests/common/mod.rs` or a `test-utils` crate.

## Property-Based Testing (proptest)

```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn encode_decode_roundtrip(s in "\\PC*") {
        let encoded = encode(&s);
        let decoded = decode(&encoded)?;
        prop_assert_eq!(decoded, s);
    }

    #[test]
    fn sort_is_idempotent(mut v in prop::collection::vec(any::<i32>(), 0..100)) {
        v.sort();
        let sorted = v.clone();
        v.sort();
        prop_assert_eq!(v, sorted);
    }
}
```

## Mocking with mockall

```rust
// Define trait (required -- mockall can't mock concrete types)
#[cfg_attr(test, mockall::automock)]
trait Database {
    fn get_user(&self, id: u64) -> Option<User>;
}

fn greet(db: &impl Database, id: u64) -> String {
    match db.get_user(id) {
        Some(u) => format!("Hello, {}", u.name),
        None => "User not found".to_string(),
    }
}

#[test]
fn test_greet_found() {
    let mut mock = MockDatabase::new();
    mock.expect_get_user()
        .with(mockall::predicate::eq(1))
        .returning(|_| Some(User { name: "Alice".into() }));
    assert_eq!(greet(&mock, 1), "Hello, Alice");
}
```

### Pitfall: mocking concrete types

```rust
// WRONG: can't mock a struct directly
struct RealDb;
impl RealDb { fn get_user(&self, id: u64) -> Option<User> { /* ... */ } }
// mockall can't generate MockRealDb

// RIGHT: extract a trait, mock the trait
```

## Test Fixtures / Setup-Teardown

```rust
// RAII pattern -- no explicit teardown needed
struct TestFixture { dir: tempfile::TempDir }

impl TestFixture {
    fn new() -> Self {
        let dir = tempfile::tempdir().unwrap();
        // setup: create files, seed data, etc.
        Self { dir }
    }
}
// TempDir drops (deletes) automatically

#[test]
fn test_with_fixture() {
    let fix = TestFixture::new();
    // use fix.dir.path()
} // cleanup happens here via Drop
```

## Async Tests

```rust
#[tokio::test]
async fn test_async_fetch() {
    let result = fetch_data("http://example.com").await;
    assert!(result.is_ok());
}

// Multi-threaded runtime (default is current_thread)
#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn test_concurrent() { /* ... */ }
```

## Snapshot Testing (insta)

```rust
use insta::assert_snapshot;
use insta::assert_json_snapshot;

#[test]
fn test_render_output() {
    let output = render_template("hello");
    assert_snapshot!(output);
    // First run: creates snapshots/test_render_output.snap
    // Subsequent: compares against stored snapshot
}

#[test]
fn test_api_response() {
    let resp = get_response();
    assert_json_snapshot!(resp, @r###"
    {
      "status": "ok",
      "count": 42
    }
    "###);
}
```

Review/update snapshots: `cargo insta review`

## cargo-nextest

Faster parallel test runner, per-test process isolation.

```bash
cargo install cargo-nextest
cargo nextest run              # run all tests
cargo nextest run -p mycrate   # specific package
cargo nextest run -- test_name # filter
```

Key difference from `cargo test`: each test runs in its own process, so panics don't affect other tests.

## assert_matches!

```rust
use std::assert_matches::assert_matches;  // nightly
// OR use the `assert_matches` crate on stable

assert_matches!(result, Ok(val) if val > 0);
assert_matches!(err, Err(MyError::NotFound { .. }));
```

## Benchmarking with criterion

```toml
# Cargo.toml
[[bench]]
name = "my_benchmark"
harness = false

[dev-dependencies]
criterion = { version = "0.5", features = ["html_reports"] }
```

```rust
// benches/my_benchmark.rs
use criterion::{criterion_group, criterion_main, Criterion, black_box};

fn bench_sort(c: &mut Criterion) {
    c.bench_function("sort 1000", |b| {
        b.iter(|| {
            let mut v: Vec<i32> = (0..1000).rev().collect();
            v.sort();
            black_box(v);
        })
    });
}

criterion_group!(benches, bench_sort);
criterion_main!(benches);
```

Run: `cargo bench`

## Coverage

```bash
cargo install cargo-llvm-cov            # recommended
cargo llvm-cov --html                   # HTML report
cargo llvm-cov --lcov --output-path lcov.info  # for CI
```

## Common Pitfalls

| Pitfall | Detail |
|---------|--------|
| Tests share mutable state | Tests run in parallel by default; use `std::sync::Mutex` or `serial_test` crate for shared resources |
| `cargo test` captures stdout | Use `cargo test -- --nocapture` to see `println!` output |
| Integration tests can't access private items | They only see `pub` API; unit tests inside `mod tests` can access private items via `use super::*` |
| Forgetting `#[cfg(test)]` on test module | Test deps get compiled into release binary, bloating it |
| Async test without runtime | Error: "there is no reactor running"; add `#[tokio::test]` not just `#[test]` |
| `#[should_panic]` with `Result` return | `#[should_panic]` only works when test returns `()`; can't combine with `-> Result<>` |
