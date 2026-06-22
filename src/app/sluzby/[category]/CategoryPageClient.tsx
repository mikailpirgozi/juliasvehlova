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
  ArrowRight,
  Check,
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
  const isInfoCategory = Boolean(
    category.fullDescription || (category.packageGroups && category.packageGroups.length > 0)
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Subtle gradient background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-brand-50/20 via-white to-brand-50/10" />

      {/* Hero Section - Modern, clean design */}
      <section className="relative overflow-hidden">
        <div className="relative h-[280px] w-full sm:h-[320px] lg:h-[380px]">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.title}
              fill
              priority
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#8698a4] via-[#9aa9b3] to-[#718593]" />
          )}
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
          {/* Informational content (e.g. RF microneedling, HIFU) */}
          {isInfoCategory && (
            <div className="mb-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              {/* LEFT — description + suitable-for + results note */}
              <div>
                {category.fullDescription && (
                  <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    {category.fullDescription}
                  </p>
                )}

                {category.suitableFor && category.suitableFor.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-serif text-xl font-bold text-gray-900 sm:text-2xl">
                      Vhodné na
                    </h2>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {category.suitableFor.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-100">
                            <Check className="h-3 w-3 text-brand-600" />
                          </span>
                          <span className="text-sm leading-relaxed text-gray-700 sm:text-base">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {category.resultsNote && (
                  <p className="mt-6 rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                    {category.resultsNote}
                  </p>
                )}
              </div>

              {/* RIGHT — highlighted packages box */}
              {category.packageGroups && category.packageGroups.length > 0 && (
                <div className="lg:sticky lg:top-8 lg:self-start">
                  <div className="space-y-5">
                    {category.packageGroups.map((group) => (
                      <div
                        key={group.title}
                        className="overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-b from-brand-50 to-white shadow-sm ring-1 ring-brand-100"
                      >
                        <div className="border-b border-brand-100 bg-brand-100/40 px-5 py-3.5">
                          <h3 className="font-serif text-lg font-bold text-gray-900">
                            {group.title}
                          </h3>
                        </div>
                        <ul className="divide-y divide-brand-100 px-5">
                          {group.items.map((item) => (
                            <li
                              key={item.name}
                              className="flex items-baseline justify-between gap-4 py-3"
                            >
                              <span className="text-sm font-medium text-gray-700 sm:text-base">
                                {item.name}
                              </span>
                              <span className="whitespace-nowrap font-serif text-base font-bold text-brand-700 sm:text-lg">
                                {item.price}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {group.note && (
                          <p className="px-5 pb-4 pt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                            {group.note}
                          </p>
                        )}
                      </div>
                    ))}

                    {category.bookingUrl && (
                      <Button
                        href={category.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        size="lg"
                        iconTrailing={ArrowRight}
                        className="w-full"
                      >
                        Rezervovať termín
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

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
