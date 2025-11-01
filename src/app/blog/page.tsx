import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts, getAllBlogCategories, getAllBlogTags } from '@/lib/blog'
import { LinkButton } from '@/components/ui'

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

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold text-primary md:text-5xl">Blog</h1>
          <p className="text-lg text-gray-600">
            Odborné články o estetickej medicíne, tipoch starostlivosti a bezpečnosti
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
                  <p className="text-gray-600">Čoskoro budú dostupné nové články.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {posts.map((post) => (
                    <article key={post.slug} className="border-b border-gray-200 pb-8">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-accent-gold">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.readingTime} min čítania</span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="mb-3 font-serif text-2xl font-bold text-primary hover:text-primary-dark transition">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="mb-4 text-gray-600">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                            <span className="text-xs text-primary hover:underline">#{tag}</span>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <time className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString('sk-SK', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <LinkButton href={`/blog/${post.slug}`} variant="outline" size="sm">
                          Čítať viac →
                        </LinkButton>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 font-serif text-xl font-bold text-primary">Kategórie</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => {
                      const count = posts.filter((p) => p.category === category).length
                      return (
                        <li key={category}>
                          <Link
                            href={`/blog?category=${encodeURIComponent(category)}`}
                            className="flex items-center justify-between text-sm text-gray-700 hover:text-primary transition"
                          >
                            <span>{category}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{count}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 font-serif text-xl font-bold text-primary">Tagy</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary hover:text-white transition"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
