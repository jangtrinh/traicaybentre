/**
 * Cron: Daily IndexNow ping with top-priority URLs.
 *
 * Triggered daily 01:15 Asia/Saigon → "15 18 * * *" UTC.
 *
 * Purpose: Bing/Yandex (and eventually Google) receive a fresh crawl signal
 * for the 20 highest-priority URLs every day. Keeps the "Last crawled" date
 * fresh even without organic crawl activity — helps escape the GSC
 * "Discovered - currently not indexed" trap for new domains.
 *
 * Strategy: pick URL set from the same source sitemap.ts uses (post-quality
 * filter), then batch POST to IndexNow. Max 20 URLs per day to stay well
 * under search-engine rate thresholds while still refreshing signals.
 */
import { NextResponse } from "next/server";
import { getActiveProducts } from "@/lib/products";
import { getAllPublishedArticles } from "@/lib/articles";
import { filterArticlesForSitemap } from "@/lib/sitemap-quality-filter";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

const HOST = "www.traicaybentre.com";
const INDEXNOW_KEY = "cf377677cc8eda2f80f4db0988aa63ef";
const DAILY_URL_LIMIT = 20;

/** Hero URLs that ALWAYS get pinged — crawl budget concentration. */
const HERO_PATHS = [
  "",
  "/san-pham",
  "/nguon-goc",
  "/kien-thuc",
  "/tin-tuc",
  "/bang-gia",
  "/dat-hang",
];

function buildUrlList(): string[] {
  const urls = new Set<string>();

  // 1. Hero routes
  for (const p of HERO_PATHS) urls.add(`https://${HOST}${p}`);

  // 2. Active product landing pages
  for (const p of getActiveProducts()) {
    urls.add(`https://${HOST}/${p.slug}`);
  }

  // 3. Top evergreen articles (same filter sitemap uses)
  const articles = filterArticlesForSitemap(getAllPublishedArticles());
  for (const a of articles) {
    if (urls.size >= DAILY_URL_LIMIT) break;
    urls.add(`https://${HOST}${a.urlPath}`);
  }

  return Array.from(urls).slice(0, DAILY_URL_LIMIT);
}

export async function GET(req: Request) {
  // Vercel Cron sets a bearer token; reject unauthorized pings in production.
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urls = buildUrlList();
  if (urls.length === 0) {
    return NextResponse.json({ ok: false, reason: "no-urls" }, { status: 200 });
  }

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      submitted: urls.length,
      urls,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message, urls },
      { status: 500 }
    );
  }
}
