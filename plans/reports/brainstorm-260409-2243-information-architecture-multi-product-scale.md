---
type: brainstorm
date: 2026-04-09 22:43
slug: information-architecture-multi-product-scale
status: approved
---

# Brainstorm — IA scale đa sản phẩm (Xoài Tứ Quý + Dừa Xiêm Bến Tre + N loại tương lai)

## Problem

Site hiện tại mono-product (Xoài Tứ Quý). Vừa mở thêm Dừa Xiêm Bến Tre (dừa sọ). Cần IA scale ra nhiều loại trái cây mà **không hy sinh SEO** — đặc biệt các URL xoài đang rank (`/xoai-tu-quy`, `/kien-thuc/*`, `/tin-tuc/*`, `/nguon-goc`).

### Current state (scouted)
- Routes root-flat: `/xoai-tu-quy`, `/nguon-goc`, `/kien-thuc`, `/tin-tuc`, `/giao-hang/[tinh]`
- 6 bài `/kien-thuc/*` + 3 bài `/tin-tuc/*` — đều về xoài
- Homepage hero + toàn bộ sections hướng về xoài
- `sitemap.ts` hardcode
- Content storage: chưa rõ (cần scout thêm khi implement) — giả định MD files hoặc hardcoded trong JSX

## Approaches evaluated

| # | Approach | Pros | Cons |
|---|----------|------|------|
| A | Flat root slugs — tất cả ở root, kiến thức flat + tag | Short URL, keyword ở root, không refactor | Namespace pollution, không topic cluster, keyword cannibalization khi scale |
| B | `/san-pham/{slug}` namespace | Chuẩn e-commerce, scale gọn | **Phải 301 redirect `/xoai-tu-quy` → mất tạm thời SEO → VI PHẠM ràng buộc** |
| C | Hybrid product-scoped (`/xoai-tu-quy/kien-thuc/*`) + 301 redirect legacy | Topic cluster full, namespace clean | 301 legacy → có risk re-index → VI PHẠM ràng buộc |
| **C′** | **Hybrid LEGACY-PRESERVING** — giữ 100% URL cũ, scoped cho content mới | **Zero SEO risk**, topic cluster cho content mới, scale tốt | URL schema không đồng nhất (legacy flat, new scoped) — cosmetic only |

## Decision — Approach C′ (Hybrid Legacy-Preserving)

**Nguyên tắc vàng: URL đã có → không đụng. Scoped pattern chỉ áp dụng cho content MỚI.**

### URL map chốt

```
/                                         Homepage — seasonal hero rotate
/san-pham                                 NEW catalog hub (zero SEO risk)
/nguon-goc                                GIỮ URL, rewrite content về vựa (không chỉ xoài)
/giao-hang/[tinh]                         GIỮ
/lien-he                                  GIỮ
/xoai-tu-quy                              GIỮ

# Legacy xoài content — KHÔNG ĐỤNG
/kien-thuc                                GIỮ + chuyển nhiệm vụ → GLOBAL hub
/kien-thuc/xoai-tu-quy-la-gi              GIỮ NGUYÊN
/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc GIỮ NGUYÊN
/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy GIỮ NGUYÊN
/kien-thuc/chi-dan-dia-ly-cd-dl-00124     GIỮ NGUYÊN
/kien-thuc/vung-trong-xoai-mien-tay       GIỮ NGUYÊN
/kien-thuc/mua-vu-xoai-tu-quy-3-vu-nam    GIỮ NGUYÊN
/tin-tuc                                  GIỮ + GLOBAL hub
/tin-tuc/nguon-goc-xoai-tu-quy-cau-chuyen-1982 GIỮ
/tin-tuc/7-mon-ngon-tu-xoai-tu-quy        GIỮ
/tin-tuc/bao-gia-xoai-tu-quy-thang-04-2026 GIỮ

# Dừa Xiêm — scoped ngay từ đầu
/dua-xiem-ben-tre
/dua-xiem-ben-tre/kien-thuc
/dua-xiem-ben-tre/kien-thuc/[slug]
/dua-xiem-ben-tre/tin-tuc
/dua-xiem-ben-tre/tin-tuc/[slug]

# Content xoài tương lai (bài MỚI) — scoped
/xoai-tu-quy/kien-thuc/[slug]
/xoai-tu-quy/tin-tuc/[slug]
```

**Zero redirect. Zero SEO risk.**

### Products registry

`src/content/products.ts`:
```ts
export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  heroImage: string;
  season: number[] | "year-round";  // months 1-12
  status: "active" | "coming-soon";
  order: number;
  seo: { title: string; description: string; };
};

export const products: Record<string, Product> = {
  "xoai-tu-quy": { season: [4,5,6,7,8], order: 1, ... },
  "dua-xiem-ben-tre": { season: "year-round", order: 2, ... },
};
```

### Content schema

`src/content/articles/*.md` (hoặc 1 source duy nhất):
```yaml
---
slug: cach-bao-quan-xoai-tu-quy
product: xoai-tu-quy
type: kien-thuc
urlPath: /kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy  # explicit override cho legacy
title: ...
publishedAt: ...
featuredImage: ...
---
```

Rule:
- Legacy article: `urlPath` khai báo tường minh → giữ URL cũ
- Article mới: không khai báo `urlPath` → auto generate `/{product}/{type}/{slug}`

→ 1 content source duy nhất, DRY. Router đọc `urlPath` để biết render ở đâu.

### Dynamic product template

`src/app/[product]/page.tsx` — đọc từ registry, fallback 404 nếu slug không tồn tại. Thêm trái mới = thêm entry vào registry + assets + (optional) content MD. Không code thêm.

### Global hubs

- `/kien-thuc` — list tất cả articles (legacy flat + new scoped), filter UI by product, sort by publishedAt. Hub page chỉ chứa link cards → URL đích không quan trọng về mặt code.
- `/tin-tuc` — same.
- `/san-pham` — grid tất cả products từ registry, badge "Đang mùa" / "Quanh năm", link tới product landing.

### Homepage (revised)

1. **Hero seasonal rotate** — đọc `products` registry + `new Date().getMonth()` → pick product đang mùa. Quanh năm fallback về flagship.
2. **Product showcase** (NEW section) — grid các loại trái, badge season
3. Process / Certification (shared — về vựa)
4. Calendar (có thể mở rộng show mùa vụ cả 2 loại)
5. Testimonials (mixed, optional tag by product)
6. Social video (mixed)
7. `TinTucSection` — global latest (đã mixed)
8. FAQ
9. Contact

### Navigation

Desktop: `Trang chủ | Sản phẩm ▾ | Kiến thức | Tin tức | Giao hàng | Liên hệ`
- Dropdown "Sản phẩm" auto-generate từ registry (order by `order` field)
- Mobile overlay: same structure, expand/collapse dropdown
- Breadcrumb context-aware: `Trang chủ / Xoài Tứ Quý / Kiến thức / Cách bảo quản`

### Internal linking strategy (SEO booster)

- Product page `/xoai-tu-quy` → link CARD xuống cả 6 bài legacy `/kien-thuc/...` + các bài scoped mới → **tăng equity** cho legacy pages đang rank
- Product page `/dua-xiem-ben-tre` → link xuống `/dua-xiem-ben-tre/kien-thuc/*`
- Global `/kien-thuc` → link tất cả
- Homepage → link product pages + top articles
- Related articles (bài dưới mỗi article): filter theo `product`, cross-link giữa legacy và scoped

### Sitemap

Chuyển từ hardcoded → dynamic:
```ts
// src/app/sitemap.ts
- Static routes (/, /san-pham, /nguon-goc, /giao-hang/*, /lien-he)
- Products from registry → /{slug}
- Articles from content source → sử dụng `urlPath` (đã tính sẵn legacy vs scoped)
```

## Implementation considerations

### SEO safeguards
- **Không redirect bất kỳ URL cũ nào.**
- Canonical URL = urlPath (avoid dup)
- Metadata per product từ registry
- JSON-LD Product schema cho product pages
- JSON-LD Article schema cho articles (đã có chưa? — check khi implement)
- Breadcrumb schema

### Modularization
- Registry file < 200 LOC, split nếu cần
- `src/lib/products.ts` helper (getProduct, getActiveProducts, getSeasonalHero)
- `src/lib/articles.ts` helper (getArticles, getArticlesByProduct, getArticleBySlug)
- Dynamic route files: `[product]/page.tsx`, `[product]/kien-thuc/[slug]/page.tsx`, etc.

### File layout đề xuất
```
src/
  app/
    [product]/
      page.tsx                   # dynamic product landing
      kien-thuc/[slug]/page.tsx  # scoped article
      tin-tuc/[slug]/page.tsx
    san-pham/page.tsx            # NEW catalog hub
    xoai-tu-quy/page.tsx         # DELETE — di chuyển logic vào [product]/page.tsx
    kien-thuc/[slug]/page.tsx    # GIỮ cho legacy URLs
  content/
    products.ts                  # registry
    articles/                    # hoặc cấu trúc hiện tại
  lib/
    products.ts
    articles.ts
```

**Câu hỏi mở cần xác minh khi implement:** hiện tại `/xoai-tu-quy/page.tsx` và `/kien-thuc/[slug]/page.tsx` render từ đâu? Nếu data hardcoded trong JSX, migration sẽ phức tạp hơn — cần một phase "extract content to structured source" trước khi dynamic-template hóa.

## Risks & mitigation

| Risk | Mitigation |
|------|------------|
| Legacy `/xoai-tu-quy/page.tsx` conflict với dynamic `[product]/page.tsx` | Next.js: static route thắng dynamic. Plan: implement dynamic template trước, delete static xoai-tu-quy sau khi xác nhận render giống hệt. |
| Data hiện tại hardcode trong JSX | Phase 0: extract content to structured source (registry + MD). Đây là gate trước mọi thay đổi routing. |
| Dup content giữa legacy `/kien-thuc/xoai-tu-quy-la-gi` và tương lai có thể scoped version | Hard rule: 1 article = 1 urlPath. Không dual-publish. |
| Global `/kien-thuc` hub rank yếu hơn bài con | OK — hub là discovery page, không cần rank keyword head |
| Phase 0 động vào content source có thể làm hỏng render hiện tại | Unit test / visual regression trước khi deploy |

## Success metrics

- **SEO**: Zero drop GSC impressions/clicks cho các URL legacy trong 4 tuần sau launch
- **Technical**: Thêm loại trái cây mới = 1 entry registry + assets + (optional) content MD. Zero code change cho routing.
- **Performance**: LCP/INP không regress vs baseline hiện tại
- **UX**: Navigation scale gọn tới 10+ sản phẩm mà không redesign

## Next steps

1. **Phase 0** — Scout/extract: xác định content source hiện tại của xoài (JSX hardcoded? MD?), định nghĩa schema registry + article
2. **Phase 1** — Products registry + dynamic `/[product]/page.tsx` template (xoài trước, verify render giống)
3. **Phase 2** — Migrate xoài hardcoded → dynamic, delete `src/app/xoai-tu-quy/page.tsx`
4. **Phase 3** — Dynamic sitemap
5. **Phase 4** — `/san-pham` catalog hub
6. **Phase 5** — Navigation update (dropdown Sản phẩm)
7. **Phase 6** — Homepage seasonal hero rotate + product showcase section
8. **Phase 7** — Dừa Xiêm Bến Tre content + product page (plan riêng)

## Locked decisions

- ✅ Approach C′ (Hybrid Legacy-Preserving)
- ✅ Brand model: unified TraiCayBenTre
- ✅ Homepage: seasonal hero rotate
- ✅ Slug dừa: `/dua-xiem-ben-tre`
- ✅ Catalog hub: `/san-pham` (có)
- ✅ CTA: per-product (pre-filled Zalo message), `/lien-he` shared
- ✅ `/nguon-goc`: giữ URL, rewrite content
- ✅ Content xoài tương lai: `/xoai-tu-quy/kien-thuc/[slug]` (scoped)
- ✅ Product template: dynamic từ registry
- ✅ Scope brainstorm này: chỉ IA/URL structure (launch Dừa Xiêm là plan riêng)
- ✅ **SEO-first: zero redirect legacy URLs**

## Unresolved questions

1. Content source hiện tại của xoài (JSX hardcoded vs MD vs CMS)? → scout ở Phase 0
2. Legacy articles đã có JSON-LD Article schema chưa? → check Phase 0
3. `/xoai-tu-quy/page.tsx` hiện có logic đặc biệt khó template hóa không?
4. Template dynamic có support override riêng (hybrid template) sau khi ra mắt trái thứ 3-4 không? — reserve cho tương lai, chưa cần quyết bây giờ
5. Có đo baseline GSC (impressions/clicks) trước launch để so sánh không? → nên làm
