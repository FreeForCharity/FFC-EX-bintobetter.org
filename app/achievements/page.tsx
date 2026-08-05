import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Awards | Bin to Better",
  description:
    "Awards and recognition for Bin to Better's student-led recycling, reuse, and community education programs.",
};

export default function Achievements() {
  return (
    <>
      <Nav />

      <Section className="bg-canvas">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
              Recognition
            </p>
          </div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-paper text-balance">
            Awards
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
            Recognition for student-led recycling, reuse, and community
            education work across Bin to Better programs.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-paper">
        <Reveal>
          <Card tone="light" className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
              2026
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-tight text-ink">
              Outstanding School Recycling Program Award
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Presented by the California Resource Recovery Association (CRRA).
              This recognition celebrates Bin to Better&apos;s work to give
              discarded materials a second life through student-led recycling,
              reuse, and community education.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Through programs such as Bounce Back, Tech to Treasure, and
              Eco-Filament, students are helping build a circular future where
              waste becomes a resource for schools and communities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/events"
                className="inline-flex rounded-[3px] border border-ink/25 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                View Impact Timeline
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex rounded-[3px] bg-court px-5 py-2.5 text-sm font-medium text-ink hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
              >
                Get Involved
              </Link>
            </div>
          </Card>
        </Reveal>
      </Section>

      <Footer />
    </>
  );
}
