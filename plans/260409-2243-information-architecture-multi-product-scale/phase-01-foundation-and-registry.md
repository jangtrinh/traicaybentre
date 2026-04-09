# Phase 01 — Foundation & Products Registry

**Status:** pending
**Effort:** 2-3h
**Blocks:** P02, P03, P06, P07
**Blocked by:** None

## Context

- Brainstorm: `plans/reports/brainstorm-260409-2243-information-architecture-multi-product-scale.md`
- Current state: mono-product site, 0 registry, data hardcoded trong TSX pages
- Goal: lay foundation để Phase 02+ dynamic template đọc từ 1 source

## Key Insights

- Không tạo directory hoặc file dư — chỉ những gì Phase 02+ cần
- Registry schema phải cover cả xoài (đã có) + dừa (sắp có) + mọi loại tương lai
- Season = `number[] | "year-round"` → drive seasonal hero rotation Phase 07
- `reservedPaths` whitelist để tránh `[product]` dynamic bắt nhầm `/kien-thuc`, `/nguon-goc`, etc.

## 🔴 Red Team Applied

- **F1 (Critical):** Type renamed `Product` → `ProductEntry` — tránh collision với `src/lib/landing-data.ts` `interface Product` (shape khác: id, farm, harvestDate, priceSi...)
- **F3 (Critical):** Step 0 MUST scout real hero image paths từ `structured-data.ts` + `landing-data.ts`. KHÔNG hardcode filename không verify. Reference: `structured-data.ts:26` uses `xoai-real-2.jpg`.
- **F8 (High):** Phase 03 (MDX articles) đã ship với hardcoded `KNOWN_PRODUCTS` whitelist trong `src/lib/articles.ts`. Phase 01 PHẢI swap → `getProductSlugs()` từ registry. Blocking checkbox, not TODO.

## Requirements

### Functional
- File `src/content/products.ts` export `products: Record<string, ProductEntry>` + type `Product`
- File `src/lib/products.ts` export helpers: `getProduct(slug)`, `getActiveProducts()`, `getProductSlugs()`, `isReservedPath(slug)`, `getSeasonalHeroProduct()`
- Initial entry: `xoai-tu-quy` (production-ready, mirror data hiện tại)
- Placeholder entry: `dua-xiem-ben-tre` với `status: "coming-soon"` (để Phase 06 catalog + Phase 07 homepage có thể test multi-product rendering mà không cần real content)

### Non-functional
- Registry file < 200 LOC (YAGNI — chỉ fields thực sự dùng)
- Zero runtime cost — pure static import
- Type-safe, không `any`

## Architecture

### Schema `src/content/products.ts`

```ts
// src/content/products.ts
export type ProductSeason = number[] | "year-round";

export type ProductEntry = {
  slug: string;                    // URL segment, e.g. "xoai-tu-quy"
  name: string;                    // Display full, e.g. "Xoài Tứ Quý"
  shortName: string;               // Nav/card, e.g. "Xoài Tứ Quý"
  tagline: string;                 // One-liner
  heroImage: string;               // Path to hero image
  heroImageAlt: string;
  season: ProductSeason;           // [4,5,6,7,8] or "year-round"
  status: "active" | "coming-soon";
  order: number;                   // Display order in nav/catalog
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  cta: {
    zaloMessage: string;           // Pre-filled Zalo message template
  };
};

export const RESERVED_PATHS = [
  "api", "kien-thuc", "tin-tuc", "nguon-goc", "giao-hang",
  "san-pham", "lien-he", "sitemap.xml", "robots.txt", "favicon.ico",
  "_next", "images", "fonts", "public",
] as const;

export const products: Record<string, ProductEntry> = {
  "xoai-tu-quy": {
    slug: "xoai-tu-quy",
    name: "Xoài Tứ Quý Thạnh Phú",
    shortName: "Xoài Tứ Quý",
    tagline: "Xoài đặc sản Bến Tre — vị mặn độc đáo, CDĐL #00124",
    heroImage: "/images/xoai-tu-quy-hero.jpg",
    heroImageAlt: "Xoài Tứ Quý Thạnh Phú Bến Tre chín vàng",
    season: [4, 5, 6, 7, 8],
    status: "active",
    order: 1,
    seo: {
      title: "Xoài Tứ Quý Thạnh Phú Bến Tre — CDĐL #00124",
      description: "Xoài Tứ Quý đặc sản Thạnh Phú Bến Tre. Vị mặn độc đáo, chỉ dẫn địa lý #00124.",
      keywords: ["xoài tứ quý", "xoài bến tre", "xoài thạnh phú", "cdđl xoài tứ quý"],
    },
    cta: {
      zaloMessage: "Mình muốn đặt Xoài Tứ Quý Thạnh Phú",
    },
  },
  "dua-xiem-ben-tre": {
    slug: "dua-xiem-ben-tre",
    name: "Dừa Xiêm Bến Tre",
    shortName: "Dừa Xiêm",
    tagline: "Dừa sọ Bến Tre — nước ngọt, quanh năm",
    heroImage: "/images/dua-xiem-hero.jpg",  // placeholder — real asset Phase riêng
    heroImageAlt: "Dừa Xiêm Bến Tre dừa sọ tươi",
    season: "year-round",
    status: "coming-soon",
    order: 2,
    seo: {
      title: "Dừa Xiêm Bến Tre (Dừa Sọ) — Nước Ngọt Quanh Năm",
      description: "Dừa Xiêm (dừa sọ) Bến Tre. Nước ngọt thanh, quanh năm có hàng.",
      keywords: ["dừa xiêm bến tre", "dừa sọ", "dừa xiêm", "dừa bến tre"],
    },
    cta: {
      zaloMessage: "Mình muốn đặt Dừa Xiêm Bến Tre",
    },
  },
};
```

### Helpers `src/lib/products.ts`

```ts
// src/lib/products.ts
import { products, RESERVED_PATHS, type Product } from "@/content/products";

export function getProduct(slug: string): ProductEntry | null {
  return products[slug] ?? null;
}

export function getActiveProducts(): ProductEntry[] {
  return Object.values(products)
    .filter((p) => p.status === "active")
    .sort((a, b) => a.order - b.order);
}

export function getAllProducts(): ProductEntry[] {
  return Object.values(products).sort((a, b) => a.order - b.order);
}

export function getProductSlugs(): string[] {
  return Object.keys(products);
}

export function isReservedPath(segment: string): boolean {
  return (RESERVED_PATHS as readonly string[]).includes(segment);
}

/**
 * Pick seasonal hero product based on current month.
 * Active products only. Prefers products in season. Fallback: first active by order.
 */
export function getSeasonalHeroProduct(now = new Date()): Product {
  const month = now.getMonth() + 1; // 1-12
  const active = getActiveProducts();
  if (active.length === 0) throw new Error("No active products in registry");

  const inSeason = active.filter((p) => {
    if (p.season === "year-round") return false; // prefer bounded season when available
    return p.season.includes(month);
  });
  if (inSeason.length > 0) return inSeason[0]!;

  // fallback to year-round
  const yearRound = active.filter((p) => p.season === "year-round");
  if (yearRound.length > 0) return yearRound[0]!;

  return active[0]!;
}
```

## Files to Create

- `src/content/products.ts` (new, ~120 LOC)
- `src/lib/products.ts` (new, ~50 LOC)

## Files to Read (context only)

- `src/app/xoai-tu-quy/page.tsx` — extract current metadata/SEO to mirror in registry
- `src/app/page.tsx` — understand existing hero data
- `src/lib/structured-data.ts` — check Product JSON-LD pattern hiện tại (Phase 02 reuse)

## Implementation Steps

0. **SCOUT real assets first** (red-team F3): grep `structured-data.ts`, `landing-data.ts`, `src/app/page.tsx`, `src/app/xoai-tu-quy/page.tsx` for actual hero image path. Confirmed reference point: `structured-data.ts:26` uses `/images/xoai-real-2.jpg`. List all xoai image paths. Pick primary hero. DO NOT invent filenames.
1. Read `src/app/xoai-tu-quy/page.tsx` + homepage hero to extract xoài metadata (title, description, keywords, alt text). Reuse scouted heroImage from step 0.
2. Create `src/content/products.ts` với xoài entry (production, real heroImage path) + dua-xiem entry (coming-soon, placeholder path OK vì không route)
3. Create `src/lib/products.ts` với all helpers (type `ProductEntry`)
4. `npx tsc --noEmit` → verify type-clean, verify NO collision với `landing-data.ts` `Product`
5. Quick smoke test: create throwaway `scripts/test-products-registry.ts` to console.log `getSeasonalHeroProduct()` cho các tháng 1-12, verify logic → delete sau khi confirm
6. **Blocking checkbox (red-team F8):** Open `src/lib/articles.ts`, find hardcoded `KNOWN_PRODUCTS` whitelist, replace with `import { getProductSlugs } from "@/lib/products"` + use at validation site. Typecheck. Manual test `getArticleByUrlPath("/xoai-tu-quy/kien-thuc/sample-xoai-tu-quy-la-gi")` — still should behave consistently.

## Todo

- [ ] **Scout real hero image paths** (F3) — no invented filenames
- [ ] Extract xoài metadata từ existing `/xoai-tu-quy/page.tsx`
- [ ] Write `src/content/products.ts` với type `ProductEntry` (F1)
- [ ] Write `src/lib/products.ts`
- [ ] Typecheck pass — NO collision với `landing-data.ts` `Product`
- [ ] Smoke test seasonal logic (month by month)
- [ ] Verify `isReservedPath` cover tất cả legacy routes
- [ ] **BLOCKING (F8): Swap `KNOWN_PRODUCTS` hardcoded whitelist in `src/lib/articles.ts` → `getProductSlugs()` from registry**
- [ ] Verify sample MDX article still readable post-swap

## Success Criteria

- Import `{ getProduct, getActiveProducts, getSeasonalHeroProduct }` từ `@/lib/products` works
- `getSeasonalHeroProduct()` trong tháng 4-8 → trả về `xoai-tu-quy`
- `getSeasonalHeroProduct()` ngoài mùa xoài → fallback đúng (hiện tại chỉ có dua-xiem coming-soon → trả về xoai vì fallback "first active")
- `isReservedPath("kien-thuc")` → true
- `isReservedPath("xoai-tu-quy")` → false
- Typecheck + lint pass

## Risks

| Risk | Mitigation |
|------|------------|
| Registry schema thiếu field sau này phải refactor | YAGNI — chỉ thêm field khi Phase 02+ thực sự dùng. Extend dễ. |
| `heroImage` path không match asset thực tế | Verify asset path trong Step 1 khi extract từ existing code |

## Next

→ Phase 02: Dynamic Product Template đọc từ registry này.
