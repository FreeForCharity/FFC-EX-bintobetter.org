"use client";

import { Children, isValidElement, cloneElement } from "react";
import type { ReactElement, ReactNode } from "react";
import { Reveal } from "./Reveal";

interface RevealGroupProps {
  children: ReactNode;
  /** Per-child stagger in ms */
  stagger?: number;
  /** Initial delay before the first child reveals */
  initialDelay?: number;
  className?: string;
}

/**
 * Wraps each child in a Reveal with an auto-incremented delay.
 * If a child is already a Reveal, its delay is offset rather than re-wrapped.
 */
export function RevealGroup({
  children,
  stagger = 80,
  initialDelay = 0,
  className = "",
}: RevealGroupProps) {
  const wrapped = Children.map(children, (child, i) => {
    const delay = initialDelay + i * stagger;
    if (isValidElement(child) && child.type === Reveal) {
      const existing = (child.props as { delay?: number }).delay ?? 0;
      return cloneElement(child as ReactElement<{ delay?: number }>, {
        delay: existing + delay,
      });
    }
    return (
      <Reveal key={i} delay={delay}>
        {child}
      </Reveal>
    );
  });

  if (!className) return <>{wrapped}</>;
  return <div className={className}>{wrapped}</div>;
}
