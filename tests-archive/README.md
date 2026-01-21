# Archived Playwright Specs (Template-Only)

This folder preserves the original template Playwright specs that were removed from the active test suite when the site was rebuilt to match the BinToBetter PDF.

Why this exists:
- These specs targeted template-only features (cookie consent, GTM, events, application form, etc.).
- The BinToBetter PDF-driven site does not include those features, so the specs were removed from `tests/` to keep CI aligned with the intended production scope.
- Keeping them here makes it easy to reintroduce any of those features later, using the old tests as a starting point.

Notes:
- Playwright runs tests from `./tests` (see `playwright.config.ts`), so files here do **not** execute.
- If you decide to re-add a feature, move the relevant spec back into `tests/` and update expectations in `tests/test.config.ts`.
