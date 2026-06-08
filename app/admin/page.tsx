"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Donation = {
  id: string;
  donor_name: string | null;
  donor_email: string | null;
  amount_pence: number;
  status: string;
  payment_method: string | null;
  source: string | null;
  gift_aid: boolean;
  anonymous: boolean;
  message: string | null;
  bank_reference: string | null;
  created_at: string;
};

const green = "#234A3A";
const bgWash = "#E8F0E5";
const orange = "#E0713E";
const heading = "font-[family-name:var(--font-heading)]";

const STORAGE_KEY = "esps_admin_key";

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Restore a saved session key on mount.
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) setAdminKey(saved);
    setReady(true);
  }, []);

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAdminKey(null);
  };

  if (!ready) return <div style={{ background: bgWash, minHeight: "100vh" }} />;

  return (
    <div className="min-h-screen" style={{ background: bgWash, color: green }}>
      <div className="px-4 sm:px-6 pt-6">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-stone-600 hover:text-stone-900"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Back to library campaign
        </Link>
      </div>

      {adminKey ? (
        <Dashboard adminKey={adminKey} onLogout={logout} />
      ) : (
        <LoginForm onAuthed={(k) => { sessionStorage.setItem(STORAGE_KEY, k); setAdminKey(k); }} />
      )}
    </div>
  );
}

/* ── Login ── */
function LoginForm({ onAuthed }: { onAuthed: (key: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "x-admin-key": password },
      });
      if (r.ok) {
        onAuthed(password);
      } else {
        const d = await r.json().catch(() => ({}));
        setError(d.error || "Login failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className={`${heading} font-bold text-[32px] tracking-tight text-center`}>PTA Admin</h1>
      <p className="text-center text-stone-600 text-[14px] mt-2">Enter the admin password to continue.</p>
      <form onSubmit={submit} className="mt-8 rounded-3xl bg-white p-6" style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
        <label className="block text-[11px] uppercase tracking-[0.16em] font-bold text-stone-500 mb-2">Password</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-stone-300 px-4 py-3 text-[15px] outline-none focus:border-stone-500"
        />
        {error && <p className="mt-3 text-[13px] text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-5 w-full inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-white text-[15px] disabled:opacity-50 active:scale-[0.99] transition"
          style={{ background: orange, boxShadow: "0 3px 0 #B8551F" }}
        >
          {busy ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}

/* ── Dashboard ── */
function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const [donations, setDonations] = useState<Donation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const api = useCallback(
    (init?: RequestInit) =>
      fetch("/api/admin/donations", {
        ...init,
        headers: { "x-admin-key": adminKey, "content-type": "application/json", ...(init?.headers || {}) },
      }),
    [adminKey]
  );

  const load = useCallback(async () => {
    setError(null);
    try {
      const r = await api();
      if (r.status === 401) return onLogout();
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed to load");
      setDonations(d.donations);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load donations.");
    }
  }, [api, onLogout]);

  useEffect(() => {
    load();
  }, [load]);

  const totalSucceeded = (donations ?? [])
    .filter((d) => d.status === "succeeded")
    .reduce((s, d) => s + d.amount_pence, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className={`${heading} font-bold text-[30px] tracking-tight`}>PTA Admin</h1>
        <button onClick={onLogout} className="text-[13px] font-semibold text-stone-600 hover:text-stone-900 underline">
          Log out
        </button>
      </div>
      <p className="text-stone-600 text-[14px] mt-1">
        Raised (succeeded): <strong>£{Math.round(totalSucceeded / 100).toLocaleString()}</strong>
      </p>

      <AddDonationForm api={api} onAdded={load} />

      <h2 className={`${heading} font-bold text-[22px] tracking-tight mt-12`}>All donations</h2>
      {error && <p className="mt-3 text-[14px] text-red-600">{error}</p>}
      {!donations && !error && <p className="mt-4 text-stone-500 text-[14px]">Loading…</p>}
      {donations && donations.length === 0 && (
        <p className="mt-4 text-stone-500 text-[14px]">No donations yet.</p>
      )}

      {donations && donations.length > 0 && (
        <ul className="mt-4 space-y-2">
          {donations.map((d) => (
            <DonationRow key={d.id} d={d} api={api} onChange={load} />
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Add form ── */
function AddDonationForm({
  api,
  onAdded,
}: {
  api: (init?: RequestInit) => Promise<Response>;
  onAdded: () => void;
}) {
  const empty = {
    amount: "",
    name: "",
    email: "",
    paymentMethod: "bank_transfer",
    source: "",
    date: "",
    message: "",
    giftAid: false,
    anonymous: false,
  };
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOk(null);
    setBusy(true);
    try {
      const r = await api({ method: "POST", body: JSON.stringify(form) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Failed to add donation.");
      setOk(`Added £${Number(form.amount).toLocaleString()} donation.`);
      setForm(empty);
      onAdded();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add donation.");
    } finally {
      setBusy(false);
    }
  };

  const inputCls = "w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-[15px] outline-none focus:border-stone-500 bg-white";
  const labelCls = "block text-[11px] uppercase tracking-[0.14em] font-bold text-stone-500 mb-1.5";

  return (
    <form onSubmit={submit} className="mt-6 rounded-3xl bg-white p-5 sm:p-6" style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
      <h2 className={`${heading} font-bold text-[20px] tracking-tight`}>Add a donation</h2>
      <p className="text-stone-600 text-[13px] mt-1">
        For gifts made directly to the bank account or through other sites. Logged as <strong>succeeded</strong>, so it
        counts toward the total immediately.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <div>
          <label className={labelCls}>Amount (£) *</label>
          <input type="number" min="0" step="0.01" required value={form.amount}
            onChange={(e) => set("amount", e.target.value)} className={inputCls} placeholder="100" />
        </div>
        <div>
          <label className={labelCls}>Method</label>
          <select value={form.paymentMethod} onChange={(e) => set("paymentMethod", e.target.value)} className={inputCls}>
            <option value="bank_transfer">Bank transfer</option>
            <option value="external_site">External site (JustGiving, etc.)</option>
            <option value="cash">Cash / cheque</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Donor name</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Optional" />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="Optional" />
        </div>
        <div>
          <label className={labelCls}>Source / note</label>
          <input value={form.source} onChange={(e) => set("source", e.target.value)} className={inputCls} placeholder="e.g. JustGiving, March transfer" />
        </div>
        <div>
          <label className={labelCls}>Date received</label>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Message (shown publicly)</label>
          <textarea value={form.message} onChange={(e) => set("message", e.target.value)} rows={2} maxLength={280}
            className={inputCls} placeholder="Optional" />
        </div>
      </div>

      <div className="flex flex-wrap gap-5 mt-4">
        <label className="inline-flex items-center gap-2 text-[14px] font-semibold">
          <input type="checkbox" checked={form.giftAid} onChange={(e) => set("giftAid", e.target.checked)} className="w-4 h-4" />
          Gift Aid
        </label>
        <label className="inline-flex items-center gap-2 text-[14px] font-semibold">
          <input type="checkbox" checked={form.anonymous} onChange={(e) => set("anonymous", e.target.checked)} className="w-4 h-4" />
          Anonymous
        </label>
      </div>

      {error && <p className="mt-4 text-[13px] text-red-600">{error}</p>}
      {ok && <p className="mt-4 text-[13px] font-semibold" style={{ color: green }}>{ok}</p>}

      <button type="submit" disabled={busy}
        className="mt-5 inline-flex items-center justify-center px-7 py-3 rounded-full font-bold text-white text-[15px] disabled:opacity-50 active:scale-[0.99] transition"
        style={{ background: orange, boxShadow: "0 3px 0 #B8551F" }}>
        {busy ? "Adding…" : "Add donation"}
      </button>
    </form>
  );
}

/* ── List row ── */
function DonationRow({
  d,
  api,
  onChange,
}: {
  d: Donation;
  api: (init?: RequestInit) => Promise<Response>;
  onChange: () => void;
}) {
  const [busy, setBusy] = useState(false);

  const markReceived = async () => {
    setBusy(true);
    await api({ method: "PATCH", body: JSON.stringify({ id: d.id, status: "succeeded" }) });
    onChange();
  };

  const remove = async () => {
    if (!confirm(`Delete this £${Math.round(d.amount_pence / 100)} donation? This cannot be undone.`)) return;
    setBusy(true);
    // DELETE takes the id as a query param, so call the endpoint directly.
    await fetch(`/api/admin/donations?id=${encodeURIComponent(d.id)}`, {
      method: "DELETE",
      headers: { "x-admin-key": sessionStorage.getItem(STORAGE_KEY) || "" },
    });
    onChange();
  };

  const succeeded = d.status === "succeeded";
  const statusColor = succeeded ? green : d.status === "pending_bank_transfer" ? orange : "#888";

  return (
    <li className="rounded-2xl bg-white p-4 flex items-start justify-between gap-3" style={{ border: "1px solid #1a1a1a10" }}>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`${heading} font-bold text-[15px]`} style={{ color: green }}>
            {d.anonymous ? "Anonymous" : d.donor_name?.trim() || "Anonymous"}
          </span>
          <span className="text-[10px] uppercase tracking-[0.12em] font-bold px-2 py-0.5 rounded-full" style={{ color: statusColor, background: `${statusColor}1a` }}>
            {d.status}
          </span>
          {d.gift_aid && (
            <span className="text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: green }}>Gift Aid</span>
          )}
        </div>
        <p className="text-[12px] text-stone-500 mt-0.5">
          {formatDate(d.created_at)}
          {d.payment_method ? ` · ${d.payment_method}` : ""}
          {d.source ? ` · ${d.source}` : ""}
          {d.bank_reference ? ` · ${d.bank_reference}` : ""}
        </p>
        {d.message && <p className="text-[13px] text-stone-700 mt-1">&ldquo;{d.message}&rdquo;</p>}
      </div>
      <div className="text-right shrink-0">
        <p className={`${heading} font-bold text-[17px]`} style={{ color: orange }}>£{Math.round(d.amount_pence / 100).toLocaleString()}</p>
        <div className="flex flex-col items-end gap-1 mt-1">
          {!succeeded && (
            <button onClick={markReceived} disabled={busy} className="text-[12px] font-bold underline disabled:opacity-50" style={{ color: green }}>
              Mark received
            </button>
          )}
          <button onClick={remove} disabled={busy} className="text-[12px] font-semibold text-red-600 underline disabled:opacity-50">
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}
