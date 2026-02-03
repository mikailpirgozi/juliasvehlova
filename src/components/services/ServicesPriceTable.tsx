'use client'

import Link from 'next/link'
import { ChevronRight } from '@untitledui/icons'
import type { SimpleService } from '@/lib/services-new'

interface ServicesPriceTableProps {
  services: SimpleService[]
  categorySlug: string
  subcategorySlug?: string
  showDetailLinks?: boolean
  title?: string
  /** For categories without subcategories, the URL is /sluzby/[category]/[service] instead of /sluzby/[category]/[subcategory]/[service] */
  isDirectService?: boolean
}

export function ServicesPriceTable({
  services,
  categorySlug,
  subcategorySlug,
  showDetailLinks = false,
  title = 'Cenník služieb',
  isDirectService = false,
}: ServicesPriceTableProps) {
  const getServiceLink = (service: SimpleService) => {
    if (isDirectService) {
      // For categories without subcategories: /sluzby/[category]/[service]
      return `/sluzby/${categorySlug}/${service.slug}`
    }
    if (subcategorySlug) {
      return `/sluzby/${categorySlug}/${subcategorySlug}/${service.slug}`
    }
    return `/sluzby/${categorySlug}/${service.slug}`
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {title && (
        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Služba
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">
                Trvanie
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Cena
              </th>
              {showDetailLinks && (
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <span className="sr-only">Akcie</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.map((service) => (
              <tr key={service.id} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {service.popular && (
                      <span className="flex-shrink-0 text-sm text-yellow-500">★</span>
                    )}
                    <div>
                      <span className="font-medium text-gray-900">{service.name}</span>
                      <p className="mt-1 text-sm text-gray-500 sm:hidden">{service.duration}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-6 py-4 text-sm text-gray-500 sm:table-cell">
                  {service.duration}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lg font-semibold text-gray-900">{service.price}</span>
                </td>
                {showDetailLinks && (
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={getServiceLink(service)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
                    >
                      <span className="hidden sm:inline">Detail</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      {services.some((s) => s.popular) && (
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
          <p className="text-xs text-gray-500">★ — Obľúbené služby</p>
        </div>
      )}
    </div>
  )
}
