"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  /** Damping factor applied to cursor delta */
  strength?: number;
  /** Activation radius around the element's center */
  radius?: number;
  className?: string;
}

/**
 * Pulls its child toward the cursor when it is within `radius` of the
 * element's center. No-op on touch / reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.25,
  radius = 120,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !hover) return;

    const el = ref.current;
    if (!el) return;
    const target = el.firstElementChild as HTMLElement | null;
    if (!target) return;

    let raf = 0;
    const apply = (x: number, y: number) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        apply(0, 0);
        return;
      }
      apply(dx * strength, dy * strength);
    };

    const onLeave = () => apply(0, 0);

    target.style.transition = "transform 350ms var(--ease-out-soft)";

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      target.style.transform = "";
    };
  }, [radius, strength]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
