/**
 * Order page content — dedicated SEO page targeting "mua xoài tứ quý online".
 *
 * Shows all active products with CTA, shipping info, trust signals.
 */
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Leaf,
  Scales,
  Truck,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getActiveProducts } from "@/lib/products";
import { SeoCTASection } from "@/components/seo/seo-cta-section";
import { SeoShippingSection } from "@/components/seo/seo-shipping-section";

const TRUST_ICONS = [Leaf, ShieldCheck, Truck, Scales];

export async function OrderPageContent() {
  const t = await getTranslations("orderPage");
  const products = getActiveProducts();

  type HowToStep = { step: string; title: string; desc: string };
  type TrustItem = { title: string; desc: string };
  const howToSteps = t.raw("howTo.steps") as HowToStep[];
  const trustItems = t.raw("trust.items") as TrustItem[];

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-16">
        <div className="mx-auto max-w-[1000px] text-center">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              {t("hero.badge")}
            </span>
            <h1 className="mt-3 font-heading text-4xl font-bold uppercase leading-tight text-text sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-lg text-text/70">
              {t("hero.desc")}
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Product cards */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <h2 className="mb-10 text-center font-heading text-3xl font-bold uppercase text-text">
              {t("products.title")}
            </h2>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            {products.map((product, i) => {
              const zaloLink =
                "https://zalo.me/0932585533?text=" +
                encodeURIComponent(product.cta.zaloMessage);
              return (
                <FadeIn key={product.slug} delay={i * 0.1}>
                  <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={product.heroImage}
                        alt={product.heroImageAlt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-xl font-bold text-text">
                        {product.shortName}
                      </h3>
                      <p className="mt-1 text-sm text-text/60">{product.tagline}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={zaloLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-black px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                        >
                          {t("ctaZalo")}
                        </a>
                        <Link
                          href={`/${product.slug}`}
                          className="flex items-center gap-1 rounded-full border-2 border-text/20 px-5 py-2.5 text-sm font-bold text-text hover:border-text transition-colors"
                        >
                          {t("viewPrice")}
                          <ArrowRight size={14} weight="bold" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="bg-brand-cream px-5 pb-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-10 text-center font-heading text-3xl font-bold uppercase text-text">
              {t("howTo.title")}
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {howToSteps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-black font-heading text-lg font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-bold text-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-text/60">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping */}
      <SectionDivider from="brand-cream" to="brand" />
      <SeoShippingSection
        title={t("shipping.title")}
        desc={t("shipping.desc")}
        viewDetailLabel={t("shipping.viewDetail")}
      />

      {/* Trust signals */}
      <section className="bg-brand px-5 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <h2 className="mb-10 text-center font-heading text-3xl font-bold uppercase text-text">
              {t("trust.title")}
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, i) => {
              const Icon = TRUST_ICONS[i];
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div className="rounded-2xl bg-text/5 p-6">
                    {Icon && <Icon size={32} weight="duotone" className="text-mango" />}
                    <h3 className="mt-3 font-heading text-lg font-bold text-text">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-text/60">{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SectionDivider from="brand" to="brand-cream" />
      <SeoCTASection
        title={t("cta.title")}
        desc={t("cta.desc")}
        zaloLabel={t("cta.zalo")}
        zaloLink="https://zalo.me/0932585533?text=M%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20tr%C3%A1i%20c%C3%A2y%20B%E1%BA%BFn%20Tre"
        bgClass="bg-brand-cream"
      />

      <Footer />
    </>
  );
}
