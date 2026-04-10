/**
 * Dynamic article route — renders MDX articles from `src/content/articles/`.
 *
 * URL pattern: `/{product}/{type}/{slug}` (e.g. `/xoai-tu-quy/kien-thuc/xoai-tu-quy-la-gi`)
 *
 * Visibility: gated by `uxReviewed: true` AND `publishedAt <= now()` in the loader.
 * Static generation: `generateStaticParams` pre-renders all visible articles at build.
 *
 * IA Phase 04 implementation. Reads via `@/lib/articles` (no DB dependency).
 *
 * NOTE: Reserved top-level routes (`kien-thuc`, `tin-tuc`, `nguon-goc`, `giao-hang`,
 * `san-pham`, `lien-he`, `gia-xoai-hom-nay`, `api`) take precedence over this dynamic
 * `[product]` route in Next.js routing. Only product slugs (e.g. `xoai-tu-quy`) reach
 * here. Defensive `notFound()` if product/type/slug doesn't resolve to an article.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PriceTickerFooter } from "@/components/price-ticker-footer";
import {
  getArticleByUrlPath,
  getArticleByUrlPathIncludingScheduled,
  getAllArticleParamsForBuild,
  getRelatedArticles,
  type ArticleType,
} from "@/lib/articles";

type RouteParams = { product: string; type: string; slug: string };
type Props = { params: Promise<RouteParams> };

export const dynamicParams = false; // 404 anything outside generateStaticParams
export const revalidate = 60;        // ISR — re-check publishedAt gate every 60s

const VALID_TYPES: ArticleType[] = ["kien-thuc", "tin-tuc"];

function isValidType(t: string): t is ArticleType {
  return VALID_TYPES.includes(t as ArticleType);
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  // Build ALL UX-reviewed articles (including future-scheduled) so ISR can flip
  // them visible at publishedAt without requiring a redeploy.
  return getAllArticleParamsForBuild().map((p) => ({
    product: p.product,
    type: p.type,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product, type, slug } = await params;
  if (!isValidType(type)) return {};
  // Use including-scheduled variant so future articles still get correct metadata
  // when ISR builds them at publish time.
  const article = getArticleByUrlPathIncludingScheduled(`/${product}/${type}/${slug}`);
  if (!article) return {};

  const fm = article.frontmatter;
  const canonical = `https://traicaybentre.com${article.urlPath}`;
  return {
    title: fm.title,
    description: fm.metaDescription,
    keywords: [fm.primaryKeyword, ...(fm.secondaryKeywords ?? [])].join(", "),
    alternates: { canonical },
    openGraph: {
      title: fm.title,
      description: fm.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: fm.publishedAt,
      images: fm.ogImage ? [{ url: fm.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.metaDescription,
      images: fm.ogImage ? [fm.ogImage] : undefined,
    },
  };
}

function buildArticleJsonLd(article: ReturnType<typeof getArticleByUrlPath>) {
  if (!article) return null;
  const fm = article.frontmatter;
  const url = `https://traicaybentre.com${article.urlPath}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.metaDescription,
    image: fm.ogImage ? `https://traicaybentre.com${fm.ogImage}` : undefined,
    datePublished: fm.publishedAt,
    dateModified: fm.publishedAt,
    author: {
      "@type": "Organization",
      name: "Trái Cây Bến Tre",
      url: "https://traicaybentre.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Trái Cây Bến Tre",
      logo: {
        "@type": "ImageObject",
        url: "https://traicaybentre.com/Logo.png",
      },
    },
    mainEntityOfPage: url,
    keywords: [fm.primaryKeyword, ...(fm.secondaryKeywords ?? [])].join(", "),
  };

  const faqSchema =
    fm.faq && fm.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: fm.faq.map((qa) => ({
            "@type": "Question",
            name: qa.q,
            acceptedAnswer: { "@type": "Answer", text: qa.a },
          })),
        }
      : null;

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#aeo-answer", "blockquote"],
    },
    url,
  };

  return [articleSchema, faqSchema, speakableSchema].filter(Boolean);
}

export default async function ArticlePage({ params }: Props) {
  const { product, type, slug } = await params;
  if (!isValidType(type)) notFound();

  const article = getArticleByUrlPath(`/${product}/${type}/${slug}`);
  if (!article) notFound();

  const related = getRelatedArticles(article.product, article.type, article.slug, 3);
  const jsonLd = buildArticleJsonLd(article);
  const fm = article.frontmatter;

  const hubHref = article.type === "kien-thuc" ? "/kien-thuc" : "/tin-tuc";
  const hubLabel = article.type === "kien-thuc" ? "Kiến thức" : "Tin tức";
  const heroImage = fm.ogImage ?? "/Xoai-2.jpg";

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Header />

      <article className="bg-brand-cream pt-28 pb-16 sm:pt-32">
        <div className="mx-auto max-w-3xl px-5">
          {/* Breadcrumb */}
          <nav
            className="mb-6 text-xs text-text/60 sm:text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-mango">
              Trang chủ
            </Link>
            <span className="mx-1.5">›</span>
            <Link href={`/${article.product}`} className="hover:text-mango">
              Xoài Tứ Quý
            </Link>
            <span className="mx-1.5">›</span>
            <Link href={hubHref} className="hover:text-mango">
              {hubLabel}
            </Link>
            <span className="mx-1.5">›</span>
            <span className="text-text">{fm.title}</span>
          </nav>

          <header className="mb-8">
            {fm.pillar && (
              <span className="inline-block rounded-full bg-mango/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mango-dark">
                {fm.pillar.replace(/-/g, " ")}
              </span>
            )}
            <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-text sm:text-4xl">
              {fm.title}
            </h1>
            <p className="mt-3 text-sm text-text/60">
              Đăng ngày{" "}
              <time dateTime={fm.publishedAt}>
                {new Date(fm.publishedAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          </header>

          {/* Hero image */}
          <figure className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-white shadow-md">
            <Image
              src={heroImage}
              alt={fm.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </figure>

          <div
            id="article-body"
            className="prose prose-neutral max-w-none prose-headings:font-heading prose-headings:text-text prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl prose-a:text-mango-dark hover:prose-a:text-mango prose-blockquote:border-mango prose-blockquote:bg-mango/5 prose-blockquote:py-1 prose-blockquote:not-italic prose-strong:text-text prose-table:text-sm prose-th:bg-brand prose-img:rounded-xl"
          >
            <MDXRemote source={article.body} />
          </div>

          {/* FAQ render (also covered by FAQPage schema) */}
          {fm.faq && fm.faq.length > 0 && (
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="font-heading text-2xl font-bold text-text">
                Câu hỏi thường gặp
              </h2>
              <dl className="mt-6 space-y-5">
                {fm.faq.map((qa, i) => (
                  <div key={i} className="rounded-xl bg-white p-5 shadow-sm">
                    <dt className="font-semibold text-text">{qa.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-text/70">
                      {qa.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Price ticker — shown on price-sensitive pillars (gia-thi-truong)
              and all tin-tuc articles. Reads Supabase price_history. */}
          {(article.type === "tin-tuc" ||
            article.frontmatter.pillar === "gia-thi-truong") && (
            <PriceTickerFooter />
          )}

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="font-heading text-2xl font-bold text-text">
                Bài liên quan
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.urlPath}>
                    <Link
                      href={r.urlPath}
                      className="block rounded-xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span className="font-semibold text-text hover:text-mango">
                        {r.frontmatter.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Back to hub */}
          <div className="mt-10 border-t border-border pt-6">
            <Link
              href={hubHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-mango-dark hover:text-mango"
            >
              ← Xem tất cả bài {hubLabel.toLowerCase()}
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
