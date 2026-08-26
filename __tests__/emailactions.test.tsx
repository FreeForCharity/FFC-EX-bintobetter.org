import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { EmailActions } from "@/components/ui/EmailActions";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { site } from "@/content/site";

afterEach(() => {
  vi.restoreAllMocks();
});

/**
 * The point of these components is that a mailto: click is never the only way
 * to reach us — on a device with no mail client the click does nothing visible
 * and the site reads as broken. So the assertions below are about the address
 * being *on the page as text*, not about the link's href.
 */
describe("email actions", () => {
  it("prints the address as text alongside the buttons", () => {
    render(
      <EmailActions
        actions={[{ label: "Request a Pickup", subject: "Bounce Back Pickup Request" }]}
      />
    );

    expect(screen.getByRole("link", { name: /Request a Pickup/ })).toHaveAttribute(
      "href",
      `mailto:${site.email}?subject=Bounce%20Back%20Pickup%20Request`
    );
    // Present twice over: as a link and inside the visible note.
    expect(screen.getAllByText(site.email).length).toBeGreaterThan(0);
  });

  it("says out loud that the buttons open an email", () => {
    render(<EmailActions actions={[{ label: "Email us", subject: "Hello" }]} />);
    expect(screen.getByText(/pre-addressed email/i)).toBeInTheDocument();
  });

  it("copies the address and confirms it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<CopyEmail />);
    fireEvent.click(screen.getByRole("button", { name: /copy address/i }));

    expect(writeText).toHaveBeenCalledWith(site.email);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument()
    );
  });

  it("still shows the address when the clipboard is unavailable", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("blocked")) },
    });

    render(<CopyEmail />);
    fireEvent.click(screen.getByRole("button", { name: /copy address/i }));

    // No crash, no "Copied" lie, and the address is readable either way.
    expect(screen.getByRole("button", { name: /copy address/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: site.email })).toBeInTheDocument();
  });
});
