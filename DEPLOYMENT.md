# Deployment Guide

**Applies to:** bintobetter.org
**Authoritative source for architecture and contracts:** [AGENTS.md](./AGENTS.md)
**Last reviewed:** August 2026

This document explains how the Bin to Better website (bintobetter.org) is deployed to GitHub Pages.

## Table of Contents

1. [Overview](#overview)
2. [Deployment Architecture](#deployment-architecture)
3. [Automated Deployment](#automated-deployment)
4. [Manual Deployment](#manual-deployment)
5. [Domain Configuration](#domain-configuration)
6. [Troubleshooting](#troubleshooting)
7. [Rollback Procedures](#rollback-procedures)

---

## Overview

The site is a Next.js **static export** (`output: "export"`) deployed to GitHub Pages. It is accessible at:

- **Custom Domain**: https://bintobetter.org/
- **GitHub Pages URL**: https://freeforcharity.github.io/FFC-EX-bintobetter.org/ (redirects to custom domain)

### Technology Stack

- **Production**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Output**: static export to `out/` — no server, no runtime
- **Hosting**: GitHub Pages, custom apex domain
- **CI/CD**: GitHub Actions (`ci.yml`, `deploy.yml`, `post-deploy-smoke.yml`)
- **Build required**: `npm ci && npm run build` — the repository does **not**
  contain pre-rendered HTML

---

## Deployment Architecture

### Repository Structure

```
src/                     # The site. See AGENTS.md — this location is a contract.
├── app/                 # Routes (App Router)
├── components/          # UI, layout, motion, analytics, consent
├── content/             # Typed copy modules — text lives here, not in JSX
└── lib/                 # Helpers and analytics config
public/                  # Static assets, CNAME, redirect stubs (root, per Next)
__tests__/               # Tests (root — FFC automation scans it there)
out/                     # Build output. Generated, git-ignored, never edited.
```

There is no `html-site/` directory. Earlier revisions of this guide described
one; that model has not applied since the site became a Next.js application.

### Asset Path Handling

Paths are handled by Next's own `basePath`, read from `NEXT_PUBLIC_BASE_PATH` in
`next.config.ts`. Leave it unset for the apex domain (the current setup); set it
to `/<repo>` only for a project-page deployment. Absolute URLs in the sitemap and
robots go through `absoluteUrl()` in `src/content/site.ts`, which applies the
same prefix.

A hand-rolled `assetPath` helper used to do this. It no longer exists.

---

## Automated Deployment

### GitHub Actions Workflow

Deployment is automated through a single GitHub Actions workflow:

**Deploy Workflow** (`.github/workflows/deploy.yml`)

#### Trigger Conditions

The deployment workflow runs automatically when:

1. **Push to main branch**: Automatically when changes are pushed to `main`
2. **Manual trigger**: From the Actions tab (workflow_dispatch)

#### Workflow Steps

1. **Checkout code**: Retrieves the latest code from the repository
2. **Setup Pages**: Configures GitHub Pages settings
3. **Upload artifact**: Packages the `./out` directory produced by `npm run build`
4. **Deploy to GitHub Pages**: Publishes the HTML static site

**Key features:**

- No dependencies to install
- No build step required
- Direct upload of pre-built HTML files
- Fast deployment (typically under 1 minute)

### Viewing Deployment Status

1. Go to the **Actions** tab in the GitHub repository
2. Click on the latest workflow run
3. Review the status of each step
4. Check logs if any step fails

---

## Manual Deployment

While automated deployment is recommended, manual deployment is straightforward.

### Prerequisites

- Git installed
- Write access to the repository

### Manual Deployment Steps

1. **Clone the repository** (if not already done):

   ```bash
   git clone https://github.com/FreeForCharity/FFC-EX-bintobetter.org.git
   cd FFC-EX-bintobetter.org
   ```

2. **Install dependencies and make your changes** under `src/`:

   ```bash
   npm ci
   npm run dev     # http://localhost:3000
   ```

3. **Verify before pushing** — all four must pass:

   ```bash
   npm run lint    # clean: no errors and no warnings
   npm test
   npm run build   # exports static routes to out/
   npm audit       # expect 0 vulnerabilities
   ```

4. **Commit and push** changes:

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

5. **Verify deployment**: 
   - Check GitHub Actions for workflow status
   - Visit the live site after deployment completes

---

## Domain Configuration

### GitHub Pages Configuration

1. Go to repository **Settings** → **Pages**
2. **Source**: Should show "GitHub Actions" (configured automatically)
3. **Custom domain**: Enter your domain (if applicable)

### Custom Domain Setup

If you want to use a custom domain:

1. **CNAME file** lives in `public/`:

   **CRITICAL: CNAME File Location**
   - `public/CNAME` - **ONLY location for CNAME**. Next copies `public/` into `out/` at build time, so it lands in the deployed artifact.
   - **DO NOT** create a CNAME file at the repository root
   
   **Why?** GitHub Pages serves the uploaded artifact. A CNAME at the repository root is not part of that artifact and does not reach the deployment. It must be in `public/` so the build copies it into `out/`. The post-deploy smoke additionally asserts that `public/CNAME` matches the domain actually bound in the Pages API, and fails the deploy if they have drifted apart.

   The file should contain:

   ```
   bintobetter.org
   ```

2. **Configure DNS records** at your domain provider:

   For apex domain (bintobetter.org):
   - **Type**: A or ALIAS (depending on DNS provider)
   - **Name**: @ (root domain)
   - **Value**: GitHub Pages IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

   For www subdomain (optional):
   - **Type**: CNAME
   - **Name**: www
   - **Value**: freeforcharity.github.io

3. **GitHub Pages Settings**:
   - Navigate to repository Settings → Pages
   - Custom domain should show: `bintobetter.org`
   - HTTPS should be automatically enabled

4. **Important Notes**:
   - The `public/CNAME` file is critical for deployment
   - Without this file, GitHub Pages loses custom domain configuration on each deployment
   - The deployment workflow deploys the built `out/` directory only
   - Custom domain works independently of the basePath configuration
   - See note above about CNAME file location requirements

### DNS Propagation

After configuring DNS:

- Changes can take 24-48 hours to propagate
- Use `dig` or online DNS tools to verify propagation
- Clear browser cache when testing

---

## Environment Variables

### Build-Time Variables

   Add an A record or CNAME record pointing to GitHub Pages:

   **For A records** (apex domain like `example.org`):
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **For CNAME record** (subdomain like `www.example.org`):
   ```
   <username>.github.io
   ```

3. **Enable HTTPS** in GitHub Pages settings (recommended)

4. **Wait for DNS propagation** (can take up to 24-48 hours)

### Verify Custom Domain

```bash
# Check DNS propagation
dig yourdomain.org

# Check if site is accessible
curl -I https://yourdomain.org
```

---

## Troubleshooting

### Common Issues

#### Issue: Images or Assets Not Loading

**Symptoms**: Images show as broken links, CSS not applied

**Cause**: Incorrect asset paths

**Solution**:
1. Verify all asset paths use root-relative paths: `/css/`, `/images/`, etc.
2. Check browser console for 404 errors
3. Ensure the asset exists in `public/` (or is imported through `next/image`) and appears in `out/` after a build
4. Verify the custom domain (bintobetter.org) is properly configured

#### Issue: 404 Page Not Found

**Symptoms**: Page shows 404 error

**Cause**: Incorrect URL or missing file

**Solution**:
1. Verify the route exists under `src/app/` and is listed in `src/app/sitemap.ts`
2. Check that the URL includes the basePath prefix
3. Ensure file names match exactly (case-sensitive)

#### Issue: Changes Not Appearing

**Symptoms**: Deployed site shows old content

**Cause**: Browser cache or deployment delay

**Solution**:
1. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
2. Check GitHub Actions to verify deployment succeeded
3. Clear browser cache
4. Try incognito/private browsing mode

#### Issue: Deployment Failed

**Symptoms**: GitHub Actions workflow shows failure

**Cause**: Various potential issues

**Solution**:
1. Check workflow logs in Actions tab
2. Verify repository has GitHub Pages enabled
3. Check repository permissions
4. Ensure `npm run build` succeeded and `out/` contains the expected files

### Deployment Logs

To view detailed deployment logs:

1. Go to **Actions** tab
2. Click on the failed workflow run
3. Click on the "Deploy to GitHub Pages" job
4. Expand each step to see detailed logs
5. Look for error messages or warnings

### Testing Locally

Before pushing to production, test locally:

```bash
# Preview the real static export, exactly as GitHub Pages will serve it
npm run build
npx serve@latest out

# Or the dev server for iteration
npm run dev
```

---

## Rollback Procedures

### Rolling Back to a Previous Deployment

If a deployment introduces issues, you can roll back:

#### Method 1: Revert the Commit

```bash
# Find the commit to revert
git log --oneline

# Revert the problematic commit
git revert <commit-hash>

# Push the revert
git push origin main
```

#### Method 2: Re-deploy a Previous Version

```bash
# Reset to a previous commit
git reset --hard <previous-commit-hash>

# Force push (use with caution)
git push --force origin main
```

**Warning**: Force push will rewrite history. Only use if necessary.

#### Method 3: Manual Trigger from Actions

1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch/commit to deploy

### Emergency Rollback

If the site is completely broken:

1. Identify the last working commit from git history
2. Create a new branch from that commit
3. Update the deployment to use that branch temporarily
4. Fix the issues on main branch
5. Re-deploy main when fixed

---

## Deployment Checklist

Before deploying to production:

- [ ] Test all changes locally
- [ ] Verify all links work
- [ ] Check that images and assets load correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Verify all policy pages are accessible
- [ ] Check console for JavaScript errors
- [ ] Ensure no broken links
- [ ] Verify forms and interactive elements work
- [ ] Test with and without custom domain (if applicable)

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
