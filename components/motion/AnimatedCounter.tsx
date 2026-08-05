"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shineTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  // `shining` is transient: it flips on when the count-up finishes to flash the
  // one-shot shine sweep, then clears itself after the sweep so the text returns
  // to its solid `text-court` color. Keeping it on permanently would leave the
  // span with `-webkit-text-fill-color: transparent` and hide the digits.
  const [shining, setShining] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();
          setShining(true);
          shineTimeout.current = setTimeout(() => setShining(false), 850);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (shineTimeout.current) clearTimeout(shineTimeout.current);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className={`${className} ${shining ? "shine" : ""}`}>
      {value}
    </span>
  );
}
