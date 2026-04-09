# Phase 01 — Mobile Menu Overlay

## Context Links
- Brainstorm: `plans/specs/mobile-nav-hero-fix/brainstorm.md`
- Use cases: `plans/specs/mobile-nav-hero-fix/usecases.md` (UC-01)
- Current code: `src/components/header.tsx:77-83`

## Overview
- **Priority:** P0
- **Status:** pending
- Wire hamburger button lên state + render fullscreen overlay menu khi mở.

## Key Insights
- Component đã `"use client"` rồi → thêm state dễ.
- `navLinks` array đã tồn tại ở dòng 15-21 → reuse cho cả desktop và mobile.
- Overlay fullscreen match ngôn ngữ "bold display text" của brand (xem hero h1).
- Không cần thư viện — CSS transform/opacity + `useEffect` cho ESC/scroll lock.

## Requirements

### Functional
- Tap hamburger → overlay fade in, body scroll lock
- Overlay chứa: close button (X), logo + brand name, 6 nav link (typography lớn), CTA "Liên hệ"
- Click link → navigate + menu tự đóng (cleanup state trước unmount là OK vì Next.js router chuyển page)
- Click close / click backdrop / ESC → đóng menu, unlock body
- Menu chỉ visible trên `<lg` (768-1023px cũng dùng, ≥1024px ẩn hoàn toàn)

### Non-functional
- `aria-expanded` trên hamburger
- `aria-label="Mở menu"` / `"Đóng menu"`
- Transition 200-300ms, dùng Tailwind `transition-opacity duration-300`
- Z-index cao hơn header (hiện z-50 → overlay z-[60])

## Architecture

```
<Header>
  <state: menuOpen>
  <effect: body scroll lock khi menuOpen>
  <effect: ESC key listener khi menuOpen>

  <div className="header-bar"> ... logo + desktop nav + hamburger </div>

  {menuOpen && <MobileMenuOverlay onClose={...} links={navLinks} />}
</Header>
```

`MobileMenuOverlay` là inline component trong cùng file (KISS — dưới 200 dòng tổng, không cần file riêng).

## Related Code Files

**Modify:**
- `src/components/header.tsx` — thêm state, effect, overlay JSX

**Read for context:**
- `src/components/hero-section.tsx` — tham chiếu typography pattern (uppercase display)
- `design-system/tokens.json` — tokens màu `brand`, `text`

## Implementation Steps

1. **Thêm state** `const [menuOpen, setMenuOpen] = useState(false)` ở `Header`.

2. **Effect scroll lock:**
   ```tsx
   useEffect(() => {
     if (menuOpen) {
       document.body.style.overflow = "hidden";
     } else {
       document.body.style.overflow = "";
     }
     return () => { document.body.style.overflow = ""; };
   }, [menuOpen]);
   ```

3. **Effect ESC key:**
   ```tsx
   useEffect(() => {
     if (!menuOpen) return;
     const handler = (e: KeyboardEvent) => {
       if (e.key === "Escape") setMenuOpen(false);
     };
     window.addEventListener("keydown", handler);
     return () => window.removeEventListener("keydown", handler);
   }, [menuOpen]);
   ```

4. **Wire hamburger button:** `onClick={() => setMenuOpen(true)}`, thêm `aria-expanded={menuOpen}`, `aria-controls="mobile-menu"`, `aria-label="Mở menu"`.

5. **Render overlay** (sau header-bar div):
   ```tsx
   {menuOpen && (
     <div
       id="mobile-menu"
       className="fixed inset-0 z-[60] bg-brand lg:hidden"
       onClick={() => setMenuOpen(false)}
     >
       <div className="flex h-full flex-col px-5 py-6" onClick={(e) => e.stopPropagation()}>
         {/* Top bar — logo + close */}
         <div className="flex items-center justify-between">
           <a href="/" className="flex items-center gap-2">
             <Image src="/images/logo.png" alt="..." width={160} height={64} className="h-12 w-auto" />
             <span className="font-heading text-sm font-bold uppercase tracking-wider text-text">
               Trái Cây Bến Tre
             </span>
           </a>
           <button
             onClick={() => setMenuOpen(false)}
             className="flex h-10 w-10 items-center justify-center rounded-full bg-black"
             aria-label="Đóng menu"
           >
             <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
               <path d="M5 5l10 10M15 5L5 15" stroke="white" strokeWidth="1.67" strokeLinecap="round" />
             </svg>
           </button>
         </div>

         {/* Nav links — large display */}
         <nav className="mt-16 flex flex-col gap-6">
           {navLinks.map((link) => (
             <a
               key={link.label}
               href={link.href}
               onClick={() => setMenuOpen(false)}
               className="font-heading text-4xl font-semibold uppercase tracking-wide text-text sm:text-5xl"
             >
               {link.label}
             </a>
           ))}
         </nav>

         {/* CTA */}
         <a
           href="/#contact"
           onClick={() => setMenuOpen(false)}
           className="mt-auto flex h-14 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase tracking-wider text-white"
         >
           Liên hệ
         </a>
       </div>
     </div>
   )}
   ```

6. **Run typecheck** — fix errors nếu có.

## Todo

- [ ] Thêm state `menuOpen`
- [ ] Effect scroll lock
- [ ] Effect ESC handler
- [ ] Wire hamburger button (onClick, aria)
- [ ] Render overlay JSX (close, logo, nav links, CTA)
- [ ] `onClick={() => setMenuOpen(false)}` trên mỗi link
- [ ] Stop propagation trên inner div để click vào content không đóng
- [ ] `npx tsc --noEmit`

## Success Criteria
- Tap hamburger → overlay xuất hiện, body lock
- Tap close/ESC/backdrop → overlay đóng, body unlock
- Tap link → navigate + overlay đóng
- Desktop (lg+) không thấy overlay dù state có thay đổi

## Risk
- iOS Safari `body` scroll lock đôi khi rò rỉ → fallback thêm `overscroll-behavior: contain` vào overlay nếu cần
- `onClick` backdrop + inner `stopPropagation` phải test kỹ để tránh click link cũng bị chặn
