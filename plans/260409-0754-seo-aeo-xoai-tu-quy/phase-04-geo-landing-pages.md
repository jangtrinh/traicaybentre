# Phase 4: Geo Landing Pages

**Priority:** HIGH — captures location+intent keywords
**Status:** ⬜ Pending
**Effort:** 1-2 days
**Depends on:** Phase 2 (product + price pages exist for linking)

---

## Overview

Create 3 geo-specific landing pages targeting buyers in major cities. These capture "xoài tứ quý giao [city]" and "mua xoài Bến Tre tại [city]" keywords — currently ZERO coverage.

## Pages

| Route | Target Keywords | H1 |
|-------|----------------|-----|
| `/giao-hang/ha-noi` | xoài tứ quý giao Hà Nội, xoài Bến Tre tại Hà Nội | Xoài Tứ Quý Giao Hà Nội — 48h Từ Vựa |
| `/giao-hang/tp-hcm` | xoài tứ quý giao HCM, xoài sỉ TP.HCM | Xoài Tứ Quý Giao TP.HCM — 24h Từ Vựa |
| `/giao-hang/da-nang` | xoài tứ quý giao Đà Nẵng, xoài miền Trung | Xoài Tứ Quý Giao Đà Nẵng — Ship Lạnh Toàn Tuyến |

## Content per Page (~300 words each)

- City-specific shipping info (time, cost estimate, method)
- Packaging for that route (e.g., HN needs more insulation)
- Customer testimonials from that region (if available)
- Pricing + CTA (link to /gia-xoai-hom-nay)
- "Tại sao khách [city] chọn xoài Tứ Quý" mini-section
- FAQ: 2-3 city-specific questions

## Related Code Files

### Create
- `src/app/giao-hang/ha-noi/page.tsx`
- `src/app/giao-hang/tp-hcm/page.tsx`
- `src/app/giao-hang/da-nang/page.tsx`
- `src/lib/shipping-data.ts` — shipping info per region

### Modify
- `src/components/header.tsx` — optional dropdown or footer links
- Product/price pages — internal links to geo pages

## Implementation Steps

1. Create shared shipping data module
2. Create reusable geo landing page layout/template
3. Create 3 city pages with unique content per city
4. Add LocalBusiness + areaServed schema per page
5. Internal link from product + price pages
6. Build + verify

## Todo List

- [ ] Create shipping-data.ts
- [ ] Create /giao-hang/ha-noi page
- [ ] Create /giao-hang/tp-hcm page
- [ ] Create /giao-hang/da-nang page
- [ ] Add city-specific schema
- [ ] Internal linking complete
- [ ] Build passes

## Success Criteria

- Each page has unique, city-specific content (not templated filler)
- Schema validates
- Internal linking hub works both ways
- Mobile responsive
