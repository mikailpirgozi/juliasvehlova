import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import {
  FaceSmile,
  HeartCircle,
  Lightning01,
  Sun,
  ArrowLeft,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { ServiceCard } from '@/components/services'
import { allServices, categoryMetadata, type ServiceCategory, type CategoryIconKey } from '@/lib/services'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

const categorySlugMap: Record<string, ServiceCategory> = {
  tvar: 'face',
  telo: 'body',
  energy: 'energy',
  'chakra-calibration': 'chakra_calibration',
}

const categoryImages: Record<string, string> = {
  tvar: '/images/categories/face.jpg',
  telo: '/images/categories/body.jpg',
  energy: '/images/categories/energy.jpg',
  'chakra-calibration': '/images/categories/chakra.jpg',
}

// Map icon keys to Untitled UI icon components (subset used in categories)
const iconComponents: Partial<Record<CategoryIconKey, FC<{ className?: string }>>> = {
  face: FaceSmile,
  body: HeartCircle,
  energy: Lightning01,
  chakra: Sun,
}

export function generateStaticParams() {
  return Object.keys(categorySlugMap).map((slug) => ({
    category: slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryKey = categorySlugMap[category]
  if (!categoryKey) return {}

  const metadata = categoryMetadata[categoryKey]
  return {
    title: `${metadata.title} | Julia Esthetic Clinic`,
    description: metadata.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryKey = categorySlugMap[category]

  if (!categoryKey) {
    notFound()
  }

  const metadata = categoryMetadata[categoryKey]
  const services = allServices.filter((s) => s.category === categoryKey)
  const IconComponent = iconComponents[metadata.iconKey]
  const categoryImage = categoryImages[category] || '/images/categories/face.jpg'

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20">
      {/* Hero Section with Image */}
      <section className="relative h-64 overflow-hidden sm:h-80">
        <Image
          src={categoryImage}
          alt={metadata.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        
        {/* Back Link */}
        <div className="absolute top-4 left-4 z-10 sm:top-6 sm:left-6">
          <Link
            href="/sluzby"
            className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Späť na služby
          </Link>
        </div>
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            {IconComponent && (
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <IconComponent className="h-8 w-8" />
              </div>
            )}
            <h1 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              {metadata.title}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">
              {metadata.description}
            </p>
          </div>
        </div>
      </section>

      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed top-20 right-10 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {services.length > 0 ? (
          <>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-brand-100 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Zaujíma vás niektorá z týchto služieb?
              </h3>
              <p className="mt-2 text-gray-600">
                Rezervujte si konzultáciu a radi vám poradíme s výberom najvhodnejšej procedúry.
              </p>
              <div className="mt-6">
                <Button href="/rezervacia" color="primary" size="lg">
                  Rezervovať konzultáciu
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-16 py-20 text-center">
            <p className="text-lg text-gray-600">
              Služby v tejto kategórii sú práve v príprave.
            </p>
            <div className="mt-8">
              <Button href="/sluzby" color="secondary" size="md">
                Späť na všetky služby
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
