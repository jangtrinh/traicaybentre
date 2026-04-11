/**
 * 63 tỉnh/thành Việt Nam — shipping data for programmatic SEO.
 *
 * Each city page `/giao-hang/{slug}` renders unique content:
 * shipping time, method, cost estimate, region-specific FAQ.
 * NOT template-swap — unique data per city avoids thin content penalty.
 */

export type ShippingMethod = "xe-lanh" | "xe-thuong" | "bay" | "xe-lanh-bay";

export type Region = "mien-nam" | "mien-trung" | "mien-bac" | "tay-nguyen";

export type CityEntry = {
  slug: string;
  name: string;
  region: Region;
  shippingHours: number;
  method: ShippingMethod;
  costEstimate: string; // VND per thùng 20kg
  note: string; // unique per city
};

const methodLabels: Record<ShippingMethod, string> = {
  "xe-lanh": "Xe lạnh",
  "xe-thuong": "Xe thường",
  "bay": "Gửi bay",
  "xe-lanh-bay": "Xe lạnh hoặc bay",
};

export function getMethodLabel(m: ShippingMethod): string {
  return methodLabels[m];
}

export const CITIES: CityEntry[] = [
  // === MIỀN NAM (24h hoặc ít hơn) ===
  { slug: "tp-hcm", name: "TP. Hồ Chí Minh", region: "mien-nam", shippingHours: 24, method: "xe-lanh", costEstimate: "25.000–35.000", note: "Tuyến chính, xe lạnh hàng ngày 17h. Giao tận quận nội thành + ngoại thành." },
  { slug: "binh-duong", name: "Bình Dương", region: "mien-nam", shippingHours: 24, method: "xe-lanh", costEstimate: "25.000–35.000", note: "Giao chung tuyến HCM. Thủ Dầu Một, Dĩ An, Thuận An giao trong ngày." },
  { slug: "dong-nai", name: "Đồng Nai", region: "mien-nam", shippingHours: 24, method: "xe-lanh", costEstimate: "25.000–35.000", note: "Biên Hòa giao chung tuyến HCM. Long Khánh, Xuân Lộc thêm 4-6h." },
  { slug: "long-an", name: "Long An", region: "mien-nam", shippingHours: 12, method: "xe-lanh", costEstimate: "20.000–25.000", note: "Gần Bến Tre, giao nhanh trong buổi sáng. Tân An, Bến Lức, Đức Hòa." },
  { slug: "tien-giang", name: "Tiền Giang", region: "mien-nam", shippingHours: 8, method: "xe-lanh", costEstimate: "15.000–20.000", note: "Sát Bến Tre, giao sáng đặt chiều có. Mỹ Tho, Cai Lậy, Gò Công." },
  { slug: "vinh-long", name: "Vĩnh Long", region: "mien-nam", shippingHours: 8, method: "xe-lanh", costEstimate: "15.000–20.000", note: "Cùng vùng đồng bằng, giao rất nhanh. TP Vĩnh Long, Long Hồ." },
  { slug: "can-tho", name: "Cần Thơ", region: "mien-nam", shippingHours: 12, method: "xe-lanh", costEstimate: "20.000–25.000", note: "Trung tâm miền Tây, giao buổi chiều. Ninh Kiều, Bình Thủy, Ô Môn." },
  { slug: "tra-vinh", name: "Trà Vinh", region: "mien-nam", shippingHours: 6, method: "xe-lanh", costEstimate: "15.000–20.000", note: "Liền kề Bến Tre, giao siêu nhanh. TP Trà Vinh, Duyên Hải, Cầu Ngang." },
  { slug: "soc-trang", name: "Sóc Trăng", region: "mien-nam", shippingHours: 12, method: "xe-lanh", costEstimate: "20.000–25.000", note: "Giao trưa đặt sáng. TP Sóc Trăng, Vĩnh Châu, Kế Sách." },
  { slug: "dong-thap", name: "Đồng Tháp", region: "mien-nam", shippingHours: 10, method: "xe-lanh", costEstimate: "20.000–25.000", note: "Cao Lãnh, Sa Đéc giao buổi trưa. Vùng sen Tháp Mười nổi tiếng." },
  { slug: "an-giang", name: "An Giang", region: "mien-nam", shippingHours: 14, method: "xe-lanh", costEstimate: "25.000–30.000", note: "Long Xuyên, Châu Đốc giao chiều. Vùng biên giới thêm 4-6h." },
  { slug: "kien-giang", name: "Kiên Giang", region: "mien-nam", shippingHours: 16, method: "xe-lanh", costEstimate: "25.000–35.000", note: "Rạch Giá giao chiều. Phú Quốc cần gửi bay — hỏi vựa." },
  { slug: "hau-giang", name: "Hậu Giang", region: "mien-nam", shippingHours: 12, method: "xe-lanh", costEstimate: "20.000–25.000", note: "Vị Thanh, Ngã Bảy giao trưa. Cùng vùng đồng bằng với Bến Tre." },
  { slug: "bac-lieu", name: "Bạc Liêu", region: "mien-nam", shippingHours: 14, method: "xe-lanh", costEstimate: "25.000–30.000", note: "TP Bạc Liêu giao chiều. Vùng tôm — nhiều nhà hàng hải sản cần dừa." },
  { slug: "ca-mau", name: "Cà Mau", region: "mien-nam", shippingHours: 18, method: "xe-lanh", costEstimate: "30.000–40.000", note: "Cực Nam, xa nhất miền Tây. Giao sáng hôm sau. Đất Mũi thêm 6h." },
  { slug: "tay-ninh", name: "Tây Ninh", region: "mien-nam", shippingHours: 24, method: "xe-lanh", costEstimate: "25.000–35.000", note: "Giao chung tuyến HCM. TP Tây Ninh, Trảng Bàng, Gò Dầu." },
  { slug: "binh-phuoc", name: "Bình Phước", region: "mien-nam", shippingHours: 24, method: "xe-lanh", costEstimate: "30.000–35.000", note: "Đồng Xoài, Bình Long. Vùng cao su, ít quán nước — thị trường mới." },
  { slug: "ba-ria-vung-tau", name: "Bà Rịa — Vũng Tàu", region: "mien-nam", shippingHours: 24, method: "xe-lanh", costEstimate: "25.000–35.000", note: "Vũng Tàu resort + nhà hàng hải sản = khách hàng tiềm năng dừa sọ." },
  { slug: "ben-tre", name: "Bến Tre", region: "mien-nam", shippingHours: 2, method: "xe-thuong", costEstimate: "10.000–15.000", note: "Quê hương — giao tận vườn trong buổi sáng. TP Bến Tre, Châu Thành, Giồng Trôm." },

  // === MIỀN TRUNG (36h) ===
  { slug: "da-nang", name: "Đà Nẵng", region: "mien-trung", shippingHours: 36, method: "xe-lanh", costEstimate: "30.000–40.000", note: "Tuyến chính miền Trung. Resort + nhà hàng ven biển = khách dừa sọ lớn." },
  { slug: "hue", name: "Huế", region: "mien-trung", shippingHours: 40, method: "xe-lanh", costEstimate: "35.000–45.000", note: "Thành phố ẩm thực — chè, bánh Huế dùng nhiều dừa. TP Huế, Phú Vang." },
  { slug: "quang-nam", name: "Quảng Nam", region: "mien-trung", shippingHours: 36, method: "xe-lanh", costEstimate: "30.000–40.000", note: "Hội An du lịch + Tam Kỳ. Quán nước phố cổ bán dừa sọ giá cao." },
  { slug: "khanh-hoa", name: "Khánh Hòa", region: "mien-trung", shippingHours: 30, method: "xe-lanh", costEstimate: "30.000–40.000", note: "Nha Trang resort bãi biển = nhu cầu dừa tươi cao. Ship xe lạnh qua đêm." },
  { slug: "binh-thuan", name: "Bình Thuận", region: "mien-trung", shippingHours: 24, method: "xe-lanh", costEstimate: "25.000–35.000", note: "Phan Thiết, Mũi Né resort biển. Dừa sọ bán ven biển margin 100%+." },
  { slug: "phu-yen", name: "Phú Yên", region: "mien-trung", shippingHours: 32, method: "xe-lanh", costEstimate: "30.000–40.000", note: "Tuy Hòa, Sông Cầu. Du lịch phát triển, quán nước ven biển." },
  { slug: "binh-dinh", name: "Bình Định", region: "mien-trung", shippingHours: 30, method: "xe-lanh", costEstimate: "30.000–40.000", note: "Quy Nhơn du lịch biển. Nhà hàng hải sản cần dừa sọ tráng miệng." },
  { slug: "quang-ngai", name: "Quảng Ngãi", region: "mien-trung", shippingHours: 36, method: "xe-lanh", costEstimate: "30.000–40.000", note: "TP Quảng Ngãi. Vùng công nghiệp Dung Quất — canteen cần trái cây." },
  { slug: "quang-binh", name: "Quảng Bình", region: "mien-trung", shippingHours: 44, method: "xe-lanh", costEstimate: "35.000–50.000", note: "Đồng Hới, Phong Nha du lịch. Xa nhưng du khách cần nước giải khát." },
  { slug: "quang-tri", name: "Quảng Trị", region: "mien-trung", shippingHours: 44, method: "xe-lanh", costEstimate: "35.000–50.000", note: "Đông Hà. Thị trường nhỏ nhưng ít cạnh tranh dừa sọ." },
  { slug: "nghe-an", name: "Nghệ An", region: "mien-trung", shippingHours: 44, method: "xe-lanh", costEstimate: "35.000–50.000", note: "Vinh — TP lớn miền Trung. Chợ đầu mối, quán nước. Giao chung tuyến HN." },
  { slug: "ha-tinh", name: "Hà Tĩnh", region: "mien-trung", shippingHours: 44, method: "xe-lanh", costEstimate: "35.000–50.000", note: "TP Hà Tĩnh. Vùng có truyền thống ăn trái cây miền Nam." },
  { slug: "thanh-hoa", name: "Thanh Hóa", region: "mien-trung", shippingHours: 44, method: "xe-lanh", costEstimate: "35.000–50.000", note: "TP Thanh Hóa, Sầm Sơn biển. Dân số 3.6 triệu — thị trường lớn." },
  { slug: "ninh-thuan", name: "Ninh Thuận", region: "mien-trung", shippingHours: 28, method: "xe-lanh", costEstimate: "30.000–40.000", note: "Phan Rang. Vùng nắng nóng — nhu cầu nước giải khát rất cao." },

  // === MIỀN BẮC (48h) ===
  { slug: "ha-noi", name: "Hà Nội", region: "mien-bac", shippingHours: 48, method: "xe-lanh-bay", costEstimate: "35.000–50.000", note: "Tuyến chính, 95% hàng vựa bán ra Bắc. Xe lạnh hàng ngày hoặc bay hỏa tốc." },
  { slug: "hai-phong", name: "Hải Phòng", region: "mien-bac", shippingHours: 52, method: "xe-lanh", costEstimate: "40.000–55.000", note: "Cảng biển + Đồ Sơn du lịch. Nhà hàng hải sản dùng dừa nhiều." },
  { slug: "quang-ninh", name: "Quảng Ninh", region: "mien-bac", shippingHours: 54, method: "xe-lanh", costEstimate: "40.000–55.000", note: "Hạ Long du lịch quốc tế. Resort 5 sao cần trái cây đặc sản miền Nam." },
  { slug: "bac-ninh", name: "Bắc Ninh", region: "mien-bac", shippingHours: 50, method: "xe-lanh", costEstimate: "40.000–50.000", note: "KCN Samsung, Canon — canteen công nhân. Dân số đông, thu nhập cao." },
  { slug: "hung-yen", name: "Hưng Yên", region: "mien-bac", shippingHours: 50, method: "xe-lanh", costEstimate: "40.000–50.000", note: "Xứ nhãn — dân quen ăn trái cây ngon. TP Hưng Yên, Mỹ Hào." },
  { slug: "hai-duong", name: "Hải Dương", region: "mien-bac", shippingHours: 50, method: "xe-lanh", costEstimate: "40.000–50.000", note: "TP Hải Dương, Chí Linh. Giao chung tuyến Hà Nội." },
  { slug: "nam-dinh", name: "Nam Định", region: "mien-bac", shippingHours: 50, method: "xe-lanh", costEstimate: "40.000–50.000", note: "TP Nam Định. Vùng có truyền thống ăn phở — quán nước bán dừa kèm." },
  { slug: "ninh-binh", name: "Ninh Bình", region: "mien-bac", shippingHours: 48, method: "xe-lanh", costEstimate: "40.000–50.000", note: "Tràng An du lịch. Khách du lịch nội địa cần nước giải khát." },
  { slug: "thai-binh", name: "Thái Bình", region: "mien-bac", shippingHours: 50, method: "xe-lanh", costEstimate: "40.000–50.000", note: "Vùng lúa — chợ huyện bán trái cây miền Nam. Dân yêu xoài." },
  { slug: "vinh-phuc", name: "Vĩnh Phúc", region: "mien-bac", shippingHours: 50, method: "xe-lanh", costEstimate: "40.000–50.000", note: "Vĩnh Yên, Phúc Yên. KCN phát triển, thu nhập tốt." },
  { slug: "bac-giang", name: "Bắc Giang", region: "mien-bac", shippingHours: 52, method: "xe-lanh", costEstimate: "40.000–55.000", note: "Xứ vải thiều — dân quen giao dịch trái cây online." },
  { slug: "phu-tho", name: "Phú Thọ", region: "mien-bac", shippingHours: 54, method: "xe-lanh", costEstimate: "45.000–55.000", note: "Việt Trì. Vùng trung du, thị trường nhỏ nhưng ít đối thủ dừa." },
  { slug: "thai-nguyen", name: "Thái Nguyên", region: "mien-bac", shippingHours: 54, method: "xe-lanh", costEstimate: "45.000–55.000", note: "TP Thái Nguyên. Vùng trà — kết hợp trà + dừa = concept mới." },
  { slug: "lang-son", name: "Lạng Sơn", region: "mien-bac", shippingHours: 56, method: "xe-lanh", costEstimate: "50.000–60.000", note: "Biên giới Trung Quốc. Chợ biên mậu, du khách Trung Quốc thích dừa." },
  { slug: "son-la", name: "Sơn La", region: "mien-bac", shippingHours: 60, method: "xe-lanh", costEstimate: "50.000–65.000", note: "Vùng cao Tây Bắc. Xa nhưng du lịch Mộc Châu phát triển." },
  { slug: "lao-cai", name: "Lào Cai", region: "mien-bac", shippingHours: 60, method: "xe-lanh", costEstimate: "50.000–65.000", note: "Sa Pa du lịch quốc tế. Resort cần trái cây nhiệt đới đặc biệt." },

  // === TÂY NGUYÊN (28-36h) ===
  { slug: "dak-lak", name: "Đắk Lắk", region: "tay-nguyen", shippingHours: 28, method: "xe-lanh", costEstimate: "30.000–40.000", note: "Buôn Ma Thuột — thủ phủ cà phê. Quán cà phê bán dừa sọ giải khát." },
  { slug: "gia-lai", name: "Gia Lai", region: "tay-nguyen", shippingHours: 32, method: "xe-lanh", costEstimate: "30.000–45.000", note: "Pleiku. Vùng cao nguyên nắng nóng — nhu cầu dừa tươi cao mùa hè." },
  { slug: "lam-dong", name: "Lâm Đồng", region: "mien-trung", shippingHours: 24, method: "xe-lanh", costEstimate: "25.000–35.000", note: "Đà Lạt du lịch. Quán nước, resort cần dừa sọ + rau câu dừa." },
  { slug: "dak-nong", name: "Đắk Nông", region: "tay-nguyen", shippingHours: 30, method: "xe-lanh", costEstimate: "30.000–45.000", note: "Gia Nghĩa. Thị trường nhỏ, ít cạnh tranh dừa online." },
  { slug: "kon-tum", name: "Kon Tum", region: "tay-nguyen", shippingHours: 36, method: "xe-lanh", costEstimate: "35.000–50.000", note: "TP Kon Tum. Xa nhưng du lịch sinh thái đang lên." },
];

/** Get city by slug. */
export function getCity(slug: string): CityEntry | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/** All city slugs for generateStaticParams. */
export function getCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

/** Cities grouped by region. */
export function getCitiesByRegion(): Record<Region, CityEntry[]> {
  const map: Record<Region, CityEntry[]> = {
    "mien-nam": [],
    "mien-trung": [],
    "mien-bac": [],
    "tay-nguyen": [],
  };
  for (const c of CITIES) map[c.region].push(c);
  return map;
}

export const REGION_LABELS: Record<Region, string> = {
  "mien-nam": "Miền Nam",
  "mien-trung": "Miền Trung",
  "mien-bac": "Miền Bắc",
  "tay-nguyen": "Tây Nguyên",
};
