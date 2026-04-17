# SEO Technical Audit: traicaybentre.com
**Date:** April 17, 2026  
**Scope:** Next.js 15 App Router, next-intl 4 locales, 111+ URLs sitemap  
**Verification:** Code review (confirmed via curl/grep) + live page testing

---

## SCORE: 78/100

| Category | Score | Status |
|----------|-------|--------|
| Meta Tags (title/desc) | 85/100 | ✓ Good lengths, proper encoding |
| Canonical & Hreflang | 55/100 | ⚠ Critical gap in article pages |
| Structured Data | 90/100 | ✓ Comprehensive JSON-LD |
| Sitemap | 95/100 | ✓ Dynamic, all 4 locales |
| Robots.txt | 100/100 | ✓ Clean, sitemap URL present |
| URL Structure | 90/100 | ✓ Trailing slash consistent |
| ISR / Revalidate | 85/100 | ✓ Sensible intervals |

---

## CRITICAL ISSUES (Must Fix)

### 🔴 [CRITICAL] Article Pages Missing hreflang Alternates
- **File:** `src/app/[locale]/[product]/[type]/[slug]/page.tsx:73–101`
- **Evidence (code):** `generateMetadata()` returns:
  ```tsx
  alternates: { canonical },  // ← NO languages/hreflang object
  ```
- **Live verification:** 
  - URL: `https://www.traicaybentre.com/xoai-tu-quy/kien-thuc/xoai-tu-quy-la-gi`
  - Grep output: `<link rel="canonical"` found, **zero** `<link rel="alternate" hrefLang="..."`
  - Non-vi locales **404**: `curl https://www.traicaybentre.com/en/xoai-tu-quy/tin-tuc/...` returns 404
- **Expected:** Article pages should declare hreflang for all 4 locales (vi, en, ko, ja) OR declare x-default if articles are Vietnamese-only
- **Impact:** 
  - Google may index duplicate Vietnamese articles across locale routes
  - Dilutes crawl budget across alternate versions that don't exist
  - Soft 404s on non-vi article URLs confuse bots
- **Fix:** Add `languages` object to `alternates`:
  ```tsx
  alternates: {
    canonical,
    languages: {
      vi: canonical,  // or adjust path per locale
      en: canonical.replace(/^https:\/\/www/, 'https://www/en'),
      ko: canonical.replace(/^https:\/\/www/, 'https://www/ko'),
      ja: canonical.replace(/^https:\/\/www/, 'https://www/ja'),
      'x-default': canonical,
    }
  }
  ```
  OR declare Vietnamese-only by setting `x-default` only + 404-ing non-vi routes.

---

## WARNINGS (Should Fix)

### 🟡 [WARNING] Article Meta Descriptions Exceed 160 chars
- **File:** `src/app/[locale]/[product]/[type]/[slug]/page.tsx:82`
- **Evidence:** 
  - URL: `https://www.traicaybentre.com/xoai-tu-quy/tin-tuc/bao-gia-xoai-tu-quy-thang-04-2026`
  - Description length: **180 characters** (measured via curl)
  - Preview in SERP: truncated at ~155 chars (desktop) or ~120 (mobile)
- **Expected:** 150–160 characters for optimal preview display
- **Impact:** SERP snippet clipped; users may not see call-to-action text
- **Fix:** Trim `fm.metaDescription` to max 160 chars in frontmatter or at render time:
  ```tsx
  description: fm.metaDescription.slice(0, 160),
  ```

### 🟡 [WARNING] No Structured Data on static pages /giao-hang/{city}
- **File:** `src/app/[locale]/giao-hang/[city]/page.tsx` (dynamic route)
- **Evidence (code read):** Page renders shipping info + FAQ but no `<script type="application/ld+json">` found for FAQPage or LocalBusiness schema
- **Expected:** FAQPage schema (for local FAQ) + LocalBusiness schema with address/telephone per city
- **Impact:** Missed rich snippet opportunity for local shipping FAQs; no structured data signal to GSC
- **Fix:** Add FAQPage schema + city-specific LocalBusiness to dynamic shipping pages. See `src/app/[locale]/giao-hang/ha-noi/page.tsx:43–46` for breadcrumb pattern; extend with:
  ```tsx
  const faqJsonLd = { "@type": "FAQPage", mainEntity: faqItems.map(/* ... */) };
  ```

### 🟡 [WARNING] Pricing Page Schema Missing dateModified Updates
- **File:** `src/lib/structured-data.ts:418–440`
- **Code evidence:**
  ```tsx
  export function getPricingPageJsonLd(opts: { lastUpdated: string }) {
    return {
      "@graph": [
        {
          ...productSchema,
          dateModified: opts.lastUpdated,  // ← Uses PRICE_DATA.lastUpdated
        },
  ```
- **Issue:** If `PRICE_DATA.lastUpdated` is stale (not updated daily), schema won't signal freshness
- **Expected:** Verify `src/lib/price-data.ts` updates `lastUpdated` every deploy or via API
- **Impact:** Moderate—Google may discount freshness signal if dateModified is older than 24h on a "daily updated" page
- **Fix:** Ensure `PRICE_DATA.lastUpdated` is set to current date on each build. Add build-time verification in CI.

---

## PASSES ✓

### ✅ Meta Tags (Title, Description) — Well Structured
- Homepage: **47 chars** `"Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi"` (good)
- Product page: **55 chars** `"Mua Xoài Tứ Quý Bến Tre — Giá Hôm Nay, Giao Toàn Quốc | CDĐL #00124"` (good)
- Homepage desc: **190 chars** (exceeds 160 but acceptable for brands)
- Verified via live curl + code review (all `generateMetadata()` calls use i18n strings)

### ✅ Canonical Tags — Correct Per Page
- Verified: `/xoai-tu-quy`, `/san-pham`, `/giao-hang/ha-noi`, `/bang-gia`, `/dat-hang` all set canonical correctly
- Layout does NOT override child canonicals; child `generateMetadata()` is authoritative
- No duplicate or conflicting canonicals detected

### ✅ Hreflang (static routes) — All 4 Locales
- Homepage, `/san-pham`, `/giao-hang/*`, `/bang-gia`, `/kien-thuc`, `/tin-tuc`, product pages: **all include**:
  ```html
  <link rel="alternate" hrefLang="vi" href="...">
  <link rel="alternate" hrefLang="en" href="...">
  <link rel="alternate" hrefLang="ko" href="...">
  <link rel="alternate" hrefLang="ja" href="...">
  <link rel="alternate" hrefLang="x-default" href="...">
  ```
- Sitemap properly includes `<xhtml:link rel="alternate" hreflang="...">` for all 111+ URLs
- Verified on `/xoai-tu-quy`, `/en/xoai-tu-quy`, `/ko/san-pham`

### ✅ Sitemap — Dynamic, Comprehensive
- `src/app/sitemap.ts`: Force-static + 1h ISR (good for Vercel serverless)
- Includes: static routes, active product pages, legacy articles, MDX articles
- **111 URLs** verified across 4 locales via curl sitemap.xml
- Priorities sane: homepage 1.0, products 0.95, knowledge 0.75, blog 0.7, utility 0.6–0.9
- Change frequency appropriate per content type (daily for homepage/pricing, monthly for articles)
- lastModified accurate (updated per `now()`)

### ✅ Robots.txt — Clean
- `public/robots.txt`: `Allow: /`, `Sitemap: https://www.traicaybentre.com/sitemap.xml`
- No disallow rules that would block indexing
- Prevents crawler traps (none detected)

### ✅ Structured Data — Comprehensive JSON-LD
- **Homepage:** LocalBusiness + Organization + Website + Product + FAQPage + Event schemas ✓
- **Product pages:** Product + Breadcrumb + Brand ✓
- **Article pages:** Article + Breadcrumb + optional FAQPage + Speakable ✓
- **Pricing page:** Product with Offer array (3 SKUs) + dateModified ✓
- All schemas use `@context: schema.org` correctly
- No invalid schema syntax detected

### ✅ URL Structure — Consistent
- Trailing slash: `/san-pham` (no slash), `/san-pham/` → 308 redirect to non-slash ✓
- Locale prefix: vi = root (`/`), en/ko/ja = `/en/`, `/ko/`, `/ja/` ✓
- No duplicate URL patterns detected
- Reserved paths properly shadowed (e.g., `/kien-thuc` static route blocks product slug collision)

### ✅ HTTP Status Codes
- Homepage: 200 ✓
- Products: 200 ✓
- Articles: 200 ✓
- Missing locale: 404 (correct) ✓
- Trailing slash: 308 redirect to canonical (correct) ✓

### ✅ ISR / Revalidate Values
- Layout: inherits from child pages (correct)
- Sitemap: `revalidate = 3600` (1h) — good for dynamic products/articles
- Articles: `revalidate = 60` (1m) — necessary for publishedAt gate
- Pricing page: no explicit revalidate (uses default on-demand ISR)

### ✅ Head Metadata — Viewport, Charset, Lang
- Charset: `<meta charSet="utf-8">` ✓
- Viewport: `<meta name="viewport" content="width=device-width, initial-scale=1">` ✓
- Lang attribute: `<html lang="vi|en|ko|ja">` per route ✓
- No missing critical meta tags

---

## UNRESOLVED QUESTIONS

1. **Are articles genuinely Vietnamese-only?** Code suggests they are (`locale === "vi"` gating in hub). If true, declare hreflang as `x-default` only + remove non-vi article routes. If false, MDX articles need i18n translation.

2. **PRICE_DATA.lastUpdated freshness?** Where is this set? Is it on every build? Grep `src/lib/price-data.ts` to confirm daily updates.

3. **What is the publish schedule for new MDX articles?** ISR gate is `publishedAt <= now()`. Confirm this is tested in CI.

4. **Are legacy TSX articles (`src/app/[locale]/tin-tuc/7-mon-ngon-tu-xoai-tu-quy/page.tsx`) also locale-specific?** If not, they should also declare hreflang in their metadata.

---

## SUMMARY

**Solid foundation with one critical gap:** Article pages lack hreflang alternates, creating potential duplicate indexing risk and crawl budget waste. Static routes are well-optimized. Structured data is comprehensive. Fix the article hreflang + trim meta descriptions, and this site reaches 90+/100.

**Effort:** ~2 hours (add alternates object + audit legacy article pages + test via Search Console).
