import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
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
    "quà biếu trái cây đặc sản bến tre",
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

      {/* KW#8 anchor: quà biếu trái cây đặc sản bến tre */}
      <section id="qua-bieu-ben-tre" className="scroll-mt-32 bg-brand-cream px-5 pb-20">
        <div className="mx-auto max-w-[1000px]">
          <FadeIn>
            <h2 className="mb-3 text-center font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              Quà biếu trái cây
              <br />
              <span className="text-mango">đặc sản Bến Tre</span>
            </h2>
            <p className="mb-10 text-center text-sm text-text/50">
              Xoài Tứ Quý CDĐL #00124 + Dừa Xiêm — combo quà biếu từ vựa
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <span className="inline-block rounded-full bg-mango/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mango-dark">
                  Hộp 5kg
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-text">
                  Xoài VIP 5kg — Hộp Đẹp
                </h3>
                <p className="mt-2 text-sm text-text/60">
                  6-8 trái VIP 600-800g, hộp carton in logo, lót xốp từng trái. Lý tưởng quà biếu sếp, đối tác.
                </p>
                <a
                  href="https://zalo.me/0932585533?text=M%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20h%E1%BB%99p%20xo%C3%A0i%20VIP%205kg%20qu%C3%A0%20bi%E1%BA%BFu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                >
                  Đặt hộp 5kg qua Zalo
                </a>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-md">
                <span className="inline-block rounded-full bg-text/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-text/70">
                  Hộp 10kg
                </span>
                <h3 className="mt-3 font-heading text-xl font-bold text-text">
                  Xoài VIP 10kg — Hộp Đẹp
                </h3>
                <p className="mt-2 text-sm text-text/60">
                  12-16 trái VIP, hộp lớn cao cấp. Phù hợp quà Tết, biếu cơ quan, quà doanh nghiệp số lượng lớn.
                </p>
                <a
                  href="https://zalo.me/0932585533?text=M%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20h%E1%BB%99p%20xo%C3%A0i%20VIP%2010kg%20qu%C3%A0%20bi%E1%BA%BFu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
                >
                  Đặt hộp 10kg qua Zalo
                </a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-center text-sm text-text/50">
              Cần combo đặc biệt (xoài + dừa, thiệp kèm, giao đúng ngày)? Nhắn Zalo hoặc gọi{" "}
              <a href="tel:0932585533" className="font-bold text-text hover:text-mango transition-colors">
                0932 585 533
              </a>{" "}
              — vựa tư vấn riêng.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />
      <Footer />
    </>
  );
}
