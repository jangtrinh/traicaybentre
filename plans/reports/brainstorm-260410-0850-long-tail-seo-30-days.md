---
type: brainstorm
date: 2026-04-10 08:50
slug: long-tail-seo-30-days
status: approved
---

# Brainstorm — Long-tail SEO 30 ngày (Top 1 target, cả SEO lẫn Ads)

## Goal

Top 1 organic (Google) + Top Ads position cho **10 long-tail keywords** volume thấp, conversion cao, CPC 2k-4k, trong **30 ngày**. Đối thủ ít tối ưu → thắng được.

## Target keywords (locked)

| # | Keyword | Intent | Page type | Status |
|---|---|---|---|---|
| 1 | `xoài tứ quý bến tre 1 kg bao nhiêu trái` | Info → buy | Blog FAQ | ❌ Missing |
| 2 | `cách bảo quản xoài tứ quý bến tre` | How-to | Blog guide | ⚠️ Duplicate (legacy + MDX) |
| 3 | `xoài tứ quý bến tre ăn sống hay chín` | Compare | Blog compare | ⚠️ Variant (an-chin-hay-xanh) |
| 4 | `mua xoài bến tre chính gốc ở đâu hà nội` | Transactional | Landing HN | ⚠️ Partial (existing /giao-hang/ha-noi) |
| 5 | `dừa xiêm bến tre khác dừa xiêm miền tây như thế nào` | Compare | Blog compare | ❌ Missing |
| 6 | `đặt dừa xiêm bến tre online ship toàn quốc` | Transactional | Landing | ⚠️ Landing `/dua-xiem-ben-tre` chưa target |
| 7 | `xoài thạnh phú loại 1 giá bao nhiêu` | Price research | Blog price | ❌ Missing (có generic price, thiếu loại 1) |
| 8 | `quà biếu trái cây đặc sản bến tre` | Gift intent | Landing gift | ❌ Missing |
| 9 | `vựa xoài tứ quý bến tre giá sỉ` | B2B wholesale | Landing B2B | ⚠️ MDX temporal only |
| 10 | `xoài bến tre có gì đặc biệt` | Discovery | Blog storytelling | ⚠️ Partial (story exists, not keyword-targeted) |

**Coverage:** 0/10 exact match. 6 partial. 4 fully missing.

## Strategy

### SEO (organic)
- **On-page optimize** 6 partial pages: title + H1 + meta description + intro 100 words chứa exact keyword phrase
- **Create** 4 new pages (1 blog FAQ, 1 blog compare dừa, 1 blog price Loại 1, 1 blog storytelling refreshed)
- **Create** 2 new landings (quà biếu gift hub, vựa B2B sỉ) — optimized cho #8, #9
- **Schema layers**: FAQPage (#1), HowTo (#2), Product (all landings), LocalBusiness (#4, #9), Review if testimonials
- **Internal linking**: hub-spoke từ `/xoai-tu-quy` + `/dua-xiem-ben-tre` + `/san-pham` → tất cả pillar pages; cross-link giữa blog articles theo topic cluster
- **Speakable** cho blog FAQ (AEO ChatGPT/Perplexity)

### Ads (paid)
- **Google Ads** campaign với match type "Phrase" cho 10 keywords
- CPC budget: 2k-4k VND/click, daily cap ~100k-200k VND
- Landing page targeting: mỗi keyword dedicated landing page
- Negative keywords: "giống", "cây giống" (nursery intent), "recipe" (cooking intent only)
- Conversion tracking: Zalo click + phone tel:

### 30-day timeline
- Week 1: Research + audit + optimize 6 existing
- Week 2: Write + publish 4 new blog articles
- Week 3: Build 2 new landings + schema + internal links
- Week 4: Launch Ads + monitor GSC daily + iterate

## Evaluated approaches

| # | Approach | Pros | Cons |
|---|---|---|---|
| A | Serial content production (1 page/day) | Predictable, quality | Slow — 10 days for pages alone |
| B | Parallel AI generation + batch UX review | Fast (3-5 days for pages) | Quality risk |
| C | **Hybrid** (Recommended): AI draft + manual UX review + priority order | Balance speed + quality | Needs editor bandwidth |

**Decision: C** — reuse marketing plan's AI pipeline + prioritize 3 highest-intent targets first (#6 dừa landing, #9 B2B sỉ, #4 HN landing).

## Risks & mitigation

| Risk | Mitigation |
|---|---|
| Duplicate content #2 (legacy TSX + MDX) confuses Google | Pick ONE canonical, 301 the other → actually NO, SEO-first zero redirect. Solution: differentiate by intent (legacy = pillar, MDX = deep dive) or remove MDX duplicate |
| Keyword stuffing title/H1 | Natural placement only — exact keyword 1x in title, 1x H1, 1x first paragraph |
| Ads click fraud (rare but existent) | Google Ads invalid click filter + manual review week 2 |
| Over-index of low-volume pages | YAGNI — only 10 target pages, clear boundaries |
| Conflict với existing 90-article marketing calendar | Marketing plan has broad coverage; these 10 are focused booster. Flag conflicts when auditing. |

## Acceptance criteria

- [ ] 10/10 keywords have dedicated or optimized page
- [ ] Each page: title + H1 + meta + intro chứa exact keyword phrase
- [ ] Each page: JSON-LD schema phù hợp (FAQPage/HowTo/Product/LocalBusiness)
- [ ] Internal link graph: mỗi target page có ≥3 internal links từ pillar pages
- [ ] Google Ads campaign live với 10 ad groups, Quality Score ≥6
- [ ] GSC weekly report: 10 keywords tracking + ranking position
- [ ] Week 4 target: ≥5/10 keywords trong Top 10, ≥2/10 trong Top 3

## Unresolved questions

1. Editor bandwidth cho UX review pass — ai làm, bao nhiêu bài/ngày?
2. Google Ads budget tổng 30 ngày? (Ước: 3-6M VND)
3. Dừa Xiêm chưa có price data — landing #6 có dùng "liên hệ giá" CTA không?
4. Quà biếu (#8) có cần photoshoot ảnh gift box riêng hay dùng existing assets?
5. Duplicate #2 resolution: giữ legacy TSX hay MDX hay cả hai?
