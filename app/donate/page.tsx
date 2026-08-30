import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/structured-data";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { donate } from "@/content/donate";
import { pageMetadata } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  route: "/donate",
  title: "Donate & Support Our Reuse Programs",
  description:
    "Support Bin to Better by donating or registering for community tennis lessons. Contributions pay for collection supplies, workshop materials, and recycling costs.",
  image: "/og/donate.jpg",
  imageAlt:
    "A volunteer carrying a full bag of collected litter down a park path",
});

// Inline SVG icons — decorative, aria-hidden
function TennisIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M6.34 6.34C8.25 8.25 9 10.06 9 12s-.75 3.75-2.66 5.66" />
      <path d="M17.66 6.34C15.75 8.25 15 10.06 15 12s.75 3.75 2.66 5.66" />
    </svg>
  );
}

// Button-styled anchor for external links (squared, v3 tokens)
function ExternalButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "onDark";
}) {
  const base =
    "inline-flex items-center justify-center rounded-[3px] px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
  const variantClass =
    variant === "primary"
      ? "bg-court text-ink hover:brightness-95 focus-visible:outline-court"
      : "border border-paper/30 text-paper hover:border-court hover:text-court focus-visible:outline-paper";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variantClass}`}
    >
      {children}
    </a>
  );
}

export default function Donate() {
  return (
    <>
      <Nav />

      <main id="main-content">
      <JsonLd data={breadcrumbSchema("Support Us", "/donate")} />

      <Section className="bg-canvas">
        <Reveal>
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
                Make a Difference
              </p>
            </div>
            <h1 className="text-balance font-display text-[clamp(2.75rem,7vw,5rem)] font-bold leading-tight tracking-tight text-paper">
              {donate.donateHeading}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-paper/70 sm:text-lg">
              {donate.donatePara}
            </p>
            <div className="mt-8">
              <ExternalButton href={donate.donateHref} variant="onDark">
                {donate.donateLinkText}
              </ExternalButton>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-paper/50">
              External donation platform. Opens in a new tab. Confirm the
              checkout page, receipt issuer, and any tax language before
              completing your contribution.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section id="tennis-lessons" className="bg-field">
        <SectionHeading
          eyebrow="Tennis Lessons Fundraiser"
          title="Community Tennis Lessons"
          subtitle={donate.classesIntro}
          tone="dark"
          align="left"
        />

        <div className="mt-4 grid gap-8 md:max-w-xl">
          <Reveal delay={0}>
            <Card tone="dark" className="flex flex-col">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-court">
                  <TennisIcon />
                </span>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
                  Tennis
                </p>
              </div>
              <h3 className="font-display text-2xl font-bold text-paper">
                {donate.tennis.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/70">
                {donate.tennis.description}
              </p>
              <p className="mt-3 text-xs italic text-paper/50">
                {donate.tennis.note}
              </p>
              <div className="mt-6">
                <ExternalButton href={donate.tennis.href}>Register Now</ExternalButton>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      </main>


      <Footer />
    </>
  );
}
