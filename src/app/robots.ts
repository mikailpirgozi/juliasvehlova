import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/seo/constants'

/**
 * Robots.txt configuration
 * Based on Blackrent SEO pattern - multi-crawler support
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rules for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Google Bot - optimized for faster crawling
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // Bing Bot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // Yandex Bot
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // DuckDuckGo Bot
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // Facebook Crawler (for OG images)
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      // Twitter Crawler
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      // LinkedIn Crawler
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      // Block aggressive/unwanted bots
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
      {
        userAgent: 'BLEXBot',
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
