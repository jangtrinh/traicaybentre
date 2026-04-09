# Phase 02 — Dynamic Product Template

**Status:** pending
**Effort:** 3-4h
**Blocks:** P06, P07
**Blocked by:** P01

## Context

- Current: `src/app/xoai-tu-quy/page.tsx` = static route với data hardcoded trong JSX
- Goal: 1 dynamic route `src/app/[product]/page.tsx` đọc từ registry → render cho mọi product
- **Critical constraint: `/xoai-tu-quy` HTML output phải identical post-migrate** (SEO + visual)

## Key Insights

- Next.js App Router: static route WINS over dynamic khi collision → miễn chưa delete `src/app/xoai-tu-quy/`, dynamic route không active cho slug đó
- Chiến lược: build dynamic → verify parity trên slug KHÁC (ví dụ test với `dua-xiem-ben-tre` placeholder) → delete static xoài → verify xoài qua dynamic
- `generateStaticParams` export danh sách slugs từ registry → Next.js pre-render tại build time → zero runtime cost
- `[product]/page.tsx` MUST call `notFound()` nếu slug không trong registry (chặn bắt nhầm `/anything`)

## 🔴 Red Team Applied

- **F5 (High):** `getProductJsonLd(product)` KHÔNG tồn tại trong `src/lib/structured-data.ts`. MUST add as explicit deliverable trong Phase 02 step 0.
- **F9 (Medium):** Migration static → dynamic phải là SINGLE atomic commit: delete static + add dynamic + `bun run build` verify → push. Không có mid-state.
- **F12 (Medium):** `generateStaticParams` chỉ trả về `getActiveProducts()`, không `getProductSlugs()` (tránh pre-render 404 cho coming-soon products). Coming-soon hiển thị qua `/san-pham` catalog (Phase 06), không có route riêng.
- **F4 (High):** Existing `getArticleJsonLd(opts: {...})` dùng options object, không Article. Check signature trước khi Phase 04 consume.

## Requirements

### Functional
- `src/app/[product]/page.tsx` render product landing cho bất kỳ slug nào trong registry
- `notFound()` nếu slug không tồn tại hoặc là reserved path
- `generateMetadata` dynamic từ registry (title, description, keywords, canonical, OG)
- `generateStaticParams` return all active product slugs
- JSON-LD Product schema inline (reuse pattern từ `@/lib/structured-data`)
- Visual + HTML parity 100% với `/xoai-tu-quy` hiện tại

### Non-functional
- Component size < 200 LOC (extract sections ra components nếu cần)
- Zero layout shift vs legacy

## Architecture

### File `src/app/[product]/page.tsx`

```ts
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getActiveProducts } from "@/lib/products";
import { ProductLanding } from "@/components/product/product-landing";
import { getProductJsonLd, getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

type Props = { params: Promise<{ product: string }> };

export async function generateStaticParams() {
  // F12: active only — coming-soon surfaced via /san-pham catalog, không có route
  return getActiveProducts().map((p) => ({ product: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const url = `${SITE_URL}/${slug}`;
  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url,
      images: [{ url: product.heroImage, alt: product.heroImageAlt }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { product: slug } = await params;
  const product = getProduct(slug);
  if (!product || product.status !== "active") notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProductJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd([
            { name: "Trang chủ", url: SITE_URL },
            { name: product.shortName, url: `${SITE_URL}/${slug}` },
          ])),
        }}
      />
      <ProductLanding product={product} />
    </>
  );
}
```

### Component `src/components/product/product-landing.tsx`

Reusable component render full product landing (hero + sections). Extract từ current `/xoai-tu-quy/page.tsx`, parameterize by `product` prop.

- Sections động từ `product` prop
- Legacy TSX content xoài không thể 1-1 port hết (có thể có sections bespoke) → component support optional slots hoặc prop-driven config
- **Fallback plan**: nếu xoài có sections quá bespoke khó template, giữ 1 function `renderXoaiSpecialSections(product)` trong component và gate by slug — accept debt tạm thời, refactor later khi có product thứ 3

### Helper addition `src/lib/structured-data.ts`

Add `getProductJsonLd(product: Product)` nếu chưa có. Check file hiện tại trước khi add.

## Files to Create

- `src/app/[product]/page.tsx` (new, ~60 LOC)
- `src/components/product/product-landing.tsx` (new, target < 200 LOC — split nếu cần)

## Files to Modify

- `src/lib/structured-data.ts` — add `getProductJsonLd` nếu thiếu

## Files to Delete (END of phase, after verify)

- `src/app/xoai-tu-quy/page.tsx` — DELETE sau khi verify parity
- `src/app/xoai-tu-quy/` directory nếu không còn children (check trước khi rm)

## Files to Read (context only)

- `src/app/xoai-tu-quy/page.tsx` — source of truth để mirror
- `src/lib/structured-data.ts`
- `src/components/hero-section.tsx`, `product-section.tsx`, etc. — understand existing components

## Implementation Steps

0. **ADD `getProductJsonLd(product: ProductEntry)` to `src/lib/structured-data.ts`** (F5 blocking). Schema: **minimal Schema.org `Product`** with `name`, `description`, `image`, `brand` (→ LocalBusiness), `category`. **NO nested `Offer`** — price dao động si/le, tránh rich result penalty. Add Offer sau khi có price API ổn định. Export + typecheck.
1. Read `src/app/xoai-tu-quy/page.tsx` fully — map all sections, metadata, JSON-LD
2. Create `src/components/product/product-landing.tsx` mirroring xoài layout, parameterize by `product` prop
3. Create `src/app/[product]/page.tsx` với dynamic metadata + notFound guard + `generateStaticParams` returning ACTIVE only (F12)
4. **Temporary test**: tạm set `dua-xiem-ben-tre` status `active` trong registry để test dynamic route (không delete xoai static yet). Verify render → revert to coming-soon.
5. Navigate `/xoai-tu-quy` → vẫn render từ static (Next.js prefers static). Take screenshot baseline.
6. **SINGLE ATOMIC COMMIT (F9)**: DELETE `src/app/xoai-tu-quy/page.tsx` + directory AND `bun run build` → verify no errors → local `bun dev` verify `/xoai-tu-quy` renders from dynamic `[product]`. If any step fails, rollback single commit.
7. Take post-migrate screenshot.
8. Visual diff: baseline vs new. Must be 0% or cosmetic only.
9. Curl test: `curl https://.../xoai-tu-quy` → compare HTML structure, JSON-LD, metadata
10. Navigate `/dua-xiem-ben-tre` → must 404 (coming-soon, not in generateStaticParams, notFound guard triggers)

## Todo

- [ ] Map legacy xoai page structure
- [ ] Add `getProductJsonLd` helper
- [ ] Create `product-landing.tsx` component
- [ ] Create `[product]/page.tsx` route
- [ ] Test dynamic route với dua-xiem placeholder
- [ ] Baseline screenshot `/xoai-tu-quy`
- [ ] Delete static xoai page
- [ ] Build + verify
- [ ] Post-migrate screenshot + diff
- [ ] HTML/metadata curl comparison

## Success Criteria

- `/xoai-tu-quy` renders identically post-migrate (pixel diff < 2%, metadata identical)
- `/dua-xiem-ben-tre` → 404 (status coming-soon → notFound)
- `/kien-thuc`, `/nguon-goc`, `/san-pham`, `/giao-hang/ha-noi` → UNCHANGED (dynamic `[product]` không bắt)
- `bun run build` → 0 errors, 0 new warnings
- `curl /xoai-tu-quy` HTML response chứa đầy đủ JSON-LD Product + Breadcrumb
- Static params include `xoai-tu-quy` + `dua-xiem-ben-tre` (even if coming-soon — for Phase 06 catalog test)

## Risks

| Risk | Mitigation |
|------|------------|
| Xoài sections bespoke không template hóa được 100% | Component accept optional `extraSections` prop hoặc gate by slug temporarily |
| Delete static xoai page làm route 404 trước khi dynamic hoạt động | Make in single commit: delete + verify build together. Rollback-ready (git revert). |
| `notFound()` bắt nhầm legacy routes vì order precedence | Verify với explicit navigation test + `bun run build` tree output |
| JSON-LD schema khác biệt | Diff curl output — phải identical field by field |

## Next

→ Phase 03: Supabase Article Schema (song song được với P06 nếu cần).
