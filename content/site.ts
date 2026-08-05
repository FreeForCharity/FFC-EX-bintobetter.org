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
  copyright: "Copyright 2026 Bin to Better. All rights reserved. Turning waste into opportunity.",
};

/**
 * Bin to Better does not hold its own IRS determination — it operates under
 * Free For Charity's. Donors verifying tax-deductible status look up the
 * sponsor's EIN, not ours, so the footer states whose EIN it is rather than
 * printing a bare number that would read as Bin to Better's own.
 *
 * VERIFY BEFORE DEPLOY: this asserts a sponsorship relationship and a tax ID in
 * public. Confirm both against the current FFC agreement.
 */
export const fiscalSponsor = {
  name: "Free For Charity",
  ein: "46-2471893",
  url: "https://freeforcharity.org",
};

/**
 * The minimum age to use a service we link out to but do not control.
 * Discord's own terms set 13; COPPA draws the same line for collecting personal
 * information without verifiable parental consent.
 */
export const MIN_UNSUPERVISED_AGE = 13;

/**
 * True only on the live site. Test and preview deployments serve the same
 * content, so they are kept out of search results entirely rather than
 * competing with production for it — see app/robots.ts and app/layout.tsx.
 */
export function isProductionSite(url: string = site.url): boolean {
  return url === PRODUCTION_URL;
}
