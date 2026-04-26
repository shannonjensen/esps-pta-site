"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Data ── */
const DATA = {
  events: [
    {
      date: "12–13 June",
      shortDate: { day: "12", month: "Jun" },
      title: "ESPS Bike Ride to Amsterdam",
      description:
        "Our parents are cycling to Amsterdam to raise money for the library transformation. Novices welcome!",
      cta: "Sponsor a rider",
      tag: "Fundraiser",
    },
    {
      date: "27 June",
      shortDate: { day: "27", month: "Jun" },
      title: "Summer Fair",
      time: "2–6pm",
      description:
        "Our biggest event of the year — stalls, games, food, live music and fun for the whole family.",
      cta: "Save the date",
      tag: "Community",
    },
    {
      date: "Every Friday",
      shortDate: { day: "Fri", month: "" },
      title: "After-school Library",
      time: "3:30–4:30pm",
      description:
        "The library is open after school for browsing, swapping and reading together. Volunteers always welcome.",
      cta: "Volunteer",
      tag: "Weekly",
    },
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
    {
      title: "Coffee Club",
      description:
        "A small monthly donation of £5, £10 or £20 makes a big difference, raising over £3,700 this year. These donations can qualify for gift aid, boosting your donation by 25% at no cost to you.",
      cta: "Sign up",
      href: "https://tinyurl.com/Esps10",
    },
    {
      title: "EasyFundraising",
      description:
        "Shop online as usual and earn free donations for the school. Over £400 raised last term alone with zero effort.",
      cta: "Start raising",
      href: "https://www.easyfundraising.org.uk",
    },
    {
      title: "Volunteer your time",
      description:
        "Help out at events, staff the after-school library or share your skills. One-off or regular opportunities available.",
      cta: "Get in touch",
      href: "mailto:geneva@espspta.org",
    },
    {
      title: "Attend our events",
      description:
        "From the Summer Fair to coffee mornings, every ticket sold and cake bought helps fund the things that make our school special. Showing up is what builds community — and it's what makes these events fun.",
    },
    {
      title: "Donate",
      description:
        "Donations are always welcome. You may be able to boost a donation's impact with corporate matching or by opting into gift aid.",
      cta: "Make a donation",
      href: "#donate",
    },
    {
      title: "Join the Committee",
      description:
        "The PTA recruits new members each year. It's a great way to make a difference, working alongside other parents and the school leadership.",
      cta: "Get in touch",
      href: "mailto:pta@espspta.org",
    },
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
};

/* ── Primitives ── */
const heading = "font-[family-name:var(--font-heading)]";

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

const SchoolMark = ({ size = 36 }: { size?: number }) => (
  <div
    className="relative flex items-center justify-center rounded-xl shrink-0"
    style={{ width: size, height: size, background: "linear-gradient(135deg, #E0713E 0%, #D9522B 100%)", boxShadow: "0 2px 0 rgba(0,0,0,0.08)" }}
  >
    <span className="font-black text-white" style={{ fontSize: size * 0.4, letterSpacing: "-0.02em" }}>esps</span>
    <div
      className="absolute -top-0.5 -right-0.5 rounded-full"
      style={{ width: size * 0.26, height: size * 0.26, background: "#F5C24B", border: "1.5px solid white" }}
    />
  </div>
);

const PlaceholderImg = ({ label, ratio = "16/9", tone = "coral" }: { label: string; ratio?: string; tone?: string }) => {
  const palettes: Record<string, [string, string]> = {
    coral: ["#FFE6D7", "#E0713E"], teal: ["#D6ECEF", "#3B8C9C"],
    butter: ["#FFF1C9", "#D9A227"], sage: ["#DEEBDA", "#5B8E5A"],
  };
  const [bg, fg] = palettes[tone] || palettes.coral;
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl flex items-center justify-center"
      style={{ aspectRatio: ratio, background: `repeating-linear-gradient(45deg, ${bg}, ${bg} 12px, ${bg}cc 12px, ${bg}cc 24px)`, border: `1.5px dashed ${fg}55` }}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: fg }}>{label}</span>
    </div>
  );
};

/* ── Nav data ── */
const NAV = [
  { id: "top", label: "Home", icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" /></svg> },
  { id: "whats-on", label: "Events", icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5" fill={a ? "currentColor" : "none"} stroke="currentColor" /><path d="M3 10h18" stroke={a ? "white" : "currentColor"} /><path d="M8 3v4M16 3v4" /></svg> },
  { id: "library", label: "Library", icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h6a2 2 0 012 2v14a2 2 0 00-2-2H4z" /><path d="M20 4h-6a2 2 0 00-2 2v14a2 2 0 012-2h6z" /></svg> },
  { id: "involved", label: "Help out", icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" /></svg> },
];

const DESKTOP_NAV = [
  { label: "What's On", href: "#whats-on" },
  { label: "Library", href: "/library" },
  { label: "Achievements", href: "#achievements" },
  { label: "Get Involved", href: "#involved" },
  { label: "Contact", href: "#contact" },
];

/* ── Components ── */

function Header({ onDonate }: { onDonate: () => void }) {
  const smoothTo = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F4]/95 backdrop-blur" style={{ borderBottom: "1px solid #1a1a1a0d" }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-2.5 lg:py-3 flex items-center gap-3">
        <a href="#top" onClick={(e) => smoothTo(e, "#top")} className="flex items-center gap-2 min-w-0 flex-1 lg:flex-none">
          <SchoolMark size={32} />
          <span className={`${heading} font-black text-[15px] tracking-tight truncate`}>ESPS PTA</span>
        </a>
        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {DESKTOP_NAV.map((n) =>
            n.href.startsWith("#") ? (
              <a key={n.href} href={n.href} onClick={(e) => smoothTo(e, n.href)}
                className="px-3 py-2 rounded-full text-[14px] font-semibold text-stone-700 hover:bg-stone-100 transition">
                {n.label}
              </a>
            ) : (
              <Link key={n.href} href={n.href}
                className="px-3 py-2 rounded-full text-[14px] font-semibold text-stone-700 hover:bg-stone-100 transition">
                {n.label}
              </Link>
            )
          )}
        </nav>
        <button onClick={onDonate}
          className="hidden lg:inline-flex items-center justify-center px-4 py-2.5 rounded-full font-bold text-white text-[14px] active:scale-[0.97] transition"
          style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}>
          Donate
        </button>
      </div>
    </header>
  );
}

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

  const go = (e: React.MouseEvent, href: string, id: string) => {
    e.preventDefault();
    setActive(id);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="lg:hidden" aria-hidden style={{ height: "calc(74px + env(safe-area-inset-bottom))" }} />
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white"
        style={{ borderTop: "1px solid #1a1a1a14", paddingBottom: "env(safe-area-inset-bottom)", boxShadow: "0 -4px 16px rgba(20,30,40,0.06)" }}>
        <div className="grid grid-cols-5 items-end px-2 pt-2 pb-2 max-w-md mx-auto">
          {NAV.slice(0, 2).map((n) => (
            <TabBtn key={n.id} item={n} active={active === n.id} onClick={(e) => go(e, `#${n.id}`, n.id)} />
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
            <TabBtn key={n.id} item={n} active={active === n.id} onClick={(e) => go(e, `#${n.id}`, n.id)} />
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

function Hero() {
  const featured = DATA.events[0];
  return (
    <section id="top" className="px-4 lg:px-6 pt-6 pb-8 lg:pt-12 lg:pb-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white text-[11px] font-semibold text-stone-600 mb-4"
              style={{ border: "1px solid #1a1a1a14" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5B8E5A" }} />
              New term, new plans
            </div>
            <h1 className={`${heading} font-black tracking-tight leading-[1.0] text-[34px] sm:text-[44px] lg:text-[60px] text-stone-900`}>
              Big things,<br />little school.{" "}
              <span className="relative inline-block">
                <span style={{ color: "#E0713E" }}>Together.</span>
                <Underline color="#F5C24B" className="absolute -bottom-1 left-0 w-full h-2.5" />
              </span>
            </h1>
            <p className="mt-4 text-stone-600 text-[15px] lg:text-[17px] leading-relaxed max-w-lg">
              We&rsquo;re the East Sheen Primary PTA — parents, carers and staff raising funds and building community
              to enrich every child&rsquo;s school experience.
            </p>
            <div className="mt-5 flex gap-2.5">
              <Link href="/library"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-white text-[14px]"
                style={{ background: "#1a1a1a" }}>
                Big campaign →
              </Link>
              <a href="#involved" onClick={(e) => { e.preventDefault(); document.querySelector("#involved")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-stone-900 bg-white text-[14px]"
                style={{ border: "1.5px solid #1a1a1a14" }}>
                Help out
              </a>
            </div>
          </div>
          <article className="relative bg-white rounded-3xl overflow-hidden mt-2 lg:mt-0"
            style={{ border: "1.5px solid #1a1a1a14", boxShadow: "0 6px 0 #1a1a1a08" }}>
            <div className="px-4 pt-4 flex items-center justify-between">
              <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{ background: "#FFE6D7", color: "#B8551F" }}>★ Featured</span>
              <span className="text-[11px] text-stone-500 font-medium">{featured.tag}</span>
            </div>
            <div className="px-4 pt-3">
              <PlaceholderImg label="Event photo" ratio="16/9" tone="coral" />
            </div>
            <div className="p-4 lg:p-5">
              <div className={`${heading} font-black text-[13px] uppercase tracking-wider`} style={{ color: "#E0713E" }}>
                {featured.date}
              </div>
              <h3 className={`${heading} font-black text-[20px] lg:text-[24px] leading-tight text-stone-900 mt-1.5 mb-2`}>
                {featured.title}
              </h3>
              <p className="text-stone-600 text-[14px] leading-relaxed">{featured.description}</p>
              <button className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-white text-[13px]"
                style={{ background: "#3B8C9C", boxShadow: "0 2px 0 #235D69" }}>
                {featured.cta} →
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function WhatsOn() {
  const others = DATA.events.slice(1);
  return (
    <section id="whats-on" className="px-4 lg:px-6 py-10 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-3 mb-5 lg:mb-8">
          <h2 className={`${heading} font-black text-[26px] lg:text-[36px] tracking-tight text-stone-900 leading-none`}>
            What&rsquo;s on
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3 lg:gap-4">
          {others.map((e, i) => (
            <article key={e.title} className="bg-white rounded-2xl p-4 flex gap-4 active:scale-[0.99] transition"
              style={{ border: "1px solid #1a1a1a10" }}>
              <div className="shrink-0 text-center">
                <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center"
                  style={{ background: i % 2 === 0 ? "#FFE6D7" : "#D6ECEF" }}>
                  <div className={`${heading} font-black text-[20px] leading-none`}
                    style={{ color: i % 2 === 0 ? "#B8551F" : "#235D69" }}>
                    {e.shortDate.day}
                  </div>
                  {e.shortDate.month && (
                    <div className="text-[9px] uppercase tracking-wider font-bold mt-0.5"
                      style={{ color: i % 2 === 0 ? "#B8551F" : "#235D69" }}>
                      {e.shortDate.month}
                    </div>
                  )}
                </div>
                {e.time && <div className="text-[10px] text-stone-500 mt-1.5 font-medium">{e.time}</div>}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">{e.tag}</span>
                <h3 className={`${heading} font-black text-[17px] leading-tight text-stone-900 mt-0.5 mb-1`}>
                  {e.title}
                </h3>
                <p className="text-stone-600 text-[13px] leading-relaxed">{e.description}</p>
                {e.cta && <button className="mt-2 text-[12px] font-bold text-stone-900">{e.cta} →</button>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LibraryCampaign() {
  const { raised, goal, donors } = DATA.library;
  const pct = Math.round((raised / goal) * 100);
  return (
    <section id="library" className="px-4 lg:px-6 py-10 lg:py-16">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(160deg, #2d6e47 0%, #3a8f5c 100%)" }}>
        <div className="absolute -right-12 -bottom-12 opacity-15 pointer-events-none">
          <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
            <rect x="20" y="60" width="160" height="20" rx="3" fill="#F5C24B" />
            <rect x="40" y="80" width="120" height="20" rx="3" fill="#FFE6D7" />
            <rect x="30" y="100" width="140" height="20" rx="3" fill="#3B8C9C" />
            <rect x="50" y="120" width="100" height="20" rx="3" fill="#F5C24B" />
            <rect x="35" y="140" width="130" height="20" rx="3" fill="#FFE6D7" />
          </svg>
        </div>
        <div className="relative p-6 lg:p-12 text-white">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-green-200 mb-2">Our big campaign · 2025/26</p>
          <h2 className={`${heading} font-black text-[34px] sm:text-[44px] lg:text-[56px] leading-[0.95] tracking-tight`}>
            Love Our<br />
            <span className="relative inline-block">
              Libraries.
              <Squiggle color="#F5C24B" className="absolute -bottom-1.5 left-0 w-full h-2.5" />
            </span>
          </h2>
          <p className="mt-4 text-green-50/90 text-[14px] lg:text-[16px] leading-relaxed max-w-md">
            We&rsquo;re raising £50,000 to transform our KS1 and KS2 libraries into spaces where every child falls in love with reading.
          </p>
          <div className="mt-5 max-w-sm">
            <div className="flex items-baseline justify-between mb-1.5">
              <span className={`${heading} font-black text-[24px] lg:text-[28px]`}>£{raised.toLocaleString()}</span>
              <span className="text-green-100 text-[12px]">of £{goal.toLocaleString()}</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.18)" }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #F5C24B, #FFE6A8)" }} />
            </div>
            <div className="flex justify-between mt-1.5 text-[11px] text-green-100/80">
              <span>{pct}% there</span><span>{donors} donors</span>
            </div>
          </div>
          <div className="mt-5 flex gap-2.5 flex-wrap">
            <Link href="/library"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-stone-900 text-[14px]"
              style={{ background: "#F5C24B" }}>
              See the plan →
            </Link>
            <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-white text-[14px]"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
              Donate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const { achievements, thisYear, threeYears } = DATA;
  const palettes = [{ bg: "#FFE6D7", fg: "#B8551F" }, { bg: "#D6ECEF", fg: "#235D69" }, { bg: "#FFF1C9", fg: "#8B6B14" }];
  return (
    <section id="achievements" className="px-4 lg:px-6 py-10 lg:py-16" style={{ background: "#FAF6EE" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">By the numbers</p>
        <h2 className={`${heading} font-black text-[26px] lg:text-[36px] tracking-tight text-stone-900 leading-tight`}>
          What we&rsquo;ve{" "}
          <span className="relative inline-block">
            achieved
            <Underline color="#E0713E" className="absolute -bottom-1 left-0 w-full h-2.5" />
          </span>
        </h2>
        <p className="text-stone-600 mt-3 text-[14px] lg:text-[15px] leading-relaxed max-w-xl">
          Our community has raised over £150,000 in the past three years. Highlights from this year:
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2 lg:gap-4">
          {achievements.map((a, i) => (
            <div key={a.label} className="rounded-2xl p-3 lg:p-5" style={{ background: palettes[i].bg }}>
              <div className={`${heading} font-black text-[24px] sm:text-[32px] lg:text-[44px] leading-none tracking-tight`}
                style={{ color: palettes[i].fg }}>
                {a.figure}
              </div>
              <div className="text-[11px] lg:text-[13px] mt-1.5 font-medium leading-tight" style={{ color: palettes[i].fg }}>{a.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          {[
            { title: "This year", items: thisYear, color: "#5B8E5A" },
            { title: "Over three years", items: threeYears, color: "#E0713E" },
          ].map((col) => (
            <div key={col.title} className="bg-white rounded-2xl p-4 lg:p-5" style={{ border: "1px solid #1a1a1a10" }}>
              <h3 className={`${heading} font-black text-[15px] text-stone-900 mb-3`}>{col.title}</h3>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13px] text-stone-700">
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
    <section id="involved" className="px-4 lg:px-6 py-10 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className={`${heading} font-black text-[26px] lg:text-[36px] tracking-tight text-stone-900 leading-tight`}>
          Get{" "}
          <span className="relative inline-block">
            involved
            <Squiggle color="#3B8C9C" className="absolute -bottom-1.5 left-0 w-full h-2.5" />
          </span>
        </h2>
        <p className="text-stone-500 mt-2 text-[14px]">Six ways to make a difference.</p>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DATA.involved.map((card, i) => {
            const p = palettes[i];
            return (
              <article key={card.title} className="rounded-2xl p-4 lg:p-5"
                style={{ background: p.bg, border: `1px solid ${p.accent}25` }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3 bg-white"
                  style={{ border: `1.5px solid ${p.accent}` }}>
                  <span className={`${heading} font-black text-[14px]`} style={{ color: p.fg }}>{i + 1}</span>
                </div>
                <h3 className={`${heading} font-black text-[17px] mb-1.5 leading-tight`} style={{ color: p.fg }}>
                  {card.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: p.fg + "cc" }}>{card.description}</p>
                {card.cta && card.href && (
                  <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold" style={{ color: p.fg }}>
                    {card.cta} →
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Committee() {
  const colors = ["#FFE6D7", "#D6ECEF", "#FFF1C9", "#DEEBDA"];
  const fgColors = ["#B8551F", "#235D69", "#8B6B14", "#3D6B3D"];
  return (
    <section className="px-4 lg:px-6 py-10 lg:py-16" style={{ background: "#FAF6EE" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className={`${heading} font-black text-[26px] lg:text-[36px] tracking-tight text-stone-900 leading-tight`}>
            Your PTA committee
          </h2>
          <p className="text-stone-600 mt-2 text-[14px]">Elected at the AGM each October.</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
          {DATA.committee.map((m, i) => (
            <div key={m.name} className="bg-white rounded-2xl p-3 text-center" style={{ border: "1px solid #1a1a1a10" }}>
              <div className="w-10 h-10 mx-auto rounded-full mb-2 flex items-center justify-center"
                style={{ background: colors[i % 4] }}>
                <span className={`${heading} font-black text-[13px]`} style={{ color: fgColors[i % 4] }}>
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <p className="font-bold text-stone-900 text-[12px] leading-tight">{m.name}</p>
              <p className="text-[9px] text-stone-500 mt-0.5 uppercase tracking-wider">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-4 lg:px-6 py-12" style={{ background: "#1F3D4A" }}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className={`${heading} font-black text-[26px] lg:text-[36px] tracking-tight text-white leading-tight`}>
          Say hello.
        </h2>
        <p className="text-white/70 mt-2 text-[14px] max-w-md mx-auto">
          Questions, ideas, or want to get involved? We&rsquo;d love to hear.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-2.5 justify-center">
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

function DonateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState(20);
  const [custom, setCustom] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3"
      style={{ background: "rgba(15,25,30,0.55)" }} onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-md p-5 sm:p-6 relative"
        style={{ border: "1.5px solid #1a1a1a14", boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
        <Star color="#F5C24B" size={22} />
        <h3 className={`${heading} font-black text-[22px] mt-2 text-stone-900`}>Make a donation</h3>
        <p className="text-stone-500 text-[13px] mt-1">Every pound goes directly to ESPS children. Gift Aid adds 25%.</p>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[10, 20, 50, 100].map((p) => (
            <button key={p} onClick={() => { setAmount(p); setCustom(""); }}
              className={`py-2.5 rounded-xl font-bold text-[14px] transition ${amount === p && !custom ? "text-white" : "bg-stone-100 text-stone-800"}`}
              style={amount === p && !custom ? { background: "#E0713E" } : {}}>
              £{p}
            </button>
          ))}
        </div>
        <div className="mt-2.5 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-stone-500 text-[14px]">£</span>
          <input type="number" value={custom}
            onChange={(e) => { setCustom(e.target.value); setAmount(parseInt(e.target.value) || 0); }}
            placeholder="Other amount"
            className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-stone-50 font-semibold text-[14px] focus:outline-none focus:bg-white"
            style={{ border: "1px solid #1a1a1a14" }} />
        </div>
        <button className="w-full mt-4 py-3 rounded-full font-bold text-white text-[14px]"
          style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}>
          Donate £{amount || 0} →
        </button>
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

/* ── Main App ── */
export default function Home() {
  const [donateOpen, setDonateOpen] = useState(false);
  return (
    <div className="min-h-screen" style={{ background: "#FBF9F4", color: "#1a1a1a" }}>
      <Header onDonate={() => setDonateOpen(true)} />
      <BottomNav onDonate={() => setDonateOpen(true)} />
      <Hero />
      <WhatsOn />
      <LibraryCampaign />
      <Achievements />
      <GetInvolved />
      <Committee />
      <Contact />
      <PageFooter />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
}
