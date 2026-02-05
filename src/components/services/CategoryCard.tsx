'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@untitledui/icons'
import type { MainCategory } from '@/lib/services-new'
import { getCategoryServiceCount } from '@/lib/services-new'

interface CategoryCardProps {
  category: MainCategory
  showServiceCount?: boolean
  priority?: boolean
}

export function CategoryCard({ category, showServiceCount = true, priority = false }: CategoryCardProps) {
  const serviceCount = getCategoryServiceCount(category)
  const hasSubcategories = !!category.subcategories && category.subcategories.length > 0
  const countLabel = hasSubcategories
    ? `${category.subcategories!.length} kategórií`
    : `${serviceCount} služieb`

  return (
    <Link
      href={`/sluzby/${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={category.imagePosition ? { objectPosition: category.imagePosition } : undefined}
          priority={priority}
        />
        {/* Subtle brand vignette from bottom only */}
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
            {category.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {category.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-brand-100 pt-4">
          {showServiceCount && (
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              {countLabel}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#CDA882] transition-all duration-300 group-hover:gap-2.5">
            Zobraziť
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
