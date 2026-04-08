import type { Metadata } from "next";
import Image from "next/image";
import { Certificate, Leaf, ShieldCheck, QrCode, Truck, Drop, Waves, Bag, MapPin, Users, Factory, FileText } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/fade-in";
import { ImageCarousel } from "@/components/image-carousel";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";

/* Carousel image groups */
const VUON_IMAGES = [
  { src: "/images/gdrive-01.jpg", alt: "Vườn xoài sáng sớm — tia nắng xuyên tán" },
  { src: "/images/gdrive-11.jpg", alt: "Rổ xoài phân loại nhiều màu tại vựa" },
  { src: "/images/gdrive-14.jpg", alt: "Xoài phân loại — rổ vàng, xanh, đỏ" },
  { src: "/images/gdrive-02.jpg", alt: "Vựa xoài đóng hàng ban ngày" },
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

const KEY_STATS = [
  { value: "> 400 ha", label: "Diện tích vùng trồng" },
  { value: "700+", label: "Hộ dân tham gia" },
  { value: "30 tấn/ha", label: "Năng suất mỗi năm" },
  { value: "3 vụ/năm", label: "Thu hoạch quanh năm" },
  { value: "86 ha", label: "Mã số vùng trồng XK" },
  { value: "95%", label: "Tiêu thụ miền Bắc" },
];

const SOIL_SPECS = [
  { label: "Hàm lượng cát", value: "60–70%" },
  { label: "Hàm lượng muối tan", value: "0,009–0,022%" },
  { label: "Độ xốp", value: "16–20%" },
  { label: "Địa hình", value: "Cao 2–4m, ven biển" },
];

const FRUIT_SPECS = [
  { label: "Trọng lượng/quả", value: "1,0–1,5 kg (max 2 kg)" },
  { label: "Độ chắc thịt chín", value: "20,2–21,1 N" },
  { label: "Hàm lượng Na", value: "1,58–2,02%" },
  { label: "Hạt", value: "Nhỏ, lép — tỉ lệ thịt cao" },
];

const FARMING_STEPS = [
  { step: "01", title: "Chuẩn bị đất", desc: "Chọn vùng giồng cát cao, bón lót phân hữu cơ, lắp hệ thống tưới nhỏ giọt." },
  { step: "02", title: "Trồng & chăm sóc", desc: "Cây giống ghép, 15–18 tháng cho trái. Tưới đều, bón phân hữu cơ, cắt tỉa tán." },
  { step: "03", title: "Bao trái từ nhỏ", desc: "Bao túi vải đa màu khi quả bằng ngón tay. Mỗi đợt 1 màu để phân biệt độ tuổi." },
  { step: "04", title: "Thu hoạch & phân loại", desc: "Thu theo màu túi bao, cắt cuống, phân loại tại vườn theo size VIP/Loại 1/Loại 2." },
  { step: "05", title: "Sơ chế & đóng gói", desc: "Lau sạch, phân loại lần 2, đóng thùng carton có lót xốp, dán tem truy xuất." },
  { step: "06", title: "Vận chuyển", desc: "Xe lạnh, xe thường hoặc gửi bay — tuỳ nhu cầu bạn hàng. BT→HN: ~2 ngày." },
];

const CERTIFICATIONS = [
  {
    Icon: Certificate,
    title: "Chỉ dẫn địa lý #00124",
    org: "Cục Sở hữu trí tuệ — Bộ KH&CN",
    detail: "QĐ số 5371/QĐ-SHTT ngày 10/11/2022. Chỉ xoài Tứ Quý trồng tại Thạnh Phú, Ba Tri, Bình Đại mới được gọi là 'Xoài Tứ Quý Bến Tre'.",
  },
  {
    Icon: ShieldCheck,
    title: "Nhãn hiệu chứng nhận",
    org: "UBND huyện Thạnh Phú",
    detail: "Nhãn hiệu 'Xoài Tứ Quý Thạnh Phú' được bảo hộ từ năm 2020. Phân phối qua chợ, siêu thị và sàn TMĐT.",
  },
  {
    Icon: Leaf,
    title: "VietGAP — 100+ ha",
    org: "Chi cục Trồng trọt & BVTV tỉnh Bến Tre",
    detail: "Hơn 100 ha tại xã Thạnh Phong sản xuất theo tiêu chuẩn VietGAP. Tập huấn định kỳ cho nông dân.",
  },
  {
    Icon: ShieldCheck,
    title: "GlobalGAP — 16 ha",
    org: "Tổ chức chứng nhận quốc tế",
    detail: "HTX Thạnh Phong có 16 ha đạt GlobalGAP. Sản phẩm được bao tiêu giá cao hơn thị trường 1.500–2.000đ/kg.",
  },
  {
    Icon: QrCode,
    title: "Mã số vùng trồng XK",
    org: "Cục Bảo vệ thực vật — Bộ NN&PTNT",
    detail: "86 ha tại Thạnh Phong đã được cấp mã PUC — xuất khẩu chính ngạch sang Mỹ, Hàn Quốc, Úc.",
  },
  {
    Icon: Leaf,
    title: "OCOP Bến Tre",
    org: "Chương trình OCOP quốc gia",
    detail: "Xoài Tứ Quý Thạnh Phú là sản phẩm OCOP tiêu biểu của tỉnh Bến Tre.",
  },
];

const HTX_INFO = [
  { label: "Tên", value: "HTX Dịch vụ Sản xuất Nông nghiệp Thạnh Phong" },
  { label: "Thành lập", value: "2017" },
  { label: "Giám đốc", value: "Ông Nguyễn Văn Trường" },
  { label: "Thành viên", value: "148 thành viên" },
  { label: "Diện tích", value: "65 ha" },
];

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

export default function NguonGocPage() {
  return (
    <>
    <Header />
    <main>
      {/* Hero — brand yellow like home page */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center bg-brand px-5 pt-28 pb-24">
        <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeIn>
              <h1 className="font-heading text-5xl font-bold uppercase text-text sm:text-6xl lg:text-7xl">
                Nguồn
                <br />
                Gốc
              </h1>
              <p className="mt-6 max-w-[500px] text-lg leading-relaxed text-text/60">
                Vùng trồng duy nhất trên cả nước có chất lượng và năng suất ổn định
                cho giống xoài Tứ Quý — nhờ đất giồng cát ven biển nhiễm mặn đặc thù.
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
                title="Vị trí Thạnh Phong, Thạnh Phú, Bến Tre"
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
            {KEY_STATS.map((stat, i) => (
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
          <SectionHeading label="Phần A" title="Vùng Trồng Thạnh Phú" />

          <div className="grid gap-10 lg:grid-cols-2">
            <FadeIn>
              <div className="rounded-3xl bg-white p-8 shadow-md">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold text-text">
                  <MapPin size={24} weight="duotone" /> Vị trí địa lý
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-text/60">
                  Huyện Thạnh Phú — một trong ba huyện ven biển Bến Tre, nằm ở hạ lưu sông Mekong.
                  Vùng trồng nằm trên các giồng cát ven biển, cao 2–4m so với mực nước biển.
                </p>
                <div className="overflow-hidden rounded-2xl">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-brand/30">
                        <th className="px-4 py-3 text-left font-semibold text-text">Xã</th>
                        <th className="px-4 py-3 text-left font-semibold text-text">Diện tích</th>
                        <th className="px-4 py-3 text-left font-semibold text-text">Đặc điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border">
                        <td className="px-4 py-3 font-semibold text-text">Thạnh Phong</td>
                        <td className="px-4 py-3 text-text/70">~300 ha</td>
                        <td className="px-4 py-3 text-text/70">Vùng lớn nhất, trụ sở HTX</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="px-4 py-3 font-semibold text-text">Thạnh Hải</td>
                        <td className="px-4 py-3 text-text/70">~50 ha</td>
                        <td className="px-4 py-3 text-text/70">Đất giồng cát điển hình</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="px-4 py-3 font-semibold text-text">Giao Thạnh</td>
                        <td className="px-4 py-3 text-text/70">~50 ha</td>
                        <td className="px-4 py-3 text-text/70">Vùng mở rộng</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                <ImageCarousel
                  images={[
                    { src: "/images/gdrive-01.jpg", alt: "Vườn xoài sáng sớm" },
                    { src: "/images/gdrive-12.jpg", alt: "Xoài tại vựa — rổ nhiều màu" },
                    { src: "/images/gdrive-16.jpg", alt: "Xoài xanh trong rổ xanh" },
                  ]}
                  height="h-48"
                />
                <div className="p-8">
                <h3 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold text-text">
                  <Waves size={24} weight="duotone" /> Lịch sử
                </h3>
                <p className="text-sm leading-relaxed text-text/60">
                  Giống xoài Tứ Quý có nguồn gốc từ <strong className="text-text">năm 1982</strong>,
                  do nông dân ở ấp Phú Đa, xã Vĩnh Bình, huyện Chợ Lách lai tạo. Qua thực tế canh tác,
                  <strong className="text-text"> chỉ có vùng đất giồng cát ven biển nhiễm mặn ở Thạnh Phú
                  mới cho ra trái có chất lượng tốt nhất</strong>.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text/60">
                  Trước khi xoài Tứ Quý được nhân rộng, vùng đất Thạnh Phú chủ yếu trồng sắn, dưa hấu —
                  giá trị kinh tế thấp. Nhiều hộ chuyển đổi sang xoài từ 2010, thu nhập tăng gấp 3–4 lần.
                </p>
                </div>
              </div>
            </FadeIn>
          </div>

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
          <SectionHeading label="Phần B" title="Bí Mật Hương Vị" />

          {/* 3 yếu tố tạo vị */}
          <div className="mb-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                Icon: Drop,
                title: "Hàm lượng nước thấp",
                subtitle: "Thịt giòn & chắc",
                desc: "Đất cát giữ nước kém → hàm lượng H₂O trong quả thấp → thịt giòn khi xanh, chắc khi chín. Lợi thế tự nhiên không cần kỹ thuật siết gốc.",
              },
              {
                Icon: Waves,
                title: "Đất nhiễm mặn",
                subtitle: "Vị mặn nhẹ đặc trưng",
                desc: "Muối tan 0,009–0,022% trong đất → Sodium (Na) tích tụ trong quả → vị mặn nhẹ cuối lưỡi. Đặc điểm KHÔNG THỂ tái tạo ở vùng khác.",
              },
              {
                Icon: Waves,
                title: "Giao thoa ngọt-mặn",
                subtitle: "Cân bằng vị giác",
                desc: "Nước ngọt từ sông Mekong + nước mặn từ biển Đông → tạo profile vị ngọt đậm hòa quyện vị mặn nhẹ — duy nhất.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-md">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand">
                    <item.Icon size={28} weight="duotone" className="text-text" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text">{item.title}</h3>
                  <p className="mb-3 text-sm font-semibold text-text/50">{item.subtitle}</p>
                  <p className="flex-1 text-sm leading-relaxed text-text/60">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Thông số kỹ thuật */}
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <div className="rounded-3xl bg-white p-8 shadow-md">
                <h3 className="mb-6 font-heading text-xl font-bold text-text">Thông số đất</h3>
                <div className="space-y-4">
                  {SOIL_SPECS.map((s, i) => (
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
                <h3 className="mb-6 font-heading text-xl font-bold text-text">Thông số quả</h3>
                <div className="space-y-4">
                  {FRUIT_SPECS.map((s, i) => (
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
          <SectionHeading label="Phần C" title="Quy Trình Sản Xuất" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FARMING_STEPS.map((s, i) => (
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
                    Kỹ thuật bao trái — Đặc trưng Thạnh Phú
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text/60">
                    Cây cho trái quanh năm với nhiều độ tuổi quả trên cùng 1 cây. Người trồng bao
                    từng trái bằng túi vải đa màu từ khi bằng ngón tay — mỗi đợt thu hoạch dùng 1 màu
                    để phân biệt. Kỹ thuật này giúp trái đẹp mã, đồng đều, giảm 5–10 kg thuốc BVTV/ha,
                    và tăng lợi nhuận 18–20 triệu đồng/ha.
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
          <SectionHeading label="Phần D" title="Chứng Nhận & Pháp Lý" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((cert, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-md">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand">
                    <cert.Icon size={28} weight="duotone" className="text-text" />
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
            ))}
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
          <SectionHeading label="Phần E" title="HTX Thạnh Phong" />

          <FadeIn>
            <div className="rounded-3xl bg-white p-10 shadow-md">
              <div className="mb-8 flex items-center gap-3">
                <Factory size={28} weight="duotone" className="text-text/70" />
                <h3 className="font-heading text-xl font-bold text-text">
                  Hợp tác xã Dịch vụ Sản xuất Nông nghiệp Thạnh Phong
                </h3>
              </div>

              <div className="mb-8 space-y-3">
                {HTX_INFO.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-sm text-text/50">{item.label}</span>
                    <span className="text-sm font-semibold text-text">{item.value}</span>
                  </div>
                ))}
              </div>

              <h4 className="mb-4 font-heading text-base font-bold text-text">Quyền lợi thành viên</h4>
              <div className="space-y-2">
                {[
                  "Hỗ trợ lắp hệ thống tưới nhỏ giọt",
                  "Tập huấn VietGAP/GlobalGAP định kỳ",
                  "Bao tiêu 100% sản phẩm theo hợp đồng",
                  "Giá thu mua cao hơn thị trường 1.500–2.000đ/kg",
                  "Hỗ trợ vay vốn Quỹ hỗ trợ nông dân",
                ].map((item, i) => (
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

    </main>
    <Footer />
    </>
  );
}
