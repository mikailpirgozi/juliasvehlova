'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { FadeIn } from '@/components/ui'
import { getAllMainCategories, getCategoryServiceCount } from '@/lib/services-new'

// Show only first 6 categories on homepage
const HOMEPAGE_CATEGORY_COUNT = 6

export function ServicesSection() {
  const allCategories = getAllMainCategories()
  const displayCategories = allCategories.slice(0, HOMEPAGE_CATEGORY_COUNT)

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20 px-4 py-20 sm:py-28"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute right-10 top-20 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#CDA882]">
              Naše služby
            </p>
            <h2 className="mb-4 font-serif text-4xl font-bold text-brand-700 sm:text-5xl">
              Komplexná starostlivosť o vašu krásu
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Špecializujeme sa na estetické ošetrenia, ktoré zvýraznia vašu prirodzenú
              krásu s profesionálnym prístupom
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {displayCategories.map((category, index) => {
            const serviceCount = getCategoryServiceCount(category)
            const hasSubcategories =
              !!category.subcategories && category.subcategories.length > 0
            const countLabel = hasSubcategories
              ? `${category.subcategories!.length} kategórií`
              : `${serviceCount} služieb`

            return (
              <FadeIn key={category.id} delay={index * 0.1}>
                <Link
                  href={`/sluzby/${category.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle brand vignette from bottom only */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(216, 167, 177, 0.45) 0%, rgba(216, 167, 177, 0.15) 30%, transparent 55%)',
                      }}
                    />
                  </div>

                  {/* Content with brand vignette from top */}
                  <div
                    className="relative flex flex-1 flex-col justify-between p-5"
                    style={{
                      boxShadow: 'inset 0 40px 50px -15px rgba(216, 167, 177, 0.5), inset 0 20px 25px -5px rgba(216, 167, 177, 0.3)',
                    }}
                  >
                    <div>
                      <h3 className="font-serif text-xl font-bold text-brand-800 transition-colors duration-300 group-hover:text-brand-600">
                        {category.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                        {category.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-brand-100 pt-4">
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                        {countLabel}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-[#CDA882] transition-all duration-300 group-hover:gap-2.5">
                        Zobraziť
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-16 text-center">
            <Button href="/sluzby" color="primary" size="lg">
              Všetky služby ({allCategories.length} kategórií)
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
