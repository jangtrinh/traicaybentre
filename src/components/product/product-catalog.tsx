/**
 * Product catalog grid — renders all products from the registry.
 *
 * Rules:
 *  - Active products → clickable `<Link>` to `/{slug}`
 *  - Coming-soon products → non-clickable `<div>` with "coming soon" badge (F12).
 *    NEVER link to a coming-soon product's route; those routes 404 by design.
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import type { ProductEntry } from "@/content/products";
import { FadeIn } from "@/components/fade-in";

type ProductCardProps = { product: ProductEntry; index: number };

function ProductCard({ product, index }: ProductCardProps) {
  const t = useTranslations("productCatalog");
  const isActive = product.status === "active";

  function formatSeason(season: ProductEntry["season"]): string {
    if (season === "year-round") return t("seasonYearRound");
    const months = season.map((m) => `T${m}`).join(", ");
    return t("seasonMonths", { months });
  }

  const seasonLabel = formatSeason(product.season);

  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.heroImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!isActive && (
          <div className="absolute top-4 left-4 rounded-full bg-text px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            {t("comingSoon")}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-heading text-2xl font-bold uppercase leading-tight text-text">
          {product.name}
        </h2>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-text/50">
          <Clock size={14} weight="bold" />
          {seasonLabel}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text/70">
          {product.tagline}
        </p>
        {isActive ? (
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-text group-hover:text-mango transition-colors">
            {t("viewDetail")}
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        ) : (
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-text/40">
            {t("preparingLabel")}
          </span>
        )}
      </div>
    </>
  );

  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl";

  return (
    <FadeIn delay={Math.min(index, 6) * 0.08}>
      {isActive ? (
        <Link href={`/${product.slug}`} className={cardClass}>
          {inner}
        </Link>
      ) : (
        <div
          className={`${cardClass} cursor-not-allowed opacity-80`}
          aria-disabled="true"
          title={t("comingSoon")}
        >
          {inner}
        </div>
      )}
    </FadeIn>
  );
}

export function ProductCatalog({ products }: { products: ProductEntry[] }) {
  const t = useTranslations("productCatalog");

  return (
    <section className="bg-brand-cream px-5 py-20">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              {t("sectionTag")}
            </span>
            <h1 className="mt-3 font-heading text-4xl font-bold uppercase leading-tight text-text sm:text-5xl">
              {t("title")}
              <br />
              <span className="text-mango">{t("titleHighlight")}</span>
            </h1>
            <p className="mt-6 mx-auto max-w-[640px] text-lg leading-7 text-text/60">
              {t("desc")}
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
