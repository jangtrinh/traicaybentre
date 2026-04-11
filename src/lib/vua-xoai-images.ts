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

/* === Real photos from xoai-thuc-te folder (April 2026) ===
 * 31 authentic photos: product close-ups, orchard operations, packaging.
 */

const BASE_TT = "/images/xoai-thuc-te";

export const XOAI_THUC_TE_IMAGES = {
  // Xoài hoàng kim (chín vàng, rổ tre)
  hoangKimRoTre01: { src: `${BASE_TT}/xoai-hoang-kim-ro-tre-01.jpg`, alt: "Xoài Tứ Quý hoàng kim chín vàng trong rổ tre — ảnh thực tế", width: 1200, height: 1600 },
  hoangKimRoTre02: { src: `${BASE_TT}/xoai-hoang-kim-ro-tre-02.jpg`, alt: "Xoài Tứ Quý hoàng kim rổ tre — góc nhìn khác", width: 1200, height: 900 },
  hoangKimRoTre03: { src: `${BASE_TT}/xoai-hoang-kim-ro-tre-03.jpg`, alt: "Xoài Tứ Quý hoàng kim rổ tre — close-up", width: 1200, height: 1600 },

  // Xoài bổ thịt vàng cam
  boThitVangCam: { src: `${BASE_TT}/xoai-tu-quy-bo-thit-vang-cam.jpg`, alt: "Xoài Tứ Quý bổ ra thịt vàng cam — 3 trái chín mọng tại vựa", width: 1200, height: 1600 },
  chinNauRo: { src: `${BASE_TT}/xoai-tu-quy-chin-nau-ro.jpg`, alt: "Xoài Tứ Quý chín nâu vàng trong rổ — trái chín tự nhiên", width: 1200, height: 900 },
  boThitVangTayCam: { src: `${BASE_TT}/xoai-tu-quy-bo-thit-vang-tay-cam.jpg`, alt: "Xoài Tứ Quý bổ thịt vàng — tay cầm tại vựa", width: 1200, height: 900 },

  // Xoài VIP tay cầm
  vipTraiToCanNang: { src: `${BASE_TT}/xoai-tu-quy-vip-trai-to-can-nang.jpg`, alt: "Xoài Tứ Quý VIP trái to cân nặng trên cân tiểu ly", width: 1200, height: 1600 },
  vipTayCamVua: { src: `${BASE_TT}/xoai-tu-quy-vip-tay-cam-vua.jpg`, alt: "Xoài Tứ Quý VIP — tay cầm tại vựa, nền sọt vàng", width: 1200, height: 1600 },
  vipXanhTayCam: { src: `${BASE_TT}/xoai-tu-quy-vip-xanh-tay-cam.jpg`, alt: "Xoài Tứ Quý VIP xanh — trái to, tay cầm tại vựa", width: 1200, height: 1600 },
  vipCuongLaTayCam: { src: `${BASE_TT}/xoai-tu-quy-vip-cuong-la-tay-cam.jpg`, alt: "Xoài Tứ Quý VIP còn cuống lá — tay cầm, nền vựa", width: 1200, height: 1600 },
  vipCuongLaTayCam02: { src: `${BASE_TT}/xoai-tu-quy-vip-cuong-la-tay-cam-02.jpg`, alt: "Xoài Tứ Quý VIP còn cuống lá — góc khác", width: 1200, height: 1600 },
  vipTraiLonTayCam: { src: `${BASE_TT}/xoai-tu-quy-vip-trai-lon-tay-cam.jpg`, alt: "Xoài Tứ Quý VIP trái lớn — tay cầm buổi chiều tại vựa", width: 1200, height: 1600 },

  // Xoài trong sọt/thùng
  thungXopLoai1: { src: `${BASE_TT}/xoai-tu-quy-thung-xop-loai-1.jpg`, alt: "Xoài Tứ Quý Loại 1 trong thùng xốp — sẵn sàng giao", width: 1200, height: 1600 },
  sotNhuaXanh: { src: `${BASE_TT}/xoai-tu-quy-sot-nhua-xanh.jpg`, alt: "Xoài Tứ Quý xanh trong sọt nhựa xanh — mới hái từ vườn", width: 1200, height: 900 },
  sotNhuaXanhDay: { src: `${BASE_TT}/xoai-tu-quy-sot-nhua-xanh-day.jpg`, alt: "Xoài Tứ Quý đầy sọt nhựa xanh — nhìn từ trên", width: 1200, height: 900 },
  sotXanhNhieuRo: { src: `${BASE_TT}/xoai-tu-quy-sot-xanh-nhieu-ro.jpg`, alt: "Nhiều rổ xoài Tứ Quý xanh xếp hàng — sọt xanh tại vựa", width: 1200, height: 1600 },
  sotXanhCanCanh: { src: `${BASE_TT}/xoai-tu-quy-sot-xanh-can-canh.jpg`, alt: "Xoài Tứ Quý sọt xanh cận cảnh — trái to đều", width: 1200, height: 1600 },

  // Xoài bọc lưới foam
  bocLuoiFoam01: { src: `${BASE_TT}/xoai-tu-quy-boc-luoi-foam-01.jpg`, alt: "Xoài Tứ Quý bọc lưới foam trắng — đóng gói VIP", width: 1200, height: 1600 },
  bocLuoiFoam02: { src: `${BASE_TT}/xoai-tu-quy-boc-luoi-foam-02.jpg`, alt: "Xoài Tứ Quý bọc lưới foam — có vết nâu nhẹ", width: 1200, height: 1600 },
  bocLuoiFoam03: { src: `${BASE_TT}/xoai-tu-quy-boc-luoi-foam-03.jpg`, alt: "Xoài Tứ Quý bọc lưới foam xanh — trái nhỏ gọn", width: 1200, height: 1600 },
  bocLuoiFoamLa: { src: `${BASE_TT}/xoai-tu-quy-boc-luoi-foam-la.jpg`, alt: "Xoài Tứ Quý bọc lưới foam — còn lá xanh", width: 1200, height: 1600 },
  bocLuoiFoam05: { src: `${BASE_TT}/xoai-tu-quy-boc-luoi-foam-05.jpg`, alt: "Xoài Tứ Quý bọc lưới foam — nền vựa hoạt động", width: 1200, height: 1600 },

  // Vựa hoạt động ban ngày
  vuaBanNgay01: { src: `${BASE_TT}/vua-xoai-hoat-dong-ban-ngay-01.jpg`, alt: "Vựa xoài Thạnh Phú hoạt động ban ngày — toàn cảnh", width: 1200, height: 1600 },
  vuaBanNgay02: { src: `${BASE_TT}/vua-xoai-hoat-dong-ban-ngay-02.jpg`, alt: "Vựa xoài Thạnh Phú ban ngày — góc khác", width: 1200, height: 900 },
  vuaPhanLoaiNgoaiTroi: { src: `${BASE_TT}/vua-xoai-phan-loai-ngoai-troi.jpg`, alt: "Đội ngũ vựa phân loại xoài ngoài trời — sọt xanh vàng", width: 1200, height: 900 },
  vuaDongThungXop: { src: `${BASE_TT}/vua-xoai-dong-thung-xop-ban-ngay.jpg`, alt: "Đội ngũ đóng thùng xốp xoài — chuẩn bị giao hàng", width: 1200, height: 1600 },
  vuaPhanLoaiNhieuRo: { src: `${BASE_TT}/vua-xoai-phan-loai-nhieu-ro.jpg`, alt: "Vựa xoài Thạnh Phú — phân loại hàng chục rổ xoài", width: 1200, height: 1600 },

  // Vựa hoạt động ban đêm
  vuaBanDem01: { src: `${BASE_TT}/vua-xoai-hoat-dong-ban-dem-01.jpg`, alt: "Vựa xoài Thạnh Phú hoạt động ban đêm — đèn sáng", width: 1200, height: 1600 },
  vuaBanDem02: { src: `${BASE_TT}/vua-xoai-hoat-dong-ban-dem-02.jpg`, alt: "Vựa xoài ban đêm — toàn cảnh hoạt động", width: 1200, height: 900 },
  vuaBanDemKhachMua: { src: `${BASE_TT}/vua-xoai-ban-dem-khach-mua.jpg`, alt: "Vựa xoài ban đêm — khách mua sỉ chọn hàng", width: 1200, height: 1600 },
  vuaBanDemPhuNuMua: { src: `${BASE_TT}/vua-xoai-ban-dem-phu-nu-mua.jpg`, alt: "Vựa xoài ban đêm — phụ nữ mua hàng, rổ xoài đầy", width: 1200, height: 1600 },
} as const satisfies Record<string, VuaXoaiImage>;
