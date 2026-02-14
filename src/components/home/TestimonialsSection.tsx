'use client'

import Image from 'next/image'
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

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-24">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">Referencie klientov</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
              Čo hovoria naši klienti
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Spokojnosť našich klientov je pre nás najdôležitejšia. Prečítajte si ich skúsenosti
            </p>
          </div>
        </FadeIn>

        {/* Testimonials Grid - 2 Column Layout */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={index * 0.1}>
              <div className="group relative h-[480px] overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                {/* Full Background Image */}
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={true}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay – branded dark blue-gray instead of pure black */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3a4e5b]/95 via-[#4a5e6b]/50 to-[#4a5e6b]/15" />
                
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
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="mt-4 text-base leading-relaxed text-white/95">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author info */}
                  <div className="mt-6 flex items-center gap-3 border-t border-white/20 pt-4">
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

        {/* Stats */}
        <FadeIn delay={0.3}>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { value: '5/5', label: 'Priemerné hodnotenie' },
              { value: '500+', label: 'Pozitívnych recenzií' },
              { value: '100%', label: 'Odporúčajú priateľom' },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
