'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/base/buttons/button'
import type { BlogPost } from '@/lib/blog'

interface BlogClientProps {
  posts: BlogPost[]
  categories: string[]
  tags: string[]
}

export function BlogClient({ posts, categories, tags }: BlogClientProps) {
  useEffect(() => {
    document.title = 'Blog - Estetická medicína | Julia Clinic'
  }, [])

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold text-brand-600">Blog</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Články a tipy
          </h1>
          <p className="mt-4 text-lg text-gray-500">
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
                <div className="py-20 text-center">
                  <p className="text-lg text-gray-500">
                    Pripravujeme pre vás zaujímavé články.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <article
                      key={post.slug}
                      className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-semibold text-gray-900 hover:text-brand-600">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="mt-2 text-gray-500">{post.excerpt}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <time className="text-sm text-gray-400">
                          {new Date(post.date).toLocaleDateString('sk-SK', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <Button href={`/blog/${post.slug}`} color="tertiary" size="sm">
                          Čítať viac
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Categories */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-semibold text-gray-900">Kategórie</h3>
                <ul className="mt-4 space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/blog?category=${category}`}
                        className="text-sm text-gray-500 transition-colors hover:text-brand-600"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-semibold text-gray-900">Populárne témy</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-600 transition-colors hover:bg-gray-200"
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
