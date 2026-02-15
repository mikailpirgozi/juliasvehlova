'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { MainCategory } from '@/lib/services-new'

interface CategoryCardProps {
  category: MainCategory
  showServiceCount?: boolean
  priority?: boolean
}

export function CategoryCard({ category, priority = false }: CategoryCardProps) {
  return (
    <Link
      href={`/sluzby/${category.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-xl"
    >
      <Image
        src={category.image}
        alt={category.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={category.imagePosition ? { objectPosition: category.imagePosition } : undefined}
        priority={priority}
      />

      {/* Subtle dark gradient at bottom for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Category title */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-sm font-semibold tracking-wide text-white sm:text-base">
          {category.title}
        </h3>
      </div>
    </Link>
  )
}
