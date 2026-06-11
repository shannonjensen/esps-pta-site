import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { rideRoute, progressAlongRoute, haversineKm } from "@/lib/route";

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
      .select("lat, lng, speed_kmh, battery, recorded_at")
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
      // Average moving speed over the last 30 minutes, for a rough pace stat.
      const cutoff = Date.now() - 30 * 60 * 1000;
      const recent = rows.filter(
        (r) => new Date(r.recorded_at).getTime() >= cutoff
      );
      let recentKm = 0;
      for (let i = 1; i < recent.length; i++) {
        recentKm += haversineKm(
          recent[i - 1].lat,
          recent[i - 1].lng,
          recent[i].lat,
          recent[i].lng
        );
      }
      const recentHours =
        recent.length > 1
          ? (new Date(recent[recent.length - 1].recorded_at).getTime() -
              new Date(recent[0].recorded_at).getTime()) /
            3600000
          : 0;

      progress = {
        doneKm: Math.round(km * 10) / 10,
        totalKm: rideRoute.totalKm,
        remainingKm: Math.max(0, Math.round((rideRoute.totalKm - km) * 10) / 10),
        pct: Math.min(100, Math.round((km / rideRoute.totalKm) * 1000) / 10),
        offRouteKm: Math.round(offRouteKm * 10) / 10,
        avgSpeedKmh:
          recentHours > 0.05
            ? Math.round((recentKm / recentHours) * 10) / 10
            : null,
      };
    }

    return NextResponse.json(
      {
        latest: latest
          ? {
              lat: latest.lat,
              lng: latest.lng,
              speedKmh: latest.speed_kmh,
              battery: latest.battery,
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
