import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "#FBF9F4" }}>
      <div className="max-w-md text-center">
        <h1 className="font-[family-name:var(--font-heading)] font-black text-[40px] leading-tight text-stone-900">
          Thank you!
        </h1>
        <p className="text-stone-600 mt-3 text-[15px] leading-relaxed">
          Your donation helps create extraordinary opportunities for every child at ESPS. A receipt is on its way to your inbox.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 mt-6 px-6 py-3 rounded-full font-bold text-white text-[15px]"
          style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
