'use client'

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

export function TestimonialsSection() {
  const [visibleCount, setVisibleCount] = useState(3)

  const showMore = (): void => {
    setVisibleCount((prev) => Math.min(prev + 3, testimonials.length))
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-accent-rose to-neutral-cream px-4 py-20">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-gold">
            Referencie klientov
          </p>
          <h2 className="mb-4 font-serif text-5xl font-bold text-primary-dark">
            Čo hovoria naši klienti
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Spokojnosť našich klientov je pre nás najdôležitejšia. Prečítajte si ich skúsenosti
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, visibleCount).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative quote mark */}
              <div className="absolute -top-4 -left-4 text-8xl font-serif text-primary/10 leading-none">
                &ldquo;
              </div>

              {/* Rating stars */}
              <div className="relative z-10 mb-6 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span
                    key={i}
                    className="text-xl text-accent-gold transition-transform duration-300 group-hover:scale-110"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="relative z-10 mb-6 flex-1 text-gray-700 leading-relaxed italic">
                {testimonial.text}
              </p>

              {/* Author info */}
              <div className="relative z-10 flex items-center gap-4 border-t border-primary/10 pt-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent-gold text-white font-bold text-lg shadow-md">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.service}</p>
                </div>
              </div>

              {/* Hover gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-accent-gold to-primary-dark opacity-0 p-[2px] transition-opacity duration-500 group-hover:opacity-100">
                <div className="h-full w-full rounded-3xl bg-white/80 backdrop-blur-sm" />
              </div>

              {/* Decorative corner dot */}
              <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-accent-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {visibleCount < testimonials.length && (
          <div className="mt-12 text-center">
            <button
              onClick={showMore}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent-gold px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span>Zobraziť viac referencií</span>
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Trust indicators */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            { icon: '⭐', value: '4.9/5', label: 'Priemerné hodnotenie' },
            { icon: '💬', value: '500+', label: 'Pozitívnych recenzií' },
            { icon: '❤️', value: '98%', label: 'Odporúčajú priateľom' },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-sm p-8 text-center shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <p className="mb-4 text-5xl">{stat.icon}</p>
                <p className="mb-2 font-serif text-4xl font-bold text-primary-dark">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

