# Security Architecture

## Tauri Security Model

### Trust Boundary

```
+-------------------------------------------+
|  WebView (UNTRUSTED)                      |
|  - Renders UI (HTML/CSS/JS)               |
|  - No direct filesystem/network access    |
|  - CSP enforced                           |
+-------------------------------------------+
          | IPC (invoke / events) |
          | Scoped by capabilities|
+-------------------------------------------+
|  Rust Core (TRUSTED)                      |
|  - Business logic, file I/O, network      |
|  - Validates all IPC input                |
|  - OS-level access                        |
+-------------------------------------------+
```

Rule: treat every IPC message from WebView as untrusted user input.

### Capabilities System (Tauri v2)

```toml
# src-tauri/capabilities/main-window.json
{
  "identifier": "main-window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "fs:read-app-data",
    "shell:open-url"
  ]
}
```

- Permissions scoped to window labels -- secondary windows get fewer permissions
- Deny-by-default: commands not listed are blocked
- Plugin permissions are namespaced: `plugin-name:permission`

### CSP (Content Security Policy)
- Auto-injected at compile time in Tauri
- Default restricts to `self` (no inline scripts, no external resources)
- Override in `tauri.conf.json` only when required, document why
- Never use `unsafe-inline` or `unsafe-eval` in production

### Isolation Pattern
- Optional: IPC messages pass through an encryption bridge
- WebView JS cannot directly call Rust -- goes through isolated iframe
- Enable when: handling sensitive data, high-security requirements

### Scoped File Access

| Scope | Access |
|---|---|
| `fs:read-app-data` | Read `$APPDATA` only |
| `fs:write-app-data` | Write `$APPDATA` only |
| `fs:read-downloads` | Read `$DOWNLOADS` only |
| Custom scope | Declare specific paths in capabilities |

Never grant blanket `fs:default` -- always scope to minimum required paths.

## Desktop Security Concerns

### Local Data Encryption

| Approach | Use Case | Implementation |
|---|---|---|
| SQLCipher | Encrypted SQLite | `sqlcipher` crate, key from OS keychain |
| File encryption | Sensitive files | AES-256-GCM, key in keychain |
| Full disk encryption | OS-level | Rely on OS (BitLocker, FileVault) |

Key management: derive encryption key from OS keychain, never hardcode.

### Secrets Storage

| OS | Backend | Crate/Plugin |
|---|---|---|
| macOS | Keychain Services | `tauri-plugin-keyring` |
| Windows | DPAPI / Credential Manager | `tauri-plugin-keyring` |
| Linux | Secret Service (GNOME Keyring) | `tauri-plugin-keyring` |

Never store secrets in: config files, environment variables baked into binary, localStorage, SQLite without encryption.

### Code Signing

| OS | Requirement | Tool |
|---|---|---|
| macOS | Required (Gatekeeper) | Apple Developer ID + notarization |
| Windows | Recommended (SmartScreen) | EV code signing certificate |
| Linux | Optional | GPG signing |

CI/CD: sign in pipeline, never store signing keys in repo.

### Binary Protection
- Strip debug symbols in release builds
- Disable Rust backtrace in release: `RUST_BACKTRACE=0`
- Obfuscate frontend JS bundle (optional, limited value)
- Enable ASLR, DEP (OS defaults handle this)

## Cloud Security (Supabase)

### Row Level Security (RLS)

```sql
-- ALWAYS enable RLS on every table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy: users see only their own documents
CREATE POLICY "users_own_documents" ON documents
  FOR ALL USING (auth.uid() = user_id);

-- Policy: shared documents via junction table
CREATE POLICY "shared_documents" ON documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM document_shares
      WHERE document_shares.document_id = documents.id
        AND document_shares.user_id = auth.uid()
    )
  );
```

Rule: never trust client-side filtering. RLS is the last line of defense.

### JWT Validation
- Verify signature server-side (Supabase does this for RLS)
- Check `exp` claim -- reject expired tokens
- Check `aud` claim -- prevent token reuse across services
- Rotate signing keys periodically

### API Key Management
- Never embed `service_role` key in desktop binary (full DB access)
- Use `anon` key + RLS for client-side access
- For admin operations: call server-side Edge Functions with service_role

## Authentication Architecture (Desktop)

### OAuth2 PKCE Flow (Required for Desktop)

```
Desktop App                    Auth Server (Supabase)
    |                                |
    |-- 1. Generate code_verifier -->|
    |-- 2. Auth URL + code_challenge |
    |      (open in system browser)  |
    |                                |
    |<-- 3. Redirect to deep link ---|
    |      (myapp://callback?code=X) |
    |                                |
    |-- 4. Exchange code + verifier  |
    |                                |
    |<-- 5. Access + Refresh tokens  |
    |      (store in OS keychain)    |
```

Why PKCE: desktop apps cannot securely store a client secret. PKCE proves the app that started the flow is the one completing it.

### Token Lifecycle

| Token | Storage | Lifetime | Refresh |
|---|---|---|---|
| Access token | Memory (preferred) or keychain | 15 min - 1 hr | On expiry via refresh token |
| Refresh token | OS keychain | 7 - 30 days | Rotation: new refresh token each use |
| Code verifier | Memory only | Single use | N/A |

### Deep Link Callback
- Register custom URL scheme: `myapp://` in Tauri config
- Validate `state` parameter to prevent CSRF
- Exchange code immediately, clear from memory

## Network Security

| Control | Implementation | When |
|---|---|---|
| TLS everywhere | Enforce HTTPS, reject HTTP | Always |
| Certificate pinning | Pin server cert hash in app | High-security, optional |
| Proxy-aware | Respect system proxy settings | Corporate environments |
| Request signing | HMAC on request body | Webhook, sensitive endpoints |

## Zero Trust Principles

1. **Verify explicitly** -- authenticate and authorize every request
2. **Least privilege** -- minimum permissions for each component
3. **Assume breach** -- encrypt data at rest and in transit, segment access

Applied to desktop: every IPC call validated, every DB query through RLS, every token verified.

## OWASP Top 10 Mapped to Desktop

| OWASP Risk | Desktop Manifestation | Mitigation |
|---|---|---|
| Injection | Malicious IPC payload | Validate/sanitize all IPC inputs in Rust |
| Broken auth | Token theft from disk | OS keychain, token rotation |
| Sensitive data exposure | Unencrypted local DB | SQLCipher, scoped file access |
| Broken access control | Overly broad capabilities | Least-privilege capabilities per window |
| Security misconfiguration | CSP disabled, debug enabled | Compile-time CSP, strip debug in release |
| Vulnerable components | Outdated dependencies | `cargo audit`, `npm audit`, Dependabot |
| XSS | Injected content in WebView | CSP, sanitize dynamic HTML |

## Supply Chain Security

- **Dependency auditing**: `cargo audit` + `npm audit` in CI, fail on critical
- **Lock files**: commit `Cargo.lock` and `package-lock.json`
- **Reproducible builds**: pin toolchain versions, use hash-verified deps
- **SBOM**: generate Software Bill of Materials for release artifacts
- **Minimal dependencies**: audit before adding, prefer well-maintained crates

## Common Pitfalls

| Pitfall | Impact | Fix |
|---|---|---|
| Secrets in config files | Credential leak | OS keychain only |
| Hardcoded API keys in binary | Key extraction via strings | PKCE OAuth, no embedded secrets |
| Disabling CSP for dev convenience | XSS in production | Separate dev/prod Tauri config |
| Trusting WebView input | Injection, privilege escalation | Validate all IPC in Rust |
| service_role key in client | Full DB access if extracted | anon key + RLS only |
| No RLS on new tables | Data leak | CI check: all tables must have RLS |
| Skipping code signing | OS blocks installation | Sign in CI pipeline |
