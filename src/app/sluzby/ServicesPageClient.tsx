'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/base/buttons/button'
import { InputBase } from '@/components/base/input/input'
import { CategoryCard, GiftVoucherSection } from '@/components/services'
import { getAllMainCategories, searchServices, getCategoryServiceCount } from '@/lib/services-new'

export function ServicesPageClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const mainCategories = getAllMainCategories()

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    return searchServices(searchQuery)
  }, [searchQuery])

  // Total service count
  const totalServices = useMemo(() => {
    return mainCategories.reduce((total, cat) => total + getCategoryServiceCount(cat), 0)
  }, [mainCategories])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20">
      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed right-10 top-20 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/15 blur-3xl" />
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/15 blur-3xl" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute left-10 top-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">
            Naše služby
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl lg:text-5xl">
            Komplexná starostlivosť o vašu krásu
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Ponúkame {totalServices}+ profesionálnych služieb v {mainCategories.length} kategóriách
            estetickej medicíny, kozmetiky a wellness s dôrazom na bezpečnosť a individuálny
            prístup.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative z-10 border-b border-brand-100 bg-white/80 px-4 py-6 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <InputBase
              type="text"
              placeholder="Hľadať službu (napr. botox, líčenie, epilácia...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-3 pl-12 pr-12"
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
      </section>

      {/* Search Results */}
      {searchResults && searchResults.length > 0 && (
        <section className="relative z-10 border-b border-gray-200 bg-white px-4 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Výsledky vyhľadávania ({searchResults.length})
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-brand-600 hover:text-brand-700"
              >
                Zrušiť vyhľadávanie
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Služba
                    </th>
                    <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">
                      Kategória
                    </th>
                    <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                      Trvanie
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Cena
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {searchResults.slice(0, 20).map((item, index) => (
                    <tr key={`${item.service.id}-${index}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {item.service.popular && (
                            <span className="text-sm text-yellow-500">★</span>
                          )}
                          <span className="font-medium text-gray-900">{item.service.name}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 sm:hidden">
                          {item.subcategoryTitle || item.categoryTitle}
                        </p>
                      </td>
                      <td className="hidden px-6 py-4 text-sm text-gray-500 sm:table-cell">
                        <span className="text-gray-900">{item.categoryTitle}</span>
                        {item.subcategoryTitle && (
                          <>
                            <span className="mx-1">›</span>
                            <span>{item.subcategoryTitle}</span>
                          </>
                        )}
                      </td>
                      <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                        {item.service.duration}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-brand-600">{item.service.price}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {searchResults.length > 20 && (
              <p className="mt-4 text-center text-sm text-gray-500">
                Zobrazených prvých 20 výsledkov z {searchResults.length}
              </p>
            )}
          </div>
        </section>
      )}

      {/* No Search Results */}
      {searchResults && searchResults.length === 0 && (
        <section className="relative z-10 border-b border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-6 w-6 text-gray-400"
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
            <h3 className="text-lg font-semibold text-gray-900">Žiadne výsledky</h3>
            <p className="mt-1 text-sm text-gray-500">
              Nenašli sme žiadne služby pre &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Zrušiť vyhľadávanie
            </button>
          </div>
        </section>
      )}

      {/* Main Categories Grid */}
      {!searchResults && (
        <section className="relative z-10 px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
                Kategórie služieb
              </h2>
              <p className="mt-2 text-gray-600">
                Vyberte kategóriu pre zobrazenie dostupných služieb
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {mainCategories.map((category, index) => (
                <CategoryCard key={category.id} category={category} priority={index < 3} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gift Voucher Section */}
      {!searchResults && <GiftVoucherSection />}

      {/* CTA Section */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute right-10 top-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-700">
            Nie ste si istí ktorú službu si vybrať?
          </h2>
          <p className="mt-4 text-gray-600">
            Objednajte sa na konzultáciu a spoločne nájdeme ideálne riešenie pre vaše potreby.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/rezervacia" color="primary" size="lg">
              Rezervovať konzultáciu
            </Button>
            <Button href="/cennik" color="secondary" size="lg">
              Zobraziť cenník
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
