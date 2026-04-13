"use client";

import { FadeIn } from "./fade-in";
import { CALENDAR } from "@/lib/landing-data";
import { useTranslations } from "next-intl";

/* Dynamic current month — updates in browser */
const CURRENT_MONTH = new Date().getMonth();

type CalendarTranslation = { name: string };

export function CalendarSection() {
  const t = useTranslations("calendar");
  const tData = useTranslations();
  const months = t.raw("months") as string[];
  const calendarNames = tData.raw("data.calendar") as CalendarTranslation[];

  return (
    <section className="bg-brand-cream px-5 py-24">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
              {t("sectionTitle")}
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              {t("sectionDesc")}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="overflow-x-auto rounded-3xl border border-border bg-surface shadow-sm scrollbar-thin">
            <div className="min-w-[540px] sm:min-w-[700px]">
              {/* Header */}
              <div className="grid grid-cols-[100px_repeat(12,1fr)] sm:grid-cols-[150px_repeat(12,1fr)] border-b border-border bg-bg">
                <div className="px-2 sm:px-4 py-3 text-xs font-bold text-text-muted">
                  {t("typeLabel")}
                </div>
                {months.map((m, i) => (
                  <div
                    key={i}
                    className={`py-3 text-center text-xs ${
                      i === CURRENT_MONTH
                        ? "font-extrabold text-mango bg-mango/5"
                        : "font-medium text-text-muted"
                    }`}
                  >
                    {m}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {CALENDAR.map((item, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-[100px_repeat(12,1fr)] sm:grid-cols-[150px_repeat(12,1fr)] items-center ${
                    idx < CALENDAR.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="px-2 sm:px-4 py-3 text-xs font-semibold text-text leading-tight">
                    {calendarNames[idx]?.name ?? item.name}
                  </div>
                  {item.months.map((v, mi) => (
                    <div
                      key={mi}
                      className={`flex justify-center px-0.5 py-3 ${
                        mi === CURRENT_MONTH ? "bg-mango/3" : ""
                      }`}
                    >
                      {v > 0 && (
                        <div
                          className={`h-2 min-w-1.5 max-w-9 w-full rounded-full ${
                            v === 2
                              ? "bg-gradient-to-r from-mango to-mango-dark"
                              : "bg-gradient-to-r from-accent-light to-accent"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {/* Legend */}
              <div className="flex flex-wrap gap-5 border-t border-border bg-bg px-4 py-3">
                <span className="flex items-center gap-2 text-xs text-text-muted">
                  <span className="h-1.5 w-5 rounded-full bg-gradient-to-r from-mango to-mango-dark" />
                  {t("peakSeason")}
                </span>
                <span className="flex items-center gap-2 text-xs text-text-muted">
                  <span className="h-1.5 w-5 rounded-full bg-gradient-to-r from-accent-light to-accent" />
                  {t("earlySeason")}
                </span>
                <span className="text-xs font-semibold text-mango">
                  ▼ T{CURRENT_MONTH + 1} — {t("currentMonth")}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
