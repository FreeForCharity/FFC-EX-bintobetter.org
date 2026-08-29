import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";

// Required under `output: export` — the file is written once at build time.
export const dynamic = "force-static";

// Every indexable page. /workshop, /privacy and /mailing-list are deliberately
// absent — all three are meta-refresh stubs in public/ (to /tech-to-treasure,
// /privacy-policy and /get-involved respectively), and listing a redirect in
// the sitemap is a soft error.
export const routes = [
  "",
  "/bounce-back",
  "/tech-to-treasure",
  "/eco-filament",
  "/partners",
  "/officers-and-team",
  "/achievements",
  "/get-involved",
  "/chapter",
  "/donate",
  "/privacy-policy",
  "/terms-of-service",
];

// Pages we most want crawled and ranked. Priority is a hint about relative
// importance within this site, not a ranking lever — but a flat 0.7 across
// twelve pages tells a crawler nothing, and the programme pages are the ones
// people actually search for by name.
const PRIORITY: Record<string, number> = {
  "": 1,
  "/bounce-back": 0.9,
  "/tech-to-treasure": 0.8,
  "/eco-filament": 0.8,
  "/get-involved": 0.8,
  "/partners": 0.7,
  "/privacy-policy": 0.3,
  "/terms-of-service": 0.3,
};

// The social card for each route, which is also the one image on the page that
// is guaranteed to describe it. Listing images in the sitemap is how they get
// into Google Images at all for a site with no image-heavy landing pages — and
// image search is a real entry point for "tennis ball chair legs" and
// "take apart a computer for kids", both of which people search visually.
const IMAGES: Record<string, string> = {
  "": "/og/home.jpg",
  "/bounce-back": "/og/bounce-back.jpg",
  "/tech-to-treasure": "/og/tech-to-treasure.jpg",
  "/eco-filament": "/og/eco-filament.jpg",
  "/partners": "/og/partners.jpg",
  "/officers-and-team": "/og/officers-and-team.jpg",
  "/achievements": "/og/achievements.jpg",
  "/get-involved": "/og/get-involved.jpg",
  "/chapter": "/og/chapter.jpg",
  "/donate": "/og/donate.jpg",
};

// How often a route's content actually changes. A flat "monthly" across twelve
// pages is the same non-signal as a flat priority: the programme pages gain
// events and photos, and the legal pages change when the law does.
const CHANGE_FREQUENCY: Record<string, MetadataRoute.Sitemap[number]["changeFrequency"]> = {
  "": "weekly",
  "/bounce-back": "weekly",
  "/tech-to-treasure": "weekly",
  "/eco-filament": "monthly",
  "/officers-and-team": "yearly",
  "/achievements": "yearly",
  "/privacy-policy": "yearly",
  "/terms-of-service": "yearly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Static export: this runs once at build time, so every deploy stamps the
  // build date. That is honest for a site whose content changes by redeploy,
  // and gives crawlers a recrawl signal the previous sitemap omitted entirely.
  const lastModified = new Date();

  // Trailing slashes to match the exported pages (next.config trailingSlash),
  // so sitemap URLs resolve directly instead of redirecting.
  return routes.map((r) => {
    const image = IMAGES[r];
    return {
      url: absoluteUrl(`${r}/`),
      lastModified,
      changeFrequency: CHANGE_FREQUENCY[r] ?? "monthly",
      priority: PRIORITY[r] ?? 0.6,
      ...(image ? { images: [absoluteUrl(image)] } : {}),
    };
  });
}
