import { site, absoluteUrl } from "@/content/site";

/**
 * Structured data (schema.org / JSON-LD) for the site.
 *
 * Everything asserted here has to be true and verifiable on the page that
 * carries it — Google treats schema that contradicts visible content as spam,
 * and the penalty is losing rich results across the whole domain.
 *
 * Deliberately NOT claimed: `NGO`, `NonprofitStatus`, `taxID`, or any
 * fiscal-sponsorship relationship. Those claims were stripped from the visible
 * site on purpose; re-introducing them as invisible markup would be the same
 * claim in a form nobody reviews, and __tests__/legal.test.tsx fails the build
 * if they reappear. Plain `Organization` says only what the site itself says.
 */

/** Stable @id so other nodes can reference the org instead of restating it. */
export const ORG_ID = `${site.url}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/logo.webp"),
  image: absoluteUrl("/logo.webp"),
  description:
    "Student-led reuse programs that keep tennis balls, electronics, and plastics out of landfills by getting them to schools, shelters, and community organizations that can still use them.",
  email: site.email,
  sameAs: [site.instagram, site.linkedin],
  // No street address: the org publishes none, and inventing one to fill a
  // recommended field is exactly the mismatch that gets markup discounted.
  areaServed: {
    "@type": "AdministrativeArea",
    name: "San Francisco Bay Area, California",
  },
  award: "2026 CRRA Outstanding School Recycling Program Award",
  knowsAbout: [
    "Tennis ball recycling",
    "Tennis ball chair leg covers for classrooms",
    "Electronic waste reuse and recycling",
    "Plastic recycling into 3D printer filament",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: absoluteUrl("/"),
  name: site.name,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

/**
 * Breadcrumbs for a subpage. Every page on this site is one level below the
 * homepage, so the trail is always Home → page. Emitting it lets search results
 * show "bintobetter.org › Bounce Back" instead of a bare URL.
 */
export function breadcrumbSchema(name: string, route: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: absoluteUrl(`${route.replace(/\/$/, "")}/`),
      },
    ],
  };
}
