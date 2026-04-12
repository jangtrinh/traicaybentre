"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MapPin, Clock, Drop, Leaf, Sparkle, Cookie, Basket, Gift } from "@phosphor-icons/react";
import { FadeIn } from "./fade-in";
import { PRODUCTS, type Product } from "@/lib/landing-data";
import type { Icon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

/* Map tag text → Phosphor icon */
const TAG_ICONS: Record<string, Icon> = {
  "Ngọt đậm": Drop,
  "Ít xơ": Leaf,
  "Vị mặn đặc trưng": Sparkle,
  "Giòn sần sật": Cookie,
  "Chua thanh": Drop,
  "Làm gỏi": Basket,
  "Có thiệp": Gift,
  "Đóng hộp đẹp": Gift,
  "Tặng được ngay": Sparkle,
};

function ProductCardCarousel({ images, name }: { images: string[]; name: string }) {
  const t = useTranslations("products");
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next, images.length]);

  if (images.length <= 1) {
    return (
      <Image
        src={images[0]}
        alt={name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    );
  }

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${name} — ảnh ${i + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-3 left-3 z-10 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); setCurrent(i); }}
            aria-label={t("viewImage")}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-4 bg-white/80" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const t = useTranslations("products");
  const [hovered, setHovered] = useState(false);
  const cardImages = product.images?.length ? product.images : [product.image];

  return (
    <FadeIn delay={index * 0.12}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`overflow-hidden rounded-3xl bg-white transition-all duration-300 ${
          hovered ? "-translate-y-2 shadow-xl" : "shadow-md"
        }`}
      >
        {/* Rotating photo carousel + sticker overlay */}
        <div className="relative h-64 overflow-hidden">
          <ProductCardCarousel images={cardImages} name={product.name} />
          {/* Sticker label — small, bottom right */}
          <Image
            src={product.sticker}
            alt=""
            width={72}
            height={72}
            className="absolute bottom-3 right-3 z-10 h-auto w-[72px] drop-shadow-lg"
          />
          <span
            className={`absolute top-4 left-4 z-10 rounded-full ${product.badgeColor} px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white`}
          >
            {product.badge}
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-heading text-2xl font-bold uppercase text-text">
            {product.name}
          </h3>
          <p className="mt-2 flex items-center gap-1 text-xs text-text-muted">
            <MapPin size={12} weight="fill" /> {product.farm}
          </p>

          {/* Tag pills with icons — gentle style */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => {
              const Icon = TAG_ICONS[tag] || Leaf;
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-text/10 bg-brand-cream px-2.5 py-1 text-xs font-medium text-text/70"
                >
                  <Icon size={12} weight="duotone" />
                  {tag}
                </span>
              );
            })}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-text-secondary">
            {product.desc}
          </p>

          {/* Price range — call for exact daily price */}
          <div className="mt-5 border-t border-border pt-5">
            <div className="font-heading text-3xl font-bold text-text">
              {product.priceSi}
              <span className="text-sm font-medium text-text-secondary">
                {t("priceUnit")}
              </span>
            </div>
            <p className="mt-1 text-xs text-text-muted">
              {t("priceNote")}
            </p>
          </div>

          {product.stockUntil && (
            <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-600">
              <Clock size={12} weight="bold" /> {t("priceUntil")}{" "}
              {product.stockUntil}
            </p>
          )}

          {/* Black CTA — jinzhenlian style */}
          <a
            href="#contact"
            className="mt-5 block w-full rounded-full bg-black py-4 text-center text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-text transition-colors"
          >
            {t("getQuote")}
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

export function ProductSection() {
  const t = useTranslations("products");

  return (
    <section id="products" className="bg-brand-cream px-5 py-24">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              {t("sectionTag")}
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
              {t("sectionTitle")} <span className="text-mango">{t("sectionHighlight")}</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
