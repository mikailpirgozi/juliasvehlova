'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Subcategory } from '@/lib/services-new'
import { getSubcategoryHeroImage } from '@/lib/service-images'

interface SubcategoryCardProps {
  subcategory: Subcategory
  categorySlug: string
  priority?: boolean
}

export function SubcategoryCard({ subcategory, categorySlug, priority = false }: SubcategoryCardProps) {
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

      {/* Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      {/* Title */}
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <h3 className="text-sm font-semibold leading-snug tracking-wide text-white drop-shadow-sm">
          {subcategory.title}
        </h3>
      </div>
    </Link>
  )
}
