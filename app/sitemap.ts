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

export default function sitemap(): MetadataRoute.Sitemap {
  // Static export: this runs once at build time, so every deploy stamps the
  // build date. That is honest for a site whose content changes by redeploy,
  // and gives crawlers a recrawl signal the previous sitemap omitted entirely.
  const lastModified = new Date();

  // Trailing slashes to match the exported pages (next.config trailingSlash),
  // so sitemap URLs resolve directly instead of redirecting.
  return routes.map((r) => ({
    url: absoluteUrl(`${r}/`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: PRIORITY[r] ?? 0.6,
  }));
}
