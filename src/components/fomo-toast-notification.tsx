"use client";

import { useState, useEffect, useCallback } from "react";
import { ShoppingCart, X, MapPin } from "@phosphor-icons/react";
import { generateRandomOrder } from "@/lib/fomo-toast-data";

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
  const [notification, setNotification] = useState<OrderNotification | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const showToast = useCallback(() => {
    const order = generateRandomOrder();
    setNotification(order);
    setVisible(true);

    // Auto-hide after 5s
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, []);

  useEffect(() => {
    // Respect reduced motion preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Don't show if user permanently dismissed
    if (dismissed) return;

    // Initial delay: 8-15s
    const initialDelay = 8000 + Math.random() * 7000;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      showToast();

      // Recurring: every 20-40s
      intervalId = setInterval(() => {
        if (document.visibilityState === "visible") {
          showToast();
        }
      }, 20000 + Math.random() * 20000);
    }, initialDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
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
              vừa {notification.text} {emoji}
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
          aria-label="Đóng thông báo"
        >
          <X size={14} className="text-text-muted" />
        </button>
      </div>
    </div>
  );
}
