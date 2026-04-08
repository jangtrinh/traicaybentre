# API Design Patterns

## Protocol Selection Matrix

| Criterion | REST | GraphQL | gRPC |
|---|---|---|---|
| Client type | Any (browser, mobile, 3rd party) | Frontend-heavy, mobile | Internal services |
| Schema | OpenAPI / Swagger | SDL (Schema Definition Language) | Protobuf |
| Performance | Good | Good (batching) | Excellent (binary, HTTP/2) |
| Streaming | SSE, WebSocket | Subscriptions | Native bidirectional |
| Caching | HTTP native (ETag, Cache-Control) | Complex (normalized cache) | Manual |
| Learning curve | Low | Medium | High |
| Browser support | Native | Native | grpc-web (limited) |
| Error handling | HTTP status codes | errors array in response | Status codes + details |
| File upload | Multipart native | Multipart spec (complex) | Chunked streaming |
| Code generation | Optional (openapi-generator) | Optional (codegen) | Required (protoc) |

## Decision Quick-Reference

```
Browser clients         --> REST or GraphQL
Service-to-service      --> gRPC
Mobile, varied data     --> GraphQL
Public 3rd-party API    --> REST
Real-time bidirectional --> gRPC or WebSocket
Simple CRUD             --> REST
```

## REST Best Practices

### Resource Naming
- Nouns, not verbs: `/users`, not `/getUsers`
- Plural: `/orders/{id}`, not `/order/{id}`
- Nested for ownership: `/users/{id}/orders`
- Max 2 levels deep; beyond that, use query params or top-level resource

### HTTP Methods & Status Codes

| Method | Use | Success | Idempotent |
|---|---|---|---|
| GET | Read | 200 | Yes |
| POST | Create | 201 + Location header | No |
| PUT | Full replace | 200 or 204 | Yes |
| PATCH | Partial update | 200 | No* |
| DELETE | Remove | 204 | Yes |

Key error codes: 400 bad request, 401 unauthorized, 403 forbidden, 404 not found, 409 conflict, 422 unprocessable, 429 rate limited, 500 internal error.

### Pagination (Cursor-Based Preferred)

```
GET /items?cursor=eyJpZCI6MTAwfQ&limit=20

Response:
{
  "data": [...],
  "next_cursor": "eyJpZCI6MTIwfQ",
  "has_more": true
}
```

Offset-based breaks on concurrent inserts/deletes. Cursor-based is stable.

### Versioning Strategies

| Strategy | Example | Pros | Cons |
|---|---|---|---|
| URL path | `/v1/users` | Explicit, easy routing | URL pollution |
| Header | `Accept: application/vnd.api.v2+json` | Clean URLs | Hidden, harder to test |
| Query param | `/users?version=2` | Easy to test | Messy |

Recommendation: URL path for public APIs, header for internal.

## GraphQL Patterns

### Schema Design
- Use connections for pagination (Relay spec): `edges`, `node`, `pageInfo`
- Input types for mutations: `input CreateUserInput { ... }`
- Union types for polymorphic responses

### Solving N+1 with DataLoader

```
# Without DataLoader: N+1 queries
# posts(10) -> each calls getAuthor() = 11 queries

# With DataLoader: batches into 2 queries
# posts(10) -> DataLoader batches getAuthor([id1..id10]) = 2 queries
```

### Security Controls
- **Depth limiting**: reject queries deeper than N levels (default: 7)
- **Complexity scoring**: assign cost per field, reject above threshold
- **Persisted queries**: allowlist known queries in production
- **Introspection**: disable in production

## gRPC Patterns

### Service Definition
- Define services in `.proto` files, generate client/server code
- Use `google.protobuf.Timestamp` not custom date strings
- Deadline propagation: always set deadlines, propagate across hops

### Streaming Modes

| Mode | Use Case |
|---|---|
| Unary | Standard request-response |
| Server streaming | Feed updates, large result sets |
| Client streaming | File upload, telemetry batching |
| Bidirectional | Chat, real-time sync |

### Health Checking
- Implement `grpc.health.v1.Health` service
- Return SERVING, NOT_SERVING, or UNKNOWN
- Load balancers use this for routing decisions

## API Gateway Pattern

```
                    +------------------+
  Clients -------> |   API Gateway    | -------> Service A
                   | - Auth/JWT       | -------> Service B
                   | - Rate limiting  | -------> Service C
                   | - Routing        |
                   | - Circuit break  |
                   +------------------+
```

Responsibilities: authentication, rate limiting, request routing, response transformation, circuit breaking, logging/metrics.

Failure modes:
- Gateway becomes SPOF -- mitigate with multiple instances + health checks
- Added latency per hop -- keep transformation logic minimal
- Config drift across instances -- use config-as-code, GitOps

## BFF (Backend for Frontend)

```
  Web App  ----> Web BFF  ----\
  Mobile   ----> Mobile BFF ---+--> Microservices
  Desktop  ----> Desktop BFF --/
```

Each BFF tailors API shape, auth flow, and payload size to its client. Desktop BFF handles offline sync, chunked uploads, delta responses.

When NOT to use: single client type, small team, simple CRUD app.

## Webhook Design

### Delivery Contract
- POST with JSON body + signature header (`X-Signature-256`)
- Retry with exponential backoff: 1s, 5s, 30s, 5m, 30m, 2h (max 5 retries)
- Include `idempotency_key` so receivers can deduplicate
- Return 2xx to acknowledge; anything else triggers retry

### Signature Verification
```
signature = HMAC-SHA256(webhook_secret, raw_body)
# Receiver compares X-Signature-256 header with computed signature
# Use constant-time comparison to prevent timing attacks
```

## Common Pitfalls

| Pitfall | Protocol | Fix |
|---|---|---|
| Over-fetching | REST | Use sparse fieldsets (`?fields=id,name`) or GraphQL |
| N+1 queries | GraphQL | DataLoader, query planning |
| Missing deadlines | gRPC | Always set and propagate deadlines |
| Breaking changes | All | Version APIs, use deprecation headers |
| No idempotency | POST/webhooks | Idempotency keys, deduplication |
| Chatty APIs | REST | BFF pattern, batch endpoints |
| Unbounded queries | GraphQL | Depth/complexity limits, pagination |
| No rate limiting | All | Token bucket at gateway, 429 responses |
