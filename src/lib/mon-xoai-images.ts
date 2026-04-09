/* === Recipe images sourced from VnExpress (cooking/giadinh section) ===
 * All images licensed from vnexpress.net via og:image signed URL.
 * Credit attribution required when used (see credit field).
 */

export interface MonXoaiImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  sourceUrl: string;
}

const BASE = "/images/mon-xoai";

export const MON_XOAI_IMAGES = {
  goiXoaiTomThit: {
    src: `${BASE}/goi-xoai-tom-thit.jpg`,
    alt: "Gỏi xoài tôm thịt — món khai vị Việt Nam với xoài xanh bào sợi, tôm luộc và rau thơm",
    width: 1200,
    height: 800,
    credit: "VnExpress",
    sourceUrl: "https://vnexpress.net/goi-xoai-tom-thit-3209749.html",
  },
  goiXoaiTomKho: {
    src: `${BASE}/goi-xoai-tom-kho.jpg`,
    alt: "Gỏi xoài tôm khô đơn giản dễ làm — biến tấu từ xoài xanh và tôm khô rang",
    width: 1200,
    height: 800,
    credit: "VnExpress",
    sourceUrl: "https://vnexpress.net/goi-xoai-tom-kho-don-gian-de-lam-4400628.html",
  },
  sinhToXoaiDau: {
    src: `${BASE}/sinh-to-xoai-dau.jpg`,
    alt: "Sinh tố xoài dâu tây mát rượi — thức uống giải nhiệt mùa hè",
    width: 1200,
    height: 800,
    credit: "VnExpress",
    sourceUrl: "https://vnexpress.net/mat-ruoi-sinh-to-xoai-dau-tay-3233347.html",
  },
  cheXoaiSingapore: {
    src: `${BASE}/che-xoai-singapore.jpg`,
    alt: "Chè xoài bột báng kiểu Singapore — tráng miệng ngọt mát với nước cốt dừa",
    width: 1200,
    height: 800,
    credit: "VnExpress",
    sourceUrl: "https://vnexpress.net/che-xoai-bot-bang-nau-theo-kieu-singapore-4127259.html",
  },
  cheXoaiNgot: {
    src: `${BASE}/che-xoai-ngot.jpg`,
    alt: "Chè xoài ngọt thơm ngày đông — kết hợp xoài chín và nước cốt dừa",
    width: 1200,
    height: 800,
    credit: "VnExpress",
    sourceUrl: "https://vnexpress.net/che-xoai-ngot-thom-ngay-dong-4407784.html",
  },
  xoaiDamHoa: {
    src: `${BASE}/xoai-dam-hoa.jpg`,
    alt: "Xoài dầm đẹp như hoa — cách làm xoài dầm nguyên trái không bẩn tay",
    width: 1200,
    height: 800,
    credit: "VnExpress",
    sourceUrl: "https://vnexpress.net/lam-xoai-dam-dep-nhu-hoa-khong-so-ban-tay-3339762.html",
  },
} as const satisfies Record<string, MonXoaiImage>;
