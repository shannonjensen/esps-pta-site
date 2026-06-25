import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function supabaseAdmin() {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL env var is not set");
  if (!key) throw new Error("SUPABASE_SECRET_KEY env var is not set");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Separate Supabase project for the library book-wishlist app — book
// suggestions submitted on /suggest-a-book are written here, not to the main
// PTA project above. Server-only (service-role key bypasses RLS).
export function bookWishlistAdmin() {
  const wlUrl = process.env.BOOK_WISHLIST_SUPABASE_URL;
  const key = process.env.BOOK_WISHLIST_SUPABASE_SECRET_KEY;
  if (!wlUrl) throw new Error("BOOK_WISHLIST_SUPABASE_URL env var is not set");
  if (!key) throw new Error("BOOK_WISHLIST_SUPABASE_SECRET_KEY env var is not set");
  return createClient(wlUrl, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
