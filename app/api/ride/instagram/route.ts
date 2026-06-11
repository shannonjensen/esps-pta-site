import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Latest posts from the ride's Instagram account via the Instagram Graph API
// ("Instagram API with Instagram Login"). Requires a long-lived access token
// for the account in the INSTAGRAM_ACCESS_TOKEN env var. Until that's set we
// return an empty list and the page shows a "follow us" link instead.
export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ photos: [], configured: false });
  }

  try {
    const fields =
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const res = await fetch(
      `https://graph.instagram.com/v23.0/me/media?fields=${fields}&limit=24&access_token=${encodeURIComponent(token)}`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Instagram API ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = (await res.json()) as {
      data?: {
        id: string;
        caption?: string;
        media_type: string;
        media_url?: string;
        thumbnail_url?: string;
        permalink: string;
        timestamp: string;
      }[];
    };

    const photos = (data.data ?? [])
      .filter((p) => p.media_url || p.thumbnail_url)
      .map((p) => ({
        id: p.id,
        // VIDEO items expose a poster frame via thumbnail_url
        src: p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url,
        isVideo: p.media_type === "VIDEO",
        caption: p.caption ?? "",
        permalink: p.permalink,
        timestamp: p.timestamp,
      }))
      .filter((p) => p.src);

    return NextResponse.json(
      { photos, configured: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
        },
      }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("Instagram fetch failed:", msg);
    // Token expired or API hiccup — degrade to the "follow us" link.
    return NextResponse.json({ photos: [], configured: true, error: msg });
  }
}
