'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/base/buttons/button'
import { FadeIn } from '@/components/ui'

interface Testimonial {
  id: number
  name: string
  service: string
  text: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Petra K.',
    service: 'Botulotoxín',
    text: 'Úžasné prostredie a profesionálny prístup. Pani doktorka ma detailne poradila a výsledok je presne taký, aký som chcela - prirodzený a svieži. Určite sa vrátim!',
    rating: 5,
    image: '/images/services/testimonial-1.jpg',
  },
  {
    id: 2,
    name: 'Lucia M.',
    service: 'Zväčšenie pier',
    text: 'Bála som sa, že pery budú vyzerať umelé, ale výsledok je perfektný. Konečne mám pery, o ktorých som snívala. Ďakujem!',
    rating: 5,
    image: '/images/services/testimonial-2.jpg',
  },
  {
    id: 3,
    name: 'Zuzana H.',
    service: 'Microblading',
    text: 'Po rokoch líčenia obočia každé ráno je microblading pre mňa spása. Obočie vyzerá krásne a prirodzene. Odporúčam všetkým!',
    rating: 5,
    image: '/images/services/testimonial-3.jpg',
  },
  {
    id: 4,
    name: 'Martina S.',
    service: 'Chemický peeling',
    text: 'Pokožka mi po peelingu žiari a je hladká ako hodváb. Pigmentové škvrny sa výrazne zmenšili. Som nadšená!',
    rating: 5,
    image: '/images/services/testimonial-4.jpg',
  },
  {
    id: 5,
    name: 'Jana B.',
    service: 'Laserová epilácia',
    text: 'Po 6 ošetreniach nemám takmer žiadne chĺpky. Najlepšia investícia do seba, akú som urobila. Už žiadne bolestivé holenie!',
    rating: 5,
    image: '/images/services/testimonial-5.jpg',
  },
  {
    id: 6,
    name: 'Katarína V.',
    service: 'Modelovanie líc',
    text: 'Výsledok prekonal moje očakávania. Tvár vyzerá svieža a mladistvejšia. Všetci sa pýtajú, čo som urobila. Ďakujem za zlaté ruky!',
    rating: 5,
    image: '/images/services/testimonial-6.jpg',
  },
]

export function TestimonialsSection() {
  const [visibleCount, setVisibleCount] = useState(3)

  const showMore = (): void => {
    setVisibleCount((prev) => Math.min(prev + 3, testimonials.length))
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-brand-50/30 py-16 sm:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-20 left-1/4 h-56 w-56 rounded-full bg-brand-200/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-[#CDA882]/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">Referencie klientov</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
              Čo hovoria naši klienti
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Spokojnosť našich klientov je pre nás najdôležitejšia. Prečítajte si ich skúsenosti
            </p>
          </div>
        </FadeIn>

        {/* Testimonials Grid - Modern Full Image Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, visibleCount).map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={index * 0.1}>
              <div className="group relative h-[420px] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                {/* Full Background Image */}
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                
                {/* Quote icon */}
                <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  {/* Rating stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="mt-3 text-sm leading-relaxed text-white/95 line-clamp-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author info */}
                  <div className="mt-4 flex items-center gap-3 border-t border-white/20 pt-4">
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/70">{testimonial.service}</p>
                    </div>
                  </div>
                </div>

                {/* Decorative gradient border on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/0 transition-all duration-500 group-hover:ring-white/30" />
              </div>
            </FadeIn>
          ))}
        </div>

        {visibleCount < testimonials.length && (
          <FadeIn>
            <div className="mt-12 text-center">
              <Button onClick={showMore} color="secondary" size="md">
                Zobraziť viac referencií
              </Button>
            </div>
          </FadeIn>
        )}

        {/* Stats */}
        <FadeIn delay={0.3}>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { value: '4.9/5', label: 'Priemerné hodnotenie' },
              { value: '500+', label: 'Pozitívnych recenzií' },
              { value: '98%', label: 'Odporúčajú priateľom' },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-brand-100 bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-3xl font-bold text-brand-700">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
