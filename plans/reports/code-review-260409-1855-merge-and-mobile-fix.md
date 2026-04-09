# Code Review — Merge /gia-xoai-hom-nay + Mobile Nav/Hero Fix

**Date:** 2026-04-09
**Scope:** header.tsx, hero-section.tsx, xoai-tu-quy/page.tsx, next.config.ts, sitemap.ts + bulk link rewrite (16 files)
**Build:** PASS (22 static pages)
**Verdict:** Ship-able. 0 critical, 0 high. Một số medium/low cần note cho round sau.

---

## Critical
None.

## High
None.

## Medium

### M1 — Body scroll lock không giữ scroll position (iOS Safari rubber-band)
**File:** `src/components/header.tsx:18-27`

`document.body.style.overflow = "hidden"` chặn scroll nhưng trên iOS Safari nội dung phía sau sẽ jump về top khi đóng menu vì layout reflow. Pattern chuẩn cho iOS:

```ts
// lưu scrollY, set position: fixed + top: -scrollY, khôi phục khi đóng
```

**Impact:** User mở menu khi đã scroll xuống giữa trang → đóng menu → trang nhảy về đầu (chỉ iOS Safari). Desktop/Android OK.
**Severity:** Medium (platform-specific UX bug, không data loss).

### M2 — Mobile menu không close khi route change (Next Link client nav)
**File:** `src/components/header.tsx:72-88`

Next.js App Router với `Link` điều hướng client-side. Mỗi link trong nav đã có `onClick={closeMenu}`, nhưng:
- Nếu user click link `/xoai-tu-quy#gia` TRONG KHI đang ở `/xoai-tu-quy` → Next không re-render Header (same page), chỉ scroll to anchor. `onClick` vẫn fire → OK.
- Nhưng nếu điều hướng bị interrupt (back button browser, programmatic nav) → menu có thể dính. 

Chuẩn hơn: dùng `usePathname()` + effect để `setMenuOpen(false)` khi pathname thay đổi. Không chờ onClick.

```ts
const pathname = usePathname();
useEffect(() => { setMenuOpen(false); }, [pathname]);
```

**Lưu ý:** hash change KHÔNG trigger pathname change → vẫn cần onClick cho same-page anchor. Hai cơ chế bổ sung nhau.
**Severity:** Medium (edge case, nhưng dễ reproduce qua browser back).

### M3 — Hash navigation không trigger scroll khi đã ở cùng route
**File:** `src/components/header.tsx:40-44` + `src/app/xoai-tu-quy/page.tsx:204`

Từ `/xoai-tu-quy`, click "Giá hôm nay" (`/xoai-tu-quy#gia`) → Next `<Link>` không reload, và behavior của anchor scroll depends trên Next version. Trong Next 15 App Router, same-route hash navigation nên work nhưng không guarantee smooth scroll.

Test thủ công đề xuất: từ top của `/xoai-tu-quy`, click "Giá hôm nay" trong header — scroll tới section `#gia`? Nếu không, cần custom handler:

```ts
onClick={(e) => {
  if (pathname === '/xoai-tu-quy') {
    e.preventDefault();
    document.getElementById('gia')?.scrollIntoView({ behavior: 'smooth' });
  }
  closeMenu();
}}
```

**Severity:** Medium (broken UX nếu Next không handle; dễ test).

### M4 — Redirect 301 `/gia-xoai-hom-nay` → `/xoai-tu-quy#gia`: hash bị strip
**File:** `next.config.ts:17-24`

HTTP 301 redirects THEO SPEC không preserve fragment (#gia) — nhưng thực tế hầu hết browser re-append fragment gốc từ URL được redirect nếu destination không có fragment riêng. Ở đây destination có `#gia` nên browser sẽ dùng nó. Tuy nhiên:

1. Googlebot follow 301 → **không care về fragment** → index `/xoai-tu-quy` (OK, desired).
2. Some server-side fetchers / curl không preserve fragment → không vấn đề cho SEO nhưng có thể gây nhầm lẫn khi debug.
3. Fragment trong 301 `Location` header: Next.js emit literal `/xoai-tu-quy#gia` → browser nhảy đúng section → OK.

**Verify thủ công:** `curl -I https://traicaybentre.com/gia-xoai-hom-nay` → check `Location:` header có `#gia` không.

**Severity:** Medium (cần verify, không bug cứng).

---

## Low

### L1 — `scroll-mt-28` có thể không đủ khi header expand (72-96px) lúc không scrolled
**File:** `src/app/xoai-tu-quy/page.tsx:204,295`

`scroll-mt-28` = 7rem = 112px. Header lúc không scrolled cao `h-[72px]` → `xl:h-[96px]`. Cộng top padding → đủ cho mobile (h-14 = 56px khi pillVisible, nhưng khi jump từ redirect thì scroll từ top → pill chưa visible → header full height). 112px > 96px → OK, nhưng margin mỏng trên xl screens.

**Suggest:** `scroll-mt-32` (128px) cho safety.
**Severity:** Low (visual nit).

### L2 — Mobile menu overlay dùng `opacity` + `pointer-events-none` thay vì `display: none`
**File:** `src/components/header.tsx:59-63`

Overlay luôn trong DOM, chỉ opacity = 0. Pros: animation smooth. Cons:
- Screen reader có thể vẫn read content nếu không set `aria-hidden` đúng (đã set — OK).
- Interactive children (Link, button) có thể vẫn tab-focusable dù `pointer-events-none`. Cần `tabindex="-1"` hoặc `inert` attribute.

**Fix:** add `inert` prop khi `!menuOpen`:
```tsx
<div {...(!menuOpen && { inert: '' })} ...>
```
`inert` HTML attribute remove element khỏi tab order + a11y tree. Next.js/React 19 support.

**Severity:** Low (a11y nit — keyboard users có thể tab vào links ẩn).

### L3 — Focus trap thiếu trong mobile menu dialog
**File:** `src/components/header.tsx:54-109`

`role="dialog" aria-modal="true"` khai báo modal nhưng không implement focus trap. Keyboard user mở menu → Tab có thể escape ra ngoài overlay → xuống content phía sau (scroll locked nhưng focus vẫn ra ngoài).

Cũng thiếu: focus tự động vào first link khi mở, return focus về hamburger button khi đóng.

**Severity:** Low (WCAG 2.1 violation nhưng mobile context ít impact).

### L4 — Two separate `useEffect` cho menuOpen (scroll lock + ESC handler)
**File:** `src/components/header.tsx:18-37`

Có thể gộp 1 effect cho đơn giản. DRY nit.
**Severity:** Low.

### L5 — Hero carousel: tất cả 6 Image đều preload (chỉ `priority={i===0}`)
**File:** `src/components/hero-section.tsx:29-40`

6 Image component mount cùng lúc, Next sẽ load hết 6 ảnh vào srcset của mobile ngay từ đầu dù 5 ảnh chưa show. `priority={i===0}` chỉ điều khiển LCP priority, không ngăn load.

**Impact:** Mobile bandwidth cost = 6 × ~150KB = ~900KB cho hero. Nếu đã serve avif/webp thì có thể OK (~300KB) nhưng vẫn lãng phí.

**Suggest:** lazy mount các ảnh không phải current/next, hoặc dùng `loading="lazy"` cho i > 0.
**Severity:** Low (perf, pre-existing, không phải regression của diff này).

### L6 — `ARROW_RIGHT` icon import nhưng có thể redundant với `CaretRight`
**File:** `src/app/xoai-tu-quy/page.tsx:13`
Nit — check phosphor imports consistency với các pages khác (một số dùng CaretRight).

### L7 — Footer vẫn dùng `<a>` thay vì `<Link>` cho internal nav
**File:** `src/components/footer.tsx:35-42`
Pre-existing, không phải diff này. Nhưng `/xoai-tu-quy#gia` full-page reload từ footer → poor UX. Ra ngoài scope audit nhưng worth noting.

---

## Nit

### N1 — Comment in code references deleted path
`xoai-tu-quy/page.tsx:203, 264` — comments nhắc `/gia-xoai-hom-nay`. OK cho historical context, xóa sau khi redirect retire.

### N2 — Tailwind arbitrary values `text-[36px]` vs `text-4xl`
`xoai-tu-quy/page.tsx:135` — mix arbitrary + scale token. Stick với scale (text-4xl = 36px) cho consistency.

### N3 — `transitionDelay` inline style trong stagger nav
`header.tsx:77-79, 95-98` — tạo inline style objects mỗi render. Không perf critical ở 6 items nhưng có thể memoize.

---

## Positive Observations

1. **A11y basics đúng:** `role="dialog"`, `aria-modal`, `aria-expanded`, `aria-controls`, `aria-hidden` — intentional work.
2. **ESC handler cleanup đúng:** effect dep `[menuOpen]`, removeEventListener khi unmount → không leak.
3. **Redirect 301 chuẩn SEO:** `permanent: true` = emit 308 (HTTP/1.1 perm) — Google xử lý như 301 ✓.
4. **Anchor strategy sạch:** `id="gia"` + `scroll-mt-*` preserve deep-link intent từ old URL.
5. **Sitemap bump priority** `/xoai-tu-quy` 0.9 → 0.95 hợp lý sau merge.
6. **Metadata canonical giữ đúng** single URL, không duplicate.
7. **Shipping cards → Link clickable:** conversion-friendly, internal linking boost.
8. **Icon morph hamburger↔X:** absolute positioning + opacity = smooth, không layout shift.
9. **pillVisible logic:** force header bg transparent khi menu mở để tránh pill trắng đè overlay brand — thoughtful.
10. **Hero aspect ratio fix:** `4/3` mobile, `4/5` desktop — đúng cho portrait-heavy xoài shots.

---

## Recommended Actions (priority order)

1. **M2** — add `usePathname` effect để auto-close menu (5 lines, high value).
2. **M3** — manual test hash navigation same-route từ header; fix nếu broken.
3. **M4** — curl test redirect header.
4. **M1** — iOS scroll lock fix nếu có complaint thực tế (low priority until reported).
5. **L2+L3** — `inert` attribute + focus trap (batch a11y pass).
6. **L1** — bump `scroll-mt-28` → `scroll-mt-32`.

---

## Metrics

- Files changed: 20+
- LOC header.tsx: 215 (vượt 200 guideline — cân nhắc tách `MobileMenu` sub-component)
- LOC xoai-tu-quy/page.tsx: 367 (vượt — tách sections thành components)
- TypeScript errors: 0 (build passed)
- Security findings: 0
- A11y findings: 2 (L2, L3)

## Unresolved Questions

1. Next 15 App Router same-route hash navigation có auto-scroll không? → **cần manual test**.
2. `permanent: true` trong Next `redirects()` → 308 hay 301? (Next docs: 308. Google xử lý như 301. Verify qua curl.)
3. iOS Safari scroll lock có cần fix ngay không — có bao nhiêu % traffic iOS? Depends on analytics.
4. Footer `<a>` → `<Link>` migration có scope trong roadmap khác không?
5. Header 215 LOC & xoai-tu-quy 367 LOC — có enforce 200-line rule cho feature components không, hay guideline mềm?

**Status:** DONE
**Summary:** Audit complete. 0 critical/high. 4 medium (iOS scroll lock, route-change close, same-route hash nav, 301 hash preservation). 7 low, 3 nit. Ship-able with M2+M3 manual verification recommended.
