import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center" | "right";
  tone?: "light" | "dark";
  /**
   * Heading level to render. Defaults to "h2" because most uses are section
   * headings, but the pages that use this component for their hero need an
   * "h1" — several of them had no h1 at all, which costs the page its single
   * strongest on-page relevance signal.
   */
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  const ruleColor = tone === "dark" ? "bg-court" : "bg-sage";
  const eyebrowColor = tone === "dark" ? "text-court" : "text-sage";
  const titleColor = tone === "dark" ? "text-paper" : "text-ink";
  const subtitleColor = tone === "dark" ? "text-paper/70" : "text-ink/60";

  return (
    <div className={`mb-10 ${alignClass}`}>
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className={`h-px w-6 shrink-0 ${ruleColor}`} aria-hidden="true" />
          <p
            className={`font-mono text-xs font-medium uppercase tracking-[0.12em] ${eyebrowColor}`}
          >
            {eyebrow}
          </p>
        </div>
      )}
      <Heading
        className={`text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight tracking-tight ${titleColor}`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className={`mt-3 text-base sm:text-lg ${subtitleColor}`}>{subtitle}</p>
      )}
    </div>
  );
}
