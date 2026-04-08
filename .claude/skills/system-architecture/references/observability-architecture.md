# Observability Architecture

## Three Pillars

| Pillar | Answers | Format | Example |
|---|---|---|---|
| Metrics | What is happening? | Numeric time-series | Error rate = 2.3% |
| Traces | Where is it slow/failing? | Spans with parent-child | POST /sync took 3.2s |
| Logs | Why did it happen? | Structured text events | "row conflict on id=42" |

## Correlation: The Key

```
Request arrives --> Generate trace_id (e.g., W3C Trace Context)
                --> Attach to all metrics, traces, and logs
                --> Propagate through every hop (IPC, HTTP, queue)

Alert fires (metric) --> Find trace_id --> Find relevant logs
```

Without correlation, you have three disconnected data sources. With it, you have observability.

## Workflow: Alert to Root Cause

```
1. ALERT       Metric threshold breached (e.g., p99 latency > 2s)
     |
2. DASHBOARD   Narrow to time window and service
     |
3. TRACE       Find slow spans in that window
     |
4. LOG         Read logs for that trace_id
     |
5. ROOT CAUSE  Identify fix
```

## OpenTelemetry (OTel)

### Why OTel
- Unified SDK for metrics, traces, logs
- Vendor-agnostic: export to Grafana, Datadog, Honeycomb, etc.
- Auto-instrumentation for common frameworks
- CNCF graduated project, industry standard

### Architecture

```
+-------------------+     +----------------+     +-----------+
| App (OTel SDK)    | --> | OTel Collector | --> | Backend   |
| - TracerProvider  |     | - Receivers    |     | (Grafana, |
| - MeterProvider   |     | - Processors   |     |  Datadog) |
| - LoggerProvider  |     | - Exporters    |     +-----------+
+-------------------+     +----------------+
```

Collector is optional but recommended: decouples app from backend, enables batching/filtering/routing.

## Metrics Patterns

### RED Method (For Services)

| Signal | Metric | Alert Threshold |
|---|---|---|
| **R**ate | Requests per second | Sudden drop (service down) |
| **E**rrors | Error rate (%) | > 1% for 5 minutes |
| **D**uration | p50, p95, p99 latency | p99 > SLO target |

### USE Method (For Resources)

| Signal | Metric | Alert Threshold |
|---|---|---|
| **U**tilization | CPU %, memory %, disk % | > 80% sustained |
| **S**aturation | Queue depth, thread pool usage | Growing unbounded |
| **E**rrors | Hardware errors, OOM kills | Any occurrence |

### Four Golden Signals (Google SRE)

Latency, Traffic, Errors, Saturation -- combines RED + USE for holistic view.

### Desktop-Specific Metrics

| Metric | Why It Matters | Collection |
|---|---|---|
| App startup time | User experience, first impression | Instrument main() to window-ready |
| Memory usage | Desktop apps get killed if too high | Periodic sampling, OS APIs |
| IPC latency | Rust-WebView roundtrip performance | Instrument invoke handlers |
| Crash rate | Stability signal | Crash reporter (Sentry, Crashpad) |
| Sync success rate | Data reliability for offline-first | Counter per sync attempt |
| Bundle size | Download/update time | CI measurement |
| Frame rate / jank | UI responsiveness | requestAnimationFrame timing |

### Metric Types

| Type | Use | Example |
|---|---|---|
| Counter | Cumulative count | `requests_total` |
| Gauge | Current value | `memory_usage_bytes` |
| Histogram | Distribution | `request_duration_seconds` |
| Summary | Pre-calculated percentiles | `request_duration_p99` |

## Tracing Patterns

### Distributed Tracing

```
[Desktop App]              [API Gateway]            [Service A]
  Span: user-action          Span: route-request      Span: process
  trace_id: abc123           trace_id: abc123          trace_id: abc123
  span_id: span-1            parent: span-1            parent: span-2
       |                          |                         |
       +--- IPC invoke --->       +--- HTTP POST --->       +--- DB query
             Span: rust-cmd             Span: auth-check          Span: query
```

Context propagation: inject trace_id into HTTP headers (`traceparent`), IPC metadata, queue message attributes.

### Desktop Tracing Strategy

| Layer | What to Trace | Tool |
|---|---|---|
| WebView (JS) | User interactions, render time | OTel JS SDK |
| IPC boundary | Command invocations, event emits | Custom spans in Rust handlers |
| Rust core | Business logic, file I/O | `tracing` crate with OTel exporter |
| Sidecar calls | HTTP to local sidecar | HTTP auto-instrumentation |
| Sync operations | Upload/download/conflict resolution | Custom spans |

### Sampling Strategies

| Strategy | How | Tradeoff |
|---|---|---|
| Head-based | Decide at trace start (e.g., 10%) | Fast, but may miss errors |
| Tail-based | Decide after trace completes | Captures all errors, higher resource cost |
| Priority | Always sample errors + slow traces | Best of both, complex setup |

Recommendation: head-based at 10-20% for normal traffic, always sample errors and traces > p99.

## Logging Patterns

### Structured Logging

```json
{
  "timestamp": "2026-03-29T10:15:30Z",
  "level": "error",
  "message": "sync conflict detected",
  "trace_id": "abc123",
  "span_id": "span-5",
  "service": "desktop-app",
  "component": "sync-engine",
  "document_id": "doc-789",
  "conflict_type": "concurrent_edit"
}
```

Rules:
- Always JSON format (machine-parseable)
- Always include `trace_id` (correlation)
- Use severity levels consistently: DEBUG, INFO, WARN, ERROR, FATAL
- Never log PII (emails, names, tokens)

### Language-Specific Libraries

| Language | Library | Notes |
|---|---|---|
| Rust | `tracing` + `tracing-subscriber` | Structured, span-aware, OTel bridge |
| Go | `slog` (stdlib) | Structured, leveled, fast |
| TypeScript | `pino` | Fast JSON logger |
| Python | `structlog` | Structured, processor pipeline |

### Desktop Logging Strategy

| Concern | Approach |
|---|---|
| File logging | Write to `$APPDATA/logs/`, rotate daily, keep 7 days |
| Crash reports | Capture panics, send to crash reporting service (opt-in) |
| User telemetry | Opt-in only, anonymized, aggregate metrics |
| Log levels | Release: INFO+, Debug builds: DEBUG+ |
| Sensitive data | Never log tokens, passwords, file contents |

## Alerting

### Principles
- Alert on **symptoms** (high error rate), not causes (CPU spike)
- Every alert must be **actionable** -- if no action needed, remove it
- Include **runbook link** in alert metadata
- Use **severity levels**: P1 (page), P2 (ticket), P3 (review next day)

### Alert Design

| Signal | Threshold | Severity | Action |
|---|---|---|---|
| Error rate > 5% | 5 min sustained | P1 | Page on-call |
| p99 latency > SLO | 15 min sustained | P2 | Create ticket |
| Disk usage > 80% | Instant | P2 | Expand or clean |
| Sync failure rate > 10% | 10 min sustained | P1 | Investigate sync service |
| Zero traffic | 5 min | P1 | Service likely down |

## Dashboard Design

### Drill-Down Hierarchy

```
Level 1: System Overview
  - All services health (green/yellow/red)
  - Global error rate, latency, traffic

Level 2: Service Dashboard
  - RED metrics for one service
  - Recent deployments overlay
  - Top errors

Level 3: Instance / Trace
  - Individual traces
  - Logs for specific request
  - Resource utilization
```

### Desktop App Dashboard
- Active users (DAU/MAU)
- App version distribution
- Crash-free session rate
- Sync health (success/failure/conflict rates)
- Startup time percentiles by OS/version

## Privacy in Observability

| Concern | Mitigation |
|---|---|
| PII in logs | Scrub before export, never log emails/names/IPs |
| User tracking | Anonymize user IDs, use session hashing |
| Opt-in telemetry | Desktop: explicit user consent, easy disable |
| GDPR | Data retention policy, right to deletion |
| Data residency | Choose backend region matching user base |

## Common Pitfalls

| Pitfall | Impact | Fix |
|---|---|---|
| Alert fatigue | Team ignores alerts | Reduce noise, every alert must be actionable |
| Sampling too aggressively | Miss rare errors | Always sample errors, use tail-based for anomalies |
| Logging PII | Compliance violation | Scrub pipeline, review log formats |
| No correlation ID | Cannot trace across services | Propagate trace_id everywhere |
| High-cardinality metrics | Backend overload, cost explosion | Avoid user_id as metric label, use traces instead |
| Logging without levels | Cannot filter noise | Use structured logging with severity |
| No log rotation | Disk fills up | Rotate daily, retain 7 days on desktop |
| Metrics without context | Know "what" but not "why" | Always pair metrics with traces and logs |
