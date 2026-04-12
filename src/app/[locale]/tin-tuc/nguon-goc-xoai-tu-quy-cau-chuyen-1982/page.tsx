import type { Metadata } from "next";
import Image from "next/image";
import { ArticleLayout } from "@/components/article-layout";
import { VUA_XOAI_IMAGES } from "@/lib/vua-xoai-images";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  SITE_URL,
} from "@/lib/structured-data";

const PAGE_URL = `${SITE_URL}/tin-tuc/nguon-goc-xoai-tu-quy-cau-chuyen-1982`;

export const metadata: Metadata = {
  title: "Nguồn Gốc Xoài Tứ Quý Bến Tre — Câu Chuyện Từ 1982 Đến CDĐL #00124",
  description:
    "Lịch sử xoài Tứ Quý: phát hiện 1982 ở Chợ Lách, lan tới Thạnh Phú với đất giồng cát nhiễm mặn, được cấp CDĐL #00124 năm 2022.",
  keywords: [
    "nguồn gốc xoài tứ quý",
    "lịch sử xoài bến tre",
    "xoài tứ quý 1982",
    "htx thạnh phong",
    "cdđl 00124",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Nguồn Gốc Xoài Tứ Quý Bến Tre — Câu Chuyện Từ 1982 Đến CDĐL #00124",
    description:
      "Lịch sử xoài Tứ Quý: phát hiện 1982 ở Chợ Lách, lan tới Thạnh Phú với đất giồng cát nhiễm mặn, được cấp CDĐL #00124 năm 2022.",
    url: PAGE_URL,
    images: [
      {
        url: `${SITE_URL}${VUA_XOAI_IMAGES.binhMinhDua.src}`,
        width: VUA_XOAI_IMAGES.binhMinhDua.width,
        height: VUA_XOAI_IMAGES.binhMinhDua.height,
      },
    ],
  },
};

const articleJsonLd = getArticleJsonLd({
  title: "Nguồn Gốc Xoài Tứ Quý — Câu Chuyện Từ 1982 Đến CDĐL #00124",
  description:
    "Lịch sử xoài Tứ Quý: phát hiện 1982 ở Chợ Lách, lan tới Thạnh Phú với đất giồng cát nhiễm mặn, được cấp CDĐL #00124 năm 2022.",
  url: PAGE_URL,
  datePublished: "2026-04-09",
  dateModified: "2026-04-09",
  image: `${SITE_URL}${VUA_XOAI_IMAGES.binhMinhDua.src}`,
});

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Tin tức", url: `${SITE_URL}/tin-tuc` },
  { name: "Nguồn gốc xoài Tứ Quý", url: PAGE_URL },
]);

export default function NguonGocXoaiTuQuyPage() {
  return (
    <ArticleLayout
      category="Tin tức — Lịch sử đặc sản"
      title="Nguồn Gốc Xoài Tứ Quý — Câu Chuyện Từ 1982 Đến CDĐL #00124"
      subtitle="Từ một vườn nhỏ ở Chợ Lách năm 1982 đến 400 ha đất giồng cát Thạnh Phú và tấm giấy bảo hộ địa lý CDĐL #00124 — đây là hành trình 40 năm của xoài Tứ Quý Bến Tre."
      publishDate="09/04/2026"
      heroImage={VUA_XOAI_IMAGES.binhMinhDua}
      jsonLd={[articleJsonLd, breadcrumbJsonLd]}
    >
      {/* Section 1 */}
      <h2>1982 — Khởi nguồn ở Chợ Lách</h2>
      <p>
        Năm <strong>1982</strong>, một giống xoài lạ xuất hiện tại ấp Phú Đa, xã Vĩnh Bình,
        huyện <strong>Chợ Lách, Bến Tre</strong>. Điều làm người nông dân chú ý không phải là
        mã quả hay trọng lượng, mà là một đặc tính hiếm có: cây ra hoa và đậu trái{" "}
        <strong>quanh năm</strong>, không phân biệt mùa khô hay mùa mưa.
      </p>
      <p>
        Tên <strong>"Tứ Quý"</strong> — nghĩa đen là "bốn mùa" — ra đời từ đây. Đây là điều
        mà hầu như không giống xoài nào khác tại Đồng bằng sông Cửu Long làm được. Xoài Cát
        Hòa Lộc, xoài Cát Chu, xoài Đài Loan đều chỉ cho một đến hai vụ mỗi năm. Xoài Tứ Quý
        thì khác — ba vụ chính mỗi năm, và xoài xanh có thể thu hoạch liên tục.
      </p>
      <p>
        Những năm đầu sau 1982, giống xoài này được trồng nhỏ lẻ trong các hộ gia đình ở Chợ
        Lách. Chưa có thương lái chú ý, chưa có thị trường định hình. Người ta trồng để ăn
        trong nhà, cho hàng xóm, đôi khi bán tại chợ địa phương với giá không đáng kể. Không
        ai biết rằng bốn thập kỷ sau, giống xoài này sẽ được bảo hộ bởi Cục Sở hữu Trí tuệ
        Việt Nam và xuất khẩu sang Hàn Quốc, Mỹ, Úc.
      </p>
      <p>
        Việc phát hiện và nhân rộng giống xoài Tứ Quý ban đầu mang tính tự phát hoàn toàn.
        Không có chương trình nghiên cứu bài bản, không có sự hỗ trợ kỹ thuật từ nhà nước.
        Đó là công của những người nông dân quan sát, thử nghiệm, và truyền miệng cho nhau
        qua nhiều thế hệ.
      </p>

      {/* Section 2 */}
      <h2>Tại sao Thạnh Phú mới là vùng đất tối ưu?</h2>
      <p>
        Câu hỏi khiến các nhà khoa học mất nhiều năm để giải đáp: tại sao cùng một giống xoài
        Tứ Quý, trồng ở Thạnh Phú lại cho ra trái ngon hơn hẳn vùng khác — kể cả chính Chợ Lách,
        nơi giống được phát hiện?
      </p>
      <p>
        Câu trả lời nằm ở <strong>đất giồng cát ven biển nhiễm mặn</strong>. Vùng đất Thạnh
        Phú có đặc điểm thổ nhưỡng không nơi nào trùng lặp:
      </p>
      <ul>
        <li>Hàm lượng cát chiếm <strong>60–70%</strong> — đất thoát nước nhanh, rễ cây phải
          vươn sâu để tìm nước ngầm</li>
        <li>Độ mặn trong đất dao động từ <strong>0,009 đến 0,022%</strong> — đủ để ảnh hưởng
          đến thành phần khoáng của quả nhưng không đến mức gây hại cho cây</li>
        <li>Địa hình giồng cát nổi cao <strong>2–4m</strong> so với mực nước biển, ven bờ
          biển Đông — nước ngầm nhiễm mặn tự nhiên từ thủy triều</li>
        <li>Khí hậu ven biển tạo biên độ nhiệt độ ngày-đêm rõ rệt — điều kiện lý tưởng để
          tích lũy đường và khoáng chất trong quả</li>
      </ul>
      <p>
        Kết quả là hàm lượng <strong>sodium (Na) trong quả xoài Thạnh Phú đạt 1,58–2,02%</strong> —
        dấu vân tay hóa học không thể giả mạo. Đây chính là nguồn gốc của{" "}
        <strong>vị mặn nhẹ cuối lưỡi</strong> — đặc điểm cảm quan độc đáo nhất của xoài Tứ
        Quý Bến Tre. Ăn xoài chín từ Thạnh Phú, ngọt đậm trước, rồi một chút mặn dịu phảng
        phất sau — profile vị giác không có ở bất kỳ giống xoài nào khác tại Việt Nam.
      </p>
      <p>
        Xoài Tứ Quý trồng ở các vùng khác — dù là Tiền Giang, Long An, hay ngay chính Chợ
        Lách — đều thiếu vị mặn này. Terroir của Thạnh Phú là không thể chuyển giao.
      </p>

      {/* Inline image mid-article */}
      <div className="my-8 overflow-hidden rounded-2xl">
        <Image
          src={VUA_XOAI_IMAGES.doiNguPhanLoai.src}
          alt={VUA_XOAI_IMAGES.doiNguPhanLoai.alt}
          width={VUA_XOAI_IMAGES.doiNguPhanLoai.width}
          height={VUA_XOAI_IMAGES.doiNguPhanLoai.height}
          className="w-full object-cover"
        />
      </div>

      {/* Section 3 */}
      <h2>Trước 2010 — Cây mì, dưa hấu và cuộc đời nông dân Thạnh Phú</h2>
      <p>
        Trước năm 2010, vùng đất giồng cát Thạnh Phú không được biết đến với xoài Tứ Quý.
        Người dân ở đây chủ yếu trồng <strong>cây mì (sắn) và dưa hấu</strong> — hai loại
        cây chịu được đất cát, không đòi hỏi nhiều nước tưới, nhưng thu nhập rất thấp.
      </p>
      <p>
        Đất giồng cát nhiễm mặn vốn bị coi là "đất xấu" — không trồng lúa được, không trồng
        được nhiều loại rau màu. Giá trị đất thấp. Thu nhập mỗi hộ từ mì và dưa hấu chỉ đủ
        ăn, không đủ để tích lũy. Nhiều gia đình phải có người đi làm ăn xa ở thành phố để
        gửi tiền về.
      </p>
      <p>
        Đây là bức tranh kinh tế của vùng nông thôn ven biển Đồng bằng sông Cửu Long trước
        khi có sự chuyển đổi cây trồng. Đất được coi là hạn chế thay vì là tài sản. Chính
        đặc điểm "đất xấu" này — giàu cát, nhiễm mặn — sau này lại trở thành điều kiện
        terroir không thể tái tạo mà cả thế giới tìm kiếm.
      </p>

      {/* Section 4 */}
      <h2>Bước ngoặt sau 2010 — Chuyển đổi sang xoài Tứ Quý</h2>
      <p>
        Sau năm 2010, một số hộ nông dân tiên phong tại Thạnh Phú bắt đầu thử nghiệm trồng
        xoài Tứ Quý trên đất giồng cát của mình. Cây giống được mang về từ Chợ Lách, nhân
        bằng phương pháp chiết cành truyền thống. Kết quả ban đầu khả quan — cây thích nghi
        tốt, ra trái đều, và quả có chất lượng đặc biệt hơn vùng gốc.
      </p>
      <p>
        Tin đồn lan nhanh trong cộng đồng nông dân. Hộ này thấy nhà kia thu nhập tăng, rồi
        tự bỏ cây mì, dưa hấu để chuyển sang xoài. Không cần vận động, không cần chỉ đạo —
        bàn tay thị trường và bài toán sinh kế tự làm công việc đó.
      </p>
      <p>
        Thu nhập từ xoài Tứ Quý trên cùng diện tích đất tăng{" "}
        <strong>3–4 lần so với cây mì và dưa hấu</strong>. Một hecta xoài Tứ Quý ở Thạnh Phú
        cho năng suất 15–25 tấn/năm (3 vụ cộng lại), với giá bán sỉ dao động 16.000–25.000đ/kg
        tùy phân loại. Bài toán kinh tế quá rõ ràng.
      </p>
      <p>
        Đến cuối thập kỷ 2010, mô hình lan rộng ra toàn vùng. Đến nay, vùng trồng xoài Tứ
        Quý tại Thạnh Phú và các huyện lân cận đã đạt{" "}
        <strong>hơn 400 hecta với trên 700 hộ dân tham gia</strong>. Năm 2017,{" "}
        <strong>Hợp tác xã Dịch vụ Sản xuất Nông nghiệp Thạnh Phong</strong> được thành lập
        với 148 thành viên — cơ quan đầu mối quản lý chất lượng, liên kết thị trường, và
        chuẩn bị hồ sơ xin cấp Chỉ dẫn địa lý.
      </p>

      {/* Section 5 */}
      <h2>2022 — Cấp Chỉ dẫn địa lý CDĐL #00124</h2>
      <p>
        Ngày <strong>10/11/2022</strong>, Cục Sở hữu Trí tuệ — Bộ Khoa học và Công nghệ —
        ban hành <strong>Quyết định số 5371/QĐ-SHTT</strong>, chính thức cấp{" "}
        <strong>Chỉ dẫn địa lý mang số hiệu CDĐL #00124</strong> cho tên gọi{" "}
        <strong>"Xoài Tứ Quý Bến Tre"</strong>.
      </p>
      <p>
        Quyết định này có nghĩa pháp lý rất cụ thể: chỉ xoài Tứ Quý trồng tại{" "}
        <strong>ba huyện Thạnh Phú, Ba Tri và Bình Đại</strong> của tỉnh Bến Tre mới được
        phép sử dụng tên gọi và nhãn hiệu "Xoài Tứ Quý Bến Tre". Bất kỳ đơn vị nào dùng
        tên này cho sản phẩm từ vùng khác đều vi phạm Luật Sở hữu Trí tuệ Việt Nam — có
        thể bị phạt hành chính từ 10 đến 500 triệu đồng, thu hồi sản phẩm, hoặc truy cứu
        hình sự tùy mức độ.
      </p>
      <p>
        Chỉ dẫn địa lý CDĐL #00124 có tầm quan trọng lớn đối với xuất khẩu. Trước khi có
        GI này, xoài Tứ Quý Bến Tre khó tiếp cận các thị trường có yêu cầu truy xuất nguồn
        gốc nghiêm ngặt như Mỹ, Hàn Quốc, và Úc. Sau khi có CDĐL, cánh cửa xuất khẩu mở
        ra — đây là bước ngoặt chiến lược cho toàn bộ chuỗi cung ứng xoài Bến Tre.
      </p>
      <p>
        Xem chi tiết về{" "}
        <a href="/kien-thuc/chi-dan-dia-ly-cd-dl-00124">
          ý nghĩa pháp lý và cách xác minh CDĐL #00124
        </a>{" "}
        tại trang kiến thức của chúng tôi.
      </p>

      {/* Inline image near end */}
      <div className="my-8 overflow-hidden rounded-2xl">
        <Image
          src={VUA_XOAI_IMAGES.dongHangDemGiaDinh.src}
          alt={VUA_XOAI_IMAGES.dongHangDemGiaDinh.alt}
          width={VUA_XOAI_IMAGES.dongHangDemGiaDinh.width}
          height={VUA_XOAI_IMAGES.dongHangDemGiaDinh.height}
          className="w-full object-cover"
        />
      </div>

      {/* Section 6 */}
      <h2>Hôm nay — Vựa xoài Thạnh Phú</h2>
      <p>
        Từ một giống xoài không ai biết đến năm 1982, xoài Tứ Quý Bến Tre ngày nay là một
        trong số ít đặc sản trái cây Việt Nam đạt tầm bảo hộ địa lý quốc gia. Con số thống
        kê hiện tại phản ánh sức sống của toàn vùng:
      </p>
      <ul>
        <li>
          <strong>400+ hecta</strong> vùng trồng chính thức trong phạm vi CDĐL #00124, trải
          dài qua Thạnh Phú (~300 ha), Ba Tri (~150 ha), Bình Đại (~100 ha)
        </li>
        <li>
          <strong>700+ hộ dân</strong> tham gia chuỗi sản xuất — từ canh tác, thu hoạch đến
          sơ chế, đóng gói
        </li>
        <li>
          <strong>86 hecta</strong> đã có mã số vùng trồng xuất khẩu (PUC code) — điều kiện
          bắt buộc để xuất khẩu chính ngạch sang các thị trường yêu cầu truy xuất nghiêm ngặt
        </li>
        <li>
          <strong>16 hecta</strong> đạt chứng nhận GlobalGAP — tiêu chuẩn canh tác quốc tế
          được thừa nhận tại EU, Mỹ, Nhật Bản, Hàn Quốc
        </li>
        <li>
          <strong>95% sản lượng</strong> tiêu thụ tại thị trường miền Bắc — đặc biệt là
          Hà Nội, Hải Phòng, và các tỉnh phía Bắc, nơi vị mặn nhẹ được người tiêu dùng
          đánh giá rất cao
        </li>
      </ul>
      <p>
        Câu chuyện của xoài Tứ Quý Bến Tre là một bài học về terroir — về việc một vùng đất
        tưởng như hạn chế (cát nhiễm mặn, không trồng lúa được) lại chứa đựng điều kiện độc
        đáo không thể tái tạo ở đâu khác. Và đây cũng là minh chứng cho sức mạnh của Chỉ dẫn
        địa lý: khi chất lượng được pháp lý bảo hộ, giá trị sản phẩm tăng, người nông dân
        hưởng lợi bền vững.
      </p>
      <p>
        Nếu bạn muốn đặt mua xoài Tứ Quý chính hiệu từ vựa Thạnh Phú, xem thông tin sản
        phẩm tại{" "}
        <a href="/xoai-tu-quy">trang xoài Tứ Quý</a> hoặc kiểm tra{" "}
        <a href="/xoai-tu-quy#gia">giá xoài hôm nay</a> trước khi đặt.
      </p>
    </ArticleLayout>
  );
}
