# Verification Report — i18n locale-trap fix

**Date**: 2026-05-09 23:37 (Asia/Saigon)
**Plan**: `plans/260509-2337-fix-i18n-locale-trap/`
**Status**: ALL GATES GREEN ✓

## Build gates

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | ✓ Clean (no errors) |
| `bun run lint` (modified files) | ✓ Clean (818 pre-existing errors unchanged) |
| `bun run build` | ✓ Exit 0 — compiled in 2.2s |

Pre-existing `MISSING_MESSAGE` warnings about `articleMeta.pillarLabels.*` in vi.json are unrelated to this fix (separate issue tracked elsewhere).

## Static checks

| Check | Result |
|---|---|
| `grep -rln 'from "next/link"' src` | 0 results ✓ |
| `grep -E "x-vercel-ip-country\|Accept-Language\|COUNTRY_TO_LOCALE" src/proxy.ts` | 0 matches (only kept in comments) ✓ |
| `grep "localeDetection" src/i18n/routing.ts` | line 11: `localeDetection: false` ✓ |

## Curl smoke matrix (port 3002, production server)

| # | Scenario | Cookie | Headers | Expected | Actual | Pass |
|---|---|---|---|---|---|---|
| A | VI link, no cookie | none | UA: browser | 200 OK | 200 OK | ✓ |
| B | VI link, cookie=vi | vi | UA: browser | 200 OK | 200 OK | ✓ |
| C | VI link, cookie=en | en | UA: browser | 200 OK on `/xoai-tu-quy` (URL wins under localeDetection=false) | 200 OK | ✓ |
| D | EN link, cookie=vi | vi | URL `/en/xoai-tu-quy` | 200 OK on `/en/...` | 200 OK | ✓ |
| **E** | **No cookie + GEO=US** | none | x-vercel-ip-country=US | **200 OK on `/xoai-tu-quy`** (was 307→/en/) | 200 OK | ✓ KEY FIX |
| **F** | **No cookie + Accept-Language=en** | none | Accept-Language: en-US | **200 OK on `/xoai-tu-quy`** (was 307→/en/) | 200 OK | ✓ KEY FIX |
| G | Bot UA on `/xoai-tu-quy` | none | UA: Googlebot | 200 OK | 200 OK | ✓ |
| H | Bot UA on `/en/xoai-tu-quy` | none | UA: Googlebot | 200 OK on `/en/...` | 200 OK | ✓ |

**ALL 8 scenarios PASS.** Critical: E + F no longer redirect to `/en/`, eliminating the cookie-poisoning trap.

## Render verification

```
GET /xoai-tu-quy        → <html lang="vi">  hrefs unprefixed (e.g., /kien-thuc, /san-pham)
GET /en/xoai-tu-quy     → <html lang="en">  hrefs all prefixed (/en/kien-thuc, /en/san-pham)
```

i18n `Link` component correctly auto-prefixes based on current locale context.

## Files changed (production code only — 14 files)

| File | Change |
|---|---|
| `src/proxy.ts` | Strip GEO logic — vanilla next-intl middleware |
| `src/i18n/routing.ts` | Add `localeDetection: false` |
| `src/components/language-switcher.tsx` | Module-level cookie persistence helper |
| `src/app/[locale]/[product]/[type]/[slug]/page.tsx` | Migrate next/link → @/i18n/navigation |
| `src/app/[locale]/tin-tuc/page.tsx` | (same) |
| `src/app/[locale]/giao-hang/[city]/page.tsx` | (same) |
| `src/components/article-layout.tsx` | (same) |
| `src/components/product/xoai-tu-quy-landing.tsx` | (same) |
| `src/components/product/xoai-hoang-kim-landing.tsx` | (same) |
| `src/components/product/dua-xiem-ben-tre-landing.tsx` | (same) |
| `src/components/product/product-catalog.tsx` | (same) |
| `src/components/seo/pricing-page-content.tsx` | (same) |
| `src/components/seo/seo-shipping-section.tsx` | (same) |
| `src/components/seo/order-page-content.tsx` | (same) |

## Sign-off

- Build: PASS
- Static: PASS
- Smoke matrix: PASS (8/8 including 2 key-fix scenarios)
- Render: PASS

**Status:** DONE
**Summary:** All quality gates green. Ready for code-review + merge.

## Unresolved

- Pre-existing `MISSING_MESSAGE` errors for `articleMeta.pillarLabels.*` in messages/vi.json (out of scope — pre-existing).
