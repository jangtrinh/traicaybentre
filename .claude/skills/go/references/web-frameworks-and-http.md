# Go Web Frameworks and HTTP

## net/http Stdlib (Go 1.22+)

Go 1.22 added method and path-parameter routing to `ServeMux`:

```go
mux := http.NewServeMux()

// Method + path pattern (Go 1.22+)
mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    json.NewEncoder(w).Encode(getUser(id))
})

mux.HandleFunc("POST /users", createUser)
mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
})

srv := &http.Server{Addr: ":8080", Handler: mux}
srv.ListenAndServe()
```

## Gin

```go
import "github.com/gin-gonic/gin"

r := gin.Default() // includes Logger + Recovery middleware

// Route groups
api := r.Group("/api/v1")
{
    api.GET("/users/:id", getUser)
    api.POST("/users", createUser)
}

// Middleware
api.Use(authMiddleware())

func getUser(c *gin.Context) {
    id := c.Param("id")
    user, err := store.Find(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
        return // IMPORTANT: must return after c.JSON on error
    }
    c.JSON(http.StatusOK, user)
}
```

### Gin Binding/Validation

```go
type CreateUserReq struct {
    Name  string `json:"name" binding:"required,min=2"`
    Email string `json:"email" binding:"required,email"`
    Age   int    `json:"age" binding:"gte=0,lte=130"`
}

func createUser(c *gin.Context) {
    var req CreateUserReq
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    // req is validated
}
```

## Echo

```go
import "github.com/labstack/echo/v4"

e := echo.New()
e.Use(middleware.Logger(), middleware.Recover())

e.GET("/users/:id", func(c echo.Context) error {
    id := c.Param("id")
    return c.JSON(http.StatusOK, getUser(id))
})

// Auto TLS with Let's Encrypt
e.AutoTLSManager.Cache = autocert.DirCache("/var/www/.cache")
e.StartAutoTLS(":443")
```

## Fiber

```go
import "github.com/gofiber/fiber/v2"

app := fiber.New()

app.Get("/users/:id", func(c *fiber.Ctx) error {
    id := c.Params("id")
    return c.JSON(getUser(id))
})

app.Listen(":3000")
```

**Caveats:**
- Built on fasthttp, NOT net/http -- incompatible with net/http middleware
- `c.Body()` data is only valid within handler (reuses buffer); copy if needed
- Some net/http ecosystem tools (httptest, etc.) don't work directly

## Middleware Patterns

### Logging Middleware (net/http)

```go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}
```

### Auth Middleware (Gin)

```go
func authMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        claims, err := validateToken(token)
        if err != nil {
            c.AbortWithStatusJSON(401, gin.H{"error": "unauthorized"})
            return
        }
        c.Set("userID", claims.UserID)
        c.Next()
    }
}
```

### CORS

Set `Access-Control-Allow-Origin`, `Allow-Methods`, `Allow-Headers` headers. Return `204` for `OPTIONS` preflight. Use `rs/cors` package for production -- handles edge cases (credentials, wildcards).
```

## Graceful Shutdown

```go
srv := &http.Server{Addr: ":8080", Handler: mux}

go func() {
    if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
        log.Fatalf("listen: %v", err)
    }
}()

quit := make(chan os.Signal, 1)
signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
<-quit

ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
if err := srv.Shutdown(ctx); err != nil {
    log.Fatalf("forced shutdown: %v", err)
}
log.Println("server exited")
```

## Request Validation (go-playground/validator)

```go
import "github.com/go-playground/validator/v10"

var validate = validator.New()

type Order struct {
    Item     string `json:"item" validate:"required"`
    Quantity int    `json:"quantity" validate:"required,gt=0"`
    Email    string `json:"email" validate:"required,email"`
}

func validateOrder(o *Order) error {
    return validate.Struct(o) // returns validator.ValidationErrors
}
```

## JSON Handling

```go
type User struct {
    ID        int       `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email,omitempty"`   // omit if zero value
    CreatedAt time.Time `json:"created_at"`
    Internal  string    `json:"-"`                 // never marshaled
}

// Custom marshaling
func (u *User) MarshalJSON() ([]byte, error) {
    type Alias User
    return json.Marshal(&struct {
        *Alias
        CreatedAt string `json:"created_at"`
    }{
        Alias:     (*Alias)(u),
        CreatedAt: u.CreatedAt.Format(time.RFC3339),
    })
}
```

## Common Pitfalls

### Forgetting to Close Response Bodies

```go
// WRONG: response body leaked
resp, err := http.Get(url)
if err != nil { return err }
// forgot resp.Body.Close()

// RIGHT
resp, err := http.Get(url)
if err != nil { return err }
defer resp.Body.Close()
body, err := io.ReadAll(resp.Body)
```

### Context Cancellation in Handlers

```go
// The request context is canceled when client disconnects
func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    result, err := slowQuery(ctx) // pass ctx to respect cancellation
    if err != nil {
        if ctx.Err() != nil {
            return // client gone, don't write response
        }
        http.Error(w, err.Error(), 500)
        return
    }
    json.NewEncoder(w).Encode(result)
}
```

### Not Setting Timeouts on http.Server

```go
// WRONG: no timeouts -- vulnerable to slowloris attacks
srv := &http.Server{Addr: ":8080", Handler: mux}

// RIGHT
srv := &http.Server{
    Addr:         ":8080",
    Handler:      mux,
    ReadTimeout:  5 * time.Second,
    WriteTimeout: 10 * time.Second,
    IdleTimeout:  120 * time.Second,
}
```

### Gin: Not Returning After Error Response

```go
// WRONG: continues execution after sending error
func handler(c *gin.Context) {
    if err != nil {
        c.JSON(400, gin.H{"error": "bad"})
        // execution continues!
    }
    c.JSON(200, result) // double write
}

// RIGHT: return after error
func handler(c *gin.Context) {
    if err != nil {
        c.JSON(400, gin.H{"error": "bad"})
        return
    }
    c.JSON(200, result)
}
```

### Framework Comparison

| Feature | net/http | Gin | Echo | Fiber |
|---------|----------|-----|------|-------|
| Path params (1.22+) | Yes | Yes | Yes | Yes |
| Middleware | Manual chain | Built-in | Built-in | Built-in |
| Validation | External | Built-in binding | External | External |
| Performance | Good | Fast | Fast | Fastest* |
| net/http compat | Native | Yes | Yes | **No** |
| Auto TLS | No | No | Yes | No |

*Fiber uses fasthttp -- benchmark-fast but net/http incompatible.
