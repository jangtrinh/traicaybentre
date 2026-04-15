/* === Homepage knowledge hub — seeds internal links to long-tail articles ===
 * SEO crawl-budget fix: 102 MDX articles were "Discovered - not indexed" in GSC
 * because nothing linked to them from high-authority pages. This component lists
 * 12 pillar-diverse articles on the homepage so Googlebot follows links from
 * the highest-authority page (/) into the long-tail knowledge graph.
 *
 * Rendered between testimonials and FAQ on the homepage.
 */

import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./fade-in";
import { getHomepageFeaturedArticles, localizePillar } from "@/lib/articles";

export async function HomepageKnowledgeHub() {
  const articles = getHomepageFeaturedArticles(12);
  if (articles.length === 0) return null;

  return (
    <section
      id="kien-thuc-hub"
      className="bg-brand-cream px-5 py-20"
      aria-labelledby="homepage-knowledge-hub-title"
    >
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Kiến thức xoài Bến Tre
            </span>
            <h2
              id="homepage-knowledge-hub-title"
              className="mt-3 font-heading text-3xl font-bold uppercase text-text sm:text-4xl"
            >
              Khám phá kho kiến thức
            </h2>
            <p className="mt-3 text-sm text-text/60">
              Cách chọn, bảo quản, chế biến và so sánh xoài tứ quý với các giống
              khác — tuyển chọn từ nhà vườn Thạnh Phú, Bến Tre.
            </p>
          </div>
        </FadeIn>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <FadeIn key={a.urlPath} delay={i * 0.04}>
              <li>
                <Link
                  href={a.urlPath}
                  className="group flex h-full items-start gap-3 rounded-xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <BookOpen
                    size={20}
                    weight="duotone"
                    className="mt-0.5 shrink-0 text-mango-dark"
                  />
                  <div className="flex-1">
                    {a.frontmatter.pillar && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-mango-dark">
                        {localizePillar(a.frontmatter.pillar)}
                      </span>
                    )}
                    <p className="mt-0.5 text-sm font-semibold leading-snug text-text group-hover:text-mango">
                      {a.frontmatter.title}
                    </p>
                  </div>
                </Link>
              </li>
            </FadeIn>
          ))}
        </ul>

        <FadeIn>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/kien-thuc"
              className="inline-flex items-center gap-2 rounded-full bg-mango px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-mango-dark"
            >
              Xem tất cả kiến thức
              <ArrowRight size={16} weight="bold" />
            </Link>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 rounded-full border-2 border-mango bg-white px-6 py-3 text-sm font-bold text-mango-dark transition hover:-translate-y-0.5 hover:bg-mango/10"
            >
              Tin tức thị trường
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
