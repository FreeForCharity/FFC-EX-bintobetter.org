# AGENTS.md

Instructions for AI coding agents and automated contributors working in this
repository. Human contributors should read [CONTRIBUTING.md](./CONTRIBUTING.md);
everything here applies to them too.

This file exists because a previous change replaced most of this repository
wholesale with a separately built site, and several things broke quietly as a
result. The rules below are the specific lessons from that, not generic advice.

---

## 1. What this repository is

`bintobetter.org` — the public website of **Bin to Better**, a student-led
nonprofit working on waste reduction and reuse.

**Free For Charity (FFC) is Bin to Better's digital infrastructure partner.**
FFC provides and maintains the website, hosting, domain, and the automation
around them.

**FFC is _not_ Bin to Better's fiscal sponsor, and must never be described as
one.** FFC is separately a 501(c)(3) with its own EIN; that is FFC's own
identity and belongs only in documents describing FFC itself. It says nothing
about who receives Bin to Better's donations.

Donations run through **PledgeIt**, whose checkout may name a different entity
(Ecologistics) as fiscal sponsor or payment recipient. Because the site cannot
stand behind a tax claim it does not control:

- **Never** add a sponsoring entity, EIN, or 501(c)(3) claim to the site's page
  layer (`src/app`, `src/components`, `src/content`, `src/lib`).
- `__tests__/legal.test.tsx` fails if one appears. Do not weaken that test to
  make a change pass — the test is the requirement.
- `/terms-of-service` defers to PledgeIt's checkout and receipt language. Keep
  it that way.

This repository was generated from the FFC website template. Some documentation
still carries template phrasing about "the Free For Charity website" — if you
find any, it is a bug: this repo is Bin to Better's site.

---

## 2. Deployment: GitHub Pages, not Vercel

The site is a **Next.js static export** (`output: "export"`) served by **GitHub
Pages** from `.github/workflows/deploy.yml`.

Vercel is used only as a preview/scratch environment (`bin2b.vercel.app`). It is
**not** the production target and must never become the source of truth.

This matters because it has already gone wrong. A redesign was built as a
separate `create-next-app` project on a developer's machine, previewed on
Vercel, then copied into this repository wholesale — replacing the existing
layout and silently changing repo-wide conventions. Consequences that nobody
noticed at the time:

- The site tree moved out of `src/`, which broke FFC fleet automation (§3).
- `CONTRIBUTING.md` and `README.md` kept documenting the old structure, so the
  docs and the code disagreed for months.
- ~2 MB of unrelated personal files (school documents) were committed along
  with it.
- Docs describing a superseded implementation stayed in the repo, contradicting
  what the site actually did.

**If you are bringing in work built outside this repository:**

1. Port it **into** the existing structure. Do not replace the structure with
   the scaffold's defaults.
2. Keep `package.json`'s `name` as this project's name. A rename is a sign the
   scaffold is overwriting the repo rather than being merged into it.
3. Commit source only. No `.docx`, `.pdf`, screenshots, personal files, or
   scratch output. Check `git status` before committing.
4. If a convention genuinely needs to change, change the documentation in the
   same pull request. A structural change that leaves the docs stale is
   incomplete.

Because static export is the target, these do not exist and will not work:
middleware, route handlers, server actions, on-demand image optimization,
server-side redirects, or any runtime environment variable. Redirects are
meta-refresh stubs in `public/`.

---

## 3. The layout contract — do not move the site tree

```
src/app/          routes
src/components/   UI + motion components
src/content/      typed copy modules (text lives here, not inline in JSX)
src/lib/          helpers, analytics config
public/           static assets — MUST stay at the repo root (Next requires it)
__tests__/        tests — MUST stay at the repo root (see below)
```

`src/` is **not** a style preference. FFC's fleet automation
(`FFC-Cloudflare-Automation/scripts/analytics-wire.ps1`, driven by workflow
*704. Website - Analytics Wire*) classifies a site as a Next.js template site
only when it finds **`package.json` AND `src/`** at the repo root, and throws
`Could not classify site type` otherwise. It then rewrites tracking ids in
`src/lib/analytics.config.ts` and rewires
`src/components/google-tag-manager/index.tsx`.

The same script scans `$RepoDir/__tests__` to keep test fixtures holding an old
GTM id in sync, which is why that directory stays at the root too.

When the site tree left `src/`, workflow 704 could no longer run against this
repo — and nothing failed loudly. `__tests__/layout-contract.test.ts` now pins
all of this. **If the layout must change, update workflow 704 in
`FreeForCharity/FFC-Cloudflare-Automation` first, then this repo.** Do not
delete the contract test to make a restructure pass.

`src/lib/analytics.config.ts` has a second, subtler contract: the automation
rewrites ids with regexes anchored on `gtmId:\s*'[^']*'` and
`gaMeasurementId:\s*'[^']*'`. Reformatting that file to double quotes, renaming
a key, or dropping `as const` turns an automated re-wire into a **silent no-op**
rather than an error. Leave its formatting alone.

---

## 4. Compliance is enforced by tests and by CI, not by good intentions

Two tripwires exist because the published claims are legal ones:

- **No undisclosed tracker.** `__tests__/legal.test.tsx` fails if analytics,
  a pixel, an embed, or web storage appears outside the two sanctioned
  directories (`src/components/google-tag-manager`,
  `src/components/cookie-consent`) — including in `public/`, which ships to the
  site root verbatim on a static export.
- **The privacy policy must match what actually loads**, in both directions:
  copy that stops describing a configured tag fails, and a tag the copy does not
  name fails.

Both the rendered body **and page metadata** are asserted. A stale claim once
survived in a `meta description`, which is published to search results but never
appears in the rendered body.

`.github/workflows/post-deploy-smoke.yml` independently verifies the live site
after every deploy: footer policy links, donation capability, and a tri-state
cookie check — a consent banner is required only if the site actually sets
cookies, uses web storage, or loads third-party resources. Do **not** set
`SMOKE_REQUIRE_COOKIE_CONSENT=false` to quiet it; that suppresses the real
failure if a tracker is added later.

If a compliance test fails, fix the site or fix the copy. Do not weaken the test.

---

## 5. Before you open a pull request

```bash
npm ci
npm run lint     # must be clean — no errors and no warnings
npm test         # must pass
npm run build    # must succeed and export static routes
npm audit        # should report 0 vulnerabilities
```

Dependency notes, verified rather than assumed:

- **eslint majors are pinned back.** eslint 10 breaks `eslint-plugin-react`
  bundled inside `eslint-config-next`.
- **TypeScript majors are pinned back.** TS 7 builds fine (and faster) but
  breaks the bundled `typescript-eslint`, so `npm run lint` dies.
- **`@types/node` majors follow the CI runtime** (Node 24). Raise them together
  with `node-version` in the workflows, never on their own.

These are recorded in `.github/dependabot.yml` with the specific failures. Retry
them when `eslint-config-next` ships support — do not simply un-pin.

---

## 6. House style

- Copy belongs in `src/content/`, not inline in JSX, so text can be corrected
  without touching markup.
- Comments should explain **why**, especially where something looks odd. Much of
  this codebase's non-obvious code is load-bearing for a compliance or
  automation contract.
- Match the surrounding code's conventions rather than importing your own.
