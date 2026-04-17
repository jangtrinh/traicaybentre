import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
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

const LOCALE_TO_OG: Record<string, string> = { vi: "vi_VN", en: "en_US", ko: "ko_KR", ja: "ja_JP" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://www.traicaybentre.com"),
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://www.traicaybentre.com",
      siteName: t("ogSiteName"),
      type: "website",
      locale: LOCALE_TO_OG[locale] ?? "vi_VN",
      images: [
        {
          url: "https://www.traicaybentre.com/images/xoai-real-2.jpg",
          width: 1200,
          height: 1500,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("twitterDescription"),
      images: ["https://www.traicaybentre.com/images/xoai-real-2.jpg"],
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
      canonical: "https://www.traicaybentre.com",
      languages: {
        vi: "https://www.traicaybentre.com",
        en: "https://www.traicaybentre.com/en",
        ko: "https://www.traicaybentre.com/ko",
        ja: "https://www.traicaybentre.com/ja",
        "x-default": "https://www.traicaybentre.com",
      },
    },
  };
}

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
      <body>
        {/* Skip-to-content link — WCAG 2.4.1 Bypass Blocks */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-mango focus:text-white focus:px-3 focus:py-2 focus:rounded focus:shadow-lg focus:outline-none"
        >
          Bỏ qua đến nội dung chính
        </a>
        <GoogleTagManagerNoscript />
        <NextIntlClientProvider>
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <FomoToastNotification />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
