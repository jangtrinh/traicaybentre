# Phase 3: Canonical/Hreflang Fix + Freshness Signals

## Overview
- **Priority:** P0 — Google đang index EN thay vì VI
- **Status:** pending

## Problem
Product page `/xoai-tu-quy` metadata set canonical = `/xoai-tu-quy` (no locale) but doesn't include hreflang alternates or x-default. Layout has hreflang but only for homepage.

## Files to Modify
1. `src/app/[locale]/[product]/page.tsx` — add full alternates with hreflang + x-default
2. `src/lib/structured-data.ts` — add dateModified to `getProductJsonLd()`
3. `src/app/[locale]/layout.tsx` — verify x-default points to vi (already correct)
4. `src/app/sitemap.ts` — add new pages from phase 1+2

## Implementation Steps

### Step 1: Fix product page alternates
In `src/app/[locale]/[product]/page.tsx` `generateMetadata()`:
- Current: `alternates: { canonical: url }` — missing hreflang
- Fix: add full `alternates` with `languages` map (vi, en, ko, ja) + x-default → vi

```typescript
alternates: {
  canonical: `${SITE_URL}/${slug}`,
  languages: {
    vi: `${SITE_URL}/${slug}`,
    en: `${SITE_URL}/en/${slug}`,
    ko: `${SITE_URL}/ko/${slug}`,
    ja: `${SITE_URL}/ja/${slug}`,
    "x-default": `${SITE_URL}/${slug}`,
  },
},
```

### Step 2: Add dateModified to product JSON-LD
In `src/lib/structured-data.ts`, update `getProductJsonLd()`:
- Add optional `dateModified` param
- Add to schema output
- In product page, pass `PRICE_DATA.lastUpdated` as dateModified

### Step 3: Add freshness to new pages
Both `/bang-gia` and `/dat-hang` pages must:
- Include `dateModified` in JSON-LD from PRICE_DATA.lastUpdated
- Display "Cập nhật: [date]" visibly on page

### Step 4: Verify all pages have correct alternates
Audit: homepage, product pages, new pages — all must have full hreflang set.

## Success Criteria
- [ ] Product pages have full hreflang alternates (vi, en, ko, ja, x-default)
- [ ] x-default points to vi version (no locale prefix)
- [ ] Product JSON-LD includes dateModified
- [ ] New pages in sitemap with correct priorities
- [ ] TypeScript compiles
