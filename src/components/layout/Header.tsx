'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  Sun,
  Eye,
  MedicalCross,
  Stars01,
  Zap,
  HeartCircle,
  Circle,
  Edit05,
  Brush01,
  Award01,
  Menu01,
  XClose,
  ArrowRight,
  Calendar,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import {
  getAllMainCategories,
  getCategoryServiceCount,
  categoryHasSubcategories,
  type CategoryIconKey,
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

// Icon color mapping
const iconColorClasses: Record<CategoryIconKey, { bg: string; bgHover: string; text: string; textHover: string; gradient: string }> = {
  chakra: {
    bg: 'bg-amber-100',
    bgHover: 'group-hover:bg-amber-200',
    text: 'text-amber-600',
    textHover: 'group-hover:text-amber-700',
    gradient: 'from-amber-100 to-amber-50',
  },
  eye: {
    bg: 'bg-violet-100',
    bgHover: 'group-hover:bg-violet-200',
    text: 'text-violet-600',
    textHover: 'group-hover:text-violet-700',
    gradient: 'from-violet-100 to-violet-50',
  },
  syringe: {
    bg: 'bg-brand-100',
    bgHover: 'group-hover:bg-brand-200',
    text: 'text-brand-600',
    textHover: 'group-hover:text-brand-700',
    gradient: 'from-brand-100 to-brand-50',
  },
  sparkle: {
    bg: 'bg-pink-100',
    bgHover: 'group-hover:bg-pink-200',
    text: 'text-pink-600',
    textHover: 'group-hover:text-pink-700',
    gradient: 'from-pink-100 to-pink-50',
  },
  laser: {
    bg: 'bg-red-100',
    bgHover: 'group-hover:bg-red-200',
    text: 'text-red-600',
    textHover: 'group-hover:text-red-700',
    gradient: 'from-red-100 to-red-50',
  },
  massage: {
    bg: 'bg-green-100',
    bgHover: 'group-hover:bg-green-200',
    text: 'text-green-600',
    textHover: 'group-hover:text-green-700',
    gradient: 'from-green-100 to-green-50',
  },
  heart: {
    bg: 'bg-rose-100',
    bgHover: 'group-hover:bg-rose-200',
    text: 'text-rose-600',
    textHover: 'group-hover:text-rose-700',
    gradient: 'from-rose-100 to-rose-50',
  },
  piercing: {
    bg: 'bg-gray-100',
    bgHover: 'group-hover:bg-gray-200',
    text: 'text-gray-600',
    textHover: 'group-hover:text-gray-700',
    gradient: 'from-gray-100 to-gray-50',
  },
  brush: {
    bg: 'bg-purple-100',
    bgHover: 'group-hover:bg-purple-200',
    text: 'text-purple-600',
    textHover: 'group-hover:text-purple-700',
    gradient: 'from-purple-100 to-purple-50',
  },
  tattoo: {
    bg: 'bg-slate-100',
    bgHover: 'group-hover:bg-slate-200',
    text: 'text-slate-600',
    textHover: 'group-hover:text-slate-700',
    gradient: 'from-slate-100 to-slate-50',
  },
  crown: {
    bg: 'bg-yellow-100',
    bgHover: 'group-hover:bg-yellow-200',
    text: 'text-yellow-600',
    textHover: 'group-hover:text-yellow-700',
    gradient: 'from-yellow-100 to-yellow-50',
  },
}

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const isHomePage = pathname === '/'
  const isTransparent = isHomePage && !isScrolled && !isMobileMenuOpen

  useEffect(() => {
    if (!isHomePage) return
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const mainCategories = getAllMainCategories()
  const totalCategories = mainCategories.length
  const activeMegaCategory =
    mainCategories.find((c) => c.slug === (hoveredCategory ?? mainCategories[0]?.slug)) ??
    mainCategories[0]

  const navLinks = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Cenník', href: '/cennik' },
    { label: 'Darčekové poukážky', href: '/darcekove-poukazky' },
    { label: 'Kontakt', href: '#contact' },
  ]

  return (
    <header
      className={`top-0 z-50 w-full transition-all duration-300 ${
        isHomePage ? 'fixed' : 'sticky'
      } ${
        isTransparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-gray-200 bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={isTransparent ? '/images/branding/logo-white.svg' : '/images/branding/logo.svg'}
              alt="Julia Estetic Clinic"
              width={2824}
              height={993}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isTransparent
                    ? 'text-white/90 hover:bg-white/10 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => {
                setIsServicesDropdownOpen(false)
                setHoveredCategory(null)
              }}
            >
              <button
                className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isTransparent
                    ? 'text-white/90 hover:bg-white/10 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Služby
                <motion.span
                  animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className={`h-4 w-4 ${isTransparent ? 'text-white/60' : 'text-gray-400'}`} />
                </motion.span>
              </button>

              {/* Enhanced Mega Menu Dropdown */}
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-1/2 top-full w-screen max-w-4xl -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                      {/* Decorative top gradient bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />

                      {/* Header */}
                      <div className="flex items-center justify-between px-6 pb-3 pt-5">
                        <Link
                          href="/sluzby"
                          className="group flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-brand-600"
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          <Stars01 className="h-4 w-4 text-brand-500" />
                          Všetky služby
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                          {totalCategories} kategórií
                        </span>
                      </div>

                      {/* Two-panel layout */}
                      <div className="flex">
                        {/* Left: Category list */}
                        <div className="w-[260px] shrink-0 border-r border-gray-100 px-3 pb-4">
                          {mainCategories.map((category) => {
                            const IconComponent = iconComponents[category.iconKey]
                            const colorClasses = iconColorClasses[category.iconKey]
                            const isActive = activeMegaCategory?.slug === category.slug
                            const hasSubcats = categoryHasSubcategories(category)
                            const serviceCount = getCategoryServiceCount(category)

                            return (
                              <div
                                key={category.slug}
                                role="button"
                                tabIndex={0}
                                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                                  isActive
                                    ? 'bg-brand-50'
                                    : 'hover:bg-gray-50'
                                }`}
                                onMouseEnter={() => setHoveredCategory(category.slug)}
                                onClick={() => {
                                  setIsServicesDropdownOpen(false)
                                  router.push(`/sluzby/${category.slug}`)
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    setIsServicesDropdownOpen(false)
                                    router.push(`/sluzby/${category.slug}`)
                                  }
                                }}
                              >
                                <div
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                                    isActive ? 'bg-brand-100' : colorClasses.bg
                                  }`}
                                >
                                  <IconComponent
                                    className={`h-4 w-4 transition-colors duration-200 ${
                                      isActive ? 'text-brand-600' : colorClasses.text
                                    }`}
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span
                                    className={`block truncate text-sm font-medium transition-colors duration-200 ${
                                      isActive ? 'text-brand-800' : 'text-gray-700'
                                    }`}
                                  >
                                    {category.title}
                                  </span>
                                  <span
                                    className={`text-xs transition-colors duration-200 ${
                                      isActive ? 'text-brand-500' : 'text-gray-400'
                                    }`}
                                  >
                                    {hasSubcats
                                      ? `${category.subcategories!.length} kategórií`
                                      : `${serviceCount} služieb`}
                                  </span>
                                </div>
                                <ChevronRight
                                  className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                                    isActive
                                      ? 'translate-x-0.5 text-brand-400'
                                      : 'text-transparent'
                                  }`}
                                />
                              </div>
                            )
                          })}
                        </div>

                        {/* Right: Category preview with image */}
                        {activeMegaCategory && (
                          <div className="flex min-h-[420px] flex-1 flex-col overflow-hidden p-5">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeMegaCategory.slug}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                                className="flex flex-1 flex-col"
                              >
                                {/* Category Image */}
                                <div className="relative mb-4 h-48 shrink-0 overflow-hidden rounded-xl">
                                  <Image
                                    src={activeMegaCategory.image}
                                    alt={activeMegaCategory.title}
                                    fill
                                    className="object-cover"
                                    sizes="600px"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                  <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-lg font-bold text-white drop-shadow-sm">
                                      {activeMegaCategory.title}
                                    </h3>
                                    <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-white/80">
                                      {activeMegaCategory.description}
                                    </p>
                                  </div>
                                </div>

                                {/* Subcategories or Services */}
                                <div className="flex-1">
                                  {categoryHasSubcategories(activeMegaCategory) &&
                                  activeMegaCategory.subcategories ? (
                                    <div className="grid grid-cols-2 gap-0.5">
                                      {activeMegaCategory.subcategories.map((sub) => (
                                        <Link
                                          key={sub.slug}
                                          href={`/sluzby/${activeMegaCategory.slug}/${sub.slug}`}
                                          className="group/link flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-all hover:bg-brand-50 hover:text-brand-700"
                                          onClick={() => setIsServicesDropdownOpen(false)}
                                        >
                                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300 transition-colors group-hover/link:bg-brand-500" />
                                          <span className="truncate">{sub.title}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  ) : activeMegaCategory.services &&
                                    activeMegaCategory.services.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-0.5">
                                      {activeMegaCategory.services.slice(0, 8).map((service) => (
                                        <Link
                                          key={service.slug}
                                          href={`/sluzby/${activeMegaCategory.slug}/${service.slug}`}
                                          className="group/link flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-all hover:bg-brand-50 hover:text-brand-700"
                                          onClick={() => setIsServicesDropdownOpen(false)}
                                        >
                                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300 transition-colors group-hover/link:bg-brand-500" />
                                          <span className="truncate">{service.name}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>

                                {/* View all link */}
                                <Link
                                  href={`/sluzby/${activeMegaCategory.slug}`}
                                  className="group/all mt-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-600 transition-all hover:bg-brand-50"
                                  onClick={() => setIsServicesDropdownOpen(false)}
                                >
                                  Zobraziť všetky služby
                                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/all:translate-x-1" />
                                </Link>
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        )}
                      </div>

                      {/* CTA Section */}
                      <div className="mx-5 mb-5 border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-brand-50 via-brand-100/50 to-brand-50 p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                              <Calendar className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                Neviete si vybrať?
                              </p>
                              <p className="text-xs text-gray-600">
                                Objednajte sa na konzultáciu
                              </p>
                            </div>
                          </div>
                          <Button href="/rezervacia" color="primary" size="sm">
                            <span className="flex items-center gap-2">
                              Rezervovať
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/rezervacia" color="primary" size="sm">
              Rezervovať termín
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`rounded-md p-2 lg:hidden ${
              isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XClose className="h-6 w-6" />
            ) : (
              <Menu01 className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-gray-200 bg-white lg:hidden"
            >
              <div className="flex flex-col gap-1 py-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Mobile Services Dropdown */}
                <div>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  >
                    Služby
                    <motion.span
                      animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {isServicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3 mt-1 space-y-1 overflow-hidden border-l-2 border-brand-200 pl-4"
                      >
                        <Link
                          href="/sluzby"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-brand-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Stars01 className="h-4 w-4" />
                          Všetky služby
                        </Link>
                        {mainCategories.map((category, index) => (
                            <motion.div
                              key={category.slug}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.03 }}
                            >
                              <Link
                                href={`/sluzby/${category.slug}`}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-brand-50/50 hover:text-brand-800"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
                                  <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                  />
                                </div>
                                <span className="font-medium">{category.title}</span>
                              </Link>
                            </motion.div>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  className="mt-4 px-3"
                >
                  <Button href="/rezervacia" color="primary" size="md" className="w-full">
                    Rezervovať termín
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
