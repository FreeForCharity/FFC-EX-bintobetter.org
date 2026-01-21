/**
 * Test Configuration for Template Customization
 *
 * This file contains all content-specific values used in E2E tests.
 * When customizing this template for a new organization, update these
 * values to match your content instead of modifying individual test files.
 *
 * This makes it easy to:
 * 1. Identify what needs to change when using the template
 * 2. Keep tests working with customized content
 * 3. Maintain a single source of truth for test expectations
 */

export const testConfig = {
  /**
   * Social Media Links Configuration
   * Used in: tests/social-links.spec.ts
   */
  socialLinks: {
    instagram: {
      url: 'instagram.com/bintobetter',
      ariaLabel: 'Instagram',
    },
  },

  /**
   * Copyright Configuration
   * Used in: tests/copyright.spec.ts
   */
  copyright: {
    text: 'BinToBetter. All rights reserved.',
    searchText: 'All rights reserved.',
  },

  /**
   * Logo Configuration
   * Used in: tests/logo.spec.ts
   */
  logo: {
    headerAlt: 'BinToBetter Logo',
    heroAlt: 'Hero image',
  },
}
