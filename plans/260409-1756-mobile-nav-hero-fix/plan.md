# Plan — Mobile Nav + Hero Image Fix

**Date:** 2026-04-09
**Domain:** Complex (per user request)
**Appetite:** ~2 hours
**Spec:** `plans/specs/mobile-nav-hero-fix/`

## Goal

Fix 2 bugs mobile-critical trên trang chủ:
1. Top navigation không mở được trên mobile (hamburger chết)
2. Hero section mất ảnh xoài dưới breakpoint 1024px

## Phases

| # | Phase | Status | File |
|---|---|---|---|
| 01 | Implement mobile menu overlay trong header.tsx | pending | [phase-01](./phase-01-mobile-menu-overlay.md) |
| 02 | Fix hero image responsive layout | pending | [phase-02](./phase-02-hero-responsive-image.md) |
| 03 | Verify — typecheck, lint, manual mobile test | pending | [phase-03](./phase-03-verify.md) |

## Dependencies

- Phase 01 và 02 độc lập — có thể làm song song (file khác nhau)
- Phase 03 chạy sau khi 01 + 02 xong

## Files touched

- `src/components/header.tsx` (modify)
- `src/components/hero-section.tsx` (modify)

Không tạo file mới — KISS. Mobile menu inline trong header (component nhỏ).

## Success Criteria

- Hamburger mở/đóng menu overlay trên mobile
- 6 nav link hoạt động + auto-close khi navigate
- ESC key + click backdrop đóng menu
- Hero carousel hiển thị trên mọi viewport ≥ 320px
- Desktop (≥1024px) không thay đổi
- `npx tsc --noEmit` + `bun run lint` pass

## Out of Scope

- Mega menu, search, language switcher, phone CTA trong menu
- Animation library (Framer Motion) — dùng CSS thuần
- Test automation — chỉ manual verification lần này
