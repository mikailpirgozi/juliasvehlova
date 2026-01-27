'use client'

import { useState, useMemo } from 'react'
import type { FC } from 'react'
import {
  Stars01,
  Edit05,
  Zap,
  User01,
  Eye,
  HeartCircle,
  Brush01,
  Settings01,
  Droplets01,
  Lightning01,
  Sun,
  Clock,
  Award01,
  Gift01,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { InputBase } from '@/components/base/input/input'

interface PriceItem {
  name: string
  price: string
  duration?: string
  popular?: boolean
}

type IconKey = 'stars' | 'edit' | 'zap' | 'user' | 'eye' | 'heart' | 'flower' | 'settings' | 'droplet' | 'lightning' | 'sun' | 'clock' | 'award' | 'gift'

interface PricingCategory {
  id: string
  title: string
  iconKey: IconKey
  items: PriceItem[]
}

// Map icon keys to Untitled UI icon components
const iconComponents: Record<IconKey, FC<{ className?: string }>> = {
  stars: Stars01,
  edit: Edit05,
  zap: Zap,
  user: User01,
  eye: Eye,
  heart: HeartCircle,
  flower: Brush01,
  settings: Settings01,
  droplet: Droplets01,
  lightning: Lightning01,
  sun: Sun,
  clock: Clock,
  award: Award01,
  gift: Gift01,
}

const pricingData: PricingCategory[] = [
  {
    id: 'esteticka-medicina',
    title: 'Estetická medicína',
    iconKey: 'stars',
    items: [
      { name: 'Botulotoxín - 1 oblasť', price: '120-180 €', duration: '15 min', popular: true },
      { name: 'Botulotoxín - 2 oblasti', price: '200-250 €', duration: '20 min' },
      { name: 'Botulotoxín - 3 oblasti', price: '280-320 €', duration: '30 min' },
      { name: 'Kyselina hyalurónová - pery 1ml', price: '180-250 €', duration: '30 min', popular: true },
      { name: 'Kyselina hyalurónová - líca 1ml', price: '250-300 €', duration: '40 min' },
      { name: 'Kyselina hyalurónová - nososlzné ryhy 1ml', price: '200-280 €', duration: '30 min' },
      { name: 'Mezoterapia tvár', price: '120 €', duration: '45 min' },
      { name: 'Liečba hyperhidrózy - podpazušie', price: '350-450 €', duration: '30 min' },
    ],
  },
  {
    id: 'permanentny-makeup',
    title: 'Permanentný make-up',
    iconKey: 'edit',
    items: [
      { name: 'PMU obočie - microblading', price: '200-280 €', duration: '2-3 hod', popular: true },
      { name: 'PMU obočie - powder brows', price: '220-300 €', duration: '2-3 hod' },
      { name: 'PMU obočie - korekcia do 5 týždňov', price: '50 €', duration: '1 hod' },
      { name: 'PMU pery - plné vytetovanie', price: '200-250 €', duration: '2-3 hod', popular: true },
      { name: 'PMU pery - kontúra', price: '150 €', duration: '2 hod' },
      { name: 'PMU očné linky - horná', price: '120 €', duration: '1.5 hod' },
      { name: 'PMU očné linky - dolná', price: '80 €', duration: '1 hod' },
      { name: 'Odstránenie PMU laserom - 1 ošetrenie', price: '80-120 €', duration: '30 min' },
    ],
  },
  {
    id: 'laserova-epilacia-damy',
    title: 'Laserová epilácia - Dámy',
    iconKey: 'zap',
    items: [
      { name: 'Horná pera', price: '20 €', duration: '10 min' },
      { name: 'Brada', price: '25 €', duration: '10 min' },
      { name: 'Tvár celá', price: '40 €', duration: '20 min' },
      { name: 'Podpazušie', price: '35 €', duration: '15 min', popular: true },
      { name: 'Bikini línia', price: '40 €', duration: '20 min' },
      { name: 'Bikini Brazilian', price: '60 €', duration: '30 min' },
      { name: 'Nohy celé', price: '120 €', duration: '60 min', popular: true },
      { name: 'Nohy polovica', price: '70 €', duration: '30 min' },
      { name: 'Ruky celé', price: '80 €', duration: '40 min' },
      { name: 'Chrbát', price: '100 €', duration: '45 min' },
    ],
  },
  {
    id: 'laserova-epilacia-pani',
    title: 'Laserová epilácia - Páni',
    iconKey: 'user',
    items: [
      { name: 'Tvár', price: '50 €', duration: '20 min' },
      { name: 'Krk', price: '35 €', duration: '15 min' },
      { name: 'Podpazušie', price: '40 €', duration: '15 min' },
      { name: 'Hrudník', price: '80 €', duration: '40 min' },
      { name: 'Brucho', price: '60 €', duration: '30 min' },
      { name: 'Chrbát', price: '120 €', duration: '60 min', popular: true },
      { name: 'Nohy celé', price: '150 €', duration: '75 min' },
    ],
  },
  {
    id: 'obocie-mihalnice',
    title: 'Obočie a mihalnice',
    iconKey: 'eye',
    items: [
      { name: 'Úprava obočia', price: '8 €', duration: '15 min' },
      { name: 'Farbenie obočia', price: '5 €', duration: '10 min' },
      { name: 'Farbenie mihalníc', price: '5 €', duration: '10 min' },
      { name: 'Laminovanie obočia', price: '30 €', duration: '45 min' },
      { name: 'Laminovanie mihalníc', price: '40 €', duration: '60 min', popular: true },
      { name: 'Lash lifting', price: '45 €', duration: '75 min' },
    ],
  },
  {
    id: 'licenie',
    title: 'Profesionálne líčenie',
    iconKey: 'heart',
    items: [
      { name: 'Denné líčenie', price: '35 €', duration: '45 min' },
      { name: 'Večerné líčenie', price: '45 €', duration: '60 min' },
      { name: 'Svadobné líčenie', price: '60 €', duration: '90 min', popular: true },
      { name: 'Skúšobné svadobné líčenie', price: '50 €', duration: '75 min' },
    ],
  },
  {
    id: 'kozmetika',
    title: 'Kozmetika',
    iconKey: 'flower',
    items: [
      { name: 'Hĺbkové čistenie pleti', price: '50 €', duration: '60 min' },
      { name: 'Hydratačné ošetrenie', price: '60 €', duration: '60 min' },
      { name: 'Anti-aging ošetrenie', price: '80 €', duration: '75 min' },
      { name: 'Chemický peeling', price: '60-120 €', duration: '45 min' },
    ],
  },
  {
    id: 'pristrojove-osetrenia',
    title: 'Prístrojové ošetrenia',
    iconKey: 'settings',
    items: [
      { name: 'Microneedling - tvár', price: '100-150 €', duration: '60 min' },
      { name: 'Microneedling - tvár + krk', price: '150-200 €', duration: '75 min' },
      { name: 'RF lifting tvár', price: '120 €', duration: '60 min' },
      { name: 'Kryolipolýza - 1 oblasť', price: '250-350 €', duration: '60 min' },
      { name: 'Liftingové ošetrenie HIFU', price: '300-500 €', duration: '90 min' },
      { name: 'Laserovej ošetrenie pigmentácie', price: '80-150 €', duration: '30 min' },
    ],
  },
  {
    id: 'mezoterapia',
    title: 'Mezoterapia',
    iconKey: 'droplet',
    items: [
      { name: 'Mezoterapia vlasov', price: '80 €', duration: '30 min' },
      { name: 'Mezoterapia tvár', price: '120 €', duration: '45 min' },
      { name: 'Mezoterapia telo - celulit', price: '100 €', duration: '45 min' },
      { name: 'Mezoterapia balík 3 ošetrení', price: '300 €', popular: true },
    ],
  },
  {
    id: 'energy',
    title: 'Energy',
    iconKey: 'lightning',
    items: [
      { name: 'Energy boost infúzia', price: '120 €', duration: '45 min', popular: true },
      { name: 'Vitamínový koktail IV', price: '90 €', duration: '30 min' },
      { name: 'Detox infúzia', price: '100 €', duration: '40 min' },
    ],
  },
  {
    id: 'chakra',
    title: 'Chakra Calibration',
    iconKey: 'sun',
    items: [
      { name: 'Chakra Calibration - individuálna session', price: '80 €', duration: '60 min' },
      { name: 'Chakra Calibration - balík 3 sessions', price: '210 €' },
    ],
  },
  {
    id: 'anti-aging',
    title: 'Anti-aging ošetrenia',
    iconKey: 'clock',
    items: [
      { name: 'Age element', price: '120 €', duration: '60 min' },
      { name: 'Age element crystal fiber mask', price: '30 €', duration: '30 min' },
    ],
  },
  {
    id: 'vip',
    title: 'VIP služby',
    iconKey: 'award',
    items: [
      { name: 'VIP balík - celý deň', price: 'na vyžiadanie' },
      { name: 'Párový wellness program', price: 'na vyžiadanie' },
      { name: 'Hens party balíčky', price: 'na vyžiadanie' },
    ],
  },
  {
    id: 'darcekove-poukazky',
    title: 'Darčekové poukážky',
    iconKey: 'gift',
    items: [
      { name: 'Darčeková poukážka 50 €', price: '50 €' },
      { name: 'Darčeková poukážka 100 €', price: '100 €' },
      { name: 'Darčeková poukážka 150 €', price: '150 €' },
      { name: 'Darčeková poukážka ľubovoľná suma', price: 'na vyžiadanie' },
    ],
  },
]

export function CennikPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>(pricingData[0]?.id || '')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = useMemo(() => {
    if (!searchQuery) {
      return pricingData
    }

    const query = searchQuery.toLowerCase()
    return pricingData.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.price.toLowerCase().includes(query)
      )
    })).filter(category => category.items.length > 0)
  }, [searchQuery])

  const selectedCategoryData = useMemo(() => {
    const found = filteredCategories.find(cat => cat.id === selectedCategory)
    if (found) return found
    if (filteredCategories.length > 0) return filteredCategories[0]
    return null
  }, [selectedCategory, filteredCategories])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20">
      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed top-20 right-10 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/15 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/15 blur-3xl" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute top-10 left-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">Cenník</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
            Transparentné ceny
          </h1>
          <p className="mt-4 text-lg text-gray-600">Kompletný prehľad cien všetkých služieb</p>
        </div>
      </section>

      {/* Main Content - Sidebar Layout */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar - Categories */}
          <aside className="lg:w-72 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <InputBase
                    type="text"
                    placeholder="Hľadať..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Category Navigation */}
              <nav className="space-y-1">
                {filteredCategories.map((category) => {
                  const IconComponent = iconComponents[category.iconKey]
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-brand-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className={`h-5 w-5 ${selectedCategory === category.id ? 'text-white' : 'text-gray-500'}`} />
                      <span className="flex-1">{category.title}</span>
                      <span className={`text-xs ${
                        selectedCategory === category.id ? 'text-white/80' : 'text-gray-400'
                      }`}>
                        {category.items.length}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content - Services Table */}
          <main className="min-w-0 flex-1">
            {selectedCategoryData ? (
              <div key={selectedCategoryData?.id || 'default'}>
                <div className="mb-6 flex items-center gap-3">
                  {(() => {
                    const IconComponent = iconComponents[selectedCategoryData.iconKey]
                    return (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50">
                        <IconComponent className="h-6 w-6 text-brand-600" />
                      </div>
                    )
                  })()}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedCategoryData.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedCategoryData.items.length} {selectedCategoryData.items.length === 1 ? 'služba' : 'služieb'}
                    </p>
                  </div>
                </div>

                {/* Services List */}
                <div className="overflow-hidden rounded-xl border border-gray-200">
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
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {selectedCategoryData.items.map((item, index) => (
                        <tr
                          key={index}
                          className="transition-colors hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {item.popular && (
                                <span className="flex-shrink-0 text-sm text-yellow-500">★</span>
                              )}
                              <span className="font-medium text-gray-900">
                                {item.name}
                              </span>
                            </div>
                            {item.duration && (
                              <p className="mt-1 text-sm text-gray-500 sm:hidden">
                                {item.duration}
                              </p>
                            )}
                          </td>
                          <td className="hidden px-6 py-4 text-sm text-gray-500 sm:table-cell">
                            {item.duration || '—'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-lg font-semibold text-gray-900">
                              {item.price}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Popular Services Badge */}
                {selectedCategoryData.items.some(item => item.popular) && (
                  <p className="mt-4 text-xs text-gray-500">
                    ★ — Obľúbené služby
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Žiadne výsledky</h3>
                <p className="mt-1 text-sm text-gray-500">Skúste iný vyhľadávací výraz</p>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 overflow-hidden border-t border-brand-100 bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute top-10 right-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-700">
            Máte otázky k cenám?
          </h2>
          <p className="mt-4 text-gray-600">
            Objednajte sa na bezplatnú konzultáciu a získajte individuálnu cenovú ponuku.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/rezervacia" color="primary" size="lg">
              Rezervovať konzultáciu
            </Button>
            <Button href="#kontakt" color="secondary" size="lg">
              Kontaktovať
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
