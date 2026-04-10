/* === Blog post metadata registry === */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  /** Feature image cho card ở /tin-tuc + section TinTuc homepage */
  coverImage: {
    src: string;
    alt: string;
  };
  /** Product slug (defaults to "xoai-tu-quy" if undefined). IA F2 additive. */
  product?: string;
  /** Full URL path (defaults to `/tin-tuc/${slug}` if undefined). IA F2 additive. */
  urlPath?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "7-mon-ngon-tu-xoai-tu-quy",
    title: "7 Món Ngon Từ Xoài Tứ Quý — Gỏi, Sinh Tố, Mứt, Xoài Lắc & Hơn Nữa",
    description:
      "7 cách chế biến xoài Tứ Quý: gỏi, sinh tố, mứt, xoài lắc, xoài dầm, chè dừa, chutney. Công thức chi tiết từ vựa Thạnh Phú.",
    date: "2026-04-09",
    category: "Ẩm thực",
    coverImage: {
      src: "/images/mon-xoai/goi-xoai-tom-thit.jpg",
      alt: "Gỏi xoài Tứ Quý tôm thịt — món ngon dễ làm từ xoài Bến Tre",
    },
  },
  {
    slug: "nguon-goc-xoai-tu-quy-cau-chuyen-1982",
    title: "Nguồn Gốc Xoài Tứ Quý — Câu Chuyện Từ 1982 Đến CDĐL #00124",
    description:
      "Lịch sử xoài Tứ Quý: phát hiện 1982 ở Chợ Lách, lan tới Thạnh Phú với đất giồng cát nhiễm mặn, được cấp CDĐL #00124 năm 2022.",
    date: "2026-04-09",
    category: "Lịch sử",
    coverImage: {
      src: "/images/vua-xoai/binh-minh-vuon-dua-ben-tre.jpg",
      alt: "Vườn dừa Bến Tre lúc bình minh — vùng đất giồng cát ven biển trồng xoài Tứ Quý",
    },
  },
  {
    slug: "bao-gia-xoai-tu-quy-thang-04-2026",
    title: "Báo Giá Xoài Tứ Quý Tháng 4/2026 — Vụ 1 Chất Lượng VIP",
    description:
      "Tổng hợp giá xoài Tứ Quý Bến Tre tháng 4/2026. Vụ 1 đạt chất lượng cao, nguồn cung ổn định.",
    date: "2026-04-09",
    category: "Báo giá",
    coverImage: {
      src: "/images/vua-xoai/xoai-tu-quy-vip-tay-cam-1.jpg",
      alt: "Xoài Tứ Quý VIP — quả 600-800g nặng tay, báo giá vụ 1 tháng 4/2026",
    },
  },
];
