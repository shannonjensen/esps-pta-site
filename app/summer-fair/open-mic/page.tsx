"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const cream = "#FAF3E6";
const navy = "#1C3A5E";
const pink = "#E6398A";
const green = "#5BB54A";
const orange = "#F07F2D";
const purple = "#8E4FA8";
const heading = "font-[family-name:var(--font-heading)]";

const YEAR_GROUPS = [
  "Nursery",
  "Reception",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Family / grown-up",
];

type Performer = {
  position: number;
  firstName: string;
  yearGroup: string;
  performerType: string;
};

const typeLabel: Record<string, string> = {
  student: "Student",
  parent: "Parent",
  both: "Parent & child",
};

export default function OpenMicSignupPage() {
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [count, setCount] = useState<number | null>(null);

  // form state
  const [performerName, setPerformerName] = useState("");
  const [yearGroup, setYearGroup] = useState("");
  const [performerType, setPerformerType] = useState("");
  const [description, setDescription] = useState("");
  const [needsBacking, setNeedsBacking] = useState(false);
  const [backingLink, setBackingLink] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [donePosition, setDonePosition] = useState<number | null>(null);

  const loadLineup = useCallback(() => {
    fetch("/api/open-mic/signups")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && Array.isArray(d.performers)) {
          setPerformers(d.performers);
          setCount(d.count ?? d.performers.length);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadLineup();
  }, [loadLineup]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await fetch("/api/open-mic/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          performerName,
          yearGroup,
          performerType,
          description,
          needsBacking,
          backingLink,
          contactEmail,
          website,
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(d.error || "Something went wrong — please try again.");
      } else {
        setDonePosition(d.position ?? null);
        loadLineup();
      }
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none focus:ring-2";
  const inputStyle = { borderColor: "#0000001f", color: navy } as const;
  const labelCls = "block text-[13px] font-bold mb-1.5";

  return (
    <div className="min-h-screen" style={{ background: cream, color: navy }}>
      <div className="px-4 sm:px-6 pt-6">
        <Link
          href="/summer-fair"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-stone-600 hover:text-stone-900"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Back to Summer Fair
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 sm:px-8 pt-6 pb-2 text-center max-w-2xl mx-auto">
        <span className="inline-block px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.16em] font-bold"
          style={{ background: `${purple}1F`, color: purple }}>
          🎤 Open Mic · 5:15–6pm
        </span>
        <h1 className={`${heading} font-black tracking-tight leading-[1.0] mt-4`} style={{ fontSize: "clamp(40px, 11vw, 68px)" }}>
          Take the <span style={{ color: orange }}>Stage</span>
        </h1>
        <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-stone-700">
          Singers, musicians and performers of all ages are welcome to round off
          the fair on the Astro stage. Sign up below and we&rsquo;ll call
          performers up in sign-up order.
        </p>
      </section>

      {/* How it works */}
      <section className="px-5 sm:px-6 pt-5 pb-2 max-w-2xl mx-auto">
        <div className="rounded-3xl bg-white p-5 sm:p-6" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          <h2 className={`${heading} font-black text-[18px]`} style={{ color: navy }}>How it works</h2>
          <ul className="mt-3 space-y-2.5 text-[14px] sm:text-[15px] text-stone-700">
            {[
              ["🎶", "Perform whatever you like — a song, an instrument, a joke or a poem."],
              ["🔢", "It's a running order, not timed slots — we'll call performers in the order they signed up."],
              ["🎸", "Bring any instruments you need. There'll be a classroom where you can store them securely during the fair."],
              ["🎧", "Need backing music? Add a link below, or email it to pta@espspta.org."],
            ].map(([icon, text]) => (
              <li key={text} className="flex gap-3">
                <span className="text-[18px] leading-none mt-0.5">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section className="px-5 sm:px-6 pt-5 pb-4 max-w-2xl mx-auto">
        {donePosition !== null ? (
          <div className="rounded-3xl p-7 sm:p-9 text-center text-white" style={{ background: green, boxShadow: "0 10px 26px rgba(91,181,74,0.4)" }}>
            <div className="text-[44px]">🎉</div>
            <h2 className={`${heading} font-black text-[26px] sm:text-[32px] mt-1`}>You&rsquo;re signed up!</h2>
            <p className="mt-2 text-[16px] text-white/95">
              {donePosition
                ? <>You&rsquo;re <strong>#{donePosition}</strong> in the running order. We can&rsquo;t wait to see you on the Astro stage!</>
                : <>We can&rsquo;t wait to see you on the Astro stage!</>}
            </p>
            <button
              onClick={() => {
                setDonePosition(null);
                setPerformerName(""); setYearGroup(""); setPerformerType("");
                setDescription(""); setNeedsBacking(false); setBackingLink(""); setContactEmail("");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-[15px] bg-white"
              style={{ color: green }}
            >
              Sign up another performer
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-3xl bg-white p-5 sm:p-7" style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.10)" }}>
            <h2 className={`${heading} font-black text-[22px] sm:text-[26px]`} style={{ color: navy }}>Sign up to perform</h2>

            {/* honeypot */}
            <input
              type="text" tabIndex={-1} autoComplete="off" value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden" aria-hidden="true"
            />

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={{ color: navy }}>Performer name(s) <span style={{ color: pink }}>*</span></label>
                <input className={inputCls} style={inputStyle} value={performerName} onChange={(e) => setPerformerName(e.target.value)} placeholder="e.g. Amara Patel" required />
              </div>
              <div>
                <label className={labelCls} style={{ color: navy }}>Year group <span style={{ color: pink }}>*</span></label>
                <select className={inputCls} style={inputStyle} value={yearGroup} onChange={(e) => setYearGroup(e.target.value)} required>
                  <option value="" disabled>Choose…</option>
                  {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className={labelCls} style={{ color: navy }}>Who&rsquo;s performing? <span style={{ color: pink }}>*</span></label>
              <div className="flex flex-wrap gap-2">
                {[["student", "Student"], ["parent", "Parent"], ["both", "Parent & child"]].map(([val, lab]) => (
                  <button
                    type="button" key={val}
                    onClick={() => setPerformerType(val)}
                    className="px-4 py-2.5 rounded-full font-bold text-[14px] border transition"
                    style={performerType === val
                      ? { background: purple, color: "#fff", borderColor: purple }
                      : { background: "#fff", color: navy, borderColor: "#0000001f" }}
                  >
                    {lab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className={labelCls} style={{ color: navy }}>Brief description of your act <span style={{ color: pink }}>*</span></label>
              <textarea className={`${inputCls} min-h-[84px] resize-y`} style={inputStyle} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Singing 'Let It Go', piano solo, magic trick…" required />
            </div>

            <div className="mt-4 rounded-2xl p-4" style={{ background: cream }}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={needsBacking} onChange={(e) => setNeedsBacking(e.target.checked)} className="mt-1 w-4 h-4" />
                <span className="text-[14px] font-semibold" style={{ color: navy }}>I&rsquo;ll need backing music played</span>
              </label>
              {needsBacking && (
                <div className="mt-3">
                  <label className={labelCls} style={{ color: navy }}>Link to your backing track</label>
                  <input className={inputCls} style={inputStyle} value={backingLink} onChange={(e) => setBackingLink(e.target.value)} placeholder="YouTube, Spotify or Google Drive link" />
                  <p className="text-[12px] text-stone-500 mt-1.5">
                    No link to hand? You can email it to <strong>pta@espspta.org</strong> instead.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className={labelCls} style={{ color: navy }}>Contact email <span className="font-normal text-stone-400">(optional)</span></label>
              <input type="email" className={inputCls} style={inputStyle} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="So we can reach you about backing music or the running order" />
            </div>

            {error && <p className="mt-4 text-[14px] font-semibold" style={{ color: "#C8341B" }}>{error}</p>}

            <button
              type="submit" disabled={busy}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-white font-bold text-[16px] disabled:opacity-60"
              style={{ background: orange, boxShadow: "0 4px 0 #C85B1C" }}
            >
              {busy ? "Signing up…" : "Sign up to perform 🎤"}
            </button>
          </form>
        )}
      </section>

      {/* Lineup */}
      <section className="px-5 sm:px-6 pt-4 pb-12 max-w-2xl mx-auto">
        <div className="rounded-3xl bg-white p-5 sm:p-6" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between">
            <h2 className={`${heading} font-black text-[20px] sm:text-[22px]`} style={{ color: navy }}>The line-up so far</h2>
            <span className="px-3 py-1 rounded-full text-[13px] font-bold" style={{ background: `${purple}1F`, color: purple }}>
              {count ?? "—"} signed up
            </span>
          </div>
          {count === 0 ? (
            <p className="mt-4 text-[15px] text-stone-600">No one yet — be the first to take the stage!</p>
          ) : (
            <ol className="mt-4 space-y-2">
              {performers.map((p) => (
                <li key={p.position} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ background: cream }}>
                  <span className={`${heading} font-black text-[15px] w-6 shrink-0`} style={{ color: purple }}>{p.position}</span>
                  <span className="font-bold text-[15px]" style={{ color: navy }}>{p.firstName}</span>
                  <span className="text-[13px] text-stone-500">{p.yearGroup}</span>
                  <span className="ml-auto text-[12px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#0000000a", color: navy }}>
                    {typeLabel[p.performerType] ?? p.performerType}
                  </span>
                </li>
              ))}
            </ol>
          )}
          <p className="mt-4 text-[12px] text-stone-400">
            Only first names and year groups are shown here — act details stay private.
          </p>
        </div>
      </section>
    </div>
  );
}
