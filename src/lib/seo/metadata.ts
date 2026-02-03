/**
 * SEO Metadata Configuration for Julia Estetic Clinic
 * Central metadata utilities and page configurations
 */

import type { Metadata } from 'next'
import {
  COMPANY_NAME,
  BASE_URL,
  SEO_DEFAULTS,
  CONTACT,
} from './constants'

// =============================================================================
// DEFAULT KEYWORDS
// =============================================================================

export const DEFAULT_KEYWORDS = [
  'estetická medicína malacky',
  'botulotoxín malacky',
  'kyselina hyalurónová malacky',
  'permanentný makeup malacky',
  'laserová epilácia malacky',
  'estetická klinika malacky',
  'julia estetic clinic',
  'kozmetika malacky',
  'anti-aging malacky',
  'lip filler malacky',
  'microblading malacky',
]

// =============================================================================
// PAGE METADATA CONFIGURATION
// =============================================================================

interface PageMetadataConfig {
  title: string
  description: string
  keywords: string[]
}

export const pageMetadata: Record<string, PageMetadataConfig> = {
  home: {
    title: `${COMPANY_NAME} - Profesionálne služby estetickej medicíny v Malackách`,
    description:
      'Komplexné služby estetickej medicíny, permanentného make-upu a profesionálneho líčenia v Malackách. Viac ako 10 rokov skúseností. Botulotoxín, filery, laserová epilácia.',
    keywords: [
      ...DEFAULT_KEYWORDS,
      'estetická medicína',
      'profesionálna kozmetika',
      'klinika krásy',
    ],
  },
  services: {
    title: `Služby - Estetická medicína a kozmetika | ${COMPANY_NAME}`,
    description:
      'Široká ponuka služieb estetickej medicíny: botulotoxín, kyselina hyalurónová, permanentný make-up, laserová epilácia, kozmetické ošetrenia. Profesionálny prístup a bezpečnosť.',
    keywords: [
      ...DEFAULT_KEYWORDS,
      'služby estetickej medicíny',
      'kozmetické služby',
      'ošetrenia tváre',
      'ošetrenia tela',
    ],
  },
  about: {
    title: `O nás - Naša klinika a tím | ${COMPANY_NAME}`,
    description:
      'Spoznajte náš tím profesionálov v estetickej medicíne. Viac ako 10 rokov skúseností, certifikované procedúry a individuálny prístup ku každému klientovi v Malackách.',
    keywords: [
      ...DEFAULT_KEYWORDS,
      'o nás',
      'tím špecialistov',
      'estetická medicína malacky',
      'skúsenosti',
    ],
  },
  pricing: {
    title: `Cenník služieb | ${COMPANY_NAME}`,
    description:
      'Transparentný cenník všetkých služieb estetickej medicíny a kozmetiky. Botulotoxín od 120€, filery od 180€, permanentný make-up od 200€. Bezplatná konzultácia.',
    keywords: [
      ...DEFAULT_KEYWORDS,
      'cenník',
      'ceny botox',
      'ceny filler',
      'ceny laserová epilácia',
    ],
  },
  booking: {
    title: `Rezervácia termínu | ${COMPANY_NAME}`,
    description:
      'Objednajte sa online na konzultáciu alebo ošetrenie v Julia Estetic Clinic Malacky. Rýchla a jednoduchá rezervácia, bezplatná konzultácia.',
    keywords: [
      ...DEFAULT_KEYWORDS,
      'rezervácia',
      'objednanie',
      'konzultácia',
      'termín',
    ],
  },
  blog: {
    title: `Blog - Tipy a novinky z estetickej medicíny | ${COMPANY_NAME}`,
    description:
      'Čítajte náš blog plný užitočných tipov o starostlivosti o pleť, novinkách v estetickej medicíne a odpovedí na najčastejšie otázky našich klientov.',
    keywords: [
      ...DEFAULT_KEYWORDS,
      'blog',
      'články',
      'tipy',
      'estetická medicína novinky',
    ],
  },
  contact: {
    title: `Kontakt | ${COMPANY_NAME}`,
    description: `Kontaktujte Julia Estetic Clinic v Malackách. ☎️ ${CONTACT.phone} 📧 ${CONTACT.email} 📍 ${CONTACT.address.street}, ${CONTACT.address.city}. Tešíme sa na vás!`,
    keywords: [
      ...DEFAULT_KEYWORDS,
      'kontakt',
      'adresa',
      'telefón',
      'malacky klinika',
    ],
  },
  privacy: {
    title: `Ochrana osobných údajov | ${COMPANY_NAME}`,
    description:
      'Informácie o spracovaní a ochrane osobných údajov v súlade s GDPR v Julia Estetic Clinic.',
    keywords: ['ochrana údajov', 'GDPR', 'súkromie'],
  },
  terms: {
    title: `Obchodné podmienky | ${COMPANY_NAME}`,
    description:
      'Obchodné podmienky poskytovania služieb estetickej medicíny a kozmetiky v Julia Estetic Clinic.',
    keywords: ['obchodné podmienky', 'podmienky služieb'],
  },
}

// =============================================================================
// METADATA GENERATORS
// =============================================================================

/**
 * Get page metadata configuration by key
 */
export function getPageMetadata(pageKey: string): PageMetadataConfig | null {
  return pageMetadata[pageKey] ?? null
}

/**
 * Generate complete metadata for a page
 */
export function generatePageMetadata(
  pageKey: string,
  overrides?: Partial<Metadata>
): Metadata {
  const pageMeta = getPageMetadata(pageKey)
  // Use home as fallback - guaranteed to exist
  const defaultMeta = pageMetadata['home']!

  const title = pageMeta?.title ?? defaultMeta.title
  const description = pageMeta?.description ?? defaultMeta.description
  const keywords = pageMeta?.keywords ?? defaultMeta.keywords

  return {
    title,
    description,
    keywords,
    authors: [{ name: `${COMPANY_NAME} Team` }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      type: 'website',
      locale: SEO_DEFAULTS.locale,
      url: BASE_URL,
      siteName: COMPANY_NAME,
      title,
      description,
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: SEO_DEFAULTS.ogImageWidth,
          height: SEO_DEFAULTS.ogImageHeight,
          alt: `${COMPANY_NAME} - Estetická medicína Malacky`,
        },
      ],
    },
    twitter: {
      card: SEO_DEFAULTS.twitterCard,
      title,
      description,
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: BASE_URL,
    },
    ...overrides,
  }
}

/**
 * Generate metadata for a service detail page
 */
export function generateServiceMetadata(service: {
  title: string
  slug: string
  shortDescription: string
  seoMeta: {
    title: string
    description: string
    keywords: string[]
  }
  images?: Array<{ url: string; alt: string }>
}): Metadata {
  const { seoMeta, slug, images } = service
  const url = `${BASE_URL}/sluzby/${slug}`
  const ogImage = images?.[0]?.url ?? `${BASE_URL}/images/og-image.jpg`

  return {
    title: seoMeta.title,
    description: seoMeta.description,
    keywords: [...seoMeta.keywords, ...DEFAULT_KEYWORDS.slice(0, 5)],
    authors: [{ name: `${COMPANY_NAME} Team` }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      type: 'website',
      locale: SEO_DEFAULTS.locale,
      url,
      siteName: COMPANY_NAME,
      title: seoMeta.title,
      description: seoMeta.description,
      images: [
        {
          url: ogImage,
          width: SEO_DEFAULTS.ogImageWidth,
          height: SEO_DEFAULTS.ogImageHeight,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: SEO_DEFAULTS.twitterCard,
      title: seoMeta.title,
      description: seoMeta.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  }
}

/**
 * Generate metadata for a blog post
 */
export function generateBlogPostMetadata(post: {
  title: string
  slug: string
  excerpt: string
  keywords?: string[]
  image?: string
  publishedAt?: string
  author?: string
}): Metadata {
  const url = `${BASE_URL}/blog/${post.slug}`
  const ogImage = post.image ?? `${BASE_URL}/images/og-image.jpg`

  return {
    title: `${post.title} | Blog ${COMPANY_NAME}`,
    description: post.excerpt,
    keywords: post.keywords ?? DEFAULT_KEYWORDS,
    authors: [{ name: post.author ?? `${COMPANY_NAME} Team` }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      type: 'article',
      locale: SEO_DEFAULTS.locale,
      url,
      siteName: COMPANY_NAME,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author ?? COMPANY_NAME],
      images: [
        {
          url: ogImage,
          width: SEO_DEFAULTS.ogImageWidth,
          height: SEO_DEFAULTS.ogImageHeight,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: SEO_DEFAULTS.twitterCard,
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
  }
}

/**
 * Base metadata configuration for root layout
 */
export function getBaseMetadata(): Metadata {
  const homeMeta = pageMetadata['home']!
  
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: homeMeta.title,
      template: `%s | ${COMPANY_NAME}`,
    },
    description: homeMeta.description,
    keywords: DEFAULT_KEYWORDS,
    authors: [{ name: `${COMPANY_NAME} Team` }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: SEO_DEFAULTS.locale,
      url: BASE_URL,
      siteName: COMPANY_NAME,
      title: homeMeta.title,
      description: homeMeta.description,
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: SEO_DEFAULTS.ogImageWidth,
          height: SEO_DEFAULTS.ogImageHeight,
          alt: `${COMPANY_NAME} - Estetická medicína Malacky`,
        },
      ],
    },
    twitter: {
      card: SEO_DEFAULTS.twitterCard,
      title: homeMeta.title,
      description: homeMeta.description,
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: BASE_URL,
    },
  }
}
