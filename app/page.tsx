import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { RevealWords } from "@/components/motion/RevealWords";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { CursorSpotlight } from "@/components/motion/CursorSpotlight";
import { Magnetic } from "@/components/motion/Magnetic";
import { DrawLine } from "@/components/motion/DrawLine";
import { StatReveal } from "@/components/motion/StatReveal";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Globe } from "@/components/ui/globe";
import { ArrowRight } from "@/components/ui/icons";
import { TestimonialSlider } from "@/components/ui/TestimonialSlider";
import { Highlighter } from "@/components/ui/highlighter"

import {
  stats,
  programsPreview,
  testimonials,
  mission,
  projectsBlurb,
  contactPara,
} from "@/content/home";

export const metadata: Metadata = {
  title: "Home | Bin to Better",
  description:
    "Turning waste into opportunity — one item at a time, one community at a time.",
};

// Program photos shown as a compact 2-column bento under the mission heading.
// Shapes are matched to cells: portrait → tall tile, landscape → wide tile.
const missionPhotos = [
  {
    src: "/bounce-back-logos/page-30-xref-120.png",
    alt: "Repurposed tennis balls ready for donation",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 1024px) 45vw, 18vw",
  },
  {
    src: "/bounce-back-logos/page-31-xref-123.png",
    alt: "Loading collected materials at a community collection drive",
    span: "col-span-1 row-span-2",
    sizes: "(max-width: 1024px) 45vw, 18vw",
  },
  {
    src: "/bounce-back-logos/page-28-xref-114.png",
    alt: "Bin to Better volunteers handing off a donation of collected tennis balls",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 1024px) 45vw, 18vw",
  },
  {
    src: "/bounce-back-logos/page-29-xref-117.png",
    alt: "Sorting and preparing collected tennis balls for reuse",
    span: "col-span-2 row-span-1",
    sizes: "(max-width: 1024px) 92vw, 38vw",
  },
];

const recentMilestones = [
  {
    date: "March 1, 2026",
    title: "Tech to Treasure Workshop",
    detail: "Students explored real device parts through hands-on stations in Fremont.",
  },
  {
    date: "June 27, 2026",
    title: "5,000 Tennis Balls Collected",
    detail: "Bounce Back recovered roughly 5,000 used tennis balls from partner facilities.",
  },
  {
    date: "June 28, 2026",
    title: "Tech to Treasure Workshop",
    detail: "Students explored storage, sensors, and embedded systems through guided disassembly.",
  },
];

export default function Home() {
  const [lead, ...missionRest] = mission;

  return (
    <>
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <Section className="relative overflow-hidden bg-mesh text-paper">
        {/* Decorative depth layers, back-to-front */}
        <DotPattern
          width={26}
          height={26}
          className="[mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]"
        />
        <div className="grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
        <CursorSpotlight />
        <div
          className="glow-court pointer-events-none absolute -left-20 top-4 z-0 h-[28rem] w-[28rem]"
          aria-hidden="true"
        />

        <div className="relative z-10">

          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.92] tracking-tight">
            <RevealWords text="Turning waste into" stagger={70} initialDelay={120} />{" "}
            <Highlighter
              action="underline"
              color="#97b536"
              strokeWidth={4}
              animationDuration={900}
              isView
            >
              <span className="text-court z-100">opportunity.</span>
            </Highlighter>
          </h1>

          <Reveal delay={520}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/70">
              One item at a time, one community at a time.
            </p>
          </Reveal>

          <Reveal delay={620}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Button href="#programs" variant="light" withArrow>
                  Explore Our Projects
                </Button>
              </Magnetic>
              <Button href="/get-involved" variant="onDark">
                Get Involved
              </Button>
            </div>
          </Reveal>

          {/* Impact row */}
          <Reveal delay={720}>
            <div className="mt-14 pt-8 relative">
              <DrawLine className="divider-fade absolute left-0 top-0 h-px w-full" delay={120} />
              <div className="flex flex-wrap gap-x-12 gap-y-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-mono text-3xl font-medium tabular-nums text-court sm:text-4xl">
                      <StatReveal value={s.value} />
                    </p>
                    <p className="mt-1.5 font-mono text-xs text-paper/50 uppercase tracking-[0.1em]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

      </Section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <Section className="bg-paper">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeading
                eyebrow="Our Mission"
                title="Turning Waste into Opportunity"
                tone="light"
                align="left"
              />
            </Reveal>

            {/* Program photos — bento grid */}
            <Reveal delay={120}>
              <div className="mt-2 grid auto-rows-[118px] grid-cols-2 gap-3 sm:auto-rows-[140px]">
                {missionPhotos.map((photo) => (
                  <div
                    key={photo.src}
                    className={`group relative overflow-hidden rounded-md border border-ink/10 ${photo.span}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={photo.sizes}
                      className="object-cover transition-transform duration-500 ease-[var(--ease-out-hover)] group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="text-xl leading-relaxed text-ink sm:text-2xl">{lead}</p>
            </Reveal>

            <RevealGroup className="mt-6 space-y-5" stagger={90}>
              {missionRest.map((para, i) =>
                i === 0 ? (
                  <blockquote
                    key={i}
                    className="border-l-2 border-court pl-5 text-base leading-relaxed text-ink/80"
                  >
                    {para}
                  </blockquote>
                ) : (
                  <p key={i} className="text-base leading-relaxed text-ink/80">
                    {para}
                  </p>
                )
              )}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* ── Programs ──────────────────────────────────────────── */}
      <Section id="programs" className="bg-field">
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Projects"
            tone="dark"
            align="left"
          />
        </Reveal>

        <Reveal delay={40}>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-paper/70">
            {projectsBlurb}
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-4">
          {programsPreview.map((p, i) => (
            <Reveal key={p.href} delay={i * 80}>
              <Card
                tone="dark"
                interactive
                glow
                className="group/preview relative overflow-hidden"
              >
                <span
                  className="divider-fade absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100"
                  aria-hidden="true"
                />
                <div className="flex items-start gap-5 sm:gap-8">
                  <span className="font-mono text-sm font-medium tabular-nums text-court/70 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-bold text-paper">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-paper/70">{p.blurb}</p>
                    <Link
                      href={p.href}
                      className="mt-1 inline-flex items-center gap-1 font-mono text-xs font-medium text-court transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
                    >
                      View More
                      <ArrowRight className="size-3.5 transition-transform duration-200 ease-[var(--ease-out-hover)] group-hover/preview:translate-x-[3px]" />
                    </Link>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-paper">
        <Reveal>
          <SectionHeading
            eyebrow="Proof of Impact"
            title="Recent Momentum"
            tone="light"
            align="left"
          />
        </Reveal>
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal delay={60}>
            <Card tone="light" className="h-full">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
                Award
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink">
                2026 CRRA Outstanding School Recycling Program Award
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Presented by the California Resource Recovery Association
                (CRRA), recognizing student-led reuse, recycling, and community
                education work.
              </p>
              <Link
                href="/achievements"
                className="mt-5 inline-flex font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage underline underline-offset-4 transition-colors hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                View Awards
              </Link>
            </Card>
          </Reveal>
          <div className="grid gap-3">
            {recentMilestones.map((item, i) => (
              <Reveal key={item.title} delay={100 + i * 60}>
                <div className="border border-ink/10 p-5">
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
                    {item.date}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={220}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/donate" variant="secondary">
              Support the Work
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <Section id="testimonials" className="bg-paper">
        <Reveal>
          <SectionHeading
            eyebrow="Community Voice"
            title="Testimonials"
            tone="light"
            align="left"
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="relative rounded-md border border-ink/10 bg-paper p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-8">
            <div className="relative">
              <TestimonialSlider items={testimonials} />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Contact ───────────────────────────────────────────── */}
      <Section className="relative overflow-hidden bg-mesh text-paper">
        <DotPattern className="opacity-60 [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)]" />
        <div className="grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

        {/* Spinning globe — bottom-right accent */}
       <div
          className="pointer-events-none absolute -bottom-27 -right-22 z-0 h-[22rem] w-[22rem] opacity-50 sm:h-[28rem] sm:w-[28rem]"
          aria-hidden="true"
        >
          <Globe className="max-w-none" />
        </div>
        

        <div className="relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="Get in Touch"
              title="Contact Us"
              tone="dark"
              align="left"
            />
          </Reveal>

          <Reveal delay={80}>
            <p className="max-w-prose text-base leading-relaxed text-paper/70">
              {contactPara}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* Email */}
              <a
                href="mailto:outreach@bintobetter.org"
                className="group flex flex-col gap-1.5 rounded-[3px] border border-paper/15 px-6 py-5 transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-out-hover)] will-change-transform hover:-translate-y-[2px] hover:border-court hover:shadow-[var(--shadow-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
              >
                <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
                  Email
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-paper transition-colors group-hover:text-court">
                  outreach@bintobetter.org
                  <ArrowRight className="size-4 opacity-0 transition-[opacity,transform] duration-200 ease-[var(--ease-out-hover)] group-hover:opacity-100 group-hover:translate-x-[3px]" />
                </span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/_bintobetter"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1.5 rounded-[3px] border border-paper/15 px-6 py-5 transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-out-hover)] will-change-transform hover:-translate-y-[2px] hover:border-court hover:shadow-[var(--shadow-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
              >
                <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
                  Instagram
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-paper transition-colors group-hover:text-court">
                  @_bintobetter
                  <ArrowRight className="size-4 opacity-0 transition-[opacity,transform] duration-200 ease-[var(--ease-out-hover)] group-hover:opacity-100 group-hover:translate-x-[3px]" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      <Footer />
    </>
  );
}
