import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import PrivacyPolicy from "@/app/privacy-policy/page";
import TermsOfService from "@/app/terms-of-service/page";
import { cookiePolicy, privacySections, termsSections } from "@/content/legal";
import { fiscalSponsor } from "@/content/site";

describe("legal pages", () => {
  it("privacy policy covers cookies, youth data, and photo removal", () => {
    render(<PrivacyPolicy />);
    expect(screen.getByRole("heading", { name: cookiePolicy.heading })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /young people/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /photographs/i })).toBeInTheDocument();
  });

  // Twice over: once in the "Who we are" section, once in the footer that every
  // page carries. Both are wanted, so this asserts presence, not uniqueness.
  it("terms name the fiscal sponsor and EIN", () => {
    render(<TermsOfService />);
    expect(screen.getAllByText(new RegExp(fiscalSponsor.ein)).length).toBeGreaterThan(0);
  });

  it("every section renders at least one paragraph", () => {
    for (const section of [...privacySections, ...termsSections]) {
      expect(section.body.length).toBeGreaterThan(0);
    }
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
