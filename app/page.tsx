"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Data ── */
const DATA = {
  events: [
    { date: "12–13 June", shortDate: { day: "12", month: "Jun" }, title: "ESPS Bike Ride to Amsterdam", description: "Our parents are cycling to Amsterdam to raise money for the library transformation. Novices welcome!", cta: "Sponsor a rider", tag: "Fundraiser" },
    { date: "27 June", shortDate: { day: "27", month: "Jun" }, title: "Summer Fair", time: "2–6pm", description: "Our biggest event of the year — stalls, games, food, live music and fun for the whole family.", cta: "Save the date", tag: "Community" },
  ],
  achievements: [
    { figure: "£33k+", label: "raised this school year" },
    { figure: "1,000+", label: "books donated by families" },
    { figure: "600", label: "free books on World Book Day" },
  ],
  thisYear: [
    "New furniture for 6 classrooms",
    "Educational murals around the school",
    "3 laptops, 11 iPads and a smartboard",
    "70+ new STEM books for classrooms",
    "Wet play boxes for every class",
    "Gardening services & literacy subscriptions",
  ],
  threeYears: [
    "Astroturf replacement",
    "Classroom supplies",
    "IT upgrades",
    "School stage",
    "New automatic front gate",
    "Playground improvements",
  ],
  involved: [
    { title: "Coffee Club", description: "A small monthly donation of £5, £10 or £20 makes a big difference, raising over £3,700 this year. These donations can qualify for gift aid, boosting your donation by 25% at no cost to you.", cta: "Sign up", href: "https://tinyurl.com/Esps10" },
    { title: "EasyFundraising", description: "Shop online as usual and earn free donations for the school. Over £400 raised last term alone with zero effort.", cta: "Start raising", href: "https://www.easyfundraising.org.uk" },
    { title: "Volunteer your time", description: "Help out at events, staff the after-school library or share your skills. One-off or regular opportunities available.", cta: "Get in touch", href: "mailto:geneva@espspta.org" },
    { title: "Attend our events", description: "From the Summer Fair to coffee mornings, every ticket sold and cake bought helps fund the things that make our school special. Showing up is what builds community — and it's what makes these events fun." },
    { title: "Donate", description: "Donations are always welcome. You may be able to boost a donation's impact with corporate matching or by opting into gift aid.", cta: "Make a donation", href: "#donate" },
    { title: "Join the Committee", description: "The PTA recruits new members each year. It's a great way to make a difference, working alongside other parents and the school leadership.", cta: "Get in touch", href: "mailto:pta@espspta.org" },
  ],
  committee: [
    { role: "Co-Chair", name: "Shannon Wedgwood" },
    { role: "Co-Chair", name: "Joe Thompson" },
    { role: "Treasurer", name: "Neil Abrey" },
    { role: "Member", name: "Karen Langley" },
    { role: "Member", name: "Geneva Kearns" },
    { role: "Member", name: "Susana Garcia" },
  ],
  library: { raised: 18400, goal: 50000, donors: 142 },
  newsletters: [
    { season: "Autumn", year: "2025", href: "/newsletters/autumn-2025.pdf", bg: "#FFE6D7", fg: "#B8551F", accent: "#E0713E" },
    { season: "Spring", year: "2025", href: "/newsletters/spring-2025.pdf", bg: "#DEEBDA", fg: "#3D6B3D", accent: "#5B8E5A" },
  ],
};

const h = "font-[family-name:var(--font-heading)]";

/* ── Primitives ── */
const Squiggle = ({ color = "#E0713E", className = "" }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 200 14" className={className} fill="none" preserveAspectRatio="none">
    <path d="M2 8 Q 18 1, 34 7 T 66 7 T 98 7 T 130 7 T 162 7 T 198 7" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);
const Underline = ({ color = "#E0713E", className = "" }: { color?: string; className?: string }) => (
  <svg viewBox="0 0 200 12" className={className} fill="none" preserveAspectRatio="none">
    <path d="M3 7 Q 50 2, 100 6 T 197 5" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </svg>
);
const Star = ({ color = "#F5C24B", size = 20 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L13.5 9 L20 9.5 L15 13.5 L17 20 L12 16 L7 20 L9 13.5 L4 9.5 L10.5 9 Z" fill={color} stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

/* ── Desktop Header ── */
function DesktopHeader({ onDonate }: { onDonate: () => void }) {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <header
      className="hidden lg:flex items-center justify-between px-8 py-3 sticky top-0 z-50"
      style={{ background: "rgba(251,249,244,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a10" }}
    >
      <span className={`${h} font-black text-[20px] text-stone-900 tracking-tight`}>ESPS PTA</span>
      <nav className="flex items-center gap-6">
        <a href="#whats-on" onClick={(e) => go(e, "whats-on")} className="text-[14px] font-semibold text-stone-600 hover:text-stone-900 transition">What&rsquo;s On</a>
        <Link href="/library" className="text-[14px] font-semibold text-stone-600 hover:text-stone-900 transition">Library</Link>
        <a href="#achievements" onClick={(e) => go(e, "achievements")} className="text-[14px] font-semibold text-stone-600 hover:text-stone-900 transition">Achievements</a>
        <a href="#involved" onClick={(e) => go(e, "involved")} className="text-[14px] font-semibold text-stone-600 hover:text-stone-900 transition">Get Involved</a>
        <a href="#contact" onClick={(e) => go(e, "contact")} className="text-[14px] font-semibold text-stone-600 hover:text-stone-900 transition">Contact</a>
      </nav>
      <button onClick={onDonate} className="px-5 py-2 rounded-full font-bold text-white text-[13px] hover:opacity-90 transition" style={{ background: "#E0713E" }}>
        Donate
      </button>
    </header>
  );
}

/* ── Nav ── */
const NAV = [
  { id: "top", label: "Home", icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" /></svg> },
  { id: "whats-on", label: "Events", icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5" fill={a ? "currentColor" : "none"} /><path d="M3 10h18" stroke={a ? "white" : "currentColor"} /><path d="M8 3v4M16 3v4" /></svg> },
  { id: "library", label: "Library", icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h6a2 2 0 012 2v14a2 2 0 00-2-2H4z" /><path d="M20 4h-6a2 2 0 00-2 2v14a2 2 0 012-2h6z" /></svg> },
  { id: "involved", label: "Help out", icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" /></svg> },
];

function BottomNav({ onDonate }: { onDonate: () => void }) {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActive(id);
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(id);
    if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 8; window.scrollTo({ top: y, behavior: "smooth" }); }
  };
  return (
    <>
      <div aria-hidden className="lg:hidden" style={{ height: "calc(74px + env(safe-area-inset-bottom))" }} />
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white lg:hidden"
        style={{ borderTop: "1px solid #1a1a1a14", paddingBottom: "env(safe-area-inset-bottom)", boxShadow: "0 -4px 16px rgba(20,30,40,0.06)" }}>
        <div className="grid grid-cols-5 items-end px-2 pt-2 pb-2 max-w-md mx-auto">
          {NAV.slice(0, 2).map((n) => (
            <TabBtn key={n.id} item={n} active={active === n.id} onClick={(e) => go(e, n.id)} />
          ))}
          <div className="flex justify-center">
            <button onClick={onDonate} aria-label="Donate"
              className="relative -mt-7 w-[58px] h-[58px] rounded-full flex flex-col items-center justify-center text-white active:scale-[0.95] transition"
              style={{ background: "#E0713E", boxShadow: "0 4px 0 #B8551F, 0 6px 14px rgba(224,113,62,0.45)", border: "3px solid #FBF9F4" }}>
              <Star color="#FFE6A8" size={20} />
              <span className="text-[9px] font-black uppercase tracking-wider mt-0.5" style={{ letterSpacing: "0.08em" }}>Donate</span>
            </button>
          </div>
          {NAV.slice(2, 4).map((n) => (
            <TabBtn key={n.id} item={n} active={active === n.id} onClick={(e) => go(e, n.id)} />
          ))}
        </div>
      </nav>
    </>
  );
}

function TabBtn({ item, active, onClick }: { item: typeof NAV[0]; active: boolean; onClick: (e: React.MouseEvent) => void }) {
  return (
    <a href={`#${item.id}`} onClick={onClick}
      className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl active:scale-[0.95] transition"
      style={{ color: active ? "#E0713E" : "#736B61" }}>
      <div className="relative">
        {item.icon(active)}
        {active && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "#E0713E" }} />}
      </div>
      <span className={`text-[10px] tracking-wide ${active ? "font-black" : "font-semibold"}`}>{item.label}</span>
    </a>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section id="top" className="px-4 lg:px-6 pt-2 pb-6 lg:pt-12 lg:pb-14">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-stone-500">
          East Sheen Primary PTA
        </p>
        <h1 className={`${h} font-black tracking-tight leading-[1.0] text-[40px] lg:text-[60px] mt-1.5 text-stone-900`}>
          <span className="block">Strengthening</span>
          <span className="block">our school</span>
          <span className="block relative inline-block">
            <span style={{ color: "#E0713E" }}>and community.</span>
            <Underline color="#F5C24B" className="absolute -bottom-1 left-0 w-full h-2.5" />
          </span>
        </h1>
        <p className="mt-3 text-stone-600 text-[15px] lg:text-[17px] leading-relaxed">
          We raise funds and run events that help create extraordinary opportunities for every child at ESPS.
        </p>
        <div className="hidden lg:flex gap-3 mt-6">
          <Link href="/library"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full font-bold text-white text-[15px] hover:opacity-90 transition"
            style={{ background: "#1a1a1a" }}>
            Big campaign &rarr;
          </Link>
          <a href="#involved"
            onClick={(e) => { e.preventDefault(); const el = document.getElementById("involved"); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 72; window.scrollTo({ top: y, behavior: "smooth" }); } }}
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full font-bold text-stone-900 text-[15px] hover:bg-stone-50 transition bg-white"
            style={{ border: "1.5px solid #1a1a1a20" }}>
            Help out
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Library campaign pulse ── */
function LibraryPulse() {
  const { raised, goal, donors } = DATA.library;
  const pct = Math.round((raised / goal) * 100);
  return (
    <section id="library" className="px-4 lg:px-6 pb-2">
      <div className="max-w-6xl mx-auto">
      <div className="rounded-3xl overflow-hidden relative" style={{ background: "#2d6e47" }}>
        <div className="relative p-5 lg:p-12 text-white">
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-green-200 mb-1.5">Our Big Campaign</p>
          <h2 className={`${h} font-black text-[32px] leading-[0.95] tracking-tight`}>
            Love Our<br />
            <span className="relative inline-block">
              Libraries.
              <Squiggle color="#F5C24B" className="absolute -bottom-1.5 left-0 w-full h-2.5" />
            </span>
          </h2>
          <p className="mt-3 text-green-50/90 text-[14px] leading-relaxed">
            We&rsquo;re raising £50,000 to transform our KS1 and KS2 libraries into inspiring spaces where every child falls in love with reading.
          </p>
          <div className="mt-4 rounded-2xl p-3.5" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}>
            <div className="flex items-baseline justify-between mb-2">
              <span className={`${h} font-black text-[26px] leading-none`}>£{raised.toLocaleString()}</span>
              <span className="text-green-50 text-[12px] font-medium">of £{goal.toLocaleString()}</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden relative" style={{ background: "rgba(0,0,0,0.18)" }}>
              <div className="h-full rounded-full relative" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #F5C24B, #FFE6A8)" }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-3 h-3 rounded-full bg-white" style={{ boxShadow: "0 0 0 2px #F5C24B" }} />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-green-50">
              <span className="font-bold">{pct}% there</span>
              <span>{donors} donors so far</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href="/library"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-full font-bold text-stone-900 text-[13px] active:scale-[0.98] transition"
              style={{ background: "#F5C24B", boxShadow: "0 2px 0 #B8851A" }}>
              Learn more →
            </Link>
            <button className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-full font-bold text-white text-[13px] active:scale-[0.98] transition"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
              Donate
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ── What's coming up ── */
function WhatsOn() {
  const tones = [
    { bg: "#FFE6D7", fg: "#B8551F", btn: "#E0713E", btnShadow: "#B8551F" },
    { bg: "#D6ECEF", fg: "#235D69", btn: "#3B8C9C", btnShadow: "#235D69" },
  ];
  return (
    <section id="whats-on" className="pt-7 pb-6">
      <div className="max-w-6xl mx-auto">
      <div className="px-4 lg:px-6 mb-5">
        <h2 className={`${h} font-black text-[26px] tracking-tight text-stone-900 leading-none`}>
          What&rsquo;s{" "}
          <span className="relative inline-block">
            coming up
            <Squiggle color="#E0713E" className="absolute -bottom-1.5 left-0 w-full h-2.5" />
          </span>
        </h2>
      </div>
      <div className="px-4 lg:px-6 grid md:grid-cols-2 gap-3">
        {DATA.events.map((e, i) => {
          const t = tones[i];
          return (
            <article key={e.title} className="relative bg-white rounded-3xl overflow-hidden"
              style={{ border: "1.5px solid #1a1a1a14", boxShadow: "0 4px 0 #1a1a1a08" }}>
              <div className="flex items-stretch">
                <div className="shrink-0 flex flex-col items-center justify-center px-4 py-4"
                  style={{ background: t.bg, color: t.fg, minWidth: 80 }}>
                  <div className={`${h} font-black text-[28px] leading-none tracking-tight`}>{e.shortDate.day}</div>
                  {e.shortDate.month && <div className="text-[10px] uppercase tracking-wider font-bold mt-1">{e.shortDate.month}</div>}
                </div>
                <div className="flex-1 min-w-0 p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: t.fg }}>{e.tag}</span>
                    {e.time && (<><span className="text-stone-300">·</span><span className="text-[10px] uppercase tracking-wider font-bold text-stone-500">{e.time}</span></>)}
                  </div>
                  <h3 className={`${h} font-black text-[19px] leading-tight text-stone-900 mt-1`}>{e.title}</h3>
                  <div className="text-[12px] font-semibold text-stone-500 mt-0.5">{e.date}</div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <p className="text-stone-600 text-[13.5px] leading-relaxed">{e.description}</p>
                {e.cta && (
                  /save the date/i.test(e.cta) ? (
                    <p className="mt-3 font-bold text-[13px]" style={{ color: t.fg }}>{e.cta}!</p>
                  ) : (
                    <button className="mt-3 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-white text-[13px] active:scale-[0.98]"
                      style={{ background: t.btn, boxShadow: `0 2px 0 ${t.btnShadow}` }}>
                      {e.cta} →
                    </button>
                  )
                )}
              </div>
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
}

/* ── Achievements ── */
function Achievements() {
  const [open, setOpen] = useState<string | null>("thisYear");
  const palettes = [{ bg: "#FFE6D7", fg: "#B8551F" }, { bg: "#D6ECEF", fg: "#235D69" }, { bg: "#FFF1C9", fg: "#8B6B14" }];
  return (
    <section id="achievements" className="px-4 lg:px-6 py-8" style={{ background: "#FAF6EE" }}>
      <div className="max-w-6xl mx-auto">
      <h2 className={`${h} font-black text-[28px] tracking-tight text-stone-900 leading-tight`}>
        What we&rsquo;ve{" "}
        <span className="relative inline-block">
          achieved
          <Underline color="#E0713E" className="absolute -bottom-1 left-0 w-full h-2.5" />
        </span>
      </h2>
      <p className="text-stone-600 mt-2 text-[14px] leading-relaxed">Over £150,000 raised in three years.</p>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {DATA.achievements.map((a, i) => (
          <div key={a.label} className="rounded-2xl p-3" style={{ background: palettes[i].bg }}>
            <div className={`${h} font-black text-[24px] lg:text-[44px] leading-none tracking-tight`} style={{ color: palettes[i].fg }}>{a.figure}</div>
            <div className="text-[10px] mt-1.5 font-medium leading-tight" style={{ color: palettes[i].fg }}>{a.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-stone-700 text-[14px] leading-relaxed">
        These are some of the items recently funded by our community&rsquo;s generosity.
      </p>
      {/* Mobile: accordion */}
      <div className="mt-3 space-y-2 lg:hidden">
        {[
          { id: "thisYear", title: "This year", items: DATA.thisYear, color: "#5B8E5A" },
          { id: "threeYears", title: "Past three years", items: DATA.threeYears, color: "#E0713E" },
        ].map((col) => {
          const isOpen = open === col.id;
          return (
            <div key={col.id} className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #1a1a1a10" }}>
              <button onClick={() => setOpen(isOpen ? null : col.id)}
                className="w-full flex items-center justify-between p-4 active:bg-stone-50 transition">
                <h3 className={`${h} font-black text-[15px] text-stone-900`}>{col.title}</h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#736B61" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isOpen && (
                <ul className="px-4 pb-4 space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13px] text-stone-700 leading-relaxed">
                      <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5" style={{ background: col.color }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><path d="M5 12l5 5L20 7" /></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {/* Desktop: side-by-side, always expanded */}
      <div className="mt-3 hidden lg:grid md:grid-cols-2 gap-3">
        {[
          { id: "thisYear", title: "This year", items: DATA.thisYear, color: "#5B8E5A" },
          { id: "threeYears", title: "Past three years", items: DATA.threeYears, color: "#E0713E" },
        ].map((col) => (
          <div key={col.id} className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #1a1a1a10" }}>
            <div className="p-4">
              <h3 className={`${h} font-black text-[15px] text-stone-900`}>{col.title}</h3>
            </div>
            <ul className="px-4 pb-4 space-y-2">
              {col.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13px] text-stone-700 leading-relaxed">
                  <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5" style={{ background: col.color }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><path d="M5 12l5 5L20 7" /></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

/* ── Get involved ── */
function GetInvolved() {
  const palettes = [
    { bg: "#FFE6D7", fg: "#B8551F", accent: "#E0713E" },
    { bg: "#D6ECEF", fg: "#235D69", accent: "#3B8C9C" },
    { bg: "#FFF1C9", fg: "#8B6B14", accent: "#D9A227" },
    { bg: "#DEEBDA", fg: "#3D6B3D", accent: "#5B8E5A" },
    { bg: "#FFE6D7", fg: "#B8551F", accent: "#E0713E" },
    { bg: "#D6ECEF", fg: "#235D69", accent: "#3B8C9C" },
  ];
  return (
    <section id="involved" className="px-4 lg:px-6 py-8">
      <div className="max-w-6xl mx-auto">
      <h2 className={`${h} font-black text-[28px] tracking-tight text-stone-900 leading-tight`}>
        Get{" "}
        <span className="relative inline-block">
          involved
          <Squiggle color="#3B8C9C" className="absolute -bottom-1.5 left-0 w-full h-2.5" />
        </span>
      </h2>
      <p className="text-stone-500 mt-2 text-[14px]">Six ways to make a difference.</p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {DATA.involved.map((card, i) => {
          const p = palettes[i];
          return (
            <article key={card.title} className="rounded-2xl p-4 flex gap-3 active:scale-[0.99] transition"
              style={{ background: p.bg, border: `1px solid ${p.accent}25` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white"
                style={{ border: `1.5px solid ${p.accent}` }}>
                <span className={`${h} font-black text-[16px]`} style={{ color: p.fg }}>{i + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`${h} font-black text-[17px] leading-tight`} style={{ color: p.fg }}>{card.title}</h3>
                <p className="text-[13px] leading-relaxed mt-1" style={{ color: p.fg + "cc" }}>{card.description}</p>
                {card.cta && card.href && (
                  <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold bg-white"
                    style={{ color: p.fg, border: `1px solid ${p.accent}40` }}>
                    {card.cta} →
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
}

/* ── Committee ── */
function Committee() {
  const colors = ["#FFE6D7", "#D6ECEF", "#FFF1C9", "#DEEBDA"];
  const fgColors = ["#B8551F", "#235D69", "#8B6B14", "#3D6B3D"];
  return (
    <section className="py-8" style={{ background: "#FAF6EE" }}>
      <div className="px-4 lg:px-6 mb-4 max-w-6xl lg:mx-auto">
        <h2 className={`${h} font-black text-[24px] tracking-tight text-stone-900 leading-tight`}>Your PTA committee</h2>
        <p className="text-stone-600 mt-1 text-[13px]">Elected at the AGM each October.</p>
      </div>
      <div className="flex gap-2.5 overflow-x-auto px-4 lg:px-6 pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible lg:max-w-6xl lg:mx-auto"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
        {DATA.committee.map((m, i) => (
          <div key={m.name} className="bg-white rounded-2xl p-3 text-center shrink-0 lg:shrink lg:w-auto"
            style={{ border: "1px solid #1a1a1a10", width: "108px", scrollSnapAlign: "start" }}>
            <div className="w-12 h-12 mx-auto rounded-full mb-2 flex items-center justify-center"
              style={{ background: colors[i % 4] }}>
              <span className={`${h} font-black text-[15px]`} style={{ color: fgColors[i % 4] }}>
                {m.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <p className="font-bold text-stone-900 text-[12px] leading-tight">{m.name}</p>
            <p className="text-[9px] text-stone-500 mt-0.5 uppercase tracking-wider">{m.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Newsletters ── */
function Newsletters() {
  return (
    <section className="px-4 lg:px-6 py-8" style={{ background: "#FAF6EE" }}>
      <div className="max-w-6xl mx-auto">
      <h2 className={`${h} font-black text-[26px] tracking-tight text-stone-900 leading-tight`}>
        Read our{" "}
        <span className="relative inline-block">
          newsletter
          <Squiggle color="#3B8C9C" className="absolute -bottom-1 left-0 w-full h-2.5" />
        </span>
      </h2>
      <p className="text-stone-600 mt-2 text-[14px] leading-relaxed">
        A round-up of news, fundraising and what&rsquo;s coming next, sent home each term.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {DATA.newsletters.map((n) => (
          <a key={n.season} href={n.href} target="_blank" rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden bg-white active:scale-[0.99] transition"
            style={{ border: "1px solid #1a1a1a10" }}>
            <div className="aspect-[3/4] p-3 relative" style={{ background: n.bg }}>
              <div className="absolute inset-3 bg-white rounded-lg p-2 flex flex-col gap-1.5" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                <div className="h-1.5 rounded-full w-3/4" style={{ background: n.accent }} />
                <div className="h-1 rounded-full w-full bg-stone-200" />
                <div className="h-1 rounded-full w-5/6 bg-stone-200" />
                <div className="h-1 rounded-full w-2/3 bg-stone-200" />
                <div className="mt-1 h-8 rounded" style={{ background: n.bg }} />
                <div className="h-1 rounded-full w-full bg-stone-200" />
                <div className="h-1 rounded-full w-4/5 bg-stone-200" />
                <div className="h-1 rounded-full w-3/5 bg-stone-200" />
              </div>
            </div>
            <div className="p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] font-bold" style={{ color: n.fg }}>{n.season} {n.year}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className={`${h} font-black text-[15px] text-stone-900`}>Newsletter</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold" style={{ color: n.fg }}>
                  PDF
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  return (
    <section id="contact" className="px-4 lg:px-6 py-10" style={{ background: "#1F3D4A" }}>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className={`${h} font-black text-[28px] tracking-tight text-white leading-tight`}>Say hello.</h2>
        <p className="text-white/70 mt-2 text-[14px] mx-auto">Questions, ideas, or want to get involved? We&rsquo;d love to hear.</p>
        <div className="mt-5 flex flex-col sm:flex-row sm:justify-center gap-2.5">
          <a href="mailto:pta@espspta.org"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full font-bold text-white text-[14px]"
            style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}>
            Email the PTA
          </a>
        </div>
        <p className="text-[10px] text-white/50 mt-6 leading-relaxed">
          Registered charity no. 273295 · Founded 1972 · Affiliated with NCPTA
        </p>
      </div>
    </section>
  );
}

/* ── Donate modal ── */
function DonateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState(20);
  const [custom, setCustom] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ background: "rgba(15,25,30,0.55)" }} onClick={onClose}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-5 relative"
        style={{ boxShadow: "0 -12px 32px rgba(0,0,0,0.18)", paddingBottom: "calc(20px + env(safe-area-inset-bottom))" }}
        onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-stone-300 mx-auto mb-3" />
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
        <Star color="#F5C24B" size={22} />
        <h3 className={`${h} font-black text-[22px] mt-2 text-stone-900`}>Make a donation</h3>
        <p className="text-stone-500 text-[13px] mt-1">Every pound goes directly to ESPS children. Gift Aid adds 25%.</p>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[10, 20, 50, 100].map((p) => (
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
            className="w-full pl-8 pr-3 py-3 rounded-xl bg-stone-50 font-semibold text-[14px] focus:outline-none focus:bg-white"
            style={{ border: "1px solid #1a1a1a14" }} />
        </div>
        <button className="w-full mt-4 py-3.5 rounded-full font-bold text-white text-[15px]"
          style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}>
          Donate £{amount || 0} →
        </button>
        <p className="text-center text-[11px] text-stone-400 mt-3">Secure · Gift Aid eligible · Tax receipt by email</p>
      </div>
    </div>
  );
}

function PageFooter() {
  return (
    <footer className="px-4 py-5 text-center text-[11px] text-stone-400" style={{ background: "#15303A" }}>
      © {new Date().getFullYear()} East Sheen Primary School PTA
    </footer>
  );
}

/* ── Main ── */
export default function Home() {
  const [donateOpen, setDonateOpen] = useState(false);
  return (
    <div className="min-h-screen" style={{ background: "#FBF9F4", color: "#1a1a1a" }}>
      <DesktopHeader onDonate={() => setDonateOpen(true)} />
      <BottomNav onDonate={() => setDonateOpen(true)} />
      <Hero />
      <LibraryPulse />
      <WhatsOn />
      <Achievements />
      <GetInvolved />
      <Committee />
      <Newsletters />
      <Contact />
      <PageFooter />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
}
