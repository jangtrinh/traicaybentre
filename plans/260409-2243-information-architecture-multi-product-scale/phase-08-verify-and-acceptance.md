# Phase 08 — Verify & Acceptance

**Status:** pending
**Effort:** 2-3h
**Blocks:** (unblocks marketing-daily-articles plan)
**Blocked by:** P01-P07

## Context

Final acceptance gate. Comprehensive verification trước khi merge to main và unblock marketing plan.

## Key Insights

- **SEO constraint is non-negotiable** — any legacy URL regression = blocker
- Visual parity checks phải run trên staging build (production-like), không dev mode
- GSC baseline snapshot phải chụp TRƯỚC deploy, so sánh 4 tuần sau

## Checks matrix

| # | Check | Tool | Acceptance |
|---|-------|------|------------|
| 1 | Typecheck | `npx tsc --noEmit` | 0 errors |
| 2 | Lint | `bun run lint` | 0 errors, warnings only if pre-existing |
| 3 | Build | `bun run build` | exit 0, no new warnings |
| 4 | Unit tests | `bunx jest --passWithNoTests` | All pass |
| 5 | All 12 legacy URLs return 200 | curl script | 12/12 green (13 → 12, `/lien-he` removed F6) |
| 6 | All 12 legacy URLs HTML unchanged | curl + diff | Structure + JSON-LD identical |
| 7 | Sitemap superset | diff script | Old sitemap ⊆ new sitemap |
| 8 | Dynamic `[product]` doesn't bắt reserved paths | curl `/kien-thuc`, `/nguon-goc`, `/san-pham`, `/giao-hang/ha-noi` → none 404'd by product dynamic | All return expected page, not product 404 |
| 9 | New dynamic product routes | `/xoai-tu-quy` via dynamic | Visual diff ≤ 2% vs static baseline |
| 10 | Scoped article routes | insert Supabase test row, fetch `/xoai-tu-quy/kien-thuc/{slug}` | 200, content renders, JSON-LD valid |
| 11 | Product mismatch → 404 | `/dua-xiem-ben-tre/kien-thuc/{xoai-slug}` | 404 |
| 12 | Coming-soon product | `/dua-xiem-ben-tre` | 404 (per Phase 02 notFound guard) |
| 13 | `/san-pham` catalog | navigate | Cards render, links work |
| 14 | Nav dropdown desktop | click "Sản phẩm ▾" | Dropdown opens, links to active products |
| 15 | Mobile menu | hamburger → Sản phẩm accordion | Open, links work |
| 16 | Homepage seasonal hero | check current month logic | Correct product selected |
| 17 | `/nguon-goc` keyword density | grep count "xoài tứ quý" pre/post | post >= pre |
| 18 | Lighthouse homepage | mobile + desktop | LCP, CLS, INP not regress >5% |
| 19 | Lighthouse `/xoai-tu-quy` | mobile + desktop | Not regress >5% |
| 20 | Lighthouse `/nguon-goc` | mobile + desktop | Not regress >5% |
| 21 | Rich Results Test Product schema | Google tool, `/xoai-tu-quy` | Valid |
| 22 | Rich Results Test Article schema | `/xoai-tu-quy/kien-thuc/{test-slug}` | Valid |
| 23 | JSON-LD Breadcrumb | all new pages | Valid |
| 24 | robots.txt | curl | Unchanged (unless intentional update) |
| 25 | GSC baseline capture | manual export | 12 legacy URLs baseline impressions/clicks saved |
| 26 | `header.tsx` < 120 LOC (F7) | `wc -l` | Pass |
| 27 | No `Product` type collision (F1) | `grep -rn "type Product\|interface Product" src/` | Only `landing-data.ts Product` + new `ProductEntry` |
| 28 | No `src/content/legacy-articles.ts` created (F2) | `ls` | File does not exist |
| 29 | Hero image paths resolve (F3) | curl OG images | 200 for all product hero images |
| 30 | `getProductJsonLd` exists (F5) | grep | Exported from `structured-data.ts` |
| 31 | `KNOWN_PRODUCTS` swapped (F8) | grep `src/lib/articles.ts` | Uses `getProductSlugs()` from registry |
| 32 | `/dua-xiem-ben-tre` returns 404 (F12) | curl | Not pre-rendered, not in sitemap |
| 33 | Sitemap has `force-static` (F10) | grep `sitemap.ts` | Pass |

## Files to Create

- `scripts/verify-legacy-urls.sh` — curl 13 URLs + assert 200 + diff JSON-LD
- `scripts/verify-sitemap-superset.ts` — fetch old sitemap snapshot (saved pre-phase) vs new, assert superset
- `scripts/gsc-baseline-snapshot.md` — instructions for manual GSC export + storage

## Files to Read

- All phase files for cross-check implementation vs plan
- `plans/reports/brainstorm-260409-2243-information-architecture-multi-product-scale.md` — acceptance criteria

## Implementation Steps

1. Before running Phase 08, ensure P01-P07 all done
2. Run matrix checks 1-4 (build quality)
3. Create verify-legacy-urls.sh — script calling curl on 13 URLs, check status + structure
4. Run script → all green
5. Create sitemap superset script → run → assert
6. Manual navigation checks 8-15
7. Insert 1 test Supabase article → check 10, 11 → remove
8. Lighthouse runs (checks 18-20) with baseline from pre-phase (if baseline not captured, compare against git stash of `origin/main`)
9. Rich Results Test (checks 21-23) manual via Google tool
10. GSC baseline export (check 25) — 13 URLs + 30 days data
11. Check `/nguon-goc` keyword density pre vs post (check 17)
12. Final visual diff homepage + xoai landing + nguon-goc
13. All green → proceed to merge
14. Post-merge: monitor GSC weekly for 4 weeks

## Todo

- [ ] Ensure P01-P07 all done
- [ ] Typecheck + lint + build + tests
- [ ] Write verify-legacy-urls script
- [ ] Write sitemap superset script
- [ ] Run all automated checks
- [ ] Manual navigation checks
- [ ] Supabase test article insert/verify/remove
- [ ] Lighthouse runs
- [ ] Rich Results Test runs
- [ ] Keyword density check `/nguon-goc`
- [ ] GSC baseline snapshot saved
- [ ] Visual diff critical pages
- [ ] Final acceptance report
- [ ] Merge to main
- [ ] Unblock marketing plan (update frontmatter)
- [ ] 4-week GSC monitoring

## Success Criteria (all must pass)

- [ ] 25/25 checks green
- [ ] 0 legacy URL regressed
- [ ] 0 SEO metadata changed on legacy URLs
- [ ] Sitemap strict superset
- [ ] Lighthouse ±5% tolerance all pages
- [ ] Marketing plan frontmatter updated to `status: pending` (unblocked)

## Post-merge monitoring

| Week | Action |
|------|--------|
| 1 | Daily GSC check — impressions/clicks for 13 legacy URLs |
| 2 | Compare week-over-week, alert if drop > 10% |
| 3 | Full GSC report vs baseline |
| 4 | Final SEO acceptance — if all stable, declare success and unblock marketing plan for production use |

**Trigger rollback if:** > 15% drop in GSC impressions on any legacy URL vs baseline persisting > 7 days.

## Rollback plan

1. `git revert` merge commit
2. Redeploy
3. Legacy routes restored
4. Investigate root cause (usually: sitemap missing URL, canonical incorrect, JSON-LD regression)
5. Fix + re-verify + re-merge

## Risks

| Risk | Mitigation |
|------|------------|
| Pre-launch GSC baseline missed | Gate merge on baseline captured |
| Lighthouse variability false positive | Run 3 times, use median |
| Manual checks skipped under pressure | Checklist enforced; merge requires all green |
| Post-merge drop detected too late | Daily monitoring week 1 |

## Next

After acceptance: unblock `260409-2215-marketing-daily-articles`. Create separate plan for Dừa Xiêm Bến Tre launch (content + landing + assets).
