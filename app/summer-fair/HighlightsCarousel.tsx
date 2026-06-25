"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

const navy = "#1C3A5E";
const heading = "font-[family-name:var(--font-heading)]";

export type HighlightSlide = {
  emoji: string;
  eyebrow?: string;
  title: string;
  blurb: ReactNode;
  color: string; // accent / CTA colour (must read white text well)
  accent: string; // light awning stripe colour
  link?: string | null;
  linkLabel?: string;
  external?: boolean; // open link in a new tab
  poster?: string;
  posterAlt?: string;
  posterW?: number;
  posterH?: number;
  posterWide?: boolean; // landscape image — render wider than the portrait flyers
  posterDecorative?: boolean; // illustration, not a flyer — shown unoptimised and not clickable
};

export function HighlightsCarousel({ slides }: { slides: HighlightSlide[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Auto-advance, paused while the visitor is interacting.
  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="overflow-hidden rounded-3xl"
        style={{ boxShadow: "0 10px 26px rgba(0,0,0,0.10)" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="w-full shrink-0 bg-white" aria-hidden={i !== index}>
              <SlideCard slide={s} active={i === index} />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous highlight"
            className="grid place-items-center w-9 h-9 rounded-full bg-white hover:bg-stone-50 transition shrink-0"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)", color: navy }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                type="button"
                key={i}
                onClick={() => go(i)}
                aria-label={`Show ${s.title}`}
                aria-current={i === index}
                className="h-2.5 rounded-full transition-all"
                style={{ width: i === index ? 26 : 10, background: i === index ? s.color : "#00000026" }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next highlight"
            className="grid place-items-center w-9 h-9 rounded-full bg-white hover:bg-stone-50 transition shrink-0"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)", color: navy }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

function SlideCard({ slide: s, active }: { slide: HighlightSlide; active: boolean }) {
  const tab = active ? 0 : -1;
  const hasPoster = Boolean(s.poster);
  return (
    <div className="h-full px-6 sm:px-8 pt-9 sm:pt-11 pb-6 sm:pb-8">
      <div className={`h-full grid gap-6 sm:gap-8 items-start ${hasPoster ? "sm:grid-cols-[minmax(0,1fr)_auto]" : ""}`}>
        <div className="text-center sm:text-left">
          <h3 className={`${heading} font-black text-[26px] sm:text-[32px] leading-tight`} style={{ color: navy }}>
            <span className="mr-2">{s.emoji}</span>{s.title}
          </h3>
          {s.eyebrow && (
            <div className="mt-3">
              <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: `${s.color}26`, color: navy }}>
                {s.eyebrow}
              </span>
            </div>
          )}
          <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-stone-600">{s.blurb}</p>
          {s.link && s.linkLabel && (
            <a
              href={s.link}
              tabIndex={tab}
              {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white text-[15px] active:scale-[0.99] transition"
              style={{ background: s.color }}
            >
              {s.linkLabel} →
            </a>
          )}
        </div>
        {hasPoster && (
          (() => {
            const img = (
              <Image
                src={s.poster!}
                alt={s.posterAlt ?? ""}
                width={s.posterW ?? 882}
                height={s.posterH ?? 1246}
                unoptimized={s.posterDecorative}
                className={`rounded-xl h-auto ${s.posterWide ? "w-[240px] sm:w-[300px]" : "w-[150px] sm:w-[180px]"}`}
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
              />
            );
            // Flyers/photos link to the full-size file; illustrations are decorative only.
            return s.posterDecorative ? (
              <div className="shrink-0 mx-auto">{img}</div>
            ) : (
              <a
                href={s.poster!}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={tab}
                className="block shrink-0 mx-auto transition-transform hover:scale-[1.02]"
              >
                {img}
              </a>
            );
          })()
        )}
      </div>
    </div>
  );
}
