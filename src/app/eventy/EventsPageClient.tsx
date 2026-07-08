'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Ticket01,
  MarkerPin01,
  CheckCircle,
  Heart,
  HeartHand,
  ArrowRight,
  Phone,
} from '@untitledui/icons'
import { PageBackground } from '@/components/ui/PageBackground'
import { FadeIn } from '@/components/ui/FadeIn'
import { CONTACT } from '@/lib/seo/constants'
import { getEventBookingHref, type ClinicEvent } from '@/lib/events'

interface EventsPageClientProps {
  events: Array<{ event: ClinicEvent; isPast: boolean }>
}

export function EventsPageClient({ events }: EventsPageClientProps) {
  return (
    <PageBackground variant="secondary">
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#8698a4] to-[#718593] px-4 pb-16 pt-24 sm:pt-32">
          <div className="relative z-10 mx-auto max-w-7xl">
            <FadeIn>
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-300/30 bg-white/10 shadow-[0_0_20px_rgba(216,167,177,0.3)] backdrop-blur-md">
                  <Calendar className="h-8 w-8 text-brand-200" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                  Eventy <span className="text-brand-200">a podujatia</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
                  Stretnutia, inšpirácia a novinky zo sveta estetickej medicíny
                  naživo v našej klinike v Malackách.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {events.map(({ event, isPast }) => {
          const bookingHref = getEventBookingHref(event)
          return (
          <section key={event.slug} className="relative z-10 px-4 py-16">
            <div className="mx-auto max-w-7xl">
              {/* Event header */}
              <FadeIn>
                <div className="text-center">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase ${
                      isPast
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-brand-100 text-brand-800'
                    }`}
                  >
                    <Heart className="h-3.5 w-3.5" />
                    {isPast ? 'Podujatie sa už uskutočnilo' : 'Pripravované podujatie'}
                  </span>
                  <h2 className="mt-4 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                    {event.title}
                  </h2>

                  {/* Date / time / admission / place */}
                  <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-3">
                    {[
                      { icon: Calendar, label: event.dateLabel },
                      { icon: Clock, label: event.timeLabel },
                      { icon: Ticket01, label: event.admissionLabel },
                      {
                        icon: MarkerPin01,
                        label: `${CONTACT.address.street}, ${CONTACT.address.city}`,
                      },
                    ].map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm"
                      >
                        <Icon className="h-4 w-4 text-brand-600" />
                        {label}
                      </span>
                    ))}
                  </div>

                  <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-700">
                    {event.intro}
                  </p>
                </div>
              </FadeIn>

              {/* Program + poster */}
              <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                <FadeIn direction="right">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900">
                      Čo vás čaká
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {event.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                          <span className="text-base leading-relaxed text-gray-700">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-8 text-base leading-relaxed text-gray-700">
                      {event.outro}
                    </p>
                    {!isPast && (
                      <div className="mt-8 flex flex-wrap gap-4">
                        {bookingHref && (
                          <Link
                            href={bookingHref}
                            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-brand-700 hover:-translate-y-0.5"
                          >
                            <Calendar className="h-4 w-4" />
                            Rezervovať si miesto
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </Link>
                        )}
                        <Link
                          href="/kontakt"
                          className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-sm transition-all duration-300 hover:bg-brand-50 hover:-translate-y-0.5"
                        >
                          <Phone className="h-4 w-4" />
                          Máte otázky? Kontaktujte nás
                        </Link>
                      </div>
                    )}
                  </div>
                </FadeIn>

                <FadeIn direction="left">
                  <div className="relative mx-auto w-full max-w-md lg:max-w-full">
                    <div className="absolute -inset-4 rounded-[2rem] bg-brand-200/40 blur-2xl" />
                    <Image
                      src={event.posterSrc}
                      alt={event.posterAlt}
                      width={1200}
                      height={1703}
                      className="relative w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
                      sizes="(min-width: 1024px) 45vw, (min-width: 640px) 448px, 100vw"
                    />
                  </div>
                </FadeIn>
              </div>

              {/* Charity block */}
              {event.charity && (
                <FadeIn>
                  <div className="mt-16 overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-xl">
                    <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
                      <div className="p-8 sm:p-10">
                        <div className="flex items-center gap-4">
                          <Image
                            src={event.charity.logoSrc}
                            alt={`Logo ${event.charity.name}`}
                            width={800}
                            height={800}
                            className="h-16 w-16 rounded-xl object-contain sm:h-20 sm:w-20"
                            sizes="80px"
                          />
                          <div>
                            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">
                              <HeartHand className="h-4 w-4" />
                              Charitatívna zbierka
                            </div>
                            <h3 className="mt-1 font-serif text-2xl font-bold text-gray-900">
                              {event.charity.name}
                            </h3>
                          </div>
                        </div>
                        <p className="mt-6 text-base leading-relaxed text-gray-700">
                          {event.charity.description}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                          <a
                            href={event.charity.donationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-brand-700 hover:-translate-y-0.5"
                          >
                            <Heart className="h-4 w-4 fill-white" />
                            Prispieť do zbierky
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </a>
                          <span className="text-sm text-gray-500">
                            Online cez Darujme.sk alebo naskenujte QR kód
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center gap-6 border-t border-brand-100 bg-brand-50/50 p-8 lg:flex-col lg:border-t-0 lg:border-l">
                        <Image
                          src={event.charity.qrSrc}
                          alt={`QR kód na príspevok pre ${event.charity.name}`}
                          width={370}
                          height={370}
                          className="h-36 w-36 rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/5 sm:h-44 sm:w-44"
                          sizes="176px"
                        />
                        <Image
                          src={event.charity.photoSrc}
                          alt={event.charity.photoAlt}
                          width={590}
                          height={450}
                          className="h-36 w-auto rounded-xl object-cover shadow-sm ring-1 ring-black/5 sm:h-44"
                          sizes="232px"
                        />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>
          </section>
          )
        })}
      </main>
    </PageBackground>
  )
}
