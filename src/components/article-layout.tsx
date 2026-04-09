/* === Reusable layout for SEO articles (kien-thuc, tin-tuc) ===
 * Provides consistent structure: hero + prose container + footer.
 * Use for all knowledge/blog articles to keep DRY.
 */

import Image from "next/image";
import { Header } from "./header";
import { Footer } from "./footer";
import { SectionDivider } from "./section-divider";
import { FadeIn } from "./fade-in";

interface ArticleLayoutProps {
  category: string;
  title: string;
  subtitle?: string;
  publishDate: string;
  heroImage: { src: string; alt: string };
  jsonLd: object[];
  children: React.ReactNode;
}

export function ArticleLayout({
  category,
  title,
  subtitle,
  publishDate,
  heroImage,
  jsonLd,
  children,
}: ArticleLayoutProps) {
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

      {/* Article hero */}
      <article className="bg-brand pt-28 pb-16">
        <div className="mx-auto max-w-[820px] px-5">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              {category}
            </span>
            <h1 className="mt-3 font-heading text-[32px] font-bold uppercase leading-tight text-text sm:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg leading-7 text-text/60">{subtitle}</p>
            )}
            <p className="mt-4 text-sm text-text/40">Cập nhật: {publishDate}</p>
          </FadeIn>
        </div>

        {/* Hero image */}
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-[1100px] px-5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
            </div>
          </div>
        </FadeIn>
      </article>

      <SectionDivider from="brand" to="brand-cream" />

      {/* Article body */}
      <section className="bg-brand-cream px-5 py-20">
        <div className="mx-auto max-w-[760px] [&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:leading-tight [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-text [&_h3]:mb-3 [&_p]:mb-4 [&_p]:text-base [&_p]:leading-7 [&_p]:text-text/75 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-text/75 [&_li]:leading-7 [&_strong]:text-text [&_strong]:font-semibold [&_a]:text-mango [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-mango-dark">
          {children}
        </div>
      </section>

      <SectionDivider from="brand-cream" to="brand" />

      {/* Internal links footer */}
      <section className="bg-brand px-5 py-16">
        <div className="mx-auto max-w-[820px]">
          <h3 className="mb-6 text-center font-heading text-2xl font-bold uppercase text-text">
            Khám phá thêm
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Xoài Tứ Quý — Sản phẩm", href: "/xoai-tu-quy" },
              { label: "Giá xoài hôm nay", href: "/gia-xoai-hom-nay" },
              { label: "Nguồn gốc & chứng nhận", href: "/nguon-goc" },
              { label: "Tin tức & báo giá", href: "/tin-tuc" },
              { label: "Liên hệ đặt sỉ", href: "/#contact" },
            ].map((link) => (
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
