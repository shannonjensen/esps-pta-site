"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DonateModal } from "./components/DonateModal";

/* ── Data ── */
const DATA = {
  events: [
    { date: "8 May", shortDate: { day: "8", month: "May" }, title: "Y5 Cake Sale", description: "Year 5 are baking up a storm — pop by after pickup for a treat.", cta: "Save the date", tag: "Fundraiser" },
    { date: "12 June", shortDate: { day: "12", month: "Jun" }, title: "Reception Cake Sale", description: "Support our youngest pupils at the last bake sale of the school year.", cta: "Save the date", tag: "Fundraiser" },
    { date: "12–13 June", shortDate: { day: "12", month: "Jun" }, title: "ESPS Bike Ride to Amsterdam", description: "Our parents are cycling to Amsterdam to raise money for the library transformation. Novices welcome!", cta: "Sponsorship coming soon", tag: "Fundraiser" },
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
    { title: "Coffee Club", description: "A small monthly donation of £5, £10 or £20 makes a big difference, raising over £3,700 this year. These donations can qualify for gift aid, boosting your donation by 25% at no cost to you.", cta: "Sign up", href: "https://docs.google.com/forms/d/e/1FAIpQLScIncFFAhnKj8KHagLgLhKSntQO2aUzipyykp1OIpvmluZ7_w/viewform?usp=header" },
    { title: "EasyFundraising", description: "Shop online as usual and earn free donations for the school. Over £400 raised last term alone with zero effort.", cta: "Start raising", href: "https://www.easyfundraising.org.uk/causes/eastsheenps/" },
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
    { role: "Member", name: "Elisa Peccerillo-Pallister" },
    { role: "Member", name: "Kelsey Elliott" },
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

/* ── Mobile Header (burger) ── */
function MobileHeader({ onDonate }: { onDonate: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  };

  const items: Array<{ id: string; label: string; href?: string }> = [
    { id: "whats-on", label: "What’s On" },
    { id: "library", label: "Library", href: "/library" },
    { id: "achievements", label: "Achievements" },
    { id: "involved", label: "Get Involved" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(251,249,244,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a10" }}>
        <span className={`${h} font-black text-[18px] text-stone-900 tracking-tight`}>ESPS PTA</span>
        <div className="flex items-center gap-2">
          <button onClick={onDonate} className="px-3.5 py-1.5 rounded-full font-bold text-white text-[12px] active:scale-[0.98]"
            style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}>
            Donate
          </button>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}
            className="w-9 h-9 rounded-full flex items-center justify-center text-stone-800 active:scale-[0.95]">
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="13" x2="20" y2="13" /><line x1="4" y1="19" x2="20" y2="19" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {open && (
        <>
          <div className="lg:hidden fixed inset-0 z-30" onClick={() => setOpen(false)}
            style={{ background: "rgba(15,25,30,0.35)" }} />
          <nav className="lg:hidden fixed left-3 right-3 z-40 bg-white rounded-2xl p-2"
            style={{ top: "64px", boxShadow: "0 12px 32px rgba(0,0,0,0.18)", border: "1px solid #1a1a1a10" }}>
            {items.map((item) =>
              item.href ? (
                <Link key={item.id} href={item.href} onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-[15px] font-semibold text-stone-800 active:bg-stone-100">
                  {item.label}
                </Link>
              ) : (
                <a key={item.id} href={`#${item.id}`} onClick={(e) => go(e, item.id)}
                  className="block px-4 py-3 rounded-xl text-[15px] font-semibold text-stone-800 active:bg-stone-100">
                  {item.label}
                </a>
              )
            )}
          </nav>
        </>
      )}
    </>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section id="top" className="px-4 lg:px-6 pt-8 pb-6 lg:pt-14 lg:pb-14">
      <div className="max-w-3xl mx-auto lg:text-center">
        <h2 className={`${h} font-bold text-stone-700 text-[22px] lg:text-[28px] tracking-tight leading-tight`}>
          East Sheen Primary&rsquo;s PTA
        </h2>
        <h1 className={`${h} font-black tracking-tight leading-[1.0] text-[34px] lg:text-[52px] mt-3 lg:mt-4`} style={{ color: "#1E548E" }}>
          {/* Mobile: three stacked lines, two separate underlines */}
          <span className="lg:hidden">
            <span className="block">Strengthening</span>
            <span className="block">
              our{" "}
              <span className="relative inline-block">
                school
                <Underline color="#F5C24B" className="absolute -bottom-1 left-0 w-full h-2.5" />
              </span>
            </span>
            <span className="block relative inline-block">
              <span style={{ color: "#E0713E" }}>and community.</span>
              <Underline color="#F5C24B" className="absolute -bottom-1 left-0 w-full h-2.5" />
            </span>
          </span>

          {/* Desktop: one line, one long squiggle under "school and community." */}
          <span className="hidden lg:inline">
            Strengthening our{" "}
            <span className="relative inline-block" style={{ color: "#E0713E" }}>
              school and community.
              <Underline color="#F5C24B" className="absolute -bottom-1 left-0 w-full h-2.5" />
            </span>
          </span>
        </h1>
        <p className="mt-3 text-stone-600 text-[15px] lg:text-[17px] leading-relaxed lg:max-w-xl lg:mx-auto">
          We raise funds and run events that help create extraordinary opportunities for every child at ESPS.
        </p>
      </div>
    </section>
  );
}

/* ── Library campaign pulse ── */
function LibraryPulse({ onDonate }: { onDonate: () => void }) {
  const goal = DATA.library.goal;
  const [stats, setStats] = useState<{ raised: number; donors: number } | null>(null);
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
  }, []);
  const loaded = stats !== null;
  const raised = stats?.raised ?? 0;
  const donors = stats?.donors ?? 0;
  const pct = loaded ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
  return (
    <section id="library" className="px-4 lg:px-6 pb-2">
      <div className="max-w-3xl mx-auto">
      <div className="rounded-3xl overflow-hidden relative" style={{ background: "#234A3A" }}>
        <div className="relative p-5 lg:p-12 text-white">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold mb-2"
            style={{ background: "rgba(255, 230, 215, 0.18)", color: "#FFE6D7" }}>
            The Library Campaign
          </span>
          <h2 className={`${h} font-bold text-[32px] lg:text-[44px] leading-[1.0] tracking-tight mt-2`}>
            Let&rsquo;s{" "}
            <span style={{ color: "#E0713E" }}>Transform</span>{" "}
            Our Libraries
          </h2>
          <p className="mt-3 text-white/90 text-[15px] lg:text-[16px] leading-relaxed">
            We&rsquo;re raising <strong className="font-black" style={{ color: "#F5C24B" }}>£50,000</strong> to transform our KS1 and KS2 libraries into inspiring spaces where every child falls in love with reading.
          </p>
          <div className="mt-4 rounded-2xl p-3.5" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}>
            <div className="flex items-baseline justify-between mb-2">
              <span className={`${h} font-semibold text-[18px] sm:text-[22px] tracking-tight leading-none`} style={{ minHeight: "1em" }}>
                {loaded ? `£${raised.toLocaleString()}` : " "}
              </span>
              <span className={`${h} text-[18px] sm:text-[22px] tracking-tight leading-none font-semibold text-white/85`}>of £{goal.toLocaleString()}</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden relative" style={{ background: "rgba(0,0,0,0.18)" }}>
              <div className="h-full rounded-full relative transition-[width] duration-500" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #F5C24B, #FFE6A8)" }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 w-3 h-3 rounded-full bg-white" style={{ boxShadow: "0 0 0 2px #F5C24B" }} />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-white/80">
              <span className="font-bold">{loaded ? `${pct}% there` : " "}</span>
              <span>{loaded ? `${donors} donors so far` : " "}</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href="/library"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-full font-bold text-[13px] active:scale-[0.98] transition"
              style={{ background: "transparent", border: "1.5px solid #F5C24B", color: "#F5C24B" }}>
              Learn more →
            </Link>
            <button onClick={onDonate}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-full font-bold text-white text-[13px] active:scale-[0.98] transition"
              style={{ background: "#E0713E", boxShadow: "0 2px 0 #B8551F" }}>
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
    { bg: "#FFF1C9", fg: "#8B6B14", btn: "#D9A227", btnShadow: "#8B6B14" },
    { bg: "#DEEBDA", fg: "#3D6B3D", btn: "#5B8E5A", btnShadow: "#3D6B3D" },
  ];
  return (
    <section id="whats-on" className="px-4 lg:px-6 pt-7 pb-6">
      <div className="max-w-3xl mx-auto">
      <div className="mb-5">
        <h2 className={`${h} font-black text-[26px] tracking-tight text-stone-900 leading-none`}>
          What&rsquo;s{" "}
          <span className="relative inline-block">
            coming up
            <Squiggle color="#E0713E" className="absolute -bottom-1.5 left-0 w-full h-2.5" />
          </span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {DATA.events.map((e, i) => {
          const t = tones[i % tones.length];
          return (
            <article key={e.title} className="relative bg-white rounded-3xl overflow-hidden flex flex-col"
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
              <div className="px-4 pt-3 pb-4 flex-1 flex flex-col">
                <p className="text-stone-600 text-[13.5px] leading-relaxed">{e.description}</p>
                {e.cta && (
                  <div className="mt-auto pt-3">
                    {/save the date|coming soon/i.test(e.cta) ? (
                      <p className="font-bold text-[13px]" style={{ color: t.fg }}>
                        {e.cta}{/save the date/i.test(e.cta) ? "!" : ""}
                      </p>
                    ) : (
                      <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-white text-[13px] active:scale-[0.98]"
                        style={{ background: t.btn, boxShadow: `0 2px 0 ${t.btnShadow}` }}>
                        {e.cta} →
                      </button>
                    )}
                  </div>
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

/* ── About the PTA ── */
function AboutPta() {
  const linkClass = "underline underline-offset-4 decoration-stone-300 hover:decoration-stone-500";
  const linkColor = {} as React.CSSProperties;
  return (
    <section id="about" className="px-4 lg:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className={`${h} font-black text-[28px] tracking-tight text-stone-900 leading-tight`}>
          About the{" "}
          <span className="relative inline-block">
            PTA
            <Underline color="#E0713E" className="absolute -bottom-1 left-0 w-full h-2.5" />
          </span>
        </h2>
        <p className="mt-4 text-stone-700 text-[15px] leading-relaxed">
          Our PTA&rsquo;s purpose is to help every child at East Sheen Primary School to thrive. We
          support the school in its ambition to be a fun, exciting and aspirational school where
          children love learning, feel happy and safe at school, and have the support and
          opportunities they need to succeed.
        </p>
        <p className="mt-4 text-stone-700 text-[15px] leading-relaxed">We do this by:</p>
        <ol className="mt-2 space-y-2 text-stone-700 text-[15px] leading-relaxed list-decimal pl-5 marker:font-bold marker:text-stone-500">
          <li>raising money to pay for equipment and facilities that aren&rsquo;t covered by the school&rsquo;s regular funding;</li>
          <li>working with the school&rsquo;s leadership to understand what funds are needed for;</li>
          <li>playing our part to connect a wider school community of parents, carers and teachers, which helps make East Sheen Primary School such a warm and welcoming place.</li>
        </ol>
        <p className="mt-4 text-stone-700 text-[15px] leading-relaxed">
          Every parent and carer with a child at the school is a member of the PTA. Fundraising is
          the ultimate team sport — we&rsquo;d encourage everyone to get involved. Click on the links
          to find out more about our{" "}
          <a href="#whats-on" className={linkClass} style={linkColor}>events</a>,{" "}
          <a href="#achievements" className={linkClass} style={linkColor}>where we spend the money raised</a>,{" "}
          <a href="#involved" className={linkClass} style={linkColor}>how to get involved</a>, and{" "}
          <a href="#committee" className={linkClass} style={linkColor}>who&rsquo;s on the current PTA Committee</a>.
        </p>
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
      <div className="max-w-3xl mx-auto">
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
function GetInvolved({ onDonate }: { onDonate: () => void }) {
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
      <div className="max-w-3xl mx-auto">
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
              <div className="min-w-0 flex-1 flex flex-col">
                <h3 className={`${h} font-black text-[17px] leading-tight`} style={{ color: p.fg }}>{card.title}</h3>
                <p className="text-[13px] leading-relaxed mt-1" style={{ color: p.fg + "cc" }}>{card.description}</p>
                {card.cta && card.href && (
                  <div className="mt-auto pt-3">
                    {card.href === "#donate" ? (
                      <button onClick={onDonate}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold bg-white active:scale-[0.98]"
                        style={{ color: p.fg, border: `1px solid ${p.accent}40` }}>
                        {card.cta} →
                      </button>
                    ) : (
                      <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold bg-white"
                        style={{ color: p.fg, border: `1px solid ${p.accent}40` }}>
                        {card.cta} →
                      </a>
                    )}
                  </div>
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
    <section id="committee" className="py-8" style={{ background: "#FAF6EE" }}>
      <div className="px-4 lg:px-6 mb-4 max-w-3xl lg:mx-auto">
        <h2 className={`${h} font-black text-[24px] tracking-tight text-stone-900 leading-tight`}>Your PTA committee</h2>
        <p className="text-stone-600 mt-1 text-[13px]">Elected at the AGM each October.</p>
      </div>
      <div className="flex gap-2.5 overflow-x-auto px-4 lg:px-6 pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:max-w-3xl lg:mx-auto"
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
      <div className="max-w-3xl mx-auto">
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
            className="group relative rounded-2xl overflow-hidden active:scale-[0.99] transition"
            style={{ background: n.bg, border: `1px solid ${n.accent}30` }}>
            <div className="p-4">
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
      <div className="text-center max-w-3xl mx-auto">
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

function PageFooter() {
  return (
    <footer className="px-4 py-5 text-center text-[11px] text-stone-400" style={{ background: "#15303A" }}>
      © {new Date().getFullYear()} East Sheen Primary School PTA
    </footer>
  );
}

/* ── Main ── */
export default function Home() {
  const [donateSource, setDonateSource] = useState<string | null>(null);
  const donateOpen = donateSource !== null;
  const closeDonate = () => setDonateSource(null);

  // Auto-open donate modal if URL has ?source=... (used for printed QR codes)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const src = params.get("source");
    if (src) setDonateSource(src);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FBF9F4", color: "#1a1a1a" }}>
      <DesktopHeader onDonate={() => setDonateSource("header")} />
      <MobileHeader onDonate={() => setDonateSource("header")} />
      <Hero />
      <LibraryPulse onDonate={() => setDonateSource("campaign_card")} />
      <WhatsOn />
      <AboutPta />
      <Achievements />
      <GetInvolved onDonate={() => setDonateSource("get_involved_button")} />
      <Committee />
      <Newsletters />
      <Contact />
      <PageFooter />
      <DonateModal open={donateOpen} onClose={closeDonate} source={donateSource} />
    </div>
  );
}
