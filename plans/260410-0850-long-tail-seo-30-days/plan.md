---
title: "Long-tail SEO 30 ngày — Top 1 sprint cho 10 keywords"
description: "Optimize 6 existing + create 4 new + ship 2 new landings. Google Ads parallel. Target: ≥5/10 Top 10 trong 30 ngày."
status: pending
priority: P1
effort: 30d
branch: main
tags: [seo, aeo, long-tail, landing-page, google-ads, content]
created: 2026-04-10
updated: 2026-04-10
domain: complex
mode: hard
---

# Long-tail SEO 30 ngày — Sprint (Tiered Realistic Targets)

**Source:** `plans/reports/brainstorm-260410-0850-long-tail-seo-30-days.md`
**Red Team:** `reports/red-team-260410-0855-long-tail-sprint-plan.md` (12 findings, all applied)
**Sibling Plan:** `plans/260410-0855-google-ads-long-tail-sprint/` (Ads extracted per F8)
**Hard constraint:** SEO-first preserved — zero redirect legacy URLs. Zero content deletion (F5).

## Goal

Rank long-tail keywords on best-effort tiered timeline, validated by search volume data. Parallel Ads sibling plan covers paid search.

**Reality check (F2):** New dừa section has zero backlinks + zero topical authority → 30-day Top 1 unrealistic for dừa keywords. Targets tiered by page maturity.

## Pre-Sprint Blockers (F6) — status

- [x] **Keyword volume data** — Google Keyword Planner (free) access confirmed. User runs queries.
- [x] **Editor bandwidth** — AI review only (UX pass model). No human bottleneck.
- [x] **Quà biếu combos** — 2 SKU: Xoài VIP 5kg hộp đẹp + Xoài VIP 10kg hộp đẹp. Price TBD by user.
- [x] **Dừa Xiêm price data** — Sỉ 8-10k₫/trái, lẻ 15-18k₫/trái. Update landing P02.
- [x] **Backlink strategy** — accept on-page-only ceiling (F3). Dừa may cap page 2-3.
- [x] **Git tag baseline** — `seo-sprint-baseline-260410` created ✅
- [x] **Google Ads** — DEFERRED. SEO only. Sibling plan `260410-0855` on hold.
- ⏳ **Remaining:** user runs Google Keyword Planner cho 10 keywords → fill volume data → volume gate (F1)

## Tiered Acceptance Criteria (F11 revised)

**Tier A — Established xoài pages** (3 pages: KW #2, #3, #4, #10)
- Week 4: ≥3/4 in Top 10 organic
- Baseline: existing rank (from P01 GSC)

**Tier B — New xoài blog content** (2 pages: KW #1, #7)
- Week 4: ≥1/2 indexed + impressions appearing
- Week 8: Top 20 realistic, Top 10 stretch

**Tier C — New dừa content** (2 pages: KW #5, #6)
- Week 4: indexed in Google (may not rank yet)
- Week 12: Top 30 realistic (new section, thin authority)

**Tier D — New landings** (2 keywords: KW #8, #9 — deferred to MVP anchor sections first per F9)
- Week 2: MVP anchor section live at existing hub
- Week 4: Evaluate GSC impressions → decide dedicated landing promotion

## Target keywords (locked)

| # | Keyword | Page type | Current status |
|---|---|---|---|
| 1 | xoài tứ quý bến tre 1 kg bao nhiêu trái | Blog FAQ | ❌ Missing |
| 2 | cách bảo quản xoài tứ quý bến tre | Blog guide | ⚠️ Duplicate (resolve) |
| 3 | xoài tứ quý bến tre ăn sống hay chín | Blog compare | ⚠️ Variant |
| 4 | mua xoài bến tre chính gốc ở đâu hà nội | Landing HN | ⚠️ Partial |
| 5 | dừa xiêm bến tre khác dừa xiêm miền tây như thế nào | Blog compare | ❌ Missing |
| 6 | đặt dừa xiêm bến tre online ship toàn quốc | Landing | ⚠️ Not targeting |
| 7 | xoài thạnh phú loại 1 giá bao nhiêu | Blog price | ❌ Missing |
| 8 | quà biếu trái cây đặc sản bến tre | Landing gift | ❌ Missing |
| 9 | vựa xoài tứ quý bến tre giá sỉ | Landing B2B | ⚠️ Temporal only |
| 10 | xoài bến tre có gì đặc biệt | Blog storytelling | ⚠️ Not targeting |

## Phases (revised — P05 interleaved, P06 extracted)

| # | Phase | Status | Effort | Keywords |
|---|-------|--------|--------|----------|
| 01 | [Research + SERP Audit + Volume Validation](phase-01-research-and-serp-audit.md) | ⏳ partial (AI done, user handoff pending) | 2d | All 10 + volume data (F1) |
| 02 | [Optimize 6 Existing Pages + inline schema/links](phase-02-optimize-existing-pages.md) | blocked | 3d | #2, #3, #4, #6, #10 (schema inline F7) |
| 03 | [Write 4 New Blog Articles + inline schema](phase-03-write-new-blog-articles.md) | blocked | 5d | #1, #5, #7 |
| 04 | [MVP Anchor Sections + validate demand](phase-04-build-new-landing-pages.md) | blocked | 2d (MVP) | #8, #9 anchor sections first (F9) |
| 05 | [Schema/Link Validation Checklist](phase-05-schema-internal-links-aeo.md) | blocked | 1d (validation only) | All — audit only, additions in P02-P04 |
| 06 | [Verify + GSC Tracking + Tiered Review](phase-07-verify-and-gsc-tracking.md) | blocked | 30d parallel | Tiered targets (F11) |

**Extracted to sibling plan:** Google Ads work — see `plans/260410-0855-google-ads-long-tail-sprint/`

**Note:** All phases marked `blocked` until pre-sprint blockers resolved (F6).

## Acceptance Criteria (see Tiered above + these baseline)

- [ ] 10/10 keywords have dedicated OR optimized page OR MVP anchor section
- [ ] Each page: exact keyword in title + H1 + meta + first paragraph
- [ ] Each page: JSON-LD schema phù hợp
- [ ] Internal linking ≥3 pillar-to-target (added inline during P02-P04 per F7)
- [ ] Keywords with validated volume (F1) have baseline GSC snapshot
- [ ] Zero redirect legacy URLs (SEO-first)
- [ ] Zero content deletion — duplicates resolved via `uxReviewed: false` gate (F5)
- [ ] Git tag `seo-sprint-baseline-260410` created before sprint (F12)

## Decision points (revised per red team)

1. **#2 duplicate resolution (F5 revised):** Keep legacy TSX as primary. MDX duplicate → set `uxReviewed: false` in frontmatter (gates it from render without 404). NEVER delete.
2. **#3 variant slug rename:** `an-chin-hay-xanh` → `an-song-hay-chin` via frontmatter title update + add redirect `{ permanent: false }` — WAIT, no redirects (SEO-first). Alternative: keep existing slug + add exact keyword in H2. No rename.
3. **#6 dừa landing:** metadata + H2 section only. Existing landing body đủ.
4. **Ads extracted (F8):** All Ads work → sibling plan `260410-0855-google-ads-long-tail-sprint/`
5. **Quà biếu #8 + Vựa B2B #9 (F9 revised):** MVP anchor sections first (`/san-pham#qua-bieu`, `/xoai-tu-quy#gia-si`). Promote to dedicated pages only if Week 2 GSC shows impressions.
6. **Backlink strategy (F3):** Acknowledge on-page-only ceiling. Dừa keywords may cap at page 2-3 without off-page. Acceptable per tiered targets.

## Risks (post red team)

| Risk | Severity | Mitigation |
|---|---|---|
| Dừa keywords unrealistic 30d (F2) | CRITICAL | Tiered targets; Tier C = "indexed only" by W4 |
| No search volume validation (F1) | CRITICAL | P01 step 0 blocking; drop < 30/mo keywords |
| On-page-only ceiling (F3) | CRITICAL | Accept ceiling OR add off-page phase later |
| Duplicate #2 cannibalization | HIGH | `uxReviewed: false` gate (never delete) (F5) |
| Editor bandwidth cho UX review | HIGH | Pre-sprint blocker (F6) |
| Zalo attribution (F4) | HIGH | source_id URL param in pre-filled Zalo messages |
| P05 bottleneck (F7) | HIGH | Interleaved into P02-P04; P05 = validation only |
| Rollback inadequate (F12) | MEDIUM | Git tag baseline before sprint |

## SEO Safeguards

- ❌ Zero `redirects()` entries added
- ✅ Canonical URL per page
- ✅ JSON-LD schema phù hợp
- ✅ Breadcrumb schema
- ✅ Internal linking từ pillar pages
- ✅ GSC baseline snapshot trước khi optimize (Phase 01)
- ✅ Week 4 target verification (Phase 07)

## Dependencies

**Blocks:** none
**Blocked by:** pre-sprint blockers (6 items above). Cannot cook until all resolved.
**Parallel:** `plans/260410-0855-google-ads-long-tail-sprint/` (Ads sibling), `plans/260409-2215-marketing-daily-articles/` (marketing broad coverage)

## Red Team Review

**Session:** 2026-04-10 08:55 | **Report:** `reports/red-team-260410-0855-long-tail-sprint-plan.md`
**Findings:** 12 total, 12 accepted | **Severity:** 3 Critical, 4 High, 5 Medium

| # | Finding | Severity | Applied |
|---|---------|----------|---------|
| F1 | No search volume validation | Critical | P01 step 0 blocking |
| F2 | 30-day Top 1 unrealistic for new domain | Critical | Tiered targets |
| F3 | Zero backlink strategy | Critical | Acknowledged ceiling |
| F4 | Zalo attribution broken | High | source_id workaround (sibling Ads plan) |
| F5 | Duplicate delete unsafe | High | `uxReviewed: false` gate, never delete |
| F6 | Blockers not gated | High | Pre-sprint blockers section |
| F7 | P05 serial bottleneck | High | Interleaved into P02-P04 |
| F8 | Ads should be own plan | Medium | Extracted to sibling |
| F9 | 2 new landings premature | Medium | MVP anchor sections first |
| F10 | Speakable selector may not exist | Medium | P05 audit step |
| F11 | Week 4 criteria optimistic | Medium | Tiered realistic |
| F12 | Rollback inadequate | Medium | Git tag baseline |

## Next Steps

1. **Resolve 6 pre-sprint blockers** (see top of file)
2. Create git tag `seo-sprint-baseline-260410`
3. Execute P01 (research + volume validation)
4. Launch sibling Ads plan in parallel (separate decision)
