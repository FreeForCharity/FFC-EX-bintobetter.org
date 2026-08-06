import { render, screen, within } from "@testing-library/react";
import { act } from "react";
import { describe, it, expect } from "vitest";
import { Nav } from "@/components/layout/Nav";
import { programLinks } from "@/content/nav";

// Every destination is rendered twice — once in the desktop bar and once in the
// mobile panel — so queries are scoped to the desktop <nav> to stay unambiguous.
const desktopNav = () => screen.getByRole("navigation");

describe("Nav", () => {
  it("renders the brand logo and a Support Us link", () => {
    render(<Nav />);
    expect(screen.getByAltText(/bin to better/i)).toBeInTheDocument();
    expect(
      within(desktopNav()).getByRole("link", { name: /support us/i })
    ).toHaveAttribute("href", "/donate");
  });

  it("lists the three programs", () => {
    render(<Nav />);
    for (const p of programLinks) {
      expect(
        within(desktopNav()).getByRole("link", { name: p.label })
      ).toHaveAttribute("href", p.href);
    }
  });

  it("renders outside a router context, where usePathname yields null", () => {
    expect(() => render(<Nav />)).not.toThrow();
  });

  it("opens the Programs menu on click, not hover alone", () => {
    render(<Nav />);
    const toggle = within(desktopNav()).getByRole("button", { name: /programs/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    act(() => toggle.click());
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("keeps the collapsed mobile panel out of the tab order", () => {
    const { container } = render(<Nav />);
    const panel = container.querySelector("#mobile-menu");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("inert");
  });
});
