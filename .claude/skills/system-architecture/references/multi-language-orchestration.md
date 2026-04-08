# Multi-Language Orchestration: Rust + Go + Python

## Architecture Overview

```
+---------------------------------------------------------------+
|                     Tauri Application                          |
|                                                                |
|  +-------------------+         +---------------------------+  |
|  |  WebView (React)  |  IPC    |  Rust Core (Orchestrator) |  |
|  |  - UI rendering   | <-----> |  - IPC handler            |  |
|  |  - User actions   |         |  - Process manager        |  |
|  +-------------------+         |  - Plugin host            |  |
|                                +--+----------+-------------+  |
|                                   |          |                |
|                          TCP/gRPC |          | TCP/stdin      |
|                                   v          v                |
|                         +-----------+  +------------+         |
|                         | Go Sidecar|  | Python     |         |
|                         | (binary)  |  | Sidecar    |         |
|                         +-----------+  +------------+         |
+---------------------------------------------------------------+
```

## When to Use Each Language

| Language | Use For | Why | Binary Size | Startup |
|----------|---------|-----|-------------|---------|
| Rust | Core app, crypto, file I/O, IPC, DB | Speed, safety, Tauri native | N/A (is the app) | N/A |
| Go | Background services, networking, concurrent ops, CLI tools | Easy cross-compile, small binary, goroutines | 5-15 MB | ~10ms |
| Python | Data processing, ML inference, scripting, prototyping | Ecosystem (numpy, torch, pandas), rapid iteration | 50-100 MB (bundled) | ~500ms-2s |

### Decision Table: Which Language for What

| Task | Rust | Go | Python | Winner |
|------|------|-----|--------|--------|
| File encryption | Yes | -- | -- | Rust (ring/rustcrypto) |
| HTTP API server | Possible | Yes | Possible | Go (net/http, easy) |
| WebSocket relay | Possible | Yes | -- | Go (goroutines) |
| PDF parsing | Possible | -- | Yes | Python (pypdf, pdfplumber) |
| ML inference | Possible (ort) | -- | Yes | Python (torch, onnxruntime) |
| SQLite operations | Yes | -- | -- | Rust (already in Tauri) |
| Image processing | Yes | -- | Yes | Depends on complexity |
| Scheduled tasks | -- | Yes | -- | Go (cron library, small binary) |
| Data pipeline/ETL | -- | -- | Yes | Python (pandas, polars) |

## Sidecar Process Pattern

Tauri bundles external binaries and launches them as child processes.

### Tauri Configuration

```json
// src-tauri/tauri.conf.json
{
  "bundle": {
    "externalBin": [
      "binaries/go-service",
      "binaries/python-worker"
    ]
  }
}
```

### Binary Naming Convention

```
src-tauri/binaries/
  go-service-x86_64-apple-darwin           # macOS Intel
  go-service-aarch64-apple-darwin          # macOS ARM (M1+)
  go-service-x86_64-pc-windows-msvc.exe    # Windows
  go-service-x86_64-unknown-linux-gnu      # Linux

  python-worker-x86_64-apple-darwin        # PyInstaller output
  python-worker-aarch64-apple-darwin
  python-worker-x86_64-pc-windows-msvc.exe
  python-worker-x86_64-unknown-linux-gnu
```

**Failure mode:** Binary name doesn't match target triple exactly = "sidecar not found" at runtime. Must match Rust target triple precisely.

## Communication Patterns

### Comparison Matrix

| Pattern | Type Safety | Streaming | Cross-Platform | Complexity | Throughput |
|---------|------------|-----------|----------------|------------|------------|
| TCP + JSON-newline | Low (schema) | Manual | Yes | Low | Medium |
| gRPC | High (protobuf) | Native | Yes | Medium | High |
| Unix domain socket | Low | Manual | macOS/Linux | Low | Very High |
| Stdin/stdout | Low | Manual | Yes | Lowest | Low |

### Pattern 1: TCP + JSON-Newline (Recommended Default)

```
Rust (client)                    Go/Python (server)
     |                                |
     |--- connect(127.0.0.1:PORT) --->|
     |                                |
     |--- {"method":"process",...}\n ->|  JSON + newline delimiter
     |<-- {"result":"ok",...}\n -------|
     |                                |
     |--- {"method":"stream",...}\n -->|  Streaming: multiple
     |<-- {"chunk":1}\n --------------|  newline-delimited
     |<-- {"chunk":2}\n --------------|  responses
     |<-- {"done":true}\n ------------|
```

```go
// Go: JSON-newline server
listener, _ := net.Listen("tcp", "127.0.0.1:0")
port := listener.Addr().(*net.TCPAddr).Port
fmt.Printf("PORT=%d\n", port) // Handshake: tell Rust the port

for {
    conn, _ := listener.Accept()
    go handleConn(conn) // One goroutine per connection
}
```

### Pattern 2: gRPC

```protobuf
// service.proto
service Worker {
  rpc Process(Request) returns (Response);
  rpc StreamData(Query) returns (stream DataChunk);
}
```

Best when: complex API surface, multiple methods, need streaming + type safety.

### Pattern 3: Stdin/Stdout

```rust
// Rust: spawn sidecar, communicate via stdio
use tauri::api::process::Command;

let (mut rx, child) = Command::new_sidecar("go-service")
    .expect("sidecar not found")
    .spawn()
    .expect("failed to spawn");

// Read stdout
while let Some(event) = rx.recv().await {
    match event {
        CommandEvent::Stdout(line) => handle_output(line),
        CommandEvent::Stderr(line) => log_error(line),
        _ => {}
    }
}
```

Simplest but limited: no multiplexing, line-buffering issues, can't handle binary data well.

## Go Sidecar Setup

### Build Script

```bash
#!/bin/bash
# build-go-sidecar.sh
TARGETS=(
  "darwin/amd64:x86_64-apple-darwin"
  "darwin/arm64:aarch64-apple-darwin"
  "windows/amd64:x86_64-pc-windows-msvc"
  "linux/amd64:x86_64-unknown-linux-gnu"
)

for target in "${TARGETS[@]}"; do
  IFS=':' read -r go_target tauri_triple <<< "$target"
  IFS='/' read -r goos goarch <<< "$go_target"

  ext=""
  [[ "$goos" == "windows" ]] && ext=".exe"

  CGO_ENABLED=0 GOOS=$goos GOARCH=$goarch \
    go build -ldflags="-s -w" -o \
    "src-tauri/binaries/go-service-${tauri_triple}${ext}" \
    ./cmd/service/
done
```

### Port Handshake Protocol

```
1. Rust spawns Go binary with no port argument
2. Go listens on random port (":0")
3. Go prints "PORT=XXXXX" to stdout
4. Rust reads stdout, parses port number
5. Rust connects TCP to 127.0.0.1:XXXXX
6. Communication established

Why random port: avoids conflicts with other apps or multiple instances.
```

### Health Check

Go exposes `/health` endpoint. Rust polls it periodically (every 5s). If unhealthy, trigger restart via process manager.

## Python Sidecar

### PyInstaller Bundling

```bash
# Bundle Python app into single binary
pyinstaller --onefile --name python-worker \
  --hidden-import=numpy \
  --hidden-import=torch \
  worker/main.py

# Output: dist/python-worker (~50-100MB depending on deps)
# Rename per target triple and copy to src-tauri/binaries/
```

### PID Management Gotcha

PyInstaller `--onefile` creates a bootloader process that spawns the real Python process. Killing the bootloader PID orphans the Python PID. Fix: Python prints `PID={os.getpid()}` and `PORT={port}` to stdout at startup. Rust tracks both PIDs.

### PyO3 Alternative: Embed Python in Rust

Use `pyo3` crate to call Python directly from Rust (no sidecar). Call `Python::with_gil(|py| { ... })` to import modules and invoke functions. Best perf but complex build setup (needs Python headers at compile time).

| Approach | Startup | Performance | Bundle Size | Complexity |
|----------|---------|-------------|-------------|------------|
| PyInstaller sidecar | Slow (1-2s) | IPC overhead | 50-100MB | Low |
| PyO3 embedded | Fast (~100ms) | No IPC | 20-50MB | High (build) |
| System Python | Instant | IPC overhead | 0 (not bundled) | Low (but fragile) |

## Lifecycle Management

### Process Manager

`ProcessManager` struct tracks: child handle, port, PID per sidecar. Key methods:

- `start_all()` -- launch Go + Python sidecars, spawn health check loop
- `shutdown_all()` -- send TCP shutdown cmd, wait 2s, force-kill survivors
- `on_sidecar_crash(which)` -- log warning, restart the crashed sidecar

### Lifecycle State Machine

```
          start()
STOPPED ---------> STARTING
                      |
              stdout handshake received
                      |
                      v
                   RUNNING <----+
                      |         |
              crash detected    | restart()
                      |         |
                      v         |
                   CRASHED -----+
                      |
              max restarts (3) exceeded
                      |
                      v
                    FAILED (alert user)

RUNNING --shutdown()--> STOPPING --timeout--> KILLED
                           |
                     graceful exit
                           |
                           v
                        STOPPED
```

## Common Pitfalls and Failure Modes

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Port conflict | "Address already in use" | Always use port 0 (random) + handshake |
| Zombie processes | CPU/RAM leak after app close | Track PIDs, kill in `on_exit` hook |
| Missing sidecar in dev | "Binary not found" | Build sidecars before `cargo tauri dev` |
| Platform path issues | Works on Mac, fails on Windows | Use Tauri's `resolve_resource` API |
| PyInstaller bootloader PID | Kill signal doesn't stop Python | Track real PID from stdout |
| Go binary too large | 30MB+ binary | Use `-ldflags="-s -w"`, upx compress |
| Python startup slow | 2s delay before sidecar ready | Show loading state, lazy-start if optional |
| Sidecar logs lost | Can't debug sidecar issues | Redirect stderr to log file |
| Different arch in dev vs prod | Works locally, fails in CI build | CI must cross-compile for all targets |
| Sidecar stdin buffer | Messages delayed or lost | Flush after every write, use line buffering |
| gRPC proto mismatch | Serialization errors | Version proto files, generate on build |
| Concurrent sidecar access | Race conditions | Single connection per sidecar, queue requests |
