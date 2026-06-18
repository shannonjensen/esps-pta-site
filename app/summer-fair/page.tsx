import type { Metadata } from "next";
import Link from "next/link";

const ogDescription =
  "Saturday 27 June, 2–6pm. BBQ, tombola, games, live music, gladiator duel and more — fun for the whole family. Entry £1 per person.";

export const metadata: Metadata = {
  title: "Summer Fair — Sat 27 June | ESPS PTA",
  description: ogDescription,
  openGraph: {
    title: "East Sheen Primary School Summer Fair 🎉",
    description: ogDescription,
    url: "https://www.espspta.org/summer-fair",
    siteName: "ESPS PTA",
    type: "website",
    images: [
      {
        url: "https://www.espspta.org/summer-fair-og.jpg",
        width: 1200,
        height: 630,
        alt: "East Sheen Primary School Summer Fair — Saturday 27 June, 2–6pm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "East Sheen Primary School Summer Fair 🎉",
    description: ogDescription,
    images: ["https://www.espspta.org/summer-fair-og.jpg"],
  },
};

// Poster palette (mimicking the printed Summer Fair flyer).
const cream = "#FAF3E6";
const navy = "#1C3A5E";
const pink = "#E6398A";
const yellow = "#F4B81E";
const blue = "#3FA9DC";
const green = "#5BB54A";
const orange = "#F07F2D";
const purple = "#8E4FA8";

const buntingColors = [pink, orange, yellow, green, blue, purple];

const heading = "font-[family-name:var(--font-heading)]";

// Each letter of "SUMMER" in its own poster colour.
const summerLetters: [string, string][] = [
  ["S", pink],
  ["U", yellow],
  ["M", blue],
  ["M", green],
  ["E", orange],
  ["R", purple],
];

const attractions: {
  emoji: string;
  title: string;
  blurb: string;
  awning: [string, string];
}[] = [
  {
    emoji: "🍔",
    title: "BBQ & Drinks",
    blurb: "Burgers, hot dogs and cold drinks to keep the whole family fuelled.",
    awning: [orange, "#FFD9B0"],
  },
  {
    emoji: "🎟️",
    title: "Tombola",
    blurb: "Bottles, prizes and goodies galore — will your ticket be a winner?",
    awning: [pink, "#FFD2E6"],
  },
  {
    emoji: "🎯",
    title: "Fun Games",
    blurb: "Classic fete games and stalls with prizes to be won all afternoon.",
    awning: [green, "#CFEEC4"],
  },
  {
    emoji: "🎸",
    title: "Live Music",
    blurb: "Live performances on the main stage to soundtrack the sunshine.",
    awning: [blue, "#C7E8F6"],
  },
  {
    emoji: "🤺",
    title: "Gladiator Duel",
    blurb: "Battle it out on the inflatable arena — last one standing wins!",
    awning: [purple, "#E2CDEF"],
  },
  {
    emoji: "🐛",
    title: "Wild Encounters",
    blurb: "Come and meet the creepy crawlies — if you dare!",
    awning: [yellow, "#FCEBB8"],
  },
];

// Sign-up / external links — fill these in when ready. Until then the page
// shows a muted "link coming soon" note instead of a dead link.
const LINKS: { openMic: string | null; robotics: string | null; silentAuction: string | null } = {
  openMic: "/summer-fair/open-mic",
  robotics: "https://activities.bookpebble.co.uk/activity/creative-iq-robotics-workshop-east-sheen-primary-school-london-5dc0afa2-dbae-416b-989c-e085f7587cf4",
  silentAuction: "https://galabid.com/esps-summer2026",
};

const newThisYear: {
  emoji: string;
  title: string;
  time: string;
  blurb: string;
  awning: [string, string];
  link?: string | null;
  linkLabel?: string;
  poster?: string;
}[] = [
  { emoji: "🎸", title: "Rock Bandz", time: "2:45pm", blurb: "Pupil performances live on the Astro stage.", awning: [pink, "#FFD2E6"] },
  { emoji: "🥁", title: "Year 5 Rock Band", time: "3:00pm", blurb: "Our Year 5 rockers take to the stage.", awning: [orange, "#FFD9B0"] },
  { emoji: "💃", title: "Zumba with Tina", time: "3:30 & 4:30pm", blurb: "Get moving with two lively 15 minute sessions on Putney Playground.", awning: [green, "#CFEEC4"] },
  { emoji: "🤖", title: "Robotics Workshops", time: "2:30, 3:30 & 4:30pm", blurb: "Hands-on robotics for budding engineers. £5 per child, with all proceeds going to the PTA.", awning: [blue, "#C7E8F6"], link: LINKS.robotics, linkLabel: "Book a place", poster: "/robotics-poster.jpg" },
  { emoji: "🎤", title: "Open Mic", time: "5:15–6:00pm", blurb: "Kids and grown-ups welcome — take the stage and share your talent to round off the day.", awning: [purple, "#E2CDEF"], link: LINKS.openMic, linkLabel: "Sign up to perform" },
];

const schedule: [string, string, string][] = [
  ["2:00", "Fair opens!", ""],
  ["2:30", "Robotics — Session 1", "Classroom X"],
  ["2:45", "Rock Bandz performances", "Astro"],
  ["3:00", "Year 5 Band performance", "Astro"],
  ["3:30", "Zumba with Tina", "Putney Playground"],
  ["3:30", "Robotics — Session 2", "Classroom X"],
  ["4:30", "Zumba with Tina", "Putney Playground"],
  ["4:30", "Robotics — Session 3", "Classroom X"],
  ["5:15", "Open Mic", "Astro"],
  ["6:00", "Fair closes", ""],
];

const supportItems: {
  emoji: string;
  color: string;
  title: string;
  body: string;
  link?: string | null;
  linkLabel?: string;
}[] = [
  {
    emoji: "📐",
    color: blue,
    title: "See the new designs",
    body: "Visit the PTA booth to see the new library designs, learn more about the renovations, and suggest books you'd love to see on the shelves next year.",
  },
  {
    emoji: "🏷️",
    color: purple,
    title: "Silent Auction",
    body: "Our silent auction is live now — bid online, with all proceeds going to the library transformation.",
    link: LINKS.silentAuction,
    linkLabel: "Bid now",
  },
  {
    emoji: "🎟️",
    color: pink,
    title: "Summer Raffle",
    body: "Grab raffle tickets from your class reps. Prizes include £200 cash, a wine tasting for two and local vouchers — all proceeds to the library transformation.",
  },
];

const externalStalls: { name: string; note?: string; link?: string | null }[] = [
  { name: "Mathnasium", link: "https://www.mathnasium.com/uk/maths-centres/sheen" },
  { name: "Monkey Puzzle Nursery", link: "https://monkeypuzzleeastsheen.co.uk/" },
  { name: "Statement Jewellery" },
  { name: "Homemade Lemonade" },
  { name: "Bath Bombs" },
  { name: "Wild Encounters", note: "meet the creepy crawlies", link: "https://wild-encounters.co.uk/" },
  { name: "Creative IQ Robotics Workshops", link: LINKS.robotics },
  { name: "Usborne Books", note: "every purchase helps the school earn free books", link: "https://www.instagram.com/emilysbookshop2025?igsh=MW5pczAwOXRkZGU1ag==" },
];

function Bunting() {
  // A repeating row of downward triangle flags, like the poster's bunting.
  const flags = Array.from({ length: 22 });
  return (
    <div
      aria-hidden
      className="w-full flex items-start justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(#00000014, #00000000 2px), transparent",
        backgroundSize: "100% 2px",
        backgroundRepeat: "no-repeat",
      }}
    >
      {flags.map((_, i) => (
        <div
          key={i}
          style={{
            width: 0,
            height: 0,
            borderLeft: "min(3.2vw, 26px) solid transparent",
            borderRight: "min(3.2vw, 26px) solid transparent",
            borderTop: `min(4.6vw, 38px) solid ${buntingColors[i % buntingColors.length]}`,
            filter: "drop-shadow(0 2px 1px rgba(0,0,0,0.10))",
          }}
        />
      ))}
    </div>
  );
}

function Sun() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="absolute right-3 top-2 sm:right-8 sm:top-4 w-16 h-16 sm:w-24 sm:h-24"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="48"
          y="2"
          width="4"
          height="14"
          rx="2"
          fill={yellow}
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="26" fill={yellow} />
      <circle cx="42" cy="47" r="3" fill={navy} />
      <circle cx="58" cy="47" r="3" fill={navy} />
      <path
        d="M42 57 Q50 64 58 57"
        stroke={navy}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function InfoChip({
  icon,
  color,
  label,
  value,
}: {
  icon: string;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3"
      style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.10)" }}
    >
      <span
        className="shrink-0 grid place-items-center w-11 h-11 rounded-xl text-[22px]"
        style={{ background: `${color}1F` }}
      >
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-stone-500">
          {label}
        </div>
        <div className={`${heading} font-bold text-[17px] sm:text-[19px]`} style={{ color: navy }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function SummerFairPage() {
  return (
    <div className="min-h-screen" style={{ background: cream, color: navy }}>
      <Bunting />

      {/* Back link */}
      <div className="px-4 sm:px-6 pt-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-stone-600 hover:text-stone-900"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Back to ESPS PTA
        </Link>
      </div>

      {/* Hero */}
      <section className="relative px-6 sm:px-8 pt-6 pb-4 sm:pt-10">
        <Sun />
        <div className="max-w-3xl mx-auto text-center">
          <p className={`${heading} text-[15px] sm:text-[20px] font-bold tracking-tight`} style={{ color: navy }}>
            East Sheen Primary School&rsquo;s
          </p>

          <h1
            className={`${heading} font-black tracking-tight leading-[0.92] mt-1`}
            style={{ fontSize: "clamp(56px, 16vw, 132px)" }}
          >
            {summerLetters.map(([ch, color], i) => (
              <span
                key={i}
                style={{
                  color,
                  textShadow:
                    "2px 2px 0 #fff, -2px 2px 0 #fff, 2px -2px 0 #fff, -2px -2px 0 #fff, 4px 5px 0 rgba(0,0,0,0.07)",
                }}
              >
                {ch}
              </span>
            ))}
          </h1>
          <p
            className={`${heading} italic font-black leading-none -mt-1 sm:-mt-2`}
            style={{ color: navy, fontSize: "clamp(40px, 12vw, 100px)" }}
          >
            Fair!
          </p>

          {/* Date / time / entry chips */}
          <div className="mt-7 flex flex-wrap items-stretch justify-center gap-3 max-w-2xl mx-auto">
            <div className="flex-1 min-w-[150px]">
              <InfoChip icon="📅" color={pink} label="When" value="Sat 27th June" />
            </div>
            <div className="flex-1 min-w-[150px]">
              <InfoChip icon="⏰" color={green} label="Time" value="2pm – 6pm" />
            </div>
            <div className="flex-1 min-w-[150px]">
              <InfoChip icon="🎟️" color={purple} label="Entry" value="£1 per person" />
            </div>
          </div>

          <p className="mt-7 text-[16px] sm:text-[18px] leading-relaxed max-w-xl mx-auto text-stone-700">
            Our biggest event of the year is back! Join us for an afternoon of
            food, games, music and fun for the whole family &mdash; all raising
            money for our school and a complete transformation of our libraries.
          </p>
        </div>
      </section>

      {/* What's on */}
      <section className="px-5 sm:px-6 pt-8 pb-6 max-w-4xl mx-auto">
        <h2 className={`${heading} text-center font-black tracking-tight text-[30px] sm:text-[40px]`} style={{ color: navy }}>
          What&rsquo;s On
        </h2>
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {attractions.map((a) => (
            <article
              key={a.title}
              className="rounded-3xl overflow-hidden bg-white flex flex-col"
              style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.10)" }}
            >
              {/* Striped awning */}
              <div
                className="h-9 w-full"
                style={{
                  background: `repeating-linear-gradient(90deg, ${a.awning[0]} 0 18px, ${a.awning[1]} 18px 36px)`,
                }}
              />
              <div className="p-5 flex-1 flex flex-col items-center text-center">
                <span className="text-[40px] -mt-9 mb-1 grid place-items-center w-16 h-16 rounded-full bg-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
                  {a.emoji}
                </span>
                <h3 className={`${heading} font-black text-[21px] mt-1`} style={{ color: navy }}>
                  {a.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-stone-600">{a.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* New this year */}
      <section className="px-5 sm:px-6 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.16em] font-bold"
            style={{ background: `${pink}1F`, color: pink }}>
            New This Year
          </span>
        </div>
        <h2 className={`${heading} text-center font-black tracking-tight text-[30px] sm:text-[40px] mt-3`} style={{ color: navy }}>
          Fresh fun for 2026
        </h2>
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {newThisYear.map((a) => (
            <article key={a.title} className="rounded-3xl overflow-hidden bg-white flex flex-col" style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.10)" }}>
              <div className="h-9 w-full" style={{ background: `repeating-linear-gradient(90deg, ${a.awning[0]} 0 18px, ${a.awning[1]} 18px 36px)` }} />
              <div className="p-5 flex-1 flex flex-col items-center text-center">
                <span className="text-[40px] -mt-9 mb-1 grid place-items-center w-16 h-16 rounded-full bg-white" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
                  {a.emoji}
                </span>
                <h3 className={`${heading} font-black text-[21px] mt-1`} style={{ color: navy }}>{a.title}</h3>
                <span className="mt-2 inline-block px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: `${a.awning[0]}26`, color: navy }}>
                  {a.time}
                </span>
                <p className="mt-2 text-[14px] leading-relaxed text-stone-600">{a.blurb}</p>
                {a.link ? (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" className="mt-3 font-bold text-[14px]" style={{ color: a.awning[0] }}>
                    {a.linkLabel} →
                  </a>
                ) : a.linkLabel ? (
                  <span className="mt-3 text-[12px] font-semibold text-stone-400">{a.linkLabel} — link coming soon</span>
                ) : null}
                {a.poster && (
                  <a href={a.poster} target="_blank" rel="noopener noreferrer" className="mt-1.5 text-[13px] font-semibold text-stone-500 underline underline-offset-2">
                    View poster
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* For our libraries */}
      <section className="px-5 sm:px-6 pt-4 pb-8 max-w-4xl mx-auto">
        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.16em] font-bold"
            style={{ background: `${green}1F`, color: green }}>
            For Our Libraries
          </span>
        </div>
        <h2 className={`${heading} text-center font-black tracking-tight text-[30px] sm:text-[40px] mt-3`} style={{ color: navy }}>
          Help transform our libraries
        </h2>
        <p className="text-center mt-3 text-[15px] sm:text-[16px] text-stone-600 max-w-xl mx-auto">
          So much of the fun on the day raises money to completely transform our two school libraries.
        </p>
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {supportItems.map((s) => (
            <div key={s.title} className="rounded-3xl bg-white p-6 flex flex-col" style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.10)" }}>
              <span className="grid place-items-center w-12 h-12 rounded-2xl text-[24px]" style={{ background: `${s.color}1F` }}>
                {s.emoji}
              </span>
              <h3 className={`${heading} font-black text-[19px] mt-3`} style={{ color: navy }}>{s.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-stone-600 flex-1">{s.body}</p>
              {s.link ? (
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="mt-3 font-bold text-[14px]" style={{ color: s.color }}>
                  {s.linkLabel} →
                </a>
              ) : s.linkLabel ? (
                <span className="mt-3 text-[12px] font-semibold text-stone-400">{s.linkLabel} — link coming soon</span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Running order */}
      <section className="px-5 sm:px-6 pt-6 pb-8 max-w-2xl mx-auto">
        <h2 className={`${heading} text-center font-black tracking-tight text-[30px] sm:text-[40px]`} style={{ color: navy }}>
          Running Order
        </h2>
        <ol className="mt-7 bg-white rounded-3xl p-6 sm:p-8" style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.10)" }}>
          {schedule.map(([time, what, where], i) => {
            const c = buntingColors[i % buntingColors.length];
            return (
              <li key={i} className="flex gap-4">
                <div className="shrink-0 w-[58px] sm:w-[66px] text-right pt-0.5">
                  <span className={`${heading} font-black text-[15px] sm:text-[17px]`} style={{ color: navy }}>{time}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-3 h-3 rounded-full mt-1.5" style={{ background: c }} />
                  {i < schedule.length - 1 && <span className="flex-1 w-[2px] my-1" style={{ background: "#0000001a" }} />}
                </div>
                <div className={i < schedule.length - 1 ? "pb-5" : ""}>
                  <div className={`${heading} font-bold text-[16px] sm:text-[17px]`} style={{ color: navy }}>{what}</div>
                  {where && <div className="text-[13px] text-stone-500 font-medium mt-0.5">{where}</div>}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* External stalls */}
      <section className="px-5 sm:px-6 pt-4 pb-8 max-w-4xl mx-auto">
        <h2 className={`${heading} text-center font-black tracking-tight text-[30px] sm:text-[40px]`} style={{ color: navy }}>
          External Providers
        </h2>
        <p className="text-center mt-3 text-[15px] sm:text-[16px] text-stone-600 max-w-xl mx-auto">
          There&rsquo;ll be lots of brilliant stalls and activities to explore, including:
        </p>
        <ul className="mt-6 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {externalStalls.map((s, i) => (
            <li key={s.name} className="flex items-start gap-2.5">
              <span className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ background: buntingColors[i % buntingColors.length] }} />
              <span className="text-[15px] sm:text-[16px]" style={{ color: navy }}>
                {s.link ? (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 hover:opacity-80">{s.name}</a>
                ) : (
                  <span className="font-bold">{s.name}</span>
                )}
                {s.note && <span className="text-stone-500"> &mdash; {s.note}</span>}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Get involved */}
      <section className="px-6 sm:px-8 pt-4 pb-12 max-w-3xl mx-auto text-center">
        <div
          className="rounded-3xl p-7 sm:p-10"
          style={{ background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.10)" }}
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.16em] font-bold"
            style={{ background: `${green}1F`, color: green }}
          >
            Lend a Hand
          </span>
          <h2 className={`${heading} font-black text-[26px] sm:text-[34px] tracking-tight mt-4`} style={{ color: navy }}>
            Can you help make it happen?
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-stone-600">
            The fair only works because of our wonderful volunteers. Could you
            spare an hour on a stall, donate a tombola prize, or bake something
            for the cake stall? Get in touch with your class rep &mdash; every
            little bit helps.
          </p>
        </div>
      </section>

      {/* Grassy footer */}
      <div
        aria-hidden
        className="h-16 w-full flex items-end justify-center gap-6 text-[22px] pb-2"
        style={{
          background: `linear-gradient(${cream}, ${green}26)`,
        }}
      >
        <span>🌼</span><span>🌷</span><span>🌻</span><span>🌸</span><span>🌼</span><span>🌷</span>
      </div>
    </div>
  );
}
