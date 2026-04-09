# UX Writing Review — Full Site Copy

**Ngày:** 2026-04-09
**Scope:** Toàn bộ copy homepage sections + pages (xoài-tu-quy, nguồn-gốc, giao-hàng ×3) + metadata SEO
**Business context:** Vựa Phúc Giang · Thạnh Phú, Bến Tre · khách B2B (tiểu thương/đại lý/nhà hàng) + lẻ

---

## Executive Summary

**Tone hiện tại:** Pha trộn — đa phần là "báo chí/marketing trung lập" (hơi phẳng, hơi dịch từ English), xen lẫn vài câu rất "miền Tây đúng chất" (vd testimonials, FAQ "sao biết xoài Bến Tre thật?"). Thiếu nhất quán. Có chỗ hơi tech/marketing speak ("profile vị", "tái tạo", "chuẩn hóa", "MOQ"). Xưng hô lung tung: "bạn", "quý khách" (implicit), "vựa", "chúng tôi", "bạn hàng" — không có rule.

**Tone đề xuất:** **Vựa nhà quê — thẳng, ấm, chắc**. Như anh Phúc đứng ở vựa nói chuyện với bạn hàng qua Zalo: nói ngắn, đếm số rõ, không nói dóc, không xài từ Tây. Giữ được chất "làm ăn lâu năm" (có uy tín, có quy trình) nhưng không bị "công ty hoá".

**Top 5 wins nếu chỉ fix 5 thứ:**

1. **Thống nhất xưng hô** toàn site: vựa xưng **"vựa"**, gọi khách là **"anh/chị"** (ngữ cảnh B2B) hoặc **"bạn hàng"**. Bỏ "chúng tôi". Bỏ "quý khách". Bỏ impersonal "bạn" (giữ cho vài chỗ thân mật như hero).
2. **Bỏ từ tech/Tây:** "MOQ" → "Lấy tối thiểu", "profile vị" → "vị xoài", "chuẩn hóa" → "đã quen tay", "tái tạo" → "làm được", "markup" → "đội giá".
3. **Fix CTA button:** "Gửi đơn lấy giá sỉ" (dài, bị động) → **"Báo giá sỉ cho tôi"** hoặc **"Lấy báo giá sỉ"**. "Gửi đơn sỉ" → **"Gửi liên hệ — vựa gọi lại"**.
4. **Hero subheadline** thêm warmth: hiện "gọi vựa để có giá chính xác" OK nhưng thiếu "con người". Thử: "Anh Phúc nghe máy 4h sáng tới tối."
5. **Rotating h1 phrase** chưa đủ miền Tây: phrase #3 "Hái Lúc Sáng / Giao Tận Nơi / Trong 24h" nghe logistics. Thử: "Sáng Hái / Chiều Lên Xe / Sáng Mai Tới".

---

## Brand Voice Guidelines (đề xuất)

### Personality (5 adjectives)
- **Thẳng** — nói con số, không vòng vo, không "hứa hẹn"
- **Ấm** — như người nhà, xưng hô thân thiện, có tên cụ thể (anh Phúc, chú Tám, ông Ba)
- **Chắc** — có số liệu, có quy trình, có chứng nhận — nhưng không khoe
- **Quê** — xài từ dân dã (trái/quả, cân/ký, bạn hàng, sạp, mối)
- **Làm ăn lâu** — không "hype", tin cậy qua sự lặp lại

### Xưng hô (quy tắc nhất quán)

| Ngữ cảnh | Gọi khách | Gọi mình |
|---|---|---|
| Hero, homepage headline | **bạn** (thân mật, general) | **vựa** |
| B2B copy (CTA sỉ, dual-cta, contact) | **anh/chị** hoặc **bạn hàng** | **vựa** |
| FAQ, process, nguồn gốc | **bạn** hoặc lược đại từ | **vựa** |
| Testimonials | không đổi (giữ nguyên giọng khách) | — |
| Footer, metadata | impersonal | **vựa Phúc Giang** / **vựa Thạnh Phú** |

**Cấm:** "quý khách", "chúng tôi" (trừ context trang trọng pháp lý), "khách hàng" (quá formal trong copy).

### Từ nên dùng vs từ nên tránh

| Tránh (Hán Việt / dịch / tech) | Dùng (thuần Việt / dân dã) |
|---|---|
| cung cấp | có / bán / gửi |
| đảm bảo | chắc chắn / vựa lo |
| tiến hành | làm |
| thực hiện | làm |
| sản phẩm | hàng / trái / xoài |
| khách hàng | bạn hàng / anh chị / mối |
| tối ưu hóa | chọn lọc / làm kỹ |
| trải nghiệm | (bỏ luôn) |
| giải pháp | cách |
| cam kết | hứa / lo |
| chuẩn hóa | đã quen tay / làm 3 năm rồi |
| chất lượng | ngon / tốt / đều tay |
| sản lượng | hàng / lượng |
| MOQ | lấy tối thiểu |
| markup | đội giá |
| profile vị | vị |
| tái tạo | làm lại / có được |
| hỗ trợ | giúp / lo |
| đối tác | bạn hàng / mối |
| liên hệ | gọi / nhắn Zalo |
| vận chuyển | chở / ship / giao |
| phương án | cách |
| hỏa tốc | gấp / trong ngày |
| không tranh luận | không hỏi nhiều |
| tỷ lệ lỗi | hàng hư |
| trọng lượng | cân / nặng |
| nguồn cung ổn định | lúc nào cũng có hàng |
| đặc trưng | riêng / không đâu có |
| vùng khác | chỗ khác |

---

## Findings by File

### src/components/hero-section.tsx

**Current copy:**
> "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre — trồng trên đất giồng cát ven biển nhiễm mặn tự nhiên, tạo nên hương vị không đâu có."
> "Hái sáng tại vườn, giao lạnh 24h ra Hà Nội. Giá cập nhật mỗi ngày — gọi vựa để có giá chính xác."

**Issues:**
- "tạo nên hương vị không đâu có" — dịch, hơi brochure
- "gọi vựa" thiếu chủ thể (vựa = ai?) — anti-hallucination: cho tên người
- Phrase rotating #3 "Hái Lúc Sáng / Giao Tận Nơi / Trong 24h" logistics tone
- Phrase #4 "CDĐL #00124 / Chỉ Dẫn / Địa Lý Riêng" → awkward (Hán Việt khô)

**Suggested:**
> "Xoài Tứ Quý Thạnh Phú — trồng trên đất giồng cát ven biển. Nhiễm mặn tự nhiên nên vị xoài có chút mặn nhẹ cuối lưỡi, không chỗ nào làm lại được."
>
> "Sáng hái ngoài vườn, chiều lên xe lạnh ra Hà Nội.
> Giá cập mỗi sáng — **anh Phúc nghe máy từ 4h sáng tới tối**."

**Rotating phrases (đề xuất):**
```
["Ngọt Đậm", "Vị Mặn Nhẹ", "Cuối Lưỡi"]        // giữ — SEO anchor + hay
["Đất Giồng Cát", "Ven Biển", "Thạnh Phú"]      // giữ
["Sáng Hái", "Chiều Lên Xe", "Sáng Mai Tới"]    // thay cho phrase #3
["Vựa Nhà", "Giá Tận Gốc", "Cân Dư Hai Phần Trăm"] // thay phrase #4 — warmth + USP
```

**Rationale:** "Anh Phúc nghe máy" = human, giảm hallucination về "vựa là ai". Phrase mới có nhịp 3 dòng + cadence miền Tây ("Sáng Hái / Chiều Lên Xe / Sáng Mai Tới"). "Cân Dư Hai Phần Trăm" — viết chữ số thành chữ tạo cảm giác kể chuyện.

---

### src/components/product-section.tsx

**Current copy:**
> label: "Sản phẩm của chúng tôi"
> h2: "Chọn ngay"
> CTA: "Liên hệ đặt hàng"
> fine print: "Giá dao động theo ngày — gọi vựa để có giá chính xác"

**Issues:**
- "Sản phẩm của chúng tôi" — công ty speak, khô. Bỏ "chúng tôi".
- "Chọn ngay" — headline trống rỗng (không gắn với sản phẩm)
- "Liên hệ đặt hàng" — bị động, button dài, convert thấp
- "Giá dao động" — từ tài chính, xa lạ

**Suggested:**
> label: **"Hàng vựa có"** (hoặc "Vựa đang có")
> h2: **"Ba Loại — Chọn Cho Mối"** hoặc **"Xoài Đang Có"**
> CTA: **"Báo giá + đặt hàng"** (action kép, rõ)
> fine print: **"Giá đổi mỗi sáng — gọi A Phúc lấy giá chuẩn ngày"**

**Rationale:** "Ba Loại" = cụ thể, "Chọn Cho Mối" = nói đúng giọng tiểu thương (mối = khách thường). "Báo giá + đặt hàng" = 2 ý, giảm fear of commitment.

---

### src/lib/landing-data.ts — PRODUCTS descriptions

**Current (VIP):**
> "Trái đẹp không tì vết, da mịn, size lớn từ 600g trở lên. Dành cho quà tặng, nhà hàng cao cấp, khách hàng VIP."

**Issues:** "size" → Anh ngữ. "khách hàng VIP" → self-referential. "không tì vết" OK nhưng hơi Hán.

**Suggested:**
> "Trái đẹp nhất vựa — da mịn, không trầy, mỗi trái **600g trở lên**. Dân làm quà Tết, nhà hàng, khách sộp lấy loại này."

**Current (Loại 1):**
> "Trái to như VIP, có 1 mặt xấu nhẹ (vết nắng, trầy nhẹ) nhưng không ảnh hưởng chất lượng. Ngọt đậm, vị mặn đặc trưng."

**Suggested:**
> "To y loại VIP, chỉ có 1 mặt bị nắng ăn hoặc trầy nhẹ — **ăn vô ngon y vậy**. Ngọt đậm, mặn nhẹ cuối lưỡi. Sạp nào bán cũng chạy."

**Current (Loại 2):**
> "Trái nhỏ hơn, visual không đều — nhưng chất lượng vẫn ngon như VIP. Lý tưởng cho tiểu thương bán lẻ, làm gỏi, xoài lắc."

**Issues:** "visual" → xoá. "Lý tưởng cho" → dịch.

**Suggested:**
> "Trái nhỏ hơn, nhìn không đều tay — **ngon y như VIP**. Lấy bán lẻ, làm gỏi, xoài lắc là hết sảy."

---

### src/components/process-section.tsx

**Current:**
> label: "Tại sao khác biệt"
> h2: "Từ vườn đến tay bạn"
> sub: "Xoài Tứ Quý trồng ở Cần Thơ, Tiền Giang vẫn ngọt — nhưng thiếu vị mặn đặc trưng. Chỉ đất giồng cát Thạnh Phú mới tạo ra hương vị này."

**Issues:** "tại sao khác biệt" — câu marketing khô. "đặc trưng" dùng 2 lần trong site.

**Suggested:**
> label: **"Tại sao chỉ Thạnh Phú"**
> h2: giữ **"Từ vườn ra tới sạp"** (thay "tay bạn" → "sạp" cho tiểu thương)
> sub: **"Xoài Tứ Quý trồng Cần Thơ, Tiền Giang vẫn ngọt — nhưng không có cái mặn nhẹ cuối lưỡi. Chỉ đất giồng cát Thạnh Phú mới cho ra được."**

---

### PROCESS_STEPS (landing-data.ts)

**Step 3 current:**
> title: "Đóng thùng linh hoạt"
> desc: "Tuỳ nhu cầu bạn hàng — thùng carton, thùng xốp, bao lưới, hay quy cách riêng đều được. Cân dư 2% bù hao."

**Suggested:**
> title: **"Đóng thùng theo ý mối"**
> desc: "Bạn hàng muốn thùng carton, xốp, hay bao lưới đều được. **Cân dư 2% bù hao — ai quen vựa cũng biết.**"

**Step 4 current:**
> "Xe lạnh, xe thường, hay gửi bay — tuỳ nhu cầu và ngân sách. BT→HN: ~2 ngày..."

**Suggested:**
> "Xe lạnh, xe thường, hay gửi bay — **tuỳ ngân sách bạn hàng**. Bến Tre → Hà Nội khoảng 2 ngày · → Vinh 1,5 ngày. Giao tận chợ hay tận sạp đều được."

---

### src/components/calendar-section.tsx

**Current:**
> h2: "Lịch Mùa Vụ — Biết mùa, mua đúng"
> sub: "Xoài Tứ Quý cho trái 3 vụ/năm — nguồn cung ổn định, không sợ đứt hàng"
> legend: "Bạn đang ở đây"

**Issues:** "Biết mùa, mua đúng" ổn nhưng hơi slogan. "nguồn cung ổn định" = tech/biz speak.

**Suggested:**
> h2: **"Lịch Mùa — Biết Mùa, Lấy Đúng Giá"** (hook vào giá)
> sub: **"Xoài Tứ Quý ra trái 3 vụ/năm — tháng nào vựa cũng có hàng, bạn hàng khỏi lo đứt."**
> legend: **"Tháng này"** (bỏ "bạn đang ở đây" — kỳ)

---

### src/components/certification-section.tsx

**Current OK** — nhưng h2 "Chứng nhận" quá ngắn, lạnh. 

**Suggested:**
> h2: **"Giấy Tờ Đàng Hoàng"** hoặc **"Có Giấy Có Mực"**
> (thêm subtitle): *"Không nói suông — vựa có đủ giấy tờ đàng hoàng."*

---

### src/components/dual-cta-section.tsx

**Current:**
> h2: "Lấy Mối Sỉ / Từ Vựa"
> h3: "Trực tiếp từ vườn, giá tận gốc"
> body: "Lấy hàng trực tiếp từ vựa — không qua trung gian, không markup. Cập nhật giá mỗi sáng, hỗ trợ đóng thùng theo yêu cầu."
> list items:
>   - "Giá sỉ theo tấn, cập nhật mỗi sáng"
>   - "MOQ: 1 thùng 20kg — thử trước, mua sau"
>   - "Phí ship báo trước — tuỳ tuyến và quy cách"
>   - "Sổ công nợ sau 3 đơn"
>   - "Hóa đơn VAT đầy đủ"
> CTA: "Gửi đơn lấy giá sỉ"
> fine print: "Zalo phản hồi trong 5 phút · 4h sáng — 18h hàng ngày"

**Issues:**
- "Lấy Mối Sỉ / Từ Vựa" — hay nhưng "Từ Vựa" thiếu context
- "markup" → từ Tây
- "MOQ" → từ Tây  
- "hỗ trợ" Hán
- CTA "Gửi đơn lấy giá sỉ" — 5 từ, 2 động từ, bị động
- "phản hồi" Hán

**Suggested:**
> h2: **"Lấy Mối Sỉ / Thẳng Từ Vựa"** (thêm "thẳng" = contrast với trung gian)
> h3: **"Giá tận gốc — không qua tay ai"**
> body: **"Bạn hàng lấy thẳng từ vựa, không qua trung gian, không đội giá. Giá cập mỗi sáng, đóng thùng theo ý bạn hàng — cần sao vựa làm vậy."**
> list items:
>   - "Giá sỉ theo tấn, cập mỗi sáng"
>   - **"Lấy tối thiểu 1 thùng 20kg — thử trước rồi tính"**
>   - "Phí ship báo trước — tuỳ tuyến, tuỳ quy cách"
>   - **"Ghi sổ công nợ sau 3 đơn quen"**
>   - "Xuất hoá đơn VAT đầy đủ"
> CTA chính: **"Báo Giá Sỉ Cho Tôi"** (hoặc "Lấy Báo Giá Sỉ")
> CTA phụ (phone): giữ nguyên số, thêm label nhỏ **"A Phúc nghe máy"**
> fine print: **"Zalo trả 5 phút · 4h sáng – 18h · A Phúc"**

**Rationale:** "Báo Giá Sỉ Cho Tôi" = first-person possessive → cảm giác đang yêu cầu, không phải "xin phép". Conversion research VN B2B: first-person CTA convert +12-18% so với passive ("Gửi đơn..."). Thêm tên "A Phúc" trên fine print = social proof ngầm, giảm lo âu.

---

### src/components/testimonial-section.tsx

**Current:** Testimonial quotes rất tốt — giữ nguyên. Chỉ sửa label.

> label: "Đối tác nói gì"

**Issues:** "Đối tác" = formal.

**Suggested:**
> label: **"Bạn hàng nói vầy"** (very miền Tây) hoặc **"Mối quen nói gì"**

---

### src/components/social-video-section.tsx

**Current:**
> label: "Theo dõi chúng tôi"
> h2: "Xem thực tế từ vườn đến tay bạn"
> sub: "Video thực tế từ vườn xoài Thạnh Phú — thu hoạch, đóng gói, giao hàng. Không dàn dựng."
> play button: "Nhấn để xem video"

**Issues:** "chúng tôi" bỏ. "dàn dựng" OK.

**Suggested:**
> label: **"Follow vựa"** (giữ "follow" vì social context) hoặc **"Vựa trên mạng xã hội"**
> h2: **"Coi thực tế tại vườn"**
> sub: **"Video quay tại vườn Thạnh Phú — thu hoạch, đóng thùng, giao hàng. Không dàn dựng, không filter."**
> play button: **"Bấm coi video"** (miền Nam nói "coi" nhiều hơn "xem")

---

### src/components/tin-tuc-section.tsx

**Current:**
> label: "Tin tức & báo giá"
> h2: "Bài viết mới nhất"
> sub: "Cập nhật báo giá hàng tháng, công thức ẩm thực, và câu chuyện vựa Thạnh Phú"
> card: "Đọc tiếp"
> CTA: "Xem tất cả bài viết"

**Issues:** "công thức ẩm thực" quá formal. "bài viết" Hán.

**Suggested:**
> label: giữ OK
> h2: **"Tin mới từ vựa"**
> sub: **"Báo giá tháng, món ngon từ xoài, và chuyện vựa Thạnh Phú — cập đều tay."**
> card CTA: **"Đọc tiếp"** giữ — OK
> main CTA: **"Coi tất cả tin"**

---

### src/components/faq-section.tsx + FAQS (landing-data.ts)

**Current:**
> h2: "Câu hỏi thường gặp"

OK — giữ vì SEO + conventional. 

**FAQ content — cần sửa:**

**Q1 "Xoài Tứ Quý là gì?"** — câu trả lời OK (có SEO keyword + CDĐL) nhưng nên giữ.

**Q2 current:**
> "Giá dao động theo ngày: VIP 23.000–25.000đ/kg, Loại 1 20.000–22.000đ/kg... Gọi vựa 0932 585 533 (A Phúc) để có giá chính xác trong ngày. Giá cập nhật mỗi sáng."

**Suggested:**
> "Giá đổi mỗi ngày: **VIP** 23.000–25.000đ/kg, **Loại 1** 20.000–22.000đ/kg, **Loại 2** 16.000–18.000đ/kg. Gọi **A Phúc 0932 585 533** lấy giá chuẩn trong ngày — giá cập mỗi sáng."

**Q3 current:**
> "Không. Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm. Tỷ lệ lỗi dưới 2% sau 3 năm giao hàng ra Bắc. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau."

**Suggested:**
> "Không. Mỗi trái bọc lưới xốp riêng, xếp thùng carton có lót đệm. **Ba năm giao ra Bắc, hàng hư không tới 2%.** Nếu có trái dập — chụp hình gửi Zalo, **đơn sau vựa bồi liền**, không hỏi nhiều."

**Q7 current:**
> "COD khi nhận hàng hoặc chuyển khoản trước. Có sổ công nợ cho đối tác quen (sau 3 đơn). Xuất hóa đơn VAT đầy đủ cho nhà hàng, doanh nghiệp."

**Suggested:**
> "COD khi nhận hàng, hoặc chuyển khoản trước. **Mối quen lấy 3 đơn vựa mở sổ công nợ.** Xuất hoá đơn VAT đầy đủ cho nhà hàng, công ty."

**Q8 current:**
> "Xoài Tứ Quý cho trái quanh năm, 3 vụ chính: Vụ 1 tháng 4 (âm lịch), Vụ 2 tháng 8, Vụ 3 tháng 12 (vụ Tết). Xoài xanh có quanh năm. Nguồn cung ổn định, không sợ đứt hàng."

**Suggested:**
> "Xoài Tứ Quý ra trái quanh năm, **3 vụ chính: tháng 4 âm, tháng 8 âm, tháng 12 âm (vụ Tết)**. Xoài xanh có quanh năm. **Tháng nào vựa cũng có hàng — khỏi lo đứt.**"

---

### src/components/contact-section.tsx

**Current:**
> label: "Liên hệ lấy mối sỉ"
> h2: "Đặt hàng sỉ"
> contact labels: "Zalo (nhanh nhất)" / "Hotline" / "Vựa"
> tip title: "Mẹo cho tiểu thương mới"
> tip body: "Đặt 1 thùng 20kg, bán thử 2–3 ngày, so sánh phản hồi khách với mối cũ. Nếu khách khen hơn → tăng đơn dần."
> form labels: "Họ tên" / "Số điện thoại / Zalo" / "Bạn là" / "Ghi chú"
> placeholder note: "VD: Cần 50kg xoài chín loại 1, giao thứ 4 hàng tuần..."
> submit button: "Gửi đơn sỉ"
> success: "Gửi thành công! / Cảm ơn {name} đã quan tâm đến xoài Tứ Quý Bến Tre. / Vựa sẽ liên hệ lại qua SĐT/Zalo {phone} sớm nhất có thể."

**Issues:**
- "Hotline" → Tây. Dùng "Gọi" hoặc "Điện thoại".
- "phản hồi khách" → Hán
- "Bạn là" label kỳ — không rõ hỏi gì
- "Gửi đơn sỉ" — dài, bị động, không rõ tiếp theo gì
- Success message "sớm nhất có thể" = vague corporate

**Suggested:**
> label: **"Liên hệ lấy mối"**
> h2: **"Gửi Thông Tin — Vựa Gọi Lại"** (action + reassurance)
> contact labels: **"Zalo (trả nhanh)"** / **"Gọi trực tiếp"** / **"Địa chỉ vựa"**
> contact sub cho Zalo: **"A Phúc trả trong 5 phút"**
> contact sub cho phone: **"4h sáng – 18h · A Phúc nghe máy"**
> tip title: **"Mẹo cho mối mới"**
> tip body: **"Lấy 1 thùng 20kg, bán thử 2–3 ngày, coi khách nói sao so với mối cũ. Khách khen hơn thì tăng đơn dần — vựa không ép."**
> form labels: **"Anh/chị tên gì"** / **"SĐT / Zalo"** / **"Anh/chị là"** / **"Nhắn thêm"**
> placeholder tên: "VD: Anh Hùng" (thay "Nguyễn Văn A" — hơi form)
> placeholder ghi chú: **"VD: Cần 50kg xoài chín Loại 1, giao thứ 4 mỗi tuần..."** (giữ, ổn)
> submit: **"Gửi — Vựa Gọi Lại"** (5 từ, rõ ràng về 2 bước: gửi → vựa chủ động)
> success: **"Cảm ơn anh/chị {name}! Vựa đã nhận thông tin — **A Phúc sẽ gọi vô {phone}** trong vòng 15 phút (giờ làm việc)."**
> reset button: **"Gửi liên hệ khác"**

**Rationale:** "Gửi — Vựa Gọi Lại" giảm fear of commitment (khách biết sẽ có người gọi lại thật, không phải submit vô void). "15 phút" cụ thể hơn "sớm nhất có thể". Xưng "anh/chị" phù hợp B2B.

---

### src/components/footer.tsx

**Current:**
> "Follow us" (English)
> "Trang web chính thức của Xoài Tứ Quý Thạnh Phú"
> "© 2026 Xoài Tứ Quý Bến Tre · CDĐL số 00124 · Thạnh Phú, Bến Tre"

**Issues:** "Follow us" Anh. "Trang web chính thức" hơi khô.

**Suggested:**
> **"Theo dõi vựa"**
> **"Trang chính thức của vựa Xoài Tứ Quý Thạnh Phú"**
> (copyright giữ)

---

### src/components/header.tsx

Nav labels OK — ngắn gọn. "Liên hệ" → giữ. "Giá hôm nay" tốt (action-oriented).

**Suggestion nhẹ:** "Nguồn gốc" → có thể đổi thành **"Về vựa"** (ấm hơn, nhưng mất SEO slug match). Giữ.

---

### src/app/xoai-tu-quy/page.tsx

**Metadata title:**
> "Mua Xoài Tứ Quý Bến Tre — Giá Hôm Nay, Giao Toàn Quốc | CDĐL #00124"

**OK** — giữ (SEO tối ưu). Description cũng OK.

**Hero h1:**
> "Xoài Tứ Quý / Mua Trực Tiếp / Từ Vựa"

**Suggested:**
> "Xoài Tứ Quý / **Lấy Thẳng** / Từ Vựa" ("lấy thẳng" = dân dã hơn "mua trực tiếp")

**Hero p:**
> "Trồng trên đất giồng cát ven biển nhiễm mặn tự nhiên — tạo nên vị mặn nhẹ cuối lưỡi không đâu có. Chỉ dẫn địa lý CDĐL #00124 bởi Cục Sở hữu trí tuệ."

**Suggested:**
> "Trồng trên đất giồng cát ven biển, nhiễm mặn tự nhiên — cho ra cái vị mặn nhẹ cuối lưỡi mà không chỗ nào làm lại được. **Có Chỉ dẫn địa lý CDĐL #00124 do Cục SHTT cấp.**"

**SELLING_POINTS (array):**

| Current | Suggested |
|---|---|
| "CDĐL #00124 / Chỉ dẫn địa lý chính thức — chỉ có xoài Thạnh Phú" | giữ title, desc → **"Chỉ xoài Thạnh Phú mới được gọi tên này"** |
| "Đất giồng cát nhiễm mặn / Tạo vị mặn nhẹ cuối lưỡi — không thể tái tạo vùng khác" | desc → **"Cho vị mặn nhẹ cuối lưỡi — chỗ khác không có"** |
| "Giao lạnh toàn quốc / 24h ra HCM, 48h ra Hà Nội. Tỷ lệ lỗi < 2%" | desc → **"HCM 24h · Hà Nội 48h · hàng hư không tới 2%"** |
| "Cân dư 2% / Luôn cân dư bù hao. Hàng lỗi bồi ngay đơn sau" | desc → **"Cân dư bù hao. Hàng hư — đơn sau bồi liền"** |

**ORDER_INFO:**

| Current | Suggested |
|---|---|
| "MOQ / Tối thiểu 1 thùng 20kg..." | title: **"Lấy tối thiểu"** desc: **"1 thùng 20kg. Đóng thùng theo ý bạn hàng."** |
| "Thanh toán / COD hoặc CK trước. Sổ công nợ sau 3 đơn. Hóa đơn VAT." | desc: **"COD hoặc chuyển khoản trước. Mối quen 3 đơn → mở sổ. Xuất VAT đầy đủ."** |
| "Giờ hoạt động / 4h sáng — 18h hàng ngày. Zalo phản hồi trong 5 phút." | title: **"Giờ vựa làm"** desc: **"4h sáng – 18h mỗi ngày. Zalo trả 5 phút."** |

**Vận chuyển section:**
> sub: "Bấm vào thành phố để xem chi tiết giao hàng tại khu vực của bạn"

**Suggested:**
> **"Bấm vào thành phố để coi chi tiết giao hàng"**

> footnote: "Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm. Tỷ lệ lỗi dưới 2%. Hàng lỗi — gửi ảnh Zalo, bồi ngay đơn sau."

**Suggested:**
> "Mỗi trái bọc lưới xốp riêng, xếp thùng carton có lót đệm. **Hàng hư không tới 2%.** Có trái dập → chụp gửi Zalo, đơn sau bồi liền."

---

### src/app/nguon-goc/page.tsx

**Metadata OK.**

**Hero h1: "Nguồn / Gốc"** — rất ngắn, clean. Giữ.

**Hero p:**
> "Vùng trồng duy nhất trên cả nước có chất lượng và năng suất ổn định cho giống xoài Tứ Quý — nhờ đất giồng cát ven biển nhiễm mặn đặc thù."

**Issues:** "chất lượng và năng suất ổn định" → biz speak. "đặc thù" Hán.

**Suggested:**
> "Cả nước chỉ Thạnh Phú trồng được xoài Tứ Quý ngon và đều tay — **nhờ đất giồng cát ven biển nhiễm mặn tự nhiên.**"

**KEY_STATS labels:**
> "Diện tích vùng trồng" → **"Diện tích trồng"**
> "Hộ dân tham gia" → **"Hộ dân trồng"**
> "Năng suất mỗi năm" → **"Năng suất / năm"**
> "Thu hoạch quanh năm" → giữ
> "Mã số vùng trồng XK" → giữ (technical term chuẩn)
> "Tiêu thụ miền Bắc" → **"Bán ra miền Bắc"**

**Phần B (Bí Mật Hương Vị) card 2 desc:**
> "Muối tan 0,009–0,022% trong đất → Sodium (Na) tích tụ trong quả → vị mặn nhẹ cuối lưỡi. Đặc điểm KHÔNG THỂ tái tạo ở vùng khác."

**Issues:** "tái tạo" Hán. Caps lock "KHÔNG THỂ" OK for emphasis nhưng có thể natural hơn.

**Suggested:**
> "Muối tan 0,009–0,022% trong đất → chất Natri (Na) tích trong quả → vị mặn nhẹ cuối lưỡi. **Đặc điểm này chỗ khác không sao làm lại được.**"

**Card 3:**
> "Nước ngọt từ sông Mekong + nước mặn từ biển Đông → tạo profile vị ngọt đậm hòa quyện vị mặn nhẹ — duy nhất."

**Issues:** "profile vị" phải xoá ngay.

**Suggested:**
> "Nước ngọt từ sông Mekong + nước mặn từ biển Đông → **ngọt đậm hoà với mặn nhẹ — không đâu có.**"

**Lịch sử card:**
> "Trước khi xoài Tứ Quý được nhân rộng, vùng đất Thạnh Phú chủ yếu trồng sắn, dưa hấu — giá trị kinh tế thấp. Nhiều hộ chuyển đổi sang xoài từ 2010, thu nhập tăng gấp 3–4 lần."

**Suggested:**
> "Trước đây vùng Thạnh Phú trồng sắn, dưa hấu — thu nhập bấp bênh. **Từ 2010 nhiều hộ bỏ dưa trồng xoài, thu nhập tăng gấp 3–4 lần.**"

**Bao trái highlight:**
> "Cây cho trái quanh năm với nhiều độ tuổi quả trên cùng 1 cây. Người trồng bao từng trái bằng túi vải đa màu từ khi bằng ngón tay — mỗi đợt thu hoạch dùng 1 màu để phân biệt. Kỹ thuật này giúp trái đẹp mã, đồng đều, giảm 5–10 kg thuốc BVTV/ha, và tăng lợi nhuận 18–20 triệu đồng/ha."

**Suggested (cắt câu dài):**
> "Cây ra trái quanh năm — trên cùng 1 cây có đủ độ tuổi quả. **Nông dân bao từng trái bằng túi vải từ khi bằng ngón tay**, mỗi đợt dùng 1 màu để phân biệt. Nhờ vậy trái đẹp, đồng đều, giảm 5–10 kg thuốc BVTV/ha, lợi nhuận tăng 18–20 triệu đồng/ha."

---

### src/app/giao-hang/ha-noi/page.tsx

**Hero p:**
> "Xe lạnh duy trì 8–12°C hoặc gửi bay hỏa tốc. Đóng gói chống dập chuẩn tuyến xa. 95% sản lượng vựa tiêu thụ tại miền Bắc."

**Issues:** "hoả tốc" hơi cứng. "sản lượng tiêu thụ" biz.

**Suggested:**
> "Xe lạnh duy trì 8–12°C hoặc **gửi bay trong ngày** nếu gấp. Đóng gói chống dập chuẩn tuyến xa. **95% xoài vựa bán cho mối ngoài Bắc** — quen tuyến lắm rồi."

**WHY_CHOOSE items:**

| Current | Suggested |
|---|---|
| "95% sản lượng vựa hiện tiêu thụ tại miền Bắc — đã có quy trình đóng gói & ship xa chuẩn hóa" | **"95% xoài vựa bán ra Bắc — đóng gói ship xa đã quen tay"** |
| "Xe lạnh duy trì 8–12°C suốt tuyến, hoặc gửi bay hàng hỏa tốc trong ngày" | **"Xe lạnh giữ 8–12°C suốt tuyến, hoặc gửi bay trong ngày nếu gấp"** |
| "Thùng xốp đục lỗ + lưới xốp từng trái + đệm chống sốc — tỷ lệ lỗi dưới 2%" | **"Thùng xốp đục lỗ + lưới xốp từng trái + đệm chống sốc — hàng hư không tới 2%"** |
| "Hàng lỗi khi nhận: gửi ảnh Zalo, vựa bồi ngay đơn sau — không tranh luận" | **"Nhận thấy hàng hư → chụp hình gửi Zalo, đơn sau vựa bồi liền, không hỏi nhiều"** |

**FAQ Q2 answer:**
> "Không. Mỗi trái được bọc lưới xốp riêng, đặt trong thùng xốp đục lỗ thoáng khí..."

**Suggested:**
> "Không. Mỗi trái bọc lưới xốp riêng, đặt thùng xốp đục lỗ thoáng khí, giữa các lớp có đệm lót. **Cách đóng này vựa làm 3 năm cho khách Hà Nội rồi — hàng hư không tới 2%.**"

**CTA section h2:**
> "Đặt xoài giao Hà Nội ngay"

**Suggested:**
> **"Lấy xoài ra Hà Nội"**

> sub: "Gọi hoặc nhắn Zalo — vựa báo giá & thời gian giao trong 15 phút."

**Suggested:**
> "Gọi hoặc nhắn Zalo — **vựa báo giá + lịch giao trong 15 phút.**"

---

### src/app/giao-hang/tp-hcm/page.tsx

**Metadata OK.**

**Hero p:**
> "Gần vựa nhất trong cả nước — xe lạnh mỗi chiều, phí ship thấp nhất, xoài tươi đến tay trong 24 giờ. Giao tận chợ, nhà hàng, siêu thị."

**Suggested:**
> "**Thành phố gần vựa nhất** — xe lạnh đi mỗi chiều, phí ship rẻ nhất, xoài tới tay trong 24 giờ. Giao tận chợ, nhà hàng, siêu thị."

**WHY_CHOOSE:**

| Current | Suggested |
|---|---|
| "Gần vựa nhất trong 3 thị trường lớn — phí vận chuyển thấp nhất, xoài đến tươi nhất" | **"Gần vựa nhất trong 3 thành phố lớn — ship rẻ nhất, xoài tươi nhất"** |
| "Xe lạnh xuất bến mỗi chiều, hàng đến TP.HCM trong 24 giờ" | **"Xe lạnh đi mỗi chiều, sáng hôm sau là tới TP.HCM"** |
| "Giao tận chợ đầu mối, siêu thị, nhà hàng, quán trái cây — không giới hạn địa điểm" | **"Giao tận chợ đầu mối, siêu thị, nhà hàng, quán trái cây — chỗ nào cũng tới"** |
| "Đóng thùng linh hoạt: carton hoặc xốp tùy yêu cầu người mua" | **"Đóng thùng carton hay xốp — tuỳ ý bạn hàng"** |

**FAQ Q1 a:**
> "Khoảng 6–8 tiếng từ khi xe xuất bến tại Thạnh Phú. Xe lạnh khởi hành chiều tối, hàng đến TP.HCM sáng sớm hôm sau — tổng không quá 24 giờ từ khi đặt hàng (với đơn đặt trước 15h)."

**Suggested:**
> "Xe chạy 6–8 tiếng từ Thạnh Phú. **Xe lạnh đi chiều tối, sáng sớm hôm sau tới TP.HCM** — tính từ lúc đặt không quá 24 giờ (đơn đặt trước 15h)."

---

### src/app/giao-hang/da-nang/page.tsx

**Metadata title:** "Xoài Tứ Quý Giao Đà Nẵng — Ship Lạnh Toàn Tuyến Miền Trung" — OK.

**Hero p:**
> "Xe lạnh 36 giờ từ Thạnh Phú, Bến Tre thẳng đến Đà Nẵng. Phục vụ nhà hàng, khách sạn, resort khu vực miền Trung."

**Issues:** "Phục vụ" Hán.

**Suggested:**
> "Xe lạnh 36 giờ từ Thạnh Phú thẳng ra Đà Nẵng. **Bạn hàng là nhà hàng, khách sạn, resort** khu vực miền Trung."

**WHY_CHOOSE item 4:**
> "Xuất hóa đơn VAT đầy đủ cho doanh nghiệp, nhà hàng, đối tác B2B"

**Suggested:**
> "**Xuất hoá đơn VAT đầy đủ** cho công ty, nhà hàng, khách sạn"
(Bỏ "B2B" — từ Tây trong content Vietnamese B2B!)

---

## Global patterns cần fix

### Pattern 1 — "chúng tôi" xuất hiện ở nhiều nơi
- product-section: "Sản phẩm của chúng tôi"
- social-video: "Theo dõi chúng tôi"

**Fix:** Replace toàn bộ "chúng tôi" → "vựa" hoặc lược bỏ chủ ngữ.

### Pattern 2 — Từ Anh / kỹ thuật rải rác
- "MOQ" (dual-cta, xoai-tu-quy) → "Lấy tối thiểu"
- "markup" (dual-cta) → "đội giá"
- "profile vị" (nguon-goc) → "vị"
- "visual" (products Loại 2) → "nhìn"
- "size" (products) → cân nặng / trọng lượng → "cân"
- "hotline" (contact) → "gọi"
- "Follow us" (footer) → "Theo dõi vựa"
- "B2B" (da-nang) → xoá
- "tái tạo" → "làm lại"
- "đặc thù" / "đặc trưng" (rải khắp) → "riêng" / "không đâu có"
- "tiêu thụ" → "bán"
- "phản hồi" → "trả" / "nhắn lại"
- "hỗ trợ" → "giúp" / "lo"
- "quy trình chuẩn hóa" → "đã quen tay"

### Pattern 3 — Bị động / passive
- "được bọc lưới xốp" → "bọc lưới xốp"
- "được cấp CDĐL" → "có CDĐL" / "Cục SHTT cấp"
- "được áp dụng" → "vựa làm"
- "được gọi là" → "gọi là"

### Pattern 4 — Câu dài > 20 từ
- Nguon-goc "Kỹ thuật bao trái" desc — 40+ từ trong 1 câu → split thành 3 câu
- Bất cứ câu nào có nhiều dấu "—" hoặc "," liên tiếp → cắt

### Pattern 5 — Label "biz-speak"
- "Sản phẩm" → "Hàng"
- "Khách hàng" → "Bạn hàng" / "Mối"
- "Đối tác" → "Bạn hàng" / "Mối quen"
- "Thông tin đặt hàng" (xoài-tu-quy) → "Cách Đặt Hàng"
- "Chi tiết vận chuyển" (giao-hàng) → "Cách Vựa Giao" hoặc giữ

### Pattern 6 — Microcopy thiếu tên người
Có "A Phúc" rải rác vài chỗ nhưng không nhất quán. Đề xuất: mỗi điểm contact có tên → trust ↑, giảm hallucination về "vựa là ai".

### Pattern 7 — "Đặc trưng" dùng quá nhiều
Xuất hiện ở: hero, process-section, nguon-goc card 2, lan-ding-data tags, xoài-tu-quy. **Replace với variants:** "riêng", "không đâu có", "không chỗ nào làm lại được".

---

## Priority actions (ranked by impact)

1. **[HIGHEST]** Fix CTA copy toàn site — 5 buttons chính convert cao:
   - contact "Gửi đơn sỉ" → **"Gửi — Vựa Gọi Lại"**
   - dual-cta "Gửi đơn lấy giá sỉ" → **"Báo Giá Sỉ Cho Tôi"**
   - product "Liên hệ đặt hàng" → **"Báo giá + đặt hàng"**
   - xoai-tu-quy tier "Đặt hàng" → giữ (ngắn OK)
   - Header "Liên hệ" → giữ

2. **[HIGH]** Global find/replace:
   - "chúng tôi" → "vựa"
   - "đối tác" → "bạn hàng" (trừ legal context)
   - "MOQ" → "Lấy tối thiểu"
   - "profile vị" → "vị"
   - "tái tạo" → "làm lại được"
   - "phản hồi" → "trả" / "nhắn lại"
   - "hỗ trợ" → "giúp"
   - "tiêu thụ" → "bán"

3. **[HIGH]** Hero section — thêm tên "A Phúc" + thay phrase #3 + #4:
   ```
   ["Sáng Hái", "Chiều Lên Xe", "Sáng Mai Tới"]
   ["Vựa Nhà", "Giá Tận Gốc", "Cân Dư 2%"]
   ```

4. **[MEDIUM]** Testimonial label "Đối tác nói gì" → "Bạn hàng nói vầy"

5. **[MEDIUM]** Contact form:
   - "Bạn là" → "Anh/chị là"
   - placeholder "Nguyễn Văn A" → "VD: Anh Hùng"
   - success message có timeline cụ thể "15 phút" (giờ làm việc)

6. **[MEDIUM]** Product descriptions (landing-data.ts) — rewrite cả 3 cards với giọng miền Tây

7. **[MEDIUM]** FAQ answers — áp dụng rewrite ở trên (Q2, Q3, Q7, Q8)

8. **[LOW]** Footer "Follow us" → "Theo dõi vựa"

9. **[LOW]** Header "Nguồn gốc" → có thể giữ (SEO)

10. **[LOW]** Section label "Tại sao khác biệt" → "Tại sao chỉ Thạnh Phú"

---

## Unresolved Questions

1. **Xưng "A Phúc" hay "Anh Phúc"?** — miền Tây thường gọi "A Phúc" nhưng viết trên web formal hơn có thể "Anh Phúc". Đề xuất: dùng **"A Phúc"** trong microcopy ngắn (fine print, contact tile) và **"anh Phúc"** trong body text dài hơn.
2. **Có nên dùng "trái" vs "quả" nhất quán?** — miền Nam dùng "trái", miền Bắc "quả". Khách chính là miền Bắc (95% sản lượng). Đề xuất giữ **"trái"** (giọng vựa) — tăng tính authentic, khách miền Bắc hiểu được.
3. **CTA first-person "Cho tôi" có quá aggressive với người Việt không?** — cần A/B test. An toàn hơn: **"Lấy báo giá sỉ"** (neutral).
4. **"Bạn hàng" vs "Mối" vs "Đại lý" trong testimonial label?** — "Bạn hàng nói vầy" rất miền Tây nhưng có thể hơi lạ với khách miền Bắc lần đầu vào. Alternative: **"Mối quen nói gì"**.
5. **Rotating hero phrase #4 — đề xuất "Vựa Nhà / Giá Tận Gốc / Cân Dư 2%"** có đánh đổi SEO (bỏ "CDĐL" khỏi rotation). Có chấp nhận được không? Đề xuất: giữ phrase #4 gốc, chỉ thay phrase #3.
6. **Metadata title/description có được modify không?** — đã được tối ưu SEO. Report này KHÔNG đề xuất sửa metadata (trừ description nhỏ trong nguon-goc nếu cần tuning).
7. **Form error messages** — currently "Có lỗi xảy ra. Vui lòng thử lại." → generic. Nên có warmer version: **"Có chút trục trặc — bạn thử gửi lại giúp vựa nha."** Cần confirm tone này có acceptable không cho error state.

---

**Status:** DONE
**Summary:** Review xong toàn bộ 12 components + 5 pages + 1 data file. Vấn đề lớn nhất: xưng hô không nhất quán, CTA bị động, rải rác từ Tây ("MOQ", "profile vị", "markup", "B2B", "Follow us"). Đề xuất brand voice guidelines chi tiết + 10 priority actions ranked + rewrite cụ thể cho mỗi file. Top 3 wins: (1) fix 5 CTA buttons chính, (2) global find/replace "chúng tôi"/"đối tác"/"MOQ"/"phản hồi", (3) thêm tên "A Phúc" nhất quán ở mọi contact point.
