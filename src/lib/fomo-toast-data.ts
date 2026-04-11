/**
 * FOMO toast notification data — fake order notifications to build trust & urgency.
 *
 * ~100 Vietnamese names × 3 products × 63 cities = thousands of unique combos.
 * Rotated randomly with no immediate repeats.
 */

/** Vietnamese first names — mix of common male/female names across regions */
export const CUSTOMER_NAMES = [
  // Female names
  "Chị Hương", "Chị Lan", "Chị Mai", "Chị Thảo", "Chị Ngọc",
  "Chị Linh", "Chị Trang", "Chị Hà", "Chị Phương", "Chị Yến",
  "Chị Oanh", "Chị Hạnh", "Chị Trinh", "Chị Nga", "Chị Thuỷ",
  "Chị Dung", "Chị Hiền", "Chị Thu", "Chị Vân", "Chị Ánh",
  "Chị Thanh", "Chị Hồng", "Chị Nhung", "Chị Kim", "Chị Loan",
  "Chị Vy", "Chị Trâm", "Chị Tuyết", "Chị Xuân", "Chị Diệu",
  "Chị Quỳnh", "Chị Giang", "Chị Thư", "Chị Nhi", "Chị Châu",
  "Chị Bích", "Chị Đào", "Chị Cúc", "Chị Sen", "Chị My",
  // Male names
  "Anh Tuấn", "Anh Minh", "Anh Hùng", "Anh Đức", "Anh Long",
  "Anh Phong", "Anh Khoa", "Anh Nam", "Anh Dũng", "Anh Thắng",
  "Anh Bảo", "Anh Quân", "Anh Hải", "Anh Tùng", "Anh Trung",
  "Anh Việt", "Anh Hoàng", "Anh Sơn", "Anh Khánh", "Anh Tín",
  "Anh Nghĩa", "Anh Toàn", "Anh Đạt", "Anh Cường", "Anh Thành",
  "Anh Hiếu", "Anh Phúc", "Anh Lộc", "Anh Trọng", "Anh Kiên",
  "Anh Vũ", "Anh Tâm", "Anh Nhân", "Anh Huy", "Anh Duy",
  // Family/group buyers
  "Cô Sáu", "Cô Bảy", "Cô Tám", "Cô Chín", "Cô Út",
  "Chú Năm", "Chú Hai", "Chú Ba", "Chú Tư", "Chú Sáu",
  "Bác Hoa", "Bác Lan", "Bác Tư", "Bác Mai", "Bác Hạnh",
  "Dì Ba", "Dì Năm", "Dì Hai", "Dì Sáu",
  // Business/restaurant
  "Quán Cơm Tấm Sài Gòn", "Nhà hàng Biển Xanh", "Quán Chè Thanh",
  "Tiệm trà sữa Mộc", "Quán sinh tố Healthy",
];

/** Order scenarios — quantity + context phrases */
export type OrderScenario = {
  /** Product slug from products registry */
  product: string;
  /** Display text for what was ordered */
  text: string;
  /** Time ago text */
  timeAgo: string;
};

/** Generate a random "time ago" string */
function randomTimeAgo(): string {
  const options = [
    "vừa xong", "1 phút trước", "2 phút trước", "3 phút trước",
    "5 phút trước", "7 phút trước", "10 phút trước", "12 phút trước",
    "15 phút trước", "20 phút trước", "25 phút trước", "30 phút trước",
  ];
  return options[Math.floor(Math.random() * options.length)];
}

/** All possible order text templates per product */
const ORDER_TEMPLATES: Record<string, string[]> = {
  "xoai-tu-quy": [
    "đặt 5kg Xoài Tứ Quý",
    "đặt 10kg Xoài Tứ Quý VIP",
    "đặt 20kg Xoài Tứ Quý",
    "đặt 3kg Xoài Tứ Quý ăn thử",
    "đặt thùng 10kg Xoài Tứ Quý",
    "đặt 15kg Xoài Tứ Quý Loại 1",
    "đặt 30kg Xoài Tứ Quý sỉ",
    "đặt 7kg Xoài Tứ Quý làm quà",
    "đặt 2 thùng Xoài Tứ Quý",
    "đặt 50kg Xoài Tứ Quý cho quán",
    "đặt 5kg Xoài Tứ Quý gửi Bắc",
    "mua 10kg Xoài Tứ Quý biếu sếp",
    "đặt 8kg Xoài Tứ Quý ship nhanh",
  ],
  "xoai-hoang-kim": [
    "đặt 5kg Xoài Hoàng Kim",
    "đặt 3kg Xoài Hoàng Kim hàng hiếm",
    "đặt 10kg Xoài Hoàng Kim VIP",
    "đặt hộp quà Xoài Hoàng Kim",
    "đặt 7kg Xoài Hoàng Kim tặng đối tác",
    "đặt 2kg Xoài Hoàng Kim ăn thử",
    "đặt 15kg Xoài Hoàng Kim",
    "mua 5kg Xoài Hoàng Kim làm quà",
    "đặt 20kg Xoài Hoàng Kim cho công ty",
    "đặt 3kg Xoài Hoàng Kim premium",
    "đặt 10kg Xoài Hoàng Kim biếu Tết",
  ],
  "dua-xiem-ben-tre": [
    "đặt 20 trái Dừa Xiêm",
    "đặt 50 trái Dừa Xiêm sỉ",
    "đặt 10 trái Dừa Xiêm gọt sẵn",
    "đặt 30 trái Dừa Xiêm cho quán",
    "đặt 100 trái Dừa Xiêm",
    "đặt 15 trái Dừa Xiêm ship HCM",
    "mua 5 trái Dừa Xiêm ăn thử",
    "đặt 40 trái Dừa Xiêm cho tiệc",
    "đặt 200 trái Dừa Xiêm sỉ",
    "đặt 12 trái Dừa Xiêm tươi",
    "đặt 25 trái Dừa Xiêm gọt sẵn",
    "mua 8 trái Dừa Xiêm uống tuần",
  ],
};

/** Popular cities for toast — subset of 63, weighted toward major metros */
export const TOAST_CITIES = [
  // Major cities — appear more often
  "TP.HCM", "TP.HCM", "TP.HCM",
  "Hà Nội", "Hà Nội", "Hà Nội",
  "Đà Nẵng", "Đà Nẵng",
  "Cần Thơ", "Cần Thơ",
  "Bình Dương", "Bình Dương",
  "Đồng Nai", "Đồng Nai",
  // Southern cities
  "Long An", "Tiền Giang", "Vĩnh Long", "Trà Vinh",
  "Sóc Trăng", "Đồng Tháp", "An Giang", "Kiên Giang",
  "Hậu Giang", "Bạc Liêu", "Cà Mau", "Bến Tre",
  "Tây Ninh", "Bà Rịa-Vũng Tàu",
  // Central
  "Huế", "Nha Trang", "Quy Nhơn", "Quảng Nam",
  // Northern
  "Hải Phòng", "Quảng Ninh", "Bắc Ninh", "Thanh Hoá",
  "Nghệ An", "Thái Nguyên",
];

/** Generate a random order notification */
export function generateRandomOrder(): {
  name: string;
  city: string;
  text: string;
  timeAgo: string;
  product: string;
} {
  const name = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
  const city = TOAST_CITIES[Math.floor(Math.random() * TOAST_CITIES.length)];

  const productKeys = Object.keys(ORDER_TEMPLATES);
  const product = productKeys[Math.floor(Math.random() * productKeys.length)];
  const templates = ORDER_TEMPLATES[product];
  const text = templates[Math.floor(Math.random() * templates.length)];

  return {
    name,
    city,
    text,
    timeAgo: randomTimeAgo(),
    product,
  };
}
