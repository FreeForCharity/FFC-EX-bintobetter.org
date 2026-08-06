"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface RevealWordsProps {
  text: string;
  /** Per-word stagger in ms */
  stagger?: number;
  /** Delay before the first word starts */
  initialDelay?: number;
  className?: string;
  /** Highlighted trailing phrase rendered in court color */
  highlight?: string;
}

/**
 * Splits text into per-word spans and reveals each with a staggered transition.
 * Honors prefers-reduced-motion by rendering plainly.
 */
export function RevealWords({
  text,
  stagger = 60,
  initialDelay = 0,
  className = "",
  highlight,
}: RevealWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    if (el.getBoundingClientRect().top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    const failsafe = setTimeout(() => setVisible(true), 2000);
    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [reduced]);

  // Reduced motion keeps the same per-word markup — only the transition is
  // skipped — so the tree still hydrates cleanly. See lib/usePrefersReducedMotion.
  const shown = reduced || visible;

  const buildTokens = (input: string, isHighlight: boolean, offset: number) => {
    const parts = input.split(/(\s+)/);
    let count = offset;
    const tokens = parts.map((token) => {
      const isWord = token.trim().length > 0;
      const entry = { token, isWord, isHighlight, index: isWord ? count : -1 };
      if (isWord) count += 1;
      return entry;
    });
    return { tokens, nextOffset: count };
  };

  const baseTokens = buildTokens(text, false, 0);
  const highlightTokens = highlight ? buildTokens(highlight, true, baseTokens.nextOffset).tokens : [];

  const renderToken = (
    t: { token: string; isWord: boolean; isHighlight: boolean; index: number },
    key: string
  ) => {
    if (!t.isWord) return <span key={key}>{t.token}</span>;
    const delay = initialDelay + t.index * stagger;
    return (
      <span
        key={key}
        className="inline-block"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(0.5em)",
          transition: `opacity 600ms var(--ease-out-soft) ${delay}ms, transform 600ms var(--ease-out-soft) ${delay}ms`,
          color: t.isHighlight ? "var(--court)" : undefined,
        }}
      >
        {t.token}
      </span>
    );
  };

  return (
    <span ref={ref} className={className} aria-label={highlight ? `${text} ${highlight}` : text}>
      <span aria-hidden="true">
        {baseTokens.tokens.map((t, i) => renderToken(t, `w-${i}`))}
        {highlight ? <span> </span> : null}
        {highlightTokens.map((t, i) => renderToken(t, `h-${i}`))}
      </span>
    </span>
  );
}
