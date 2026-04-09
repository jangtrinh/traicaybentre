import type { Metadata } from "next";
import { Phone, Clock, TrendUp, Package } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { PRICE_DATA } from "@/lib/price-data";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Giá Xoài Tứ Quý Hôm Nay — Cập Nhật Mỗi Sáng | Bến Tre",
  description:
    "Giá xoài Tứ Quý Bến Tre hôm nay: VIP 23.000–25.000đ/kg, Loại 1 20.000–22.000đ/kg, Loại 2 16.000–18.000đ/kg. Cập nhật mỗi sáng từ vựa Thạnh Phú.",
  keywords: [
    "giá xoài tứ quý hôm nay",
    "giá xoài bến tre",
    "xoài tứ quý giá bao nhiêu",
    "giá xoài sỉ bến tre",
    "bảng giá xoài tứ quý",
  ],
  alternates: { canonical: `${SITE_URL}/gia-xoai-hom-nay` },
  openGraph: {
    title: "Giá Xoài Tứ Quý Hôm Nay — Cập Nhật Mỗi Sáng",
    description: "Giá trực tiếp từ vựa Thạnh Phú. Gọi 0932 585 533 để có giá chính xác.",
    url: `${SITE_URL}/gia-xoai-hom-nay`,
  },
};

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Giá xoài hôm nay", url: `${SITE_URL}/gia-xoai-hom-nay` },
]);

export default function GiaXoaiHomNayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-16">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Vựa Thạnh Phú, Bến Tre
            </span>
            <h1 className="mt-3 font-heading text-[36px] font-bold uppercase leading-tight text-text sm:text-5xl">
              Giá Xoài Tứ Quý
              <br />
              <span className="text-mango">Hôm Nay</span>
            </h1>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-text/50">
              <Clock size={16} weight="bold" />
              Cập nhật: {PRICE_DATA.lastUpdated}
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Price table */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[900px]">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
              {/* Table header */}
              <div className="grid grid-cols-4 gap-2 border-b border-border bg-text/3 px-6 py-4">
                <div className="text-xs font-bold uppercase tracking-wider text-text/50">Loại</div>
                <div className="text-xs font-bold uppercase tracking-wider text-text/50">Giá (đ/kg)</div>
                <div className="text-xs font-bold uppercase tracking-wider text-text/50">Trọng lượng</div>
                <div className="text-xs font-bold uppercase tracking-wider text-text/50">Mô tả</div>
              </div>

              {/* Rows */}
              {PRICE_DATA.tiers.map((tier, i) => (
                <div
                  key={tier.sku}
                  className={`grid grid-cols-4 gap-2 px-6 py-5 ${
                    i < PRICE_DATA.tiers.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div>
                    <span className={`inline-block rounded-full ${tier.badgeColor} px-2.5 py-0.5 text-xs font-bold text-white`}>
                      {tier.badge}
                    </span>
                    <div className="mt-1 text-sm font-semibold text-text">{tier.name}</div>
                  </div>
                  <div className="font-heading text-2xl font-bold text-text">
                    {tier.priceRange}
                  </div>
                  <div className="text-sm text-text/60">{tier.weight}</div>
                  <div className="text-sm text-text/60">{tier.description}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.1}>
            <div className="mt-8 rounded-2xl bg-text/5 p-6 text-center">
              <p className="text-sm text-text/60">
                {PRICE_DATA.note}
              </p>
              <a
                href="tel:0932585533"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
              >
                <Phone size={18} weight="bold" />
                Gọi vựa: 0932 585 533
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Ordering info */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-10 text-center font-heading text-3xl font-bold uppercase text-text">
              Thông tin đặt hàng
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { Icon: Package, title: "MOQ", desc: "Tối thiểu 1 thùng 20kg. Đóng thùng linh hoạt theo yêu cầu." },
              { Icon: TrendUp, title: "Thanh toán", desc: "COD hoặc CK trước. Sổ công nợ sau 3 đơn. Hóa đơn VAT." },
              { Icon: Clock, title: "Giờ hoạt động", desc: "4h sáng — 18h hàng ngày. Zalo phản hồi trong 5 phút." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-text/5 p-5 text-center">
                  <item.Icon size={28} weight="duotone" className="mx-auto text-mango" />
                  <h3 className="mt-2 font-heading text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-1 text-sm text-text/60">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <SectionDivider from="brand" to="brand-cream" />
      <section className="bg-brand-cream px-5 py-16">
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-4">
          {[
            { label: "Xoài Tứ Quý — Sản phẩm", href: "/xoai-tu-quy" },
            { label: "Nguồn gốc & chứng nhận", href: "/nguon-goc" },
            { label: "Kiến thức xoài Tứ Quý", href: "/kien-thuc/xoai-tu-quy-la-gi" },
            { label: "Liên hệ đặt sỉ", href: "/#contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border-2 border-text/15 px-5 py-2.5 text-sm font-semibold text-text/70 hover:border-text hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />
      <Footer />
    </>
  );
}
