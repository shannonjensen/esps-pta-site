import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const INSTAGRAM_USERNAME = "esps.pta";

type Photo = {
  id: string;
  src: string;
  isVideo: boolean;
  caption: string;
  permalink: string;
  timestamp: string;
};

// Latest posts from the ride's Instagram account.
//
// Primary source: the Instagram Graph API ("Instagram API with Instagram
// Login") using a long-lived token in INSTAGRAM_ACCESS_TOKEN — official and
// reliable.
//
// Fallback (no token, or token call fails): Instagram's public
// web_profile_info endpoint for the account. Unofficial — it can be blocked
// or rate-limited at any time, especially from data-centre IPs — but when it
// works it needs no setup. If both sources fail we return an empty list and
// the page shows the "follow us" link instead.
export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (token) {
    const photos = await fromGraphApi(token);
    if (photos) return ok(photos, true);
  }

  const photos = await fromPublicProfile();
  if (photos) return ok(photos, Boolean(token));

  return NextResponse.json({ photos: [], configured: Boolean(token) });
}

function ok(photos: Photo[], configured: boolean) {
  return NextResponse.json(
    { photos, configured },
    {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
      },
    }
  );
}

async function fromGraphApi(token: string): Promise<Photo[] | null> {
  try {
    const fields =
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const res = await fetch(
      `https://graph.instagram.com/v23.0/me/media?fields=${fields}&limit=24&access_token=${encodeURIComponent(token)}`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) {
      throw new Error(`Instagram API ${res.status}: ${(await res.text()).slice(0, 200)}`);
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
    return (data.data ?? [])
      .map((p) => ({
        id: p.id,
        // VIDEO items expose a poster frame via thumbnail_url
        src: (p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url) ?? "",
        isVideo: p.media_type === "VIDEO",
        caption: p.caption ?? "",
        permalink: p.permalink,
        timestamp: p.timestamp,
      }))
      .filter((p) => p.src);
  } catch (e) {
    console.error("Instagram Graph API failed:", e instanceof Error ? e.message : e);
    return null;
  }
}

async function fromPublicProfile(): Promise<Photo[] | null> {
  try {
    const res = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_USERNAME}`,
      {
        headers: {
          // Instagram's public web app id — required for this endpoint,
          // along with browser-like Sec-Fetch headers (it rejects requests
          // without them: "SecFetch Policy violation").
          "x-ig-app-id": "936619743392459",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          Accept: "*/*",
          "Accept-Language": "en-GB,en;q=0.9",
          Referer: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          "X-Requested-With": "XMLHttpRequest",
        },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) throw new Error(`public profile ${res.status}`);
    const data = (await res.json()) as {
      data?: {
        user?: {
          edge_owner_to_timeline_media?: {
            edges?: {
              node: {
                id: string;
                display_url?: string;
                is_video: boolean;
                shortcode: string;
                taken_at_timestamp: number;
                edge_media_to_caption?: { edges?: { node: { text: string } }[] };
              };
            }[];
          };
        };
      };
    };
    const edges = data.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
    if (edges.length === 0) return null;
    return edges
      .map(({ node }) => ({
        id: node.id,
        src: node.display_url ?? "",
        isVideo: node.is_video,
        caption: node.edge_media_to_caption?.edges?.[0]?.node?.text ?? "",
        permalink: `https://www.instagram.com/p/${node.shortcode}/`,
        timestamp: new Date(node.taken_at_timestamp * 1000).toISOString(),
      }))
      .filter((p) => p.src)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  } catch (e) {
    console.error("Instagram public profile failed:", e instanceof Error ? e.message : e);
    return null;
  }
}
