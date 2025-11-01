import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { LinkButton } from '@/components/ui'
import { ShareButtons } from '@/components/blog/ShareButtons'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

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

export default function BlogPostPage({ params }: BlogPostPageProps): JSX.Element {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedBlogPosts(params.slug)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-white px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="mb-6 inline-block text-sm text-primary hover:underline">
            ← Späť na blog
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-accent-gold">
              {post.category}
            </span>
            <span className="text-xs text-gray-500">{post.readingTime} min čítania</span>
          </div>

          <h1 className="mb-4 font-serif text-4xl font-bold text-primary md:text-5xl">{post.title}</h1>

          <div className="flex items-center justify-between text-sm text-gray-600">
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
          <article className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} />
          </article>

          {/* Tags */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  <span className="text-sm bg-primary/10 text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition">
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
        <section className="bg-neutral-cream px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center font-serif text-3xl font-bold text-primary">
              Súvisiace články
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <article className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition">
                    <p className="mb-2 text-xs font-medium uppercase text-accent-gold">
                      {relatedPost.category}
                    </p>
                    <h3 className="mb-3 font-serif text-lg font-bold text-primary hover:text-primary-dark">
                      {relatedPost.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">{relatedPost.excerpt}</p>
                    <span className="text-sm text-primary">Čítať viac →</span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-b from-white to-primary/10 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
            Chcete viac informácií?
          </h2>
          <p className="mb-8 text-lg text-gray-700">
            Objednajte si bezplatnú konzultáciu a dozviete sa viac o procedúrach.
          </p>
          <LinkButton href="/#kontakt" variant="primary" size="lg">
            Rezervovať konzultáciu
          </LinkButton>
        </div>
      </section>
    </div>
  )
}
