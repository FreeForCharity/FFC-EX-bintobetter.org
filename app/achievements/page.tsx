import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/structured-data";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  route: "/achievements",
  title: "Awards and Media Recognition",
  description:
    "Explore Bin to Better's CRRA recycling award, selection for the 2026 UNA-USA East Bay Global Citizen Award, and NBC Bay Area coverage of Bounce Back.",
  image: "/og/achievements.jpg",
  imageAlt:
    "A tennis ball being cut to fit a classroom chair leg",
});

export default function Achievements() {
  return (
    <>
      <Nav />

      <main id="main-content">
      <JsonLd data={breadcrumbSchema("Awards", "/achievements")} />

      <Section className="bg-canvas">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
              Recognition
            </p>
          </div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-paper text-balance">
            Awards and Recognition
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
            Awards and media coverage of student-led recycling, reuse, and
            community education across Bin to Better programs.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-paper">
        <Reveal>
          <Card tone="light" className="mb-8 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
              Selected for 2026 · Ceremony October 18
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-tight text-ink">
              UNA-USA East Bay Global Citizen Award
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              The United Nations Association of the USA East Bay Chapter has
              selected Bin to Better for its 2026 Global Citizen Award,
              recognizing its work to inspire young people to support climate
              action and the Sustainable Development Goals.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              The awards celebration is scheduled for October 18, 2026, at
              International House at UC Berkeley. This year&apos;s theme is
              &ldquo;Youth Transforming the World: Vision, Unity, and Leadership.&rdquo;
            </p>
            <a
              href="https://www.unausaeastbay.org/events/un-day-global-citizen-awards-1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
            >
              View the UNA-USA East Bay celebration details
            </a>
          </Card>
        </Reveal>
        <Reveal>
          <Card tone="light" className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
              2026
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-tight text-ink">
              CRRA Outstanding School Recycling Program Award
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
                href="/get-involved"
                className="inline-flex rounded-[3px] bg-court px-5 py-2.5 text-sm font-medium text-ink hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
              >
                Get Involved
              </Link>
            </div>
          </Card>
        </Reveal>
        <Reveal>
          <Card tone="light" className="mt-8 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
              Media coverage · NBC Bay Area
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-tight text-ink">
              A second life for used tennis balls
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              NBC Bay Area reporter Cinthia Pimentel featured Bin to Better&apos;s
              Bounce Back program, showing how students prepare donated tennis
              balls for reuse in classrooms, assisted living centers, and pet care.
            </p>
            <a
              href="https://www.nbcbayarea.com/news/local/bay-area-students-recycle-tennis-balls-bin-to-better/4145767/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
            >
              Read the NBC Bay Area report
            </a>
          </Card>
        </Reveal>
      </Section>

      </main>


      <Footer />
    </>
  );
}
