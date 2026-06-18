-- Open Mic sign-ups for the Summer Fair. Performers go in sign-up order
-- (sequential, no fixed time slots) — created_at gives the running order.
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create table if not exists open_mic_signups (
  id bigint generated always as identity primary key,
  performer_name text not null,
  year_group text not null,
  performer_type text not null,          -- 'student' | 'parent' | 'both'
  description text not null,             -- brief description of the act (private)
  needs_backing boolean not null default false,
  backing_link text,                    -- optional link to backing track (private)
  contact_email text,                   -- optional, private — to coordinate music
  created_at timestamptz not null default now()
);

-- Lineup is read in sign-up order.
create index if not exists open_mic_signups_created_at_idx
  on open_mic_signups (created_at asc);

-- Service-role key bypasses RLS; enable it so the anon key can't read the
-- private details (names/descriptions/backing links are server-gated).
alter table open_mic_signups enable row level security;
