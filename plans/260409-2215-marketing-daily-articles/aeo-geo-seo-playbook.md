# Playbook — Checklist Viết Bài SEO + GEO + AEO

Áp dụng cho **mọi bài** trong content calendar 30 ngày. Editor kiểm tra từng item trước khi publish.

---

## 1. SEO On-Page (15 items)

- [ ] **Title H1** ≤ 60 ký tự, chứa primary keyword gần đầu
- [ ] **Meta title** = H1 (hoặc variant) + thương hiệu "| Trái Cây Bến Tre"
- [ ] **Meta description** 150-160 ký tự, chứa primary + 1 secondary, kết thúc bằng CTA mềm
- [ ] **URL slug** kebab-case, ≤ 5 từ, có primary keyword (không có stop words tiếng Việt)
- [ ] **H1 duy nhất**, các H2/H3 phân cấp đúng, không nhảy cóc
- [ ] **Keyword density** primary 0.8-1.5%, secondary rải rác tự nhiên
- [ ] **Alt text** cho mọi ảnh, mô tả thật + chứa keyword phụ (không spam)
- [ ] **Internal links** 2-4 liên kết tới pillar + cluster cùng chủ đề (đã định nghĩa trong `topic-clusters.md`)
- [ ] **Outbound link** 1-2 tới nguồn authority (Cục SHTT, Bộ NN&PTNT, Wikipedia — `rel="noopener"`)
- [ ] **Word count** đạt target đã set (800-2000)
- [ ] **Canonical URL** self-referencing
- [ ] **Open Graph + Twitter card** ảnh 1200x630
- [ ] **Mobile-friendly**: test trên 375px width
- [ ] **Page speed** LCP < 2.5s (Next.js SSG/ISR đảm bảo)
- [ ] **Thêm vào sitemap.xml** sau khi publish

---

## 2. GEO (Geographic / Local SEO) — 10 items

Áp dụng đặc biệt cho Pillar 3 (giao hàng theo vùng), nhưng mọi bài đều cần ít nhất địa danh Bến Tre.

- [ ] **Local entity** nêu rõ Bến Tre / Thạnh Phú / Ba Tri / Bình Đại ở đoạn mở
- [ ] **Địa chỉ đầy đủ** HTX Thạnh Phong trong footer hoặc contact block
- [ ] **Lat/long** ẩn trong JSON-LD `geo` (Bến Tre 10.2433,106.3750; Thạnh Phú 9.9317,106.5500)
- [ ] **Tên chợ/vùng trồng cụ thể** (chợ đầu mối, HTX, xã Thạnh Phong, cù lao Minh...)
- [ ] **GEO pages (Day 04, 07, 11, 16, 19, 23)** có schema `Service.areaServed` với lat/long thành phố đích
- [ ] **NAP consistency** (Name/Address/Phone) — dùng đúng như LocalBusiness schema đã có
- [ ] **Anchor "Bến Tre"** link về homepage khi có thể
- [ ] **Nhắc tên huyện/xã** ít nhất 2 lần/bài cho Pillar 5
- [ ] **Khoảng cách ship** nêu cụ thể km và giờ (Bến Tre → HN 1,700km, ~30h; → HCM 85km, ~2h)
- [ ] **Google Business Profile** cập nhật bài mới mỗi tuần (outside codebase)

---

## 3. AEO (Answer Engine Optimization) — 12 items

Để ChatGPT / Perplexity / Google AI Overviews trích dẫn.

- [ ] **Direct answer block** ≤ 60 từ ngay sau H1, trả lời primary question trực tiếp
- [ ] **CSS id `#aeo-answer`** trên direct answer block (để Speakable schema target)
- [ ] **TL;DR box** đầu bài (3-5 bullet tóm tắt)
- [ ] **FAQPage schema** với tối thiểu 4 Q/A (tái dùng câu hỏi từ "People Also Ask")
- [ ] **Speakable schema** target `#aeo-answer` và `#tldr`
- [ ] **Bullet list và table** cho mọi thông tin có cấu trúc (giá, so sánh, số liệu)
- [ ] **DefinedTerm** cho bài định nghĩa (Day 01, 15, 22, 27)
- [ ] **HowTo schema** cho bài hướng dẫn (Day 05, 10, 18, 25)
- [ ] **NewsArticle schema** cho market report (Day 06)
- [ ] **Citation nguồn** rõ ràng: "Theo HTX Thạnh Phong...", "Cục SHTT ngày 10/11/2022..."
- [ ] **E-E-A-T signals**: author name (Giám đốc HTX hoặc biên tập viên), datePublished, dateModified
- [ ] **Unique data**: số liệu cụ thể (Na 1.58-2.02%, giá ngày, khoảng cách km) — không chung chung

---

## 3b. AI-Generated Content Guard — 10 items

Áp dụng cho **mọi** bài do AI draft (Claude/GPT). Editor phải pass 100% trước khi flip `status='ready'`.

- [ ] **Zero `[CẦN VERIFY]` markers** còn lại (đã fix/confirm/remove hết)
- [ ] **Zero fabricated số liệu** — mọi con số khớp với `context_facts` cung cấp cho AI
- [ ] **Zero "nghiên cứu cho thấy" / "nhiều chuyên gia" / "top X"** mà không có nguồn cụ thể
- [ ] **Citation cụ thể**: "Theo HTX Thạnh Phong...", "CDĐL #00124 (Cục SHTT, 11/2022)...", không nói "theo các nguồn uy tín"
- [ ] **No sáo rỗng**: "ngon nhất Việt Nam", "được nhiều người yêu thích", "tinh hoa đất trời" → REMOVE
- [ ] **No AI tell-tale phrases**: "Trong thế giới hiện đại ngày nay...", "Như chúng ta đã biết..." → REWRITE
- [ ] **Tone miền Tây thân thiện**: "chúng tôi" / "quý khách", không "bạn" suồng sã
- [ ] **Unique angle** — bài không trùng nội dung với bài đã publish (grep heading/slug)
- [ ] **FAQ tái dùng PAA thực**, không tự chế câu hỏi fake
- [ ] **Author attribution**: Ban Biên Tập hoặc có review note từ HTX Giám đốc (cho bài P5)

---

## 3d. UX Writing Checklist (12 items) — MANDATORY gate

Áp dụng cho **mọi** bài sau khi chạy UX Writing Review prompt (Step 2b trong `daily-publishing-workflow.md`). Pass 100% trước khi flip `status='ready'`. Đảm bảo ngôn ngữ thân thiện, gần gũi người Việt — không văn phong AI khô khan.

- [ ] **Đại từ chuẩn** — dùng "mình/bạn" (informal). "Quý khách/chúng tôi" chỉ trong section formal (disclaimer, legal, citation CDĐL).
- [ ] **Câu ≤ 20 từ** phổ biến. Đoạn ≤ 4 câu. Spot-check 3 đoạn bất kỳ.
- [ ] **Zero sáo rỗng** — không còn "tuyệt vời", "số 1", "uy tín nhất", "đẳng cấp", "hàng đầu", "tinh hoa đất trời".
- [ ] **≥ 3 chi tiết cảm giác** toàn bài (vị / mùi / màu / texture — vd: "vàng cam ửng", "thơm phức", "ngọt lịm cổ", "cắn giòn").
- [ ] **1–2 từ địa phương Bến Tre** tự nhiên (vd: "vô bao", "trái", "ngọt lịm", "thơm phức", "vựa") — không lạm dụng, vẫn dễ hiểu với người Bắc/Trung.
- [ ] **CTA microcopy** hành động cụ thể + thân mật (vd: "Bấm gọi vựa nha", "Đặt sớm kẻo hết", "Ngó qua bảng giá nè") — không dùng "Liên hệ ngay" cứng nhắc.
- [ ] **≥ 1 empathy clause** đề cập pain point (lo ship hư, lo trái xanh chưa chín, lo giá đắt, lo bị lừa vựa dỏm).
- [ ] **Zero văn phong AI khô** — không còn "Trong thế giới hiện đại ngày nay", "Như chúng ta đã biết", "Không thể phủ nhận rằng", "Điều đáng nói là".
- [ ] **Đoạn mở kéo người đọc** bằng câu hỏi / tình huống / cảm giác — không phải statement khô kiểu "Xoài tứ quý là loại xoài...".
- [ ] **"ạ/nha/nhé" hợp ngữ cảnh** — dùng chỗ cần thân mật, không câu nào cũng có.
- [ ] **Số liệu giữ NGUYÊN** — giá, %, km, năm CDĐL không bị UX pass làm lệch.
- [ ] **Read-aloud test** — editor đọc to 2-3 đoạn, câu nào vấp / nghe "robot" → fix trước khi pass gate.

**Failing rule:** thiếu ≥ 2 items → return về Step 2b, chạy lại UX prompt với feedback. Không flip `status='ready'`.

---

## 3c. Image Royalty-free Check — 6 items

- [ ] Ảnh source = repo root (Xoai-2..Xoai-7.jpg, Loai 1/2.png, Banghieu.png, etc.) HOẶC Unsplash/Pexels/Pixabay/CC license
- [ ] Không hotlink, không scrape từ site khác
- [ ] Attribution footer/caption nếu source yêu cầu
- [ ] Alt text chứa primary keyword + mô tả thực
- [ ] Filename kebab-case descriptive
- [ ] Compressed < 200KB, max 1200px width, OG 1200×630

---

## 4. Editorial Rules — 8 items

- [ ] **Ngôn ngữ thân thiện**, xưng "chúng tôi" — "quý khách", tránh "bạn" quá suồng sã
- [ ] **Số liệu cụ thể**, tránh "nhiều", "rất", "đa số" — thay bằng con số
- [ ] **Không fluff**, không mở bài dài dòng kiểu "Xoài là loại trái cây được nhiều người yêu thích..."
- [ ] **Paragraph ≤ 4 dòng** trên mobile (dễ đọc)
- [ ] **Bold từ khóa** quan trọng 2-3 lần/bài (không spam)
- [ ] **Tên riêng tiếng Việt**: HTX Thạnh Phong, CDĐL #00124, xã Thạnh Phong — viết đúng chính tả, thống nhất
- [ ] **Technical terms giữ English**: SEO, AEO, schema, HowTo, CDĐL (viết hoa)
- [ ] **Không lặp nội dung** với `/xoai-tu-quy`, `/nguon-goc`, `/kien-thuc` đã có — bổ sung góc mới, không copy-paste

---

## 5. Schema JSON-LD Bắt Buộc

Mỗi bài ít nhất có:
```
@context: "https://schema.org"
@type: "Article" (hoặc NewsArticle / HowTo / Recipe tuỳ bài)
headline, description, image, datePublished, dateModified
author: { Person + Organization }
publisher: Organization (Trái Cây Bến Tre)
mainEntityOfPage, inLanguage: "vi-VN"
```

Cộng thêm theo loại bài:
- **Informational** → + `DefinedTerm` (nếu định nghĩa) + `FAQPage`
- **HowTo** → `HowTo` với steps
- **Comparison** → `Article` + `FAQPage` + custom ComparisonTable (itemList)
- **Transactional/Product** → `Product` + `Offer` + `PriceSpecification (validFrom/Through)`
- **GEO** → `Service` với `areaServed`, `provider` = LocalBusiness
- **Market report** → `NewsArticle` + `Table`
- **Brand story** → `Article` + `Organization` + `Person`

**Validate trước publish:** Google Rich Results Test + Schema.org validator.

---

## 6. Pre-publish Gate (phải pass 100%)

- [ ] 15/15 SEO items
- [ ] GEO items áp dụng theo loại bài
- [ ] 12/12 AEO items
- [ ] 10/10 AI-Generated Content Guard items (section 3b)
- [ ] **12/12 UX Writing Checklist items (section 3d) — MANDATORY**
- [ ] 8/8 editorial items
- [ ] Schema JSON-LD validate pass
- [ ] Internal links hoạt động (không 404)
- [ ] Ảnh có alt + compress (< 200KB)
- [ ] Mobile preview ok
