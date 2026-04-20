# Content Review Rubric — Score 1-5

Dùng cho reviewer agent sau writer agent. Reject (revise) nếu tổng điểm < 20/25 hoặc bất kỳ tiêu chí nào < 3.

## 5 tiêu chí

### 1. SEO Foundation (score 1-5)

- 5: Primary KW xuất hiện trong title, H1 đầu, metaDescription, hook AEO, 2+ H2. Secondary KW rải tự nhiên. Density KW 1-2%.
- 4: Có đủ primary KW nhưng 1 vị trí thiếu hoặc secondary KW ít.
- 3: Primary KW có nhưng không tối ưu vị trí.
- 2: Thiếu primary KW ở ≥2 vị trí quan trọng.
- 1: KW stuffing hoặc thiếu hoàn toàn primary KW.

### 2. AEO / Data Density (score 1-5)

- 5: Hook AEO 80-120 từ với 3+ data points. Ít nhất 1 bảng. 5+ số liệu cụ thể trong body. Source citation đầy đủ.
- 4: Hook đủ nhưng body thiếu 1-2 data points.
- 3: Có bảng nhưng hook mơ hồ hoặc thiếu số.
- 2: Thiếu bảng, số liệu chủ yếu dạng "khoảng", "tầm".
- 1: Không có bảng, không số liệu cụ thể.

### 3. Voice & Readability (score 1-5)

- 5: Xưng mình/bạn nhất quán. Empathy mở bài. Paragraph 2-4 câu. Không từ Hán-Việt cứng. Câu ngắn, dễ đọc mobile.
- 4: Voice đúng nhưng 1-2 paragraph quá dài hoặc lẫn "tôi/quý khách".
- 3: Đôi chỗ lệch voice hoặc paragraph 6-8 câu.
- 2: Voice formal / bán hàng cứng.
- 1: Giọng robot, nhồi keyword.

### 4. Internal Linking & Cross-sell (score 1-5)

- 5: 3-5 internal links anchor exact KW, rải body tự nhiên. Link về pillar + kien-thuc + product page. CTA hotline + Zalo + product link đầy đủ.
- 4: 3+ links nhưng 1 anchor chưa tối ưu.
- 3: 2 links hoặc CTA thiếu 1 thành phần.
- 2: 1 link hoặc không CTA sản phẩm.
- 1: Không internal link / không CTA.

### 5. Frontmatter & Schema (score 1-5)

- 5: Frontmatter đủ 100% fields. metaDescription 150-160 ký tự. FAQ 4-6 câu với data cụ thể. publishedAt đúng format ISO. ogImage tồn tại.
- 4: Đủ fields nhưng metaDescription ngoài 150-160 hoặc FAQ <4 câu.
- 3: Thiếu 1 field optional (secondaryKeywords, ogImage).
- 2: Thiếu field required (uxReviewed, pillar).
- 1: Frontmatter lỗi syntax hoặc thiếu nhiều field.

## Tổng điểm

- **23-25**: Ship ngay
- **20-22**: Minor edits (≤5 phút) → ship
- **15-19**: Revise 1 round (writer fix theo feedback)
- **<15**: Rewrite — prompt/seed chưa đủ, quay lại template

## Output format reviewer agent

```
## Score: XX/25

| Tiêu chí | Score | Ghi chú |
|---|---|---|
| SEO | X/5 | ... |
| AEO | X/5 | ... |
| Voice | X/5 | ... |
| Linking | X/5 | ... |
| Schema | X/5 | ... |

## Blocking issues (nếu có)
- ...

## Minor fixes
- ...

**Verdict:** {SHIP | MINOR | REVISE | REWRITE}
```
