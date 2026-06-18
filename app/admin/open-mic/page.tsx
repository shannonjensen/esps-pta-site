"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const navy = "#1C3A5E";
const cream = "#FAF3E6";
const orange = "#F07F2D";
const heading = "font-[family-name:var(--font-heading)]";
const STORAGE_KEY = "esps_admin_key"; // shared with /admin

type Performer = {
  position: number;
  id: number;
  performer_name: string;
  year_group: string;
  performer_type: string;
  description: string;
  needs_backing: boolean;
  backing_link: string | null;
  contact_email: string | null;
  created_at: string;
};

export default function OpenMicAdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) setAdminKey(saved);
    setReady(true);
  }, []);

  if (!ready) return <div style={{ background: cream, minHeight: "100vh" }} />;

  return (
    <div className="min-h-screen" style={{ background: cream, color: navy }}>
      <div className="px-4 sm:px-6 pt-6">
        <Link href="/summer-fair/open-mic" className="inline-flex items-center gap-2 text-[14px] font-semibold text-stone-600 hover:text-stone-900">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Open Mic sign-up page
        </Link>
      </div>
      {adminKey ? (
        <Dashboard adminKey={adminKey} onLogout={() => { sessionStorage.removeItem(STORAGE_KEY); setAdminKey(null); }} />
      ) : (
        <LoginForm onAuthed={(k) => { sessionStorage.setItem(STORAGE_KEY, k); setAdminKey(k); }} />
      )}
    </div>
  );
}

function LoginForm({ onAuthed }: { onAuthed: (key: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await fetch("/api/admin/login", { method: "POST", headers: { "x-admin-key": password } });
      if (r.ok) onAuthed(password);
      else setError((await r.json().catch(() => ({}))).error || "Login failed.");
    } catch {
      setError("Login failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 pt-20">
      <h1 className={`${heading} font-black text-[28px]`} style={{ color: navy }}>Open Mic sign-ups</h1>
      <p className="mt-2 text-[14px] text-stone-600">Enter the PTA admin password to view performers.</p>
      <form onSubmit={submit} className="mt-5">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
          className="w-full rounded-xl border bg-white px-4 py-3 text-[15px] outline-none" style={{ borderColor: "#0000001f", color: navy }} />
        {error && <p className="mt-2 text-[13px] font-semibold" style={{ color: "#C8341B" }}>{error}</p>}
        <button type="submit" disabled={busy} className="mt-4 w-full rounded-full px-6 py-3 text-white font-bold text-[15px] disabled:opacity-60" style={{ background: orange }}>
          {busy ? "Checking…" : "View sign-ups"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/open-mic/signups", { headers: { "x-admin-key": adminKey } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && Array.isArray(d.performers)) {
          setPerformers(d.performers);
          setCount(d.count ?? d.performers.length);
        } else setError("Could not load sign-ups.");
      })
      .catch(() => setError("Could not load sign-ups."));
  }, [adminKey]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className={`${heading} font-black text-[26px] sm:text-[32px]`} style={{ color: navy }}>
          Open Mic sign-ups <span className="text-stone-400">({count ?? "—"})</span>
        </h1>
        <div className="flex gap-2">
          <button onClick={load} className="rounded-full px-4 py-2 text-[13px] font-bold border" style={{ borderColor: "#0000001f", color: navy }}>Refresh</button>
          <button onClick={onLogout} className="rounded-full px-4 py-2 text-[13px] font-bold border" style={{ borderColor: "#0000001f", color: navy }}>Log out</button>
        </div>
      </div>

      {error && <p className="mt-4 text-[14px] font-semibold" style={{ color: "#C8341B" }}>{error}</p>}

      {count === 0 ? (
        <p className="mt-6 text-[15px] text-stone-600">No sign-ups yet.</p>
      ) : (
        <div className="mt-5 space-y-3">
          {performers.map((p) => (
            <div key={p.id} className="rounded-2xl bg-white p-4" style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className={`${heading} font-black text-[18px]`} style={{ color: orange }}>#{p.position}</span>
                <span className="font-bold text-[16px]" style={{ color: navy }}>{p.performer_name}</span>
                <span className="text-[13px] text-stone-500">{p.year_group}</span>
                <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#0000000a", color: navy }}>{p.performer_type}</span>
              </div>
              <p className="mt-2 text-[14px] text-stone-700">{p.description}</p>
              <div className="mt-2 flex flex-col gap-1 text-[13px]">
                <span style={{ color: p.needs_backing ? "#B8551F" : "#9ca3af" }}>
                  {p.needs_backing ? "🎧 Needs backing music" : "No backing music"}
                </span>
                {p.backing_link && (
                  <a href={p.backing_link} target="_blank" rel="noopener noreferrer" className="font-semibold underline break-all" style={{ color: navy }}>
                    {p.backing_link}
                  </a>
                )}
                {p.contact_email && <span className="text-stone-600">✉️ {p.contact_email}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
