# Go Concurrency Patterns

## Goroutine Basics

- ~2KB initial stack (grows dynamically up to 1GB default)
- Scheduled by Go runtime onto OS threads (M:N scheduling)
- Cheap to create, but leaked goroutines accumulate memory

```go
// WRONG: fire-and-forget with no way to track completion
go doWork()

// RIGHT: track with WaitGroup or errgroup
var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    doWork()
}()
wg.Wait()
```

## Channels

### Unbuffered vs Buffered

```go
ch := make(chan int)      // unbuffered: send blocks until receiver ready
ch := make(chan int, 10)  // buffered: send blocks only when buffer full
```

| Type | Use When |
|------|----------|
| Unbuffered | Synchronization needed; sender must wait for receiver |
| Buffered | Decouple sender/receiver timing; known bound on in-flight items |

### Directional Types

```go
func producer(out chan<- int) { out <- 42 }  // send-only
func consumer(in <-chan int)  { v := <-in }  // receive-only
```

## Select Statement Patterns

### Timeout

```go
select {
case res := <-ch:
    handle(res)
case <-time.After(5 * time.Second):
    log.Println("timeout")
}
```

### Done / Cancellation

```go
select {
case res := <-ch:
    handle(res)
case <-ctx.Done():
    return ctx.Err()
}
```

### Non-blocking with Default

```go
select {
case msg := <-ch:
    handle(msg)
default:
    // ch not ready, do something else
}
```

## sync Primitives

### WaitGroup

```go
var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        work()
    }()
}
wg.Wait()
```

### Mutex / RWMutex

```go
var mu sync.Mutex
mu.Lock()
shared++
mu.Unlock()

var rw sync.RWMutex
rw.RLock()       // multiple readers allowed
_ = shared
rw.RUnlock()
```

### sync.Once

```go
var once sync.Once
var db *sql.DB

func GetDB() *sql.DB {
    once.Do(func() {
        db, _ = sql.Open("postgres", dsn)
    })
    return db
}
```

## errgroup for Concurrent Error Handling

```go
import "golang.org/x/sync/errgroup"

g, ctx := errgroup.WithContext(ctx)

for _, url := range urls {
    g.Go(func() error {
        return fetch(ctx, url)
    })
}

if err := g.Wait(); err != nil {
    // first non-nil error returned
    return err
}
```

Limit concurrency: `g.SetLimit(10)`

## Fan-Out / Fan-In

```go
func fanOut(ctx context.Context, input <-chan Job, workers int) <-chan Result {
    results := make(chan Result)
    var wg sync.WaitGroup

    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for job := range input {
                select {
                case results <- process(job):
                case <-ctx.Done():
                    return
                }
            }
        }()
    }

    go func() {
        wg.Wait()
        close(results)
    }()

    return results
}
```

## Worker Pool

```go
func workerPool(ctx context.Context, jobs <-chan Job, numWorkers int) <-chan Result {
    results := make(chan Result, numWorkers)
    var wg sync.WaitGroup

    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for job := range jobs {
                select {
                case <-ctx.Done():
                    return
                case results <- process(job):
                }
            }
        }()
    }

    go func() {
        wg.Wait()
        close(results)
    }()
    return results
}
```

## Context for Cancellation

```go
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel() // always defer cancel to release resources

go func() {
    if err := longTask(ctx); err != nil {
        log.Println(err)
    }
}()
```

**Pass context as first parameter.** Never store in a struct.

```go
// WRONG
type Server struct { ctx context.Context }

// RIGHT
func (s *Server) Handle(ctx context.Context, req *Request) error { ... }
```

## Common Pitfalls

### Goroutine Leak

```go
// WRONG: goroutine blocks forever if nobody reads ch
func leaky() <-chan int {
    ch := make(chan int)
    go func() {
        val := expensiveOp()
        ch <- val // blocks if caller abandons ch
    }()
    return ch
}

// RIGHT: accept context for cancellation
func safe(ctx context.Context) <-chan int {
    ch := make(chan int, 1) // buffered so send won't block
    go func() {
        val := expensiveOp()
        select {
        case ch <- val:
        case <-ctx.Done():
        }
    }()
    return ch
}
```

### Race Condition

```go
// WRONG: data race (detected by go run -race)
// WARNING: DATA RACE - Read/Write at 0x...
var counter int
go func() { counter++ }()
go func() { counter++ }()

// RIGHT: use atomic or mutex
var counter atomic.Int64
go func() { counter.Add(1) }()
go func() { counter.Add(1) }()
```

### Deadlock

```go
// Error: fatal error: all goroutines are asleep - deadlock!
ch := make(chan int)
ch <- 1  // blocks forever: no receiver on unbuffered channel
```

### Closing a Channel Twice

```go
// WRONG: panic: close of closed channel
close(ch)
close(ch)

// RIGHT: only the sender closes; close exactly once
```

## Channels vs Mutexes

| Use Channels | Use Mutexes |
|-------------|-------------|
| Passing ownership of data | Protecting shared state (cache, map) |
| Coordinating goroutines | Simple counter/flag |
| Pipeline / fan-out patterns | Performance-critical sections |
| Signaling events | Struct field guarding |

Rob Pike: "Don't communicate by sharing memory; share memory by communicating." Use channels for coordination, mutexes for state protection.
