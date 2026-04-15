# Phase 2: Trang Đặt Hàng `/dat-hang`

## Overview
- **Priority:** P1 — keyword "mua xoài tứ quý online"
- **Status:** pending

## Target Keywords
- mua xoài tứ quý online
- đặt xoài tứ quý
- xoài tứ quý ship toàn quốc
- đặt dừa xiêm bến tre online

## Files to Create
1. `src/app/[locale]/dat-hang/page.tsx` — route + metadata + JSON-LD
2. `src/components/seo/order-page-content.tsx` — page content component

## Files to Modify
1. `src/app/sitemap.ts` — add `/dat-hang` entry (done in phase 1 if batched)
2. `src/content/products.ts` — RESERVED_PATHS (done in phase 1)

## Implementation Steps

### Step 1: Create order page content component
`src/components/seo/order-page-content.tsx`:
- Hero with h1 targeting "Đặt Trái Cây Bến Tre Online"
- Product cards for all 3 active products: image, name, price range, CTA Zalo
- Each product card links to its product landing page
- Shipping info section (reuse SHIPPING_ROUTES pattern)
- Trust signals (CDĐL, 3 năm ship, <2% dập)
- Wholesale section with MOQ
- FAQ section targeting purchase questions

### Step 2: Create route page
`src/app/[locale]/dat-hang/page.tsx`:
- `generateMetadata()` with title: "Đặt Trái Cây Bến Tre Online — Xoài Tứ Quý, Hoàng Kim, Dừa Xiêm | Ship Toàn Quốc"
- Description with transactional keywords
- canonical + hreflang
- JSON-LD: multiple Product schemas + Breadcrumb
- Use `getActiveProducts()` to list products dynamically

### Step 3: Add to sitemap
Add `/dat-hang` with priority 0.85, changeFrequency "weekly".

## Success Criteria
- [ ] `/dat-hang` renders with all active products
- [ ] Meta title contains "đặt" or "mua"
- [ ] Each product has CTA Zalo with pre-filled message
- [ ] Phone number clickable
- [ ] JSON-LD has Product schemas
- [ ] TypeScript compiles
