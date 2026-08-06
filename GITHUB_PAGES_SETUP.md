# GitHub Pages Setup Guide

**Applies to:** bintobetter.org
**Authoritative source for architecture and contracts:** [AGENTS.md](./AGENTS.md)
**Last reviewed:** August 2026

## Quick Start: Enable GitHub Pages for Bin to Better

If you're seeing a 404 error at https://bintobetter.org/, follow these steps to enable and deploy GitHub Pages.

---

## Step 1: Enable GitHub Pages (2 minutes)

1. **Go to repository settings:**
   - Navigate to: `https://github.com/FreeForCharity/FFC-EX-bintobetter.org/settings/pages`
   - Or click: **Settings** tab → **Pages** in the left sidebar

2. **Configure Build and deployment:**
   - Under "Build and deployment"
   - **Source**: Select `GitHub Actions` from the dropdown
     - Do NOT select "Deploy from a branch"
     - GitHub Actions is required for this repository

3. **Configure Custom domain:**
   - Scroll down to "Custom domain" section
   - Enter: `bintobetter.org`
   - Click **Save**
   - Wait for GitHub to verify the domain (usually 1-10 minutes)
     - A green checkmark ✅ will appear when verified
     - A warning about DNS may appear initially - this is normal if DNS is already configured

   **⚠️ CRITICAL: GitHub will auto-create a CNAME file**
   
   When you save the custom domain, GitHub automatically creates a `CNAME` file in the **repository root** and commits it. This will **BREAK** the deployment because it causes GitHub Pages to serve repository root files instead of the built site.
   
   **You MUST delete this auto-created CNAME file:**
   
   After GitHub creates the CNAME commit, immediately:
   - The repository already has `/CNAME` in `.gitignore` to prevent this
   - But if you see a "Create CNAME" commit on main branch, you need to delete it:
     ```bash
     git pull origin main
     git rm CNAME
     git commit -m "Remove auto-created root CNAME (conflicts with public/CNAME)"
     git push origin main
     ```
   - Or use the GitHub UI: delete the CNAME file from the root directory
   
   The CNAME file **MUST** only exist at `public/CNAME`. Next copies `public/` into `out/` at build time, so it reaches the deployment artifact from there.

4. **Enable HTTPS:**
   - After domain verification, a checkbox labeled "Enforce HTTPS" will appear
   - Check the **"Enforce HTTPS"** box
   - This ensures all traffic uses HTTPS

---

## Step 2: Deploy the Site (3 minutes)

### Option A: Automatic Deployment (Recommended)

If you have changes to merge:

1. Merge any pending pull requests to the `main` branch
2. The deployment workflow will automatically run
3. Go to Step 3 to monitor the deployment

### Option B: Manual Deployment

If you just want to deploy the current state:

1. **Go to Actions tab:**
   - Navigate to: `https://github.com/FreeForCharity/FFC-EX-bintobetter.org/actions`

2. **Select the deployment workflow:**
   - Click on "Deploy to GitHub Pages" in the left sidebar

3. **Run the workflow:**
   - Click the **"Run workflow"** button (top right)
   - Select `main` branch from the dropdown
   - Click the green **"Run workflow"** button
   - The workflow will start immediately

---

## Step 3: Monitor Deployment (1-2 minutes)

1. **Watch the workflow run:**
   - Stay on the Actions tab
   - You'll see a new workflow run appear with a yellow dot 🟡 (in progress)
   - Click on the workflow run to see detailed progress

2. **Wait for completion:**
   - The workflow typically takes 1-2 minutes
   - You'll see two jobs:
     - "Build for GitHub Pages" - Runs `npm ci && npm run build` and packages `out/`
     - "Deploy to GitHub Pages" - Deploys to GitHub Pages
   - When complete, both jobs will show green checkmarks ✅

3. **Verify deployment:**
   - Look for the deployment URL in the job output
   - Should show: `Deployed successfully to https://bintobetter.org`

---

## Step 4: Test the Site (2 minutes)

1. **Wait for propagation:**
   - Wait 1-2 minutes after deployment completes
   - GitHub Pages needs time to propagate changes

2. **Open the site:**
   - Open a new incognito/private browser window (important!)
   - Navigate to: `https://bintobetter.org`
   - The site should load correctly

3. **Verify functionality:**
   - Homepage should display Bin to Better branding
   - Navigation menu should work
   - Images and CSS should load correctly
   - Click through to test pages:
     - Privacy Policy: `https://bintobetter.org/privacy-policy.html`
     - Cookie Policy: `https://bintobetter.org/cookie-policy.html`
     - Terms of Service: `https://bintobetter.org/terms-of-service.html`

4. **Check HTTPS:**
   - URL should show `https://` (not `http://`)
   - Browser should show a lock icon 🔒
   - Click the lock to verify the SSL certificate is valid

---

## Common Issues and Solutions

### Issue: "Custom domain is not properly configured"

**Symptoms:**
- Warning message in GitHub Pages settings
- Cannot save custom domain

**Solution:**
1. Verify DNS A records are configured:
   ```bash
   dig bintobetter.org +short
   ```
   Should return GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

2. If DNS is not configured, see [DNS Configuration](#dns-configuration) below

3. If DNS is configured but GitHub shows warning:
   - Click **"Remove"** to clear the custom domain
   - Wait 1 minute
   - Re-enter `bintobetter.org` and click **Save**
   - Wait for verification

### Issue: Workflow fails with "permission denied"

**Symptoms:**
- Deployment workflow fails
- Error message mentions permissions

**Solution:**
1. Go to **Settings** → **Actions** → **General**
2. Scroll to "Workflow permissions"
3. Select **"Read and write permissions"**
4. Enable **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**
6. Re-run the workflow

### Issue: Site loads but shows broken images/CSS

**Symptoms:**
- Homepage loads but looks unstyled
- Images show as broken links
- Browser console shows 404 errors for assets

**Solution:**
This is NOT a GitHub Pages configuration issue. This is an asset path issue.

**Verification:**
- If `https://bintobetter.org` shows the homepage (even if unstyled), GitHub Pages IS working
- The issue is with asset paths in the HTML files

**Fix:**
1. Verify CNAME file contains correct domain:
   ```bash
   cat public/CNAME
   # Should output: bintobetter.org
   ```

2. This site uses root-relative paths and REQUIRES the custom domain
3. If custom domain is properly configured and site is still broken, this is a separate issue from 404 errors

---

## DNS Configuration

If you need to configure DNS for `bintobetter.org`:

### For Apex Domain (bintobetter.org)

Create four A records pointing to GitHub Pages:

| Type | Name | Value           | TTL  |
|------|------|-----------------|------|
| A    | @    | 185.199.108.153 | 3600 |
| A    | @    | 185.199.109.153 | 3600 |
| A    | @    | 185.199.110.153 | 3600 |
| A    | @    | 185.199.111.153 | 3600 |

### For WWW Subdomain (Optional)

| Type  | Name | Value                      | TTL  |
|-------|------|----------------------------|------|
| CNAME | www  | freeforcharity.github.io   | 3600 |

### Provider-Specific Instructions

**Google Domains:**
1. Sign in to Google Domains
2. Select your domain
3. Click **DNS** in the left sidebar
4. Scroll to "Custom resource records"
5. Add the A records as shown above

**Cloudflare:**
1. Sign in to Cloudflare Dashboard
2. Select your domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Add the A records as shown above
6. Set Proxy status to **DNS only** (grey cloud icon). This site is deliberately
   **not** proxied through Cloudflare — see `CLOUDFLARE_SETUP.md` for why, and
   prefer the FFC automation workflows over editing records by hand.

**Namecheap:**
1. Sign in to Namecheap
2. Go to Domain List → Manage
3. Select **Advanced DNS** tab
4. Click **Add New Record**
5. Add the A records as shown above

**GoDaddy:**
1. Sign in to GoDaddy
2. Go to My Products → DNS
3. Click **Add** in DNS Management
4. Add the A records as shown above

---

## Verification Checklist

After completing setup, verify everything is working:

### Automated Verification

Run the verification script:

```bash
bash verify-deployment.sh
```

This script checks:
- Repository configuration
- CNAME file location and content
- Deployment workflow configuration
- DNS configuration
- All required files exist

### Manual Verification

- [ ] GitHub Pages enabled with source "GitHub Actions"
- [ ] Custom domain configured and verified (green checkmark)
- [ ] HTTPS enforced
- [ ] Deployment workflow completed successfully
- [ ] Site loads at https://bintobetter.org
- [ ] HTTPS lock icon appears in browser
- [ ] Images and CSS load correctly
- [ ] Navigation works
- [ ] Policy pages accessible

---

## Next Steps

Once GitHub Pages is working:

1. **Monitor deployments:**
   - Check the Actions tab after each push to `main`
   - Verify deployments complete successfully

2. **Set up alerts:**
   - Enable email notifications for workflow failures
   - Monitor domain expiration

3. **Regular testing:**
   - Test the site after each deployment
   - Verify all functionality works

4. **Documentation:**
   - Keep this guide updated if configuration changes
   - Document any customizations

---

## Getting Help

If you still have issues after following this guide:

1. **Run the verification script:**
   ```bash
   bash verify-deployment.sh
   ```

2. **Check detailed troubleshooting:**
   - See the GitHub Pages settings check above, and `.github/workflows/deploy.yml` for the deploy path

3. **Review deployment logs:**
   - Go to Actions tab
   - Click on the failed workflow run
   - Review error messages

4. **Contact support:**
   - Repository maintainers: See [CONTRIBUTORS.md](./CONTRIBUTORS.md)
   - Free For Charity: See [SUPPORT.md](./SUPPORT.md)
   - GitHub Pages: [GitHub Support](https://support.github.com)

---

## Reference

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)
- [Deployment Guide](./DEPLOYMENT.md) - Full deployment documentation
- [AGENTS.md](./AGENTS.md) - Deployment model and structural contracts
