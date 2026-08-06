import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Ripple — Magic UI (https://magicui.design), recolored to the brand `court`
 * green. Concentric expanding rings used behind a focal element. Decorative.
 * The `animate-ripple` keyframe is defined in app/globals.css.
 */
interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 240,
  mainCircleOpacity = 0.22,
  numCircles = 8,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        className
      )}
      style={{
        maskImage: "linear-gradient(to bottom, white, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, white, transparent)",
      }}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 80;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;

        return (
          <div
            key={i}
            className="animate-ripple absolute rounded-full border border-court/40"
            style={
              {
                "--i": i,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
