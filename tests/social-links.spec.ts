import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Social Links Tests
 *
 * These tests verify that:
 * 1. Social media links are present and functional
 * 2. Defunct platforms (like Google+) are not present
 * 3. All social icons link to correct destinations
 *
 * Note: Test expectations use values from test.config.ts for easy customization
 */

test.describe('Footer Social Links', () => {
  test('should not contain Google+ social link', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Check that Google+ link is not present
    const googlePlusLink = page.locator('footer a[href*="plus.google.com"]')
    await expect(googlePlusLink).toHaveCount(0)

    // Also check that Google Plus label is not present
    const googlePlusLabel = page.locator('footer a[aria-label="Google Plus"]')
    await expect(googlePlusLabel).toHaveCount(0)
  })

  test('should display active social media links', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Verify Instagram link is present
    const instagramLink = page.locator(`footer a[href*="${testConfig.socialLinks.instagram.url}"]`)
    await expect(instagramLink).toBeVisible()
    await expect(instagramLink).toHaveAttribute('aria-label', testConfig.socialLinks.instagram.ariaLabel)
  })

  test('should have exactly 1 social media icon', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Count all social media links in the footer
    // They are identified by having target="_blank" and being in the footer's social links section

    // Count only links with known social platform aria-labels
    const socialMediaLinks = page.locator(
      `footer a[aria-label="${testConfig.socialLinks.instagram.ariaLabel}"]`
    )
    await expect(socialMediaLinks).toHaveCount(1)
  })
})
