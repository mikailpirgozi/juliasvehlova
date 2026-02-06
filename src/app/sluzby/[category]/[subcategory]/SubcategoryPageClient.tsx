'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ChevronRight, Home02, Clock, Star01 } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { ServicesPriceTable } from '@/components/services'
import type { MainCategory, Subcategory, SimpleService } from '@/lib/services-new'
import { getServiceImage } from '@/lib/service-images'

interface SubcategoryPageClientProps {
  category: MainCategory
  subcategory: Subcategory
}

// Service Card Component for rich content services
function ServiceCard({ 
  service, 
  categorySlug, 
  subcategorySlug,
  index = 1,
}: { 
  service: SimpleService
  categorySlug: string
  subcategorySlug: string
  index?: number
}) {
  const serviceImage = getServiceImage(subcategorySlug, index)

  return (
    <Link
      href={`/sluzby/${categorySlug}/${subcategorySlug}/${service.slug}`}
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

export function SubcategoryPageClient({ category, subcategory }: SubcategoryPageClientProps) {
  // Check if any service has rich content
  const hasRichServices = subcategory.services.some(
    (s) => s.tagline || s.shortDescription || s.fullDescription
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Subtle gradient background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-brand-50/20 via-white to-brand-50/10" />

      {/* Breadcrumb Navigation */}
      <nav className="relative z-10 border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="flex items-center text-gray-400 transition hover:text-brand-600"
              >
                <Home02 className="h-4 w-4" />
              </Link>
            </li>
            <li className="text-gray-200">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link href="/sluzby" className="text-gray-400 transition hover:text-brand-600">
                Služby
              </Link>
            </li>
            <li className="text-gray-200">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                href={`/sluzby/${category.slug}`}
                className="text-gray-400 transition hover:text-brand-600"
              >
                {category.title}
              </Link>
            </li>
            <li className="text-gray-200">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="font-medium text-gray-900">{subcategory.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Back Link */}
          <Link
            href={`/sluzby/${category.slug}`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-brand-600"
          >
            <ArrowLeft className="h-4 w-4" />
            {category.title}
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-4 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-600">
                {category.title}
              </span>
              <h1 className="font-serif text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                {subcategory.title}
              </h1>
              {subcategory.description && (
                <p className="mt-4 max-w-2xl text-lg text-gray-500">{subcategory.description}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                {subcategory.services.length} služieb
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 border-t border-gray-100 bg-gray-50/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
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
                {subcategory.services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    categorySlug={category.slug}
                    subcategorySlug={subcategory.slug}
                    index={index + 1}
                  />
                ))}
              </div>
            </>
          ) : (
            <ServicesPriceTable
              services={subcategory.services}
              categorySlug={category.slug}
              subcategorySlug={subcategory.slug}
              title={`Cenník - ${subcategory.title}`}
              showDetailLinks={true}
            />
          )}
        </div>
      </section>

      {/* Other Subcategories */}
      {category.subcategories && category.subcategories.length > 1 && (
        <section className="relative z-10 border-t border-gray-100 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-center font-serif text-2xl font-bold text-gray-900">
              Ďalšie kategórie
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {category.subcategories
                .filter((sub) => sub.id !== subcategory.id)
                .map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/sluzby/${category.slug}/${sub.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {sub.title}
                    <span className="text-gray-400">({sub.services.length})</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative z-10 border-t border-gray-100 bg-brand-600 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Zaujala vás niektorá služba?
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
              Kompletný cenník
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
