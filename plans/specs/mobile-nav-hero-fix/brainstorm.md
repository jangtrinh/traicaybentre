# Brainstorm — Mobile Nav + Hero Image Fix

**Date:** 2026-04-09
**Domain:** Complex (user override — fixes nhỏ nhưng cần quyết định UX rõ ràng)

---

## Press Release (Amazon-style)

**FOR IMMEDIATE RELEASE**

> Website Trái Cây Bến Tre ra mắt trải nghiệm mobile hoàn chỉnh — menu điều hướng hoạt động và ảnh xoài rực rỡ hiển thị trên mọi thiết bị.
>
> Trước đây, người dùng truy cập bằng điện thoại (chiếm ~70% traffic e-commerce VN) không thể mở menu để đi tới các trang Kiến thức, Tin tức, Giá hôm nay — nút hamburger chỉ là hình trang trí. Đồng thời, carousel ảnh xoài ở hero section bị ẩn hoàn toàn dưới màn hình 1024px, khiến trang chủ trên mobile trở thành một khối text khô khan, mất đi "hook" hình ảnh quan trọng nhất.
>
> Bản cập nhật khắc phục cả hai vấn đề: hamburger menu mở được overlay điều hướng mượt mà, hero section hiển thị ảnh xoài tươi ngon ngay cả trên màn hình nhỏ nhất. Kết quả: bounce rate mobile giảm, thời gian on-page tăng, và khách hàng tiềm năng có đầy đủ bối cảnh trực quan trước khi quyết định liên hệ đặt hàng.

---

## Vấn đề (Problem Statement)

### Bug #1 — Top nav mobile chết
- **Nơi:** `src/components/header.tsx:77-83`
- **Triệu chứng:** Hamburger button render nhưng bấm không có phản ứng.
- **Root cause:** Button không có `onClick`, không có state cho menu, không có overlay/drawer JSX.
- **Tác động:** Người dùng mobile không thể truy cập Xoài Tứ Quý / Giá / Nguồn gốc / Kiến thức / Tin tức / Liên hệ từ bất cứ trang nào → chỉ có thể cuộn trang chủ, hoàn toàn mất khả năng điều hướng.

### Bug #2 — Hero mất ảnh mobile
- **Nơi:** `src/components/hero-section.tsx:91`
- **Triệu chứng:** Dưới breakpoint `lg` (1024px), phần phải của hero (carousel ảnh xoài) biến mất hoàn toàn.
- **Root cause:** `<FadeIn className="hidden justify-center lg:flex">` — `hidden` + `lg:flex` nghĩa là chỉ desktop mới hiện.
- **Tác động:** Mobile user chỉ thấy tiêu đề "Ngọt Đậm / Vị Mặn Nhẹ / Cuối Lưỡi" + đoạn text → thiếu signal "sản phẩm thật, vườn thật", conversion drop.

---

## Giải pháp đề xuất — Trade-off

### Mobile Menu Pattern

| Pattern | Ưu | Nhược | Phù hợp? |
|---|---|---|---|
| **Fullscreen overlay** | Tác động mạnh, nav lớn dễ bấm, match ngôn ngữ thương hiệu "bold display text" | Che toàn màn hình | **CHỌN** — nhất quán với hero display text |
| Slide-out drawer (left/right) | Quen thuộc, vẫn thấy 1 phần trang | Đòi hỏi animation lib hoặc CSS transform phức tạp hơn | Bỏ |
| Dropdown dưới header | Đơn giản nhất | Nhìn yếu, không xứng với visual identity mạnh | Bỏ |

**Quyết định:** Fullscreen overlay với background `bg-brand` (match hero), typography lớn in hoa uppercase (match nav desktop), có close button rõ ràng. Body scroll lock khi mở.

### Hero Mobile Image Layout

| Option | Mô tả | Trade-off |
|---|---|---|
| **A. Stack vertical — text trên, ảnh dưới** | Giữ grid 2 cột ở lg+, stack ở <lg | Đơn giản, giữ carousel logic. Scroll dài hơn | **CHỌN** |
| B. Ảnh làm background của hero | Ảnh full-bleed, text overlay trên ảnh | Đẹp nhưng cần xử lý contrast, carousel bg phức tạp | Bỏ — conflict với nền `bg-brand` và display text |
| C. Ảnh nhỏ inline giữa 2 đoạn text | Gọn gàng | Mất impact của ảnh lớn | Bỏ |

**Quyết định:** Option A — stack. Ở mobile: tiêu đề trước (hook), ảnh sau (proof), rồi text mô tả. Aspect ratio ảnh giảm từ `4/5` xuống `4/3` hoặc `1/1` để không chiếm quá nhiều chiều dọc.

### Appetite (Shape Up)
- **2 giờ max** cho cả 2 bugs. Đây là fixes thuộc loại "must ship" — không phải feature mới.

---

## MoSCoW

### Must
- Hamburger button mở được menu overlay trên mobile
- Menu có đủ 6 link hiện tại (Xoài Tứ Quý, Giá, Nguồn gốc, Kiến thức, Tin tức, Liên hệ)
- Tap link → chuyển trang → menu tự đóng
- Tap ra ngoài hoặc close button → menu đóng
- Hero carousel hiển thị trên mobile (<1024px)
- Body scroll bị lock khi menu open

### Should
- ESC key đóng menu (a11y)
- Focus trap trong menu khi open (a11y)
- `aria-expanded`, `aria-controls` trên hamburger
- Animation fade/slide mượt khi open/close

### Could
- Swipe-to-close gesture
- Logo + phone number trong overlay (secondary CTA)
- Icon bên cạnh mỗi link

### Won't (lần này)
- Mega-menu với thumbnails
- Search bar trong menu
- Dark mode toggle
- Language switcher

---

## Rủi ro

| Risk | Mitigation |
|---|---|
| Scroll lock break trên iOS Safari | Dùng `overflow: hidden` trên `<html>` + `<body>`, test thật |
| Focus trap conflict với Next.js Link | Dùng `<a>` thường (hiện đang dùng) + manual focus management |
| Ảnh lazy load priority sai khi stack | Ảnh đầu tiên vẫn dùng `priority`, các ảnh khác lazy như cũ |
| Layout shift khi ảnh load trên mobile | Fix aspect-ratio container → reserve space |

---

## Unresolved Questions

1. Có cần gọi phone number làm CTA chính trong mobile menu không? (Hiện nav chỉ có link "Liên hệ")
2. Mobile hero có cần giữ scroll hint "cuộn xuống khám phá ngay" hay bỏ để tiết kiệm chiều dọc?
3. Tablet (md: 768-1024px) nên theo layout mobile (stack) hay desktop (2 cột)? Đề xuất: stack cho đến `lg`, giống hiện tại.
