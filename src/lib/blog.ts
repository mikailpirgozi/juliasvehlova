import { z } from 'zod'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ========================================
// Blog Post Schema
// ========================================

export const blogPostMetaSchema = z
  .object({
    title: z.string(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    author: z.string().default('Julia Svehlová'),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
  })
  .refine(
    (data) => data.excerpt || data.description,
    'Either excerpt or description must be provided',
  )
  .transform((data) => ({
    ...data,
    excerpt: data.excerpt || data.description || '',
  }))

export type BlogPostMeta = z.infer<typeof blogPostMetaSchema>

export interface BlogPost extends BlogPostMeta {
  slug: string
  content: string
  readingTime: number
}

// ========================================
// Blog Utilities
// ========================================

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, '')
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))

  const posts: BlogPost[] = files
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)

      // Convert Date objects to strings for proper schema validation
      const normalizedData = {
        ...data,
        date: typeof data.date === 'string' ? data.date : (data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date)),
      }

      const meta = blogPostMetaSchema.parse(normalizedData)
      const slug = getSlugFromFilename(file)
      const readingTime = calculateReadingTime(content)

      return {
        ...meta,
        slug,
        content,
        readingTime,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getBlogPosts().filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getBlogPosts().filter((post) => post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()))
}

export function getFeaturedBlogPosts(limit = 3): BlogPost[] {
  return getBlogPosts()
    .filter((post) => post.featured)
    .slice(0, limit)
}

export function getAllBlogCategories(): string[] {
  const posts = getBlogPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories).sort()
}

export function getAllBlogTags(): string[] {
  const posts = getBlogPosts()
  const tags = new Set(posts.flatMap((post) => post.tags))
  return Array.from(tags).sort()
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const post = getBlogPostBySlug(slug)
  if (!post) return []

  const allPosts = getBlogPosts().filter((p) => p.slug !== slug)

  const scored = allPosts.map((p) => {
    let score = 0

    // Same category: +2 points
    if (p.category === post.category) score += 2

    // Shared tags: +1 point per tag
    const sharedTags = p.tags.filter((tag) => post.tags.includes(tag))
    score += sharedTags.length

    return { post: p, score }
  })

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase()
  const posts = getBlogPosts()

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}
