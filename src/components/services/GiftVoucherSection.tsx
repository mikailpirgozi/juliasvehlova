'use client'

import Link from 'next/link'
import { Gift01, CreditCard02, Heart } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'

interface VoucherOption {
  id: string
  value: number
  popular?: boolean
  description: string
}

const voucherOptions: VoucherOption[] = [
  {
    id: 'voucher-50',
    value: 50,
    description: 'Ideálne pre menšie ošetrenia a kozmetické služby',
  },
  {
    id: 'voucher-100',
    value: 100,
    popular: true,
    description: 'Najpopulárnejšia voľba pre darček k narodeninám',
  },
  {
    id: 'voucher-200',
    value: 200,
    popular: true,
    description: 'Ideálne pre kombinované procedúry',
  },
  {
    id: 'voucher-300',
    value: 300,
    description: 'Luxusný darček pre VIP zážitok',
  },
  {
    id: 'voucher-400',
    value: 400,
    description: 'Exkluzívny balík pre kompletné ošetrenia',
  },
  {
    id: 'voucher-500',
    value: 500,
    description: 'Prémiový darček pre najnáročnejších klientov',
  },
]

export function GiftVoucherSection() {
  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-br from-[#8698a4]/12 via-white to-brand-50/30 px-4 py-16">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-[#8698a4]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-brand-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8698a4] to-brand-600 shadow-lg">
            <Gift01 className="h-7 w-7 text-white" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
            Darčekové poukážky
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Darujte krásu a pohodu. Naše darčekové poukážky sú ideálnym prekvapením pre
            vašich blízkych ku každej príležitosti.
          </p>
        </div>

        {/* Voucher Grid */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {voucherOptions.map((voucher) => (
            <Link
              href="/rezervacia"
              key={voucher.id}
              className={`group relative block overflow-hidden rounded-2xl border-2 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                voucher.popular
                  ? 'border-[#8698a4] ring-2 ring-[#8698a4]/20'
                  : 'border-gray-100 hover:border-[#8698a4]/50'
              }`}
            >
              {/* Popular Badge */}
              {voucher.popular && (
                <div className="absolute -right-8 top-4 rotate-45 bg-gradient-to-r from-[#8698a4] to-brand-600 px-10 py-1 text-xs font-semibold text-white shadow-sm">
                  Obľúbené
                </div>
              )}

              {/* Value */}
              <div className="mb-3 text-center">
                <span className="font-serif text-4xl font-bold text-brand-700">
                  {voucher.value}
                </span>
                <span className="ml-1 text-xl font-medium text-[#8698a4]">€</span>
              </div>

              {/* Description */}
              <p className="mb-4 text-center text-sm text-gray-500">{voucher.description}</p>

              {/* Decorative line */}
              <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-[#8698a4]/50 to-transparent" />

              {/* Features */}
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Heart className="h-3.5 w-3.5 flex-shrink-0 text-[#8698a4]" />
                  <span>Platnosť 3 mesiace</span>
                </li>
                <li className="flex items-center gap-2">
                  <CreditCard02 className="h-3.5 w-3.5 flex-shrink-0 text-[#8698a4]" />
                  <span>Všetky služby</span>
                </li>
              </ul>
            </Link>
          ))}
        </div>

        {/* Custom Value Info */}
        <div className="mb-8 rounded-xl border border-[#8698a4]/20 bg-gradient-to-r from-[#8698a4]/8 to-brand-50/50 p-6 text-center">
          <p className="text-gray-700">
            <span className="font-semibold">Potrebujete inú hodnotu?</span> Poukážky
            vytvárame aj na mieru podľa vašich požiadaviek.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/rezervacia" color="primary" size="lg" iconLeading={Gift01}>
            Objednať poukážku
          </Button>
          <Button href="tel:+421903123456" color="secondary" size="lg">
            Zavolajte nám
          </Button>
        </div>

        {/* Additional Info */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Poukážky doručujeme osobne alebo poštou v elegantnom balení. Možnosť vyzdvihnutia
          v salóne.
        </p>
      </div>
    </section>
  )
}
