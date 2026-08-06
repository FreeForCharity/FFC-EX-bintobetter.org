import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
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

  /**
   * The hybrid posture: Europe must opt in, everyone else may opt out. The
   * banner's wording and button prominence follow the visitor's timezone;
   * what GA may actually store is enforced by the region-scoped Consent Mode
   * default, asserted separately below.
   */
  describe("regional posture", () => {
    // Resolved once, before any spy is installed — reading it inside the helper
    // would recurse through the previous test's mock and quietly pin every
    // later test to the first timezone set.
    const baseOptions = new Intl.DateTimeFormat().resolvedOptions();

    afterEach(() => {
      vi.restoreAllMocks();
    });

    const setTimeZone = (timeZone: string) => {
      vi.spyOn(
        Intl.DateTimeFormat.prototype,
        "resolvedOptions"
      ).mockReturnValue({ ...baseOptions, timeZone });
    };

    it("asks a European visitor to opt in, with equally prominent choices", () => {
      setTimeZone("Europe/Berlin");
      render(<CookieConsent />);

      expect(screen.getByText(/nothing is switched on until you choose/i)).toBeInTheDocument();
      const allow = screen.getByRole("button", { name: /allow analytics/i });
      const reject = screen.getByRole("button", { name: /reject/i });
      // Equal prominence is a consent-validity requirement in these regions,
      // not a styling preference — a faint "reject" invalidates the consent.
      expect(allow.className).toBe(reject.className);
    });

    it("gives a US visitor the opt-out notice instead", () => {
      setTimeZone("America/Los_Angeles");
      render(<CookieConsent />);

      expect(screen.getByRole("button", { name: /that.s fine/i })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /allow analytics/i })).not.toBeInTheDocument();
      expect(screen.getByText(/you can decline/i)).toBeInTheDocument();
    });

    it("treats European territories outside the Europe\\/ prefix as European", () => {
      setTimeZone("Atlantic/Canary");
      render(<CookieConsent />);
      expect(screen.getByRole("button", { name: /allow analytics/i })).toBeInTheDocument();
    });
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
