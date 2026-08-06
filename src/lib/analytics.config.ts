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

/**
 * Regions where analytics storage defaults to DENIED until the visitor opts in.
 *
 * This is the hybrid posture: US and rest-of-world traffic is not restricted
 * (analytics on, decline available), while European traffic gets prior
 * affirmative consent as GDPR/ePrivacy requires. One tag, two behaviours,
 * chosen by where the visitor actually is.
 *
 * Passed to Google Consent Mode as a region-scoped `default`. Google resolves
 * the region server-side from the request IP, so this is authoritative and
 * needs no geo-IP lookup of our own — which matters on a static host with no
 * server, and avoids adding a third-party geo service that would itself be a
 * tracker requiring consent.
 *
 * EU 27 + the non-EU EEA states (IS, LI, NO) + the UK + Switzerland (nFADP).
 * ISO 3166-1 alpha-2, which is what Consent Mode expects.
 */
export const CONSENT_RESTRICTED_REGIONS = [
  // EU 27
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // Rest of the EEA
  'IS', 'LI', 'NO',
  // United Kingdom (UK GDPR + PECR) and Switzerland (revised FADP)
  'GB', 'CH',
] as const
