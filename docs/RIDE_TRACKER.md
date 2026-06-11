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
| `INSTAGRAM_ACCESS_TOKEN` | (optional — see step 4) |

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

### 4. Instagram token (optional, ~15 min)

The photo grid uses the Instagram API with Instagram Login. The account
posting ride photos must be a **Business or Creator** account (free switch in
Instagram → Settings → Account type).

1. Go to <https://developers.facebook.com/> → My Apps → Create App → type
   "Business" (any name, e.g. "ESPS Ride").
2. In the app dashboard, add the product **Instagram → API setup with
   Instagram login**.
3. Under "Generate access tokens", add the Instagram account and log in —
   this gives a **long-lived access token** (valid 60 days, plenty).
4. Put the token in Vercel as `INSTAGRAM_ACCESS_TOKEN` and redeploy.

Until the token is set, the page just shows "photos will appear here" — the
tracker works fine without it.

Also: set `INSTAGRAM_URL` at the top of `app/ride/page.tsx` to the account's
URL to show a "Follow the ride" link.

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
- `GET /api/ride/instagram` — latest 24 posts via Graph API. Cached 2 min.
  Degrades to nothing if unconfigured/expired.
- `/ride` — polls status every 30s, fundraising every 5 min, photos every
  2 min.

## During the ride

- If the dot stops updating: check the tracker phone (app open? data
  roaming on? battery?). The page shows "Last seen X min ago" when pings are
  older than 5 minutes.
- If the rider takes a wrong turn the progress bar uses the nearest point on
  the planned route, so it stays sensible.
- To wipe test pings before the start: Supabase SQL editor →
  `delete from ride_locations;`
