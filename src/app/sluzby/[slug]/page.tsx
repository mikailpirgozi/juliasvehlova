import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FadeIn, LinkButton, Badge } from '@/components/ui'
import { PriceTable, ProcessTimeline, ServiceFAQ } from '@/components/services'
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services'

interface ServiceDetailPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }))
}

export function generateMetadata({ params }: ServiceDetailPageProps) {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}

  return {
    title: service.seoMeta.title,
    description: service.seoMeta.description,
    keywords: service.seoMeta.keywords,
  }
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps): JSX.Element {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <article className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="mb-12">
            <Link
              href="/sluzby"
              className="inline-flex items-center text-primary hover:underline mb-6"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Späť na služby
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{service.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{service.shortDescription}</p>

            <div className="flex flex-wrap gap-3">
              <Badge>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.duration}
              </Badge>
              <Badge variant="primary">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {typeof service.price === 'string'
                  ? service.price
                  : `${service.price.from}-${service.price.to} ${service.price.currency}`}
              </Badge>
            </div>
          </div>
        </FadeIn>

        {/* Full Description */}
        <FadeIn delay={0.1}>
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed">{service.fullDescription}</p>
          </div>
        </FadeIn>

        {/* Benefits */}
        <FadeIn delay={0.2}>
          <div className="mb-12 p-8 bg-primary/5 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Výhody</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Process */}
        <FadeIn delay={0.3}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Priebeh procedúry</h2>
            <ProcessTimeline steps={service.process} />
          </div>
        </FadeIn>

        {/* Price Info */}
        <FadeIn delay={0.4}>
          <div className="mb-12">
            <PriceTable service={service} />
          </div>
        </FadeIn>

        {/* Contraindications */}
        {service.contraindications && service.contraindications.length > 0 && (
          <FadeIn delay={0.5}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Kontraindikácie</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <ul className="space-y-2">
                  {service.contraindications.map((item, index) => (
                    <li key={index} className="flex items-start text-amber-900">
                      <svg
                        className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Aftercare */}
        {service.aftercare && service.aftercare.length > 0 && (
          <FadeIn delay={0.6}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Starostlivosť po zákroku</h2>
              <ul className="space-y-3">
                {service.aftercare.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        )}

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <FadeIn delay={0.7}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Často kladené otázky</h2>
              <ServiceFAQ faqs={service.faqs} />
            </div>
          </FadeIn>
        )}

        {/* CTA */}
        <FadeIn delay={0.8}>
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-accent-gold/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Zaujíma vás táto služba?</h3>
            <p className="text-gray-700 mb-6">
              Rezervujte si konzultáciu a radi vám poradíme s výberom najvhodnejšej procedúry.
            </p>
            <LinkButton href="/rezervacia" variant="primary" size="lg">
              Rezervovať konzultáciu
            </LinkButton>
          </div>
        </FadeIn>
      </div>
    </article>
  )
}
