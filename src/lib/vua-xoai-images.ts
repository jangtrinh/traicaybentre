/* === Real photo registry from vua-xoai folder ===
 * 18 authentic photos from the actual vựa in Thạnh Phú, Bến Tre.
 * Use these for SEO articles, blog posts, and product galleries.
 */

export interface VuaXoaiImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const BASE = "/images/vua-xoai";

export const VUA_XOAI_IMAGES = {
  binhMinhDua: {
    src: `${BASE}/binh-minh-vuon-dua-ben-tre.jpg`,
    alt: "Vườn dừa Bến Tre lúc bình minh — vùng đất giồng cát ven biển nơi trồng xoài Tứ Quý",
    width: 1200,
    height: 900,
  },
  vuaXoaiTongQuan: {
    src: `${BASE}/vua-xoai-tu-quy-thanh-phu.jpg`,
    alt: "Vựa thu mua xoài Tứ Quý Thạnh Phú — hàng tấn xoài xanh chờ đóng gói",
    width: 1200,
    height: 1600,
  },
  xoaiCoCuongLa: {
    src: `${BASE}/xoai-tu-quy-co-cuong-la.jpg`,
    alt: "Xoài Tứ Quý Bến Tre còn cuống lá tươi — hái sáng tại vườn",
    width: 1200,
    height: 1600,
  },
  xoaiPhanLoai: {
    src: `${BASE}/xoai-tu-quy-phan-loai-ro.jpg`,
    alt: "Xoài Tứ Quý Thạnh Phú phân loại tại vựa — đóng rổ giấy báo bảo vệ",
    width: 1200,
    height: 1600,
  },
  vuaThuMua: {
    src: `${BASE}/vua-xoai-thu-mua-moi-ngay.jpg`,
    alt: "Vựa xoài Tứ Quý Thạnh Phú — quy trình thu mua mỗi ngày từ vườn nhà nông",
    width: 1200,
    height: 1600,
  },
  xoaiCanCanh: {
    src: `${BASE}/xoai-tu-quy-can-canh-tuoi.jpg`,
    alt: "Xoài Tứ Quý Bến Tre tươi — lá xanh, da bóng từ vựa Thạnh Phú",
    width: 1200,
    height: 1600,
  },
  nguoiLamVua: {
    src: `${BASE}/nguoi-lam-vua-xoai.jpg`,
    alt: "Người làm vựa xoài Tứ Quý — chân chất, thật như xoài Bến Tre",
    width: 1200,
    height: 1600,
  },
  thungXopDucLo: {
    src: `${BASE}/thung-xop-duc-lo-dong-xoai.jpg`,
    alt: "Thùng xốp đục lỗ chuẩn bị đóng xoài Tứ Quý — chống dập khi ship xa",
    width: 1200,
    height: 900,
  },
  ducLoThuCong: {
    src: `${BASE}/duc-lo-thung-xop-thu-cong.jpg`,
    alt: "Đục lỗ thùng xốp thủ công — quy trình chuẩn bị đóng thùng xoài Tứ Quý",
    width: 1200,
    height: 1600,
  },
  vuaPhanLoaiDaMau: {
    src: `${BASE}/vua-phan-loai-ro-da-mau.jpg`,
    alt: "Vựa xoài Tứ Quý Thạnh Phú — phân loại xoài thành 3 hạng VIP, Loại 1, Loại 2",
    width: 1200,
    height: 900,
  },
  hauTruongVua: {
    src: `${BASE}/hau-truong-vua-xoai.jpg`,
    alt: "Vựa xoài Tứ Quý — không gian thực tế, không trang trí",
    width: 1200,
    height: 900,
  },
  quyTrinhDongThung: {
    src: `${BASE}/quy-trinh-dong-thung-xoai.jpg`,
    alt: "Quy trình chuẩn bị thùng xốp đóng xoài Tứ Quý tại vựa Thạnh Phú",
    width: 1200,
    height: 900,
  },
  vuaHoatDong: {
    src: `${BASE}/vua-xoai-hoat-dong-hang-ngay.jpg`,
    alt: "Vựa xoài Tứ Quý hoạt động hằng ngày tại Thạnh Phú, Bến Tre",
    width: 1200,
    height: 900,
  },
  doiNguPhanLoai: {
    src: `${BASE}/doi-ngu-phan-loai-non-la.jpg`,
    alt: "Đội ngũ phân loại xoài Tứ Quý — 700+ hộ dân Thạnh Phú tham gia",
    width: 1200,
    height: 900,
  },
  phuNuDemXoai: {
    src: `${BASE}/phu-nu-non-la-dem-xoai.jpg`,
    alt: "Phụ nữ nông dân đếm xoài Tứ Quý tại vựa — nét đẹp lao động Bến Tre",
    width: 1200,
    height: 900,
  },
  xoaiVipTayCam1: {
    src: `${BASE}/xoai-tu-quy-vip-tay-cam-1.jpg`,
    alt: "Quả xoài Tứ Quý VIP — kích thước 600-800g, nặng tay, da bóng vàng",
    width: 1200,
    height: 900,
  },
  xoaiVipTayCam2: {
    src: `${BASE}/xoai-tu-quy-vip-tay-cam-2.jpg`,
    alt: "Xoài Tứ Quý VIP cận cảnh — quả to, đầy đặn, vỏ vàng nhạt đặc trưng",
    width: 1200,
    height: 1600,
  },
  dongHangDemGiaDinh: {
    src: `${BASE}/dong-hang-dem-gia-dinh.jpg`,
    alt: "Cả gia đình đóng hàng xoài Tứ Quý ban đêm để kịp giao sáng — vựa Thạnh Phú",
    width: 1200,
    height: 600,
  },
} as const satisfies Record<string, VuaXoaiImage>;
