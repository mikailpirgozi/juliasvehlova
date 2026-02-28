'use client'

import Link from 'next/link'
import { ChevronRight, Clock, Star01 } from '@untitledui/icons'
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
      return `/sluzby/${categorySlug}/${service.slug}`
    }
    if (subcategorySlug) {
      return `/sluzby/${categorySlug}/${subcategorySlug}/${service.slug}`
    }
    return `/sluzby/${categorySlug}/${service.slug}`
  }

  return (
    <div className="flex flex-col gap-6">
      {title && (
        <h3 className="font-serif text-2xl font-bold text-gray-900">{title}</h3>
      )}

      <div className="flex flex-col gap-3">
        {services.map((service) => {
          const serviceLink = getServiceLink(service)
          const Content = (
            <>
              <div className="flex flex-1 items-start gap-4">
                {service.popular ? (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-50">
                    <Star01 className="h-5 w-5 text-amber-500" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <span className="font-serif text-lg font-medium text-brand-600">
                      {service.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-gray-900 transition-colors group-hover:text-brand-600">
                      {service.name}
                    </h4>
                    {service.popular && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Obľúbené
                      </span>
                    )}
                  </div>
                  {service.tagline ? (
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{service.tagline}</p>
                  ) : service.shortDescription ? (
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{service.shortDescription}</p>
                  ) : null}
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-6 border-t border-gray-100 pt-4 sm:mt-0 sm:border-0 sm:pt-0">
                <div className="text-left sm:text-right">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400 sm:hidden">Cena</p>
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">{service.price}</p>
                </div>
                
                {showDetailLinks && (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            </>
          )

          return showDetailLinks ? (
            <Link
              key={service.id}
              href={serviceLink}
              className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md sm:flex-row sm:items-center sm:p-6"
            >
              {Content}
            </Link>
          ) : (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all sm:flex-row sm:items-center sm:p-6"
            >
              {Content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
