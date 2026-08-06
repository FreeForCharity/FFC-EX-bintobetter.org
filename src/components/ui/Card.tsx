import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  tone = "light",
  interactive = false,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  interactive?: boolean;
  /** On dark cards, swap the hover shadow for a soft court glow. */
  glow?: boolean;
}) {
  const palette =
    tone === "dark"
      ? "border border-paper/15 bg-field text-paper rounded-md p-6"
      : "border border-ink/10 bg-paper text-ink rounded-md p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]";

  const darkHover = glow
    ? "hover:-translate-y-[3px] hover:border-court/50 hover:shadow-[var(--shadow-glow)]"
    : "hover:-translate-y-[3px] hover:border-court/50 hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.45)]";

  const motion = interactive
    ? tone === "dark"
      ? `transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-hover)] will-change-transform ${darkHover}`
      : "transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-hover)] will-change-transform hover:-translate-y-[3px] hover:border-ink/25 hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.18)]"
    : "";

  return <div className={`${palette} ${motion} ${className}`}>{children}</div>;
}
