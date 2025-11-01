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
    <section id="services" className="bg-gradient-to-b from-white to-primary/5 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-primary">Služby</h2>
            <p className="text-lg text-gray-600">
              Ponúkame širokú paletu estetických služieb prispôsobených vašim potrebám
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2">
          {mainCategories.map((cat, index) => {
            const metadata = categoryMetadata[cat.key]
            const service = allServices.find((s) => s.category === cat.key)

            if (!service) return null

            return (
                     <FadeIn key={cat.key} delay={index * 0.1}>
                       <Link
                         href={`/sluzby/kategoria/${cat.slug}`}
                         className="group block h-full rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                       >
                  <div className="flex flex-col h-full">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="text-4xl">{metadata.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {metadata.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">{metadata.description}</p>
                    <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Zobraziť viac</span>
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
                </Link>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-12 text-center">
            <LinkButton href="/sluzby" variant="primary" size="lg">
              Všetky služby →
            </LinkButton>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
