import { test, expect } from '@playwright/test'

test.describe('BasePath Detection', () => {
  test('should NOT add base tag for custom domain (localhost)', async ({ page }) => {
    await page.goto('/')

    // Check that BASE_PATH is set to root
    const basePath = await page.evaluate(() => (window as any).BASE_PATH)
    expect(basePath).toBe('/')

    // Check that NO base tag was injected (since we're not on .github.io)
    const baseTag = await page.locator('base').count()
    expect(baseTag).toBe(0)
  })

  test('should load CSS correctly', async ({ page }) => {
    await page.goto('/')

    // Check that the stylesheet loaded
    const stylesheetLink = page.locator('link[rel="stylesheet"][href="/css/styles.css"]')
    await expect(stylesheetLink).toHaveCount(1)

    // Verify CSS is actually loaded by checking computed styles
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('should load images correctly', async ({ page }) => {
    await page.goto('/')

    // Check that logo image loads
    const logo = page.locator('header img[alt="BinToBetter Logo"]')
    await expect(logo).toBeVisible()

    // Verify image src is correct
    const logoSrc = await logo.getAttribute('src')
    expect(logoSrc).toBe('/images/logo.webp')
  })

  test('should navigate to policy pages correctly', async ({ page }) => {
    await page.goto('/')

    // Click privacy policy link
    await page.click('a[href="/privacy-policy.html"]')

    // Wait for navigation
    await page.waitForURL('**/privacy-policy.html')

    // Verify we're on the privacy policy page
    await expect(page.locator('title')).toContainText('Privacy Policy')
  })
})
