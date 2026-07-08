'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Ticket01, Heart, ArrowRight } from '@untitledui/icons'
import { FadeIn } from '@/components/ui/FadeIn'
import { getEventBookingHref, type ClinicEvent } from '@/lib/events'

interface EventPromoSectionProps {
  event: ClinicEvent
}

/**
 * Homepage banner for the nearest upcoming clinic event. Rendered only while
 * the event is upcoming (gated server-side in `app/page.tsx` via
 * `getUpcomingEvent()`), links to /eventy.
 */
export function EventPromoSection({ event }: EventPromoSectionProps) {
  const bookingHref = getEventBookingHref(event)
  return (
    <section
      aria-label={`Pripravované podujatie ${event.title}`}
      className="relative overflow-hidden bg-gradient-to-br from-[#8698a4] via-[#7d909c] to-[#718593]"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <FadeIn>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md">
                <Heart className="h-3.5 w-3.5 fill-white" />
                Pripravované podujatie
              </div>

              <h2 className="mt-6 font-serif text-3xl leading-tight font-bold text-white sm:text-4xl xl:text-5xl">
                {event.title}
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { icon: Calendar, label: event.dateLabel },
                  { icon: Clock, label: event.timeLabel },
                  { icon: Ticket01, label: event.admissionLabel },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md"
                  >
                    <Icon className="h-4 w-4 text-brand-200" />
                    {label}
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                {event.intro}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={bookingHref ?? '/eventy'}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-brand-700 shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-brand-50 hover:-translate-y-1"
                >
                  {bookingHref ? 'Rezervovať miesto' : 'Viac o podujatí'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                {bookingHref ? (
                  <Link
                    href="/eventy"
                    className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20"
                  >
                    Viac o podujatí
                  </Link>
                ) : (
                  event.charity && (
                    <a
                      href={event.charity.donationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20"
                    >
                      <Heart className="h-4 w-4" />
                      Prispieť do zbierky
                    </a>
                  )
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <Link
              href="/eventy"
              className="group relative mx-auto block w-full max-w-sm lg:max-w-md"
              aria-label={`Zobraziť detail podujatia ${event.title}`}
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-white/15 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
              <Image
                src={event.posterSrc}
                alt={event.posterAlt}
                width={1200}
                height={1703}
                className="relative w-full rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 384px, 100vw"
              />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
