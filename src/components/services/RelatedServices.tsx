import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from '@untitledui/icons'
import type { Service } from '@/lib/services'

interface RelatedServicesProps {
  services: Service[]
  title?: string
}

export function RelatedServices({ services, title = 'Súvisiace služby' }: RelatedServicesProps) {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      
      <div className="mt-4 space-y-3">
        {services.slice(0, 4).map((service) => {
          const hasImage = service.images && service.images.length > 0
          const imageUrl = hasImage && service.images[0] ? service.images[0].url : '/images/categories/face.jpg'
          const priceDisplay =
            typeof service.price === 'string'
              ? service.price
              : `Od ${service.price.from}${service.price.currency}`

          return (
            <Link
              key={service.id}
              href={`/sluzby/${service.slug}`}
              className="group flex items-center gap-4 rounded-lg border border-gray-100 p-3 transition-all hover:border-brand-200 hover:bg-brand-50/50"
            >
              {/* Thumbnail */}
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={service.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-medium text-gray-900 group-hover:text-brand-700">
                  {service.title}
                </h4>
                <p className="mt-1 text-xs text-gray-500">{priceDisplay}</p>
              </div>

              {/* Arrow */}
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
            </Link>
          )
        })}
      </div>

      {services.length > 4 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href="/sluzby"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Zobraziť všetky služby
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
