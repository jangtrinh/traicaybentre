# gRPC and Microservices in Go

## Protobuf Definition

```protobuf
// proto/user/v1/user.proto
syntax = "proto3";
package user.v1;
option go_package = "github.com/company/app/gen/user/v1;userv1";

message User {
  string id = 1;
  string name = 2;
  string email = 3;
  google.protobuf.Timestamp created_at = 4;
}

message GetUserRequest {
  string id = 1;
}

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc ListUsers(ListUsersRequest) returns (stream User);           // server streaming
  rpc UploadUsers(stream User) returns (UploadResponse);           // client streaming
  rpc SyncUsers(stream SyncRequest) returns (stream SyncResponse); // bidirectional
}
```

## Code Generation

### protoc

```bash
protoc --go_out=. --go_opt=paths=source_relative \
       --go-grpc_out=. --go-grpc_opt=paths=source_relative \
       proto/user/v1/user.proto
```

### buf (preferred)

```yaml
# buf.gen.yaml
version: v2
plugins:
  - remote: buf.build/protocolbuffers/go
    out: gen
    opt: paths=source_relative
  - remote: buf.build/grpc/go
    out: gen
    opt: paths=source_relative
```

```bash
buf generate    # generates Go code
buf lint        # lint proto files
buf breaking    # detect breaking changes
```

## Unary RPC Server

```go
type userServer struct {
    userv1.UnimplementedUserServiceServer
    store UserStore
}

func (s *userServer) GetUser(ctx context.Context, req *userv1.GetUserRequest) (*userv1.User, error) {
    if req.GetId() == "" {
        return nil, status.Error(codes.InvalidArgument, "id required")
    }
    user, err := s.store.Find(ctx, req.GetId())
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            return nil, status.Error(codes.NotFound, "user not found")
        }
        return nil, status.Error(codes.Internal, "internal error")
    }
    return toProto(user), nil
}

// Register and serve
func main() {
    lis, _ := net.Listen("tcp", ":50051")
    srv := grpc.NewServer()
    userv1.RegisterUserServiceServer(srv, &userServer{store: newStore()})
    reflection.Register(srv) // enable grpcurl/grpcui
    srv.Serve(lis)
}
```

## Streaming RPCs

### Server Streaming

```go
func (s *userServer) ListUsers(req *userv1.ListUsersRequest, stream userv1.UserService_ListUsersServer) error {
    users, err := s.store.List(stream.Context())
    if err != nil {
        return status.Error(codes.Internal, "list failed")
    }
    for _, u := range users {
        if err := stream.Send(toProto(u)); err != nil {
            return err
        }
    }
    return nil
}
```

### Client Streaming

```go
func (s *userServer) UploadUsers(stream userv1.UserService_UploadUsersServer) error {
    var count int
    for {
        user, err := stream.Recv()
        if err == io.EOF {
            return stream.SendAndClose(&userv1.UploadResponse{Count: int32(count)})
        }
        if err != nil {
            return err
        }
        s.store.Save(stream.Context(), fromProto(user))
        count++
    }
}
```

## Interceptors

### Unary Interceptor

```go
func loggingUnaryInterceptor(ctx context.Context, req any, info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler) (any, error) {
    start := time.Now()
    resp, err := handler(ctx, req)
    log.Printf("method=%s duration=%v err=%v", info.FullMethod, time.Since(start), err)
    return resp, err
}

srv := grpc.NewServer(
    grpc.ChainUnaryInterceptor(loggingUnaryInterceptor, authUnaryInterceptor),
    grpc.ChainStreamInterceptor(loggingStreamInterceptor),
)
```

### Auth Interceptor

```go
func authUnaryInterceptor(ctx context.Context, req any, info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler) (any, error) {
    md, ok := metadata.FromIncomingContext(ctx)
    if !ok {
        return nil, status.Error(codes.Unauthenticated, "no metadata")
    }
    tokens := md.Get("authorization")
    if len(tokens) == 0 {
        return nil, status.Error(codes.Unauthenticated, "no token")
    }
    claims, err := validateToken(tokens[0])
    if err != nil {
        return nil, status.Error(codes.Unauthenticated, "invalid token")
    }
    ctx = context.WithValue(ctx, userClaimsKey, claims)
    return handler(ctx, req)
}
```

## Metadata Propagation

```go
// Client side: set metadata
md := metadata.Pairs("authorization", "Bearer "+token, "x-request-id", reqID)
ctx := metadata.NewOutgoingContext(ctx, md)
resp, err := client.GetUser(ctx, req)

// Server side: read metadata
md, ok := metadata.FromIncomingContext(ctx)
requestID := md.Get("x-request-id")
```

## Health Checking

```go
import "google.golang.org/grpc/health"
import healthpb "google.golang.org/grpc/health/grpc_health_v1"

hsrv := health.NewServer()
healthpb.RegisterHealthServer(srv, hsrv)
hsrv.SetServingStatus("user.v1.UserService", healthpb.HealthCheckResponse_SERVING)
```

Kubernetes probe: `grpc-health-probe -addr=:50051`

## gRPC Error Codes

| Code | When to Use |
|------|------------|
| `codes.InvalidArgument` | Bad input from client |
| `codes.NotFound` | Resource doesn't exist |
| `codes.AlreadyExists` | Duplicate creation |
| `codes.PermissionDenied` | Authenticated but not authorized |
| `codes.Unauthenticated` | Missing or invalid credentials |
| `codes.Internal` | Server bug; don't expose details |
| `codes.Unavailable` | Transient; client should retry |
| `codes.DeadlineExceeded` | Timeout |
| `codes.ResourceExhausted` | Rate limit or quota |

## Service Discovery Patterns

| Pattern | Tools |
|---------|-------|
| DNS-based | Kubernetes Services, Consul DNS |
| Client-side | etcd, Consul, gRPC name resolver |
| Service mesh | Istio, Linkerd (transparent proxy) |

gRPC with Kubernetes: use headless service + `dns:///service.namespace:port` as target with round-robin LB.

## Event-Driven Patterns

### NATS

Use `github.com/nats-io/nats.go`. Core NATS for fire-and-forget pub/sub. JetStream for persistent, at-least-once delivery with `js.Publish` / `js.Subscribe` + `nats.Durable("worker")`.

### Kafka (segmentio/kafka-go)

Use `github.com/segmentio/kafka-go`. `kafka.Writer` for producing, `kafka.NewReader` with `GroupID` for consumer-group consumption. Always call `r.Close()` on shutdown.

## Common Pitfalls

### Large Message Size

```
// Error: rpc error: code = ResourceExhausted desc = grpc: received message larger than max (4194816 vs. 4194304)

// Default max is 4MB. Override when needed:
grpc.NewServer(grpc.MaxRecvMsgSize(16 * 1024 * 1024))
// Client side:
grpc.Dial(addr, grpc.WithDefaultCallOptions(grpc.MaxCallRecvMsgSize(16*1024*1024)))
```

**Better approach:** Use streaming for large payloads instead of increasing limit.

### Missing Deadline/Timeout

```go
// WRONG: no deadline -- can hang forever
resp, err := client.GetUser(context.Background(), req)

// RIGHT: always set deadline
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
defer cancel()
resp, err := client.GetUser(ctx, req)
```

### Blocking Streams

Always set a deadline on the context when opening streams. Without it, `stream.Recv()` blocks indefinitely if the server stalls. Check for `io.EOF` and errors on every `Recv()`.

### Not Using Unimplemented Server

```go
// WRONG: breaks on proto update
type server struct{}
// RIGHT: embed for forward compat
type server struct { userv1.UnimplementedUserServiceServer }
```

### Connection Management

Reuse `grpc.ClientConn` -- gRPC multiplexes over a single connection. Creating a new `grpc.Dial` per request wastes resources and bypasses load balancing.
