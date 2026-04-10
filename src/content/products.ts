/**
 * Products registry — single source of truth for all fruits carried by vựa.
 *
 * Add a new fruit:
 *   1. Add an entry below with real asset paths + copy
 *   2. Drop hero image into `/public/images/`
 *   3. Optional: set `status: "coming-soon"` until ready to route
 *   4. Run typecheck — no route code changes needed
 *
 * Type named `ProductEntry` to avoid collision with `src/lib/landing-data.ts`
 * `Product` interface (different shape — that one represents catalog cards with
 * live pricing, this one represents the fruit identity itself).
 */

export type ProductSeason = number[] | "year-round";

export type ProductEntry = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  heroImage: string;
  heroImageAlt: string;
  season: ProductSeason;
  status: "active" | "coming-soon";
  order: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    /** Override for og:title if different from seo.title */
    ogTitle?: string;
    /** Override for og:description if different from seo.description */
    ogDescription?: string;
  };
  cta: {
    zaloMessage: string;
  };
};

/**
 * Reserved URL segments — `[product]` dynamic route MUST NOT match these.
 * Enforced by `isReservedPath` helper in `src/lib/products.ts`.
 */
export const RESERVED_PATHS = [
  "api",
  "kien-thuc",
  "tin-tuc",
  "nguon-goc",
  "giao-hang",
  "san-pham",
  "lien-he",
  "sitemap.xml",
  "robots.txt",
  "favicon.ico",
  "_next",
  "images",
  "fonts",
  "public",
] as const;

export const products: Record<string, ProductEntry> = {
  "xoai-tu-quy": {
    slug: "xoai-tu-quy",
    name: "Xoài Tứ Quý Thạnh Phú",
    shortName: "Xoài Tứ Quý",
    tagline: "Xoài đặc sản Bến Tre — vị mặn độc đáo, CDĐL #00124",
    heroImage: "/images/xoai-real-2.jpg",
    heroImageAlt: "Xoài Tứ Quý Thạnh Phú Bến Tre — tay cầm quả lớn tại vựa",
    season: [4, 5, 6, 7, 8],
    status: "active",
    order: 1,
    seo: {
      // PRESERVE exact static page metadata for SEO safety (F11 SEO-first)
      title: "Mua Xoài Tứ Quý Bến Tre — Giá Hôm Nay, Giao Toàn Quốc | CDĐL #00124",
      description:
        "Xoài Tứ Quý Thạnh Phú trực tiếp từ vựa. VIP 23.000đ/kg, Loại 1 20.000đ/kg — cập nhật mỗi sáng. CDĐL #00124. Giao lạnh 24h TP.HCM, 48h Hà Nội.",
      keywords: [
        "mua xoài tứ quý online",
        "xoài tứ quý bến tre",
        "xoài tứ quý giá bao nhiêu",
        "giá xoài tứ quý hôm nay",
        "giá xoài bến tre",
        "bảng giá xoài tứ quý",
        "đặt xoài tứ quý",
        "xoài tứ quý ship toàn quốc",
        "xoài sỉ thạnh phú",
      ],
      ogTitle: "Mua Xoài Tứ Quý Bến Tre — Giá Trực Tiếp Từ Vựa",
      ogDescription:
        "Vị mặn nhẹ không đâu có. CDĐL #00124. Giá cập nhật mỗi sáng. Giao lạnh toàn quốc.",
    },
    cta: {
      zaloMessage: "Mình muốn đặt Xoài Tứ Quý Thạnh Phú",
    },
  },
  "dua-xiem-ben-tre": {
    slug: "dua-xiem-ben-tre",
    name: "Dừa Xiêm Bến Tre",
    shortName: "Dừa Xiêm",
    tagline: "Dừa sọ gọt sẵn — nước ngọt thanh, uống là ghiền",
    heroImage: "/images/gdrive/Dua/dua-xiem-so-goc-goi-san-hang-loat.jpg",
    heroImageAlt: "Dừa Xiêm Bến Tre — dừa sọ gọt sẵn xếp hàng tại vựa Thạnh Phú",
    season: "year-round",
    status: "active",
    order: 2,
    seo: {
      title: "Dừa Xiêm Bến Tre (Dừa Sọ) — Gọt Sẵn, Nước Ngọt, Giao Toàn Quốc",
      description:
        "Dừa Xiêm Bến Tre dạng dừa sọ gọt sẵn từ vựa Thạnh Phú. Nước ngọt thanh, uống liền, đóng gói đẹp, giao lạnh toàn quốc. Đặt sỉ tận vựa.",
      keywords: [
        "dừa xiêm bến tre",
        "dừa sọ",
        "dừa xiêm gọt sẵn",
        "mua dừa xiêm online",
        "dừa sọ bến tre",
        "dừa xiêm giao toàn quốc",
        "dừa xiêm thạnh phú",
      ],
      ogTitle: "Dừa Xiêm Bến Tre — Dừa Sọ Gọt Sẵn Từ Vựa",
      ogDescription:
        "Dừa sọ Bến Tre gọt sẵn, nước ngọt thanh, đóng gói premium. Giao lạnh toàn quốc từ vựa Thạnh Phú.",
    },
    cta: {
      zaloMessage: "Mình muốn đặt Dừa Xiêm Bến Tre (dừa sọ)",
    },
  },
};
