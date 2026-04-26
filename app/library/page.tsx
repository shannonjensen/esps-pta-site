"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LibraryPage() {
  const raised = 18400;
  const goal = 50000;
  const donors = 142;
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  const accent = "#5B8E5A";

  const heading = "font-[family-name:var(--font-heading)]";

  const plan = [
    { phase: "Phase 1", title: "KS1 Reading Den", target: "£15,000", desc: "Soft seating, story corner, picture book curation, mural commission." },
    { phase: "Phase 2", title: "KS2 Library Refresh", target: "£25,000", desc: "New shelving, study nooks, fiction & non-fiction restock, librarian-led launch." },
    { phase: "Phase 3", title: "Always-Open Hours", target: "£10,000", desc: "Fund after-school librarian, weekend events, parent-volunteer training." },
  ];

  const renders = [
    { src: "/library/library-render-1.jpg", alt: "Library design concept — mezzanine reading nook" },
    { src: "/library/library-render-2.jpg", alt: "Library design concept — story canopy and arched shelves" },
    { src: "/library/library-render-3.jpg", alt: "Library design concept — curved shelving and reading mezzanine" },
    { src: "/library/library-render-4.jpg", alt: "Library design concept — children playing in a circular reading nook" },
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-bold mb-5 whitespace-nowrap"
              style={{ background: "#DEEBDA", color: "#3D6B3D" }}>
              <Star color="#3D6B3D" size={11} /> The Big Campaign <Star color="#3D6B3D" size={11} />
            </span>
            <h1 className={`${heading} font-black tracking-tight leading-[0.95] text-[36px] sm:text-[64px] lg:text-[80px] text-stone-900`}>
              Love Our<br />
              <span className="relative inline-block">
                <span style={{ color: accent, position: "relative", zIndex: 1 }}>Libraries.</span>
                <Squiggle color="#E0713E" className="absolute left-0 right-0" style={{ bottom: -6, height: 10, width: "100%" }} />
              </span>
            </h1>
            <p className={`${heading} mt-4 text-stone-700 text-[12.5px] sm:text-[18px] leading-[1.55] max-w-2xl mx-auto font-normal`}>
              We&rsquo;re raising £{goal.toLocaleString()} to transform our KS1 and KS2 libraries into inspiring spaces where every
              child at East Sheen Primary falls in love with reading.
            </p>
          </div>

          {/* Progress card */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto rounded-3xl bg-white p-5 sm:p-6"
            style={{ border: "1px solid #1a1a1a10", boxShadow: "0 12px 32px rgba(20,30,40,0.08)" }}>
            <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-500">Raised so far</p>
            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <span className={`${heading} font-black text-[36px] sm:text-[52px] tracking-tight leading-none`}
                style={{ color: "#235D69" }}>
                £{raised.toLocaleString()}
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
                {pct}%
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 text-[12px] whitespace-nowrap">
              <span className="text-stone-600"><span className="font-bold text-stone-900">{donors}</span> donors</span>
              <span className="font-bold" style={{ color: "#B8551F" }}>£{(goal - raised).toLocaleString()} to go</span>
            </div>

            <button className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[14px] sm:text-[15px]"
              style={{ background: accent, boxShadow: "0 3px 0 #3D6B3D" }}>
              Donate now →
            </button>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-6 sm:px-8 pt-2 pb-10 sm:pt-4 sm:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: "#E0713E" }}>Why this matters</span>
          <h2 className={`${heading} font-black text-[26px] sm:text-[40px] tracking-tight mt-3 leading-tight text-stone-900`}>
            Libraries at the heart of our school.
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[14.5px] sm:text-[16px] leading-[1.7] font-normal`}>
            Reading isn&rsquo;t just a part of the curriculum — it&rsquo;s at the heart of how our children
            learn, imagine, and grow.
          </p>
          <p className={`${heading} mt-4 text-stone-700 text-[14.5px] sm:text-[16px] leading-[1.7] font-normal`}>
            Libraries are where the joy of reading takes root. We&rsquo;re lucky to have two at ESPS,
            and we want them to be places every child remembers for the rest of their lives.
          </p>
        </div>
      </section>

      {/* Plan */}
      <section className="px-6 sm:px-8 py-8 sm:py-12" style={{ background: "#FAF6EE" }}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: accent }}>The plan</span>
          <h2 className={`${heading} font-black text-[26px] sm:text-[40px] tracking-tight mt-3 leading-tight text-stone-900`}>
            Imagine the possibilities.
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[14.5px] sm:text-[16px] leading-[1.7] font-normal`}>
            The school and PTA are currently working with library suppliers on the final designs, which
            will be shared and displayed later this term.
          </p>
          <p className={`${heading} mt-4 text-stone-700 text-[14.5px] sm:text-[16px] leading-[1.7] font-normal`}>
            With your generous support, we will be able to install the libraries over the summer holiday.
          </p>
        </div>

        {/* Render previews */}
        <div className="max-w-3xl mx-auto mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {renders.map((r, i) => (
            <figure key={i} className="rounded-2xl overflow-hidden bg-stone-100"
              style={{ border: "1px solid #1a1a1a10", boxShadow: "0 8px 24px rgba(20,30,40,0.08)" }}>
              <Image src={r.src} alt={r.alt} width={800} height={600} className="w-full h-full block object-cover" style={{ aspectRatio: "4/3" }} />
            </figure>
          ))}
        </div>
        <p className="text-center text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 mt-4">
          Concept renders — final designs to come
        </p>
      </section>

      {/* Make a difference */}
      <section className="px-6 sm:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: "#E0713E" }}>Make a difference</span>
          <h2 className={`${heading} font-black text-[26px] sm:text-[40px] tracking-tight mt-3 leading-tight text-stone-900`}>
            Every contribution helps write the next chapter.
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[14.5px] sm:text-[16px] leading-[1.7] font-normal`}>
            You can help make our libraries places that inspire children for many years to come.
            Please consider making a donation.
          </p>
          <p className={`${heading} mt-4 text-stone-700 text-[14.5px] sm:text-[16px] leading-[1.7] font-normal`}>
            As a charitable organisation, donations are eligible for employer matching schemes and Gift Aid.
          </p>
          <button className="mt-7 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-[15px] sm:text-[16px]"
            style={{ background: accent, boxShadow: "0 3px 0 #3D6B3D" }}>
            Donate now →
          </button>
        </div>
      </section>

      {/* Get in touch */}
      <section className="px-6 sm:px-8 py-12 sm:py-16" style={{ background: "#FAF6EE" }}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: "#E0713E" }}>Any questions</span>
          <h2 className={`${heading} font-black text-[26px] sm:text-[40px] tracking-tight mt-3 leading-tight text-stone-900`}>
            Get in touch.
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[14.5px] sm:text-[16px] leading-[1.7] font-normal`}>
            Please reach out to{" "}
            <a href="mailto:shannon@espspta.org"
              className="font-bold underline decoration-2 underline-offset-4"
              style={{ color: accent, textDecorationColor: "#E0713E" }}>
              shannon@espspta.org
            </a>{" "}
            with any questions.
          </p>
          <p className={`${heading} mt-4 text-stone-700 text-[14.5px] sm:text-[16px] leading-[1.7] font-normal`}>
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

function Star({ color = "#F5C24B", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L13.5 9 L20 9.5 L15 13.5 L17 20 L12 16 L7 20 L9 13.5 L4 9.5 L10.5 9 Z" fill={color} stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
