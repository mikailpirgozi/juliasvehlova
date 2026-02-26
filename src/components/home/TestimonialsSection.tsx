'use client'

import Image from 'next/image'
import { FadeIn } from '@/components/ui'

interface Testimonial {
  id: number
  name: string
  service: string
  text: string
  rating: number
  image?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ema Fajnor (26)',
    service: 'Permanentný make-up',
    text: 'V salóne som navštívila procedúru permanentný make up pier a obočia. Ďakujem za krásny výsledok, namiesto ideálnu farbu práve na pery nie je jednoduché ale Julia to zvládla nad moje očakávania. Počas procedúry máte tiež oblasť diskomfortu nemusíte bať. Odporúčam!',
    rating: 5,
    image: '/images/testimonials/ema-fajnor.jpg',
  },
  {
    id: 2,
    name: 'Majself (37)',
    service: 'Estetické zákroky',
    text: 'Kliniku navštevujem pravidelne a využívam rôzne služby od depilácie až po estetické zákroky. Páči sa mi aj prístup pani doktorky, ktorá vždy veľmi profesionálne navrhne postup, s ktorým som vo výsledku naozaj spokojný.',
    rating: 5,
    image: '/images/testimonials/majself.jpg',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-brand-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-b from-[#8698a4] to-[#718593] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <FadeIn delay={0.2}>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">Referencie klientov</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
              Čo hovoria naši klienti
            </h2>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <FadeIn key={t.id} delay={0.4 + index * 0.2}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-white/50 bg-white/95 backdrop-blur-md p-6 shadow-[0_8px_30px_rgb(216,167,177,0.15)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(216,167,177,0.3)] hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300 opacity-80" />

                {/* Top: stars + quote icon */}
                <div className="flex items-center justify-between">
                  <StarRating count={t.rating} />
                  <svg className="h-8 w-8 text-brand-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Text */}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-4 flex items-center gap-2.5 border-t border-gray-100 pt-4">
                  {t.image ? (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                      <Image src={t.image} alt={t.name} fill className="object-cover" sizes="64px" />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-base font-semibold text-white border border-white/20">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.service}</p>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
