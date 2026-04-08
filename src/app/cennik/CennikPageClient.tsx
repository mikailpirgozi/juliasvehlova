'use client'

import React, { useState, useMemo } from 'react'
import type { FC } from 'react'
import {
  Sun,
  Eye,
  MedicalCross,
  Stars01,
  Star01,
  Zap,
  HeartCircle,
  Circle,
  Edit05,
  Brush01,
  Award01,
  ChevronDown,
  ChevronRight,
  Check,
  Clock,
  Target01,
  User01,
  AlertCircle,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { InputBase } from '@/components/base/input/input'
import { BadgeWithIcon } from '@/components/base/badges/badges'
import { cx } from '@/cx'
import {
  getAllMainCategories,
  searchServices,
  getCategoryServiceCount,
  categoryHasSubcategories,
  type MainCategory,
  type CategoryIconKey,
  type Subcategory,
  type SimpleService,
} from '@/lib/services-new'

// Map icon keys to Untitled UI icon components
const iconComponents: Record<CategoryIconKey, FC<{ className?: string }>> = {
  chakra: Sun,
  eye: Eye,
  syringe: MedicalCross,
  sparkle: Stars01,
  laser: Zap,
  massage: HeartCircle,
  heart: HeartCircle,
  piercing: Circle,
  brush: Brush01,
  tattoo: Edit05,
  crown: Award01,
}

type SelectedItem =
  | { type: 'category'; category: MainCategory }
  | { type: 'subcategory'; category: MainCategory; subcategory: Subcategory }

// Helper function to build service URL
function buildServiceUrl(
  categorySlug: string,
  subcategorySlug: string | undefined,
  serviceSlug: string
): string {
  if (subcategorySlug) {
    return `/sluzby/${categorySlug}/${subcategorySlug}/${serviceSlug}`
  }
  return `/sluzby/${categorySlug}/${serviceSlug}`
}

// Service detail panel component
function ServiceDetailPanel({
  service,
  serviceUrl,
}: {
  service: SimpleService
  serviceUrl: string
}) {
  const hasDetails = service.shortDescription || service.benefits?.length || service.process?.length || service.forWhom?.length || service.note

  return (
    <div className="space-y-4 px-3 py-3 sm:space-y-6 sm:px-6 sm:py-4">
      {/* Tagline & Description */}
      {(service.tagline || service.shortDescription) ? (
        <div>
          {service.tagline && (
            <p className="text-sm font-semibold text-brand-600 mb-1">{service.tagline}</p>
          )}
          {service.shortDescription && (
            <p className="text-sm text-gray-600">{service.shortDescription}</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Kliknite na tlačidlo nižšie pre viac informácií a objednávku.
        </p>
      )}

      {/* Benefits - only show first 2 if available */}
      {service.benefits && service.benefits.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
            <Check className="h-4 w-4 text-brand-600" />
            Benefity
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.benefits.slice(0, 4).map((benefit, idx) => (
              <div key={idx} className="flex gap-3 rounded-lg bg-brand-50/50 p-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100">
                  <Target01 className="h-4 w-4 text-brand-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{benefit.title}</p>
                  {benefit.description && (
                    <p className="text-xs text-gray-500">{benefit.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process - show first 2 steps only */}
      {service.process && service.process.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
            <Clock className="h-4 w-4 text-brand-600" />
            Priebeh ošetrenia
          </h4>
          <div className="space-y-2">
            {service.process.slice(0, 2).map((step) => (
              <div key={step.step} className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {step.step}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
            {service.process.length > 2 && (
              <p className="text-xs text-gray-400 pl-9">+ ďalšie {service.process.length - 2} kroky...</p>
            )}
          </div>
        </div>
      )}

      {/* For Whom */}
      {service.forWhom && service.forWhom.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
            <User01 className="h-4 w-4 text-brand-600" />
            Pre koho je táto služba
          </h4>
          <ul className="space-y-1">
            {service.forWhom.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Note */}
      {service.note && (
        <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">{service.note}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button href={serviceUrl} color="primary" size="md">
          Zobraziť detail a objednať
        </Button>
        {hasDetails && (
          <Button href={serviceUrl} color="secondary" size="md">
            Viac informácií
          </Button>
        )}
      </div>
    </div>
  )
}

export function CennikPageClient() {
  const mainCategories = getAllMainCategories()
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    type: 'category',
    category: mainCategories[0]!,
  })
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  // Toggle service expansion
  const toggleService = (serviceId: string) => {
    setExpandedServices((prev) => {
      const next = new Set(prev)
      if (next.has(serviceId)) {
        next.delete(serviceId)
      } else {
        next.add(serviceId)
      }
      return next
    })
  }

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    return searchServices(searchQuery)
  }, [searchQuery])

  // Get services to display based on selection (with URL info)
  const displayServicesWithUrls = useMemo(() => {
    if (selectedItem.type === 'subcategory') {
      return selectedItem.subcategory.services.map((service) => ({
        service,
        url: buildServiceUrl(
          selectedItem.category.slug,
          selectedItem.subcategory.slug,
          service.slug
        ),
      }))
    }
    if (categoryHasSubcategories(selectedItem.category)) {
      // Show all services from all subcategories with their respective URLs
      return selectedItem.category.subcategories!.flatMap((sub) =>
        sub.services.map((service) => ({
          service,
          url: buildServiceUrl(selectedItem.category.slug, sub.slug, service.slug),
        }))
      )
    }
    // Direct services (no subcategory)
    return (selectedItem.category.services || []).map((service) => ({
      service,
      url: buildServiceUrl(selectedItem.category.slug, undefined, service.slug),
    }))
  }, [selectedItem])

  // For backward compatibility
  const displayServices = useMemo(
    () => displayServicesWithUrls.map((item) => item.service),
    [displayServicesWithUrls]
  )

  // Title for the current view
  const displayTitle = useMemo(() => {
    if (selectedItem.type === 'subcategory') {
      return `${selectedItem.category.title} - ${selectedItem.subcategory.title}`
    }
    return selectedItem.category.title
  }, [selectedItem])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf7f5]">
      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed right-10 top-20 h-64 w-64 rounded-full bg-[#8698a4]/5 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-brand-300/5 blur-3xl" />
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8698a4]/5 blur-3xl" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#8698a4] to-[#718593] px-4 pb-16 pt-24 sm:pt-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-200">Cenník</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
            Transparentné <span className="text-brand-200">ceny</span>
          </h1>
          <p className="mt-6 text-lg text-white/90 font-medium">
            Kompletný prehľad cien všetkých služieb v {mainCategories.length} kategóriách
          </p>
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
                    placeholder="Hľadať službu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 rounded-xl bg-white/80 border-gray-200 shadow-inner focus:bg-white transition-all"
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
              <nav className="max-h-[60vh] space-y-1 overflow-y-auto">
                {mainCategories.map((category) => {
                  const IconComponent = iconComponents[category.iconKey]
                  const hasSubcats = categoryHasSubcategories(category)
                  const isExpanded = expandedCategories.has(category.id)
                  const isSelected =
                    selectedItem.type === 'category' && selectedItem.category.id === category.id
                  const serviceCount = getCategoryServiceCount(category)

                  return (
                    <div key={category.id}>
                      {/* Category Button */}
                      <button
                        onClick={() => {
                          if (hasSubcats) {
                            toggleCategory(category.id)
                          }
                          setSelectedItem({ type: 'category', category })
                          setSearchQuery('')
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                          isSelected && !searchQuery
                            ? 'bg-brand-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent
                          className={`h-5 w-5 ${isSelected && !searchQuery ? 'text-white' : 'text-gray-500'}`}
                        />
                        <span className="flex-1 truncate">{category.title}</span>
                        {hasSubcats ? (
                          isExpanded ? (
                            <ChevronDown
                              className={`h-4 w-4 ${isSelected && !searchQuery ? 'text-white/80' : 'text-gray-400'}`}
                            />
                          ) : (
                            <ChevronRight
                              className={`h-4 w-4 ${isSelected && !searchQuery ? 'text-white/80' : 'text-gray-400'}`}
                            />
                          )
                        ) : (
                          <span
                            className={`text-xs ${isSelected && !searchQuery ? 'text-white/80' : 'text-gray-400'}`}
                          >
                            {serviceCount}
                          </span>
                        )}
                      </button>

                      {/* Subcategories */}
                      {hasSubcats && isExpanded && (
                        <div className="ml-8 mt-1 space-y-1">
                          {category.subcategories!.map((subcategory) => {
                            const isSubSelected =
                              selectedItem.type === 'subcategory' &&
                              selectedItem.subcategory.id === subcategory.id

                            return (
                              <button
                                key={subcategory.id}
                                onClick={() => {
                                  setSelectedItem({
                                    type: 'subcategory',
                                    category,
                                    subcategory,
                                  })
                                  setSearchQuery('')
                                }}
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                  isSubSelected && !searchQuery
                                    ? 'bg-brand-100 text-brand-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                <span className="truncate">{subcategory.title}</span>
                                <span className="ml-2 text-xs text-gray-400">
                                  {subcategory.services.length}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content - Services Table */}
          <main className="min-w-0 flex-1">
            {searchQuery && searchResults ? (
              // Search Results
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Výsledky vyhľadávania
                    </h2>
                    <p className="text-sm text-gray-500">{searchResults.length} nájdených</p>
                  </div>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-sm text-brand-600 hover:text-brand-700"
                  >
                    Zrušiť
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-3">
                            Služba
                          </th>
                          <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">
                            Kategória
                          </th>
                          <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">
                            Trvanie
                          </th>
                          <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-3">
                            Cena
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {searchResults.map((item, index) => {
                          const isExpanded = expandedServices.has(item.service.id)
                          return (
                            <React.Fragment key={`${item.service.id}-${index}`}>
                              <tr
                                onClick={() => toggleService(item.service.id)}
                                className={cx(
                                  'cursor-pointer transition-all',
                                  item.service.popular
                                    ? 'border-l-2 border-l-amber-400 bg-amber-50/50 hover:bg-amber-50 hover:shadow-sm'
                                    : 'border-l-2 border-l-transparent hover:bg-gray-50 hover:shadow-sm'
                                )}
                              >
                                <td className="px-3 py-2.5 sm:px-6 sm:py-4">
                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <button
                                      type="button"
                                      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-brand-100 sm:h-6 sm:w-6"
                                    >
                                      {isExpanded ? (
                                        <ChevronDown className="h-3.5 w-3.5 text-brand-600 sm:h-4 sm:w-4" />
                                      ) : (
                                        <ChevronRight className="h-3.5 w-3.5 text-gray-500 sm:h-4 sm:w-4" />
                                      )}
                                    </button>
                                    {item.service.popular && (
                                      <BadgeWithIcon
                                        type="pill-color"
                                        size="sm"
                                        color="warning"
                                        iconLeading={Star01}
                                      >
                                        Obľúbené
                                      </BadgeWithIcon>
                                    )}
                                    <span className="text-sm font-medium text-gray-900 sm:text-base">
                                      {item.service.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="hidden px-6 py-4 text-sm text-gray-500 sm:table-cell">
                                  {item.subcategoryTitle || item.categoryTitle}
                                </td>
                                <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                                  {item.service.duration}
                                </td>
                                <td className="px-3 py-2.5 text-right sm:px-6 sm:py-4">
                                  <span className={cx(
                                    'text-base sm:text-lg',
                                    item.service.popular
                                      ? 'font-bold text-brand-600'
                                      : 'font-semibold text-gray-900'
                                  )}>
                                    {item.service.price}
                                  </span>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr key={`${item.service.id}-${index}-details`}>
                                  <td colSpan={4} className="bg-gray-50/50 border-t border-gray-100">
                                    <ServiceDetailPanel
                                      service={item.service}
                                      serviceUrl={buildServiceUrl(
                                        item.categorySlug,
                                        item.subcategorySlug,
                                        item.service.slug
                                      )}
                                    />
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
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
                    <p className="mt-1 text-sm text-gray-500">Skúste iný vyhľadávací výraz</p>
                  </div>
                )}
              </div>
            ) : (
              // Selected Category/Subcategory View
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50">
                    {(() => {
                      const IconComponent = iconComponents[selectedItem.category.iconKey]
                      return <IconComponent className="h-6 w-6 text-brand-600" />
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{displayTitle}</h2>
                    <p className="text-sm text-gray-500">{displayServices.length} služieb</p>
                  </div>
                </div>

                {/* Services Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-3">
                          Služba
                        </th>
                        <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">
                          Trvanie
                        </th>
                        <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6 sm:py-3">
                          Cena
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {displayServicesWithUrls.map(({ service, url }, index) => {
                        const isExpanded = expandedServices.has(service.id)
                        return (
                          <React.Fragment key={`${service.id}-${index}`}>
                            <tr
                              onClick={() => toggleService(service.id)}
                              className={cx(
                                'cursor-pointer transition-all',
                                service.popular
                                  ? 'border-l-2 border-l-amber-400 bg-amber-50/50 hover:bg-amber-50 hover:shadow-sm'
                                  : 'border-l-2 border-l-transparent hover:bg-gray-50 hover:shadow-sm'
                              )}
                            >
                              <td className="px-3 py-2.5 sm:px-6 sm:py-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <button
                                    type="button"
                                    className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-brand-100 sm:h-6 sm:w-6"
                                  >
                                    {isExpanded ? (
                                      <ChevronDown className="h-3.5 w-3.5 text-brand-600 sm:h-4 sm:w-4" />
                                    ) : (
                                      <ChevronRight className="h-3.5 w-3.5 text-gray-500 sm:h-4 sm:w-4" />
                                    )}
                                  </button>
                                  {service.popular && (
                                    <BadgeWithIcon
                                      type="pill-color"
                                      size="sm"
                                      color="warning"
                                      iconLeading={Star01}
                                    >
                                      Obľúbené
                                    </BadgeWithIcon>
                                  )}
                                  <div>
                                    <span className={cx(
                                      'text-sm font-medium sm:text-base',
                                      service.popular ? 'text-gray-900' : 'text-gray-900'
                                    )}>{service.name}</span>
                                    <p className="text-xs text-gray-500 sm:hidden">
                                      {service.duration}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="hidden px-6 py-4 text-sm text-gray-500 sm:table-cell">
                                {service.duration}
                              </td>
                              <td className="px-3 py-2.5 text-right sm:px-6 sm:py-4">
                                <span className={cx(
                                  'text-base sm:text-lg',
                                  service.popular
                                    ? 'font-bold text-brand-600'
                                    : 'font-semibold text-gray-900'
                                )}>
                                  {service.price}
                                </span>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr key={`${service.id}-${index}-details`}>
                                <td colSpan={3} className="bg-gray-50/50 border-t border-gray-100">
                                  <ServiceDetailPanel service={service} serviceUrl={url} />
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                {displayServices.some((s) => s.popular) && (
                  <div className="mt-4 flex items-center gap-2">
                    <BadgeWithIcon
                      type="pill-color"
                      size="sm"
                      color="warning"
                      iconLeading={Star01}
                    >
                      Obľúbené
                    </BadgeWithIcon>
                    <span className="text-xs text-gray-500">- Najobľúbenejšie služby našich klientov</span>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-b from-[#8698a4] to-[#718593] px-4 py-16 sm:py-20">
        <div className="pointer-events-none absolute right-10 top-10 h-64 w-64 rounded-full bg-brand-300/40 blur-3xl" />
        <div className="pointer-events-none absolute left-10 bottom-10 h-80 w-80 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl mix-blend-overlay" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">Máte otázky <span className="text-brand-200">k cenám?</span></h2>
          <p className="mt-4 text-white/90 text-lg font-medium">
            Objednajte sa na konzultáciu a získajte individuálnu cenovú ponuku.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button href="/rezervacia" color="primary" size="lg" className="shadow-[0_0_20px_rgba(216,167,177,0.4)] hover:scale-105 transition-all">
              Rezervovať konzultáciu
            </Button>
            <Button href="/sluzby" color="secondary" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-brand-300 backdrop-blur-md transition-all">
              Zobraziť služby
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
