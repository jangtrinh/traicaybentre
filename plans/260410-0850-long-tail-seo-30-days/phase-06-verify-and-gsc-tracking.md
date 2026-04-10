# Phase 06 — Verify + GSC Tracking (Tiered Realistic Targets)

**Status:** pending | **Effort:** 30d (parallel) | **Blocked by:** P01-P05

## 🔴 Red Team Applied

- **F2 + F11:** Tracking against tiered targets (A/B/C/D), not "Top 1 all 10".
- **F12:** Rollback = `git reset --hard seo-sprint-baseline-260410` (single surface).

## Goal

Daily → weekly verification loop suốt 30 ngày sprint. Track ranking position, clicks, impressions cho 10 keywords. Iterate when pages drift off-target.

## Weekly cadence

### Week 1 (launch week — sau P02-P05)
- **Daily**: GSC Inspect URL cho 10 target pages → confirm indexed
- **Daily**: submit sitemap nếu có URL chưa crawl
- **End of week**: first GSC Performance report → impressions appearing

### Week 2
- **Daily**: check Ads dashboard (Phase 06)
- **Mid-week**: GSC ranking snapshot cho 10 keywords
- **End of week**: compare baseline P01 → diff report

### Week 3
- **Mid-week**: Content iteration — pages not ranking after 2 weeks need refresh
- **End of week**: GSC + Ads combined report

### Week 4 (decision week)
- **Day 21-25**: Final SEO ranking check
- **Day 26-28**: Final Ads performance analysis
- **Day 29-30**: Write 30-day report + recommendations

## Tracking dashboard (manual or tool)

### Metrics per keyword
- **Organic position** (GSC avg)
- **Organic impressions** (GSC)
- **Organic clicks** (GSC)
- **Organic CTR** (computed)
- **Ads impressions** (Ads dashboard)
- **Ads clicks** (Ads)
- **Ads CTR**
- **Ads cost**
- **Conversions** (GA4)
- **Cost per conversion**

Save as `reports/long-tail-sprint-weekly-{week}.csv`.

## Acceptance criteria (final review Week 4)

- [ ] ≥5/10 keywords trong Top 10 organic
- [ ] ≥2/10 keywords trong Top 3 organic
- [ ] ≥20 total Ads conversions
- [ ] Cost per conversion < 40k VND
- [ ] Zero SEO regression on 12 legacy URLs (verify unchanged impressions/clicks)
- [ ] All 10 target pages indexed in Google Search Console

## Iteration triggers

### Trigger: keyword not indexed after 7 days
→ GSC → Inspect URL → Request indexing. Check robots.txt, noindex tag, canonical.

### Trigger: keyword impressions 0 after 14 days
→ Re-check: exact phrase in title + H1 + meta? Internal links present?
→ Rewrite title (slight variation) + request re-crawl.

### Trigger: CTR < 1% after 21 days (has impressions but no clicks)
→ Rewrite meta description to be more compelling.
→ Check SERP: are we ranking on a weird variant?

### Trigger: Ads QS < 6
→ Tighten keyword-landing match.
→ Rewrite H1 to exact phrase.

### Trigger: Ads cost/conversion > 60k VND
→ Pause ad group, reallocate budget.

## Rollback plan (if sprint fails)

- If ≥5/10 keywords lose rank vs baseline → investigate: did we inadvertently change canonical? redirect?
- If Ads burn > 2M VND với 0 conversions → full pause, audit landing pages, restart week 3+
- If 2 new landings cause 404s → revert Phase 04 commit

## Files to Create

- `reports/gsc-baseline-260410.csv` (from P01)
- `reports/long-tail-sprint-weekly-01.csv` through `-04.csv`
- `reports/long-tail-sprint-final-260510.md` — 30-day summary report

## Todo

- [ ] Week 1 daily GSC index checks
- [ ] Week 2 mid-week ranking snapshot
- [ ] Week 2 end report (baseline diff)
- [ ] Week 3 content iteration pass
- [ ] Week 3 Ads mid-week optimization
- [ ] Week 4 final SEO ranking check
- [ ] Week 4 Ads performance final
- [ ] Week 4 30-day report written
- [ ] Handoff: keep winners, pause losers

## Success Criteria

Phase 07 success = overall plan success. See main acceptance criteria in `plan.md`.

## Risks

| Risk | Mitigation |
|---|---|
| GSC data lag (3-7 days) | Supplement với Ads data + manual search |
| 30-day window too short for some keywords | Accept partial wins, document learnings |
| Editor burnout by week 3 | Pre-schedule iteration work |
| Ads budget depleted early | Strict daily cap |

## Next

After Week 4: write retrospective journal. Feed learnings into marketing plan content calendar future batches.
