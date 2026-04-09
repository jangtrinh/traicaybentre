# Phase 3: Knowledge Hub + Comparison Content

**Priority:** HIGH — captures informational keywords + AEO citability
**Status:** ⬜ Pending
**Effort:** 3-4 days
**Depends on:** Phase 1 + Phase 2

---

## Overview

Create pillar content that captures informational search queries and becomes THE source AI engines cite for Xoài Tứ Quý. Two key pages:

1. `/kien-thuc/xoai-tu-quy-la-gi` — definitive guide (pillar content, 1500+ words)
2. `/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc` — comparison page (first in market)

## Key Insights

- "xoài tứ quý là gì" = highest informational volume, zero good results exist
- Comparison content ("vs xoài cát hòa lộc") has ZERO competition — first mover wins
- AEO: stat-rich paragraphs with sources get cited by AI engines
- Content must be authentic (from farm experience) not generic SEO filler

## Target Keywords

**Pillar page:**
- xoài tứ quý là gì, đặc điểm xoài tứ quý, xoài tứ quý mùa nào
- xoài tứ quý có gì đặc biệt, vì sao xoài tứ quý mặn

**Comparison page:**
- xoài tứ quý vs xoài cát hòa lộc, so sánh xoài bến tre
- xoài bến tre vs xoài đài loan, xoài tứ quý vs xoài cát chu

## Related Code Files

### Create
- `src/app/kien-thuc/page.tsx` — knowledge hub index
- `src/app/kien-thuc/xoai-tu-quy-la-gi/page.tsx` — pillar article
- `src/app/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc/page.tsx` — comparison

### Modify
- `src/components/header.tsx` — add "Kiến thức" nav
- `src/app/xoai-tu-quy/page.tsx` — internal links to knowledge pages

## Implementation Steps

1. Create `/kien-thuc` route layout
2. Create pillar page "Xoài Tứ Quý là gì?":
   - H1: "Xoài Tứ Quý Là Gì? — Đặc Sản CDĐL Thạnh Phú Bến Tre"
   - Sections: Định nghĩa, Đặc điểm (terroir/vị/hình dáng), Mùa vụ, Phân loại, Cách chọn, CDĐL
   - Stat tables (AI-scannable): soil specs, nutrition, yield data
   - Author attribution + datePublished
   - ArticleJSON-LD + DefinedTerm
3. Create comparison page "Xoài Tứ Quý vs Xoài Cát Hòa Lộc":
   - H1: "Xoài Tứ Quý vs Xoài Cát Hòa Lộc — So Sánh Chi Tiết"
   - Comparison table: vị, mùa, giá, vùng trồng, bảo quản
   - Fair comparison (not biased marketing)
   - FAQ section with comparison questions
4. Update navigation + internal links
5. Build + verify

## Todo List

- [ ] Create /kien-thuc route structure
- [ ] Create pillar page with full content + schema
- [ ] Create comparison page with comparison table
- [ ] Add ArticleJSON-LD to both pages
- [ ] Update header nav
- [ ] Internal link to/from product page + homepage
- [ ] Build passes

## Success Criteria

- Pillar page covers all informational keywords comprehensively
- Comparison table is fair, data-rich, AI-scannable
- Both pages have proper Article JSON-LD
- Internal linking hub complete
- `bun run build` succeeds
