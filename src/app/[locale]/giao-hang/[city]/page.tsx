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
import { setRequestLocale } from "next-intl/server";
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
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const products = getActiveProducts().map((p) => p.shortName).join(" + ");
  const url = `${SITE_URL}/giao-hang/${slug}`;
  return {
    title: `Giao ${products} Bến Tre Đến ${city.name} — ${city.shippingHours}h Từ Vựa`,
    description: `Giao trái cây Bến Tre đến ${city.name} trong ${city.shippingHours}h bằng ${getMethodLabel(city.method)}. Xoài Tứ Quý + Dừa Xiêm sọ gọt sẵn. Phí ship ~${city.costEstimate}₫/thùng. Gọi: 0932 585 533.`,
    keywords: [
      `giao trái cây ${city.name.toLowerCase()}`,
      `xoài bến tre ${city.name.toLowerCase()}`,
      `dừa xiêm ${city.name.toLowerCase()}`,
      `ship trái cây ${city.name.toLowerCase()}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `Giao Trái Cây Bến Tre Đến ${city.name} — ${city.shippingHours}h`,
      description: `${getMethodLabel(city.method)}. Phí ~${city.costEstimate}₫/thùng 20kg.`,
      url,
    },
  };
}

export default async function CityShippingPage({ params }: Props) {
  const { locale, city: slug } = await params;
  setRequestLocale(locale);
  const city = getCity(slug);
  if (!city) notFound();

  const products = getActiveProducts();
  const breadcrumb = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: SITE_URL },
    { name: "Giao hàng", url: `${SITE_URL}/giao-hang/${slug}` },
    { name: city.name, url: `${SITE_URL}/giao-hang/${slug}` },
  ]);

  const faq = [
    {
      q: `Giao trái cây Bến Tre đến ${city.name} mất bao lâu?`,
      a: `Khoảng ${city.shippingHours} giờ bằng ${getMethodLabel(city.method).toLowerCase()}. Hàng đóng gói giữ lạnh, tươi khi đến nơi.`,
    },
    {
      q: `Phí ship ${city.name} bao nhiêu?`,
      a: `Ước tính ${city.costEstimate}₫/thùng 20kg. Phí chính xác báo khi đặt hàng — tùy trọng lượng và tuyến. Gọi 0932 585 533.`,
    },
    {
      q: `Xoài Tứ Quý ship ${city.name} có bị dập không?`,
      a: `Không. Mỗi trái bọc lưới xốp riêng, thùng carton đệm chống sốc. 3 năm giao toàn quốc, hàng hư < 2%. Dập → Zalo ảnh → bồi đơn sau.`,
    },
    {
      q: `Mua dừa xiêm sọ ship ${city.name} được không?`,
      a: `Được — dừa sọ gọt sẵn, đóng gói giữ lạnh. Sỉ 8-10k₫/trái, lẻ 15-18k₫/trái. Giao ${getMethodLabel(city.method).toLowerCase()} ${city.shippingHours}h.`,
    },
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
              Giao hàng toàn quốc · {REGION_LABELS[city.region]}
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold uppercase leading-tight text-text sm:text-5xl">
              Giao Trái Cây Bến Tre
              <br />
              <span className="text-mango">Đến {city.name}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-7 text-text/70">
              {getMethodLabel(city.method)} từ vựa Thạnh Phú — {city.shippingHours} giờ đến {city.name}.
              Xoài Tứ Quý CDĐL #00124 + Dừa Xiêm sọ gọt sẵn. Đóng gói chống dập, giữ lạnh suốt tuyến.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="tel:0932585533" className="flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors">
                <Phone size={18} weight="bold" />
                0932 585 533
              </a>
              <a href={`https://zalo.me/0932585533?text=${encodeURIComponent(`Mình muốn đặt trái cây ship ${city.name}`)}`} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-text/20 px-6 py-4 text-sm font-bold text-text hover:border-text transition-colors">
                Zalo đặt hàng
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
              Chi tiết giao {city.name}
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            <FadeIn delay={0.05}>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <Clock size={32} weight="duotone" className="text-mango" />
                <h3 className="mt-3 font-heading text-lg font-bold text-text">Thời gian</h3>
                <p className="mt-1 text-2xl font-bold text-text">{city.shippingHours}h</p>
                <p className="mt-1 text-sm text-text/60">{getMethodLabel(city.method)} từ vựa Thạnh Phú</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <Package size={32} weight="duotone" className="text-mango" />
                <h3 className="mt-3 font-heading text-lg font-bold text-text">Phí ship</h3>
                <p className="mt-1 text-2xl font-bold text-text">{city.costEstimate}₫</p>
                <p className="mt-1 text-sm text-text/60">Per thùng 20kg (ước tính)</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <Truck size={32} weight="duotone" className="text-mango" />
                <h3 className="mt-3 font-heading text-lg font-bold text-text">Đóng gói</h3>
                <p className="mt-1 text-sm text-text/60">Lưới xốp từng trái + thùng carton đệm chống sốc + giữ lạnh 2-8°C suốt tuyến.</p>
              </div>
            </FadeIn>
          </div>

          {/* City-specific note — unique content per page */}
          <FadeIn delay={0.2}>
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-text">Ghi chú tuyến {city.name}</h3>
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
              Sản phẩm giao {city.name}
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
              Câu hỏi thường gặp — Giao {city.name}
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
            { label: "Xoài Tứ Quý", href: "/xoai-tu-quy" },
            { label: "Dừa Xiêm Bến Tre", href: "/dua-xiem-ben-tre" },
            { label: "Tất cả sản phẩm", href: "/san-pham" },
            { label: "Liên hệ đặt sỉ", href: "/#contact" },
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
