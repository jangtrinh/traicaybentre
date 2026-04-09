# Phase 02 — Hero Responsive Image

## Context Links
- Brainstorm: `plans/specs/mobile-nav-hero-fix/brainstorm.md`
- Use cases: `plans/specs/mobile-nav-hero-fix/usecases.md` (UC-02)
- Current code: `src/components/hero-section.tsx:91`

## Overview
- **Priority:** P0
- **Status:** pending
- Bỏ class `hidden lg:flex` khỏi carousel wrapper, điều chỉnh layout để mobile stack gọn gàng.

## Key Insights
- `HeroImageCarousel` component đã hoàn chỉnh — chỉ cần hiển thị nó trên mobile.
- Grid đã dùng `lg:grid-cols-2` → dưới lg sẽ tự stack 1 cột, không cần sửa grid.
- Vấn đề duy nhất: wrapper `<FadeIn>` có `hidden justify-center lg:flex` → xóa `hidden` và điều chỉnh.
- Aspect ratio `4/5` hơi cao cho mobile → giảm xuống `4/3` trên <md để bớt chiếm chiều dọc; giữ `4/5` từ md+.

## Requirements

### Functional
- Carousel hiển thị trên mọi viewport ≥ 320px
- Aspect ratio responsive: `4/3` < md, `4/5` ≥ md
- Thứ tự stack mobile: H1 → carousel → paragraph (ảnh ngay sau tiêu đề để hook attention)
- Desktop (lg+) giữ nguyên: text trái, ảnh phải

### Non-functional
- Priority load ảnh đầu không đổi
- Không layout shift (aspect-ratio container giữ chỗ)

## Architecture

Cấu trúc HTML hiện:
```
<section>
  <div grid lg:grid-cols-2>
    <div> h1, p1, p2 </div>                  ← text
    <FadeIn hidden lg:flex> <Carousel/> </FadeIn>  ← ảnh
  </div>
  <scroll hint/>
</section>
```

Vấn đề: dưới lg, `FadeIn` bị `hidden` nên ảnh biến mất.

**Giải pháp A (đơn giản nhất, KISS):** bỏ `hidden`, để wrapper luôn flex. Grid tự stack. Nhưng thứ tự sẽ là: text → ảnh (ảnh nằm dưới cùng sau cả 2 paragraph).

**Giải pháp B (tốt hơn cho UX mobile):** render carousel 2 lần? KHÔNG — DRY violation.

**Giải pháp C (CHỌN):** dùng CSS `order` để thay đổi thứ tự trên mobile:
- Text block: `order-1` (nhưng chỉ cần h1 hiện trước)
- Hoặc tách h1 ra khỏi text block → h1 → carousel → mô tả

**Quyết định cuối:** Giữ cấu trúc đơn giản — bỏ `hidden`. Trên mobile, thứ tự: text block (h1 + 2 paragraph) → carousel. Đây là stack tự nhiên, đọc hiểu tuần tự, không cần hack order. Đánh đổi nhỏ: ảnh không ngay sau h1, nhưng user cuộn 1 lần là thấy.

Nếu sau này muốn ảnh chèn giữa h1 và paragraph thì tách h1 riêng — phase sau.

## Related Code Files

**Modify:**
- `src/components/hero-section.tsx`

## Implementation Steps

1. Ở dòng 91, đổi:
   ```tsx
   <FadeIn delay={0.1} className="hidden justify-center lg:flex">
     <HeroImageCarousel />
   </FadeIn>
   ```
   thành:
   ```tsx
   <FadeIn delay={0.1} className="flex justify-center">
     <HeroImageCarousel />
   </FadeIn>
   ```

2. Trong `HeroImageCarousel` (dòng 28), đổi aspect ratio responsive:
   ```tsx
   <div className="relative aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-3xl shadow-2xl md:aspect-[4/5]">
   ```

3. **Kiểm tra padding hero section** (`pt-28 pb-24` ở dòng 63) — OK cho mobile, header fixed không đè.

4. **Run typecheck.**

## Todo

- [ ] Bỏ `hidden lg:flex` → `flex justify-center`
- [ ] Responsive aspect ratio `aspect-[4/3] md:aspect-[4/5]`
- [ ] Verify desktop layout không thay đổi (lg:grid-cols-2 vẫn work)
- [ ] `npx tsc --noEmit`

## Success Criteria
- Mobile 375px: carousel hiện dưới text block, ảnh không bị méo
- Tablet 768px: carousel hiện dưới text, aspect 4/5
- Desktop 1440px: layout 2 cột như cũ
- Auto-rotate + dot tap vẫn hoạt động trên tất cả viewport

## Risk
- Ảnh trên mobile có thể tải chậm nếu network yếu → đã có `priority={i === 0}` rồi, OK
- `max-w-[520px]` có thể quá rộng trên tablet → tự co theo `w-full` container, OK
