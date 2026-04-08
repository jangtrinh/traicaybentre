/* === Landing page static data === */

export interface Product {
  id: number;
  name: string;
  farm: string;
  harvestDate: string;
  priceSi: string;
  priceLe: string;
  savings: string;
  weight: string;
  moq: string;
  desc: string;
  badge: string;
  badgeColor: string;
  stock: string;
  stockUntil: string;
  tags: string[];
  image: string;
  sticker: string;
  unit?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Xoài Tứ Quý — VIP",
    farm: "Vườn ông Ba, Thạnh Phú",
    harvestDate: "",
    priceSi: "23.000–25.000",
    priceLe: "",
    savings: "",
    weight: "600–800g+/trái",
    moq: "20kg (1 thùng)",
    desc: "Trái đẹp không tì vết, da mịn, size lớn từ 600g trở lên. Dành cho quà tặng, nhà hàng cao cấp, khách hàng VIP.",
    badge: "VIP",
    badgeColor: "bg-purple-600",
    stock: "~500kg",
    stockUntil: "",
    tags: ["Không tì vết", "Trái lớn 600g+", "Quà tặng"],
    image: "/images/xoai-real-2.jpg",
    sticker: "/images/vip.png",
  },
  {
    id: 2,
    name: "Xoài Tứ Quý — Loại 1",
    farm: "Vườn ông Ba, Thạnh Phú",
    harvestDate: "",
    priceSi: "20.000–22.000",
    priceLe: "",
    savings: "",
    weight: "600–800g+/trái",
    moq: "20kg (1 thùng)",
    desc: "Trái to như VIP, có 1 mặt xấu nhẹ (vết nắng, trầy nhẹ) nhưng không ảnh hưởng chất lượng. Ngọt đậm, vị mặn đặc trưng.",
    badge: "Bán chạy #1",
    badgeColor: "bg-red-600",
    stock: "~2.2 tấn",
    stockUntil: "",
    tags: ["Ngọt đậm", "Trái to", "Vị mặn đặc trưng"],
    image: "/images/xoai-real-3.jpg",
    sticker: "/images/loai-1.png",
  },
  {
    id: 3,
    name: "Xoài Tứ Quý — Loại 2",
    farm: "Vườn chú Tám, Ba Tri",
    harvestDate: "",
    priceSi: "16.000–18.000",
    priceLe: "",
    savings: "",
    weight: "400–600g/trái",
    moq: "20kg (1 thùng)",
    desc: "Trái nhỏ hơn, visual không đều — nhưng chất lượng vẫn ngon như VIP. Lý tưởng cho tiểu thương bán lẻ, làm gỏi, xoài lắc.",
    badge: "Giá tốt",
    badgeColor: "bg-green-700",
    stock: "~3 tấn",
    stockUntil: "",
    tags: ["Giá tốt nhất", "Chất lượng ngon", "Làm gỏi"],
    image: "/images/xoai-real-5.jpg",
    sticker: "/images/loai-2.png",
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Đất cát ven biển",
    desc: "Vùng giồng cát nhiễm mặn Thạnh Phú — tạo vị mặn nhẹ không đâu có. Đã được cấp Chỉ dẫn địa lý.",
  },
  {
    num: "02",
    title: "Bao trái từ nhỏ",
    desc: "Mỗi trái bao túi vải riêng từ khi bằng ngón tay — đẹp mã, không sâu bệnh, chín đều.",
  },
  {
    num: "03",
    title: "Đóng thùng linh hoạt",
    desc: "Tuỳ nhu cầu bạn hàng — thùng carton, thùng xốp, bao lưới, hay quy cách riêng đều được. Cân dư 2% bù hao.",
  },
  {
    num: "04",
    title: "Vận chuyển tuỳ chọn",
    desc: "Xe lạnh, xe thường, hay gửi bay — tuỳ nhu cầu và ngân sách. BT→HN: ~2 ngày · BT→Vinh: 1.5 ngày. Giao tận chợ hoặc tận nhà.",
  },
];

export const TESTIMONIALS = [
  {
    text: "Lấy 3 đợt rồi, hàng đều hơn mối cũ, size không lẫn. Sạp tôi tuần nào cũng hết trước 2 ngày.",
    name: "Chị Lan",
    detail: "Sạp 23, chợ Vinh, Nghệ An",
    since: "Khách từ 08/2025",
  },
  {
    text: "Khách Hà Nội sành ăn lắm, xoài Úc xoài Đài họ chê — nhưng xoài Tứ Quý Bến Tre thì hết veo. Vị mặn nhẹ cuối lưỡi khác hẳn.",
    name: "Anh Toàn",
    detail: "Chuỗi 3 cửa hàng trái cây, Cầu Giấy, Hà Nội",
    since: "Khách từ 03/2025",
  },
  {
    text: "Đặt combo hộp quà tặng đối tác dịp Tết, ai cũng hỏi mua ở đâu. Đóng gói đẹp, xoài thơm, giao đúng hẹn.",
    name: "Chị Hương",
    detail: "Giám đốc công ty XNK, Thanh Xuân, Hà Nội",
    since: "Khách từ 12/2025",
  },
  {
    text: "Tôi so sánh 3 mối rồi mới chốt. Ở đây cân dư 2%, hàng lỗi thì bồi đơn sau không cần gửi trả. Làm ăn thẳng thắn.",
    name: "Anh Hùng",
    detail: "Tiểu thương chợ Phủ, Thanh Hóa",
    since: "Khách từ 06/2025",
  },
];

export const FAQS = [
  {
    q: "Xoài Tứ Quý là gì?",
    a: "Xoài Tứ Quý là giống xoài đặc sản Bến Tre, cho trái quanh năm (3 vụ/năm). Trồng trên đất giồng cát ven biển nhiễm mặn tại Thạnh Phú, tạo ra vị mặn nhẹ cuối lưỡi — đặc điểm không thể tái tạo ở vùng khác. Đã được cấp Chỉ dẫn địa lý CDĐL #00124 bởi Cục Sở hữu trí tuệ năm 2022.",
  },
  {
    q: "Giá xoài Tứ Quý Bến Tre bao nhiêu?",
    a: "Giá dao động theo ngày: VIP 23.000–25.000đ/kg, Loại 1 20.000–22.000đ/kg, Loại 2 16.000–18.000đ/kg. Gọi vựa 0932 585 533 (A Phúc) để có giá chính xác trong ngày. Giá cập nhật mỗi sáng.",
  },
  {
    q: "Ship xa xoài có bị dập không?",
    a: "Không. Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm. Tỷ lệ lỗi dưới 2% sau 3 năm giao hàng ra Bắc. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau.",
  },
  {
    q: "Sao biết là xoài Bến Tre thật?",
    a: "Mỗi thùng có QR truy xuất nguồn gốc: tên vườn, ngày hái, người thu hoạch. Sản phẩm thuộc vùng Chỉ dẫn địa lý \"Bến Tre\" do Cục SHTT cấp 2022. Sử dụng tên gọi này cho xoài vùng khác là vi phạm pháp luật.",
  },
  {
    q: "Xoài Tứ Quý ăn chín hay xanh ngon hơn?",
    a: "Cả hai đều ngon, tuỳ khẩu vị. Miền Bắc thích ăn chín — ngọt đậm, thơm hắc, vị mặn nhẹ. Miền Nam thích ăn xanh — giòn sần sật, chua thanh. Vựa cung cấp cả hai loại.",
  },
  {
    q: "Mua xoài sỉ Bến Tre cần bao nhiêu?",
    a: "Tối thiểu 1 thùng 20kg. Đóng thùng linh hoạt theo yêu cầu — carton, xốp, bao lưới đều được. Phí ship báo trước tuỳ tuyến. Gọi 0932 585 533 để báo giá.",
  },
  {
    q: "Thanh toán và hóa đơn?",
    a: "COD khi nhận hàng hoặc chuyển khoản trước. Có sổ công nợ cho đối tác quen (sau 3 đơn). Xuất hóa đơn VAT đầy đủ cho nhà hàng, doanh nghiệp.",
  },
  {
    q: "Mùa xoài Tứ Quý khi nào?",
    a: "Xoài Tứ Quý cho trái quanh năm, 3 vụ chính: Vụ 1 tháng 4 (âm lịch), Vụ 2 tháng 8, Vụ 3 tháng 12 (vụ Tết). Xoài xanh có quanh năm. Nguồn cung ổn định, không sợ đứt hàng.",
  },
];

export const CALENDAR = [
  {
    name: "Xoài Tứ Quý (chín vụ 1)",
    months: [0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0],
  },
  {
    name: "Xoài Tứ Quý (chín vụ 2)",
    months: [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0],
  },
  {
    name: "Xoài Tứ Quý (vụ 3 + Tết)",
    months: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
  },
  {
    name: "Xoài xanh (quanh năm)",
    months: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
];

export const MONTH_LABELS = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "T11",
  "T12",
];

/* Current month index (0-based) — auto-updates */
export const CURRENT_MONTH = new Date().getMonth();
