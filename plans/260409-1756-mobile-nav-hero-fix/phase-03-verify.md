# Phase 03 — Verify

## Overview
- **Priority:** P0
- **Status:** pending
- Typecheck + lint + manual visual verification trên viewport mobile.

## Steps

1. **Typecheck:**
   ```bash
   npx tsc --noEmit
   ```
   Expected: 0 errors.

2. **Lint:**
   ```bash
   bun run lint
   ```
   Expected: 0 errors (warnings OK).

3. **Dev server:**
   ```bash
   bun dev
   ```

4. **Manual check — Chrome DevTools mobile emulation:**
   - Viewport: iPhone 13 (390×844)
   - [ ] Trang chủ load, hamburger visible góc phải header
   - [ ] Tap hamburger → overlay xuất hiện, body không cuộn được
   - [ ] 6 link visible, typography lớn
   - [ ] Tap "Kiến thức" → chuyển /kien-thuc, overlay đóng
   - [ ] Back to /, tap hamburger, tap close (X) → overlay đóng
   - [ ] Tap hamburger, nhấn ESC → overlay đóng
   - [ ] Scroll trang chủ → hero carousel hiển thị dưới text block
   - [ ] Carousel auto-rotate sau 4s
   - [ ] Tap dot indicator → nhảy ảnh

5. **Desktop regression check (1440px):**
   - [ ] Hero layout 2 cột như cũ
   - [ ] Desktop nav inline (không thấy hamburger)
   - [ ] Carousel vị trí phải

6. **Tablet check (768px):**
   - [ ] Hamburger vẫn hiển thị (lg breakpoint = 1024)
   - [ ] Menu overlay mở được
   - [ ] Hero stack dọc

## Todo
- [ ] tsc pass
- [ ] lint pass
- [ ] Manual mobile checklist complete
- [ ] Desktop regression OK
- [ ] Tablet regression OK

## Success Criteria
- Tất cả checklist pass
- Không regression desktop

## Unresolved Questions
Không có — fix scope rõ ràng, criteria đã xác định ở brainstorm.
