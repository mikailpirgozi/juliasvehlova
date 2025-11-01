'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { LinkButton } from '@/components/ui'
import type { BlogPost } from '@/lib/blog'

interface BlogClientProps {
  posts: BlogPost[]
  categories: string[]
  tags: string[]
}

export function BlogClient({ posts, categories, tags }: BlogClientProps): JSX.Element {
  useEffect(() => {
    document.title = 'Blog - Estetická medicína | Julia Clinic'
  }, [])

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-white px-4 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-6 font-serif text-4xl font-bold text-primary md:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-gray-700">
            Užitočné informácie, tipy a aktuality zo sveta estetickej medicíny
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-gray-600">
                    Pripravujeme pre vás zaujímavé články.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {posts.map((post) => (
                    <article
                      key={post.slug}
                      className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="mb-4 font-serif text-2xl font-bold text-primary hover:text-primary-dark">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="mb-4 text-gray-700">{post.excerpt}</p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-accent-gold/10 px-3 py-1 text-xs font-medium text-accent-gold"
                          >
                            {tag}
                          </span>
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
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 font-serif text-xl font-bold text-primary">
                  Kategórie
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/blog?category=${category}`}
                        className="text-gray-700 hover:text-primary transition"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 font-serif text-xl font-bold text-primary">
                  Populárne témy
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="rounded-full bg-primary/5 px-3 py-1 text-sm text-gray-700 hover:bg-primary/10 transition"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

