/* === Knowledge hub article registry ===
 * Edit this file to add a new /kien-thuc article. Order matters: pillar pages first.
 */

export interface KnowledgeArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
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
  {
    slug: "mua-vu-xoai-tu-quy-3-vu-nam",
    title: "Mùa Vụ Xoài Tứ Quý — 3 Vụ/Năm + Bảng Giá Theo Tháng",
    description:
      "Lịch mùa vụ xoài Tứ Quý: vụ 1 (T2-4), vụ 2 (T7-8), vụ 3 (T11-1, vụ Tết). Bảng giá theo tháng + mẹo mua sỉ.",
    date: "2026-04-09",
    category: "Mùa vụ",
  },
  {
    slug: "cach-bao-quan-lam-chin-xoai-tu-quy",
    title: "Cách Bảo Quản & Làm Chín Xoài Tứ Quý Tại Nhà",
    description:
      "Hướng dẫn bảo quản xoài Tứ Quý 7-14 ngày, 5 cách làm chín nhanh, tránh sai lầm thường gặp.",
    date: "2026-04-09",
    category: "Hướng dẫn",
  },
];
