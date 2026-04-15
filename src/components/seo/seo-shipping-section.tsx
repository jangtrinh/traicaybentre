/**
 * Shared shipping routes section for SEO landing pages.
 * Reused by order-page-content (and potentially pricing-page-content).
 */
import Link from "next/link";
import { Truck, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/fade-in";

const SHIPPING_ROUTES = [
  { city: "TP.HCM", time: "24h", method: "Xe lạnh", href: "/giao-hang/tp-hcm" },
  { city: "Hà Nội", time: "48h", method: "Xe lạnh / Bay", href: "/giao-hang/ha-noi" },
  { city: "Đà Nẵng", time: "36h", method: "Xe lạnh", href: "/giao-hang/da-nang" },
];

export function SeoShippingSection({
  title,
  desc,
  viewDetailLabel,
}: {
  title: string;
  desc: string;
  viewDetailLabel: string;
}) {
  return (
    <section className="bg-brand px-5 py-20">
      <div className="mx-auto max-w-[1000px]">
        <FadeIn>
          <h2 className="mb-3 text-center font-heading text-3xl font-bold uppercase text-text">
            {title}
          </h2>
          <p className="mb-10 text-center text-sm text-text/50">{desc}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-3">
            {SHIPPING_ROUTES.map((route) => (
              <Link
                key={route.city}
                href={route.href}
                className="group rounded-2xl bg-text/5 p-6 text-center transition-all hover:-translate-y-1"
              >
                <Truck size={28} weight="duotone" className="mx-auto text-mango" />
                <div className="mt-3 font-heading text-2xl font-bold text-text">
                  {route.city}
                </div>
                <div className="mt-1 text-sm text-text/60">
                  {route.time} · {route.method}
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-text/50 group-hover:text-text transition-colors">
                  {viewDetailLabel}
                  <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
