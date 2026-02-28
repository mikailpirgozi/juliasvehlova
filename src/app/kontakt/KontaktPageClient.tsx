'use client'

import { useRef, useEffect } from 'react'
import { Button } from '@/components/base/buttons/button'
import { FadeIn } from '@/components/ui'

const contactCards = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Telefón',
    value: '+421 911 992 211',
    sub: 'Po – Pia: 9:00 – 18:00',
    href: 'tel:+421911992211',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'juliaesteticclinic@gmail.com',
    sub: 'Odpovieme do 24 hodín',
    href: 'mailto:juliaesteticclinic@gmail.com',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Adresa',
    value: 'Javorová 2, 901 01 Malacky',
    sub: 'Termíny len po objednaní vopred',
    href: 'https://maps.google.com/?q=Javorov%C3%A1+2,+901+01+Malacky',
  },
]

const hours = [
  { day: 'Pondelok – Piatok', time: '9:00 – 18:00', open: true },
  { day: 'Sobota', time: '9:00 – 14:00', open: true },
  { day: 'Nedeľa', time: 'Zatvorené', open: false },
]

export function KontaktPageClient() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-[#8698a4] via-[#718593] to-[#5c6e7b] pb-8 pt-24 sm:pb-10 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white">
              Julia Estetic Clinic
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-brand-200 sm:text-5xl lg:text-6xl">
              Kontakt
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
              Sme tu pre vás. Navštívte nás, zavolajte alebo napíšte - radi odpovedáme na každú otázku.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="tel:+421911992211" color="secondary" size="md">
                Zavolať
              </Button>
              <Button href="/rezervacia" color="primary" size="md">
                Rezervovať termín
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Video + Info split ─── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

            {/* Video */}
            <FadeIn delay={0.1} className="flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Decorative glow */}
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand-300/30 to-[#718593]/20 blur-2xl" />

                {/* Video container */}
                <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10 aspect-[9/16]">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    src="/videos/klinika-video.mp4"
                    poster="/videos/klinika-video-poster.jpg"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Contact info */}
            <div className="space-y-6">
              <FadeIn delay={0.15}>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">
                  Nájdete nás tu
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                  Kontaktné informácie
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Naša klinika sa nachádza v Malackách. Radi vás uvítame - ale len po predchádzajúcom objednaní sa na termín.
                </p>
              </FadeIn>

              {/* Cards */}
              <div className="space-y-3">
                {contactCards.map((card, i) => (
                  <FadeIn key={i} delay={0.2 + i * 0.08}>
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-brand-200 hover:bg-brand-50 hover:shadow-sm"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-500 shadow-sm ring-1 ring-gray-100 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                        {card.icon}
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{card.label}</p>
                        <p className="mt-0.5 font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                          {card.value}
                        </p>
                        <p className="text-xs text-gray-500">{card.sub}</p>
                      </div>
                    </a>
                  </FadeIn>
                ))}
              </div>

              {/* Opening hours */}
              <FadeIn delay={0.5}>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="h-5 w-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-serif text-lg font-semibold text-gray-900">Otváracie hodiny</h3>
                  </div>
                  <div className="space-y-2">
                    {hours.map((h, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-600">{h.day}</span>
                        <span className={`text-sm font-semibold ${h.open ? 'text-gray-900' : 'text-gray-400'}`}>
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-brand-600 font-medium">
                    * Termíny len po objednaní vopred
                  </p>
                </div>
              </FadeIn>

              {/* Social */}
              <FadeIn delay={0.6}>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/juliaesteticclinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 hover:shadow"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/people/Julia-Estetic-Clinic/61560460323854/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 hover:shadow"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                  <a
                    href="https://youtube.com/@juliaesteticclinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 hover:shadow"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    YouTube
                  </a>
                  <a
                    href="https://www.tiktok.com/@juliaesteticclinic_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700 hover:shadow"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                    </svg>
                    TikTok
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Map ─── */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.1}>
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">Kde nás nájdete</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900">
                Javorová 2, Malacky
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-gray-200">
              <iframe
                title="Julia Estetic Clinic - mapa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.621!2d17.0218!3d48.4369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476ca8f3e3c7b16f%3A0x8d0e4e2b5f3a1c7a!2sJavorov%C3%A1%202%2C%20901%2001%20Malacky!5e0!3m2!1ssk!2ssk!4v1700000000000!5m2!1ssk!2ssk"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <a
                href="https://maps.google.com/?q=Javorov%C3%A1+2,+901+01+Malacky"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:ring-brand-300 hover:text-brand-700"
              >
                <svg className="h-4 w-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Otvoriť v Google Maps
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Kontaktujte nás ─── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <FadeIn delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">Kontaktujte nás</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
              Sme tu pre vás
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Napíšte nám alebo zavolajte - radi odpovedáme na každú otázku.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Telefón */}
              <a
                href="tel:+421911992211"
                className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 px-6 py-8 text-center transition-all hover:border-brand-200 hover:bg-brand-50 hover:shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-500 shadow-sm ring-1 ring-gray-100 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-gray-400">Telefón</p>
                <p className="mt-1 text-sm font-bold text-gray-900 transition-colors group-hover:text-brand-700">+421 911 992 211</p>
                <p className="mt-1 text-xs text-gray-400">Po – Pia: 9:00 – 18:00</p>
              </a>

              {/* Email */}
              <a
                href="mailto:juliaesteticclinic@gmail.com?subject=Otázka%20ohľadom%20služby"
                className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 px-6 py-8 text-center transition-all hover:border-brand-200 hover:bg-brand-50 hover:shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-500 shadow-sm ring-1 ring-gray-100 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-gray-400">Email</p>
                <p className="mt-1 text-sm font-bold text-gray-900 transition-colors group-hover:text-brand-700">juliaesteticclinic@gmail.com</p>
                <p className="mt-1 text-xs text-gray-400">Odpovieme do 24 hodín</p>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA banner ─── */}
      <section className="bg-gradient-to-br from-[#8698a4] to-[#5c6e7b] py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Pripravené začať?
            </h2>
            <p className="mt-4 text-white/80">
              Rezervujte si termín online - rýchlo, jednoducho a kedykoľvek.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/rezervacia" color="primary" size="lg">
                Rezervovať termín
              </Button>
              <Button href="/sluzby" color="secondary" size="lg">
                Prezerať služby
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
