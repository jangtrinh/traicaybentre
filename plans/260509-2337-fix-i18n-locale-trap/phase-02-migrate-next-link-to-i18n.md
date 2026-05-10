# Phase 02 — Migrate `next/link` → `@/i18n/navigation Link`

**Priority**: P0
**Status**: Pending
**Owner**: fullstack-developer (parallelizable — files independent)

## Context

11 files import `Link` from `next/link`. These render unprefixed `href="/foo"` paths which:
- Work correctly when cookie=vi (default, no prefix needed)
- **Fail** when cookie=en/ko/ja: middleware 307 redirects to `/{locale}/foo` instead of generating proper localized link

`@/i18n/navigation` Link auto-injects locale prefix per current context.

## Files (11 total)

```
src/app/[locale]/[product]/[type]/[slug]/page.tsx
src/app/[locale]/tin-tuc/page.tsx
src/app/[locale]/giao-hang/[city]/page.tsx
src/components/article-layout.tsx
src/components/product/xoai-tu-quy-landing.tsx
src/components/product/xoai-hoang-kim-landing.tsx
src/components/product/dua-xiem-ben-tre-landing.tsx
src/components/product/product-catalog.tsx
src/components/seo/pricing-page-content.tsx
src/components/seo/seo-shipping-section.tsx
src/components/seo/order-page-content.tsx
```

## Migration recipe

**Before**:
```tsx
import Link from "next/link";
// ...
<Link href="/xoai-tu-quy">Xoài</Link>
```

**After**:
```tsx
import { Link } from "@/i18n/navigation";
// ...
<Link href="/xoai-tu-quy">Xoài</Link>
```

API is identical (`Link` is a wrapper). No JSX changes needed — only the import statement.

## Edge cases

1. **External links**: nếu file dùng `<Link href="https://...">`, `<Link href="mailto:...">`, hoặc `<Link href="tel:...">` → KHÔNG migrate, dùng `next/link` bình thường (or plain `<a>`). Kiểm tra grep từng file trước khi thay.

2. **Hash-only links**: `<Link href="#section">` — i18n Link xử lý OK, an toàn migrate.

3. **External URL trong same import**: nếu file dùng cả internal và external Link, có thể giữ `import NextLink from "next/link"` cho external + `import { Link } from "@/i18n/navigation"` cho internal. Nhưng phổ biến hơn: tất cả Link trong 1 file là internal → chỉ cần thay import.

4. **Dynamic href**: `<Link href={`/article/${slug}`}>` — i18n Link handle OK.

## Implementation steps

For each of 11 files:

1. Read file.
2. Inspect all `<Link>` usages — confirm hrefs are internal (start with `/`).
3. If ALL Links internal → replace import line.
4. If MIXED (internal + external) → rename external to `<a>` or alias next/link import as NextLink, keep i18n Link for internal.
5. Run `npx tsc --noEmit` after each batch.

## Todo

- [ ] Migrate `src/app/[locale]/[product]/[type]/[slug]/page.tsx`
- [ ] Migrate `src/app/[locale]/tin-tuc/page.tsx`
- [ ] Migrate `src/app/[locale]/giao-hang/[city]/page.tsx`
- [ ] Migrate `src/components/article-layout.tsx`
- [ ] Migrate `src/components/product/xoai-tu-quy-landing.tsx`
- [ ] Migrate `src/components/product/xoai-hoang-kim-landing.tsx`
- [ ] Migrate `src/components/product/dua-xiem-ben-tre-landing.tsx`
- [ ] Migrate `src/components/product/product-catalog.tsx`
- [ ] Migrate `src/components/seo/pricing-page-content.tsx`
- [ ] Migrate `src/components/seo/seo-shipping-section.tsx`
- [ ] Migrate `src/components/seo/order-page-content.tsx`
- [ ] Final `bun run build` to confirm no broken Link usages

## Success criteria

- `grep -rln 'from ["\x27]next/link["\x27]' src` returns 0 internal-link files (only external-only files if any remain)
- All affected files compile clean
- `bun run build` succeeds

## Risk

- **Low**: drop-in replacement, identical API
- **Edge case**: external/mailto/tel hrefs — manual check per file

## Next

→ Phase 03 (LanguageSwitcher)
