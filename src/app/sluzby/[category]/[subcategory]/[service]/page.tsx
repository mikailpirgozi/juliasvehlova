import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChevronRight, Home02, Clock, Check, Users01, Lightbulb01, Heart, Zap, Target01, Star01, RefreshCw01, Eye, Stars01, Shield01, Award01 } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import {
  getServiceBySlug,
  generateServiceStaticParams,
  type MainCategory,
  type Subcategory,
  type SimpleService,
  type ServiceBenefit,
  type ProcessStep,
} from '@/lib/services-new'
import { getServiceGalleryImages } from '@/lib/service-images'

interface ServicePageProps {
  params: Promise<{
    category: string
    subcategory: string
    service: string
  }>
}

export async function generateStaticParams() {
  return generateServiceStaticParams()
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug, service: serviceSlug } = await params
  const result = getServiceBySlug(categorySlug, subcategorySlug, serviceSlug)

  if (!result) {
    return {
      title: 'Služba nenájdená',
    }
  }

  const { category, subcategory, service } = result

  return {
    title: `${service.name} | ${subcategory.title} | Julia Estetic Clinic`,
    description: service.shortDescription || `${service.name} - ${service.duration}, ${service.price}. ${subcategory.title} v Julia Estetic Clinic Malacky.`,
    openGraph: {
      title: `${service.name} | Julia Estetic Clinic`,
      description: service.shortDescription || `${service.name} - ${service.duration}, ${service.price}`,
      images: [category.image],
    },
    keywords: [service.name, subcategory.title, category.title, 'Julia Estetic Clinic', 'Malacky'],
  }
}

// Map icon keys to Untitled UI icons
const benefitIconMap: Record<string, React.FC<{ className?: string }>> = {
  energy: Zap,
  balance: RefreshCw01,
  clarity: Lightbulb01,
  healing: Heart,
  connection: Users01,
  communication: Users01,
  harmony: RefreshCw01,
  growth: Star01,
  transform: RefreshCw01,
  release: RefreshCw01,
  peace: Heart,
  potential: Target01,
  precision: Target01,
  natural: Stars01,
  time: Clock,
  lasting: Shield01,
  complete: Check,
  value: Award01,
  realistic: Eye,
  custom: Users01,
  soft: Stars01,
  makeup: Stars01,
  universal: Users01,
  safe: Shield01,
  fresh: Stars01,
  painless: Heart,
  professional: Award01,
  color: Stars01,
  shape: Target01,
  youthful: Stars01,
  dramatic: Eye,
  waterproof: Shield01,
  fullness: Stars01,
  control: Target01,
  open: Eye,
  easy: Check,
  perfect: Star01,
  quick: Zap,
  healthy: Heart,
  maintain: RefreshCw01,
  nomakeup: Stars01,
}

function BenefitIcon({ iconKey, className }: { iconKey?: string; className?: string }) {
  const Icon = iconKey ? benefitIconMap[iconKey] || Star01 : Star01
  return <Icon className={className} />
}

function ServiceDetailContent({
  category,
  subcategory,
  service,
}: {
  category: MainCategory
  subcategory: Subcategory
  service: SimpleService
}) {
  // Get related services (other services in the same subcategory)
  const relatedServices = subcategory.services.filter((s) => s.id !== service.id).slice(0, 4)
  
  // Get service images
  const galleryImages = getServiceGalleryImages(subcategory.slug, 4)

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
            <li>
              <Link
                href={`/sluzby/${category.slug}/${subcategory.slug}`}
                className="text-gray-400 transition hover:text-brand-600"
              >
                {subcategory.title}
              </Link>
            </li>
            <li className="text-gray-200">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="max-w-[200px] truncate font-medium text-gray-900">{service.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section - Apple-style large typography */}
      <section className="relative z-10 px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Back Link */}
          <Link
            href={`/sluzby/${category.slug}/${subcategory.slug}`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-brand-600"
          >
            <ArrowLeft className="h-4 w-4" />
            {subcategory.title}
          </Link>

          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Category Badge */}
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-600">
                  {subcategory.title}
                </span>
                {service.popular && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    <Star01 className="h-3 w-3" /> Obľúbené
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                {service.name}
              </h1>

              {/* Tagline */}
              {service.tagline && (
                <p className="mt-4 text-xl text-brand-600 sm:text-2xl">
                  {service.tagline}
                </p>
              )}

              {/* Short Description */}
              {service.shortDescription && (
                <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
                  {service.shortDescription}
                </p>
              )}
            </div>

            {/* Price Card - Floating */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100/50">
                <div className="mb-6 text-center">
                  <p className="text-sm font-medium uppercase tracking-wider text-gray-400">Cena</p>
                  <p className="mt-2 text-4xl font-bold text-gray-900">{service.price}</p>
                </div>
                
                <div className="mb-8 flex items-center justify-center gap-6 border-y border-gray-100 py-4">
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {service.duration}
                  </span>
                </div>

                <Button href="/rezervacia" color="primary" size="lg" className="w-full">
                  Rezervovať termín
                </Button>

                {service.note && (
                  <p className="mt-4 text-center text-xs text-gray-400">
                    {service.note}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description Section */}
      {service.fullDescription && (
        <section className="relative z-10 border-t border-gray-100 bg-gray-50/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
              {service.fullDescription}
            </p>
          </div>
        </section>
      )}

      {/* Image Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="relative z-10 border-t border-gray-100 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Galéria
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <Image
                    src={image}
                    alt={`${service.name} - obrázok ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="relative z-10 border-t border-gray-100 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Čo získate
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {service.benefits.map((benefit: ServiceBenefit, index: number) => (
                <div
                  key={index}
                  className="group relative rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                    <BenefitIcon iconKey={benefit.icon} className="h-6 w-6" />
                  </div>
                  
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  
                  {benefit.description && (
                    <p className="text-sm text-gray-500">
                      {benefit.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {service.process && service.process.length > 0 && (
        <section className="relative z-10 border-t border-gray-100 bg-gray-50/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Ako to prebieha
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-brand-200 via-brand-300 to-brand-200 sm:block" />

              <div className="space-y-8">
                {service.process.map((step: ProcessStep, index: number) => (
                  <div
                    key={index}
                    className="relative flex gap-6"
                  >
                    {/* Step number */}
                    <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white shadow-lg">
                      {step.step}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 rounded-xl bg-white p-6 shadow-sm">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* For Whom Section */}
      {service.forWhom && service.forWhom.length > 0 && (
        <section className="relative z-10 border-t border-gray-100 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Pre koho je to vhodné
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {service.forWhom.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="relative z-10 border-t border-gray-100 bg-gray-50/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Podobné služby
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <Link
                  key={related.id}
                  href={`/sluzby/${category.slug}/${subcategory.slug}/${related.slug}`}
                  className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-600">
                      {related.price}
                    </span>
                    {related.popular && (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <Star01 className="h-3 w-3" /> Obľúbené
                      </span>
                    )}
                  </div>
                  
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-brand-600">
                    {related.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {related.duration}
                    </span>
                  </div>

                  {related.tagline && (
                    <p className="mt-3 text-sm text-gray-500">
                      {related.tagline}
                    </p>
                  )}
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
            Máte záujem o túto službu?
          </h2>
          <p className="mt-4 text-lg text-brand-100">
            Rezervujte si termín a doprajte si profesionálnu starostlivosť.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/rezervacia" color="secondary" size="lg">
              Rezervovať termín
            </Button>
            <Link 
              href={`/sluzby/${category.slug}/${subcategory.slug}`} 
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/30 px-4 py-2.5 text-md font-semibold text-white transition hover:bg-white/10"
            >
              Všetky služby
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { category: categorySlug, subcategory: subcategorySlug, service: serviceSlug } = await params
  const result = getServiceBySlug(categorySlug, subcategorySlug, serviceSlug)

  if (!result) {
    notFound()
  }

  return (
    <ServiceDetailContent
      category={result.category}
      subcategory={result.subcategory}
      service={result.service}
    />
  )
}
