import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ESPS PTA — East Sheen Primary School",
  description:
    "East Sheen Primary School PTA — raising funds and building community to enrich the education and school experience of every child.",
};

/* ── Colour palette ── */
const blue = "#1b6fa0";
const blueDark = "#15587e";
const coral = "#e0713e";
const green = "#3a8f5c";
const greenDark = "#2d6e47";

/* ── Upcoming events ── */
const events = [
  {
    date: "12–13 June",
    title: "ESPS Bike Ride to Amsterdam",
    description:
      "Our parents are cycling to Amsterdam to raise money for the library transformation. Novices welcome! All proceeds go to the Love Our Libraries campaign.",
    link: "#bike-ride",
    linkLabel: "Sponsor a rider",
  },
  {
    date: "27 June, 2–6pm",
    title: "Summer Fair",
    description:
      "Our biggest event of the year — stalls, games, food, live music and fun for the whole family. Save the date!",
  },
];

/* ── Committee ── */
const committee = [
  { role: "Co-Chair", name: "Shannon Wedgwood" },
  { role: "Co-Chair", name: "Joe Thompson" },
  { role: "Treasurer", name: "Neil Abrey" },
  { role: "Secretary", name: "Katie Hale" },
  { role: "Member", name: "Karen Langley" },
  { role: "Member", name: "Crystal Sui" },
  { role: "Member", name: "Geneva Kearns" },
  { role: "Member", name: "Stefan Konstantinov" },
  { role: "Member", name: "Susana Garcia" },
];

/* ── Achievement stats ── */
const achievements = [
  { figure: "£33k+", label: "raised this school year" },
  { figure: "1,000+", label: "books donated by families" },
  { figure: "600", label: "children chose a free book on World Book Day" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-[family-name:var(--font-dm-sans)]">
      {/* ════════════ HERO ════════════ */}
      <section className="px-6 pt-10 pb-8 md:pt-14 md:pb-12" style={{ backgroundColor: blue }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            ESPS PTA
          </h1>
          <p className="max-w-xl mx-auto text-base text-sky-100/80 leading-relaxed">
            We raise funds and bring our community together to enrich the
            education and school experience of every child at East Sheen
            Primary.
          </p>
        </div>
      </section>

      {/* ════════════ WHAT'S ON ════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <h2
          className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-10 tracking-tight"
          style={{ color: blue }}
        >
          What&rsquo;s on
        </h2>
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.title}
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-6 bg-gray-50 rounded-xl"
            >
              <div
                className="shrink-0 font-[family-name:var(--font-heading)] text-lg font-bold whitespace-nowrap"
                style={{ color: coral }}
              >
                {event.date}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {event.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
                {event.link && (
                  <a
                    href={event.link}
                    className="inline-block mt-3 font-semibold text-sm underline underline-offset-2"
                    style={{ color: blue }}
                  >
                    {event.linkLabel} &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ LOVE OUR LIBRARIES BANNER ════════════ */}
      <section className="px-6">
        <Link
          href="/library"
          className="block max-w-4xl mx-auto rounded-2xl p-8 md:p-12 text-white transition hover:scale-[1.01] hover:shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${greenDark} 0%, ${green} 100%)`,
          }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-green-200/70 mb-2 font-semibold">
            Our big campaign
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Love Our Libraries
          </h2>
          <p className="text-green-100 text-lg leading-relaxed max-w-2xl mb-4">
            We&rsquo;re raising &pound;50,000 to transform our KS1 and KS2
            libraries into inspiring spaces where children fall in love with
            reading.
          </p>
          <span
            className="inline-block font-bold text-base px-6 py-2.5 rounded-lg"
            style={{ backgroundColor: coral }}
          >
            Find out more &rarr;
          </span>
        </Link>
      </section>

      {/* ════════════ ACHIEVEMENTS ════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <h2
          className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          style={{ color: blue }}
        >
          What we&rsquo;ve achieved
        </h2>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Thanks to the generosity of our school community, the PTA has raised
          over &pound;150,000 in the past three years. Here are some highlights
          from this year alone.
        </p>
        <div className="grid grid-cols-3 gap-6">
          {achievements.map((a) => (
            <div key={a.label} className="text-center">
              <p
                className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-1"
                style={{ color: green }}
              >
                {a.figure}
              </p>
              <p className="text-sm text-gray-500">{a.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">This year&rsquo;s PTA funding has paid for</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                New furniture for 6 classrooms
              </li>
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                Educational murals around the school
              </li>
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                3 laptops, 11 iPads and a smartboard
              </li>
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                70+ new STEM books for classrooms
              </li>
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                Wet play boxes for every class
              </li>
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                Gardening services, teaching kitchen refresh and literacy subscriptions
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">Over three years we&rsquo;ve also funded</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                Astroturf replacement &mdash; &pound;50,000
              </li>
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                Classroom supplies &mdash; &pound;45,000
              </li>
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                IT upgrades &mdash; &pound;11,000
              </li>
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                School stage construction &mdash; &pound;8,000
              </li>
              <li className="flex gap-2">
                <span style={{ color: green }}>&#10003;</span>
                Playground improvements, Year 6 gifts, uniforms and more
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ════════════ GET INVOLVED ════════════ */}
      <section className="px-6 py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-10 tracking-tight"
            style={{ color: blue }}
          >
            Get involved
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InvolvedCard
              title="Join the Coffee Club"
              description="A small monthly donation of £5 or £10 makes a big difference. Coffee Club raised over £3,700 this year. Gift Aid boosts it by 25% at no cost to you."
              linkHref="https://tinyurl.com/Esps10"
              linkLabel="Sign up"
              color={coral}
            />
            <InvolvedCard
              title="Use EasyFundraising"
              description="Shop online as usual and earn free donations for the school. Over £400 raised last term alone with zero effort. Just install the app or browser plug-in."
              linkHref="https://www.easyfundraising.org.uk"
              linkLabel="Start raising"
              color={coral}
            />
            <InvolvedCard
              title="Volunteer your time"
              description="Help at events, staff the after-school library, sort book donations, or share your skills. One-off or regular — every bit helps."
              linkHref="mailto:geneva@espspta.org"
              linkLabel="Get in touch"
              color={coral}
            />
            <InvolvedCard
              title="Join the Committee"
              description="We're always looking for new members. It's a great way to make a difference, meet other parents, and shape how PTA funds are spent."
              linkHref="mailto:pta@espspta.org"
              linkLabel="Find out more"
              color={coral}
            />
            <InvolvedCard
              title="Bake for a cake sale"
              description="Each year group runs a cake sale during the year. They raise hundreds of pounds that go directly back to support that year group's classroom activities."
              color={coral}
            />
            <InvolvedCard
              title="Donate directly"
              description="One-off donations are always welcome, and Gift Aid means we receive 25% more at no cost to you."
              linkHref="#donate"
              linkLabel="Make a donation"
              color={coral}
            />
          </div>
        </div>
      </section>

      {/* ════════════ COMMITTEE ════════════ */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <h2
          className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          style={{ color: blue }}
        >
          Your PTA Committee
        </h2>
        <p className="text-gray-500 mb-8 max-w-2xl">
          Elected at the Annual General Meeting each October. The committee
          typically serves two-year terms.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {committee.map((member) => (
            <div key={member.name} className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="font-bold text-gray-900 text-sm">{member.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section
        className="px-6 py-12 text-center"
        style={{ backgroundColor: "#e8f2f8" }}
      >
        <h2
          className="font-[family-name:var(--font-heading)] text-2xl font-bold mb-3"
          style={{ color: blue }}
        >
          Get in touch
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Have questions, ideas, or want to get involved? We&rsquo;d love to
          hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:pta@espspta.org"
            className="inline-block text-white font-semibold px-6 py-3 rounded-lg transition hover:opacity-90"
            style={{ backgroundColor: blue }}
          >
            Email the PTA
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          Registered charity no. 273295 &middot; Founded 1972 &middot;
          Affiliated with the National Confederation of Parent Teacher
          Associations
        </p>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="bg-gray-100 text-center text-sm text-gray-400 py-6 px-4">
        &copy; {new Date().getFullYear()} East Sheen Primary School PTA. All
        rights reserved.
      </footer>
    </main>
  );
}

/* ══════════════════════════════════════════
   Subcomponents
   ══════════════════════════════════════════ */

function InvolvedCard({
  title,
  description,
  linkHref,
  linkLabel,
  color,
}: {
  title: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        {description}
      </p>
      {linkHref && linkLabel && (
        <a
          href={linkHref}
          target={linkHref.startsWith("http") ? "_blank" : undefined}
          rel={linkHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-block text-sm font-semibold underline underline-offset-2"
          style={{ color }}
        >
          {linkLabel} &rarr;
        </a>
      )}
    </div>
  );
}
