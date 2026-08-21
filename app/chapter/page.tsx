import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/structured-data";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { FormGate } from "@/components/ui/FormGate";
import { pageMetadata } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  route: "/chapter",
  title: "Start a Chapter",
  description:
    "Bring Bin to Better to your school or community. Apply to become a Chapter Director and lead local collection drives, workshops, and outreach.",
});

export default function Chapter() {
  return (
    <>
      <Nav />

      <main id="main-content">
      <JsonLd data={breadcrumbSchema("Start a Chapter", "/chapter")} />

      <Section className="bg-canvas">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
              Start a Chapter
            </p>
          </div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-paper text-balance">
            Chapter Applications
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-paper/70 leading-relaxed">
            Want to bring Bin to Better to your own community? Become a Chapter
            Director and lead local collection drives, workshops, and outreach.
            We&apos;ll help you get started with onboarding, templates, impact
            tracking, partner outreach materials, and regular check-ins.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Eligibility",
                body: "Students should have guardian or school-advisor support when required locally.",
              },
              {
                title: "Commitment",
                body: "Chapters coordinate projects, report impact, follow logo/name rules, and communicate monthly during active periods.",
              },
              {
                title: "Application",
                body: "The Google Form asks about location, team, program interests, advisor support, and expected launch timeline.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-paper/15 p-5">
                <h2 className="font-display text-xl font-bold text-paper">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-paper/65">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper/55">
            Applications are currently open. Reviews are handled by the Bin to
            Better leadership team. If you cannot use Google Forms, email us at{" "}
            <a
              href="mailto:outreach@bintobetter.org"
              className="text-paper underline underline-offset-4 hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
            >
              outreach@bintobetter.org
            </a>
            .
          </p>
          <div className="mt-8">
            <FormGate
              href="https://forms.gle/uYgLC6x7NCxwbada9"
              what="the chapter application"
              className="inline-flex items-center rounded-[3px] bg-court px-5 py-2.5 text-sm font-medium text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-[transform,box-shadow,filter] duration-200 ease-[var(--ease-out-hover)] hover:-translate-y-[1px] hover:brightness-95 hover:shadow-[0_6px_14px_-4px_rgba(0,0,0,0.18)] active:translate-y-[1px] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              Apply to lead a chapter
            </FormGate>
          </div>
        </Reveal>
      </Section>

      </main>


      <Footer />
    </>
  );
}
