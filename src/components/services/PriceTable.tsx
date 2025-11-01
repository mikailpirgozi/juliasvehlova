import type { Service } from '@/lib/services'

interface PriceTableProps {
  service: Service
}

export function PriceTable({ service }: PriceTableProps): JSX.Element {
  const priceDisplay =
    typeof service.price === 'string'
      ? service.price
      : `${service.price.from}${service.price.currency} - ${service.price.to}${service.price.currency}`

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-serif text-2xl font-bold text-primary">Cenník</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <p className="font-medium text-gray-900">{service.title}</p>
            <p className="text-sm text-gray-500">Trvanie: {service.duration}</p>
          </div>
          <p className="font-serif text-2xl font-bold text-primary">{priceDisplay}</p>
        </div>

        {service.process && service.process.length > 0 && (
          <div className="rounded-md bg-accent-gold/5 p-4">
            <p className="text-sm text-gray-700">
              ✓ Zahŕňa konzultáciu, procedúru a aftercare inštruktáž
            </p>
            {service.slug.includes('microblading') || service.slug.includes('powder-brows') ? (
              <p className="mt-2 text-sm font-medium text-primary">✓ Korekcia zahrnutá v cene</p>
            ) : null}
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p>Presná cena bude určená po osobnej konzultácii.</p>
          <p className="mt-1">Platba hotovosťou alebo kartou.</p>
        </div>
      </div>
    </div>
  )
}

