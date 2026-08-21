import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import type { LegalSection } from "@/content/legal";

/**
 * Shared shell for /privacy-policy and /terms-of-service. Both are long-form
 * prose with the same typography and the same "last reviewed" line, so the
 * pages themselves stay as thin as every other page in app/.
 */
export function LegalPage({
  title,
  intro,
  sections,
  reviewed,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  reviewed: string;
}) {
  return (
    <>
      <Nav />

      <main id="main-content">
      <Section className="bg-canvas">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight text-paper">
            {title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-paper/70 sm:text-lg">
            {intro}
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-paper/45">
            Last reviewed {reviewed}
          </p>

          <div className="mt-14 space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-bold text-paper">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-paper/70">
                  {section.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
      </main>

      <Footer />
    </>
  );
}
