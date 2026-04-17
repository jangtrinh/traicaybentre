"use client";

import { useState, useRef } from "react";
import { ChatCircleDots, Phone, MapPin, Lightbulb, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { FadeIn } from "./fade-in";
import { useTranslations } from "next-intl";
import type { Icon } from "@phosphor-icons/react";

const CONTACT_ICONS: Icon[] = [ChatCircleDots, Phone, MapPin];
const CONTACT_KEYS = ["zalo", "phone", "address"] as const;

export function ContactSection() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");
  const customerTypes = t.raw("formTypes") as string[];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formLoadTime = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !customerType) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, customerType, note, website: honeypot, _t: formLoadTime.current }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Có trục trặc nhỏ");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : t("formErrorDefault"),
      );
    }
  };

  return (
    <section id="contact" className="bg-brand px-5 py-24">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              {t("sectionTag")}
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
              {t("sectionTitle")}
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact info */}
          <FadeIn delay={0.08}>
            <div>
              {CONTACT_KEYS.map((key, i) => {
                const ContactIcon = CONTACT_ICONS[i];
                return (
                  <div key={key} className="mb-8 flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-text/8">
                      <ContactIcon size={24} weight="duotone" className="text-text/70" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-text/40">
                        {t(`${key}Label`)}
                      </div>
                      <div className="mt-1 text-xl font-bold text-text">
                        {t(`${key}Value`)}
                      </div>
                      <div className="mt-0.5 text-sm text-text/40">{t(`${key}Sub`)}</div>
                    </div>
                  </div>
                );
              })}

              <div className="mt-4 rounded-2xl bg-brand-cream/80 p-6">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-text/70">
                  <Lightbulb size={16} weight="fill" />
                  {t("tipTitle")}
                </p>
                <p className="text-sm leading-relaxed text-text/50">
                  {t("tipDesc")}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.16}>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-cream/80 p-8 shadow-lg min-h-[400px] text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle size={48} weight="fill" className="text-green-600" />
                </div>
                <h3 className="mb-2 font-heading text-2xl font-bold text-text">
                  {t("formSuccessTitle")}
                </h3>
                <p className="mb-1 text-text/60">
                  {t("formSuccessMsg", { name })}
                </p>
                <p className="text-text/60">
                  {t("formSuccessCallback", { phone })}
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setName("");
                    setPhone("");
                    setCustomerType("");
                    setNote("");
                    setHoneypot("");
                    formLoadTime.current = Date.now();
                  }}
                  className="mt-6 rounded-full border-2 border-text/15 px-6 py-2.5 text-sm font-semibold text-text/60 hover:border-text hover:text-text transition-colors"
                >
                  {t("formSuccessReset")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl bg-brand-cream/80 p-8 shadow-lg">
                {/* Honeypot — invisible to humans, bots auto-fill */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                    {t("formName")} <span className="text-red-500">{tCommon("required")}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("formNamePlaceholder")}
                    className="w-full border-b-2 border-text/15 bg-transparent py-3 text-base text-text outline-none placeholder:text-text/25 focus-visible:border-mango focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                    {t("formPhone")} <span className="text-red-500">{tCommon("required")}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("formPhonePlaceholder")}
                    className="w-full border-b-2 border-text/15 bg-transparent py-3 text-base text-text outline-none placeholder:text-text/25 focus-visible:border-mango focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                    {t("formType")} <span className="text-red-500">{tCommon("required")}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {customerTypes.map((opt) => (
                      <label
                        key={opt}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
                          customerType === opt
                            ? "border-text bg-text text-white"
                            : "border-text/15 text-text/60 hover:border-text/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="customerType"
                          value={opt}
                          checked={customerType === opt}
                          onChange={(e) => setCustomerType(e.target.value)}
                          className="hidden"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                    {t("formNote")}
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t("formNotePlaceholder")}
                    rows={3}
                    className="w-full resize-none border-b-2 border-text/15 bg-transparent py-3 font-[inherit] text-base text-text outline-none placeholder:text-text/25 focus-visible:border-mango focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                  />
                </div>

                {status === "error" && (
                  <p className="mb-4 text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending" || !name || !phone || !customerType}
                  className="w-full rounded-full bg-black py-4 text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <CircleNotch size={18} className="animate-spin" />
                      {t("formSending")}
                    </>
                  ) : (
                    t("formSubmit")
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
