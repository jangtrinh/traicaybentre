/**
 * PriceTickerFooter — displays latest mango wholesale prices from Supabase
 * `price_history` table. Shown at the bottom of article pages.
 *
 * MANDATORY disclaimer per marketing plan: "Giá tham khảo, gọi vựa để có báo
 * giá chính xác theo số lượng."
 *
 * Data source: `crawl-prices` cron populates Supabase daily at 05:30 Asia/Saigon.
 * Graceful degradation: if no rows or query fails, renders the disclaimer alone.
 */
import "server-only";
import { supabasePublic } from "@/lib/supabase-public";

type PriceRow = {
  variety: string;
  quality_grade: string | null;
  price_vnd_per_kg: number;
  market_type: string | null;
  region: string | null;
  is_stale: boolean;
  crawled_at: string;
};

async function getLatestPrices(): Promise<PriceRow[]> {
  try {
    const { data, error } = await supabasePublic
      .from("price_history")
      .select("variety, quality_grade, price_vnd_per_kg, market_type, region, is_stale, crawled_at")
      .order("crawled_at", { ascending: false })
      .limit(8);
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

function formatVnd(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value) + "₫";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export async function PriceTickerFooter() {
  const rows = await getLatestPrices();
  const hasPrices = rows.length > 0;
  const latestDate = hasPrices ? formatDate(rows[0].crawled_at) : "";
  const isStale = hasPrices && rows[0].is_stale;

  return (
    <aside className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm">
      <header className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="font-semibold text-neutral-900">Giá tham khảo thị trường</h3>
        {hasPrices && (
          <span className="text-xs text-neutral-500">
            Cập nhật: {latestDate}
            {isStale && " (dữ liệu phiên trước)"}
          </span>
        )}
      </header>

      {hasPrices ? (
        <ul className="grid gap-1 sm:grid-cols-2">
          {rows.map((r, idx) => (
            <li
              key={`${r.variety}-${r.quality_grade}-${idx}`}
              className="flex items-baseline justify-between gap-2 py-1"
            >
              <span className="text-neutral-700">
                {r.variety}
                {r.quality_grade && ` — ${r.quality_grade}`}
                {r.market_type && <span className="text-neutral-400"> ({r.market_type})</span>}
              </span>
              <span className="font-semibold text-neutral-900">
                {formatVnd(r.price_vnd_per_kg)}/kg
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-neutral-500">
          Giá cập nhật hằng ngày từ chợ đầu mối và vựa sỉ.
        </p>
      )}

      <p className="mt-4 border-t border-neutral-200 pt-3 text-xs text-neutral-600">
        💬 Đây chỉ là <strong>giá tham khảo</strong> theo thị trường chung. Để nhận
        báo giá chính xác theo số lượng và loại cụ thể, vui lòng{" "}
        <strong>gọi vựa</strong> trực tiếp — tụi mình sẽ báo giá theo từng đơn hàng nha.
      </p>
    </aside>
  );
}
