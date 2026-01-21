# PDF → Site Migration Steps (BinToBetter)

This document records the concrete steps taken to migrate the production static website under `html-site/` to match the content and section structure defined by the large BinToBetter PDF.

## Scope and Source of Truth

- **Production output:** `html-site/` (this is what GitHub Pages deploys).
- **Development/CI tests:** Playwright specs in `tests/` validate the static site.
- **Authoritative content:** `Bin to Better_ Website Content & Outline.pdf`.

## High-Level Approach

1. Treat the PDF as the **single source of truth** for nav, section names, copy, and imagery.
2. Extract PDF text + embedded images (for accuracy and to avoid manual copy/paste errors).
3. Rebuild `html-site/index.html` around the PDF’s required navigation/sections.
4. Add only the CSS/JS needed for the new structure.
5. Update Playwright tests to validate the new site (and archive old template-only specs).

## Step-by-Step Record

### 1) Locate the PDF content

- Confirmed the PDF existed in the repo root:
  - `Bin to Better_ Website Content & Outline.pdf`

### 2) Extract text and embedded images from the PDF

Purpose:
- Turn the PDF into machine-readable artifacts to guide implementation.

Actions:
- Added a small helper script:
  - `tools/extract-pdf.py`
- Used **PyMuPDF** to:
  - export page text into a markdown file
  - export embedded images
  - generate an index JSON describing images by page/xref

Typical run flow (example):
- Install Python dependencies (local environment)
- Run the extraction script (generates a `pdf-extract/` output folder)

Notes:
- The extracted output is useful for verification and repeatability, but the production site only needs the final assets under `html-site/`.

### 3) Make extracted images available to the production site

Purpose:
- The static site must serve images directly from `html-site/`.

Actions:
- Copied the extracted images into:
  - `html-site/images/pdf/`

Decision:
- Kept the extracted filenames (e.g., `page-17-xref-69.png`) to preserve traceability back to the PDF.
- Semantic renaming can be done later as a follow-on improvement once content is fully stable.

### 4) Rebuild homepage structure to match the PDF

Primary file:
- `html-site/index.html`

Actions:
- Replaced the previous template navigation with the PDF-driven tabs/anchors.
- Reworked the main page content into the PDF’s sections:
  - Home
  - About
  - Partners
  - Corporate Partners
  - Projects (with per-project detail sections)
  - Officers & Team
  - Contact
  - Donate

Key decisions:
- Removed template sections that were **not** present in the PDF (to avoid content drift and brittle tests).
- Used PDF-extracted images for hero/section imagery.

### 5) Update styles to support new sections

Primary file:
- `html-site/css/styles.css`

Actions:
- Added styles required by new markup (directories, grids, contact form, etc.).
- Added styling for the Donate CTA link.

### 6) Update JavaScript to match the new page structure

Primary file:
- `html-site/js/main.js`

Actions:
- Replaced the prior script with a clean minimal script aligned to the new DOM.
- Kept only needed behaviors:
  - sticky header scroll state
  - smooth scrolling for `/#section` anchor links
  - testimonial carousel controls
  - contact form “mailto:” handler
  - footer year update

Decision:
- Dropped cookie-consent/GTM/events logic because the PDF-driven site does not define those features.

### 7) Align the Playwright test suite with the PDF-driven site

Primary files:
- `tests/test.config.ts`
- `tests/logo.spec.ts`
- `tests/image-loading.spec.ts`
- `tests/social-links.spec.ts`
- `tests/copyright.spec.ts`

Actions:
- Updated test expectations (branding, social links, image assertions) to match BinToBetter.
- Removed template-only test specs from `tests/`.

Preservation:
- To keep the old template tests “in repo in case we need them again”, they were copied into:
  - `tests-archive/`

Because Playwright runs from `./tests` (see `playwright.config.ts`), archived specs do not execute.

### 8) Validate locally

Actions:
- Install test deps:
  - `npm install`
- Run E2E tests:
  - `npm test`

Expected result:
- Tests pass against `npm run preview` (serves `html-site/` on port 8000).

### 9) Open a PR

Actions:
- Created branch: `issue-17-bintobetter-pdf-site`
- Opened PR:
  - https://github.com/FreeForCharity/FFC-EX-bintobetter.org/pull/18

## What Was Intentionally Left as Follow-On Work

- **Policy pages** in `html-site/` (privacy/cookie/terms): the PDF doesn’t define these; decide whether to replace with BinToBetter-specific content, remove them, or keep but unlink.
- **Semantic image naming:** `html-site/images/pdf/*` currently mirrors PDF extraction names; optionally rename and update references once content is finalized.

## Repo Hygiene Notes

- The source PDF is ~46MB. Committing it is possible, but it increases repo size. If you want it tracked, consider placing it under a `docs/` or `source/` folder and documenting retention expectations.
- The extracted image set used by production is already included under `html-site/images/pdf/`.
