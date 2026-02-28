'use client'

import Link from 'next/link'
import { ArrowLeft, ChevronRight, Home02 } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { ServicesPriceTable } from '@/components/services'
import type { MainCategory, Subcategory } from '@/lib/services-new'

interface SubcategoryPageClientProps {
  category: MainCategory
  subcategory: Subcategory
}

export function SubcategoryPageClient({ category, subcategory }: SubcategoryPageClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">

      {/* ─── HERO — modrý banner ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#8698a4] to-[#718593] pt-[72px]">
        {/* subtle texture blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

        {/* Breadcrumb */}
        <nav className="relative z-10 border-b border-white/10 px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link href="/" className="flex items-center text-white/50 transition hover:text-white">
                  <Home02 className="h-4 w-4" />
                </Link>
              </li>
              <li className="text-white/25"><ChevronRight className="h-4 w-4" /></li>
              <li>
                <Link href="/sluzby" className="text-white/50 transition hover:text-white">
                  Služby
                </Link>
              </li>
              <li className="text-white/25"><ChevronRight className="h-4 w-4" /></li>
              <li>
                <Link href={`/sluzby/${category.slug}`} className="text-white/50 transition hover:text-white">
                  {category.title}
                </Link>
              </li>
              <li className="text-white/25"><ChevronRight className="h-4 w-4" /></li>
              <li className="font-medium text-white/90">{subcategory.title}</li>
            </ol>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
          {/* Back Link */}
          <Link
            href={`/sluzby/${category.slug}`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {category.title}
          </Link>

          <div className="max-w-3xl">
            {/* Badges */}
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                {category.title}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                {subcategory.services.length} služieb
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-brand-200 sm:text-5xl lg:text-6xl">
              {subcategory.title}
            </h1>

            {/* Description */}
            {subcategory.description && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
                {subcategory.description}
              </p>
            )}
          </div>
        </div>

        {/* Straight divider */}
        <div className="relative z-10 h-10 w-full bg-white" />
      </section>

      {/* ─── CENNÍK — biela karta sekcia ──────────────────────── */}
      <section className="relative z-10 bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <ServicesPriceTable
            services={subcategory.services}
            categorySlug={category.slug}
            subcategorySlug={subcategory.slug}
            title={`Cenník - ${subcategory.title}`}
            showDetailLinks={true}
          />
        </div>
      </section>

      {/* ─── ĎALŠIE KATEGÓRIE — jemný modrý pruh ─────────────── */}
      {category.subcategories && category.subcategories.length > 1 && (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#8698a4]/12 to-[#8698a4]/5 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-[#8698a4]">
              Objavte viac
            </p>
            <h2 className="mb-8 text-center font-serif text-2xl font-bold text-gray-900">
              Ďalšie kategórie
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {category.subcategories
                .filter((sub) => sub.id !== subcategory.id)
                .map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/sluzby/${category.slug}/${sub.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#8698a4]/30 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-[#8698a4] hover:bg-[#8698a4]/10 hover:text-[#718593]"
                  >
                    {sub.title}
                    <span className="rounded-full bg-[#8698a4]/15 px-2 py-0.5 text-xs text-[#718593]">{sub.services.length}</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7a8fa0] via-[#8698a4] to-[#5e7585] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          {/* Decorative line */}
          <div className="mx-auto mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-white/30" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <div className="h-px w-12 bg-white/30" />
          </div>

          <h2 className="font-serif text-3xl font-bold leading-tight text-brand-200 sm:text-4xl lg:text-5xl">
            Zaujala vás niektorá služba?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Objednajte sa na konzultáciu a spoločne nájdeme ideálne riešenie pre vaše potreby.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/rezervacia" color="primary" size="lg">
              Rezervovať termín
            </Button>
            <Link
              href="/cennik"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/10 px-5 py-2.5 text-md font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Kompletný cenník
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
