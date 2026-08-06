import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import { site, isProductionSite, PRODUCTION_URL } from "@/content/site";

/**
 * `content/site.ts` resolves its origin from NEXT_PUBLIC_SITE_URL at import
 * time, so any test asserting on that origin has to set the variable itself
 * rather than read whatever the ambient environment happens to have. The
 * preview deployment sets NEXT_PUBLIC_SITE_URL, which previously turned this
 * suite red there for no reason. Re-importing under a stubbed env pins the
 * behaviour under test to the case it names.
 */
async function siteModuleWith(url: string | undefined) {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", url);
  vi.resetModules();
  return {
    site: await import("@/content/site"),
    robots: (await import("@/app/robots")).default,
  };
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

// Every directory under app/ that renders a page. Derived from the filesystem so
// a new page that never gets added to the sitemap fails this test instead of
// silently going unindexed.
function pageRoutes(): string[] {
  const appDir = path.join(process.cwd(), "app");
  const routes = ["/"];
  for (const entry of fs.readdirSync(appDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (!fs.existsSync(path.join(appDir, entry.name, "page.tsx"))) continue;
    routes.push(`/${entry.name}/`);
  }
  return routes;
}

describe("seo", () => {
  it("sitemap covers every page route exactly once", () => {
    const urls = sitemap().map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);

    const paths = urls.map((u) => new URL(u).pathname);
    expect([...paths].sort()).toEqual([...pageRoutes()].sort());
  });

  it("sitemap excludes the /workshop redirect, which is a static file", () => {
    const paths = sitemap().map((e) => new URL(e.url).pathname);
    expect(paths).not.toContain("/workshop/");

    // GitHub Pages cannot serve a 301, so /workshop is a meta-refresh page in
    // public/ rather than an app route calling redirect() — which a static
    // export turns into an error page.
    const redirectFile = path.join(process.cwd(), "public", "workshop", "index.html");
    expect(fs.existsSync(redirectFile)).toBe(true);
    const html = fs.readFileSync(redirectFile, "utf8");
    expect(html).toContain('http-equiv="refresh"');
    expect(html).toContain("/tech-to-treasure/");
    expect(fs.existsSync(path.join(process.cwd(), "app", "workshop"))).toBe(false);
  });

  // /privacy moved to /privacy-policy so the footer satisfies the Free For
  // Charity compliance smoke. Inbound links to the old path must still land.
  it("keeps /privacy alive as a stub pointing at /privacy-policy", () => {
    const paths = sitemap().map((e) => new URL(e.url).pathname);
    expect(paths).toContain("/privacy-policy/");
    expect(paths).not.toContain("/privacy/");

    const stub = path.join(process.cwd(), "public", "privacy", "index.html");
    expect(fs.existsSync(stub)).toBe(true);
    const html = fs.readFileSync(stub, "utf8");
    expect(html).toContain('http-equiv="refresh"');
    expect(html).toContain("/privacy-policy/");
    expect(fs.existsSync(path.join(process.cwd(), "app", "privacy"))).toBe(false);
  });

  it("every sitemap URL ends in a slash, matching the exported pages", () => {
    for (const entry of sitemap()) {
      expect(entry.url.endsWith("/")).toBe(true);
    }
  });

  it("sitemap URLs are absolute and share the configured site origin", () => {
    for (const entry of sitemap()) {
      expect(entry.url.startsWith(site.url)).toBe(true);
    }
  });

  it("defaults to the production origin so a missing env var cannot mispoint production", async () => {
    const { site: fresh } = await siteModuleWith(undefined);
    expect(fresh.site.url).toBe(fresh.PRODUCTION_URL);
    expect(fresh.isProductionSite()).toBe(true);
  });

  it("robots allows crawling and references the sitemap on production", async () => {
    const { site: fresh, robots: freshRobots } = await siteModuleWith(undefined);
    const r = freshRobots();
    expect(r.sitemap).toBe(`${fresh.site.url}/sitemap.xml`);
    expect(r.rules).toMatchObject({ allow: "/" });
  });

  // The other half of the same switch: a preview origin must be disallowed
  // outright and must advertise no sitemap, or it competes with production for
  // ranking. Previously untested because the suite only ever ran unstubbed.
  it("robots disallows crawling and omits the sitemap on a preview origin", async () => {
    const { robots: freshRobots } = await siteModuleWith("https://bin2b.vercel.app");
    const r = freshRobots();
    expect(r.sitemap).toBeUndefined();
    expect(r.rules).toMatchObject({ disallow: "/" });
  });

  it("treats any non-production origin as a test deployment", () => {
    expect(isProductionSite("https://bin2b.vercel.app")).toBe(false);
    expect(isProductionSite("https://b2b-git-preview.vercel.app")).toBe(false);
    expect(isProductionSite(PRODUCTION_URL)).toBe(true);
  });
});
