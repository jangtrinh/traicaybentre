import Image from "next/image";
import { Waves, Bag, Snowflake, Truck } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./fade-in";
import { PROCESS_STEPS } from "@/lib/landing-data";
import { getTranslations } from "next-intl/server";

type StepTranslation = { title: string; desc: string };
const STEP_ICONS = [Waves, Bag, Snowflake, Truck];

export async function ProcessSection() {
  const t = await getTranslations("process");
  const tData = await getTranslations();
  const steps = tData.raw("data.processSteps") as StepTranslation[];

  return (
    <section id="process" className="bg-brand px-5 py-24">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn>
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              {t("sectionTag")}
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
              {t("sectionTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-text/60">
              {t("sectionDesc")}
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <FadeIn key={i} delay={i * 0.08} className="flex">
                <div className="relative flex flex-1 flex-col rounded-3xl bg-white p-8 text-center shadow-md">
                  <span className="absolute top-4 left-5 font-heading text-3xl font-extrabold text-brand/40">
                    {step.num}
                  </span>
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand">
                      <Icon size={30} weight="duotone" className="text-text" />
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-bold uppercase text-text">
                    {steps[i]?.title ?? step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text/60">
                    {steps[i]?.desc ?? step.desc}
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
