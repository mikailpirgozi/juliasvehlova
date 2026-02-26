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
  noImage?: boolean
}

export function SubcategoryCard({ subcategory, categorySlug, priority = false, noImage = false }: SubcategoryCardProps) {
  if (noImage) {
    const serviceCount = subcategory.services.length
    return (
      <Link
        href={`/sluzby/${categorySlug}/${subcategory.slug}`}
        className="group flex items-center justify-between gap-4 rounded-xl border border-brand-100 bg-white px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
      >
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900 transition-colors duration-200 group-hover:text-brand-700">
            {subcategory.title}
          </h3>
          {subcategory.description && (
            <p className="mt-0.5 line-clamp-1 text-sm text-gray-400">
              {subcategory.description}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600">
            {serviceCount} {serviceCount === 1 ? 'služba' : serviceCount < 5 ? 'služby' : 'služieb'}
          </span>
          <ArrowRight className="h-4 w-4 text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-500" />
        </div>
      </Link>
    )
  }

  const heroImage = subcategory.image ?? getSubcategoryHeroImage(subcategory.slug)

  return (
    <Link
      href={`/sluzby/${categorySlug}/${subcategory.slug}`}
      className="group relative block aspect-[3/2] overflow-hidden rounded-2xl"
    >
      <Image
        src={heroImage}
        alt={subcategory.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <h3 className="text-sm font-semibold leading-snug tracking-wide text-white drop-shadow-sm">
          {subcategory.title}
        </h3>
      </div>
    </Link>
  )
}
