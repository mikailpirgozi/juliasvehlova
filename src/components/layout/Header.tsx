'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'

interface ServiceCategory {
  title: string
  icon: string
  href: string
  description: string
  subcategories?: Array<{
    title: string
    href: string
  }>
}

const serviceCategories: ServiceCategory[] = [
  {
    title: 'Tvár',
    icon: '✨',
    href: '/sluzby/kategoria/tvar',
    description: 'Komplex služieb pre vašu tvár',
    subcategories: [
      { title: 'Estetická medicína', href: '/sluzby#esteticka-medicina' },
      { title: 'Permanentný Make-up', href: '/sluzby#pmu' },
      { title: 'Obočie & Mihalnice', href: '/sluzby#obocie-mihalnice' },
      { title: 'Profesionálne líčenie', href: '/sluzby#licenie' },
    ],
  },
  {
    title: 'Telo',
    icon: '💪',
    href: '/sluzby/kategoria/telo',
    description: 'Procedúry pre vaše telo',
    subcategories: [
      { title: 'Laserová epilácia', href: '/sluzby#laser-epilacia' },
      { title: 'Kryolipolýza', href: '/sluzby#kryolipolyza' },
    ],
  },
  {
    title: 'Energy',
    icon: '⚡',
    href: '/sluzby/kategoria/energy',
    description: 'Energy boost pre telo a myseľ',
  },
  {
    title: 'Chakra Calibration',
    icon: '🔮',
    href: '/sluzby/kategoria/chakra-calibration',
    description: 'Harmonizácia vašej energie',
  },
  {
    title: 'Muži',
    icon: '👨',
    href: '/sluzby/kategoria/muzi',
    description: 'Špecializované služby pre mužov',
  },
]

export function Header(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)

  const navLinks = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Cenník', href: '/cennik' },
    { label: 'Akcie', href: '/akcie' },
    { label: 'Kontakt', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent-gold shadow-md transition-transform duration-300 group-hover:scale-110">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-primary-dark group-hover:text-primary transition-colors">
                Julia Clinic
              </h1>
              <p className="text-xs text-gray-500 font-medium">Estetická medicína</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-gray-700 transition-colors hover:text-primary-dark after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent-gold after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button className="relative flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-primary-dark after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent-gold after:transition-all hover:after:w-full">
                Služby
                <svg
                  className={`h-4 w-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Menu Dropdown */}
              {isServicesDropdownOpen && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4 w-screen max-w-5xl">
                  <div className="relative rounded-3xl bg-white p-8 shadow-2xl border border-primary/20">
                    {/* Decorative gradient border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent-gold to-primary rounded-t-3xl" />
                    
                    <div className="mb-6">
                      <Link
                        href="/sluzby"
                        className="group inline-flex items-center gap-2 text-lg font-bold text-primary-dark hover:text-primary transition-colors"
                      >
                        Všetky služby
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {serviceCategories.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-5 transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1"
                        >
                          {/* Gradient background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-gold/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          
                          <div className="relative z-10">
                            <div className="mb-3 flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent-gold/20 text-2xl transition-transform duration-300 group-hover:scale-110">
                                {category.icon}
                              </div>
                              <h3 className="font-bold text-gray-900 group-hover:text-primary-dark transition-colors">
                                {category.title}
                              </h3>
                            </div>
                            <p className="mb-3 text-sm text-gray-700 leading-relaxed">{category.description}</p>

                            {category.subcategories && (
                              <ul className="space-y-1 border-t border-gray-200 pt-3 mt-3">
                                {category.subcategories.map((sub) => (
                                  <li key={sub.href}>
                                    <a
                                      href={sub.href}
                                      className="text-xs text-gray-600 hover:text-primary-dark transition flex items-center gap-1 hover:translate-x-1"
                                    >
                                      <span className="text-primary">→</span>
                                      {sub.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-8 rounded-2xl bg-gradient-to-r from-accent-rose to-neutral-cream p-6 text-center">
                      <p className="text-sm text-gray-700 mb-4 font-medium">
                        💎 Neviete si vybrať? Objednajte sa na bezplatnú konzultáciu
                      </p>
                      <Link href="/rezervacia">
                        <Button variant="primary" size="sm">
                          Rezervovať konzultáciu →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden gap-4 md:flex">
            <Link href="/rezervacia">
              <Button variant="primary" size="sm">
                Rezervovať
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="border-t border-gray-200 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 transition hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className="flex w-full items-center justify-between text-sm font-medium text-gray-700"
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                >
                  Služby
                  <svg
                    className={`h-4 w-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isServicesDropdownOpen && (
                  <div className="mt-2 space-y-2 pl-4 border-l-2 border-primary/20">
                    <Link
                      href="/sluzby"
                      className="block text-sm font-semibold text-primary py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      → Všetky služby
                    </Link>
                    {serviceCategories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block text-sm text-gray-600 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.icon} {category.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/rezervacia" className="w-full">
                <Button variant="primary" size="md" className="w-full">
                  Rezervovať
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
