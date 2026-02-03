'use client'

import dynamic from 'next/dynamic'
import { FadeIn } from '@/components/ui'

// Dynamic import with ssr: false to avoid React Aria hydration mismatch
const ContactForm = dynamic(
  () => import('@/components/contact').then((mod) => mod.ContactForm),
  { 
    ssr: false,
    loading: () => (
      <div className="space-y-5 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-gray-100" />
        ))}
        <div className="h-12 rounded-lg bg-brand-100" />
      </div>
    ),
  }
)

export function ContactSection() {
  const contactInfo = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Telefón',
      primary: '+421 911 992 211',
      secondary: 'Po - Pia: 9:00 - 18:00',
      href: 'tel:+421911992211',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      primary: 'info@jec.sk',
      secondary: 'Odpovieme do 24 hodín',
      href: 'mailto:info@jec.sk',
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Adresa',
      primary: 'Javorová 2, 901 01 Malacky',
      secondary: 'Termíny len po objednaní vopred',
      href: null,
    },
  ]

  return (
    <section id="kontakt" className="relative overflow-hidden bg-gradient-to-br from-white via-brand-50/30 to-[#CDA882]/10 py-16 sm:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-10 right-1/4 h-64 w-64 rounded-full bg-brand-200/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-56 w-56 rounded-full bg-[#CDA882]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">Kontakt</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
              Napíšte nám
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Máte otázku alebo chcete rezervovať termín? Sme tu pre vás a radi vám pomôžeme
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Left - Contact Form */}
          <FadeIn direction="left" delay={0.1}>
            <div className="rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm lg:p-8">
              <h3 className="text-lg font-semibold text-gray-900">
                Kontaktný formulár
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Vyplňte formulár a ozveme sa vám do 24 hodín
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </FadeIn>

          {/* Right - Contact Info */}
          <FadeIn direction="right" delay={0.2}>
            <div className="mt-10 lg:mt-0 space-y-6">
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-brand-100 bg-white/80 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 text-brand-600">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{info.title}</h4>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="mt-1 block text-sm text-brand-600 hover:text-brand-700"
                          >
                            {info.primary}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{info.primary}</p>
                        )}
                        <p className="mt-0.5 text-xs text-gray-500">{info.secondary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Opening Hours */}
              <div className="rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-gray-900">
                  Otváracie hodiny
                </h4>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-brand-100">
                    <span className="text-gray-600">Pondelok - Piatok</span>
                    <span className="font-medium text-gray-900">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-brand-100">
                    <span className="text-gray-600">Sobota</span>
                    <span className="font-medium text-gray-900">9:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Nedeľa</span>
                    <span className="font-medium text-gray-500">Zatvorené</span>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-gradient-to-r from-brand-50 to-white p-3">
                  <p className="text-xs text-gray-600">
                    Termíny len po objednaní vopred
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 p-6 text-white shadow-lg">
                <h4 className="text-lg font-semibold">Sledujte nás</h4>
                <p className="mt-1 text-sm text-brand-100">
                  Inšpirujte sa našimi výsledkami a zostaňte v obraze o novinkách
                </p>
                <div className="mt-4 flex gap-3">
                  {[
                    { label: 'Instagram', href: 'https://www.instagram.com/juliaesteticclinic' },
                    { label: 'Facebook', href: 'https://www.facebook.com/people/Julia-Estetic-Clinic/61560460323854/' },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-white/20 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/30 hover:scale-105"
                      aria-label={social.label}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
