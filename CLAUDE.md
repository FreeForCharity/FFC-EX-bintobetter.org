# CLAUDE.md

The instructions for this repository live in **[AGENTS.md](./AGENTS.md)**. Read
that file first — it applies in full.

They are kept in one place deliberately: this repository has already been broken
once by a change that satisfied one set of conventions while silently violating
another, and duplicated guidance is how those sets drift apart.

Three points are worth repeating because they are the ones most easily missed:

1. **Free For Charity is Bin to Better's digital infrastructure partner, not its
   fiscal sponsor.** Never add a sponsoring entity, EIN, or 501(c)(3) claim to
   the site. A test enforces this.
2. **The site tree must stay under `src/`.** It is a contract with FFC's fleet
   automation, not a preference. `__tests__/layout-contract.test.ts` pins it.
3. **Production is GitHub Pages, not Vercel.** Work built elsewhere gets ported
   *into* this structure — never copied over the top of it.
