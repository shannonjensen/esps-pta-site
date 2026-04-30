"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LibraryPage() {
  const goal = 50000;
  const [stats, setStats] = useState<{ raised: number; donors: number } | null>(null);
  useEffect(() => {
    fetch("/api/totals")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.raised === "number") {
          setStats({ raised: d.raised, donors: d.donors });
        } else {
          setStats({ raised: 0, donors: 0 });
        }
      })
      .catch(() => setStats({ raised: 0, donors: 0 }));
  }, []);
  const loaded = stats !== null;
  const raised = stats?.raised ?? 0;
  const donors = stats?.donors ?? 0;
  const pct = loaded ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
  const accent = "#5B8E5A";
  const orange = "#E0713E";
  const gold = "#C28E1C";

  const heading = "font-[family-name:var(--font-heading)]";

  const pairs = [
    {
      today: { src: "/library/ks1-current.jpg", alt: "Current KS1 library at East Sheen Primary" },
      after: { src: "/library/library-render-1.jpg", alt: "KS1 reading den concept render" },
    },
    {
      today: { src: "/library/ks2-current.jpg", alt: "Current KS2 library at East Sheen Primary" },
      after: { src: "/library/library-render-3.jpg", alt: "KS2 mezzanine reading concept render" },
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FBF9F4" }}>
      {/* Back link */}
      <div className="px-4 sm:px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-semibold text-stone-600 hover:text-stone-900">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Back to ESPS PTA
        </Link>
      </div>

      {/* Hero */}
      <section className="relative px-6 sm:px-8 pt-10 pb-6 sm:py-14 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-bold mb-5"
              style={{ background: "#DEEBDA", color: "#3D6B3D" }}>
              ESPS PTA Library Campaign
            </span>
            <h1 className={`${heading} font-black tracking-tight leading-[1.02] text-[52px] sm:text-[76px] lg:text-[88px] text-stone-900`}>
              Let&rsquo;s{" "}
              <span className="relative inline-block">
                <span style={{ color: orange, position: "relative", zIndex: 1 }}>Transform</span>
                <Squiggle color={orange} className="absolute left-0 right-0" style={{ bottom: -6, height: 10, width: "100%" }} />
              </span>{" "}
              Our Libraries
            </h1>
            <p className={`${heading} mt-6 text-stone-700 text-[18px] sm:text-[22px] leading-[1.5] max-w-2xl mx-auto font-normal`}>
              into{" "}
              <span className="relative inline-block">
                inspiring spaces
                <Squiggle color={orange} className="absolute left-0 right-0" style={{ bottom: -3, height: 8, width: "100%" }} />
              </span>{" "}
              where every child can fall in love with reading.
            </p>
          </div>

          {/* Progress card */}
          <div className="mt-8 sm:mt-10 rounded-3xl bg-white p-5 sm:p-6"
            style={{ border: "1px solid #1a1a1a10", boxShadow: "0 12px 32px rgba(20,30,40,0.08)" }}>
            <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-500">Raised so far</p>
            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <span className={`${heading} font-black text-[36px] sm:text-[52px] tracking-tight leading-none`}
                style={{ color: "#235D69", minHeight: "1em" }}>
                {loaded ? `£${raised.toLocaleString()}` : " "}
              </span>
              <span className="text-stone-500 text-[13px] sm:text-[15px] font-medium">
                of £{goal.toLocaleString()}
              </span>
            </div>

            {/* Thermometer */}
            <div className="mt-4 flex items-center gap-2.5">
              <div className="relative flex-1 min-w-0">
                <div className="h-4 rounded-full overflow-hidden" style={{ background: "#EFEAE0" }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: pct + "%", background: "linear-gradient(90deg, #5B8E5A 0%, #88B36F 50%, #F5C24B 100%)" }} />
                </div>
                {[25, 50, 75].map((m) => (
                  <div key={m} className="absolute top-0 bottom-0 w-px bg-white/70" style={{ left: m + "%" }} />
                ))}
              </div>
              <div className={`${heading} font-black text-[15px] leading-none shrink-0`} style={{ color: "#3D6B3D" }}>
                {loaded ? `${pct}%` : ""}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 text-[12px] whitespace-nowrap">
              <span className="text-stone-600">{loaded && (<><span className="font-bold text-stone-900">{donors}</span> donors</>)}</span>
              <span className="font-bold" style={{ color: "#B8551F" }}>{loaded && `£${(goal - raised).toLocaleString()} to go`}</span>
            </div>

            <button className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[15px] sm:text-[16px]"
              style={{ background: accent, boxShadow: "0 3px 0 #3D6B3D" }}>
              Donate now →
            </button>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-6 sm:px-8 pt-2 pb-10 sm:pt-4 sm:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: orange }}>Why this matters</span>
          <h2 className={`${heading} font-black text-[30px] sm:text-[40px] tracking-tight mt-3 leading-tight text-stone-900`}>
            Libraries at the heart of our school.
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            Reading isn&rsquo;t just a part of the curriculum — it&rsquo;s at the heart of how our children
            learn, imagine, and grow.
          </p>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            Libraries are where the joy of reading takes root. We&rsquo;re lucky to have two at ESPS,
            and we want them to be places every child remembers for the rest of their lives.
          </p>
        </div>
      </section>

      {/* Before & after */}
      <section className="px-6 sm:px-8 py-10 sm:py-16" style={{ background: "#FAF6EE" }}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: accent }}>Before &amp; after</span>
          <h2 className={`${heading} font-black text-[30px] sm:text-[40px] tracking-tight mt-3 leading-tight text-stone-900`}>
            Imagine the possibilities.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mt-8 sm:mt-12 space-y-8 sm:space-y-10">
          {pairs.map((pair, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">Today</p>
                <figure className="rounded-2xl overflow-hidden bg-stone-100"
                  style={{ border: "1px solid #1a1a1a10", boxShadow: "0 8px 24px rgba(20,30,40,0.08)" }}>
                  <Image src={pair.today.src} alt={pair.today.alt} width={800} height={600}
                    className="w-full h-full block object-cover" style={{ aspectRatio: "4/3" }} />
                </figure>
              </div>
              <div className="flex justify-center">
                <svg className="hidden sm:block" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
                <svg className="sm:hidden" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2" style={{ color: orange }}>An appealing, modern space</p>
                <figure className="rounded-2xl overflow-hidden bg-stone-100"
                  style={{ border: `1.5px solid ${orange}55`, boxShadow: "0 8px 24px rgba(20,30,40,0.08)" }}>
                  <Image src={pair.after.src} alt={pair.after.alt} width={800} height={600}
                    className="w-full h-full block object-cover" style={{ aspectRatio: "4/3" }} />
                </figure>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 mt-6 sm:mt-8">
          Conceptual renders — final designs to come
        </p>
      </section>

      {/* Money paragraph + CTA */}
      <section className="px-6 sm:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className={`${heading} font-bold text-[22px] sm:text-[30px] leading-[1.4] text-stone-900`}>
            We need your help to raise{" "}
            <strong className="font-black" style={{ color: gold }}>£50,000</strong>{" "}
            to renovate our libraries, creating spaces that spark{" "}
            <strong className="font-black" style={{ color: gold }}>curiosity</strong>,{" "}
            <strong className="font-black" style={{ color: gold }}>wonder</strong>, and a{" "}
            <span className="relative inline-block">
              <strong className="font-black" style={{ color: gold }}>lifelong passion for books</strong>
              <Squiggle color={orange} className="absolute left-0 right-0" style={{ bottom: -3, height: 8, width: "100%" }} />
            </span>
            .
          </p>
          <p className={`${heading} mt-5 text-stone-600 text-[15px] sm:text-[16px] leading-[1.6] font-normal`}>
            As a charitable organisation, donations are eligible for employer matching schemes and Gift Aid.
          </p>
          <button className="mt-7 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-[16px] sm:text-[17px]"
            style={{ background: accent, boxShadow: "0 3px 0 #3D6B3D" }}>
            Donate now →
          </button>
        </div>
      </section>

      {/* Get in touch */}
      <section className="px-6 sm:px-8 py-12 sm:py-16" style={{ background: "#FAF6EE" }}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: orange }}>Any questions</span>
          <h2 className={`${heading} font-black text-[30px] sm:text-[40px] tracking-tight mt-3 leading-tight text-stone-900`}>
            Get in touch.
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            Please reach out to{" "}
            <a href="mailto:shannon@espspta.org"
              className="font-bold underline decoration-2 underline-offset-4"
              style={{ color: accent, textDecorationColor: orange }}>
              shannon@espspta.org
            </a>{" "}
            with any questions.
          </p>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            If you are able and willing to make a significant donation, there are opportunities to sponsor
            reading nooks and cosy corners. Please email for more information.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ── Primitives ── */
function Squiggle({ color = "#E0713E", className = "", style }: { color?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 14" className={className} style={style} fill="none" preserveAspectRatio="none">
      <path d="M2 8 Q 18 1, 34 7 T 66 7 T 98 7 T 130 7 T 162 7 T 198 7" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
