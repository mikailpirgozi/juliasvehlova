'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/base/buttons/button'
import { FadeIn } from '@/components/ui'
import { getAllMainCategories } from '@/lib/services-new'

// Show up to 8 categories on homepage (fits 2 full rows of 4)
const HOMEPAGE_CATEGORY_COUNT = 8

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

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {displayCategories.map((category, index) => (
            <FadeIn key={category.id} delay={index * 0.08}>
              <Link
                href={`/sluzby/${category.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 4}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle dark gradient at bottom for text readability */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Category title */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-sm font-semibold tracking-wide text-white sm:text-base">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </FadeIn>
          ))}
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
