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
  Clock,
  Star01,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { SubcategoryCard, ServicesPriceTable } from '@/components/services'
import type { MainCategory, CategoryIconKey, SimpleService } from '@/lib/services-new'
import { categoryHasSubcategories } from '@/lib/services-new'
import { getServiceImage } from '@/lib/service-images'

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

// Service Card Component for rich content services
function ServiceCard({ service, categorySlug, index = 1 }: { service: SimpleService; categorySlug: string; index?: number }) {
  const serviceImage = getServiceImage(categorySlug, index)

  return (
    <Link
      href={`/sluzby/${categorySlug}/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/50"
    >
      {/* Image Header */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={serviceImage}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Price & Popular badge overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white drop-shadow-lg">{service.price}</span>
            {service.popular && (
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                <Star01 className="h-3 w-3" /> Obľúbené
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
            <Clock className="h-4 w-4" />
            <span>{service.duration}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-brand-600">
          {service.name}
        </h3>

        {service.tagline && (
          <p className="mb-3 text-sm font-medium text-brand-600">
            {service.tagline}
          </p>
        )}

        {service.shortDescription && (
          <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500">
            {service.shortDescription}
          </p>
        )}

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium text-brand-600 transition-colors group-hover:text-brand-700">
          <span>Zistiť viac</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export function CategoryPageClient({ category }: CategoryPageClientProps) {
  const IconComponent = iconComponents[category.iconKey]
  const hasSubcategories = categoryHasSubcategories(category)

  // Check if any service has rich content
  const hasRichServices = category.services?.some(
    (s) => s.tagline || s.shortDescription || s.fullDescription
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Subtle gradient background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-brand-50/20 via-white to-brand-50/10" />

      {/* Hero Section - Modern, clean design */}
      <section className="relative overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 lg:h-[28rem]">
          <Image
            src={category.image}
            alt={category.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
            <div className="mx-auto w-full max-w-6xl">
              {/* Back Link */}
              <Link
                href="/sluzby"
                className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Všetky služby
              </Link>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="font-serif text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                      {category.title}
                    </h1>
                    <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/80">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Service count badge */}
                {category.services && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
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
      <section className="relative z-10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {hasSubcategories ? (
            <>
              {/* Subcategories Grid */}
              <div className="mb-8">
                <div className="mb-10 text-center">
                  <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                    Vyberte si kategóriu
                  </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.subcategories!.map((subcategory) => (
                    <SubcategoryCard
                      key={subcategory.id}
                      subcategory={subcategory}
                      categorySlug={category.slug}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Services Grid - Use cards for rich content, table for simple */}
              {category.services && category.services.length > 0 && (
                <div className="mb-8">
                  {hasRichServices ? (
                    <>
                      <div className="mb-12 text-center">
                        <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                          Naše služby
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                          Vyberte si službu a dozviete sa viac o tom, ako vám môžeme pomôcť.
                        </p>
                      </div>
                      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {category.services.map((service, index) => (
                          <ServiceCard
                            key={service.id}
                            service={service}
                            categorySlug={category.slug}
                            index={index + 1}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <ServicesPriceTable
                      services={category.services}
                      categorySlug={category.slug}
                      title={`Služby - ${category.title}`}
                      showDetailLinks={true}
                      isDirectService={true}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 border-t border-gray-100 bg-brand-600 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Máte záujem o naše služby?
          </h2>
          <p className="mt-4 text-lg text-brand-100">
            Objednajte sa na konzultáciu a spoločne nájdeme ideálne riešenie pre vaše potreby.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/rezervacia" color="secondary" size="lg">
              Rezervovať termín
            </Button>
            <Link
              href="/cennik"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/30 px-4 py-2.5 text-md font-semibold text-white transition hover:bg-white/10"
            >
              Zobraziť cenník
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
