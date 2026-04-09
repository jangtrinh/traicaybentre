import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { KNOWLEDGE_ARTICLES } from "@/lib/knowledge-data";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Kiến Thức Xoài Tứ Quý — Hướng Dẫn Đầy Đủ | Trái Cây Bến Tre",
  description:
    "Tổng hợp kiến thức xoài Tứ Quý Bến Tre: định nghĩa, CDĐL #00124, vùng trồng miền Tây, mùa vụ, bảo quản, so sánh với các giống khác.",
  keywords: [
    "kiến thức xoài tứ quý",
    "hướng dẫn xoài bến tre",
    "xoài tứ quý là gì",
    "cdđl xoài bến tre",
    "vùng trồng xoài miền tây",
  ],
  alternates: { canonical: `${SITE_URL}/kien-thuc` },
  openGraph: {
    title: "Kiến Thức Xoài Tứ Quý — Hướng Dẫn Đầy Đủ",
    description:
      "Tất cả những điều bạn cần biết về xoài Tứ Quý Bến Tre — từ nguồn gốc đến cách bảo quản.",
    url: `${SITE_URL}/kien-thuc`,
  },
};

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Kiến thức", url: `${SITE_URL}/kien-thuc` },
]);

export default function KienThucIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-16">
        <div className="mx-auto max-w-[820px] text-center">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Hướng dẫn đầy đủ
            </span>
            <h1 className="mt-3 font-heading text-[36px] font-bold uppercase leading-tight text-text sm:text-5xl">
              Kiến Thức
              <br />
              <span className="text-mango">Xoài Tứ Quý</span>
            </h1>
            <p className="mt-6 text-lg leading-7 text-text/60">
              Tất cả những điều bạn cần biết về xoài Tứ Quý Bến Tre — từ nguồn
              gốc, CDĐL #00124, mùa vụ, vùng trồng đến cách bảo quản và so sánh
              với các giống xoài khác.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Article grid */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {KNOWLEDGE_ARTICLES.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 0.06}>
                <a
                  href={`/kien-thuc/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="inline-block w-fit rounded-full bg-mango/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mango-dark">
                    {article.category}
                  </span>
                  <h2 className="mt-4 font-heading text-xl font-bold leading-tight text-text">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text/60">
                    {article.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs text-text/40">{article.date}</span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-text group-hover:text-mango transition-colors">
                      Đọc tiếp
                      <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <SectionDivider from="brand-cream" to="brand" />
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto max-w-[820px]">
          <h3 className="mb-6 text-center font-heading text-2xl font-bold uppercase text-text">
            Khám phá thêm
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Xoài Tứ Quý — Sản phẩm", href: "/xoai-tu-quy" },
              { label: "Giá xoài hôm nay", href: "/xoai-tu-quy#gia" },
              { label: "Tin tức & báo giá", href: "/tin-tuc" },
              { label: "Nguồn gốc & chứng nhận", href: "/nguon-goc" },
              { label: "Liên hệ đặt sỉ", href: "/#contact" },
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
