/* === Centralized JSON-LD structured data builders for SEO + AEO === */

const SITE_URL = "https://www.traicaybentre.com";
const PHONE = "+84932585533";
const BUSINESS_NAME = "Trái Cây Bến Tre — Vựa Đặc Sản Thạnh Phú";

/* Shared business entity — reused across schemas */
const localBusiness = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  description:
    "Vựa xoài Tứ Quý Thạnh Phú, Bến Tre. Chỉ dẫn địa lý CDĐL #00124. Giao lạnh toàn quốc.",
  url: SITE_URL,
  telephone: PHONE,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thạnh Phú",
    addressRegion: "Bến Tre",
    postalCode: "86400",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.8508435,
    longitude: 106.6173415,
  },
  image: `${SITE_URL}/images/xoai-real-2.jpg`,
  priceRange: "16.000–25.000đ/kg",
  openingHours: "Mo-Su 04:00-18:00",
  areaServed: { "@type": "Country", name: "VN" },
  sameAs: [
    "https://www.facebook.com/profile.php?id=100089485120129",
    "https://xoaituquythanhphu.com",
  ],
};

/* DefinedTerm — canonical definition for AI engines */
const definedTerm = {
  "@type": "DefinedTerm",
  "@id": `${SITE_URL}/#xoai-tu-quy-definition`,
  name: "Xoài Tứ Quý",
  description:
    "Giống xoài đặc sản Bến Tre, cho trái quanh năm (3 vụ/năm). Trồng trên đất giồng cát ven biển nhiễm mặn tại Thạnh Phú, Ba Tri, Bình Đại — vị mặn nhẹ cuối lưỡi là đặc trưng không thể tái tạo ở vùng khác. Chỉ dẫn địa lý CDĐL #00124, Cục SHTT cấp 2022.",
  termCode: "00124",
  inDefinedTermSet: {
    "@type": "DefinedTermSet",
    name: "Chỉ dẫn địa lý Bến Tre",
  },
};

/* Product schema with CDĐL certification */
const productSchema = {
  "@type": "Product",
  "@id": `${SITE_URL}/#xoai-tu-quy`,
  name: "Xoài Tứ Quý Bến Tre",
  description:
    "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre — vị mặn nhẹ cuối lưỡi từ đất giồng cát nhiễm mặn. CDĐL #00124.",
  image: `${SITE_URL}/images/xoai-real-2.jpg`,
  brand: { "@type": "Brand", name: "Xoài Tứ Quý Bến Tre" },
  manufacturer: {
    "@type": "Organization",
    name: "HTX Dịch vụ Sản xuất Nông nghiệp Thạnh Phong",
  },
  countryOfOrigin: { "@type": "Country", name: "VN" },
  offers: [
    {
      "@type": "Offer",
      name: "Xoài Tứ Quý VIP",
      sku: "xoai-tu-quy-vip",
      price: "25000",
      priceCurrency: "VND",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "23000-25000",
        priceCurrency: "VND",
        unitCode: "KGM",
        unitText: "kg",
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    {
      "@type": "Offer",
      name: "Xoài Tứ Quý Loại 1",
      sku: "xoai-tu-quy-loai-1",
      price: "22000",
      priceCurrency: "VND",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "20000-22000",
        priceCurrency: "VND",
        unitCode: "KGM",
        unitText: "kg",
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    {
      "@type": "Offer",
      name: "Xoài Tứ Quý Loại 2",
      sku: "xoai-tu-quy-loai-2",
      price: "18000",
      priceCurrency: "VND",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "16000-18000",
        priceCurrency: "VND",
        unitCode: "KGM",
        unitText: "kg",
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  ],
};

/* FAQ with Speakable + author attribution */
const faqSchema = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [
      "#faq-answer-0",
      "#faq-answer-1",
      "#faq-answer-2",
      "#faq-answer-3",
    ],
  },
  mainEntity: [
    {
      "@type": "Question",
      name: "Xoài Tứ Quý là gì?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Xoài Tứ Quý là giống xoài đặc sản Bến Tre, cho trái quanh năm (3 vụ/năm). Trồng trên đất giồng cát ven biển nhiễm mặn tại Thạnh Phú, tạo ra vị mặn nhẹ cuối lưỡi — đặc điểm không thể tái tạo ở vùng khác. Đã được cấp Chỉ dẫn địa lý CDĐL #00124 bởi Cục Sở hữu trí tuệ năm 2022.",
        author: {
          "@type": "Organization",
          name: "Trái Cây Bến Tre",
          url: SITE_URL,
        },
        datePublished: "2026-01-01",
        dateModified: "2026-04-09",
      },
    },
    {
      "@type": "Question",
      name: "Giá xoài Tứ Quý Bến Tre bao nhiêu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Giá dao động theo ngày: VIP 23.000–25.000đ/kg, Loại 1 20.000–22.000đ/kg, Loại 2 16.000–18.000đ/kg. Gọi vựa 0932 585 533 (A Phúc) để có giá chính xác. Giá cập nhật mỗi sáng.",
        datePublished: "2026-01-01",
        dateModified: "2026-04-09",
      },
    },
    {
      "@type": "Question",
      name: "Ship xa xoài có bị dập không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Không. Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm. Tỷ lệ lỗi dưới 2% sau 3 năm giao hàng ra Bắc.",
        datePublished: "2026-01-01",
        dateModified: "2026-04-09",
      },
    },
    {
      "@type": "Question",
      name: "Xoài Tứ Quý ăn chín hay xanh ngon hơn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cả hai đều ngon. Miền Bắc thích ăn chín — ngọt đậm, thơm hắc, vị mặn nhẹ. Miền Nam thích ăn xanh — giòn sần sật, chua thanh.",
        datePublished: "2026-01-01",
        dateModified: "2026-04-09",
      },
    },
    {
      "@type": "Question",
      name: "Mùa xoài Tứ Quý khi nào?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Xoài Tứ Quý cho trái quanh năm, 3 vụ chính: Vụ 1 tháng 4, Vụ 2 tháng 8, Vụ 3 tháng 12 (âm lịch). Xoài xanh có quanh năm.",
        datePublished: "2026-01-01",
        dateModified: "2026-04-09",
      },
    },
    {
      "@type": "Question",
      name: "Mua xoài sỉ Bến Tre cần bao nhiêu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tối thiểu 1 thùng 20kg. Đóng thùng linh hoạt theo yêu cầu. Phí ship báo trước tuỳ tuyến. Gọi 0932 585 533 để báo giá.",
        datePublished: "2026-01-01",
        dateModified: "2026-04-09",
      },
    },
    {
      "@type": "Question",
      name: "Thanh toán và hóa đơn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "COD khi nhận hàng hoặc chuyển khoản trước. Có sổ công nợ cho đối tác quen (sau 3 đơn). Xuất hóa đơn VAT đầy đủ cho nhà hàng, doanh nghiệp.",
        datePublished: "2026-01-01",
        dateModified: "2026-04-09",
      },
    },
    {
      "@type": "Question",
      name: "Sao biết là xoài Bến Tre thật?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mỗi thùng có QR truy xuất nguồn gốc: tên vườn, ngày hái, người thu hoạch. Sản phẩm thuộc vùng Chỉ dẫn địa lý Bến Tre do Cục SHTT cấp 2022.",
        datePublished: "2026-01-01",
        dateModified: "2026-04-09",
      },
    },
  ],
};

/* Harvest season events */
const harvestEvents = [
  {
    "@type": "Event",
    "@id": `${SITE_URL}/#harvest-vu-1`,
    name: "Vụ 1 Xoài Tứ Quý 2026",
    description:
      "Vụ thu hoạch chính thứ nhất — xoài chín tháng 4–6, xoài xanh quanh năm.",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Thạnh Phú, Bến Tre",
      geo: { "@type": "GeoCoordinates", latitude: 9.8508435, longitude: 106.6173415 },
    },
    organizer: { "@type": "Organization", name: BUSINESS_NAME, url: SITE_URL },
  },
  {
    "@type": "Event",
    "@id": `${SITE_URL}/#harvest-vu-2`,
    name: "Vụ 2 Xoài Tứ Quý 2026",
    description: "Vụ thu hoạch thứ hai — xoài chín tháng 8–10.",
    startDate: "2026-08-01",
    endDate: "2026-10-31",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Thạnh Phú, Bến Tre",
      geo: { "@type": "GeoCoordinates", latitude: 9.8508435, longitude: 106.6173415 },
    },
    organizer: { "@type": "Organization", name: BUSINESS_NAME, url: SITE_URL },
  },
  {
    "@type": "Event",
    "@id": `${SITE_URL}/#harvest-vu-3`,
    name: "Vụ 3 Xoài Tứ Quý 2026 (Vụ Tết)",
    description: "Vụ thu hoạch cuối năm — xoài chín tháng 12–2, phục vụ Tết.",
    startDate: "2026-12-01",
    endDate: "2027-02-28",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Thạnh Phú, Bến Tre",
      geo: { "@type": "GeoCoordinates", latitude: 9.8508435, longitude: 106.6173415 },
    },
    organizer: { "@type": "Organization", name: BUSINESS_NAME, url: SITE_URL },
  },
];

/* Website schema */
const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Trái Cây Bến Tre",
  inLanguage: "vi",
};

/* === Exports === */

/** Full JSON-LD graph for homepage (layout.tsx) */
export function getHomepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusiness,
      websiteSchema,
      definedTerm,
      productSchema,
      faqSchema,
      ...harvestEvents,
    ],
  };
}

/** Breadcrumb builder for subpages */
export function getBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Article schema for knowledge/blog pages */
export function getArticleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    image: opts.image || `${SITE_URL}/images/xoai-real-2.jpg`,
    author: {
      "@type": "Organization",
      name: "Trái Cây Bến Tre",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Trái Cây Bến Tre",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    inLanguage: "vi",
    mainEntityOfPage: opts.url,
  };
}

/** Product schema for [product] landing pages.
 *  Minimal Schema.org Product — name, description, image, brand, category.
 *  NO nested Offer: price dao động si/le, tránh rich result penalty.
 *  Add Offer sau khi có stable price API. (red-team F5)
 */
export function getProductJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  image: string;
  category?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image,
    url: opts.url,
    category: opts.category ?? "Trái cây đặc sản Bến Tre",
    brand: {
      "@type": "Brand",
      name: BUSINESS_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#business`,
    },
    ...(opts.dateModified && { dateModified: opts.dateModified }),
  };
}

/** Pricing page JSON-LD — Product with Offer array + dateModified for freshness */
export function getPricingPageJsonLd(opts: {
  lastUpdated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...productSchema,
        dateModified: opts.lastUpdated,
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/bang-gia`,
        url: `${SITE_URL}/bang-gia`,
        name: "Bảng Giá Xoài Tứ Quý Bến Tre Hôm Nay",
        dateModified: opts.lastUpdated,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#xoai-tu-quy` },
      },
      localBusiness,
    ],
  };
}

export { SITE_URL };
