"use client";

import { analyticsEnabled } from "@/lib/analytics.config";
import { OPEN_CONSENT_EVENT } from "@/components/cookie-consent";
import { CONSENT_STORAGE_KEY } from "@/components/google-tag-manager";

/**
 * Footer entry point back into the consent banner after it has been dismissed.
 *
 * Split out of the banner (and out of Footer) so the Footer itself stays a
 * server component — only this button needs to be a client component, and a
 * "use client" on Footer would drag the whole footer tree into the client
 * bundle for one control.
 */
export function CookieSettingsButton() {
  if (!analyticsEnabled) return null;

  return (
    <button
      type="button"
      onClick={() => {
        // Clearing the stored choice is what reopens the banner — the banner's
        // visibility is derived from storage, not held separately. The event
        // just tells this tab to re-read (`storage` only fires cross-tab).
        try {
          window.localStorage.removeItem(CONSENT_STORAGE_KEY);
        } catch {
          /* storage blocked; the event below still re-reads and shows the banner */
        }
        window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
      }}
      className="transition-colors hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
    >
      Cookie Settings
    </button>
  );
}
