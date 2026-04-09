import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { getArticleJsonLd, getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";
import { VUA_XOAI_IMAGES } from "@/lib/vua-xoai-images";

const PAGE_URL = `${SITE_URL}/kien-thuc/vung-trong-xoai-mien-tay`;

export const metadata: Metadata = {
  title: "Vùng Trồng Xoài Miền Tây — Bến Tre, Tiền Giang, Vĩnh Long, Trà Vinh",
  description:
    "Bản đồ vùng trồng xoài miền Tây Nam Bộ: Bến Tre (Tứ Quý CDĐL #00124), Tiền Giang (Cát Hòa Lộc), Vĩnh Long, Trà Vinh, Sóc Trăng.",
  keywords: [
    "vùng trồng xoài miền tây",
    "xoài bến tre",
    "xoài tiền giang",
    "xoài vĩnh long",
    "xoài trà vinh",
    "xoài cát hòa lộc",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Vùng Trồng Xoài Miền Tây — Bến Tre, Tiền Giang, Vĩnh Long, Trà Vinh",
    description: "Bản đồ vùng trồng xoài miền Tây: so sánh 5 tỉnh, đặc điểm giống, giá, mùa vụ và thị trường.",
    url: PAGE_URL,
    images: [{ url: VUA_XOAI_IMAGES.binhMinhDua.src, width: 1200, height: 900 }],
  },
};

const articleJsonLd = getArticleJsonLd({
  title: "Vùng Trồng Xoài Miền Tây — Bến Tre, Tiền Giang, Vĩnh Long, Trà Vinh",
  description:
    "Bản đồ vùng trồng xoài miền Tây Nam Bộ: Bến Tre (Tứ Quý CDĐL #00124), Tiền Giang (Cát Hòa Lộc), Vĩnh Long, Trà Vinh, Sóc Trăng.",
  url: PAGE_URL,
  datePublished: "2026-04-09",
  dateModified: "2026-04-09",
  image: VUA_XOAI_IMAGES.binhMinhDua.src,
});

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Kiến thức", url: `${SITE_URL}/kien-thuc` },
  { name: "Vùng trồng xoài miền Tây", url: PAGE_URL },
]);

const PROVINCE_OVERVIEW = [
  { tinh: "Bến Tre", dientich: "~700 ha", giong: "Tứ Quý (CDĐL #00124)", gia: "16–25k/kg", cdđl: "Có" },
  { tinh: "Tiền Giang", dientich: "~1.500 ha", giong: "Cát Hòa Lộc + Keo", gia: "40–80k/kg", cdđl: "Không" },
  { tinh: "Vĩnh Long", dientich: "~800 ha", giong: "Keo + pha trộn", gia: "12–20k/kg", cdđl: "Không" },
  { tinh: "Trà Vinh", dientich: "~600 ha", giong: "Cát Chu + Keo", gia: "15–25k/kg", cdđl: "Không" },
  { tinh: "Sóc Trăng", dientich: "~400 ha", giong: "Cát Chu + Keo", gia: "12–18k/kg", cdđl: "Không" },
];

const COMPARISON_DATA = [
  {
    tieuchi: "Vị",
    bentre: "Ngọt + mặn nhẹ",
    tiengiang: "Ngọt thanh, thơm",
    vinhlong: "Ngọt vừa, hột to",
    travinh: "Ngọt nhẹ",
  },
  {
    tieuchi: "Mùa",
    bentre: "3 vụ/năm",
    tiengiang: "1–2 vụ",
    vinhlong: "1–2 vụ",
    travinh: "1 vụ",
  },
  {
    tieuchi: "Giá sỉ",
    bentre: "16–25k/kg",
    tiengiang: "40–80k/kg",
    vinhlong: "12–20k/kg",
    travinh: "15–25k/kg",
  },
  {
    tieuchi: "CDĐL",
    bentre: "Có (#00124)",
    tiengiang: "Không",
    vinhlong: "Không",
    travinh: "Không",
  },
  {
    tieuchi: "Bảo quản",
    bentre: "5–7 ngày",
    tiengiang: "3–4 ngày",
    vinhlong: "3 ngày",
    travinh: "4–5 ngày",
  },
  {
    tieuchi: "Xuất khẩu",
    bentre: "USA, Hàn, Úc",
    tiengiang: "EU, Nhật",
    vinhlong: "Hạn chế",
    travinh: "Hạn chế",
  },
];

export default function VungTrongXoaiMienTayPage() {
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
              Kiến thức — Vùng trồng
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold leading-tight text-text sm:text-5xl">
              Vùng Trồng Xoài Miền Tây —{" "}
              <span className="text-mango">Bến Tre, Tiền Giang, Vĩnh Long, Trà Vinh</span>
            </h1>
            <p className="mt-6 text-lg leading-7 text-text/70">
              Miền Tây Nam Bộ là vựa xoài lớn nhất Việt Nam với hơn 3.000 ha canh tác. Mỗi
              tỉnh có giống xoài đặc trưng, thổ nhưỡng riêng và thị trường tiêu thụ khác nhau —
              tạo nên một "bản đồ xoài" phong phú và đa dạng nhất cả nước.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Hero image */}
      <FadeIn delay={0.1}>
        <div className="mx-auto max-w-[1100px] px-5 -mt-4">
          <div className="my-8 overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={VUA_XOAI_IMAGES.binhMinhDua.src}
              alt={VUA_XOAI_IMAGES.binhMinhDua.alt}
              width={VUA_XOAI_IMAGES.binhMinhDua.width}
              height={VUA_XOAI_IMAGES.binhMinhDua.height}
              priority
              className="w-full object-cover"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
        </div>
      </FadeIn>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Article body */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[760px] space-y-16">

          {/* Bản đồ tổng quan */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Bản Đồ Vùng Trồng Xoài Miền Tây
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Theo số liệu Bộ Nông nghiệp &amp; Phát triển Nông thôn (2024), tổng diện tích
                trồng xoài miền Tây vượt 3.000 ha — chiếm gần 40% sản lượng xoài cả nước.
                Năm tỉnh dẫn đầu có đặc điểm canh tác và thị trường hoàn toàn khác nhau.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-brand">
                      <th className="text-left p-3 font-heading font-bold text-text text-xs uppercase">Tỉnh</th>
                      <th className="text-left p-3 font-heading font-bold text-text text-xs uppercase">Diện tích</th>
                      <th className="text-left p-3 font-heading font-bold text-text text-xs uppercase">Giống chính</th>
                      <th className="text-left p-3 font-heading font-bold text-text text-xs uppercase">Giá sỉ</th>
                      <th className="text-left p-3 font-heading font-bold text-text text-xs uppercase">CDĐL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROVINCE_OVERVIEW.map((row, i) => (
                      <tr key={row.tinh} className={i % 2 === 0 ? "bg-brand/20" : "bg-white"}>
                        <td className="p-3 font-semibold text-text">{row.tinh}</td>
                        <td className="p-3 text-text/70">{row.dientich}</td>
                        <td className="p-3 text-text/70">{row.giong}</td>
                        <td className="p-3 text-text/70">{row.gia}</td>
                        <td className="p-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${row.cdđl === "Có" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            {row.cdđl}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Bến Tre */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Bến Tre — Vương Quốc Xoài Tứ Quý
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Với khoảng <strong className="text-text">700 ha</strong> canh tác tập trung chủ yếu tại
                ba huyện <strong className="text-text">Thạnh Phú (~400 ha), Ba Tri (~150 ha) và Bình Đại
                (~100 ha)</strong>, Bến Tre là vùng trồng xoài Tứ Quý duy nhất được bảo hộ pháp lý tại Việt Nam.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { value: "~700 ha", label: "Diện tích canh tác" },
                  { value: "700+", label: "Hộ dân tham gia" },
                  { value: "3 vụ/năm", label: "Chu kỳ thu hoạch" },
                  { value: "CDĐL #00124", label: "Chỉ dẫn địa lý 2022" },
                  { value: "95%", label: "Tiêu thụ miền Bắc" },
                  { value: "HTX Thạnh Phong", label: "Đơn vị quản lý" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-brand/40 p-3 text-center">
                    <div className="font-heading text-base font-bold text-text">{s.value}</div>
                    <div className="mt-1 text-xs text-text/60">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Điều tạo nên sự khác biệt tuyệt đối của xoài Bến Tre là <strong className="text-text">
                  đất giồng cát ven biển nhiễm mặn</strong> — một terroir không thể tái tạo ở bất kỳ
                  vùng nào khác. Hàm lượng cát 60–70%, đất giữ nước kém, rễ cây phải vươn sâu hút
                  nước ngầm pha trộn muối biển tự nhiên — tạo ra hàm lượng sodium 1,58–2,02% trong
                  thịt quả, dẫn đến vị mặn nhẹ đặc trưng cuối lưỡi.
                </p>
                <p>
                  Năm 2022, Cục Sở hữu trí tuệ ban hành Quyết định số{" "}
                  <strong className="text-text">5371/QĐ-SHTT ngày 10/11/2022</strong>, chính thức
                  cấp <strong className="text-text">Chỉ dẫn địa lý CDĐL #00124</strong> — bảo hộ độc
                  quyền tên gọi "Xoài Tứ Quý Bến Tre" trên toàn lãnh thổ Việt Nam. Đây là cơ sở
                  pháp lý để phân biệt xoài thật từ vùng gốc với hàng nhái từ vùng khác.
                </p>
                <p>
                  Tính ưu việt lớn nhất của Bến Tre trong cạnh tranh thương mại:{" "}
                  <strong className="text-text">giống Tứ Quý cho 3 vụ/năm</strong>, đảm bảo nguồn
                  cung liên tục 12 tháng — một lợi thế không giống nào khác trong vùng có được. Xem
                  chi tiết về <a href="/kien-thuc/mua-vu-xoai-tu-quy-3-vu-nam" className="text-mango underline underline-offset-4 hover:text-mango-dark">
                  lịch mùa vụ xoài Tứ Quý 3 vụ/năm</a>.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Inline image 1 */}
          <FadeIn>
            <div className="my-8 overflow-hidden rounded-2xl">
              <Image
                src={VUA_XOAI_IMAGES.vuaXoaiTongQuan.src}
                alt={VUA_XOAI_IMAGES.vuaXoaiTongQuan.alt}
                width={VUA_XOAI_IMAGES.vuaXoaiTongQuan.width}
                height={VUA_XOAI_IMAGES.vuaXoaiTongQuan.height}
                className="w-full object-cover"
                sizes="(max-width: 760px) 100vw, 760px"
              />
            </div>
          </FadeIn>

          {/* Tiền Giang */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Tiền Giang — Cái Nôi Xoài Cát Hòa Lộc
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Tiền Giang là tỉnh có diện tích trồng xoài lớn nhất miền Tây với{" "}
                <strong className="text-text">~1.500 ha</strong>, tập trung chủ yếu tại Cái Bè và
                Cai Lậy. Nơi đây nổi tiếng với <strong className="text-text">xoài Cát Hòa Lộc</strong> —
                giống xoài được đánh giá cao nhất về hương vị tại thị trường cao cấp trong nước và quốc tế.
              </p>
              <div className="mt-6 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Xoài Cát Hòa Lộc có vị ngọt thanh tinh tế, hương thơm đậm đặc trưng khác biệt
                  hoàn toàn với xoài Tứ Quý. Thịt mịn, ít xơ, màu vàng đậm khi chín — profile hương
                  vị được thị trường Nhật Bản, Hàn Quốc và EU đặc biệt ưa chuộng.
                </p>
                <p>
                  Tuy nhiên, giống Cát Hòa Lộc chỉ cho{" "}
                  <strong className="text-text">1–2 vụ/năm</strong> (vụ chính tháng 4–6), dẫn đến
                  nguồn cung không ổn định và giá sỉ dao động mạnh:{" "}
                  <strong className="text-text">40.000–80.000đ/kg</strong> — cao gấp 2–3 lần xoài
                  Tứ Quý Bến Tre. Hạn chế lớn nhất: chưa có chỉ dẫn địa lý chính thức.
                </p>
                <p>
                  Thị trường xuất khẩu của xoài Tiền Giang hướng đến phân khúc cao cấp EU và Nhật
                  Bản, nhưng khối lượng còn hạn chế do yêu cầu kiểm dịch nghiêm ngặt và thiếu hạ
                  tầng logistics lạnh đồng bộ. Xem <a href="/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc" className="text-mango underline underline-offset-4 hover:text-mango-dark">
                  so sánh chi tiết xoài Tứ Quý vs Cát Hòa Lộc</a>.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Vĩnh Long */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Vĩnh Long — Vùng Xoài Keo Phổ Thông
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Vĩnh Long canh tác khoảng <strong className="text-text">~800 ha</strong> xoài, tập
                trung tại Long Hồ và Tam Bình. Giống xoài chủ đạo là{" "}
                <strong className="text-text">xoài Keo</strong> và các giống pha trộn, hướng đến
                phân khúc tiêu dùng đại trà thay vì cao cấp.
              </p>
              <div className="mt-6 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Xoài Keo Vĩnh Long có giá thấp nhất trong nhóm:{" "}
                  <strong className="text-text">12.000–20.000đ/kg</strong>, phù hợp cung cấp cho
                  chợ đầu mối, bếp ăn công nghiệp và tiêu dùng đại trà. Hạt to, thịt ngọt vừa
                  phải, không có hương thơm đặc trưng như Cát Hòa Lộc hay vị mặn như Tứ Quý.
                </p>
                <p>
                  Vĩnh Long thu hoạch 1–2 vụ/năm, chủ yếu phục vụ thị trường nội địa miền Tây và
                  miền Nam. Tiềm năng xuất khẩu hạn chế do thiếu thương hiệu và chứng nhận chất lượng.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Trà Vinh */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Trà Vinh — Xoài Cát Chu Vùng Đồng Bằng
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Trà Vinh canh tác khoảng <strong className="text-text">~600 ha</strong>, tập trung
                tại Châu Thành và Cầu Kè. Giống chủ đạo là{" "}
                <strong className="text-text">xoài Cát Chu</strong> — giống có vị ngọt nhẹ, thịt
                mềm, phù hợp ăn chín hơn ăn xanh.
              </p>
              <div className="mt-6 space-y-3 text-sm leading-relaxed text-text/70">
                <p>
                  Xoài Cát Chu Trà Vinh giá dao động{" "}
                  <strong className="text-text">15.000–25.000đ/kg</strong>, tiêu thụ chủ yếu tại
                  địa phương và các tỉnh miền Tây lân cận. Chỉ có 1 vụ chính/năm, không có chứng
                  nhận địa lý và ít được nhắc đến trên thị trường xuất khẩu.
                </p>
                <p>
                  Điểm mạnh của Trà Vinh nằm ở chi phí canh tác thấp và thị trường địa phương ổn
                  định. Tuy nhiên, trong bối cảnh cạnh tranh ngày càng gay gắt với xoài nhập khẩu
                  Đài Loan và xoài Bến Tre có CDĐL, Trà Vinh đang phải tìm hướng phát triển mới.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Inline image 2 */}
          <FadeIn>
            <div className="my-8 overflow-hidden rounded-2xl">
              <Image
                src={VUA_XOAI_IMAGES.xoaiPhanLoai.src}
                alt={VUA_XOAI_IMAGES.xoaiPhanLoai.alt}
                width={VUA_XOAI_IMAGES.xoaiPhanLoai.width}
                height={VUA_XOAI_IMAGES.xoaiPhanLoai.height}
                className="w-full object-cover"
                sizes="(max-width: 760px) 100vw, 760px"
              />
            </div>
          </FadeIn>

          {/* So sánh */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                So Sánh Xoài 4 Tỉnh — Bạn Nên Mua Loại Nào?
              </h2>
              <p className="mt-4 mb-6 text-sm leading-relaxed text-text/70">
                Bảng so sánh chi tiết theo 6 tiêu chí quan trọng nhất cho người mua sỉ và bán lẻ:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-brand">
                      <th className="text-left p-2.5 font-heading font-bold text-text uppercase">Tiêu chí</th>
                      <th className="text-left p-2.5 font-heading font-bold text-mango uppercase">Bến Tre (Tứ Quý)</th>
                      <th className="text-left p-2.5 font-heading font-bold text-text uppercase">Tiền Giang (Cát Hòa Lộc)</th>
                      <th className="text-left p-2.5 font-heading font-bold text-text uppercase">Vĩnh Long (Keo)</th>
                      <th className="text-left p-2.5 font-heading font-bold text-text uppercase">Trà Vinh (Cát Chu)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_DATA.map((row, i) => (
                      <tr key={row.tieuchi} className={i % 2 === 0 ? "bg-brand/20" : "bg-white"}>
                        <td className="p-2.5 font-semibold text-text">{row.tieuchi}</td>
                        <td className="p-2.5 text-text/80 font-medium">{row.bentre}</td>
                        <td className="p-2.5 text-text/70">{row.tiengiang}</td>
                        <td className="p-2.5 text-text/70">{row.vinhlong}</td>
                        <td className="p-2.5 text-text/70">{row.travinh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Vì sao Bến Tre chiếm ưu thế */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Vì Sao Bến Tre Đang Chiếm Ưu Thế?
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "3 vụ/năm — cung ổn định, không đứt hàng",
                    desc: "Trong khi Cát Hòa Lộc chỉ có 1–2 vụ và khan hàng 6–8 tháng/năm, xoài Tứ Quý Bến Tre cung cấp liên tục. Đây là yếu tố quyết định cho bên mua sỉ dài hạn.",
                  },
                  {
                    title: "CDĐL chính thức — uy tín pháp lý",
                    desc: "CDĐL #00124 là chứng nhận duy nhất trong ngành xoài miền Tây. Người mua có thể truy xuất nguồn gốc và tin tưởng vào tiêu chuẩn kiểm soát chất lượng.",
                  },
                  {
                    title: "Giá cạnh tranh — rẻ hơn Cát Hòa Lộc 50%",
                    desc: "Ở mức 16.000–25.000đ/kg, xoài Tứ Quý phù hợp với biên lợi nhuận của hầu hết mô hình kinh doanh từ chợ truyền thống đến thương mại điện tử.",
                  },
                  {
                    title: "Vị mặn nhẹ — khác biệt không thể bắt chước",
                    desc: "Terroir đất giồng cát ven biển tạo ra profile vị giác độc đáo. Không có vùng nào khác ở Việt Nam có thể tái tạo đặc điểm này, ngay cả khi dùng cùng giống cây.",
                  },
                  {
                    title: "Chuỗi cung ứng phát triển nhanh",
                    desc: "HTX Thạnh Phong, cùng với hơn 700 hộ dân tham gia, đang đầu tư vào đóng gói, logistics lạnh và truy xuất QR — nâng chuẩn xuất khẩu.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-xl bg-brand/30 p-4">
                    <div className="mt-1 size-5 shrink-0 rounded-full bg-mango/80" />
                    <div>
                      <div className="font-semibold text-text text-sm">{item.title}</div>
                      <div className="mt-1 text-xs text-text/60 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Thách thức */}
          <FadeIn>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold uppercase text-text">
                Nông Dân Các Tỉnh Đối Mặt Thách Thức Gì?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text/70">
                Dù tiềm năng lớn, ngành xoài miền Tây đang đối mặt với bốn thách thức cấu trúc
                chưa có giải pháp toàn diện:
              </p>
              <div className="mt-6 space-y-3">
                {[
                  {
                    so: "01",
                    tieude: "Biến đổi khí hậu",
                    noidung: "Mặn xâm nhập ngày càng sâu hơn vào mùa khô, ảnh hưởng đến lịch ra hoa và sản lượng. Năm 2024, một số vườn Thạnh Phú thiệt hại 20–30% sản lượng vụ 1 do mặn xâm nhập sớm.",
                  },
                  {
                    so: "02",
                    tieude: "Cạnh tranh xoài nhập khẩu",
                    noidung: "Xoài Đài Loan và Úc nhập khẩu ngày càng nhiều, cạnh tranh trực tiếp phân khúc xoài chín cao cấp. Giá nhập khẩu đang ép giá bán nội địa.",
                  },
                  {
                    so: "03",
                    tieude: "Thiếu chuỗi logistics lạnh",
                    noidung: "Chỉ một phần nhỏ sản lượng được vận chuyển trong kho lạnh. Tỷ lệ thất thoát sau thu hoạch ước tính 15–25% — con số rất cao so với tiêu chuẩn quốc tế.",
                  },
                  {
                    so: "04",
                    tieude: "Khó tiếp cận thị trường xuất khẩu cao cấp",
                    noidung: "Yêu cầu kiểm dịch, GlobalGAP, và tiêu chuẩn đóng gói của EU/Nhật đòi hỏi đầu tư lớn mà hầu hết nông hộ nhỏ không đủ nguồn lực đáp ứng.",
                  },
                ].map((item) => (
                  <div key={item.so} className="flex gap-4 rounded-xl border border-border p-4">
                    <div className="font-heading text-3xl font-bold text-text/10 shrink-0">{item.so}</div>
                    <div>
                      <div className="font-semibold text-text text-sm">{item.tieude}</div>
                      <div className="mt-1 text-xs text-text/60 leading-relaxed">{item.noidung}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-text/70">
                Muốn tìm hiểu thêm về <a href="/nguon-goc" className="text-mango underline underline-offset-4 hover:text-mango-dark">
                nguồn gốc và chứng nhận xoài Tứ Quý Bến Tre</a>, hoặc{" "}
                <a href="/xoai-tu-quy" className="text-mango underline underline-offset-4 hover:text-mango-dark">
                đặt mua xoài Tứ Quý tại vựa</a>.
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
              { label: "Mùa vụ 3 vụ/năm", href: "/kien-thuc/mua-vu-xoai-tu-quy-3-vu-nam" },
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
