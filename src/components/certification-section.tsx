import { Certificate, ShieldCheck, QrCode, Leaf } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./fade-in";
import { getTranslations } from "next-intl/server";
import type { Icon } from "@phosphor-icons/react";

const CERT_ICONS: Icon[] = [Certificate, Leaf, ShieldCheck, QrCode];
const CERT_KEYS = ["cddl", "ocop", "gap", "qr"] as const;

export async function CertificationSection() {
  const t = await getTranslations("certification");

  return (
    <section className="bg-brand-cream px-5 py-24">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <h2 className="mb-16 text-center font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
            {t("sectionTitle")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {CERT_KEYS.map((key, i) => {
            const CertIcon = CERT_ICONS[i];
            return (
              <FadeIn key={key} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand">
                    <CertIcon size={36} weight="duotone" className="text-text" />
                  </div>
                  <h3 className="font-heading text-base font-bold uppercase text-text">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-snug text-text/50">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
