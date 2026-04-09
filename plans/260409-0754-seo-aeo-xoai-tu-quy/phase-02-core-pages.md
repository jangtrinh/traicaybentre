# Phase 2: Core Pages — Product & Price

**Priority:** CRITICAL — highest conversion impact
**Status:** ⬜ Pending
**Effort:** 2-3 days
**Depends on:** Phase 1 (structured data module)

---

## Context

- [Content Strategy (Brainstorm)](../reports/researcher-260409-0755-seo-keyword-strategy.md)
- Homepage: `src/app/page.tsx`

## Overview

Create 2 dedicated pages that capture the highest-intent keywords:
1. `/xoai-tu-quy` — dedicated product page (currently mixed into homepage)
2. `/gia-xoai-hom-nay` — living price page with daily updates

Homepage currently does everything. Splitting into dedicated pages with focused keywords will dramatically improve ranking for transactional queries.

## Key Insights

- "xoài tứ quý giá bao nhiêu" = highest purchase intent keyword
- Google loves freshness signals — daily-updated price page is a ranking magnet
- Dedicated product page with Product schema outranks homepage for product queries
- Price page captures: "giá xoài hôm nay", "giá xoài tứ quý", "xoài sỉ bao nhiêu"

## Requirements

### Functional

**Product Page `/xoai-tu-quy`:**
- Hero with product imagery
- Detailed product description (terroir, taste profile, harvests)
- 3 tiers: VIP, Loại 1, Loại 2 with descriptions
- Shipping info section
- CTA: Gọi đặt hàng / Zalo
- Internal links to /nguon-goc, /gia-xoai-hom-nay
- Product JSON-LD (from Phase 1 module)
- Target H1: "Xoài Tứ Quý Bến Tre — Mua Trực Tiếp Từ Vựa"

**Price Page `/gia-xoai-hom-nay`:**
- Today's prices (VIP, Loại 1, Loại 2) — prominent display
- "Cập nhật lần cuối" timestamp
- Price history or range context
- Ordering info (MOQ, shipping)
- CTA: Gọi vựa
- Target H1: "Giá Xoài Tứ Quý Hôm Nay — Cập Nhật Mỗi Sáng"
- Metadata for "xoài tứ quý giá bao nhiêu" queries

### Non-functional
- Mobile-first design (consistent with existing pages)
- < 200 lines per file (split components if needed)
- Page load < 2s (static generation)
- SEO metadata + OG tags per page

## Architecture

- Static pages with revalidation (ISR or manual)
- Price data: simple JSON file or Supabase row (TBD based on user input)
- Reuse existing design system components (FadeIn, SectionDivider, Header, Footer)

## Related Code Files

### Create
- `src/app/xoai-tu-quy/page.tsx` — product page
- `src/app/gia-xoai-hom-nay/page.tsx` — price page
- `src/lib/price-data.ts` — price data source (JSON or Supabase)

### Modify
- `src/app/page.tsx` — add internal links to new pages
- `src/components/header.tsx` — add nav links
- `src/app/layout.tsx` — update siteLinks schema if applicable

## Implementation Steps

1. Create price data source (`src/lib/price-data.ts`)
   - Start with static JSON (can migrate to Supabase later)
   - Export typed price interface + getter function
2. Create `/xoai-tu-quy/page.tsx`:
   - SEO metadata targeting product keywords
   - Product JSON-LD using Phase 1 structured-data module
   - Hero + product tiers + shipping + CTA sections
   - Keep under 200 lines (extract sections to components if needed)
3. Create `/gia-xoai-hom-nay/page.tsx`:
   - SEO metadata targeting price keywords
   - Dynamic pricing display from price data source
   - "Cập nhật" timestamp
   - Order CTA
4. Update header nav to include new pages
5. Add internal links from homepage to new pages
6. Build + verify

## Todo List

- [ ] Create price-data.ts module
- [ ] Create /xoai-tu-quy product page with metadata + JSON-LD
- [ ] Create /gia-xoai-hom-nay price page with metadata
- [ ] Update header navigation
- [ ] Add internal links from homepage
- [ ] Verify build passes
- [ ] Test mobile responsiveness

## Success Criteria

- Both pages render correctly with proper metadata
- Product JSON-LD validates in Rich Results Test
- Internal linking between homepage ↔ product ↔ price pages
- `bun run build` succeeds
- Mobile layout looks good

## Risk Assessment

- **Price data staleness** — mitigate by showing "gọi vựa để có giá chính xác" caveat
- **Duplicate content with homepage** — ensure product page has unique content, not copy-paste
- **Route naming** — Vietnamese URL slugs are SEO-friendly for Vietnamese queries

## Next Steps

After Phase 2, these pages become the internal link hub for all subsequent content (blog, geo pages, knowledge hub).
