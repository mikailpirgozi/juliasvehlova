'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  FaceSmile,
  HeartCircle,
  Lightning01,
  Menu01,
  Sun,
  Stars01,
  XClose,
  ArrowRight,
  Calendar,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'

interface ServiceCategory {
  title: string
  Icon: FC<{ className?: string }>
  href: string
  description: string
  color: string
  gradient: string
  subcategories?: Array<{
    title: string
    href: string
  }>
}

const serviceCategories: ServiceCategory[] = [
  {
    title: 'Tvár',
    Icon: FaceSmile,
    href: '/sluzby/kategoria/tvar',
    description: 'Komplex služieb pre vašu tvár',
    color: 'brand',
    gradient: 'from-brand-100 to-brand-50',
    subcategories: [
      { title: 'Estetická medicína', href: '/sluzby#esteticka-medicina' },
      { title: 'Permanentný Make-up', href: '/sluzby#pmu' },
      { title: 'Obočie & Mihalnice', href: '/sluzby#obocie-mihalnice' },
      { title: 'Profesionálne líčenie', href: '/sluzby#licenie' },
    ],
  },
  {
    title: 'Telo',
    Icon: HeartCircle,
    href: '/sluzby/kategoria/telo',
    description: 'Procedúry pre vaše telo',
    color: 'pink',
    gradient: 'from-pink-100 to-pink-50',
    subcategories: [
      { title: 'Laserová epilácia', href: '/sluzby#laser-epilacia' },
      { title: 'Kryolipolýza', href: '/sluzby#kryolipolyza' },
    ],
  },
  {
    title: 'Energy',
    Icon: Lightning01,
    href: '/sluzby/kategoria/energy',
    description: 'Energy boost pre telo a myseľ',
    color: 'amber',
    gradient: 'from-amber-100 to-amber-50',
  },
  {
    title: 'Chakra Calibration',
    Icon: Sun,
    href: '/sluzby/kategoria/chakra-calibration',
    description: 'Harmonizácia vašej energie',
    color: 'purple',
    gradient: 'from-purple-100 to-purple-50',
  },
]

// Icon color mapping
const iconColorClasses: Record<string, { bg: string; bgHover: string; text: string; textHover: string }> = {
  brand: {
    bg: 'bg-brand-100',
    bgHover: 'group-hover:bg-brand-200',
    text: 'text-brand-600',
    textHover: 'group-hover:text-brand-700',
  },
  pink: {
    bg: 'bg-pink-100',
    bgHover: 'group-hover:bg-pink-200',
    text: 'text-pink-600',
    textHover: 'group-hover:text-pink-700',
  },
  amber: {
    bg: 'bg-amber-100',
    bgHover: 'group-hover:bg-amber-200',
    text: 'text-amber-600',
    textHover: 'group-hover:text-amber-700',
  },
  purple: {
    bg: 'bg-purple-100',
    bgHover: 'group-hover:bg-purple-200',
    text: 'text-purple-600',
    textHover: 'group-hover:text-purple-700',
  },
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const navLinks = [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Cenník', href: '/cennik' },
    { label: 'Akcie', href: '/akcie' },
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
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-3 w-screen max-w-4xl"
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
                            4 kategórie
                          </span>
                        </div>

                        {/* Service Categories Grid */}
                        <div className="grid grid-cols-3 gap-3">
                          {serviceCategories.map((category, index) => {
                            const colorClasses = iconColorClasses[category.color] ?? iconColorClasses['brand']!
                            const isHovered = hoveredCategory === category.href

                            return (
                              <motion.div
                                key={category.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <Link
                                  href={category.href}
                                  className="group relative block overflow-hidden rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-brand-200 hover:shadow-lg"
                                  onMouseEnter={() => setHoveredCategory(category.href)}
                                  onMouseLeave={() => setHoveredCategory(null)}
                                >
                                  {/* Animated background gradient on hover */}
                                  <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0`}
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                  />

                                  <div className="relative z-10">
                                    <div className="mb-3 flex items-center gap-3">
                                      <motion.div
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorClasses.bg} ${colorClasses.bgHover} transition-colors duration-300`}
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                      >
                                        <category.Icon
                                          className={`h-5 w-5 ${colorClasses.text} ${colorClasses.textHover} transition-colors duration-300`}
                                        />
                                      </motion.div>
                                      <div>
                                        <span className="font-semibold text-gray-900 group-hover:text-brand-800 transition-colors">
                                          {category.title}
                                        </span>
                                        {/* Animated underline */}
                                        <motion.div
                                          className="h-0.5 bg-brand-500 rounded-full"
                                          initial={{ width: 0 }}
                                          animate={{ width: isHovered ? '100%' : 0 }}
                                          transition={{ duration: 0.3 }}
                                        />
                                      </div>
                                    </div>

                                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                                      {category.description}
                                    </p>

                                    {category.subcategories && (
                                      <motion.ul
                                        className="mt-3 space-y-1.5 border-t border-gray-100 pt-3"
                                        initial={{ opacity: 1 }}
                                        animate={{ opacity: 1 }}
                                      >
                                        {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                                          <motion.li
                                            key={sub.href}
                                            className="flex items-center gap-2"
                                            initial={{ x: 0 }}
                                            animate={{ x: isHovered ? 4 : 0 }}
                                            transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                                          >
                                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400 group-hover:bg-brand-500 transition-colors" />
                                            <span className="text-xs font-medium text-gray-600 group-hover:text-brand-700 transition-colors">
                                              {sub.title}
                                            </span>
                                          </motion.li>
                                        ))}
                                      </motion.ul>
                                    )}

                                    {/* Hover indicator arrow */}
                                    <motion.div
                                      className="absolute bottom-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white"
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
                                </Link>
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
                                  Objednajte sa na bezplatnú konzultáciu
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
              className="border-t border-gray-200 overflow-hidden lg:hidden"
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
                        className="mt-1 space-y-1 overflow-hidden border-l-2 border-brand-200 pl-4 ml-3"
                      >
                        <Link
                          href="/sluzby"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-brand-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Stars01 className="h-4 w-4" />
                          Všetky služby
                        </Link>
                        {serviceCategories.map((category, index) => {
                          const colorClasses = iconColorClasses[category.color] ?? iconColorClasses['brand']!
                          return (
                            <motion.div
                              key={category.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                              <Link
                                href={category.href}
                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorClasses.bg}`}
                                >
                                  <category.Icon className={`h-4 w-4 ${colorClasses.text}`} />
                                </div>
                                <span>{category.title}</span>
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
