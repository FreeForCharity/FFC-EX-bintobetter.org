import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import PrivacyPolicy, { metadata as privacyMeta } from "@/app/privacy-policy/page";
import TermsOfService, { metadata as termsMeta } from "@/app/terms-of-service/page";
import { cookiePolicy, privacySections, termsSections } from "@/content/legal";
import {
  analyticsConfig,
  analyticsEnabled,
  isConfigured,
} from "@/lib/analytics.config";

describe("legal pages", () => {
  it("privacy policy covers cookies, youth data, and photo removal", () => {
    render(<PrivacyPolicy />);
    expect(screen.getByRole("heading", { name: cookiePolicy.heading })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /young people/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /photographs/i })).toBeInTheDocument();
  });

  // The terms point at PledgeIt's checkout for tax wording rather than naming a
  // sponsoring entity or EIN, which the site is not in a position to assert.
  it("terms defer tax details to the donation processor", () => {
    const { container } = render(<TermsOfService />);
    expect(screen.getByRole("heading", { name: /who we are/i })).toBeInTheDocument();
    expect(container.textContent).toMatch(/PledgeIt/);
    expect(container.textContent).not.toMatch(/EIN|501\(c\)/i);
  });

  it("every section renders at least one paragraph", () => {
    for (const section of [...privacySections, ...termsSections]) {
      expect(section.body.length).toBeGreaterThan(0);
    }
  });

  /**
   * The donate page states that PledgeIt's checkout may show a fiscal sponsor
   * or payment recipient other than Bin to Better. Naming a *different* entity
   * anywhere in the rendered site would contradict that and mislead a donor
   * checking tax-deductible status, so no sponsoring organisation or tax ID may
   * appear in the page layer at all. LICENSE is exempt: it is the repository's
   * copyright notice, not website content.
   */
  it("names no sponsoring entity or tax ID anywhere in the rendered site", () => {
    const banned = /Free For Charity|freeforcharity|46-2471893|\bEIN\b|501\(c\)/i;

    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.tsx?$/.test(entry.name)) {
          // This test file names the strings it bans.
          if (full === __filename) continue;
          if (banned.test(fs.readFileSync(full, "utf8"))) offenders.push(full);
        }
      }
    };
    for (const r of ["app", "components", "content", "lib"]) {
      walk(path.join(process.cwd(), r));
    }

    expect(offenders).toEqual([]);
  });

  /**
   * The cookie policy and the tags actually loaded must agree in BOTH
   * directions: nothing undisclosed may load, and nothing disclosed may be
   * absent. The site now runs GTM + GA4 on an opt-out basis, so the assertions
   * below pin that specific arrangement rather than the old "no cookies at all"
   * claim. Turning analytics back off means this test fails until the copy is
   * rewritten too — which is the point.
   */
  it("the cookie policy describes the analytics that is actually configured", () => {
    const text = cookiePolicy.body.join(" ");
    expect(analyticsEnabled).toBe(true);
    expect(text).toMatch(/Google Analytics/i);
    expect(text).toMatch(/Google Tag Manager/i);
    expect(text).toMatch(/_ga/);
    // The visitor must be told how to decline, and how to come back to it.
    expect(text).toMatch(/decline|turn it off|switch(es)? analytics off/i);
    expect(text).toMatch(/Cookie Settings/i);
    // The posture is hybrid, so the copy has to say so — describing it as
    // simply "on unless you decline" would be false for European visitors,
    // and describing it as opt-in would be false for everyone else.
    expect(text).toMatch(/UK, the EEA and Switzerland|EEA/);
    expect(text).toMatch(/nothing is switched on until you say so/i);
    expect(text).toMatch(/Everywhere else, analytics is on/i);
    // The old claim must not survive anywhere in the rendered policy — nor in
    // the page metadata, which is where it first slipped through: a meta
    // description is published to search results and social cards but never
    // appears in the rendered body, so a body-only assertion misses it.
    const { container } = render(<PrivacyPolicy />);
    expect(container.textContent).not.toMatch(/sets no cookies|no analytics/i);

    const stale = /sets no cookies|no analytics|no tracking/i;
    for (const [name, meta] of Object.entries({
      privacy: privacyMeta,
      terms: termsMeta,
    })) {
      expect(`${name}: ${meta.title ?? ""}`).not.toMatch(stale);
      expect(`${name}: ${meta.description ?? ""}`).not.toMatch(stale);
    }
  });

  /**
   * Meta Pixel and Microsoft Clarity ship as placeholder ids in the FFC
   * template. They are not wired up and the policy says we run no advertising
   * or social pixels — so if an id is ever filled in without the copy changing,
   * the site would be tracking undisclosed. Fail before that ships.
   */
  it("declares no tracker beyond the ones the policy names", () => {
    expect(isConfigured(analyticsConfig.metaPixelId)).toBe(false);
    expect(isConfigured(analyticsConfig.clarityProjectId)).toBe(false);
    expect(cookiePolicy.body.join(" ")).toMatch(
      /do not run advertising or social pixels/i
    );
  });

  it("no tracker exists outside the sanctioned analytics components", () => {
    // `public/` is included deliberately. On a static export it is copied to
    // the site root verbatim, so a <script> dropped into a file there ships to
    // production without passing through any of the app/ code the rest of this
    // tripwire watches — it is the most likely place for a tracker to appear
    // and go unnoticed. next.config.ts is watched for the same reason.
    const roots = ["app", "components", "content", "lib", "public"];
    // Anchored on the tracker HOSTS rather than bare words: `GoogleTagManager`
    // is also the name of the sanctioned component, and matching the identifier
    // would flag every file that merely imports or renders it — which would
    // make the test noise rather than a tripwire.
    const banned =
      /googletagmanager\.com|google-analytics\.com|gtag\(|clarity\.ms|connect\.facebook\.net|fbq\(|<iframe|document\.cookie|localStorage|sessionStorage/i;

    /**
     * Analytics is allowed in exactly two places, and nowhere else. Confining
     * it means a tracker added to a page component, a content module or a
     * static file in public/ still trips this test — the containment is what
     * makes "we run GA and nothing else" a checkable statement rather than an
     * assurance. content/legal.ts is exempt because the policy names the
     * trackers it discloses and disclaims.
     */
    const sanctioned = [
      path.join("components", "google-tag-manager"),
      path.join("components", "cookie-consent"),
      path.join("content", "legal.ts"),
    ];

    const offenders: string[] = [];
    const check = (full: string) => {
      if (sanctioned.some((s) => full.includes(s))) return;
      const src = fs.readFileSync(full, "utf8");
      if (banned.test(src)) offenders.push(full);
    };
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (/\.(tsx?|css|html|js|mjs)$/.test(entry.name)) {
          check(full);
        }
      }
    };
    for (const r of roots) walk(path.join(process.cwd(), r));
    check(path.join(process.cwd(), "next.config.ts"));

    expect(offenders).toEqual([]);
  });
});
