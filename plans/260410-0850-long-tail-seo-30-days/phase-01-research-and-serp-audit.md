# Phase 01 — Research + SERP Audit

**Status:** pending | **Effort:** 2d | **Blocks:** P02-P07

## Goal

Baseline data trước khi optimize: **search volume validation (F1 blocking)**, SERP landscape, competitor on-page signals, existing rank positions, content gap map cho 10 keywords.

## 🔴 Red Team Applied

- **F1 (Critical):** Step 0 = validate search volume per keyword. Drop < 30/mo unless transactional high-value. Plan can't proceed without this data.
- **F2 (Critical):** Tag each keyword with realistic Tier (A/B/C/D) based on page maturity.
- **F12 (Medium):** Create git tag `seo-sprint-baseline-260410` as first action before any content changes.

## Deliverables

- `reports/serp-audit-10-keywords.md` — manual SERP top 5 per keyword
- `reports/gsc-baseline-260410.csv` — current impressions/clicks/position cho 10 keywords
- `reports/content-gap-map.md` — existing page vs keyword mapping với edit recommendations
- Decision on #2 duplicate resolution (legacy TSX vs MDX)

## Tasks

### Step 0 — Git tag baseline (F12)
```bash
git tag seo-sprint-baseline-260410
git push origin seo-sprint-baseline-260410
```
Single rollback surface for entire sprint.

### Step 1 — Search volume validation (F1 BLOCKING)
Per keyword, get monthly volume from Google Keyword Planner OR Ahrefs OR SEMrush OR Ubersuggest:
- Drop if < 30 searches/mo AND non-transactional
- Keep if ≥ 30 searches/mo OR transactional high-intent (landing #4, #6, #8, #9)
- Revised target list after Step 1 → may be 6-8 keywords instead of 10

### SERP audit (manual)
For each of 10 keywords:
1. Google search từ incognito Vietnamese locale
2. Record top 5 results: URL, title, meta snippet, H1 (view source)
3. Identify content type (blog/landing/forum/marketplace)
4. Rate competition (Easy/Medium/Hard) based on domain authority + content depth
5. Note SERP features: Featured snippet, People Also Ask, Shopping, Maps

### GSC baseline
1. Login Search Console, Performance > Queries
2. Filter each of 10 exact phrases
3. Export: impressions, clicks, CTR, avg position (last 28 days)
4. Save CSV as baseline

### Content gap map
For each existing partial-match page (6 pages):
- Current title/H1/meta (extract from file)
- Gap analysis: is exact keyword present? where?
- Recommended edits (minimal change, preserve SEO equity)

For #2 duplicate: analyze which page is ranking (legacy TSX `/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy` vs MDX `/xoai-tu-quy/kien-thuc/cach-bao-quan-xoai-tu-quy`). Decide: keep canonical winner, delete loser (or noindex).

## Files to Read

- `src/lib/knowledge-data.ts` (legacy)
- `src/lib/blog-data.ts` (legacy)
- `src/content/articles/xoai-tu-quy/kien-thuc/*.mdx` (90 MDX)
- `src/app/giao-hang/ha-noi/page.tsx` (existing HN landing)
- `src/components/product/dua-xiem-ben-tre-landing.tsx`

## Files to Create

- `reports/serp-audit-10-keywords.md`
- `reports/gsc-baseline-260410.csv`
- `reports/content-gap-map.md`

## Todo

- [ ] SERP audit 10 keywords (manual)
- [ ] GSC baseline export (last 28 days)
- [ ] Content gap map per page
- [ ] #2 duplicate resolution decision
- [ ] Competition rating per keyword
- [ ] Featured snippet opportunities noted

## Success Criteria

- All 10 keywords có SERP top 5 snapshot
- GSC baseline cho 10 keywords saved
- #2 duplicate: 1 clear winner chosen
- Each existing page: specific edit list ready for P02

## Risks

| Risk | Mitigation |
|---|---|
| GSC data thiếu (keyword ch\u01b0a index) | Fall back to SEMrush/Ahrefs nếu có, else note as "no baseline" |
| SERP volatile during audit | Snapshot trong 1 sitting để nhất quán |

## Next

→ P02: Optimize 6 existing với gap map recommendations
