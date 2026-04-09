/* === Blog post metadata registry === */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "7-mon-ngon-tu-xoai-tu-quy",
    title: "7 Món Ngon Từ Xoài Tứ Quý — Gỏi, Sinh Tố, Mứt, Xoài Lắc & Hơn Nữa",
    description:
      "7 cách chế biến xoài Tứ Quý: gỏi, sinh tố, mứt, xoài lắc, xoài dầm, chè dừa, chutney. Công thức chi tiết từ vựa Thạnh Phú.",
    date: "2026-04-09",
    category: "Ẩm thực",
  },
  {
    slug: "nguon-goc-xoai-tu-quy-cau-chuyen-1982",
    title: "Nguồn Gốc Xoài Tứ Quý — Câu Chuyện Từ 1982 Đến CDĐL #00124",
    description:
      "Lịch sử xoài Tứ Quý: phát hiện 1982 ở Chợ Lách, lan tới Thạnh Phú với đất giồng cát nhiễm mặn, được cấp CDĐL #00124 năm 2022.",
    date: "2026-04-09",
    category: "Lịch sử",
  },
  {
    slug: "bao-gia-xoai-tu-quy-thang-04-2026",
    title: "Báo Giá Xoài Tứ Quý Tháng 4/2026 — Vụ 1 Chất Lượng VIP",
    description:
      "Tổng hợp giá xoài Tứ Quý Bến Tre tháng 4/2026. Vụ 1 đạt chất lượng cao, nguồn cung ổn định.",
    date: "2026-04-09",
    category: "Báo giá",
  },
];
