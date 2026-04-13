"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ShoppingCart, X, MapPin } from "@phosphor-icons/react";
import { generateRandomOrder, type FomoTranslations } from "@/lib/fomo-toast-data";

/**
 * FOMO toast — shows fake "someone just ordered" notifications
 * at bottom-left to create urgency and social proof.
 *
 * Behavior:
 * - First toast after 8-15s delay (let user settle in)
 * - Subsequent toasts every 20-40s (randomized)
 * - Each toast visible for 5s then slides out
 * - Dismissable via X button
 * - Pauses when tab is hidden (no wasted cycles)
 * - Respects prefers-reduced-motion
 */

type OrderNotification = {
  name: string;
  city: string;
  text: string;
  timeAgo: string;
  product: string;
};

/** Product slug → emoji for visual hint */
const PRODUCT_EMOJI: Record<string, string> = {
  "xoai-tu-quy": "🥭",
  "xoai-hoang-kim": "🥭",
  "dua-xiem-ben-tre": "🥥",
};

export default function FomoToastNotification() {
  const t = useTranslations("fomo");
  const [notification, setNotification] = useState<OrderNotification | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const fomoTranslations = useMemo<FomoTranslations>(() => ({
    timeAgo: t.raw("timeAgo") as string[],
    orderTemplates: t.raw("orderTemplates") as Record<string, string[]>,
  }), [t]);

  /** onDone called after toast finishes its display cycle */
  const showToast = useCallback((onDone?: () => void) => {
    const order = generateRandomOrder(fomoTranslations);
    setNotification(order);
    setVisible(true);

    // Show for 3s, then hide (0.5s animation), then signal done
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDone?.(), 500);
    }, 3000);
  }, []);

  useEffect(() => {
    // Respect reduced motion preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Don't show if user permanently dismissed
    if (dismissed) return;

    // Chain: show toast → wait for it to finish → random pause → next toast
    let timerId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function scheduleNext() {
      // Random pause between toasts: 3-5s
      const pause = 3000 + Math.random() * 2000;
      timerId = setTimeout(() => {
        if (cancelled) return;
        if (document.visibilityState === "visible") {
          showToast(() => { if (!cancelled) scheduleNext(); });
        } else {
          // Tab hidden — retry after pause
          scheduleNext();
        }
      }, pause);
    }

    // First toast after 3-5s
    scheduleNext();

    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [showToast, dismissed]);

  if (!notification || dismissed) return null;

  const emoji = PRODUCT_EMOJI[notification.product] || "🛒";

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-sm transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="bg-surface rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-border p-4 flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
          <ShoppingCart size={20} weight="duotone" className="text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text leading-snug">
            {notification.name}{" "}
            <span className="font-normal text-text-secondary">
              {notification.text} {emoji}
            </span>
          </p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={12} weight="fill" className="text-text-muted flex-shrink-0" />
            <span className="text-xs text-text-muted">
              {notification.city} · {notification.timeAgo}
            </span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1 rounded-full hover:bg-primary-light transition-colors"
          aria-label="Close"
        >
          <X size={14} className="text-text-muted" />
        </button>
      </div>
    </div>
  );
}
