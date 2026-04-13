/**
 * Xoài Hoàng Kim Thạnh Phú — premium product landing.
 *
 * Positioning: "Tứ Quý da vàng kim — ngọt lịm không xơ, hàng hiếm"
 * Target: quà biếu VIP, nhà hàng cao cấp, khách sành ăn
 */
import Image from "next/image";
import Link from "next/link";
import { Truck, Phone, Crown, Sparkle, Leaf, Scales } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";

const ZALO_LINK =
  "https://zalo.me/0932585533?text=" +
  encodeURIComponent("Mình muốn đặt Xoài Hoàng Kim Thạnh Phú (hàng hiếm)");

// Icons are not translatable — titles/descs come from messages.hoangKim.sellingPoints
const SELLING_POINT_ICONS = [Crown, Sparkle, Leaf, Truck];



export async function XoaiHoangKimLanding() {
  const t = await getTranslations("hoangKim");
  type SellingPoint = { title: string; desc: string };
  type CompareRow = { feature: string; tuQuy: string; hoangKim: string };
  type FaqItem = { q: string; a: string };
  type InternalLink = { label: string; href: string };
  const sellingPoints = t.raw("sellingPoints") as SellingPoint[];
  const compareRows = t.raw("compare.rows") as CompareRow[];
  const faqItems = t.raw("faq.items") as FaqItem[];
  const internalLinks = t.raw("internalLinks") as InternalLink[];
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-20">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2">
          <div className="px-0 md:pl-10">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Crown size={14} weight="fill" />
                {t("hero.badge")}
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold uppercase leading-tight text-text sm:text-5xl lg:text-6xl">
                {t("hero.title1")}
                <br />
                <span className="text-mango">{t("hero.title2")}</span>
              </h1>
              <p className="mt-2 text-lg font-semibold text-amber-700">
                {t("hero.price")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-[480px] text-lg leading-7 text-text/70">
                {t("hero.desc")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-amber-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-amber-700 transition-colors"
                >
                  {t("hero.ctaZalo")}
                </a>
                <a
                  href="tel:0932585533"
                  className="flex items-center gap-2 rounded-full border-2 border-text/20 px-6 py-4 text-sm font-bold text-text hover:border-text transition-colors"
                >
                  <Phone size={18} weight="bold" />
                  0932 585 533
                </a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} className="flex justify-center">
            <div className="relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-3xl shadow-2xl md:aspect-[4/5]">
              <Image
                src="/images/xoai-hoang-kim/xoai-hoang-kim-hero-da-vang.jpg"
                alt="Xoài Hoàng Kim Thạnh Phú — hộp quà vàng kim, nơ satin, thịt bổ cắt khối"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 rounded-full bg-amber-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                Hoàng Kim
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Selling points */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sellingPoints.map((sp, i) => {
            const Icon = SELLING_POINT_ICONS[i];
            return (
              <FadeIn key={sp.title} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  {Icon && <Icon size={32} weight="duotone" className="text-amber-600" />}
                  <h3 className="mt-3 font-heading text-lg font-bold text-text">{sp.title}</h3>
                  <p className="mt-1 text-sm text-text/60">{sp.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Compare: Hoàng Kim vs Tứ Quý thường */}
      <section className="bg-brand-cream px-5 pb-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 text-center font-heading text-3xl font-bold uppercase text-text">
              {t("compare.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
              <table className="w-full text-sm">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="p-3 text-left font-heading text-xs uppercase tracking-wider text-text/50">{t("compare.colCriteria")}</th>
                    <th className="p-3 text-left font-heading text-xs uppercase tracking-wider text-text/50">{t("compare.colTuQuy")}</th>
                    <th className="p-3 text-left font-heading text-xs uppercase tracking-wider text-amber-700">{t("compare.colHoangKim")}</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-amber-50/30"}>
                      <td className="p-3 font-semibold text-text">{row.feature}</td>
                      <td className="p-3 text-text/60">{row.tuQuy}</td>
                      <td className="p-3 font-semibold text-amber-800">{row.hoangKim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* FAQ */}
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 font-heading text-3xl font-bold uppercase text-text">
              {t("faq.title")}
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {faqItems.map(({ q, a }, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rounded-2xl bg-text/5 p-6">
                  <h3 className="font-heading text-base font-bold text-text">{q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/70">{a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Internal links */}
      <section className="bg-brand-cream px-5 py-12">
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-3">
          {internalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full border-2 border-text/15 px-5 py-2.5 text-sm font-semibold text-text/70 hover:border-text hover:text-text transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />
      <Footer />
    </>
  );
}
