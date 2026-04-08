# Event-Driven Architecture

## When to Use Event-Driven

### Go Event-Driven When:
- Services need decoupling (producer shouldn't know about consumers)
- Async processing is acceptable (email, notifications, analytics)
- Full audit trail required (every state change recorded)
- Multiple consumers need same event (fan-out)
- Eventual consistency is OK
- System needs temporal decoupling (producer and consumer don't need to be online simultaneously)

### Do NOT Use When:
- Simple CRUD with < 3 services (overkill)
- Strong consistency required across operations (use transactions)
- Team lacks event-driven experience (learning curve is steep)
- Request-response is natural fit (synchronous query)
- Low throughput, simple domain (adds unnecessary complexity)

### Decision Matrix

| Factor | Sync/REST | Event-Driven |
|--------|-----------|-------------|
| Services involved | 1-3 | 3+ |
| Consistency need | Strong | Eventual OK |
| Response required? | Immediate | Can be async |
| Consumer count | 1 | Multiple |
| Audit requirements | Basic logging | Full event trail |
| Team experience | Any | Needs EDA knowledge |

---

## Event Sourcing

**Core idea:** Store events (facts that happened), not current state. Replay events to reconstruct state.

```
Traditional: UPDATE account SET balance = 150 WHERE id = 1
Event-sourced: APPEND {type: "MoneyDeposited", amount: 50, accountId: 1}
```

### Trade-Off Matrix

| Aspect | Benefit | Cost |
|--------|---------|------|
| Audit trail | Complete history of every change | Storage grows indefinitely |
| Temporal queries | "What was state at time T?" | Query complexity |
| Event replay | Rebuild read models, fix bugs retroactively | Replay can be slow without snapshots |
| Debugging | Full reproduction of any state | Harder to reason about current state |
| Schema evolution | Must handle old event formats forever | Migration complexity |

### Snapshot Strategy

```
Event count since last snapshot > threshold (e.g., 100)?
  Yes -> Create snapshot (serialized current state)
  No  -> Replay from last snapshot + subsequent events
```

**Failure modes:**
- No snapshots -> replay gets slower over time. Set snapshot threshold.
- Schema change breaks replay -> always version events, write upcasters.
- Event store grows unbounded -> archive old events, keep snapshots.
- Developers query event store directly -> build read models instead.

---

## CQRS (Command Query Responsibility Segregation)

**Core idea:** Separate the model for writing (commands) from the model for reading (queries).

```
Write side: Command -> Validate -> Store event/update -> Ack
Read side:  Event -> Project into read-optimized view -> Query
```

### When to Use CQRS

| Scenario | CQRS Worth It? |
|----------|----------------|
| Read/write ratio > 10:1 | Yes -- scale reads independently |
| Complex domain logic on writes | Yes -- keep write model focused |
| Simple CRUD | No -- unnecessary complexity |
| Multiple read formats needed | Yes -- different projections |
| Team is small | Probably no -- too much overhead |

### Trade-Offs

| Aspect | Benefit | Cost |
|--------|---------|------|
| Scaling | Read and write scale independently | Two models to maintain |
| Query optimization | Read model shaped for queries | Sync delay (eventual consistency) |
| Separation of concerns | Write logic isolated | More code, more deployment units |

**Failure modes:**
- Read model out of sync -> monitor projection lag, alert on drift
- Projection bugs -> must be able to rebuild read model from events
- Users confused by eventual consistency -> show "processing" states in UI

---

## Saga Patterns

### Choreography (Decentralized)

```
Service A emits Event1 -> Service B listens, processes, emits Event2
  -> Service C listens, processes, emits Event3

Compensation: Service C emits CompensateEvent -> B and A undo
```

| Pros | Cons |
|------|------|
| Loose coupling | Hard to see full flow |
| Simple for few steps | Debugging across services is painful |
| No single point of failure | Circular dependencies possible |

### Orchestration (Centralized)

```
Saga Orchestrator:
  1. Command -> Service A (do step 1)
  2. On success -> Service B (do step 2)
  3. On success -> Service C (do step 3)
  On any failure -> compensate completed steps in reverse
```

| Pros | Cons |
|------|------|
| Explicit flow, easy to understand | Single point of failure (orchestrator) |
| Centralized error handling | Orchestrator can become god service |
| Easy to add/modify steps | Tighter coupling to orchestrator |

### Decision

```
Steps in saga?
  < 4 steps -> Choreography (simple enough to trace)
  >= 4 steps -> Orchestration (need visibility)

Need clear compensation logic?
  Yes -> Orchestration (explicit rollback)
  No  -> Choreography OK
```

**Failure modes (both):**
- Compensation fails -> dead letter + manual intervention queue
- Partial completion visible to users -> use reservation/pending states
- Timeout between steps -> define max saga duration, auto-compensate on timeout

---

## Transactional Outbox Pattern

**Problem:** Dual-write -- updating DB and publishing event can partially fail.

**Solution:** Write event to outbox table in same DB transaction. Separate process publishes from outbox.

```
Transaction:
  1. UPDATE orders SET status = 'confirmed'
  2. INSERT INTO outbox (event_type, payload) VALUES ('OrderConfirmed', '{...}')
COMMIT

Publisher (separate process):
  1. Poll outbox table (or use CDC/Change Data Capture)
  2. Publish event to message queue
  3. Mark outbox row as published
```

### Implementation Options

| Approach | Pros | Cons |
|----------|------|------|
| Polling publisher | Simple, works with any DB | Polling delay, DB load |
| CDC (Debezium) | Real-time, no polling | Operational complexity |
| Transaction log tailing | Lowest latency | DB-specific, complex setup |

**Failure modes:**
- Publisher crashes after publish, before marking as published -> consumer must be idempotent
- Outbox table grows -> clean up published rows periodically
- CDC connector falls behind -> monitor lag, alert on drift

---

## Message Queue Selection

| Queue | Best For | Not For | Ordering | Delivery |
|-------|----------|---------|----------|----------|
| NATS | Simple pub/sub, low latency, lightweight | Guaranteed delivery without JetStream | Per-subject (JetStream) | At-most-once (core), at-least-once (JS) |
| Kafka | High throughput, event log, replay | Low message count, simple use cases | Per-partition | At-least-once |
| RabbitMQ | Complex routing, reliability, work queues | Extreme throughput (>100K msg/s) | Per-queue (single consumer) | At-least-once |
| SQS | AWS native, simple, serverless | Strict ordering (use SQS FIFO), non-AWS | FIFO variant available | At-least-once |
| Redis Streams | Lightweight, already have Redis | Large message backlog, persistence critical | Per-stream | At-least-once |

### Decision Tree

```
Already on AWS and simple needs? -> SQS
Need event replay / log semantics? -> Kafka
Need complex routing (topic, headers)? -> RabbitMQ
Need lowest latency, simple pub/sub? -> NATS
Already have Redis, lightweight needs? -> Redis Streams
```

---

## Idempotency

**Rule:** Every event consumer MUST be idempotent. Events will be delivered more than once.

### Implementation

```
On receive event:
  1. Extract event_id
  2. Check deduplication table: SELECT 1 FROM processed_events WHERE event_id = ?
  3. If exists -> skip (already processed)
  4. Process event
  5. INSERT INTO processed_events (event_id, processed_at)
  6. Steps 4+5 in same transaction
```

### Idempotency Strategies

| Strategy | Use When |
|----------|----------|
| Dedup table | General purpose, DB-backed consumers |
| Idempotent operations | Operation is naturally idempotent (SET x = 5, not INCREMENT) |
| Version/sequence check | Ordered processing needed |
| Idempotency key in API | Client-generated key for retries |

**Failure mode:** Dedup table grows unbounded -> TTL or partition by date, prune old entries.

---

## Event Schema Evolution

### Rules

1. **Always additive** -- add new fields, never remove
2. **New fields must be optional** -- old consumers ignore unknown fields
3. **Never change field semantics** -- create new event type instead
4. **Version events** -- `OrderCreatedV1`, `OrderCreatedV2` or use `schema_version` field
5. **Use schema registry** -- validate events at publish time (Confluent Schema Registry, custom)

### Migration Strategy

| Change Type | Approach |
|-------------|----------|
| Add optional field | Just add it. Old consumers ignore. |
| Remove field | Stop populating, keep in schema. Remove after all consumers updated. |
| Rename field | Add new field, populate both, deprecate old. |
| Change type | New event version. Run both versions during migration. |
| Restructure | New event type entirely. Dual-publish during transition. |

**Failure mode:** Breaking schema change deployed without consumer update -> consumers crash. Use schema registry to catch at publish time.

---

## Desktop App: Local Event Patterns

| Pattern | Use Case | Implementation |
|---------|----------|---------------|
| Local event bus | Component communication | Tauri event system or custom pub/sub |
| Event log for undo/redo | Editor-style apps | Append-only command log, replay forward/backward |
| File watcher events | React to file changes | `notify` crate (Rust) or `fs.watch` |
| IPC events | Frontend <-> Backend communication | Tauri commands + events |

**Failure modes:**
- Event listener memory leak -> always unlisten on component unmount
- Event ordering in multi-window -> use sequence numbers or timestamps
- Too many events -> throttle/debounce UI events (resize, scroll, input)

---

## Common Pitfalls

| Pitfall | Why It Fails | Fix |
|---------|-------------|-----|
| Assuming event order | Network reordering, retries | Use sequence numbers, handle out-of-order |
| No dead letter queue | Poison messages block processing forever | Always configure DLQ, alert on DLQ growth |
| Chatty events | Thousands of fine-grained events = noise | Aggregate into meaningful domain events |
| Circular event chains | A triggers B triggers A -> infinite loop | Detect cycles, use correlation IDs |
| Missing correlation ID | Cannot trace request across services | Add correlation ID to every event |
| Giant event payloads | Queue size limits, slow processing | Events carry IDs, consumers fetch details |
| No event versioning | Schema changes break consumers | Version from day one |
| Sync-over-async | Blocking wait for event response | Use request-reply pattern or just use HTTP |
