import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The Library Project | ESPS PTA",
  description:
    "East Sheen Primary School PTA Library Project — transforming our libraries, refreshing our book stock, and opening access to families.",
};

/* ── Colour palette (from logo) ── */
const blue = "#1b6fa0"; // deep book-blue
const blueLight = "#e8f2f8";
const coral = "#e0713e"; // warm orange from the flames
const coralDark = "#c45e2f";

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0e4a6e] via-[#1b6fa0] to-[#2589bf] text-white px-6 py-10 md:py-14">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5" />

        <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center md:gap-10 text-center md:text-left">
          <Image
            src="/library/logo.png"
            alt="ESPS Library Project logo"
            width={160}
            height={200}
            className="w-20 md:w-32 h-auto mb-4 md:mb-0 drop-shadow-lg shrink-0"
            priority
          />
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs md:text-sm uppercase tracking-[0.2em] mb-1 text-sky-200/80">
              National Year of Reading 2026
            </p>
            <h1 className="font-[family-name:var(--font-caveat)] text-4xl md:text-6xl font-bold leading-tight mb-3">
              The Library Project
            </h1>
            <div
              className="w-12 h-1 rounded-full mb-3 mx-auto md:mx-0"
              style={{ backgroundColor: coral }}
            />
            <p className="font-[family-name:var(--font-dm-sans)] max-w-2xl text-base md:text-lg text-sky-100 leading-relaxed">
              We are working with the school on ambitious plans to transform our
              libraries and support reading for pleasure across every year group.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Cards */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: blue }}
        >
          What&rsquo;s the big idea?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card
            emoji="📚"
            title="KS1 & KS2 Library Transformation"
            text="We're working with library designers to create inspiring spaces that encourage children to fall in love with reading. Design proposals will be shared and fundraising will launch this spring."
          />
          <Card
            emoji="📖"
            title="1,000+ New Books"
            text="Fewer than 20% of our books were published in the last decade, and 40% of non-fiction is over 20 years old. We're aiming for 1,000+ new books through donations and a curated Book Wishlist."
          />
          <Card
            emoji="👨‍👩‍👧"
            title="Opening the Library to Families"
            text="After February half-term, the KS2 library will be open after school on Tuesdays and Wednesdays (3:20–4:15 pm), staffed by parent volunteers."
          />
          <Card
            emoji="🎉"
            title="World Book Day &mdash; March 5"
            text="Every child will choose a free book to take home. Families can stock up at the Secondhand Book Sale the next day, with all funds supporting this campaign."
          />
        </div>
      </section>

      {/* Current vs. Inspiration Photos */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ color: blue }}
          >
            Imagine the Possibilities
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our libraries are well-loved — now it&rsquo;s time for a refresh.
            Here&rsquo;s where we are and where we&rsquo;re headed.
          </p>
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">
              Our Current Libraries
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <figure className="overflow-hidden rounded-xl shadow">
                <Image
                  src="/library/ks1-current.jpg"
                  alt="Current KS1 library"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover"
                />
                <figcaption className="text-center text-sm text-gray-500 py-2">
                  KS1 Library
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-xl shadow">
                <Image
                  src="/library/ks2-current.jpg"
                  alt="Current KS2 library"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover"
                />
                <figcaption className="text-center text-sm text-gray-500 py-2">
                  KS2 Library
                </figcaption>
              </figure>
            </div>
          </div>
          <div>
            <h3
              className="text-lg font-semibold uppercase tracking-wide mb-4 text-center"
              style={{ color: coral }}
            >
              Inspiration for the Upgrade
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <figure
                className="overflow-hidden rounded-xl shadow ring-2"
                style={{ "--tw-ring-color": `${coral}33` } as React.CSSProperties}
              >
                <Image
                  src="/library/sample-library-1.jpg"
                  alt="Sample upgraded school library with cosy reading nooks"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover"
                />
                <figcaption className="text-center text-sm text-gray-500 py-2">
                  Cosy nooks and colourful, well-organised shelving
                </figcaption>
              </figure>
              <figure
                className="overflow-hidden rounded-xl shadow ring-2"
                style={{ "--tw-ring-color": `${coral}33` } as React.CSSProperties}
              >
                <Image
                  src="/library/sample-library-2.jpg"
                  alt="Sample upgraded school library with imaginative play structures"
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover"
                />
                <figcaption className="text-center text-sm text-gray-500 py-2">
                  Imaginative spaces that inspire a love of reading
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Upcoming Events */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2
          className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: blue }}
        >
          Upcoming Events
        </h2>
        <div className="space-y-0">
          <h3 className="text-lg font-bold mb-4" style={{ color: coral }}>
            Spring Term
          </h3>
          <TimelineItem
            date="Mon, Feb 23"
            text="Last day for WBD costume donations"
          />
          <TimelineItem
            date="Tue, Feb 24"
            text="STEM Book Wishlist opens for orders"
          />
          <TimelineItem
            date="Tue & Wed from Feb 24"
            text="KS2 library open after school, 3:20–4:15 pm"
            highlight
          />
          <TimelineItem
            date="Fri, Feb 27"
            text="World Book Day Costume Sale"
          />
          <TimelineItem
            date="Mon, Mar 2"
            text="Last day for secondhand book donations"
          />
          <TimelineItem
            date="Thu, Mar 5"
            text="World Book Day — Parade & free book pick"
            highlight
          />
          <TimelineItem
            date="Fri, Mar 6"
            text="Secondhand Book Sale"
          />
          <TimelineItem
            date="March"
            text="Library design proposals shared"
          />
          <div className="h-6" />
          <h3 className="text-lg font-bold mb-4" style={{ color: coral }}>
            Summer Term
          </h3>
          <TimelineItem date="After Easter" text="Book Wishlist launches" />
          <TimelineItem
            date="Summer"
            text="Library designs finalised, active fundraising"
          />
        </div>
      </section>

      {/* How to Help */}
      <section className="px-6 py-16" style={{ backgroundColor: blueLight }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ color: blue }}
          >
            How Can You Help?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <HelpCard
              emoji="📦"
              title="Donate Books"
              text="Donate good-quality, age-appropriate books (ages 4–11) to the main office throughout February. They'll refresh our shelves, supply the World Book Day free book pick, and stock the secondhand sale."
            />
            <HelpCard
              emoji="💛"
              title="Donate Funds"
              text="A dedicated library fundraiser will launch this spring. Interested in sponsoring a reading nook or bookshelf? Ongoing £10/month donations via our Coffee Club also help fund initiatives like this."
              link={{
                href: "https://tinyurl.com/Esps10",
                label: "Join the Coffee Club",
              }}
            />
            <HelpCard
              emoji="⏰"
              title="Donate Time"
              text="Volunteer to staff the library after school, sort book donations, help with events, or support the restocking effort — whether it's a one-time thing or an ongoing commitment."
              link={{
                href: "https://tinyurl.com/espslibraryvolunteer",
                label: "Sign up to volunteer",
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl font-bold mb-4" style={{ color: blue }}>
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Have questions or want to get involved? We&rsquo;d love to hear from
          you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:shannon@espspta.org"
            className="inline-block text-white font-semibold px-8 py-3 rounded-lg bg-[#e0713e] hover:bg-[#c45e2f] transition"
          >
            Email Shannon
          </a>
          <a
            href="mailto:pta@espspta.org"
            className="inline-block font-semibold px-8 py-3 rounded-lg border-2 transition"
            style={{ borderColor: blue, color: blue }}
          >
            Email the PTA
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-6 px-4">
        &copy; {new Date().getFullYear()} East Sheen Primary School PTA. All
        rights reserved.
      </footer>
    </main>
  );
}

/* ── Subcomponents ── */

function Card({
  emoji,
  title,
  text,
}: {
  emoji: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function TimelineItem({
  date,
  text,
  highlight,
}: {
  date: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex gap-4 pb-6 relative">
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full mt-1.5 shrink-0"
          style={{ backgroundColor: highlight ? coral : blue }}
        />
        <div className="w-0.5 bg-gray-200 grow" />
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: blue }}>
          {date}
        </p>
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
}

function HelpCard({
  emoji,
  title,
  text,
  link,
}: {
  emoji: string;
  title: string;
  text: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm text-center">
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{text}</p>
      {link && (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-semibold underline underline-offset-2 transition"
          style={{ color: blue }}
        >
          {link.label} &rarr;
        </a>
      )}
    </div>
  );
}
