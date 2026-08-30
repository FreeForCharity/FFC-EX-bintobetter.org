export const programLinks: { label: string; href: string }[] = [
  { label: "Bounce Back", href: "/bounce-back" },
  { label: "Tech to Treasure", href: "/tech-to-treasure" },
  { label: "Eco-Filament", href: "/eco-filament" },
];

// "Impact & Events" (/events) is pulled for now at the org's request. The page
// content still lives in content/events.ts — restore the route and this entry
// together when it comes back.
//
// Order is the org's: Programs, Team, Get Involved, Partners, with Support Us
// rendered after these as the standing call to action. It runs from what we do,
// through who does it, to how a visitor joins in — Partners sits last because
// it is the one entry aimed at organisations rather than at the person reading.
// The mobile menu and the desktop bar both read this array, so they cannot
// disagree about the order.
export const navLinks: { label: string; href: string }[] = [
  { label: "Team", href: "/officers-and-team" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Partners", href: "/partners" },
];
