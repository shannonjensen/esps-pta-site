-- Book suggestions for the library wishlist, submitted on /suggest-a-book.
-- NOTE: run this in the *book-wishlist* Supabase project
-- (https://zysinvdowrjpbqnufaco.supabase.co) — NOT the main PTA project.
-- Dashboard → SQL Editor → New query.

create table if not exists book_suggestions (
  id bigint generated always as identity primary key,
  title text,                            -- optional — a child may know only one
  author text,                           -- optional — of title / author
  suggested_by text,                     -- optional first name
  year_group text,                       -- optional
  reason text,                           -- optional "why this book?" note
  created_at timestamptz not null default now(),
  -- A suggestion is meaningless with neither a title nor an author, so require
  -- at least one. (The API enforces this too; this is a backstop.)
  constraint book_suggestions_title_or_author
    check (coalesce(nullif(trim(title), ''), nullif(trim(author), '')) is not null)
);

-- Newest suggestions first when reviewing.
create index if not exists book_suggestions_created_at_idx
  on book_suggestions (created_at desc);

-- Service-role key (used server-side) bypasses RLS; enable it so the anon key
-- can't read suggestions — they're private to organisers.
alter table book_suggestions enable row level security;
