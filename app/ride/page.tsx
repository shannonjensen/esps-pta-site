"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import dynamicImport from "next/dynamic";
import routeData from "@/data/ride-route.json";

const RideMap = dynamicImport(
  () => import("./RideMap").then((m) => m.RideMap),
  { ssr: false }
);

// Set to the ride's Instagram URL (e.g. "https://www.instagram.com/espspta")
// to show a follow link under the photo feed.
const INSTAGRAM_URL: string | null = "https://www.instagram.com/esps.pta";

type Status = {
  latest: {
    lat: number;
    lng: number;
    recordedAt: string;
  } | null;
  trail: [number, number][];
  progress: {
    doneKm: number;
    totalKm: number;
    remainingKm: number;
    pct: number;
  } | null;
};

type Fundraising = {
  raised: number | null;
  donations: number | null;
  target: number | null;
  url: string;
};

const POLL_MS = 30_000;

export default function RidePage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [fundraising, setFundraising] = useState<Fundraising | null>(null);
  const [now, setNow] = useState(() => Date.now());

  // Live position + progress, every 30s.
  useEffect(() => {
    const load = () =>
      fetch("/api/ride/status")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d && !d.error) setStatus(d);
        })
        .catch(() => {});
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, []);

  // Fundraising total, every 5 minutes.
  useEffect(() => {
    const load = () =>
      fetch("/api/ride/justgiving")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d) setFundraising(d);
        })
        .catch(() => {});
    load();
    const id = setInterval(load, 5 * 60_000);
    return () => clearInterval(id);
  }, []);

  // Tick "last updated x min ago" once a minute.
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const green = "#234A3A";
  const bgWash = "#E8F0E5";
  const orange = "#E0713E";
  const yellow = "#F5C24B";
  const heading = "font-[family-name:var(--font-heading)]";
  const eyebrow =
    "text-[12px] sm:text-[14px] uppercase tracking-[0.18em] font-bold";

  const latest = status?.latest ?? null;
  const progress = status?.progress ?? null;
  const ageMs = latest ? now - new Date(latest.recordedAt).getTime() : null;
  const isLive = ageMs !== null && ageMs < 5 * 60_000;

  const lastSeen =
    ageMs === null
      ? null
      : ageMs < 90_000
        ? "just now"
        : ageMs < 3_600_000
          ? `${Math.round(ageMs / 60_000)} min ago`
          : `${Math.round(ageMs / 3_600_000)} hr ago`;

  const pct = progress?.pct ?? 0;

  return (
    <div className="min-h-screen" style={{ background: bgWash, color: green }}>
      {/* Back link */}
      <div className="px-4 sm:px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-stone-600 hover:text-stone-900"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Back to ESPS PTA
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 sm:px-8 pt-8 pb-4 sm:pt-12">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className={`${eyebrow} inline-block px-4 py-2 rounded-full mb-5`}
            style={{ background: "rgba(35, 74, 58, 0.10)", color: green }}
          >
            ESPS PTA Library Campaign
          </span>
          <h1 className={`${heading} font-bold tracking-tight leading-[1.02] text-[40px] sm:text-[58px] lg:text-[68px]`}>
            London <span style={{ color: orange }}>&rarr;</span> Amsterdam
          </h1>
          <p className={`${heading} mt-4 text-[18px] sm:text-[24px] leading-[1.4] max-w-2xl mx-auto`}>
            Follow our parents live on their{" "}
            <strong className="font-black" style={{ color: orange }}>
              {Math.round(routeData.totalKm).toLocaleString()} km
            </strong>{" "}
            journey, 12&ndash;13 June, riding for our school libraries.
          </p>
        </div>
      </section>

      <main className="px-4 sm:px-6 pb-16 max-w-4xl mx-auto flex flex-col gap-6">
        {/* Progress card */}
        <div className="rounded-3xl bg-white p-5 sm:p-6" style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-500">
              Ride progress
            </p>
            {latest && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                style={{ color: isLive ? "#1d8a4a" : "#a8a29e" }}>
                <span className="w-2 h-2 rounded-full"
                  style={{ background: isLive ? "#1d8a4a" : "#a8a29e", animation: isLive ? "pulse 2s infinite" : undefined }} />
                {isLive ? "Live" : `Last seen ${lastSeen}`}
              </span>
            )}
          </div>

          {progress ? (
            <>
              <div className="mt-1 flex items-baseline justify-between flex-wrap gap-2">
                <span className={`${heading} font-semibold text-[18px] sm:text-[22px] tracking-tight leading-none`} style={{ color: green }}>
                  {progress.doneKm.toLocaleString()} km
                </span>
                <span className={`${heading} text-[18px] sm:text-[22px] tracking-tight leading-none font-semibold`} style={{ color: green }}>
                  of {progress.totalKm.toLocaleString()} km
                </span>
              </div>
              <div className="mt-4 h-3 rounded-full overflow-hidden relative" style={{ background: "rgba(0,0,0,0.12)" }}>
                <div className="h-full rounded-full transition-[width] duration-700"
                  style={{ width: pct + "%", background: `linear-gradient(90deg, ${yellow}, #FFE6A8)` }} />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4">
                <Stat label="Completed" value={`${Math.round(pct)}%`} heading={heading} green={green} />
                <Stat label="To go" value={`${progress.remainingKm.toLocaleString()} km`} heading={heading} green={green} />
                <Stat label="Updated" value={lastSeen ?? "—"} heading={heading} green={green} />
              </div>
            </>
          ) : (
            <p className={`${heading} mt-2 text-[18px] sm:text-[20px]`}>
              The riders haven&rsquo;t set off yet &mdash; tracking goes live on the
              morning of <strong style={{ color: orange }}>12 June</strong>. Check back then!
            </p>
          )}
        </div>

        {/* Map */}
        <RideMap
          route={routeData.points as [number, number][]}
          trail={status?.trail ?? []}
          latest={latest}
        />

        {/* Fundraising card */}
        <div className="rounded-3xl bg-white p-5 sm:p-6" style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
          <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-500">
            Raised so far
          </p>
          <div className="mt-2 flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className={`${heading} font-bold text-[34px] sm:text-[44px] tracking-tight leading-none`} style={{ color: green }}>
                {fundraising?.raised != null
                  ? `£${Math.round(fundraising.raised).toLocaleString()}`
                  : " "}
              </span>
              {fundraising?.donations != null && (
                <p className="mt-1 text-[13px] text-stone-500 font-medium">
                  from {fundraising.donations.toLocaleString()} donations
                  {fundraising.target ? ` · target £${fundraising.target.toLocaleString()}` : ""}
                </p>
              )}
            </div>
            <a
              href={fundraising?.url ?? "https://www.justgiving.com/campaign/espsl2a"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-7 py-3.5 text-white font-bold text-[15px] transition-transform hover:scale-[1.03]"
              style={{ background: orange, boxShadow: "0 4px 0 #B8551F" }}
            >
              Donate on JustGiving
            </a>
          </div>
          {fundraising?.target != null && fundraising?.raised != null && (
            <div className="mt-4 h-3 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.12)" }}>
              <div className="h-full rounded-full transition-[width] duration-700"
                style={{
                  width: Math.min(100, (fundraising.raised / fundraising.target) * 100) + "%",
                  background: `linear-gradient(90deg, ${yellow}, #FFE6A8)`,
                }} />
            </div>
          )}
        </div>

        {/* Photos */}
        <div>
          <h2 className={`${heading} font-bold tracking-tight text-[26px] sm:text-[32px] px-1`}>
            From the road
          </h2>
          {/* Instagram feed via LightWidget (lightwidget.com) — the script
              auto-resizes the iframe to fit its content. */}
          <div
            className="mt-4 rounded-3xl overflow-hidden bg-white p-2 sm:p-3"
            style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}
          >
            <Script src="https://cdn.lightwidget.com/widgets/lightwidget.js" strategy="lazyOnload" />
            <iframe
              src="https://cdn.lightwidget.com/widgets/4e17426dcaa75662a4621e1c521cc14d.html"
              scrolling="no"
              allowTransparency
              className="lightwidget-widget"
              style={{ width: "100%", border: 0, overflow: "hidden" }}
              title="Instagram feed — @esps.pta"
            />
          </div>
          {INSTAGRAM_URL && (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-1 font-bold text-[15px] hover:underline"
              style={{ color: orange }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" /></svg>
              Follow the ride on Instagram
            </a>
          )}
        </div>
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  heading,
  green,
}: {
  label: string;
  value: string;
  heading: string;
  green: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-stone-500">{label}</p>
      <p className={`${heading} mt-1 font-semibold text-[18px] sm:text-[20px] tracking-tight`} style={{ color: green }}>
        {value}
      </p>
    </div>
  );
}
