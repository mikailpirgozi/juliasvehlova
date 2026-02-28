/**
 * JSON-LD Schema Markup Components for Julia Estetic Clinic
 * SEO structured data for better Google indexing
 */

import {
  COMPANY_NAME,
  COMPANY_LEGAL_NAME,
  BASE_URL,
  CONTACT,
  SOCIAL_LINKS,
  OPENING_HOURS,
  SEO_DEFAULTS,
} from '@/lib/seo/constants'

// =============================================================================
// ORGANIZATION SCHEMA
// =============================================================================

/**
 * Organization Schema - Main company information
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: COMPANY_NAME,
    alternateName: COMPANY_LEGAL_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/images/branding/logo.svg`,
    description:
      'Profesionálna klinika estetickej medicíny v Malackách. Botulotoxín, kyselina hyalurónová, permanentný make-up, laserová epilácia a kozmetické ošetrenia.',
    image: `${BASE_URL}/images/og-image.jpg`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.geo.latitude,
      longitude: CONTACT.geo.longitude,
    },
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram, SOCIAL_LINKS.youtube, SOCIAL_LINKS.tiktok],
    priceRange: SEO_DEFAULTS.priceRange,
    paymentAccepted: 'Cash, Credit Card, Debit Card, Bank Transfer',
    currenciesAccepted: SEO_DEFAULTS.currency,
    areaServed: {
      '@type': 'City',
      name: CONTACT.address.city,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// =============================================================================
// LOCAL BUSINESS SCHEMA
// =============================================================================

/**
 * LocalBusiness Schema - For local SEO (HealthAndBeautyBusiness)
 */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: `${COMPANY_NAME} - Estetická klinika Malacky`,
    image: `${BASE_URL}/images/og-image.jpg`,
    url: BASE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: SEO_DEFAULTS.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.geo.latitude,
      longitude: CONTACT.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: OPENING_HOURS.weekdays.days,
        opens: OPENING_HOURS.weekdays.opens,
        closes: OPENING_HOURS.weekdays.closes,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: OPENING_HOURS.saturday.days,
        opens: OPENING_HOURS.saturday.opens,
        closes: OPENING_HOURS.saturday.closes,
      },
    ],
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram, SOCIAL_LINKS.youtube, SOCIAL_LINKS.tiktok],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// =============================================================================
// WEBSITE SCHEMA
// =============================================================================

/**
 * WebSite Schema - Search box and site navigation
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: COMPANY_NAME,
    description: 'Profesionálne služby estetickej medicíny v Malackách',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/sluzby?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['sk-SK'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// =============================================================================
// BREADCRUMB SCHEMA
// =============================================================================

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * BreadcrumbList Schema - For page hierarchy
 */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// =============================================================================
// FAQ SCHEMA
// =============================================================================

export interface FAQItem {
  question: string
  answer: string
}

/**
 * FAQPage Schema - For FAQ sections
 */
export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// =============================================================================
// SERVICE SCHEMA
// =============================================================================

export interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  image?: string
  priceRange?: {
    from: number
    to: number
  }
  duration?: string
  provider?: string
}

/**
 * Service Schema - For individual services/procedures
 */
export function ServiceSchema({
  name,
  description,
  url,
  image,
  priceRange,
  duration,
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': url,
    name,
    description,
    url,
    image: image ?? `${BASE_URL}/images/og-image.jpg`,
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: CONTACT.address.city,
    },
    ...(priceRange && {
      offers: {
        '@type': 'Offer',
        priceCurrency: SEO_DEFAULTS.currency,
        price: `${priceRange.from}-${priceRange.to}`,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: SEO_DEFAULTS.currency,
          minPrice: priceRange.from,
          maxPrice: priceRange.to,
        },
        availability: 'https://schema.org/InStock',
      },
    }),
    ...(duration && {
      serviceOutput: {
        '@type': 'Thing',
        name: `${name} - ${duration}`,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// =============================================================================
// MEDICAL PROCEDURE SCHEMA
// =============================================================================

export interface MedicalProcedureSchemaProps {
  name: string
  description: string
  url: string
  image?: string
  bodyLocation?: string
  howPerformed?: string
  preparation?: string
  followup?: string
  procedureType?: 'NoninvasiveProcedure' | 'PercutaneousProcedure'
}

/**
 * MedicalProcedure Schema - For medical/aesthetic procedures
 */
export function MedicalProcedureSchema({
  name,
  description,
  url,
  image,
  bodyLocation,
  howPerformed,
  preparation,
  followup,
  procedureType = 'NoninvasiveProcedure',
}: MedicalProcedureSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name,
    description,
    url,
    image: image ?? `${BASE_URL}/images/og-image.jpg`,
    procedureType: `https://schema.org/${procedureType}`,
    ...(bodyLocation && { bodyLocation }),
    ...(howPerformed && { howPerformed }),
    ...(preparation && { preparation }),
    ...(followup && { followup }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// =============================================================================
// ARTICLE SCHEMA (for blog)
// =============================================================================

export interface ArticleSchemaProps {
  headline: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
}

/**
 * Article Schema - For blog posts
 */
export function ArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    image: image ?? `${BASE_URL}/images/og-image.jpg`,
    author: {
      '@type': 'Person',
      name: author ?? COMPANY_NAME,
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// =============================================================================
// MAIN SCHEMA MARKUP
// =============================================================================

/**
 * Main Schema Component - Combines all base schemas for homepage/layout
 */
export function MainSchemaMarkup() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebSiteSchema />
    </>
  )
}
