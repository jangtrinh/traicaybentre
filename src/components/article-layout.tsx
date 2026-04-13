/* === Reusable editorial layout for SEO articles (kien-thuc, tin-tuc, MDX) ===
 * Immersive hero + centered reading column + rich typography + footer links.
 * Used by ALL articles — legacy page.tsx + new MDX [product]/[type]/[slug].
 * Props contract is STABLE — do not break without migrating all callers.
 */

import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Clock,
  CalendarBlank,
  Compass,
  Storefront,
  Certificate,
  Phone,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import { Header } from "./header";
import { Footer } from "./footer";
import { FadeIn } from "./fade-in";
import { ShareButtons } from "./share-buttons";
import { ArticleToc } from "./article-toc";

interface ArticleLayoutProps {
  category: string;
  title: string;
  subtitle?: string;
  publishDate: string;
  heroImage: { src: string; alt: string };
  jsonLd: object[];
  /** Optional reading time in minutes; defaults to "5 phút đọc" */
  readingTime?: number;
  children: React.ReactNode;
}

// href and Icon are not translatable — labels/subs come from messages.articleLayout.exploreLinks
const EXPLORE_LINK_META = [
  { href: "/xoai-tu-quy", Icon: Storefront },
  { href: "/dua-xiem-ben-tre", Icon: Storefront },
  { href: "/nguon-goc", Icon: Certificate },
  { href: "/tin-tuc", Icon: Newspaper },
  { href: "/#contact", Icon: Phone },
];

export async function ArticleLayout({
  category,
  title,
  subtitle,
  publishDate,
  heroImage,
  jsonLd,
  readingTime = 5,
  children,
}: ArticleLayoutProps) {
  const t = await getTranslations("articleLayout");
  type ExploreLink = { label: string; sub: string };
  const exploreLinks = t.raw("exploreLinks") as ExploreLink[];
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Header />

      {/* === Immersive hero — full-bleed image with gradient overlay ===
          Use brand-cream pt zone so the fixed Header (transparent, dark text)
          stays readable above the dark image. Header on cream → visible. */}
      <article className="relative bg-brand-cream pt-28">
        <div className="relative h-[62vh] min-h-[520px] w-full overflow-hidden">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay for legibility */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/85"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-cream"
          />

          {/* Hero content */}
          <div className="relative z-10 flex h-full items-end pb-20">
            <div className="mx-auto w-full max-w-[1100px] px-5">
              <FadeIn>
                <Link
                  href="/tin-tuc"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md transition hover:border-mango hover:bg-mango/20"
                >
                  <Newspaper size={14} weight="fill" />
                  {category}
                </Link>
                <h1 className="mt-6 max-w-4xl font-heading text-[34px] font-bold leading-[1.08] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
                    {subtitle}
                  </p>
                )}
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarBlank size={16} weight="regular" />
                    {t("updatedLabel")} {publishDate}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={16} weight="regular" />
                    {t("readingTime", { n: readingTime })}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />
                  <span className="font-semibold text-mango">{t("brandLabel")}</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </article>

      {/* === Article body — editorial reading column with sticky TOC === */}
      <section className="relative bg-brand-cream px-5 pt-14 pb-20">
        <ArticleToc />
        <div className="mx-auto max-w-[720px]">
          <ShareButtons title={title} placement="top" />
          <div className="article-prose">{children}</div>
          <ShareButtons title={title} placement="bottom" />
        </div>
      </section>

      {/* === Explore footer — visual cards === */}
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-text/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-text/70">
              <Compass size={14} weight="fill" />
              {t("exploreBadge")}
            </span>
            <h3 className="mt-4 font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              {t("exploreTitle")}
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {EXPLORE_LINK_META.map(({ href, Icon }, idx) => {
              const linkData = exploreLinks[idx];
              return (
                <Link
                  key={href}
                  href={href}
                  className="group relative flex flex-col justify-between rounded-2xl border-2 border-text/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-mango hover:shadow-lg"
                >
                  <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mango/10 text-mango-dark transition-colors group-hover:bg-mango group-hover:text-white">
                    <Icon size={22} weight="duotone" />
                  </div>
                  <div>
                    <div className="font-heading text-base font-bold text-text">{linkData?.label}</div>
                    <div className="mt-0.5 text-xs text-text/55">{linkData?.sub}</div>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-mango-dark opacity-0 transition-opacity group-hover:opacity-100">
                      {t("viewNow")} <ArrowRight size={12} weight="bold" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
