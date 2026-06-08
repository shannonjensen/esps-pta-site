import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("donations")
      .select("donor_name, amount_pence, anonymous, gift_aid, message, created_at")
      .eq("status", "succeeded")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw error;

    const donations = (data ?? []).map((d) => ({
      name: d.anonymous ? "Anonymous" : (d.donor_name?.trim() || "Anonymous"),
      amount: Math.round((d.amount_pence ?? 0) / 100),
      giftAid: !!d.gift_aid,
      message: d.message ?? null,
      createdAt: d.created_at,
    }));

    const totalPence = (data ?? []).reduce((sum, d) => sum + (d.amount_pence ?? 0), 0);
    const giftAidPence = (data ?? []).reduce(
      (sum, d) => sum + (d.gift_aid ? Math.round((d.amount_pence ?? 0) * 0.25) : 0),
      0
    );

    return NextResponse.json({
      donations,
      raised: Math.round(totalPence / 100),
      giftAid: Math.round(giftAidPence / 100),
      donors: donations.length,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
