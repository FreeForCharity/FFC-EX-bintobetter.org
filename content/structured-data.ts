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
  // The address is displayed in full next to every contact button on the site,
  // so this repeats a visible fact rather than adding an invisible one. It is
  // also what lets a search result surface a way to reach us without a click.
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: site.email,
    availableLanguage: "English",
    areaServed: "US",
  },
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

/**
 * A past workshop, as an `EducationEvent`.
 *
 * These sessions are the thing people search for by name ("e-waste workshop for
 * kids near me", "take apart a computer class Fremont") and the pages describing
 * them carried no event markup at all, so they competed for those searches on
 * body copy alone. Every field below is visible on /tech-to-treasure: the date,
 * the address, the free admission, and the description that leads the card.
 *
 * `eventStatus` stays `EventScheduled` — these ran as planned. Sessions that are
 * cancelled or moved must say so here too, or the markup contradicts the page.
 */
export function workshopEventSchema(workshop: {
  date: string;
  startDate: string;
  endDate: string;
  location: string;
  outcome: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: `Tech to Treasure Workshop — ${workshop.date}`,
    description: workshop.outcome,
    startDate: workshop.startDate,
    endDate: workshop.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    location: {
      "@type": "Place",
      name: workshop.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Fremont",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    organizer: { "@id": ORG_ID },
    image: absoluteUrl("/workshops/group-photo.webp"),
  };
}

/**
 * The six-week environmental bootcamp, as a `Course`.
 *
 * Same reasoning as the workshops: it is a real, named, repeatable program with
 * a described outcome, and describing it only in prose left it invisible to the
 * one result type built for exactly this.
 */
export const bootcampCourseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Tech to Treasure Environmental Bootcamp",
  description:
    "A six-week bootcamp where students build technology projects against ten environmental challenges, with mentorship throughout. Final projects are published publicly.",
  provider: { "@id": ORG_ID },
  url: absoluteUrl("/tech-to-treasure/"),
  inLanguage: "en-US",
  // No `isAccessibleForFree` here, unlike the workshops: the workshops page
  // says in as many words that the sessions are free, and it says nothing
  // either way about the bootcamp. Markup may only repeat what the page states.
  educationalLevel: "Beginner",
  teaches: [
    "Building software projects for environmental problems",
    "Electronics and hardware reuse",
    "Working with mentors on a multi-week project",
  ],
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: ["online", "onsite"],
    courseWorkload: "P6W",
    location: {
      "@type": "Place",
      name: "Fremont, CA and online",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Fremont",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
  },
};

/**
 * A programme, as a `Service`.
 *
 * The three programme pages are the ones people reach by describing what they
 * need rather than by naming us — "free tennis balls for chair legs", "e-waste
 * workshop for kids", "what to do with plastic bottles". A `Service` node ties
 * each page to the organisation, says what is offered, where, and that it costs
 * nothing, which is exactly the set of facts those searches are asking about.
 *
 * `price: "0"` is a claim the pages make in plain English; if a programme ever
 * charges, this has to change with it.
 */
export function programServiceSchema({
  name,
  description,
  route,
  serviceType,
  audience,
}: {
  name: string;
  description: string;
  route: string;
  serviceType: string;
  audience: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(`${route.replace(/\/$/, "")}/`),
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "San Francisco Bay Area, California",
    },
    audience: { "@type": "Audience", audienceType: audience },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * The three programmes as a list, emitted on the homepage.
 *
 * Google builds sitelinks from what it can tell are the site's main sections.
 * The homepage links to all three in prose and cards; naming them as an ordered
 * list with their URLs says the same thing in the one form a crawler cannot
 * misread.
 */
export function programListSchema(
  programs: { title: string; blurb: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} programs`,
    itemListElement: programs.map((program, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: program.title,
      description: program.blurb,
      url: absoluteUrl(`${program.href.replace(/\/$/, "")}/`),
    })),
  };
}
