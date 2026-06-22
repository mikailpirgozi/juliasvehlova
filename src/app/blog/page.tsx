import type { Metadata } from 'next'
import { getBlogPosts, getAllBlogCategories, getAllBlogTags } from '@/lib/blog'
import { BlogClient } from './BlogClient'
import { generatePageMetadata } from '@/lib/seo'
import { BlogIndexSchema } from '@/components/seo/page-schemas'

export const metadata: Metadata = generatePageMetadata('blog')

export default function BlogPage() {
  const posts = getBlogPosts()
  const categories = getAllBlogCategories()
  const tags = getAllBlogTags()

  return (
    <>
      <BlogIndexSchema posts={posts} />
      <BlogClient posts={posts} categories={categories} tags={tags} />
    </>
  )
}
