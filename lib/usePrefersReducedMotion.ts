"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Reads `prefers-reduced-motion` in a hydration-safe way.
 *
 * Reading it during render (e.g. in a `useState` initializer) makes the first
 * client render disagree with the server, which always sees no-preference.
 * React does not patch mismatched inline styles, so anything gated on the
 * result — opacity, transform — kept the server's value and stayed hidden for
 * reduced-motion visitors. `useSyncExternalStore` re-renders after hydration
 * when the client snapshot differs from the server one, which is exactly the
 * behaviour that case needs.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
