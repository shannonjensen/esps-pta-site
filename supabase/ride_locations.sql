-- Live ride tracking: location pings from the rider's phone (OwnTracks app).
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create table if not exists ride_locations (
  id bigint generated always as identity primary key,
  lat double precision not null,
  lng double precision not null,
  accuracy_m double precision,        -- GPS accuracy in metres (OwnTracks `acc`)
  speed_kmh double precision,         -- speed in km/h (OwnTracks `vel`)
  battery int,                        -- phone battery % (OwnTracks `batt`)
  recorded_at timestamptz not null,   -- when the fix was taken (OwnTracks `tst`)
  created_at timestamptz not null default now()
);

-- The status endpoint reads the trail in time order.
create index if not exists ride_locations_recorded_at_idx
  on ride_locations (recorded_at desc);

-- Service-role key bypasses RLS, but enable it so the anon key can't read/write.
alter table ride_locations enable row level security;
