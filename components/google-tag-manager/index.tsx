import Script from 'next/script'
import { analyticsConfig, analyticsEnabled } from '@/lib/analytics.config'

const GTM_ID = analyticsConfig.gtmId

/** localStorage key holding the visitor's analytics choice. Read by the inline
 *  consent-default script below and written by the cookie banner. */
export const CONSENT_STORAGE_KEY = 'b2b-analytics-consent'

/**
 * Google Tag Manager, with Google Consent Mode v2 defaults set *before* the
 * container loads.
 *
 * Ordering is the whole point. GTM reads the consent state at load time, so the
 * default has to be established by a `beforeInteractive` inline script — if it
 * were set from a React effect, GA4 would already have fired one un-consented
 * hit before the update landed. The inline script reads the stored choice
 * synchronously so a returning visitor who declined is never re-tracked.
 *
 * The default is `granted` (opt-out), matching the FFC fleet template and the
 * policy text in content/legal.ts. See the PR notes for why an EU-facing
 * charity may want to revisit that.
 */
export default function GoogleTagManager() {
  if (!analyticsEnabled) return null

  return (
    <>
      {/*
        A raw inline <script>, not next/script. `beforeInteractive` is the
        obvious choice but Next only honours it for the root layout and its own
        lint rule flags it anyway; more importantly a plain inline script in the
        document head is executed at parse time, which is a stronger ordering
        guarantee than any strategy hint. The content is a fixed literal — no
        user input reaches it.
      */}
      <script
        id="consent-default"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var stored = null;
try { stored = window.localStorage.getItem('${CONSENT_STORAGE_KEY}'); } catch (e) {}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: stored === 'denied' ? 'denied' : 'granted'
});`.trim(),
        }}
      />

      <Script id="gtm-loader" strategy="afterInteractive">
        {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
        `.trim()}
      </Script>
    </>
  )
}

/**
 * The <noscript> half of GTM. Must be the first child of <body>.
 *
 * This is the one iframe on the site. It only materialises with JavaScript
 * disabled — in which case the tag cannot run and no consent choice can be
 * recorded either — so it is disclosed in the cookie policy rather than gated.
 */
export function GoogleTagManagerNoScript() {
  if (!analyticsEnabled) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
