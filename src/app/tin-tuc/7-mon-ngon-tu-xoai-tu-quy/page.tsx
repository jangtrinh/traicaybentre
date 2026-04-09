import type { Metadata } from "next";
import Image from "next/image";
import { ArticleLayout } from "@/components/article-layout";
import { VUA_XOAI_IMAGES } from "@/lib/vua-xoai-images";
import { getArticleJsonLd, getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

const PAGE_URL = `${SITE_URL}/tin-tuc/7-mon-ngon-tu-xoai-tu-quy`;

export const metadata: Metadata = {
  title: "7 Món Ngon Từ Xoài Tứ Quý — Gỏi, Sinh Tố, Mứt, Xoài Lắc | Bến Tre",
  description:
    "7 cách chế biến xoài Tứ Quý: gỏi, sinh tố, mứt, xoài lắc, xoài dầm, chè dừa, chutney. Công thức chi tiết từ vựa Thạnh Phú.",
  keywords: [
    "món ngon từ xoài tứ quý",
    "gỏi xoài",
    "sinh tố xoài",
    "mứt xoài",
    "xoài lắc",
    "công thức xoài tứ quý",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "7 Món Ngon Từ Xoài Tứ Quý — Gỏi, Sinh Tố, Mứt, Xoài Lắc | Bến Tre",
    description:
      "7 cách chế biến xoài Tứ Quý: gỏi, sinh tố, mứt, xoài lắc, xoài dầm, chè dừa, chutney. Công thức chi tiết từ vựa Thạnh Phú.",
    url: PAGE_URL,
    images: [
      {
        url: `${SITE_URL}${VUA_XOAI_IMAGES.xoaiCoCuongLa.src}`,
        width: VUA_XOAI_IMAGES.xoaiCoCuongLa.width,
        height: VUA_XOAI_IMAGES.xoaiCoCuongLa.height,
      },
    ],
  },
};

const articleJsonLd = getArticleJsonLd({
  title: "7 Món Ngon Từ Xoài Tứ Quý — Gỏi, Sinh Tố, Mứt, Xoài Lắc & Hơn Nữa",
  description:
    "7 cách chế biến xoài Tứ Quý: gỏi, sinh tố, mứt, xoài lắc, xoài dầm, chè dừa, chutney. Công thức chi tiết từ vựa Thạnh Phú.",
  url: PAGE_URL,
  datePublished: "2026-04-09",
  dateModified: "2026-04-09",
  image: `${SITE_URL}${VUA_XOAI_IMAGES.xoaiCoCuongLa.src}`,
});

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Tin tức", url: `${SITE_URL}/tin-tuc` },
  { name: "7 món ngon từ xoài Tứ Quý", url: PAGE_URL },
]);

export default function MonNgonTuXoaiPage() {
  return (
    <ArticleLayout
      category="Tin tức — Ẩm thực & công thức"
      title="7 Món Ngon Từ Xoài Tứ Quý — Gỏi, Sinh Tố, Mứt, Xoài Lắc & Hơn Nữa"
      subtitle="Xoài Tứ Quý đặc biệt vì có cả hai trạng thái xanh và chín quanh năm — đây là 7 món phổ biến nhất từ vựa Thạnh Phú, Bến Tre."
      publishDate="09/04/2026"
      heroImage={{
        src: VUA_XOAI_IMAGES.xoaiCoCuongLa.src,
        alt: VUA_XOAI_IMAGES.xoaiCoCuongLa.alt,
      }}
      jsonLd={[articleJsonLd, breadcrumbJsonLd]}
    >
      {/* Intro */}
      <p>
        Không nhiều giống xoài có thể vừa làm món khai vị giòn chua, vừa làm
        tráng miệng ngọt béo — nhưng{" "}
        <a href="/xoai-tu-quy">xoài Tứ Quý Bến Tre</a> làm được cả hai nhờ đặc
        tính cho trái quanh năm ở đủ mọi độ chín. Xoài xanh giòn sần sật cho
        gỏi và xoài lắc. Xoài chín ngọt mặn đặc trưng cho sinh tố, mứt, chè dừa.
      </p>
      <p>
        Dưới đây là 7 món ngon được làm phổ biến nhất từ nguồn xoài Tứ Quý vựa
        Thạnh Phú — kèm công thức chi tiết, mẹo chọn nguyên liệu, và ước tính
        chi phí thực tế.
      </p>

      {/* H2: Món 1 — Gỏi xoài */}
      <h2>1. Gỏi xoài Tứ Quý — Món khai vị truyền thống</h2>
      <p>
        Gỏi xoài là món xuất hiện trên bàn nhậu miền Nam từ hàng chục năm nay.
        Với xoài Tứ Quý, vị chua thanh tự nhiên và độ giòn đặc trưng cho ra
        đĩa gỏi cân vị hơn bất kỳ giống xoài nào khác.
      </p>

      <div className="my-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
        <h3>Nguyên liệu (4 người)</h3>
        <ul>
          <li>Xoài Tứ Quý xanh: 400g (khoảng 1 quả loại 1)</li>
          <li>Tôm tươi hoặc mực: 200g (tùy chọn — có thể làm chay)</li>
          <li>Nước mắm ngon: 3 muỗng canh</li>
          <li>Chanh tươi: 2 quả, vắt lấy nước</li>
          <li>Ớt: 2–3 trái tùy độ cay</li>
          <li>Đậu phộng rang: 50g, giã thô</li>
          <li>Rau thơm: húng quế, ngò rí, hành phi</li>
          <li>Đường: 1 muỗng canh</li>
        </ul>

        <h3>Cách làm</h3>
        <ol className="list-decimal space-y-2 pl-6 text-text/75">
          <li>
            Gọt vỏ xoài, bào hoặc cắt sợi dài. Ngâm nước muối loãng 5 phút,
            vớt ra để ráo — giữ độ giòn và bớt nhựa.
          </li>
          <li>
            Pha nước trộn: nước mắm + nước chanh + đường + ớt băm. Nếm thử —
            vị chua ngọt mặn cân bằng là đạt.
          </li>
          <li>
            Luộc tôm hoặc mực chín, để nguội, cắt miếng vừa ăn.
          </li>
          <li>
            Trộn xoài + tôm/mực + nước trộn. Để 5 phút cho ngấm.
          </li>
          <li>
            Bày ra đĩa, rắc đậu phộng và rau thơm lên trên. Ăn ngay khi còn giòn.
          </li>
        </ol>

        <div className="mt-4 rounded-lg bg-brand/40 p-3 text-xs text-text/60">
          <strong>Tip:</strong> Chọn xoài xanh giòn nhất là xoài ở vụ 2 hoặc vụ 3
          — thịt chắc, chua thanh vừa phải. Chi phí xoài nguyên liệu khoảng 15.000đ,
          nhà hàng bán 45.000–65.000đ/đĩa.
        </div>
      </div>

      {/* H2: Món 2 — Sinh tố */}
      <h2>2. Sinh tố xoài Tứ Quý — Đặc sản mùa hè</h2>
      <p>
        Sinh tố xoài Tứ Quý không cần thêm đường vẫn đủ ngọt nhờ vị ngọt đậm
        tự nhiên của quả chín. Vị mặn nhẹ cuối lưỡi tạo chiều sâu hương vị mà
        các giống xoài khác không có được.
      </p>

      <div className="my-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
        <h3>Nguyên liệu (2 ly)</h3>
        <ul>
          <li>Xoài Tứ Quý chín: 200g (gọt vỏ, bỏ hạt)</li>
          <li>Sữa đặc có đường: 2–3 muỗng canh (tùy độ ngọt)</li>
          <li>Đá viên: 1 nắm</li>
          <li>Sữa tươi không đường: 100ml (tùy chọn để loãng hơn)</li>
        </ul>

        <h3>Cách làm</h3>
        <ol className="list-decimal space-y-2 pl-6 text-text/75">
          <li>Xoài cắt miếng, cho vào máy xay cùng sữa đặc và đá.</li>
          <li>Xay 30–40 giây đến khi mịn hoàn toàn.</li>
          <li>Nếm thử — nếu muốn loãng hơn, thêm sữa tươi và xay thêm 10 giây.</li>
          <li>Rót ra ly, dùng ngay khi còn lạnh.</li>
        </ol>

        <div className="mt-4 rounded-lg bg-brand/40 p-3 text-xs text-text/60">
          <strong>Tip:</strong> Dùng xoài chín vụ 1 (tháng 4) — ngọt nhất trong
          năm, màu vàng cam rực. Có thể đông lạnh xoài trước khi xay để không
          cần thêm đá, sinh tố đặc sánh hơn.
        </div>
      </div>

      {/* H2: Món 3 — Mứt xoài */}
      <h2>3. Mứt xoài Tứ Quý — Từ vựa ra hũ</h2>
      <p>
        Mứt xoài Tứ Quý đặc biệt nhờ vị mặn nhẹ tự nhiên trong thịt quả — không
        cần thêm muối mà hương vị vẫn cân bằng hơn mứt xoài thông thường. Phù
        hợp tặng quà, kinh doanh nhỏ, hoặc tích trữ mùa nghịch.
      </p>

      <div className="my-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
        <h3>Nguyên liệu (10–12 hũ nhỏ 200ml)</h3>
        <ul>
          <li>Xoài Tứ Quý chín: 1kg (gọt vỏ, bỏ hạt)</li>
          <li>Đường cát trắng: 700g</li>
          <li>Chanh: 1 quả, vắt nước</li>
        </ul>

        <h3>Cách làm</h3>
        <ol className="list-decimal space-y-2 pl-6 text-text/75">
          <li>Xoài xay nhuyễn hoặc cắt hạt lựu nhỏ (tùy muốn mứt mịn hay có miếng).</li>
          <li>
            Trộn xoài + đường + nước chanh trong nồi, để 30 phút cho đường
            tan và xoài ra nước.
          </li>
          <li>Nấu lửa vừa, khuấy liên tục. Khi sôi hạ lửa nhỏ.</li>
          <li>
            Tiếp tục nấu 25–35 phút đến khi mứt đặc sệt, màu vàng cam rực.
            Thử bằng cách nhỏ vài giọt lên đĩa lạnh — nếu không chảy là đạt.
          </li>
          <li>
            Đóng nóng vào hũ thủy tinh đã tiệt trùng, đậy nắp ngay, lật ngược
            hũ 5 phút để tạo chân không.
          </li>
        </ol>

        <div className="mt-4 rounded-lg bg-brand/40 p-3 text-xs text-text/60">
          <strong>Bảo quản:</strong> 6 tháng trong hũ kín, ngăn mát tủ lạnh sau
          khi mở.{" "}
          <strong>Lợi nhuận tham khảo:</strong> 10kg xoài (chi phí ~160.000đ) cho
          ra 10–15 hũ × 40.000đ = doanh thu 400.000–600.000đ. Phù hợp kinh doanh
          nhỏ tại nhà.
        </div>
      </div>

      {/* Inline image: showcase quả lớn */}
      <div className="my-8 overflow-hidden rounded-2xl">
        <Image
          src={VUA_XOAI_IMAGES.xoaiVipTayCam2.src}
          alt={VUA_XOAI_IMAGES.xoaiVipTayCam2.alt}
          width={VUA_XOAI_IMAGES.xoaiVipTayCam2.width}
          height={VUA_XOAI_IMAGES.xoaiVipTayCam2.height}
          className="w-full object-cover"
          sizes="(max-width: 760px) 100vw, 760px"
        />
        <p className="mt-2 text-center text-xs text-text/40">
          Xoài Tứ Quý VIP — quả to 600–800g, thịt nhiều, hột nhỏ, tỷ lệ
          nguyên liệu sử dụng cao
        </p>
      </div>

      {/* H2: Món 4 — Xoài lắc */}
      <h2>4. Xoài lắc Tứ Quý — Snack đường phố không thể thiếu</h2>
      <p>
        Xoài lắc là món snack phổ biến nhất từ xoài Tứ Quý xanh — được bán
        rộng rãi từ xe đẩy vỉa hè đến chuỗi trà sữa. Vị mặn ngọt cay đặc trưng
        khiến ăn mãi không ngán.
      </p>

      <div className="my-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
        <h3>Nguyên liệu (2–3 phần)</h3>
        <ul>
          <li>Xoài Tứ Quý xanh: 2 quả loại 1 (~500g sau gọt)</li>
          <li>Muối tôm: 2 muỗng canh (loại đặc sản Tây Ninh hoặc tự pha)</li>
          <li>Đường: 1 muỗng canh</li>
          <li>Ớt bột: ½ muỗng cà phê (tùy độ cay)</li>
          <li>Chanh: 1 quả, vắt nước</li>
        </ul>

        <h3>Cách làm</h3>
        <ol className="list-decimal space-y-2 pl-6 text-text/75">
          <li>Gọt vỏ xoài, cắt miếng dọc dày 1–1,5cm.</li>
          <li>
            Cho xoài vào túi zip hoặc hộp nhựa có nắp. Thêm muối tôm, đường,
            ớt bột, nước chanh.
          </li>
          <li>Lắc mạnh 30 giây đến khi gia vị phủ đều tất cả miếng xoài.</li>
          <li>Để lạnh 10–15 phút cho ngấm gia vị trước khi ăn.</li>
        </ol>

        <div className="mt-4 rounded-lg bg-brand/40 p-3 text-xs text-text/60">
          <strong>Tip:</strong> Xoài Tứ Quý xanh có lợi thế tự nhiên khi làm
          xoài lắc — vị mặn nhẹ trong thịt quả cộng hưởng với muối tôm tạo độ
          sâu vị mà xoài vùng khác không có. Ăn lạnh ngon hơn.
        </div>
      </div>

      {/* H2: Món 5 — Xoài dầm */}
      <h2>5. Xoài dầm Tứ Quý — Tráng miệng giải nhiệt mùa hè</h2>
      <p>
        Xoài dầm là biến tấu tráng miệng nhẹ nhàng, phù hợp thời tiết nóng.
        Vị ngọt thanh của xoài chín kết hợp nước cốt dừa béo mịn và đá bào
        là combo không thể chối từ.
      </p>

      <div className="my-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
        <h3>Nguyên liệu (4 phần)</h3>
        <ul>
          <li>Xoài Tứ Quý chín: 2 quả (cắt miếng vừa)</li>
          <li>Nước đường nhạt: 200ml (đun 100g đường + 200ml nước)</li>
          <li>Nước cốt dừa: 100ml</li>
          <li>Đá bào hoặc đá viên xay nhỏ: 4 phần</li>
          <li>Muối: 1 nhúm nhỏ cho nước cốt dừa</li>
        </ul>

        <h3>Cách làm</h3>
        <ol className="list-decimal space-y-2 pl-6 text-text/75">
          <li>Đun nước đường để nguội hoàn toàn.</li>
          <li>Nước cốt dừa + muối nhỏ, khuấy đều.</li>
          <li>
            Xếp đá bào vào ly/bát. Đặt miếng xoài lên trên. Rưới nước đường và
            nước cốt dừa.
          </li>
          <li>Dùng ngay khi đá chưa tan hết để giữ độ lạnh mát.</li>
        </ol>

        <div className="mt-4 rounded-lg bg-brand/40 p-3 text-xs text-text/60">
          <strong>Biến tấu:</strong> Thêm thạch dừa, hạt lựu, hoặc trân châu
          trắng cho phong phú. Phù hợp kinh doanh quán nhỏ mùa hè.
        </div>
      </div>

      {/* Inline image: phân loại */}
      <div className="my-8 overflow-hidden rounded-2xl">
        <Image
          src={VUA_XOAI_IMAGES.vuaPhanLoaiDaMau.src}
          alt={VUA_XOAI_IMAGES.vuaPhanLoaiDaMau.alt}
          width={VUA_XOAI_IMAGES.vuaPhanLoaiDaMau.width}
          height={VUA_XOAI_IMAGES.vuaPhanLoaiDaMau.height}
          className="w-full object-cover"
          sizes="(max-width: 760px) 100vw, 760px"
        />
        <p className="mt-2 text-center text-xs text-text/40">
          Vựa Thạnh Phú phân loại xoài VIP, Loại 1, Loại 2 — mỗi hạng phù hợp
          cho mục đích chế biến khác nhau
        </p>
      </div>

      {/* H2: Món 6 — Chè xoài nước cốt dừa */}
      <h2>6. Chè xoài nước cốt dừa — Đặc sản Bến Tre</h2>
      <p>
        Đây là món chè mang hồn ẩm thực miền Tây — béo ngậy từ nước cốt dừa
        Bến Tre, ngọt sánh từ xoài Tứ Quý chín, thêm chút dai từ bột báng.
        Một ly chè đủ để nhớ mãi vùng đất này.
      </p>

      <div className="my-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
        <h3>Nguyên liệu (4–6 phần)</h3>
        <ul>
          <li>Xoài Tứ Quý chín: 2 quả lớn (xay nhuyễn hoặc cắt hạt lựu)</li>
          <li>Nước cốt dừa tươi: 400ml</li>
          <li>Bột báng (tapioca pearls nhỏ): 80g, ngâm nở</li>
          <li>Đường: 150g</li>
          <li>Muối: ½ muỗng cà phê</li>
          <li>Đá: tùy chọn (uống lạnh hoặc ấm đều ngon)</li>
        </ul>

        <h3>Cách làm</h3>
        <ol className="list-decimal space-y-2 pl-6 text-text/75">
          <li>Luộc bột báng đã ngâm đến khi trong suốt hoàn toàn (~15 phút), vớt xả nước lạnh.</li>
          <li>
            Nấu nước cốt dừa + đường + muối ở lửa vừa, khuấy đến khi đường
            tan. Không để sôi mạnh — nước cốt dừa sẽ bị tách.
          </li>
          <li>Tắt bếp, để nguội bớt ~5 phút.</li>
          <li>Cho bột báng + xoài vào hỗn hợp nước cốt dừa, trộn nhẹ.</li>
          <li>Múc ra ly, thêm đá nếu muốn uống lạnh.</li>
        </ol>

        <div className="mt-4 rounded-lg bg-brand/40 p-3 text-xs text-text/60">
          <strong>Tip:</strong> Dùng nước cốt dừa Bến Tre tươi nếu có — béo thơm
          tự nhiên, không cần thêm đường nhiều. Chè ngon nhất khi dùng xoài chín
          vừa, không quá nát.
        </div>
      </div>

      {/* H2: Món 7 — Chutney */}
      <h2>7. Tương cà xoài (Mango chutney) — Xoài Tứ Quý kiểu Ấn Độ</h2>
      <p>
        Mango chutney là gia vị nổi tiếng thế giới, và xoài Tứ Quý với vị mặn
        nhẹ tự nhiên cho ra phiên bản chutney cân vị hơn bất kỳ giống xoài nào
        khác. Dùng kèm thịt nướng, bánh mì, cơm tấm hoặc làm nước chấm đặc biệt.
      </p>

      <div className="my-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
        <h3>Nguyên liệu (2 hũ 250ml)</h3>
        <ul>
          <li>Xoài Tứ Quý (nửa chín nửa xanh): 600g, cắt hạt lựu</li>
          <li>Đường nâu: 150g</li>
          <li>Giấm trắng hoặc giấm táo: 100ml</li>
          <li>Hành tây: 1 củ nhỏ, băm nhỏ</li>
          <li>Tỏi: 3 tép, băm</li>
          <li>Gừng tươi: 1 miếng 2cm, bào nhỏ</li>
          <li>Hồi: 2 cánh</li>
          <li>Đinh hương: 3 nụ</li>
          <li>Ớt đỏ: 1 quả, băm nhỏ (tùy độ cay)</li>
          <li>Muối: ½ muỗng cà phê</li>
        </ul>

        <h3>Cách làm</h3>
        <ol className="list-decimal space-y-2 pl-6 text-text/75">
          <li>
            Phi thơm hành tỏi gừng với dầu ăn. Thêm hồi và đinh hương, đảo
            2 phút cho ra mùi.
          </li>
          <li>Cho xoài + ớt + đường nâu + giấm vào nồi, khuấy đều.</li>
          <li>
            Nấu lửa vừa 25–30 phút, khuấy thường xuyên đến khi hỗn hợp sệt
            lại và xoài mềm.
          </li>
          <li>Nêm muối, nếm thử — vị chua ngọt mặn cân bằng là đạt.</li>
          <li>
            Vớt bỏ hồi và đinh hương. Đóng nóng vào hũ thủy tinh tiệt trùng.
          </li>
        </ol>

        <div className="mt-4 rounded-lg bg-brand/40 p-3 text-xs text-text/60">
          <strong>Bảo quản:</strong> 3–4 tháng trong tủ lạnh.{" "}
          <strong>Dùng với:</strong> Thịt nướng, cá hồi áp chảo, cơm tấm, bánh
          mì sandwich — thay thế hoàn toàn tương cà công nghiệp.
        </div>
      </div>

      {/* H2: Tại sao xoài Tứ Quý đặc biệt */}
      <h2>Tại sao xoài Tứ Quý đặc biệt cho các món ăn?</h2>
      <p>
        Không phải ngẫu nhiên mà các đầu bếp và người nội trợ miền Nam đặc biệt
        ưa chuộng xoài Tứ Quý cho chế biến. Có 4 lý do kỹ thuật:
      </p>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        {[
          {
            title: "Vị mặn nhẹ tự nhiên",
            desc: "Từ terroir đất giồng cát nhiễm mặn Bến Tre — không cần thêm muối nhiều, cân vị tự nhiên cho cả món mặn lẫn ngọt.",
          },
          {
            title: "Cả hai trạng thái quanh năm",
            desc: "Xoài xanh và chín đều có sẵn quanh năm nhờ đặc tính cho trái 3 vụ — chủ động nguyên liệu không lo mùa vụ.",
          },
          {
            title: "Hột nhỏ, thịt nhiều",
            desc: "Tỷ lệ thịt/quả cao hơn hầu hết giống xoài — ít lãng phí, tiết kiệm chi phí khi mua theo kg.",
          },
          {
            title: "Trái lớn 600–800g",
            desc: "Một quả VIP đủ làm 2–3 phần gỏi hoặc 2 ly sinh tố — giảm thời gian sơ chế so với dùng nhiều quả nhỏ.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-white p-5 shadow-sm"
          >
            <div className="font-heading font-bold text-text">{item.title}</div>
            <p className="mt-2 text-sm text-text/70">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* H2: Mua ở đâu */}
      <h2>Mua xoài Tứ Quý nguyên liệu ở đâu?</h2>
      <p>
        Để các món trên đạt chất lượng tốt nhất, nguyên liệu quan trọng nhất là
        nguồn gốc xoài. Xoài Tứ Quý trồng đúng vùng CDĐL tại Thạnh Phú, Bến
        Tre mới cho đủ vị mặn tự nhiên và độ chắc thịt cần thiết.
      </p>
      <p>
        Vựa Thạnh Phú giao hàng toàn quốc qua J&T, Giao Hàng Nhanh — thùng
        20kg xoài xanh hoặc già xanh, đóng thùng xốp chống dập, ship 1–2 ngày
        ra Bắc. Xem chi tiết tại{" "}
        <a href="/xoai-tu-quy">trang sản phẩm xoài Tứ Quý</a> hoặc kiểm tra{" "}
        <a href="/gia-xoai-hom-nay">giá xoài hôm nay</a> trước khi đặt.
      </p>

      <div className="my-6 rounded-2xl border border-border bg-white p-5 shadow-sm text-sm text-text/70">
        <p>
          <strong className="text-text">Đặt hàng sỉ cho kinh doanh:</strong> Quán
          ăn, nhà hàng, chuỗi trà sữa có thể đặt theo thùng 20–50kg. Xuất hóa
          đơn VAT đầy đủ. Ưu tiên đơn quen từ đơn thứ 3 trở đi. Liên hệ{" "}
          <a href="/#contact">tại đây</a> hoặc gọi thẳng vựa.
        </p>
      </div>
    </ArticleLayout>
  );
}
