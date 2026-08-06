// Analytics & tracking IDs - the single place to change them.
//
// These are NOT secrets. They are public, client-side identifiers baked into
// the static export and visible in page source anyway. They live here so a
// forking charity - or an automated assistant - can point the site at its own
// accounts by editing this one file. Provisioned by FFC workflow 704.
//
// NOTE ON SHAPE: the key names, single quotes and `as const` are load-bearing.
// FFC-Cloudflare-Automation/scripts/analytics-wire.ps1 rewrites the ids in
// place with regexes anchored on `gtmId:\s*'[^']*'` and
// `gaMeasurementId:\s*'[^']*'`. Reformatting to double quotes, renaming a key,
// or dropping the trailing comma silently turns the automated re-wire into a
// no-op. Only the file's LOCATION differs from the FFC template (this repo has
// no src/ directory since the redesign) — see the PR notes.
export const analyticsConfig = {
  // Google Tag Manager container ID, e.g. 'GTM-ABC1234'.
  gtmId: 'GTM-N49G594Z',

  // Google Analytics 4 measurement ID, e.g. 'G-ABC1234567'. The GA4 tag itself
  // fires inside the GTM container; this is kept for reference/components.
  gaMeasurementId: 'G-VV78E7XPSQ',

  // Meta (Facebook) Pixel ID.
  metaPixelId: 'XXXXXXXXXXXXXXX',

  // Microsoft Clarity project ID.
  clarityProjectId: 'XXXXXXXX',
} as const

/**
 * A placeholder id means "not provisioned" — the template ships literal X
 * strings for products this site does not use. Anything still on a placeholder
 * must not load, and must not be described in the privacy policy as if it did.
 */
export function isConfigured(id: string): boolean {
  return id.length > 0 && !/^[GX-]*X{4,}$/.test(id)
}

/** True when a real GTM container is wired up and the tag should load. */
export const analyticsEnabled = isConfigured(analyticsConfig.gtmId)
