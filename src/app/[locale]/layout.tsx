import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getHomepageJsonLd } from "@/lib/structured-data";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/google-tag-manager";
import FomoToastNotification from "@/components/fomo-toast-notification";
import { routing } from "@/i18n/routing";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  metadataBase: new URL("https://www.traicaybentre.com"),
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
    url: "https://www.traicaybentre.com",
    siteName: "Trái Cây Bến Tre",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "https://www.traicaybentre.com/images/xoai-real-2.jpg",
        width: 1200,
        height: 1500,
        alt: "Xoài Tứ Quý Bến Tre — tay cầm quả lớn tại vựa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
    description: "Đặc sản Thạnh Phú — vị mặn nhẹ không đâu có. CDĐL #00124.",
    images: ["https://www.traicaybentre.com/images/xoai-real-2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large" as const,
    },
  },
  alternates: {
    canonical: "https://www.traicaybentre.com",
    languages: {
      "vi": "https://www.traicaybentre.com",
      "en": "https://www.traicaybentre.com/en",
      "ko": "https://www.traicaybentre.com/ko",
      "ja": "https://www.traicaybentre.com/ja",
      "x-default": "https://www.traicaybentre.com",
    },
  },
};

const jsonLd = getHomepageJsonLd();

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${plusJakarta.variable} ${nunito.variable} antialiased`}
    >
      <head>
        <GoogleTagManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <GoogleTagManagerNoscript />
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
        <FomoToastNotification />
        <Analytics />
      </body>
    </html>
  );
}
