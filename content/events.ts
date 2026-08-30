export const hackathon = {
  // Not held yet — the date is TBD until the org confirms one.
  datePill: "Date TBD - San Jose, CA",
  title: "Tech to Treasure Hackathon",
  tagline: "Turning ideas into impact. 8 Hours. Infinite Possibilities.",
  infoPills: [
    { label: "Date TBD", sublabel: undefined as string | undefined },
    { label: "10:00 AM - 6:00 PM", sublabel: undefined as string | undefined },
    { label: "Tully Community Branch Library", sublabel: "880 Tully Road, San Jose, CA 95111" },
  ],
  aboutParagraphs: [
    "Tech to Treasure Hackathon is an environmental hackathon powered by Bin to Better, where builders turn ideas into impact in 8 hours. From AI agents to data-driven platforms, participants work together to tackle sustainability challenges using technology.",
    "Through hands-on mentorship, workshops led by industry engineers, and real startup-level tools, join us as we build what's next!",
  ],
  mission: [
    { title: "Accessible Tech", desc: "Environmental innovation shouldn't be limited to experts." },
    { title: "Empower Builders", desc: "Tools, mentorship, and space to turn ideas into prototypes." },
    { title: "Grow Community", desc: "Connecting creators to build lasting impact together." },
  ],
  prizes: {
    top3: [
      { place: "1st Place", award: "$4000+ in credits", style: "gold" as const },
      { place: "2nd Place", award: "$400+ in credits", style: "silver" as const },
      { place: "3rd Place", award: "$200+ in credits", style: "bronze" as const },
    ],
    rest: [
      { place: "4th Place", award: "$50+ in credits" },
      { place: "5th Place", award: "$50+ in credits" },
    ],
    wolfram: { title: "Wolfram Award", desc: "WolframOne access and scholarship award details are confirmed with the sponsor." },
    // Rendered on the events page — the emphasised amount is split out so the
    // page cannot drift from this figure.
    allNoteAmount: "$1,000+",
    allNoteSuffix: "in estimated sponsor credit value and subscriptions for participants, subject to provider eligibility and redemption terms.",
  },
};

export type SponsorTier = {
  label: string;
  size: "xl" | "lg" | "md" | "sm";
  sponsors: { name: string; src: string; href: string }[];
};

export const sponsorTiers: SponsorTier[] = [
  {
    label: "Tier 1",
    size: "xl",
    sponsors: [
      { name: "Glid Tech", src: "/sponsors/image8.png", href: "https://www.glidtech.us/" },
      { name: "Wolfram", src: "/sponsors/image12.png", href: "https://www.wolfram.com/" },
    ],
  },
  {
    label: "Tier 2",
    size: "lg",
    sponsors: [
      { name: "YRI Science", src: "/sponsors/image13.png", href: "https://www.yriscience.com" },
      { name: "Momen", src: "/sponsors/image5.png", href: "https://momen.app/" },
      { name: "CodeCrafters", src: "/sponsors/image10.png", href: "https://codecrafters.io/" },
      { name: "Featherless AI", src: "/sponsors/image9.png", href: "https://featherless.ai/" },
      { name: "Mobbin", src: "/sponsors/image4.png", href: "https://mobbin.com" },
    ],
  },
  {
    label: "Tier 3",
    size: "md",
    sponsors: [
      { name: "CleanShot X", src: "/sponsors/image20.png", href: "https://cleanshot.com/" },
      { name: "Relay.app", src: "/sponsors/image19.png", href: "https://relay.app" },
      { name: "NordPass", src: "/sponsors/image3.png", href: "https://nordpass.com/" },
      { name: "NordVPN", src: "/sponsors/image6.png", href: "https://nordvpn.com/" },
      { name: "NordProtect", src: "/sponsors/image14.png", href: "https://nordprotect.com" },
      { name: "Saily", src: "/sponsors/image2.png", href: "https://saily.com" },
    ],
  },
  {
    label: "Tier 4",
    size: "sm",
    sponsors: [
      { name: "Incogni", src: "/sponsors/image11.png", href: "https://incogni.com/" },
      { name: ".xyz", src: "/sponsors/image16.png", href: "https://gen.xyz" },
      { name: "Nexos.ai", src: "/sponsors/image1.png", href: "https://nexos.ai" },
    ],
  },
];

export const impactTimeline = [
  {
    date: "August 29, 2025",
    category: "Collection",
    title: "4,000+ Tennis Balls Collected",
    location: "Community partners",
    result: "Bounce Back collected more than 4,000 used tennis balls and prepared them for reuse instead of disposal.",
  },
  {
    date: "September 21, 2025",
    category: "Donation",
    title: "4,000+ Tennis Balls Donated",
    location: "Community organizations",
    result: "More than 4,000 repurposed tennis balls were donated, giving used materials a meaningful second life.",
  },
  {
    date: "October 26, 2025",
    category: "Workshop",
    title: "Tech to Treasure Computer Workshop",
    location: "Fremont, CA",
    result: "Students explored computer components, hardware systems, and responsible electronics reuse.",
  },
  {
    date: "November 6, 2025",
    category: "Donation",
    title: "School Tennis Ball Drop-Off",
    location: "Schools",
    result: "More than 1,500 repurposed tennis balls were donated for classroom chair-leg covers.",
  },
  {
    date: "November 16, 2025",
    category: "Cleanup",
    title: "Eco-Filament Community Cleanup",
    location: "Fremont, CA",
    result: "Volunteers collected plastic waste from public spaces to support Eco-Filament material recovery.",
  },
  {
    date: "Week of November 16, 2025",
    category: "Collection",
    title: "2,500+ Tennis Balls Collected",
    location: "Kim Grant Tennis, Kona Kai, Lifetime Activities Cupertino and Sunnyvale",
    result: "More than 2,500 used tennis balls entered Bounce Back's sorting and repurposing process.",
  },
  {
    date: "January 3, 2026",
    category: "Donation",
    title: "2,850 Tennis Balls Donated",
    location: "Community partners",
    result: "Bounce Back donated 2,850 repurposed tennis balls and extended the usefulness of recovered materials.",
  },
  {
    date: "January 8, 2026",
    category: "Collection",
    title: "3,700+ Tennis Balls Collected",
    location: "Community partners",
    result: "More than 3,700 used tennis balls were collected for sorting, processing, and reuse.",
  },
  {
    date: "January 25, 2026",
    category: "Cleanup",
    title: "Central Park Trash Pickup",
    location: "Central Park, Fremont",
    result: "More than 30 volunteers contributed over 60 service hours and collected more than 15 bags of trash.",
  },
  {
    date: "January 31, 2026",
    category: "Workshop",
    title: "Virtual Tech to Treasure Workshop",
    location: "Online",
    result: "Students followed a guided computer disassembly and learned how major components work together.",
  },
  {
    date: "February 17, 2026",
    category: "Donation",
    title: "2,500 Tennis Balls Donated",
    location: "Community partners",
    result: "Bounce Back donated 2,500 repurposed tennis balls to keep valuable materials in use.",
  },
  {
    date: "February 24, 2026",
    category: "Collection",
    title: "4,200+ Tennis Balls Collected",
    location: "Community partners",
    result: "More than 4,200 used tennis balls were collected for processing and redistribution.",
  },
  {
    date: "March 1, 2026",
    category: "Workshop",
    title: "Tech to Treasure Hands-On Workshop",
    location: "Fremont, CA",
    result: "More than 40 students and family members explored computers, monitors, 3D printers, and hardware reuse.",
  },
  {
    date: "March 26 to April 1, 2026",
    category: "Donation",
    title: "Eco-Filament Toy Drop-Off",
    location: "Community recipients",
    result: "Approximately 100 toys created with filament from recycled plastic bottles were donated.",
  },
  {
    date: "March 27, 2026",
    category: "Collection",
    title: "5,000 Tennis Balls Collected",
    location: "Community partners",
    result: "Bounce Back collected 5,000 used tennis balls and prepared them for reuse.",
  },
  {
    date: "March 29, 2026",
    category: "Cleanup",
    title: "Central Park Community Cleanup",
    location: "Central Park, Fremont",
    result: "More than 20 volunteers completed over 40 service hours and collected 15 bags of trash.",
  },
  {
    date: "April 1, 2026",
    category: "Donation",
    title: "2,120-Ball School Drop-Off",
    location: "Schools",
    result: "Bounce Back donated 2,120 repurposed tennis balls for classroom chair-leg covers.",
  },
  {
    date: "April 2 to April 14, 2026",
    category: "Donation",
    title: "Second Eco-Filament Toy Drop-Off",
    location: "Community recipients",
    result: "Approximately 100 additional toys made with filament from recycled plastic bottles were donated.",
  },
  {
    date: "April 18 to May 23, 2026",
    category: "Bootcamp",
    title: "Tech to Treasure Environmental Bootcamp",
    location: "Online and local sessions",
    result: "Fifty students worked through 10 environmental challenges across a six-week technology bootcamp.",
  },
  {
    date: "April 19, 2026",
    category: "Workshop",
    title: "In-Person Tech to Treasure Workshop",
    location: "Fremont, CA",
    result: "Students explored circuit boards, motors, routers, modems, and other electronic components.",
  },
  {
    date: "April 25, 2026",
    category: "Outreach",
    title: "LEAF Earth Day Outreach Event",
    location: "Fremont, CA",
    result: "Bin to Better shared Bounce Back, Tech to Treasure, and Eco-Filament with community members.",
  },
  {
    date: "May 19, 2026",
    category: "Donation",
    title: "Bounce Back Drop-Off",
    location: "Community partner",
    result: "More than 250 repurposed tennis balls were delivered through the Bounce Back Project.",
  },
  {
    date: "June 27, 2026",
    category: "Collection",
    title: "5,000 Tennis Balls Collected",
    location: "Partner facilities",
    result: "Approximately 5,000 used tennis balls were collected from partner facilities.",
  },
  {
    date: "June 28, 2026",
    category: "Workshop",
    title: "Tech to Treasure Workshop",
    location: "Fremont, CA",
    result: "Students explored storage technologies, electronics, sensors, embedded systems, and guided device disassembly.",
  },
  {
    date: "2026",
    category: "Award",
    title: "CRRA Outstanding School Recycling Program Award",
    location: "California Resource Recovery Association",
    result: "Recognition for student-led reuse, recycling, and community education.",
  },
];

/**
 * What is coming next, per branch, for the homepage.
 *
 * Named per branch because that is how the org described it: someone reading
 * the homepage should be able to see which programme has something coming up
 * and what they could contribute to.
 *
 * `when` is deliberately a free-text string rather than a date. Neither of
 * these has a confirmed public date — the hackathon's is genuinely undecided,
 * and the cleanup's has not been announced — and inventing one to make the
 * section look finished is the one thing this section must not do. Replace the
 * string with a real date the moment there is one; nothing else has to change.
 *
 * An event with a real date should move to `impactTimeline` once it has
 * happened, so the history below stays the record of what actually took place.
 */
export const upcomingEvents: {
  branch: string;
  title: string;
  when: string;
  location: string;
  detail: string;
}[] = [
  {
    branch: "Eco-Filament",
    title: "Community Cleanup",
    when: "Date announced soon",
    location: "Fremont, CA",
    detail:
      "A few hours of collecting litter from a local park or creek. Volunteers of any age are welcome; supplies are provided.",
  },
  {
    branch: "Tech to Treasure",
    title: "Tech to Treasure Hackathon",
    when: "Date to be confirmed",
    location: "Tully Community Branch Library, San Jose, CA",
    detail:
      "An eight-hour environmental hackathon: teams build something that addresses a sustainability problem, with mentors on hand.",
  },
];

/**
 * The most recent entries from the impact timeline, newest first.
 *
 * The homepage used to carry its own hand-written list of three milestones,
 * which meant every new event had to be added in two places and the homepage
 * quietly fell months behind the timeline. It now reads from here, so adding an
 * entry to `impactTimeline` is the only step.
 *
 * Awards are excluded: the homepage already gives the CRRA award its own card
 * beside this list, and repeating it there wastes one of the slots.
 */
export function recentImpact(count = 6) {
  return impactTimeline
    .filter((entry) => entry.category !== "Award")
    .slice(-count)
    .reverse();
}

// Legacy list kept for backwards compat
export const events: { title: string; date?: string; description: string }[] = [
  {
    title: "Tech to Treasure Hackathon",
    date: "Undecided",
    description:
      "Tech to Treasure Hackathon is an environmental hackathon powered by Bin to Better, where builders turn ideas into impact in 8 hours. From AI agents to data-driven platforms, participants work together to tackle sustainability challenges using technology. Through hands-on mentorship, workshops led by industry engineers, and real startup-level tools, join us as we build what's next!",
  },
  {
    title: "Tech to Treasure Workshop",
    date: "March 1, 2026",
    description:
      "A hands-on stations workshop for kids to touch parts, see how things work, and hear instructors explain each component. Patterson Ranch benches outside the red barn · 5298 Rancho Del Norte Dr, Fremont, CA 94555",
  },
];
