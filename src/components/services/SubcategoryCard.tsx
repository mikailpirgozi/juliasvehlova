'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@untitledui/icons'
import type { Subcategory } from '@/lib/services-new'
import { getSubcategoryHeroImage } from '@/lib/service-images'

interface SubcategoryCardProps {
  subcategory: Subcategory
  categorySlug: string
  priority?: boolean
}

export function SubcategoryCard({ subcategory, categorySlug, priority = false }: SubcategoryCardProps) {
  const serviceCount = subcategory.services.length
  const popularServices = subcategory.services.filter((s) => s.popular).slice(0, 2)
  const previewServices = popularServices.length > 0
    ? popularServices
    : subcategory.services.slice(0, 2)
  const heroImage = subcategory.image ?? getSubcategoryHeroImage(subcategory.slug)
  const hasMoreServices = serviceCount > 2

  return (
    <Link
      href={`/sluzby/${categorySlug}/${subcategory.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={subcategory.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={priority}
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
          <h3 className="font-serif text-xl font-bold text-brand-800 transition-colors duration-300 group-hover:text-brand-600">
            {subcategory.title}
          </h3>
          {subcategory.description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-500">
              {subcategory.description}
            </p>
          )}

          {/* Services preview */}
          {previewServices.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-brand-100/60 pt-3">
              {previewServices.map((service) => (
                <li key={service.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    {service.popular && <span className="text-xs text-amber-500">★</span>}
                    <span className="line-clamp-1">{service.name}</span>
                  </span>
                  <span className="ml-2 whitespace-nowrap font-semibold text-brand-600">
                    {service.price}
                  </span>
                </li>
              ))}
              {hasMoreServices && (
                <li className="pt-0.5 text-xs text-gray-400">
                  +{serviceCount - 2} ďalších služieb
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-brand-100 pt-4">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            {serviceCount} služieb
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#CDA882] transition-all duration-300 group-hover:gap-2.5">
            Zobraziť
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
