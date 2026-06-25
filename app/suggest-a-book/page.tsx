"use client";

import { useState } from "react";
import Link from "next/link";

const green = "#234A3A";
const bgWash = "#E8F0E5";
const orange = "#E0713E";
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

export default function SuggestABookPage() {
  // form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [suggestedBy, setSuggestedBy] = useState("");
  const [yearGroup, setYearGroup] = useState("");
  const [reason, setReason] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() && !author.trim()) {
      setError("Please add a book title or an author.");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/suggest-a-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, suggestedBy, yearGroup, reason, website }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(d.error || "Something went wrong — please try again.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setBusy(false);
    }
  };

  const resetForm = () => {
    setDone(false);
    setTitle(""); setAuthor(""); setSuggestedBy(""); setYearGroup(""); setReason("");
  };

  const inputCls =
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none focus:ring-2";
  const inputStyle = { borderColor: "#0000001f", color: green } as const;
  const labelCls = "block text-[13px] font-bold mb-1.5";
  const eyebrow = "text-[12px] sm:text-[14px] uppercase tracking-[0.18em] font-bold";

  return (
    <div className="min-h-screen" style={{ background: bgWash, color: green }}>
      {/* Back link */}
      <div className="px-4 sm:px-6 pt-6">
        <Link href="/library" className="inline-flex items-center gap-2 text-[14px] font-semibold text-stone-600 hover:text-stone-900">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Back to the Library Campaign
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 sm:px-8 pt-8 pb-2 text-center max-w-2xl mx-auto">
        <span className={`${eyebrow} inline-block px-4 py-2 rounded-full mb-5`}
          style={{ background: "rgba(35, 74, 58, 0.10)", color: green }}>
          📚 Library Book Wishlist
        </span>
        <h1 className={`${heading} font-bold tracking-tight leading-[1.02] text-[40px] sm:text-[58px]`}>
          Suggest a <span style={{ color: orange }}>Book</span>
        </h1>
        <p className={`${heading} mt-5 text-center font-normal text-[18px] sm:text-[21px] leading-[1.45] text-stone-700`}>
          Help us fill our new libraries with books our children will love.
          Tell us a title you&rsquo;d love to see on the shelves — and we&rsquo;ll
          add it to our wishlist.
        </p>
      </section>

      {/* How it works */}
      <section className="px-5 sm:px-6 pt-6 pb-2 max-w-2xl mx-auto">
        <div className="rounded-3xl bg-white p-5 sm:p-6" style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          <h2 className={`${heading} font-black text-[18px]`} style={{ color: green }}>How it works</h2>
          <ul className="mt-3 space-y-2.5 text-[14px] sm:text-[15px] text-stone-700">
            {[
              ["✍️", "Know the title or the author? Either is fine — pop in whatever you remember."],
              ["💛", "Tell us why it's a favourite if you like — it helps us choose."],
              ["📖", "We'll review all suggestions and work them into our book-buying plans."],
              ["🔁", "Got a few in mind? Send them one at a time."],
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
        {done ? (
          <div className="rounded-3xl p-7 sm:p-9 text-center text-white" style={{ background: green, boxShadow: "0 10px 26px rgba(35,74,58,0.4)" }}>
            <div className="text-[44px]">🎉</div>
            <h2 className={`${heading} font-black text-[26px] sm:text-[32px] mt-1`}>Thank you!</h2>
            <p className="mt-2 text-[16px] text-white/95">
              Your suggestion has been added to our wishlist. Thank you for helping
              shape our new libraries!
            </p>
            <button
              onClick={resetForm}
              className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-[15px] bg-white"
              style={{ color: green }}
            >
              Suggest another book
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-3xl bg-white p-5 sm:p-7" style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.10)" }}>
            <h2 className={`${heading} font-black text-[22px] sm:text-[26px]`} style={{ color: green }}>Suggest a book</h2>
            <p className="mt-1 text-[13px] text-stone-500">Add a title, an author, or both — whatever you know.</p>

            {/* honeypot */}
            <input
              type="text" tabIndex={-1} autoComplete="off" value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden" aria-hidden="true"
            />

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={{ color: green }}>Book title</label>
                <input className={inputCls} style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Boy at the Back of the Class" />
              </div>
              <div>
                <label className={labelCls} style={{ color: green }}>Author</label>
                <input className={inputCls} style={inputStyle} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. Onjali Q. Raúf" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={{ color: green }}>Suggested by <span className="font-normal text-stone-400">(optional)</span></label>
                <input className={inputCls} style={inputStyle} value={suggestedBy} onChange={(e) => setSuggestedBy(e.target.value)} placeholder="First name" />
              </div>
              <div>
                <label className={labelCls} style={{ color: green }}>Year group <span className="font-normal text-stone-400">(optional)</span></label>
                <select className={inputCls} style={inputStyle} value={yearGroup} onChange={(e) => setYearGroup(e.target.value)}>
                  <option value="">Choose…</option>
                  {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className={labelCls} style={{ color: green }}>Why this book? <span className="font-normal text-stone-400">(optional)</span></label>
              <textarea className={`${inputCls} min-h-[84px] resize-y`} style={inputStyle} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. My favourite — funny and full of adventure!" />
            </div>

            {error && <p className="mt-4 text-[14px] font-semibold" style={{ color: "#C8341B" }}>{error}</p>}

            <button
              type="submit" disabled={busy}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-white font-bold text-[16px] disabled:opacity-60"
              style={{ background: orange, boxShadow: "0 4px 0 #B8551F" }}
            >
              {busy ? "Adding…" : "Add to wishlist 📚"}
            </button>
          </form>
        )}
      </section>

      <div className="h-10" />
    </div>
  );
}
