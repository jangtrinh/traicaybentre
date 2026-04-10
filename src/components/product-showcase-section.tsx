/**
 * Multi-product showcase on homepage — renders when ≥2 active products.
 * Auto-hidden when only 1 product active (YAGNI conditional render).
 */
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { getActiveProducts } from "@/lib/products";
import type { ProductEntry } from "@/content/products";
import { FadeIn } from "./fade-in";

function formatSeason(season: ProductEntry["season"]): string {
  if (season === "year-round") return "Quanh năm";
  return `Mùa: ${(season as number[]).map((m) => `T${m}`).join(", ")}`;
}

export function ProductShowcaseSection() {
  const products = getActiveProducts();
  if (products.length < 2) return null;

  return (
    <section className="bg-brand px-5 py-20">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Đặc sản Bến Tre
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-text sm:text-4xl">
              Các loại trái cây <span className="text-mango">từ vựa</span>
            </h2>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.08}>
              <Link
                href={`/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-text/5 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.heroImage}
                    alt={p.heroImageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-xl font-bold uppercase text-text">
                    {p.shortName}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-text/50">
                    <Clock size={12} weight="bold" />
                    {formatSeason(p.season)}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-text/60">{p.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-text group-hover:text-mango transition-colors">
                    Xem chi tiết
                    <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <Link
              href="/san-pham"
              className="text-sm font-semibold uppercase tracking-wider text-text/50 hover:text-text transition-colors"
            >
              Xem tất cả sản phẩm →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
