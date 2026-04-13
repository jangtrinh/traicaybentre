import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { ProductCatalog } from "@/components/product/product-catalog";
import { getAllProducts } from "@/lib/products";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sanPhamPage" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: [
      "trái cây bến tre",
      "trái cây đặc sản bến tre",
      "quà biếu trái cây đặc sản bến tre",
      "vựa trái cây bến tre",
      "xoài tứ quý",
      "dừa xiêm bến tre",
    ],
    alternates: { canonical: `${SITE_URL}/san-pham` },
    openGraph: {
      title: t("metadata.ogTitle"),
      description: t("metadata.ogDescription"),
      url: `${SITE_URL}/san-pham`,
    },
  };
}

export default async function CatalogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = getAllProducts();
  const t = await getTranslations("sanPham");
  const tPage = await getTranslations("sanPhamPage");

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: tPage("breadcrumb.home"), url: SITE_URL },
    { name: tPage("breadcrumb.products"), url: `${SITE_URL}/san-pham` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <ProductCatalog products={products} />

      {/* KW#8 anchor: quà biếu trái cây đặc sản bến tre */}
      <section id="qua-bieu-ben-tre" className="scroll-mt-32 bg-brand-cream px-5 pb-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              {t("gift.title1")}
              <br />
              <span className="text-mango">{t("gift.title2")}</span>
            </h2>
            <p className="mb-10 text-center text-sm text-text/50">
              {t("gift.desc")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <span className="inline-block rounded-full bg-mango/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mango-dark">
                  {t("gift.box5kg.badge")}
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-text">
                  {t("gift.box5kg.title")}
                </h3>
                <p className="mt-2 text-sm text-text/60">
                  {t("gift.box5kg.desc")}
                </p>
                <a
                  href="https://zalo.me/0932585533?text=M%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20h%E1%BB%99p%20xo%C3%A0i%20VIP%205kg%20qu%C3%A0%20bi%E1%BA%BFu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                >
                  {t("gift.box5kg.cta")}
                </a>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <span className="inline-block rounded-full bg-text/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-text/70">
                  {t("gift.box10kg.badge")}
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-text">
                  {t("gift.box10kg.title")}
                </h3>
                <p className="mt-2 text-sm text-text/60">
                  {t("gift.box10kg.desc")}
                </p>
                <a
                  href="https://zalo.me/0932585533?text=M%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20h%E1%BB%99p%20xo%C3%A0i%20VIP%2010kg%20qu%C3%A0%20bi%E1%BA%BFu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                >
                  {t("gift.box10kg.cta")}
                </a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-center text-sm text-text/50">
              {t("gift.comboNote")}{" "}
              <a href="tel:0932585533" className="font-bold text-text hover:text-mango transition-colors">
                0932 585 533
              </a>{" "}
              — vựa tư vấn riêng.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />
      <Footer />
    </>
  );
}
