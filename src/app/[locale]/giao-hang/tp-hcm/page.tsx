import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Truck, Package, Phone, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Xoài Tứ Quý Giao TP.HCM — 24h Từ Vựa Thạnh Phú | Trái Cây Bến Tre",
  description:
    "Giao xoài Tứ Quý Bến Tre đến TP.HCM trong 24h bằng xe lạnh. Gần vựa nhất — phí ship thấp nhất. Giao tận chợ, siêu thị, nhà hàng. Đặt sỉ: 0932 585 533.",
  keywords: [
    "xoài tứ quý giao hcm",
    "xoài bến tre tại tp hcm",
    "xoài sỉ tp hcm",
    "ship xoài bến tre sài gòn",
    "mua xoài tứ quý tp hcm",
  ],
  alternates: { canonical: `${SITE_URL}/giao-hang/tp-hcm` },
  openGraph: {
    title: "Xoài Tứ Quý Giao TP.HCM — 24h Từ Vựa Thạnh Phú",
    description: "Gần vựa nhất — phí ship thấp nhất. Xe lạnh 24h. Giao tận chợ.",
    url: `${SITE_URL}/giao-hang/tp-hcm`,
    images: [{ url: `${SITE_URL}/images/xoai-real-2.jpg`, width: 1200, height: 1500 }],
  },
};

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Giao hàng", url: `${SITE_URL}/giao-hang/tp-hcm` },
  { name: "TP.HCM", url: `${SITE_URL}/giao-hang/tp-hcm` },
]);

const WHY_CHOOSE = [
  "Gần vựa nhất trong 3 thành phố lớn — ship rẻ nhất, xoài tươi nhất",
  "Xe lạnh đi mỗi chiều, sáng hôm sau là tới TP.HCM",
  "Giao tận chợ đầu mối, siêu thị, nhà hàng, quán trái cây — chỗ nào cũng tới",
  "Đóng thùng carton hay xốp — tuỳ ý bạn hàng",
];

const FAQ = [
  {
    q: "Ship TP.HCM mấy tiếng?",
    a: "Xe chạy 6–8 tiếng từ Thạnh Phú. Xe lạnh đi chiều tối, sáng sớm hôm sau tới TP.HCM — tính từ lúc đặt không quá 24 giờ (đơn đặt trước 15h).",
  },
  {
    q: "Có giao tận chợ không?",
    a: "Có. Vựa giao tận chợ đầu mối Bình Điền, Hóc Môn, Thủ Đức và các quận nội thành. Nếu số lượng lớn (từ 5 thùng trở lên), liên hệ trước để sắp xếp điểm giao phù hợp.",
  },
  {
    q: "Lấy sỉ TP.HCM liên hệ ai?",
    a: "Liên hệ trực tiếp A Phúc — 0932 585 533 (gọi hoặc Zalo). Báo số lượng, điểm giao, loại xoài cần — vựa báo giá sỉ và lịch giao trong 15 phút.",
  },
];

export default async function GiaoHangTpHcmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
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
              Giao hàng toàn quốc · Tuyến Bến Tre – TP.HCM
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold uppercase leading-tight text-text sm:text-5xl">
              Xoài Tứ Quý Giao TP.HCM
              <br />
              <span className="text-mango">24h Từ Vựa Thạnh Phú</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-7 text-text/70">
              Thành phố gần vựa nhất — xe lạnh đi mỗi chiều, phí ship rẻ nhất,
              xoài tới tay trong 24 giờ. Giao tận chợ, nhà hàng, siêu thị.
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
              { Icon: Truck, title: "Thời gian giao", desc: "24 giờ từ vựa Thạnh Phú đến TP.HCM. Xe lạnh xuất bến hằng ngày buổi chiều tối." },
              { Icon: Package, title: "Đóng gói", desc: "Thùng carton hoặc thùng xốp tùy yêu cầu. Lưới xốp từng trái, lót đệm chống va đập." },
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
              Vì sao khách TP.HCM chọn vựa này?
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
              Câu hỏi thường gặp — Giao TP.HCM
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
              Đặt xoài giao TP.HCM ngay
            </h2>
            <p className="mt-4 text-text/70">
              Gọi hoặc nhắn Zalo — vựa báo giá & thời gian giao trong 15 phút.
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
            { label: "Tìm hiểu về Xoài Tứ Quý", href: "/xoai-tu-quy" },
            { label: "Giá xoài hôm nay", href: "/xoai-tu-quy#gia" },
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
