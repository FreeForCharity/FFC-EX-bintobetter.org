/**
 * Logos in the partner wall. `name` becomes the image alt text; the extracted
 * logos below have no confirmed organisation name yet, so they stay decorative
 * (empty alt) rather than repeating "Partner logo" fourteen times to a screen
 * reader. Fill in a `name` as each one is identified.
 *
 * Sun Dragon Computers and eWasteDirect are intentionally absent — they get a
 * full write-up in `corporatePartners` further down this file, and listing them
 * here rendered each logo twice on the same page.
 */
export const partnerLogos: { src: string; name?: string }[] = [
  { src: "/partners-logos/page-21-xref-82.png", name: "Partner logo pending confirmation" },
  { src: "/partners-logos/page-21-xref-84.png", name: "Los Gatos Swim and Racquet Club" },
  { src: "/partners-logos/page-22-xref-87.png", name: "NorCal Tennis Academy" },
  { src: "/partners-logos/page-22-xref-88.png", name: "Mountain View Tennis" },
  { src: "/partners-logos/page-23-xref-91.png", name: "Lifetime Activities" },
  { src: "/partners-logos/page-23-xref-92.png", name: "Kim Grant Tennis Academy" },
  { src: "/partners-logos/page-23-xref-94.png", name: "Cupertino Hills Swim and Racquet Club" },
  { src: "/partners-logos/page-24-xref-97.png", name: "Partner logo pending confirmation" },
  { src: "/partners-logos/page-24-xref-99.png", name: "Kona Kai Swim and Racquet Club" },
  { src: "/partners-logos/page-25-xref-102.png", name: "Allie's Doggie Day Camp" },
  { src: "/partners-logos/page-26-xref-105.png", name: "Lucky Buddies Pet Sitting" },
  { src: "/partners-logos/page-26-xref-106.png", name: "Furrtropolis" },
];

export const whyPartner: string[] = [
  "Redirect usable materials to schools, shelters, and community organizations.",
  "Support education through hands-on sustainability projects and workshops.",
  "Show visible community commitment through collection and reuse programs.",
];

/**
 * `logo` is optional: a partner with no supplied artwork renders as a wordmark
 * rather than a broken image. Drop a file in public/partners-logos/ and set
 * `logo` to swap it in — nothing else needs to change.
 */
export const corporatePartners: { name: string; logo?: string; note: string; href?: string }[] = [
  {
    name: "Free For Charity",
    href: "https://freeforcharity.org",
    note: "Free For Charity is Bin to Better's fiscal sponsor, providing our 501(c)(3) status (EIN 46-2471893) along with the hosting, infrastructure, and nonprofit back-office support that let a student-led team spend its time on programs instead of paperwork.",
  },
  {
    name: "Sun Dragon Computers",
    logo: "/partners-logos/sun-dragon-computers.png",
    note: "Sun Dragon Computers supports Bin to Better's technology reuse work. Contact outreach@bintobetter.org if your organization can provide devices, repair support, mentorship, recycling support, or workshop materials.",
  },
  {
    name: "eWasteDirect.com",
    logo: "/partners-logos/ewaste-direct.webp",
    note: "eWaste Direct partners with us on Tech to Treasure, making sure every device that passes through our workshops is recycled responsibly through certified e-waste channels.",
  },
];

export const tennisClubs: string[] = [
  "Mission Hills Swim and Racquet Club",
  "Los Gatos Swim and Racquet Club",
  "NorCal Tennis Academy",
  "Mountain View Tennis",
  "Lifetime Activities – Santa Clara & Sunnyvale",
  "Kim Grant Tennis Academy",
  "Cupertino Hills Swim & Racquet Club",
  "Kona Kai Swim & Racquet Club",
  "San José Swim & Racquet Club",
];

export const animalShelters: string[] = [
  "Allie's Doggie Day Camp",
  "Lucky Buddies Pet Sitting",
  "Furrtropolis",
  "A Pet Villa Dog Boarding and Grooming",
];
