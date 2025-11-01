import type { Metadata } from 'next'
import { getBlogPosts, getAllBlogCategories, getAllBlogTags } from '@/lib/blog'
import { BlogClient } from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog - Estetická medicína | Julia Clinic',
  description:
    'Čítajte články o estetickej medicíne, botulotoxíne, kyselipe hyalurónové a ďalších procedúrach. Odborné tipy a informácie.',
  keywords: ['blog', 'estetická medicína', 'botox', 'filery', 'permanentný makeup', 'laserová epilácia'],
}

export default function BlogPage(): JSX.Element {
  const posts = getBlogPosts()
  const categories = getAllBlogCategories()
  const tags = getAllBlogTags()

  return <BlogClient posts={posts} categories={categories} tags={tags} />
}
