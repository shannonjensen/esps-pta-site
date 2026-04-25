import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Love Our Libraries | ESPS PTA",
  description:
    "Help us raise £50,000 to transform the East Sheen Primary School libraries into inspiring spaces where children discover a lifelong love of reading.",
};

/* ── Config ── */
const GOAL = 50_000;
const RAISED = 0;
const DONATE_URL = "#donate"; // placeholder
const BIKE_RIDE_URL = "#bike-ride"; // placeholder

/* ── Colour palette ── */
const blue = "#1b6fa0";
const blueDark = "#15587e";
const blueLight = "#e8f2f8";
const coral = "#e0713e";
const coralDark = "#c45e2f";

export default function LibraryPage() {
  const percent = Math.min(Math.round((RAISED / GOAL) * 100), 100);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* ════════════ HERO ════════════ */}
      <section
        className="relative overflow-hidden text-white px-6 py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${blueDark} 0%, ${blue} 60%, #2a8bc2 100%)`,
        }}
      >
        {/* Subtle decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-32 -left-16 w-64 h-64 rounded-full opacity-5 bg-white" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
          <p className="font-[family-name:var(--font-dm-sans)] text-xs md:text-sm uppercase tracking-[0.25em] mb-3 text-sky-200/80">
            East Sheen Primary School PTA
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl font-bold leading-tight mb-6">
            Love Our Libraries
          </h1>
          <p className="font-[family-name:var(--font-dm-sans)] max-w-2xl text-lg md:text-xl text-sky-100 leading-relaxed mb-10">
            At East Sheen Primary, reading isn&rsquo;t just part of the
            curriculum &mdash; it&rsquo;s at the heart of how our children
            learn, imagine and grow. Our libraries are where that love of
            reading takes root: where children discover books, ideas and whole
            new worlds.
          </p>

          {/* CTA */}
          <a
            href={DONATE_URL}
            className="inline-block text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
            style={{ backgroundColor: coral }}
          >
            Donate Now
          </a>
        </div>
      </section>

      {/* ════════════ FUNDRAISING THERMOMETER ════════════ */}
      <section className="max-w-3xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex justify-between items-baseline mb-3">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: blue }}>
              &pound;{RAISED.toLocaleString()}
              <span className="text-base font-normal text-gray-400">
                {" "}raised
              </span>
            </p>
            <p className="text-lg font-semibold text-gray-500">
              &pound;{GOAL.toLocaleString()} goal
            </p>
          </div>
          {/* Progress bar */}
          <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.max(percent, 2)}%`,
                background: `linear-gradient(90deg, ${coral}, ${coralDark})`,
              }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2 text-center">
            {percent}% of our goal &mdash; every contribution counts
          </p>
        </div>
      </section>

      {/* ════════════ THE MISSION ════════════ */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
        <h2
          className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-6"
          style={{ color: blue }}
        >
          &pound;50,000 to Transform Two Libraries
        </h2>
        <div className="w-20 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: coral }} />
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          We&rsquo;re raising &pound;50,000 to transform our KS1 and KS2
          libraries into spaces worthy of that mission. Spaces children want to
          be in. Shelves stocked with books they&rsquo;ll remember for life.
          Reading nooks that turn a quiet moment into an adventure.
        </p>
        <p
          className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mt-8"
          style={{ color: coral }}
        >
          Every contribution &mdash; big or small &mdash; helps write the next chapter.
        </p>
      </section>

      {/* ════════════ PHOTO GALLERY ════════════ */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ color: blue }}
          >
            Imagine the Possibilities
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Our libraries are well-loved &mdash; now it&rsquo;s time for a
            transformation.
          </p>

          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 text-center">
              Where We Are Now
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <PhotoCard
                src="/library/ks1-current.jpg"
                alt="Current KS1 library"
                caption="KS1 Library"
              />
              <PhotoCard
                src="/library/ks2-current.jpg"
                alt="Current KS2 library"
                caption="KS2 Library"
              />
            </div>
          </div>

          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-4 text-center"
              style={{ color: coral }}
            >
              Where We&rsquo;re Headed
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <PhotoCard
                src="/library/sample-library-1.jpg"
                alt="Inspiration: cosy reading nooks and colourful shelving"
                caption="Cosy nooks and vibrant, well-organised shelving"
                accent
              />
              <PhotoCard
                src="/library/sample-library-2.jpg"
                alt="Inspiration: imaginative play structures and reading spaces"
                caption="Imaginative spaces that inspire a love of reading"
                accent
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ WHAT HAPPENS NEXT ════════════ */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h2
          className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-center mb-8"
          style={{ color: blue }}
        >
          What Happens Next?
        </h2>
        <div className="bg-gray-50 rounded-2xl p-8 md:p-10 shadow-sm">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The school and PTA are currently working with library suppliers on
            the final designs, which will be shared and displayed later this
            term. We aim to create welcoming, engaging environments where
            children are eager to pick up a book.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-semibold">
            With your generous support, we will be able to install the libraries
            over the summer holiday.
          </p>
        </div>
      </section>

      {/* ════════════ HOW CAN I HELP ════════════ */}
      <section className="px-6 py-16 md:py-20" style={{ backgroundColor: blueLight }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ color: blue }}
          >
            How Can I Help?
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            There are lots of ways to support the campaign.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Donate */}
            <HelpCard
              icon={
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={coral} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              }
              title="Donate"
              blue={blue}
            >
              <p className="text-gray-600 leading-relaxed mb-4">
                Please donate what you can. If your donation is eligible for
                Gift Aid, we receive a 25% top-up at no cost to you. If your
                employer offers charitable donation matching, it could mean
                doubling your impact.
              </p>
              <a
                href={DONATE_URL}
                className="inline-block text-white font-semibold px-6 py-2.5 rounded-lg transition hover:opacity-90"
                style={{ backgroundColor: coral }}
              >
                Make a Donation &rarr;
              </a>
            </HelpCard>

            {/* Bike Ride */}
            <HelpCard
              icon={
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={coral} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Sponsor a Rider"
              blue={blue}
            >
              <p className="text-gray-600 leading-relaxed mb-4">
                Sponsor a rider in the ESPS charity bike ride. All proceeds
                this year go to the library transformation. One parent&rsquo;s
                employer is generously double-matching the first &pound;5,000
                he raises.
              </p>
              <a
                href={BIKE_RIDE_URL}
                className="inline-block text-white font-semibold px-6 py-2.5 rounded-lg transition hover:opacity-90"
                style={{ backgroundColor: coral }}
              >
                Sponsor Now &rarr;
              </a>
            </HelpCard>

            {/* Suggest a Book */}
            <HelpCard
              icon={
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={coral} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              }
              title="Suggest a Book"
              blue={blue}
            >
              <p className="text-gray-600 leading-relaxed">
                Suggest a book that you love! We are working with the school on
                a book wishlist so our new shelves are filled with stories
                children will treasure. More details coming soon.
              </p>
            </HelpCard>
          </div>
        </div>
      </section>

      {/* ════════════ CLOSING CTA ════════════ */}
      <section
        className="text-white px-6 py-16 md:py-20 text-center"
        style={{
          background: `linear-gradient(135deg, ${blueDark} 0%, ${blue} 100%)`,
        }}
      >
        <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-4">
          Help Us Write the Next Chapter
        </h2>
        <p className="text-sky-100 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Together we can give every child at East Sheen Primary a library
          they&rsquo;ll love &mdash; and remember.
        </p>
        <a
          href={DONATE_URL}
          className="inline-block text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
          style={{ backgroundColor: coral }}
        >
          Donate Now
        </a>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-500">
          Questions?{" "}
          <a
            href="mailto:pta@espspta.org"
            className="font-semibold underline underline-offset-2 transition hover:opacity-80"
            style={{ color: blue }}
          >
            Get in touch with the PTA
          </a>
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

function PhotoCard({
  src,
  alt,
  caption,
  accent,
}: {
  src: string;
  alt: string;
  caption: string;
  accent?: boolean;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl shadow-md ${
        accent ? "ring-2 ring-[#e0713e]/20" : ""
      }`}
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-64 object-cover"
      />
      <figcaption className="text-center text-sm text-gray-500 py-3 px-2">
        {caption}
      </figcaption>
    </figure>
  );
}

function HelpCard({
  icon,
  title,
  children,
  blue,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  blue: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3" style={{ color: blue }}>
        {title}
      </h3>
      {children}
    </div>
  );
}
