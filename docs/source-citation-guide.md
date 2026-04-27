# Source Citation Guide

**Status:** MANDATORY for all articles, reports, and data claims (effective 27/04/2026)
**Why:** Site credibility, E-A-T (Expertise-Authoritativeness-Trustworthiness) signal cho Google, prevent AI hallucination.

## TL;DR

Every factual claim (số liệu, %, tấn, kg, calo, năm, mùa vụ, regulation) MUST have source. No exceptions.

## Format trong MDX articles

### 1. Frontmatter `sources` array (required)

```yaml
---
title: "Xoài Tứ Quý Bao Nhiêu Calo?"
sources:
  - title: "USDA FoodData Central — Mango, raw"
    url: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/169910"
    accessedAt: "2026-04-27"
    catalogId: "usda-mango"
  - title: "Vựa Phúc Giang — Internal nutrition data"
    type: "internal"
    publisher: "Vựa Phúc Giang, Thạnh Phú, Bến Tre"
    accessedAt: "2026-04-27"
    catalogId: "phuc-giang-vua"
---
```

**Field reference:**
- `title`: tên source (rõ ràng, có publisher)
- `url`: full URL (required unless `type: internal`)
- `accessedAt`: ngày access YYYY-MM-DD (cho data có thể thay đổi)
- `catalogId`: ID từ `data/source-catalog.json` (reuse common sources)
- `type`: optional — `internal` | `internal-data` (no URL needed)
- `publisher`: required cho `type: internal`

### 2. Inline citations với footnote syntax

```mdx
Xoài Tứ Quý chín chứa 60 kcal/100g[^1], cao hơn xoài cát Hòa Lộc (55 kcal/100g)[^1].

Brix score 16-18° đo bằng refractometer Atago[^2].

Sản lượng xoài Bến Tre đạt 850.000 tấn/năm 2024[^3].
```

### 3. End-of-article `## Nguồn` section (recommended)

```mdx
## Nguồn

[^1]: USDA FoodData Central. [Mango, raw](https://fdc.nal.usda.gov/fdc-app.html#/food-details/169910). Truy cập 27/04/2026.
[^2]: Vựa Phúc Giang — đo brix tại vườn Thạnh Phú, dùng máy Atago Master-T. Dữ liệu nội bộ.
[^3]: Tổng cục Thống kê. [Sản lượng nông sản 2024](https://gso.gov.vn/...). Truy cập 27/04/2026.
```

## Source taxonomy (priority order)

| Tier | Source type | Examples | When to use |
|---|---|---|---|
| 1 | International authority | USDA, WHO, FAO | Nutrition, health, global stats |
| 2 | VN government | GSO, MARD, MOIT, Cục SHTT | National stats, regulation, GI |
| 3 | Academic/research | VAAS, peer-reviewed | Variety science, technique |
| 4 | Industry association | Vinafruit | Market data, export |
| 5 | Local government | UBND Bến Tre, Thạnh Phú | Regional data |
| 6 | Wholesale market | Chợ Hóc Môn, Thủ Đức | Wholesale prices |
| 7 | News (cited carefully) | VnExpress, Tuổi Trẻ, Thanh Niên | Events, recent changes |
| 8 | Internal data | Vựa Phúc Giang | Own prices, photos, recipes (declare clearly) |

**Rule:** Prefer higher tier. Use lower tier only when higher unavailable.

## What requires source

- ✅ Statistics (số tấn, %, tỷ đồng, người)
- ✅ Nutrition (calo, vitamin, brix, dinh dưỡng)
- ✅ Prices (cite vựa data hoặc market source)
- ✅ Historical claims (năm, sự kiện, nguồn gốc giống)
- ✅ Regulatory (CDĐL, kiểm dịch, visa xuất khẩu)
- ✅ Geographic (vùng trồng, diện tích)
- ✅ Comparative ("ngon nhất", "lớn nhất") — needs measurable basis
- ✅ Health claims (bầu, bé, bệnh nhân tiểu đường)

## What does NOT require source

- Subjective taste descriptions ("ngọt thanh", "mùi thơm")
- Vựa-specific personal stories ("ông tôi trồng từ 1980")
- Recipes (own creation OK)
- General cultural knowledge ("Tết Đoan Ngọ")

## Anti-patterns (NEVER do)

- ❌ "Theo nghiên cứu" without naming the study
- ❌ "Các chuyên gia cho rằng" without naming experts
- ❌ "Khoảng X tấn" without source — say "không có data" or omit
- ❌ Made-up nutrition values (always cross-check USDA)
- ❌ Cite Wikipedia as primary source — go to Wikipedia's source instead
- ❌ Cite Shopee/Lazada/competitor sites for prices

## Source catalog

Centralized in `data/source-catalog.json`. Add new sources as needed via PR.

Common entries seeded:
- `usda-mango`, `usda-coconut-water` — nutrition
- `gso-vn`, `mard-vn`, `moit-vn`, `moit-cdđl-00124` — government
- `vaas`, `vinafruit`, `fao`, `who-nutrition` — research/international
- `phuc-giang-vua`, `phuc-giang-prices` — internal vựa
- `cho-hoc-mon`, `cho-thu-duc` — wholesale markets
- `ben-tre-portal`, `thanh-phu-portal` — local gov
- `vnexpress`, `tuoitre`, `thanhnien` — news

## Validation enforcement

`scripts/validate-aeo.js` enforces:
- `sources` frontmatter exists
- ≥1 source entry
- Each entry has `title` + (`url` OR `type: internal`)
- Internal types must have `publisher`

Hard failure stops article from being committed/published.

## Reports & plans

Same rule applies to `plans/reports/*.md` and `plans/**/plan.md`:

- Inline link with full URL: "Per [GSC Performance Apr 27](url)..."
- Internal data: "Source: `data/keyword-backlog.json`"
- GSC data: "GSC Performance, last N days, captured DD/MM/YYYY by Chrome MCP"
- Date stamp captured for time-sensitive data

## Retrofit campaign (existing 147 articles)

Articles created before 27/04/2026 lack source compliance. Multi-session retrofit campaign:
- Phase 1: Top 20 GSC-ranked articles (highest E-A-T impact)
- Phase 2: Top 50 by impressions
- Phase 3: Remaining tail

Track progress in `plans/{date}-retrofit-source-citations/`.

## Examples

### Bad (current state)

```mdx
Xoài Tứ Quý có khoảng 60 calo mỗi 100g, rất giàu vitamin C và beta-carotene.
```

### Good (after retrofit)

```mdx
Xoài Tứ Quý chín chứa 60 kcal/100g[^usda], giàu vitamin C (36mg, 40% DV) và beta-carotene[^usda].

## Nguồn
[^usda]: USDA FoodData Central. [Mango, raw, FDC ID 169910](https://fdc.nal.usda.gov/fdc-app.html#/food-details/169910). Truy cập 27/04/2026.
```
