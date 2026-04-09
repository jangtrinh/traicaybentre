# Plan — Audit Fix Batch

**Date:** 2026-04-09
**Domain:** Complicated
**Source:** `plans/reports/code-review-260409-1855-merge-and-mobile-fix.md`
**Appetite:** ~1 hour

## Goal

Fix tất cả medium + actionable low + tech debt từ audit, đưa `header.tsx` về dưới 200 LOC.

## Scope (in)

| ID | Fix |
|---|---|
| M1 | iOS Safari scroll lock preserve position (position:fixed + top:-y) |
| M2 | `usePathname` effect auto-close menu on route change |
| M3 | Same-route hash nav custom handler |
| L1 | `scroll-mt-28` → `scroll-mt-32` |
| L2 | `inert` attribute khi overlay closed |
| L3 | Auto-focus first link khi mở, return focus to hamburger khi đóng |
| L4 | Gộp 2 `useEffect` menuOpen thành 1 |
| N1 | Xoá stale comments `/gia-xoai-hom-nay` |
| N2 | `text-[36px]` → `text-4xl` |
| Tech debt | Extract `MobileMenuOverlay` component từ header.tsx |

## Scope (out)

- M4 (curl verification) — runtime check, sẽ làm ở verify phase
- L5 (hero carousel lazy) — pre-existing, ngoài diff
- L6/L7/N3 — nits không đáng sửa
- xoai-tu-quy/page.tsx extract sections — để round sau (YAGNI)

## Architecture Decision

**Extract `MobileMenuOverlay`:**
```
src/components/
├── header.tsx                    # Main header — sẽ giảm xuống ~130 LOC
└── mobile-menu-overlay.tsx       # NEW — ~150 LOC chứa overlay + logic menu state
```

Trade-off:
- Header ownership state `menuOpen` vẫn ở header (để toggle hamburger icon morph)
- Overlay nhận props: `open`, `onClose`, `navLinks`, `hamburgerRef` (cho focus return)
- Logic nội bộ (scroll lock, ESC, usePathname, focus mgmt) → encapsulated trong overlay

## Implementation Order

1. **Tạo `mobile-menu-overlay.tsx`** — skeleton với props interface, render overlay JSX
2. **Migrate logic:** scroll lock (M1 pattern) + ESC + usePathname (M2) + focus (L3) + inert (L2) — gộp thành 1 effect group (L4)
3. **Refactor `header.tsx`:** import MobileMenuOverlay, pass props, xoá logic cũ, giữ hamburger button + state
4. **Fix `xoai-tu-quy/page.tsx`:** scroll-mt, text-4xl, xoá comments
5. **M3 custom handler:** trong header.tsx, wrap nav link "Giá hôm nay" với onClick check pathname + scroll smooth
6. **Build verify**

## Success Criteria

- `bun run build` pass
- `header.tsx` < 200 LOC
- `mobile-menu-overlay.tsx` < 200 LOC
- Mobile menu auto-close khi navigate (test browser back)
- Overlay không tab-focusable khi đóng (`inert`)
- Tap hamburger → focus vào close button; đóng → focus return về hamburger
- iOS Safari scroll position preserve sau khi đóng menu
- Tất cả existing functionality (icon morph, stagger animation, scroll lock) intact
