"use client";

import { useState, useEffect, useCallback, type KeyboardEvent } from "react";
import Image from "next/image";

/**
 * Auto-rotating image carousel with crossfade + dot indicators.
 * Reusable across all sections.
 *
 * Keyboard nav: ArrowLeft/Right cycle prev/next; Home/End jump to first/last.
 * Auto-rotate pauses on focus or mouse hover (WCAG 2.1.2 Pause, Stop, Hide).
 */
export function ImageCarousel({
  images,
  interval = 4000,
  height = "h-[250px] sm:h-[350px]",
  className = "",
  label = "Thư viện ảnh",
}: {
  images: { src: string; alt: string }[];
  interval?: number;
  height?: string;
  className?: string;
  label?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i: number) => {
      const n = images.length;
      setCurrent(((i % n) + n) % n);
    },
    [images.length]
  );

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const t = setInterval(() => goTo(current + 1), interval);
    return () => clearInterval(t);
  }, [current, interval, images.length, paused, goTo]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(current - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(current + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(images.length - 1);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`relative overflow-hidden rounded-3xl ${height} ${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-2`}
    >
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          aria-hidden={i !== current}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label={`${label} — điều khiển`}
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ảnh ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
