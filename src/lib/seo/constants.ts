/**
 * SEO Constants for Julia Estetic Clinic
 * Central configuration for all SEO-related values
 */

// =============================================================================
// COMPANY INFORMATION
// =============================================================================

export const COMPANY_NAME = 'Julia Estetic Clinic'
export const COMPANY_LEGAL_NAME = 'Julia Estetic Clinic s.r.o.'
export const BASE_URL = 'https://juliaesteticclinic.sk'

// =============================================================================
// CONTACT INFORMATION
// =============================================================================

export const CONTACT = {
  phone: '+421 123 456 789', // TODO: Update with real phone
  email: 'info@juliaesteticclinic.sk',
  address: {
    street: 'Hlavná ulica 1', // TODO: Update with real address
    city: 'Malacky',
    postalCode: '901 01',
    country: 'Slovakia',
    countryCode: 'SK',
  },
  geo: {
    latitude: '48.4369', // TODO: Update with real coordinates
    longitude: '17.0218',
  },
} as const

// =============================================================================
// SOCIAL MEDIA
// =============================================================================

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/juliaesteticclinic',
  instagram: 'https://www.instagram.com/juliaesteticclinic',
} as const

// =============================================================================
// OPENING HOURS
// =============================================================================

export const OPENING_HOURS = {
  weekdays: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  saturday: {
    days: ['Saturday'],
    opens: '09:00',
    closes: '14:00',
  },
  sunday: {
    days: ['Sunday'],
    closed: true,
  },
} as const

// =============================================================================
// SEO DEFAULTS
// =============================================================================

export const SEO_DEFAULTS = {
  locale: 'sk_SK',
  language: 'sk',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image' as const,
  priceRange: '€€',
  currency: 'EUR',
} as const
