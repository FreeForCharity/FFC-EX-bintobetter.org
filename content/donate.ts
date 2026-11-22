export const donate = {
  // ── Hero ────────────────────────────────────────────────
  heroEyebrow: "Donate",
  heroHeading: "Every event we run is free.",
  heroPara:
    "Collection drives, school drop-offs, electronics workshops, cleanups: we never charge a single person to take part. Our student volunteers put in countless hours of their own time to make that happen. Donations cover the rest: the bags, the cutting tools, the gas, and the miles between a tennis club and a classroom.",
  heroStats: [
    { value: "$0", label: "Cost to attend any of our events" },
    { value: "74,000+", label: "Tennis balls repurposed" },
    { value: "30,000+", label: "Balls donated to schools and shelters" },
  ],

  // ── Impact tiers (Bounce Back fundraiser) ───────────────
  // Rate the org gave: every $1 puts 10 tennis balls on classroom chair legs.
  // Keep `balls` in step with `amount` if the rate ever changes.
  impactEyebrow: "Bounce Back Fundraiser",
  impactHeading: "See exactly what your gift does",
  impactIntro:
    "Every dollar puts ten repurposed tennis balls on the chair legs of a school in need: quieter classrooms, protected floors, and one less ball in a landfill.",
  ballsPerDollar: 10,
  tiers: [
    { amount: 10, balls: 100 },
    { amount: 25, balls: 250 },
    { amount: 50, balls: 500, featured: true },
    { amount: 100, balls: 1000 },
    { amount: 250, balls: 2500 },
  ] as { amount: number; balls: number; featured?: boolean }[],
  impactNote:
    "Pick any amount on the donation page. Every amount counts, and every gift goes to the same place: more balls on more chairs.",

  // ── Closing CTA ─────────────────────────────────────────
  donateHeading: "Ready to help?",
  donatePara:
    "Your support helps us turn waste into opportunity. Donations allow us to expand collection efforts, run workshops, purchase supplies, and reach more communities. Donations are processed through PledgeIt; the checkout page may show Ecologistics as the fiscal sponsor or payment recipient. Please review the checkout and receipt language for tax details before completing a donation.",
  donateHref: "https://charity.pledgeit.org/bintobetter",
  donateLinkText: "Donate via PledgeIt",

  // ── Tennis lessons fundraiser ───────────────────────────
  classesIntro:
    "Community tennis lessons help fund collection supplies, workshop materials, and recycling costs. Complete the registration form to schedule a free trial lesson.",
  tennis: {
    title: "Tennis Classes",
    description:
      "Taught by varsity high school tennis players for beginner and intermediate players. Families receive scheduling, location, price, supervision, and cancellation details through the registration form before confirming a lesson.",
    note: "A parent or guardian should complete the form for younger students.",
    href: "https://tinyurl.com/tennisregis",
  },
};
