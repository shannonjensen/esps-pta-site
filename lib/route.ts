import routeData from "@/data/ride-route.json";

// Planned ride route, precomputed by scripts/gpx-to-route.mjs:
// points[i] = [lat, lng], cumKm[i] = distance along the route to that point.
export type RideRoute = {
  name: string;
  totalKm: number;
  points: [number, number][];
  cumKm: number[];
};

export const rideRoute = routeData as RideRoute;

const R = 6371; // km

export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Project a live position onto the route polyline: find the nearest segment
// (working in a flat local approximation, fine at this scale) and return the
// distance along the route at that projection.
export function progressAlongRoute(
  lat: number,
  lng: number
): { km: number; offRouteKm: number } {
  const { points, cumKm } = rideRoute;
  let bestKm = 0;
  let bestDist = Infinity;

  const cosLat = Math.cos((lat * Math.PI) / 180);
  // degrees → km conversion factors for the local flat approximation
  const kmPerDegLat = 110.574;
  const kmPerDegLng = 111.32 * cosLat;

  for (let i = 0; i < points.length - 1; i++) {
    const [aLat, aLng] = points[i];
    const [bLat, bLng] = points[i + 1];
    const ax = (aLng - lng) * kmPerDegLng;
    const ay = (aLat - lat) * kmPerDegLat;
    const bx = (bLng - lng) * kmPerDegLng;
    const by = (bLat - lat) * kmPerDegLat;
    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    const t = lenSq === 0 ? 0 : Math.max(0, Math.min(1, -(ax * dx + ay * dy) / lenSq));
    const px = ax + t * dx;
    const py = ay + t * dy;
    const dist = Math.sqrt(px * px + py * py);
    if (dist < bestDist) {
      bestDist = dist;
      bestKm = cumKm[i] + t * (cumKm[i + 1] - cumKm[i]);
    }
  }

  return { km: bestKm, offRouteKm: bestDist };
}
