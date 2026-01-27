import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from '@untitledui/icons'
import { Badge } from '@/components/base/badges/badges'
import type { Service } from '@/lib/services'
import { getCategoryTitle } from '@/lib/services'

interface ServiceCardProps {
  service: Service
  showCategory?: boolean
  showImage?: boolean
}

export function ServiceCard({ service, showCategory = false, showImage = true }: ServiceCardProps) {
  const priceDisplay =
    typeof service.price === 'string'
      ? service.price
      : `${service.price.from}${service.price.currency} - ${service.price.to}${service.price.currency}`

  const hasImage = service.images && service.images.length > 0
  const imageUrl = hasImage && service.images[0] ? service.images[0].url : '/images/categories/face.jpg'
  const imageAlt = hasImage && service.images[0] ? service.images[0].alt : service.title

  return (
    <Link
      href={`/sluzby/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-brand-200 hover:shadow-lg"
    >
      {/* Image */}
      {showImage && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {service.featured && (
            <div className="absolute left-3 top-3">
              <Badge color="brand" type="pill-color">Obľúbené</Badge>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {!showImage && service.featured && (
          <div className="mb-3">
            <Badge color="brand" type="pill-color">Obľúbené</Badge>
          </div>
        )}

        {showCategory && (
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-600">
            {getCategoryTitle(service.category)}
          </p>
        )}

        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-700">
          {service.title}
        </h3>
        
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
          {service.shortDescription}
        </p>

        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Trvanie:</span>
            <span className="font-medium text-gray-900">{service.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Cena:</span>
            <span className="font-semibold text-brand-600">{priceDisplay}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-600">
          <span>Zistiť viac</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
