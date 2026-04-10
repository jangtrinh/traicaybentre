"use client";

/* === Article Table of Contents ===
 * Sticky sidebar on desktop showing H2 anchors from the article body.
 * Uses IntersectionObserver to highlight the currently-visible section.
 * Auto-hidden on mobile (where space is tight).
 */

import { useEffect, useState } from "react";
import { ListBullets } from "@phosphor-icons/react/dist/ssr";

type TocItem = { id: string; text: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function ArticleToc() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = document.querySelector(".article-prose");
    if (!root) return;

    // Collect H2s and ensure each has an id we can scroll to
    const h2s = Array.from(root.querySelectorAll("h2"));
    const list: TocItem[] = h2s.map((h, i) => {
      let id = h.id;
      if (!id) {
        id = `${slugify(h.textContent || `section-${i}`)}-${i}`;
        h.id = id;
      }
      // Add some scroll-margin so the heading doesn't hide under fixed header
      (h as HTMLElement).style.scrollMarginTop = "120px";
      return { id, text: h.textContent || `Phần ${i + 1}` };
    });
    setItems(list);

    if (list.length === 0) return;

    // Observe scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );
    h2s.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length < 2) return null;

  return (
    <aside
      aria-label="Mục lục bài viết"
      className="hidden xl:block xl:fixed xl:top-32 xl:right-[max(1.5rem,calc((100vw-720px)/2-280px))] xl:w-[240px] xl:max-h-[70vh] xl:overflow-y-auto"
    >
      <div className="rounded-2xl border border-text/10 bg-white/85 p-5 shadow-sm backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-text/50">
          <ListBullets size={14} weight="bold" />
          Mục lục
        </div>
        <ol className="space-y-1.5 text-sm">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-lg px-2 py-1.5 leading-snug transition-colors ${
                  activeId === item.id
                    ? "bg-mango/15 font-semibold text-mango-dark"
                    : "text-text/65 hover:bg-text/5 hover:text-text"
                }`}
              >
                <span className="mr-1 font-mono text-xs text-text/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
