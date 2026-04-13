import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getArticleJsonLd, getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

const PAGE_URL = `${SITE_URL}/kien-thuc/xoai-tu-quy-la-gi`;

export const metadata: Metadata = {
  title: "Xoài Tứ Quý Là Gì? Đặc Điểm, Mùa Vụ, Giá — Hướng Dẫn Đầy Đủ 2026",
  description:
    "Xoài Tứ Quý là gì? Tìm hiểu đặc điểm, vị mặn độc đáo, mùa vụ, phân loại, giá và chỉ dẫn địa lý CDĐL #00124 của xoài đặc sản Thạnh Phú, Bến Tre.",
  keywords: [
    "xoài tứ quý là gì",
    "đặc điểm xoài tứ quý",
    "xoài tứ quý mùa nào",
    "vì sao xoài tứ quý mặn",
    "xoài tứ quý bến tre",
    "cdđl xoài tứ quý",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Xoài Tứ Quý Là Gì? Hướng Dẫn Đầy Đủ 2026",
    description: "Đặc điểm, vị mặn, mùa vụ, giá, và CDĐL #00124 của xoài Tứ Quý Bến Tre.",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/images/xoai-real-2.jpg`, width: 1200, height: 1500 }],
  },
};

const PRICE_TIERS = [
  {
    badge: "VIP",
    badgeColor: "bg-amber-600",
    price: "23.000–25.000đ/kg",
    desc: "Trái to đều, căng mọng, màu vỏ đẹp. Thường chọn làm quà hoặc bán lẻ cao cấp.",
  },
  {
    badge: "Loại 1",
    badgeColor: "bg-green-600",
    price: "20.000–22.000đ/kg",
    desc: "Chất lượng tốt, phù hợp sỉ cho chợ, siêu thị, nhà hàng.",
  },
  {
    badge: "Loại 2",
    badgeColor: "bg-gray-500",
    price: "16.000–18.000đ/kg",
    desc: "Cỡ nhỏ hơn hoặc vỏ kém đẹp mã. Vị không đổi — phù hợp làm gỏi, chế biến.",
  },
];

const HARVEST_SEASONS = [
  { vu: "Vụ 1", month: "Tháng 4", note: "Mùa khô — sản lượng cao nhất" },
  { vu: "Vụ 2", month: "Tháng 8", note: "Giữa năm — xoài đều, ngọt" },
  { vu: "Vụ 3", month: "Tháng 12 / Tết", note: "Vụ Tết — giá cao, nhu cầu tăng mạnh" },
];

const articleJsonLd = getArticleJsonLd({
  title: "Xoài Tứ Quý Là Gì? Đặc Điểm, Mùa Vụ, Giá — Hướng Dẫn Đầy Đủ 2026",
  description:
    "Tìm hiểu xoài Tứ Quý là gì: đặc điểm, vị mặn độc đáo từ đất giồng cát, mùa vụ, phân loại, giá và CDĐL #00124.",
  url: PAGE_URL,
  datePublished: "2026-01-01",
  dateModified: "2026-04-09",
});

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Kiến thức", url: `${SITE_URL}/kien-thuc` },
  { name: "Xoài Tứ Quý là gì?", url: PAGE_URL },
]);

export default async function XoaiTuQuyLaGiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-20">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Kiến thức — Đặc sản Bến Tre
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold leading-tight text-text sm:text-5xl">
              Xoài Tứ Quý Là Gì?
              <br />
              <span className="text-mango">Đặc Sản CDĐL Thạnh Phú Bến Tre</span>
            </h1>
            <p className="mt-6 text-lg leading-7 text-text/70">
              Xoài Tứ Quý là giống xoài đặc sản được trồng trên đất giồng cát ven biển nhiễm mặn tại
              Thạnh Phú, Bến Tre — nổi tiếng với vị ngọt đậm kèm chút mặn nhẹ cuối lưỡi không đâu có,
              và đặc tính cho trái quanh năm.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Article body */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[800px] space-y-16">

          {/* 1. Định nghĩa */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                1. Định Nghĩa — Tại Sao Gọi Là "Tứ Quý"?
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  "Tứ Quý" trong tiếng Việt có nghĩa là <strong className="text-text">bốn mùa</strong>.
                  Tên gọi này xuất phát từ đặc tính sinh học nổi bật nhất của giống xoài này: cây cho
                  trái quanh năm, không phụ thuộc vào một mùa vụ cố định như hầu hết các giống xoài khác.
                </p>
                <p>
                  Giống xoài Tứ Quý có nguồn gốc từ năm <strong className="text-text">1982</strong>,
                  được lai tạo bởi nông dân ở ấp Phú Đa, xã Vĩnh Bình, huyện Chợ Lách. Tuy nhiên, qua
                  thực tế canh tác nhiều thập kỷ, chỉ có vùng đất giồng cát ven biển nhiễm mặn ở huyện
                  Thạnh Phú (và một phần Ba Tri, Bình Đại) mới cho ra trái đạt chất lượng và hương vị
                  đặc trưng tốt nhất.
                </p>
                <p>
                  Đây là lý do vùng Thạnh Phú được cấp <strong className="text-text">Chỉ dẫn địa lý CDĐL #00124</strong> —
                  bảo hộ độc quyền tên gọi "Xoài Tứ Quý Bến Tre" trên toàn quốc.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* 2. Đặc điểm */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                2. Đặc Điểm — Hình Dáng, Hương Vị, Trọng Lượng
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Xoài Tứ Quý Bến Tre có hình dáng thuôn dài, vỏ căng mịn, màu xanh khi còn non và
                  chuyển dần sang <strong className="text-text">vàng nhạt đến vàng xanh khi chín</strong>.
                  Trọng lượng mỗi quả dao động từ <strong className="text-text">400g đến 800g</strong>,
                  một số quả VIP đạt 1–1,5kg.
                </p>
                <p>
                  Điểm khác biệt lớn nhất về hương vị là <strong className="text-text">vị ngọt đậm kết hợp
                  chút mặn nhẹ ở cuối lưỡi</strong> — một profile vị giác độc đáo không thể tìm thấy ở
                  bất kỳ giống xoài nào khác tại Việt Nam.
                </p>
                <ul className="space-y-2 pl-4">
                  <li>• <strong className="text-text">Thịt:</strong> Chắc, ít xơ, tỷ lệ thịt cao nhờ hạt nhỏ và lép</li>
                  <li>• <strong className="text-text">Khi chín:</strong> Ngọt đậm, thơm hắc, mặn nhẹ cuối lưỡi</li>
                  <li>• <strong className="text-text">Khi xanh:</strong> Giòn sần sật, chua thanh — ngon làm gỏi</li>
                  <li>• <strong className="text-text">Màu thịt:</strong> Vàng nhạt đến vàng tươi khi chín</li>
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* 3. Vì sao có vị mặn */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                3. Vì Sao Xoài Tứ Quý Có Vị Mặn?
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Đây là câu hỏi nhiều người thắc mắc nhất. Câu trả lời nằm ở <strong className="text-text">
                  đặc điểm thổ nhưỡng độc đáo</strong> của vùng giồng cát ven biển Thạnh Phú:
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Hàm lượng cát", value: "60–70%" },
                    { label: "Muối tan trong đất", value: "0,009–0,022%" },
                    { label: "Sodium trong quả", value: "1,58–2,02%" },
                    { label: "Địa hình", value: "Cao 2–4m, ven biển" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-brand/40 p-3 text-center">
                      <div className="font-heading text-base font-bold text-text">{s.value}</div>
                      <div className="mt-1 text-xs text-text/60">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-2">
                  Đất giồng cát có <strong className="text-text">hàm lượng cát 60–70%</strong>, giữ nước
                  kém, buộc rễ cây phải vươn sâu để hút nước ngầm có hòa lẫn muối biển tự nhiên. Quá
                  trình này khiến <strong className="text-text">sodium (Na) tích tụ trong trái</strong> ở
                  mức 1,58–2,02% — đủ để tạo vị mặn nhẹ nhận ra được sau vị ngọt, nhưng không đủ để
                  gây khó chịu.
                </p>
                <p>
                  Nước ngọt từ sông Mekong và nước mặn từ biển Đông giao thoa tạo nên môi trường canh
                  tác độc nhất. Đây là lý do tại sao cùng giống xoài Tứ Quý trồng ở vùng khác — dù
                  kỹ thuật tốt hơn — vẫn <strong className="text-text">không có vị mặn</strong> đặc trưng này.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* 4. Mùa vụ */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                4. Mùa Vụ — 3 Vụ Chính Mỗi Năm
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Không như xoài Cát Hòa Lộc hay xoài Cát Chu chỉ có 1–2 vụ/năm, xoài Tứ Quý cho
                  <strong className="text-text"> trái 3 lần mỗi năm</strong>. Xoài xanh có thể thu hoạch
                  quanh năm bất kể mùa vụ.
                </p>
                <div className="mt-4 space-y-3">
                  {HARVEST_SEASONS.map((s) => (
                    <div key={s.vu} className="flex items-start gap-4 rounded-xl bg-brand/30 p-4">
                      <div className="w-16 shrink-0 text-center">
                        <div className="font-heading text-lg font-bold text-text">{s.vu}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-text">{s.month}</div>
                        <div className="text-xs text-text/60">{s.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-2">
                  Vụ 3 (tháng 12 âm lịch / Tết) thường có giá cao nhất do nhu cầu quà tặng tăng mạnh.
                  Vụ 1 (tháng 4) cho sản lượng cao nhất do thời tiết khô ráo, thuận lợi cho quả phát triển.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* 5. Phân loại */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                5. Phân Loại & Bảng Giá
              </h2>
              <div className="mt-4 space-y-4">
                {PRICE_TIERS.map((tier) => (
                  <div key={tier.badge} className="flex items-start gap-4 rounded-xl border border-border p-4">
                    <span className={`mt-0.5 shrink-0 rounded-full ${tier.badgeColor} px-3 py-1 text-xs font-bold text-white`}>
                      {tier.badge}
                    </span>
                    <div>
                      <div className="font-heading text-lg font-bold text-text">{tier.price}</div>
                      <div className="mt-1 text-sm text-text/60">{tier.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-text/40">
                Giá thị trường, cập nhật hàng ngày. Xem giá chính xác tại{" "}
                <a href="/xoai-tu-quy#gia" className="underline hover:text-text">giá xoài hôm nay</a>.
              </p>
            </div>
          </FadeIn>

          {/* 6. CDĐL */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                6. Chỉ Dẫn Địa Lý CDĐL #00124
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Năm <strong className="text-text">2022</strong>, Cục Sở hữu trí tuệ (Cục SHTT) — Bộ
                  Khoa học và Công nghệ — ban hành Quyết định số{" "}
                  <strong className="text-text">5371/QĐ-SHTT ngày 10/11/2022</strong>, chính thức cấp
                  Chỉ dẫn địa lý mang số hiệu <strong className="text-text">CDĐL #00124</strong> cho
                  "Xoài Tứ Quý Bến Tre".
                </p>
                <p>
                  Theo đó, <strong className="text-text">chỉ xoài Tứ Quý trồng tại ba huyện Thạnh Phú,
                  Ba Tri và Bình Đại</strong> của tỉnh Bến Tre mới được phép mang tên gọi và nhãn hiệu
                  "Xoài Tứ Quý Bến Tre" chính thức. Sản phẩm từ vùng khác không được phép dùng tên này.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { value: "400+ ha", label: "Diện tích vùng CDĐL" },
                    { value: "700+", label: "Hộ dân tham gia" },
                    { value: "3 huyện", label: "Thạnh Phú, Ba Tri, Bình Đại" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-brand/40 p-3 text-center">
                      <div className="font-heading text-xl font-bold text-text">{s.value}</div>
                      <div className="mt-1 text-xs text-text/60">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 7. Cách chọn xoài */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                7. Cách Chọn Xoài Tứ Quý Ngon
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-text/70">
                <div>
                  <h3 className="mb-2 font-semibold text-text">Chọn xoài chín:</h3>
                  <ul className="space-y-1.5 pl-4">
                    <li>• Vỏ chuyển sang vàng nhạt đều, không bị thâm hay đốm đen</li>
                    <li>• Nhấn nhẹ vào cuống — quả hơi mềm, đàn hồi nhẹ là vừa chín</li>
                    <li>• Mùi thơm hắc nhẹ, đặc trưng của xoài chín tự nhiên</li>
                    <li>• Tránh quả quá mềm nhũn hoặc có mùi lên men</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-text">Chọn xoài xanh (ăn sống / làm gỏi):</h3>
                  <ul className="space-y-1.5 pl-4">
                    <li>• Vỏ xanh đều, không có vết nâu hay thâm</li>
                    <li>• Gõ vào nghe tiếng đặc, chắc — nghĩa là thịt giòn</li>
                    <li>• Nên chọn quả cỡ vừa (400–600g) cho tỷ lệ thịt/hạt tốt nhất</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-text">Bảo quản:</h3>
                  <ul className="space-y-1.5 pl-4">
                    <li>• Xoài xanh: để nhiệt độ phòng 5–7 ngày tự chín</li>
                    <li>• Xoài chín: để ngăn mát tủ lạnh 3–5 ngày</li>
                    <li>• Không để trong túi kín — cần thoáng khí để hạn chế thối</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Internal links */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto max-w-[800px]">
          <FadeIn>
            <h2 className="mb-8 text-center font-heading text-2xl font-bold uppercase text-text">
              Tìm Hiểu Thêm
            </h2>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Mua xoài Tứ Quý", href: "/xoai-tu-quy" },
              { label: "Giá xoài hôm nay", href: "/xoai-tu-quy#gia" },
              { label: "Nguồn gốc & CDĐL", href: "/nguon-goc" },
              { label: "So sánh với Cát Hòa Lộc", href: "/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border-2 border-text/20 px-5 py-2.5 text-sm font-semibold text-text/70 hover:border-text hover:text-text transition-colors"
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
