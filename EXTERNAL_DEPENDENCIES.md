# External Dependencies

Third-party services the Bin to Better website depends on, and what each one
means for visitors' privacy.

**Last reviewed:** August 2026

> This document previously described Free For Charity's own website and listed
> services this site has never used. It has been rewritten against what the code
> actually references.

## What runs in the visitor's browser

This is the list that matters for the privacy policy, because these are the only
things that execute or store data on a visitor's device. Everything else on this
page is an outbound link the visitor chooses to follow.

| Service | Purpose | Loaded on | Sets storage? |
| --- | --- | --- | --- |
| Google Tag Manager | Container for the analytics tag | Every page | Yes — see below |
| Google Analytics 4 | Aggregate page-view measurement, fired inside GTM | Every page | `_ga` cookie |

Both are governed by the consent stack in
`src/components/cookie-consent/` and `src/components/google-tag-manager/`:

- In the **UK, EEA and Switzerland**, Google Consent Mode defaults
  `analytics_storage` to **denied**. Nothing is stored until the visitor opts in.
- **Everywhere else**, it defaults to granted and the banner offers a decline.
- Advertising and personalisation signals (`ad_storage`, `ad_user_data`,
  `ad_personalization`) are denied in **every** region, unconditionally.
- The visitor's choice is kept in `localStorage`, not a cookie, and can be
  changed at any time via **Cookie Settings** in the footer.

Tracking ids live in `src/lib/analytics.config.ts` and are provisioned by FFC
workflows *503* (GTM container) and *505* (GA4 property), then written into this
repository by workflow *704*. Do not edit that file's formatting — see
[AGENTS.md](./AGENTS.md).

**Nothing else third-party executes on this site.** No advertising or social
pixels, no session recording or heatmaps, no embedded maps or video, no
hot-linked images, no external fonts — typefaces are self-hosted by `next/font`.
`__tests__/legal.test.tsx` fails if any of those appear outside the two
sanctioned directories, and the post-deploy smoke independently records every
third-party origin the live page loads.

## Hosting and delivery

| Service | Role |
| --- | --- |
| GitHub Pages | Hosts the static export; provides TLS and CDN |
| GitHub Actions | Builds, deploys, and runs the post-deploy compliance smoke |
| Cloudflare | Authoritative **DNS only** — records are `proxied=false`, so Cloudflare is not in the request path and terminates no traffic |

The Cloudflare posture is deliberate and is enforced fleet-wide by
`FFC-Cloudflare-Automation`. It also means Cloudflare-side features that require
proxied traffic (Zaraz, Workers, Web Analytics) are **not** available to this
site.

## Services visitors reach by choosing a link

These set their own cookies under their own policies, but only once the visitor
has followed the link. They load nothing on this site.

| Service | Used for |
| --- | --- |
| **PledgeIt** (`charity.pledgeit.org/bintobetter`) | Donations. Its checkout may name a different entity as fiscal sponsor or payment recipient, which is why this site asserts no sponsoring organization or EIN. |
| **Google Forms** (`forms.gle`) | Volunteer, chapter and contact forms |
| **Discord** | Community server |
| **Google Photos** (`photos.app.goo.gl`) | Event photo albums |
| **Instagram / LinkedIn** | Social profiles |
| **GitHub** | This repository |

Links that leave the site and collect personal information are gated by
`src/components/ui/FormGate.tsx`, which asks for confirmation that the visitor is
13 or older, or a parent or guardian acting for them, and routes minors to a
guardian-completed path instead.

Partner and sponsor logos link out to those organizations' own sites. The logo
images themselves are stored in `public/` and served from this origin — none are
hot-linked, so no request reaches a partner's server unless a visitor clicks.

## Build-time only

These never reach a visitor's browser. They are npm packages resolved during
`npm ci` and compiled into the static output: Next.js, React, Tailwind CSS,
Motion, cobe, rough-notation, shadcn (a CSS import), plus Vitest and Testing
Library for the test suite. `magicui.design` appears in `components.json` as a
component registry used at scaffold time only.

Run `npm audit` to check them; it should report zero vulnerabilities.
