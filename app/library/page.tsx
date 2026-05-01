"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DonateModal } from "../components/DonateModal";

export default function LibraryPage() {
  const goal = 50000;
  const [stats, setStats] = useState<{ raised: number; donors: number } | null>(null);
  const [recent, setRecent] = useState<{ name: string; amount: number }[]>([]);
  const [donateSource, setDonateSource] = useState<string | null>(null);
  const donateOpen = donateSource !== null;
  const closeDonate = () => setDonateSource(null);
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
    fetch("/api/recent-donations")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && Array.isArray(d.donations)) setRecent(d.donations);
      })
      .catch(() => {});
  }, []);
  const loaded = stats !== null;
  const raised = stats?.raised ?? 0;
  const donors = stats?.donors ?? 0;
  const pct = loaded ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

  const green = "#234A3A";
  const bgWash = "#E8F0E5";
  const orange = "#E0713E";
  const yellow = "#F5C24B";

  const heading = "font-[family-name:var(--font-heading)]";

  const eyebrow = "text-[12px] sm:text-[14px] uppercase tracking-[0.18em] font-bold";

  return (
    <div className="min-h-screen" style={{ background: bgWash, color: green }}>
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
            <span className={`${eyebrow} inline-block px-4 py-2 rounded-full mb-5`}
              style={{ background: "rgba(35, 74, 58, 0.10)", color: green }}>

              ESPS PTA Library Campaign
            </span>
            <h1 className={`${heading} font-bold tracking-tight leading-[1.02] text-[42px] sm:text-[60px] lg:text-[72px]`}>
              Let&rsquo;s{" "}
              <span style={{ color: orange }}>Transform</span>{" "}
              Our Libraries
            </h1>
          </div>

          <p className={`${heading} mt-6 sm:mt-8 text-center font-normal text-[20px] sm:text-[26px] leading-[1.4] max-w-3xl mx-auto`}>
            We need your help to raise{" "}
            <strong className="font-black" style={{ color: orange }}>£50,000</strong>{" "}
            to renovate our libraries, creating spaces that spark{" "}
            <strong className="font-black" style={{ color: orange }}>curiosity</strong>,{" "}
            <strong className="font-black" style={{ color: orange }}>wonder</strong>, and a lifelong{" "}
            <strong className="font-black" style={{ color: orange }}>passion</strong>{" "}
            for books.
          </p>

          {/* Progress card */}
          <div className="mt-6 sm:mt-8 rounded-3xl bg-white p-5 sm:p-6"
            style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
            <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-500">Raised so far</p>
            <div className="mt-1 flex items-baseline justify-between flex-wrap gap-2">
              <span className={`${heading} font-semibold text-[18px] sm:text-[22px] tracking-tight leading-none`}
                style={{ color: green, minHeight: "1em" }}>
                {loaded ? `£${raised.toLocaleString()}` : " "}
              </span>
              <span className={`${heading} text-[18px] sm:text-[22px] tracking-tight leading-none font-semibold`}
                style={{ color: green }}>
                of £{goal.toLocaleString()}
              </span>
            </div>

            <div className="mt-4 h-3 rounded-full overflow-hidden relative" style={{ background: "rgba(0,0,0,0.12)" }}>
              <div className="h-full rounded-full relative transition-[width] duration-700"
                style={{ width: pct + "%", background: `linear-gradient(90deg, ${yellow}, #FFE6A8)` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-3 h-3 rounded-full bg-white"
                  style={{ boxShadow: `0 0 0 2px ${yellow}` }} />
              </div>
            </div>

            <div className="flex justify-between mt-2 text-[12px]">
              <span className="font-bold" style={{ color: green }}>{loaded && `${pct}% there`}</span>
              <span className="text-stone-600">{loaded && `${donors} donors so far`}</span>
            </div>

            <button onClick={() => setDonateSource("library_page")}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[15px] sm:text-[16px] active:scale-[0.99] transition"
              style={{ background: orange, boxShadow: "0 3px 0 #B8551F" }}>
              Donate now →
            </button>
          </div>

          {recent.length > 0 && (() => {
            const repeats = Math.max(2, Math.ceil(12 / recent.length));
            const items = Array.from({ length: repeats }).flatMap(() => recent);
            return (
              <div className="mt-5 overflow-hidden border-t border-b border-stone-300 py-2.5">
                <div className="ticker-track inline-block whitespace-nowrap text-[13px] text-stone-700">
                  {[...items, ...items].map((d, i) => (
                    <span key={i} className="px-4">
                      <span className="font-bold">{d.name}</span>
                      <span className="text-stone-500"> donated </span>
                      <span className="font-bold" style={{ color: orange }}>£{d.amount.toLocaleString()}</span>
                      <span className="text-stone-400 mx-1">·</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Why */}
      <section className="px-6 sm:px-8 pt-2 pb-10 sm:pt-3 sm:pb-16">
        <div className="text-center">
          <span className={`${eyebrow} inline-block px-4 py-2 rounded-full`}
            style={{ background: "rgba(35, 74, 58, 0.10)", color: green }}>

            Why This Matters
          </span>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-5 sm:mt-7">
          <h2 className={`${heading} font-bold text-[30px] sm:text-[40px] tracking-tight leading-tight`}>
            Libraries at the heart of our school
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            Our two libraries have served generations of ESPS children, but they no longer match the
            ambition we have for our pupils as readers. With your help, we can build spaces that will
            inspire young readers for decades to come.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            { src: "/library/ks1-today.jpg", label: "KS1" },
            { src: "/library/ks2-today.jpg", label: "KS2" },
          ].map((p) => (
            <figure key={p.label} className="relative rounded-2xl overflow-hidden bg-stone-100"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
              <Image src={p.src} alt={`${p.label} library at East Sheen Primary today`} width={1600} height={1200}
                className="w-full h-full block object-cover" style={{ aspectRatio: "4/3" }} />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-white"
                style={{ color: green }}>
                {p.label}
              </span>
            </figure>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="px-6 sm:px-8 pt-2 pb-10 sm:pt-4 sm:pb-16">
        <div className="text-center">
          <span className={`${eyebrow} inline-block px-4 py-2 rounded-full`}
            style={{ background: "rgba(35, 74, 58, 0.10)", color: green }}>

            Imagine The Possibilities
          </span>
        </div>
        <div className="max-w-3xl mx-auto text-center mt-5 sm:mt-7">
          <h2 className={`${heading} font-bold text-[30px] sm:text-[40px] tracking-tight leading-tight`}>
            The Vision
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            Inspired by nature, our vision is to create immersive environments that nurture imagination
            and growth. We&rsquo;re working with library suppliers on the final designs, and
            we&rsquo;ll share them later this term. We aim to install the new libraries over the summer holiday.
            Below are visuals shaping the design.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { src: "/library/library-render-2.jpg", alt: "Library design concept — story canopy and arched shelves" },
            { src: "/library/library-render-3.jpg", alt: "Library design concept — curved shelving and reading mezzanine" },
            { src: "/library/library-render-1.jpg", alt: "Library design concept — mezzanine reading nook" },
          ].map((r) => (
            <figure key={r.src} className="rounded-2xl overflow-hidden bg-stone-100"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
              <Image src={r.src} alt={r.alt} width={800} height={600}
                className="w-full h-full block object-cover" style={{ aspectRatio: "4/3" }} />
            </figure>
          ))}
        </div>

        <p className="text-center text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 mt-4">
          Design inspiration — final designs to come
        </p>
      </section>

      {/* Budget */}
      <section className="px-6 sm:px-8 pt-2 pb-10 sm:pt-4 sm:pb-16">
        <div className="text-center">
          <span className={`${eyebrow} inline-block px-4 py-2 rounded-full`}
            style={{ background: "rgba(35, 74, 58, 0.10)", color: green }}>
            How We Get There
          </span>
        </div>
        <div className="max-w-3xl mx-auto text-center mt-5 sm:mt-7">
          <h2 className={`${heading} font-bold text-[30px] sm:text-[40px] tracking-tight leading-tight`}>
            The Budget
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            Our budget is informed by a tender and design process with several library suppliers
            throughout the spring term. We estimate the KS1 library will cost{" "}
            <strong className="font-black" style={{ color: orange }}>~£20,000</strong>{" "}
            and the KS2 library{" "}
            <strong className="font-black" style={{ color: orange }}>~£30,000</strong>. The KS1
            library needs new flooring, minor structural improvements, and effective heating and
            cooling, which add to the cost.
          </p>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            We&rsquo;re working with the school to ensure every pound has an impact. Any surplus will
            go to our book stock — a focus for the autumn.
          </p>
        </div>
      </section>

      {/* Stretching Your Donation Further */}
      <section className="px-6 sm:px-8 pt-2 pb-10 sm:pt-4 sm:pb-16">
        <div className="text-center">
          <span className={`${eyebrow} inline-block px-4 py-2 rounded-full`}
            style={{ background: "rgba(35, 74, 58, 0.10)", color: green }}>
            Building This Together
          </span>
        </div>
        <div className="max-w-3xl mx-auto text-center mt-5 sm:mt-7">
          <h2 className={`${heading} font-bold text-[30px] sm:text-[40px] tracking-tight leading-tight`}>
            Stretching Your Donation Further
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            We&rsquo;ll be fundraising throughout this term for the library campaign. Direct donations
            are hugely appreciated and can be made here.
          </p>
          <button onClick={() => setDonateSource("library_page")}
            className="mt-5 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-[15px] sm:text-[16px] active:scale-[0.99] transition"
            style={{ background: orange, boxShadow: "0 3px 0 #B8551F" }}>
            Donate now →
          </button>
          <p className={`${heading} mt-6 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            Opting into Gift Aid adds a 25% boost. If your employer matches charitable giving, please
            let us know — even modest amounts make a big difference. We&rsquo;re registered with
            Benevity and CAF.
          </p>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            The charity bike ride to Amsterdam is supporting the library campaign this year — and at
            least one rider&rsquo;s employer will match sponsor donations, doubling the impact.
            We&rsquo;ll also be running smaller events throughout the term — keep an eye out for
            updates.
          </p>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            For larger gifts, there are sponsorship opportunities for individual library elements.
            Get in touch to discuss.
          </p>

          <h2 className={`${heading} font-bold text-[30px] sm:text-[40px] tracking-tight leading-tight mt-12 sm:mt-16`}>
            Other Ways to Contribute
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            We need volunteers to help process incoming book stock and run our after-school library
            hours — please email{" "}
            <a href="mailto:shannon@espspta.org"
              className="font-bold underline decoration-2 underline-offset-4"
              style={{ color: orange, textDecorationColor: orange }}>
              shannon@espspta.org
            </a>{" "}
            if you&rsquo;re interested. Later this term, parents and pupils will also be able to
            contribute to our library book wishlist.
          </p>
        </div>
      </section>

      {/* Photo break */}
      <section className="px-6 sm:px-8 pt-2 pb-6 sm:pt-4 sm:pb-10">
        <div className="max-w-xl mx-auto">
          <figure className="rounded-2xl overflow-hidden bg-stone-100"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
            <Image src="/library/child-browsing.jpg" alt="A pupil browsing books in the ESPS library"
              width={1600} height={1067}
              className="w-full h-auto block" />
          </figure>
        </div>
      </section>

      {/* Get in touch */}
      <section className="px-6 sm:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className={`${eyebrow} inline-block px-4 py-2 rounded-full`}
            style={{ background: "rgba(35, 74, 58, 0.10)", color: green }}>

            Any Questions
          </span>
          <h2 className={`${heading} font-bold text-[30px] sm:text-[40px] tracking-tight mt-3 leading-tight`}>
            Get in touch
          </h2>
          <p className={`${heading} mt-4 text-stone-700 text-[16px] sm:text-[17px] leading-[1.7] font-normal`}>
            Please reach out to{" "}
            <a href="mailto:pta@espspta.org"
              className="font-bold underline decoration-2 underline-offset-4"
              style={{ color: orange, textDecorationColor: orange }}>
              pta@espspta.org
            </a>{" "}
            with any questions.
          </p>
        </div>
      </section>

      <DonateModal open={donateOpen} onClose={closeDonate} source={donateSource} />
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
