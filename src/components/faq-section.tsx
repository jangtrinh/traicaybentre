"use client";

import { useState } from "react";
import { FadeIn } from "./fade-in";
import { FAQS } from "@/lib/landing-data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-brand-cream px-5 py-24">
      <div className="mx-auto max-w-[680px]">
        <FadeIn>
          <h2 className="mb-12 text-center font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
            Câu hỏi thường gặp
          </h2>
        </FadeIn>

        {FAQS.map((faq, i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <div className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="pr-4 text-base font-semibold leading-snug text-text">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 text-lg text-mango transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                className={`overflow-hidden transition-all duration-400 ${
                  openIndex === i ? "max-h-64" : "max-h-0"
                }`}
              >
                <p className="pb-5 text-sm leading-relaxed text-text/60 sm:text-base sm:leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
