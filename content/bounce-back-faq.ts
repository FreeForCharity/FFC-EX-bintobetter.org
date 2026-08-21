/**
 * Teacher-facing Q&A for the Bounce Back page.
 *
 * Teachers arrive from searches phrased as questions ("where can I get tennis
 * balls for classroom chairs", "are tennis balls for chair legs free"), and the
 * page previously answered none of them in those words. Each answer below is
 * grounded in something the site already states or shows:
 *
 *  - free / who receives      → the project donates to schools, shelters and
 *                               assisted living centres (What We Do, Impact)
 *  - cutting and installing   → the Blacow Elementary testimonial on the
 *                               homepage describes both, for a local classroom
 *  - typical quantity         → the same testimonial names 140 balls for one
 *                               classroom; the events log records drops from
 *                               250 to 4,000
 *  - how to ask               → the existing "Request Tennis Balls" mailto
 *
 * Anything not evidenced on the site is phrased as "contact us" rather than
 * promised. In particular the cost and the cutting/installing answers describe
 * what has happened before and defer the specifics to a reply, because one
 * testimonial showing a service once is not a commitment to provide it on every
 * request — and these strings go verbatim into FAQPage schema, so an overclaim
 * here is published in a machine-readable surface too. Do not add an answer here that the page cannot back up: schema that
 * contradicts the page is worse than no schema.
 */
export const bounceBackFaq: { question: string; answer: string }[] = [
  {
    question: "Can my classroom get free tennis balls for chair legs?",
    answer:
      "The balls are donated, not sold. Bounce Back has given repurposed tennis balls to schools, animal shelters, and assisted living centers, and how much we can supply depends on what has come in from our collection partners. Email outreach@bintobetter.org with your school, the number of chairs, and your location, and we will confirm what we can cover for your request.",
  },
  {
    question: "Why put tennis balls on classroom chair legs?",
    answer:
      "Chair legs scraping across a floor are one of the loudest and most constant sources of classroom noise. Tennis balls on the legs muffle that noise during transitions and protect waxed or hardwood floors from scratches, and they cost nothing when the balls would otherwise be thrown away.",
  },
  {
    question: "Do you cut the tennis balls, or do we?",
    answer:
      "Our volunteers have cut the balls to fit chair legs before handing them over, and have gone out to nearby classrooms to help put them on the chairs. Tell us how many chairs you have when you get in touch and we will confirm what we can do for your school.",
  },
  {
    question: "How many tennis balls can a classroom request?",
    answer:
      "A single classroom usually needs around 100 to 150 balls to cover every chair leg. We have delivered drops ranging from 250 balls to more than 4,000 for whole schools, so tell us the scale you need and we will work out what is available.",
  },
  {
    question: "Where do you deliver tennis balls?",
    answer:
      "Bounce Back operates in the San Francisco Bay Area, and our collection partners are tennis clubs and academies across the region. If you are outside that area, email us anyway — we can talk about shipping or about starting a chapter near you.",
  },
  {
    question: "My tennis club has used balls. How do we donate them?",
    answer:
      "Clubs, academies, and facilities can arrange a pickup by emailing outreach@bintobetter.org. We collect used balls during active collection months, sort them, and route usable ones to schools, shelters, and assisted living centers.",
  },
];

/** FAQPage schema built from the same source as the visible list, so the two cannot drift. */
export function bounceBackFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bounceBackFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
