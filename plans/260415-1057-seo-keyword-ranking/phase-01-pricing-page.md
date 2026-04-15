# Phase 1: Trang Bảng Giá `/bang-gia`

## Overview
- **Priority:** P0 — keyword "giá xoài tứ quý hôm nay" có volume cao nhất
- **Status:** pending

## Target Keywords
- giá xoài tứ quý hôm nay
- giá xoài tứ quý bao nhiêu
- bảng giá xoài tứ quý
- giá xoài bến tre

## Files to Create
1. `src/app/[locale]/bang-gia/page.tsx` — route + metadata + JSON-LD
2. `src/components/seo/pricing-page-content.tsx` — page content component

## Files to Modify
1. `src/content/products.ts` — add `"bang-gia"` to RESERVED_PATHS
2. `src/app/sitemap.ts` — add `/bang-gia` entry
3. `src/lib/structured-data.ts` — add `getPricingPageJsonLd()` helper

## Implementation Steps

### Step 1: Add to RESERVED_PATHS
In `src/content/products.ts`, add `"bang-gia"` and `"dat-hang"` to RESERVED_PATHS array.

### Step 2: Create pricing page content component
`src/components/seo/pricing-page-content.tsx`:
- Reuse pattern from `xoai-tu-quy-landing.tsx` price section
- Sections: Hero (h1 with keyword), All products price tables, Wholesale info, CTA, FAQ
- Use `getPriceDataTranslated(t)` for prices
- Show `lastUpdated` timestamp prominently
- Include all 3 products (Xoài Tứ Quý, Hoàng Kim, Dừa Xiêm) with their prices
- Internal links to product pages

### Step 3: Create route page
`src/app/[locale]/bang-gia/page.tsx`:
- `generateMetadata()` with SEO title: "Giá Xoài Tứ Quý Bến Tre Hôm Nay — Bảng Giá Cập Nhật Mỗi Sáng"
- Description targeting keywords
- canonical + hreflang alternates
- JSON-LD: Product schema with Offer array + dateModified from PRICE_DATA.lastUpdated
- Breadcrumb JSON-LD

### Step 4: Add JSON-LD helper
In `src/lib/structured-data.ts`, add `getPricingPageJsonLd()`:
- Reuse existing `productSchema` with Offer array
- Add `dateModified: PRICE_DATA.lastUpdated`
- Include FAQ schema for pricing-related questions

### Step 5: Add to sitemap
In `src/app/sitemap.ts`, add `/bang-gia` with priority 0.9, changeFrequency "daily".

## Success Criteria
- [ ] `/bang-gia` renders with price tables for all products
- [ ] Meta title contains "giá xoài tứ quý"
- [ ] JSON-LD has Product + Offer + dateModified
- [ ] Sitemap includes `/bang-gia` with daily frequency
- [ ] `lastUpdated` timestamp visible on page
- [ ] CTA Zalo + phone visible
- [ ] TypeScript compiles
