'use client'

import Link from 'next/link'
import { ChevronRight } from '@untitledui/icons'
import type { Subcategory } from '@/lib/services-new'

interface SubcategoryCardProps {
  subcategory: Subcategory
  categorySlug: string
}

export function SubcategoryCard({ subcategory, categorySlug }: SubcategoryCardProps) {
  const serviceCount = subcategory.services.length
  const popularServices = subcategory.services.filter((s) => s.popular).slice(0, 3)

  return (
    <Link
      href={`/sluzby/${categorySlug}/${subcategory.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-brand-200 hover:shadow-lg"
    >
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-brand-50 to-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-gray-900 group-hover:text-brand-700">
            {subcategory.title}
          </h3>
          <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
            {serviceCount} služieb
          </span>
        </div>
        {subcategory.description && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">{subcategory.description}</p>
        )}
      </div>

      {/* Popular Services Preview */}
      <div className="flex-1 p-5">
        {popularServices.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Obľúbené služby
            </p>
            <ul className="space-y-2">
              {popularServices.map((service) => (
                <li key={service.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="text-yellow-500">★</span>
                    <span className="line-clamp-1">{service.name}</span>
                  </span>
                  <span className="whitespace-nowrap font-medium text-brand-600">
                    {service.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Služby</p>
            <ul className="space-y-2">
              {subcategory.services.slice(0, 3).map((service) => (
                <li key={service.id} className="flex items-center justify-between text-sm">
                  <span className="line-clamp-1 text-gray-700">{service.name}</span>
                  <span className="whitespace-nowrap font-medium text-brand-600">
                    {service.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {serviceCount > 3 && (
          <p className="mt-3 text-xs text-gray-400">+{serviceCount - 3} ďalších služieb</p>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-brand-600">
          <span>Zobraziť všetky</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
