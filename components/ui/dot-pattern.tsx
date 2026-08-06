"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * DotPattern — Magic UI (https://magicui.design), recolored to the brand
 * `court` green and defaulting to a low-opacity, edge-masked background layer.
 * Mount inside a `relative` parent. Decorative only.
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
  [key: string]: unknown;
}

export function DotPattern({
  width = 18,
  height = 18,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: DotPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const animate = glow && !reduced;

  // Deterministic per-dot jitter. Math.random() ran during render, so every
  // re-render handed each circle new timings and restarted its animation.
  const jitter = (n: number) => {
    const v = Math.sin(n * 12.9898) * 43758.5453;
    return v - Math.floor(v);
  };

  const dots = useMemo(() => {
    const cols = Math.ceil(dimensions.width / width);
    const rows = Math.ceil(dimensions.height / height);
    return Array.from({ length: cols * rows }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        x: col * width + cx + x,
        y: row * height + cy + y,
        delay: jitter(i + 1) * 5,
        duration: jitter(i + 101) * 3 + 2,
      };
    });
  }, [dimensions.width, dimensions.height, width, height, cx, cy, x, y]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-court/35",
        className
      )}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot) =>
        animate ? (
          // Animated (glow) path: motion is only paid for when needed.
          <motion.circle
            key={`${dot.x}-${dot.y}`}
            cx={dot.x}
            cy={dot.y}
            r={cr}
            fill={`url(#${id}-gradient)`}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: dot.delay,
              ease: "easeInOut",
            }}
          />
        ) : (
          // Static path: plain SVG circles — cheap to paint, no JS animation.
          <circle
            key={`${dot.x}-${dot.y}`}
            cx={dot.x}
            cy={dot.y}
            r={cr}
            fill={glow ? `url(#${id}-gradient)` : "currentColor"}
          />
        )
      )}
    </svg>
  );
}
