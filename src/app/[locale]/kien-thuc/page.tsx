import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { KNOWLEDGE_ARTICLES } from "@/lib/knowledge-data";
import { getAllPublishedArticles } from "@/lib/articles";
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

// ISR — refresh hub every 5 min so newly-published MDX articles appear
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kienThucPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    keywords: t.raw("metaKeywords") as string[],
    alternates: { canonical: `${SITE_URL}/kien-thuc` },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDesc"),
      url: `${SITE_URL}/kien-thuc`,
    },
  };
}

export default async function KienThucIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "kienThucPage" });
  const tKnowledge = await getTranslations({ locale, namespace: "knowledgeData" });
  const tArticleMeta = await getTranslations({ locale, namespace: "articleMeta" });

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: t("breadcrumbHome"), url: SITE_URL },
    { name: t("breadcrumbCurrent"), url: `${SITE_URL}/kien-thuc` },
  ]);

  // Merge legacy knowledge articles with new MDX articles
  function getHubItems() {
    const legacy = KNOWLEDGE_ARTICLES.map((a) => {
      // Try to get translated title/description/category; fall back to source data
      let title = a.title;
      let description = a.description;
      let category = a.category;
      try {
        title = tKnowledge(`articles.${a.slug}.title`);
        description = tKnowledge(`articles.${a.slug}.description`);
        category = tKnowledge(`articles.${a.slug}.category`);
      } catch {
        // slug not in translations — use original data
      }
      return {
        href: `/kien-thuc/${a.slug}`,
        title,
        description,
        date: a.date,
        category,
      };
    });

    // MDX articles have Vietnamese-only frontmatter; only include them on the vi locale.
    // Other locales show the translated static articles only until MDX i18n is added.
    const mdx =
      locale === "vi"
        ? getAllPublishedArticles("kien-thuc").map((a) => {
            let category = t("defaultCategory");
            if (a.frontmatter.pillar) {
              try {
                category = tArticleMeta(`pillarLabels.${a.frontmatter.pillar}`);
              } catch {
                // unknown pillar — use default
              }
            }
            return {
              href: a.urlPath,
              title: a.frontmatter.title,
              description: a.frontmatter.metaDescription,
              date: a.frontmatter.publishedAt.slice(0, 10),
              category,
            };
          })
        : [];

    // Newest first — both sources use ISO-like date strings
    return [...legacy, ...mdx].sort((a, b) => b.date.localeCompare(a.date));
  }

  const items = getHubItems();
  const exploreLinks = t.raw("exploreLinks") as { label: string; href: string }[];

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
              {t("heroEyebrow")}
            </span>
            <h1 className="mt-3 font-heading text-[36px] font-bold uppercase leading-tight text-text sm:text-5xl">
              {t("heroTitle1")}
              <br />
              <span className="text-mango">{t("heroTitle2")}</span>
            </h1>
            <p className="mt-6 text-lg leading-7 text-text/60">
              {t("heroDesc")}
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Article grid */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((article, i) => (
              <FadeIn key={article.href} delay={Math.min(i, 12) * 0.04}>
                <a
                  href={article.href}
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
                      {t("readMore")}
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
            {t("exploreMore")}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {exploreLinks.map((link) => (
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
