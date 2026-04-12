import type { Metadata } from "next";
import { Truck, Package, Phone, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Mua Xoài Bến Tre Chính Gốc Ở Đâu Hà Nội? — Giao 48h Từ Vựa Thạnh Phú",
  description:
    "Mua xoài Bến Tre chính gốc ở đâu Hà Nội? Đặt trực tiếp từ vựa Thạnh Phú CDĐL #00124. Giao lạnh 48h, đóng gói chống dập. Gọi: 0932 585 533.",
  keywords: [
    "mua xoài bến tre chính gốc ở đâu hà nội",
    "xoài tứ quý giao hà nội",
    "mua xoài bến tre tại hà nội",
    "xoài sỉ hà nội",
    "ship xoài bến tre ra bắc",
    "xoài tứ quý thạnh phú hà nội",
  ],
  alternates: { canonical: `${SITE_URL}/giao-hang/ha-noi` },
  openGraph: {
    title: "Mua Xoài Bến Tre Chính Gốc Hà Nội — Giao 48h Từ Vựa",
    description: "Mua xoài Bến Tre chính gốc Hà Nội. CDĐL #00124, giao lạnh 48h. Đóng gói chống dập.",
    url: `${SITE_URL}/giao-hang/ha-noi`,
    images: [{ url: `${SITE_URL}/images/xoai-real-2.jpg`, width: 1200, height: 1500 }],
  },
};

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Giao hàng", url: `${SITE_URL}/giao-hang/ha-noi` },
  { name: "Hà Nội", url: `${SITE_URL}/giao-hang/ha-noi` },
]);

const WHY_CHOOSE = [
  "95% xoài vựa bán ra Bắc — đóng gói ship xa đã quen tay",
  "Xe lạnh giữ 8–12°C suốt tuyến, hoặc gửi bay trong ngày nếu gấp",
  "Thùng xốp đục lỗ + lưới xốp từng trái + đệm chống sốc — hàng hư không tới 2%",
  "Nhận thấy hàng hư → chụp hình gửi Zalo, đơn sau vựa bồi liền, không hỏi nhiều",
];

const FAQ = [
  {
    q: "Mua xoài Bến Tre chính gốc ở đâu Hà Nội?",
    a: "Đặt trực tiếp từ vựa Trái Cây Bến Tre tại Thạnh Phú. Xoài có Chỉ dẫn địa lý CDĐL #00124 do Cục SHTT cấp — đảm bảo chính gốc. Gọi 0932 585 533 hoặc nhắn Zalo, vựa báo giá + lịch giao trong 15 phút.",
  },
  {
    q: "Làm sao biết xoài Bến Tre chính gốc, không phải hàng trộn?",
    a: "Mỗi thùng có tem CDĐL #00124 + QR truy xuất nguồn gốc: tên vườn, ngày hái, người thu hoạch. Xoài Tứ Quý chính gốc có vị mặn nhẹ cuối lưỡi đặc trưng — chỗ khác không có.",
  },
  {
    q: "Ship Hà Nội mấy ngày?",
    a: "Thông thường 48 giờ từ khi đóng hàng tại vựa Thạnh Phú. Xe lạnh khởi hành mỗi ngày 17h–18h, đến Hà Nội sáng ngày kế. Nếu cần gấp hơn, chọn phương án gửi bay — hàng đến trong ngày.",
  },
  {
    q: "Xoài có bị dập khi giao xa không?",
    a: "Không. Mỗi trái bọc lưới xốp riêng, đặt thùng xốp đục lỗ thoáng khí, giữa các lớp có đệm lót. Cách đóng này vựa làm 3 năm cho khách Hà Nội rồi — hàng hư không tới 2%.",
  },
  {
    q: "Phí ship Hà Nội bao nhiêu?",
    a: "Phí ship xe lạnh tuyến Bến Tre – Hà Nội khoảng 35.000–50.000đ/thùng 20kg (báo chính xác khi đặt hàng). Gửi bay cao hơn, phụ thuộc chuyến. Gọi 0932 585 533 để báo giá trước.",
  },
];

export default function GiaoHangHaNoiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-20">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Giao hàng toàn quốc · Tuyến Bến Tre – Hà Nội
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold uppercase leading-tight text-text sm:text-5xl">
              Xoài Tứ Quý Giao Hà Nội
              <br />
              <span className="text-mango">48h Từ Vựa Thạnh Phú</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-7 text-text/70">
              Xe lạnh duy trì 8–12°C hoặc gửi bay trong ngày nếu gấp. Đóng gói
              chống dập chuẩn tuyến xa. 95% xoài vựa bán cho mối ngoài Bắc —
              quen tuyến lắm rồi.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="tel:0932585533"
                className="flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
              >
                <Phone size={18} weight="bold" />
                Gọi đặt hàng: 0932 585 533
              </a>
              <a
                href="https://zalo.me/0932585533"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-text/20 px-6 py-4 text-sm font-bold text-text hover:border-text transition-colors"
              >
                Zalo: 0932 585 533
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
              Chi tiết vận chuyển
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { Icon: Truck, title: "Thời gian giao", desc: "48 giờ từ vựa Thạnh Phú đến Hà Nội. Xe lạnh hằng ngày hoặc gửi bay hỏa tốc." },
              { Icon: Package, title: "Đóng gói", desc: "Thùng xốp đục lỗ + lưới xốp từng trái + đệm chống sốc. Chuẩn tuyến xa 48h+" },
              { Icon: CheckCircle, title: "Bảo hành", desc: "Hàng hư không tới 2%. Trái dập → gửi ảnh Zalo, đơn sau bồi liền. Không hỏi nhiều." },
            ].map(({ Icon, title, desc }, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <Icon size={32} weight="duotone" className="text-mango" />
                  <h3 className="mt-3 font-heading text-lg font-bold text-text">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text/60">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* Why choose */}
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 font-heading text-3xl font-bold uppercase text-text">
              Vì sao khách Hà Nội chọn vựa này?
            </h2>
          </FadeIn>
          <ul className="space-y-4">
            {WHY_CHOOSE.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <li className="flex items-start gap-3 rounded-2xl bg-text/5 p-4">
                  <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-text" />
                  <span className="text-sm leading-relaxed text-text/80">{item}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* FAQ */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 font-heading text-3xl font-bold uppercase text-text">
              Câu hỏi thường gặp — Giao Hà Nội
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {FAQ.map(({ q, a }, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-text">{q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/70">{a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* CTA */}
      <section className="bg-brand px-5 py-20 text-center">
        <div className="mx-auto max-w-[600px]">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold uppercase text-text">
              Lấy xoài ra Hà Nội
            </h2>
            <p className="mt-4 text-text/70">
              Gọi hoặc nhắn Zalo — vựa báo giá + lịch giao trong 15 phút.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="tel:0932585533"
                className="flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
              >
                <Phone size={18} weight="bold" />
                0932 585 533
              </a>
              <a
                href="https://zalo.me/0932585533"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-text/20 px-6 py-4 text-sm font-bold text-text hover:border-text transition-colors"
              >
                Zalo ngay
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Internal links */}
      <SectionDivider from="brand" to="brand-cream" />
      <section className="bg-brand-cream px-5 py-12">
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-3">
          {[
            { label: "Xoài Tứ Quý", href: "/xoai-tu-quy" },
            { label: "Dừa Xiêm Bến Tre", href: "/dua-xiem-ben-tre" },
            { label: "Tất cả sản phẩm", href: "/san-pham" },
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
