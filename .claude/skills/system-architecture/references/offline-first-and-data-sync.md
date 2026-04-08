# Offline-First Architecture and Data Sync

## Local-First Principles

Seven ideals (from Ink & Switch research):

| # | Ideal | Meaning |
|---|-------|---------|
| 1 | Fast | No network round-trips for reads; sub-ms local queries |
| 2 | Multi-device | Same data on laptop, phone, tablet |
| 3 | Offline | Full functionality without connectivity |
| 4 | Collaboration | Multiple users edit shared data concurrently |
| 5 | Longevity | Data outlives the app/service; no vendor lock-in |
| 6 | Privacy | Data stays on user device by default |
| 7 | User control | User owns and can export their data |

## Architecture Overview

```
+------------------------------------------------------------------+
|                      Desktop App (Tauri)                          |
|                                                                   |
|  +--------------------+     +------------------------------+     |
|  |   React Frontend   |     |     Rust Core                |     |
|  |                    |     |                              |     |
|  |  PowerSync SDK ----+-----+-> SQLite (local)             |     |
|  |  (reads/writes)    |     |   Source of truth            |     |
|  +--------------------+     +------------------------------+     |
|                                        |                          |
+----------------------------------------|--------------------------+
                                         |  Sync (when online)
                                         v
                              +---------------------+
                              |   PowerSync Service  |
                              |   (sync gateway)     |
                              +---------+-----------+
                                        |
                                        v
                              +---------------------+
                              |   Supabase Cloud     |
                              |   (Postgres + Auth)  |
                              +---------------------+
```

**Key insight:** Local SQLite is the source of truth. Cloud is a sync peer, NOT the authority. App works identically online or offline.

## PowerSync + Supabase Setup

### 1. Sync Rules (PowerSync Dashboard)

```yaml
# sync-rules.yaml
bucket_definitions:
  user_data:
    parameters:
      - SELECT token->>'user_id' AS user_id FROM token_parameters
    data:
      - SELECT id, title, content, updated_at
        FROM notes
        WHERE user_id = bucket.user_id
      - SELECT id, name, created_at
        FROM projects
        WHERE user_id = bucket.user_id
```

### 2. Client Setup

```ts
import { PowerSyncDatabase } from '@powersync/web';
import { SupabaseConnector } from './supabase-connector';

const schema = new Schema([
  new Table({
    name: 'notes',
    columns: [
      new Column({ name: 'title', type: ColumnType.TEXT }),
      new Column({ name: 'content', type: ColumnType.TEXT }),
      new Column({ name: 'updated_at', type: ColumnType.TEXT }),
    ],
  }),
]);

const db = new PowerSyncDatabase({
  schema,
  database: { dbFilename: 'app.sqlite' },
});

const connector = new SupabaseConnector();
await db.connect(connector);
```

### 3. Read/Write Flow

```
WRITE: User edits a note
  1. Write to local SQLite immediately (instant UI update)
  2. PowerSync adds op to upload queue
  3. When online: queue drains to Supabase via connector
  4. Supabase applies write to Postgres
  5. Change propagates back via sync to other devices

READ: User opens note list
  1. Query local SQLite directly (no network)
  2. PowerSync keeps SQLite updated in background
  3. New data appears via reactive queries (live updates)
```

## Conflict Resolution Strategies

### Decision Matrix

| Strategy | Complexity | Data Loss Risk | Best For |
|----------|-----------|----------------|----------|
| Last-Write-Wins (LWW) | Low | Medium | Single-user, non-critical |
| Field-level merge | Medium | Low | Multi-field records |
| CRDTs | High | None | Real-time collaboration |
| App-level rules | Medium | Depends | Domain-specific logic |

### Last-Write-Wins (LWW)

```
Device A: UPDATE note SET title='A' WHERE id=1  (t=100)
Device B: UPDATE note SET title='B' WHERE id=1  (t=101)

Result: title='B' wins (later timestamp)
```

**Failure mode:** Clock drift between devices causes wrong winner. Mitigation: use server-assigned timestamps or hybrid logical clocks.

### Field-Level Merge

```
Device A: UPDATE note SET title='New Title'   (t=100)
Device B: UPDATE note SET content='New Body'  (t=101)

Result: title='New Title', content='New Body' (no conflict -- different fields)
```

Implementation: track per-field timestamps, merge non-conflicting fields.

### CRDTs (Conflict-free Replicated Data Types)

```
Options:
  - Automerge: Document-oriented, JSON-like structure
  - Yjs: Optimized for text editing, real-time collab
  - cr-sqlite: CRDT extensions for SQLite (merge at DB level)

Use when: Multiple users edit same document simultaneously
Skip when: Single-user app or turn-based editing
```

### Application-Level Resolution

```ts
// Example: business rule decides conflict
async function resolveConflict(local: Note, remote: Note): Promise<Note> {
  // Rule: if remote has more content, prefer it
  if (remote.content.length > local.content.length) {
    return remote;
  }
  // Rule: if local has unsaved edits (dirty flag), keep local
  if (local.isDirty) {
    return local;
  }
  // Default: LWW
  return local.updatedAt > remote.updatedAt ? local : remote;
}
```

## Sync Engine Design

### Batch Operations

Buffer writes for 50-200ms, merge into batches (max 100 ops or 1MB), flush on timer/max/app-background.

### Idempotent Operations

Every op gets UUID v7 (time-sorted). Server deduplicates by `op_id` -- if already processed, skip.

### Watermark-Based Catch-Up

Client stores last sync watermark (oplog position). On reconnect, sends watermark; server returns all ops since that position.

## Data Model Considerations

### What to Sync

| Sync? | Data Type | Reason |
|-------|-----------|--------|
| Yes | User-created content | Core value, must work offline |
| Yes | User settings/preferences | Consistent cross-device experience |
| Partial | Shared/team data | Only sync what user has access to |
| No | Analytics/telemetry | Write-only, no need locally |
| No | Cached API responses | Re-fetch when online |
| No | Auth tokens | Security risk; re-authenticate |

### Partial Sync Pattern

```
Don't sync entire database. Scope by:
  1. User ID (most common)
  2. Project/workspace membership
  3. Recent time window (last 30 days)
  4. Explicit "make available offline" flag

Reduces: storage, sync time, bandwidth, conflict surface
```

## Queue Management

### Retry with Exponential Backoff

```
Attempt 1: immediate
Attempt 2: 1s delay
Attempt 3: 2s delay
Attempt 4: 4s delay
Attempt 5: 8s delay
...
Max delay: 5 minutes
Max attempts: 20

After max attempts -> move to dead letter queue
```

### Dead Letter Handling

After max retries, move to dead letter queue. Auto-retry hourly, notify user of failed changes. Cap at 1000 entries -- alert user, allow manual retry or discard.

## Migration: Cloud-Only to Offline-First

### Progressive Adoption (4 Phases)

| Phase | What Changes | Rollback Safe? |
|-------|-------------|----------------|
| 1. Add SQLite | Local cache, reads still from cloud | Yes |
| 2. Read local | Reads from SQLite, writes to cloud | Yes |
| 3. Write local | Writes to SQLite + sync queue | Careful |
| 4. Full offline | SQLite is source of truth | No |

### Phase 1 Detail

```ts
// Reads: still from Supabase
// But also populate local SQLite as cache
const { data } = await supabase.from('notes').select('*');
await localDb.execute('INSERT OR REPLACE INTO notes ...', data);

// Benefit: if offline later, cache is available
// Risk: none (cache only, cloud still authoritative)
```

## Testing Sync

### Test Scenarios

| Scenario | How to Simulate | What to Verify |
|----------|----------------|----------------|
| Network partition | Disable WiFi / mock fetch | Writes queue locally, UI works |
| Reconnect after hours | Offline 2h, make changes both sides | All changes sync, no data loss |
| Clock skew | Set device clock +/- 5 min | LWW still behaves correctly |
| Concurrent edits | Two devices edit same record | Conflict resolution applies |
| Large queue replay | 500+ queued ops, reconnect | Queue drains without timeout |
| Server down | Mock 503 responses | Backoff works, no crash loops |
| Schema migration | Add column during offline period | Sync handles schema diff |

### Test Tooling

```
- PowerSync devtools: inspect sync state, queue depth
- SQLite browser: verify local data integrity
- Network conditioner (macOS): simulate latency, packet loss
- Playwright + offline mode: E2E test offline flows
```

## Common Pitfalls and Failure Modes

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Assuming always online | App crashes on first offline use | Default to local read, sync in background |
| Ignoring clock drift | Wrong conflict winner | Use server timestamps or HLCs |
| Sync loops | Infinite sync back-and-forth | Idempotent ops + op_id dedup |
| Unbounded local storage | Device fills up | TTL on synced data, prune old records |
| No migration strategy | Old clients can't sync | Version sync protocol, handle schema diffs |
| Blocking UI on sync | App freezes during large sync | Sync in background worker/thread |
| Missing retry logic | Writes silently lost | Upload queue with guaranteed delivery |
| Syncing too much data | Slow initial sync, high bandwidth | Partial sync by user/project/time |
| No conflict UI | User confused by data changing | Show "synced" indicator, conflict resolution UI |
| Forgetting tombstones | Deleted items reappear | Soft delete with `deleted_at`, sync deletions |
