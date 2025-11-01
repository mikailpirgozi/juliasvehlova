'use client'

import { useState, useMemo } from 'react'
import { allServices, categoryMetadata, type ServiceCategory } from '@/lib/services'
import { ServiceCard } from '@/components/services'
import { Button, FadeIn } from '@/components/ui'
import Link from 'next/link'

type SortOption = 'name' | 'price-low' | 'price-high' | 'duration'
type ViewMode = 'grid' | 'list'

const mainCategories: Array<{ key: ServiceCategory; slug: string; label: string }> = [
  { key: 'face', slug: 'tvar', label: 'Tvár' },
  { key: 'body', slug: 'telo', label: 'Telo' },
  { key: 'energy', slug: 'energy', label: 'Energy' },
  { key: 'chakra_calibration', slug: 'chakra-calibration', label: 'Chakra Calibration' },
  { key: 'men', slug: 'muzi', label: 'Muži' },
]

export default function ServicesPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let filtered = [...allServices]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((s) => s.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.shortDescription.toLowerCase().includes(query) ||
          s.fullDescription.toLowerCase().includes(query)
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'price-low':
          const priceA = typeof a.price === 'string' ? 0 : a.price.from
          const priceB = typeof b.price === 'string' ? 0 : b.price.from
          return priceA - priceB
        case 'price-high':
          const priceA2 = typeof a.price === 'string' ? 9999 : a.price.to
          const priceB2 = typeof b.price === 'string' ? 9999 : b.price.to
          return priceB2 - priceA2
        case 'duration':
          return a.duration.localeCompare(b.duration)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <h1 className="mb-6 font-serif text-4xl font-bold text-primary md:text-5xl">
              Naše Služby
            </h1>
            <p className="mb-8 text-lg text-gray-700">
              Ponúkame komplexné portfólio služieb estetickej medicíny s dôrazom na bezpečnosť,
              prirodzené výsledky a individuálny prístup ku každému klientovi.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b border-gray-200 bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Hľadať službu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-12 py-4 text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <svg
                className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400"
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
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Všetky služby ({allServices.length})
            </button>
            {mainCategories.map((cat) => {
              const count = allServices.filter((s) => s.category === cat.key).length
              const metadata = categoryMetadata[cat.key]
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === cat.key
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {metadata?.icon} {metadata?.title || cat.label} ({count})
                </button>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Zoradiť:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="name">Podľa názvu</option>
                <option value="price-low">Cena: Od najnižšej</option>
                <option value="price-high">Cena: Od najvyššej</option>
                <option value="duration">Podľa trvania</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded p-2 transition ${
                  viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
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
                className={`rounded p-2 transition ${
                  viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
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
            <div className="text-sm text-gray-600">
              Zobrazené: <span className="font-semibold">{filteredServices.length}</span> služieb
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid/List */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          {filteredServices.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredServices.map((service, index) => (
                <FadeIn key={service.id} delay={index * 0.05}>
                  <ServiceCard service={service} showCategory />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">Žiadne výsledky</h3>
              <p className="text-gray-600 mb-6">
                Nenašli sme žiadne služby zodpovedajúce vašim kritériám.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                Vymazať filtre
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-white to-primary/10 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
              Nie ste si istí ktorú službu si vybrať?
            </h2>
            <p className="mb-8 text-lg text-gray-700">
              Objednajte sa na bezplatnú konzultáciu a spoločne nájdeme ideálne riešenie pre vaše
              potreby.
            </p>
            <Link href="/rezervacia">
              <Button variant="primary" size="lg">
                Bezplatná konzultácia
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
