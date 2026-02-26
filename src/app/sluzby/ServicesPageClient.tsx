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
    <div className="relative min-h-screen overflow-hidden bg-[#faf7f5]">
      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed right-10 top-20 h-64 w-64 rounded-full bg-[#8698a4]/5 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-brand-300/5 blur-3xl" />
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8698a4]/5 blur-3xl" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#8698a4] to-[#718593] px-4 pb-16 pt-24 sm:pt-32">
        <div className="pointer-events-none absolute left-10 top-10 h-64 w-64 rounded-full bg-brand-300/40 blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-10 h-80 w-80 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl mix-blend-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-200">
            Naše služby
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Komplexná starostlivosť o <span className="text-brand-200">vašu krásu</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
            Ponúkame <span className="text-white font-bold">{totalServices}+</span> profesionálnych služieb v <span className="text-white font-bold">{mainCategories.length}</span> kategóriách
            estetickej medicíny, kozmetiky a wellness s dôrazom na bezpečnosť a individuálny
            prístup.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative z-10 bg-white/60 px-4 py-8 backdrop-blur-md shadow-sm border-y border-white/40">
        <div className="mx-auto max-w-3xl">
          <div className="relative group">
            <InputBase
              type="text"
              placeholder="Hľadať službu (napr. botox, líčenie, epilácia...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-4 pl-14 pr-14 rounded-2xl bg-white/80 border-white/50 shadow-inner focus:bg-white transition-all text-lg"
            />
            <svg
              className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors"
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
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-500 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="relative z-10 px-4 py-16 bg-gradient-to-b from-white to-[#faf7f5]/30">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Kategórie služieb
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Vyberte kategóriu pre zobrazenie dostupných služieb
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#8698a4] to-[#718593] px-4 py-16 sm:py-20">
        <div className="pointer-events-none absolute right-10 top-10 h-64 w-64 rounded-full bg-brand-300/40 blur-3xl" />
        <div className="pointer-events-none absolute left-10 bottom-10 h-80 w-80 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl mix-blend-overlay" />
        
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
            Nie ste si istí ktorú <span className="text-brand-200">službu si vybrať?</span>
          </h2>
          <p className="mt-4 text-white/90 text-lg font-medium">
            Objednajte sa na konzultáciu a spoločne nájdeme ideálne riešenie pre vaše potreby.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button href="/rezervacia" color="primary" size="lg" className="shadow-[0_0_20px_rgba(216,167,177,0.4)] hover:scale-105 transition-all">
              Rezervovať konzultáciu
            </Button>
            <Button href="/cennik" color="secondary" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-brand-300 backdrop-blur-md transition-all">
              Zobraziť cenník
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
