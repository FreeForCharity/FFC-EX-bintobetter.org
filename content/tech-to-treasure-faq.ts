/**
 * Parent-facing Q&A for the Tech to Treasure page.
 *
 * Same reasoning as content/bounce-back-faq.ts: parents arrive from searches
 * phrased as questions — "free computer class for kids near me", "is it safe
 * for kids to take apart electronics", "what age to take apart a computer" —
 * and the page answered none of them in those words. Each answer below is
 * grounded in something the page already states or shows:
 *
 *  - free                     → the Workshops section says "Free, hands-on
 *                               sessions"
 *  - ages and group size      → the per-session details (8–12, grades 3–8, all
 *                               ages; 7–8 kids per station group)
 *  - what students do         → the stations and their guided prompts
 *  - what happens after       → "remaining parts are responsibly recycled
 *                               through e-waste channels with our recycling
 *                               partners" (What We Do)
 *  - how to hear about one    → the Get Involved block and /get-involved
 *  - the bootcamp             → 50 students, 6 weeks, 10 challenges, and the
 *                               public projects repository
 *
 * These strings go verbatim into FAQPage schema, so an overclaim here is
 * published in a machine-readable surface as well as a human one. Do not add an
 * answer the page cannot back up — in particular, nothing here promises a date,
 * a price for the bootcamp, or a seat, because the page promises none of those.
 */
export const techToTreasureFaq: { question: string; answer: string }[] = [
  {
    question: "Are the Tech to Treasure workshops free?",
    answer:
      "Yes. The workshops are free to attend. Every device students take apart is donated e-waste that would otherwise have been thrown away, which is what keeps the sessions free to run.",
  },
  {
    question: "What ages are the workshops for?",
    answer:
      "It has varied by session. We have run workshops for ages 8 to 12, for grades 3 to 8, and one open to all ages with families welcome. Students work in station groups of about seven or eight, so each group stays small enough for an instructor to work with directly.",
  },
  {
    question: "What do kids actually do at a workshop?",
    answer:
      "They take real hardware apart at three stations and put it back together. Depending on the session that has meant opening a hard drive to find the platter, stripping a Chromebook down to its motherboard, reversing a motor's leads to change its direction, or tracing which ports on a router carry the internet in and out. Each station comes with guided prompts an instructor works through with the group.",
  },
  {
    question: "Is it safe for children to take apart electronics?",
    answer:
      "Every station is instructor-led and the devices are prepared before students touch them. Some components are handled by touch only rather than opened — screen layers, for instance — and the parts that come out are chosen for the age group at each session.",
  },
  {
    question: "Where are the workshops held?",
    answer:
      "Our in-person sessions have been held in Fremont, California, at 5298 Rancho Del Norte Dr, including outside the red barn at Patterson Ranch. We have also run a virtual workshop online for students who could not attend in person.",
  },
  {
    question: "What happens to the devices after a workshop?",
    answer:
      "The parts that are still useful stay in our kit for the next session. Everything else is responsibly recycled through e-waste channels with our recycling partners, which is the point of the program: the devices get one more job before they are recycled rather than going straight to a landfill.",
  },
  {
    question: "Can I donate old electronics for the workshops?",
    answer:
      "Yes. Old computers, laptops, monitors, routers, and similar devices are what the workshops are built from. Email outreach@bintobetter.org with the type of device, how many you have, and your location, and we will arrange it.",
  },
  {
    question: "How do I hear about the next workshop?",
    answer:
      "Join the mailing list from our Get Involved page, or email outreach@bintobetter.org and ask to be told about the next session. Parents and guardians should be the ones to sign up for students under 13. Our Discord is for participants aged 13 and older.",
  },
  {
    question: "What is the Tech to Treasure Environmental Bootcamp?",
    answer:
      "A six-week program in which fifty students worked through ten environmental challenges, building technology projects with mentorship running the whole way. The cohort's final projects are published in a public GitHub repository, so the code students wrote can be read and built on by anyone.",
  },
];

/** FAQPage schema built from the same source as the visible list, so the two cannot drift. */
export function techToTreasureFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: techToTreasureFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
