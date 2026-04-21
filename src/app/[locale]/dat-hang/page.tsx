/**
 * /dat-hang — order landing page targeting transactional SEO keywords:
 * "mua xoài tứ quý online", "đặt xoài tứ quý", "xoài tứ quý ship toàn quốc"
 */
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  getBreadcrumbJsonLd,
  getProductJsonLd,
  SITE_URL,
} from "@/lib/structured-data";
import { getActiveProducts } from "@/lib/products";
import { PRICE_DATA } from "@/lib/price-data";
import { OrderPageContent } from "@/components/seo/order-page-content";

const PAGE_PATH = "/dat-hang";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${SITE_URL}${PAGE_PATH}`;
  return {
    title:
      "Đặt Trái Cây Bến Tre Online — Xoài Tứ Quý, Hoàng Kim, Dừa Xiêm | Ship Toàn Quốc",
    description:
      "Mua xoài Tứ Quý, Hoàng Kim, dừa xiêm Bến Tre online. Trực tiếp từ vựa Thạnh Phú, giao lạnh toàn quốc 24–48h. CDĐL #00124. Gọi 0932 585 533.",
    keywords: [
      "mua xoài tứ quý online",
      "đặt xoài tứ quý",
      "xoài tứ quý ship toàn quốc",
      "đặt dừa xiêm bến tre online ship toàn quốc",
      "mua dừa xiêm online",
      "đặt trái cây bến tre",
      "xoài bến tre giao toàn quốc",
    ],
    alternates: {
      canonical: url,
      languages: { "x-default": url },
    },
    openGraph: {
      title: "Đặt Trái Cây Bến Tre Online — Ship Lạnh Toàn Quốc",
      description:
        "Xoài Tứ Quý, Hoàng Kim, Dừa Xiêm — trực tiếp từ vựa Thạnh Phú. Giao lạnh 24–48h.",
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

export default async function DatHangPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "orderPage" });
  const products = getActiveProducts();
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: t("hero.badge"), url: SITE_URL },
    { name: t("hero.title"), url: `${SITE_URL}${PAGE_PATH}` },
  ]);

  const productJsonLds = products.map((p) =>
    getProductJsonLd({
      name: p.name,
      description: p.seo.description,
      url: `${SITE_URL}/${p.slug}`,
      image: `${SITE_URL}${p.heroImage}`,
      dateModified: PRICE_DATA.lastUpdated,
    })
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {productJsonLds.map((jsonLd, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
      <OrderPageContent />
    </>
  );
}
