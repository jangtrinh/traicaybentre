import type { Metadata } from "next";
import { Certificate, Leaf, ShieldCheck, QrCode, Drop, Waves, Bag, MapPin, Factory } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/fade-in";
import { ImageCarousel } from "@/components/image-carousel";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionDivider } from "@/components/section-divider";

/* Carousel image groups */
const VUON_IMAGES = [
  { src: "/images/xoai-17-04/xoai-tu-quy-sot-xanh-nhieu-cuong-la-tuoi.jpg", alt: "Xoài Tứ Quý mới hái từ vườn — còn cuống lá tươi, xếp rổ xanh" },
  { src: "/images/xoai-17-04/xoai-tu-quy-sot-vang-vua-thanh-phu-phan-loai.jpg", alt: "Vựa xoài Thạnh Phú phân loại — sọt vàng đầy xoài còn cuống" },
  { src: "/images/gdrive-14.jpg", alt: "Xoài phân loại — rổ vàng, xanh, đỏ tại vựa" },
  { src: "/images/xoai-17-04/xoai-tu-quy-sot-xanh-la-cuong-can-canh.jpg", alt: "Cận cảnh xoài Tứ Quý trong rổ xanh — cuống lá tươi từ vườn" },
];

const QUY_TRINH_IMAGES = [
  { src: "/images/gdrive-03.jpg", alt: "Rổ xoài xanh xếp đầy thùng" },
  { src: "/images/gdrive-05.jpg", alt: "Xoài trong rổ tại vựa — cận cảnh" },
  { src: "/images/gdrive-07.jpg", alt: "Kiểm tra xoài tại vựa" },
  { src: "/images/gdrive-19.jpg", alt: "Gia đình đóng xoài ban đêm" },
  { src: "/images/gdrive-06.jpg", alt: "Xoài sắp xếp trong rổ" },
];

const CHUNG_NHAN_IMAGES = [
  { src: "/images/gdrive-09.jpg", alt: "Thùng xốp đục lỗ chuẩn bị đóng gói" },
  { src: "/images/gdrive-10.jpg", alt: "Thùng xốp xếp hàng chờ đóng" },
  { src: "/images/gdrive-15.jpg", alt: "Xoài trong thùng xanh — kiểm tra chất lượng" },
  { src: "/images/gdrive-17.jpg", alt: "Xoài phân loại trước khi đóng thùng" },
];

export const metadata: Metadata = {
  title: "Nguồn Gốc & Chứng Nhận — Xoài Tứ Quý Bến Tre",
  description: "Bộ tài liệu nguồn gốc, quy chuẩn, chứng nhận Chỉ dẫn địa lý CDĐL #00124, VietGAP, GlobalGAP, mã số vùng trồng xuất khẩu.",
};

/* ═══════ Data ═══════ */

// Icons for certifications (not translatable) — text comes from messages.nguonGoc.chungNhan.items
const CERT_ICONS = [Certificate, ShieldCheck, Leaf, ShieldCheck, QrCode, Leaf];

/* ═══════ Components ═══════ */

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <FadeIn>
      <div className="mb-16 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
          {label}
        </span>
        <h2 className="mt-3 font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
          {title}
        </h2>
      </div>
    </FadeIn>
  );
}

/* ═══════ Page ═══════ */

export default async function NguonGocPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nguonGoc");

  type StatItem = { value: string; label: string };
  type SpecItem = { label: string; value: string };
  type FarmingStep = { step: string; title: string; desc: string };
  type CertItem = { title: string; org: string; detail: string };
  type HtxInfoItem = { label: string; value: string };
  type FactorItem = { title: string; subtitle: string; desc: string };
  type VuonTrongRow = { ward: string; area: string; note: string };
  type VeVuaLink = { label: string; href: string };

  const keyStats = t.raw("stats") as StatItem[];
  const farmingSteps = t.raw("quyTrinh.steps") as FarmingStep[];
  const certItems = t.raw("chungNhan.items") as CertItem[];
  const htxInfo = t.raw("htx.info") as HtxInfoItem[];
  const htxBenefits = t.raw("htx.benefits") as string[];
  const biMatFactors = t.raw("biMat.factors") as FactorItem[];
  const soilSpecs = t.raw("biMat.soilSpecs") as SpecItem[];
  const fruitSpecs = t.raw("biMat.fruitSpecs") as SpecItem[];
  const vuonTrongRows = t.raw("vuongTrong.rows") as VuonTrongRow[];
  const veVuaLinks = t.raw("veVua.links") as VeVuaLink[];
  return (
    <>
    <Header />
    <div>
      {/* Hero — brand yellow like home page */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center bg-brand px-5 pt-28 pb-24">
        <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeIn>
              <h1 className="font-heading text-5xl font-bold uppercase text-text sm:text-6xl lg:text-7xl">
                {t("hero.title1")}
                <br />
                {t("hero.title2")}
              </h1>
              <p className="mt-6 max-w-[500px] text-lg leading-relaxed text-text/60">
                {t("hero.desc")}
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} className="hidden lg:block">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <iframe
                src="https://maps.google.com/maps?q=9.8508435,106.6173415&t=m&z=14&output=embed&hl=vi"
                width="520"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("hero.mapTitle")}
                className="h-[400px] w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Key Stats */}
      <section className="bg-brand-cream px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {keyStats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-text">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-text/50">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* Vùng trồng */}
      <section className="bg-brand px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading label={t("vuongTrong.label")} title={t("vuongTrong.title")} />

          <div className="grid gap-10 lg:grid-cols-2">
            <FadeIn>
              <div className="rounded-3xl bg-white p-8 shadow-md">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold text-text">
                  <MapPin size={24} weight="duotone" /> {t("vuongTrong.locationTitle")}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-text/60">
                  {t("vuongTrong.locationDesc")}
                </p>
                <div className="overflow-hidden rounded-2xl">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-brand/30">
                        <th className="px-4 py-3 text-left font-semibold text-text">{t("vuongTrong.tableWard")}</th>
                        <th className="px-4 py-3 text-left font-semibold text-text">{t("vuongTrong.tableArea")}</th>
                        <th className="px-4 py-3 text-left font-semibold text-text">{t("vuongTrong.tableNote")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vuonTrongRows.map((row, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="px-4 py-3 font-semibold text-text">{row.ward}</td>
                          <td className="px-4 py-3 text-text/70">{row.area}</td>
                          <td className="px-4 py-3 text-text/70">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                <ImageCarousel
                  images={[
                    { src: "/images/xoai-17-04/xoai-tu-quy-sot-xanh-cuong-la-tuoi-moi-hai.jpg", alt: "Xoài Tứ Quý mới hái từ vườn — cuống còn tươi, rổ xanh" },
                    { src: "/images/xoai-17-04/xoai-tu-quy-vip-trai-to-cuong-la-tay-cam.jpg", alt: "Xoài Tứ Quý VIP — trái to còn cuống lá, tay cầm tại vựa" },
                    { src: "/images/xoai-17-04/xoai-tu-quy-co-cuong-la-sot-do-can-canh.jpg", alt: "Xoài Tứ Quý Thạnh Phú — cuống lá xanh, nền rổ đỏ" },
                  ]}
                  height="h-48"
                />
                <div className="p-8">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold text-text">
                  <Waves size={24} weight="duotone" /> {t("vuongTrong.historyTitle")}
                </h3>
                <p className="text-sm leading-relaxed text-text/60">
                  {t("vuongTrong.historyDesc1")}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text/60">
                  {t("vuongTrong.historyDesc2")}
                </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* FB reel video */}
          <FadeIn delay={0.2}>
            <div className="mt-12 flex justify-center">
              <iframe
                src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F957735149984398%2F&show_text=false&width=267&t=0"
                width={267}
                height={476}
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                title="Video vườn xoài tứ quý Bến Tre"
                className="rounded-2xl shadow-md"
              />
            </div>
          </FadeIn>

          {/* Photo carousel at bottom */}
          <FadeIn>
            <ImageCarousel images={VUON_IMAGES} className="mt-16" />
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Đặc điểm tự nhiên */}
      <section className="bg-brand-cream px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading label={t("biMat.label")} title={t("biMat.title")} />

          {/* 3 yếu tố tạo vị */}
          {/* Icons are code-level: Drop, Waves, Waves — match factors order */}
          <div className="mb-16 grid gap-8 lg:grid-cols-3">
            {biMatFactors.map((item, i) => {
              const FactorIcon = i === 0 ? Drop : Waves;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-md">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand">
                      <FactorIcon size={28} weight="duotone" className="text-text" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-text">{item.title}</h3>
                    <p className="mb-3 text-sm font-semibold text-text/50">{item.subtitle}</p>
                    <p className="flex-1 text-sm leading-relaxed text-text/60">{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Thông số kỹ thuật */}
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <div className="rounded-3xl bg-white p-8 shadow-md">
                <h3 className="mb-6 font-heading text-xl font-bold text-text">{t("biMat.soilTitle")}</h3>
                <div className="space-y-4">
                  {soilSpecs.map((s, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-sm text-text/60">{s.label}</span>
                      <span className="font-heading text-base font-bold text-text">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-3xl bg-white p-8 shadow-md">
                <h3 className="mb-6 font-heading text-xl font-bold text-text">{t("biMat.fruitTitle")}</h3>
                <div className="space-y-4">
                  {fruitSpecs.map((s, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border pb-3">
                      <span className="text-sm text-text/60">{s.label}</span>
                      <span className="font-heading text-base font-bold text-text">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* Quy trình sản xuất */}
      <section className="bg-brand px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading label={t("quyTrinh.label")} title={t("quyTrinh.title")} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {farmingSteps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-md">
                  <span className="absolute top-4 right-5 font-heading text-4xl font-extrabold text-brand/40">
                    {s.step}
                  </span>
                  <h3 className="font-heading text-lg font-bold uppercase text-text">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text/60">
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Kỹ thuật bao trái highlight */}
          <FadeIn delay={0.3}>
            <div className="mt-12 rounded-3xl bg-white p-10 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand">
                  <Bag size={28} weight="duotone" className="text-text" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-text">
                    {t("quyTrinh.bagTechTitle")}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text/60">
                    {t("quyTrinh.bagTechDesc")}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Photo carousel at bottom */}
          <FadeIn>
            <ImageCarousel images={QUY_TRINH_IMAGES} className="mt-16" />
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Chứng nhận */}
      <section className="bg-brand-cream px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading label={t("chungNhan.label")} title={t("chungNhan.title")} />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {certItems.map((cert, i) => {
              const CertIcon = CERT_ICONS[i];
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-md">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand">
                      {CertIcon && <CertIcon size={28} weight="duotone" className="text-text" />}
                    </div>
                    <h3 className="font-heading text-base font-bold uppercase text-text">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-text/40">{cert.org}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text/60">
                      {cert.detail}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Photo carousel at bottom */}
          <FadeIn>
            <ImageCarousel images={CHUNG_NHAN_IMAGES} className="mt-16" />
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* HTX Thạnh Phong */}
      <section className="bg-brand px-5 py-24">
        <div className="mx-auto max-w-[900px]">
          <SectionHeading label={t("htx.label")} title={t("htx.title")} />

          <FadeIn>
            <div className="rounded-3xl bg-white p-10 shadow-md">
              <div className="mb-8 flex items-center gap-3">
                <Factory size={28} weight="duotone" className="text-text/70" />
                <h3 className="font-heading text-xl font-bold text-text">
                  {t("htx.orgName")}
                </h3>
              </div>

              <div className="mb-8 space-y-3">
                {htxInfo.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-text/50">{item.label}</span>
                    <span className="text-sm font-semibold text-text">{item.value}</span>
                  </div>
                ))}
              </div>

              <h4 className="mb-4 font-heading text-base font-bold text-text">{t("htx.benefitsTitle")}</h4>
              <div className="space-y-2">
                {htxBenefits.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-text/60">
                    <ShieldCheck size={16} weight="fill" className="mt-0.5 shrink-0 text-text/40" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Về vựa + multi-product — additive section (IA Phase 07, F11 SEO-safe) */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              {t("veVua.title1")} <span className="text-mango">{t("veVua.title2")}</span>
            </h2>
            <p className="mb-10 text-center text-sm text-text/50">
              {t("veVua.desc")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl bg-text/5 p-6 text-sm leading-relaxed text-text/70 sm:p-8 sm:text-base">
              <p>{t("veVua.body1")}</p>
              <p className="mt-4">{t("veVua.body2")}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h3 className="mb-6 mt-12 text-center font-heading text-2xl font-bold uppercase text-text">
              {t("veVua.productsTitle")}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {veVuaLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border-2 border-text/15 bg-white px-5 py-2.5 text-sm font-semibold text-text/70 hover:border-text hover:text-text transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
    <Footer />
    </>
  );
}
