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
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";

const ZALO_LINK =
  "https://zalo.me/0932585533?text=" +
  encodeURIComponent("Mình muốn đặt Dừa Xiêm Bến Tre (dừa sọ)");

const SELLING_POINTS = [
  {
    Icon: MapPin,
    title: "100% Bến Tre",
    desc: "Lấy thẳng từ nhà vườn Thạnh Phú — không qua trung gian, không pha trộn",
  },
  {
    Icon: Drop,
    title: "Nước ngọt thanh",
    desc: "Dừa xiêm xanh chín tới — vị ngọt tự nhiên, không gắt, không nhạt",
  },
  {
    Icon: Package,
    title: "Gọt sẵn premium",
    desc: "Dạng dừa sọ — gọt sạch vỏ, đóng gói đẹp, mở nắp uống liền",
  },
  {
    Icon: Truck,
    title: "Giao lạnh toàn quốc",
    desc: "HCM 24h · Hà Nội 48h · giữ lạnh đá khô từ vựa tới khách",
  },
];

const SHIPPING_ROUTES = [
  { city: "TP.HCM", time: "24h", method: "Xe lạnh", href: "/giao-hang/tp-hcm" },
  { city: "Hà Nội", time: "48h", method: "Xe lạnh / Bay", href: "/giao-hang/ha-noi" },
  { city: "Đà Nẵng", time: "36h", method: "Xe lạnh", href: "/giao-hang/da-nang" },
];

const INTERNAL_LINKS = [
  { label: "Tất cả sản phẩm", href: "/san-pham" },
  { label: "Xoài Tứ Quý", href: "/xoai-tu-quy" },
  { label: "Dừa Xiêm vs Miền Tây", href: "/dua-xiem-ben-tre/kien-thuc/dua-xiem-ben-tre-vs-dua-xiem-mien-tay" },
  { label: "Nguồn gốc & vựa", href: "/nguon-goc" },
  { label: "Liên hệ Zalo", href: ZALO_LINK },
];

export function DuaXiemBenTreLanding() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-20">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2">
          <div className="px-0 md:pl-10">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
                Đặc sản Bến Tre · Quanh năm
              </span>
              <h1 className="mt-3 font-heading text-4xl font-bold uppercase leading-tight text-text sm:text-5xl lg:text-6xl">
                Dừa Xiêm
                <br />
                <span className="text-mango">Bến Tre</span>
                <br />
                Dừa Sọ Gọt Sẵn
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-[480px] text-lg leading-7 text-text/70">
                Dừa xiêm xanh chín tới, gọt sạch vỏ thành dừa sọ — mở nắp uống
                liền. Lấy thẳng từ nhà vườn Thạnh Phú, Bến Tre. Nước ngọt
                thanh, không pha trộn, không chất bảo quản.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                >
                  Đặt qua Zalo
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
              Tại sao chọn dừa từ vựa
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SELLING_POINTS.map((sp, i) => (
              <FadeIn key={sp.title} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <sp.Icon size={32} weight="duotone" className="text-mango" />
                  <h3 className="mt-3 font-heading text-lg font-bold text-text">
                    {sp.title}
                  </h3>
                  <p className="mt-1 text-sm text-text/60">{sp.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — show variety */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              Dừa sọ — từ vựa
            </h2>
            <p className="mb-12 text-center text-sm text-text/50">
              Quy trình gọt thủ công tại vựa Thạnh Phú
            </p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                src: "/images/dua/dua-xiem-so-goi-hut-chan-khong-premium.jpg",
                alt: "Dừa sọ Bến Tre đóng gói hút chân không premium",
              },
              {
                src: "/images/dua/dua-xiem-so-chop-nhon-ro-xanh.jpg",
                alt: "Dừa sọ chóp nhọn xếp rổ xanh tại vựa",
              },
              {
                src: "/images/dua/dua-xiem-cong-nhan-che-bien-tai-vua.jpg",
                alt: "Công nhân vựa Thạnh Phú gọt dừa xiêm thành dừa sọ",
              },
              {
                src: "/images/dua/dua-xiem-xanh-nguyen-trai-dong-tai-vua.jpg",
                alt: "Dừa xiêm xanh nguyên trái đống tại vựa Bến Tre",
              },
              {
                src: "/images/dua/dua-xiem-so-tui-luoi-vang-van-chuyen.jpg",
                alt: "Dừa sọ đóng túi lưới vàng chuẩn bị vận chuyển",
              },
              {
                src: "/images/dua/dua-xiem-so-goc-goi-san-hang-loat.jpg",
                alt: "Dừa sọ gọt sẵn xếp hàng loạt tại vựa",
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
              Đặt dừa xiêm Bến Tre online
              <br />
              <span className="text-mango">ship toàn quốc</span>
            </h2>
            <p className="mb-10 text-center text-sm text-text/50">
              Đặt qua Zalo hoặc gọi — vựa báo giá + lịch giao trong 15 phút
            </p>
          </FadeIn>

          {/* Price cards */}
          <FadeIn delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <span className="inline-block rounded-full bg-mango/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mango-dark">
                  Sỉ
                </span>
                <div className="mt-3 font-heading text-3xl font-bold text-text">
                  8.000 – 10.000
                  <span className="text-sm font-medium text-text/50">₫/trái</span>
                </div>
                <p className="mt-2 text-sm text-text/60">
                  Từ 50 trái trở lên. Đóng túi lưới, ship xe lạnh.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <span className="inline-block rounded-full bg-text/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-text/70">
                  Lẻ
                </span>
                <div className="mt-3 font-heading text-3xl font-bold text-text">
                  15.000 – 18.000
                  <span className="text-sm font-medium text-text/50">₫/trái</span>
                </div>
                <p className="mt-2 text-sm text-text/60">
                  Từ 10 trái. Đóng gói hút chân không hoặc túi lưới.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Ordering steps */}
          <FadeIn delay={0.2}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { step: "1", title: "Nhắn Zalo/Gọi", desc: "Báo số lượng + địa chỉ giao. Vựa báo giá + lịch giao ngay." },
                { step: "2", title: "Chuyển khoản / COD", desc: "Chuyển khoản trước hoặc COD khi nhận hàng. Mối quen → mở sổ công nợ." },
                { step: "3", title: "Nhận hàng", desc: "Dừa giao tận nơi xe lạnh. HCM 24h, HN 48h. Hàng lỗi → bồi đơn sau." },
              ].map((item) => (
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
                Đặt dừa qua Zalo
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
              Câu hỏi thường gặp — Dừa Xiêm Bến Tre
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {[
              { q: "Đặt dừa xiêm Bến Tre online ship toàn quốc được không?", a: "Được. Vựa giao lạnh toàn quốc: TP.HCM 24h, Hà Nội 48h, Đà Nẵng 36h. Đặt qua Zalo hoặc gọi 0932 585 533." },
              { q: "Dừa sọ khác dừa xiêm nguyên trái sao?", a: "Dừa sọ là dừa xiêm đã gọt sạch vỏ xanh, chỉ còn sọ trắng + nước bên trong. Mở nắp uống liền, đóng gói đẹp, dễ ship xa." },
              { q: "Giá dừa xiêm Bến Tre bao nhiêu?", a: "Sỉ từ 50 trái: 8.000-10.000₫/trái. Lẻ từ 10 trái: 15.000-18.000₫/trái. Giá có thể thay đổi theo mùa, gọi vựa báo giá chính xác." },
              { q: "Nước dừa có ngọt không?", a: "Dừa xiêm Bến Tre nước ngọt thanh tự nhiên, không gắt. Vựa chọn trái chín tới — ngọt nhất." },
              { q: "Bảo quản dừa sọ được bao lâu?", a: "Dừa sọ chưa khui: ngăn mát 5-7 ngày. Đã khui: uống trong ngày. Dừa gói hút chân không: 10-14 ngày ngăn mát." },
            ].map(({ q, a }, i) => (
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
              Vận chuyển
            </h2>
            <p className="mb-10 text-center text-sm text-text/50">
              Bấm vào thành phố để coi chi tiết giao hàng
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
                    Xem chi tiết
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
          {INTERNAL_LINKS.map((link) => (
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
