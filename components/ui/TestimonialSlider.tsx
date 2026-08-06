"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialSliderProps {
  items: TestimonialItem[];
}

export function TestimonialSlider({ items }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const reduced = usePrefersReducedMotion();
  // `hovered` is incidental (pointer/focus is over the carousel); `playing` is
  // the visitor's explicit choice via the pause control. WCAG 2.2.2 requires
  // the second: hover-to-pause is not a mechanism a keyboard or touch user can
  // rely on, and the rotation starts automatically and lasts more than 5s.
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + items.length) % items.length);
    },
    [items.length]
  );

  const prev = () => goTo(current - 1);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  const rotating = playing && !hovered && !reduced;

  useEffect(() => {
    if (!rotating) return;
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [rotating, next]);

  const item = items[current];
  if (!item) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Testimonials"
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      // React focus events bubble, so tabbing between the carousel's own
      // controls fires blur-then-focus and would momentarily clear `hovered` —
      // re-arming rotation and resetting the 6s interval mid-interaction.
      // Only treat focus that actually leaves the section as leaving.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
    >
      {/* ARIA APG carousel pattern: announce slide changes only while rotation
          is stopped. A live region that fires during auto-rotation talks over
          the visitor every 6 seconds. */}
      <div
        className="border border-ink/8 bg-paper px-8 py-10 rounded-md"
        aria-live={rotating ? "off" : "polite"}
        aria-atomic="true"
      >
        <blockquote>
          <p className="text-lg leading-relaxed text-ink/80 sm:text-xl">
            &ldquo;{item.quote}&rdquo;
          </p>
          <footer className="mt-6 border-t border-ink/10 pt-5">
            <p className="font-mono text-sm font-medium text-ink">{item.author}</p>
            <p className="mt-0.5 font-mono text-xs text-sage">{item.role}</p>
          </footer>
        </blockquote>
      </div>

      <div className="mt-6 flex items-center justify-start gap-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="rounded-[3px] border border-ink/20 p-2 text-ink transition-colors hover:border-court hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={`h-1.5 rounded-[2px] transition-[width,background-color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court hover:bg-ink/40 ${
                i === current ? "w-6 bg-court" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="rounded-[3px] border border-ink/20 p-2 text-ink transition-colors hover:border-court hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* WCAG 2.2.2 (Pause, Stop, Hide). Hidden when prefers-reduced-motion
            is set, because nothing is rotating for it to stop. */}
        {!reduced && (
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={
              playing ? "Pause testimonial rotation" : "Resume testimonial rotation"
            }
            aria-pressed={!playing}
            className="ml-auto rounded-[3px] border border-ink/20 p-2 text-ink transition-colors hover:border-court hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              {playing ? (
                <path
                  d="M6 3v10M10 3v10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M5 3l8 5-8 5V3z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
