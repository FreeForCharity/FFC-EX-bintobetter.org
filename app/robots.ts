import type { MetadataRoute } from "next";
import { site, isProductionSite } from "@/content/site";

// Required under `output: export` — the file is written once at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Test and preview deployments serve the same pages as production. Left
  // crawlable they would be indexed as near-duplicates and split ranking with
  // the real site, so they are disallowed outright and advertise no sitemap.
  if (!isProductionSite()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
