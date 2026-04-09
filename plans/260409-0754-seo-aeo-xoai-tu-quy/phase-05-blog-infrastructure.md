# Phase 5: Blog Infrastructure + Monthly Market Reports

**Priority:** MEDIUM — long-term competitive moat
**Status:** ⬜ Pending
**Effort:** 2-3 days
**Depends on:** Phase 1-4 complete

---

## Overview

Build lightweight blog infrastructure for:
1. Monthly "Báo Giá Xoài Tứ Quý" market reports — unique data AI can't find elsewhere
2. Occasional content pieces (recipes, seasonal guides, customer stories)

Max cadence: 2 posts/month. Sustainable for small team.

## Key Insights

- Monthly market reports = data moat competitors can't replicate
- NewsArticle schema with dated pricing → Google AI Overview cites as "According to..."
- Blog is NOT a content farm — authentic, data-rich, infrequent posts only
- MDX or simple TSX pages (no CMS needed for 2 posts/month)

## Architecture

**Option A: Simple TSX pages** (recommended for now)
- Each post = `src/app/tin-tuc/[slug]/page.tsx`
- Hardcoded content, manual creation
- Zero infra overhead

**Option B: MDX** (if content grows beyond 10 posts)
- `@next/mdx` or `contentlayer`
- Markdown files in `/content/blog/`
- Auto-generated routes

Start with Option A. Migrate to B when needed.

## First Content Pieces

| Post | Route | Type | Schema |
|------|-------|------|--------|
| Báo Giá Tháng 4/2026 | `/tin-tuc/bao-gia-xoai-tu-quy-thang-04-2026` | Market report | NewsArticle + Table |
| Xoài Tứ Quý Làm Món Gì? | `/tin-tuc/cach-che-bien-xoai-tu-quy` | Recipe/guide | HowTo + Article |

## Related Code Files

### Create
- `src/app/tin-tuc/page.tsx` — blog index
- `src/app/tin-tuc/bao-gia-xoai-tu-quy-thang-04-2026/page.tsx` — first market report
- `src/lib/blog-data.ts` — blog post metadata registry

### Modify
- `src/components/header.tsx` — add "Tin tức" nav
- `src/app/layout.tsx` — add blog routes to sitemap

## Implementation Steps

1. Create blog index page with post listing
2. Create first market report with:
   - Price table (VIP, Loại 1, Loại 2) with dates
   - Harvest status + forecast
   - Supply/demand commentary
   - NewsArticle + Table JSON-LD
   - Author: business name + director
3. Add Event schema for current harvest season (Vụ 1 2026)
4. Update navigation
5. Build + verify

## Todo List

- [ ] Create blog index page
- [ ] Create first market report
- [ ] Add NewsArticle + Table schema
- [ ] Add Event schema for harvest seasons
- [ ] Update navigation
- [ ] Build passes

## Success Criteria

- Blog index lists posts correctly
- Market report has structured data that validates
- Event schema for harvest seasons validates
- Sustainable: adding new post = create 1 file + add to registry

## Next Steps (Post-Plan)

- Google Business Profile optimization (outside codebase)
- Google Search Console setup + keyword tracking
- Backlink outreach (CDĐL story → food media)
- Recipe content for top-of-funnel traffic
