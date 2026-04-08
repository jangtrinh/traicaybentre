# Scalability Patterns

## Scaling Ladder

Try in order. Stop when sufficient. Each step adds complexity.

| Level | Strategy | Cost | Complexity | When to Move On |
|-------|----------|------|------------|-----------------|
| 1 | Optimize code | Free | Low | Profiling shows no more gains |
| 2 | Vertical scaling | $ | Low | Machine maxed out or cost prohibitive |
| 3 | Read replicas | $$ | Moderate | Write throughput is the bottleneck |
| 4 | Caching layer | $$ | Moderate | Cache hit rate plateaus below 80% |
| 5 | Horizontal scaling | $$$ | High | Single service can't handle load |
| 6 | Data partitioning / sharding | $$$$ | Very High | Single DB can't handle data volume |
| 7 | Polyglot persistence | $$$$ | Expert | Different workloads need fundamentally different storage |

### Level 1: Optimize Code (Always Do This First)

**Checklist:**
- [ ] Profile before guessing (flamegraph, query analyzer)
- [ ] Fix N+1 queries
- [ ] Add missing database indexes
- [ ] Batch operations where possible
- [ ] Eliminate unnecessary serialization/deserialization
- [ ] Use connection pooling
- [ ] Compress responses (gzip/brotli)

**Failure mode:** Premature optimization. Profile first, optimize second.

### Level 2: Vertical Scaling

```
Decision: Vertical vs Horizontal?
- Predictable load growth?        -> Vertical (simpler)
- Need high availability?         -> Must go horizontal eventually
- Stateful service?               -> Vertical is easier
- Cost ceiling hit?               -> Horizontal spreads cost
```

### Level 3: Read Replicas

| Topology | Use Case | Consistency |
|----------|----------|-------------|
| Primary + 1 replica | Simple read scaling | Eventual (ms-seconds lag) |
| Primary + N replicas | Read-heavy workload | Eventual, replica lag varies |
| Multi-primary | Write scaling (rare) | Conflict resolution required |

**Failure modes:**
- Replica lag causes stale reads -- use primary for consistency-critical reads
- Replica promotion on primary failure takes time -- test failover regularly

### Level 4: Caching Layer

See caching strategy matrix below.

### Level 5: Horizontal Scaling

**Prerequisites:**
- Stateless services (no local session state)
- Externalized session/state (Redis, DB)
- Health check endpoints
- Graceful shutdown handling

### Level 6: Sharding

| Strategy | How | Best For |
|----------|-----|----------|
| Range-based | Shard by ID range (1-1M, 1M-2M) | Sequential access patterns |
| Hash-based | Hash key % N shards | Even distribution |
| Geographic | Shard by region | Data locality requirements |
| Tenant-based | Shard per customer/tenant | Multi-tenant SaaS |

**Failure modes:**
- Hot shard (uneven distribution) -- use consistent hashing
- Cross-shard queries -- denormalize or use scatter-gather (slow)
- Resharding -- plan capacity ahead; resharding is painful

### Level 7: Polyglot Persistence

| Workload | Best Fit DB | Why |
|----------|------------|-----|
| Transactions | PostgreSQL | ACID, proven |
| Key-value lookup | Redis | Sub-ms latency |
| Full-text search | Elasticsearch/Meilisearch | Inverted index |
| Time series | TimescaleDB/InfluxDB | Time-based partitioning |
| Graph traversal | Neo4j | Relationship queries |
| Document/JSON | MongoDB | Flexible schema |

**Failure mode:** Operational burden of N databases. Only add when a single DB fundamentally cannot serve the workload.

---

## Caching Strategy Matrix

| Pattern | Mechanism | Use When | Pitfall | Failure Mode |
|---------|-----------|----------|---------|--------------|
| Cache-aside | App checks cache; on miss reads DB, writes cache | General read-heavy | Stale data on update | Cache stampede on cold start |
| Write-through | App writes cache + DB synchronously | Consistency critical | Write latency doubled | Cache unavailable blocks writes |
| Write-behind | App writes cache; async flush to DB | Write-heavy, can tolerate lag | Data loss if cache crashes | Must have cache persistence |
| Refresh-ahead | Pre-refresh cache before TTL expires | Predictable access patterns | Wasted resources on cold keys | Over-provisioning cache |

### Cache Invalidation Decision

```
Can you tolerate stale data for N seconds?
  Yes -> TTL-based expiry (simplest)
  No  -> Event-driven invalidation
    Can you enumerate what changed?
      Yes -> Targeted key invalidation
      No  -> Cache-aside with short TTL
```

**Anti-pattern:** Caching everything. Only cache: expensive computations, frequently read data, slow external API responses.

---

## Load Balancing

| Algorithm | Use When | Pitfall |
|-----------|----------|---------|
| Round-robin | Equal server capacity, stateless | Ignores server load |
| Least connections | Varying request duration | Thundering herd on new server |
| Weighted round-robin | Heterogeneous server capacity | Manual weight management |
| Consistent hashing | Sticky sessions, cache affinity | Uneven distribution possible |
| Random | Simple, surprisingly effective | No load awareness |

**Health checks:** Always configure active health checks. Passive-only misses slow degradation.

---

## Rate Limiting

| Algorithm | Behavior | Best For |
|-----------|----------|----------|
| Token bucket | Allows bursts up to bucket size | API rate limiting |
| Sliding window | Smooth rate enforcement | Fair usage |
| Fixed window | Simple counter per time window | Basic protection |
| Leaky bucket | Constant output rate | Traffic shaping |

### Scope Decision

| Scope | When |
|-------|------|
| Per-user | Protect from individual abuse |
| Per-IP | Unauthenticated endpoints |
| Global | Protect downstream services |
| Per-endpoint | Different limits for expensive vs cheap operations |

**Failure mode:** Rate limiting in-process only -- if you scale to N instances, each allows full rate. Use centralized counter (Redis) or distributed rate limiter.

---

## Circuit Breaker

### States

```
CLOSED (normal) --[failure threshold reached]--> OPEN (reject all)
OPEN --[timeout expires]--> HALF-OPEN (allow probe request)
HALF-OPEN --[probe succeeds]--> CLOSED
HALF-OPEN --[probe fails]--> OPEN
```

### Configuration

| Parameter | Typical Value | Tune When |
|-----------|--------------|-----------|
| Failure threshold | 5 failures in 60s | Too sensitive or too slow |
| Open timeout | 30s | Recovery time of downstream |
| Half-open max requests | 1-3 | Need faster recovery detection |
| Failure definition | 5xx or timeout | Different error semantics |

**Fallback strategies:**
- Return cached/stale data
- Return default/degraded response
- Fail fast with clear error message
- Route to backup service

**Failure mode:** Circuit breaker on critical path with no fallback = complete outage. Always define fallback.

---

## Backpressure

| Technique | How | Trade-off |
|-----------|-----|-----------|
| Bounded queues | Reject when queue full | Producer must handle rejection |
| Load shedding | Drop low-priority requests | Need priority classification |
| Throttling | Slow down producers | Increases latency |
| Graceful degradation | Disable non-essential features | Feature flags needed |

**Decision:** Start with bounded queues. Add load shedding only if you have clear priority tiers.

---

## Stateless Design

| State Type | Externalize To |
|------------|---------------|
| Session data | Redis / encrypted cookie |
| Auth tokens | JWT (stateless) or Redis (revocable) |
| File uploads | Object storage (S3/R2) |
| Background jobs | Job queue (Redis, SQS) |
| Locks | Distributed lock (Redis SETNX, etcd) |

**Failure mode:** "Stateless" service with local file cache = state. If server dies, cache is lost. Use shared cache.

---

## Desktop App Scalability

Desktop apps don't distribute horizontally. Focus on local performance:

| Concern | Pattern |
|---------|---------|
| Large datasets | Virtual scrolling (render only visible rows) |
| SQLite performance | WAL mode, prepared statements, batch writes in transactions |
| Heavy computation | Move to background thread / web worker / sidecar |
| Memory | Lazy-load modules, unload off-screen views |
| Startup time | Defer non-critical init, show UI shell immediately |
| Network | Local cache-first, sync in background |

**Failure mode:** Blocking main thread with DB queries or computation = frozen UI. Always use async + background threads.

---

## Common Anti-Patterns

| Anti-Pattern | Why It Fails | Instead |
|--------------|-------------|---------|
| Premature optimization | Waste effort on non-bottlenecks | Profile first |
| Scaling write path like read path | Writes are fundamentally harder | Separate read/write strategies |
| Ignoring cold start | First request after deploy is slow | Warmup endpoints, pre-populate cache |
| Shared mutable state | Contention, deadlocks | Immutable data, message passing |
| Synchronous chain of microservices | Latency = sum of all services | Async where possible, parallelize |
| "Just add more servers" | Doesn't fix algorithmic issues | Fix code first (Level 1) |
