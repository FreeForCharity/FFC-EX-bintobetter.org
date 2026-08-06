import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import CookieConsent, { OPEN_CONSENT_EVENT } from "@/components/cookie-consent";
import { CookieSettingsButton } from "@/components/cookie-consent/CookieSettingsButton";
import { CONSENT_STORAGE_KEY } from "@/components/google-tag-manager";

/**
 * The consent banner is the control the published cookie policy promises, and
 * the thing the post-deploy compliance smoke looks for now that the site loads
 * a tag. These tests pin the behaviour the policy commits to in words.
 */
describe("CookieConsent", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.gtag = vi.fn();
  });

  it("appears on a first visit, when no choice has been stored", () => {
    render(<CookieConsent />);
    expect(screen.getByRole("dialog", { name: /cookies on this site/i })).toBeInTheDocument();
  });

  it("stays hidden for a visitor who already chose", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("declining stores the choice and tells Consent Mode to deny analytics storage", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: /no thanks/i }));

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("denied");
    expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "denied",
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("accepting stores the choice and grants analytics storage", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: /that.s fine/i }));

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("granted");
    expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "granted",
    });
  });

  // Withdrawing consent has to be as easy as giving it. Without this path a
  // visitor who accepted once could never reach the banner again.
  it("can be reopened after dismissal via the footer control", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    render(
      <>
        <CookieConsent />
        <CookieSettingsButton />
      </>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /cookie settings/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("survives localStorage being unavailable", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<CookieConsent />);
    // The Consent Mode update must still land even though the choice cannot be
    // persisted — otherwise a private-mode visitor's decline does nothing.
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: /no thanks/i }))
    ).not.toThrow();
    expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
      analytics_storage: "denied",
    });
    spy.mockRestore();
  });

  it("moves focus to the banner so keyboard users meet it", () => {
    render(<CookieConsent />);
    expect(screen.getByRole("button", { name: /that.s fine/i })).toHaveFocus();
  });

  /**
   * Visibility is derived from storage, so a bare event must NOT force the
   * banner back open while a choice is still recorded — otherwise any stray
   * dispatch would nag a visitor who already declined. Clearing the choice is
   * what reopens it.
   */
  it("stays closed on a bare event while a choice is still stored", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    render(<CookieConsent />);

    act(() => {
      window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // A choice recorded in another tab should settle this one too.
  it("closes when another tab records a choice", () => {
    render(<CookieConsent />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    act(() => {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
      window.dispatchEvent(new Event("storage"));
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
