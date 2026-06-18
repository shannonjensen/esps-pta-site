import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Lineup for the Open Mic, in sign-up order.
//   • Public (no admin key): a privacy-safe list — position, first name, year
//     group and who's performing. No descriptions, backing links or contacts.
//   • Organisers (valid x-admin-key): the full details to run the event.
export async function GET(req: NextRequest) {
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("open_mic_signups")
      .select(
        "id, performer_name, year_group, performer_type, description, needs_backing, backing_link, contact_email, created_at"
      )
      .order("created_at", { ascending: true });

    if (error) throw error;
    const rows = data ?? [];

    if (isAdmin(req)) {
      return NextResponse.json({
        count: rows.length,
        performers: rows.map((r, i) => ({ position: i + 1, ...r })),
      });
    }

    // Public, privacy-safe view.
    return NextResponse.json({
      count: rows.length,
      performers: rows.map((r, i) => ({
        position: i + 1,
        firstName: (r.performer_name || "").trim().split(/\s+/)[0] || "Performer",
        yearGroup: r.year_group,
        performerType: r.performer_type,
      })),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg, count: 0, performers: [] }, { status: 200 });
  }
}
