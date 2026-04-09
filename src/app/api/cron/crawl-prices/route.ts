/**
 * Cron: Crawl mango prices from public market sources.
 *
 * Triggered daily 05:30 Asia/Saigon → "30 22 * * *" UTC.
 *
 * Phase 1 sources (legal-safe, robots.txt friendly):
 *   - rauhoaquavietnam.vn (Hiệp hội rau quả VN — public price reports)
 *
 * Phase 2 (TODO): bachhoaxanh.com, chợ đầu mối Thủ Đức/Hóc Môn.
 *
 * Strategy: lightweight fetch + cheerio (no Playwright/Chromium to keep
 * Vercel function bundle small). If parse fails → mark previous day stale.
 *
 * Display rule: every UI surface MUST show disclaimer
 *   "Giá tham khảo, gọi vựa (0xxx) để có báo giá chính xác"
 */
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const USER_AGENT =
  "TraiCayBenTreBot/1.0 (+https://traicaybentre.com; price-reference; contact: hi@traicaybentre.com)";

type CrawlResult = {
  source: string;
  source_url: string;
  variety: string;
  region?: string;
  price_vnd_per_kg: number;
  quality_grade?: string;
  market_type?: string;
};

/**
 * Parse rauhoaquavietnam.vn — placeholder. Real selectors must be tuned
 * after first inspection. Returns empty array on any failure (caller marks stale).
 */
async function crawlRauHoaQuaVietnam(): Promise<CrawlResult[]> {
  const url = "https://rauhoaquavietnam.vn/";
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    // TODO: parse with cheerio after first inspection of HTML structure.
    // For MVP, return empty → marks stale → uses yesterday's price.
    return [];
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (authHeader !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const results = await crawlRauHoaQuaVietnam();

  if (results.length === 0) {
    // Fallback: mark today as stale by copying yesterday's prices forward
    const { data: yesterday } = await supabaseAdmin
      .from("price_history")
      .select("source, source_url, variety, region, price_vnd_per_kg, quality_grade, market_type")
      .order("crawled_at", { ascending: false })
      .limit(10);

    if (yesterday && yesterday.length > 0) {
      const stalePayload = yesterday.map((row) => ({
        ...row,
        is_stale: true,
        crawled_at: new Date().toISOString(),
      }));
      await supabaseAdmin.from("price_history").insert(stalePayload);
    }

    return NextResponse.json({
      status: "stale_fallback",
      reason: "no_fresh_data_from_sources",
      copied: yesterday?.length ?? 0,
    });
  }

  // Insert fresh prices
  const insertPayload = results.map((r) => ({ ...r, is_stale: false }));
  const { error } = await supabaseAdmin.from("price_history").insert(insertPayload);

  if (error) {
    return NextResponse.json(
      { status: "db_error", error: error.message },
      { status: 500 }
    );
  }

  revalidateTag("prices", "max");

  return NextResponse.json({
    status: "ok",
    inserted: results.length,
  });
}
