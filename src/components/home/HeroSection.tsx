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
        <div className="bg-[#8698a4] px-6 pt-24 pb-8 text-center sm:px-10">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
            {/* Badge */}
            <div className="mb-5 flex flex-col items-center gap-2">
              <span className="inline-flex items-center text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
                Julia Estetic Clinic
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold tracking-widest text-white/90 uppercase backdrop-blur-sm">
                ✦ Jediná certifikovaná klinika v Malackách
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

            {/* Motto */}
            <p className="mt-3 font-serif text-base italic text-brand-200/90 sm:text-lg">
              SebaLáska na počkanie
            </p>

            {/* Subtitle */}
            <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-white/90 sm:text-lg">
              Vďaka skúsenostiam, odbornosti a individuálnemu prístupu vám
              pomáhame objaviť a zvýrazniť vašu prirodzenú krásu.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/sluzby"
                className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-105"
              >
                Naše služby
              </Link>
              <Link
                href="/rezervacia"
                className="group relative inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-[0_0_20px_rgba(216,167,177,0.4)] transition-all duration-300 hover:bg-brand-600 hover:shadow-[0_0_30px_rgba(216,167,177,0.6)] hover:scale-105"
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
            className="w-full"
            priority
            sizes="100vw"
          />
          {/* Top fade for seamless blend with text section */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#8698a4] to-transparent" />
          {/* Bottom fade for seamless blend into next section */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#8698a4]/95 via-[#8698a4]/60 via-30% to-transparent to-45%" />


          {/* Content */}
          <div className="relative z-10 flex min-h-[100dvh] items-center">
            <div className="w-full max-w-[45%] px-16 py-24 xl:max-w-[42%] xl:px-24">
              <div className="max-w-xl animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
                {/* Badge */}
                <div className="mb-8 flex flex-col gap-3">
                  <span className="inline-flex items-center text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
                    Julia Estetic Clinic
                  </span>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/90 uppercase backdrop-blur-sm">
                    ✦ Jediná certifikovaná klinika v Malackách
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

                {/* Motto */}
                <p className="mt-4 font-serif text-xl italic text-brand-200/90">
                  SebaLáska na počkanie
                </p>

                {/* Subtitle */}
                <p className="mt-6 max-w-md text-xl font-medium leading-relaxed text-white/90">
                  Vďaka skúsenostiam, odbornosti a individuálnemu prístupu vám
                  pomáhame objaviť a zvýrazniť vašu prirodzenú krásu.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/sluzby"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20 hover:-translate-y-1"
                  >
                    Naše služby
                  </Link>
                  <Link
                    href="/rezervacia"
                    className="group relative inline-flex items-center gap-2 rounded-lg bg-brand-500 px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_25px_rgba(216,167,177,0.4)] transition-all duration-300 hover:bg-brand-600 hover:shadow-[0_0_40px_rgba(216,167,177,0.6)] hover:-translate-y-1"
                  >
                    Objednať sa
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-14 flex items-center gap-10 border-t border-white/30 pt-10">
                  {[
                    { value: '10+', label: 'Rokov praxe' },
                    { value: '5000+', label: 'Klientov' },
                    { value: '100%', label: 'Bezpečnosť' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center group">
                      <div className="text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:text-brand-200">
                        {stat.value}
                      </div>
                      <div className="mt-1.5 text-sm font-medium uppercase tracking-wider text-white/70">
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
