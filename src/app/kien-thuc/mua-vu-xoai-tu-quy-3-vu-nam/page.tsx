import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getArticleJsonLd, getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";
import { VUA_XOAI_IMAGES } from "@/lib/vua-xoai-images";

const PAGE_URL = `${SITE_URL}/kien-thuc/mua-vu-xoai-tu-quy-3-vu-nam`;

export const metadata: Metadata = {
  title: "Mùa Vụ Xoài Tứ Quý — 3 Vụ/Năm + Bảng Giá Theo Tháng 2026",
  description:
    "Lịch mùa vụ xoài Tứ Quý: vụ 1 (T2-4), vụ 2 (T7-8), vụ 3 (T11-1, vụ Tết). Bảng giá theo tháng + mẹo mua sỉ tốt nhất.",
  keywords: [
    "mùa vụ xoài tứ quý",
    "3 vụ xoài bến tre",
    "lịch xoài tứ quý",
    "vụ tết xoài",
    "xoài quanh năm",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Mùa Vụ Xoài Tứ Quý — 3 Vụ/Năm + Bảng Giá Theo Tháng 2026",
    description: "Lịch 3 vụ xoài Tứ Quý, bảng giá 12 tháng, và mẹo mua sỉ theo mùa.",
    url: PAGE_URL,
    images: [{ url: VUA_XOAI_IMAGES.xoaiCoCuongLa.src, width: 1200, height: 1600 }],
  },
};

const articleJsonLd = getArticleJsonLd({
  title: "Mùa Vụ Xoài Tứ Quý — 3 Vụ/Năm + Bảng Giá Theo Tháng 2026",
  description:
    "Lịch mùa vụ xoài Tứ Quý: vụ 1 (T2-4), vụ 2 (T7-8), vụ 3 (T11-1, vụ Tết). Bảng giá theo tháng + mẹo mua sỉ tốt nhất.",
  url: PAGE_URL,
  datePublished: "2026-04-09",
  dateModified: "2026-04-09",
  image: VUA_XOAI_IMAGES.xoaiCoCuongLa.src,
});

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Kiến thức", url: `${SITE_URL}/kien-thuc` },
  { name: "Mùa vụ xoài Tứ Quý 3 vụ/năm", url: PAGE_URL },
]);

const MONTHLY_PRICES = [
  { thang: "T1", gia: "22–25k", muavu: "Cuối vụ 3", tag: "VIP", tagColor: "bg-amber-600" },
  { thang: "T2", gia: "18–22k", muavu: "Đầu vụ 1", tag: "Đa dạng", tagColor: "bg-blue-600" },
  { thang: "T3", gia: "16–18k", muavu: "Giữa vụ 1", tag: "Rẻ nhất", tagColor: "bg-green-600" },
  { thang: "T4", gia: "16–20k", muavu: "Cao điểm vụ 1", tag: "Sản lượng đỉnh", tagColor: "bg-green-500" },
  { thang: "T5", gia: "18–22k", muavu: "Cuối vụ 1", tag: "", tagColor: "" },
  { thang: "T6", gia: "20–22k", muavu: "Giáp vụ 2", tag: "", tagColor: "" },
  { thang: "T7", gia: "18–20k", muavu: "Đầu vụ 2", tag: "", tagColor: "" },
  { thang: "T8", gia: "18–22k", muavu: "Vụ 2 chính", tag: "", tagColor: "" },
  { thang: "T9", gia: "20–22k", muavu: "Cuối vụ 2", tag: "", tagColor: "" },
  { thang: "T10", gia: "22–24k", muavu: "Giáp vụ 3", tag: "", tagColor: "" },
  { thang: "T11", gia: "22–25k", muavu: "Vụ 3 bắt đầu", tag: "", tagColor: "" },
  { thang: "T12", gia: "25–35k", muavu: "Vụ Tết, tăng cao", tag: "Tết", tagColor: "bg-red-600" },
];

export default function MuaVuXoaiTuQuy3VuNamPage() {
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
      <section className="bg-brand px-5 pt-28 pb-20">
        <div className="mx-auto max-w-[820px]">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Kiến thức — Mùa vụ & Giá cả
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold leading-tight text-text sm:text-5xl">
              Mùa Vụ Xoài Tứ Quý —{" "}
              <span className="text-mango">3 Vụ/Năm Theo Lịch Âm + Bảng Giá Theo Tháng</span>
            </h1>
            <p className="mt-6 text-lg leading-7 text-text/70">
              Xoài Tứ Quý là giống xoài hiếm hoi cho trái 3 vụ/năm thay vì 1 vụ như các giống
              khác. Đây chính là chìa khóa tạo nên nguồn cung ổn định quanh năm — lợi thế cạnh
              tranh lớn nhất của xoài Bến Tre trên thị trường.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Hero image */}
      <FadeIn delay={0.1}>
        <div className="mx-auto max-w-[1100px] px-5 -mt-4">
          <div className="my-8 overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={VUA_XOAI_IMAGES.xoaiCoCuongLa.src}
              alt={VUA_XOAI_IMAGES.xoaiCoCuongLa.alt}
              width={VUA_XOAI_IMAGES.xoaiCoCuongLa.width}
              height={VUA_XOAI_IMAGES.xoaiCoCuongLa.height}
              priority
              className="w-full object-cover max-h-[520px]"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
        </div>
      </FadeIn>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Article body */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[760px] space-y-16">

          {/* Tại sao Tứ Quý */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Tại Sao Gọi Là "Tứ Quý"?
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  <strong className="text-text">"Tứ Quý"</strong> trong tiếng Việt có nghĩa là{" "}
                  <strong className="text-text">bốn mùa</strong>. Tên gọi này không phải ngẫu nhiên —
                  nó mô tả chính xác đặc tính sinh học nổi bật nhất của giống xoài này: khả năng
                  ra hoa và đậu trái nhiều lần trong năm, không bị giới hạn bởi chu kỳ mùa vụ cố
                  định như hầu hết các giống xoài khác.
                </p>
                <p>
                  Trong khi{" "}
                  <a href="/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc" className="text-mango underline underline-offset-4 hover:text-mango-dark">
                    xoài Cát Hòa Lộc, Cát Chu
                  </a>{" "}
                  chỉ có 1–2 vụ/năm — để trống thị trường 6–8 tháng — xoài Tứ Quý Bến Tre cung
                  cấp liên tục với{" "}
                  <strong className="text-text">3 vụ chính mỗi năm</strong>. Đây là lý do 95% sản
                  lượng xoài Tứ Quý được tiêu thụ tại miền Bắc — nơi không có nguồn xoài tươi địa
                  phương quanh năm.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { value: "3 vụ/năm", label: "Xoài Tứ Quý" },
                    { value: "1–2 vụ/năm", label: "Cát Hòa Lộc, Cát Chu" },
                    { value: "12 tháng", label: "Xoài xanh có quanh năm" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-brand/40 p-3 text-center">
                      <div className="font-heading text-lg font-bold text-text">{s.value}</div>
                      <div className="mt-1 text-xs text-text/60">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Vụ 1 */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-green-600 px-4 py-1 text-xs font-bold text-white uppercase">Vụ 1</span>
                <span className="text-sm font-semibold text-text/60">Tháng 2–4 dương lịch / Tháng 1–3 âm lịch</span>
              </div>
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Vụ 1 — Vụ Chính, Sản Lượng Cao Nhất
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Vụ 1 bắt đầu từ <strong className="text-text">ra hoa tháng 11–12 năm trước</strong>,
                  thu hoạch tập trung vào <strong className="text-text">tháng 2–4 dương lịch</strong>
                  {" "}(tháng 1–3 âm lịch). Đây là vụ có sản lượng cao nhất trong 3 vụ, nhờ:
                </p>
                <ul className="space-y-2 pl-4">
                  <li>• Thời tiết <strong className="text-text">khô, nắng ổn định 32–38°C</strong> — lý tưởng cho quả phát triển đều</li>
                  <li>• Ít sâu bệnh hơn vụ mưa — tỷ lệ quả đạt chuẩn cao hơn</li>
                  <li>• Ánh nắng dồi dào giúp đường tích tụ, vị ngọt đậm hơn</li>
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Thời tiết", value: "32–38°C, khô" },
                    { label: "Sản lượng", value: "Cao nhất" },
                    { label: "Giá sỉ", value: "16–18k/kg" },
                    { label: "Đặc điểm vị", value: "Ngọt đậm, mặn vừa" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-brand/40 p-3 text-center">
                      <div className="font-heading text-sm font-bold text-text">{s.value}</div>
                      <div className="mt-1 text-xs text-text/60">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-text/50">
                  Giá sỉ rẻ nhất trong 3 vụ do nguồn cung dồi dào. Thời điểm lý tưởng cho bên
                  mua sỉ số lượng lớn.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Vụ 2 */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white uppercase">Vụ 2</span>
                <span className="text-sm font-semibold text-text/60">Tháng 7–8 dương lịch / Tháng 6–7 âm lịch</span>
              </div>
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Vụ 2 — Vụ Mưa, Cân Bằng Ngọt Mặn
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Vụ 2 ra hoa vào <strong className="text-text">tháng 4–5</strong>, thu hoạch vào
                  tháng 7–8 dương lịch. Đây là vụ giữa năm — thời tiết mưa nhiều, độ ẩm 80–90%.
                  Điều kiện ẩm ướt tác động đến quả theo cả hai chiều:
                </p>
                <ul className="space-y-2 pl-4">
                  <li>• Sản lượng <strong className="text-text">trung bình</strong> — một số đợt hoa bị rụng do mưa</li>
                  <li>• Vị quả <strong className="text-text">cân bằng hơn</strong> — mặn và ngọt hài hoà</li>
                  <li>• Sâu bệnh nhiều hơn vụ 1 — cần chú ý kiểm soát</li>
                  <li>• Ít cạnh tranh hơn từ các giống xoài khác</li>
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Thời tiết", value: "Mưa, 80–90% ẩm" },
                    { label: "Sản lượng", value: "Trung bình" },
                    { label: "Giá sỉ", value: "18–22k/kg" },
                    { label: "Đặc điểm vị", value: "Cân bằng mặn ngọt" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-brand/40 p-3 text-center">
                      <div className="font-heading text-sm font-bold text-text">{s.value}</div>
                      <div className="mt-1 text-xs text-text/60">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Vụ 3 */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-red-600 px-4 py-1 text-xs font-bold text-white uppercase">Vụ 3 — Tết</span>
                <span className="text-sm font-semibold text-text/60">Tháng 11–1 dương lịch / Tháng 10–12 âm lịch</span>
              </div>
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Vụ 3 — Vụ Tết, Giá Cao Nhất, Vị Ngon Nhất
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Vụ 3 là vụ được mong đợi nhất trong năm. Nhà nông kích thích ra hoa từ{" "}
                  <strong className="text-text">tháng 7–8 bằng kỹ thuật giảm tưới nước</strong>,
                  tạo stress khô hạn ngắn để cây phân hóa mầm hoa. Thu hoạch tập trung tháng
                  11–1 dương lịch — đúng mùa Tết Nguyên Đán.
                </p>
                <p>
                  Điều kiện thời tiết mát, khô (26–32°C) của cuối năm cho ra những quả xoài có{" "}
                  <strong className="text-text">vị ngọt đậm nhất và mặn rõ nhất</strong> trong 3
                  vụ — vì biên độ nhiệt ngày/đêm lớn giúp đường tích tụ tốt hơn.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Thời tiết", value: "26–32°C, mát khô" },
                    { label: "Sản lượng", value: "Thấp – TB" },
                    { label: "Giá sỉ", value: "22–35k/kg" },
                    { label: "Đặc điểm vị", value: "Ngọt đậm, mặn rõ" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-red-50 p-3 text-center border border-red-100">
                      <div className="font-heading text-sm font-bold text-text">{s.value}</div>
                      <div className="mt-1 text-xs text-text/60">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-2">
                  Tuần cận Tết (2 tuần trước Giao thừa), giá sỉ có thể vọt lên{" "}
                  <strong className="text-text">35.000đ/kg trở lên</strong> do nhu cầu quà tặng
                  tăng đột biến. Bên nhập hàng nên đặt trước <strong className="text-text">ít
                  nhất 10–14 ngày</strong> để được ưu tiên phân bổ hàng. Xem{" "}
                  <a href="/gia-xoai-hom-nay" className="text-mango underline underline-offset-4 hover:text-mango-dark">
                    bảng giá xoài hôm nay
                  </a>{" "}
                  để theo dõi biến động theo thời gian thực.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Bảng giá theo tháng */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Bảng Giá Xoài Tứ Quý Theo Tháng (2026)
              </h2>
              <p className="mt-4 mb-6 text-sm leading-relaxed text-text/70">
                Giá sỉ tại vựa Thạnh Phú, Bến Tre. Biến động theo mùa vụ — thấp nhất tháng
                3–4 (vụ 1 cao điểm), cao nhất tháng 12 (vụ Tết).
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {MONTHLY_PRICES.map((row) => (
                  <div
                    key={row.thang}
                    className={`rounded-xl p-3 border ${
                      row.thang === "T12"
                        ? "border-red-200 bg-red-50"
                        : row.thang === "T3" || row.thang === "T4"
                        ? "border-green-200 bg-green-50"
                        : "border-border bg-brand/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading text-lg font-bold text-text">{row.thang}</span>
                      {row.tag && (
                        <span className={`rounded-full ${row.tagColor} px-2 py-0.5 text-xs font-bold text-white`}>
                          {row.tag}
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-text text-sm">{row.gia}</div>
                    <div className="mt-1 text-xs text-text/50">{row.muavu}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-text/40">
                Giá sỉ/kg tại vựa, chưa tính phí vận chuyển. Cập nhật hàng ngày tại{" "}
                <a href="/gia-xoai-hom-nay" className="underline hover:text-text">
                  giá xoài hôm nay
                </a>.
              </p>
            </div>
          </FadeIn>

          {/* Inline image */}
          <FadeIn>
            <div className="my-8 overflow-hidden rounded-2xl">
              <Image
                src={VUA_XOAI_IMAGES.xoaiVipTayCam1.src}
                alt={VUA_XOAI_IMAGES.xoaiVipTayCam1.alt}
                width={VUA_XOAI_IMAGES.xoaiVipTayCam1.width}
                height={VUA_XOAI_IMAGES.xoaiVipTayCam1.height}
                className="w-full object-cover"
                sizes="(max-width: 760px) 100vw, 760px"
              />
            </div>
          </FadeIn>

          {/* Khi nào nên mua */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Khi Nào Nên Mua Xoài Tứ Quý?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Tuỳ mục đích, thời điểm mua tối ưu khác nhau:
              </p>
              <div className="mt-6 space-y-3">
                {[
                  {
                    title: "Ăn ngon nhất",
                    timing: "Vụ 3 — Tháng 11–1",
                    desc: "Thời tiết mát, biên độ nhiệt lớn giúp đường tích tụ tối đa. Vị ngọt đậm, mặn rõ — profile hoàn hảo nhất. Phù hợp làm quà Tết cao cấp.",
                    color: "border-amber-200 bg-amber-50",
                    badge: "bg-amber-600",
                  },
                  {
                    title: "Giá rẻ nhất",
                    timing: "Vụ 1 — Tháng 3–4",
                    desc: "Sản lượng đỉnh, nguồn cung dồi dào nhất năm. Giá sỉ xuống đáy 16.000–18.000đ/kg. Lý tưởng cho mua số lượng lớn dự trữ hoặc chế biến.",
                    color: "border-green-200 bg-green-50",
                    badge: "bg-green-600",
                  },
                  {
                    title: "Cung ổn định nhất",
                    timing: "Vụ 2 — Tháng 7–9",
                    desc: "Ít cạnh tranh từ các giống xoài khác. Cung ổn định, không đột biến giá. Phù hợp bên nhập hàng đều đặn hàng tuần.",
                    color: "border-blue-200 bg-blue-50",
                    badge: "bg-blue-600",
                  },
                  {
                    title: "Sỉ xoài xanh làm gỏi",
                    timing: "Quanh năm — 12 tháng",
                    desc: "Xoài xanh Tứ Quý có sẵn liên tục vì cây ra hoa nhiều đợt. Giá ổn định 15.000–22.000đ/kg. Phù hợp tiểu thương, nhà hàng, bếp ăn.",
                    color: "border-border bg-brand/20",
                    badge: "bg-gray-500",
                  },
                ].map((item) => (
                  <div key={item.title} className={`rounded-xl border p-4 ${item.color}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`rounded-full ${item.badge} px-3 py-0.5 text-xs font-bold text-white`}>
                        {item.title}
                      </span>
                      <span className="text-xs font-semibold text-text/60">{item.timing}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-text/70">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Xoài xanh quanh năm */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Xoài Xanh Tứ Quý — Có Quanh Năm 12 Tháng
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Khác với xoài chín (phụ thuộc vào 3 vụ chính), <strong className="text-text">
                  xoài xanh Tứ Quý có thể thu hoạch quanh năm</strong> vì cây liên tục ra
                  hoa và đậu trái ở các độ tuổi khác nhau. Mỗi thời điểm trong năm đều có
                  lứa xoài non đang lớn trên cây.
                </p>
                <p>
                  Đây là lợi thế đặc biệt cho:
                </p>
                <ul className="space-y-2 pl-4">
                  <li>• <strong className="text-text">Tiểu thương chợ:</strong> Luôn có hàng đều đặn, không bị đứt mùa</li>
                  <li>• <strong className="text-text">Nhà hàng, quán ăn:</strong> Xoài lắc, gỏi xoài, xoài trộn — nguồn nguyên liệu ổn định</li>
                  <li>• <strong className="text-text">Bếp ăn công nghiệp:</strong> Đặt hàng tuần cố định, giá không biến động mạnh</li>
                  <li>• <strong className="text-text">Sản xuất chế biến:</strong> Nước ép, ô mai, mứt xoài — cần nguồn cung liên tục</li>
                </ul>
                <p>
                  Giá xoài xanh sỉ dao động{" "}
                  <strong className="text-text">15.000–22.000đ/kg</strong>, ổn định hơn xoài chín
                  và ít biến động theo mùa. Liên hệ{" "}
                  <a href="/#contact" className="text-mango underline underline-offset-4 hover:text-mango-dark">
                    vựa Thạnh Phú
                  </a>{" "}
                  để đặt hàng xoài xanh định kỳ.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Inline image 2 */}
          <FadeIn>
            <div className="my-8 overflow-hidden rounded-2xl">
              <Image
                src={VUA_XOAI_IMAGES.dongHangDemGiaDinh.src}
                alt={VUA_XOAI_IMAGES.dongHangDemGiaDinh.alt}
                width={VUA_XOAI_IMAGES.dongHangDemGiaDinh.width}
                height={VUA_XOAI_IMAGES.dongHangDemGiaDinh.height}
                className="w-full object-cover"
                sizes="(max-width: 760px) 100vw, 760px"
              />
            </div>
          </FadeIn>

          {/* Mẹo mua sỉ */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Mẹo Cho Người Mua Sỉ — Đặt Theo Lịch Vụ
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Kinh nghiệm từ các đầu mối lâu năm nhập xoài Tứ Quý Bến Tre:
              </p>
              <div className="mt-6 space-y-3">
                {[
                  {
                    so: "01",
                    tieude: "Đặt trước 3–5 ngày trong vụ chính",
                    noidung: "Vụ 1 và vụ 2 hàng dồi dào nhưng vẫn cần đặt trước để chủ vựa phân loại và đóng gói theo tiêu chuẩn yêu cầu.",
                  },
                  {
                    so: "02",
                    tieude: "Đặt trước 10–14 ngày trong vụ Tết",
                    noidung: "Vụ 3 sản lượng thấp hơn nhưng nhu cầu tăng mạnh. Nhiều đơn hàng Tết bị từ chối vì đặt quá gấp. Nên chốt đơn trước tháng 11 dương lịch.",
                  },
                  {
                    so: "03",
                    tieude: "Hỏi vựa lịch hái cụ thể từng đợt",
                    noidung: "Trong mỗi vụ có nhiều đợt hái. Hỏi cụ thể để nhận hàng đúng ngày thu hoạch — đảm bảo độ tươi tối đa khi nhận.",
                  },
                  {
                    so: "04",
                    tieude: "Combo nhiều loại để có giá tốt",
                    noidung: "Đặt kết hợp VIP + Loại 1 + Loại 2, hoặc kết hợp xoài chín + xoài xanh. Thường được ưu đãi giá tốt hơn đặt từng loại riêng lẻ.",
                  },
                  {
                    so: "05",
                    tieude: "Theo dõi giá trước khi đặt lớn",
                    noidung: "Kiểm tra bảng giá hàng ngày trước khi chốt đơn lớn. Giá có thể dao động 10–20% trong vòng 1 tuần tùy mùa và thời tiết.",
                  },
                ].map((item) => (
                  <div key={item.so} className="flex gap-4 rounded-xl border border-border p-4">
                    <div className="font-heading text-3xl font-bold text-text/10 shrink-0 leading-none mt-1">
                      {item.so}
                    </div>
                    <div>
                      <div className="font-semibold text-text text-sm">{item.tieude}</div>
                      <div className="mt-1 text-xs text-text/60 leading-relaxed">{item.noidung}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-text/70">
                Muốn mua xoài đúng vụ, đúng giá:{" "}
                <a href="/xoai-tu-quy" className="text-mango underline underline-offset-4 hover:text-mango-dark">
                  xem sản phẩm xoài Tứ Quý
                </a>{" "}
                hoặc xem{" "}
                <a href="/kien-thuc/vung-trong-xoai-mien-tay" className="text-mango underline underline-offset-4 hover:text-mango-dark">
                  bản đồ vùng trồng xoài miền Tây
                </a>{" "}
                để hiểu tại sao Bến Tre dẫn đầu.
              </p>
            </div>
          </FadeIn>

        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* Internal links */}
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto max-w-[820px]">
          <h3 className="mb-6 text-center font-heading text-2xl font-bold uppercase text-text">
            Khám Phá Thêm
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Xoài Tứ Quý — Sản phẩm", href: "/xoai-tu-quy" },
              { label: "Giá xoài hôm nay", href: "/gia-xoai-hom-nay" },
              { label: "Vùng trồng miền Tây", href: "/kien-thuc/vung-trong-xoai-mien-tay" },
              { label: "Xoài Tứ Quý là gì?", href: "/kien-thuc/xoai-tu-quy-la-gi" },
              { label: "So sánh với Cát Hòa Lộc", href: "/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc" },
              { label: "Nguồn gốc & CDĐL", href: "/nguon-goc" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border-2 border-text/15 bg-white px-5 py-2.5 text-sm font-semibold text-text/70 hover:border-text hover:text-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
