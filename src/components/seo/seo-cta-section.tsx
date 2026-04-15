/**
 * Shared CTA section for SEO landing pages — Zalo + phone buttons.
 * Reused by pricing-page-content and order-page-content.
 */
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/fade-in";

export function SeoCTASection({
  title,
  desc,
  zaloLabel,
  zaloLink,
  bgClass = "bg-brand",
}: {
  title: string;
  desc: string;
  zaloLabel: string;
  zaloLink: string;
  bgClass?: string;
}) {
  return (
    <section className={`${bgClass} px-5 py-20`}>
      <div className="mx-auto max-w-[600px] text-center">
        <FadeIn>
          <h2 className="font-heading text-2xl font-bold text-text">{title}</h2>
          <p className="mt-2 text-sm text-text/60">{desc}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
            >
              {zaloLabel}
            </a>
            <a
              href="tel:0932585533"
              className="flex items-center gap-2 rounded-full border-2 border-text/20 px-6 py-4 text-sm font-bold text-text hover:border-text transition-colors"
            >
              <Phone size={18} weight="bold" />
              0932 585 533
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
