'use client'

import { Card } from '@/components/ui'
import { useState } from 'react'

interface Testimonial {
  id: number
  name: string
  service: string
  text: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Petra K.',
    service: 'Botulotoxín',
    text: 'Úžasné prostredie a profesionálny prístup. Pani doktorka ma detailne poradila a výsledok je presne taký, aký som chcela - prirodzený a svieži. Určite sa vrátim!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Lucia M.',
    service: 'Zväčšenie pier',
    text: 'Bála som sa, že pery budú vyzerať umelé, ale výsledok je perfektný. Konečne mám pery, o ktorých som snívala. Ďakujem!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Zuzana H.',
    service: 'Microblading',
    text: 'Po rokoch líčenia obočia každé ráno je microblading pre mňa spása. Obočie vyzerá krásne a prirodzene. Odporúčam všetkým!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Martina S.',
    service: 'Chemický peeling',
    text: 'Pokožka mi po peelingu žiari a je hladká ako hodváb. Pigmentové škvrny sa výrazne zmenšili. Som nadšená!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Jana B.',
    service: 'Laserová epilácia',
    text: 'Po 6 ošetreniach nemám takmer žiadne chĺpky. Najlepšia investícia do seba, akú som urobila. Už žiadne bolestivé holenie!',
    rating: 5,
  },
  {
    id: 6,
    name: 'Katarína V.',
    service: 'Modelovanie líc',
    text: 'Výsledok prekonal moje očakávania. Tvár vyzerá svieža a mladistvejšia. Všetci sa pýtajú, čo som urobila. Ďakujem za zlaté ruky!',
    rating: 5,
  },
]

export function TestimonialsSection(): JSX.Element {
  const [visibleCount, setVisibleCount] = useState(3)

  const showMore = (): void => {
    setVisibleCount((prev) => Math.min(prev + 3, testimonials.length))
  }

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-gold">
            Referencie
          </p>
          <h2 className="mb-4 font-serif text-4xl font-bold text-primary">
            Čo hovoria naši klienti
          </h2>
          <p className="text-lg text-gray-600">
            Spokojnosť našich klientov je pre nás najdôležitejšia
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, visibleCount).map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col">
              {/* Rating */}
              <div className="mb-4 flex gap-1 text-accent-gold">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Text */}
              <p className="mb-4 flex-1 text-gray-700">{testimonial.text}</p>

              {/* Author */}
              <div className="border-t border-gray-100 pt-4">
                <p className="font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.service}</p>
              </div>
            </Card>
          ))}
        </div>

        {visibleCount < testimonials.length && (
          <div className="mt-8 text-center">
            <button
              onClick={showMore}
              className="text-primary transition hover:text-primary-dark"
            >
              Zobraziť viac referencií →
            </button>
          </div>
        )}

        {/* Trust indicators */}
        <div className="mt-12 grid gap-6 text-center md:grid-cols-3">
          <div>
            <p className="mb-2 text-3xl">⭐</p>
            <p className="font-serif text-2xl font-bold text-primary">4.9/5</p>
            <p className="text-sm text-gray-600">Priemerné hodnotenie</p>
          </div>
          <div>
            <p className="mb-2 text-3xl">💬</p>
            <p className="font-serif text-2xl font-bold text-primary">500+</p>
            <p className="text-sm text-gray-600">Pozitívnych recenzií</p>
          </div>
          <div>
            <p className="mb-2 text-3xl">❤️</p>
            <p className="font-serif text-2xl font-bold text-primary">98%</p>
            <p className="text-sm text-gray-600">Odporúčajú priateľom</p>
          </div>
        </div>
      </div>
    </section>
  )
}

