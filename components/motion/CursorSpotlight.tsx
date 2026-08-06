"use client";

import { useEffect, useRef } from "react";

interface CursorSpotlightProps {
  /** Radius of the spotlight glow */
  radius?: number;
  /** Glow color (CSS color). Defaults to brand court. */
  color?: string;
  className?: string;
}

/**
 * Pointer-following radial glow overlay. Mount inside a `relative` parent.
 * Disabled on touch-only devices and when prefers-reduced-motion is set.
 */
export function CursorSpotlight({
  radius = 320,
  color = "var(--court)",
  className = "",
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !hover) return;

    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    let raf = 0;
    let active = false;

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        if (!active) {
          el.style.opacity = "1";
          active = true;
        }
      });
    };

    const onLeave = () => {
      el.style.opacity = "0";
      active = false;
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        opacity: 0,
        transition: "opacity 350ms var(--ease-out-soft)",
        background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, ${color} 16%, transparent), transparent 70%)`,
      }}
    />
  );
}
