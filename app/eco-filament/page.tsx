import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { DiscordButton } from "@/components/ui/DiscordButton";
import Image from "next/image";

// Google Photos album with the full set of park-cleanup photos.
const CLEANUP_ALBUM = "https://photos.app.goo.gl/Gv7Gx5vsJinbyADB9";

const cleanupPhotos = [
  { src: "/cleanups/check-in.webp", alt: "Volunteers signing in at the cleanup check-in table" },
  { src: "/cleanups/supplies.webp", alt: "A volunteer handing out trash bags from the supply bin" },
  { src: "/cleanups/picking-litter.webp", alt: "A volunteer using a grabber to collect litter from the brush" },
  { src: "/cleanups/bagging-litter.webp", alt: "Two volunteers bagging litter collected along the creek" },
  { src: "/cleanups/trailside.webp", alt: "Volunteers clearing trash from bushes beside the trail" },
  { src: "/cleanups/full-bag.webp", alt: "A volunteer carrying a full bag of collected litter down the path" },
];

export const metadata: Metadata = {
  title: "Eco-Filament | Bin to Better",
  description:
    "Repurposing plastic waste into 3D printer filament for tools and toys.",
};

export default function EcoFilamentPage() {
  return (
    <>
      <Nav />

      {/* Hero — dark canvas band */}
      <Section className="bg-canvas">
        <Reveal>
          <SectionHeading
            eyebrow="Project Spotlight"
            title="Eco-Filament"
            subtitle="Repurposing plastic waste into 3D printer filament for tools and toys."
            align="left"
            tone="dark"
          />
        </Reveal>
      </Section>

      {/* Program overview */}
      <Section className="bg-paper">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-ink mb-5 text-balance">
              From Plastic Waste to Useful Products
            </h2>
            <p className="text-ink/70 leading-relaxed text-base sm:text-lg mb-8">
              Eco-Filament repurposes suitable, cleaned, and sorted plastic
              waste into 3D printer filament used to develop toys and tools for
              students with sensory needs. Plastic that is not safe or suitable
              for filament is handled through appropriate cleanup and recycling
              channels instead of being presented as filament-ready material.
            </p>

            {/* Discord callout — bordered block, no pill */}
            <div className="border border-ink/10 bg-paper p-6 mb-8">
              <p className="text-ink/80 text-base">
                Volunteers can help with cleanups, sorting, and outreach.
                Volunteer-hour documentation is available for eligible,
                supervised activities after participation is confirmed. Parents
                and guardians can use the Get Involved page or email us.
                Discord is only for participants age 13 and older.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/get-involved"
                className="inline-flex items-center rounded-[3px] border border-ink/25 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                View Volunteer Options
              </a>
              <DiscordButton href="https://tinyurl.com/b2bdisc">
                Join Discord, 13+
              </DiscordButton>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-canvas">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="How Eco-Filament Works"
            align="left"
            tone="dark"
          />
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {["Collect Safely", "Sort and Clean", "Test Material", "Print Tools"].map((step, i) => (
            <Reveal key={step} delay={i * 60}>
              <div className="border border-paper/15 p-5">
                <p className="font-mono text-xs font-medium tabular-nums text-court">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-xl font-bold text-paper">
                  {step}
                </h2>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={220}>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-paper/60">
            Cleanup work can involve sharp litter, heat, and machinery.
            Participants follow event-specific safety instructions, PPE
            guidance, and adult-supervision requirements.
          </p>
        </Reveal>
      </Section>

      {/* Cleanup photos — dark field band. Drop images into the slots below.
          Source album: CLEANUP_ALBUM (Google Photos). */}
      <Section className="bg-field">
        <Reveal>
          <SectionHeading
            eyebrow="From the Cleanups"
            title="Out in the Parks"
            subtitle="Photos from park cleanups that collect and sort candidate material for reuse."
            align="left"
            tone="dark"
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="mb-4 flex justify-end">
            <a
              href={CLEANUP_ALBUM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-court underline underline-offset-4 hover:brightness-90"
            >
              View full album
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {cleanupPhotos.map((photo) => (
              <div
                key={photo.src}
                className="aspect-[3/4] overflow-hidden border border-paper/15"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={900}
                  height={1200}
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Footer />
    </>
  );
}
