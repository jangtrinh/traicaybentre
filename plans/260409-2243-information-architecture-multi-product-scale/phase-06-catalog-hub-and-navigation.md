# Phase 06 — Catalog Hub + Navigation

**Status:** pending
**Effort:** 3-4h
**Blocks:** P07
**Blocked by:** P01, P02

## Context

- `/san-pham` chưa tồn tại → NEW catalog hub list tất cả products từ registry
- `header.tsx` + `mobile-menu-overlay.tsx` hiện tại nav flat (Trang chủ, Kiến thức, Tin tức, Giao hàng, Liên hệ) — thiếu product entry points
- Goal: nav dropdown "Sản phẩm ▾", catalog hub `/san-pham`, breadcrumbs product-scoped

## Key Insights

- Dropdown nav trên desktop, expand/collapse accordion trên mobile
- Catalog hub = hero + grid card (từ `getAllProducts()`) + filter "Đang mùa" chip
- `coming-soon` products hiển thị trong catalog với badge "Sắp có" **KHÔNG CLICK ĐƯỢC** (no link, no href) — F12 decision
- Breadcrumb component reusable cross-pages

## 🔴 Red Team Applied

- **F6 (High):** REMOVE all references tới `/lien-he` — không tồn tại. Contact flow = Zalo CTA + ContactSection homepage. Nav + footer KHÔNG có entry "Liên hệ".
- **F7 (High):** `header.tsx` hiện 163 LOC, +dropdown sẽ vượt 200 LOC cap. MANDATORY Step 1: extract `<DesktopNav />`, `<NavDropdown />`, `<MobileMenuTrigger />` components BEFORE adding products dropdown. Target: `header.tsx` < 120 LOC post-extraction.
- **F12 (Medium):** Coming-soon card trong catalog: render `<div>` not `<Link>`, badge "Sắp ra mắt", disabled cursor, optional tooltip. KHÔNG navigate tới `/dua-xiem-ben-tre` (không có route, sẽ 404).

## Requirements

### Functional
- `/san-pham` page: hero + product grid + "Đang mùa" filter
- Header nav: "Sản phẩm ▾" dropdown (desktop) list từ `getActiveProducts()`
- Mobile menu: accordion "Sản phẩm" expand list products
- Breadcrumb component cho product pages (Phase 07 + scoped articles Phase 04 use)
- `coming-soon` products → clickable card with "Sắp ra mắt" badge, leads to `/san-pham#{slug}` anchor or placeholder page (NOT landing)

### Non-functional
- Nav dropdown accessible (keyboard, aria)
- Mobile menu smooth open/close
- Catalog page LCP < 2.5s

## Architecture

### `/san-pham/page.tsx`

```ts
import { getAllProducts } from "@/lib/products";
import { ProductCatalog } from "@/components/product/product-catalog";

export const metadata = {
  title: "Các Loại Trái Cây Đặc Sản Bến Tre | TraiCayBenTre",
  description: "Danh sách trái cây đặc sản Bến Tre: Xoài Tứ Quý, Dừa Xiêm, và các loại trái cây khác.",
  alternates: { canonical: "https://traicaybentre.com/san-pham" },
};

export default function CatalogPage() {
  return <ProductCatalog products={getAllProducts()} />;
}
```

### Component `src/components/product/product-catalog.tsx`

- Hero: "Trái cây đặc sản Bến Tre từ vựa uy tín"
- Filter chip: "Tất cả" / "Đang mùa" / "Quanh năm"
- Grid: card mỗi product với image, name, tagline, season badge, CTA
- Card click: `status === "active"` → `/{slug}`, `coming-soon` → alert or disabled visual

### Header dropdown

Update `src/components/header.tsx`:
```tsx
const products = getActiveProducts(); // server component or pass from layout
// NavItem with children
<NavDropdown label="Sản phẩm" items={products.map(p => ({ label: p.shortName, href: `/${p.slug}` }))} footer={{ label: "Xem tất cả", href: "/san-pham" }} />
```

Check if `header.tsx` is client or server component. If client, move product fetch to server layout + pass as prop.

### Mobile menu

Update `src/components/mobile-menu-overlay.tsx`:
- Add "Sản phẩm" section with expandable list
- Each product link
- "Xem tất cả →" link to `/san-pham`

### Breadcrumb component `src/components/ui/breadcrumb.tsx`

```tsx
export function Breadcrumb({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="...">
      <ol className="...">
        {items.map((item, i) => (
          <li key={i}>
            {item.href ? <Link href={item.href}>{item.name}</Link> : <span>{item.name}</span>}
            {i < items.length - 1 && <span> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

Reuse trong Phase 07 homepage + Phase 04 scoped articles (nếu Phase 04 chưa tạo, Phase 06 tạo; nếu đã, Phase 06 reuse).

## Files to Create

- `src/app/san-pham/page.tsx` (new, ~20 LOC)
- `src/components/product/product-catalog.tsx` (new, ~150 LOC)
- `src/components/ui/breadcrumb.tsx` (new nếu chưa có)
- `src/components/layout/nav-dropdown.tsx` (new)
- `src/components/layout/desktop-nav.tsx` (new — MANDATORY extract F7)
- `src/components/layout/mobile-menu-trigger.tsx` (new — MANDATORY extract F7)

## Files to Modify

- `src/components/header.tsx` — MUST reduce to < 120 LOC post-extract (F7)
- `src/components/mobile-menu-overlay.tsx` — add products accordion (NO lien-he)
- `src/components/footer.tsx` — add /san-pham link (NO lien-he)

## Files to Read

- `src/components/header.tsx`
- `src/components/mobile-menu-overlay.tsx`
- `src/components/footer.tsx` — add `/san-pham` link for consistency

## Implementation Steps

1. Read current `header.tsx` (163 LOC) + `mobile-menu-overlay.tsx`
2. **MANDATORY EXTRACT (F7)** before touching nav structure:
   - Extract `src/components/layout/desktop-nav.tsx` (nav list)
   - Extract `src/components/layout/mobile-menu-trigger.tsx` (hamburger button)
   - Move nav items data to const at top of `desktop-nav.tsx`
   - Verify `header.tsx` < 120 LOC post-extract
3. Create `Breadcrumb` component — `src/components/ui/breadcrumb.tsx`
4. Create `NavDropdown` component — `src/components/layout/nav-dropdown.tsx`
5. Update `desktop-nav.tsx` to include "Sản phẩm ▾" dropdown between "Trang chủ" and "Kiến thức". **No "Liên hệ" entry (F6)**.
6. Update `mobile-menu-overlay.tsx` with accordion "Sản phẩm". **No "Liên hệ" entry (F6)**.
7. Create `product-catalog.tsx` — coming-soon cards render as `<div>` not `<Link>` (F12)
8. Create `/san-pham/page.tsx`
9. Update `footer.tsx` to include `/san-pham` link. **No `/lien-he` link (F6)**.
10. Navigate flow:
    - Homepage → click "Sản phẩm ▾" → see "Xoài Tứ Quý" + "Xem tất cả"
    - Click "Xem tất cả" → `/san-pham`
    - See xoai card (clickable) + dua-xiem card (NOT clickable, badge "Sắp có")
    - Click xoai card → `/xoai-tu-quy` (working)
    - Click dua-xiem card → no navigation
11. Mobile test: hamburger → "Sản phẩm" → expand → links work
12. Lint + typecheck
13. `wc -l src/components/header.tsx` → verify < 120 LOC

## Todo

- [ ] Read existing header/mobile/footer
- [ ] Create Breadcrumb component
- [ ] Create NavDropdown component
- [ ] Update header with dropdown
- [ ] Update mobile menu with products section
- [ ] Create product-catalog component
- [ ] Create /san-pham page
- [ ] Update footer link
- [ ] Desktop navigation flow test
- [ ] Mobile navigation flow test
- [ ] Typecheck + lint

## Success Criteria

- `/san-pham` renders with at least 2 products (xoai active, dua-xiem coming-soon badge)
- Desktop header "Sản phẩm ▾" opens dropdown, click xoài → `/xoai-tu-quy`
- Mobile hamburger → "Sản phẩm" accordion → links work
- Breadcrumb on `/xoai-tu-quy` shows `Trang chủ > Xoài Tứ Quý`
- `coming-soon` product doesn't crash when clicked
- Lighthouse a11y > 95 cho `/san-pham`
- `header.tsx` still < 200 LOC (split if not)

## Risks

| Risk | Mitigation |
|------|------------|
| Header.tsx bloat > 200 LOC | Extract NavDropdown + NavItem components early |
| Dropdown a11y (keyboard nav, focus trap) | Use Radix/headless-ui if already in project, else implement proper aria/focus |
| Coming-soon product UX confusing | Clear badge + disabled cursor + tooltip "Sắp ra mắt" |
| Mobile menu overlay close on nav click broken | Preserve existing onClose handler semantics |

## Next

→ Phase 07: Homepage seasonal hero + /nguon-goc rewrite.
