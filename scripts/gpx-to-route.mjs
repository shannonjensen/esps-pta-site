// Convert a GPX file into data/ride-route.json for the live ride tracker.
//
// Usage: node scripts/gpx-to-route.mjs path/to/route.gpx ["Route name"]
//
// Reads every <trkpt> (and <rtept>) in document order, decimates to keep the
// file small (drops points closer than MIN_GAP_M to the last kept point), and
// writes { name, totalKm, points: [[lat,lng],...], cumKm: [...] }.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MIN_GAP_M = 100; // keep a point at most every ~100 m

const gpxPath = process.argv[2];
if (!gpxPath) {
  console.error("Usage: node scripts/gpx-to-route.mjs <route.gpx> [name]");
  process.exit(1);
}
const name = process.argv[3] ?? "London to Amsterdam";

const gpx = readFileSync(gpxPath, "utf8");
const raw = [];
const re = /<(?:trkpt|rtept)\b[^>]*\blat="(-?[\d.]+)"[^>]*\blon="(-?[\d.]+)"/g;
let m;
while ((m = re.exec(gpx)) !== null) {
  raw.push([Number(m[1]), Number(m[2])]);
}
if (raw.length < 2) {
  console.error(`No track points found in ${gpxPath}`);
  process.exit(1);
}

const R = 6371; // km
function haversineKm([lat1, lng1], [lat2, lng2]) {
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Decimate, always keeping first and last points.
const points = [raw[0]];
for (let i = 1; i < raw.length - 1; i++) {
  if (haversineKm(points[points.length - 1], raw[i]) * 1000 >= MIN_GAP_M) {
    points.push(raw[i]);
  }
}
points.push(raw[raw.length - 1]);

const cumKm = [0];
for (let i = 1; i < points.length; i++) {
  cumKm.push(cumKm[i - 1] + haversineKm(points[i - 1], points[i]));
}

const route = {
  name,
  totalKm: Math.round(cumKm[cumKm.length - 1] * 10) / 10,
  points: points.map(([lat, lng]) => [
    Math.round(lat * 1e5) / 1e5,
    Math.round(lng * 1e5) / 1e5,
  ]),
  cumKm: cumKm.map((k) => Math.round(k * 100) / 100),
};

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "ride-route.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(route));
console.log(
  `Wrote ${out}: ${route.points.length} points (from ${raw.length}), ${route.totalKm} km`
);
