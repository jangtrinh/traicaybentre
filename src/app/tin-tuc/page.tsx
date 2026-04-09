import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { BLOG_POSTS } from "@/lib/blog-data";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Tin Tức & Báo Giá Xoài Tứ Quý | Bến Tre",
  description:
    "Tin tức mới nhất và báo giá xoài Tứ Quý Bến Tre. Cập nhật giá sỉ, tình hình vụ mùa, và thông tin từ vựa Thạnh Phú.",
  keywords: [
    "tin tức xoài tứ quý",
    "báo giá xoài bến tre",
    "giá xoài tứ quý mới nhất",
    "vụ mùa xoài bến tre",
  ],
  alternates: { canonical: `${SITE_URL}/tin-tuc` },
  openGraph: {
    title: "Tin Tức & Báo Giá Xoài Tứ Quý",
    description: "Báo giá sỉ và tin tức vụ mùa từ vựa Thạnh Phú, Bến Tre.",
    url: `${SITE_URL}/tin-tuc`,
  },
};

const breadcrumbJsonLd = getBreadcrumbJsonLd([
  { name: "Trang chủ", url: SITE_URL },
  { name: "Tin tức", url: `${SITE_URL}/tin-tuc` },
]);

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function TinTucPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-brand px-5 pt-28 pb-16">
        <div className="mx-auto max-w-[800px] text-center">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Vựa Thạnh Phú, Bến Tre
            </span>
            <h1 className="mt-3 font-heading text-[36px] font-bold uppercase leading-tight text-text sm:text-5xl">
              Tin Tức &amp; Báo Giá
              <br />
              <span className="text-mango">Xoài Tứ Quý</span>
            </h1>
            <p className="mt-4 text-sm text-text/60">
              Cập nhật giá sỉ, tình hình vụ mùa, và thông tin mới nhất từ vựa.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Post list */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[800px]">
          <div className="flex flex-col gap-6">
            {BLOG_POSTS.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.08}>
                <article className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-mango/15 px-3 py-0.5 text-xs font-bold text-mango">
                      {post.category}
                    </span>
                    <time
                      dateTime={post.date}
                      className="text-xs text-text/40"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h2 className="font-heading text-xl font-bold text-text">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text/60">
                    {post.description}
                  </p>
                  <Link
                    href={`/tin-tuc/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-text hover:text-mango transition-colors"
                  >
                    Đọc tiếp →
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />
      <Footer />
    </>
  );
}
