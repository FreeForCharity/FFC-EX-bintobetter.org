import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { FormGate } from "@/components/ui/FormGate";
import { site, MIN_UNSUPERVISED_AGE } from "@/content/site";

export const metadata: Metadata = {
  title: "Get Involved | Bin to Better",
  description:
    "Volunteer, join the mailing list, donate materials, partner with Bin to Better, or start a chapter.",
};

// `gated` marks destinations that collect personal information off-site. Those
// render through FormGate so an under-13 visitor is routed to a
// guardian-completed path instead — see components/ui/FormGate.tsx.
const actions = [
  {
    title: "Join the Mailing List",
    body: "Receive project updates, event announcements, and volunteer opportunities. Messages are occasional, and you can unsubscribe through the form provider.",
    href: "https://forms.gle/LAmkFyZFdhJC49z77",
    label: "Open Google Form",
    external: true,
    gated: "the mailing list form",
  },
  {
    title: "Volunteer or Attend",
    body: `Students under ${MIN_UNSUPERVISED_AGE} should ask a parent or guardian to contact us or complete forms. Discord is only for participants age ${MIN_UNSUPERVISED_AGE} and older.`,
    href: "https://tinyurl.com/b2bdisc",
    label: `Join Discord, ${MIN_UNSUPERVISED_AGE}+`,
    external: true,
    gated: "our Discord server",
  },
  {
    title: "Donate Materials",
    body: "Offer tennis balls, electronics, clean suitable plastics, supplies, or workshop materials. Include item type, quantity, location, and timing.",
    href: `mailto:${site.email}?subject=Material%20Donation%20Inquiry`,
    label: "Email Materials Inquiry",
    external: false,
  },
  {
    title: "Partner With Us",
    body: "Schools, clubs, shelters, companies, and community groups can host collections, request materials, support workshops, or sponsor supplies.",
    href: "/partners",
    label: "See Partner Options",
    external: false,
  },
  {
    title: "Start a Chapter",
    body: "Chapter applicants should be ready to coordinate local projects, report impact, follow brand guidelines, and secure guardian or school-advisor support when needed.",
    href: "/chapter",
    label: "View Chapter Info",
    external: false,
  },
  {
    title: "General Contact",
    body: "Questions, photo takedown requests, accessibility issues, donation questions, and media inquiries can all start here.",
    href: `mailto:${site.email}`,
    label: site.email,
    external: false,
  },
];

export default function GetInvolved() {
  return (
    <>
      <Nav />

      <Section className="bg-canvas">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
              Take Action
            </p>
          </div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-paper text-balance">
            Get Involved
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
            Choose the path that fits you: volunteer, attend an event, donate
            materials, partner, start a chapter, or stay updated by email.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#ways" variant="light">
              Explore Options
            </Button>
            <Button href={`mailto:${site.email}`} variant="onDark">
              Contact Us
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section id="ways" className="bg-paper">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((action, i) => (
            <Reveal key={action.title} delay={i * 50}>
              <Card tone="light" className="flex h-full flex-col">
                <h2 className="font-display text-2xl font-bold text-ink">
                  {action.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">
                  {action.body}
                </p>
                <div className="mt-6">
                  {action.gated ? (
                    <FormGate
                      href={action.href}
                      what={action.gated}
                      className="inline-flex items-center rounded-[3px] border border-ink/25 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {action.label}
                    </FormGate>
                  ) : action.external || action.href.startsWith("mailto:") ? (
                    <a
                      href={action.href}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center rounded-[3px] border border-ink/25 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {action.label}
                    </a>
                  ) : (
                    <Link
                      href={action.href}
                      className="inline-flex items-center rounded-[3px] border border-ink/25 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {action.label}
                    </Link>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-field">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-paper">
              Youth, Privacy, and External Forms
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper/70">
              Some opportunities use Google Forms, Discord, GitHub, Google
              Photos, or donation platforms outside this website, each under its
              own privacy policy. A parent or guardian must complete forms for
              students under {MIN_UNSUPERVISED_AGE}, and we ask you to confirm
              that before we send you onward; Discord is for participants aged{" "}
              {MIN_UNSUPERVISED_AGE} and older only. Our{" "}
              <Link
                href="/privacy-policy"
                className="text-paper underline underline-offset-4 hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
              >
                Privacy Policy
              </Link>{" "}
              sets out the rest. For privacy questions, unsubscribe requests, or
              photo removal, email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-paper underline underline-offset-4 hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
              >
                {site.email}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </>
  );
}
