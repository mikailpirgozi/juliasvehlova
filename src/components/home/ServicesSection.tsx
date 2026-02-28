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
      className="relative overflow-hidden bg-white px-4 py-20 sm:py-28"
    >

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn delay={0.2}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#8698a4]">
              Naše služby
            </p>
            <h2 className="mb-4 font-serif text-4xl font-bold text-gray-900 sm:text-5xl">
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
            <FadeIn key={category.id} delay={0.3 + index * 0.1}>
              <Link
                href={`/sluzby/${category.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 4}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-brand-900/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-multiply z-10" />
                
                {/* Glass border effect that appears on hover */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:border-white/40 z-20" />
                
                {/* Subtle dark gradient at bottom for text readability */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                {/* Category title */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-30 transform transition-transform duration-500 group-hover:-translate-y-1">
                  <h3 className="text-base font-bold tracking-wide text-white sm:text-lg drop-shadow-md">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.8}>
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
