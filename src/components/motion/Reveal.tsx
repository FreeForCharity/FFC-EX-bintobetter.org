"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => {
      timer = setTimeout(() => setVisible(true), delay);
    };

    // Already in (or above) the viewport on mount → reveal immediately so
    // above-the-fold content never waits for a scroll.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      reveal();
      return () => {
        if (timer) clearTimeout(timer);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    // Failsafe: never leave content permanently hidden if the observer
    // somehow never fires.
    const failsafe = setTimeout(() => setVisible(true), 2000);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      clearTimeout(failsafe);
    };
  }, [delay, reduced]);

  // The markup is identical either way — only the style values differ — so the
  // tree still hydrates cleanly for reduced-motion visitors, who simply start
  // out revealed.
  const shown = reduced || visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(1rem)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </div>
  );
}
