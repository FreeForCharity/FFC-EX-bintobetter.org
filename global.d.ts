/**
 * Google Consent Mode shim installed by the inline `consent-default` script in
 * components/google-tag-manager. Declared here so the consent banner can call
 * `window.gtag(...)` without a cast; it is optional because the script only
 * runs when a real GTM container is configured.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
