'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import {
  FaceSmile,
  HeartCircle,
  Lightning01,
  Sun,
  User01,
  Stars01,
  Droplets01,
  Edit05,
  Zap,
  Clock,
  Brush01,
  Eye,
  Settings01,
  Award01,
  Gift01,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { FadeIn } from '@/components/ui'
import { allServices, categoryMetadata, type ServiceCategory, type CategoryIconKey } from '@/lib/services'

interface MainCategory {
  key: ServiceCategory
  slug: string
  image: string
}

const mainCategories: MainCategory[] = [
  { key: 'face', slug: 'tvar', image: '/images/categories/face.jpg' },
  { key: 'body', slug: 'telo', image: '/images/categories/body.jpg' },
  { key: 'energy', slug: 'energy', image: '/images/categories/energy.jpg' },
  { key: 'chakra_calibration', slug: 'chakra-calibration', image: '/images/categories/chakra.jpg' },
  { key: 'men', slug: 'muzi', image: '/images/categories/men.jpg' },
]

// Map icon keys to Untitled UI icon components
const iconComponents: Record<CategoryIconKey, FC<{ className?: string }>> = {
  face: FaceSmile,
  body: HeartCircle,
  energy: Lightning01,
  chakra: Sun,
  men: User01,
  sparkle: Stars01,
  droplet: Droplets01,
  brush: Edit05,
  laser: Zap,
  star: Stars01,
  clock: Clock,
  flower: Brush01,
  eye: Eye,
  heart: HeartCircle,
  device: Settings01,
  injection: Stars01,
  crown: Award01,
  gift: Gift01,
}

// Color configurations for each category icon
const categoryColors: Record<ServiceCategory, { bg: string; iconBg: string; iconColor: string }> = {
  face: { bg: 'from-brand-100/60 to-brand-200/40', iconBg: 'bg-brand-100', iconColor: 'text-brand-600' },
  body: { bg: 'from-orange-100/60 to-orange-200/40', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  energy: { bg: 'from-yellow-100/60 to-amber-200/40', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  chakra_calibration: { bg: 'from-amber-100/60 to-yellow-200/40', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  men: { bg: 'from-gray-100/60 to-gray-200/40', iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
  botulotoxin: { bg: 'from-brand-100/60 to-brand-200/40', iconBg: 'bg-brand-100', iconColor: 'text-brand-600' },
  hyaluronic_acid: { bg: 'from-blue-100/60 to-blue-200/40', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  permanent_makeup: { bg: 'from-purple-100/60 to-purple-200/40', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  laser_epilation: { bg: 'from-red-100/60 to-red-200/40', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
  face_procedures: { bg: 'from-brand-100/60 to-brand-200/40', iconBg: 'bg-brand-100', iconColor: 'text-brand-600' },
  body_procedures: { bg: 'from-green-100/60 to-green-200/40', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  anti_aging: { bg: 'from-indigo-100/60 to-indigo-200/40', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  cosmetics: { bg: 'from-pink-100/60 to-pink-200/40', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
  eyebrows_lashes: { bg: 'from-violet-100/60 to-violet-200/40', iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
  professional_makeup: { bg: 'from-rose-100/60 to-rose-200/40', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
  device_treatments: { bg: 'from-cyan-100/60 to-cyan-200/40', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
  mesotherapy: { bg: 'from-teal-100/60 to-teal-200/40', iconBg: 'bg-teal-100', iconColor: 'text-teal-600' },
  vip_services: { bg: 'from-amber-100/60 to-amber-200/40', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  gift_vouchers: { bg: 'from-emerald-100/60 to-emerald-200/40', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
}

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20 px-4 py-20">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-20 right-10 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#CDA882]">
              Naše služby
            </p>
            <h2 className="mb-4 font-serif text-4xl font-bold text-brand-700 sm:text-5xl">
              Komplexná starostlivosť o vašu krásu
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Špecializujeme sa na estetické ošetrenia, ktoré zvýraznia vašu prirodzenú krásu s profesionálnym prístupom
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mainCategories.map((cat, index) => {
            const metadata = categoryMetadata[cat.key]
            const serviceCount = allServices.filter((s) => s.category === cat.key).length
            const IconComponent = iconComponents[metadata.iconKey]
            const colors = categoryColors[cat.key]

            return (
              <FadeIn key={cat.key} delay={index * 0.1}>
                <Link
                  href={`/sluzby/kategoria/${cat.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Background Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={metadata.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg} shadow-lg backdrop-blur-sm`}>
                        <IconComponent className={`h-6 w-6 ${colors.iconColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <h3 className="mb-2 font-serif text-2xl font-bold drop-shadow-lg">
                        {metadata.title}
                      </h3>
                      <p className="mb-3 text-sm text-white/90 line-clamp-2">
                        {metadata.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                          {serviceCount} služieb
                        </span>
                        <div className="flex items-center gap-2 font-semibold text-white transition-all duration-300 group-hover:gap-3">
                          <span className="text-sm">Zobraziť viac</span>
                          <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-16 text-center">
            <Button href="/sluzby" color="primary" size="lg">
              Všetky služby
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
