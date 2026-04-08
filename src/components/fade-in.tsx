"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const skipAnimation = prefersReducedMotion || visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: skipAnimation ? 1 : 0,
        transform: skipAnimation ? "translateY(0)" : "translateY(24px)",
        transition: prefersReducedMotion
          ? "none"
          : `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
