"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";

const PRESETS = [
  { label: "Y5 Cake Sale (9 May)", source: "cake_sale_y5_2026_05_09" },
  { label: "Reception Cake Sale (12 Jun)", source: "cake_sale_reception_2026_06_12" },
  { label: "Bike Ride Amsterdam", source: "bike_ride_amsterdam_2026" },
  { label: "Summer Fair (27 Jun)", source: "summer_fair_2026_06_27" },
  { label: "Library campaign (general)", source: "library_campaign_qr" },
  { label: "Coffee Club table", source: "coffee_club_table" },
];

export default function QrAdminPage() {
  const heading = "font-[family-name:var(--font-heading)]";
  const [baseUrl, setBaseUrl] = useState("https://espspta.org");
  const [source, setSource] = useState("cake_sale_y5_2026_05_09");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") setBaseUrl(window.location.origin);
  }, []);

  const fullUrl = useMemo(() => {
    try {
      const u = new URL(baseUrl);
      if (source) u.searchParams.set("source", source);
      return u.toString();
    } catch {
      return baseUrl;
    }
  }, [baseUrl, source]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${source || "donate"}.png`;
    a.click();
  };

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-stone-50 font-mono text-[14px] focus:outline-none focus:bg-white";
  const inputStyle = { border: "1px solid #1a1a1a14" };

  return (
    <main className="min-h-screen px-6 sm:px-8 py-8 sm:py-12" style={{ background: "#FBF9F4" }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-semibold text-stone-600 hover:text-stone-900">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Back to ESPS PTA
        </Link>

        <h1 className={`${heading} font-black text-[36px] sm:text-[44px] mt-6 text-stone-900 tracking-tight`}>QR Code Generator</h1>
        <p className="text-stone-600 mt-2 text-[15px] leading-relaxed">
          Generate trackable QR codes that auto-open the donate modal and tag the donation with a source value.
          Perfect for event tables, posters, and the bake-sale tin.
        </p>

        <div className="mt-8 bg-white p-5 sm:p-6 rounded-2xl space-y-3.5" style={{ border: "1px solid #1a1a1a14" }}>
          <label className="block">
            <span className="text-[12px] font-bold text-stone-700 uppercase tracking-wider">Base URL</span>
            <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} className={`${inputClass} mt-1`} style={inputStyle} />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-stone-700 uppercase tracking-wider">Source label</span>
            <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. cake_sale_y5"
              className={`${inputClass} mt-1`} style={inputStyle} />
          </label>
          <div className="text-[12px] text-stone-600 font-mono p-3 bg-stone-50 rounded-lg break-all" style={{ border: "1px dashed #1a1a1a20" }}>
            {fullUrl}
          </div>
        </div>

        <div className="mt-5 bg-white p-6 rounded-2xl flex flex-col items-center" style={{ border: "1px solid #1a1a1a14" }}>
          <div className="p-4 bg-white rounded-xl">
            <QRCodeCanvas
              ref={canvasRef}
              value={fullUrl}
              size={300}
              level="M"
              marginSize={2}
            />
          </div>
          <button onClick={downloadPng}
            className="mt-5 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[15px]"
            style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}>
            Download PNG →
          </button>
          <p className="text-[11px] text-stone-500 mt-3">Print at 3cm or larger for reliable scanning.</p>
        </div>

        <div className="mt-5 bg-white p-5 sm:p-6 rounded-2xl" style={{ border: "1px solid #1a1a1a14" }}>
          <h2 className={`${heading} font-black text-[16px] text-stone-900 mb-3`}>Quick presets</h2>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button key={p.source} onClick={() => setSource(p.source)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition ${source === p.source ? "text-white" : "bg-stone-100 hover:bg-stone-200 text-stone-700"}`}
                style={source === p.source ? { background: "#E0713E" } : {}}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
