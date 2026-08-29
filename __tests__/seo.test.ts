import type { Metadata } from "next";
import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import {
  site,
  isProductionSite,
  PRODUCTION_URL,
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from "@/content/site";
import {
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  bootcampCourseSchema,
  workshopEventSchema,
  programServiceSchema,
  programListSchema,
} from "@/content/structured-data";
import {
  techToTreasureFaq,
  techToTreasureFaqSchema,
} from "@/content/tech-to-treasure-faq";
import { bounceBackFaq, bounceBackFaqSchema } from "@/content/bounce-back-faq";

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

/**
 * Every page's metadata module, keyed by route. Listed explicitly rather than
 * built from a template string, which vite's dynamic-import-vars plugin cannot
 * statically analyse. The pageRoutes() assertion in the canonical test keeps
 * this list honest: a new page that is never added here fails that test rather
 * than shipping unchecked.
 */
const PAGES: Record<string, () => Promise<{ metadata?: Metadata }>> = {
  "/": () => import("@/app/page"),
  "/achievements/": () => import("@/app/achievements/page"),
  "/bounce-back/": () => import("@/app/bounce-back/page"),
  "/chapter/": () => import("@/app/chapter/page"),
  "/donate/": () => import("@/app/donate/page"),
  "/eco-filament/": () => import("@/app/eco-filament/page"),
  "/get-involved/": () => import("@/app/get-involved/page"),
  "/officers-and-team/": () => import("@/app/officers-and-team/page"),
  "/partners/": () => import("@/app/partners/page"),
  "/privacy-policy/": () => import("@/app/privacy-policy/page"),
  "/tech-to-treasure/": () => import("@/app/tech-to-treasure/page"),
  "/terms-of-service/": () => import("@/app/terms-of-service/page"),
};

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

  // /mailing-list was an app/ route that re-exported the Get Involved page,
  // publishing identical HTML at two indexed URLs. It is a stub now, and the
  // sign-up it named is a card on Get Involved.
  it("serves /mailing-list as a stub pointing at /get-involved", () => {
    const paths = sitemap().map((e) => new URL(e.url).pathname);
    expect(paths).toContain("/get-involved/");
    expect(paths).not.toContain("/mailing-list/");

    const stub = path.join(process.cwd(), "public", "mailing-list", "index.html");
    expect(fs.existsSync(stub)).toBe(true);
    const html = fs.readFileSync(stub, "utf8");
    expect(html).toContain('http-equiv="refresh"');
    expect(html).toContain("/get-involved/");
    expect(fs.existsSync(path.join(process.cwd(), "app", "mailing-list"))).toBe(false);
  });

  /**
   * Page metadata is shallow-merged over the root layout's, so a `canonical`
   * declared in the layout is inherited rather than overridden. One set there
   * previously made every route on the site name the homepage as its canonical,
   * asking search engines to drop all of them as duplicates. Two guards: the
   * layout must not declare one, and every page must declare its own.
   */
  it("the root layout declares no canonical, so pages cannot inherit one", () => {
    const layout = fs.readFileSync(path.join(process.cwd(), "app", "layout.tsx"), "utf8");
    expect(layout).not.toMatch(/canonical:/);
  });

  // 30s, not the 5s default: this is the first test to import all thirteen page
  // modules, and on a cold Vite cache that transform alone can outrun the
  // default and fail a suite that has nothing wrong with it.
  it("every page declares its own canonical, matching its route", async () => {
    expect(Object.keys(PAGES).sort()).toEqual([...pageRoutes()].sort());

    for (const [route, load] of Object.entries(PAGES)) {
      const { metadata } = await load();
      expect(metadata?.alternates?.canonical, `${route} canonical`).toBe(route);
    }
  }, 30_000);

  /**
   * Next shallow-merges page metadata over the layout's. `openGraph` lived only
   * in the layout, so every route shared the homepage's social card: a link to
   * the tennis-ball page previewed as generic org copy. content/site.ts's
   * pageMetadata() builds all four blocks together; these guard that no page
   * goes back to declaring title/description on their own.
   */
  it("every page carries its own Open Graph and Twitter card", async () => {
    for (const [route, load] of Object.entries(PAGES)) {
      const { metadata } = await load();
      const og = metadata?.openGraph as { title?: string; description?: string } | undefined;
      const tw = metadata?.twitter as { title?: string; description?: string } | undefined;

      expect(og?.title, `${route} og:title`).toBe(metadata?.title);
      expect(og?.description, `${route} og:description`).toBe(metadata?.description);
      expect(tw?.title, `${route} twitter:title`).toBe(metadata?.title);
      expect(tw?.description, `${route} twitter:description`).toBe(metadata?.description);
    }
  });

  it("every page has a distinct, search-result-sized title and description", async () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const [route, load] of Object.entries(PAGES)) {
      const { metadata } = await load();
      const title = metadata?.title as string;
      const description = metadata?.description as string;

      // Google truncates titles around 60 characters and descriptions around
      // 160. Over the cap is not an error, but it means the tail is invisible.
      expect(title.length, `${route} title length`).toBeLessThanOrEqual(70);
      expect(description.length, `${route} description length`).toBeGreaterThan(50);
      expect(description.length, `${route} description length`).toBeLessThanOrEqual(200);

      // Duplicate titles across routes are how a site ends up with pages
      // competing for the same query, or getting folded together as near-dupes.
      titles.add(title);
      descriptions.add(description);
    }

    expect(titles.size, "duplicate titles").toBe(Object.keys(PAGES).length);
    expect(descriptions.size, "duplicate descriptions").toBe(Object.keys(PAGES).length);
  });

  it("every page renders exactly one h1", () => {
    // SectionHeading renders an h2 by default; pages that use it for their hero
    // must pass as="h1" or the page ships with no h1 at all, which is how
    // /bounce-back, /eco-filament, /partners and /tech-to-treasure lost theirs.
    const appDir = path.join(process.cwd(), "app");
    for (const route of pageRoutes()) {
      const file = route === "/"
        ? path.join(appDir, "page.tsx")
        : path.join(appDir, route.replace(/\//g, ""), "page.tsx");
      const src = fs.readFileSync(file, "utf8");

      // Legal pages get their h1 from the shared LegalPage shell.
      const usesLegalShell = src.includes("<LegalPage");
      const count = usesLegalShell
        ? 1
        : (src.match(/<h1|as="h1"/g) ?? []).length;

      expect(count, `${route} h1 count`).toBe(1);
    }
  });

  it("the sitemap declares a lastModified date for every URL", () => {
    for (const entry of sitemap()) {
      expect(entry.lastModified, `${entry.url} lastModified`).toBeInstanceOf(Date);
    }
  });

  it("structured data names the organisation and links the pages to it", () => {
    expect(organizationSchema["@type"]).toBe("Organization");
    expect(organizationSchema.name).toBe(site.name);
    expect(organizationSchema.url).toBe(`${site.url}/`);
    expect(websiteSchema.publisher).toEqual({ "@id": organizationSchema["@id"] });

    // A breadcrumb whose item URL is not the page's own canonical is worse than
    // none: it tells the crawler the trail ends somewhere the page is not.
    const crumb = breadcrumbSchema("Bounce Back Project", "/bounce-back");
    expect(crumb.itemListElement[1].item).toBe(`${site.url}/bounce-back/`);
    expect(crumb.itemListElement[0].item).toBe(`${site.url}/`);
  });

  it("the Bounce Back FAQ schema matches the questions rendered on the page", () => {
    const schema = bounceBackFaqSchema();
    expect(schema.mainEntity).toHaveLength(bounceBackFaq.length);
    expect(bounceBackFaq.length).toBeGreaterThan(0);

    for (const [i, item] of bounceBackFaq.entries()) {
      expect(schema.mainEntity[i].name).toBe(item.question);
      expect(schema.mainEntity[i].acceptedAnswer.text).toBe(item.answer);
    }

    // FAQ markup that answers a question the page does not visibly answer is a
    // structured-data violation. The page maps over this same array, so the
    // only way they drift is someone hard-coding a question into the JSX.
    const page = fs.readFileSync(
      path.join(process.cwd(), "app", "bounce-back", "page.tsx"),
      "utf8"
    );
    expect(page).toContain("bounceBackFaq.map");
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

/**
 * Event and Course markup makes claims a crawler can check against the page, so
 * these assert the shape Google requires *and* that the claims stay tied to
 * content/events.ts rather than drifting into invention.
 */
describe("workshop and bootcamp structured data", () => {
  const workshop = {
    date: "June 28, 2026",
    startDate: "2026-06-28T16:30:00-07:00",
    endDate: "2026-06-28T18:30:00-07:00",
    location: "5298 Rancho Del Norte Dr, Fremont, CA 94555",
    outcome: "Students opened a hard drive and wired up sensors.",
  };

  it("emits a valid EducationEvent for a workshop", () => {
    const schema = workshopEventSchema(workshop);
    expect(schema["@type"]).toBe("EducationEvent");
    expect(schema.startDate).toBe(workshop.startDate);
    expect(schema.endDate).toBe(workshop.endDate);
    expect(schema.description).toBe(workshop.outcome);
    expect(schema.eventStatus).toBe("https://schema.org/EventScheduled");
    expect(schema.location.address.addressLocality).toBe("Fremont");
  });

  it("ends every workshop after it starts", () => {
    const schema = workshopEventSchema(workshop);
    expect(Date.parse(schema.endDate)).toBeGreaterThan(Date.parse(schema.startDate));
  });

  it("says the workshops are free, which the page also says", () => {
    expect(workshopEventSchema(workshop).isAccessibleForFree).toBe(true);
  });

  it("attributes the bootcamp and the workshops to the one organisation node", () => {
    expect(bootcampCourseSchema.provider).toEqual({ "@id": organizationSchema["@id"] });
    expect(workshopEventSchema(workshop).organizer).toEqual({
      "@id": organizationSchema["@id"],
    });
  });

  it("publishes a contact point carrying the address the site displays", () => {
    expect(organizationSchema.contactPoint.email).toBe(site.email);
  });
});

/**
 * Social cards and the assets behind them.
 *
 * Every route used to declare /logo.webp as its card, at a size that was not
 * even that file's size — so a link to the tennis-ball page, the workshops page
 * and the donate page all previewed identically, and unfurlers laid the preview
 * out from wrong dimensions. These pin the replacement: a real 1200x630 card
 * per route, and no route silently pointing at a file that is not there.
 */
describe("social cards", () => {
  const ogDir = path.join(process.cwd(), "public", "og");

  /** Minimal JPEG SOF parser — enough to read a baseline JPEG's dimensions. */
  function jpegSize(file: string): { width: number; height: number } {
    const buffer = fs.readFileSync(file);
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
    throw new Error(`no SOF marker in ${file}`);
  }

  it("every generated card is exactly the size the metadata declares", () => {
    const cards = fs.readdirSync(ogDir);
    expect(cards.length).toBeGreaterThan(0);

    for (const card of cards) {
      const { width, height } = jpegSize(path.join(ogDir, card));
      expect({ card, width, height }).toEqual({
        card,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
      });
    }
  });

  it("every page's card file exists in public/", async () => {
    for (const [route, load] of Object.entries(PAGES)) {
      const { metadata } = await load();
      const og = metadata?.openGraph as { images?: { url: string }[] } | undefined;
      const url = og?.images?.[0]?.url as string;

      const relative = url.replace(site.url, "").replace(/^\//, "");
      expect(fs.existsSync(path.join(process.cwd(), "public", relative)), `${route} card`).toBe(
        true
      );
    }
  });

  it("gives the programme pages cards of their own, not the default", async () => {
    const distinct = new Set<string>();
    for (const route of ["/bounce-back/", "/tech-to-treasure/", "/eco-filament/"]) {
      const { metadata } = await PAGES[route]();
      const og = metadata?.openGraph as { images?: { url: string }[] } | undefined;
      const url = og?.images?.[0]?.url as string;
      expect(url).not.toContain(DEFAULT_OG_IMAGE);
      distinct.add(url);
    }
    expect(distinct.size).toBe(3);
  });

  it("lists a card for each programme page in the sitemap", () => {
    const entries = new Map(sitemap().map((e) => [e.url, e]));
    for (const route of ["/bounce-back/", "/tech-to-treasure/", "/eco-filament/"]) {
      const entry = entries.get(absoluteUrl(route));
      expect(entry?.images?.length, route).toBeGreaterThan(0);
    }
  });
});

describe("programme structured data", () => {
  const service = programServiceSchema({
    name: "Bounce Back",
    description: "Free repurposed tennis balls for classroom chair legs.",
    route: "/bounce-back",
    serviceType: "Material reuse and donation",
    audience: "Teachers and schools",
  });

  it("ties each programme to the one organisation node", () => {
    expect(service.provider).toEqual({ "@id": organizationSchema["@id"] });
  });

  it("prices the programmes at zero, which is what the pages say", () => {
    expect(service.offers.price).toBe("0");
  });

  it("points at the canonical, trailing-slash URL for the page", () => {
    expect(service.url).toBe(absoluteUrl("/bounce-back/"));
  });

  it("lists the three programmes in order with resolvable URLs", () => {
    const list = programListSchema([
      { title: "A", blurb: "a", href: "/bounce-back" },
      { title: "B", blurb: "b", href: "/tech-to-treasure" },
    ]);
    expect(list.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(list.itemListElement[0].url).toBe(absoluteUrl("/bounce-back/"));
  });

  it("the Tech to Treasure FAQ schema matches the questions rendered on the page", () => {
    const schema = techToTreasureFaqSchema();
    expect(schema.mainEntity).toHaveLength(techToTreasureFaq.length);
    expect(techToTreasureFaq.length).toBeGreaterThan(0);

    for (const [i, item] of techToTreasureFaq.entries()) {
      expect(schema.mainEntity[i].name).toBe(item.question);
      expect(schema.mainEntity[i].acceptedAnswer.text).toBe(item.answer);
    }

    // Same guard as the Bounce Back FAQ: the page maps over this array, so the
    // only way markup and page drift is a question hard-coded into the JSX.
    const page = fs.readFileSync(
      path.join(process.cwd(), "app", "tech-to-treasure", "page.tsx"),
      "utf8"
    );
    expect(page).toContain("techToTreasureFaq.map");
  });
});
