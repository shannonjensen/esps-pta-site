"use client";

import { useState, useEffect } from "react";
import { loadStripe, type Stripe as StripeJs } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const pubKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise: Promise<StripeJs | null> = pubKey ? loadStripe(pubKey) : Promise.resolve(null);

type Props = {
  amount: number;
  name: string;
  email: string;
  giftAid: boolean;
  address: string;
  postcode: string;
  onSuccess: () => void;
  onBack: () => void;
};

export function DonateForm(props: Props) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: props.amount,
        name: props.name,
        email: props.email,
        giftAid: props.giftAid,
        address: props.address,
        postcode: props.postcode,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.error) setError(d.error);
        else setClientSecret(d.clientSecret);
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => { cancelled = true; };
  }, [props.amount, props.name, props.email, props.giftAid, props.address, props.postcode]);

  if (!pubKey) {
    return (
      <p className="text-stone-600 text-sm py-4">
        Stripe isn&rsquo;t configured yet. Add <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> and{" "}
        <code>STRIPE_SECRET_KEY</code> to <code>.env.local</code>.
      </p>
    );
  }

  if (error) return <p className="text-red-600 text-sm py-4">{error}</p>;
  if (!clientSecret) return <p className="text-stone-500 text-sm py-6 text-center">Loading payment form…</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
      <CheckoutForm {...props} />
    </Elements>
  );
}

function CheckoutForm({ amount, onSuccess, onBack }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: err } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + "/donate/thanks" },
      redirect: "if_required",
    });

    if (err) {
      setError(err.message || "Payment failed");
      setSubmitting(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 rounded-full font-bold text-stone-700 bg-stone-100"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || submitting}
          className="flex-[2] py-3 rounded-full font-bold text-white disabled:opacity-60"
          style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}
        >
          {submitting ? "Processing…" : `Donate £${amount} →`}
        </button>
      </div>
    </form>
  );
}
