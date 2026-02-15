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
      className="group relative block aspect-[4/5] overflow-hidden rounded-xl"
    >
      <Image
        src={heroImage}
        alt={subcategory.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority={priority}
      />

      {/* Subtle dark gradient at bottom for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Subcategory title */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-sm font-semibold tracking-wide text-white sm:text-base">
          {subcategory.title}
        </h3>
      </div>
    </Link>
  )
}
