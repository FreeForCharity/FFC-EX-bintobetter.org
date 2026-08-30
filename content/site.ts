/** The live public site. Anything else is a test or preview deployment. */
export const PRODUCTION_URL = "https://bintobetter.org";

export const site = {
  name: "Bin to Better",
  // Single source of truth for absolute URLs (metadataBase, sitemap, robots).
  //
  // Defaults to the production domain deliberately: if the env var is ever
  // missing, canonical URLs and the sitemap still point at production instead
  // of sending crawlers to a test deployment. The test site
  // (bin2b.vercel.app) sets NEXT_PUBLIC_SITE_URL to its own origin.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL,
  tagline:
    "Turning waste into opportunity. One item at a time, one community at a time.",
  email: "outreach@bintobetter.org",
  instagram: "https://www.instagram.com/_bintobetter",
  linkedin: "https://www.linkedin.com/company/bin-to-better/posts/?feedView=all",
};

/**
 * Footer copyright line. The year was hard-coded as "2026", which silently goes
 * stale the moment the calendar turns. The site is a static export, so this is
 * evaluated at build time — every deploy stamps the current year without anyone
 * remembering to edit it.
 */
export const copyright = `Copyright ${new Date().getFullYear()} ${site.name}. All rights reserved. Turning waste into opportunity.`;

/**
 * The minimum age to use a service we link out to but do not control.
 * Discord's own terms set 13; COPPA draws the same line for collecting personal
 * information without verifiable parental consent.
 */
export const MIN_UNSUPERVISED_AGE = 13;

/**
 * Path prefix the site is served under. Empty on the apex domain; "/<repo>" on
 * a GitHub project page. next.config.ts feeds the same variable to `basePath`,
 * so absolute URLs built for the sitemap and robots have to include it or they
 * point one directory too high on project-page deployments.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Absolute URL for a route, accounting for origin and basePath. */
export function absoluteUrl(route: string): string {
  return `${site.url}${BASE_PATH}${route}`;
}

/**
 * `alternates` block for a page's metadata, naming that page as its own
 * canonical.
 *
 * Next merges page metadata over the root layout's, so a `canonical` set once
 * in the layout is inherited verbatim by every page rather than overridden —
 * which is how every route on this site ended up declaring the homepage as its
 * canonical and asking search engines to drop it as a duplicate. Canonicals
 * therefore live on the pages, never on the layout.
 *
 * The path is relative; `metadataBase` resolves it against the configured
 * origin. The trailing slash matches next.config's `trailingSlash`, so the
 * canonical URL is the URL that actually serves the page instead of one that
 * redirects to it.
 */
export function canonicalFor(route: string) {
  const path = route === "/" ? "/" : `${route.replace(/\/$/, "")}/`;
  return { canonical: `${BASE_PATH}${path}` };
}

/**
 * True only on the live site. Test and preview deployments serve the same
 * content, so they are kept out of search results entirely rather than
 * competing with production for it — see app/robots.ts and app/layout.tsx.
 */
export function isProductionSite(url: string = site.url): boolean {
  return url === PRODUCTION_URL;
}

/**
 * Full metadata block for a page: canonical, title, description, and the
 * Open Graph / Twitter cards that go with them.
 *
 * Pages previously declared only `alternates`, `title` and `description`. Next
 * shallow-merges page metadata over the layout's, and `openGraph` was declared
 * only in the layout — so every route on the site shared the homepage's social
 * card. Sharing a link to the tennis-ball page in a teacher's group chat
 * produced a preview about the organisation in general, which is both a worse
 * click and a wasted one. Building all four here keeps them in step by
 * construction.
 *
 * `title` and `description` are the page's own; the suffix and the card
 * plumbing are added once, here.
 */
/**
 * Every social card is 1200x630, the ratio every platform crops toward. They
 * are built from real photographs of the programme they belong to by
 * scripts/generate-og-images.mjs (`pnpm og`) and committed under public/og.
 *
 * Before this, `image` defaulted to /logo.webp for every route, so a link to
 * the tennis-ball page, the workshops page and the donate page all previewed
 * identically — and logo.webp has a transparent background, which unfurlers
 * composite onto black rather than onto the page's cream.
 */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE = "/og/home.jpg";

export function pageMetadata({
  title,
  description,
  route,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
}: {
  title: string;
  description: string;
  route: string;
  image?: string;
  /** Describes the card itself. Falls back to the page title. */
  imageAlt?: string;
}) {
  const url = absoluteUrl(route === "/" ? "/" : `${route.replace(/\/$/, "")}/`);
  const fullTitle = `${title} | ${site.name}`;

  // Absolute, via absoluteUrl, rather than left root-relative. metadataBase
  // resolves a relative card image against the origin only — it does not add
  // BASE_PATH — so on a GitHub project-page deployment "/logo.webp" would point
  // one directory above the site and every social preview would 404.
  const imageUrl = absoluteUrl(image);

  return {
    alternates: canonicalFor(route),
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: imageAlt ?? title,
        },
      ],
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
