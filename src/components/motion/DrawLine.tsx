"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface DrawLineProps {
  className?: string;
  /** Origin of the draw — left or center */
  origin?: "left" | "center";
  delay?: number;
}

/**
 * Thin line that animates its scaleX from 0 → 1 when scrolled into view.
 * Apply width / color / orientation via className.
 */
export function DrawLine({ className = "", origin = "left", delay = 0 }: DrawLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    if (el.getBoundingClientRect().top < window.innerHeight) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        transform: reduced || visible ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: origin === "center" ? "center center" : "left center",
        transition: "transform 700ms var(--ease-out-soft)",
      }}
    />
  );
}
