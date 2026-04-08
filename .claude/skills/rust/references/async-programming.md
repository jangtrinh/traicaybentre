# Async Programming

## Async Basics

```rust
// async fn returns impl Future<Output = T> — does NOTHING until awaited/spawned
async fn fetch_data(url: &str) -> Result<String, reqwest::Error> {
    reqwest::get(url).await?.text().await
}

// WRONG: future created but never polled
async fn example() {
    fetch_data("http://example.com");  // Warning: unused future that must be used
}

// RIGHT: .await it or spawn it
async fn example() {
    let data = fetch_data("http://example.com").await.unwrap();
    // or
    tokio::spawn(fetch_data("http://example.com".to_string()));
}
```

## Tokio Runtime

```rust
// Standard entry point
#[tokio::main]
async fn main() {
    // multi-threaded runtime (default)
}

// Single-threaded — lighter, for simple apps/tests
#[tokio::main(flavor = "current_thread")]
async fn main() { }

// Manual runtime construction
fn main() {
    let rt = tokio::runtime::Builder::new_multi_thread()
        .worker_threads(4)
        .enable_all()
        .build()
        .unwrap();
    rt.block_on(async { /* ... */ });
}
```

## tokio::spawn — Concurrent Tasks

```rust
// Spawn returns JoinHandle<T>
let handle = tokio::spawn(async {
    expensive_computation().await
});
let result = handle.await?;  // JoinError if task panics

// Run multiple tasks concurrently
let (a, b, c) = tokio::join!(
    fetch_users(),
    fetch_orders(),
    fetch_products(),
);
// All three run concurrently, waits for ALL to complete

// try_join! — short-circuits on first error
let (users, orders) = tokio::try_join!(
    fetch_users(),
    fetch_orders(),
)?;
```

## tokio::select! — Racing Futures

```rust
use tokio::time::{sleep, Duration};

// First future to complete wins, others are dropped
tokio::select! {
    result = fetch_data() => println!("got data: {result:?}"),
    _ = sleep(Duration::from_secs(5)) => println!("timeout!"),
    _ = shutdown_signal() => println!("shutting down"),
}

// With cancellation token
use tokio_util::sync::CancellationToken;
let token = CancellationToken::new();
tokio::select! {
    _ = token.cancelled() => { /* cleanup */ }
    result = do_work() => { /* process result */ }
}
```

## Channels

| Channel | Pattern | Bounded | Use when |
|---------|---------|---------|----------|
| `mpsc` | Many producers, one consumer | Optional | Task work queues, event streams |
| `oneshot` | One producer, one consumer | N/A | Single response (request/reply) |
| `broadcast` | Many producers, many consumers | Yes | Events to multiple subscribers |
| `watch` | Single producer, many consumers | 1 value | Config changes, latest state |

```rust
// mpsc — most common
let (tx, mut rx) = tokio::sync::mpsc::channel::<Message>(100);
tokio::spawn(async move {
    tx.send(Message::new()).await.unwrap();
});
while let Some(msg) = rx.recv().await {
    process(msg);
}

// oneshot — request/reply
let (tx, rx) = tokio::sync::oneshot::channel();
tokio::spawn(async move {
    let result = compute().await;
    let _ = tx.send(result);  // Ignore error if receiver dropped
});
let response = rx.await?;

// watch — latest value
let (tx, mut rx) = tokio::sync::watch::channel(Config::default());
// Subscriber
tokio::spawn(async move {
    while rx.changed().await.is_ok() {
        let config = rx.borrow().clone();
        apply_config(config);
    }
});
```

## Streams

```rust
use tokio_stream::StreamExt;

// Create stream from iterator
let mut stream = tokio_stream::iter(vec![1, 2, 3]);
while let Some(value) = stream.next().await {
    println!("{value}");
}

// ReceiverStream wraps mpsc::Receiver
use tokio_stream::wrappers::ReceiverStream;
let (tx, rx) = tokio::sync::mpsc::channel(100);
let stream = ReceiverStream::new(rx);

// Stream combinators
stream
    .filter(|x| x % 2 == 0)
    .map(|x| x * 2)
    .take(10);
```

## Async Traits

```rust
// Native async in traits (Rust 1.75+) — preferred
trait Service {
    async fn call(&self, req: Request) -> Response;
}
// Limitation: returned future is not Send by default
// Use #[trait_variant::make(SendService: Send)] for Send bound

// async-trait crate — fallback for older MSRV or when Send is needed
#[async_trait::async_trait]
trait Service: Send + Sync {
    async fn call(&self, req: Request) -> Response;
    // Desugars to: fn call(&self, req: Request) -> Pin<Box<dyn Future + Send + '_>>
}
```

## Common Patterns

### Timeout

```rust
use tokio::time::{timeout, Duration};

match timeout(Duration::from_secs(5), fetch_data()).await {
    Ok(Ok(data)) => process(data),
    Ok(Err(e)) => eprintln!("fetch failed: {e}"),
    Err(_) => eprintln!("fetch timed out"),
}
```

### Retry with Backoff

```rust
async fn retry<F, Fut, T, E>(max: u32, mut f: F) -> Result<T, E>
where
    F: FnMut() -> Fut,
    Fut: Future<Output = Result<T, E>>,
{
    let mut attempt = 0;
    loop {
        match f().await {
            Ok(v) => return Ok(v),
            Err(e) if attempt >= max => return Err(e),
            Err(_) => {
                attempt += 1;
                sleep(Duration::from_millis(100 * 2u64.pow(attempt))).await;
            }
        }
    }
}
```

### Graceful Shutdown

```rust
#[tokio::main]
async fn main() {
    let (shutdown_tx, shutdown_rx) = tokio::sync::broadcast::channel::<()>(1);

    let server = tokio::spawn(run_server(shutdown_rx));

    // Wait for Ctrl+C
    tokio::signal::ctrl_c().await.unwrap();
    let _ = shutdown_tx.send(());
    server.await.unwrap();
}
```

## Common Pitfalls

### Blocking in Async

```rust
// WRONG: blocks the executor thread
async fn handler() -> String {
    std::fs::read_to_string("big_file.txt").unwrap()  // Blocks!
    // Or: thread::sleep(), CPU-heavy computation
}

// RIGHT: offload to blocking thread pool
async fn handler() -> String {
    tokio::task::spawn_blocking(|| {
        std::fs::read_to_string("big_file.txt").unwrap()
    }).await.unwrap()
}
// Or use tokio::fs for async file I/O
```

### Holding MutexGuard Across .await

```rust
// WRONG: std::sync::MutexGuard is not Send
async fn update(data: Arc<std::sync::Mutex<Vec<i32>>>) {
    let mut guard = data.lock().unwrap();
    async_operation().await;  // MutexGuard held across await!
    guard.push(1);
}
// error: future cannot be sent between threads safely
//   std::sync::MutexGuard<'_, Vec<i32>>` is not `Send`

// RIGHT option 1: scope the lock
async fn update(data: Arc<std::sync::Mutex<Vec<i32>>>) {
    let value = async_operation().await;
    let mut guard = data.lock().unwrap();
    guard.push(value);
}

// RIGHT option 2: use tokio::sync::Mutex (await-able lock)
async fn update(data: Arc<tokio::sync::Mutex<Vec<i32>>>) {
    let mut guard = data.lock().await;
    async_operation().await;
    guard.push(1);
}
```

### Send Bounds on Spawned Tasks

```rust
// WRONG: Rc is not Send
async fn bad() {
    let data = Rc::new(42);
    tokio::spawn(async move {
        println!("{data}");
    });
}
// error[E0277]: `Rc<i32>` cannot be sent between threads safely

// RIGHT: use Arc
let data = Arc::new(42);
tokio::spawn(async move { println!("{data}"); });
```

### Cancellation Safety

```rust
// DANGER: select! drops the losing branch's future
tokio::select! {
    // If timeout wins, read_exact's partial read is lost!
    data = reader.read_exact(&mut buf) => { /* ... */ }
    _ = sleep(Duration::from_secs(1)) => { /* buf may be partially filled */ }
}

// Safe: use cancellation-safe methods (documented per method)
// read() is cancellation-safe, read_exact() is NOT
```
