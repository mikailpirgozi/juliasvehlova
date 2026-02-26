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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={serviceImage}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Brand vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(216, 167, 177, 0.45) 0%, rgba(216, 167, 177, 0.15) 30%, transparent 55%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative flex flex-1 flex-col justify-between p-5"
        style={{
          boxShadow: 'inset 0 40px 50px -15px rgba(216, 167, 177, 0.5), inset 0 20px 25px -5px rgba(216, 167, 177, 0.3)',
        }}
      >
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl font-bold text-brand-800 transition-colors duration-300 group-hover:text-brand-600">
              {service.name}
            </h3>
            {service.popular && (
              <span className="mt-0.5 flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                <Star01 className="h-3 w-3" /> Obľúbené
              </span>
            )}
          </div>

          {service.shortDescription && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-500">
              {service.shortDescription}
            </p>
          )}

          {/* Price & Duration */}
          <div className="mt-3 flex items-center gap-3 border-t border-brand-100/60 pt-3">
            <span className="text-lg font-bold text-brand-700">{service.price}</span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3.5 w-3.5" />
              {service.duration}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end border-t border-brand-100 pt-4">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#CDA882] transition-all duration-300 group-hover:gap-2.5">
            Zobraziť
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
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
        <div className="relative h-52 w-full sm:h-64 lg:h-80">
          <Image
            src={category.image}
            alt={category.title}
            fill
            priority
            className="object-cover"
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
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
