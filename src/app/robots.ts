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
      // -----------------------------------------------------------------------
      // AI search / answer engines (GEO). Allowing the retrieval + user-fetch
      // bots is what makes the clinic eligible to be CITED in AI answers
      // (ChatGPT, Perplexity, Claude, Google AI Overviews, Apple). Training
      // bots are allowed too — blocking them does not reliably reduce citations.
      // -----------------------------------------------------------------------
      { userAgent: 'OAI-SearchBot', allow: '/' }, // ChatGPT search index
      { userAgent: 'ChatGPT-User', allow: '/' }, // ChatGPT on-demand fetch
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/', '/_next/'] }, // OpenAI training
      { userAgent: 'PerplexityBot', allow: '/' }, // Perplexity index
      { userAgent: 'Perplexity-User', allow: '/' }, // Perplexity on-demand fetch
      { userAgent: 'Claude-SearchBot', allow: '/' }, // Claude search index
      { userAgent: 'Claude-User', allow: '/' }, // Claude on-demand fetch
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/', '/_next/'] }, // Anthropic training
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' }, // Gemini / AI Overviews training
      { userAgent: 'Applebot-Extended', allow: '/' }, // Apple Intelligence
      { userAgent: 'DuckAssistBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      // -----------------------------------------------------------------------
      // Block aggressive / badly-behaved scrapers (no SEO or AI-citation value).
      // -----------------------------------------------------------------------
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
