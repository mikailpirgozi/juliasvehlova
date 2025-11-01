'use client'

import Link from 'next/link'
import { LinkButton, FadeIn } from '@/components/ui'
import { allServices, categoryMetadata, type ServiceCategory } from '@/lib/services'

interface MainCategory {
  key: ServiceCategory
  slug: string
}

const mainCategories: MainCategory[] = [
  { key: 'face', slug: 'tvar' },
  { key: 'body', slug: 'telo' },
  { key: 'energy', slug: 'energy' },
  { key: 'chakra_calibration', slug: 'chakra-calibration' },
  { key: 'men', slug: 'muzi' },
]

export function ServicesSection(): JSX.Element {
  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-white via-neutral-cream to-accent-rose px-4 py-20">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-gold">
              Naše služby
            </p>
            <h2 className="mb-4 font-serif text-5xl font-bold text-primary-dark">
              Komplexná starostlivosť o vašu krásu
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Špecializujeme sa na estetické ošetrenia, ktoré zvýraznia vašu prirodzenú krásu s profesionálnym prístupom
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mainCategories.map((cat, index) => {
            const metadata = categoryMetadata[cat.key]
            const service = allServices.find((s) => s.category === cat.key)

            if (!service) return null

            return (
              <FadeIn key={cat.key} delay={index * 0.1}>
                <Link
                  href={`/sluzby/kategoria/${cat.slug}`}
                  className="group relative block h-full overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-accent-gold to-primary-dark opacity-0 p-[2px] transition-opacity duration-500 group-hover:opacity-100">
                    <div className="h-full w-full rounded-3xl bg-white" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon with gradient background */}
                    <div className="mb-6 flex items-center justify-center">
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent-gold/20 shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:shadow-lg">
                        <span className="text-4xl">{metadata.icon}</span>
                        {/* Subtle glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-gold/20 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-center font-serif text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary-dark">
                      {metadata.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 flex-grow text-center text-gray-600">
                      {metadata.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-center gap-2 font-semibold text-primary transition-all duration-300 group-hover:gap-3 group-hover:text-primary-dark">
                      <span>Zobraziť viac</span>
                      <svg
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-accent-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute left-4 bottom-4 h-2 w-2 rounded-full bg-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-16 text-center">
            <LinkButton href="/sluzby" variant="primary" size="lg">
              Všetky služby →
            </LinkButton>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
