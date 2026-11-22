import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/structured-data";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StatReveal } from "@/components/motion/StatReveal";
import { donate } from "@/content/donate";
import { pageMetadata } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  route: "/donate",
  title: "Donate: Every $1 Puts 10 Tennis Balls in a Classroom",
  description:
    "All Bin to Better events are free. Donate to the Bounce Back fundraiser: $50 puts 500 repurposed tennis balls on classroom chair legs at schools in need.",
  image: "/og/donate.jpg",
  imageAlt:
    "A volunteer carrying a full bag of collected litter down a park path",
});

// Inline SVG icons — decorative, aria-hidden
function TennisIcon({ className = "" }: { className?: string }) {
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
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M6.34 6.34C8.25 8.25 9 10.06 9 12s-.75 3.75-2.66 5.66" />
      <path d="M17.66 6.34C15.75 8.25 15 10.06 15 12s.75 3.75 2.66 5.66" />
    </svg>
  );
}

const fmt = (n: number) => n.toLocaleString("en-US");

// A classroom chair has four legs, so a tier's balls cover balls / 4 chairs.
const chairsFor = (balls: number) => Math.floor(balls / 4);

export default function Donate() {
  return (
    <>
      <Nav />

      <main id="main-content">
        <JsonLd data={breadcrumbSchema("Donate", "/donate")} />

        {/* ── Hero: why we ask ──────────────────────────────── */}
        <Section className="bg-canvas">
          <Reveal>
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
                <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
                  {donate.heroEyebrow}
                </p>
              </div>
              <h1 className="text-balance font-display text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[1.05] tracking-tight text-paper">
                {donate.heroHeading}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
                {donate.heroPara}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={donate.donateHref} withArrow>
                  {donate.donateLinkText}
                </Button>
                <Button href="#impact" variant="onDark">
                  See what your gift does
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-paper/15 bg-paper/15 sm:grid-cols-3">
            {donate.heroStats.map((s, i) => (
              <Reveal key={s.label} delay={120 + i * 80} className="h-full">
                <div className="flex h-full flex-col bg-canvas p-6">
                  <p className="font-display text-4xl font-bold tracking-tight text-court sm:text-5xl">
                    <StatReveal value={s.value} />
                  </p>
                  <p className="mt-2 text-sm leading-snug text-paper/60">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Impact tiers: what a dollar buys ──────────────── */}
        <Section id="impact" className="scroll-mt-16 bg-paper">
          <Reveal>
            <SectionHeading
              eyebrow={donate.impactEyebrow}
              title={donate.impactHeading}
              subtitle={donate.impactIntro}
              align="left"
            />
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {donate.tiers.map((t, i) => (
              <li key={t.amount} className="h-full">
                <Reveal delay={i * 70} className="h-full">
                  <a
                    href={donate.donateHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Donate $${t.amount}: ${fmt(t.balls)} tennis balls donated to schools in need (opens in a new tab)`}
                    className={`group relative flex h-full flex-col rounded-md border p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-hover)] hover:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas ${
                      t.featured
                        ? "border-canvas bg-canvas text-paper shadow-[var(--shadow-glow)]"
                        : "border-ink/10 bg-paper text-ink shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-ink/25 hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.18)]"
                    }`}
                  >
                    <p
                      className={`font-display text-4xl font-bold tracking-tight ${
                        t.featured ? "text-court" : "text-canvas"
                      }`}
                    >
                      ${fmt(t.amount)}
                    </p>

                    <div
                      className={`my-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] ${
                        t.featured ? "text-paper/50" : "text-ink/40"
                      }`}
                      aria-hidden="true"
                    >
                      <span className="h-px flex-1 bg-current" />
                      <span>=</span>
                      <span className="h-px flex-1 bg-current" />
                    </div>

                    <p className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-bold tracking-tight">
                        {fmt(t.balls)}
                      </span>
                      <TennisIcon
                        className={`size-5 shrink-0 self-center ${
                          t.featured ? "text-court" : "text-sage"
                        }`}
                      />
                    </p>
                    <p
                      className={`mt-1 text-sm leading-snug ${
                        t.featured ? "text-paper/80" : "text-ink/70"
                      }`}
                    >
                      tennis balls donated to schools in need
                    </p>

                    <p
                      className={`mt-auto pt-5 text-xs leading-snug ${
                        t.featured ? "text-paper/50" : "text-ink/50"
                      }`}
                    >
                      Enough for {fmt(chairsFor(t.balls))} classroom chairs
                    </p>

                    <span
                      className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${
                        t.featured ? "text-court" : "text-canvas"
                      }`}
                      aria-hidden="true"
                    >
                      Give ${fmt(t.amount)}
                      <span className="transition-transform duration-200 ease-[var(--ease-out-hover)] group-hover:translate-x-[3px]">
                        &rarr;
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink/60">
              {donate.impactNote}
            </p>
          </Reveal>
        </Section>

        {/* ── Closing CTA ───────────────────────────────────── */}
        <Section className="bg-canvas">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-balance font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight tracking-tight text-paper">
                {donate.donateHeading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-paper/70 sm:text-lg">
                {donate.donatePara}
              </p>
              <div className="mt-8">
                <Button href={donate.donateHref} withArrow>
                  {donate.donateLinkText}
                </Button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-paper/50">
                External donation platform. Opens in a new tab. Confirm the
                checkout page, receipt issuer, and any tax language before
                completing your contribution.
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ── Tennis lessons fundraiser ─────────────────────── */}
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
                  <Button href={donate.tennis.href}>Register Now</Button>
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
