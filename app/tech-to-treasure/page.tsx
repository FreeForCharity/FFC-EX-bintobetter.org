import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  bootcampCourseSchema,
  workshopEventSchema,
  programServiceSchema,
} from "@/content/structured-data";
import {
  techToTreasureFaq,
  techToTreasureFaqSchema,
} from "@/content/tech-to-treasure-faq";
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
  title: "Free E-Waste Workshops for Kids in Fremont, CA",
  description:
    "Free hands-on workshops in Fremont where kids take apart real computers, routers, and sensors to see how they work, plus a six-week environmental tech bootcamp. Leftover parts are recycled.",
  image: "/og/tech-to-treasure.jpg",
  imageAlt:
    "Students gathered outside the red barn at a Tech to Treasure workshop in Fremont",
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

// What the bootcamp produced, as opposed to what it scheduled. Every claim here
// is one the impact timeline (content/events.ts) or the public projects
// repository can be checked against.
const bootcampOutcomes = [
  {
    title: "Fifty students finished the full six weeks",
    desc: "The cohort worked through ten environmental challenges together, in weekly sessions run online and locally.",
  },
  {
    title: "Every project is public",
    desc: "Final projects from the cohort are published in an open GitHub repository, so the code students wrote can be read, run, and built on by anyone.",
  },
  {
    title: "Mentorship ran the whole way",
    desc: "Project support continued through all six weeks rather than stopping after a kickoff, which is what carried first-time builders to a finished project.",
  },
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
//
// `outcome` and `takeaways` lead each card. The page previously opened every
// workshop with its logistics — date, age band, group size — which answers a
// question nobody has about a session that already happened. What a reader
// (a parent deciding on the next one, a school deciding whether to host)
// actually wants is what the students walked away with, so that goes first and
// the logistics are demoted to one line. Outcomes match the impact timeline in
// content/events.ts; takeaways are the guided prompts the students worked
// through at the stations below.
const workshops = [
  {
    date: "March 1, 2026",
    startDate: "2026-03-01T15:30:00-08:00",
    endDate: "2026-03-01T17:30:00-08:00",
    location: "Patterson Ranch benches outside the red barn · 5298 Rancho Del Norte Dr, Fremont, CA 94555",
    outcome:
      "More than 40 students and family members took apart desktop computers, monitors, and a 3D printer, and left able to point out which part of a machine does what.",
    takeaways: [
      "Told memory apart from storage, and said why a computer needs both",
      "Traced a cable from the power supply to the part it feeds",
      "Explained what a stepper motor moves on a 3D printer",
      "Separated the parts that display an image from the parts that control it",
    ],
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
    startDate: "2026-04-19T15:30:00-07:00",
    endDate: "2026-04-19T17:30:00-07:00",
    location: "5298 Rancho Del Norte Dr, Fremont, CA 94555",
    outcome:
      "Students worked through circuit boards, motors, routers, and modems — taking each apart, following the signal through it, and putting it back together.",
    takeaways: [
      "Found the processor on a bare circuit board and traced a path between components",
      "Reversed a motor's leads and predicted which way it would turn",
      "Followed the wiring from a motor back to its driver board",
      "Worked out which ports on a router carry internet in and which carry it out",
    ],
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
    startDate: "2026-06-28T16:30:00-07:00",
    endDate: "2026-06-28T18:30:00-07:00",
    location: "5298 Rancho Del Norte Dr, Fremont, CA 94555",
    outcome:
      "Students opened a hard drive, stripped a Chromebook to its motherboard, and wired up sensors — covering how data is stored, how a laptop is built, and how an embedded system reads the world around it.",
    takeaways: [
      "Opened a hard drive, found the platter, and compared it to an SSD",
      "Explained why storage has shrunk while holding more",
      "Reassembled a Chromebook's layers in the right order",
      "Sorted sensor-board parts into inputs and outputs, and named a real-world use for each",
    ],
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
      <JsonLd
        data={[
          breadcrumbSchema("Tech to Treasure", "/tech-to-treasure"),
          programServiceSchema({
            name: "Tech to Treasure: free hands-on e-waste workshops",
            description:
              "Free workshops in Fremont where students take apart donated computers, routers, and sensors to learn how they work. Remaining parts are responsibly recycled.",
            route: "/tech-to-treasure",
            serviceType: "Electronics reuse education",
            audience: "Students, families, and schools",
          }),
          bootcampCourseSchema,
          techToTreasureFaqSchema(),
          ...workshops.map(workshopEventSchema),
        ]}
      />

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
          </div>
        </Reveal>

        <Reveal delay={180}>
          <h3 className="mt-10 font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage">
            What came out of it
          </h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {bootcampOutcomes.map((outcome) => (
              <li key={outcome.title} className="border border-ink/10 p-5">
                <p className="font-semibold text-ink">{outcome.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {outcome.desc}
                </p>
              </li>
            ))}
          </ul>
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
            recycled afterward. Here&apos;s what students took away from each
            session, most recent last.
          </p>
        </Reveal>

        <div className="space-y-8">
          {workshops.map((w, i) => (
            <Reveal key={w.date} delay={120 + i * 60}>
              <div className="border border-paper/15 bg-field overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="mb-6">
                    <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage mb-4">
                      {w.date} &bull; Fremont, CA
                    </p>
                    <p className="max-w-3xl text-lg leading-relaxed text-paper sm:text-xl">
                      {w.outcome}
                    </p>
                  </div>

                  <h4 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage mb-3">
                    What students walked away with
                  </h4>
                  <ul className="mb-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {w.takeaways.map((takeaway) => (
                      <li key={takeaway} className="flex items-start gap-2.5 text-sm text-paper/75">
                        <svg
                          aria-hidden="true"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-[0.2rem] shrink-0 text-court"
                        >
                          <polyline points="3 8.5 6.5 12 13 4.5" />
                        </svg>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Logistics, kept for anyone sizing up a session of their own
                      but no longer the first thing on the card. */}
                  <p className="mb-8 text-sm text-paper/50">
                    {w.details.map((d) => `${d.label}: ${d.value}`).join(" · ")}
                    {" · "}
                    {w.location}
                  </p>

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

      {/* Questions parents ask — paper band.
          Parents reach this page from questions ("free computer class for kids
          near me", "is it safe for kids to take apart electronics") that the
          page answered nowhere in those words. Same pattern as the teacher Q&A
          on /bounce-back: the visible list and the FAQPage schema are built
          from one source so they cannot contradict each other. */}
      <Section className="bg-paper">
        <Reveal>
          <SectionHeading
            eyebrow="For Parents & Schools"
            title="Common Questions"
            subtitle="What the workshops cost, who they are for, what students actually do, and where the parts end up."
            tone="light"
            align="left"
          />
        </Reveal>

        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {techToTreasureFaq.map((item, i) => (
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
      </Section>

      {/* Get Involved — field band, so it does not sit paper-on-paper against
          the questions above it. */}
      <Section className="bg-field">
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
