import type { Service } from '@/lib/services'

interface PriceTableProps {
  service: Service
}

export function PriceTable({ service }: PriceTableProps) {
  const priceDisplay =
    typeof service.price === 'string'
      ? service.price
      : `${service.price.from}${service.price.currency} - ${service.price.to}${service.price.currency}`

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">Cenník</h3>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <p className="font-medium text-gray-900">{service.title}</p>
            <p className="text-sm text-gray-500">Trvanie: {service.duration}</p>
          </div>
          <p className="text-2xl font-semibold text-brand-600">{priceDisplay}</p>
        </div>

        {service.process && service.process.length > 0 && (
          <div className="rounded-lg bg-brand-50 p-4">
            <p className="text-sm text-gray-700">
              <svg className="mr-2 inline h-4 w-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Zahŕňa konzultáciu, procedúru a aftercare inštruktáž
            </p>
            {service.slug.includes('microblading') || service.slug.includes('powder-brows') ? (
              <p className="mt-2 text-sm font-medium text-brand-700">
                <svg className="mr-2 inline h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Korekcia zahrnutá v cene
              </p>
            ) : null}
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>Presná cena bude určená po osobnej konzultácii.</p>
          <p className="mt-1">Platba hotovosťou alebo kartou.</p>
        </div>
      </div>
    </div>
  )
}
