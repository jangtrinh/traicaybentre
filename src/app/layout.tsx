import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
  description:
    "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre. Chỉ dẫn địa lý CDĐL #00124. Giao lạnh toàn quốc. Giá cập nhật mỗi ngày — gọi vựa để có giá chính xác.",
  keywords: [
    "xoài tứ quý",
    "xoài Bến Tre",
    "xoài Thạnh Phú",
    "trái cây đặc sản",
    "xoài sỉ",
    "xoài tứ quý Thạnh Phú",
    "mua xoài sỉ Bến Tre",
  ],
  openGraph: {
    title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
    description:
      "Đặc sản Thạnh Phú, Bến Tre — vị mặn nhẹ không đâu có. Giao lạnh toàn quốc. CDĐL #00124.",
    url: "https://traicaybentre.com",
    siteName: "Trái Cây Bến Tre",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "https://traicaybentre.com/images/xoai-real-2.jpg",
        width: 1200,
        height: 1500,
        alt: "Xoài Tứ Quý Bến Tre — tay cầm quả lớn tại vựa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
    description: "Đặc sản Thạnh Phú — vị mặn nhẹ không đâu có. CDĐL #00124.",
    images: ["https://traicaybentre.com/images/xoai-real-2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://traicaybentre.com",
  },
};

/* JSON-LD structured data for SEO + GEO + AEO */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://traicaybentre.com/#business",
      name: "Trái Cây Bến Tre — Vựa Xoài Tứ Quý",
      description:
        "Vựa xoài Tứ Quý Thạnh Phú, Bến Tre. Chỉ dẫn địa lý CDĐL #00124. Giao lạnh toàn quốc.",
      url: "https://traicaybentre.com",
      telephone: "+84932585533",
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
      image: "https://traicaybentre.com/images/xoai-real-2.jpg",
      priceRange: "16.000–25.000đ/kg",
      openingHours: "Mo-Su 04:00-18:00",
      areaServed: { "@type": "Country", name: "VN" },
      sameAs: [
        "https://www.facebook.com/profile.php?id=100089485120129",
        "https://xoaituquythanhphu.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://traicaybentre.com/#website",
      url: "https://traicaybentre.com",
      name: "Trái Cây Bến Tre",
      inLanguage: "vi",
    },
    {
      "@type": "FAQPage",
      "@id": "https://traicaybentre.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Ship xa xoài có bị dập không?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Không. Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm. Tỷ lệ lỗi dưới 2%. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau.",
          },
        },
        {
          "@type": "Question",
          name: "Sao biết là xoài Bến Tre thật?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mỗi thùng có QR truy xuất nguồn gốc: tên vườn, ngày hái, người thu hoạch. Sản phẩm thuộc vùng Chỉ dẫn địa lý Bến Tre do Cục SHTT cấp năm 2022.",
          },
        },
        {
          "@type": "Question",
          name: "Giá xoài tứ quý Bến Tre bao nhiêu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Giá dao động theo ngày: VIP 23.000–25.000đ/kg, Loại 1 20.000–22.000đ/kg, Loại 2 16.000–18.000đ/kg. Gọi vựa +84 932 585 533 (A Phúc) để có giá chính xác.",
          },
        },
        {
          "@type": "Question",
          name: "Xoài Tứ Quý ăn chín hay xanh ngon hơn?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Miền Bắc thường thích ăn chín — ngọt đậm, thơm hắc, vị mặn nhẹ. Miền Nam thích ăn xanh — giòn sần sật, chua thanh. Vựa cung cấp cả hai.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${plusJakarta.variable} ${nunito.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
