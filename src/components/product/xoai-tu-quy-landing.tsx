/**
 * Xoài Tứ Quý product landing — bespoke JSX extracted from the former
 * `src/app/xoai-tu-quy/page.tsx` static route.
 *
 * Keep this as a dedicated component (not a generic template) because the
 * layout is deeply xoai-specific (price tiers, shipping, copy). When a third
 * product with different storytelling lands, either (a) create a sibling
 * bespoke component, or (b) refactor shared sections into `generic-product-landing`.
 */
import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  Leaf,
  Scales,
  Phone,
  Clock,
  TrendUp,
  Package,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { XoaiHeroCarousel } from "@/components/product/xoai-hero-carousel";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getPriceDataTranslated } from "@/lib/price-data";

// Icons are not translatable — titles/descs come from messages.xoaiTuQuy.sellingPoints
const SELLING_POINT_ICONS = [ShieldCheck, Leaf, Truck, Scales];

// Icons are not translatable — titles/descs come from messages.xoaiTuQuy.orderInfo.items
const ORDER_INFO_ICONS = [Package, TrendUp, Clock];

// Shipping routes — city/time/method are data (not translatable), hrefs are fixed
const SHIPPING_ROUTES = [
  { city: "TP.HCM", time: "24h", method: "Xe lạnh", href: "/giao-hang/tp-hcm" },
  { city: "Hà Nội", time: "48h", method: "Xe lạnh / Bay", href: "/giao-hang/ha-noi" },
  { city: "Đà Nẵng", time: "36h", method: "Xe lạnh", href: "/giao-hang/da-nang" },
];

export async function XoaiTuQuyLanding() {
  const t = await getTranslations("xoaiTuQuy");
  const tPrice = await getTranslations("priceData");
  const PRICE_DATA = getPriceDataTranslated(tPrice);
  type SellingPoint = { title: string; desc: string };
  type OrderItem = { title: string; desc: string };
  type InternalLink = { label: string; href: string };
  const sellingPoints = t.raw("sellingPoints") as SellingPoint[];
  const orderItems = t.raw("orderInfo.items") as OrderItem[];
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
              <p className="mt-4 flex items-center gap-2 text-sm text-text/50">
                <Clock size={16} weight="bold" />
                {t("hero.priceUpdated")} {PRICE_DATA.lastUpdated}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-[480px] text-lg leading-7 text-text/70">
                {t("hero.desc")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#gia"
                  className="rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                >
                  {t("hero.ctaPrice")}
                </Link>
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
            <XoaiHeroCarousel />
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
              <FadeIn key={i} delay={i * 0.08}>
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
      </section>

      {/* Gallery — ảnh thực tế từ vựa */}
      <section className="bg-brand-cream px-5 pb-20">
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
                src: "/images/xoai-17-04/xoai-tu-quy-vip-trai-to-cuong-la-tay-cam.jpg",
                alt: "Xoài Tứ Quý VIP trái to còn cuống lá — tay cầm tại vựa Thạnh Phú",
              },
              {
                src: "/images/xoai-thuc-te/xoai-tu-quy-bo-thit-vang-tay-cam.jpg",
                alt: "Xoài Tứ Quý bổ thịt vàng cam — tay cầm tại vựa",
              },
              {
                src: "/images/xoai-17-04/xoai-tu-quy-sot-xanh-nhieu-cuong-la-tuoi.jpg",
                alt: "Rổ xoài Tứ Quý còn cuống lá tươi — mới hái từ vườn",
              },
              {
                src: "/images/xoai-17-04/xoai-tu-quy-vip-hai-trai-tay-cam-so-sanh.jpg",
                alt: "Hai trái xoài Tứ Quý VIP so sánh kích thước — tay cầm",
              },
              {
                src: "/images/xoai-17-04/xoai-tu-quy-sot-vang-vua-thanh-phu-phan-loai.jpg",
                alt: "Vựa xoài Thạnh Phú phân loại — sọt vàng đầy xoài còn cuống",
              },
              {
                src: "/images/xoai-17-04/xoai-tu-quy-vip-can-canh-tay-cam-sot-nhieu-mau.jpg",
                alt: "Xoài Tứ Quý VIP cận cảnh — trái lớn tay cầm, nền nhiều rổ",
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

      {/* Price tiers — anchor #gia for in-page deep-links */}
      <section id="gia" className="scroll-mt-32 bg-brand-cream px-5 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-4xl font-bold uppercase text-text">
              {t("price.title")}
            </h2>
            <p className="mb-10 flex items-center justify-center gap-2 text-center text-sm text-text/50">
              <Clock size={14} weight="bold" />
              {t("price.updated")} {PRICE_DATA.lastUpdated}
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
                      {t("price.weightLabel")} {tier.weight}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text/60">
                      {tier.description}
                    </p>
                    <Link
                      href="/#contact"
                      className="mt-5 block w-full rounded-full bg-black py-3 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                    >
                      {t("price.ctaOrder")}
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-text/40">{PRICE_DATA.note}</p>
          <div className="mt-6 text-center">
            <a
              href="tel:0932585533"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
            >
              <Phone size={18} weight="bold" />
              {t("price.ctaCall")}
            </a>
          </div>
        </div>
      </section>

      {/* Thông tin đặt hàng */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-10 text-center font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              {t("orderInfo.title")}
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {orderItems.map((item, i) => {
              const Icon = ORDER_INFO_ICONS[i];
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div className="rounded-2xl bg-text/5 p-6 text-center">
                    {Icon && (
                      <Icon
                        size={32}
                        weight="duotone"
                        className="mx-auto text-mango"
                      />
                    )}
                    <h3 className="mt-3 font-heading text-lg font-bold text-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-text/60">{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* KW#9 anchor: vựa xoài tứ quý bến tre giá sỉ */}
      <section id="gia-si" className="scroll-mt-32 bg-brand px-5 pb-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              {t("wholesale.title1")}
              <br />
              <span className="text-mango">{t("wholesale.title2")}</span>
            </h2>
            <p className="mb-8 text-center text-sm text-text/50">
              {t("wholesale.desc")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-3">
              {PRICE_DATA.tiers.map((tier) => (
                <div key={tier.sku} className="rounded-2xl bg-text/5 p-5 text-center">
                  <span className={`inline-block rounded-full ${tier.badgeColor} px-3 py-1 text-xs font-bold uppercase text-white`}>
                    {tier.badge}
                  </span>
                  <div className="mt-2 font-heading text-2xl font-bold text-text">
                    {tier.priceRange}<span className="text-sm font-medium text-text/50">₫/kg</span>
                  </div>
                  <p className="mt-1 text-xs text-text/40">{tier.weight}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-text/5 p-5">
              <ul className="space-y-2 text-sm text-text/70">
                <li>• {t("wholesale.bulletMin")}</li>
                <li>• {t("wholesale.bulletPayment")}</li>
                <li>• {t("wholesale.bulletVat")}</li>
                <li>• {t("wholesale.bulletShip")}</li>
              </ul>
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://zalo.me/0932585533?text=M%C3%ACnh%20mu%E1%BB%91n%20l%E1%BA%A5y%20s%E1%BB%89%20xo%C3%A0i%20T%E1%BB%A9%20Qu%C3%BD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
              >
                {t("wholesale.ctaZalo")}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Shipping — 3 cards clickable tới trang giao hàng tương ứng */}
      <SectionDivider from="brand" to="brand-cream" />
      <section id="giao-hang" className="scroll-mt-32 bg-brand-cream px-5 py-20">
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
                  <Truck
                    size={28}
                    weight="duotone"
                    className="mx-auto text-mango"
                  />
                  <div className="mt-3 font-heading text-2xl font-bold text-text">
                    {route.city}
                  </div>
                  <div className="mt-1 text-sm text-text/60">
                    {route.time} · {route.method}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-text/50 transition-colors group-hover:text-text">
                    {t("shipping.viewDetail")}
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-text/50">
              {t("shipping.note")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Internal links */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-4">
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border-2 border-text/15 px-5 py-2.5 text-sm font-semibold text-text/70 hover:border-text hover:text-text transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
