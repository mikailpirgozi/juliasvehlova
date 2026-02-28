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
  Circle,
  Edit05,
  Brush01,
  Award01,
  ArrowLeft,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { SubcategoryCard, ServicesPriceTable, ImageGallery } from '@/components/services'
import type { MainCategory, CategoryIconKey } from '@/lib/services-new'
import { categoryHasSubcategories } from '@/lib/services-new'
import { getServiceGalleryImages } from '@/lib/service-images'

// Map icon keys to Untitled UI icon components
const iconComponents: Record<CategoryIconKey, FC<{ className?: string }>> = {
  chakra: Sun,
  eye: Eye,
  syringe: MedicalCross,
  sparkle: Stars01,
  laser: Zap,
  massage: HeartCircle,
  heart: HeartCircle,
  piercing: Circle,
  brush: Brush01,
  tattoo: Edit05,
  crown: Award01,
}

interface CategoryPageClientProps {
  category: MainCategory
}

export function CategoryPageClient({ category }: CategoryPageClientProps) {
  const IconComponent = iconComponents[category.iconKey]
  const hasSubcategories = categoryHasSubcategories(category)
  const galleryImages = getServiceGalleryImages(category.slug, 8)

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Subtle gradient background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-brand-50/20 via-white to-brand-50/10" />

      {/* Hero Section - Modern, clean design */}
      <section className="relative overflow-hidden">
        <div className="relative h-[280px] w-full sm:h-[320px] lg:h-[380px]">
          <Image
            src={category.image}
            alt={category.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 lg:p-10">
            <div className="mx-auto w-full max-w-6xl">
              {/* Back Link */}
              <Link
                href="/sluzby"
                className="mb-4 inline-flex items-center gap-1.5 text-xs text-white/60 transition hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Všetky služby
              </Link>

              <div className="flex items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-serif text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                      {category.title}
                    </h1>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/70">
                      {category.description}
                    </p>
                  </div>
                </div>

                {category.services && (
                  <div className="hidden flex-shrink-0 sm:block">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {category.services.length} služieb
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {hasSubcategories ? (
            <>
              {/* Subcategories Grid */}
              <div className="mb-8">
                  <div className="mb-6 text-center">
                    <h2 className="font-serif text-xl font-bold text-gray-900 sm:text-2xl">
                      Vyberte si kategóriu
                    </h2>
                  </div>
                <div className={category.slug === 'piercing' ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'}>
                  {category.subcategories!.map((subcategory) => (
                    <SubcategoryCard
                      key={subcategory.id}
                      subcategory={subcategory}
                      categorySlug={category.slug}
                      noImage={category.slug === 'piercing'}
                    />
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <ImageGallery images={galleryImages} alt={category.title} />
              )}
            </>
          ) : (
            <>
              {/* Services List */}
              {category.services && category.services.length > 0 && (
                <div className="mb-8">
                  <ServicesPriceTable
                    services={category.services}
                    categorySlug={category.slug}
                    title={`Služby - ${category.title}`}
                    showDetailLinks={true}
                    isDirectService={true}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#8698a4] to-[#718593] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="pointer-events-none absolute top-10 right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-200 sm:text-4xl">
            Máte záujem o naše služby?
          </h2>
          <p className="mt-4 text-lg text-white/85">
            Objednajte sa na konzultáciu a spoločne nájdeme ideálne riešenie pre vaše potreby.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/rezervacia" color="primary" size="lg">
              Rezervovať termín
            </Button>
            <Link
              href="/cennik"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-md font-semibold text-gray-700 shadow-xs transition hover:bg-gray-50"
            >
              Zobraziť cenník
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
