"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { analyticsEnabled } from "@/lib/analytics.config";
import { CONSENT_STORAGE_KEY } from "@/components/google-tag-manager";

/**
 * Event the footer's "Cookie Settings" control dispatches to reopen the banner.
 * The control clears the stored choice first, so reopening is a consequence of
 * the choice being gone rather than a second, separate piece of state.
 */
export const OPEN_CONSENT_EVENT = "b2b:open-consent";

/** Dispatched by the banner itself once a choice is recorded. */
export const CONSENT_CHANGED_EVENT = "b2b:consent-changed";

type Choice = "granted" | "denied";

function readStored(): Choice | null {
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * `storage` covers another tab recording a choice; the two custom events cover
 * this tab, where `storage` deliberately does not fire.
 */
function subscribeToChoice(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(OPEN_CONSENT_EVENT, onChange);
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(OPEN_CONSENT_EVENT, onChange);
    window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  };
}

/**
 * Deletes the GA cookies on decline. GA sets `_ga` and `_ga_<STREAM>` on the
 * registrable domain, so each has to be cleared at both the exact host and the
 * dot-prefixed parent — clearing only one leaves the other readable and the
 * visitor stays identified despite having declined.
 */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0]?.trim())
    .filter((n): n is string => !!n && /^_ga($|_)|^_gid$|^_gat/.test(n));

  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

/**
 * Opt-out analytics consent banner.
 *
 * Analytics runs by default (Consent Mode default is set in the GTM component
 * before the container loads); this gives the visitor a way to turn it off and,
 * via the footer control, to change their mind afterwards. Withdrawing consent
 * has to be as easy as giving it, which is why the footer entry point exists.
 */
export default function CookieConsent() {
  const acceptRef = useRef<HTMLButtonElement>(null);

  // Derived from storage rather than mirrored into state. Mirroring would mean
  // a setState inside an effect (which React 19's lint rules reject, and which
  // costs an extra render), and it would let the two copies drift — e.g. when
  // another tab records a choice. The banner is open exactly when no choice is
  // stored, so storage is the single source of truth and "Cookie Settings"
  // reopens it by clearing the key.
  const choice = useSyncExternalStore(
    subscribeToChoice,
    () => readStored(),
    // Server/prerender snapshot: treat the choice as already made so the static
    // HTML never ships an open banner. The client re-reads on hydration.
    () => "granted" as Choice
  );
  const open = analyticsEnabled && choice === null;

  // Move focus to the banner when it appears so keyboard and screen-reader
  // users meet it rather than having to hunt for it at the end of the document.
  useEffect(() => {
    if (open) acceptRef.current?.focus();
  }, [open]);

  const choose = useCallback((next: Choice) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
    } catch {
      /* storage blocked — the Consent Mode update below still applies to this page view */
    }
    window.gtag?.("consent", "update", { analytics_storage: next });
    if (next === "denied") clearAnalyticsCookies();
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  }, []);

  if (!open) return null;

  return (
    <div
      id="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-paper/15 bg-canvas px-6 py-5 text-paper shadow-[0_-4px_24px_rgba(0,0,0,0.18)]"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="cookie-banner-title" className="font-display text-base font-bold">
            Cookies on this site
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-paper/70">
            We use Google Analytics to understand which pages people find useful.
            It sets a cookie in your browser. Nothing here is used for advertising
            and we never sell your data. You can decline and we will switch it off
            — see our{" "}
            <Link
              href="/privacy-policy/"
              className="underline underline-offset-4 hover:text-court"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            ref={acceptRef}
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex items-center rounded-[3px] bg-court px-4 py-2 text-sm font-medium text-ink transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            That&rsquo;s fine
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex items-center rounded-[3px] border border-paper/30 px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
