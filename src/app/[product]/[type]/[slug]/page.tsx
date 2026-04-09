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
import { MDXRemote } from "next-mdx-remote-client/rsc";
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-neutral-600" aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        {" › "}
        <Link href={`/${article.product}`}>Xoài Tứ Quý</Link>
        {" › "}
        <Link href={`/${article.product}/${article.type}`}>
          {article.type === "kien-thuc" ? "Kiến thức" : "Tin tức"}
        </Link>
        {" › "}
        <span className="text-neutral-900">{fm.title}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{fm.title}</h1>
        <p className="mt-3 text-sm text-neutral-600">
          Đăng ngày{" "}
          {new Date(fm.publishedAt).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </header>

      <div
        id="article-body"
        className="prose prose-neutral max-w-none prose-headings:scroll-mt-20"
      >
        <MDXRemote source={article.body} />
      </div>

      {/* FAQ render (also covered by FAQPage schema) */}
      {fm.faq && fm.faq.length > 0 && (
        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold">Câu hỏi thường gặp</h2>
          <dl className="mt-4 space-y-4">
            {fm.faq.map((qa, i) => (
              <div key={i}>
                <dt className="font-semibold">{qa.q}</dt>
                <dd className="mt-1 text-neutral-700">{qa.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Price ticker — shown on price-sensitive pillars (gia-thi-truong)
          and all tin-tuc articles. Reads Supabase price_history with 5m ISR. */}
      {(article.type === "tin-tuc" || article.frontmatter.pillar === "gia-thi-truong") && (
        <PriceTickerFooter />
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold">Bài liên quan</h2>
          <ul className="mt-4 space-y-3">
            {related.map((r) => (
              <li key={r.urlPath}>
                <Link
                  href={r.urlPath}
                  className="text-emerald-700 hover:underline"
                >
                  {r.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
