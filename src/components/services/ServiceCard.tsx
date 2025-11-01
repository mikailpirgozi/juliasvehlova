import Link from 'next/link'
import { Card, CardTitle, CardDescription } from '@/components/ui'
import { Badge } from '@/components/ui'
import type { Service } from '@/lib/services'
import { getCategoryTitle } from '@/lib/services'

interface ServiceCardProps {
  service: Service
  showCategory?: boolean
}

export function ServiceCard({ service, showCategory = false }: ServiceCardProps): JSX.Element {
  const priceDisplay =
    typeof service.price === 'string'
      ? service.price
      : `${service.price.from}${service.price.currency} - ${service.price.to}${service.price.currency}`

  return (
    <Link href={`/sluzby/${service.slug}`}>
      <Card hoverable className="flex h-full flex-col transition-all hover:border-primary">
        {service.featured && (
          <div className="mb-2">
            <Badge variant="primary">Obľúbené</Badge>
          </div>
        )}

        {showCategory && (
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent-gold">
            {getCategoryTitle(service.category)}
          </p>
        )}

        <CardTitle className="mb-3 text-xl">{service.title}</CardTitle>
        <CardDescription className="mb-4 flex-1">{service.shortDescription}</CardDescription>

        <div className="mt-auto space-y-2 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Trvanie:</span>
            <span className="font-medium text-gray-900">{service.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Cena:</span>
            <span className="font-semibold text-primary">{priceDisplay}</span>
          </div>
        </div>

        <div className="mt-4 text-center text-sm font-medium text-primary">
          Zistiť viac →
        </div>
      </Card>
    </Link>
  )
}

