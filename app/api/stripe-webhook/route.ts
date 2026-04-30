import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not set" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, secret);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: `Invalid signature: ${msg}` }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const supabase = supabaseAdmin();

    const { error } = await supabase
      .from("donations")
      .upsert(
        {
          stripe_payment_intent_id: pi.id,
          amount_pence: pi.amount,
          currency: pi.currency,
          status: pi.status,
          donor_name: pi.metadata.donor_name || null,
          donor_email: pi.metadata.donor_email || pi.receipt_email || null,
          gift_aid: pi.metadata.gift_aid === "true",
        },
        { onConflict: "stripe_payment_intent_id" }
      );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
