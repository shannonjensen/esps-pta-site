import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdmin, ADMIN_CONFIGURED } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Supabase/PostgREST errors are plain objects, not Error instances — pull a
// useful message off either.
function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (e && typeof e === "object" && "message" in e) return String((e as { message: unknown }).message);
  return "Unknown error";
}

function guard(req: NextRequest) {
  if (!ADMIN_CONFIGURED()) {
    return NextResponse.json(
      { error: "Admin access is not configured. Set ADMIN_PASSWORD on the server." },
      { status: 500 }
    );
  }
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}

// List every donation (all statuses) for the admin dashboard.
export async function GET(req: NextRequest) {
  const blocked = guard(req);
  if (blocked) return blocked;

  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("donations")
      .select(
        "id, donor_name, donor_email, amount_pence, status, payment_method, source, gift_aid, anonymous, message, bank_reference, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw error;
    return NextResponse.json({ donations: data ?? [] });
  } catch (e) {
    return NextResponse.json({ error: errMsg(e) }, { status: 500 });
  }
}

// Create a manual donation (direct bank transfer, external sites, cash, etc.).
export async function POST(req: NextRequest) {
  const blocked = guard(req);
  if (blocked) return blocked;

  try {
    const body = await req.json();

    const amount = Math.round(Number(body.amount) * 100);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Enter a valid amount in pounds." }, { status: 400 });
    }

    const method: string = (body.paymentMethod || "other").toString();
    const row: Record<string, unknown> = {
      stripe_payment_intent_id: `manual-${randomUUID()}`,
      amount_pence: amount,
      currency: "gbp",
      status: "succeeded",
      payment_method: method,
      donor_name: (body.name || "").toString().trim() || null,
      donor_email: (body.email || "").toString().trim() || null,
      gift_aid: !!body.giftAid,
      anonymous: !!body.anonymous,
      employer_match: !!body.employerMatch,
      message: (body.message || "").toString().slice(0, 280) || null,
      source: (body.source || "manual").toString().trim() || "manual",
      bank_reference: (body.bankReference || "").toString().trim() || null,
    };

    // Optional backdating — manual gifts often arrived earlier than logging.
    if (body.date) {
      const d = new Date(body.date);
      if (!isNaN(d.getTime())) row.created_at = d.toISOString();
    }

    const supabase = supabaseAdmin();
    let { data, error } = await supabase
      .from("donations")
      .insert(row)
      .select("id")
      .single();

    // The `message` column may not exist yet in the DB. If so, retry without it
    // rather than failing the whole entry. (42703 = undefined column;
    // PGRST204 = column missing from PostgREST schema cache.)
    if (error && (error.code === "42703" || error.code === "PGRST204") && "message" in row) {
      delete row.message;
      ({ data, error } = await supabase
        .from("donations")
        .insert(row)
        .select("id")
        .single());
    }

    if (error) throw error;
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e) {
    return NextResponse.json({ error: errMsg(e) }, { status: 500 });
  }
}

// Update an existing donation — e.g. mark a pending bank transfer as received,
// or correct an amount/name. Only whitelisted fields are writable.
export async function PATCH(req: NextRequest) {
  const blocked = guard(req);
  if (blocked) return blocked;

  try {
    const body = await req.json();
    const id = (body.id || "").toString();
    if (!id) return NextResponse.json({ error: "Missing donation id." }, { status: 400 });

    const patch: Record<string, unknown> = {};
    if (typeof body.status === "string") patch.status = body.status;
    if (body.amount != null) {
      const amount = Math.round(Number(body.amount) * 100);
      if (!Number.isFinite(amount) || amount <= 0) {
        return NextResponse.json({ error: "Enter a valid amount." }, { status: 400 });
      }
      patch.amount_pence = amount;
    }
    if (typeof body.name === "string") patch.donor_name = body.name.trim() || null;
    if (typeof body.giftAid === "boolean") patch.gift_aid = body.giftAid;
    if (typeof body.anonymous === "boolean") patch.anonymous = body.anonymous;
    if (typeof body.message === "string") patch.message = body.message.slice(0, 280) || null;
    if (typeof body.source === "string") patch.source = body.source.trim() || null;

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
    }

    const supabase = supabaseAdmin();
    const { error } = await supabase.from("donations").update(patch).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: errMsg(e) }, { status: 500 });
  }
}

// Remove a donation (e.g. a mistaken entry).
export async function DELETE(req: NextRequest) {
  const blocked = guard(req);
  if (blocked) return blocked;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing donation id." }, { status: 400 });

    const supabase = supabaseAdmin();
    const { error } = await supabase.from("donations").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: errMsg(e) }, { status: 500 });
  }
}
