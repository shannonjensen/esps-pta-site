import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { rideRoute, progressAlongRoute } from "@/lib/route";

export const dynamic = "force-dynamic";

const TRAIL_MAX_POINTS = 400;

// Live ride status for the /ride page: latest position, breadcrumb trail,
// and progress along the planned route. Polled by clients every ~30s; the
// CDN caches it briefly so many viewers don't hammer Supabase.
export async function GET() {
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("ride_locations")
      .select("lat, lng, recorded_at")
      .order("recorded_at", { ascending: true })
      .limit(10000);

    if (error) throw error;

    const rows = data ?? [];
    const latest = rows.length > 0 ? rows[rows.length - 1] : null;

    // Decimate the trail to a renderable size, always keeping the endpoints.
    const step = Math.max(1, Math.ceil(rows.length / TRAIL_MAX_POINTS));
    const trail: [number, number][] = [];
    for (let i = 0; i < rows.length; i += step) trail.push([rows[i].lat, rows[i].lng]);
    if (latest && rows.length > 1 && (rows.length - 1) % step !== 0) {
      trail.push([latest.lat, latest.lng]);
    }

    let progress = null;
    if (latest) {
      const { km, offRouteKm } = progressAlongRoute(latest.lat, latest.lng);
      progress = {
        doneKm: Math.round(km * 10) / 10,
        totalKm: rideRoute.totalKm,
        remainingKm: Math.max(0, Math.round((rideRoute.totalKm - km) * 10) / 10),
        pct: Math.min(100, Math.round((km / rideRoute.totalKm) * 1000) / 10),
        offRouteKm: Math.round(offRouteKm * 10) / 10,
      };
    }

    return NextResponse.json(
      {
        latest: latest
          ? {
              lat: latest.lat,
              lng: latest.lng,
              recordedAt: latest.recorded_at,
            }
          : null,
        trail,
        progress,
        routeName: rideRoute.name,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
        },
      }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
