"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DonateModal } from "../../components/DonateModal";

type Donation = {
  name: string;
  amount: number;
  giftAid: boolean;
  message: string | null;
  createdAt: string;
};

type Feed = {
  donations: Donation[];
  raised: number;
  giftAid: number;
  donors: number;
};

export default function DonationsPage() {
  const goal = 50000;
  const [feed, setFeed] = useState<Feed | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [donateSource, setDonateSource] = useState<string | null>(null);
  const donateOpen = donateSource !== null;
  const closeDonate = () => setDonateSource(null);

  useEffect(() => {
    fetch("/api/donations")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d: Feed) => setFeed(d))
      .catch(() => setError("We couldn't load donations right now. Please try again shortly."));
  }, []);

  const green = "#234A3A";
  const bgWash = "#E8F0E5";
  const orange = "#E0713E";
  const yellow = "#F5C24B";

  const heading = "font-[family-name:var(--font-heading)]";
  const eyebrow = "text-[12px] sm:text-[14px] uppercase tracking-[0.18em] font-bold";

  const loaded = feed !== null;
  const raised = feed?.raised ?? 0;
  const donors = feed?.donors ?? 0;
  const giftAid = feed?.giftAid ?? 0;
  const pct = loaded ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

  return (
    <div className="min-h-screen" style={{ background: bgWash, color: green }}>
      {/* Back link */}
      <div className="px-4 sm:px-6 pt-6">
        <Link href="/library" className="inline-flex items-center gap-2 text-[14px] font-semibold text-stone-600 hover:text-stone-900">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Back to library campaign
        </Link>
      </div>

      {/* Hero */}
      <section className="relative px-6 sm:px-8 pt-8 pb-4 sm:pt-12 sm:pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <span className={`${eyebrow} inline-block px-4 py-2 rounded-full mb-5`}
              style={{ background: "rgba(35, 74, 58, 0.10)", color: green }}>
              Library Campaign · Donations
            </span>
            <h1 className={`${heading} font-bold tracking-tight leading-[1.05] text-[34px] sm:text-[52px]`}>
              Thank you to{" "}
              <span style={{ color: orange }}>every</span>{" "}
              donor.
            </h1>
            <p className={`${heading} mt-5 text-stone-700 text-[16px] sm:text-[18px] leading-[1.55] font-normal max-w-xl mx-auto`}>
              Every gift below brings us closer to libraries our children will love. Each
              donation, big or small, lights a path for our young readers.
            </p>
          </div>

          {/* Summary card */}
          <div className="mt-7 sm:mt-9 rounded-3xl bg-white p-5 sm:p-6"
            style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-500">Raised</p>
                <p className={`${heading} font-bold text-[20px] sm:text-[26px] tracking-tight mt-1`} style={{ color: green }}>
                  {loaded ? `£${raised.toLocaleString()}` : "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-500">Gift Aid</p>
                <p className={`${heading} font-bold text-[20px] sm:text-[26px] tracking-tight mt-1`} style={{ color: orange }}>
                  {loaded ? `+£${giftAid.toLocaleString()}` : "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-500">Donors</p>
                <p className={`${heading} font-bold text-[20px] sm:text-[26px] tracking-tight mt-1`} style={{ color: green }}>
                  {loaded ? donors.toLocaleString() : "—"}
                </p>
              </div>
            </div>

            <div className="mt-5 h-3 rounded-full overflow-hidden relative" style={{ background: "rgba(0,0,0,0.12)" }}>
              <div className="h-full rounded-full relative transition-[width] duration-700"
                style={{ width: pct + "%", background: `linear-gradient(90deg, ${yellow}, #FFE6A8)` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-3 h-3 rounded-full bg-white"
                  style={{ boxShadow: `0 0 0 2px ${yellow}` }} />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[12px]">
              <span className="font-bold" style={{ color: green }}>{loaded && `${pct}% of £${goal.toLocaleString()}`}</span>
              <span className="text-stone-600">{loaded && `£${(goal - raised).toLocaleString()} to go`}</span>
            </div>

            <button onClick={() => setDonateSource("donations_page")}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[15px] sm:text-[16px] active:scale-[0.99] transition"
              style={{ background: orange, boxShadow: "0 3px 0 #B8551F" }}>
              Add your donation →
            </button>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="px-4 sm:px-8 pt-2 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className={`${heading} font-bold text-[22px] sm:text-[28px] tracking-tight px-2 sm:px-0`}>
            All donations
          </h2>
          <p className="text-stone-600 mt-1 text-[13px] sm:text-[14px] px-2 sm:px-0">
            Most recent first. Gift Aid amounts are claimed from HMRC at no cost to the donor.
          </p>

          {error && (
            <p className="mt-6 text-stone-600 text-[14px] px-2 sm:px-0">{error}</p>
          )}

          {!error && !loaded && (
            <p className="mt-6 text-stone-500 text-[14px] px-2 sm:px-0">Loading donations…</p>
          )}

          {!error && loaded && feed!.donations.length === 0 && (
            <div className="mt-6 rounded-2xl bg-white p-6 text-center" style={{ border: "1px solid #1a1a1a10" }}>
              <p className={`${heading} font-bold text-[18px]`} style={{ color: green }}>Be the first.</p>
              <p className="text-stone-600 text-[14px] mt-1">No donations yet — your gift will start the list.</p>
            </div>
          )}

          {!error && loaded && feed!.donations.length > 0 && (
            <ul className="mt-5 rounded-2xl bg-white overflow-hidden divide-y divide-stone-100"
              style={{ border: "1px solid #1a1a1a10" }}>
              {feed!.donations.map((d, i) => (
                <li key={i} className="p-4 sm:p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                      <p className={`${heading} font-bold text-[15px] sm:text-[16px] truncate`} style={{ color: green }}>
                        {d.name}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{formatDate(d.createdAt)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`${heading} font-bold text-[16px] sm:text-[18px] tracking-tight`} style={{ color: orange }}>
                        £{d.amount.toLocaleString()}
                      </p>
                      {d.giftAid && (
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] mt-0.5" style={{ color: green }}>
                          +£{Math.round(d.amount * 0.25).toLocaleString()} Gift Aid
                        </p>
                      )}
                    </div>
                  </div>
                  {d.message && (
                    <p className="text-[13.5px] text-stone-700 leading-relaxed mt-2.5 pl-3 border-l-2"
                      style={{ borderColor: yellow }}>
                      &ldquo;{d.message}&rdquo;
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <DonateModal open={donateOpen} onClose={closeDonate} source={donateSource} />
    </div>
  );
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}
