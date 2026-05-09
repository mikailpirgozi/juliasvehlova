import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Home02, Clock, Check, Users01, Lightbulb01, Heart, Zap, Target01, Star01, RefreshCw01, Eye, Stars01, Shield01, Award01 } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { BookioWidget } from '@/components/booking'
import { ServicePriceDisplay } from '@/components/services'
import {
  getServiceBySlug,
  generateServiceStaticParams,
  type MainCategory,
  type Subcategory,
  type SimpleService,
  type ServiceBenefit,
  type ProcessStep,
} from '@/lib/services-new'
import { getActiveMothersDayPromo } from '@/lib/promotions'

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
  const relatedServices = subcategory.services.filter((s) => s.id !== service.id).slice(0, 4)
  const hasWidget = !!service.bookioServiceId
  const activePromo = getActiveMothersDayPromo(service.id)

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-brand-50/20 via-white to-brand-50/10" />

      {/* Breadcrumb */}
      <nav className="relative z-10 border-b border-gray-100 bg-white/80 px-4 pb-3 pt-[calc(72px+0.75rem)] backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/" className="flex items-center text-gray-400 transition hover:text-brand-600">
                <Home02 className="h-4 w-4" />
              </Link>
            </li>
            <li className="text-gray-200"><ChevronRight className="h-4 w-4" /></li>
            <li>
              <Link href="/sluzby" className="text-gray-400 transition hover:text-brand-600">Služby</Link>
            </li>
            <li className="text-gray-200"><ChevronRight className="h-4 w-4" /></li>
            <li>
              <Link href={`/sluzby/${category.slug}`} className="text-gray-400 transition hover:text-brand-600">
                {category.title}
              </Link>
            </li>
            <li className="text-gray-200"><ChevronRight className="h-4 w-4" /></li>
            <li>
              <Link href={`/sluzby/${category.slug}/${subcategory.slug}`} className="text-gray-400 transition hover:text-brand-600">
                {subcategory.title}
              </Link>
            </li>
            <li className="text-gray-200"><ChevronRight className="h-4 w-4" /></li>
            <li className="max-w-[200px] truncate font-medium text-gray-900">{service.name}</li>
          </ol>
        </div>
      </nav>

      {/* Main two-column layout */}
      <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className={hasWidget ? 'mx-auto flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-0' : 'mx-auto max-w-4xl'}>

          {/* LEFT — content */}
          <div className={hasWidget ? 'min-w-0 flex-1 lg:pr-10 lg:border-r lg:border-gray-100' : ''}>
            {/* Back link */}
            <Link
              href={`/sluzby/${category.slug}/${subcategory.slug}`}
              className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-brand-600"
            >
              <ArrowLeft className="h-4 w-4" />
              {subcategory.title}
            </Link>

            {/* Badges */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
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
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              {service.name}
            </h1>

            {/* Tagline */}
            {service.tagline && (
              <p className="mt-3 text-xl text-brand-600">
                {service.tagline}
              </p>
            )}

            {/* Price + duration inline */}
            <div className="mt-5 flex flex-wrap items-end gap-4">
              <ServicePriceDisplay
                serviceId={service.id}
                price={service.price}
                variant="hero"
              />
              <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
                <Clock className="h-3.5 w-3.5" />
                {service.duration}
              </span>
            </div>

            {/* Akciový banner – Deň matiek */}
            {activePromo && (
              <div className="mt-6 rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-brand-100/50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-200">
                    <Heart className="h-5 w-5 fill-brand-700 text-brand-700" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold text-brand-700">
                      Akcia ku Dňu matiek
                    </p>
                    <p className="mt-1 text-sm text-brand-700/80">
                      Doprajte mame nezabudnuteľný darček. Zľava platí len v aktuálnom akciovom okne &mdash; rezervujte si termín nižšie.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Short description */}
            {service.shortDescription && (
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                {service.shortDescription}
              </p>
            )}

            {/* Mobile booking widget — shown right after key info on mobile */}
            {hasWidget && (
              <div className="mt-8 lg:hidden">
                <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900">Rezervovať termín</h2>
                <BookioWidget
                  preselectedService={service.bookioServiceId}
                  preselectedCategory={service.bookioCategoryId ?? subcategory.bookioCategoryId}
                />
              </div>
            )}

            {/* Fallback CTA when no widget */}
            {!hasWidget && (
              <div className="mt-8">
                <Button href="/rezervacia" color="primary" size="lg">
                  Rezervovať termín
                </Button>
              </div>
            )}

            {/* Full description */}
            {service.fullDescription && (
              <p className="mt-10 text-base leading-relaxed text-gray-500">
                {service.fullDescription}
              </p>
            )}

            {/* Note */}
            {service.note && (
              <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
                {service.note}
              </p>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-5 font-serif text-2xl font-bold text-gray-900">Čo získate</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {service.benefits.map((benefit: ServiceBenefit, index: number) => (
                    <div key={index} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <BenefitIcon iconKey={benefit.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{benefit.title}</p>
                        {benefit.description && (
                          <p className="mt-0.5 text-sm text-gray-500">{benefit.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process */}
            {service.process && service.process.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-5 font-serif text-2xl font-bold text-gray-900">Ako to prebieha</h2>
                <div className="relative">
                  <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-brand-200 via-brand-300 to-brand-200 sm:block" />
                  <div className="space-y-5">
                    {service.process.map((step: ProcessStep, index: number) => (
                      <div key={index} className="relative flex gap-5">
                        <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white shadow-lg">
                          {step.step}
                        </div>
                        <div className="flex-1 rounded-xl bg-white p-5 shadow-sm">
                          <h3 className="mb-1 font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* For whom */}
            {service.forWhom && service.forWhom.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-5 font-serif text-2xl font-bold text-gray-900">Pre koho je to vhodné</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.forWhom.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Bookio widget (desktop only) */}
          {hasWidget && (
            <div className="hidden lg:block lg:w-1/2 lg:flex-shrink-0 lg:pl-10">
              <BookioWidget
                preselectedService={service.bookioServiceId}
                preselectedCategory={service.bookioCategoryId ?? subcategory.bookioCategoryId}
              />
            </div>
          )}
        </div>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="relative z-10 border-t border-gray-100 bg-gray-50/50 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
              Podobné služby
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((related) => (
                <Link
                  key={related.id}
                  href={`/sluzby/${category.slug}/${subcategory.slug}/${related.slug}`}
                  className="group rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xl font-bold text-brand-600">{related.price}</span>
                    {related.popular && (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <Star01 className="h-3 w-3" /> Obľúbené
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-brand-600">
                    {related.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-sm text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    {related.duration}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA footer */}
      <section className="relative z-10 border-t border-gray-100 bg-brand-600 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Máte záujem o túto službu?
          </h2>
          <p className="mt-4 text-lg text-brand-100">
            Rezervujte si termín a doprajte si profesionálnu starostlivosť.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/sluzby/${category.slug}/${subcategory.slug}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
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
