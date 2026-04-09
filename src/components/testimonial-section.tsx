"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "./fade-in";
import { TESTIMONIALS } from "@/lib/landing-data";

export function TestimonialSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % TESTIMONIALS.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="bg-brand px-5 py-24">
      <div className="mx-auto max-w-[800px] text-center">
        <FadeIn>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
            Bạn hàng nói vầy
          </span>
        </FadeIn>

        <div className="relative mt-12 min-h-[220px]" aria-live="polite" aria-atomic="true">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                i === active
                  ? "relative opacity-100 translate-y-0"
                  : "absolute inset-0 opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              <p className="font-heading text-2xl font-medium italic leading-relaxed text-text sm:text-3xl">
                &ldquo;{item.text}&rdquo;
              </p>
              <p className="mt-6 text-base font-bold text-text">{item.name}</p>
              <p className="mt-1 text-sm text-text/50">{item.detail}</p>
              <p className="mt-0.5 text-xs text-text/30">{item.since}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Xem nhận xét ${i + 1} trên ${TESTIMONIALS.length}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-text"
                  : "w-2.5 bg-text/20 hover:bg-text/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
