/**
 * Programmatic SEO — dynamic city shipping pages.
 *
 * Generates `/giao-hang/{city}` for 60+ provinces.
 * Existing static pages (ha-noi, tp-hcm, da-nang) take precedence
 * via Next.js static > dynamic routing.
 *
 * Each page has UNIQUE content: shipping time, cost, method, notes, FAQ.
 * NOT template-swap — avoids thin content penalty.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Truck, Phone, Clock, Package, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getCity, getCitySlugs, getMethodLabel, REGION_LABELS } from "@/content/cities";
import { getActiveProducts } from "@/lib/products";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

type RouteParams = { city: string };
type Props = { params: Promise<{ locale: string } & RouteParams> };

// Static pages that already exist — exclude from dynamic generation
const STATIC_CITIES = ["ha-noi", "tp-hcm", "da-nang"];

export function generateStaticParams(): RouteParams[] {
  return getCitySlugs()
    .filter((s) => !STATIC_CITIES.includes(s))
    .map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const t = await getTranslations({ locale, namespace: "giaoHang" });
  const citiesT = await getTranslations({ locale, namespace: "cities" });
  const products = getActiveProducts().map((p) => p.shortName).join(" + ");
  const url = `${SITE_URL}/giao-hang/${slug}`;
  const methodLabel = citiesT(`methodLabels.${city.method}`);
  return {
    title: `${t("hero.title")} ${t("hero.titleTo", { cityName: city.name })} — ${city.shippingHours}h`,
    description: `${t("hero.desc", { method: methodLabel, hours: city.shippingHours, cityName: city.name })}`,
    keywords: [
      `ship ${products.toLowerCase()} ${city.name.toLowerCase()}`,
      `giao trái cây ${city.name.toLowerCase()}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${t("hero.title")} ${t("hero.titleTo", { cityName: city.name })}`,
      description: `${methodLabel}. ${city.shippingHours}h.`,
      url,
    },
  };
}

export default async function CityShippingPage({ params }: Props) {
  const { locale, city: slug } = await params;
  setRequestLocale(locale);
  const city = getCity(slug);
  if (!city) notFound();

  const t = await getTranslations("giaoHang");
  const citiesT = await getTranslations("cities");
  const methodLabel = citiesT(`methodLabels.${city.method}`);
  const regionLabel = citiesT(`regionLabels.${city.region}`);

  const products = getActiveProducts();
  const breadcrumb = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: SITE_URL },
    { name: t("hero.title"), url: `${SITE_URL}/giao-hang/${slug}` },
    { name: city.name, url: `${SITE_URL}/giao-hang/${slug}` },
  ]);

  const faq = [
    { q: t("faq.q1", { cityName: city.name }), a: t("faq.a1", { hours: city.shippingHours, method: methodLabel.toLowerCase() }) },
    { q: t("faq.q2", { cityName: city.name }), a: t("faq.a2", { cost: city.costEstimate }) },
    { q: t("faq.q3", { cityName: city.name }), a: t("faq.a3") },
    { q: t("faq.q4", { cityName: city.name }), a: t("faq.a4", { method: methodLabel.toLowerCase(), hours: city.shippingHours }) },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-20">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              {t("hero.tag", { region: regionLabel })}
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold uppercase leading-tight text-text sm:text-5xl">
              {t("hero.title")}
              <br />
              <span className="text-mango">{t("hero.titleTo", { cityName: city.name })}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-7 text-text/70">
              {t("hero.desc", { method: methodLabel, hours: city.shippingHours, cityName: city.name })}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="tel:0932585533" className="flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors">
                <Phone size={18} weight="bold" />
                {t("hero.ctaCall")}
              </a>
              <a href={`https://zalo.me/0932585533?text=${encodeURIComponent(`Mình muốn đặt trái cây ship ${city.name}`)}`} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-text/20 px-6 py-4 text-sm font-bold text-text hover:border-text transition-colors">
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
              {t("shippingDetails.title", { cityName: city.name })}
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            <FadeIn delay={0.05}>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <Clock size={32} weight="duotone" className="text-mango" />
                <h3 className="mt-3 font-heading text-lg font-bold text-text">{t("shippingDetails.timeTitle")}</h3>
                <p className="mt-1 text-2xl font-bold text-text">{t("shippingDetails.timeUnit", { hours: city.shippingHours })}</p>
                <p className="mt-1 text-sm text-text/60">{t("shippingDetails.timeSub", { method: methodLabel })}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <Package size={32} weight="duotone" className="text-mango" />
                <h3 className="mt-3 font-heading text-lg font-bold text-text">{t("shippingDetails.costTitle")}</h3>
                <p className="mt-1 text-2xl font-bold text-text">{city.costEstimate}₫</p>
                <p className="mt-1 text-sm text-text/60">{t("shippingDetails.costSub")}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <Truck size={32} weight="duotone" className="text-mango" />
                <h3 className="mt-3 font-heading text-lg font-bold text-text">{t("shippingDetails.packTitle")}</h3>
                <p className="mt-1 text-sm text-text/60">{t("shippingDetails.packDesc")}</p>
              </div>
            </FadeIn>
          </div>

          {/* City-specific note — unique content per page */}
          <FadeIn delay={0.2}>
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-text">{t("shippingDetails.noteTitle", { cityName: city.name })}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text/70">{city.note}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* Products available */}
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-8 text-center font-heading text-3xl font-bold uppercase text-text">
              {t("products.title", { cityName: city.name })}
            </h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.08}>
                <Link href={`/${p.slug}`} className="group flex items-center gap-4 rounded-2xl bg-text/5 p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold text-text">{p.name}</h3>
                    <p className="mt-1 text-sm text-text/60">{p.tagline}</p>
                  </div>
                  <ArrowRight size={20} weight="bold" className="text-text/40 transition-transform group-hover:translate-x-1 group-hover:text-mango" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* FAQ */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 font-heading text-3xl font-bold uppercase text-text">
              {t("faq.title", { cityName: city.name })}
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-text">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/70">{f.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* Internal links */}
      <section className="bg-brand px-5 py-12">
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-3">
          {[
            { label: t("internalLinks.xoai"), href: "/xoai-tu-quy" },
            { label: t("internalLinks.dua"), href: "/dua-xiem-ben-tre" },
            { label: t("internalLinks.allProducts"), href: "/san-pham" },
            { label: t("internalLinks.contactWholesale"), href: "/#contact" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full border-2 border-text/15 px-5 py-2.5 text-sm font-semibold text-text/70 hover:border-text hover:text-text transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />
      <Footer />
    </>
  );
}
