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
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { PRICE_DATA } from "@/lib/price-data";

const SELLING_POINTS = [
  {
    Icon: ShieldCheck,
    title: "CDĐL #00124",
    desc: "Chỉ xoài Thạnh Phú mới được gọi tên này",
  },
  {
    Icon: Leaf,
    title: "Đất giồng cát nhiễm mặn",
    desc: "Cho vị mặn nhẹ cuối lưỡi — chỗ khác không có",
  },
  {
    Icon: Truck,
    title: "Giao lạnh toàn quốc",
    desc: "HCM 24h · Hà Nội 48h · hàng hư không tới 2%",
  },
  {
    Icon: Scales,
    title: "Cân dư 2%",
    desc: "Cân dư bù hao. Hàng hư — đơn sau bồi liền",
  },
];

const ORDER_INFO = [
  {
    Icon: Package,
    title: "Lấy tối thiểu",
    desc: "1 thùng 20kg. Đóng thùng theo ý bạn hàng.",
  },
  {
    Icon: TrendUp,
    title: "Thanh toán",
    desc: "COD hoặc chuyển khoản trước. Mối quen 3 đơn → mở sổ. Xuất VAT đầy đủ.",
  },
  {
    Icon: Clock,
    title: "Giờ vựa làm",
    desc: "4h sáng – 18h mỗi ngày. Zalo trả 5 phút.",
  },
];

const SHIPPING_ROUTES = [
  { city: "TP.HCM", time: "24h", method: "Xe lạnh", href: "/giao-hang/tp-hcm" },
  { city: "Hà Nội", time: "48h", method: "Xe lạnh / Bay", href: "/giao-hang/ha-noi" },
  { city: "Đà Nẵng", time: "36h", method: "Xe lạnh", href: "/giao-hang/da-nang" },
];

const INTERNAL_LINKS = [
  { label: "Nguồn gốc & chứng nhận", href: "/nguon-goc" },
  { label: "Kiến thức xoài Tứ Quý", href: "/kien-thuc/xoai-tu-quy-la-gi" },
  { label: "Tin tức & báo giá", href: "/tin-tuc" },
  { label: "Liên hệ đặt sỉ", href: "/#contact" },
];

export function XoaiTuQuyLanding() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-20">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2">
          <div className="px-0 md:pl-10">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
                Đặc sản Thạnh Phú, Bến Tre
              </span>
              <h1 className="mt-3 font-heading text-4xl font-bold uppercase leading-tight text-text sm:text-5xl lg:text-6xl">
                Xoài Tứ Quý
                <br />
                <span className="text-mango">Lấy Thẳng</span>
                <br />
                Từ Vựa
              </h1>
              <p className="mt-4 flex items-center gap-2 text-sm text-text/50">
                <Clock size={16} weight="bold" />
                Giá cập nhật: {PRICE_DATA.lastUpdated}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-[480px] text-lg leading-7 text-text/70">
                Trồng trên đất giồng cát ven biển, nhiễm mặn tự nhiên — cho ra
                cái vị mặn nhẹ cuối lưỡi mà không chỗ nào làm lại được. Có Chỉ
                dẫn địa lý CDĐL #00124 do Cục SHTT cấp.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#gia"
                  className="rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                >
                  Xem giá hôm nay
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
            <div className="relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-3xl shadow-2xl md:aspect-[4/5]">
              <Image
                src="/images/xoai-real-2.jpg"
                alt="Xoài Tứ Quý Bến Tre — tay cầm quả lớn tại vựa"
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
        <div className="mx-auto grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SELLING_POINTS.map((sp, i) => (
            <FadeIn key={i} delay={i * 0.08}>
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
      </section>

      {/* Price tiers — anchor #gia cho deep-link từ nav "Giá hôm nay" */}
      <section id="gia" className="scroll-mt-32 bg-brand-cream px-5 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-4xl font-bold uppercase text-text">
              Bảng giá hôm nay
            </h2>
            <p className="mb-10 flex items-center justify-center gap-2 text-center text-sm text-text/50">
              <Clock size={14} weight="bold" />
              Cập nhật: {PRICE_DATA.lastUpdated}
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
                      Trọng lượng: {tier.weight}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text/60">
                      {tier.description}
                    </p>
                    <Link
                      href="/#contact"
                      className="mt-5 block w-full rounded-full bg-black py-3 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                    >
                      Đặt hàng
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
              Gọi vựa: 0932 585 533
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
              Thông tin đặt hàng
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {ORDER_INFO.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="rounded-2xl bg-text/5 p-6 text-center">
                  <item.Icon
                    size={32}
                    weight="duotone"
                    className="mx-auto text-mango"
                  />
                  <h3 className="mt-3 font-heading text-lg font-bold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-text/60">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping — 3 cards clickable tới trang giao hàng tương ứng */}
      <SectionDivider from="brand" to="brand-cream" />
      <section id="giao-hang" className="scroll-mt-32 bg-brand-cream px-5 py-20">
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
                    Xem chi tiết
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
              Mỗi trái bọc lưới xốp riêng, xếp thùng carton có lót đệm. Hàng
              hư không tới 2%. Có trái dập → chụp gửi Zalo, đơn sau bồi liền.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Internal links */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-4">
          {INTERNAL_LINKS.map((link) => (
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
