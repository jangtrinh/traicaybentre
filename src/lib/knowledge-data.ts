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
  // Phase 04: Register 4 orphan kien-thuc articles (existed in MDX but missing from hub)
  {
    // KW #8: "cách chọn xoài tứ quý ngon" — 7 impr, pos 7.14 (GSC), 0% CTR
    // Action: register + add inbound link from xoai-tu-quy product page
    slug: "cach-chon-xoai-tu-quy-ngon",
    title: "Cách Chọn Xoài Tứ Quý Ngon: 7 Mẹo Vựa Truyền 20 Năm",
    description:
      "7 mẹo chọn xoài tứ quý ngon từ vựa: ấn nhẹ mềm đàn hồi, vỏ vàng cam đều, mùi thơm sâu, không vết thâm. 4 dấu hiệu cần tránh.",
    date: "2026-04-30",
    category: "Hướng dẫn chọn hàng",
    product: "xoai-tu-quy",
    urlPath: "/xoai-tu-quy/kien-thuc/cach-chon-xoai-tu-quy-ngon",
  },
  {
    // KW #10: "xoài bao tử là giống xoài gì" — 5 impr, 0% CTR (GSC)
    // Action: register + title already within 50-60 char spec (55 chars)
    slug: "xoai-bao-tu-ngam-cong-thuc-cach-chon",
    title: "Xoài Bao Tử Ngâm — Công Thức Chuẩn + Cách Chọn Xoài Non",
    description:
      "Xoài bao tử = trái non tỉa đi (50-80g), không phải giống riêng. Công thức ngâm giòn chua ngọt: 500g + đường + muối + ớt. Vựa Bến Tre.",
    date: "2026-04-18",
    category: "Định nghĩa + Công thức",
    product: "xoai-tu-quy",
    urlPath: "/xoai-tu-quy/kien-thuc/xoai-bao-tu-ngam-cong-thuc-cach-chon",
  },
  {
    // KW #6: "xoài hoàng kim là gì" — JA only 27 impr (GSC), VI route auto-routes via MDX
    // Action: register with cross-product urlPath for hub discoverability
    slug: "xoai-hoang-kim-la-gi-khac-tu-quy-thuong",
    title: "Xoài Hoàng Kim Là Gì? Premium Tứ Quý Da Vàng Kim 800g-1.5kg",
    description:
      "Xoài Hoàng Kim = premium Tứ Quý: da vàng kim, ngọt lịm không xơ, trái 800g-1.5kg, giá 35-45k/kg. Hiếm, đặt sớm vựa Phúc Giang.",
    date: "2026-04-11",
    category: "Đặc sản khác",
    product: "xoai-hoang-kim",
    urlPath: "/xoai-hoang-kim/kien-thuc/xoai-hoang-kim-la-gi-khac-tu-quy-thuong",
  },
  {
    // KW #9: "dừa sọ là gì" — JA only 14 impr (GSC), VI route auto-routes via MDX
    // Action: register with cross-product urlPath for hub discoverability
    slug: "dua-so-la-gi-khac-dua-xiem-nguyen-trai",
    title: "Dừa Sọ Là Gì? Khác Dừa Xiêm Nguyên Trái — Vựa Bến Tre",
    description:
      "Dừa sọ = dừa xiêm xanh gọt sạch vỏ, chỉ còn sọ trắng + nước. Mở nắp uống liền, gọn nhẹ 500-700g, dễ ship. Bền 5-7 ngày. Vựa Thạnh Phú.",
    date: "2026-04-11",
    category: "Định nghĩa",
    product: "dua-xiem-ben-tre",
    urlPath: "/dua-xiem-ben-tre/kien-thuc/dua-so-la-gi-khac-dua-xiem-nguyen-trai",
  },
];
