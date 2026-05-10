/* === Knowledge hub article registry ===
 * Edit this file to add a new /kien-thuc article. Order matters: pillar pages first.
 */

export interface KnowledgeArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  /** Product slug (defaults to "xoai-tu-quy" if undefined). IA F2 additive. */
  product?: string;
  /** Full URL path (defaults to `/kien-thuc/${slug}` if undefined). IA F2 additive. */
  urlPath?: string;
}

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    slug: "xoai-tu-quy-la-gi",
    title: "Xoài Tứ Quý Là Gì? — Đặc Điểm, Mùa Vụ, Giá",
    description:
      "Hướng dẫn đầy đủ về xoài Tứ Quý: định nghĩa, đặc điểm, terroir, 3 vụ/năm, phân loại, CDĐL #00124, cách chọn xoài ngon.",
    date: "2026-04-09",
    category: "Pillar",
  },
  {
    slug: "chi-dan-dia-ly-cd-dl-00124",
    title: "Chỉ Dẫn Địa Lý CDĐL #00124 — Bảo Hộ Pháp Lý",
    description:
      "CDĐL #00124 cấp 10/11/2022 bởi Cục SHTT bảo hộ tên 'Xoài Tứ Quý Bến Tre' cho 3 huyện Thạnh Phú, Ba Tri, Bình Đại.",
    date: "2026-04-09",
    category: "Pháp lý",
  },
  {
    slug: "xoai-tu-quy-vs-xoai-cat-hoa-loc",
    title: "Xoài Tứ Quý vs Xoài Cát Hòa Lộc — So Sánh Chi Tiết",
    description:
      "So sánh chi tiết 2 giống xoài đặc sản miền Tây: vị, mùa vụ, giá, vùng trồng, bảo quản, mục đích sử dụng.",
    date: "2026-04-09",
    category: "So sánh",
  },
  {
    slug: "vung-trong-xoai-mien-tay",
    title: "Vùng Trồng Xoài Miền Tây — Bến Tre, Tiền Giang, Vĩnh Long, Trà Vinh",
    description:
      "Bản đồ vùng trồng xoài miền Tây: Bến Tre (Tứ Quý CDĐL #00124), Tiền Giang (Cát Hòa Lộc), Vĩnh Long, Trà Vinh.",
    date: "2026-04-09",
    category: "Vùng trồng",
  },
  // mua-vu-xoai-tu-quy-3-vu-nam: migrated to MDX 09/05/2026 → 301 redirect in next.config.ts
  // cach-bao-quan-lam-chin-xoai-tu-quy: migrated to MDX cach-bao-quan-xoai-tu-quy 09/05/2026 → 301 redirect
  {
    // Register orphan MDX (was 174 impr, top-impression page on site, missing from registry)
    // Targets KW "xoài tứ quý mùa nào ngon nhất" (60 impr GSC)
    slug: "xoai-tu-quy-may-vu-mot-nam",
    title: "Xoài Tứ Quý Mấy Vụ Một Năm? Lịch Vụ + Mẹo Mua Sỉ Bến Tre",
    description:
      "Xoài Tứ Quý: 3 vụ chính/năm (T4-6, T8-9, T11-12). Giá 16k–25k/kg. Mẹo mua sỉ chi tiết.",
    date: "2026-04-19",
    category: "Mùa vụ",
    product: "xoai-tu-quy",
    urlPath: "/xoai-tu-quy/kien-thuc/xoai-tu-quy-may-vu-mot-nam",
  },
];
