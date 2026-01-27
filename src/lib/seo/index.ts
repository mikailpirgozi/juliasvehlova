/**
 * SEO Module Exports
 * Central re-export for all SEO utilities
 */

// Constants
export {
  COMPANY_NAME,
  COMPANY_LEGAL_NAME,
  BASE_URL,
  CONTACT,
  SOCIAL_LINKS,
  OPENING_HOURS,
  SEO_DEFAULTS,
} from './constants'

// Metadata utilities
export {
  DEFAULT_KEYWORDS,
  pageMetadata,
  getPageMetadata,
  generatePageMetadata,
  generateServiceMetadata,
  generateBlogPostMetadata,
  getBaseMetadata,
} from './metadata'
