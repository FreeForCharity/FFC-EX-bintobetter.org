import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/structured-data";
import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { DiscordButton } from "@/components/ui/DiscordButton";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  route: "/tech-to-treasure",
  title: "Tech to Treasure: E-Waste Workshops for Kids",
  description:
    "Free hands-on workshops where students take apart real devices to learn how they work. Leftover parts are recycled through certified e-waste channels.",
});

const whatWeDo = [
  {
    title: "Collection & Education",
    desc: "We gather unused devices and transform them into educational tools through free, interactive workshops.",
  },
  {
    title: "Hands‑On Learning",
    desc: "Students disassemble devices to learn about CPU, RAM, storage, circuit boards, cooling, and power systems.",
  },
  {
    title: "Responsible Recycling",
    desc: "After sessions, remaining parts are responsibly recycled through e-waste channels with our recycling partners.",
  },
];

const bootcampStats = [
  { value: "50", label: "Students" },
  { value: "6", label: "Weeks" },
  { value: "10", label: "Challenges tackled" },
];

// Google Photos album with the full set of workshop & impact photos.
const WORKSHOP_ALBUM = "https://photos.app.goo.gl/792VDJk4aGh9V7M86";

const workshopPhotos = [
  { src: "/workshops/group-photo.webp", alt: "Workshop participants gathered in front of the red barn under the Tech to Treasure banner" },
  { src: "/workshops/motors.webp", alt: "An instructor walking students through the Motors in Motion poster" },
  { src: "/workshops/hands-up.webp", alt: "Students raising their hands to answer a question at the workshop table" },
  { src: "/workshops/instructing.webp", alt: "An instructor showing a group of students how a component works" },
  { src: "/workshops/stations.webp", alt: "Students seated at the station tables during the workshop" },
  { src: "/workshops/hands-on.webp", alt: "Students and instructors examining device parts together" },
];

// In-person workshops we've hosted. The March 1 session details are our
// original format; the April 19 and June 28 details come from each session's
// sign-up form, with the stations built from the topics each form describes.
const workshops = [
  {
    date: "March 1, 2026",
    location: "Patterson Ranch benches outside the red barn · 5298 Rancho Del Norte Dr, Fremont, CA 94555",
    details: [
      { label: "When", value: "March 1 · 3:30 PM – 5:30 PM" },
      { label: "Age Group", value: "8–12 years" },
      { label: "Duration", value: "2 hours" },
      { label: "Group Size", value: "7–8 kids per group" },
    ],
    stations: [
      {
        name: "Station 1: Desktop Computer",
        components: [
          "RAM sticks (remove & insert)",
          "Hard drive / SSD",
          "Cooling fan & cables",
          "Expansion cards & motherboard",
        ],
        promptLabel: "Guided prompts",
        prompts: [
          "Find the brain (CPU)",
          "Find memory vs. storage",
          "Trace a cable from power supply to part",
          "Spin fan — why cooling matters",
        ],
      },
      {
        name: "Station 2: 3D Printer",
        components: [
          "Stepper motors",
          "Belts and pulleys",
          "Metal rods & circuit board",
          "Connection & control cables",
        ],
        promptLabel: "Activities",
        prompts: [
          "Move print head by hand",
          "Follow wires from motors to circuit board",
          "Identify each motor's purpose",
        ],
      },
      {
        name: "Station 3: Monitor",
        components: [
          "Back casing & control buttons",
          "Circuit boards (main & button)",
          "Ribbon cables & ports",
          "Screen layers (light touch only)",
        ],
        promptLabel: "Challenges",
        prompts: [
          "Display parts vs. control parts",
          "Ribbon cables vs. power wires",
          "Which sends signals? Which sends power?",
        ],
      },
    ],
  },
  {
    date: "April 19, 2026",
    location: "5298 Rancho Del Norte Dr, Fremont, CA 94555",
    details: [
      { label: "When", value: "April 19 · 3:30 PM – 5:30 PM" },
      { label: "Age Group", value: "Grades 3–8" },
      { label: "Duration", value: "2 hours" },
      { label: "Group Size", value: "7–8 kids per group" },
    ],
    stations: [
      {
        name: "Station 1: Circuit Boards",
        components: [
          "Solder points & traces",
          "Capacitors & resistors",
          "Chips & processors",
          "Connectors & headers",
        ],
        promptLabel: "Guided prompts",
        prompts: [
          "Find the biggest chip — the board's brain",
          "Trace a path between two components",
          "Spot where power enters the board",
          "Reassemble the board you took apart",
        ],
      },
      {
        name: "Station 2: Motors in Motion",
        components: [
          "DC motors",
          "Gears & shafts",
          "Motor driver board",
          "Power & control leads",
        ],
        promptLabel: "Activities",
        prompts: [
          "Spin a motor by hand",
          "Reverse the leads to change direction",
          "Follow wires from motor to driver",
          "Identify what each motor moved",
        ],
      },
      {
        name: "Station 3: Wi-Fi Routers & Modems",
        components: [
          "Antennas",
          "Main circuit board",
          "Ethernet & phone ports",
          "Status LEDs",
        ],
        promptLabel: "Challenges",
        prompts: [
          "Which ports carry internet in vs. out?",
          "Find the antenna connections",
          "Signal path vs. power path",
          "What does each blinking light mean?",
        ],
      },
    ],
  },
  {
    date: "June 28, 2026",
    location: "5298 Rancho Del Norte Dr, Fremont, CA 94555",
    details: [
      { label: "When", value: "June 28 · 4:30 PM – 6:30 PM" },
      { label: "Age Group", value: "All ages welcome" },
      { label: "Duration", value: "2 hours" },
      { label: "Group Size", value: "7–8 kids per group" },
    ],
    stations: [
      {
        name: "Station 1: Storage & Memory",
        components: [
          "Hard drive (platters & head)",
          "SSD & flash chips",
          "RAM sticks",
          "SD cards & USB drives",
        ],
        promptLabel: "Guided prompts",
        prompts: [
          "Memory vs. storage — what's the difference?",
          "Open a hard drive and find the platter",
          "How has storage shrunk over time?",
          "Which is faster, an HDD or an SSD?",
        ],
      },
      {
        name: "Station 2: Inside a Chromebook",
        components: [
          "Motherboard & CPU",
          "Battery & power board",
          "Keyboard & trackpad ribbons",
          "Display connector",
        ],
        promptLabel: "Activities",
        prompts: [
          "Find the brain (CPU)",
          "Trace power from battery to board",
          "Follow the ribbon cables",
          "Reassemble the layers in order",
        ],
      },
      {
        name: "Station 3: Sensors & Embedded Systems",
        components: [
          "Microcontroller board",
          "Temperature & light sensors",
          "Buttons & LEDs",
          "Connecting wires",
        ],
        promptLabel: "Challenges",
        prompts: [
          "Which part is the 'computer' on this board?",
          "What does each sensor measure?",
          "Sort the parts: input vs. output",
          "Where would this chip be used in real life?",
        ],
      },
    ],
  },
];

export default function TechToTreasurePage() {
  return (
    <>
      <Nav />

      <main id="main-content">
      <JsonLd data={breadcrumbSchema("Tech to Treasure", "/tech-to-treasure")} />

      {/* Hero — dark canvas band */}
      <Section className="bg-canvas">
        <Reveal>
          <SectionHeading
            eyebrow="Project Spotlight"
            title="Tech to Treasure"
            as="h1"
            subtitle="Turning e-waste into educational tools and responsible recycling."
            align="left"
            tone="dark"
          />
        </Reveal>
      </Section>

      {/* A Device's Second Chance — light paper band */}
      <Section className="bg-paper">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-ink mb-5 text-balance">
              A Device&apos;s Second Chance
            </h2>
            <p className="text-ink/70 leading-relaxed text-base sm:text-lg">
              Millions of electronics are discarded each year, often without
              proper recycling, contributing to growing e&#8209;waste and
              environmental harm. Tech to Treasure addresses this issue while
              inspiring the next generation of innovators.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* What We Do — dark field band */}
      <Section className="bg-field">
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="How It Works"
            align="left"
            tone="dark"
          />
          <ul className="mt-2 space-y-6 max-w-3xl">
            {whatWeDo.map((item, i) => (
              // Reveal renders a <div>, so it has to live inside the <li> —
              // a <div> between <ul> and <li> breaks list semantics.
              <li key={item.title}>
                <Reveal delay={i * 100}>
                  <Card tone="dark" className="flex items-start gap-4">
                    {/* Checkmark inline SVG instead of emoji */}
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="mt-0.5 shrink-0 text-court"
                    >
                      <polyline points="4 10 8 14 16 6" />
                    </svg>
                    <p className="text-paper/80">
                      <strong className="block text-paper mb-1 font-semibold">
                        {item.title}
                      </strong>
                      {item.desc}
                    </p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Environmental Bootcamp — light paper band */}
      <Section className="bg-paper">
        <Reveal>
          <SectionHeading
            eyebrow="Environmental Bootcamp"
            title="6 Weeks. 10 Challenges. Real Impact."
            align="left"
            tone="light"
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mb-8 grid grid-cols-3 gap-4 max-w-xl">
            {bootcampStats.map((s) => (
              <div key={s.label} className="border border-ink/10 p-5">
                <div className="font-display text-3xl font-bold text-ink sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-ink/55 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="max-w-3xl space-y-4 text-ink/70 leading-relaxed text-base sm:text-lg">
            <p>
              Our Tech to Treasure Environmental Bootcamp brought students
              together to build real-world solutions for 10 environmental
              challenges, with mentorship and project support across six weeks.
            </p>
            <p>
              Dive into the code and view all student projects on GitHub.
            </p>
          </div>
          <div className="mt-6">
            <Button
              href="https://github.com/achavali33/Bin-to-Better-6-Week-Bootcamp-Final-Projects"
              variant="secondary"
              withArrow
            >
              View all student projects on GitHub
            </Button>
          </div>
        </Reveal>

      </Section>

      {/* Workshops — dark canvas band (merged from the former Workshop page) */}
      <Section className="bg-canvas">
        <Reveal>
          <SectionHeading
            eyebrow="Workshops"
            title="Hands-On Tech Workshops"
            subtitle="Free, hands-on sessions where kids touch real parts, see how things work, and hear instructors explain each component."
            align="left"
            tone="dark"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="mb-8 max-w-2xl text-base text-paper/60">
            We&apos;ve hosted several in-person workshops for local students, each
            built entirely around repurposed e-waste that&apos;s responsibly
            recycled afterward. Here&apos;s what each session looked like.
          </p>
        </Reveal>

        <div className="space-y-8">
          {workshops.map((w, i) => (
            <Reveal key={w.date} delay={120 + i * 60}>
              <div className="border border-paper/15 bg-field overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="mb-8">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage mb-4">
                      Past Event &bull; {w.date} &bull; Fremont, CA
                    </p>
                    <p className="text-paper/60 max-w-2xl text-base">
                      {w.location}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {w.details.map((d) => (
                      <div key={d.label} className="border border-paper/15 bg-canvas p-4">
                        <div className="font-mono text-xs text-paper/40 uppercase tracking-[0.12em] mb-1">
                          {d.label === "Group Size" ? "Station Group Size" : d.label}
                        </div>
                        <div className="text-sm font-semibold text-paper">{d.value}</div>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage mb-4">
                    Stations &amp; Activities
                  </h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {w.stations.map((station) => (
                      <div key={station.name} className="border border-paper/15 bg-canvas p-5">
                        <h5 className="font-semibold text-paper mb-3 text-sm">
                          {station.name}
                        </h5>
                        <ul className="list-disc ml-4 text-sm text-paper/60 space-y-1 mb-3">
                          {station.components.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                        <div className="font-mono text-xs text-paper/40 font-medium uppercase tracking-[0.12em] mb-1">
                          {station.promptLabel}
                        </div>
                        <ul className="list-disc ml-4 text-xs text-paper/50 space-y-1">
                          {station.prompts.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Workshop & impact photo gallery — drop images into the slots below.
            Source album: WORKSHOP_ALBUM (Google Photos). */}
        <Reveal delay={120}>
          <div className="mt-10">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h4 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
                Workshop &amp; Impact Photos
              </h4>
              <a
                href={WORKSHOP_ALBUM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-court underline underline-offset-4 hover:brightness-90"
              >
                View full album
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {workshopPhotos.map((photo) => (
                <div
                  key={photo.src}
                  className="aspect-[4/3] overflow-hidden border border-paper/15"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1200}
                    height={900}
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Get Involved — paper band */}
      <Section className="bg-paper">
        <Reveal>
          <div className="max-w-3xl border border-ink/10 bg-paper p-8">
            <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-ink mb-3 text-balance">
              Get Involved
            </h2>
            <p className="text-ink/70 mb-6 text-base sm:text-lg">
              Parents and guardians can email us or join the mailing list for
              workshop updates. Discord is only for participants age 13 and
              older.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/get-involved" variant="secondary">
                View Signup Options
              </Button>
              <DiscordButton href="https://tinyurl.com/b2bdisc">
                Join Discord, 13+
              </DiscordButton>
            </div>
          </div>
        </Reveal>
      </Section>

      </main>


      <Footer />
    </>
  );
}
