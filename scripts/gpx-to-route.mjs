// Convert one or more GPX files into data/ride-route.json for the live ride
// tracker.
//
// Usage: node scripts/gpx-to-route.mjs day1.gpx [day2.gpx ...] [--name "Route name"]
//
// Multiple files are joined in argument order. The gap between consecutive
// files (e.g. the Harwich→Hoek van Holland ferry) is drawn on the map but
// contributes ZERO distance — totalKm and progress reflect cycling distance
// only.
//
// Reads every <trkpt> (and <rtept>) in document order, decimates to keep the
// file small (drops points closer than MIN_GAP_M to the last kept point), and
// writes { name, totalKm, points: [[lat,lng],...], cumKm: [...] }.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MIN_GAP_M = 100; // keep a point at most every ~100 m

const argv = process.argv.slice(2);
let name = "London to Amsterdam";
const nameIdx = argv.indexOf("--name");
if (nameIdx !== -1) {
  name = argv[nameIdx + 1] ?? name;
  argv.splice(nameIdx, 2);
}
const gpxPaths = argv;
if (gpxPaths.length === 0) {
  console.error('Usage: node scripts/gpx-to-route.mjs <day1.gpx> [day2.gpx ...] [--name "Route name"]');
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

// Per-file: parse, then decimate the drawn geometry while measuring distance
// along the FULL raw track, so totalKm matches the real route length rather
// than the simplified polyline's. Each file's endpoints are always kept, so
// the ferry gap connects the true end/start of each day.
const segments = [];
for (const gpxPath of gpxPaths) {
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

  // Cumulative raw distance at every raw point.
  const rawCum = [0];
  for (let i = 1; i < raw.length; i++) {
    rawCum.push(rawCum[i - 1] + haversineKm(raw[i - 1], raw[i]));
  }

  // Keep a decimated subset of points, each tagged with its exact raw km.
  const pts = [{ p: raw[0], km: 0 }];
  for (let i = 1; i < raw.length - 1; i++) {
    if (haversineKm(pts[pts.length - 1].p, raw[i]) * 1000 >= MIN_GAP_M) {
      pts.push({ p: raw[i], km: rawCum[i] });
    }
  }
  pts.push({ p: raw[raw.length - 1], km: rawCum[raw.length - 1] });

  console.log(
    `${gpxPath}: ${raw.length} → ${pts.length} points, ${rawCum[raw.length - 1].toFixed(1)} km`
  );
  segments.push(pts);
}

// Join segments. Distance accumulates within a segment; the connector between
// segments (ferry/transfer) adds nothing.
const points = [];
const cumKm = [];
let km = 0;
for (const seg of segments) {
  const base = km;
  for (const { p, km: segKm } of seg) {
    km = base + segKm;
    points.push(p);
    cumKm.push(km);
  }
}

const route = {
  name,
  totalKm: Math.round(km * 10) / 10,
  points: points.map(([lat, lng]) => [
    Math.round(lat * 1e5) / 1e5,
    Math.round(lng * 1e5) / 1e5,
  ]),
  cumKm: cumKm.map((k) => Math.round(k * 100) / 100),
};

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "ride-route.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(route));
console.log(`Wrote ${out}: ${route.points.length} points, ${route.totalKm} km cycling distance`);
