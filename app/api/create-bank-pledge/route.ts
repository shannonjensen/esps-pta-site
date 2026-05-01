import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const BANK_NAME = "The PTA of East Sheen Primary School";
const BANK_SORT = "20-72-33";
const BANK_ACCT = "30341606";
const FROM_ADDRESS = "ESPS PTA <pta@espspta.org>";
const PTA_NOTIFY_TO = "accounts@espspta.org";

function generateReference() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // excludes I, L, O, 1, 0
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ESPS-${code}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const amount = Math.round(Number(body.amount) * 100);
    if (!amount || amount < 10000) {
      return NextResponse.json({ error: "Bank transfer minimum is £100" }, { status: 400 });
    }
    if (!body.email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const reference = generateReference();
    const amountStr = (amount / 100).toLocaleString();
    const donorName = (body.name || "").trim() || "Anonymous donor";

    const supabase = supabaseAdmin();
    const { error: dbErr } = await supabase.from("donations").insert({
      stripe_payment_intent_id: `bank-${reference}`,
      amount_pence: amount,
      currency: "gbp",
      status: "pending_bank_transfer",
      payment_method: "bank_transfer",
      bank_reference: reference,
      donor_name: body.name || null,
      donor_email: body.email,
      gift_aid: !!body.giftAid,
      donor_address: body.address || null,
      donor_postcode: body.postcode || null,
      employer_match: !!body.employerMatch,
      anonymous: !!body.anonymous,
      source: body.source || null,
    });

    if (dbErr) {
      return NextResponse.json({ error: dbErr.message }, { status: 500 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }
    const resend = new Resend(resendKey);

    // Email donor with bank details + reference
    const donorEmail = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #1E548E; font-size: 22px;">Thank you for your donation</h2>
        <p>Hi ${escapeHtml(donorName)},</p>
        <p>Thank you for choosing to donate <strong>£${amountStr}</strong> to the East Sheen Primary School PTA Library Campaign by bank transfer.</p>
        <p>To complete your donation, please transfer the amount to:</p>
        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Account name</td><td style="padding: 4px 0; font-weight: bold;">${BANK_NAME}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Sort code</td><td style="padding: 4px 0; font-weight: bold;">${BANK_SORT}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Account number</td><td style="padding: 4px 0; font-weight: bold;">${BANK_ACCT}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Reference</td><td style="padding: 4px 0; font-weight: bold; color: #DC5A45;">${reference}</td></tr>
        </table>
        <p>The reference is important — it tells us your transfer is for the library campaign.</p>
        ${body.giftAid ? `<p>You opted into Gift Aid — we'll claim the 25% boost from HMRC once your transfer arrives.</p>` : ""}
        <p>Any questions, just reply to this email.</p>
        <p style="margin-top: 32px;">With thanks,<br>East Sheen Primary School PTA<br><span style="color: #888; font-size: 12px;">Registered charity no. 273295</span></p>
      </div>
    `;

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: body.email,
      subject: `Bank transfer details for your £${amountStr} donation`,
      html: donorEmail,
    });

    // Notify PTA
    const ptaEmail = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px;">
        <p>New bank transfer pledge logged.</p>
        <table style="border-collapse: collapse;">
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Donor</td><td style="padding: 4px 0;">${escapeHtml(donorName)}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Email</td><td style="padding: 4px 0;">${escapeHtml(body.email)}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Amount</td><td style="padding: 4px 0; font-weight: bold;">£${amountStr}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Reference</td><td style="padding: 4px 0; font-weight: bold;">${reference}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Gift Aid</td><td style="padding: 4px 0;">${body.giftAid ? "Yes" : "No"}</td></tr>
          ${body.giftAid ? `<tr><td style="padding: 4px 12px 4px 0; color: #666;">Address</td><td style="padding: 4px 0;">${escapeHtml(body.address || "")}, ${escapeHtml(body.postcode || "")}</td></tr>` : ""}
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Employer match</td><td style="padding: 4px 0;">${body.employerMatch ? "Yes" : "No"}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #666;">Source</td><td style="padding: 4px 0;">${escapeHtml(body.source || "")}</td></tr>
        </table>
        <p>Watch for the transfer in the bank account, then update <code>status</code> to <code>succeeded</code> in Supabase.</p>
      </div>
    `;

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: PTA_NOTIFY_TO,
      subject: `New bank transfer pledge — £${amountStr} (${reference})`,
      html: ptaEmail,
    });

    return NextResponse.json({ success: true, reference });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
