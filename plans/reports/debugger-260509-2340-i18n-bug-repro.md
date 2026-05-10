# i18n Redirect Bug — Reproduction Report

**Date:** 2026-05-09  
**Stack:** Next.js 16.2.2 + next-intl ^4.9.1, localePrefix: "as-needed"

---

## Reproduction Status: REPRODUCED ✓

Bug fully reproduced. Root cause identified with evidence chain.

---

## Curl Test Matrix

| Scenario | Cookie | Extra Headers | Method | Result | Set-Cookie | Bug? |
|----------|--------|---------------|--------|--------|------------|------|
| A — Cookie VI, VI link | `NEXT_LOCALE=vi` | — | GET `/xoai-tu-quy` | **200 OK** (`x-middleware-rewrite: /vi/xoai-tu-quy`) | none | No |
| B — Cookie VI, EN link | `NEXT_LOCALE=vi` | — | GET `/en/xoai-tu-quy` | **200 OK** | `NEXT_LOCALE=en` ← **CORRUPTS** | **YES** |
| C — No cookie, no GEO | none | — | GET `/xoai-tu-quy` | 200 OK | `NEXT_LOCALE=vi` | No |
| D — Bot UA | none | — | GET `/xoai-tu-quy` | 200 OK | `NEXT_LOCALE=vi` | No |
| E — Cookie VI + GEO US | `NEXT_LOCALE=vi` | `x-vercel-ip-country: US` | GET `/xoai-tu-quy` | **200 OK** (cookie guard works) | none | No |
| F — No cookie + GEO US | none | `x-vercel-ip-country: US` | GET `/xoai-tu-quy` | **307 → /en/xoai-tu-quy** | — | **TRIGGER** |
| G — Follow F's redirect | none | — | GET `/en/xoai-tu-quy` | 200 OK | `NEXT_LOCALE=en` ← **CORRUPTS** | **YES** |
| H — After G, click VI link | `NEXT_LOCALE=en` | — | GET `/xoai-tu-quy` | **307 → /en/xoai-tu-quy** | — | **BUG CONFIRMED** |
| I — RSC prefetch of /en | `NEXT_LOCALE=vi` | `RSC: 1`, `Next-Router-Prefetch: 1` | GET `/en/xoai-tu-quy` | 200 OK | `NEXT_LOCALE=en` ← **CORRUPTS** | **YES** |
| J — Accept-Language: en | none | `Accept-Language: en` | GET `/xoai-tu-quy` | **307 → /en/xoai-tu-quy** | — | **TRIGGER** |

---

## HTML Links Analysis

VI pages render clean unprefixed hrefs — **no /en links in VI page nav**:
```
href="/xoai-tu-quy"
href="/xoai-hoang-kim"
href="/dua-xiem-ben-tre"
...
```

EN pages (NEXT_LOCALE=en) render **/en/* prefixed hrefs everywhere**:
```
href="/en/xoai-tu-quy"
href="/en/xoai-hoang-kim"
href="/en/dua-xiem-ben-tre"
...
```

HTTP response Link header includes alternate hreflang for all locales on every page:
```
Link: <http://localhost:3000/xoai-tu-quy>; rel="alternate"; hreflang="vi",
      <http://localhost:3000/en/xoai-tu-quy>; rel="alternate"; hreflang="en", ...
```

LanguageSwitcher is a client component — renders no `<a>` tags in SSR, uses `router.replace()` for switching. No prefetch leak there.

---

## Root Cause

### Primary Cause: next-intl always overwrites NEXT_LOCALE cookie based on URL locale

`next-intl` middleware unconditionally sets `NEXT_LOCALE=<locale-from-url>` on **every** response, including:
- RSC prefetch requests (`Next-Router-Prefetch: 1`)
- Regular navigation to locale-prefixed paths

It does **not** check whether a conflicting cookie already exists before overwriting.

**Evidence:**
```
# User has NEXT_LOCALE=vi, visits /en/* → cookie immediately overwritten
curl -b "NEXT_LOCALE=vi" http://localhost:3000/en/xoai-tu-quy
→ set-cookie: NEXT_LOCALE=en   ← destroys user preference
```

### Trigger Chain: How user ends up on /en/* with VI preference

**Trigger A — GEO first-visit flow (most likely for reported bug):**

```
1. Vietnamese user in US (VPN, expat) — no cookie yet
2. GET /xoai-tu-quy + x-vercel-ip-country: US
3. proxy.ts: hasLocaleCookie=false, geoLocale="en"
   → injects Accept-Language: en, vi;q=0.5
   → passes modified request to next-intl

4. next-intl sees Accept-Language: en on /xoai-tu-quy
   → 307 redirect to /en/xoai-tu-quy   ← NOT a rewrite, a real redirect

5. Browser follows 307 to /en/xoai-tu-quy
   → next-intl sets NEXT_LOCALE=en cookie

6. Cookie is now NEXT_LOCALE=en permanently

7. User clicks /xoai-tu-quy (Vietnamese nav link)
   → middleware: NEXT_LOCALE=en cookie present
   → 307 redirect to /en/xoai-tu-quy   ← USER SEES THE BUG

8. Self-reinforcing: EN pages render /en/* hrefs
   → Next.js Link components prefetch /en/* on viewport
   → each prefetch re-stamps NEXT_LOCALE=en
   → cookie never resets to vi automatically
```

**Trigger B — Accidental/test visit to /en/* URL (bookmark, share, old link):**

```
User has NEXT_LOCALE=vi → clicks any /en/* link → NEXT_LOCALE overwritten to en
→ same loop as step 6-8 above
```

### The Faulty Assumption in proxy.ts

The comment in `proxy.ts` says:
```typescript
// Inject Accept-Language header so next-intl picks up GEO-based locale
// when no cookie exists. This is cleaner than manually redirecting.
```

This assumption is **wrong** — next-intl *does* redirect based on Accept-Language (not rewrite). The injected header causes a 307, not an in-place locale swap. This redirect then bakes in the GEO locale as a permanent cookie.

**File:** `src/proxy.ts`, lines 44-52

---

## Contributing Factor: No Cookie Guard in next-intl

next-intl's middleware (v4.9.x) does not support a "don't overwrite existing cookie" mode. [Issue #1793](https://github.com/amannn/next-intl/issues/1793) tracks this as a feature request. The behavior is by design — next-intl trusts the URL locale over any existing cookie.

---

## Scenarios That Do NOT Reproduce the Bug

- **Scenario A**: Cookie VI + VI link → 200, safe. The cookie guard works.
- **Scenario E**: Cookie VI + GEO US → 200, safe. `hasLocaleCookie` guard in proxy.ts correctly skips GEO injection.
- **Scenario D**: Bots → 200, safe. Bot UA guard works correctly.

The GEO guard in proxy.ts is correct. The bug is in the Accept-Language injection that causes next-intl to redirect (not rewrite) and then permanently bake GEO locale into cookie.

---

## Fix Direction

**Option 1 — Change GEO approach: use explicit redirect instead of header injection**

Instead of injecting Accept-Language and letting next-intl redirect, do the redirect explicitly in proxy.ts to `/en/${pathname}` and use `NextResponse.redirect()`. Then prevent the cookie overwrite by not hitting next-intl for that redirected path.

**Option 2 — Use localeDetection: false + manual locale resolution**

Disable next-intl's automatic locale detection and handle all locale logic in proxy.ts manually. Prevents next-intl from ever overwriting the cookie based on URL.

**Option 3 — Prevent RSC prefetch from setting cookies (partial fix)**

In proxy.ts, detect prefetch requests (`Next-Router-Prefetch: 1` header) and strip `Set-Cookie` from the response. Prevents prefetch from corrupting cookie, but doesn't fix the GEO first-visit flow.

**Recommended: Option 1** — explicit redirect from proxy.ts, then `NextResponse.next()` without passing to `intlMiddleware` to avoid the cookie overwrite. Requires also addressing the GEO-redirect-then-set-cookie sequence.

---

## Monitoring Gap

No alert/logging when `NEXT_LOCALE` cookie changes from one non-default locale to another. Silent cookie corruption is invisible without tracking.

---

## Unresolved Questions

1. Does the bug also trigger for KO/JA users (similar GEO flow for KR/JP)? Evidence suggests yes — same code path.
2. Does the language switcher (`switchLocale('en')` then back) also permanently trap users in EN? Yes — `router.replace(pathname, {locale:'en'})` navigates to `/en/*` which stamps cookie. User has to click VI in the switcher again to reset, but only if they know to look there.
3. Is there a way to reproduce via shared link (e.g., FB share of `/en/...` URL)? Yes — sharing any `/en/*` URL and having a VI user click it would trigger Trigger B.
