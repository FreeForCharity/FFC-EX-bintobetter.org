import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/structured-data";
import { bounceBackFaq, bounceBackFaqSchema } from "@/content/bounce-back-faq";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StatReveal } from "@/components/motion/StatReveal";
import { pageMetadata } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  route: "/bounce-back",
  title: "Free Tennis Balls for Classroom Chair Legs",
  description:
    "Teachers can request free repurposed tennis balls for chair legs — quieter classrooms, protected floors. Over 74,000 balls repurposed for schools and shelters.",
});

const whatWeDo = [
  {
    title: "Collection",
    desc: "During active collection months, our team collects used balls from local clubs and academies.",
  },
  {
    title: "Reuse",
    desc: "Usable balls are prepared for schools as chair-leg covers, animal shelters as enrichment toys, and assisted living centers as walker-leg covers.",
  },
  {
    title: "Impact",
    desc: "The project has repurposed more than 74,000 tennis balls and donated more than 30,000 to organizations that can use them effectively.",
  },
];

// Google Photos albums with the full sets of collection & donation photos.
const ALBUMS = [
  { label: "Shelter drop-offs", href: "https://photos.app.goo.gl/jUviwYsVCJvxj58V9" },
  { label: "School drop-offs", href: "https://photos.app.goo.gl/iqMFCXFXN2S3SBaGA" },
  { label: "Club pickups", href: "https://photos.app.goo.gl/L71iBGJFoewJBT316" },
];

// Two photos pulled from each album above.
const projectPhotos = [
  { src: "/bounce-back/club-court-pickup.webp", alt: "A volunteer tying off a bag of used tennis balls collected courtside at a tennis club" },
  { src: "/bounce-back/club-clubhouse-pickup.webp", alt: "A volunteer carrying a full bag of collected tennis balls out of a club clubhouse" },
  { src: "/bounce-back/shelter-collected-bag.webp", alt: "A volunteer holding a bag of collected tennis balls before an animal shelter drop-off" },
  { src: "/bounce-back/shelter-intake-bin.webp", alt: "Bags of tennis balls being unloaded into an intake bin at an animal shelter front desk" },
  { src: "/bounce-back/school-teacher-box.webp", alt: "A volunteer handing a box of tennis balls to a teacher at an elementary school" },
  { src: "/bounce-back/school-classroom-handoff.webp", alt: "A volunteer and a teacher with a bag of tennis balls delivered to her classroom" },
];

export default function BounceBackPage() {
  return (
    <>
      <Nav />

      <main id="main-content">
      <JsonLd data={[breadcrumbSchema("Bounce Back Project", "/bounce-back"), bounceBackFaqSchema()]} />

      {/* ── Hero ───────────────────────────────────────────── */}
      <Section className="bg-canvas text-paper">
        <Reveal>
          <SectionHeading
            eyebrow="Project Spotlight"
            title="Bounce Back Project"
            as="h1"
            subtitle="Giving used tennis balls a second life in schools, animal shelters, and assisted living."
            align="left"
            tone="dark"
          />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left — text content */}
          <div className="space-y-10">
            <Reveal delay={100}>
              <div>
                <h2 className="font-display text-2xl font-bold text-paper mb-3">
                  The Focus of Our Efforts
                </h2>
                <p className="text-paper/70 leading-relaxed">
                  Tennis balls are often discarded while they still have useful
                  life left in them. The Bounce Back Project reduces waste by
                  collecting used balls, sorting them, and donating usable
                  materials to organizations that can put them to work.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div>
                <h2 className="font-display text-2xl font-bold text-paper mb-4">
                  What We Do
                </h2>
                <ul className="space-y-5">
                  {whatWeDo.map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-court"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 8.5L6.5 12.5L13.5 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <p className="text-paper/70 leading-relaxed">
                        <strong className="text-paper">{item.title}:</strong>{" "}
                        {item.desc}
                      </p>
                    </li>
                  ))}
                  <li className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-court"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 8.5L6.5 12.5L13.5 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="text-paper/70 leading-relaxed">
                      <strong className="text-paper">Get Involved:</strong> Clubs
                      interested in participating can visit the{" "}
                      <Link
                        href="/partners"
                        className="text-court underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
                      >
                        Partners page
                      </Link>{" "}
                      or contact us directly to arrange a pickup.
                    </p>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="flex flex-wrap gap-3">
                <Button href="mailto:outreach@bintobetter.org?subject=Bounce%20Back%20Pickup%20Request" variant="light">
                  Request a Pickup
                </Button>
                <Button href="mailto:outreach@bintobetter.org?subject=Tennis%20Ball%20Recipient%20Request" variant="onDark">
                  Request Tennis Balls
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right - impact summary */}
          <Reveal delay={300}>
            <div className="border border-paper/15 bg-field rounded-[3px] p-8 text-center flex min-h-80 flex-col items-center justify-center gap-4">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
                Impact to Date
              </p>
              <p className="font-mono text-[clamp(3rem,8vw,5rem)] font-medium tabular-nums text-court leading-none">
                <StatReveal value="74k+" />
              </p>
              <p className="font-mono text-sm font-medium uppercase tracking-[0.1em] text-paper/70">
                Tennis Balls Repurposed
              </p>
              <div className="mt-5 grid w-full grid-cols-2 gap-3 text-left">
                {[
                  ["30,000+", "Donated"],
                  ["4", "Recipient types"],
                ].map(([value, label]) => (
                  <div key={label} className="border border-paper/10 p-3">
                    <p className="font-mono text-lg text-court">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-paper/50">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── For Teachers ───────────────────────────────────── */}
      {/* Placed directly after the hero, above the photo gallery: teachers
          landing from a search are here to find out whether they can get balls
          and how, and that answer should not be below a gallery. */}
      <Section className="bg-paper">
        <Reveal>
          <SectionHeading
            eyebrow="For Teachers"
            title="Free Tennis Balls for Classroom Chair Legs"
            subtitle="Chair legs dragging across the floor are a constant source of classroom noise. We cut used tennis balls to fit chair legs and donate them to schools, animal shelters, and assisted living centers."
            tone="light"
            align="left"
          />
        </Reveal>

        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {bounceBackFaq.map((item, i) => (
            <Reveal key={item.question} delay={60 + i * 40}>
              <div>
                <h3 className="text-lg font-bold leading-snug text-ink">
                  {item.question}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/70">{item.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <div className="mt-12">
            <Button href="mailto:outreach@bintobetter.org?subject=Tennis%20Ball%20Request%20for%20My%20Classroom">
              Request Tennis Balls for Your Classroom
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ── Photo Gallery ──────────────────────────────────── */}
      <Section className="bg-paper">
        <Reveal>
          <SectionHeading
            eyebrow="In the Field"
            title="Project Photos"
            tone="light"
            align="left"
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
              Pickups &amp; Drop-offs
            </h3>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {ALBUMS.map((album) => (
                <a
                  key={album.href}
                  href={album.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-ink underline underline-offset-4 transition-colors hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {album.label}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {projectPhotos.map((photo) => (
              <div
                key={photo.src}
                className="aspect-[3/4] overflow-hidden border border-ink/10"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={1200}
                  height={1600}
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      </main>


      <Footer />
    </>
  );
}
