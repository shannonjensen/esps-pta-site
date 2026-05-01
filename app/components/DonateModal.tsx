"use client";

import { useState, useEffect } from "react";
import { DonateForm } from "./DonateForm";

const h = "font-[family-name:var(--font-heading)]";

function Star({ color = "#F5C24B", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L13.5 9 L20 9.5 L15 13.5 L17 20 L12 16 L7 20 L9 13.5 L4 9.5 L10.5 9 Z" fill={color} stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function DonateModal({ open, onClose, source }: { open: boolean; onClose: () => void; source: string | null }) {
  const [step, setStep] = useState<"amount" | "payment" | "success">("amount");
  const [amount, setAmount] = useState(5);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [giftAid, setGiftAid] = useState(false);
  const [giftAidName, setGiftAidName] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [employerMatch, setEmployerMatch] = useState(false);
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    if (!open) setStep("amount");
  }, [open]);

  if (!open) return null;
  const finalAmount = custom ? parseInt(custom) || 0 : amount;
  const giftAidValid = !giftAid || (giftAidName.trim() && address.trim() && postcode.trim());
  const employerMatchValid = !employerMatch || email.trim();
  const canContinue = finalAmount >= 1 && giftAidValid && employerMatchValid;
  const donorName = giftAid && giftAidName.trim() ? giftAidName.trim() : name.trim();

  const inputClass =
    "w-full px-3.5 py-3 rounded-xl bg-stone-50 font-semibold text-[16px] focus:outline-none focus:bg-white";
  const inputStyle = { border: "1px solid #1a1a1a14" };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ background: "rgba(15,25,30,0.55)" }} onClick={onClose}>
      <div className="bg-white text-stone-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-5 relative max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 -12px 32px rgba(0,0,0,0.18)", paddingBottom: "calc(20px + env(safe-area-inset-bottom))" }}
        onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-stone-300 mx-auto mb-3" />
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>

        {step === "amount" && (
          <>
            <Star color="#F5C24B" size={22} />
            <h3 className={`${h} font-black text-[22px] mt-2 text-stone-900`}>Make a donation</h3>
            <p className="text-stone-500 text-[13px] mt-1">Thank you for your support. Please consider stretching your donation further by opting into Gift Aid.</p>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[5, 10, 20, 50].map((p) => (
                <button key={p} onClick={() => { setAmount(p); setCustom(""); }}
                  className={`py-3 rounded-xl font-bold text-[14px] transition ${amount === p && !custom ? "text-white" : "bg-stone-100 text-stone-800"}`}
                  style={amount === p && !custom ? { background: "#E0713E" } : {}}>
                  £{p}
                </button>
              ))}
            </div>
            <div className="mt-2.5 relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-stone-500 text-[14px]">£</span>
              <input type="number" value={custom} onChange={(e) => { setCustom(e.target.value); setAmount(parseInt(e.target.value) || 0); }}
                placeholder="Other amount"
                className={`${inputClass} pl-8`} style={inputStyle} />
            </div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
              className={`${inputClass} mt-2.5`} style={inputStyle} />
            <label className="mt-2 flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="mt-1 w-4 h-4 accent-orange-500" />
              <span className="text-[12px] text-stone-600 leading-relaxed">
                Keep my donation anonymous
              </span>
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email for receipt"
              className={`${inputClass} mt-2.5`} style={inputStyle} />
            <label className="mt-3 flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={giftAid} onChange={(e) => setGiftAid(e.target.checked)} className="mt-1 w-4 h-4 accent-orange-500" />
              <span className="text-[12px] text-stone-600 leading-relaxed">
                <span className="font-bold text-stone-900">Add Gift Aid (+25%)</span> — boost your donation by 25% at no extra cost (UK taxpayers only).
              </span>
            </label>
            {giftAid && (
              <div className="mt-3 p-3.5 rounded-xl space-y-2.5" style={{ background: "#FFF8E6", border: "1px solid #F5C24B40" }}>
                <input type="text" value={giftAidName} onChange={(e) => setGiftAidName(e.target.value)} placeholder="Full name (required)"
                  className={inputClass} style={{ ...inputStyle, background: "white" }} />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Home address line 1"
                  className={inputClass} style={{ ...inputStyle, background: "white" }} />
                <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value.toUpperCase())} placeholder="Postcode"
                  className={inputClass} style={{ ...inputStyle, background: "white" }} />
                <p className="text-[11px] text-stone-700 leading-relaxed">
                  By ticking Gift Aid I confirm I am a UK taxpayer and want East Sheen Primary School PTA to claim Gift Aid on this donation. I understand that if I pay less Income Tax and/or Capital Gains Tax in the current tax year than the amount of Gift Aid claimed, it is my responsibility to pay any difference.
                </p>
              </div>
            )}
            <label className="mt-2.5 flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={employerMatch} onChange={(e) => setEmployerMatch(e.target.checked)} className="mt-1 w-4 h-4 accent-orange-500" />
              <span className="text-[12px] text-stone-600 leading-relaxed">
                <span className="font-bold text-stone-900">My employer matches charitable donations.</span> Stretch your donation further. We&rsquo;ll follow up via email.
              </span>
            </label>
            <button onClick={() => canContinue && setStep("payment")}
              disabled={!canContinue}
              className="w-full mt-4 py-3.5 rounded-full font-bold text-white text-[15px] disabled:opacity-60"
              style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}>
              {employerMatch && !email.trim()
                ? "Email required"
                : `Continue · £${finalAmount || 0} →`}
            </button>
            <p className="text-center text-[11px] text-stone-400 mt-3">Secure · Gift Aid eligible · Tax receipt by email</p>
          </>
        )}

        {step === "payment" && (
          <>
            <h3 className={`${h} font-black text-[22px] mt-2 text-stone-900`}>Payment</h3>
            <p className="text-stone-500 text-[13px] mt-1 mb-4">
              Donating <span className="font-bold text-stone-900">£{finalAmount}</span>
              {giftAid && <span className="text-stone-600"> + Gift Aid</span>}
            </p>
            <DonateForm
              amount={finalAmount}
              name={donorName}
              email={email}
              giftAid={giftAid}
              address={address}
              postcode={postcode}
              employerMatch={employerMatch}
              anonymous={anonymous}
              source={source}
              onSuccess={() => setStep("success")}
              onBack={() => setStep("amount")}
            />
          </>
        )}

        {step === "success" && (
          <div className="py-2 text-center">
            <div className="flex justify-center"><Star color="#F5C24B" size={32} /></div>
            <h3 className={`${h} font-black text-[22px] mt-2 text-stone-900`}>Thank you!</h3>
            <p className="text-stone-600 text-[14px] mt-2 leading-relaxed">
              Your £{finalAmount} donation helps every child at ESPS. A receipt is on its way to {email || "your inbox"}.
            </p>
            <button onClick={onClose}
              className="w-full mt-5 py-3 rounded-full font-bold text-white text-[15px]"
              style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
