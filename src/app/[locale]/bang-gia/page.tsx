/**
 * /bang-gia — dedicated pricing page targeting transactional SEO keywords:
 * "giá xoài tứ quý hôm nay", "bảng giá xoài tứ quý", "giá xoài bến tre"
 */
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  getBreadcrumbJsonLd,
  getPricingPageJsonLd,
  SITE_URL,
} from "@/lib/structured-data";
import { PRICE_DATA } from "@/lib/price-data";
import { PricingPageContent } from "@/components/seo/pricing-page-content";

const PAGE_PATH = "/bang-gia";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${SITE_URL}${PAGE_PATH}`;
  return {
    title:
      "Giá Xoài Tứ Quý Bến Tre Hôm Nay — Bảng Giá Cập Nhật Mỗi Sáng | Vựa Thạnh Phú",
    description:
      "Bảng giá xoài Tứ Quý Bến Tre hôm nay: VIP 23–25k, Loại 1 20–22k, Loại 2 16–18k/kg. Giá cập nhật mỗi sáng từ vựa Thạnh Phú. Xoài Hoàng Kim 35–45k. Dừa Xiêm 8–18k/trái. Gọi 0932 585 533.",
    keywords: [
      "giá xoài tứ quý hôm nay",
      "giá xoài tứ quý bao nhiêu",
      "bảng giá xoài tứ quý",
      "giá xoài bến tre",
      "giá xoài tứ quý thạnh phú",
      "giá xoài hoàng kim",
      "giá dừa xiêm bến tre",
    ],
    alternates: {
      canonical: url,
      languages: {
        vi: `${SITE_URL}${PAGE_PATH}`,
        en: `${SITE_URL}/en${PAGE_PATH}`,
        ko: `${SITE_URL}/ko${PAGE_PATH}`,
        ja: `${SITE_URL}/ja${PAGE_PATH}`,
        "x-default": `${SITE_URL}${PAGE_PATH}`,
      },
    },
    openGraph: {
      title: "Bảng Giá Xoài Tứ Quý Bến Tre — Cập Nhật Hôm Nay",
      description:
        "VIP 23–25k, Loại 1 20–22k, Loại 2 16–18k/kg. Giá từ vựa, cập nhật mỗi sáng.",
      url,
      images: [
        {
          url: `${SITE_URL}/images/xoai-real-2.jpg`,
          width: 1200,
          height: 1500,
        },
      ],
    },
  };
}

export default async function BangGiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pricingPage" });
  const pricingJsonLd = getPricingPageJsonLd({
    lastUpdated: PRICE_DATA.lastUpdated,
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: t("hero.badge"), url: SITE_URL },
    { name: t("hero.title"), url: `${SITE_URL}${PAGE_PATH}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PricingPageContent />
    </>
  );
}
