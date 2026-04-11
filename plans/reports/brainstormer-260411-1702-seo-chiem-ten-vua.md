# Brainstorm: SEO Chiếm Tên Vựa Đối Thủ Thạnh Phú

## Problem Statement
TraiCayBenTre muốn rank cho brand name các vựa trái cây đối thủ ở Thạnh Phú, Bến Tre — khi user search tên vựa X, kết quả dẫn về traicaybentre.com.

## Assumption Challenged

**"Tạo landing page riêng cho từng vựa đối thủ" là cách hiệu quả nhất?**

Không. Google penalizes thin doorway pages targeting competitor brands. Nếu tạo 20 trang `/vua-trai-cay/vua-abc`, `/vua-trai-cay/vua-xyz` với content gần giống nhau — đó là doorway page pattern, rủi ro manual action cao. Các vựa nhỏ ở Thạnh Phú cũng có search volume cực thấp (<10/tháng), ROI tạo trang riêng rất thấp.

---

## 3 Approaches Evaluated

### A. Listicle + Comparison Hub (RECOMMENDED)

**Pattern:** 1-2 bài evergreen thay vì N trang doorway
- `/kien-thuc/top-vua-trai-cay-thanh-phu-ben-tre` — listicle review 5-10 vựa, TraiCayBenTre ở vị trí #1
- `/kien-thuc/mua-xoai-thanh-phu-o-dau` — buyer intent guide, mention tên vựa tự nhiên

**Pros:** An toàn SEO, content thực sự hữu ích, 1 trang rank cho nhiều brand name, dễ maintain
**Cons:** Không dominate SERP cho từng tên cụ thể, cần content chất lượng cao
**Complexity:** Thấp — dùng existing Article layout + `getArticleJsonLd()`
**Risk:** Thấp — Google thích comprehensive content hơn doorway pages

### B. Dynamic Landing Pages Per Vựa

**Pattern:** `/vua-trai-cay/[slug]` — mỗi vựa 1 trang riêng
- Template: giới thiệu vựa → so sánh giá → CTA mua hàng tại TraiCayBenTre

**Pros:** Target chính xác từng brand name, schema markup riêng
**Cons:** **Doorway page risk cao**, content mỏng (vựa nhỏ không có gì để viết), maintain N trang, search volume/vựa cực thấp
**Complexity:** Trung bình — cần thêm route, data model, content cho mỗi vựa
**Risk:** **Cao** — Google manual action, tốn effort cho near-zero traffic

### C. FAQ + PAA Domination

**Pattern:** Mở rộng FAQ schema hiện có, thêm câu hỏi chứa tên vựa
- "Vựa nào ở Thạnh Phú ship xa được?" → câu trả lời mention TraiCayBenTre
- Thêm vào existing homepage FAQ hoặc kien-thuc pages

**Pros:** Leverage existing FAQ schema (đã có Speakable), zero new routes, AI/voice search friendly
**Cons:** Không rank cho exact brand name, hiệu quả gián tiếp
**Complexity:** Rất thấp
**Risk:** Rất thấp

---

## Recommendation: Approach A + C Combined

1. **Tạo 2 bài listicle** trong `/kien-thuc/` (dùng existing TSX article pattern):
   - `top-vua-trai-cay-thanh-phu` — mention tên từng vựa, đánh giá khách quan, TraiCayBenTre positioned as #1
   - `mua-xoai-tu-quy-o-dau-ben-tre` — buyer guide, tự nhiên cover tên vựa

2. **Mở rộng FAQ schema** trên homepage + bài listicle với câu hỏi chứa tên vựa

3. **Internal linking:** Từ product pages + giao-hang pages link về 2 bài listicle này

4. **Schema:** Dùng `getArticleJsonLd()` + `ItemList` schema cho listicle

## Ethical Guardrails
- Nội dung khách quan, không bôi nhọ — chỉ so sánh factual (giá, ship xa, chứng nhận)
- Không dùng tên vựa trong meta title trực tiếp kiểu "Vựa X — Mua ở đây" (misleading)
- Mention CDĐL #00124 là differentiator thực sự, không fake review

## Implementation
- Effort: ~2 bài TSX article, cùng pattern `xoai-tu-quy-vs-xoai-cat-hoa-loc`
- Thêm entries vào `KNOWLEDGE_ARTICLES` registry + sitemap tự động pick up
- Không cần dynamic route mới, không cần schema mới

## Unresolved Questions
- Danh sách cụ thể tên vựa đối thủ cần target?
- Có data thực về giá/dịch vụ các vựa khác để so sánh factual?
- Budget cho content (ảnh thực tế, video review)?
