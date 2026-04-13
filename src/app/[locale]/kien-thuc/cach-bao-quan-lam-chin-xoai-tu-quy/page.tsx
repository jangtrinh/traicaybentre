import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { ArticleLayout } from "@/components/article-layout";
import { VUA_XOAI_IMAGES } from "@/lib/vua-xoai-images";
import { getArticleJsonLd, getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

const PAGE_URL = `${SITE_URL}/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy`;

export const metadata: Metadata = {
  title: "Cách Bảo Quản Xoài Tứ Quý Bến Tre Tại Nhà — 7-14 Ngày Không Hỏng",
  description:
    "Cách bảo quản xoài Tứ Quý Bến Tre tại nhà 7-14 ngày không hỏng. 5 cách làm chín nhanh, 5 sai lầm cần tránh. Hướng dẫn từ vựa Thạnh Phú.",
  keywords: [
    "cách bảo quản xoài tứ quý bến tre",
    "cách bảo quản xoài tứ quý",
    "làm chín xoài nhanh",
    "xoài tứ quý để được bao lâu",
    "bảo quản xoài tủ lạnh",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Cách Bảo Quản & Làm Chín Xoài Tứ Quý Tại Nhà — Hướng Dẫn Đầy Đủ 2026",
    description:
      "Bảo quản 7-14 ngày, 5 cách làm chín nhanh, tránh 5 sai lầm thường gặp. Hướng dẫn từ vựa Thạnh Phú.",
    url: PAGE_URL,
    images: [
      {
        url: `${SITE_URL}${VUA_XOAI_IMAGES.xoaiCanCanh.src}`,
        width: VUA_XOAI_IMAGES.xoaiCanCanh.width,
        height: VUA_XOAI_IMAGES.xoaiCanCanh.height,
      },
    ],
  },
};

const articleJsonLd = getArticleJsonLd({
  title: "Cách Bảo Quản & Làm Chín Xoài Tứ Quý Tại Nhà — Hướng Dẫn Đầy Đủ 2026",
  description:
    "Hướng dẫn bảo quản xoài Tứ Quý tươi 7-14 ngày, 5 cách làm chín nhanh, tránh sai lầm thường gặp. Phù hợp tất cả vùng miền.",
  url: PAGE_URL,
  datePublished: "2026-04-09",
  dateModified: "2026-04-09",
  image: `${SITE_URL}${VUA_XOAI_IMAGES.xoaiCanCanh.src}`,
});

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Kiến thức", url: `${SITE_URL}/kien-thuc` },
  { name: "Cách bảo quản & làm chín xoài Tứ Quý", url: PAGE_URL },
]);

const RIPENING_STAGES = [
  {
    stage: "Xanh",
    days: "2–3 ngày từ vườn",
    color: "bg-green-100 border-green-300",
    dotColor: "bg-green-500",
    desc: "Vỏ xanh đều, cứng, vị neutral. Dùng làm gỏi, nấu ăn.",
  },
  {
    stage: "Già xanh",
    days: "4–5 ngày",
    color: "bg-yellow-50 border-yellow-200",
    dotColor: "bg-yellow-400",
    desc: "Vỏ vàng nhẹ 30–50%, hơi mềm cuống. Sẽ chín trong 1–2 ngày.",
  },
  {
    stage: "Chín",
    days: "6–8 ngày",
    color: "bg-orange-50 border-orange-200",
    dotColor: "bg-orange-400",
    desc: "Vỏ vàng 70–100%, mềm cuống, thơm ngọt. Ăn ngay tốt nhất.",
  },
  {
    stage: "Quá chín",
    days: "9+ ngày",
    color: "bg-red-50 border-red-200",
    dotColor: "bg-red-500",
    desc: "Vỏ vàng có vết nâu, mềm nhũn, mùi cồn. Bỏ.",
  },
];

const RIPENING_METHODS = [
  {
    num: "01",
    title: "Để cùng quả chuối chín",
    desc: "Chuối chín thải ra ethylene tự nhiên — khí này kích hoạt enzyme làm chín quả xung quanh. Đặt 1–2 quả chuối chín cạnh xoài, bọc lỏng bằng túi hoặc để chung trong hộp kín 1–2 ngày.",
    tip: "Cách nhanh nhất, hiệu quả nhất. Rút ngắn 1–2 ngày so với để tự nhiên.",
  },
  {
    num: "02",
    title: "Bọc giấy báo",
    desc: "Giấy báo giữ nhiệt và giúp tích tụ ethylene quanh quả. Bọc từng quả xoài bằng 2–3 lớp giấy báo, để ở nhiệt độ phòng 18–22°C.",
    tip: "Không bọc quá kín, cần một ít thoáng khí để tránh nấm mốc.",
  },
  {
    num: "03",
    title: "Túi giấy nâu kín",
    desc: "Phương pháp truyền thống phổ biến ở Mỹ và châu Âu. Cho xoài vào túi giấy nâu, gấp miệng túi lại, để 2–3 ngày ở nhiệt độ phòng.",
    tip: "Không dùng túi nhựa — tạo độ ẩm cao gây mốc.",
  },
  {
    num: "04",
    title: "Để trong thùng gạo",
    desc: "Gạo hấp thụ độ ẩm dư thừa và tạo môi trường ấm ổn định quanh quả. Chôn xoài trong thùng gạo 1–2 ngày.",
    tip: "Phương pháp truyền thống miền Nam Việt Nam — đặc biệt hiệu quả cho xoài già xanh.",
  },
  {
    num: "05",
    title: "Phơi nắng nhẹ buổi sáng",
    desc: "Đặt xoài ở nơi có nắng nhẹ (không trực tiếp quá mạnh) trong buổi sáng 2–3 giờ. Nhiệt độ tăng nhẹ kích thích quá trình chín.",
    tip: "Chỉ phơi buổi sáng 8–10h. Tránh nắng trưa gay gắt gây chín không đều, đốm vỏ.",
  },
];

const COMMON_MISTAKES = [
  {
    mistake: "Chín quá nhanh (2–3 ngày)",
    cause: "Để nhiệt độ trên 24°C",
    fix: "Phòng 18–22°C, tránh nắng trực tiếp",
  },
  {
    mistake: "Không chín (10+ ngày)",
    cause: "Để dưới 12°C lâu",
    fix: "Chuyển ra 22–24°C, để gần chuối chín",
  },
  {
    mistake: "Đốm nâu trong/ngoài vỏ",
    cause: "Lạnh < 8°C khi vận chuyển (cold damage)",
    fix: "Bảo quản đúng nhiệt độ, không để ngăn đá",
  },
  {
    mistake: "Mềm/mốc chỗ tiếp xúc",
    cause: "Độ ẩm cao kết hợp dập vỏ",
    fix: "Để khô, thoáng, không xếp chồng quá 6 lớp",
  },
  {
    mistake: "Vị đắng khi chín",
    cause: "Hái quả quá non (non mature)",
    fix: "Mua từ vựa uy tín, chỉ chọn mature green",
  },
];

export default async function BaoQuanLamChinXoaiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ArticleLayout
      category="Kiến thức — Bảo quản & chế biến"
      title="Cách Bảo Quản & Làm Chín Xoài Tứ Quý Tại Nhà — Hướng Dẫn Đầy Đủ"
      subtitle="Từ khi nhận hàng đến khi ăn — mọi thứ bạn cần biết để xoài Tứ Quý đạt độ ngon tuyệt nhất."
      publishDate="09/04/2026"
      heroImage={{
        src: VUA_XOAI_IMAGES.xoaiCanCanh.src,
        alt: VUA_XOAI_IMAGES.xoaiCanCanh.alt,
      }}
      jsonLd={[articleJsonLd, breadcrumbJsonLd]}
    >
      {/* Intro */}
      <p>
        Bạn vừa nhận một thùng{" "}
        <a href="/xoai-tu-quy">xoài Tứ Quý Bến Tre</a> từ vựa Thạnh Phú — xoài
        còn xanh, chắc tay, đóng gói kỹ. Câu hỏi đầu tiên xuất hiện: bảo quản
        thế nào để xoài chín đúng độ, không hư, không mất vị?
      </p>
      <p>
        Bài viết này tổng hợp toàn bộ kiến thức từ vựa — từ cách đọc giai đoạn
        chín, bảo quản đúng nhiệt độ, 5 cách làm chín nhanh tại nhà, đến những
        sai lầm phổ biến nhất khiến xoài hư trước khi ăn được.
      </p>

      {/* H2: Giai đoạn chín */}
      <h2>Xoài Tứ Quý có những giai đoạn chín nào?</h2>
      <p>
        Xoài Tứ Quý thường được thu hoạch ở trạng thái <strong>mature green</strong>{" "}
        (già xanh) để chịu được vận chuyển đường dài. Hiểu 4 giai đoạn chín giúp
        bạn biết chính xác xoài đang ở đâu và cần làm gì tiếp theo.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border">
        {RIPENING_STAGES.map((s, i) => (
          <div
            key={s.stage}
            className={`flex items-start gap-4 px-5 py-4 ${
              i < RIPENING_STAGES.length - 1 ? "border-b border-border" : ""
            } ${s.color}`}
          >
            <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${s.dotColor}`} />
            <div>
              <div className="font-semibold text-text">
                {s.stage}{" "}
                <span className="font-normal text-text/50">— {s.days}</span>
              </div>
              <div className="mt-1 text-sm text-text/70">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <p>
        Thùng hàng từ vựa Thạnh Phú thường xuất trong 24 giờ đầu sau thu hoạch
        — nghĩa là xoài bạn nhận sẽ ở giai đoạn <strong>xanh đến già xanh</strong>{" "}
        tùy tuyến ship. Điều này là cố ý để xoài không dập trong quá trình vận
        chuyển và chín đúng khi đến tay bạn.
      </p>

      {/* Inline image: showcase */}
      <div className="my-8 overflow-hidden rounded-2xl">
        <Image
          src={VUA_XOAI_IMAGES.xoaiVipTayCam1.src}
          alt={VUA_XOAI_IMAGES.xoaiVipTayCam1.alt}
          width={VUA_XOAI_IMAGES.xoaiVipTayCam1.width}
          height={VUA_XOAI_IMAGES.xoaiVipTayCam1.height}
          className="w-full object-cover"
          sizes="(max-width: 760px) 100vw, 760px"
        />
        <p className="mt-2 text-center text-xs text-text/40">
          Xoài Tứ Quý VIP cân nặng 600–800g — quả đạt tiêu chuẩn khi vỏ căng, da bóng
        </p>
      </div>

      {/* H2: Bảo quản */}
      <h2>Cách bảo quản xoài Tứ Quý tươi lâu</h2>
      <p>
        Nhiệt độ là yếu tố quan trọng nhất. Xoài Tứ Quý thuộc nhóm trái nhiệt đới
        nhạy cảm với lạnh — bảo quản sai nhiệt độ là nguyên nhân số 1 gây hư hỏng.
      </p>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <div className="font-heading text-lg font-bold text-text">
            Nhiệt độ phòng (18–22°C)
          </div>
          <div className="mt-2 text-sm text-text/70">
            Bảo quản được <strong>5–7 ngày</strong> kể từ khi nhận hàng. Để chín
            tự nhiên, không cần can thiệp thêm. Tốt nhất cho xoài sẽ ăn trong
            tuần.
          </div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="font-heading text-lg font-bold text-text">
            Tủ lạnh ngăn mát (4–6°C)
          </div>
          <div className="mt-2 text-sm text-text/70">
            Bảo quản được <strong>7–14 ngày</strong>. Làm chậm quá trình chín
            đáng kể. Chỉ nên để xoài đã chín hoặc già xanh vào tủ — không để
            xoài xanh hoàn toàn.
          </div>
        </div>
      </div>

      <div className="my-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-text/75">
        <strong className="text-red-700">Lưu ý quan trọng:</strong>
        <ul className="mt-2 space-y-1 pl-4">
          <li>
            Tránh nhiệt độ dưới 8°C liên tục (ngăn đá, tủ lạnh để mức lạnh
            cao) — gây <strong>cold damage</strong>: đốm nâu xuất hiện cả trong
            lẫn ngoài thịt quả.
          </li>
          <li>
            Tránh xếp chồng quá 6 lớp — áp lực cơ học gây dập vỏ, tạo điểm
            mốc sau 2–3 ngày.
          </li>
          <li>
            Không để trong túi nhựa kín — độ ẩm tích tụ đẩy nhanh nấm mốc.
          </li>
        </ul>
      </div>

      {/* Inline image: vận chuyển */}
      <div className="my-8 overflow-hidden rounded-2xl">
        <Image
          src={VUA_XOAI_IMAGES.thungXopDucLo.src}
          alt={VUA_XOAI_IMAGES.thungXopDucLo.alt}
          width={VUA_XOAI_IMAGES.thungXopDucLo.width}
          height={VUA_XOAI_IMAGES.thungXopDucLo.height}
          className="w-full object-cover"
          sizes="(max-width: 760px) 100vw, 760px"
        />
        <p className="mt-2 text-center text-xs text-text/40">
          Thùng xốp đục lỗ thông khí — chuẩn đóng gói của vựa Thạnh Phú để
          xoài thở trong quá trình ship
        </p>
      </div>

      {/* H2: 5 cách làm chín */}
      <h2>5 cách làm chín xoài Tứ Quý nhanh tại nhà</h2>
      <p>
        Nếu bạn cần xoài chín sớm hơn tự nhiên — cho tiệc, cho đơn đặt hàng, hay
        đơn giản là thèm ăn ngay — đây là 5 phương pháp đã được kiểm chứng, từ
        nhanh nhất đến truyền thống nhất.
      </p>

      <div className="my-6 space-y-4">
        {RIPENING_METHODS.map((m) => (
          <div
            key={m.num}
            className="rounded-2xl border border-border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <span className="font-heading text-3xl font-bold text-mango/30 leading-none">
                {m.num}
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold text-text">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-text/70">{m.desc}</p>
                <p className="mt-2 rounded-lg bg-brand/40 px-3 py-2 text-xs text-text/60">
                  <strong>Tip:</strong> {m.tip}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* H2: 5 sai lầm */}
      <h2>5 sai lầm khiến xoài hư nhanh</h2>
      <p>
        Qua hàng nghìn đơn hàng giao đi khắp cả nước, vựa Thạnh Phú ghi nhận 5
        sai lầm phổ biến nhất khiến xoài hư trước khi ăn được. Nhận biết sớm
        giúp bạn tránh lãng phí.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border">
        <div className="grid grid-cols-3 bg-text/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-text/50">
          <span>Hiện tượng</span>
          <span>Nguyên nhân</span>
          <span>Cách khắc phục</span>
        </div>
        {COMMON_MISTAKES.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 gap-2 px-4 py-4 text-sm ${
              i < COMMON_MISTAKES.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="font-medium text-text">{row.mistake}</span>
            <span className="text-text/60">{row.cause}</span>
            <span className="text-text/70">{row.fix}</span>
          </div>
        ))}
      </div>

      {/* H2: Nhận biết xoài thật */}
      <h2>Cách nhận biết xoài Tứ Quý thật và đã chín đúng độ</h2>
      <p>
        Xoài Tứ Quý Bến Tre có profile vị giác và cảm quan riêng biệt — một khi
        đã ăn thật sẽ nhận ra ngay khi gặp lại. Đây là những dấu hiệu xác nhận
        bạn đang có xoài đúng nguồn gốc, chín đúng độ:
      </p>

      <ul>
        <li>
          <strong>Vị:</strong> Ngọt đậm kèm vị mặn nhẹ cuối lưỡi — đặc trưng
          terroir đất giồng cát nhiễm mặn Bến Tre. Không có ở xoài Tứ Quý trồng
          vùng khác.
        </li>
        <li>
          <strong>Mùi:</strong> Thơm hắc đặc trưng khi chín đúng độ, không phải
          mùi ngọt gắt như xoài chín ép bằng đất đèn.
        </li>
        <li>
          <strong>Cấu trúc thịt:</strong> Vàng cam, ít xơ, hột nhỏ và lép —
          tỷ lệ thịt/quả cao hơn hầu hết các giống khác.
        </li>
        <li>
          <strong>Vỏ khi chín:</strong> Vàng đều từ 70–100%, còn độ đàn hồi nhẹ
          khi nhấn cuống — không mềm nhũn, không còn xanh mảng lớn.
        </li>
        <li>
          <strong>Kích thước:</strong> Quả VIP đạt 600–800g, cân nặng tay, da
          căng bóng. Xem đầy đủ tại{" "}
          <a href="/xoai-tu-quy">trang sản phẩm xoài Tứ Quý</a>.
        </li>
      </ul>

      {/* H2: Xanh vs chín */}
      <h2>Khi nào nên ăn xoài Tứ Quý xanh, khi nào ăn chín?</h2>
      <p>
        Xoài Tứ Quý là một trong số ít giống xoài ngon ở cả hai trạng thái — xanh
        và chín đều có công dụng và hương vị riêng. Việc chọn trạng thái phụ thuộc
        vào mục đích sử dụng và khẩu vị vùng miền.
      </p>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-green-200 p-5">
          <div className="font-heading text-lg font-bold text-green-700">Xoài xanh</div>
          <p className="mt-2 text-sm text-text/70">
            Giòn sần sật, chua thanh — lý tưởng cho <strong>gỏi xoài</strong>,
            xoài lắc muối tôm, xoài dầm, trộn salad. Phổ biến hơn ở miền Nam và
            miền Trung.
          </p>
          <div className="mt-3 rounded-lg bg-green-50 p-3 text-xs text-green-700">
            Hái ở giai đoạn mature green (xanh già) — vỏ xanh bóng, gõ tiếng đặc.
          </div>
        </div>
        <div className="rounded-2xl border-2 border-orange-200 p-5">
          <div className="font-heading text-lg font-bold text-orange-600">Xoài chín</div>
          <p className="mt-2 text-sm text-text/70">
            Ngọt đậm, mềm mịn, thơm hắc — ăn tươi trực tiếp, làm{" "}
            <strong>sinh tố xoài</strong>, mứt, chè xoài nước cốt dừa. Phổ biến
            hơn ở miền Bắc.
          </p>
          <div className="mt-3 rounded-lg bg-orange-50 p-3 text-xs text-orange-700">
            Chín ở giai đoạn 6–8 ngày — vỏ vàng 70–100%, mùi thơm.
          </div>
        </div>
      </div>

      <p>
        Nếu mua lần đầu mà chưa biết sở thích, hãy để một nửa chín (ăn tươi),
        giữ một nửa xanh (làm gỏi) — bạn sẽ hiểu rõ hơn về xoài Tứ Quý sau
        trải nghiệm đó. Xem giá xoài xanh và chín tại{" "}
        <a href="/xoai-tu-quy#gia">bảng giá xoài hôm nay</a>.
      </p>

      {/* H2: Bảo quản lâu dài */}
      <h2>Bảo quản xoài Tứ Quý lâu hơn — đông lạnh, sấy & mứt</h2>
      <p>
        Khi mua số lượng lớn (sỉ theo thùng 20kg) hoặc nhân lúc xoài vào vụ giá
        tốt, các phương pháp chế biến và bảo quản dài hạn giúp bạn dùng được
        nhiều tháng mà không lãng phí.
      </p>

      <div className="my-6 space-y-4">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h3>Đông lạnh — 6 tháng</h3>
          <p className="text-sm text-text/70">
            Lột vỏ, cắt miếng vừa (hoặc xay nhuyễn), cho vào túi zip hoặc hộp
            kín, đông ở –18°C. Dùng làm sinh tố, kem xoài, smoothie bowl. Không
            nên rã đông ăn tươi — kết cấu thịt sẽ mềm nhũn.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h3>Sấy khô — 3 tháng</h3>
          <p className="text-sm text-text/70">
            Cắt lát mỏng 5–7mm, sấy ở 60°C trong 8–12 giờ (dùng máy sấy thực
            phẩm hoặc lò nướng để cửa hé). Độ ẩm còn dưới 15% là đạt. Bảo quản
            trong hũ thủy tinh kín — snack ngon, không cần tủ lạnh.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h3>Mứt xoài — 6 tháng</h3>
          <p className="text-sm text-text/70">
            Xoài chín 1kg + đường 700g + nước cốt 1 quả chanh. Nấu lửa vừa
            khuấy đều đến khi đặc sệt, đóng nóng vào hũ thủy tinh tiệt trùng,
            đậy nắp ngay. Bảo quản ngăn mát 6 tháng. Dùng kèm bánh mì, phết
            toast, pha nước uống.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="my-8 rounded-2xl bg-text p-6 text-center text-white">
        <p className="font-heading text-lg font-bold">
          Cần mua xoài Tứ Quý nguyên thùng?
        </p>
        <p className="mt-2 text-sm text-white/70">
          Vựa Thạnh Phú giao toàn quốc, đóng gói chống dập, xuất hóa đơn VAT.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href="/xoai-tu-quy"
            className="rounded-full bg-white px-6 py-3 text-sm font-bold text-text hover:bg-mango hover:text-white transition-colors"
          >
            Xem sản phẩm
          </a>
          <a
            href="/nguon-goc"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white hover:border-white transition-colors"
          >
            Nguồn gốc & CDĐL
          </a>
        </div>
      </div>
    </ArticleLayout>
  );
}
