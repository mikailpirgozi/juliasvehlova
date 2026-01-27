import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/base/buttons/button'
import { Badge } from '@/components/base/badges/badges'
import { PriceTable, ProcessTimeline, ServiceFAQ, RelatedServices } from '@/components/services'
import { getServiceBySlug, getAllServiceSlugs, getRelatedServices } from '@/lib/services'
import { generateServiceMetadata } from '@/lib/seo'
import { ServiceSchema, FAQSchema, Breadcrumbs } from '@/components/seo'
import { BASE_URL } from '@/lib/seo/constants'

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  return generateServiceMetadata(service)
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  // Prepare schema data
  const serviceUrl = `${BASE_URL}/sluzby/${service.slug}`
  const priceRange = typeof service.price === 'object' 
    ? { from: service.price.from, to: service.price.to }
    : undefined

  return (
    <article className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20 py-16 sm:py-24">
      {/* JSON-LD Schema */}
      <ServiceSchema
        name={service.title}
        description={service.shortDescription}
        url={serviceUrl}
        image={service.images[0]?.url}
        priceRange={priceRange}
        duration={service.duration}
      />
      {service.faqs && service.faqs.length > 0 && (
        <FAQSchema faqs={service.faqs} />
      )}

      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed top-20 right-10 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/15 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'Služby', href: '/sluzby' },
              { label: service.title },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-12">
          <Link
            href="/sluzby"
            className="inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-brand-600"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Späť na služby
          </Link>

          <h1 className="mt-4 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{service.shortDescription}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Badge color="gray" type="pill-color" className="inline-flex items-center gap-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {service.duration}
            </Badge>
            <Badge color="brand" type="pill-color" className="inline-flex items-center gap-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {typeof service.price === 'string'
                ? service.price
                : `${service.price.from}-${service.price.to} ${service.price.currency}`}
            </Badge>
          </div>
        </div>

        {/* Service Image */}
        {service.images && service.images.length > 0 && service.images[0] && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-brand-100 shadow-lg">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={service.images[0].url}
                alt={service.images[0].alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Full Description */}
        <div className="mb-12">
          <p className="text-gray-600 leading-relaxed">{service.fullDescription}</p>
        </div>

        {/* Benefits */}
        <div className="mb-12 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900">Výhody</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900">Priebeh procedúry</h2>
          <div className="mt-4">
            <ProcessTimeline steps={service.process} />
          </div>
        </div>

        {/* Price Info */}
        <div className="mb-12">
          <PriceTable service={service} />
        </div>

        {/* Contraindications */}
        {service.contraindications && service.contraindications.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-900">Kontraindikácie</h2>
            <div className="mt-4 rounded-xl border border-warning-200 bg-warning-50 p-6">
              <ul className="space-y-2">
                {service.contraindications.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-warning-800">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Aftercare */}
        {service.aftercare && service.aftercare.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-900">Starostlivosť po zákroku</h2>
            <ul className="mt-4 space-y-3">
              {service.aftercare.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-900">Často kladené otázky</h2>
            <div className="mt-4">
              <ServiceFAQ faqs={service.faqs} />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-2xl border border-brand-100 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-gray-900">Zaujíma vás táto služba?</h3>
          <p className="mt-2 text-sm text-gray-600">
            Rezervujte si konzultáciu a radi vám poradíme s výberom najvhodnejšej procedúry.
          </p>
          <div className="mt-6">
            <Button href="/rezervacia" color="primary" size="lg">
              Rezervovať konzultáciu
            </Button>
          </div>
        </div>

        {/* Related Services */}
        <div className="mt-12">
          <RelatedServices services={getRelatedServices(service)} />
        </div>
      </div>
    </article>
  )
}
