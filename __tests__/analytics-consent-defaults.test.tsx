import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GoogleTagManager from "@/components/google-tag-manager";
import { CONSENT_RESTRICTED_REGIONS } from "@/lib/analytics.config";

/**
 * The region-scoped Consent Mode default is what actually enforces the hybrid
 * posture — the banner only chooses wording. Google resolves the region from
 * the request IP, so this inline script is the part a VPN or a spoofed
 * timezone cannot weaken. These tests read the emitted script text because
 * that string is the contract with Google, not an implementation detail.
 */
function consentScript(): string {
  const { container } = render(<GoogleTagManager />);
  const el = container.querySelector("#consent-default");
  return el?.innerHTML ?? "";
}

describe("Consent Mode defaults", () => {
  it("denies analytics storage by default in the restricted regions", () => {
    const src = consentScript();
    // The region-scoped default must appear, and must deny unless the visitor
    // has already granted — the opposite of the catch-all below it.
    expect(src).toMatch(/analytics_storage:\s*stored === 'granted' \? 'granted' : 'denied'/);
    expect(src).toMatch(/region:\s*\[/);
  });

  it("grants by default everywhere else, so US traffic is not restricted", () => {
    const src = consentScript();
    expect(src).toMatch(/analytics_storage:\s*stored === 'denied' \? 'denied' : 'granted'/);
  });

  it("orders the region-scoped default before the catch-all", () => {
    const src = consentScript();
    // Consent Mode applies the most specific match, but the region-scoped call
    // must still be present ahead of the global one for the intent to be
    // readable — and a reordering here would be a silent posture change.
    const regional = src.indexOf("region:");
    const catchAll = src.lastIndexOf("gtag('consent', 'default'");
    expect(regional).toBeGreaterThan(-1);
    expect(regional).toBeLessThan(catchAll);
  });

  it("covers the EEA, the UK and Switzerland", () => {
    const src = consentScript();
    for (const cc of ["DE", "FR", "IE", "NO", "IS", "LI", "GB", "CH"]) {
      expect(CONSENT_RESTRICTED_REGIONS).toContain(cc);
      expect(src).toContain(`"${cc}"`);
    }
    // The US must NOT be restricted — that is the whole point of the hybrid.
    expect(CONSENT_RESTRICTED_REGIONS).not.toContain("US");
    expect(src).not.toContain('"US"');
  });

  it("denies advertising signals unconditionally, in every region", () => {
    const src = consentScript();
    expect(src.match(/ad_storage: 'denied'/g)?.length).toBe(2);
    expect(src.match(/ad_user_data: 'denied'/g)?.length).toBe(2);
    expect(src.match(/ad_personalization: 'denied'/g)?.length).toBe(2);
  });
});
