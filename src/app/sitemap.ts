import { MetadataRoute } from 'next'
import { getAllServiceSlugs, getAllMainCategorySlugs } from '@/lib/services-new'
import { getBlogPosts } from '@/lib/blog'
import { BASE_URL } from '@/lib/seo/constants'

/**
 * Dynamic sitemap generation
 * Includes all static pages, services, service categories, and blog posts
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages with priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sluzby`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/o-nas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cennik`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/rezervacia`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ochrana-udajov`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/obchodne-podmienky`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Service detail pages
  const serviceSlugs = getAllServiceSlugs()
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/sluzby/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Service category pages
  const categorySlugs = getAllMainCategorySlugs()
  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/sluzby/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Blog posts
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const blogPosts = getBlogPosts()
    blogPages = blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // If blog posts can't be loaded, continue without them
    console.warn('Could not load blog posts for sitemap')
  }

  return [...staticPages, ...servicePages, ...categoryPages, ...blogPages]
}
