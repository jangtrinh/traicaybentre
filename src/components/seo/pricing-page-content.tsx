/**
 * Pricing page content — dedicated SEO page targeting "giá xoài tứ quý hôm nay".
 *
 * Reuses price tier pattern from xoai-tu-quy-landing.tsx.
 * Shows all products with prices + CTA for maximum transactional intent coverage.
 */
import Link from "next/link";
import {
  Clock,
  Truck,
  ShieldCheck,
  Phone,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getPriceDataTranslated } from "@/lib/price-data";
import { SeoCTASection } from "@/components/seo/seo-cta-section";

const ZALO_LINK =
  "https://zalo.me/0932585533?text=" +
  encodeURIComponent("Mình muốn hỏi giá xoài Tứ Quý hôm nay");

export async function PricingPageContent() {
  const t = await getTranslations("pricingPage");
  const tPrice = await getTranslations("priceData");
  const PRICE_DATA = getPriceDataTranslated(tPrice);

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
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-text/50">
              <Clock size={16} weight="bold" />
              {t("hero.updated")} {PRICE_DATA.lastUpdated}
            </p>
            <p className="mx-auto mt-4 max-w-[600px] text-lg text-text/70">
              {t("hero.desc")}
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Xoài Tứ Quý price tiers */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <h2 className="mb-2 text-center font-heading text-3xl font-bold uppercase text-text">
              {t("xoaiTuQuy.title")}
            </h2>
            <p className="mb-10 text-center text-sm text-text/50">
              {t("xoaiTuQuy.subtitle")}
            </p>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {PRICE_DATA.tiers.map((tier, i) => (
              <FadeIn key={tier.sku} delay={i * 0.1}>
                <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                  <div className="p-6">
                    <span
                      className={`inline-block rounded-full ${tier.badgeColor} px-3 py-1 text-xs font-bold uppercase text-white`}
                    >
                      {tier.badge}
                    </span>
                    <h3 className="mt-3 font-heading text-xl font-bold text-text">
                      {tier.name}
                    </h3>
                    <div className="mt-3 font-heading text-3xl font-bold text-text">
                      {tier.priceRange}
                      <span className="text-sm font-medium text-text/50">
                        đ/kg
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-text/40">
                      {t("weightLabel")} {tier.weight}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text/60">
                      {tier.description}
                    </p>
                    <a
                      href={ZALO_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 block w-full rounded-full bg-black py-3 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                    >
                      {t("ctaOrder")}
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-text/40">{PRICE_DATA.note}</p>
        </div>
      </section>

      {/* Xoài Hoàng Kim + Dừa Xiêm */}
      <section className="bg-brand-cream px-5 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Hoàng Kim */}
            <FadeIn>
              <div className="rounded-3xl bg-white p-8 shadow-md">
                <span className="inline-block rounded-full bg-amber-600 px-3 py-1 text-xs font-bold uppercase text-white">
                  Premium
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-text">
                  {t("hoangKim.title")}
                </h3>
                <div className="mt-3 font-heading text-3xl font-bold text-text">
                  35.000–45.000
                  <span className="text-sm font-medium text-text/50">đ/kg</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text/60">
                  {t("hoangKim.desc")}
                </p>
                <div className="mt-5 flex gap-3">
                  <Link
                    href="/xoai-hoang-kim"
                    className="flex items-center gap-1 text-sm font-bold text-text/70 hover:text-text transition-colors"
                  >
                    {t("viewDetail")}
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Dừa Xiêm */}
            <FadeIn delay={0.1}>
              <div className="rounded-3xl bg-white p-8 shadow-md">
                <span className="inline-block rounded-full bg-green-700 px-3 py-1 text-xs font-bold uppercase text-white">
                  {t("duaXiem.badge")}
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-text">
                  {t("duaXiem.title")}
                </h3>
                <div className="mt-3 font-heading text-3xl font-bold text-text">
                  8.000–18.000
                  <span className="text-sm font-medium text-text/50">đ/trái</span>
                </div>
                <p className="mt-1 text-xs text-text/40">{t("duaXiem.priceNote")}</p>
                <p className="mt-3 text-sm leading-relaxed text-text/60">
                  {t("duaXiem.desc")}
                </p>
                <div className="mt-5 flex gap-3">
                  <Link
                    href="/dua-xiem-ben-tre"
                    className="flex items-center gap-1 text-sm font-bold text-text/70 hover:text-text transition-colors"
                  >
                    {t("viewDetail")}
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust + shipping */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-3">
          {[
            { Icon: ShieldCheck, titleKey: "trust.cdđl", descKey: "trust.cdđlDesc" },
            { Icon: Truck, titleKey: "trust.shipping", descKey: "trust.shippingDesc" },
            { Icon: Phone, titleKey: "trust.contact", descKey: "trust.contactDesc" },
          ].map(({ Icon, titleKey, descKey }, i) => (
            <FadeIn key={titleKey} delay={i * 0.08}>
              <div className="rounded-2xl bg-text/5 p-6 text-center">
                <Icon size={32} weight="duotone" className="mx-auto text-mango" />
                <h3 className="mt-3 font-heading text-lg font-bold text-text">
                  {t(titleKey)}
                </h3>
                <p className="mt-2 text-sm text-text/60">{t(descKey)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <SeoCTASection
        title={t("cta.title")}
        desc={t("cta.desc")}
        zaloLabel={t("cta.zalo")}
        zaloLink={ZALO_LINK}
      />

      <Footer />
    </>
  );
}
