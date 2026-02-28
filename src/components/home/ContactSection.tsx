'use client'

import { FadeIn } from '@/components/ui'

export function ContactSection() {
  const contactInfo = [
    {
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      primary: 'juliaesteticclinic@gmail.com',
      secondary: 'Odpovieme do 24 hodín',
      href: 'mailto:juliaesteticclinic@gmail.com',
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <section id="contact" className="bg-gradient-to-b from-[#718593] to-[#5c6e7b] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn delay={0.2}>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">Kontakt</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              Napíšte nám
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Máte otázku alebo chcete rezervovať termín? Sme tu pre vás a radi vám pomôžeme
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 mx-auto max-w-3xl">
          <FadeIn delay={0.4}>
            {/* Contact Cards — horizontal row on desktop */}
            <div className="grid gap-4 sm:grid-cols-3">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white shadow-inner border border-white/20">
                    {info.icon}
                  </div>
                  <h4 className="mt-3 text-sm font-medium text-brand-200">{info.title}</h4>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="mt-1 block text-sm font-semibold text-white hover:text-brand-300 transition-colors break-all"
                    >
                      {info.primary}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-white break-all">{info.primary}</p>
                  )}
                  <p className="mt-0.5 text-xs text-white/60">{info.secondary}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            {/* Opening Hours */}
            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6">
              <h4 className="text-xl font-serif font-semibold text-white">
                Otváracie hodiny
              </h4>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-white/80">Pondelok - Piatok</span>
                  <span className="font-medium text-white">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-white/80">Sobota</span>
                  <span className="font-medium text-white">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-white/80">Nedeľa</span>
                  <span className="font-medium text-white/50 uppercase text-xs tracking-wider">Zatvorené</span>
                </div>
              </div>
              <div className="mt-4 rounded-xl p-3">
                <p className="text-xs text-brand-200">
                  Termíny len po objednaní vopred
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.8}>
            {/* Social */}
            <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-xl border border-white/20">
              <h4 className="text-xl font-serif font-semibold text-gray-900">Sledujte nás</h4>
              <p className="mt-2 text-base text-gray-600">
                Inšpirujte sa našimi výsledkami a zostaňte v obraze o novinkách
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {[
                  {
                    label: 'Instagram',
                    href: 'https://www.instagram.com/juliaesteticclinic',
                    className: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 shadow-pink-800/30 hover:shadow-pink-800/50',
                    icon: (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Facebook',
                    href: 'https://www.facebook.com/people/Julia-Estetic-Clinic/61560460323854/',
                    className: 'bg-[#1877F2] hover:bg-[#0e65d9] shadow-blue-900/30 hover:shadow-blue-900/50',
                    icon: (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'YouTube',
                    href: 'https://youtube.com/@juliaesteticclinic',
                    className: 'bg-[#FF0000] hover:bg-[#cc0000] shadow-red-900/30 hover:shadow-red-900/50',
                    icon: (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'TikTok',
                    href: 'https://www.tiktok.com/@juliaesteticclinic_',
                    className: 'bg-[#010101] hover:bg-[#2a2a2a] shadow-black/40 hover:shadow-black/60',
                    icon: (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                      </svg>
                    ),
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${social.className}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
