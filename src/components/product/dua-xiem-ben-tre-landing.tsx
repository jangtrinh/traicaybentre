/**
 * Dừa Xiêm Bến Tre product landing — bespoke MVP component.
 *
 * MVP scope: hero + selling points + Zalo CTA + shipping. No price tiers
 * yet (waiting for stable wholesale pricing). Mirror xoai-tu-quy-landing
 * design system (FadeIn, Header, Footer, brand colors).
 */
import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  Drop,
  Phone,
  MapPin,
  Package,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";

const ZALO_LINK =
  "https://zalo.me/0932585533?text=" +
  encodeURIComponent("Mình muốn đặt Dừa Xiêm Bến Tre (dừa sọ)");

// Icons are not translatable — titles/descs come from messages.duaXiem.sellingPoints.items
const SELLING_POINT_ICONS = [MapPin, Drop, Package, Truck];

// Shipping routes — city/time/method are data (not translatable), hrefs are fixed
const SHIPPING_ROUTES = [
  { city: "TP.HCM", time: "24h", method: "Xe lạnh", href: "/giao-hang/tp-hcm" },
  { city: "Hà Nội", time: "48h", method: "Xe lạnh / Bay", href: "/giao-hang/ha-noi" },
  { city: "Đà Nẵng", time: "36h", method: "Xe lạnh", href: "/giao-hang/da-nang" },
];

export async function DuaXiemBenTreLanding() {
  const t = await getTranslations("duaXiem");
  type SellingPointItem = { title: string; desc: string };
  type OrderStep = { step: string; title: string; desc: string };
  type FaqItem = { q: string; a: string };
  type InternalLink = { label: string; href: string };
  const sellingItems = t.raw("sellingPoints.items") as SellingPointItem[];
  const orderSteps = t.raw("order.steps") as OrderStep[];
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
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
                {t("hero.badge")}
              </span>
              <h1 className="mt-3 font-heading text-4xl font-bold uppercase leading-tight text-text sm:text-5xl lg:text-6xl">
                {t("hero.title1")}
                <br />
                <span className="text-mango">{t("hero.title2")}</span>
                <br />
                {t("hero.title3")}
              </h1>
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
                  className="rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
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
            <div className="relative aspect-[4/3] w-full max-w-[480px] overflow-hidden rounded-3xl shadow-2xl md:aspect-[4/5]">
              <Image
                src="/images/dua/dua-xiem-so-goc-goi-san-hang-loat.jpg"
                alt="Dừa Xiêm Bến Tre — dừa sọ gọt sẵn xếp hàng tại vựa Thạnh Phú"
                fill
                priority
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Selling points */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <h2 className="mb-12 text-center font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              {t("sellingPoints.title")}
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sellingItems.map((sp, i) => {
              const Icon = SELLING_POINT_ICONS[i];
              return (
                <FadeIn key={sp.title} delay={i * 0.08}>
                  <div className="rounded-2xl bg-white p-6 shadow-sm">
                    {Icon && <Icon size={32} weight="duotone" className="text-mango" />}
                    <h3 className="mt-3 font-heading text-lg font-bold text-text">
                      {sp.title}
                    </h3>
                    <p className="mt-1 text-sm text-text/60">{sp.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery — show variety */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              {t("gallery.title")}
            </h2>
            <p className="mb-12 text-center text-sm text-text/50">
              {t("gallery.desc")}
            </p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                src: "/images/dua/dua-so-hut-chan-khong-tay-cam-premium.jpg",
                alt: "Dừa sọ Bến Tre đóng gói hút chân không premium — tay cầm",
              },
              {
                src: "/images/dua/dua-so-hang-loat-khoan-nap-nhin-tu-tren.jpg",
                alt: "Dừa sọ gọt sẵn khoan nắp xếp hàng loạt — nhìn từ trên",
              },
              {
                src: "/images/dua/cong-nhan-got-dua-may-chuyen-dung.jpg",
                alt: "Công nhân vựa gọt dừa bằng máy chuyên dụng tại Thạnh Phú",
              },
              {
                src: "/images/dua/dua-xiem-xanh-dong-lon-vua-ngoai-troi.jpg",
                alt: "Dừa xiêm xanh nguyên trái đống lớn tại vựa ngoài trời",
              },
              {
                src: "/images/dua/dua-so-tui-luoi-vang-dong-goi-ship.jpg",
                alt: "Dừa sọ đóng túi lưới vàng chuẩn bị ship toàn quốc",
              },
              {
                src: "/images/dua/dua-so-tron-day-ro-xanh-nhin-tu-tren.jpg",
                alt: "Dừa sọ tròn đầy rổ xanh — nhìn từ trên xuống tại vựa",
              },
            ].map((img, i) => (
              <FadeIn key={img.src} delay={i * 0.05}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Đặt online + pricing — SEO KW#6 "đặt dừa xiêm bến tre online ship toàn quốc" */}
      <SectionDivider from="brand" to="brand-cream" />
      <section id="dat-online" className="scroll-mt-32 bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              {t("order.title1")}
              <br />
              <span className="text-mango">{t("order.title2")}</span>
            </h2>
            <p className="mb-10 text-center text-sm text-text/50">
              {t("order.desc")}
            </p>
          </FadeIn>

          {/* Price cards */}
          <FadeIn delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <span className="inline-block rounded-full bg-mango/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mango-dark">
                  {t("order.wholesale")}
                </span>
                <div className="mt-3 font-heading text-3xl font-bold text-text">
                  {t("order.wholesalePrice")}
                  <span className="text-sm font-medium text-text/50">{t("order.wholesaleUnit")}</span>
                </div>
                <p className="mt-2 text-sm text-text/60">
                  {t("order.wholesaleDesc")}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <span className="inline-block rounded-full bg-text/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-text/70">
                  {t("order.retail")}
                </span>
                <div className="mt-3 font-heading text-3xl font-bold text-text">
                  {t("order.retailPrice")}
                  <span className="text-sm font-medium text-text/50">{t("order.retailUnit")}</span>
                </div>
                <p className="mt-2 text-sm text-text/60">
                  {t("order.retailDesc")}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Ordering steps */}
          <FadeIn delay={0.2}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {orderSteps.map((item) => (
                <div key={item.step} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-mango font-heading text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-text/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="mt-10 text-center">
              <a
                href={ZALO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
              >
                {t("order.ctaZalo")}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ — SEO KW#6 */}
      <section className="bg-brand-cream px-5 pb-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 font-heading text-3xl font-bold uppercase text-text">
              {t("faq.title")}
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {faqItems.map(({ q, a }, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-text">{q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/70">{a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-4xl font-bold uppercase text-text">
              {t("shipping.title")}
            </h2>
            <p className="mb-10 text-center text-sm text-text/50">
              {t("shipping.desc")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-3">
              {SHIPPING_ROUTES.map((route) => (
                <Link
                  key={route.city}
                  href={route.href}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <Truck size={28} weight="duotone" className="mx-auto text-mango" />
                  <div className="mt-3 font-heading text-2xl font-bold text-text">
                    {route.city}
                  </div>
                  <div className="mt-1 text-sm text-text/60">
                    {route.time} · {route.method}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-text/50 transition-colors group-hover:text-text">
                    {t("shipping.viewDetail")}
                    <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Internal links */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-4">
          {internalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="rounded-full border-2 border-text/15 px-5 py-2.5 text-sm font-semibold text-text/70 hover:border-text hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
