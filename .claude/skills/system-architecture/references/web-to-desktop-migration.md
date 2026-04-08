# Web-to-Desktop Migration: Next.js + Supabase + Vercel to Tauri

## Migration Strategy Overview

```
+-------------------------------------------------------------+
|                    BEFORE (Web Only)                         |
|  Browser -> Next.js (Vercel) -> Supabase Cloud              |
+-------------------------------------------------------------+
                          |
                          v
+-------------------------------------------------------------+
|                    AFTER (Hybrid)                            |
|  +------------------+    +-------------------------------+  |
|  | Web (Vercel)     |    | Desktop (Tauri)               |  |
|  | Next.js SSR/SSG  |    | Next.js SSG + Rust Core       |  |
|  |                  |    | SQLite local + PowerSync       |  |
|  +--------+---------+    +---------------+---------------+  |
|           |                              |                  |
|           +------------ + ---------------+                  |
|                         |                                   |
|                  Supabase Cloud                              |
|           (Auth, Real-time, Storage, Edge Fn)               |
+-------------------------------------------------------------+
```

### What Goes Where

| Component | Stays Cloud | Moves Local | Bridges Both |
|-----------|------------|-------------|--------------|
| Auth | Supabase Auth | Session token cache | Token refresh logic |
| Database reads | Real-time subscriptions | SQLite (offline data) | PowerSync |
| Database writes | Edge Functions | Local write queue | PowerSync upload |
| File storage | Supabase Storage | Local FS cache | Download-on-demand |
| API routes | Edge Functions | Rust commands | IPC layer |
| Static assets | CDN | Bundled in app | -- |
| Environment config | Vercel env vars | `tauri.conf.json` | Shared `.env` schema |

## Next.js SSG Requirement

Tauri embeds a WebView rendering static files. No Node.js server runs inside Tauri.

### Required `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // MANDATORY for Tauri
  images: {
    unoptimized: true,     // No image optimization server
  },
  // No rewrites, no redirects (they need server)
};
module.exports = nextConfig;
```

### What Breaks with SSG

| Feature | Status | Workaround |
|---------|--------|------------|
| `getServerSideProps` | Breaks | Move to client-side fetch or Rust command |
| API routes (`/api/*`) | Breaks | Replace with Rust `#[tauri::command]` |
| Middleware | Breaks | Move logic to client or Rust |
| `next/image` optimization | Breaks | Use `unoptimized: true` |
| Dynamic routes (`[slug]`) | Works | Must use `generateStaticParams` |
| `useSearchParams` | Works | Client-side only |
| `next/font` | Works | Fonts bundled at build |

## Shared Codebase: Monorepo Strategy

```
project-root/
  turbo.json
  packages/
    shared/           # UI components, hooks, types, utils
      src/
        hooks/
          use-auth.ts        # Platform-agnostic auth hook
          use-data.ts        # Abstracts Supabase vs SQLite
        components/          # Shared React components
        types/               # Shared TypeScript types
        platform.ts          # Platform detection
  apps/
    web/              # Next.js (SSR + SSG, deployed to Vercel)
      next.config.js  # Standard config
    desktop/          # Next.js (SSG only) + Tauri
      next.config.js  # output: 'export'
      src-tauri/      # Rust backend
        src/
          main.rs
        tauri.conf.json
        Cargo.toml
```

### `turbo.json`

```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"] },
    "web#build": { "outputs": [".next/**"] },
    "desktop#build": { "outputs": ["out/**", "src-tauri/target/**"] },
    "shared#build": { "outputs": ["dist/**"] }
  }
}
```

## Dual-Mode Detection

```ts
// packages/shared/src/platform.ts
export type Platform = 'web' | 'desktop';

export function getPlatform(): Platform {
  if (typeof window !== 'undefined' && '__TAURI__' in window) {
    return 'desktop';
  }
  return 'web';
}

export function isDesktop(): boolean {
  return getPlatform() === 'desktop';
}

// Usage in hooks
export function useData(table: string) {
  if (isDesktop()) {
    return useLocalSQLite(table);   // PowerSync / SQLite
  }
  return useSupabaseQuery(table);   // Direct Supabase client
}
```

## Cloud vs Local: Decision Matrix

| Question | Cloud (Supabase) | Local (SQLite/FS) |
|----------|-----------------|-------------------|
| Needs real-time multi-user? | Yes | No |
| Works offline? | No | Yes |
| Sensitive user data? | Encrypted at rest | User controls storage |
| Large binary files? | Storage buckets | Local filesystem |
| Auth tokens? | Issues tokens | Caches tokens |
| Business logic validation? | Edge Functions | Rust commands |

## Bridge Layer: PowerSync for Sync

```
+----------------+          +----------------+          +------------------+
| SQLite (local) | <------> | PowerSync SDK  | <------> | Supabase (cloud) |
| Source of truth |          | Sync engine    |          | Sync peer        |
| for desktop    |          | Conflict res.  |          | Auth + storage   |
+----------------+          +----------------+          +------------------+
```

Setup steps:
1. Install: `npm install @powersync/web @powersync/supabase`
2. Define sync rules in PowerSync dashboard (which tables, which columns)
3. Initialize in app with Supabase credentials
4. All reads go to local SQLite; writes queue and sync

## Environment Variable Strategy

| Context | Mechanism | Example |
|---------|-----------|---------|
| Vercel (web) | Vercel dashboard env vars | `NEXT_PUBLIC_SUPABASE_URL` |
| Tauri dev | `.env` file in `apps/desktop/` | Same key names |
| Tauri prod | Compile-time embed or `tauri.conf.json` | Baked into binary |
| Rust side | `std::env::var` or build script | `env!("API_KEY")` at compile |

**Key difference:** Tauri has no server runtime. `process.env` only works at build time for the frontend. Use `NEXT_PUBLIC_` prefix for anything the WebView needs.

## Migration Phases

| Phase | Goal | Deliverable | Risk |
|-------|------|-------------|------|
| 1. SSG Export | Next.js builds static | `next build && next export` passes | Medium: SSR deps break |
| 2. Tauri Shell | App opens in native window | Desktop app shows web UI | Low |
| 3. Rust Commands | Replace API routes | IPC calls work end-to-end | Medium: type mismatches |
| 4. Offline Data | SQLite + local reads | App works without network | High: schema migration |
| 5. Sync | PowerSync bidirectional | Data syncs on reconnect | High: conflict resolution |
| 6. Distribution | Signed installers | CI builds for 3 platforms | Medium: code signing |

### Phase 1 Checklist

- [ ] Add `output: 'export'` to `next.config.js`
- [ ] Remove all `getServerSideProps` / `getInitialProps`
- [ ] Replace API routes with client-side alternatives
- [ ] Remove middleware
- [ ] Set `images.unoptimized: true`
- [ ] Run `next build` -- fix all errors
- [ ] Verify `out/` directory serves correctly via static file server

## Common Pitfalls and Failure Modes

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Dynamic imports with `ssr: false` | Build fails or blank page | Use `next/dynamic` with `{ ssr: false }` only for desktop-specific code |
| `window is undefined` | Build crash in SSG | Guard with `typeof window !== 'undefined'` |
| CORS in Tauri dev | 403/blocked requests | Configure `tauri.conf.json` `allowlist` or use Rust proxy command |
| WebView differences per OS | Layout breaks on Linux | Test on all 3 OS; WebKitGTK lags behind Safari WebKit |
| `next/link` prefetch | 404 on static export | Set `prefetch={false}` or ensure all pages are statically generated |
| Large bundle in WebView | Slow app startup | Code-split aggressively; lazy-load routes |
| Node.js APIs in browser code | Runtime crash | Move to Rust commands; never import `fs`, `path` in frontend |
| Auth redirect loops | Infinite redirect in desktop | Use deep links (`tauri://`) for OAuth callbacks |

## Failure Mode: Network Transition

```
State Machine: Online <-> Offline

ONLINE:
  - PowerSync syncing normally
  - Supabase real-time active
  - Writes go to local + queue upload

TRANSITION TO OFFLINE:
  - PowerSync detects disconnect
  - Writes continue to local SQLite
  - Upload queue grows (bounded, drop oldest if > 10K ops)
  - UI shows "offline" indicator

TRANSITION TO ONLINE:
  - PowerSync reconnects, replays queue
  - Conflicts resolved per sync rules
  - UI shows "syncing..." then "synced"

FAILURE: Queue overflow
  - Log warning, drop oldest non-critical ops
  - Keep user-generated content ops (never drop)
  - Alert user if critical ops dropped
```
