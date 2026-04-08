# Web Frameworks

## Axum — Recommended Default

### Basic Setup

```rust
use axum::{Router, routing::{get, post}, Json, extract::{Path, Query, State}};
use std::sync::Arc;
use tokio::net::TcpListener;

#[derive(Clone)]
struct AppState {
    db: PgPool,
    cache: Arc<redis::Client>,
}

#[tokio::main]
async fn main() {
    let state = AppState { db: pool, cache: Arc::new(client) };

    let app = Router::new()
        .route("/users/{id}", get(get_user))
        .route("/users", post(create_user))
        .nest("/api/v1", api_routes())
        .layer(tower_http::trace::TraceLayer::new_for_http())
        .layer(tower_http::cors::CorsLayer::permissive())
        .with_state(state);

    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

### Handlers and Extractors

```rust
// Extractors are function parameters — order matters for body extractors
async fn get_user(
    State(state): State<AppState>,        // Shared state
    Path(id): Path<u64>,                  // URL path param
) -> Result<Json<User>, AppError> {
    let user = sqlx::query_as!(User, "SELECT * FROM users WHERE id = $1", id as i64)
        .fetch_one(&state.db).await?;
    Ok(Json(user))
}

#[derive(Deserialize)]
struct CreateUserReq { name: String, email: String }

async fn create_user(
    State(state): State<AppState>,
    Json(body): Json<CreateUserReq>,      // Consumes request body — must be LAST
) -> Result<(StatusCode, Json<User>), AppError> {
    let user = create_in_db(&state.db, &body).await?;
    Ok((StatusCode::CREATED, Json(user)))
}

// Query params
#[derive(Deserialize)]
struct Pagination { page: Option<u32>, per_page: Option<u32> }

async fn list_users(
    Query(params): Query<Pagination>,
) -> Json<Vec<User>> { /* ... */ }
```

### Error Handling in Axum

```rust
use axum::response::{IntoResponse, Response};

enum AppError {
    NotFound(String),
    Internal(anyhow::Error),
    Validation(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            AppError::NotFound(msg) => (StatusCode::NOT_FOUND, msg),
            AppError::Internal(e) => {
                tracing::error!("Internal error: {e:?}");
                (StatusCode::INTERNAL_SERVER_ERROR, "internal error".into())
            }
            AppError::Validation(msg) => (StatusCode::BAD_REQUEST, msg),
        };
        (status, Json(serde_json::json!({ "error": message }))).into_response()
    }
}

// Auto-convert from anyhow/sqlx errors
impl From<anyhow::Error> for AppError {
    fn from(e: anyhow::Error) -> Self { AppError::Internal(e) }
}
impl From<sqlx::Error> for AppError {
    fn from(e: sqlx::Error) -> Self {
        match e {
            sqlx::Error::RowNotFound => AppError::NotFound("not found".into()),
            other => AppError::Internal(other.into()),
        }
    }
}
```

### Middleware (Tower Layers)

```rust
use tower_http::{
    trace::TraceLayer,
    cors::CorsLayer,
    timeout::TimeoutLayer,
    compression::CompressionLayer,
};
use tower::ServiceBuilder;

let app = Router::new()
    .route("/api/data", get(handler))
    .layer(
        ServiceBuilder::new()
            .layer(TraceLayer::new_for_http())
            .layer(TimeoutLayer::new(Duration::from_secs(30)))
            .layer(CompressionLayer::new())
            .layer(CorsLayer::permissive())
        // Layers execute bottom-to-top: CORS -> Compression -> Timeout -> Trace
    );
```

### Authentication Middleware Pattern

```rust
use axum::{extract::FromRequestParts, http::request::Parts};

struct AuthUser { user_id: u64 }

#[axum::async_trait]
impl<S: Send + Sync> FromRequestParts<S> for AuthUser {
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let token = parts.headers
            .get("Authorization")
            .and_then(|v| v.to_str().ok())
            .and_then(|v| v.strip_prefix("Bearer "))
            .ok_or(AppError::Unauthorized)?;

        let claims = verify_jwt(token).map_err(|_| AppError::Unauthorized)?;
        Ok(AuthUser { user_id: claims.sub })
    }
}

// Use as extractor — automatically validates auth
async fn protected_handler(user: AuthUser) -> Json<Profile> { /* ... */ }
```

## Actix-web

```rust
use actix_web::{web, App, HttpServer, HttpResponse};

struct AppState { db: PgPool }

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let state = web::Data::new(AppState { db: pool });

    HttpServer::new(move || {
        App::new()
            .app_data(state.clone())
            .service(
                web::scope("/api")
                    .route("/users/{id}", web::get().to(get_user))
            )
    })
    .bind("0.0.0.0:3000")?
    .run()
    .await
}

async fn get_user(
    state: web::Data<AppState>,
    path: web::Path<u64>,
) -> HttpResponse {
    let id = path.into_inner();
    // ...
    HttpResponse::Ok().json(user)
}
```

## Rocket

```rust
#[macro_use] extern crate rocket;

#[get("/users/<id>")]
async fn get_user(id: u64, db: &State<PgPool>) -> Result<Json<User>, Status> {
    // ...
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .manage(pool)
        .mount("/api", routes![get_user])
}
```

## Graceful Shutdown

```rust
// Axum
let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
axum::serve(listener, app)
    .with_graceful_shutdown(async {
        tokio::signal::ctrl_c().await.unwrap();
        tracing::info!("shutting down");
    })
    .await
    .unwrap();
```

## OpenAPI with utoipa

```rust
use utoipa::{OpenApi, ToSchema};

#[derive(Serialize, ToSchema)]
struct User { id: u64, name: String }

#[utoipa::path(
    get, path = "/users/{id}",
    params(("id" = u64, Path, description = "User ID")),
    responses((status = 200, body = User), (status = 404))
)]
async fn get_user(Path(id): Path<u64>) -> Json<User> { /* ... */ }

#[derive(OpenApi)]
#[openapi(paths(get_user), components(schemas(User)))]
struct ApiDoc;
// Serve: utoipa_swagger_ui::SwaggerUi::new("/docs/{_:.*}").url("/openapi.json", ApiDoc::openapi())
```

## Framework Comparison

| | Axum | Actix-web | Rocket |
|---|---|---|---|
| **Async runtime** | Tokio | Actix (Tokio) | Tokio |
| **Performance** | Excellent | Excellent | Good |
| **Ergonomics** | Good (type-heavy) | Good | Best (macros) |
| **Ecosystem** | Tower middleware | Own middleware | Fairings |
| **Maturity** | Newer, fast-growing | Most mature | Stable |
| **Best for** | New projects, tower stack | High-perf, actors | Rapid prototyping |

## Common Pitfalls

### Axum Extractor Order

```rust
// WRONG: Json before State — Json consumes body, State can't extract after
async fn handler(Json(body): Json<Body>, State(s): State<AppState>) {}
// error: the trait bound is not satisfied

// RIGHT: non-consuming extractors first, body-consuming last
async fn handler(State(s): State<AppState>, Json(body): Json<Body>) {}
```

### Send Bounds for Spawned Handlers

```rust
// WRONG: handler holds non-Send type
async fn handler() -> String {
    let rc = Rc::new("data");  // Rc is not Send
    tokio::time::sleep(Duration::from_secs(1)).await;
    rc.to_string()
}
// error: future cannot be sent between threads safely

// RIGHT: use Arc or keep non-Send types in non-async scope
```

### Missing Feature Flags

```toml
# WRONG: missing features, runtime panics or compile errors
tower-http = "0.5"

# RIGHT: enable what you need
tower-http = { version = "0.5", features = ["trace", "cors", "timeout", "compression-gzip"] }
tokio = { version = "1", features = ["full"] }  # or pick: rt, macros, net, signal
```
