# Cloudflare Configuration

**Applies to:** bintobetter.org
**Authoritative source for architecture and contracts:** [AGENTS.md](./AGENTS.md)
**Last reviewed:** August 2026

> **This document previously described the opposite configuration.** It
> instructed you to set the proxy status to **Proxied (orange cloud)** and then
> tune page rules, cache-everything, Rocket Loader and SSL/TLS modes. That is
> wrong for this site and for the FFC fleet standard. Following it would have
> broken the standard and put Cloudflare in a request path it is deliberately
> kept out of. It has been rewritten.

## The short version

Cloudflare is **authoritative DNS only**. Every record is **DNS-only (grey
cloud, `proxied=false`)**. Cloudflare does not proxy, cache, terminate TLS for,
or otherwise sit in front of this site — traffic goes from the visitor straight
to GitHub Pages.

Verify at any time:

```bash
dig +short bintobetter.org          # -> 185.199.108-111.153 (GitHub Pages)
curl -sI https://bintobetter.org/ | grep -i '^server\|^cf-ray'
# Expect: server: GitHub.com    and NO cf-ray header.
# A cf-ray header means something has been switched to proxied — see below.
```

## Why DNS-only

GitHub Pages already provides the CDN, the TLS certificate, and the caching.
Proxying through Cloudflare on top of that adds a second cache and a second
certificate to keep in agreement, and the usual failure is a TLS mode mismatch
that takes the site down. The FFC standard therefore pins `proxied=false`
fleet-wide, enforced by
[`FFC-Cloudflare-Automation`](https://github.com/FreeForCharity/FFC-Cloudflare-Automation)
(`scripts/bulk-cutover-to-github-pages.ps1`, and workflow *106. Enforce
Standard*).

### What this rules out

Anything requiring proxied traffic is **unavailable** on this site, by design:

- **Zaraz** and **Workers** — nothing to attach to. This is why analytics is
  implemented in the application (`src/components/google-tag-manager/`) rather
  than injected at the edge.
- **Cloudflare Web Analytics**, WAF, rate limiting, bot management.
- **Page Rules, cache rules, Auto Minify, Brotli, Rocket Loader, Early Hints,
  HTTP/3 settings, SSL/TLS encryption modes.** None of these take effect on
  DNS-only records. Configuring them is not harmful, it is simply inert — and
  reading their dashboard state as "protection we have" is a real hazard when
  writing a threat model.

Performance and security headers are handled where the site is actually served:
GitHub Pages for TLS and CDN, and the application for everything else.

## The record set

DNS is managed by automation, not by hand. The standard set for a GitHub Pages
site is:

| Type | Name | Value | Proxy |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | DNS-only |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` | DNS-only |
| CNAME | `www` | `freeforcharity.github.io` | DNS-only |

TTL is left on **Auto**. Mail (MX/SPF/DKIM for Microsoft 365) is part of the
same enforced standard — see the automation repo's
`docs/enforce-standard-workflow.md`.

## Making a DNS change

**Do not edit records by hand in the Cloudflare dashboard.** Drift between the
dashboard and the enforced standard is silently reverted the next time
enforcement runs, and hand edits are the usual source of a stray proxied record.

Use the automation repo's workflows:

| Need | Workflow |
| --- | --- |
| See current state across Cloudflare + M365 | *101. Domain - Status (All Sources)* |
| Apply the standard record set | *106. Enforce Standard* |
| Add or change a single record | *105. Manage Record* |
| Set up a redirect | *111. DNS - Create Redirect Rule* |

Both status and enforce support a dry-run preview, and can post results back to
an issue.

## How this interacts with the site

`public/CNAME` must match the custom domain bound in the GitHub Pages API. They
are two different things — the file is the build artifact's claim, the API
binding is what GitHub actually serves — and they can drift apart.
`.github/workflows/post-deploy-smoke.yml` resolves the domain from the Pages API
and **fails the deploy** if `public/CNAME` disagrees, because a mismatch means
the site was built for the wrong host.

The same smoke waits out Let's Encrypt provisioning (5–15 minutes) after a
domain change before declaring an HTTPS failure, so a red smoke immediately
after a cutover is usually just certificate issuance.

## Troubleshooting

**A `cf-ray` header appeared.** A record has been switched to proxied. Run *101.
Domain - Status* to confirm, then *106. Enforce Standard* to put it back.

**Site unreachable right after a DNS change.** Give certificate provisioning up
to 20 minutes. `dig +short bintobetter.org` should return the four GitHub Pages
IPv4 addresses; if it returns Cloudflare addresses (`104.*`, `172.67.*`), the
record is proxied.

**Changes not appearing after a deploy.** This is not Cloudflare — there is no
Cloudflare cache in the path. Check the *Deploy to GitHub Pages* workflow run
and then your browser cache.

## Additional Resources

- [FFC-Cloudflare-Automation](https://github.com/FreeForCharity/FFC-Cloudflare-Automation) — DNS automation, workflows, runbooks
- [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) — Pages configuration on the GitHub side
- [DEPLOYMENT.md](./DEPLOYMENT.md) — build and deploy pipeline
- [AGENTS.md](./AGENTS.md) — structural and compliance contracts
