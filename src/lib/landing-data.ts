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
    harvestDate: "02/04",
    priceSi: "23.000–25.000",
    priceLe: "",
    savings: "",
    weight: "600–800g+/trái",
    moq: "20kg (1 thùng)",
    desc: "Trái đẹp không tì vết, da mịn, size lớn từ 600g trở lên. Dành cho quà tặng, nhà hàng cao cấp, khách hàng VIP.",
    badge: "VIP",
    badgeColor: "bg-purple-600",
    stock: "~500kg",
    stockUntil: "05/04",
    tags: ["Không tì vết", "Trái lớn 600g+", "Quà tặng"],
    image: "/images/xoai-real-2.jpg",
    sticker: "/images/vip.png",
  },
  {
    id: 2,
    name: "Xoài Tứ Quý — Loại 1",
    farm: "Vườn ông Ba, Thạnh Phú",
    harvestDate: "02/04",
    priceSi: "20.000–22.000",
    priceLe: "",
    savings: "",
    weight: "600–800g+/trái",
    moq: "20kg (1 thùng)",
    desc: "Trái to như VIP, có 1 mặt xấu nhẹ (vết nắng, trầy nhẹ) nhưng không ảnh hưởng chất lượng. Ngọt đậm, vị mặn đặc trưng.",
    badge: "Bán chạy #1",
    badgeColor: "bg-red-600",
    stock: "~2.2 tấn",
    stockUntil: "05/04",
    tags: ["Ngọt đậm", "Trái to", "Vị mặn đặc trưng"],
    image: "/images/xoai-real-3.jpg",
    sticker: "/images/loai-1.png",
  },
  {
    id: 3,
    name: "Xoài Tứ Quý — Loại 2",
    farm: "Vườn chú Tám, Ba Tri",
    harvestDate: "01/04",
    priceSi: "16.000–18.000",
    priceLe: "",
    savings: "",
    weight: "400–600g/trái",
    moq: "20kg (1 thùng)",
    desc: "Trái nhỏ hơn, visual không đều — nhưng chất lượng vẫn ngon như VIP. Lý tưởng cho tiểu thương bán lẻ, làm gỏi, xoài lắc.",
    badge: "Giá tốt",
    badgeColor: "bg-green-700",
    stock: "~3 tấn",
    stockUntil: "07/04",
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
    q: "Ship xa như vậy xoài có bị dập không?",
    a: "Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm + đá khô. 3 năm giao hàng Bắc, tỷ lệ lỗi dưới 2%. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau, không cần gửi trả.",
  },
  {
    q: "Sao biết là xoài Bến Tre thật chứ không phải nơi khác?",
    a: 'Mỗi thùng có QR truy xuất nguồn gốc: tên vườn, ngày hái, người thu hoạch. Sản phẩm thuộc vùng Chỉ dẫn địa lý "Bến Tre" do Cục SHTT cấp năm 2022 — giả là vi phạm pháp luật.',
  },
  {
    q: "Tôi đang có mối rồi, sao phải đổi?",
    a: "Không cần đổi ngay. Đặt 1 thùng 20kg, so sánh với mối hiện tại. Phí ship được báo trước, mọi chi phí minh bạch.",
  },
  {
    q: "Giá sỉ có ổn định không?",
    a: "Giá dao động theo thị trường, cập nhật mỗi sáng trên web và Zalo OA. Sau khi chốt đơn, cam kết giữ giá 7 ngày — không tăng giữa chừng.",
  },
  {
    q: "Thanh toán và hóa đơn?",
    a: "COD khi nhận hàng hoặc chuyển khoản trước. Có sổ công nợ cho đối tác quen (sau 3 đơn). Xuất hóa đơn VAT đầy đủ cho nhà hàng, doanh nghiệp.",
  },
  {
    q: "Xoài Tứ Quý ăn chín hay xanh ngon hơn?",
    a: "Người miền Bắc thường thích ăn chín — ngọt đậm, thơm hắc, vị mặn nhẹ. Người miền Nam thích ăn xanh — giòn sần sật, chua thanh. Chúng tôi cung cấp cả hai, ghi rõ khi đặt hàng.",
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

/* Current month index (0-based) */
export const CURRENT_MONTH = 3;
