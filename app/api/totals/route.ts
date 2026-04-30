import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("donations")
      .select("amount_pence")
      .eq("status", "succeeded");

    if (error) throw error;

    const totalPence = (data ?? []).reduce(
      (sum, d) => sum + (d.amount_pence ?? 0),
      0
    );

    return NextResponse.json({
      raised: Math.round(totalPence / 100),
      donors: data?.length ?? 0,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
