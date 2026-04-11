/**
 * IndexNow API — notify Bing/Yandex of new/updated URLs for instant indexing.
 *
 * POST /api/indexnow { urls: string[] }
 *
 * Called by GitHub Actions on MDX push, or manually.
 * Google doesn't support IndexNow yet but Bing + Yandex do.
 */
import { NextResponse } from "next/server";

const INDEXNOW_KEY = "cf377677cc8eda2f80f4db0988aa63ef";
const HOST = "www.traicaybentre.com";

export async function POST(req: Request) {
  try {
    const { urls } = (await req.json()) as { urls: string[] };

    if (!urls?.length) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
    }

    const fullUrls = urls.map((u) =>
      u.startsWith("http") ? u : `https://${HOST}${u}`
    );

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: fullUrls.slice(0, 10000), // IndexNow max 10k per request
      }),
    });

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      submitted: fullUrls.length,
    });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
