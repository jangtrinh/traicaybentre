# EaseUI Desktop — Full Scope Architecture

---

## 0. North Star

EaseUI Desktop is a **local-compute design platform** — not a wrapper.

- The **device** is the server
- The **browser** is only the render surface
- **Rust** is the engine
- **Cloud** is optional infrastructure, not a dependency

Everything the web version does via browser APIs, fetch, IndexedDB — the desktop does faster, safer, with full OS access.

---

## 1. System Boundary

```
┌─────────────────────────────────────────────────────────────────────┐
│                      OS  (macOS / Windows / Linux)                  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                       Tauri Application                      │   │
│  │                    (Isolation Pattern ON)                     │   │
│  │                                                              │   │
│  │  ┌───────────────────────┐    ┌──────────────────────────┐  │   │
│  │  │  WebView              │    │  Rust Core               │  │   │
│  │  │  WKWebView / WebView2 │    │                          │  │   │
│  │  │                       │◄───│  • AI Orchestrator       │  │   │
│  │  │  Next.js UI (SSG)     │    │  • Storage Engine        │  │   │
│  │  │  Canvas Renderer      │    │  • Security Manager      │  │   │
│  │  │  Inspector Overlays   │    │  • Sync Engine           │  │   │
│  │  │  Design System UI     │    │  • Canvas State          │  │   │
│  │  │                       │───►│  • Export Pipeline       │  │   │
│  │  └───────────────────────┘    │  • Figma Module          │  │   │
│  │       invoke() / listen()     │  • Design Token Parser   │  │   │
│  │                               │  • Plugin Host           │  │   │
│  │                               └──────────┬───────────────┘  │   │
│  │                                          │                  │   │
│  │                             ┌────────────▼─────────────┐   │   │
│  │                             │  Sidecar Processes        │   │   │
│  │                             │  • ollama  (local LLM)    │   │   │
│  │                             │  • py-worker (ML/vision)  │   │   │
│  │                             │  • figma-bridge           │   │   │
│  │                             └───────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                       │                    │                        │
│           ┌───────────▼──────┐   ┌─────────▼──────────┐            │
│           │   OS Keychain    │   │    File System      │            │
│           │   (API keys)     │   │    (Projects)       │            │
│           └──────────────────┘   └────────────────────┘            │
└─────────────────────────────────────────────────────────────────────┘
                               │
              ┌────────────────▼─────────────────┐
              │         External Services          │
              │  Gemini API · Anthropic · OpenAI   │
              │  Figma REST · Supabase             │
              │  EaseUI Credit Server              │
              └────────────────────────────────────┘
```

---

## 2. Process Model

Three runtime contexts with clear responsibility boundaries.

### 2.1 Rust Core (main process)

The authority. Owns all state, all I/O, all secrets.

- Window lifecycle management
- All Tauri commands (IPC handlers) with **entitlement checks per command** <!-- UPDATED -->
- AI HTTP calls — Credit proxy, BYOK direct, Local Ollama
- SQLite read/write (all project data) via **SQLCipher encryption** <!-- UPDATED -->
- File system operations (HTML, thumbnails, exports)
- OS Keychain reads/writes (API keys, license, auth tokens)
- Sidecar process spawning and supervision (shared-secret auth) <!-- UPDATED -->
- Background task queue (batch generation) with **bounded parallelism** <!-- UPDATED -->
- Event emission to WebView (streaming chunks, sync status)
- Design token parsing (markdown → structured tokens)
- Figma API integration (REST calls with keychain-stored token)
- Export pipeline (HTML cleanup, ZIP bundling)
- License validation (ED25519 signature verification + anti-replay) <!-- UPDATED -->
- Canvas state management (R-tree, artboard positions, layout)

### 2.2 WebView (renderer)

The display surface. No authority over state or I/O.

- Renders Next.js UI (static export, `output: 'export'`)
- Sends commands via `invoke()`
- Receives streaming events via `listen()`
- Manages only UI-local state via Zustand:
  - Selection set, hover state, animation state
  - Modal visibility, sidebar open/close
  - Ephemeral view state (current tab, scroll position)
- Renders HTML artboards inside sandboxed iframes (pointer-events: none)
- Canvas gesture capture (pan/zoom/drag at 60fps via direct DOM transform)
- Inspector overlay rendering (CSS property editor on top of iframes)
- Prompt bar text input and autocomplete
- **Heartbeat ping every 5s for crash detection** <!-- UPDATED -->

### 2.3 Sidecar Processes (spawned on demand)

| Sidecar | Language | Purpose | Communication | Trigger |
|---------|----------|---------|--------------|---------|
| `ollama` | Go (prebuilt) | Local LLM inference | TCP localhost:11434 | User enables Local LM |
| `py-worker` | Python (PyInstaller) | Vision, embeddings, image proc | TCP random port + stdout handshake | Figma import, semantic search |
| `figma-bridge` | Rust binary | Figma plugin bridge server | HTTP localhost:57423 | Figma export/import |

<!-- UPDATED: Sidecar shared-secret auth -->
All sidecar TCP connections authenticated via random shared secret passed through environment variable at spawn time. Rust generates a cryptographic random token, sets it as `EASEUI_SIDECAR_SECRET`, and validates it on every request.

---

## 3. Three Generation Modes

Three modes run independently. User switches at any time, can mix in same workflow.

### 3.1 Mode Comparison

| | ⚡ Credit | 🔑 BYOK | 🦙 Local LM |
|---|---|---|---|
| **Route** | Rust → EaseUI Server → AI | Rust → AI directly | Rust → Ollama sidecar |
| **Cost** | Credits/month | User's API key | Free |
| **Anti-crack** | Server-enforced | N/A | N/A |
| **Offline** | No | No | Yes |
| **Quality** | Best (cloud models) | Depends on provider | Lower than cloud |
| **Privacy** | Prompt → EaseUI server | Prompt → AI directly | 100% local |
| **API key** | Server-side only | OS Keychain (Rust-only) | None |

### 3.2 Network Flow

```
① CREDIT MODE (default, anti-crack)
   Rust ──► POST https://api.easeui.design/generate
            Authorization: Bearer {license_token from Keychain}
            Body: { prompt, model, count }
            Server: validate → reserve credits (atomic) → call AI → stream SSE
   Rust ◄── SSE chunks ──► emit("variant:token") ──► WebView UI

② BYOK MODE (power user)
   Rust reads API key from OS Keychain
   Rust ──► AI Provider directly (key NEVER exposed to WebView)
   Rust ◄── stream ──► emit("variant:token") ──► WebView UI

③ LOCAL LM MODE (offline)
   Rust ──► Ollama sidecar (localhost:11434)
   Rust ◄── stream ──► emit("variant:token") ──► WebView UI
```

### 3.3 Mode Resolution (Rust)

<!-- UPDATED: String → Zeroizing<String> / SecretString for all secrets -->
```rust
use secrecy::SecretString;
use zeroize::Zeroizing;

enum GenerationMode {
    Credit { license_token: Zeroizing<String> },
    Byok   { provider: Provider, key: SecretString },
    Local  { model: String, endpoint: String },
}

async fn resolve_endpoint(mode: &GenerationMode) -> Endpoint {
    match mode {
        Credit { token }       => Endpoint::proxy("https://api.easeui.design/generate", token),
        Byok { provider, key } => Endpoint::direct(provider.api_url(), key),
        Local { endpoint, .. } => Endpoint::local(endpoint),
    }
}
```

---

## 4. AI Orchestration Layer

<!-- UPDATED: bounded parallelism via JoinSet + Semaphore -->
Rust spawns N Tokio tasks with **bounded parallelism** (max 6 concurrent via `Semaphore`). Endpoint changes, orchestration stays identical.

### 4.1 Generation Flow

```
WebView: invoke("generate_variants", { prompt, mode, model, count: 6 })
        │
        ▼ returns { generation_id: string }          ← UPDATED: correlation ID
        │
GenerationOrchestrator (Rust, Tokio)
        ├── resolve_endpoint(mode)
        ├── entitlement_check(mode, user_plan)        ← UPDATED: Rust-side gate
        ├── StyleDirectionCall → emit: generation:styles_ready { generation_id }
        ├── JoinSet + Semaphore(6) × VariantTask      ← UPDATED: bounded
        │   ├── Task 1 → stream → emit: variant:token { generation_id, id:1 }
        │   ├── Task 2 → stream → emit: variant:token { generation_id, id:2 }
        │   └── ...
        └── each complete → emit: variant:complete { generation_id, id, html_path, cost_cents }
```

All generation events include `generation_id` for correlation when multiple generations overlap.

### 4.2 Provider Trait (Rust)

<!-- UPDATED: native async fn, typed errors, enum dispatch, integer cents -->
Ported from TypeScript `LLMProvider` interface (`lib/providers/types.ts`):

```rust
// Typed error enum (thiserror) — no anyhow in provider layer
#[derive(Debug, thiserror::Error)]
enum ProviderError {
    #[error("rate limited, retry after {retry_after_ms}ms")]
    RateLimit { retry_after_ms: u64 },
    #[error("authentication failed: {0}")]
    Auth(String),
    #[error("network error: {0}")]
    Network(#[from] reqwest::Error),
    #[error("generation failed: {0}")]
    GenerationFailed(String),
    #[error("provider overloaded")]
    Overloaded,
}

// Enum dispatch for closed provider set (no dyn trait overhead)
enum Provider {
    CreditProxy(CreditProxyProvider),
    Gemini(GeminiProvider),
    Anthropic(AnthropicProvider),
    OpenAi(OpenAiProvider),
    Ollama(OllamaProvider),
    Custom(CustomProvider),
}

impl Provider {
    // Native async fn — Rust 1.75+, no #[async_trait] needed
    async fn generate_stream(
        &self,
        prompt: &GenerationPrompt,
        config: &GenerateConfig,
        tx: mpsc::Sender<StreamChunk>,
        cancel: CancellationToken,
    ) -> Result<GenerationResult, ProviderError> {
        match self { /* dispatch to inner */ }
    }

    async fn validate_key(&self) -> Result<KeyValidation, ProviderError> {
        match self { /* dispatch to inner */ }
    }

    fn model_name(&self) -> &str { /* ... */ }
    fn calculate_cost_cents(&self, usage: &TokenUsage) -> i64 { /* integer cents */ }
}
```

### 4.3 Engine Functions (Ported from engine.ts)

```rust
mod engine {
    pub async fn analyze_image(...) -> Result<ImageBrief>;
    pub async fn generate_styles(...) -> Result<Vec<String>>;
    pub async fn rewrite_prompt(...) -> Result<String>;
    pub async fn generate_variant(..., tx: Sender<StreamChunk>) -> Result<VariantResult>;
    pub async fn iterate_variant(..., tx: Sender<StreamChunk>) -> Result<VariantResult>;
    pub async fn refine_variant(..., tx: Sender<StreamChunk>) -> Result<RefineResult>;
    pub async fn radical_redesign(..., tx: Sender<StreamChunk>) -> Result<VariantResult>;
    pub async fn generate_variations(...) -> Result<Vec<ComponentVariation>>;
}

mod autofixer {
    pub fn run(html: &str) -> AutofixResult;
    // Rules: viewport-meta, img-onerror, lucide-createicons, cdn-urls, duplicate-ids
}

mod agent_loop {
    pub async fn run(config: AgentConfig, context: Vec<Message>, cancel: CancellationToken) -> Result<AgentResult>;
}
```

### 4.4 Retry & Resilience

| Step | Behavior |
|---|---|
| 1st failure | Retry same endpoint — backoff 1s, 2s, 4s |
| 3 retries exhausted | Credit: server retry. BYOK: fallback model. Local: error. |
| All fail | emit variant:error — other variants unaffected |
| Credit partial fail | Server refunds credits for failed variants |
| Cancellation | Drop Tokio handles → immediate cleanup |

---

## 5. Credit System

### 5.1 Cost Table

| Action | Flash | Pro | Sonnet | Opus/o3 |
|---|---|---|---|---|
| Generate 6 variants | 6 | 18 | 20 | 40–50 |
| Extract DS | 5 | 5 | 5 | 5 |
| Figma import | 10 | 10 | 10 | 10 |
| Component gen | 2 | 2 | 2 | 2 |

### 5.2 Tiers

| Plan | Credits/mo | Price |
|---|---|---|
| Free | 0 | $0 (BYOK/Local only) |
| Starter | 500 | $12/mo |
| Pro | 1,000 | $20/mo |
| Team | 5,000 shared | $79/mo |
| Lifetime | 500/mo | $99 one-time |

### 5.3 Server Flow

```
POST /api/generate { license_token, model, count }
  → validate → atomic reserve credits → call AI → stream SSE
  → on complete: record transaction
  → on partial fail: refund failed variants
```

### 5.4 Supabase Schema

```sql
CREATE TABLE credit_accounts (
    user_id TEXT PRIMARY KEY, balance INTEGER NOT NULL DEFAULT 0,
    plan TEXT NOT NULL, resets_at TIMESTAMPTZ, updated_at TIMESTAMPTZ NOT NULL
);
CREATE TABLE credit_transactions (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL, amount INTEGER NOT NULL,
    type TEXT NOT NULL, ref_id TEXT, model TEXT,
    balance_after INTEGER NOT NULL, created_at TIMESTAMPTZ NOT NULL
);
```

---

## 6. Storage Architecture

### 6.1 Layers

<!-- UPDATED: RwLock, SQLCipher, rusqlite note -->
| Layer | Tech | Stores |
|---|---|---|
| Relational | SQLite via **SQLCipher** (`rusqlite` with `bundled-sqlcipher` feature) | Projects, variants, DS, costs, credits, settings |
| File System | Raw FS | HTML files, thumbnails, exports, token exports |
| Secrets | OS Keychain | API keys, license, auth tokens — NEVER SQLite |
| Memory | `Arc<tokio::sync::RwLock<>>` | Active canvas state, in-flight generation |
| WebView | Zustand | Selection, hover, modals — ephemeral only |

**SQLCipher encryption:** Key derived from OS Keychain. On first launch, generate random 256-bit key, store in Keychain, use as SQLCipher passphrase. All project data encrypted at rest.

**Note:** `rusqlite` with `bundled-sqlcipher` chosen over `sqlx` for SQLite-only use case. Simpler compile-time guarantees, built-in SQLCipher support, used with `spawn_blocking` for async compatibility.

### 6.2 SQLite Schema

<!-- UPDATED: CHECK constraints, cost_cents, html_hash, WAL, indexes, migration table, license_events, project_tags -->
```sql
-- Enable WAL mode for concurrent read/write
PRAGMA journal_mode=WAL;
PRAGMA busy_timeout=5000;

-- Schema version tracking for migrations
CREATE TABLE schema_version (
    version INTEGER NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE projects (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL, name TEXT,
    prompt TEXT NOT NULL,
    mode TEXT NOT NULL CHECK(mode IN ('credit','byok','local')),
    source TEXT,
    model_id TEXT, notes TEXT, folder TEXT, tags TEXT,
    favorite INTEGER DEFAULT 0, color TEXT,
    trashed_at TEXT, archived_at TEXT,
    created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
    cloud_id TEXT,
    sync_status TEXT DEFAULT 'local' CHECK(sync_status IN ('local','synced','pending','conflict'))
);

CREATE TABLE variants (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    style_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('queued','generating','complete','error','cancelled')),
    html_path TEXT NOT NULL, thumb_path TEXT,
    html_hash TEXT,                                          -- ADDED: integrity check
    provider TEXT NOT NULL, model TEXT NOT NULL,
    gen_mode TEXT NOT NULL CHECK(gen_mode IN ('credit','byok','local')),
    prompt_mode TEXT, parent_id TEXT REFERENCES variants(id),
    canvas_x REAL DEFAULT 0, canvas_y REAL DEFAULT 0,
    width REAL DEFAULT 1440, height REAL DEFAULT 900,
    created_at TEXT NOT NULL, tokens_in INTEGER, tokens_out INTEGER,
    cost_cents INTEGER,                                     -- CHANGED: integer cents, not f64
    credits_used INTEGER
);

CREATE TABLE design_systems (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    variant_id TEXT, name TEXT NOT NULL, guidelines TEXT,
    tokens_json TEXT, created_at TEXT NOT NULL, trashed_at TEXT
);

CREATE TABLE design_system_components (
    id TEXT PRIMARY KEY,
    ds_id TEXT NOT NULL REFERENCES design_systems(id) ON DELETE CASCADE,
    name TEXT NOT NULL, html TEXT NOT NULL, created_at TEXT NOT NULL
);

CREATE TABLE cost_records (
    id TEXT PRIMARY KEY,
    project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,   -- CHANGED: SET NULL
    variant_id TEXT,
    call_type TEXT NOT NULL CHECK(call_type IN ('generate','iterate','refine','redesign','extract_ds','figma_import','component')),
    gen_mode TEXT NOT NULL CHECK(gen_mode IN ('credit','byok','local')),
    provider TEXT NOT NULL, model TEXT NOT NULL,
    tokens_in INTEGER NOT NULL, tokens_out INTEGER NOT NULL,
    cost_cents INTEGER NOT NULL,                                  -- CHANGED: integer cents
    credits_used INTEGER, created_at TEXT NOT NULL
);

CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL);

CREATE TABLE sync_log (
    id TEXT PRIMARY KEY,
    entity_type TEXT NOT NULL CHECK(entity_type IN ('project','variant','design_system','component')),
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL CHECK(action IN ('push','pull','conflict','delete')),
    status TEXT NOT NULL CHECK(status IN ('pending','success','failed')),
    error_msg TEXT, created_at TEXT NOT NULL
);

-- ADDED: license audit trail
CREATE TABLE license_events (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL CHECK(event_type IN ('activate','deactivate','refresh','expire','downgrade')),
    plan TEXT, machine_hash TEXT, sequence INTEGER,
    detail TEXT, created_at TEXT NOT NULL
);

-- ADDED: project tagging junction table
CREATE TABLE project_tags (
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    tag TEXT NOT NULL,
    PRIMARY KEY (project_id, tag)
);

-- Indexes
CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_projects_folder ON projects(folder);
CREATE INDEX idx_projects_trashed ON projects(trashed_at) WHERE trashed_at IS NOT NULL;
CREATE INDEX idx_variants_project ON variants(project_id);
CREATE INDEX idx_variants_status ON variants(status);
CREATE INDEX idx_cost_records_project ON cost_records(project_id);
CREATE INDEX idx_cost_records_created ON cost_records(created_at);
CREATE INDEX idx_sync_log_entity ON sync_log(entity_type, entity_id);
CREATE INDEX idx_license_events_type ON license_events(event_type);
CREATE INDEX idx_project_tags_tag ON project_tags(tag);
```

### 6.3 File System Layout

```
~/Library/Application Support/EaseUI/       (macOS)
%APPDATA%/EaseUI/                           (Windows)
~/.config/easeui/                           (Linux)
├── db.sqlite                               (SQLCipher encrypted)
├── projects/{project-id}/
│   ├── canvas.json
│   ├── variants/{variant-id}.html
│   ├── variants/{variant-id}.thumb.png
│   └── design-system/tokens.json, tokens.css, tailwind.config.js, guidelines.md
├── exports/
├── cache/styles/
└── logs/easeui.log
```

---

## 7. IPC Contract (Rust ↔ WebView)

Type-safe via `tauri-specta`. TypeScript types auto-generated from Rust structs.

### 7.1 Commands (WebView → Rust)

<!-- UPDATED: generation_id return, new commands, pagination, validation, GDPR -->
```typescript
// Generation — returns generation_id for event correlation
invoke("generate_variants", { projectId, prompt, mode, provider?, model, count, parentVariantId?, promptMode?, sourceImage?, tasteDials? }) → { generation_id: string }
invoke("iterate_variant", { variantId, adjustmentPrompt, conversationHistory? }) → void
invoke("refine_variant", { variantId }) → void
invoke("radical_redesign", { variantId, prompt }) → void
invoke("cancel_generation", { projectId }) → void
invoke("rewrite_prompt", { prompt, mode }) → string
invoke("analyze_image", { imageBase64, mimeType }) → string
invoke("cleanup_interrupted") → void                       // ADDED: relaunch cleanup

// Projects — with pagination
invoke("list_projects", { filter?, cursor?, limit? }) → Project[]    // CHANGED: pagination
invoke("get_project", { id }) → Project
invoke("create_project", { name, mode }) → Project
invoke("update_project", { id, patch }) → Project
invoke("delete_project", { id }) → void
invoke("trash_project", { id }) → void
invoke("restore_project", { id }) → void
invoke("archive_project", { id }) → void
invoke("duplicate_project", { id }) → Project              // ADDED
invoke("empty_trash") → void

// Variants
invoke("list_variants", { projectId }) → Variant[]
invoke("get_variant", { id }) → Variant                    // ADDED: metadata only, no HTML
invoke("get_variant_html", { id }) → string
invoke("update_variant", { id, patch }) → Variant          // ADDED: rename/reposition
invoke("delete_variant", { id }) → void

// Canvas
invoke("save_canvas_state", { projectId, state }) → void
invoke("load_canvas_state", { projectId }) → CanvasState | null
invoke("query_visible_artboards", { camera, viewportSize }) → string[]
invoke("compute_auto_layout", { artboards, newCount }) → ArtboardRect[]
invoke("compute_snap", { dragId, x, y }) → SnapResult

// Design Systems
invoke("extract_design_system", { variantId }) → void
invoke("get_design_system", { projectId, dsId }) → DesignSystem
invoke("delete_design_system", { projectId, dsId }) → void

// Figma
invoke("import_from_figma", { figmaUrl, projectId? }) → void
invoke("export_to_figma", { variantId }) → void
invoke("validate_figma_token") → { valid, error? }

// Export
invoke("export_html", { variantId }) → string
invoke("export_zip", { projectId }) → string
invoke("export_png", { variantId }) → string
invoke("save_file_dialog", { defaultName, filters }) → string | null

// Secrets (NOTE: NO get_api_key — keys NEVER cross IPC to WebView)
invoke("set_api_key", { provider, key, confirmed }) → void // CHANGED: requires confirmation flag (native dialog in Rust)
invoke("has_api_key", { provider }) → boolean
invoke("delete_api_key", { provider }) → void

// Credits
invoke("get_credit_balance") → CreditCache
invoke("get_credit_history", { limit }) → CreditTransaction[]
invoke("get_cost_summary", { period }) → CostSummary       // ADDED

// License
invoke("get_license_status") → LicenseStatus
invoke("activate_license", { key }) → LicenseStatus
invoke("deactivate_license") → void

// Local Models
invoke("list_local_models") → LocalModel[]
invoke("pull_local_model", { name }) → void
invoke("get_ollama_status") → OllamaStatus

// Settings
invoke("get_settings") → Settings
invoke("update_settings", { patch }) → Settings

// Sync
invoke("sync_now") → void
invoke("get_sync_status") → SyncStatus

// App
invoke("get_app_version") → string
invoke("check_for_updates") → UpdateInfo | null
invoke("install_update") → void
invoke("get_platform") → string
invoke("get_data_dir") → string
invoke("open_url", { url }) → void                         // CHANGED: validates scheme (https:// only)
invoke("ping") → "pong"                                    // ADDED: heartbeat

// GDPR & Compliance
invoke("purge_user_data") → void                           // ADDED: delete all user data
invoke("export_all_data") → string                         // ADDED: returns ZIP path
```

### 7.2 Events (Rust → WebView)

<!-- UPDATED: generation_id on all generation events, heartbeat, sync conflict -->
```typescript
// Generation — all events include generation_id for correlation
listen("generation:styles_ready", { generation_id, styles })
listen("variant:queued",      { generation_id, id, position })
listen("variant:token",       { generation_id, id, chunk, accumulated_len })
listen("variant:section",     { generation_id, id, section_name })
listen("variant:complete",    { generation_id, id, html_path, cost_cents, tokens, credits_used? })
listen("variant:error",       { generation_id, id, error, retrying })
listen("generation:complete", { generation_id, project_id, succeeded, failed })
listen("refine:pass",         { generation_id, variant_id, pass, total })

// Credits
listen("credits:updated",      { balance, used })
listen("credits:insufficient", { required, available })

// Design System
listen("ds:extracting", { project_id })
listen("ds:complete",   { project_id, ds_id })
listen("ds:error",      { project_id, error })

// Figma
listen("figma:progress", { stage, progress })
listen("figma:complete", { project_id })
listen("figma:error",    { error })

// Sync
listen("sync:started",  {})
listen("sync:progress", { entity, action })
listen("sync:complete", { pushed, pulled, conflicts })
listen("sync:error",    { error })
listen("sync:conflict", { project_id, resolution })         // ADDED

// Batch / Local Models / System
listen("batch:started",  { job_id, project_name })
listen("batch:complete", { job_id })
listen("batch:empty",    {})
listen("ollama:pull_progress", { model, progress })
listen("ollama:status",        { running, models })
listen("update:available",     { version, notes })
listen("license:status",       { valid, plan })
listen("heartbeat:missed", { consecutive_misses })          // ADDED: crash detection
```

---

## 8. Canvas Architecture

### 8.1 Ownership Split

**Rust owns:** R-tree (`rstar`), artboard positions, spatial queries, auto-layout, snap computation — protected by `Arc<tokio::sync::RwLock<>>`. <!-- UPDATED -->
**WebView owns:** Camera transform (60fps CSS), gesture capture, iframe rendering, selection overlays.

### 8.2 Hybrid Protocol

```
60fps gesture → WebView updates CSS transform locally (NO IPC)
Gesture settles (100ms) → invoke("query_visible_artboards") → Rust R-tree (read lock) → visible IDs
Artboard drag → invoke("compute_snap") → Rust snap calc (read lock) → snapped position + lines
Layout change → Rust updates R-tree (write lock) → emit("canvas:layout_changed")
```

### 8.3 LOD Tiers

| Tier | Zoom | Rendering |
|---|---|---|
| T1 | < 15% | Colored rect + label (dominant color extracted) |
| T2 | 15–40% | Pre-rendered PNG thumbnail from filesystem |
| T3 | 40–80% | Frozen iframe, no JS |
| T4 | > 80% | Full iframe |

Thumbnails: rendered in WebView after variant completes → PNG sent to Rust → saved to filesystem.

---

## 9. Security Architecture

### 9.1 Threat Model

<!-- UPDATED: expanded with STRIDE findings -->
| Threat | Category | Mitigation |
|---|---|---|
| API key extraction | Spoofing | Keys NEVER cross IPC to WebView. NO `get_api_key` command. |
| License bypass | Elevation | Credit mode server-enforced. Bypass gets BYOK/Local (already free). |
| XSS from AI HTML | Tampering | Iframes sandboxed, CSP connect-src 'none', no IPC bridge |
| Binary patching | Tampering | Accepted. Server credits unaffected. Auto-update replaces binary. |
| MITM | Info Disclosure | TLS via reqwest. **Cert pinning for api.easeui.design** (v1.0) |
| Memory dump | Info Disclosure | `zeroize` + `secrecy` crates: zero keys after HTTP call |
| WebView DevTools | Info Disclosure | Disabled in release builds |
| IPC command abuse | Elevation | **Entitlement checks in Rust** per command, not UI-only gating |
| Sidecar hijack | Spoofing | **Shared-secret auth** (random token via env var) |
| Prompt injection | Tampering | **Max prompt 100KB**, input validation in Rust |
| Malicious URL open | Tampering | **URL scheme whitelist** (https:// only) in `open_url` |
| XSS-driven key overwrite | Elevation | **Rate-limit + native OS dialog** for `set_api_key` |
| License replay | Replay | **Monotonic sequence** + last-seen stored in Keychain |
| Telemetry data leak | Info Disclosure | **Sentry `before_send`** scrubs prompts, HTML, keys |
| SQLite data at rest | Info Disclosure | **SQLCipher** with key from OS Keychain |

**Tauri Isolation Pattern:** Enabled at v1.0. Runs IPC through a secure isolation script, preventing direct WebView-to-Rust bridge access from injected code.

**Iframe CSP whitelist:** Allow `fonts.googleapis.com`, `cdn.jsdelivr.net`, `cdnjs.cloudflare.com` for design resource loading. All other external domains blocked.

**Capability scoping:** Separate Tauri capability configs per window type (main, preview, settings). Preview windows have minimal command access.

**`PRAGMA integrity_check`** on startup to detect SQLite corruption before operating.

### 9.2 Ship-Blocking Requirements

<!-- UPDATED: expanded to 16 items -->
1. OS Keychain for ALL secrets
2. WebView DevTools disabled in release
3. CSP: no `unsafe-inline`, no `unsafe-eval`
4. macOS code signing + notarization
5. Windows code signing (EV recommended)
6. Tauri updater with signed payloads
7. AI HTML in isolated iframe (no IPC)
8. Server-side credit enforcement
9. ED25519 license + machine fingerprint + anti-replay sequence + 90-day offline cache
10. Strip symbols, disable backtraces in release
11. **Tauri Isolation Pattern enabled**
12. **Cert pinning for api.easeui.design**
13. **Input validation: max prompt 100KB, URL scheme whitelist**
14. **Entitlement checks in every Rust command handler**
15. **Separate ED25519 keypairs for license signing vs update signing**
16. **WebView heartbeat mechanism (ping/crash dialog)**

---

## 10. License Architecture

<!-- UPDATED: anti-replay, separate keypairs, offline cache -->
```rust
struct LicenseBlob {
    user_id: String, plan: Plan, machine_hash: String,
    issued_at: i64, expires_at: i64, max_devices: u8,
    sequence: u64,          // Monotonic — prevents replay attacks
    signature: Vec<u8>,
}
// Activation: POST /api/licenses/activate → signed blob
// Validation: verify ED25519 → check expiry → check machine hash → check sequence
// Refresh: silent POST every 30 days
// Anti-replay: store last_seen_sequence in Keychain, reject sequence <= last_seen
// Offline cache: 90-day validity (30-day warning, 90-day degrade to BYOK/Local)
```

**Separate keypairs:** Independent ED25519 keypairs for license signing and update signing. Compromise of one does not affect the other.

| Tier | Access | License |
|---|---|---|
| Free | BYOK + Local only | No |
| Pro | Credits + all modes | Polar key |
| Team | Shared credits | N-seat key |
| Lifetime | 500 credits/mo | $99 one-time |

---

## 11. Sync Architecture

Local = primary. Cloud = backup + cross-device.

### What Syncs

| Data | Syncs | Why |
|---|---|---|
| Project metadata | Yes | Cross-device |
| Variant HTML | Yes | Core content |
| Design systems | Yes | Core content |
| Canvas positions | Yes | UX continuity |
| Cost records | Yes | History |
| API keys | NEVER | Security |
| Thumbnails | No | Re-generated |

### Sync Logic (Rust)

Ported from sync.ts: 3s debounced dirty tracking, gzip for >1MB, RLS collision detection with auto-fork, merged pull with per-artifact strategy (cloud HTML > local pruned).

<!-- UPDATED -->
**Conflict resolution:** LWW (last-writer-wins) for metadata. HTML conflicts fork into separate variants with notification via `sync:conflict` event. User resolves manually.

---

## 12. Export Pipeline (Rust)

HTML cleanup via `html5ever`: DOCTYPE, charset, viewport, lang, alt attrs, rel noopener, minify.

ZIP bundle: variants/ + design-system/ + components/ + meta.json + README.md

Native Figma bridge: localhost:57423, plugin polls GET /payload. No clipboard.

---

## 13. Distribution

<!-- UPDATED: WebView2 bootstrapper, Linux WebKitGTK, sidecar builds, rollback, audits -->
| Platform | Format | Arch | Notes |
|---|---|---|---|
| macOS | `.dmg` universal | arm64 + x86_64 | |
| Windows | `.msi` + `.exe` | x86_64 | **WebView2 Evergreen bootstrapper bundled** |
| Linux | `.AppImage` + `.deb` + `.rpm` | x86_64 | **Min WebKitGTK 2.42+** |

CI/CD: GitHub Actions + `tauri-action`. Auto-update: signed ED25519 payloads (separate key from license signing).

- **Sidecar platform-specific builds:** CI matrix builds `ollama`, `py-worker`, `figma-bridge` per platform/arch
- **Rollback strategy:** Keep previous binary version on disk; if update fails health check, restore previous
- **CI security gates:** `cargo audit` + `npm audit` run on every PR; block on critical/high findings

---

## 14. Technology Registry

<!-- UPDATED: secrecy, sqlcipher, parking_lot, removed wasmtime from v1.0 -->
| Layer | Tech | Crate | Notes |
|---|---|---|---|
| Shell | Tauri 2.x | `tauri` | Isolation Pattern enabled |
| IPC types | tauri-specta | `tauri-specta` | |
| Async | Tokio | `tokio` | |
| HTTP | reqwest | `reqwest` | Cert pinning for api.easeui.design |
| DB | SQLite + SQLCipher | `rusqlite` (`bundled-sqlcipher`) | Preferred over `sqlx` for SQLite-only |
| Secrets | Keychain | `keyring` | |
| Secret types | secrecy | `secrecy` | **ADDED** — `SecretString`, `Zeroizing` |
| Serde | JSON | `serde`, `serde_json` | |
| Errors | thiserror + anyhow | `thiserror`, `anyhow` | thiserror in providers, anyhow in commands |
| Logging | tracing | `tracing`, `tracing-appender` | |
| Crypto | ED25519 | `ed25519-dalek` | Separate keypairs for license + update |
| Memory | zeroize | `zeroize` | |
| ZIP | zip | `zip`, `flate2` | |
| HTML | html5ever | `html5ever` | |
| Spatial | R-tree | `rstar` | |
| Locks | parking_lot | `parking_lot` | **ADDED** — faster RwLock if needed |
| Crash | Sentry | `sentry` | `before_send` PII scrubbing |
| UI | Next.js 15 SSG | — | |
| UI State | Zustand | `zustand` | |
| CSS | Tailwind 4 | — | |
| Gestures | @use-gesture | — | |

**Deferred to v2.0:** `wasmtime` (WASM plugin host) — adds ~10MB to binary, not needed until plugin platform.

---

## 15. Database Migration Strategy

<!-- NEW SECTION -->

Embedded forward-only migrations, run on every app startup before any DB access.

- **Embedding:** `include_str!("../migrations/NNN_name.sql")` compiled into binary
- **Version tracking:** `schema_version` table — `(version INT, applied_at TEXT)`
- **Execution:** Compare max applied version vs available migrations, apply in order
- **Forward-only:** No rollback; migration failure shows error dialog and exits
- **Safety:** Auto-backup `db.sqlite` before applying; CI tests migrations against previous schema versions

---

## 16. Testing Strategy

<!-- NEW SECTION -->

### Unit Tests
- `mockall` for provider trait mocking (test generation without HTTP calls)
- `proptest` for spatial queries (random artboard positions, zoom levels)
- `insta` for layout snapshot testing (deterministic auto-layout results)

### Integration Tests
- In-memory SQLite for storage layer tests (no SQLCipher in test mode)
- `wiremock` for HTTP mock servers (provider API responses, credit server)
- Mock sidecar binaries (respond to health check, return canned responses)

### E2E Tests
- Tauri test driver for full IPC round-trips (command → event → assertion)
- Headless WebView for canvas interaction tests

### Security Tests
- Fuzz IPC command inputs (malformed JSON, oversized prompts, invalid enums)
- Test iframe sandbox escape attempts
- Verify no secrets in Sentry payloads

### Performance
- `criterion` benchmarks for R-tree queries (1000+ artboards), streaming throughput, SQLite batch writes
- Regression threshold: fail CI if benchmark degrades >10%

### CI Gates
- `cargo audit` — block on critical/high
- `npm audit` — block on critical/high
- `cargo clippy -- -W clippy::pedantic`
- Benchmark regression check

---

## 17. Error Recovery & Resilience

<!-- NEW SECTION -->

| Scenario | Detection | Recovery |
|---|---|---|
| **WebView crash** | Heartbeat `ping` every 5s, 3 consecutive misses | Native crash dialog: restart WebView or quit |
| **Interrupted generation** | `cleanup_interrupted` on relaunch | Mark zombie `generating` variants as `error`, clean temp files |
| **SQLite corruption** | `PRAGMA integrity_check` on startup | Show error dialog, offer to restore from last backup or Supabase |
| **Keychain access denied** | `keyring` error on read | Fallback: encrypted file with user passphrase (prompt via native dialog) |
| **Ollama OOM** | Check available RAM before launch | Warn if <8GB available, suggest smaller model or abort |
| **Sync conflict** | Supabase RLS collision + timestamp comparison | LWW for metadata, fork HTML variants, notify user via `sync:conflict` |
| **Sidecar crash** | Process exit code monitoring | Auto-restart once, then show error; cleanup orphaned TCP ports |
| **Update failure** | Health check after update | Rollback to previous binary kept on disk |

---

## 18. GDPR & Compliance

<!-- NEW SECTION -->

**`purge_user_data`:** Deletes SQLite DB, all files (projects/thumbnails/exports/cache/logs), OS Keychain entries, Supabase records (authenticated DELETE), Sentry data.

**`export_all_data`:** ZIP archive of all projects + variant HTML, design systems, settings, cost history (CSV), metadata manifest (JSON). Returns path to ZIP.

**Telemetry:** Sentry opt-in only, `before_send` scrubs prompts/HTML/keys/paths. Usage telemetry separate from crash reporting, anonymous, opt-in. Supabase region selectable (EU/US/APAC).

---

## 19. Migration Map: TypeScript → Rust

### Moves to Rust

| File | Lines | Rust Module | Priority |
|---|---|---|---|
| `lib/engine.ts` | 2,594 | `engine/mod.rs` | P0 |
| `lib/engine/*.ts` | 1,321 | `engine/` | P0 |
| `lib/providers/*.ts` | 1,198 | `providers/` | P0 |
| `lib/store.ts` | 630 | `storage/projects.rs` | P0 |
| `lib/db.ts` | 148 | `storage/sqlite.rs` | P0 |
| `lib/sync.ts` | 505 | `sync/` | P1 |
| `lib/figma.ts` | 979 | `figma/import.rs` | P1 |
| `lib/figma-export.ts` | 2,281 | `figma/export.rs` | P1 |
| `lib/design-tokens.ts` | 1,163 | `tokens/` | P1 |
| `lib/canvas-math.ts` | 453 | `canvas/` | P2 |
| `lib/color-utils.ts` | 308 | `tokens/color.rs` | P2 |
| `lib/export.ts` | ~300 | `export/` | P2 |
| `lib/usage.ts` | ~300 | `usage.rs` | P2 |

**Total: ~12,180 lines → Rust**

### Stays in WebView

| File | Lines | Reason |
|---|---|---|
| All `*.tsx` components | ~50,000+ | React rendering |
| `hooks/use-canvas.ts` | 480 | 60fps gesture capture |
| `hooks/use-canvas-gestures.ts` | 142 | Pointer/wheel events |
| `properties-inspector.tsx` | 1,828 | Probes iframe DOM |
| `inject-selector.ts` | 1,341 | Injects CSS into iframes |
| `editor/[id]/page.tsx` | 2,950+ | React orchestration |
| `stream-parser.ts` | ~200 | Processes event chunks |

---

## 20. Rust Project Structure

```
src-tauri/src/
├── main.rs
├── commands/          # IPC handlers
│   ├── generation.rs, projects.rs, canvas.rs, export.rs
│   ├── figma.rs, design_system.rs, secrets.rs, credits.rs
│   ├── license.rs, local_models.rs, settings.rs, sync.rs, app.rs
│   ├── compliance.rs  # GDPR: purge_user_data, export_all_data
├── engine/            # AI generation (from engine.ts)
│   ├── orchestrator.rs, prompts.rs, pipeline.rs, agent_loop.rs
│   ├── autofixer.rs, validator.rs, stream.rs
├── providers/         # LLM adapters (enum dispatch)
│   ├── gemini.rs, anthropic.rs, openai.rs, ollama.rs
│   ├── custom.rs, credit_proxy.rs, error.rs
├── storage/           # Data layer
│   ├── sqlite.rs, migrations.rs, projects.rs, variants.rs
│   ├── design_systems.rs, cost_records.rs, settings.rs
├── sync/              # Cloud sync
│   ├── push.rs, pull.rs, merge.rs, conflict.rs
├── figma/             # Figma integration
│   ├── api.rs, import.rs, export.rs, bridge.rs
├── tokens/            # Design tokens
│   ├── parser.rs, color.rs, export.rs
├── canvas/            # Canvas state (RwLock-protected)
│   ├── rtree.rs, layout.rs, snap.rs, transforms.rs
├── security/          # Security layer
│   ├── keychain.rs, license.rs, capabilities.rs, validation.rs
├── sidecar/           # External processes
│   ├── ollama.rs, py_worker.rs, figma_bridge.rs, auth.rs
├── export/            # Export pipeline
│   ├── html.rs, zip.rs, thumbnail.rs
├── usage.rs, models.rs, types.rs, error.rs
```

---

## 21. Version Milestones

### v1.0 — Full Desktop with Rust Core

All state, I/O, secrets in Rust. Credit + BYOK modes. SQLCipher + filesystem. OS Keychain. Bounded Tokio generation (JoinSet + Semaphore). License validation with anti-replay. Native dialogs. Auto-updater. Code signing. **Tauri Isolation Pattern. Cert pinning. Input validation. Entitlement checks. Heartbeat. GDPR commands. Separate signing keys.**

### v1.5 — Local Compute + Power Features

Ollama sidecar (Local LM). Batch queue. Native Figma bridge. Thumbnails. Python sidecar. Semantic search.

### v2.0 — Platform

**WASM plugins (wasmtime).** Team credits. Multiplayer. Desktop-to-web sync.

---

*EaseUI Desktop Architecture — Updated 2026-03-29*
*Rust Core · Credit · BYOK · Local LM · Tauri 2 · SQLCipher · Next.js 15 SSG*
