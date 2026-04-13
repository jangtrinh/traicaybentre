# Phase 2: OG Image Templates

## Overview
- **Priority**: P0
- **Effort**: 3h
- **Blocked by**: Phase 1

## 4 Templates

### Template 1: Homepage (`src/app/[locale]/opengraph-image.tsx`)
- ISR: 3600s
- Content: brand name (locale), tagline (locale), 🥭 emoji
- Layout: centered text on gradient bg

### Template 2: Product (`src/app/[locale]/[product]/opengraph-image.tsx`)
- ISR: 600s
- Content: product name, tagline, price range, brand
- Data source: `src/content/products.ts` + messages for locale
- Layout: large product name top, tagline below, price pill, brand bottom-right

### Template 3: Article (2 files — kien-thuc + tin-tuc)
Create for individual article pages that have their own page.tsx:
- `src/app/[locale]/kien-thuc/[...slug]/opengraph-image.tsx` — if catch-all exists
- Or place at each static article route level
- ISR: 86400s
- Content: category pill, article title, brand
- Data: extract from page metadata or message files
- Layout: category top-left in mango pill, large title center, brand bottom-right

### Template 4: Shipping (`src/app/[locale]/giao-hang/[city]/opengraph-image.tsx`)
- ISR: 1800s
- Content: 📍 city name, delivery time "{X}h", brand
- Data: `src/content/cities.ts`
- Layout: city name large, time badge, gradient bg (mango → mangoDark)

## Shared Pattern
Every opengraph-image.tsx exports:
```ts
export const alt = "...";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = N;
export default async function Image({ params }) { ... }
```

## Implementation Steps
1. Read existing route structure to determine exact file placement
2. Create homepage OG → test locally
3. Create product OG → test with xoai-tu-quy
4. Create article OG → test with kien-thuc article
5. Create shipping OG → test with tp-hcm
6. Verify all 4 locales for each template

## Files to Create
| File | Template |
|------|----------|
| `src/app/[locale]/opengraph-image.tsx` | Homepage |
| `src/app/[locale]/[product]/opengraph-image.tsx` | Product |
| `src/app/[locale]/kien-thuc/*/opengraph-image.tsx` | Knowledge articles |
| `src/app/[locale]/tin-tuc/*/opengraph-image.tsx` | News articles |
| `src/app/[locale]/giao-hang/[city]/opengraph-image.tsx` | Shipping |

## Success Criteria
- [ ] Each template returns valid 1200×630 PNG
- [ ] Text renders in correct locale
- [ ] Vietnamese diacritics work
- [ ] KO/JA characters work
- [ ] Price data appears on product template
- [ ] City name appears on shipping template
