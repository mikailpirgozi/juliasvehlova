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
  phone: '+421 911 992 211',
  email: 'juliaesteticclinic@gmail.com',
  address: {
    street: 'Javorová 2',
    city: 'Malacky',
    postalCode: '901 01',
    country: 'Slovakia',
    countryCode: 'SK',
  },
  geo: {
    // Approx. Malacky (Javorová 2). Verify the exact building coordinates in
    // Google Business Profile → "Edit profile → Location" and copy them here
    // (5+ decimal places) so Maps/local SEO pin the correct spot.
    latitude: '48.4369',
    longitude: '17.0218',
  },
} as const

// =============================================================================
// SOCIAL MEDIA
// =============================================================================

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/people/Julia-Estetic-Clinic/61560460323854/',
  instagram: 'https://www.instagram.com/juliaesteticclinic',
  youtube: 'https://youtube.com/@juliaesteticclinic',
  tiktok: 'https://www.tiktok.com/@juliaesteticclinic_',
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
