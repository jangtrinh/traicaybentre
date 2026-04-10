---
title: "Google Ads — Long-tail Sprint 30 ngày (sibling SEO plan)"
description: "Paid search cho 10 long-tail keywords. Parallel với plans/260410-0850-long-tail-seo-30-days."
status: pending
priority: P2
effort: 30d
branch: main
tags: [ads, google-ads, paid-search, conversion-tracking]
created: 2026-04-10
updated: 2026-04-10
domain: complicated
mode: fast
---

# Google Ads — Long-tail Sprint

**Extracted from:** SEO plan `260410-0850-long-tail-seo-30-days/` (red team F8)
**Parallel to:** that SEO plan — both run in same 30-day window

## Goal

Paid search coverage cho 10 long-tail keywords song song với organic SEO sprint. CPC 2k-4k VND, conversion tracking Zalo + phone.

## Pre-launch Blockers

- [ ] Google Ads account active + card attached
- [ ] GA4 property linked to Ads account
- [ ] Google Tag Manager container setup
- [ ] Daily budget confirmed với user (ước 100k-200k VND/day)
- [ ] 10 target landing URLs live (blocked by SEO plan P02-P04)
- [ ] Zalo pre-filled message với `?src=ads-ag{N}` source_id param (F4 attribution fix)

## Phases

| # | Phase | Status | Effort |
|---|---|---|---|
| 01 | [Google Ads Setup + Launch + Monitor](phase-01-google-ads-setup-and-launch.md) | blocked | 7d setup + 23d monitor |

**Note:** Plan has 1 phase now because extracted as-is. May split if complexity grows.

## Acceptance Criteria

- [ ] 10 ad groups live với Quality Score ≥6
- [ ] CTR ≥3% per ad group by week 2
- [ ] ≥20 conversions (Zalo clicks with source_id + phone calls) by week 4
- [ ] Cost/conversion < 40k VND
- [ ] Source_id attribution working in Zalo admin
- [ ] Weekly reports saved

## Dependencies

**Blocked by:** SEO plan P02-P04 (landing pages live). Can start ad creation once pages deployed, even before SEO optimization complete.

## Red Team findings applied (F4)

**Zalo attribution fix:** Pre-filled Zalo message URL includes `?src=ads-ag1` through `?src=ags-ag10` param. Zalo admin manually tags inquiries by source_id. Attribution loop closes via manual tagging, not GA4 cross-domain.

## Next

1. Resolve pre-launch blockers
2. Wait for SEO plan landing pages live
3. Execute P01 (setup + launch + monitor)
4. Weekly cadence per phase file
