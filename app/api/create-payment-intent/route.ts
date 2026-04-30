import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const amount = Math.round(Number(body.amount) * 100);
    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Minimum donation is £1" }, { status: 400 });
    }

    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      automatic_payment_methods: { enabled: true },
      receipt_email: body.email || undefined,
      metadata: {
        donor_name: body.name || "",
        donor_email: body.email || "",
        gift_aid: body.giftAid ? "true" : "false",
      },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
