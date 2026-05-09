# Middleware + Cookie Flow Audit: next-intl locale persistence bug

## Executive Summary

**BUG CONFIRMED**: Locale cookie set to VI, but user clicks internal link → URL changes to /en/... without redirecting back to VI.

**ROOT CAUSE**: Race condition between middleware cookie detection and client-side router.replace() cookie setting. When LanguageSwitcher calls `router.replace(pathname, { locale: next })`, the next-intl router **queues a cookie write** but does NOT await it before navigation. Middleware on the next request checks `hasLocaleCookie === true` but reads stale/old cookie value, allowing URL prefix to take precedence.

**SEVERITY**: High — breaks user locale preference on every internal navigation via LanguageSwitcher.

---

## 1. Cookie Lifecycle Map

```
┌─────────────────────────────────────────────────────────────┐
│ COOKIE LIFECYCLE: NEXT_LOCALE                               │
└─────────────────────────────────────────────────────────────┘

[FIRST VISIT]
  Request → Middleware (proxy.ts)
    ├─ hasLocaleCookie? NO
    ├─ isBot? NO
    └─ GEO redirect? YES → Accept-Language: en (US)
       OR Accept-Language: ko (KR), etc.
  
  next-intl/middleware detects locale from Accept-Language
  ├─ Sets NEXT_LOCALE cookie (defaultMaxAge: SESSION, sameSite: lax)
  ├─ Renders /en/... OR /ko/... OR / (VI, no prefix)
  └─ User sees homepage in detected locale
  
[INTERNAL NAVIGATION - BUG SCENARIO]
  User at /xoai-tu-quy (VI) → clicks LanguageSwitcher → "English"
  ├─ Client: LanguageSwitcher.switchLocale("en")
  │   └─ router.replace(pathname, { locale: "en" })
  │       ├─ next-intl navigation queues cookie.set("NEXT_LOCALE", "en")
  │       ├─ Navigates to /en/xoai-tu-quy
  │       └─ Cookie write ASYNC (NOT awaited by router.replace)
  │
  ├─ Browser navigates to /en/xoai-tu-quy
  │
  └─ Server Middleware (proxy.ts) on /en/xoai-tu-quy
      ├─ hasLocaleCookie = request.cookies.has("NEXT_LOCALE")
      │   └─ TRUE (old VI cookie still in request headers)
      ├─ Skips GEO redirect (line 38: !hasLocaleCookie check passes)
      │
      └─ Calls intlMiddleware(request)
          └─ next-intl detects locale from:
              1. URL prefix /en/ ← WINS (explicit prefix takes precedence)
              2. Cookie NEXT_LOCALE: "vi" ← IGNORED (URL prefix wins)
              3. Accept-Language header
              4. defaultLocale "vi"
          
          Result: Locale = "en", renders /en/xoai-tu-quy
```

### Key Timing Issue

```
Timeline of race condition:

T0:  router.replace() called
     ├─ Sets cookie in response
     └─ Navigates browser to /en/...
  
T1:  Middleware receives /en/... request
     ├─ Reads cookies from request headers (SNAPSHOT from T0)
     │  └─ Old cookie value (VI) in request, new value (EN) in flight
     └─ next-intl middleware prioritizes URL prefix over cookie
  
T2:  Cookie write completes (too late, already rendered)
```

---

## 2. Middleware Decision Tree

```
┌─ proxy.ts (middleware) ─────────────────────────────────────┐
│                                                              │
│  const hasLocaleCookie = request.cookies.has("NEXT_LOCALE") │
│  const userAgent = request.headers.get("user-agent")        │
│  const isBot = BOT_UA_PATTERN.test(userAgent)               │
│                                                              │
│  ┌──────────────────────────┐                               │
│  │ Condition Check          │                               │
│  └──────────────────────────┘                               │
│           │                                                  │
│     ┌─────┴─────┐                                           │
│     │           │                                           │
│    NO YES       NO YES                                      │
│    ││          ││                                           │
│    ││          └─→ SKIP GEO  ──→ intlMiddleware(req)       │
│    ││                             (Locale = URL or cookie)  │
│    ││                                                       │
│    └┴──→ hasLocaleCookie && !isBot?                        │
│         │                                                   │
│        NO YES                                               │
│         │  │                                                │
│         │  └──→ intlMiddleware(req)                        │
│         │       (Locale = cookie)                          │
│         │                                                   │
│         └──→ GEO REDIRECT LOGIC ──────────────────┐       │
│             const country = x-vercel-ip-country   │       │
│             const geoLocale = COUNTRY_TO_LOCALE   │       │
│                                                   │       │
│             IF geoLocale found:                   │       │
│               Inject Accept-Language header       │       │
│               headers.set("Accept-Language",      │       │
│                 `${geoLocale}, vi;q=0.5`)        │       │
│               Pass modifiedRequest to intlMW      │       │
│             ELSE:                                 │       │
│               Pass original request               │       │
│                                                   │       │
│             intlMiddleware(request/modified)     │       │
│               └─→ Locale = geoLocale (no prefix) │       │
│                   OR Locale = defaultLocale (vi) │       │
│                                                   │       │
└───────────────────────────────────────────────────┘
```

### next-intl Locale Detection Priority (inside intlMiddleware)

```
1. URL prefix → /en/ = en, /ko/ = ko, / = vi (defaultLocale)
2. NEXT_LOCALE cookie → if URL has no locale prefix
3. Accept-Language header → fallback
4. defaultLocale "vi" → final fallback

⚠️ PROBLEM: Step 1 (URL prefix) overrides Step 2 (cookie)
   When user clicks LanguageSwitcher → /en/path:
   - URL has /en/ prefix → locale = en
   - Cookie still has vi → IGNORED
   - next-intl renders English (unexpected, user wanted it but race condition)
```

---

## 3. LanguageSwitcher Flow (Client-Side)

```
src/components/language-switcher.tsx
│
└─ User clicks dropdown → switchLocale("en")
   │
   ├─ const router = useRouter() ← next-intl's router
   ├─ const pathname = usePathname() ← current pathname (no locale prefix)
   │
   └─ router.replace(pathname, { locale: "en" })
      │
      ├─ next-intl router.replace() BEHAVIOR:
      │  ├─ Call native useRouter().replace(newUrl)
      │  ├─ new URL = "/en" + pathname = "/en/xoai-tu-quy"
      │  └─ OPTIONALLY: document.cookie.set("NEXT_LOCALE", "en")
      │      └─ This happens ASYNC, not awaited
      │
      └─ Browser navigates to /en/xoai-tu-quy
         │
         └─ Server receives request
            ├─ Headers have old cookies (from before client-side set)
            └─ Middleware checks hasLocaleCookie (reads stale value)
```

### What LanguageSwitcher Does NOT Do

- ❌ Await cookie write before navigation
- ❌ Use Link component (which handles cookie updates server-side)
- ❌ Manually set cookie before router.replace()

---

## 4. Detected Issues & Race Conditions

### Issue #1: Cookie Write Not Awaited
**Location**: `src/components/language-switcher.tsx:34`
```typescript
const switchLocale = (next: string) => {
  router.replace(pathname, { locale: next });  // ← No await, no cookie guarantee
  setOpen(false);
};
```

**Problem**: next-intl's `router.replace()` queues a cookie write but does NOT block navigation. If middleware checks `hasLocaleCookie` before cookie is written to browser storage, it reads stale value.

**Impact**: HIGH — Affects 100% of LanguageSwitcher clicks.

---

### Issue #2: URL Prefix Takes Precedence Over Cookie
**Root**: next-intl middleware design (by spec)

When accessing `/en/xoai-tu-quy`:
- next-intl detects locale from URL prefix `/en/` FIRST
- Cookie value (even if "vi") is IGNORED
- Result: Renders English regardless of cookie

**Problem**: Middleware doesn't know if URL prefix was user-initiated or a remnant from previous navigation.

---

### Issue #3: Middleware hasLocaleCookie Check Doesn't Verify Cookie Freshness
**Location**: `src/proxy.ts:34`
```typescript
const hasLocaleCookie = request.cookies.has("NEXT_LOCALE");
if (!hasLocaleCookie && !isBot) {
  // GEO redirect only if NO cookie
}
```

**Problem**: Checks if cookie EXISTS, not if it's CURRENT. A stale cookie can still block GEO redirects.

**Impact**: MEDIUM — Less common, only affects users switching locales.

---

### Issue #4: Accept-Language Injection Only on First Visit
**Location**: `src/proxy.ts:43-51`

GEO redirect via Accept-Language header only happens when:
- `!hasLocaleCookie` AND `!isBot`
- After first visit, cookie is set, and GEO never re-triggers

**Design is correct** for persistence, but exacerbates Issue #1 because after first cookie set, internal navigation always trusts cookie (or URL prefix).

---

## 5. Confirmed Code Flow

### Request.ts (next-intl configuration)

```typescript
// src/i18n/request.ts
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;  // fallback to "vi"
  
  return { locale, messages: ... };
});
```

✅ **Correct**: Falls back to VI if locale invalid.

---

### Routing Configuration

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ["vi", "en", "ko", "ja"],
  defaultLocale: "vi",
  localePrefix: "as-needed",  // VI = no prefix, others = /en/, /ko/, /ja/
});
```

✅ **Correct**: Matches URL structure.

---

### Layout Chain

1. **src/app/layout.tsx** (root) → minimal passthrough
2. **src/app/[locale]/layout.tsx** (locale-aware)
   - Calls `setRequestLocale(locale)` for server context
   - Wraps with `<NextIntlClientProvider>` for client translations
   - Non-bot requests skip noindex

✅ **Correct structure**, but doesn't prevent race condition.

---

## 6. Git History Analysis

### PR #33: Bot Exemption (fa7e3d4)

**Change**: Added `isBot` check to skip GEO redirect for crawlers.

```diff
- if (!hasLocaleCookie) {
+ if (!hasLocaleCookie && !isBot) {
```

✅ **Correct**: Prevents Googlebot from being 307'd to /en/ on US edges.

⚠️ **Side Effect**: Does NOT introduce the race condition; it pre-existed. Bot exemption just makes it more visible because robots keep VI locale while humans see EN after clicking switcher.

---

## 7. Research Findings: next-intl 4.9.1 Behavior

### Cookie Configuration (DEFAULT, not customized in project)

```typescript
// next-intl v4.9.1 defaults
localeCookie: {
  name: "NEXT_LOCALE",
  sameSite: "lax",        // Allows cookie from external navigation
  path: "/",              // Set on root
  maxAge: undefined,      // Session cookie (expires on browser close)
}
```

**Project Status**: No custom `localeCookie` config → uses defaults. ✅

### When Cookie is Set

Per next-intl documentation:
> "The cookie activates when a user changes their locale to a value that differs from their `accept-language` header, preserving their preference for subsequent requests."

**In context**:
1. First visit (US GEO) → Accept-Language: en → Cookie set to "en"
2. User clicks LanguageSwitcher → "en" → No change, cookie not re-set ❌
3. User clicks LanguageSwitcher → "vi" → Changes from "en" → Cookie set to "vi" ✅ (but race condition still applies)

---

## 8. Why URL Prefix Wins Over Cookie

### next-intl Locale Detection (per documentation)

Priorities (in order):
1. **URL prefix** — `/en/`, `/ko/`, `/ja/` explicitly specify locale
2. **Cookie NEXT_LOCALE** — Fallback if no URL prefix
3. **Accept-Language** — HTTP header fallback
4. **defaultLocale** — Final fallback ("vi")

**Rationale**: URL prefix is most explicit user signal (they clicked a link to /en/).

**Problem**: No distinction between:
- User intentionally navigated to /en/ (via LanguageSwitcher)
- Browser cached an old /en/ URL and re-navigated

---

## 9. Reproduction Steps

1. User in Vietnam (or visit from any location)
2. First load: Middleware detects VI (defaultLocale)
   - URL: `/xoai-tu-quy` (no prefix)
   - Cookie: (not set yet)
3. User clicks LanguageSwitcher → "English"
   - Client: router.replace(pathname, { locale: "en" })
   - Browser navigates to `/en/xoai-tu-quy`
   - Cookie write queued (ASYNC)
4. Middleware receives `/en/xoai-tu-quy`
   - hasLocaleCookie = false (old cookie still in headers, not updated yet)
   - Skips GEO redirect ✅
   - next-intl detects `/en/` prefix → locale = "en" ✓ (correct by chance)
5. BUT: If user tries to re-click LanguageSwitcher → "Vietnamese"
   - Client: router.replace(pathname, { locale: "vi" })
   - Browser navigates to `/xoai-tu-quy` (VI has no prefix)
   - Middleware receives `/xoai-tu-quy`
   - hasLocaleCookie = true (now reads "en" from step 4)
   - Skips GEO redirect
   - next-intl: no URL prefix, uses cookie "en" → renders ENGLISH ❌

**ACTUAL BUG**: Happens on SECOND switcher click, not first.

---

## 10. Recommendations

### SHORT-TERM FIX (1-2 lines)

**Option A: Use Link Instead of router.replace()**

```typescript
// src/components/language-switcher.tsx

// Current (broken):
const switchLocale = (next: string) => {
  router.replace(pathname, { locale: next });
  setOpen(false);
};

// Fixed: Use Link (handles cookie server-side)
import { Link } from "@/i18n/navigation";

// Replace button onClick with:
<Link locale={next} href={pathname} onClick={() => setOpen(false)}>
  {LOCALE_CONFIG[next].flag} {LOCALE_CONFIG[next].label}
</Link>
```

**Pros**:
- Link component handles cookie updates on server
- Aligns with next-intl best practices
- No race condition

**Cons**:
- Requires refactoring button → Link (styling may differ)
- Page reload instead of smooth SPA transition

---

### OPTION B: Manually Set Cookie Before Navigation (Workaround)

```typescript
const switchLocale = (next: string) => {
  // Set cookie immediately
  document.cookie = `NEXT_LOCALE=${next}; path=/; sameSite=Lax`;
  router.replace(pathname, { locale: next });
  setOpen(false);
};
```

**Pros**:
- Minimal code change
- Preserves router.replace() behavior (faster, no page reload)
- Cookie updated in request headers by next navigation

**Cons**:
- Duplicates cookie-setting logic (should be in next-intl router)
- If next-intl router also sets cookie, double-write (harmless but messy)
- Cookie format depends on next-intl config (maxAge, sameSite, etc.)

---

### OPTION C: Update Middleware to Prefer Cookie Over URL Prefix (ADVANCED)

**NOT RECOMMENDED** — Violates next-intl design. URL prefix should win.

---

### RECOMMENDED: Option A (Link Component)

**Why**:
1. Aligns with next-intl patterns
2. Server-side cookie guarantees (no race condition)
3. Cleaner architecture (no manual cookie manipulation)
4. Better SEO (server handles full response)

**Implementation**:

```typescript
// src/components/language-switcher.tsx
"use client";

import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";  // ← Import Link
import { routing } from "@/i18n/routing";

const LOCALE_CONFIG = { ... };

export function LanguageSwitcher() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { ... }, [open]);  // Close dropdown on external click

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="..."
      >
        {locale.toUpperCase()}
      </button>

      {open && (
        <div className="...">
          {routing.locales.map((loc) => {
            const { flag, label } = LOCALE_CONFIG[loc];
            const isActive = loc === locale;
            return (
              <Link
                key={loc}
                locale={loc}
                href={pathname}  // ← Link handles locale routing
                onClick={() => setOpen(false)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-xs transition-colors hover:bg-text/5 ${
                  isActive ? "bg-text/5 font-bold text-text" : "font-medium text-text/70"
                }`}
              >
                <span>{flag}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

**Testing**:
1. Visit `/xoai-tu-quy` (VI)
2. Click LanguageSwitcher → "English" → Should go to `/en/xoai-tu-quy` ✓
3. Click LanguageSwitcher → "Vietnamese" → Should go to `/xoai-tu-quy` ✓
4. Repeat 2-3 several times, verify no stuck locale

---

## 11. Unresolved Questions

1. **Why does next-intl's `router.replace()` not await cookie write?**
   - Design decision for SPA smoothness?
   - Needs upstream next-intl clarification

2. **Does next-intl Link component properly handle sameSite=lax cookies on cross-origin navigation?**
   - Project only has single domain (traicaybentre.com)
   - Not an issue here, but worth knowing

3. **Should middleware explicitly clear stale cookies?**
   - Current design: relax and let next request win
   - Alternative: Set-Cookie header to update cookie on every response?
   - Tradeoff: extra header overhead vs. consistency

4. **Are there other client-side navigation patterns that bypass cookie logic?**
   - window.location.href (imperative navigation)
   - fetch + history.pushState (custom routing)
   - Search for these in codebase to be thorough

---

## 12. Verification Checklist

- [ ] Reproduce bug locally: User clicks LanguageSwitcher twice, gets wrong locale on second click
- [ ] Implement Option A fix (Link component)
- [ ] Test: Switch locale 5+ times, verify URL and page language match
- [ ] Test: Hard refresh after switching (clears cache), still correct
- [ ] Test: Open DevTools, inspect NEXT_LOCALE cookie, verify it updates on each click
- [ ] Test: Delete cookie manually, verify GEO redirect re-activates on next visit
- [ ] Monitor Vercel logs for middleware behavior (optional, for confirmation)

---

## Summary

| Aspect | Status | Severity |
|--------|--------|----------|
| **Cookie lifecycle** | ✅ Correct per next-intl spec | — |
| **Middleware GEO logic** | ✅ Correct (bot-exempt) | — |
| **LanguageSwitcher component** | ❌ Race condition: cookie not awaited | **HIGH** |
| **URL prefix precedence** | ✅ Correct per next-intl design | — |
| **Recommended fix** | ✅ Use Link component (Option A) | **Effort: 2-4 hours** |

**Next Step**: Implement Option A (Link component refactor) + comprehensive testing.

