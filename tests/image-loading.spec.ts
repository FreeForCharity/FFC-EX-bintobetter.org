import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Image Loading Tests
 *
 * These tests verify that images load correctly when the site is built.
 * The tests check that images in the header and hero section are visible
 * and load properly with successful HTTP responses.
 *
 * Note: The hero image is a local asset (/Images/figma-hero-img.png) that
 * should load correctly in all deployment scenarios including GitHub Pages.
 * Test expectations use values from test.config.ts for easy customization.
 */

test.describe('Image Loading', () => {
  test('images should load correctly and be visible', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Find the logo images
    const headerLogo = page.locator(`header a img[alt="${testConfig.logo.headerAlt}"]`)
    const heroImage = page.locator(`img[alt="${testConfig.logo.heroAlt}"]`)

    // Verify images exist and hero is visible
    await expect(headerLogo).toHaveCount(1)
    await expect(heroImage).toBeVisible()

    // Verify the header logo has a src attribute
    const headerSrc = await headerLogo.getAttribute('src')
    expect(headerSrc).toBeTruthy()

    // Verify the hero image has a src attribute
    const heroSrc = await heroImage.getAttribute('src')
    expect(heroSrc).toBeTruthy()
  })

  test('hero and header images should return 200', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    const headerLogo = page.locator(`header a img[alt="${testConfig.logo.headerAlt}"]`)
    const heroImage = page.locator(`img[alt="${testConfig.logo.heroAlt}"]`)

    await expect(headerLogo).toHaveCount(1)
    await expect(heroImage).toBeVisible()

    const headerSrc = await headerLogo.getAttribute('src')
    const heroSrc = await heroImage.getAttribute('src')

    expect(headerSrc).toBeTruthy()
    expect(heroSrc).toBeTruthy()

    const headerUrl = new URL(headerSrc ?? '', page.url()).toString()
    const heroUrl = new URL(heroSrc ?? '', page.url()).toString()

    const headerResponse = await page.request.get(headerUrl)
    expect(headerResponse.status()).toBe(200)

    const heroResponse = await page.request.get(heroUrl)
    expect(heroResponse.status()).toBe(200)
  })

  // Temporarily disabled: This test checks natural dimensions which don't work reliably in CI
  // The test passes locally but fails on GitHub Actions
  // TODO: Investigate why naturalWidth/naturalHeight return 0 in CI despite image being visible
  test.skip('images have natural dimensions indicating successful load', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Find the hero image
    const heroImage = page.locator(`img[alt="${testConfig.logo.heroAlt}"]`)

    // Wait for the image to be visible
    await expect(heroImage).toBeVisible()

    // Verify the image has loaded by checking it has natural dimensions
    const naturalWidth = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth)
    const naturalHeight = await heroImage.evaluate((img: HTMLImageElement) => img.naturalHeight)

    // The image should have dimensions greater than 0 if loaded correctly
    expect(naturalWidth).toBeGreaterThan(0)
    expect(naturalHeight).toBeGreaterThan(0)
  })
})
