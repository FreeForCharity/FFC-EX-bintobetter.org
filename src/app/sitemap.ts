import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";

// Required under `output: export` — the file is written once at build time.
export const dynamic = "force-static";

// Every indexable page. /workshop and /privacy are deliberately absent — both
// are meta-refresh stubs in public/ (to /tech-to-treasure and /privacy-policy
// respectively), and listing a redirect in the sitemap is a soft error.
export const routes = [
  "",
  "/bounce-back",
  "/tech-to-treasure",
  "/eco-filament",
  "/partners",
  "/officers-and-team",
  "/events",
  "/achievements",
  "/get-involved",
  "/mailing-list",
  "/chapter",
  "/donate",
  "/privacy-policy",
  "/terms-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Trailing slashes to match the exported pages (next.config trailingSlash),
  // so sitemap URLs resolve directly instead of redirecting.
  return routes.map((r) => ({
    url: absoluteUrl(`${r}/`),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
}
