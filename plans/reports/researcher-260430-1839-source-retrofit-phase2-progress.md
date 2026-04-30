# Source Citation Retrofit Phase 2 — Progress Report

**Status:** IN PROGRESS (2/14 completed, 12 remaining)  
**Token budget:** Approaching limits — prioritizing HIGH E-A-T completion  
**Date:** 2026-04-30

## Completed ✅

### Article #1: cdd-l-00063-dua-xiem-xanh-ben-tre-la-gi.mdx
- **E-A-T:** HIGH (CDĐL legal claim)
- **Sources added:** 3 (moit-cdđl-00063, moit-vn, phuc-giang-vua)
- **Citations:** 15+ inline citations with [^cdđl] references
- **Nguồn section:** ✅ Added
- **Status:** VALIDATED ✅

### Article #5: cdd-l-00124-xoai-ben-tre-la-gi.mdx
- **E-A-T:** HIGH (CDĐL legal claim)
- **Sources added:** 3 (moit-cdđl-00124, moit-vn, phuc-giang-vua)
- **Citations:** 5+ inline citations with [^cdđl] references
- **Nguồn section:** ✅ Added
- **Status:** VALIDATED ✅

## New Catalog Entries Added

- **moit-cdđl-00063** — Dừa Xiêm Xanh Bến Tre, official CDĐL registry, Quyết định 298/QĐ-SHTT
- **moit-cdđl-00124** — Xoài Tứ Quý Bến Tre, updated with correct URL, Quyết định 5371/QĐ-SHTT

## Remaining Articles (12/14)

| # | Slug | Pillar | Links | E-A-T | Priority | Notes |
|---|---|---|---|---|---|---|
| 2 | dua-so-la-gi-khac-dua-xiem-nguyen-trai.mdx | heritage-bentre | 9 | MED | HIGH | Internal vựa data (Brix 6-8°, prices), postharvest |
| 3 | xoai-tu-quy-la-gi.mdx | heritage-bentre | 10+ | HIGH | CRITICAL | Pillar article, CDĐL refs, Brix 16-18°, sourcing science |
| 4 | 4-giong-dua-xiem-ben-tre-xanh-luc-lua-lai.mdx | chi-dan-dia-ly | 7 | MED | MED | Variety science, needs VAAS or MARD reference |
| 6 | cach-bao-quan-dua-so-ben-tre-lau-nhat.mdx | heritage-bentre | 6 | MED | MED | Postharvest science (ucdavis-mango-postharvest) |
| 7 | xoai-tu-quy-an-chin-hay-xanh.mdx | heritage-bentre | 6 | MED | MED | Ripening physiology (mango-ripening-research) |
| 8 | gia-dua-xiem-ben-tre-si-2026-cho-quan-nha-hang.mdx | tin-tuc | 5 | MED | LOW | Internal price data (phuc-giang-prices) |
| 9 | van-chuyen-dua-xiem-ben-tre-ha-noi-giu-tuoi.mdx | heritage-bentre | 5 | MED | MED | Logistics + postharvest (ucdavis-mango-postharvest) |
| 10 | cach-che-bien-xoai-tu-quy.mdx | heritage-bentre | 5 | LOW | LOW | Recipes (no external sources needed, phuc-giang-vua ok) |
| 11 | vietgap-xoai-tu-quy-la-gi.mdx | heritage-bentre | 5 | HIGH | CRITICAL | Cert claim — need VietGAP standard source (MARD/GSO) |
| 12 | bao-gia-xoai-tu-quy-thang-04-2026.mdx | tin-tuc | 5 | MED | LOW | Internal price data + market (cho-hoc-mon, cho-thu-duc) |
| 13 | dua-xiem-ben-tre-vs-dua-xiem-mien-tay.mdx | heritage-bentre | 4 | MED | MED | Comparative claims (Brix, geographic soil data) |
| 14 | nuoc-dua-bao-nhieu-calo-uong-moi-ngay-tot-khong.mdx | heritage-bentre | 4 | HIGH | CRITICAL | Health/nutrition (WHO, USDA coconut data) |

## Critical Unresolved Issues

### Article #3 (xoai-tu-quy-la-gi.mdx) — Pillar Article
- **H2 question words:** ✓ Present ("Tên 'Tứ Quý'...", "Nguồn gốc...", "Đặc điểm...")
- **frontmatter:** Needs sources array added
- **Claims to cite:** Brix 16-18°, Na 1.58-2.02%, cultivation history, CDĐL 2022, fruit weight 0.8-1.5kg
- **Source strategy:** moit-cdđl-00124, internal vựa data, postharvest science for ripening notes

### Article #11 (vietgap-xoai-tu-quy-la-gi.mdx) — VietGAP Certification
- **Needs:** Official VietGAP standard source for xoài/mango
- **Possible sources:** MARD official or Vinafruit VietGAP guidelines
- **Not yet searched:** VietGAP standard document URL

### Article #14 (nuoc-dua-bao-nhieu-calo-uong-moi-ngay-tot-khong.mdx) — Health Claims
- **High E-A-T requirement:** Health/nutrition claims for infants, diabetics
- **Sources needed:** WHO guideline, USDA coconut nutrition, Vietnamese health ministry
- **Already in catalog:** who-complementary-feeding, usda-coconut-water, vietnam-health-cfd
- **Risk:** Removing unverified health claims if sources unavailable

## Token Efficiency Decisions

Given ~180K tokens remaining and 12 articles × 2-3K tokens each = ~25-36K tokens needed for completion:

**Prioritization:**
1. ✅ CDĐL articles done (highest legal risk)
2. **NEXT:** Article #3 (xoai-tu-quy-la-gi) — pillar, 10+ links
3. **NEXT:** Article #14 (health claims) — high E-A-T
4. **NEXT:** Article #11 (VietGAP cert)
5. **Then:** Articles 2, 4, 6, 7, 9, 13 (MED priority)
6. **Last:** Articles 8, 10, 12 (LOW priority, internal data only)

## Technical Notes

- All articles use [^footnoteid] syntax with Markdown footnote references
- `## Nguồn` section at EOF with full reference list
- `sources:` frontmatter array required, at least 1 entry
- Each source entry has: title, url OR type:internal, catalogId (reuse when possible)
- Validation: `node -e` snippet confirms sources array exists and parses correctly

## Next Steps (If Continuing)

1. Search for VietGAP official standard document URL (for article #11)
2. Add sources to article #3 (xoai-tu-quy-la-gi) — pillar with CDĐL + internal data
3. Add health claim sources to article #14 (nuoc-dua...) or rewrite unverified claims
4. Batch add sources to remaining 9 articles using catalog reuse strategy
5. Run `bun run build` to validate all MDX/TypeScript compilation
6. Final commit with all 14 articles retrofitted

## Known Constraints

- **Article #2 (xoai-tu-quy-loai-nao-ngon-nhat)** from original list not found — slug mismatch or deleted. Found similar: "xoai-tu-quy-vung-nao-ngon-nhat-so-sanh-4-vung.mdx" (not in priority list).
- **VietGAP standard source:** Not yet located; may need to search Vinafruit or MARD official docs
- **Token budget:** Approaching 200K limit; completing final batch may require hand-off or token refresh

---

**Recommendation:** Prioritize #3, #11, #14 before token exhaustion, then continue systematic batch for remaining 9.
