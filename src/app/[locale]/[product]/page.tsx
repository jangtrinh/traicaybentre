/**
 * Dynamic product landing route.
 *
 * - `generateStaticParams` returns ACTIVE product slugs only (F12) → coming-soon
 *   products never pre-render, and are surfaced only via `/san-pham` catalog.
 * - Reserved paths (`/kien-thuc`, `/nguon-goc`, ...) are shadowed by static
 *   routes, so they never reach this handler. Defensive `isReservedPath` check
 *   included anyway.
 * - Metadata mirrors the former static `/xoai-tu-quy` page exactly for SEO safety.
 * - Landing JSX dispatched per-slug. Xoài = bespoke component. Future products
 *   add sibling components (or a shared generic one) without touching this file.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  getActiveProductSlugs,
  getProduct,
  isReservedPath,
} from "@/lib/products";
import { PRICE_DATA } from "@/lib/price-data";
import { getProductOffersForSlug } from "@/lib/landing-data";
import {
  getBreadcrumbJsonLd,
  getProductJsonLd,
  SITE_URL,
} from "@/lib/structured-data";
import { XoaiTuQuyLanding } from "@/components/product/xoai-tu-quy-landing";
import { XoaiHoangKimLanding } from "@/components/product/xoai-hoang-kim-landing";
import { DuaXiemBenTreLanding } from "@/components/product/dua-xiem-ben-tre-landing";

type Props = { params: Promise<{ locale: string; product: string }> };

export function generateStaticParams() {
  return getActiveProductSlugs().map((slug) => ({ product: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: slug } = await params;
  if (isReservedPath(slug)) return {};
  const product = getProduct(slug);
  if (!product || product.status !== "active") return {};

  const url = `${SITE_URL}/${slug}`;
  const heroImage = `${SITE_URL}${product.heroImage}`;
  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: {
      canonical: url,
      languages: {
        vi: `${SITE_URL}/${slug}`,
        en: `${SITE_URL}/en/${slug}`,
        ko: `${SITE_URL}/ko/${slug}`,
        ja: `${SITE_URL}/ja/${slug}`,
        "x-default": `${SITE_URL}/${slug}`,
      },
    },
    openGraph: {
      title: product.seo.ogTitle ?? product.seo.title,
      description: product.seo.ogDescription ?? product.seo.description,
      url,
      images: [{ url: heroImage, width: 1200, height: 1500 }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, product: slug } = await params;
  setRequestLocale(locale);
  if (isReservedPath(slug)) notFound();

  const product = getProduct(slug);
  if (!product || product.status !== "active") notFound();

  const url = `${SITE_URL}/${slug}`;
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: SITE_URL },
    { name: product.shortName, url },
  ]);
  const offers = getProductOffersForSlug(slug);
  const productJsonLd = getProductJsonLd({
    name: product.name,
    description: product.seo.description,
    url,
    image: `${SITE_URL}${product.heroImage}`,
    dateModified: PRICE_DATA.lastUpdated,
    ...(offers && { offers }),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {slug === "xoai-tu-quy" && <XoaiTuQuyLanding />}
      {slug === "xoai-hoang-kim" && <XoaiHoangKimLanding />}
      {slug === "dua-xiem-ben-tre" && <DuaXiemBenTreLanding />}
      {/* Future products: add sibling bespoke components here, or route through
          a shared `<GenericProductLanding product={product} />` template. */}
    </>
  );
}
