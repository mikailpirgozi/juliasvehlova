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
  /** Clean, brand-free page title. The root layout template appends "| Julia Estetic Clinic". */
  title: string
  description: string
  keywords: string[]
  /** Absolute path of the page (e.g. "/cennik"). Used for canonical + OG url. Home = "". */
  path: string
  /**
   * When true, the title is used verbatim (no template brand suffix). Reserved for the
   * homepage, whose title already contains the brand name.
   */
  titleAbsolute?: boolean
}

export const pageMetadata: Record<string, PageMetadataConfig> = {
  home: {
    title: `${COMPANY_NAME} – estetická klinika a kozmetika v Malackách`,
    titleAbsolute: true,
    path: '',
    description:
      'Komplexné služby estetickej medicíny, permanentného make-upu a profesionálneho líčenia v Malackách. Viac ako 10 rokov skúseností. Botulotoxín, filery, HIFU, laserová epilácia.',
    keywords: [
      ...DEFAULT_KEYWORDS,
      'estetická medicína',
      'profesionálna kozmetika',
      'klinika krásy',
    ],
  },
  services: {
    title: 'Služby – estetická medicína a kozmetika',
    path: '/sluzby',
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
    title: 'O nás – naša klinika a tím',
    path: '/o-nas',
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
    title: 'Cenník služieb',
    path: '/cennik',
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
    title: 'Rezervácia termínu',
    path: '/rezervacia',
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
    title: 'Blog – tipy a novinky z estetickej medicíny',
    path: '/blog',
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
    title: 'Kontakt',
    path: '/kontakt',
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
    title: 'Ochrana osobných údajov – GDPR',
    path: '/ochrana-udajov',
    description:
      'Informácie o spracovaní a ochrane osobných údajov v súlade s GDPR v Julia Estetic Clinic.',
    keywords: ['ochrana údajov', 'GDPR', 'súkromie'],
  },
  terms: {
    title: 'Obchodné podmienky',
    path: '/obchodne-podmienky',
    description:
      'Obchodné podmienky poskytovania služieb estetickej medicíny a kozmetiky v Julia Estetic Clinic.',
    keywords: ['obchodné podmienky', 'podmienky služieb'],
  },
  giftVouchers: {
    title: 'Darčekové poukážky',
    path: '/darcekove-poukazky',
    description:
      'Darujte krásu a pohodu. Darčekové poukážky na estetickú medicínu a kozmetické služby v hodnote 50€ až 500€. Ideálny darček na narodeniny, meniny či sviatok. Platnosť 3 mesiace.',
    keywords: [
      ...DEFAULT_KEYWORDS,
      'darčekové poukážky',
      'darčeková poukážka malacky',
      'darček estetická medicína',
      'voucher kozmetika',
      'darček pre ženu',
      'darčekový certifikát',
    ],
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
  const meta = pageMeta ?? defaultMeta

  const description = meta.description
  const keywords = meta.keywords
  // Self-referential canonical + OG url from the page's own path (fixes the
  // bug where every page canonicalised to the homepage).
  const url = `${BASE_URL}${meta.path}`
  // Home title already contains the brand → use it verbatim; all other titles
  // are brand-free and get "| Julia Estetic Clinic" appended by the root template.
  const title: Metadata['title'] = meta.titleAbsolute
    ? { absolute: meta.title }
    : meta.title

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
      url,
      siteName: COMPANY_NAME,
      title: meta.title,
      description,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: SEO_DEFAULTS.ogImageWidth,
          height: SEO_DEFAULTS.ogImageHeight,
          alt: `${COMPANY_NAME} - Estetická medicína Malacky`,
        },
      ],
    },
    twitter: {
      card: SEO_DEFAULTS.twitterCard,
      title: meta.title,
      description,
      images: [`${BASE_URL}/twitter-image`],
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
    ...overrides,
    // Always keep a self-referential canonical, even if an override passes its
    // own `alternates` (which would otherwise clobber it).
    alternates: {
      canonical: url,
      ...(overrides?.alternates ?? {}),
    },
  }
}

/**
 * Build metadata for any dynamic page under /sluzby (service detail, category,
 * subcategory). Pass a clean brand-free `title` (the root template appends the
 * brand) and the page `path` (e.g. "/sluzby/hifu-mfu/hifu-cela-tvar"). Always
 * emits a self-referential canonical + OG url.
 */
export function buildServiceMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
  imageAlt,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  imageAlt?: string
}): Metadata {
  const url = `${BASE_URL}${path}`
  const ogImage = image ?? `${BASE_URL}/opengraph-image`

  return {
    title,
    description,
    keywords: [...keywords, ...DEFAULT_KEYWORDS.slice(0, 5)],
    authors: [{ name: `${COMPANY_NAME} Team` }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      type: 'website',
      locale: SEO_DEFAULTS.locale,
      url,
      siteName: COMPANY_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: SEO_DEFAULTS.ogImageWidth,
          height: SEO_DEFAULTS.ogImageHeight,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: SEO_DEFAULTS.twitterCard,
      title,
      description,
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
  modifiedAt?: string
  author?: string
}): Metadata {
  const url = `${BASE_URL}/blog/${post.slug}`
  const ogImage = post.image ?? `${BASE_URL}/opengraph-image`

  return {
    // Brand-free → the root template appends "| Julia Estetic Clinic" once.
    title: post.title,
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
      modifiedTime: post.modifiedAt ?? post.publishedAt,
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

  // Search-engine verification tokens (optional). Set in env / Vercel:
  //   GOOGLE_SITE_VERIFICATION  – Google Search Console (HTML-tag method)
  //   BING_SITE_VERIFICATION    – Bing Webmaster Tools
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION
  const bingVerification = process.env.BING_SITE_VERIFICATION
  const verification: Metadata['verification'] | undefined =
    googleVerification || bingVerification
      ? {
          ...(googleVerification && { google: googleVerification }),
          ...(bingVerification && { other: { 'msvalidate.01': bingVerification } }),
        }
      : undefined

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
    ...(verification && { verification }),
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
          url: `${BASE_URL}/opengraph-image`,
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
      images: [`${BASE_URL}/twitter-image`],
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
    // NOTE: intentionally NO root-level alternates.canonical. Each page sets its
    // own self-referential canonical (a base-level canonical leaks the homepage
    // URL onto every subpage).
  }
}
