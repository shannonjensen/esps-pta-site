import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CAMPAIGN_URL = "https://www.justgiving.com/campaign/espsl2a";

// Pull the live fundraising total from the JustGiving campaign page. The page
// embeds its state as JSON, e.g.
//   "donationSummary\":{\"totalAmount\":23514.41,\"aggregatedDonationsCount\":179
// (escaped inside a script string). We match both escaped and plain forms and
// take the largest totalAmount, which is the campaign-level aggregate (the
// smaller ones are per-fundraiser).
export async function GET() {
  try {
    const res = await fetch(CAMPAIGN_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ESPS-PTA-site)" },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`JustGiving responded ${res.status}`);
    const html = await res.text();

    const summaryRe =
      /donationSummary\\?":\{\\?"totalAmount\\?":([\d.]+),\\?"aggregatedDonationsCount\\?":(\d+)/g;
    let raised: number | null = null;
    let donations: number | null = null;
    let m;
    while ((m = summaryRe.exec(html)) !== null) {
      const amount = Number(m[1]);
      if (raised === null || amount > raised) {
        raised = amount;
        donations = Number(m[2]);
      }
    }

    const targetMatch = html.match(/targetAmount\\?":([\d.]+)/);
    const target = targetMatch ? Number(targetMatch[1]) : null;

    if (raised === null) throw new Error("Could not find total in page");

    return NextResponse.json(
      { raised, donations, target, url: CAMPAIGN_URL },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    // Page layout changed or JustGiving down — let the client fall back to
    // just linking out rather than showing an error.
    return NextResponse.json(
      { raised: null, donations: null, target: null, url: CAMPAIGN_URL, error: msg },
      { status: 200 }
    );
  }
}
