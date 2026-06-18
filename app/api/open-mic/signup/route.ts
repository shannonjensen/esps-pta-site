import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PERFORMER_TYPES = ["student", "parent", "both"];

// Public endpoint: a parent/student signs up to perform at the Open Mic.
// Sign-ups are sequential (the running order is by created_at), so we return
// the new performer's position in the lineup on success.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — real users never fill this hidden field; bots often do.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, position: null });
  }

  const name = String(body.performerName ?? "").trim();
  const yearGroup = String(body.yearGroup ?? "").trim();
  const performerType = String(body.performerType ?? "").trim();
  const description = String(body.description ?? "").trim();

  if (!name) return NextResponse.json({ error: "Please add a name." }, { status: 400 });
  if (!yearGroup) return NextResponse.json({ error: "Please choose a year group." }, { status: 400 });
  if (!PERFORMER_TYPES.includes(performerType)) {
    return NextResponse.json({ error: "Please choose who's performing." }, { status: 400 });
  }
  if (!description) {
    return NextResponse.json({ error: "Please add a brief description of your act." }, { status: 400 });
  }

  const needsBacking = Boolean(body.needsBacking);
  const backingLink = String(body.backingLink ?? "").trim().slice(0, 500) || null;
  const contactEmail = String(body.contactEmail ?? "").trim().slice(0, 200) || null;

  try {
    const supabase = supabaseAdmin();
    const { error } = await supabase.from("open_mic_signups").insert({
      performer_name: name.slice(0, 120),
      year_group: yearGroup.slice(0, 40),
      performer_type: performerType,
      description: description.slice(0, 400),
      needs_backing: needsBacking,
      backing_link: needsBacking ? backingLink : null,
      contact_email: contactEmail,
    });
    if (error) throw error;

    // Position = number of sign-ups so far (this one is the most recent).
    const { count } = await supabase
      .from("open_mic_signups")
      .select("id", { count: "exact", head: true });

    return NextResponse.json({ ok: true, position: count ?? null });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Something went wrong";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
