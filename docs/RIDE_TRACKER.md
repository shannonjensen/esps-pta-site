# Live Ride Tracker — setup & runbook

The `/ride` page shows the London→Amsterdam ride live: route map, progress,
fundraising total from JustGiving, and an Instagram photo feed. It polls every
30 seconds.

## Before the ride (do these tonight!)

### 1. Create the Supabase table (2 min) — REQUIRED

Supabase Dashboard → SQL Editor → New query → paste the contents of
`supabase/ride_locations.sql` → Run.

### 2. Set env vars in Vercel — REQUIRED

Vercel → Project → Settings → Environment Variables, add:

| Var | Value |
|---|---|
| `RIDE_PING_SECRET` | same value as in `.env.local` |

Then redeploy (`git push` does it).

### 3. Set up OwnTracks on the tracking phone (5 min) — REQUIRED

One rider's phone represents the group. Install **OwnTracks** (free,
[iOS](https://apps.apple.com/app/owntracks/id692424691) /
[Android](https://play.google.com/store/apps/details?id=org.owntracks.android)).

In the app: **Settings →**
- **Mode**: HTTP
- **URL**: `https://<your-domain>/api/ride/ping?token=<RIDE_PING_SECRET>`
- **TrackerID / DeviceID / UserID**: anything (e.g. `ride`)
- iOS: set **Mode** (tracking mode, the arrow icon on the map) to **Move**
  while riding — this sends a fix every few seconds/metres. Switch back to
  "Significant" at stops to save battery.
- Android: Settings → **Reporting**: set *Move mode* / locator interval ~30s.

Tips for the day:
- Bring a power bank — Move mode uses real GPS.
- The tracker phone needs mobile data that works in NL (check roaming!).
- Test the night before: open the app, tap the publish (up-arrow) button, then
  check `https://<your-domain>/ride` shows the dot at your house.

### 4. Instagram photos

The photo feed is a [LightWidget](https://lightwidget.com) embed of
@esps.pta, configured in the "From the road" section of
`app/ride/page.tsx`. Widget settings (layout, post count, refresh) are
managed in the LightWidget dashboard, not in code. LightWidget refreshes
the feed periodically on its side — new Instagram posts appear without any
deploy.

The "Follow the ride" link target is the `INSTAGRAM_URL` constant at the
top of `app/ride/page.tsx`.

### 5. Real route GPX (recommended)

The committed route is a placeholder (London→Harwich→Hoek→Amsterdam,
~389 km straight-ish lines). Replace it with the real planned route:

```sh
node scripts/gpx-to-route.mjs path/to/your-route.gpx "London to Amsterdam"
git add data/ride-route.json && git commit -m "Real ride route" && git push
```

Multi-day rides exported as separate GPX files? Concatenate them first, or
run the converter on a single merged GPX (the script reads all `<trkpt>`s in
file order).

## How it fits together

- `POST /api/ride/ping` — OwnTracks posts GPS here (token-authed); rows go to
  the `ride_locations` table.
- `GET /api/ride/status` — latest position + breadcrumb trail + progress
  computed by projecting onto the route polyline. CDN-cached 15s.
- `GET /api/ride/justgiving` — scrapes the campaign page's embedded JSON for
  the live total. Cached 5 min. If JustGiving changes their page layout the
  card degrades to just the Donate button.
- Photos — LightWidget iframe embed of @esps.pta (refreshes on
  LightWidget's side, no code involved).
- `/ride` — polls status every 30s, fundraising every 5 min.

## During the ride

- If the dot stops updating: check the tracker phone (app open? data
  roaming on? battery?). The page shows "Last seen X min ago" when pings are
  older than 5 minutes.
- If the rider takes a wrong turn the progress bar uses the nearest point on
  the planned route, so it stays sensible.
- To wipe test pings before the start: Supabase SQL editor →
  `delete from ride_locations;`
