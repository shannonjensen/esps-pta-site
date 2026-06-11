import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Receives location pings from the OwnTracks app (HTTP mode) on the rider's
// phone. OwnTracks posts JSON like:
//   { "_type": "location", "lat": 51.46, "lon": -0.27, "tst": 1718200000,
//     "vel": 24, "batt": 81, "acc": 5 }
// `vel` is km/h, `tst` is a unix timestamp, `acc` is metres.
//
// Auth: the device URL includes ?token=<RIDE_PING_SECRET>. OwnTracks also
// supports HTTP Basic auth; we accept the token as the Basic password too.

function tokenOk(req: NextRequest): boolean {
  const secret = process.env.RIDE_PING_SECRET;
  if (!secret) return false;
  const qs = req.nextUrl.searchParams.get("token");
  if (qs && timingSafeEqual(qs, secret)) return true;
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = Buffer.from(auth.slice(6), "base64").toString("utf8");
      const pass = decoded.slice(decoded.indexOf(":") + 1);
      if (timingSafeEqual(pass, secret)) return true;
    } catch {
      /* fall through */
    }
  }
  return false;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: NextRequest) {
  if (!tokenOk(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  // OwnTracks sends other message types (waypoints, status); ignore them.
  if (body._type !== "location") {
    return NextResponse.json([]); // OwnTracks expects a JSON array response
  }

  const lat = Number(body.lat);
  const lng = Number(body.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: "missing lat/lon" }, { status: 400 });
  }

  const tst = Number(body.tst);
  const recordedAt = Number.isFinite(tst) && tst > 0
    ? new Date(tst * 1000).toISOString()
    : new Date().toISOString();

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("ride_locations").insert({
    lat,
    lng,
    accuracy_m: Number.isFinite(Number(body.acc)) ? Number(body.acc) : null,
    speed_kmh: Number.isFinite(Number(body.vel)) ? Number(body.vel) : null,
    battery: Number.isFinite(Number(body.batt)) ? Number(body.batt) : null,
    recorded_at: recordedAt,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // OwnTracks expects a JSON array (of cmd/location objects) in response.
  return NextResponse.json([]);
}
