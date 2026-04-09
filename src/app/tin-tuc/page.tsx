import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { BLOG_POSTS } from "@/lib/blog-data";
import { getAllPublishedArticles } from "@/lib/articles";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

// ISR — refresh hub every 5 min so newly-published MDX articles appear
export const revalidate = 300;

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

type HubPost = {
  href: string;
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: { src: string; alt: string };
};

function getHubPosts(): HubPost[] {
  const legacy: HubPost[] = BLOG_POSTS.map((p) => ({
    href: `/tin-tuc/${p.slug}`,
    title: p.title,
    description: p.description,
    date: p.date,
    category: p.category,
    coverImage: p.coverImage,
  }));

  const mdx: HubPost[] = getAllPublishedArticles("tin-tuc").map((a) => ({
    href: a.urlPath,
    title: a.frontmatter.title,
    description: a.frontmatter.metaDescription,
    date: a.frontmatter.publishedAt.slice(0, 10),
    category: a.frontmatter.pillar ?? "Tin tức",
    coverImage: {
      src: a.frontmatter.ogImage ?? "/Xoai-2.jpg",
      alt: a.frontmatter.title,
    },
  }));

  return [...legacy, ...mdx].sort((a, b) => b.date.localeCompare(a.date));
}

export default function TinTucPage() {
  const posts = getHubPosts();
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

      {/* Post list — mỗi card là Link clickable toàn bộ */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[900px]">
          <div className="flex flex-col gap-6">
            {posts.map((post, i) => (
              <FadeIn key={post.href} delay={Math.min(i, 10) * 0.06}>
                <Link
                  href={post.href}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:grid sm:grid-cols-[240px_1fr]"
                >
                  {/* Cover image — full width trên mobile, cột trái trên sm+ */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-cream sm:aspect-auto sm:h-full">
                    <Image
                      src={post.coverImage.src}
                      alt={post.coverImage.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 640px) 240px, 100vw"
                    />
                  </div>

                  {/* Content */}
                  <article className="flex flex-col p-6 sm:p-7">
                    <div className="mb-3 flex items-center gap-3">
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
                    <h2 className="font-heading text-xl font-bold text-text transition-colors group-hover:text-mango sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-text/60">
                      {post.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-text/70 transition-colors group-hover:text-mango">
                      Đọc tiếp
                      <ArrowRight
                        size={14}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </article>
                </Link>
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
