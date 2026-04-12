import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getArticleJsonLd, getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

const PAGE_URL = `${SITE_URL}/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc`;

export const metadata: Metadata = {
  title: "Xoài Tứ Quý vs Xoài Cát Hòa Lộc — So Sánh Vị, Giá, Mùa Vụ",
  description:
    "So sánh chi tiết xoài Tứ Quý Bến Tre và xoài Cát Hòa Lộc Tiền Giang: vị, giá, mùa vụ, bảo quản, và trường hợp sử dụng phù hợp nhất.",
  keywords: [
    "xoài tứ quý vs xoài cát hòa lộc",
    "so sánh xoài tứ quý và cát hòa lộc",
    "xoài tứ quý hay xoài cát ngon hơn",
    "giá xoài cát hòa lộc",
    "xoài bến tre vs tiền giang",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Xoài Tứ Quý vs Xoài Cát Hòa Lộc — So Sánh Chi Tiết",
    description: "Vị, giá, mùa vụ, bảo quản — hai giống xoài nổi tiếng nhất miền Tây khác nhau thế nào?",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/images/xoai-real-2.jpg`, width: 1200, height: 1500 }],
  },
};

const COMPARISON_ROWS = [
  { criteria: "Vùng trồng", tuQuy: "Thạnh Phú, Ba Tri, Bình Đại — Bến Tre", hoaLoc: "Hòa Lộc, Cái Bè — Tiền Giang" },
  { criteria: "Vị", tuQuy: "Ngọt đậm, mặn nhẹ cuối lưỡi", hoaLoc: "Ngọt thanh, thơm đậm đặc trưng" },
  { criteria: "Mùa vụ", tuQuy: "3 vụ/năm (quanh năm)", hoaLoc: "1–2 vụ/năm (tháng 4–6)" },
  { criteria: "Giá sỉ", tuQuy: "16.000–25.000đ/kg", hoaLoc: "40.000–80.000đ/kg" },
  { criteria: "Trọng lượng", tuQuy: "400–800g (một số đạt 1–1,5kg)", hoaLoc: "350–500g" },
  { criteria: "Chỉ dẫn địa lý", tuQuy: "CDĐL #00124 (Cục SHTT, 2022)", hoaLoc: "Chưa có CDĐL chính thức" },
  { criteria: "Bảo quản", tuQuy: "5–7 ngày (nhiệt độ phòng)", hoaLoc: "3–4 ngày" },
  { criteria: "Phù hợp nhất", tuQuy: "Sỉ, ăn chín/xanh, làm gỏi, chế biến", hoaLoc: "Ăn chín, quà tặng cao cấp" },
];

const FAQS = [
  {
    q: "Xoài Tứ Quý hay xoài Cát Hòa Lộc ngon hơn?",
    a: "Phụ thuộc vào mục đích. Xoài Cát Hòa Lộc có hương thơm nồng và vị ngọt thanh được giới sành ăn đánh giá cao — thường dùng làm quà tặng. Xoài Tứ Quý có vị mặn nhẹ độc đáo, giá phải chăng hơn, và phù hợp đa dạng cách dùng hơn (chín, xanh, gỏi, chế biến).",
  },
  {
    q: "Giá xoài Cát Hòa Lộc cao hơn xoài Tứ Quý vì sao?",
    a: "Xoài Cát Hòa Lộc chỉ có 1–2 vụ/năm nên khan hàng hơn. Hình thức đẹp, thương hiệu lâu đời, và nhu cầu làm quà tặng cao cấp đẩy giá lên 40.000–80.000đ/kg — cao gấp 2–3 lần xoài Tứ Quý. Xoài Tứ Quý quanh năm nguồn cung dồi dào hơn nên giá ổn định và cạnh tranh hơn.",
  },
  {
    q: "Có thể phân biệt hai loại xoài này bằng mắt thường không?",
    a: "Có. Xoài Cát Hòa Lộc khi chín vỏ vàng tươi đẹp, hình dáng thuôn đều, thịt dày không xơ. Xoài Tứ Quý khi chín vỏ vàng nhạt hoặc vàng xanh, quả to hơn và nặng hơn. Cách chắc nhất là nếm thử — vị mặn nhẹ cuối lưỡi là dấu hiệu đặc trưng chỉ có ở xoài Tứ Quý Bến Tre.",
  },
];

const articleJsonLd = getArticleJsonLd({
  title: "Xoài Tứ Quý vs Xoài Cát Hòa Lộc — So Sánh Chi Tiết",
  description:
    "So sánh vị, giá, mùa vụ, bảo quản giữa xoài Tứ Quý Bến Tre và xoài Cát Hòa Lộc Tiền Giang.",
  url: PAGE_URL,
  datePublished: "2026-01-01",
  dateModified: "2026-04-09",
});

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Kiến thức", url: `${SITE_URL}/kien-thuc` },
  { name: "Xoài Tứ Quý vs Cát Hòa Lộc", url: PAGE_URL },
]);

export default function XoaiSoSanhPage() {
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
              Kiến thức — So sánh giống xoài
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold leading-tight text-text sm:text-5xl">
              Xoài Tứ Quý vs Xoài Cát Hòa Lộc
              <br />
              <span className="text-mango">So Sánh Chi Tiết</span>
            </h1>
            <p className="mt-6 text-lg leading-7 text-text/70">
              Hai giống xoài đặc sản nổi tiếng nhất miền Tây Nam Bộ — mỗi loại có profile hương
              vị, mùa vụ và phân khúc thị trường riêng. Bài viết này phân tích khách quan để bạn
              chọn đúng loại cho nhu cầu.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[900px] space-y-16">

          {/* Intro cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-3xl bg-white p-8 shadow-sm">
                <div className="mb-3 inline-block rounded-full bg-amber-600 px-3 py-1 text-xs font-bold text-white">
                  Xoài Tứ Quý
                </div>
                <h2 className="font-heading text-xl font-bold text-text">Đặc sản Thạnh Phú, Bến Tre</h2>
                <p className="mt-3 text-sm leading-relaxed text-text/70">
                  Giống xoài cho trái quanh năm (3 vụ/năm), trồng trên đất giồng cát ven biển nhiễm
                  mặn. Đặc trưng bởi vị ngọt đậm kèm mặn nhẹ cuối lưỡi — không thể tái tạo ở vùng
                  khác. Đã được cấp CDĐL #00124 năm 2022.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="h-full rounded-3xl bg-white p-8 shadow-sm">
                <div className="mb-3 inline-block rounded-full bg-green-700 px-3 py-1 text-xs font-bold text-white">
                  Xoài Cát Hòa Lộc
                </div>
                <h2 className="font-heading text-xl font-bold text-text">Đặc sản Hòa Lộc, Tiền Giang</h2>
                <p className="mt-3 text-sm leading-relaxed text-text/70">
                  Giống xoài cát nổi tiếng nhất Việt Nam, được trồng chủ yếu tại xã Hòa Lộc (Cái Bè,
                  Tiền Giang). Vỏ vàng đẹp, thịt dày, hương thơm đặc trưng, vị ngọt thanh. Thường
                  được dùng làm quà tặng cao cấp.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Comparison table */}
          <FadeIn>
            <div>
              <h2 className="mb-6 font-heading text-2xl font-bold uppercase text-text">
                Bảng So Sánh Chi Tiết
              </h2>
              <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                {/* Header */}
                <div className="grid grid-cols-3 gap-2 border-b border-border bg-text/5 px-4 py-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-text/50">Tiêu chí</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700">Xoài Tứ Quý</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-green-700">Cát Hòa Lộc</div>
                </div>
                {/* Rows */}
                {COMPARISON_ROWS.map((row, i) => (
                  <div
                    key={row.criteria}
                    className={`grid grid-cols-3 gap-2 px-4 py-4 ${i < COMPARISON_ROWS.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <div className="text-sm font-semibold text-text">{row.criteria}</div>
                    <div className="text-sm text-text/70">{row.tuQuy}</div>
                    <div className="text-sm text-text/70">{row.hoaLoc}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Analysis */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Phân Tích — Nên Chọn Loại Nào?
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-text/70">
                <p>
                  Đây là hai giống xoài phục vụ <strong className="text-text">hai phân khúc khác nhau</strong>,
                  không phải cạnh tranh trực tiếp — mỗi loại có thế mạnh riêng:
                </p>
                <div className="space-y-4">
                  <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4">
                    <h3 className="font-semibold text-text">Chọn Xoài Tứ Quý khi:</h3>
                    <ul className="mt-2 space-y-1 pl-4 text-text/70">
                      <li>• Cần nguồn hàng ổn định quanh năm cho kinh doanh</li>
                      <li>• Mua sỉ số lượng lớn với giá cạnh tranh</li>
                      <li>• Muốn trải nghiệm vị mặn nhẹ độc đáo của miền Tây</li>
                      <li>• Làm gỏi xoài, chế biến, hoặc ăn xanh chấm muối ớt</li>
                      <li>• Cần hàng có chứng nhận nguồn gốc CDĐL rõ ràng</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border-l-4 border-green-600 bg-green-50 p-4">
                    <h3 className="font-semibold text-text">Chọn Xoài Cát Hòa Lộc khi:</h3>
                    <ul className="mt-2 space-y-1 pl-4 text-text/70">
                      <li>• Tặng quà — hình thức đẹp, thương hiệu được biết đến rộng rãi</li>
                      <li>• Ăn chín thuần túy, thưởng thức hương thơm tự nhiên</li>
                      <li>• Phân khúc cao cấp, khách hàng sẵn sàng trả giá cao hơn</li>
                      <li>• Mùa hè (tháng 4–6) khi hàng chính vụ dồi dào nhất</li>
                    </ul>
                  </div>
                </div>
                <p>
                  Nếu bạn kinh doanh trái cây và cần nguồn hàng <strong className="text-text">ổn định, giá
                  tốt, quanh năm</strong> — xoài Tứ Quý Bến Tre là lựa chọn thực tế hơn. Nếu bạn cần
                  sản phẩm <strong className="text-text">cao cấp, quà tặng dịp Tết/lễ</strong> — xoài Cát
                  Hòa Lộc phù hợp hơn.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* FAQ */}
          <FadeIn>
            <div>
              <h2 className="mb-6 font-heading text-2xl font-bold uppercase text-text">
                Câu Hỏi Thường Gặp
              </h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-text">{faq.q}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text/70">{faq.a}</p>
                  </div>
                ))}
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
              { label: "Xoài Tứ Quý là gì?", href: "/kien-thuc/xoai-tu-quy-la-gi" },
              { label: "Mua xoài Tứ Quý", href: "/xoai-tu-quy" },
              { label: "Giá xoài hôm nay", href: "/xoai-tu-quy#gia" },
              { label: "Nguồn gốc & CDĐL", href: "/nguon-goc" },
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
