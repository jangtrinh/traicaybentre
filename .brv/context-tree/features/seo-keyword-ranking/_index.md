# SEO Keyword Ranking Improvement

## Architecture

Two new SEO landing pages + canonical/hreflang fixes to improve Google ranking for transactional keywords.

### New Pages
- `/bang-gia` — Dedicated pricing page targeting "giá xoài tứ quý hôm nay"
- `/dat-hang` — Order landing page targeting "mua xoài tứ quý online"

### SEO Infrastructure
- Full hreflang alternates (vi, en, ko, ja, x-default) on all product pages
- `dateModified` freshness signal in Product JSON-LD from `PRICE_DATA.lastUpdated`
- Sitemap entries with daily (pricing) and weekly (order) crawl frequencies
- Breadcrumb JSON-LD with locale-aware names

## Key Files

### Routes
- `src/app/[locale]/bang-gia/page.tsx` — pricing page route, metadata, JSON-LD
- `src/app/[locale]/dat-hang/page.tsx` — order page route, metadata, JSON-LD

### Components
- `src/components/seo/pricing-page-content.tsx` — pricing page UI (3 product price displays)
- `src/components/seo/order-page-content.tsx` — order page UI (product cards + how-to + trust)
- `src/components/seo/seo-cta-section.tsx` — shared CTA block (Zalo + phone)
- `src/components/seo/seo-shipping-section.tsx` — shared shipping routes block

### Modified Infrastructure
- `src/content/products.ts` — `RESERVED_PATHS` includes "bang-gia", "dat-hang"
- `src/lib/structured-data.ts` — `getPricingPageJsonLd()`, `getProductJsonLd()` +dateModified
- `src/app/[locale]/[product]/page.tsx` — full hreflang alternates + dateModified
- `src/app/sitemap.ts` — 2 new entries (/bang-gia daily 0.9, /dat-hang weekly 0.85)

### Translations
- `messages/{vi,en,ko,ja}.json` — `pricingPage` + `orderPage` namespaces

## Decisions

1. **No e-commerce cart** — Zalo/phone ordering is the primary flow; dedicated cart adds complexity without matching user behavior
2. **Shared CTA/shipping components** — DRY extraction from both pages into `seo-cta-section.tsx` and `seo-shipping-section.tsx`
3. **Hardcoded Hoang Kim/Dua Xiem prices** — These products don't have centralized PRICE_DATA yet; prices shown as static ranges until price API covers all products
4. **Vietnamese as canonical default** — All x-default hreflang tags point to vi (no locale prefix) version; this fixes Google indexing the EN version instead

## Current State
- Status: shipped (2026-04-15)
- Build: passes (SSG for all 4 locales)
- TypeScript: clean
- Code review: 8/10, all high-priority fixes applied
