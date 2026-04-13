import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Truck, Package, Phone, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "giaoHangHaNoi" });
  return {
    title: "Mua Xoài Bến Tre Chính Gốc Ở Đâu Hà Nội? — Giao 48h Từ Vựa Thạnh Phú",
    description:
      "Mua xoài Bến Tre chính gốc ở đâu Hà Nội? Đặt trực tiếp từ vựa Thạnh Phú CDĐL #00124. Giao lạnh 48h, đóng gói chống dập. Gọi: 0932 585 533.",
    keywords: [
      "mua xoài bến tre chính gốc ở đâu hà nội",
      "xoài tứ quý giao hà nội",
      "mua xoài bến tre tại hà nội",
      "xoài sỉ hà nội",
      "ship xoài bến tre ra bắc",
      "xoài tứ quý thạnh phú hà nội",
    ],
    alternates: { canonical: `${SITE_URL}/giao-hang/ha-noi` },
    openGraph: {
      title: t("hero.title") + " — " + t("hero.titleHighlight"),
      description: t("hero.desc"),
      url: `${SITE_URL}/giao-hang/ha-noi`,
      images: [{ url: `${SITE_URL}/images/xoai-real-2.jpg`, width: 1200, height: 1500 }],
    },
  };
}

export default async function GiaoHangHaNoiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("giaoHangHaNoi");

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: SITE_URL },
    { name: "Giao hàng", url: `${SITE_URL}/giao-hang/ha-noi` },
    { name: "Hà Nội", url: `${SITE_URL}/giao-hang/ha-noi` },
  ]);

  const whyItems = t.raw("why") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const internalLinks = t.raw("internalLinks") as { label: string; href: string }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-20">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              {t("hero.tag")}
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold uppercase leading-tight text-text sm:text-5xl">
              {t("hero.title")}
              <br />
              <span className="text-mango">{t("hero.titleHighlight")}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-7 text-text/70">
              {t("hero.desc")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="tel:0932585533"
                className="flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
              >
                <Phone size={18} weight="bold" />
                {t("hero.ctaCall")}
              </a>
              <a
                href="https://zalo.me/0932585533"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-text/20 px-6 py-4 text-sm font-bold text-text hover:border-text transition-colors"
              >
                {t("hero.ctaZalo")}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Shipping details */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-10 text-center font-heading text-3xl font-bold uppercase text-text">
              {t("shipping.title")}
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { Icon: Truck, title: t("shipping.timeTitle"), desc: t("shipping.timeDesc") },
              { Icon: Package, title: t("shipping.packTitle"), desc: t("shipping.packDesc") },
              { Icon: CheckCircle, title: t("shipping.warrantyTitle"), desc: t("shipping.warrantyDesc") },
            ].map(({ Icon, title, desc }, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <Icon size={32} weight="duotone" className="text-mango" />
                  <h3 className="mt-3 font-heading text-lg font-bold text-text">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text/60">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* Why choose */}
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 font-heading text-3xl font-bold uppercase text-text">
              {t("whyTitle")}
            </h2>
          </FadeIn>
          <ul className="space-y-4">
            {whyItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <li className="flex items-start gap-3 rounded-2xl bg-text/5 p-4">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-text" />
                  <span className="text-sm leading-relaxed text-text/80">{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* FAQ */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 font-heading text-3xl font-bold uppercase text-text">
              {t("faq.title")}
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {faqItems.map(({ q, a }, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-text">{q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/70">{a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* CTA */}
      <section className="bg-brand px-5 py-20 text-center">
        <div className="mx-auto max-w-[600px]">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold uppercase text-text">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-text/70">
              {t("cta.desc")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="tel:0932585533"
                className="flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
              >
                <Phone size={18} weight="bold" />
                {t("cta.ctaCall")}
              </a>
              <a
                href="https://zalo.me/0932585533"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-text/20 px-6 py-4 text-sm font-bold text-text hover:border-text transition-colors"
              >
                {t("cta.ctaZalo")}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Internal links */}
      <SectionDivider from="brand" to="brand-cream" />
      <section className="bg-brand-cream px-5 py-12">
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-3">
          {internalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border-2 border-text/15 px-5 py-2.5 text-sm font-semibold text-text/70 hover:border-text hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />
      <Footer />
    </>
  );
}
