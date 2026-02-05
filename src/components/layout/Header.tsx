'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const mainCategories = getAllMainCategories()
  const totalCategories = mainCategories.length

  const navLinks = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Cenník', href: '/cennik' },
    { label: 'Darčekové poukážky', href: '/darcekove-poukazky' },
    { label: 'Kontakt', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-14 w-32 overflow-hidden">
              <Image
                src="/images/branding/logo.svg"
                alt="Julia Estetic Clinic"
                width={258}
                height={559}
                className="absolute left-1/2 top-[47%] h-[300%] w-auto -translate-x-1/2 -translate-y-1/2"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
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
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                Služby
                <motion.span
                  animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
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
                    className="absolute left-1/2 top-full w-screen max-w-5xl -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                      {/* Decorative top gradient bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />

                      <div className="p-6">
                        {/* Header with animated arrow */}
                        <div className="mb-5 flex items-center justify-between">
                          <Link
                            href="/sluzby"
                            className="group flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-brand-600"
                            onClick={() => setIsServicesDropdownOpen(false)}
                          >
                            <Stars01 className="h-4 w-4 text-brand-500" />
                            Všetky služby
                            <motion.span
                              className="inline-block"
                              whileHover={{ x: 4 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.span>
                          </Link>
                          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                            {totalCategories} kategórií
                          </span>
                        </div>

                        {/* Service Categories Grid - 4 columns */}
                        <div className="grid grid-cols-4 gap-3">
                          {mainCategories.map((category, index) => {
                            const IconComponent = iconComponents[category.iconKey]
                            const colorClasses = iconColorClasses[category.iconKey]
                            const isHovered = hoveredCategory === category.slug
                            const hasSubcats = categoryHasSubcategories(category)
                            const serviceCount = getCategoryServiceCount(category)

                            return (
                              <motion.div
                                key={category.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                              >
                                <div
                                  role="button"
                                  tabIndex={0}
                                  className="group relative block cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white p-3 transition-all duration-300 hover:border-brand-200 hover:shadow-lg"
                                  onMouseEnter={() => setHoveredCategory(category.slug)}
                                  onMouseLeave={() => setHoveredCategory(null)}
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
                                  {/* Animated background gradient on hover */}
                                  <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-0`}
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                  />

                                  <div className="relative z-10">
                                    <div className="mb-2 flex items-center gap-2">
                                      <motion.div
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${colorClasses.bg} ${colorClasses.bgHover} transition-colors duration-300`}
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                      >
                                        <IconComponent
                                          className={`h-4 w-4 ${colorClasses.text} ${colorClasses.textHover} transition-colors duration-300`}
                                        />
                                      </motion.div>
                                      <div className="min-w-0 flex-1">
                                        <span className="block truncate text-sm font-semibold text-gray-900 transition-colors group-hover:text-brand-800">
                                          {category.title}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                          {hasSubcats
                                            ? `${category.subcategories!.length} kategórií`
                                            : `${serviceCount} služieb`}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Subcategories or Services preview */}
                                    {hasSubcats && category.subcategories!.length > 0 ? (
                                      <ul className="space-y-1 border-t border-gray-100 pt-2">
                                        {category.subcategories!.slice(0, 2).map((sub, subIndex) => (
                                          <motion.li
                                            key={sub.slug}
                                            initial={{ x: 0 }}
                                            animate={{ x: isHovered ? 3 : 0 }}
                                            transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                                          >
                                            <Link
                                              href={`/sluzby/${category.slug}/${sub.slug}`}
                                              className="flex items-center gap-1.5"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                setIsServicesDropdownOpen(false)
                                              }}
                                            >
                                              <span className="h-1 w-1 rounded-full bg-gray-300 transition-colors group-hover:bg-brand-400" />
                                              <span className="truncate text-xs text-gray-500 transition-colors hover:text-brand-700 group-hover:text-brand-600">
                                                {sub.title}
                                              </span>
                                            </Link>
                                          </motion.li>
                                        ))}
                                        {category.subcategories!.length > 2 && (
                                          <li className="text-xs text-gray-400">
                                            +{category.subcategories!.length - 2} ďalších
                                          </li>
                                        )}
                                      </ul>
                                    ) : category.services && category.services.length > 0 ? (
                                      <ul className="space-y-1 border-t border-gray-100 pt-2">
                                        {category.services.slice(0, 2).map((service, svcIndex) => (
                                          <motion.li
                                            key={service.slug}
                                            initial={{ x: 0 }}
                                            animate={{ x: isHovered ? 3 : 0 }}
                                            transition={{ duration: 0.2, delay: svcIndex * 0.05 }}
                                          >
                                            <Link
                                              href={`/sluzby/${category.slug}/${service.slug}`}
                                              className="flex items-center gap-1.5"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                setIsServicesDropdownOpen(false)
                                              }}
                                            >
                                              <span className="h-1 w-1 rounded-full bg-gray-300 transition-colors group-hover:bg-brand-400" />
                                              <span className="truncate text-xs text-gray-500 transition-colors hover:text-brand-700 group-hover:text-brand-600">
                                                {service.name}
                                              </span>
                                            </Link>
                                          </motion.li>
                                        ))}
                                        {category.services.length > 2 && (
                                          <li className="text-xs text-gray-400">
                                            +{category.services.length - 2} ďalších
                                          </li>
                                        )}
                                      </ul>
                                    ) : null}

                                    {/* Hover indicator arrow */}
                                    <motion.div
                                      className="absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white"
                                      initial={{ opacity: 0, scale: 0.5 }}
                                      animate={{
                                        opacity: isHovered ? 1 : 0,
                                        scale: isHovered ? 1 : 0.5,
                                      }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ChevronRight className="h-3 w-3" />
                                    </motion.div>
                                  </div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>

                        {/* Enhanced CTA Section */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.25 }}
                          className="mt-5 overflow-hidden rounded-xl bg-gradient-to-r from-brand-50 via-brand-100/50 to-brand-50 p-5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                                <Calendar className="h-6 w-6 text-brand-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">
                                  Neviete si vybrať?
                                </p>
                                <p className="text-sm text-gray-600">
                                  Objednajte sa na konzultáciu
                                </p>
                              </div>
                            </div>
                            <Button href="/rezervacia" color="primary" size="md">
                              <span className="flex items-center gap-2">
                                Rezervovať
                                <ArrowRight className="h-4 w-4" />
                              </span>
                            </Button>
                          </div>
                        </motion.div>
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
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
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
              className="overflow-hidden border-t border-gray-200 lg:hidden"
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
                        {mainCategories.map((category, index) => {
                          const IconComponent = iconComponents[category.iconKey]
                          const colorClasses = iconColorClasses[category.iconKey]
                          return (
                            <motion.div
                              key={category.slug}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.03 }}
                            >
                              <Link
                                href={`/sluzby/${category.slug}`}
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorClasses.bg}`}
                                >
                                  <IconComponent className={`h-4 w-4 ${colorClasses.text}`} />
                                </div>
                                <span className="truncate">{category.title}</span>
                              </Link>
                            </motion.div>
                          )
                        })}
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
