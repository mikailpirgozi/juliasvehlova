'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@untitledui/icons'

const SLIDE_INTERVAL_MS = 7_000
const TRANSITION_DURATION_MS = 1_000

interface HeroSlide {
  webSrc: string
  mobileSrc: string
  alt: string
}

const SLIDES: HeroSlide[] = [
  {
    webSrc: '/images/hero/hero1-web.webp',
    mobileSrc: '/images/hero/hero1-mobile.webp',
    alt: 'Profesionálny tím Julia Estetic Clinic – foto 1',
  },
  {
    webSrc: '/images/hero/hero2-web.webp',
    mobileSrc: '/images/hero/hero2-mobile.webp',
    alt: 'Profesionálny tím Julia Estetic Clinic – foto 2',
  },
]

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length)
    }, SLIDE_INTERVAL_MS)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [startTimer, stopTimer])

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index)
      stopTimer()
      startTimer()
    },
    [startTimer, stopTimer],
  )

  const transitionStyle = {
    transitionDuration: `${TRANSITION_DURATION_MS}ms`,
  }

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* ================================================================ */}
      {/* MOBILE LAYOUT – text top, image bottom                          */}
      {/* ================================================================ */}
      <div className="flex min-h-[100dvh] flex-col lg:hidden">
        {/* Text section */}
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

        {/* Image carousel – mobile */}
        <div className="relative flex-1 overflow-hidden">
          {/* Masked image layer */}
          <div
            className="absolute inset-0"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            }}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={slide.mobileSrc}
                className="absolute inset-0 transition-opacity ease-in-out"
                style={{
                  ...transitionStyle,
                  opacity: i === activeIndex ? 1 : 0,
                  zIndex: i === activeIndex ? 1 : 0,
                }}
              >
                <Image
                  src={slide.mobileSrc}
                  alt={slide.alt}
                  width={1696}
                  height={2528}
                  className="w-full"
                  priority={i === 0}
                  sizes="100vw"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Static first image for layout height */}
          <div className="invisible" aria-hidden="true">
            <Image
              src={SLIDES[0]!.mobileSrc}
              alt=""
              width={1696}
              height={2528}
              className="w-full"
              sizes="100vw"
              unoptimized
            />
          </div>

          {/* Top fade into header color */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#8698a4] to-transparent" />

          {/* Dots – mobile */}
          <div className="absolute inset-x-0 bottom-36 z-20 flex items-center justify-center gap-2.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Zobraziť slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT – full-width image with text overlay left         */}
      {/* ================================================================ */}
      <div className="hidden lg:block">
        <div className="relative min-h-[100dvh]">
          {/* Background image carousel */}
          {SLIDES.map((slide, i) => (
            <div
              key={slide.webSrc}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{
                ...transitionStyle,
                opacity: i === activeIndex ? 1 : 0,
                zIndex: i === activeIndex ? 1 : 0,
              }}
            >
              <Image
                src={slide.webSrc}
                alt={slide.alt}
                fill
                className="object-cover object-[75%_center]"
                priority={i === 0}
                sizes="100vw"
                unoptimized
              />
            </div>
          ))}

          {/* Left gradient overlay */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#8698a4]/95 via-[#8698a4]/60 via-30% to-transparent to-45%" />

          {/* Bottom scrim — eased 16-stop gradient, no visible banding */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[220px]"
            style={{
              background:
                'linear-gradient(to top, white 0%, rgba(255,255,255,0.987) 8.1%, rgba(255,255,255,0.951) 15.5%, rgba(255,255,255,0.896) 22.5%, rgba(255,255,255,0.825) 29%, rgba(255,255,255,0.741) 35.3%, rgba(255,255,255,0.648) 41.2%, rgba(255,255,255,0.55) 47.1%, rgba(255,255,255,0.45) 52.9%, rgba(255,255,255,0.352) 58.8%, rgba(255,255,255,0.259) 64.7%, rgba(255,255,255,0.175) 71%, rgba(255,255,255,0.104) 77.5%, rgba(255,255,255,0.049) 84.5%, rgba(255,255,255,0.013) 91.9%, transparent 100%)',
            }}
          />

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

          {/* Dots – desktop */}
          <div className="absolute inset-x-0 bottom-20 z-20 flex items-center justify-center gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Zobraziť slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? 'w-8 bg-[#8698a4] shadow-[0_0_12px_rgba(134,152,164,0.4)]'
                    : 'w-2.5 bg-[#8698a4]/30 hover:bg-[#8698a4]/50'
                }`}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
            <div className="animate-bounce">
              <svg
                className="h-5 w-5 text-[#8698a4]/40"
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
