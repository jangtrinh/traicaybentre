# Security Audit Report — xoaituquythanhphu.com

**Target:** https://xoaituquythanhphu.com/
**Audit date:** 2026-04-10
**Method:** Black-box, non-intrusive reconnaissance (HTTP probing, header analysis, TLS inspection, common-path enumeration, client-side inspection). No exploitation, no brute-force, no authenticated testing.

---

## 1. Technology Fingerprint

| Layer | Detected |
|---|---|
| Web server | LiteSpeed |
| Language | PHP **8.1.34** (disclosed via `X-Powered-By`) |
| Framework | **Laravel** (session cookie `laravel_session`, `XSRF-TOKEN`, 404 template) |
| Frontend | jQuery **3.2.1** (2017), Bootstrap **4.0.0-beta** (2017), Animsition, custom `client/` assets |
| Hosting | cPanel shared host, IP `103.200.23.188` |
| TLS | Let's Encrypt, valid until 2026-05-11, SAN covers main domain ✅ |

---

## 2. Critical Issues (need to fix NOW)

### C-1. Vulnerable front-end libraries (XSS exposure)
**Severity: CRITICAL**

- **Bootstrap 4.0.0-beta** (file header shows *Copyright 2011-2017*). Affected by:
  - CVE-2018-14040, CVE-2018-14041, CVE-2018-14042 — XSS in `data-*` attributes (collapse, scrollspy, tooltip).
  - CVE-2019-8331 — XSS in tooltip/popover via `data-template`, `data-content`, `data-title`.
- **jQuery 3.2.1**. Affected by:
  - CVE-2019-11358 — prototype pollution via `jQuery.extend(true, ...)`.
  - CVE-2020-11022 / CVE-2020-11023 — XSS in `.html()`, `.append()` with attacker-controlled HTML containing `<option>` / `<style>`.

Because the site has user input surfaces (search `/ket-qua`, `/login`, `/register`, comments/articles under `/bai-viet/...`), any reflected or stored HTML passing through these libraries becomes exploitable.

**Fix:**
- Upgrade jQuery to **≥ 3.7.1**.
- Upgrade Bootstrap to **≥ 5.3.x** (or at minimum 4.6.2 if staying on v4 — note v4 is EOL).
- After upgrade, retest any `.html()` / tooltip / popover usage.

---

### C-2. PHP 8.1 is End-Of-Life
**Severity: CRITICAL**

PHP **8.1.34** is on the 8.1 branch, which reached **end of security support on 31 December 2025**. The server is now running unpatched PHP in production — any PHP CVE disclosed after 2025-12-31 will not be fixed upstream.

**Fix:**
- Upgrade to **PHP 8.3** (active support) or **PHP 8.4**.
- Test the Laravel app against the target PHP version (`composer test`, `php artisan test`) before switching.
- Also remove the `X-Powered-By: PHP/8.1.34` header (see M-2).

---

### C-3. Document-root misconfiguration (Laravel)
**Severity: HIGH / borderline CRITICAL**

`GET /public/index.php` returns **HTTP 200 with the full homepage** (33 KB). In a correctly configured Laravel deployment, the web server's document root must point to `<project>/public`, and `/public/index.php` should be 404. The fact that it resolves means **the document root is the Laravel project root**, not `public/`.

Current mitigations observed: `.htaccess` and `.env` at the root return 403/404 (LiteSpeed blocks them explicitly). But this is fragile — any file dropped into the project root that isn't explicitly blocked (backups, `.env.local`, `composer.lock`, new logs, IDE artifacts) becomes **directly downloadable**.

**Fix:**
- In cPanel → *Domains* → set the **Document Root** of `xoaituquythanhphu.com` to `public_html/public` (or wherever `public/` lives).
- Remove the workaround `.htaccess` rules that redirect into `public/`.
- Retest: `/public/index.php` must become 404; `/` must still serve the site.

---

### C-4. Missing security headers (all of them)
**Severity: HIGH**

Homepage and every tested response carry **zero** modern security headers:

| Header | Current | Should be |
|---|---|---|
| `Strict-Transport-Security` | ❌ missing | `max-age=31536000; includeSubDomains; preload` |
| `Content-Security-Policy` | ❌ missing | restrict `script-src`, `style-src`, `img-src`, `frame-ancestors 'self'` |
| `X-Frame-Options` | ❌ missing | `SAMEORIGIN` (or use CSP `frame-ancestors`) |
| `X-Content-Type-Options` | ❌ missing | `nosniff` |
| `Referrer-Policy` | ❌ missing | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | ❌ missing | `camera=(), microphone=(), geolocation=()` |

Consequences without these:
- **No HSTS** → first-visit SSL-strip / downgrade MITM on Wi-Fi.
- **No CSP / X-Frame-Options** → clickjacking of `/login` and `/register` (an attacker frames the login page and tricks users into submitting credentials).
- **No `nosniff`** → user-uploaded files in `/uploads/` may be MIME-sniffed into executable HTML/JS.

**Fix (Laravel middleware):** add a `SecurityHeaders` middleware registered globally in `app/Http/Kernel.php`, e.g.:
```php
return $next($request)
    ->header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    ->header('X-Content-Type-Options', 'nosniff')
    ->header('X-Frame-Options', 'SAMEORIGIN')
    ->header('Referrer-Policy', 'strict-origin-when-cross-origin')
    ->header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    ->header('Content-Security-Policy', "default-src 'self'; img-src 'self' data:; ...");
```
Start CSP in `Content-Security-Policy-Report-Only` mode for 1–2 weeks, fix violations, then enforce.

---

## 3. Medium-severity issues

### M-1. User-uploaded content served from application domain without `nosniff`
`/uploads/posts/*` contains user-uploaded images (png/jpg/webp) served directly from the main app origin. Combined with the missing `X-Content-Type-Options: nosniff`, an attacker who can upload a polyglot file (image with embedded HTML/JS) could get it executed in a victim's browser as same-origin code, leading to session theft.

**Fix:**
1. Add `X-Content-Type-Options: nosniff` (see C-4).
2. Validate uploads server-side: enforce MIME via `getimagesize()` or Intervention Image, re-encode images rather than storing raw bytes, reject files whose declared extension disagrees with content.
3. Ideally serve user content from a **separate cookie-less domain** (e.g. `cdn.xoaituquythanhphu.com`) so even a successful polyglot cannot touch the app session.

### M-2. Information disclosure via headers
- `X-Powered-By: PHP/8.1.34` — tells an attacker the exact PHP version to target.
- `Server: LiteSpeed` — disclosed (minor).

**Fix:** disable in `php.ini` → `expose_php = Off`; in LiteSpeed admin → hide server signature.

### M-3. Outdated `.htaccess`-based document-root workaround
Directly tied to C-3. While .htaccess currently blocks `.env`, the block list is static. Any future sensitive file (backup dumps, `.env.production`, `auth.json`, `composer.lock` with package inventory) will be served as plain text. This is not a hypothetical — searches for `site:*.com .env` regularly find Laravel sites with this exact misconfiguration.

### M-4. Admin panel discoverable
`/admin/` returns **403** (not 404) → an admin interface exists at that path. Attackers now know where to brute-force.

**Fix:**
- Rename to a non-guessable path (`/gateway-<random>`).
- IP-allowlist the admin panel at LiteSpeed or via Laravel middleware.
- Enforce 2FA on admin accounts (Laravel Fortify / Jetstream).

---

## 4. Low-severity / housekeeping

- **L-1.** `robots.txt` has `Disallow:` (empty) — no actual disallow; consider adding at least `Disallow: /admin/` (obscurity, not security).
- **L-2.** No `/.well-known/security.txt` — add one per [RFC 9116] so researchers know where to report issues.
- **L-3.** `laravel_session` cookie is `SameSite=Lax`. Consider `SameSite=Strict` on the admin session to mitigate CSRF pivots, or at minimum ensure CSRF protection is active on all state-changing admin routes (Laravel does this by default — verify the `VerifyCsrfToken` middleware hasn't been excluded anywhere).
- **L-4.** Hard-coded search form action `/ket-qua` uses **GET**. Reflection test with `<script>alert(1)</script>` and `'"` did **not** produce XSS or SQL errors — escaping appears to be in place. Keep it that way (use Blade `{{ }}` not `{!! !!}`).
- **L-5.** `/storage/` 301-redirects to `/public/storage` — cosmetic leak of internal path structure, related to C-3.

---

## 5. What was tested and looked OK

- `.env`, `.git/config`, `composer.json`, `phpinfo.php`, `backup.sql`, `.env.backup`, `.vscode/sftp.json`, etc. → all 404/403 ✅
- Directory listing disabled on `/uploads/` and `/storage/` ✅
- XSS reflection test on `/ket-qua?q=...` — no reflection ✅
- SQL error disclosure test on `/ket-qua?q=test'"` — no SQL errors ✅
- CSRF protection on `/login` POST → `419 Page Expired` without token ✅
- TLS certificate SAN covers `xoaituquythanhphu.com` and `www.` ✅
- Session cookies use `Secure`, `HttpOnly` (session), `SameSite=Lax` ✅
- No WordPress endpoints (`/wp-login.php`, `/wp-admin/` → 404) ✅

---

## 6. Prioritized fix plan

| # | Item | Effort | Impact |
|---|---|---|---|
| 1 | **C-2** Upgrade PHP to 8.3/8.4 | 1–2 h (cPanel selector + smoke test) | Eliminates EOL risk |
| 2 | **C-1** Upgrade jQuery + Bootstrap | 2–4 h (test site styling) | Removes known XSS CVEs |
| 3 | **C-3** Fix document root → `public/` | 30 min | Eliminates class of leaks |
| 4 | **C-4** Add security-headers middleware | 1 h + 1 week CSP tuning | Clickjacking, MITM, MIME sniff |
| 5 | **M-2** Hide `X-Powered-By` / Server | 10 min | Information disclosure |
| 6 | **M-1** Harden uploads (validate, re-encode, separate domain) | 1 day | Stored XSS defense-in-depth |
| 7 | **M-4** Move + protect `/admin/` | 2 h | Brute-force attack surface |
| 8 | **L-2** Add `security.txt` | 10 min | Responsible disclosure channel |

Do items 1–4 today; the rest within the next sprint.

---

## 7. Reproduction commands

```bash
# Headers & PHP version
curl -sSI https://xoaituquythanhphu.com/ | head

# Front-end lib versions
curl -sS https://xoaituquythanhphu.com/client/vendor/bootstrap/js/bootstrap.min.js | head -c 300
curl -sS https://xoaituquythanhphu.com/client/vendor/jquery/jquery-3.2.1.min.js | head -c 200

# Document-root misconfig
curl -sS -o /dev/null -w "%{http_code}\n" https://xoaituquythanhphu.com/public/index.php
# → 200 (should be 404)

# Admin path existence
curl -sSI https://xoaituquythanhphu.com/admin/ | head -1
# → HTTP/2 403
```
