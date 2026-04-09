import type { Metadata } from "next";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  SITE_URL,
} from "@/lib/structured-data";

const PAGE_URL = `${SITE_URL}/tin-tuc/bao-gia-xoai-tu-quy-thang-04-2026`;

export const metadata: Metadata = {
  title: "Báo Giá Xoài Tứ Quý Tháng 4/2026 — Giá Sỉ Cập Nhật",
  description:
    "Tổng hợp giá xoài Tứ Quý Bến Tre tháng 4/2026. Vụ 1 đạt chất lượng cao, nguồn cung ổn định.",
  keywords: [
    "báo giá xoài tứ quý",
    "giá xoài bến tre tháng 4",
    "xoài tứ quý vụ 1 2026",
    "giá xoài sỉ tháng 4 2026",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Báo Giá Xoài Tứ Quý Tháng 4/2026 — Giá Sỉ Cập Nhật",
    description:
      "VIP 23–25k, Loại 1 20–22k, Loại 2 16–18k. Vụ 1 chất lượng cao. Gọi 0932 585 533.",
    url: PAGE_URL,
  },
};

const articleJsonLd = getArticleJsonLd({
  title: "Báo Giá Xoài Tứ Quý Tháng 4/2026 — Vụ 1 Đạt Chất Lượng VIP",
  description:
    "Tổng hợp giá xoài Tứ Quý Bến Tre tháng 4/2026. Vụ 1 đạt chất lượng cao, nguồn cung ổn định.",
  url: PAGE_URL,
  datePublished: "2026-04-09",
  dateModified: "2026-04-09",
});

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Tin tức", url: `${SITE_URL}/tin-tuc` },
  { name: "Báo giá tháng 4/2026", url: PAGE_URL },
]);

const PRICE_TIERS = [
  {
    grade: "VIP",
    range: "23.000 – 25.000đ",
    badge: "bg-yellow-500",
    note: "Trái đều, đẹp, trên 300g/trái",
  },
  {
    grade: "Loại 1",
    range: "20.000 – 22.000đ",
    badge: "bg-orange-400",
    note: "Trái đạt chuẩn, 200–300g/trái",
  },
  {
    grade: "Loại 2",
    range: "16.000 – 18.000đ",
    badge: "bg-stone-400",
    note: "Trái nhỏ hoặc không đều, dưới 200g",
  },
];

export default function BaoGiaThang04Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-16">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-mango/15 px-3 py-0.5 text-xs font-bold text-mango">
                Báo giá
              </span>
              <time dateTime="2026-04-09" className="text-xs text-text/40">
                09/04/2026
              </time>
            </div>
            <h1 className="font-heading text-[32px] font-bold uppercase leading-tight text-text sm:text-5xl">
              Báo Giá Xoài Tứ Quý
              <br />
              <span className="text-mango">Tháng 4/2026</span>
              <br />
              Vụ 1 Đạt Chất Lượng VIP
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-text/60">
              Tổng hợp giá xoài Tứ Quý Bến Tre tháng 4/2026. Vụ 1 bắt đầu với
              chất lượng cao, nguồn cung ổn định từ vựa Thạnh Phú.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Main content */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[800px] space-y-12">

          {/* 1. Tổng quan */}
          <FadeIn>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Tổng quan tháng 4
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Vụ 1 năm 2026 chính thức bắt đầu từ đầu tháng 4. Thời tiết
                thuận lợi — ít mưa, nắng ổn định — giúp xoài đạt độ ngọt và
                màu sắc đặc trưng. Tỷ lệ trái VIP trong vụ này cao hơn trung
                bình, ước tính chiếm 40–45% sản lượng. Vựa Thạnh Phú đang hoạt
                động hết công suất để đáp ứng nhu cầu từ các tỉnh phía Bắc.
              </p>
            </div>
          </FadeIn>

          {/* 2. Bảng giá */}
          <FadeIn>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Bảng giá hiện tại
              </h2>
              <p className="mt-2 text-xs text-text/40">
                Giá tại vựa Thạnh Phú — cập nhật 09/04/2026
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                {/* Header row */}
                <div className="grid grid-cols-3 bg-text/5 px-5 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-text/50">Loại</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-text/50">Giá/kg</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-text/50">Ghi chú</span>
                </div>
                {PRICE_TIERS.map((tier, i) => (
                  <div
                    key={tier.grade}
                    className={`grid grid-cols-3 items-center px-5 py-4 ${
                      i < PRICE_TIERS.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${tier.badge}`} />
                      <span className="font-semibold text-text">{tier.grade}</span>
                    </div>
                    <span className="font-heading text-lg font-bold text-text">
                      {tier.range}
                    </span>
                    <span className="text-sm text-text/60">{tier.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* 3. Tình hình cung cầu */}
          <FadeIn>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Tình hình cung cầu
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Nguồn cung tháng 4 ổn định nhờ Vụ 1 ra trái đúng kỳ. Nhu cầu
                tăng mạnh từ các đầu mối Hà Nội, Hải Phòng, và các tỉnh miền
                Bắc — chiếm khoảng <strong>95% tổng sản lượng xuất</strong> của
                vựa. Thị trường miền Nam chủ yếu tiêu thụ xoài xanh, giữ ổn
                định so với tháng trước. Giá ít biến động trong tuần đầu tháng,
                dự kiến tăng nhẹ vào cuối tháng khi nhu cầu thị trường Bắc tăng
                theo mùa hè.
              </p>
            </div>
          </FadeIn>

          {/* 4. Dự báo vụ */}
          <FadeIn>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Dự báo vụ mùa
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-text/70">
                <li className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-mango" />
                  <span>
                    <strong className="text-text">Vụ 1</strong> kéo dài từ tháng
                    4 đến hết tháng 6. Giá dự kiến ổn định ở mức 20.000–25.000đ/kg
                    tùy loại, trừ biến động thời tiết bất thường.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-mango/50" />
                  <span>
                    <strong className="text-text">Vụ 2</strong> dự kiến bắt đầu
                    tháng 8/2026. Sản lượng thường thấp hơn Vụ 1, giá có thể
                    cao hơn 10–15%.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-mango/30" />
                  <span>
                    Khuyến nghị đặt hàng sớm trong tháng 4–5 để đảm bảo nguồn
                    hàng VIP số lượng lớn.
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* 5. CTA */}
          <FadeIn>
            <div className="rounded-2xl bg-text p-8 text-center text-white">
              <h2 className="font-heading text-2xl font-bold uppercase">
                Liên hệ đặt hàng
              </h2>
              <p className="mt-3 text-sm text-white/70">
                Gọi hoặc nhắn Zalo để nhận báo giá chính xác theo số lượng.
                Hoạt động 4h–18h hàng ngày.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="tel:0932585533"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-text hover:bg-mango hover:text-white transition-colors"
                >
                  <Phone size={18} weight="bold" />
                  Gọi: 0932 585 533
                </a>
                <a
                  href="https://zalo.me/0932585533"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:border-white transition-colors"
                >
                  Zalo ngay
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Internal links */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-4">
          {[
            { label: "← Tất cả tin tức", href: "/tin-tuc" },
            { label: "Giá xoài hôm nay", href: "/gia-xoai-hom-nay" },
            { label: "Sản phẩm xoài Tứ Quý", href: "/xoai-tu-quy" },
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

      <Footer />
    </>
  );
}
