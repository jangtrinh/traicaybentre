/**
 * Xoài Hoàng Kim Thạnh Phú — premium product landing.
 *
 * Positioning: "Tứ Quý da vàng kim — ngọt lịm không xơ, hàng hiếm"
 * Target: quà biếu VIP, nhà hàng cao cấp, khách sành ăn
 */
import Image from "next/image";
import Link from "next/link";
import { Truck, Phone, Crown, Sparkle, Leaf, Scales } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";

const ZALO_LINK =
  "https://zalo.me/0932585533?text=" +
  encodeURIComponent("Mình muốn đặt Xoài Hoàng Kim Thạnh Phú (hàng hiếm)");

const SELLING_POINTS = [
  {
    Icon: Crown,
    title: "Da vàng kim đẹp",
    desc: "Chín vàng óng — đẹp mắt hơn Tứ Quý thường. Trái to 800g-1.5kg, da mịn không tì vết.",
  },
  {
    Icon: Sparkle,
    title: "Ngọt lịm, không xơ",
    desc: "Ăn chín ngọt lịm như Cát Hòa Lộc. Gần không có xơ — thịt mịn tan trong miệng.",
  },
  {
    Icon: Leaf,
    title: "Vị mặn nhẹ Thạnh Phú",
    desc: "Giữ nguyên vị mặn nhẹ cuối lưỡi từ đất giồng cát nhiễm mặn — DNA Tứ Quý chính gốc.",
  },
  {
    Icon: Truck,
    title: "Hàng hiếm, giao lạnh",
    desc: "Sản lượng ít, hết là đợi vụ sau. Giao lạnh toàn quốc — HCM 24h, HN 48h.",
  },
];

const COMPARE = [
  { feature: "Da", tuQuy: "Xanh → vàng nhẹ", hoangKim: "Vàng kim đậm, óng ả" },
  { feature: "Thịt", tuQuy: "Ngọt đậm, ít xơ", hoangKim: "Ngọt lịm, gần KHÔNG xơ" },
  { feature: "Trọng lượng", tuQuy: "400-800g/trái", hoangKim: "800g-1.5kg/trái" },
  { feature: "Vị mặn đặc trưng", tuQuy: "✓ Có", hoangKim: "✓ Có (nhẹ hơn)" },
  { feature: "Giá", tuQuy: "16-25k/kg", hoangKim: "35-45k/kg" },
  { feature: "Phù hợp", tuQuy: "Ăn tươi, bán lẻ, chế biến", hoangKim: "Quà biếu VIP, nhà hàng cao cấp" },
  { feature: "Sản lượng", tuQuy: "Dồi dào quanh năm", hoangKim: "Hàng hiếm, có mùa" },
];

const FAQ = [
  { q: "Xoài Hoàng Kim là gì?", a: "Biến thể premium của Xoài Tứ Quý — da vàng kim khi chín, thịt ngọt lịm gần không xơ. Cùng giống Tứ Quý, cùng vùng Thạnh Phú, nhưng hiếm hơn nhiều." },
  { q: "Hoàng Kim khác Tứ Quý thường sao?", a: "Da vàng đậm (thay vì xanh-vàng). Thịt mịn hơn, ngọt lịm hơn, gần không xơ. Trái to hơn (800g-1.5kg). Giá 35-45k/kg (gấp 1.5-2x)." },
  { q: "Tại sao Hoàng Kim đắt hơn?", a: "Sản lượng rất ít — chỉ một số vườn có giống này. Trái to đẹp, chất lượng thịt vượt trội. Hàng hiếm = giá premium." },
  { q: "Hoàng Kim có quanh năm không?", a: "Không — theo mùa vụ Tứ Quý (T4-6, T8-10, T12-2) nhưng sản lượng ít hơn nhiều. Hết là đợi vụ sau. Đặt sớm để giữ hàng." },
  { q: "Dùng Hoàng Kim làm quà biếu được không?", a: "Rất phù hợp — trái vàng kim đẹp, to nặng tay (800g+), ngọt lịm. Đóng hộp 5kg = 4-6 trái, ấn tượng hơn VIP thường." },
];

export function XoaiHoangKimLanding() {
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
                Premium · Hàng Hiếm
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold uppercase leading-tight text-text sm:text-5xl lg:text-6xl">
                Xoài Hoàng Kim
                <br />
                <span className="text-mango">Thạnh Phú</span>
              </h1>
              <p className="mt-2 text-lg font-semibold text-amber-700">
                35.000 – 45.000₫/kg
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-[480px] text-lg leading-7 text-text/70">
                Biến thể premium của Tứ Quý — da vàng kim đẹp mắt, thịt ngọt
                lịm như Cát Hòa Lộc, gần không có xơ. Cùng vùng đất giồng cát
                nhiễm mặn Thạnh Phú, nhưng hiếm hơn — hết là đợi vụ sau.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-amber-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-amber-700 transition-colors"
                >
                  Đặt Hoàng Kim qua Zalo
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
          {SELLING_POINTS.map((sp, i) => (
            <FadeIn key={sp.title} delay={i * 0.08}>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <sp.Icon size={32} weight="duotone" className="text-amber-600" />
                <h3 className="mt-3 font-heading text-lg font-bold text-text">{sp.title}</h3>
                <p className="mt-1 text-sm text-text/60">{sp.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Compare: Hoàng Kim vs Tứ Quý thường */}
      <section className="bg-brand-cream px-5 pb-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 text-center font-heading text-3xl font-bold uppercase text-text">
              Hoàng Kim vs Tứ Quý thường
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
              <table className="w-full text-sm">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="p-3 text-left font-heading text-xs uppercase tracking-wider text-text/50">Tiêu chí</th>
                    <th className="p-3 text-left font-heading text-xs uppercase tracking-wider text-text/50">Tứ Quý</th>
                    <th className="p-3 text-left font-heading text-xs uppercase tracking-wider text-amber-700">Hoàng Kim ⭐</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
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
              Câu hỏi thường gặp — Xoài Hoàng Kim
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {FAQ.map(({ q, a }, i) => (
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
          {[
            { label: "Xoài Tứ Quý (giá sỉ)", href: "/xoai-tu-quy#gia" },
            { label: "Dừa Xiêm Bến Tre", href: "/dua-xiem-ben-tre" },
            { label: "Tất cả sản phẩm", href: "/san-pham" },
            { label: "Quà biếu đặc sản", href: "/san-pham#qua-bieu-ben-tre" },
          ].map((link) => (
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
