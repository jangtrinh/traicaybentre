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
    desc: "Trái đẹp nhất vựa — da mịn, không trầy, mỗi trái 600g trở lên. Dân làm quà Tết, nhà hàng, khách sộp lấy loại này.",
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
    desc: "To y loại VIP, chỉ có 1 mặt bị nắng ăn hoặc trầy nhẹ — ăn vô ngon y vậy. Ngọt đậm, mặn nhẹ cuối lưỡi. Sạp nào bán cũng chạy.",
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
    desc: "Trái nhỏ hơn, nhìn không đều tay — ngon y như VIP. Lấy bán lẻ, làm gỏi, xoài lắc là hết sảy.",
    badge: "Giá tốt",
    badgeColor: "bg-green-700",
    stock: "~3 tấn",
    stockUntil: "",
    tags: ["Giá tốt nhất", "Chất lượng ngon", "Làm gỏi"],
    image: "/images/xoai-real-5.jpg",
    sticker: "/images/loai-2.png",
  },
  {
    id: 4,
    name: "Dừa Xiêm — Sỉ",
    farm: "Nhà vườn Thạnh Phú",
    harvestDate: "",
    priceSi: "8.000–10.000",
    priceLe: "",
    savings: "",
    weight: "500–700g/trái (sọ)",
    moq: "50 trái",
    desc: "Dừa sọ gọt sẵn, nước ngọt thanh, mở nắp uống liền. Đóng túi lưới, ship lạnh toàn quốc. Quanh năm có hàng.",
    badge: "Mới",
    badgeColor: "bg-blue-600",
    stock: "Quanh năm",
    stockUntil: "",
    tags: ["Nước ngọt", "Gọt sẵn", "Quanh năm"],
    image: "/images/gdrive/Dua/dua-xiem-so-goc-goi-san-hang-loat.jpg",
    sticker: "/images/loai-1.png",
    unit: "trái",
  },
  {
    id: 5,
    name: "Dừa Xiêm — Lẻ",
    farm: "Nhà vườn Thạnh Phú",
    harvestDate: "",
    priceSi: "15.000–18.000",
    priceLe: "",
    savings: "",
    weight: "500–700g/trái (sọ)",
    moq: "10 trái",
    desc: "Dừa sọ gọt sẵn đóng gói hút chân không. Nước ngọt tự nhiên từ Bến Tre. Lẻ từ 10 trái — phù hợp gia đình, quán nước.",
    badge: "Lẻ",
    badgeColor: "bg-teal-600",
    stock: "Quanh năm",
    stockUntil: "",
    tags: ["Hút chân không", "Nước ngọt", "Gọt sẵn"],
    image: "/images/gdrive/Dua/dua-xiem-so-goi-hut-chan-khong-premium.jpg",
    sticker: "/images/loai-2.png",
    unit: "trái",
  },
  {
    id: 6,
    name: "Dừa Xiêm — Rau Câu Dừa",
    farm: "Nhà vườn Thạnh Phú",
    harvestDate: "",
    priceSi: "18.000–22.000",
    priceLe: "",
    savings: "",
    weight: "500–700g/trái (sọ)",
    moq: "10 trái",
    desc: "Dừa sọ Bến Tre nhồi rau câu dừa — thạch dừa mát lạnh bên trong sọ dừa tươi. Ăn liền, không cần chế biến. Quà biếu, tiệc, tráng miệng sang.",
    badge: "Hot",
    badgeColor: "bg-orange-600",
    stock: "Quanh năm",
    stockUntil: "",
    tags: ["Rau câu dừa", "Ăn liền", "Quà biếu"],
    image: "/images/gdrive/Dua/dua-xiem-so-chop-nhon-ro-xanh.jpg",
    sticker: "/images/vip.png",
    unit: "trái",
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Đất cát ven biển",
    desc: "Vùng giồng cát nhiễm mặn Thạnh Phú — cho vị mặn nhẹ không đâu có. Có Chỉ dẫn địa lý do Cục SHTT cấp.",
  },
  {
    num: "02",
    title: "Bao trái từ nhỏ",
    desc: "Mỗi trái bao túi vải riêng từ khi bằng ngón tay — đẹp mã, không sâu bệnh, chín đều.",
  },
  {
    num: "03",
    title: "Đóng thùng theo ý mối",
    desc: "Bạn hàng muốn thùng carton, xốp, hay bao lưới đều được. Cân dư 2% bù hao — ai quen vựa cũng biết.",
  },
  {
    num: "04",
    title: "Giao tuỳ chọn",
    desc: "Xe lạnh, xe thường, hay gửi bay — tuỳ ngân sách bạn hàng. Bến Tre → Hà Nội khoảng 2 ngày · → Vinh 1,5 ngày. Giao tận chợ hay tận sạp đều được.",
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
    a: "Xoài Tứ Quý là giống xoài đặc sản Bến Tre, cho trái quanh năm (3 vụ/năm). Trồng trên đất giồng cát ven biển nhiễm mặn tại Thạnh Phú, cho ra vị mặn nhẹ cuối lưỡi — chỗ khác không làm lại được. Có Chỉ dẫn địa lý CDĐL #00124 do Cục Sở hữu trí tuệ cấp năm 2022.",
  },
  {
    q: "Giá xoài Tứ Quý Bến Tre bao nhiêu?",
    a: "Giá đổi mỗi ngày: VIP 23.000–25.000đ/kg, Loại 1 20.000–22.000đ/kg, Loại 2 16.000–18.000đ/kg. Gọi Anh Phúc 0932 585 533 lấy giá chuẩn trong ngày — giá cập mỗi sáng.",
  },
  {
    q: "Ship xa xoài có bị dập không?",
    a: "Không. Mỗi trái bọc lưới xốp riêng, xếp thùng carton có lót đệm. Ba năm giao ra Bắc, hàng hư không tới 2%. Nếu có trái dập — chụp hình gửi Zalo, đơn sau vựa bồi liền, không hỏi nhiều.",
  },
  {
    q: "Sao biết là xoài Bến Tre thật?",
    a: "Mỗi thùng có QR truy xuất nguồn gốc: tên vườn, ngày hái, người thu hoạch. Sản phẩm thuộc vùng Chỉ dẫn địa lý \"Bến Tre\" do Cục SHTT cấp 2022. Dùng tên gọi này cho xoài vùng khác là vi phạm pháp luật.",
  },
  {
    q: "Xoài Tứ Quý ăn chín hay xanh ngon hơn?",
    a: "Cả hai đều ngon, tuỳ khẩu vị. Miền Bắc thích ăn chín — ngọt đậm, thơm hắc, vị mặn nhẹ. Miền Nam thích ăn xanh — giòn sần sật, chua thanh. Vựa có cả hai loại.",
  },
  {
    q: "Mua xoài sỉ Bến Tre cần bao nhiêu?",
    a: "Lấy tối thiểu 1 thùng 20kg. Đóng thùng theo ý bạn hàng — carton, xốp, bao lưới đều được. Phí ship báo trước tuỳ tuyến. Gọi 0932 585 533 để báo giá.",
  },
  {
    q: "Thanh toán và hóa đơn?",
    a: "COD khi nhận hàng, hoặc chuyển khoản trước. Mối quen lấy 3 đơn vựa mở sổ công nợ. Xuất hoá đơn VAT đầy đủ cho nhà hàng, công ty.",
  },
  {
    q: "Mùa xoài Tứ Quý khi nào?",
    a: "Xoài Tứ Quý ra trái quanh năm, 3 vụ chính: tháng 4 âm, tháng 8 âm, tháng 12 âm (vụ Tết). Xoài xanh có quanh năm. Tháng nào vựa cũng có hàng — khỏi lo đứt.",
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
