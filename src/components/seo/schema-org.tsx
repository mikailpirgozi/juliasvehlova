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
    image: `${BASE_URL}/opengraph-image`,
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
    founder: {
      '@type': 'Person',
      name: 'Júlia Švehlová',
      jobTitle: 'Zakladateľka',
    },
    // Entity grounding for search + AI engines (GEO): the topics this clinic is
    // a recognised authority on.
    knowsAbout: [
      'Estetická medicína',
      'Botulotoxín',
      'Kyselina hyalurónová',
      'Biorevitalizácia pleti',
      'Polynukleotidy',
      'HIFU lifting',
      'Rádiofrekvenčné mikroihličkovanie',
      'Mezoterapia',
      'Permanentný make-up',
      'Laserová epilácia',
    ],
    // Primary city + the wider catchment area (Záhorie / Bratislavský kraj).
    areaServed: [
      { '@type': 'City', name: 'Malacky' },
      { '@type': 'City', name: 'Stupava' },
      { '@type': 'City', name: 'Bratislava' },
      { '@type': 'AdministrativeArea', name: 'Záhorie' },
      { '@type': 'AdministrativeArea', name: 'Bratislavský kraj' },
    ],
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
    image: `${BASE_URL}/opengraph-image`,
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
// SPEAKABLE SCHEMA (GEO / voice / AI answers)
// =============================================================================

/**
 * WebPage + SpeakableSpecification — marks the answer-bearing elements
 * (`h1`, the `.geo-answer` capsule and `.faq-answer` blocks) as the parts of the
 * page suitable for AI assistants / voice to read aloud.
 */
export function SpeakableSchema({ url }: { url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.geo-answer', '.faq-answer'],
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
// SERVICE SCHEMA
// =============================================================================

export interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  image?: string
  /** Single price in EUR (preferred for individual services). */
  price?: number
  /** Price range, when a service spans multiple variants. */
  priceRange?: {
    from: number
    to: number
  }
  duration?: string
  /** Service category, e.g. "Estetická medicína". */
  category?: string
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
  price,
  priceRange,
  duration,
  category,
}: ServiceSchemaProps) {
  // Build a clean Offer: single price when known, otherwise a range.
  const offer =
    price != null
      ? {
          '@type': 'Offer',
          priceCurrency: SEO_DEFAULTS.currency,
          price: String(price),
          availability: 'https://schema.org/InStock',
          url,
        }
      : priceRange
        ? {
            '@type': 'Offer',
            priceCurrency: SEO_DEFAULTS.currency,
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: SEO_DEFAULTS.currency,
              minPrice: priceRange.from,
              maxPrice: priceRange.to,
            },
            availability: 'https://schema.org/InStock',
            url,
          }
        : null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': url,
    name,
    description,
    url,
    image: image ?? `${BASE_URL}/opengraph-image`,
    ...(category && { category }),
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: CONTACT.address.city,
    },
    ...(offer && { offers: offer }),
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
    image: image ?? `${BASE_URL}/opengraph-image`,
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
  /** Medical/professional reviewer (E-E-A-T) — e.g. "MUDr. Yasmin Betáková". */
  reviewedBy?: string
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
  reviewedBy,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    image: image ?? `${BASE_URL}/opengraph-image`,
    author: {
      '@type': 'Person',
      name: author ?? COMPANY_NAME,
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    ...(reviewedBy && {
      reviewedBy: {
        '@type': 'Person',
        name: reviewedBy,
      },
    }),
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
