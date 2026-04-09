import type { Metadata } from "next";
import Image from "next/image";
import { ArticleLayout } from "@/components/article-layout";
import { VUA_XOAI_IMAGES } from "@/lib/vua-xoai-images";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  SITE_URL,
} from "@/lib/structured-data";

const PAGE_URL = `${SITE_URL}/kien-thuc/chi-dan-dia-ly-cd-dl-00124`;

export const metadata: Metadata = {
  title: "Chỉ Dẫn Địa Lý CDĐL #00124 Xoài Tứ Quý Bến Tre — Bảo Hộ Pháp Lý",
  description:
    "CDĐL #00124 cấp 10/11/2022 bởi Cục SHTT bảo hộ tên 'Xoài Tứ Quý Bến Tre' cho 3 huyện Thạnh Phú, Ba Tri, Bình Đại.",
  keywords: [
    "cdđl 00124",
    "chỉ dẫn địa lý xoài bến tre",
    "bảo hộ xoài tứ quý",
    "cục sở hữu trí tuệ xoài",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Chỉ Dẫn Địa Lý CDĐL #00124 Xoài Tứ Quý Bến Tre — Bảo Hộ Pháp Lý",
    description:
      "CDĐL #00124 cấp 10/11/2022 bởi Cục SHTT bảo hộ tên 'Xoài Tứ Quý Bến Tre' cho 3 huyện Thạnh Phú, Ba Tri, Bình Đại.",
    url: PAGE_URL,
    images: [
      {
        url: `${SITE_URL}${VUA_XOAI_IMAGES.vuaXoaiTongQuan.src}`,
        width: VUA_XOAI_IMAGES.vuaXoaiTongQuan.width,
        height: VUA_XOAI_IMAGES.vuaXoaiTongQuan.height,
      },
    ],
  },
};

const articleJsonLd = getArticleJsonLd({
  title: "Chỉ Dẫn Địa Lý CDĐL #00124 — Bảo Hộ Pháp Lý Cho Xoài Tứ Quý Bến Tre",
  description:
    "CDĐL #00124 cấp 10/11/2022 bởi Cục SHTT bảo hộ tên 'Xoài Tứ Quý Bến Tre' cho 3 huyện Thạnh Phú, Ba Tri, Bình Đại.",
  url: PAGE_URL,
  datePublished: "2026-04-09",
  dateModified: "2026-04-09",
  image: `${SITE_URL}${VUA_XOAI_IMAGES.vuaXoaiTongQuan.src}`,
});

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Kiến thức", url: `${SITE_URL}/kien-thuc` },
  { name: "CDĐL #00124 Xoài Tứ Quý", url: PAGE_URL },
]);

export default function ChiDanDiaLyCdDl00124Page() {
  return (
    <ArticleLayout
      category="Kiến thức — Pháp lý & Chứng nhận"
      title="Chỉ Dẫn Địa Lý CDĐL #00124 — Bảo Hộ Pháp Lý Cho Xoài Tứ Quý Bến Tre"
      subtitle="Tất cả những gì bạn cần biết về Chỉ dẫn địa lý số 00124: căn cứ pháp lý, vùng được công nhận, quyền lợi người tiêu dùng, hậu quả vi phạm, và cách kiểm tra xoài chính hiệu."
      publishDate="09/04/2026"
      heroImage={VUA_XOAI_IMAGES.vuaXoaiTongQuan}
      jsonLd={[articleJsonLd, breadcrumbJsonLd]}
    >
      {/* Section 1 */}
      <h2>Chỉ dẫn địa lý là gì?</h2>
      <p>
        <strong>Chỉ dẫn địa lý</strong> (Geographical Indication — GI) là hình thức bảo hộ
        sở hữu trí tuệ dành cho tên gọi xuất xứ của sản phẩm, khi chất lượng, danh tiếng
        hoặc đặc tính của sản phẩm đó{" "}
        <strong>gắn liền với điều kiện địa lý đặc thù</strong> của một vùng lãnh thổ cụ thể
        — bao gồm thổ nhưỡng, khí hậu, thủy văn và phương thức canh tác truyền thống.
      </p>
      <p>
        Trên thế giới, các Chỉ dẫn địa lý nổi tiếng nhất bao gồm:{" "}
        <strong>Champagne</strong> (vùng sản xuất rượu vang sủi bọt tại Pháp),{" "}
        <strong>Prosciutto di Parma</strong> (giăm bông Parma của Ý),{" "}
        <strong>Scotch Whisky</strong> (Scotland), hay tại Việt Nam là{" "}
        <strong>nước mắm Phú Quốc</strong> — tất cả đều được bảo hộ tên gọi theo nguyên
        tắc: chỉ sản phẩm từ vùng đó, theo quy trình đó, mới được dùng tên đó.
      </p>
      <p>
        Tại Việt Nam, Chỉ dẫn địa lý được quản lý và cấp phép bởi{" "}
        <strong>Cục Sở hữu Trí tuệ (NOIP)</strong> — cơ quan trực thuộc Bộ Khoa học và Công
        nghệ. Căn cứ pháp lý là Luật Sở hữu Trí tuệ 2005, sửa đổi bổ sung 2009 và 2019, cùng
        các nghị định hướng dẫn thi hành.
      </p>
      <p>
        Đọc thêm về{" "}
        <a href="/tin-tuc/nguon-goc-xoai-tu-quy-cau-chuyen-1982">
          lịch sử hình thành vùng trồng xoài Tứ Quý từ 1982
        </a>{" "}
        để hiểu tại sao Thạnh Phú lại được chọn làm vùng CDĐL.
      </p>

      {/* Section 2 */}
      <h2>CDĐL #00124 — Thông tin pháp lý đầy đủ</h2>
      <p>
        Dưới đây là toàn bộ thông tin pháp lý chính thức của Chỉ dẫn địa lý bảo hộ xoài
        Tứ Quý Bến Tre:
      </p>
      <ul>
        <li>
          <strong>Số Chỉ dẫn địa lý:</strong> 00124
        </li>
        <li>
          <strong>Quyết định cấp:</strong> Số 5371/QĐ-SHTT
        </li>
        <li>
          <strong>Ngày cấp:</strong> 10/11/2022
        </li>
        <li>
          <strong>Cơ quan cấp:</strong> Cục Sở hữu Trí tuệ, Bộ Khoa học và Công nghệ
        </li>
        <li>
          <strong>Tên gọi được bảo hộ:</strong> "Xoài Tứ Quý Bến Tre"
        </li>
        <li>
          <strong>Phạm vi địa lý:</strong> 3 huyện thuộc tỉnh Bến Tre — Thạnh Phú, Ba Tri,
          Bình Đại
        </li>
        <li>
          <strong>Chủ thể quản lý:</strong> UBND tỉnh Bến Tre, HTX Dịch vụ Sản xuất Nông
          nghiệp Thạnh Phong
        </li>
      </ul>
      <p>
        Đây là một trong những Chỉ dẫn địa lý trái cây được cấp muộn nhất trong danh mục
        GI của Việt Nam, nhưng được chuẩn bị hồ sơ kỹ càng nhất — với đầy đủ dữ liệu phân
        tích thổ nhưỡng, hóa học quả, và khảo sát vùng sản xuất.

      </p>

      {/* Inline image 1 */}
      <div className="my-8 overflow-hidden rounded-2xl">
        <Image
          src={VUA_XOAI_IMAGES.xoaiPhanLoai.src}
          alt={VUA_XOAI_IMAGES.xoaiPhanLoai.alt}
          width={VUA_XOAI_IMAGES.xoaiPhanLoai.width}
          height={VUA_XOAI_IMAGES.xoaiPhanLoai.height}
          className="w-full object-cover"
        />
      </div>

      {/* Section 3 */}
      <h2>Vùng trồng được công nhận trong CDĐL #00124</h2>
      <p>
        CDĐL #00124 xác định ba huyện của tỉnh Bến Tre là vùng địa lý được bảo hộ. Mỗi
        huyện có đặc điểm canh tác và quy mô khác nhau:
      </p>
      <ul>
        <li>
          <strong>Thạnh Phú (~300 ha):</strong> Vùng trọng tâm — đất giồng cát ven biển
          nhiễm mặn điển hình nhất. Các xã Thạnh Phong, Thạnh Hải, Giao Thạnh là những
          vùng lõi chất lượng cao nhất. Đây là nơi có HTX Thạnh Phong hoạt động mạnh nhất
          và số lượng hộ dân tham gia lớn nhất.
        </li>
        <li>
          <strong>Ba Tri (~150 ha):</strong> Vùng mở rộng với điều kiện đất tương tự Thạnh
          Phú. Đất giồng cát ven biển, độ mặn trong ngưỡng phù hợp. Sản lượng đang tăng
          nhanh trong những năm gần đây.
        </li>
        <li>
          <strong>Bình Đại (~100 ha):</strong> Vùng mới nhất trong ba huyện. Đất có phần pha
          sét nhiều hơn, nhưng vẫn đáp ứng tiêu chí thổ nhưỡng của CDĐL. Đang trong giai
          đoạn phát triển và chứng nhận VietGAP.
        </li>
      </ul>
      <p>
        Tổng cộng toàn vùng CDĐL có <strong>hơn 400 hecta</strong> diện tích canh tác và{" "}
        <strong>hơn 700 hộ dân</strong> tham gia. Trong đó 86 ha đã có mã số vùng trồng
        xuất khẩu (PUC code) và 16 ha đạt GlobalGAP — tiêu chuẩn canh tác quốc tế cao nhất
        trong ngành rau quả.
      </p>

      {/* Section 4 */}
      <h2>Tại sao CDĐL quan trọng với người tiêu dùng?</h2>
      <p>
        Nhiều người mua xoài theo thói quen, tin vào lời người bán. Nhưng trên thực tế,
        thị trường có không ít sản phẩm gắn nhãn "xoài Bến Tre" hoặc "xoài Tứ Quý" mà
        không xuất xứ từ vùng CDĐL. CDĐL #00124 tạo ra một hệ thống xác minh pháp lý
        giúp người tiêu dùng bảo vệ quyền lợi của mình:
      </p>
      <ul>
        <li>
          <strong>Đảm bảo nguồn gốc thật:</strong> Chỉ xoài từ Thạnh Phú, Ba Tri, Bình Đại
          mới được dùng tên "Xoài Tứ Quý Bến Tre". Sản phẩm từ vùng khác dán nhãn này là
          vi phạm pháp luật và người bán chịu hoàn toàn trách nhiệm.
        </li>
        <li>
          <strong>Truy xuất nguồn gốc minh bạch:</strong> Mỗi thùng xoài trong vùng CDĐL
          được gắn QR code — quét ra thông tin tên vườn, xã, huyện, ngày thu hoạch, người
          thu hoạch. Hệ thống này do UBND tỉnh Bến Tre và HTX quản lý.
        </li>
        <li>
          <strong>Bảo vệ chất lượng bằng terroir:</strong> Vị mặn nhẹ cuối lưỡi — đặc
          trưng của xoài Tứ Quý Thạnh Phú — là kết quả của thổ nhưỡng tự nhiên, không
          thể bắt chước bằng kỹ thuật canh tác hay phụ gia. Đây là "dấu vân tay" tự nhiên
          mà CDĐL bảo hộ.
        </li>
        <li>
          <strong>Cơ sở pháp lý để khiếu nại:</strong> Nếu mua phải hàng giả mạo xuất xứ,
          người tiêu dùng có cơ sở pháp lý để tố cáo với cơ quan quản lý thị trường theo
          Luật Sở hữu Trí tuệ.
        </li>
      </ul>

      {/* Section 5 */}
      <h2>Hậu quả pháp lý khi vi phạm CDĐL #00124</h2>
      <p>
        Vi phạm Chỉ dẫn địa lý không phải là vi phạm thương mại thông thường — đây là
        vi phạm Luật Sở hữu Trí tuệ, với mức chế tài rõ ràng và ngày càng được thực thi
        nghiêm hơn:
      </p>
      <ul>
        <li>
          <strong>Phạt hành chính:</strong> Từ 10 triệu đến 500 triệu VNĐ tùy theo mức
          độ vi phạm (quy mô, số lượng hàng hóa, mức độ gây nhầm lẫn cho người tiêu dùng).
          Căn cứ theo Nghị định 99/2013/NĐ-CP sửa đổi bổ sung bởi Nghị định 126/2021/NĐ-CP.
        </li>
        <li>
          <strong>Buộc tiêu hủy hoặc thu hồi hàng hóa:</strong> Toàn bộ sản phẩm vi phạm
          bị tịch thu, tiêu hủy hoặc tái xuất, không được bán ra thị trường.
        </li>
        <li>
          <strong>Đình chỉ hoạt động kinh doanh:</strong> Cơ sở vi phạm có thể bị tước
          giấy phép kinh doanh tạm thời hoặc vĩnh viễn tùy mức độ.
        </li>
        <li>
          <strong>Truy cứu hình sự:</strong> Nếu hành vi vi phạm có tổ chức, quy mô lớn,
          gây thiệt hại nghiêm trọng cho người tiêu dùng hoặc cho nông dân vùng CDĐL —
          có thể bị truy cứu trách nhiệm hình sự theo Điều 226 Bộ luật Hình sự 2015 sửa
          đổi 2017.
        </li>
      </ul>
      <p>
        Người tiêu dùng phát hiện hàng giả mạo xuất xứ có thể tố cáo trực tiếp với Chi
        cục Quản lý Thị trường tỉnh/thành phố hoặc gửi đơn đến Cục Sở hữu Trí tuệ.
      </p>

      {/* Inline image 2 */}
      <div className="my-8 overflow-hidden rounded-2xl">
        <Image
          src={VUA_XOAI_IMAGES.doiNguPhanLoai.src}
          alt={VUA_XOAI_IMAGES.doiNguPhanLoai.alt}
          width={VUA_XOAI_IMAGES.doiNguPhanLoai.width}
          height={VUA_XOAI_IMAGES.doiNguPhanLoai.height}
          className="w-full object-cover"
        />
      </div>

      {/* Section 6 */}
      <h2>Cách kiểm tra xoài Tứ Quý chính hiệu</h2>
      <p>
        Để đảm bảo bạn đang mua xoài Tứ Quý Bến Tre thật — trong vùng CDĐL #00124 — có
        bốn phương pháp xác minh từ dễ đến kỹ:
      </p>
      <ul>
        <li>
          <strong>Quét QR code trên thùng:</strong> Phương pháp nhanh và chính xác nhất.
          Mỗi thùng xoài từ vùng CDĐL đều có tem QR truy xuất nguồn gốc — quét ra tên
          vườn, địa chỉ, ngày thu hoạch, người thu hoạch. Nếu không có QR hoặc QR dẫn đến
          thông tin mơ hồ — cần thận trọng.
        </li>
        <li>
          <strong>Mua từ vựa/đại lý chính thức:</strong> Ưu tiên mua từ các vựa có địa
          chỉ rõ ràng tại Thạnh Phú, Ba Tri, hoặc Bình Đại. Các đại lý lớn ở Hà Nội và
          TP.HCM có hợp đồng trực tiếp với HTX Thạnh Phong cũng là nguồn đáng tin cậy.
          Xem thêm tại{" "}
          <a href="/xoai-tu-quy">trang sản phẩm xoài Tứ Quý</a>.
        </li>
        <li>
          <strong>Yêu cầu chứng nhận VietGAP hoặc GlobalGAP:</strong> Với đơn hàng sỉ
          hoặc đơn lớn, bạn có quyền yêu cầu người bán cung cấp giấy chứng nhận VietGAP
          hoặc GlobalGAP của vườn — có tên vườn, địa chỉ, mã số cụ thể.
        </li>
        <li>
          <strong>Kiểm tra vị mặn nhẹ cuối lưỡi:</strong> Đây là cách xác minh cảm quan
          không thể giả mạo. Xoài Tứ Quý Thạnh Phú chín — khi ăn vào sẽ có vị ngọt đậm
          trước, sau đó một chút mặn dịu phảng phất ở cuối lưỡi. Đây là kết quả của hàm
          lượng sodium 1,58–2,02% trong quả từ đất giồng cát nhiễm mặn. Nếu xoài chỉ ngọt
          đơn thuần, không có hậu mặn — nhiều khả năng không phải từ vùng CDĐL.
        </li>
      </ul>

      {/* Section 7 */}
      <h2>So sánh với các CDĐL trái cây Việt Nam khác</h2>
      <p>
        CDĐL #00124 cho Xoài Tứ Quý Bến Tre không phải là Chỉ dẫn địa lý trái cây đầu tiên
        của Việt Nam, nhưng là một trong những GI được xây dựng hồ sơ khoa học bài bản
        nhất. Để đặt trong bối cảnh, dưới đây là một số CDĐL trái cây Việt Nam đáng chú ý:
      </p>
      <ul>
        <li>
          <strong>Vú sữa Lò Rèn Vĩnh Kim</strong> (Tiền Giang) — một trong những CDĐL
          trái cây đầu tiên của Đồng bằng sông Cửu Long, nổi tiếng với vị ngọt thanh và
          da bóng đặc trưng.
        </li>
        <li>
          <strong>Bưởi Năm Roi Bình Minh</strong> (Vĩnh Long) — GI bưởi nổi tiếng nhất
          Việt Nam, được xuất khẩu sang thị trường châu Âu từ rất sớm.
        </li>
        <li>
          <strong>Sầu riêng Ri6 Cái Mơn</strong> (Bến Tre) — cùng tỉnh Bến Tre, là minh
          chứng cho truyền thống đặc sản trái cây lâu đời của vùng đất này.
        </li>
        <li>
          <strong>Xoài Tứ Quý Bến Tre — CDĐL #00124</strong> (2022) — GI trái cây mới
          nhất trong danh sách, nhưng có đặc điểm terroir độc đáo nhất về cơ chế tạo vị
          (đất giồng cát nhiễm mặn → sodium tích tụ trong quả → vị mặn cuối lưỡi).
        </li>
      </ul>
      <p>
        Điểm khác biệt của CDĐL #00124 so với các GI trái cây khác: đây là trường hợp
        hiếm hoi mà <strong>vị giác của sản phẩm có thể giải thích bằng hóa học thổ
        nhưỡng</strong> — không chỉ là "ngon hơn theo kinh nghiệm" mà là "ngon khác vì
        sodium 1,58–2,02% từ đất nhiễm mặn 0,009–0,022%". Đây là nền tảng khoa học vững
        chắc nhất để bảo vệ tên gọi xuất xứ trên thị trường quốc tế.
      </p>
      <p>
        Muốn đặt mua xoài Tứ Quý chính vùng CDĐL #00124? Liên hệ trực tiếp vựa Thạnh Phú
        qua{" "}
        <a href="/#contact">trang liên hệ</a> hoặc xem{" "}
        <a href="/xoai-tu-quy#gia">giá xoài hôm nay</a> trước khi đặt hàng.
      </p>
    </ArticleLayout>
  );
}
