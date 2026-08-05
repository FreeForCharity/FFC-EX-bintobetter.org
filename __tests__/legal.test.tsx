import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import PrivacyPolicy from "@/app/privacy-policy/page";
import TermsOfService from "@/app/terms-of-service/page";
import { cookiePolicy, privacySections, termsSections } from "@/content/legal";

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
   * The cookie policy claims this site sets no cookies and loads no analytics.
   * That claim is only true while the source contains no tracker. If someone
   * adds GA, Clarity, a Meta pixel, or an iframe, this fails and the policy
   * must be rewritten — the point is that the two can never drift apart
   * silently, because the published claim is a legal one.
   */
  it("no analytics, pixel, or embed exists that would falsify the cookie claim", () => {
    const roots = ["app", "components", "content", "lib"];
    const banned =
      /googletagmanager|google-analytics|gtag\(|clarity\.ms|connect\.facebook\.net|fbq\(|<iframe|document\.cookie|localStorage|sessionStorage/i;

    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (/\.(tsx?|css)$/.test(entry.name)) {
          const src = fs.readFileSync(full, "utf8");
          // The policy text itself names the trackers it disclaims.
          if (full.endsWith(path.join("content", "legal.ts"))) continue;
          if (banned.test(src)) offenders.push(full);
        }
      }
    };
    for (const r of roots) walk(path.join(process.cwd(), r));

    expect(offenders).toEqual([]);
  });
});
