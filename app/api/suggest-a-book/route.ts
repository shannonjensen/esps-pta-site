import { NextRequest, NextResponse } from "next/server";
import { bookWishlistAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public endpoint: a parent/child suggests a book for the library wishlist.
// Title and author are both optional (a child may know only one), but at least
// one is required. Writes to the separate book-wishlist Supabase project.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — real users never fill this hidden field; bots often do.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const title = String(body.title ?? "").trim();
  const author = String(body.author ?? "").trim();
  const suggestedBy = String(body.suggestedBy ?? "").trim();
  const yearGroup = String(body.yearGroup ?? "").trim();
  const reason = String(body.reason ?? "").trim();

  if (!title && !author) {
    return NextResponse.json(
      { error: "Please add a book title or an author." },
      { status: 400 }
    );
  }

  try {
    const supabase = bookWishlistAdmin();
    const { error } = await supabase.from("book_suggestions").insert({
      title: title.slice(0, 300) || null,
      author: author.slice(0, 200) || null,
      suggested_by: suggestedBy.slice(0, 120) || null,
      year_group: yearGroup.slice(0, 40) || null,
      reason: reason.slice(0, 1000) || null,
    });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Something went wrong";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
