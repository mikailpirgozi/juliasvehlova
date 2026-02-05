import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Button } from '@/components/base/buttons/button'
import { ShareButtons } from '@/components/blog/ShareButtons'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Článok nenájdený' }
  }

  return {
    title: `${post.title} | Julia Clinic Blog`,
    description: post.excerpt,
    keywords: [post.category, ...post.tags],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedBlogPosts(slug)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Späť na blog
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-brand-600">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{post.readingTime} min čítania</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>Napísal{post.author === 'Julia Svehlová' ? 'a' : ''} {post.author}</span>
            <time>
              {new Date(post.date).toLocaleDateString('sk-SK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-gray max-w-none">
            <MDXRemote source={post.content} />
          </article>

          {/* Tags */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  <span className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Share */}
          <ShareButtons title={post.title} />
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-semibold text-gray-900">
              Súvisiace články
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <article className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
                    <p className="text-xs font-medium uppercase text-brand-600">
                      {relatedPost.category}
                    </p>
                    <h3 className="mt-2 font-semibold text-gray-900 hover:text-brand-600">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">{relatedPost.excerpt}</p>
                    <span className="mt-4 inline-block text-sm font-medium text-brand-600">
                      Čítať viac →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Chcete viac informácií?
          </h2>
          <p className="mt-4 text-gray-500">
            Objednajte si konzultáciu a dozviete sa viac o procedúrach.
          </p>
          <div className="mt-8">
            <Button href="/#kontakt" color="primary" size="lg">
              Rezervovať konzultáciu
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
