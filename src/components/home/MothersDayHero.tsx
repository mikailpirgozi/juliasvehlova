'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart } from '@untitledui/icons'
import {
  applyDiscountToPrice,
  MOTHERS_DAY_DISCOUNT_PERCENT,
} from '@/lib/promotions'

const SLIDE_INTERVAL_MS = 6_000
const TRANSITION_DURATION_MS = 400

interface PromoSlide {
  id: string
  /** Service ID v `services-new.ts` (pre cenu a discount) */
  serviceId: string
  procedure: string
  shortDescription: string
  /** Pôvodná cena (string z services-new.ts) */
  originalPrice: string
  storySrc: string
  squareSrc: string
  alt: string
  /** Detail page URL — vedie priamo na konkrétnu službu s booking widget */
  detailHref: string
}

const SLIDES: PromoSlide[] = [
  {
    id: 'lososie-spermie',
    serviceId: 'polynukleotidova-biorevitalizacia-salmon-sperm',
    procedure: 'Lososie spermie',
    shortDescription:
      'Polynukleotidová biorevitalizácia pleti – hĺbková regenerácia a spevnenie.',
    originalPrice: '280 €',
    storySrc: '/images/hero/mothers-day/lososie-story.png',
    squareSrc: '/images/hero/mothers-day/lososie-square.png',
    alt: 'Akcia Deň matiek – Lososie spermie 20% zľava',
    detailHref:
      '/sluzby/esteticka-medicina/biorevitalizacia-pleti/polynukleotidova-biorevitalizacia-pleti-salmon-sperm',
  },
  {
    id: 'aqua-star',
    serviceId: 'aqua-star-exclusive',
    procedure: 'Aqua Star exclusive',
    shortDescription:
      'Hĺbkové čistenie a hydratácia pleti s okamžitým efektom žiarivosti.',
    originalPrice: '150 €',
    storySrc: '/images/hero/mothers-day/aqua-story.png',
    squareSrc: '/images/hero/mothers-day/aqua-square.png',
    alt: 'Akcia Deň matiek – Aqua Star 20% zľava',
    detailHref: '/sluzby/kozmetika/pristrojove-osetrenia/aqua-star-exclusive',
  },
]

export function MothersDayHero() {
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

  const activeSlide = SLIDES[activeIndex] ?? SLIDES[0]
  if (!activeSlide) return null

  const activeDiscount = applyDiscountToPrice(
    activeSlide.originalPrice,
    MOTHERS_DAY_DISCOUNT_PERCENT,
  )

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden"
      aria-label="Akcia Deň matiek"
    >
      {/* ================================================================ */}
      {/* MOBILE — story 9:16 ako celé pozadie + bottom CTA               */}
      {/* ================================================================ */}
      <div className="relative min-h-[100dvh] lg:hidden">
        {SLIDES.map((slide, i) => (
          <div
            key={`mobile-${slide.id}`}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{
              ...transitionStyle,
              opacity: i === activeIndex ? 1 : 0,
              zIndex: i === activeIndex ? 1 : 0,
            }}
          >
            <Image
              src={slide.storySrc}
              alt={slide.alt}
              fill
              className="object-cover"
              style={{ objectPosition: '50% 35%' }}
              priority={i === 0}
              sizes="100vw"
              unoptimized
            />
          </div>
        ))}

        {/* Spodný gradient pre čitateľnosť CTA */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[260px]"
          style={{
            background:
              'linear-gradient(to top, rgba(176,121,138,0.92) 0%, rgba(176,121,138,0.55) 50%, transparent 100%)',
          }}
        />

        {/* Bottom CTA blok */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-10 sm:px-10">
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-white/95 uppercase drop-shadow">
              <Heart className="h-3.5 w-3.5 fill-white" />
              Aktuálne {activeSlide.procedure}
            </div>

            {/* Cena s preškrtnutou pôvodnou */}
            {activeDiscount && (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  {activeDiscount.discounted}
                </span>
                <span className="text-base font-medium text-white/70 line-through">
                  {activeDiscount.original}
                </span>
              </div>
            )}

            <Link
              href={activeSlide.detailHref}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand-700 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-brand-50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Rezervovať so zľavou
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Dots */}
            <div className="mt-1 flex items-center justify-center gap-2.5">
              {SLIDES.map((slide, i) => (
                <button
                  key={`mobile-dot-${slide.id}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Zobraziť akciu ${slide.procedure}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === activeIndex
                      ? 'w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* DESKTOP — split layout: text vľavo, square image vpravo          */}
      {/* ================================================================ */}
      <div className="hidden lg:block">
        <div className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#c79aa6] via-[#b88595] to-[#a87082]">
          {/* Dekoratívne srdiečka v pozadí */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 opacity-[0.07]">
            <Heart className="h-full w-full text-white" />
          </div>
          <div className="pointer-events-none absolute -right-32 -bottom-40 h-[32rem] w-[32rem] opacity-[0.05]">
            <Heart className="h-full w-full text-white" />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-2 items-center gap-12 px-12 py-20 xl:gap-20 xl:px-20">
            {/* ĽAVÁ STRANA — text + CTA */}
            <div className="animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md">
                <Heart className="h-3.5 w-3.5 fill-white" />
                Deň matiek · 10. 5.
              </div>

              <h1 className="font-serif text-[3rem] leading-[1.05] font-bold tracking-tight text-white xl:text-[3.75rem]">
                Doprajte
                <span className="italic font-medium"> mame </span>
                <br />
                ten najkrajší darček
              </h1>

              <div className="mt-8 flex items-baseline gap-4">
                <span className="font-serif text-[5rem] leading-none font-bold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)] xl:text-[6rem]">
                  20%
                </span>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold text-white uppercase tracking-wider">
                    zľava
                  </span>
                  <span className="text-sm text-white/80">
                    len v Deň matiek
                  </span>
                </div>
              </div>

              {/* Aktuálny variant - mení sa s carouselom */}
              <div
                key={activeSlide.id}
                className="mt-8 animate-[fadeInUp_0.5s_ease-out_both] rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-md"
              >
                <div className="mb-1 text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
                  Aktuálna procedúra
                </div>
                <div className="font-serif text-2xl font-bold text-white">
                  {activeSlide.procedure}
                </div>
                <p className="mt-1.5 text-sm text-white/85">
                  {activeSlide.shortDescription}
                </p>
                {activeDiscount && (
                  <div className="mt-3 flex items-baseline gap-3 border-t border-white/20 pt-3">
                    <span className="text-2xl font-bold text-white">
                      {activeDiscount.discounted}
                    </span>
                    <span className="text-base font-medium text-white/60 line-through">
                      {activeDiscount.original}
                    </span>
                    <span className="text-xs font-semibold text-white/80">
                      ušetríte&nbsp;
                      {activeDiscount.savedAmount.toFixed(0)}&nbsp;€
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={activeSlide.detailHref}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand-700 shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-brand-50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1"
                >
                  Rezervovať so zľavou
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/sluzby"
                  className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white"
                >
                  Všetky služby
                </Link>
              </div>

              {/* Carousel dots */}
              <div className="mt-10 flex items-center gap-3">
                {SLIDES.map((slide, i) => (
                  <button
                    key={`desktop-dot-${slide.id}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Zobraziť akciu ${slide.procedure}`}
                    className={`flex items-center gap-2 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? 'bg-white/20 px-4 py-1.5 text-white'
                        : 'px-2 py-1.5 text-white/60 hover:text-white/90'
                    }`}
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-500 ${
                        i === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/60'
                      }`}
                    />
                    <span className="text-xs font-semibold tracking-wide uppercase">
                      {slide.procedure}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* PRAVÁ STRANA — square image carousel */}
            <div className="relative aspect-[4/5] w-full max-w-[520px] justify-self-end">
              {/* Soft glow za obrázkom */}
              <div className="absolute -inset-6 rounded-[2rem] bg-white/10 blur-2xl" />

              <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] shadow-[0_25px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/30">
                {SLIDES.map((slide, i) => (
                  <div
                    key={`desktop-img-${slide.id}`}
                    className="absolute inset-0 transition-opacity ease-in-out"
                    style={{
                      ...transitionStyle,
                      opacity: i === activeIndex ? 1 : 0,
                      zIndex: i === activeIndex ? 1 : 0,
                    }}
                  >
                    <Image
                      src={slide.squareSrc}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      priority={i === 0}
                      sizes="(min-width: 1280px) 520px, 50vw"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spodný white fade pre plynulý prechod do nasledujúcej sekcie */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[120px]"
            style={{
              background:
                'linear-gradient(to top, white 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
