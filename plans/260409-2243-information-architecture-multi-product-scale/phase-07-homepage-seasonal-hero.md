# Phase 07 — Homepage Seasonal Hero + /nguon-goc Rewrite

**Status:** pending
**Effort:** 3-4h
**Blocks:** P08
**Blocked by:** P01, P06

## Context

- Current homepage: hero + sections toàn về xoài
- Current `/nguon-goc`: story origin of xoài only
- Goal:
  1. Homepage hero rotate theo mùa (call `getSeasonalHeroProduct()`)
  2. Thêm section "Product Showcase" (grid cards tất cả products)
  3. Rewrite `/nguon-goc` content: keep URL + H1 keywords, thêm section về vựa đa sản phẩm
- **SEO constraint**: `/nguon-goc` H1 + first paragraph MUST preserve "xoài tứ quý" keyword density để không rớt ranking

## Key Insights

- Hero component hiện tại hardcoded xoai data → parameterize by `product` prop
- Seasonal logic: tháng 4-8 → xoài (in-season). Ngoài mùa xoài + dừa chưa active → fallback xoài. Khi dừa active + ngoài mùa xoài → dừa (year-round).
- Product showcase section là section MỚI, chèn giữa hero và process section
- `/nguon-goc` rewrite: additive content, không xóa — bảo toàn keywords

## 🔴 Red Team Applied

- **F11 (Medium) — LOCKED:** `/nguon-goc` strategy = **Keep H1 "Nguồn gốc Xoài Tứ Quý" + preserve intro 200 words untouched + ADD sections below**. Không rewrite full, không đổi H1. User confirmed: SEO-safe additive only. Nếu implement gặp conflict (e.g. xoài-specific H2 contradict multi-product sections), flag to user, không tự quyết.

## Requirements

### Functional
- `HeroSection` accept `product: Product` prop → render image, tagline, CTA dynamic
- Homepage server component call `getSeasonalHeroProduct()` → pass to hero
- New `ProductShowcaseSection` component — grid cards từ `getActiveProducts()`
- `/nguon-goc` page rewritten: H1 preserved, new section "Câu chuyện vựa" mid-page, new section "Các loại trái cây tại vựa"
- Preserve all existing JSON-LD (LocalBusiness, FAQ, etc.) trong `/nguon-goc`

### Non-functional
- LCP not regress (hero image LCP target)
- `/nguon-goc` keyword density for "xoài tứ quý" >= current level
- CLS = 0

## Architecture

### Hero parameterization

```tsx
// src/components/hero-section.tsx (modify)
import { getSeasonalHeroProduct } from "@/lib/products";
import type { ProductEntry } from "@/content/products";

type Props = { product?: ProductEntry };

export function HeroSection({ product }: Props = {}) {
  const hero = product ?? getSeasonalHeroProduct();
  return (
    <section>
      <img src={hero.heroImage} alt={hero.heroImageAlt} />
      <h1>{hero.name}</h1>
      <p>{hero.tagline}</p>
      <Link href={`/${hero.slug}`}>Xem chi tiết</Link>
    </section>
  );
}
```

**Trap**: current hero is likely tightly coupled with xoài visuals (e.g. mango splat SVG, specific colors). Plan: keep xoài-bespoke visuals as default state; only rotate title/tagline/heroImage. Full visual rotate is future scope.

Alternative: 2-mode hero: "xoai" mode (current bespoke) + "generic" mode (prop-driven). Use xoai mode when product=xoai, generic mode otherwise.

### Product Showcase Section `src/components/product-showcase-section.tsx`

```tsx
import { getActiveProducts } from "@/lib/products";

export function ProductShowcaseSection() {
  const products = getActiveProducts();
  if (products.length < 2) return null; // hide when only 1 product
  return (
    <section>
      <h2>Đặc sản Bến Tre tại vựa</h2>
      <div className="grid">
        {products.map(p => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}
```

**Conditional render**: chỉ show khi có ≥ 2 active products — vì hiện tại chỉ xoai active (dua-xiem coming-soon), section sẽ HIDDEN ban đầu. Khi dua-xiem được promoted active (plan riêng launch), section tự xuất hiện. No code change.

### Homepage update `src/app/page.tsx`

```tsx
export default function Home() {
  return (
    <>
      <Header />
      <HeroSection /> {/* giờ auto seasonal */}
      <SectionDivider from="brand" to="brand-cream" />
      <ProductSection />
      <ProductShowcaseSection /> {/* NEW — conditional */}
      {/* ... rest unchanged */}
    </>
  );
}
```

### `/nguon-goc` rewrite

Current structure (scout): `src/app/nguon-goc/page.tsx` — single page with xoài origin story.

Rewrite strategy:
1. **Keep** H1: `Nguồn gốc Xoài Tứ Quý Thạnh Phú Bến Tre`
2. **Keep** all existing content about xoài origin (no deletion)
3. **Keep** metadata, JSON-LD
4. **Add** new section mid-page: `## Về vựa TraiCayBenTre` — story về vựa, nhà vườn, cam kết, liên kết nhà vườn Thạnh Phú
5. **Add** new section: `## Các loại trái cây tại vựa` — list products từ registry với link
6. URL, canonical, H1, first 200 words **UNCHANGED**

**Keyword preservation check**: count occurrences of "xoài tứ quý" before vs after rewrite. Must be >= before.

## Files to Create

- `src/components/product-showcase-section.tsx` (new, ~80 LOC)
- `src/components/product/product-card.tsx` (new, reusable cho catalog + showcase, ~60 LOC)

## Files to Modify

- `src/components/hero-section.tsx` — parameterize by product (careful: preserve xoai visual bespoke elements as default)
- `src/app/page.tsx` — add ProductShowcaseSection, pass product to hero if needed
- `src/app/nguon-goc/page.tsx` — add sections (don't remove existing)

## Files to Read

- `src/components/hero-section.tsx`
- `src/app/page.tsx`
- `src/app/nguon-goc/page.tsx`
- Assets: `/images/*` verify xoai + dua hero image paths

## Implementation Steps

1. Read existing `hero-section.tsx` — map bespoke visual elements (SVG, colors, layout specific to xoai)
2. Decide strategy: parameterize vs dual-mode
3. Refactor `hero-section.tsx` to accept optional `product` prop, fall back to `getSeasonalHeroProduct()`
4. Create `product-card.tsx` (reusable)
5. Create `product-showcase-section.tsx` with conditional render
6. Update `page.tsx` to include new section
7. Read `/nguon-goc/page.tsx`, count "xoài tứ quý" occurrences (baseline)
8. Rewrite `/nguon-goc`:
   - Keep H1, metadata, intro 200 words untouched
   - Add new section "Về vựa TraiCayBenTre" after intro
   - Add new section "Các loại trái cây tại vựa" with product cards
   - Keep xoài origin sections
9. Count keywords post-rewrite → must be >= baseline
10. Lighthouse run on homepage — LCP/CLS/INP compared baseline
11. Visual diff homepage + /nguon-goc

## Todo

- [ ] Read existing hero section
- [ ] Strategy: parameterize vs dual-mode
- [ ] Refactor hero
- [ ] Create product-card
- [ ] Create product-showcase-section
- [ ] Update page.tsx
- [ ] Baseline keyword count /nguon-goc
- [ ] Rewrite /nguon-goc additively
- [ ] Post-rewrite keyword count ≥ baseline
- [ ] Lighthouse homepage + /nguon-goc
- [ ] Visual diff
- [ ] Typecheck + lint

## Success Criteria

- Homepage hero title/tagline rotate based on current month (xoai tháng 4-8, fallback xoai tháng khác)
- Homepage product showcase section HIDDEN (hiện tại 1 active product) — khi dua-xiem activate thì show
- `/nguon-goc` H1 + first 200 words identical pre/post
- "xoài tứ quý" keyword count >= baseline
- All existing JSON-LD preserved
- LCP not regress on homepage (±5% tolerance)
- `/nguon-goc` LCP not regress
- Typecheck + lint pass

## Risks

| Risk | Mitigation |
|------|------------|
| Hero bespoke visuals break when parameterized | Dual-mode: default "xoai-bespoke" for xoai product, "generic" for others. Accept debt, refactor later. |
| `/nguon-goc` rewrite drops ranking | Preserve H1 + intro + keyword density. Additive only. A/B monitor GSC post-launch. |
| Seasonal logic edge case: off-season no year-round active → fallback wrong product | Helper returns fallback first active by order (covered by unit test) |
| Product showcase section clutters homepage with only 1 product | Conditional render (< 2 active → null) — safe default |

## Next

→ Phase 08: Verify & Acceptance (all phases done, run full test battery).
