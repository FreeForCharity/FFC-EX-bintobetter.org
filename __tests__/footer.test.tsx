import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("shows the Bin to Better copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it("links the contact email", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /outreach@bintobetter.org/ })).toHaveAttribute(
      "href",
      "mailto:outreach@bintobetter.org"
    );
  });

  // The Free For Charity post-deploy smoke fails a footer without these exact
  // paths (post-deploy-smoke.yml: SMOKE_REQUIRED_FOOTER_LINKS). Asserted here so
  // a rename surfaces at test time rather than after a deploy.
  it("links both policy pages at the paths the compliance smoke expects", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute(
      "href",
      "/privacy-policy"
    );
    expect(screen.getByRole("link", { name: /terms of service/i })).toHaveAttribute(
      "href",
      "/terms-of-service"
    );
  });

  /**
   * The compliance smoke locates the page footer to check its policy links.
   * TestimonialSlider renders a <footer> inside a <blockquote> for quote
   * attribution, which appears earlier in the DOM on the homepage — so a probe
   * selecting by tag alone finds that one instead and reports a footer with
   * zero links. An explicit contentinfo role is what disambiguates them, and
   * it is load-bearing for the deploy gate, not cosmetic.
   */
  it("exposes the page footer as the contentinfo landmark", () => {
    render(<Footer />);
    const landmark = screen.getByRole("contentinfo");
    expect(landmark.tagName.toLowerCase()).toBe("footer");
    expect(
      landmark.querySelectorAll('a[href="/privacy-policy"], a[href="/terms-of-service"]')
    ).toHaveLength(2);
  });

  // Donations run through PledgeIt, whose checkout names the payment
  // recipient. A sponsoring entity or EIN asserted in the footer would be a tax
  // claim the site cannot stand behind, so the footer must stay silent on both.
  it("claims no sponsoring entity or tax ID", () => {
    const { container } = render(<Footer />);
    expect(container.textContent).not.toMatch(/EIN|501\(c\)|fiscally sponsored/i);
  });
});
