# Content Writing Template — TraiCayBenTre

Template chuẩn cho mọi bài MDX trong `src/content/articles/{product}/{kien-thuc|tin-tuc}/`. Paste vào prompt agent để giảm variance.

## Frontmatter schema (bắt buộc)

```yaml
---
title: "{Primary KW} — {Hook giá trị 3-6 từ}"
publishedAt: "YYYY-MM-DDT07:00:00+07:00"
primaryKeyword: "{chuỗi chính xác, lowercase, có dấu}"
metaDescription: "{150-160 ký tự, chứa primary KW trong 100 ký tự đầu, kết cụ thể/CTA}"
uxReviewed: true
uxPassModel: "claude-sonnet-4-6"
author: ai
pillar: "{heritage-bentre | gia-thi-truong | san-pham-su-dung | mua-vu-le-tet}"
slot: "{A|B|C|D}"
secondaryKeywords:
 - "{KW phụ 1}"
 - "{KW phụ 2}"
 - "{KW phụ 3}"
ogImage: "/images/{folder}/{image}.jpg"
faq:
  - q: "{Câu hỏi 1}"
    a: "{Trả lời 50-80 từ, chứa số/data cụ thể}"
  # 4-6 câu FAQ
---
```

## Body structure (theo thứ tự)

1. **Hook AEO 1 đoạn** (sau frontmatter, trước H2 đầu)
   - Format: `> **Trả lời nhanh:** {bold primary KW} + {3-5 data points cụ thể}.`
   - 80-120 từ, trả lời trực tiếp primary KW, chứa số liệu

2. **H2 sections** (5-8 sections)
   - Mỗi H2 cover 1 sub-topic rõ ràng
   - Ít nhất 1 H2 chứa `{primary KW}` hoặc biến thể gần
   - Dùng table/bảng để density data (AEO friendly)

3. **3-5 internal links** (rải trong body)
   - Link tới pillar page + kien-thuc articles liên quan
   - Anchor text = exact keyword target của link đích

4. **CTA footer** (cuối bài, trước FAQ render)
   - Hotline `0932 585 533` (Anh Phúc) + Zalo link + link product page
   - Tone: thân thiện, mời cụ thể, tránh bán hàng cứng

## Voice rules

- Xưng **"mình/bạn"** (không "tôi/quý khách")
- Empathy: bắt đầu bằng pain point khách, không pitch sản phẩm
- **Sacrifice grammar for concision** — câu ngắn, paragraph 2-4 câu
- Số liệu cụ thể > tính từ mơ hồ (❌ "rẻ" ✅ "8-10k₫/trái")
- Vietnamese orthography đầy đủ dấu (không bao giờ ASCII)

## Word count

| Loại bài | Word count |
|---|---|
| tin-tuc weekly price | 600-900 |
| tin-tuc market analysis | 1000-1400 |
| kien-thuc how-to/compare | 1000-1500 |
| kien-thuc authority/story | 1400-2000 |

## Data density checklist

- [ ] Ít nhất 1 bảng số liệu (price, spec, comparison)
- [ ] 3+ số liệu cụ thể trong Hook AEO
- [ ] Source citation khi dùng data chính phủ (CDĐL, Sở KH&CN, VietGAP)
- [ ] Bảng giá có đơn vị `₫/trái` hoặc `₫/kg`

## Seed examples (mimic voice/structure)

Reference những bài đã duyệt:
- **tin-tuc price:** `src/content/articles/dua-xiem-ben-tre/tin-tuc/gia-dua-xiem-ben-tre-si-2026-cho-quan-nha-hang.mdx`
- **tin-tuc market:** `src/content/articles/xoai-tu-quy/tin-tuc/thi-truong-xoai-xuat-khau-2026.mdx`
- **kien-thuc authority:** `src/content/articles/xoai-tu-quy/kien-thuc/lich-su-cay-xoai-tu-quy-ben-tre.mdx`
- **kien-thuc how-to:** `src/content/articles/dua-xiem-ben-tre/kien-thuc/dua-got-bi-tham-den-enzyme-ppo-cach-phong.mdx`

## Components available trong MDX

- `<TikTokEmbed videoId="..." />` — embed TikTok (aspect 9/16)
- `<ImageCarousel images={[...]} />` — carousel ảnh

## Anti-patterns (cấm)

- ❌ Tiêu đề clickbait ("bí mật không ai biết")
- ❌ Paragraph dài >5 câu
- ❌ Thiếu Hook AEO
- ❌ Thiếu CTA hotline/Zalo
- ❌ ASCII thay dấu Việt
- ❌ Comment giải thích "tại sao viết câu này"
