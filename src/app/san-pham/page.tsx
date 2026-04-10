import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { ProductCatalog } from "@/components/product/product-catalog";
import { getAllProducts } from "@/lib/products";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Các Loại Trái Cây Đặc Sản Bến Tre — Xoài Tứ Quý, Dừa Xiêm & Hơn Nữa",
  description:
    "Danh sách trái cây đặc sản Bến Tre từ vựa trực tiếp: Xoài Tứ Quý CDĐL #00124, Dừa Xiêm Bến Tre, và các loại trái cây đang chuẩn bị ra mắt.",
  keywords: [
    "trái cây bến tre",
    "trái cây đặc sản bến tre",
    "vựa trái cây bến tre",
    "xoài tứ quý",
    "dừa xiêm bến tre",
  ],
  alternates: { canonical: `${SITE_URL}/san-pham` },
  openGraph: {
    title: "Các Loại Trái Cây Đặc Sản Bến Tre Từ Vựa",
    description:
      "Xoài Tứ Quý CDĐL #00124 và các loại trái cây đặc sản Bến Tre khác từ vựa trực tiếp.",
    url: `${SITE_URL}/san-pham`,
  },
};

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Sản phẩm", url: `${SITE_URL}/san-pham` },
]);

export default function CatalogPage() {
  const products = getAllProducts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <ProductCatalog products={products} />
      <SectionDivider from="brand-cream" to="brand" />
      <Footer />
    </>
  );
}
