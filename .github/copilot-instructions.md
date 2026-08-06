# Copilot / AI agent instructions — bintobetter.org

**Read [AGENTS.md](../AGENTS.md) first.** It is the authoritative guidance for
this repository and applies in full. This file is a short orientation plus the
few facts most often got wrong.

> **This file previously described a different repository.** It documented an
> `html-site/` production directory, a two-version HTML + Next.js system, and
> `src/` as *"NOT deployed (CI testing only)"* — none of which is or was true
> here. It was FFC template boilerplate that had never been adapted. If you were
> relying on any of that, discard it.

## What this repository actually is

- **Bin to Better's** website, `bintobetter.org`. Not Free For Charity's own
  site.
- **Next.js static export** (`output: "export"`) → **GitHub Pages**, via
  `.github/workflows/deploy.yml`. There is no `html-site/` directory.
- **`src/` is production.** It holds the entire site tree: `src/app`,
  `src/components`, `src/content`, `src/lib`.
- Vercel (`bin2b.vercel.app`) is a preview environment only, never the source of
  truth.

## The three things most easily got wrong

1. **Free For Charity is the digital infrastructure partner, not the fiscal
   sponsor.** Never add a sponsoring entity, EIN, or 501(c)(3) claim to the
   site's page layer. Donations go through PledgeIt, whose checkout may name a
   different entity. `__tests__/legal.test.tsx` enforces this.

2. **Do not move the site tree out of `src/`.** It is a contract with FFC fleet
   automation (workflow *704. Website - Analytics Wire*), which only recognises
   a template site by `package.json` + `src/`. `public/` and `__tests__/` stay
   at the repo root. `__tests__/layout-contract.test.ts` pins all of it.

3. **Never replace this repository wholesale with a scaffold built elsewhere.**
   Port work *into* the existing structure. That mistake is what produced the
   stale docs this file is correcting.

## Checks before opening a PR

```bash
npm ci && npm run lint && npm test && npm run build
```

Lint must be clean (no errors, no warnings). If a compliance test fails, fix the
site or fix the copy — do not weaken the test.
