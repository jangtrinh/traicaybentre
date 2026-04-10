# Phase 03 — Write 4 New Blog Articles

**Status:** pending | **Effort:** 5d | **Blocks:** P05 | **Blocked by:** P01

## Goal

Ship 4 MDX articles covering missing long-tail keywords. Reuse marketing plan's MDX pipeline.

## Articles to create

| KW# | Slug | Target keyword | Word count | Schema |
|---|---|---|---|---|
| 1 | `xoai-tu-quy-1-kg-bao-nhieu-trai` | xoài tứ quý bến tre 1 kg bao nhiêu trái | 800-1200 | FAQPage + Article |
| 5 | `dua-xiem-ben-tre-vs-dua-xiem-mien-tay` | dừa xiêm bến tre khác dừa xiêm miền tây như thế nào | 1200-1800 | Article (comparison) |
| 7 | `xoai-tu-quy-thanh-phu-loai-1-gia-bao-nhieu` | xoài thạnh phú loại 1 giá bao nhiêu | 1000-1500 | Article + price list |
| 10 | `xoai-ben-tre-co-gi-dac-biet` | xoài bến tre có gì đặc biệt | 1500-2000 | Article (storytelling) + HowTo embedded |

**Note:** #10 có thể là refresh của `tho-nhuong-thanh-phu-xoai.mdx` thay vì new file (decide P01). Plan này assume new.

## File pattern

```
src/content/articles/xoai-tu-quy/kien-thuc/{slug}.mdx
```
hoặc cho dừa:
```
src/content/articles/dua-xiem-ben-tre/kien-thuc/{slug}.mdx
```

Yêu cầu `mkdir -p src/content/articles/dua-xiem-ben-tre/kien-thuc/` + `.../tin-tuc/` để Phase 03 MDX loader walk được.

## Frontmatter contract (per marketing plan spec)

```yaml
---
title: "Xoài Tứ Quý Bến Tre 1 Kg Bao Nhiêu Trái? Bảng Quy Đổi Trọng Lượng"
publishedAt: "2026-04-11T07:00:00+07:00"
primaryKeyword: "xoài tứ quý bến tre 1 kg bao nhiêu trái"
metaDescription: "1 kg xoài Tứ Quý Bến Tre bao nhiêu trái? VIP 1-2 trái, Loại 1 2-3 trái, Loại 2 3-4 trái. Bảng quy đổi chi tiết."
uxReviewed: true
secondaryKeywords: ["xoài tứ quý trọng lượng", "xoài vip bao nhiêu kg"]
pillar: "gia-thi-truong"
faq:
  - q: "1 kg xoài VIP được mấy trái?"
    a: "1-2 trái, mỗi trái 600-800g."
  - q: "Mua sỉ 20kg được bao nhiêu trái?"
    a: "20-40 trái tùy loại."
---
```

## Content template (800-2000 words, varies)

1. **H1**: exact keyword phrase
2. **Intro (100 words)**: exact keyword in first 50 words + value prop
3. **H2 sections** (5-8 sections): cover sub-topics comprehensively
4. **FAQ section** (5-8 Q&A): for FAQPage schema
5. **CTA footer**: Zalo link + phone + link to product page
6. **Internal links**: 3-5 to pillar pages + related articles

## Workflow per article

1. Research: SERP top 5 for keyword (re-check P01 data)
2. Outline: H2 structure + FAQ
3. AI draft via marketing prompt templates (`plans/260409-2215-marketing-daily-articles/ai-writing-prompts.md`)
4. UX review pass (mình/bạn, empathy, microcopy)
5. Human edit: fact-check, Zalo link, phone
6. Set `uxReviewed: true` + `publishedAt`
7. Commit + ISR auto-publish

## Files to Create

- `src/content/articles/xoai-tu-quy/kien-thuc/xoai-tu-quy-1-kg-bao-nhieu-trai.mdx`
- `src/content/articles/dua-xiem-ben-tre/kien-thuc/dua-xiem-ben-tre-vs-dua-xiem-mien-tay.mdx` (+ create parent folder)
- `src/content/articles/xoai-tu-quy/kien-thuc/xoai-tu-quy-thanh-phu-loai-1-gia-bao-nhieu.mdx`
- `src/content/articles/xoai-tu-quy/kien-thuc/xoai-ben-tre-co-gi-dac-biet.mdx`

## Todo

- [ ] mkdir dua-xiem-ben-tre content folder
- [ ] Draft article #1 (FAQ weight)
- [ ] Draft article #5 (dừa comparison)
- [ ] Draft article #7 (Loại 1 price)
- [ ] Draft article #10 (storytelling)
- [ ] UX review each
- [ ] Human edit each
- [ ] Publish (set uxReviewed true)
- [ ] Verify each renders at /xoai-tu-quy/kien-thuc/{slug} or /dua-xiem-ben-tre/kien-thuc/{slug}
- [ ] Build + sitemap verify new URLs present

## Success Criteria

- 4/4 articles published (uxReviewed true, publishedAt elapsed)
- Each article: exact keyword in title/H1/meta/first 100 words
- Each: FAQ schema rendered (verify Rich Results Test)
- All render via dynamic `[product]/[type]/[slug]/page.tsx` route
- Build + typecheck pass
- Internal links from pillar → these articles added

## Risks

| Risk | Mitigation |
|---|---|
| AI hallucinate price numbers | Fact-check against `src/lib/price-data.ts` |
| Dừa content accuracy (first dừa article) | User review required — vựa-specific facts |
| Word count bloat | YAGNI — aim for minimum viable depth |

## Next

→ P04: Build 2 new landing pages (#8 quà biếu, #9 vựa B2B sỉ)
