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
    slug: "bao-gia-xoai-tu-quy-thang-04-2026",
    title: "Báo Giá Xoài Tứ Quý Tháng 4/2026 — Vụ 1 Chất Lượng VIP",
    description:
      "Tổng hợp giá xoài Tứ Quý Bến Tre tháng 4/2026. Vụ 1 đạt chất lượng cao, nguồn cung ổn định.",
    date: "2026-04-09",
    category: "Báo giá",
  },
];
