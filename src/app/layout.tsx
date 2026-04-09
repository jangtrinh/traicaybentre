import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import { getHomepageJsonLd } from "@/lib/structured-data";
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
  metadataBase: new URL("https://traicaybentre.com"),
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

/* JSON-LD structured data — centralized in structured-data.ts */
const jsonLd = getHomepageJsonLd();

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
