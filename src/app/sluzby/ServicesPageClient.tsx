'use client'

import { useState, useMemo } from 'react'
import type { FC } from 'react'
import Image from 'next/image'
import {
  FaceSmile,
  HeartCircle,
  Lightning01,
  Sun,
  User01,
} from '@untitledui/icons'
import { allServices, categoryMetadata, type ServiceCategory, type CategoryIconKey } from '@/lib/services'
import { ServiceCard } from '@/components/services'
import { Button } from '@/components/base/buttons/button'
import { InputBase } from '@/components/base/input/input'
import { Select } from '@/components/base/select/select'

type SortOption = 'name' | 'price-low' | 'price-high' | 'duration'
type ViewMode = 'grid' | 'list'

// Map icon keys to Untitled UI icon components (subset used in categories)
const iconComponents: Partial<Record<CategoryIconKey, FC<{ className?: string }>>> = {
  face: FaceSmile,
  body: HeartCircle,
  energy: Lightning01,
  chakra: Sun,
  men: User01,
}

const mainCategories: Array<{ key: ServiceCategory; slug: string; label: string; image: string }> = [
  { key: 'face', slug: 'tvar', label: 'Tvár', image: '/images/categories/face.jpg' },
  { key: 'body', slug: 'telo', label: 'Telo', image: '/images/categories/body.jpg' },
  { key: 'energy', slug: 'energy', label: 'Energy', image: '/images/categories/energy.jpg' },
  { key: 'chakra_calibration', slug: 'chakra-calibration', label: 'Chakra Calibration', image: '/images/categories/chakra.jpg' },
  { key: 'men', slug: 'muzi', label: 'Muži', image: '/images/categories/men.jpg' },
]

export function ServicesPageClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const filteredServices = useMemo(() => {
    let filtered = [...allServices]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((s) => s.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.shortDescription.toLowerCase().includes(query) ||
          s.fullDescription.toLowerCase().includes(query)
      )
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'price-low': {
          const priceA = typeof a.price === 'string' ? 0 : a.price.from
          const priceB = typeof b.price === 'string' ? 0 : b.price.from
          return priceA - priceB
        }
        case 'price-high': {
          const priceA2 = typeof a.price === 'string' ? 9999 : a.price.to
          const priceB2 = typeof b.price === 'string' ? 9999 : b.price.to
          return priceB2 - priceA2
        }
        case 'duration':
          return a.duration.localeCompare(b.duration)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20">
      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed top-20 right-10 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/15 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/15 blur-3xl" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute top-10 left-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">Naše služby</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
            Naše Služby
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Ponúkame komplexné portfólio služieb estetickej medicíny s dôrazom na bezpečnosť,
            prirodzené výsledky a individuálny prístup ku každému klientovi.
          </p>
        </div>
      </section>

      {/* Category Cards with Images */}
      <section className="relative z-10 border-b border-brand-100 bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-gray-900">
            Kategórie služieb
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {mainCategories.map((cat) => {
              const count = allServices.filter((s) => s.category === cat.key).length
              const metadata = categoryMetadata[cat.key]
              const IconComponent = iconComponents[metadata.iconKey]
              
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`group relative overflow-hidden rounded-xl transition-all ${
                    selectedCategory === cat.key
                      ? 'ring-2 ring-brand-600 ring-offset-2'
                      : 'hover:shadow-lg'
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={cat.image}
                      alt={metadata?.title || cat.label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white">
                      {IconComponent && (
                        <IconComponent className="mb-2 h-6 w-6 opacity-90" />
                      )}
                      <h3 className="text-lg font-semibold">{metadata?.title || cat.label}</h3>
                      <p className="text-sm opacity-80">{count} služieb</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="relative z-10 border-b border-brand-100 bg-white/80 px-4 py-8 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <InputBase
                type="text"
                placeholder="Hľadať službu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-3"
              />
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Všetky služby ({allServices.length})
            </button>
            {mainCategories.map((cat) => {
              const count = allServices.filter((s) => s.category === cat.key).length
              const metadata = categoryMetadata[cat.key]
              const IconComponent = iconComponents[metadata.iconKey]
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === cat.key
                      ? 'bg-brand-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {IconComponent && <IconComponent className="h-4 w-4" />}
                  {metadata?.title || cat.label} ({count})
                </button>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Zoradiť:</span>
              <Select
                placeholder="Zoradiť"
                selectedKey={sortBy}
                onSelectionChange={(key) => setSortBy(key as SortOption)}
                items={[
                  { id: 'name', label: 'Podľa názvu' },
                  { id: 'price-low', label: 'Cena: Od najnižšej' },
                  { id: 'price-high', label: 'Cena: Od najvyššej' },
                  { id: 'duration', label: 'Podľa trvania' },
                ]}
                className="w-48"
              >
                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-md p-2 transition ${
                  viewMode === 'grid' ? 'bg-brand-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="Grid view"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-md p-2 transition ${
                  viewMode === 'list' ? 'bg-brand-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="List view"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-500">
              Zobrazené: <span className="font-medium text-gray-900">{filteredServices.length}</span> služieb
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid/List */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          {filteredServices.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} showCategory />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Žiadne výsledky</h3>
              <p className="mt-1 text-sm text-gray-500">
                Nenašli sme žiadne služby zodpovedajúce vašim kritériám.
              </p>
              <div className="mt-6">
                <Button
                  color="secondary"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                >
                  Vymazať filtre
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute top-10 right-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-700">
            Nie ste si istí ktorú službu si vybrať?
          </h2>
          <p className="mt-4 text-gray-600">
            Objednajte sa na bezplatnú konzultáciu a spoločne nájdeme ideálne riešenie pre vaše
            potreby.
          </p>
          <div className="mt-8">
            <Button href="/rezervacia" color="primary" size="lg">
              Bezplatná konzultácia
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
