/**
 * Dynamic article route — renders MDX articles from `src/content/articles/`.
 *
 * URL pattern: `/{product}/{type}/{slug}` (e.g. `/xoai-tu-quy/kien-thuc/xoai-tu-quy-la-gi`)
 *
 * Format: reuses `<ArticleLayout>` — same chrome as legacy
 * `/tin-tuc/7-mon-ngon-tu-xoai-tu-quy` (brand hero + brand-cream body + footer
 * internal links). Single source of truth for article page format.
 *
 * Visibility: gated by `uxReviewed: true` AND `publishedAt <= now()` in the loader.
 * Static generation: `generateStaticParams` pre-renders all UX-reviewed articles
 * (including future-scheduled); runtime `getArticleByUrlPath()` returns null for
 * unpublished → `notFound()` → ISR rebuilds when publishedAt elapses.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import { ArticleLayout } from "@/components/article-layout";
import { PriceTickerFooter } from "@/components/price-ticker-footer";
import {
  getArticleByUrlPath,
  getArticleByUrlPathIncludingScheduled,
  getAllArticleParamsForBuild,
  getRelatedArticles,
  localizePillar,
  type ArticleType,
} from "@/lib/articles";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  SITE_URL,
} from "@/lib/structured-data";

type RouteParams = { product: string; type: string; slug: string };
type Props = { params: Promise<RouteParams> };

export const dynamicParams = false; // 404 anything outside generateStaticParams
export const revalidate = 60;        // ISR — re-check publishedAt gate every 60s

const VALID_TYPES: ArticleType[] = ["kien-thuc", "tin-tuc"];

function isValidType(t: string): t is ArticleType {
  return VALID_TYPES.includes(t as ArticleType);
}

function buildCategory(type: ArticleType, pillar: string | undefined): string {
  const typeLabel = type === "kien-thuc" ? "Kiến thức" : "Tin tức";
  const pillarLabel = localizePillar(pillar);
  return pillarLabel ? `${typeLabel} — ${pillarLabel}` : typeLabel;
}

function formatPublishDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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
  const article = getArticleByUrlPathIncludingScheduled(`/${product}/${type}/${slug}`);
  if (!article) return {};

  const fm = article.frontmatter;
  const canonical = `${SITE_URL}${article.urlPath}`;
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

export default async function ArticlePage({ params }: Props) {
  const { product, type, slug } = await params;
  if (!isValidType(type)) notFound();

  const article = getArticleByUrlPath(`/${product}/${type}/${slug}`);
  if (!article) notFound();

  const related = getRelatedArticles(article.product, article.type, article.slug, 3);
  const fm = article.frontmatter;
  const canonical = `${SITE_URL}${article.urlPath}`;
  const hubHref = article.type === "kien-thuc" ? "/kien-thuc" : "/tin-tuc";
  const hubLabel = article.type === "kien-thuc" ? "Kiến thức" : "Tin tức";
  // Product-aware hero fallback: dừa articles → dừa image, xoài → xoài image
  const defaultHero = article.product === "dua-xiem-ben-tre"
    ? "/images/dua/dua-xiem-so-goc-goi-san-hang-loat.jpg"
    : "/images/xoai-real-2.jpg";
  const heroImageSrc = fm.ogImage ?? defaultHero;

  const articleJsonLd = getArticleJsonLd({
    title: fm.title,
    description: fm.metaDescription,
    url: canonical,
    datePublished: fm.publishedAt,
    dateModified: fm.publishedAt,
    image: fm.ogImage ? `${SITE_URL}${fm.ogImage}` : undefined,
  });

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: SITE_URL },
    { name: hubLabel, url: `${SITE_URL}${hubHref}` },
    { name: fm.title, url: canonical },
  ]);

  const faqJsonLd =
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

  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: canonical,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#aeo-answer", "blockquote"],
    },
  };

  const jsonLd = [articleJsonLd, breadcrumbJsonLd, speakableJsonLd, faqJsonLd]
    .filter((s): s is NonNullable<typeof s> => s !== null);

  const showPriceTicker =
    article.type === "tin-tuc" || fm.pillar === "gia-thi-truong";

  return (
    <ArticleLayout
      category={buildCategory(article.type, fm.pillar)}
      title={fm.title}
      subtitle={fm.metaDescription}
      publishDate={formatPublishDate(fm.publishedAt)}
      heroImage={{ src: heroImageSrc, alt: fm.title }}
      jsonLd={jsonLd}
    >
      <MDXRemote
        source={article.body}
        options={{
          mdxOptions: { remarkPlugins: [remarkGfm] },
        }}
      />

      {/* FAQ render (also covered by FAQPage schema) */}
      {fm.faq && fm.faq.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2>Câu hỏi thường gặp</h2>
          <dl className="mt-4 space-y-4">
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

      {/* Price ticker — price-sensitive pillars + all tin-tuc */}
      {showPriceTicker && <PriceTickerFooter />}

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2>Bài liên quan</h2>
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
      <p className="mt-10 border-t border-border pt-6">
        <Link href={hubHref}>← Xem tất cả bài {hubLabel.toLowerCase()}</Link>
      </p>
    </ArticleLayout>
  );
}
