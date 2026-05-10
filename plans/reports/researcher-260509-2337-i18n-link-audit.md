# i18n Routing Link Audit Report

**Date:** 2026-05-09  
**Tech Stack:** Next.js 16.2.2 + next-intl 4.9.1  
**Scope:** Complete scan of internal navigation links (next/link vs @/i18n/navigation)  
**Issue:** User reports language resets to EN when clicking internal links despite NEXT_LOCALE=vi cookie

---

## Executive Summary

**CRITICAL FINDING:** 11 files using `next/link` (raw Next.js navigation) instead of `@/i18n/navigation` (i18n-aware Link). This breaks locale persistence. When user is on Vietnamese (vi) with NEXT_LOCALE=vi cookie, clicking these links can trigger unintended locale switching.

**Root Cause:** next-intl v4.9.1's `Link` component from `@/i18n/navigation` handles locale prefix logic internally. Raw `next/link` does NOT. This is the **PRIMARY VECTOR** for locale loss.

---

## Hot Links — Top Issues

### 1. **Article Page Linking** ⚠️ HIGH
**File:** `src/app/[locale]/[product]/[type]/[slug]/page.tsx`  
**Lines:** 17, 248-249, 264

```typescript
// Line 17: WRONG
import Link from "next/link";

// Line 248-249: WRONG — related articles
<Link href={r.urlPath} ...>

// Line 264: WRONG — back to hub
<Link href={hubHref}>← Xem tất cả bài {hubLabel.toLowerCase()}</Link>
```

**Why Critical:** This is the main article rendering page. Every MDX article render uses wrong Link. `hubHref` is `/kien-thuc` or `/tin-tuc` — no locale prefix. When accessed as `/en/xoai-tu-quy/kien-thuc/xoai-la-gi`, clicking "back to hub" goes to `/tin-tuc` → middleware redirects to `/en/tin-tuc` (wrong locale override).

**Evidence:** Lines 129-130 define `hubHref = article.type === "kien-thuc" ? "/kien-thuc" : "/tin-tuc"` with no locale.

---

### 2. **Tin-tuc Hub Navigation** ⚠️ HIGH
**File:** `src/app/[locale]/tin-tuc/page.tsx`  
**Lines:** 2, 157-158

```typescript
// Line 2: WRONG
import Link from "next/link";

// Line 157-158: WRONG
<Link href={post.href} className="...">
```

**Why Critical:** `post.href` comes from lines 81 (`/tin-tuc/${p.slug}`) and 104 (`a.urlPath`). No locale prefix. Hub is the main aggregation page; every post card uses wrong Link.

**Evidence:** dòng 94-115: MDX articles only show on vi locale, but `post.href` hardcoded without locale check.

---

### 3. **Giao-hang Shipping Links** ⚠️ MEDIUM
**File:** `src/app/[locale]/giao-hang/[city]/page.tsx`  
**Lines:** 13, 188, 235

```typescript
// Line 13: WRONG
import Link from "next/link";

// Line 188: WRONG — product catalog
<Link href={`/${p.slug}`} ...>

// Line 235: WRONG — footer links
<Link key={link.href} href={link.href} ...>
```

**Why Critical:** Dòng 230-233 links array: `/xoai-tu-quy`, `/dua-xiem-ben-tre`, `/san-pham`, `/#contact`. User on `/en/giao-hang/ha-noi` clicks `/xoai-tu-quy` → goes to `/xoai-tu-quy` (no locale) → middleware detects no locale prefix, defaults to defaultLocale=vi → language switches to VI.

---

### 4. **Product Landing Pages** ⚠️ MEDIUM
**Files:**
- `src/components/product/xoai-hoang-kim-landing.tsx:179`
- `src/components/product/dua-xiem-ben-tre-landing.tsx:331`
- `src/components/product/xoai-tu-quy-landing.tsx:381`

```typescript
// All use: import Link from "next/link";
// All iterate internalLinks from translations:
<Link key={link.href} href={link.href} ...>
```

**Why Critical:** `internalLinks` from translations likely contain unprefixed paths like `/xoai-tu-quy`, `/dua-xiem-ben-tre`, `/san-pham`. Same issue as giao-hang.

---

### 5. **Product Catalog Component** ⚠️ MEDIUM
**File:** `src/components/product/product-catalog.tsx:83`

```typescript
<Link href={`/${product.slug}`} className={cardClass}>
```

Hardcoded unprefixed slug link. When user on EN product page clicks another product, goes to `/xoai-tu-quy` (no locale) → resets to VI.

---

### 6. **SEO Components** ⚠️ LOW-MEDIUM
**Files:**
- `src/components/seo/pricing-page-content.tsx:134, 163`
- `src/components/seo/order-page-content.tsx:98`

```typescript
// pricing-page-content.tsx
<Link href="/xoai-hoang-kim" ...>
<Link href="/dua-xiem-ben-tre" ...>

// order-page-content.tsx
<Link href={`/${product.slug}`} ...>
```

Same pattern — unprefixed links.

---

## Hypothesis: Why EN Override Happens

### Hypothesis #1: Middleware Locale Detection (HIGH LIKELIHOOD)

**Flow when NEXT_LOCALE=vi cookie exists:**
1. User on `/en/xoai-tu-quy` (EN product page)
2. Clicks `<Link href="/xoai-hoang-kim" />` (wrong Link, unprefixed)
3. Browser navigates to `/xoai-hoang-kim` (no locale prefix)
4. `src/proxy.ts` middleware runs:
   - Line 34: `hasLocaleCookie = request.cookies.has("NEXT_LOCALE")` ✓ (vi cookie exists)
   - Line 38: `if (!hasLocaleCookie && !isBot)` → FALSE, skips GEO redirect ✓
   - Line 55: `return intlMiddleware(request)` (normal path)
5. next-intl middleware **MAY** detect missing locale prefix `/xoai-hoang-kim` and rewrite/redirect to `/en/xoai-hoang-kim` if:
   - Default behavior when no locale is detected and `localePrefix: "as-needed"` is configured
   - next-intl v4.9.1 may default to last-visited locale OR server's Accept-Language header

**Issue:** Middleware respects cookie for GEO, but next-intl's internal locale detection might see no locale prefix and fall back to Accept-Language header (which middleware set on dòng 46 if GEO was detected). If subsequent request has `Accept-Language: en` from browser, middleware rewrites to `/en/`.

**Likelihood:** HIGH. This is the most probable path.

---

### Hypothesis #2: Language Switcher Override (MEDIUM LIKELIHOOD)

**File:** `src/components/language-switcher.tsx:34`

```typescript
const switchLocale = (next: string) => {
  router.replace(pathname, { locale: next });
  setOpen(false);
};
```

Uses correct i18n router. BUT:
- If user clicks a wrong Link first → locale state resets
- LanguageSwitcher uses `useLocale()` from next-intl/server → reads current request locale (which may now be EN due to hypothesis #1)
- When user tries to switch back to VI, switching context is corrupted

**Likelihood:** MEDIUM. Symptom suggests locale is already wrong before switching.

---

### Hypothesis #3: Accept-Language Header Conflict (MEDIUM LIKELIHOOD)

**Middleware dòng 46:**

```typescript
headers.set("Accept-Language", `${geoLocale}, vi;q=0.5`);
```

When GEO-based redirect happens:
- If user from Korea (KR) → KR is first visit, no cookie yet → middleware sets `Accept-Language: ko, vi;q=0.5`
- Cookie set to NEXT_LOCALE=ko
- User clicks unprefixed link `/xoai-tu-quy`
- Middleware sees cookie=ko, skips GEO, but **does NOT remove the Accept-Language header** from earlier GEO detection
- next-intl might re-read stale Accept-Language and rewrite to `/ko/`

**Likelihood:** MEDIUM. Depends on whether middleware clears headers between requests.

---

## Files to Fix — Detailed List

### PRIORITY 1 (Critical — Core Pages)

| File | Lines | Import Fix | href Fix | Notes |
|------|-------|-----------|----------|-------|
| `src/app/[locale]/[product]/[type]/[slug]/page.tsx` | 17, 248, 264 | Change to `@/i18n/navigation` | Wrap with `getPathname()` or use relative href | Article hub link + related articles |
| `src/app/[locale]/tin-tuc/page.tsx` | 2, 157 | Change to `@/i18n/navigation` | Pass locale-aware href (recompute from params) | Main blog hub — highest traffic |

### PRIORITY 2 (High — User-Facing Navigation)

| File | Lines | Import Fix | href Fix | Notes |
|------|-------|-----------|----------|-------|
| `src/app/[locale]/giao-hang/[city]/page.tsx` | 13, 188, 235 | Change to `@/i18n/navigation` | Use i18n Link for product links in footer | Shipping hub — frequent cross-navigation |
| `src/components/product/xoai-hoang-kim-landing.tsx` | 8, 179 | Change to `@/i18n/navigation` | Fetch internalLinks with locale awareness or use i18n Link | Premium product landing |
| `src/components/product/dua-xiem-ben-tre-landing.tsx` | 9, 328 | Change to `@/i18n/navigation` | Same as above | Main product landing |
| `src/components/product/xoai-tu-quy-landing.tsx` | 11, 381 | Change to `@/i18n/navigation` | Same as above | Main product landing |

### PRIORITY 3 (Medium — Component Links)

| File | Lines | Import Fix | href Fix | Notes |
|------|-------|-----------|----------|-------|
| `src/components/article-layout.tsx` | 8, 98, 158 | Change to `@/i18n/navigation` | dòng 98: href="/tin-tuc" OK (top-level). dòng 158: ensure EXPLORE_LINK_META uses i18n Link | Article footer explore links |
| `src/components/product/product-catalog.tsx` | 11, 83 | Change to `@/i18n/navigation` | Use i18n Link for `/${product.slug}` | Product catalog widget |
| `src/components/seo/pricing-page-content.tsx` | 7, 134, 163 | Change to `@/i18n/navigation` | Replace hardcoded `/xoai-hoang-kim` etc | SEO pricing page |
| `src/components/seo/order-page-content.tsx` | 7, 98 | Change to `@/i18n/navigation` | Replace `/${product.slug}` with i18n Link | Order/checkout page |
| `src/components/seo/seo-shipping-section.tsx` | 5, 38 | Change to `@/i18n/navigation` | Use i18n Link for route.href | Shipping section widget |

---

## Tests to Verify Fix

### Test 1: Cookie Persistence Across Navigation
```
1. Open https://www.traicaybentre.com/en/xoai-tu-quy (EN locale)
2. Open DevTools → Application → Cookies
3. Verify NEXT_LOCALE=en
4. Click "Dừa Xiêm Bến Tre" product link
5. Wait for navigation
6. Verify URL is now /en/dua-xiem-ben-tre (NOT /dua-xiem-ben-tre)
7. Verify NEXT_LOCALE still =en (cookie unchanged)
```

### Test 2: Related Articles Navigation
```
1. Open https://www.traicaybentre.com/en/xoai-tu-quy/kien-thuc/xoai-la-gi
2. Scroll to "Bài liên quan" section
3. Click related article link
4. Verify URL is /en/xoai-tu-quy/kien-thuc/[related-slug] (HAS /en/)
5. Click "← Xem tất cả bài Kiến thức" back link
6. Verify URL is /en/kien-thuc (HAS /en/)
```

### Test 3: Hub Navigation (Tin-tức)
```
1. Open https://www.traicaybentre.com/en/tin-tuc
2. Click first article card
3. Verify URL is /en/tin-tuc/[product]/[type]/[slug] (HAS /en/)
```

### Test 4: Language Switcher Still Works
```
1. Open https://www.traicaybentre.com/en/xoai-tu-quy
2. Click language switcher → select VI
3. Verify URL is /xoai-tu-quy (VI locale, no prefix — correct)
4. Verify NEXT_LOCALE=vi (cookie set)
5. Click product link
6. Verify stays on VI (no /en/ prefix)
```

### Test 5: Cross-Product Navigation
```
1. Open https://www.traicaybentre.com/ko/giao-hang/ha-noi
2. Click "Xoài Tứ Quý" product link in footer
3. Verify URL is /ko/xoai-tu-quy (HAS /ko/)
4. Click "Dừa Xiêm" product link
5. Verify URL is /ko/dua-xiem-ben-tre (HAS /ko/)
```

---

## Root Cause Analysis Summary

| Hypothesis | Evidence | Likelihood | Impact |
|-----------|----------|-----------|--------|
| **next-intl middleware rewrites unprefixed to last-detected locale** | 11 files using `next/link` without locale prefix; middleware sees missing prefix; next-intl v4.9.1 default behavior | **HIGH** | Primary vector — every link in these files triggers rewrite |
| **Accept-Language header retention** | Middleware sets header on dòng 46; no cleanup visible; next-intl may re-read stale header | **MEDIUM** | Secondary vector — affects users from GEO-targeted countries |
| **LanguageSwitcher state corruption** | Uses i18n router correctly, but if locale already wrong (from #1), switching fails | **LOW** | Symptom of #1, not root cause |

---

## Unresolved Questions

1. **Does next-intl v4.9.1 auto-rewrite unprefixed routes to last-detected locale?** Need to verify against next-intl changelog and source code for version 4.9.1 behavior.

2. **Why is middleware setting Accept-Language header on dòng 46?** This may interfere with next-intl's locale detection. Should test if removing this header fixes the issue.

3. **Does NEXT_LOCALE cookie actually persisted in `request.cookies` after middleware runs?** The check on dòng 34 may happen before Next.js populates cookies in middleware context.

4. **Are there other middleware.ts files in the project that could override proxy.ts behavior?** Checked — only one middleware (src/proxy.ts).

5. **What's the exact version of next-intl's createNavigation() behavior for Link in v4.9.1?** Need official documentation or PR history.

---

## Recommendations (For Implementation Team)

1. **Immediate:** Replace ALL imports of `next/link` with `@/i18n/navigation` Link in the 11 files listed above.

2. **Add ESLint rule** to enforce `@/i18n/navigation` Link in app/[locale] routes:
   ```json
   {
     "no-restricted-imports": [
       "error",
       {
         "name": "next/link",
         "message": "Use Link from @/i18n/navigation in [locale] routes"
       }
     ]
   }
   ```

3. **Test middleware behavior** with unprefixed routes by adding temporary logging:
   ```typescript
   console.log("middleware input:", request.nextUrl.pathname);
   console.log("has NEXT_LOCALE:", request.cookies.has("NEXT_LOCALE"));
   console.log("intl output:", intlMiddleware(request));
   ```

4. **Consider removing the Accept-Language header injection** (dòng 46) if not needed for GEO detection. Let browser's native header handle it.

5. **After fixes, re-run the 5 tests above** in staging/production to verify locale persistence.

---

## Status

**CRITICAL ISSUES FOUND:** 11 files using wrong Link component.  
**FIX COMPLEXITY:** Low — mechanical replacement of imports + slight href adjustments.  
**ESTIMATED FIX TIME:** 2-3 hours (change imports + test).

