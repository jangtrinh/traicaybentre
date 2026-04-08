---
name: es:system-architecture
description: "System architecture for cross-platform apps. Use for web-to-desktop migration, Tauri, offline-first sync, multi-language orchestration, scalability, event-driven, API design, security."
license: Apache-2.0
argument-hint: "[architecture concern or migration scenario]"
metadata:
  author: claudekit
  version: 1.0.0
  category: architecture
  tags: [architecture, system-design, tauri, desktop, cross-platform, offline-first, scalability]
---

# System Architecture Skill

Authoritative architecture knowledge for designing, migrating, and scaling cross-platform applications. Grounded in decision frameworks — not opinions. Every pattern includes trade-offs, failure modes, and when NOT to use it.

## When to Activate

- Migrating web app to desktop (Tauri, Electron)
- Designing cross-platform architecture (web + desktop + mobile)
- Implementing offline-first or local-first data sync
- Orchestrating multi-language systems (Rust + Go + Python)
- Making technology selection decisions (framework, database, protocol)
- Designing scalable system architecture
- Planning event-driven or microservices architecture
- Writing Architecture Decision Records (ADRs)
- Reviewing architecture for security, performance, or reliability
- Planning desktop app distribution and auto-update

## Architecture Philosophy

1. **Start with the problem, not the pattern** — don't pick microservices because it's trendy
2. **Optimize for change, not perfection** — systems evolve; make it easy to change later
3. **Constraints drive architecture** — latency budget, team size, compliance, offline needs
4. **Every distributed system pays a complexity tax** — justify it
5. **Make illegal states unrepresentable** — at system level, not just code level
6. **Observe everything, alert on symptoms** — metrics → traces → logs → root cause
7. **Security is architecture, not a feature** — bake it in from day one
8. **The best architecture is the one your team can operate** — sophistication without capability = failure

## Web → Desktop Migration Quick Reference

```
EXISTING: Next.js + Supabase + Vercel (web)
    │
    ▼ Migration Strategy
┌─────────────────────────────────────────────┐
│ DESKTOP (Tauri v2)                          │
│ ┌─────────────┐  ┌──────────────────────┐   │
│ │ Rust Core   │  │ WebView (Next.js SSG)│   │
│ │ - IPC cmds  │◄─│ - Shared UI code     │   │
│ │ - File I/O  │  │ - output: 'export'   │   │
│ │ - SQLite    │  │ - No SSR/API routes  │   │
│ │ - Crypto    │  └──────────────────────┘   │
│ └──────┬──────┘                              │
│        │ Sidecar (optional)                  │
│ ┌──────┴──────┐  ┌──────────────────────┐   │
│ │ Go Service  │  │ Python Worker        │   │
│ │ - Background│  │ - Data processing    │   │
│ │ - Networking│  │ - ML inference       │   │
│ └─────────────┘  └──────────────────────┘   │
└─────────────────────┬───────────────────────┘
                      │ Sync
              ┌───────┴───────┐
              │ Supabase Cloud│
              │ - Auth        │
              │ - Postgres    │
              │ - Realtime    │
              └───────────────┘
```

**Key decisions for web → desktop:**

| Decision | Recommendation | Why |
|----------|---------------|-----|
| Frontend | Next.js SSG (`output: 'export'`) | Reuse existing code, no SSR in desktop |
| Backend core | Tauri Rust commands | Type-safe, fast, secure IPC |
| Local database | SQLite via `better-sqlite3` or `sqlx` | Offline-first, single-file, fast |
| Cloud sync | PowerSync + Supabase | Bidirectional, conflict resolution, production-ready |
| Heavy compute | Go sidecar (static binary) | Cross-compiles, small footprint |
| Data/ML | Python sidecar (PyInstaller) | Ecosystem access, isolated process |
| Auto-update | Tauri updater plugin | Mandatory signing, delta updates |

## Architecture Decision Framework

When facing an architecture choice, use this checklist:

1. **What problem does this solve?** (not "what's the best practice")
2. **What are the constraints?** (latency, team size, compliance, offline, budget)
3. **What are 3 options?** (always consider at least 3, including "do nothing")
4. **What are the trade-offs?** (performance vs complexity vs cost vs time-to-market)
5. **What's the blast radius if we're wrong?** (how hard to reverse)
6. **What would need to be true for each option to be the right choice?**
7. **Document it** → ADR (Architecture Decision Record)

## Pattern Selection Quick Reference

| Problem | Pattern | When NOT to Use |
|---------|---------|-----------------|
| Web → desktop | Tauri + SSG | Need server-side rendering |
| Offline data | Local-first + sync | All data fits in a single API call |
| Multi-language | Sidecar processes | Single-language team, simple app |
| High availability | Replicas + LB | Single-user desktop app |
| Complex workflows | Saga pattern | < 3 services involved |
| Audit trail | Event sourcing | Simple CRUD with no audit needs |
| Read/write split | CQRS | Read and write models are identical |
| Service communication | gRPC | Browser clients (use REST/GraphQL) |
| Async processing | Message queue | Operations must be synchronous |
| Data consistency | Outbox pattern | Single database, no distributed txn |

## Common Anti-Patterns

- **Distributed monolith** — microservices that must deploy together. Worse than a monolith.
- **Shared database** — multiple services writing to same tables. Coupling disaster.
- **Premature microservices** — splitting before boundaries are clear. Start monolith, extract later.
- **Synchronous chains** — A calls B calls C calls D. Latency multiplies, availability plummets.
- **Missing circuit breaker** — one slow dependency takes down everything.
- **Offline afterthought** — bolting sync onto an online-only architecture never works.
- **God sidecar** — putting everything in one sidecar defeats the purpose.

## Best Practices

1. **Document decisions** — use ADRs for anything non-obvious
2. **Design for failure** — every external call can fail; plan for it
3. **Separate read from write paths** when they have different scaling needs
4. **Use structured observability** — trace ID through every hop
5. **Make sync idempotent** — operations must be safely retryable
6. **Version your APIs** from day one — breaking changes are expensive
7. **Keep the desktop app self-sufficient** — cloud is enhancement, not dependency
8. **One database per bounded context** — shared state = shared pain

## References

Load as needed for deep knowledge:

- [Web to Desktop Migration](references/web-to-desktop-migration.md) — Tauri architecture, Next.js SSG, shared codebase strategy
- [Tauri Architecture Deep Dive](references/tauri-architecture-deep-dive.md) — IPC, commands, plugins, permissions, multi-window, security model
- [Offline-First & Data Sync](references/offline-first-and-data-sync.md) — PowerSync, CRDTs, conflict resolution, sync engines
- [Multi-Language Orchestration](references/multi-language-orchestration.md) — Rust + Go + Python sidecar patterns, IPC, lifecycle
- [Desktop App Concerns](references/desktop-app-concerns.md) — Native OS integration, file system, notifications, tray, deep links
- [Distribution & Auto-Update](references/distribution-and-auto-update.md) — Code signing, notarization, installers, CI/CD, delta updates
- [Scalability Patterns](references/scalability-patterns.md) — Scaling ladder, caching, sharding, read replicas, load balancing
- [Event-Driven Architecture](references/event-driven-architecture.md) — Event sourcing, CQRS, saga, outbox, message queues
- [API Design Patterns](references/api-design-patterns.md) — REST vs gRPC vs GraphQL, versioning, gateway patterns
- [Security Architecture](references/security-architecture.md) — Zero trust, sandboxing, secrets management, CSP, permissions
- [Observability Architecture](references/observability-architecture.md) — OpenTelemetry, metrics/traces/logs, alerting, dashboards
- [Architecture Documentation](references/architecture-documentation.md) — C4 model, ADR templates, diagramming, decision records

## External Resources

- Tauri Docs: https://v2.tauri.app
- Tauri llms.txt: https://v2.tauri.app/llms-full.txt
- PowerSync: https://www.powersync.com
- microservices.io patterns: https://microservices.io/patterns
- C4 Model: https://c4model.com
- Azure Architecture Patterns: https://learn.microsoft.com/en-us/azure/architecture/patterns

## Scope

This skill covers system-level architecture and cross-platform design. For language-specific patterns, use `es:go`, `es:rust`. For technology stack selection, use `ck:backend-development`. For deployment infrastructure, use `ck:devops`. For implementation planning, use `ck:plan`.
