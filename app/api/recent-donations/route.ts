import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("donations")
      .select("donor_name, amount_pence, anonymous, created_at")
      .eq("status", "succeeded")
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) throw error;

    const donations = (data ?? []).map((d) => {
      const firstName = (d.donor_name?.trim().split(" ")[0]) || "Anonymous";
      const name = d.anonymous ? "Anonymous" : firstName;
      return {
        name,
        amount: Math.round((d.amount_pence ?? 0) / 100),
      };
    });

    return NextResponse.json({ donations });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
