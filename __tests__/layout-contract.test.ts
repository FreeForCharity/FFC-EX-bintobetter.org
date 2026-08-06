import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * The repository layout is a contract with FFC's fleet automation, not just a
 * matter of taste.
 *
 * FFC-Cloudflare-Automation/scripts/analytics-wire.ps1 (driven by workflow
 * "704. Website - Analytics Wire") classifies a site as a Next.js template site
 * only when it finds BOTH package.json and src/ at the repo root, and throws
 * "Could not classify site type" otherwise. It then rewrites the tracking ids
 * in src/lib/analytics.config.ts and rewires
 * src/components/google-tag-manager/index.tsx, matching on exact regexes.
 *
 * This repo silently dropped out of that automation once before: a redesign
 * replaced src/ with a root-level app/ + components/ layout — inherited from a
 * separately scaffolded create-next-app project rather than chosen — and
 * nothing failed until someone went looking. These assertions make that a red
 * test instead of a silent gap.
 *
 * If the layout genuinely needs to change, update 704 in the automation repo
 * first, then this test.
 */
const root = process.cwd();
const read = (...p: string[]) => fs.readFileSync(path.join(root, ...p), "utf8");
const exists = (...p: string[]) => fs.existsSync(path.join(root, ...p));

describe("FFC template layout contract", () => {
  it("is detectable as a template site (package.json + src/)", () => {
    expect(exists("package.json")).toBe(true);
    expect(exists("src")).toBe(true);
  });

  it("keeps the site tree under src/", () => {
    for (const dir of ["app", "components", "content", "lib"]) {
      expect(exists("src", dir), `src/${dir} is missing`).toBe(true);
      // The pre-move root-level copies must not linger; two trees would let
      // imports resolve to whichever the alias happens to point at.
      expect(exists(dir), `stale root-level ${dir}/ still present`).toBe(false);
    }
  });

  // public/ is the exception: Next requires it at the repo root, and the
  // automation never looks inside it.
  it("keeps public/ at the repo root, where Next requires it", () => {
    expect(exists("public")).toBe(true);
    expect(exists("src", "public")).toBe(false);
  });

  // The wire script scans $RepoDir/__tests__ to keep fixtures holding an old
  // GTM id in sync, so this tree has to stay at the root too.
  it("keeps __tests__/ at the repo root, where the wire script scans it", () => {
    expect(exists("__tests__")).toBe(true);
  });

  it("resolves the @/ alias into src/", () => {
    expect(read("tsconfig.json")).toContain('"@/*": ["./src/*"]');
  });

  describe("analytics-wire.ps1 file contract", () => {
    it("puts the config where the script expects to rewrite it", () => {
      expect(exists("src", "lib", "analytics.config.ts")).toBe(true);
    });

    // These are the exact patterns the script replaces. Reformatting the file
    // to double quotes, renaming a key, or dropping the `as const` turns an
    // automated re-wire into a silent no-op rather than an error.
    it("matches the id-rewrite regexes verbatim", () => {
      const cfg = read("src", "lib", "analytics.config.ts");
      expect(cfg).toMatch(/gtmId:\s*'(GTM-[A-Z0-9]{5,9})'/);
      expect(cfg).toMatch(/gaMeasurementId:\s*'[^']*'/);
    });

    it("puts the GTM component where the script expects to rewire it", () => {
      expect(exists("src", "components", "google-tag-manager", "index.tsx")).toBe(true);
    });

    /**
     * The script inserts its config import immediately after
     * `import Script from 'next/script'`, so that line must survive verbatim —
     * single quotes included. Being already wired means a re-run is a no-op,
     * which is how 704 avoids opening a redundant PR every time it fires.
     */
    it("is already wired, so a re-run is idempotent", () => {
      const gtm = read("src", "components", "google-tag-manager", "index.tsx");
      expect(gtm).toContain("import Script from 'next/script'");
      expect(gtm).toContain("from '@/lib/analytics.config'");
      expect(gtm).toContain("const GTM_ID = analyticsConfig.gtmId");
    });
  });
});
