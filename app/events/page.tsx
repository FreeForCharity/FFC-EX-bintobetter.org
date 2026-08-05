import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { hackathon, impactTimeline, sponsorTiers } from "@/content/events";

export const metadata: Metadata = {
  title: "Impact & Events | Bin to Better",
  description:
    "Explore Bin to Better's impact timeline, past events, awards, and community supporters.",
};

/* Inline SVG icons — decorative, aria-hidden */
function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 21C12 21 5 13.5 5 8.5a7 7 0 0 1 14 0c0 5-7 12.5-7 12.5z" />
      <circle cx="12" cy="8.5" r="2.5" />
    </svg>
  );
}

const infoIcons = [<CalendarIcon key="cal" />, <ClockIcon key="clk" />, <PinIcon key="pin" />];

const tierGridCols: Record<string, string> = {
  xl: "grid-cols-1 sm:grid-cols-2",
  lg: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
  md: "grid-cols-3 sm:grid-cols-6",
  sm: "grid-cols-3",
};

/* Height of logo container by tier — bigger and prominent */
const tierImgHeight: Record<string, string> = {
  xl: "h-40 sm:h-56",
  lg: "h-28 sm:h-36",
  md: "h-20 sm:h-28",
  sm: "h-16 sm:h-20",
};

export default function Events() {
  return (
    <>
      <Nav />

      {/* ── Hero ── */}
      <Section className="bg-canvas">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 shrink-0 bg-court" aria-hidden="true" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
              Get Involved
            </p>
          </div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[0.95] tracking-tight text-paper text-balance">
            Impact &amp; Events
          </h1>
          <p className="mt-5 text-lg text-paper/70 max-w-2xl">
            Explore upcoming opportunities, past workshops, hackathons, awards,
            and community impact.
          </p>
        </Reveal>
      </Section>

      {/* ── Featured Event ── */}
      <Section className="bg-paper">
        <SectionHeading eyebrow="Spotlight" title="Featured Event" align="left" tone="light" />

        <Reveal>
          <div className="border border-ink/10 rounded-md overflow-hidden">

            {/* Header band — canvas (dark) */}
            <div className="bg-canvas px-8 py-12">
              {/* Mono date tag — no pill */}
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court mb-6">
                {hackathon.datePill}
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight tracking-tight text-paper text-balance">
                Tech to Treasure{" "}
                <span className="text-court">Hackathon</span>
              </h2>
              <p className="mt-4 text-lg text-paper/70 max-w-2xl">
                {hackathon.tagline}
              </p>

              {/* Info rows — mono, no pills */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {hackathon.infoPills.map((pill, i) => (
                  <div
                    key={pill.label}
                    className="flex items-center gap-2 text-paper/80"
                  >
                    {infoIcons[i]}
                    <span className="font-mono text-xs uppercase tracking-[0.08em]">
                      {pill.label}
                      {pill.sublabel && (
                        <span className="ml-1 text-paper/50 normal-case tracking-normal font-sans text-sm">
                          {pill.sublabel}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details body — field (dark green) */}
            <div className="grid gap-10 bg-field p-8 md:grid-cols-2 md:p-12">
              {/* About */}
              <div>
                <h3 className="font-display text-2xl font-bold text-paper mb-4">
                  About the Event
                </h3>
                <div className="space-y-4 leading-relaxed text-paper/70">
                  {hackathon.aboutParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Mission */}
              <div>
                <h3 className="font-display text-xl font-bold text-paper mb-4">
                  Our Mission
                </h3>
                <div className="space-y-4 border border-paper/10 bg-canvas/40 p-6 rounded-md">
                  {hackathon.mission.map((m) => (
                    <div key={m.title} className="flex gap-4 items-start">
                      {/* Court-colored dash mark in place of emoji */}
                      <span
                        className="mt-1 h-px w-4 shrink-0 bg-court translate-y-[0.45em]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-mono text-xs font-medium uppercase tracking-[0.10em] text-court">
                          {m.title}
                        </p>
                        <p className="mt-0.5 text-sm leading-snug text-paper/60">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prizes — canvas */}
            <div className="bg-canvas px-8 pb-10 pt-8 md:px-12 md:pb-12">
              <h3 className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
                Prizes
              </h3>
              <div className="mb-6 h-px bg-court/30" aria-hidden="true" />

              {/* Top 3 podium */}
              <div className="mb-6 grid grid-cols-3 items-end gap-4">
                {hackathon.prizes.top3.map((prize) => (
                  <div
                    key={prize.place}
                    className={`border p-5 text-center rounded-sm ${
                      prize.style === "gold"
                        ? "border-court/50 bg-court/10 md:-translate-y-4 md:py-7"
                        : "border-paper/10 bg-paper/5"
                    }`}
                  >
                    <div
                      className={`font-mono text-sm font-medium uppercase tracking-[0.10em] ${
                        prize.style === "gold"
                          ? "text-court"
                          : prize.style === "silver"
                            ? "text-paper/70"
                            : "text-paper/50"
                      }`}
                    >
                      {prize.place}
                    </div>
                    <div className="mt-1 font-display text-base font-bold text-paper">{prize.award}</div>
                  </div>
                ))}
              </div>

              {/* 4th, 5th + Wolfram */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {hackathon.prizes.rest.map((prize) => (
                  <div
                    key={prize.place}
                    className="border border-paper/5 bg-paper/[0.03] p-4 text-center rounded-sm"
                  >
                    <div className="font-mono text-xs font-medium uppercase tracking-[0.10em] text-paper/70">
                      {prize.place}
                    </div>
                    <div className="mt-1 text-sm font-bold text-paper/50">{prize.award}</div>
                  </div>
                ))}
                {/* Wolfram Award — no emoji, use mono label */}
                <div className="col-span-2 flex items-start gap-4 border border-paper/5 bg-paper/[0.03] p-4 rounded-sm">
                  <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.10em] text-court">
                      {hackathon.prizes.wolfram.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-tight text-paper/50">
                      {hackathon.prizes.wolfram.desc}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-paper/50">
                Plus{" "}
                <span className="font-bold text-court">
                  {hackathon.prizes.allNoteAmount}
                </span>{" "}
                {hackathon.prizes.allNoteSuffix}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="/get-involved"
                  className="inline-flex items-center rounded-[3px] bg-court px-5 py-2.5 text-sm font-medium text-ink transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
                >
                  Join Interest List
                </a>
                <a
                  href="mailto:outreach@bintobetter.org?subject=Event%20Sponsorship"
                  className="inline-flex items-center rounded-[3px] border border-paper/30 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-court hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
                >
                  Sponsor or Volunteer
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-paper">
        <SectionHeading
          eyebrow="Archive"
          title="Impact Timeline"
          tone="light"
          align="left"
        />
        <div className="mt-6 grid gap-4">
          {impactTimeline.map((item, i) => (
            <Reveal key={`${item.date}-${item.title}`} delay={i * 60}>
              <div className="grid gap-4 border border-ink/10 p-5 md:grid-cols-[12rem_1fr]">
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
                    {item.date}
                  </p>
                  <p className="mt-2 inline-flex border border-ink/15 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink/60">
                    {item.category}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-sage">
                    {item.location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {item.result}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Sponsors ── */}
      <Section className="bg-canvas">
        <SectionHeading
          eyebrow="Our Supporters"
          title="Backed by Global Innovators"
          tone="dark"
        />

        <div className="space-y-14">
          {sponsorTiers.map((tier, ti) => (
            <Reveal key={tier.label} delay={ti * 80}>
              <div className={`grid ${tierGridCols[tier.size]} items-center gap-6`}>
                {tier.sponsors.map((sponsor, si) => (
                  <Reveal key={sponsor.name} delay={si * 60} className="w-full">
                    <a
                      href={sponsor.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center border border-ink/10 bg-paper p-5 rounded-sm transition-colors duration-200 hover:border-court/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
                      aria-label={sponsor.name}
                    >
                      <div className={`relative w-full ${tierImgHeight[tier.size]}`}>
                        <Image
                          src={sponsor.src}
                          alt={sponsor.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 30vw, 20vw"
                        />
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Footer />
    </>
  );
}
