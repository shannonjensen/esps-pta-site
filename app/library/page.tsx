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
const green = "#3a8f5c";
const greenLight = "#e6f4ec";
const greenDark = "#2d6e47";
const bark = "#8B6914";

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
        {/* Decorative leaves */}
        <div className="absolute top-6 right-8 opacity-10">
          <LeafCluster className="w-48 h-48" />
        </div>
        <div className="absolute bottom-8 left-6 opacity-[0.07] rotate-180">
          <LeafCluster className="w-32 h-32" />
        </div>

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

      {/* ════════════ GROWING TREE PROGRESS ════════════ */}
      <section className="max-w-3xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Tree */}
            <div className="shrink-0">
              <GrowingTree percent={percent} />
            </div>
            {/* Stats */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-2xl md:text-3xl font-bold" style={{ color: green }}>
                &pound;{RAISED.toLocaleString()}
                <span className="text-base font-normal text-gray-400">
                  {" "}raised
                </span>
              </p>
              <p className="text-lg font-semibold text-gray-500 mb-3">
                &pound;{GOAL.toLocaleString()} goal
              </p>
              {/* Ground-level progress bar */}
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${Math.max(percent, 2)}%`,
                    background: `linear-gradient(90deg, ${green}, ${greenDark})`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {percent}% &mdash; help our library grow
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ THE MISSION ════════════ */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
        <div className="flex justify-center mb-4 opacity-20">
          <SmallLeaf className="w-8 h-8" color={green} />
        </div>
        <h2
          className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-6"
          style={{ color: blue }}
        >
          &pound;50,000 to Transform Two Libraries
        </h2>
        <div className="w-20 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: green }} />
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
      <section className="px-6 py-16" style={{ backgroundColor: greenLight }}>
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

          <div className="flex justify-center my-8">
            <svg className="w-8 h-8 text-green-600/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-widest mb-4 text-center"
              style={{ color: green }}
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
        <div className="bg-gray-50 rounded-2xl p-8 md:p-10 shadow-sm border-l-4" style={{ borderColor: green }}>
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
              icon={<SmallLeaf className="w-10 h-10" color={green} />}
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
              icon={<SmallLeaf className="w-10 h-10" color={green} rotate />}
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
              icon={<SmallLeaf className="w-10 h-10" color={green} rotate />}
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
        className="relative text-white px-6 py-16 md:py-20 text-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${greenDark} 0%, ${green} 100%)`,
        }}
      >
        <div className="absolute top-4 left-8 opacity-10">
          <LeafCluster className="w-40 h-40" />
        </div>
        <div className="absolute bottom-4 right-8 opacity-10 rotate-90">
          <LeafCluster className="w-36 h-36" />
        </div>
        <div className="relative">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-4">
            Help Us Write the Next Chapter
          </h2>
          <p className="text-green-100 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
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
        </div>
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

/**
 * A tree that grows from a seedling (0%) to a full tree (100%).
 * The canopy scales and leaves appear based on percent.
 */
function GrowingTree({ percent }: { percent: number }) {
  // Tree grows in stages
  const stage =
    percent === 0 ? 0 : percent < 20 ? 1 : percent < 50 ? 2 : percent < 80 ? 3 : 4;

  return (
    <div className="relative w-32 h-40 flex items-end justify-center">
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-3 bg-amber-800/20 rounded-full" />

      {stage === 0 && (
        /* Seed / tiny sprout */
        <svg viewBox="0 0 100 120" className="w-20 h-28">
          {/* Pot / soil mound */}
          <ellipse cx="50" cy="108" rx="25" ry="6" fill="#8B6914" opacity={0.3} />
          {/* Seed */}
          <ellipse cx="50" cy="100" rx="6" ry="4" fill={bark} />
          {/* Tiny sprout */}
          <line x1="50" y1="100" x2="50" y2="88" stroke={green} strokeWidth="2" />
          <path d="M50 88 Q45 82 50 78 Q55 82 50 88Z" fill={green} opacity={0.6} />
        </svg>
      )}

      {stage === 1 && (
        /* Small seedling */
        <svg viewBox="0 0 100 120" className="w-24 h-32">
          <ellipse cx="50" cy="112" rx="28" ry="6" fill="#8B6914" opacity={0.3} />
          <line x1="50" y1="110" x2="50" y2="60" stroke={bark} strokeWidth="3" />
          {/* Small leaves */}
          <path d="M50 75 Q38 65 50 55 Q62 65 50 75Z" fill={green} opacity={0.7} />
          <path d="M50 85 Q40 78 45 68" stroke={green} strokeWidth="1.5" fill="none" />
          <path d="M45 70 Q38 62 46 58 Q50 65 45 70Z" fill={green} opacity={0.5} />
          <path d="M50 82 Q60 75 55 65" stroke={green} strokeWidth="1.5" fill="none" />
          <path d="M55 67 Q62 59 54 56 Q50 63 55 67Z" fill={green} opacity={0.5} />
        </svg>
      )}

      {stage === 2 && (
        /* Medium sapling */
        <svg viewBox="0 0 100 120" className="w-28 h-36">
          <ellipse cx="50" cy="114" rx="30" ry="6" fill="#8B6914" opacity={0.3} />
          {/* Trunk */}
          <path d="M50 112 Q49 80 50 45" stroke={bark} strokeWidth="4" fill="none" />
          <path d="M50 70 Q38 60 32 50" stroke={bark} strokeWidth="2.5" fill="none" />
          <path d="M50 60 Q62 50 68 42" stroke={bark} strokeWidth="2.5" fill="none" />
          {/* Canopy clusters */}
          <circle cx="50" cy="38" r="16" fill={green} opacity={0.7} />
          <circle cx="35" cy="48" r="12" fill={green} opacity={0.6} />
          <circle cx="65" cy="45" r="13" fill={green} opacity={0.6} />
          <circle cx="45" cy="30" r="10" fill={greenDark} opacity={0.4} />
        </svg>
      )}

      {stage === 3 && (
        /* Large tree */
        <svg viewBox="0 0 100 120" className="w-32 h-40">
          <ellipse cx="50" cy="114" rx="32" ry="6" fill="#8B6914" opacity={0.3} />
          {/* Trunk */}
          <path d="M47 112 Q46 75 48 40" stroke={bark} strokeWidth="5" fill="none" />
          <path d="M53 112 Q54 75 52 40" stroke={bark} strokeWidth="5" fill="none" />
          <path d="M48 65 Q35 52 25 42" stroke={bark} strokeWidth="3" fill="none" />
          <path d="M52 55 Q65 42 75 35" stroke={bark} strokeWidth="3" fill="none" />
          <path d="M48 75 Q38 68 30 62" stroke={bark} strokeWidth="2" fill="none" />
          {/* Full canopy */}
          <circle cx="50" cy="30" r="20" fill={green} opacity={0.75} />
          <circle cx="30" cy="42" r="16" fill={green} opacity={0.65} />
          <circle cx="70" cy="38" r="17" fill={green} opacity={0.65} />
          <circle cx="25" cy="30" r="12" fill={green} opacity={0.55} />
          <circle cx="75" cy="28" r="13" fill={green} opacity={0.55} />
          <circle cx="50" cy="18" r="14" fill={greenDark} opacity={0.4} />
          <circle cx="38" cy="25" r="10" fill={greenDark} opacity={0.3} />
        </svg>
      )}

      {stage === 4 && (
        /* Full majestic tree */
        <svg viewBox="0 0 100 120" className="w-32 h-40">
          <ellipse cx="50" cy="114" rx="35" ry="6" fill="#8B6914" opacity={0.3} />
          {/* Thick trunk */}
          <path d="M45 112 Q43 70 46 35" stroke={bark} strokeWidth="6" fill="none" />
          <path d="M55 112 Q57 70 54 35" stroke={bark} strokeWidth="6" fill="none" />
          {/* Branches */}
          <path d="M46 60 Q30 45 18 35" stroke={bark} strokeWidth="3" fill="none" />
          <path d="M54 50 Q70 35 82 28" stroke={bark} strokeWidth="3" fill="none" />
          <path d="M46 72 Q35 65 22 58" stroke={bark} strokeWidth="2.5" fill="none" />
          <path d="M54 65 Q65 55 78 48" stroke={bark} strokeWidth="2.5" fill="none" />
          {/* Lush canopy */}
          <circle cx="50" cy="24" r="22" fill={green} opacity={0.8} />
          <circle cx="25" cy="35" r="18" fill={green} opacity={0.7} />
          <circle cx="75" cy="30" r="19" fill={green} opacity={0.7} />
          <circle cx="18" cy="48" r="14" fill={green} opacity={0.6} />
          <circle cx="82" cy="42" r="15" fill={green} opacity={0.6} />
          <circle cx="50" cy="12" r="16" fill={greenDark} opacity={0.45} />
          <circle cx="35" cy="20" r="12" fill={greenDark} opacity={0.35} />
          <circle cx="65" cy="18" r="13" fill={greenDark} opacity={0.35} />
          {/* Highlight leaves */}
          <circle cx="40" cy="15" r="5" fill="#4CAF50" opacity={0.3} />
          <circle cx="60" cy="22" r="4" fill="#4CAF50" opacity={0.3} />
        </svg>
      )}
    </div>
  );
}

function LeafCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className}>
      <path d="M60 80 Q40 60 60 30 Q80 60 60 80Z" fill="white" />
      <path d="M40 90 Q25 70 45 50 Q55 75 40 90Z" fill="white" opacity={0.7} />
      <path d="M80 85 Q95 65 75 45 Q65 70 80 85Z" fill="white" opacity={0.7} />
      <path d="M55 95 Q50 85 60 75 Q70 85 65 95Z" fill="white" opacity={0.5} />
    </svg>
  );
}

function SmallLeaf({
  className,
  color,
  rotate,
}: {
  className?: string;
  color: string;
  rotate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`${className} ${rotate ? "rotate-45" : ""}`}
    >
      <path
        d="M12 22 Q4 14 12 2 Q20 14 12 22Z"
        fill={color}
        opacity={0.6}
      />
      <line x1="12" y1="22" x2="12" y2="8" stroke={color} strokeWidth="1" opacity={0.4} />
    </svg>
  );
}

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
        accent ? "ring-2 ring-[#3a8f5c]/20" : ""
      }`}
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-64 object-cover"
      />
      <figcaption className="text-center text-sm text-gray-500 py-3 px-2 bg-white">
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
