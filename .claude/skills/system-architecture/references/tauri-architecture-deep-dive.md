# Tauri v2 Architecture Deep Dive

## Core Architecture

```
+---------------------------------------------------------------+
|                        Tauri Application                       |
|                                                                |
|  +-------------------------+  +-----------------------------+  |
|  |     Rust Core Process   |  |    WebView (OS Native)      |  |
|  |  (TRUSTED)              |  |  (UNTRUSTED)                |  |
|  |                         |  |                             |  |
|  |  - App lifecycle        |  |  - HTML/CSS/JS/WASM         |  |
|  |  - File system access   |  |  - React/Vue/Svelte/etc     |  |
|  |  - System APIs          |  |  - No direct OS access      |  |
|  |  - IPC handler          |  |  - Calls Rust via IPC       |  |
|  |  - Plugin host          |  |                             |  |
|  +------------+------------+  +-------------+---------------+  |
|               |         IPC (JSON-RPC)      |                  |
|               +-----------------------------+                  |
+---------------------------------------------------------------+
```

### WebView Backend per OS

| OS | WebView Engine | Notes |
|----|---------------|-------|
| macOS | WKWebView (WebKit) | Ships with OS, always up to date |
| Windows | WebView2 (Chromium) | Must install runtime (~1.5MB bootstrapper) |
| Linux | WebKitGTK | Version depends on distro; oldest = most bugs |

### Binary Size Comparison

| Framework | Hello World Binary | RAM Idle |
|-----------|-------------------|----------|
| Tauri v2 | ~3-8 MB | ~30-50 MB |
| Electron | ~150+ MB | ~100-300 MB |

## IPC Model

Three communication patterns between frontend and Rust:

```
Frontend (JS)                    Rust Core
     |                               |
     |--- invoke("cmd", args) ------>|  Command (request/response)
     |<------ JSON response ---------|
     |                               |
     |--- emit("event", payload) --->|  Event (fire-and-forget)
     |<-- listen("event", handler) --|  Event (reverse direction)
     |                               |
     |--- Channel (streaming) ------>|  Channel (bidirectional stream)
     |<====== stream data ===========|
```

### Decision Table: Which IPC Pattern

| Need | Pattern | Example |
|------|---------|---------|
| Fetch data, get result | Command | Read file, query DB |
| Notify without response | Event | Progress update, state change |
| Stream large data | Channel | File download progress, log tailing |
| Cross-window messaging | Event | Window A notifies Window B |

## Command System

### Basic Command

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

// Register in main
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error running app");
}
```

### Async Command with State

```rust
use tauri::State;
use std::sync::Mutex;

struct AppState {
    db: Mutex<Database>,
}

#[tauri::command]
async fn query_data(
    state: State<'_, AppState>,
    table: String,
) -> Result<Vec<Row>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.query(&table).map_err(|e| e.to_string())
}

// Register state
fn main() {
    tauri::Builder::default()
        .manage(AppState {
            db: Mutex::new(Database::open("app.db").unwrap()),
        })
        .invoke_handler(tauri::generate_handler![query_data])
        .run(tauri::generate_context!())
        .expect("error running app");
}
```

### Frontend Invocation

```ts
import { invoke } from '@tauri-apps/api/core';

// Command call
const result = await invoke<string>('greet', { name: 'World' });

// Event listening
import { listen } from '@tauri-apps/api/event';
const unlisten = await listen('download-progress', (event) => {
  console.log(event.payload); // { percent: 42 }
});
```

### Command Return Types

| Rust Return | JS Receives | Notes |
|-------------|------------|-------|
| `String` | `string` | Direct mapping |
| `Vec<T>` | `T[]` | Auto-serialized via serde |
| `Result<T, E>` | `T` or throws | `Err` becomes JS exception |
| `()` | `null` | No return value |
| Custom struct | `object` | Must derive `Serialize` |

## Plugin System

### Plugin Lifecycle Hooks

```
App Start
  |-> setup()                    // Initialize plugin state
  |-> on_window_created()        // Each new window
  |-> on_navigation()            // URL changes in WebView
  |-> on_event()                 // App events (menu, tray, etc.)
  |-> on_drop()                  // App shutting down
```

### Key Official Plugins

| Plugin | Purpose | Install |
|--------|---------|---------|
| `fs` | File system access | `tauri-plugin-fs` |
| `dialog` | Open/save file dialogs | `tauri-plugin-dialog` |
| `shell` | Run external commands | `tauri-plugin-shell` |
| `store` | Persistent key-value store | `tauri-plugin-store` |
| `sql` | SQLite/MySQL/Postgres | `tauri-plugin-sql` |
| `updater` | Auto-update mechanism | `tauri-plugin-updater` |
| `notification` | OS notifications | `tauri-plugin-notification` |
| `clipboard` | Clipboard read/write | `tauri-plugin-clipboard-manager` |
| `http` | HTTP client from Rust side | `tauri-plugin-http` |
| `log` | Structured logging | `tauri-plugin-log` |

## Permission Model (Capabilities)

### Capability File: `src-tauri/capabilities/default.json`

```json
{
  "identifier": "default",
  "description": "Default app permissions",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "fs:allow-read-text-file",
    "fs:allow-write-text-file",
    {
      "identifier": "fs:scope",
      "allow": [
        { "path": "$APPDATA/**" },
        { "path": "$DOCUMENT/**" }
      ]
    },
    "dialog:allow-open",
    "shell:allow-open"
  ]
}
```

### Permission Scoping

| Scope | Description | Example |
|-------|-------------|---------|
| `$APPDATA` | App-specific data dir | Config files, DB |
| `$DOCUMENT` | User documents folder | User-created files |
| `$DOWNLOAD` | Downloads folder | Downloaded content |
| `$RESOURCE` | Bundled resources | Read-only assets |
| Custom glob | Explicit path pattern | `"/tmp/myapp-*"` |

**Failure mode:** Missing permission = silent failure or JS exception. No runtime prompt to user. Must declare at build time.

## Multi-Window Management

- Create windows: `WebviewWindowBuilder::new(&app, "label", WebviewUrl::App("route".into()))`
- Each window has unique label (string ID)
- Inter-window: `emit_to("window-label", "event", payload)` or `emit_all("event", payload)` for broadcast

## Security Architecture

### Trust Boundary

```
+----------------------------------+
|  UNTRUSTED ZONE (WebView)        |
|  - All JS code                   |
|  - User-supplied content         |
|  - Third-party npm packages      |
|  - Can ONLY call allowed cmds    |
+----------------------------------+
          | IPC (validated)
+----------------------------------+
|  TRUSTED ZONE (Rust)             |
|  - Validates all inputs          |
|  - Enforces permissions          |
|  - Direct OS access              |
|  - Crypto operations             |
+----------------------------------+
```

### CSP and Isolation

- **CSP:** Tauri auto-injects Content Security Policy. Override via `app.security.csp` in `tauri.conf.json`
- **Isolation pattern:** Adds iframe-based isolation between WebView and IPC. Set `app.security.pattern.use: "isolation"`. Recommended for sensitive data apps

## Resource Bundling

| Resource Type | Location | Access |
|--------------|----------|--------|
| Frontend assets | `out/` (built) | Auto-bundled, served by WebView |
| Icons | `src-tauri/icons/` | App icon per platform |
| Sidecar binaries | `src-tauri/binaries/` | External executables |
| Static files | `src-tauri/resources/` | `$RESOURCE` path variable |

### Sidecar Naming Convention

```
src-tauri/binaries/
  my-sidecar-x86_64-apple-darwin          # macOS Intel
  my-sidecar-aarch64-apple-darwin         # macOS ARM
  my-sidecar-x86_64-pc-windows-msvc.exe   # Windows
  my-sidecar-x86_64-unknown-linux-gnu     # Linux
```

## Performance Characteristics

| Operation | Latency | Notes |
|-----------|---------|-------|
| IPC command (small JSON) | ~0.3-0.5ms | JSON serialization overhead |
| IPC command (1MB payload) | ~5-10ms | Use binary IPC for large data |
| Window creation | ~50-100ms | WebView initialization |
| App cold start | ~200-500ms | Depends on frontend bundle size |
| Plugin initialization | ~1-5ms each | Runs sequentially in setup |

### Performance Optimization

- **Lazy load** routes and heavy components
- **Binary IPC** for payloads > 100KB (avoid JSON overhead)
- **Batch commands** instead of many small IPC calls
- **Async commands** -- never block the main thread
- **Pre-warm** windows hidden, show when ready

## Common Pitfalls and Failure Modes

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Missing capability permission | Silent failure or JS error | Add permission to capabilities JSON |
| Sync command blocks main thread | App freezes/hangs | Use `async` on all I/O commands |
| macOS notarization missing | "App is damaged" on user machine | Sign + notarize in CI with Apple certs |
| Windows WebView2 not installed | App won't launch | Bundle WebView2 bootstrapper |
| Linux WebKitGTK version | CSS/JS features missing | Test on Ubuntu LTS minimum |
| Forgot `generate_handler!` | Command exists but 404 from JS | Add command to handler macro |
| State deadlock | App hangs on command | Use `tokio::sync::Mutex` not `std::sync::Mutex` for async |
| Dev server port conflict | Blank window in dev | Configure `devUrl` port in `tauri.conf.json` |
| Large sidecar not bundled | "File not found" at runtime | Check target triple naming matches exactly |
