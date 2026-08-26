import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/structured-data";
import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Mail } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { site, pageMetadata } from "@/content/site";
import {
  partnerLogos,
  whyPartner,
  corporatePartners,
  tennisClubs,
  animalShelters,
} from "@/content/partners";

export const metadata: Metadata = pageMetadata({
  route: "/partners",
  title: "Partners: Tennis Clubs, Schools & Shelters",
  description:
    "The tennis clubs, academies, schools, animal shelters, and businesses that collect and receive materials with Bin to Better. Partner with us or host a collection.",
});

const CONTACT_EMAIL = site.email;

export default function Partners() {
  return (
    <>
      <Nav />

      <main id="main-content">
      <JsonLd data={breadcrumbSchema("Partners", "/partners")} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <Section className="bg-canvas text-paper">
        <Reveal>
          <SectionHeading
            eyebrow="Our Partners"
            title="Partners"
            as="h1"
            subtitle="Our mission wouldn't be possible without the support of our partners. We collaborate with tennis clubs, academies, schools, and animal shelters to collect materials and ensure they are put to good use."
            tone="dark"
            align="left"
          />
        </Reveal>
      </Section>

      <Section className="bg-paper">
        <Reveal>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-6 shrink-0 bg-sage" aria-hidden="true" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
              Our Partners
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {partnerLogos.map((logo) => (
              <div
                key={logo.src}
                className="flex flex-col items-center justify-between gap-4 border border-ink/10 bg-paper p-5 rounded-[3px]"
              >
                <div className="flex h-24 items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name ?? ""}
                    width={200}
                    height={100}
                    className="max-h-24 w-auto object-contain"
                  />
                </div>
                {logo.name ? (
                  <p className="text-center text-xs font-medium leading-snug text-ink/65">
                    {logo.name}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ── Business Partners ─────────────────────────────────── */}
      <Section className="bg-paper">
        <Reveal>
          <SectionHeading
            eyebrow="Corporate Partners"
            title="Business Partners"
            tone="light"
            align="left"
          />
        </Reveal>

        {corporatePartners.map((partner, i) => (
          <Reveal key={partner.name} delay={i * 100}>
            <div className="mt-6 flex flex-col gap-10 border border-ink/10 rounded-[3px] p-8 md:flex-row md:items-center">
              {/* Logo — large and prominent */}
              <div className="flex shrink-0 items-center justify-center md:w-80">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={360}
                  height={200}
                  className="max-w-full object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-ink">
                  {partner.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/60 italic">
                  {/* Linkify the contact email only when the note actually
                      mentions it — otherwise render the note verbatim. */}
                  {partner.note.includes(CONTACT_EMAIL) ? (
                    <>
                      {partner.note.split(CONTACT_EMAIL)[0]}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-ink underline underline-offset-4 hover:text-canvas transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      {partner.note.split(CONTACT_EMAIL)[1]}
                    </>
                  ) : (
                    partner.note
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </Section>

      {/* ── Tennis Clubs & Animal Shelters ────────────────────── */}
      <Section className="bg-canvas text-paper">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Tennis Clubs */}
          <Reveal>
            <div className="border border-paper/10 rounded-[3px] p-8 h-full">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
                <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
                  Collection Partners
                </p>
              </div>
              <h3 className="font-display text-2xl font-bold text-paper mb-6">
                Tennis Clubs &amp; Academies
              </h3>
              <ul className="flex flex-col divide-y divide-paper/10">
                {tennisClubs.map((club) => (
                  <li
                    key={club}
                    className="py-3 text-sm leading-relaxed text-paper/70"
                  >
                    {club}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Animal Shelters */}
          <Reveal delay={100}>
            <div className="border border-paper/10 rounded-[3px] p-8 h-full">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
                <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
                  Distribution Partners
                </p>
              </div>
              <h3 className="font-display text-2xl font-bold text-paper mb-6">
                Animal Shelters &amp; Pet Services
              </h3>
              <ul className="flex flex-col divide-y divide-paper/10">
                {animalShelters.map((shelter) => (
                  <li
                    key={shelter}
                    className="py-3 text-sm leading-relaxed text-paper/70"
                  >
                    {shelter}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-field">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Why Partner"
                title="Why partner with us"
                tone="dark"
                align="left"
              />
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-2 flex max-w-2xl flex-col gap-4">
                {whyPartner.map((bullet, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[2rem_1fr] gap-4 border-t border-paper/15 pt-4"
                  >
                    <span className="mt-1 font-mono text-xs font-medium tabular-nums text-court">
                      0{i + 1}
                    </span>
                    <p className="text-base leading-relaxed text-paper/80">
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="border border-paper/10 rounded-[3px] p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
                <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
                  Get Involved
                </p>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-paper leading-tight text-balance">
                Become a partner
              </h2>
              <p className="mt-4 text-base leading-relaxed text-paper/70">
                Write to us to coordinate collections, donations, workshops, or
                reuse opportunities. We usually reply within a few school days.
              </p>
              <div className="mt-8">
                <Button
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Partnership Inquiry")}`}
                  variant="light"
                  icon={<Mail className="size-4" />}
                >
                  Get in Touch
                </Button>
                <CopyEmail
                  tone="dark"
                  className="mt-4"
                  label="Opens a pre-addressed email, or copy the address:"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      </main>


      <Footer />
    </>
  );
}
