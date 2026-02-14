'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@untitledui/icons'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* ================================================================ */}
      {/* MOBILE LAYOUT – text top, image bottom (mousse.sk style)         */}
      {/* ================================================================ */}
      <div className="flex min-h-[100dvh] flex-col lg:hidden">
        {/* Text section – clean background matching the image tones */}
        <div className="bg-[#9ab0b9] px-6 pt-24 pb-8 text-center sm:px-10">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
            {/* Badge */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#CDA882]" />
                Julia Estetic Clinic
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[2rem] leading-[1.1] font-bold tracking-tight text-white uppercase sm:text-[2.5rem]">
              Klinika krásy,
              <br />
              <span className="text-brand-200">kde sa cítite</span>
              <br />
              výnimočne
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
              Vďaka skúsenostiam, odbornosti a individuálnemu prístupu vám
              pomáhame objaviť a zvýrazniť vašu prirodzenú krásu.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/sluzby"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
              >
                Naše služby
              </Link>
              <Link
                href="/rezervacia"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-800/30 transition-all duration-200 hover:bg-brand-600"
              >
                Objednať sa
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Image section – team photo, zoomed in on the team */}
        <div className="relative flex-1 overflow-hidden">
          <Image
            src="/images/hero/hero-mobile.jpeg"
            alt="Profesionálny tím Julia Estetic Clinic"
            width={1024}
            height={1024}
            className="w-full scale-125 origin-[center_35%]"
            priority
            sizes="100vw"
          />
          {/* Top fade for seamless blend with text section */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#9ab0b9] to-transparent" />
          {/* Bottom fade for seamless blend into next section */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/80 to-transparent" />
        </div>
      </div>

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT – full-width image with text overlay left         */}
      {/* ================================================================ */}
      <div className="hidden lg:block">
        <div className="relative min-h-[100dvh]">
          {/* Background image */}
          <Image
            src="/images/hero/Hero 2.png"
            alt="Profesionálny tím Julia Estetic Clinic"
            fill
            className="object-cover object-[75%_center]"
            priority
            quality={90}
            sizes="100vw"
          />

          {/* Left gradient overlay – covers text area only, keeps team photo sharp */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#8a9eaa]/95 via-[#8a9eaa]/60 via-30% to-transparent to-45%" />

          {/* Bottom gradient for depth + subtle fade to white */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[100dvh] items-center">
            <div className="w-full max-w-[45%] px-16 py-24 xl:max-w-[42%] xl:px-24">
              <div className="max-w-xl animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
                {/* Badge */}
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
                    <span className="h-px w-6 bg-[#CDA882]" />
                    Julia Estetic Clinic
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-serif text-[3.25rem] leading-[1.08] font-bold tracking-tight text-white uppercase xl:text-[3.75rem]">
                  Klinika krásy,
                  <br />
                  <span className="text-brand-200">kde sa cítite</span>
                  <br />
                  výnimočne
                </h1>

                {/* Subtitle */}
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
                  Vďaka skúsenostiam, odbornosti a individuálnemu prístupu vám
                  pomáhame objaviť a zvýrazniť vašu prirodzenú krásu.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/sluzby"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/20"
                  >
                    Naše služby
                  </Link>
                  <Link
                    href="/rezervacia"
                    className="group inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-800/30 transition-all duration-200 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-800/40"
                  >
                    Objednať sa
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-12 flex items-center gap-8 border-t border-white/20 pt-8">
                  {[
                    { value: '10+', label: 'Rokov praxe' },
                    { value: '5000+', label: 'Klientov' },
                    { value: '100%', label: 'Bezpečnosť' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="mt-0.5 text-sm text-white/60">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
            <div className="animate-bounce">
              <svg
                className="h-5 w-5 text-white/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
