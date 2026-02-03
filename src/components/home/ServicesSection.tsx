'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import {
  Sun,
  Eye,
  MedicalCross,
  Stars01,
  Zap,
  HeartCircle,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { FadeIn } from '@/components/ui'
import { getAllMainCategories, getCategoryServiceCount, type CategoryIconKey } from '@/lib/services-new'

// Map icon keys to Untitled UI icon components (subset for homepage)
const iconComponents: Partial<Record<CategoryIconKey, FC<{ className?: string }>>> = {
  chakra: Sun,
  eye: Eye,
  syringe: MedicalCross,
  sparkle: Stars01,
  laser: Zap,
  massage: HeartCircle,
  heart: HeartCircle,
}

// Color configurations for each icon type
const iconColors: Record<CategoryIconKey, { bg: string; text: string }> = {
  chakra: { bg: 'bg-amber-100', text: 'text-amber-600' },
  eye: { bg: 'bg-violet-100', text: 'text-violet-600' },
  syringe: { bg: 'bg-brand-100', text: 'text-brand-600' },
  sparkle: { bg: 'bg-pink-100', text: 'text-pink-600' },
  laser: { bg: 'bg-red-100', text: 'text-red-600' },
  massage: { bg: 'bg-green-100', text: 'text-green-600' },
  heart: { bg: 'bg-rose-100', text: 'text-rose-600' },
  piercing: { bg: 'bg-gray-100', text: 'text-gray-600' },
  brush: { bg: 'bg-purple-100', text: 'text-purple-600' },
  tattoo: { bg: 'bg-slate-100', text: 'text-slate-600' },
  crown: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
}

// Show only first 6 categories on homepage
const HOMEPAGE_CATEGORY_COUNT = 6

export function ServicesSection() {
  const allCategories = getAllMainCategories()
  const displayCategories = allCategories.slice(0, HOMEPAGE_CATEGORY_COUNT)

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20 px-4 py-20"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute right-10 top-20 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/20 blur-3xl" />

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
              Špecializujeme sa na estetické ošetrenia, ktoré zvýraznia vašu prirodzenú krásu s
              profesionálnym prístupom
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayCategories.map((category, index) => {
            const serviceCount = getCategoryServiceCount(category)
            const IconComponent = iconComponents[category.iconKey] || Stars01
            const colors = iconColors[category.iconKey]
            const hasSubcategories = !!category.subcategories && category.subcategories.length > 0

            return (
              <FadeIn key={category.id} delay={index * 0.1}>
                <Link
                  href={`/sluzby/${category.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Background Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute right-4 top-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} shadow-lg backdrop-blur-sm`}
                      >
                        <IconComponent className={`h-6 w-6 ${colors.text}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <h3 className="mb-2 font-serif text-2xl font-bold drop-shadow-lg">
                        {category.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-white/90">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                          {hasSubcategories
                            ? `${category.subcategories!.length} kategórií`
                            : `${serviceCount} služieb`}
                        </span>
                        <div className="flex items-center gap-2 font-semibold text-white transition-all duration-300 group-hover:gap-3">
                          <span className="text-sm">Zobraziť viac</span>
                          <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
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
