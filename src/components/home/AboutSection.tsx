'use client'

import Image from 'next/image'
import { Button } from '@/components/base/buttons/button'
import { FadeIn } from '@/components/ui'

export function AboutSection() {
  const stats = [
    { value: '10+', label: 'Rokov skúseností' },
    { value: '5000+', label: 'Spokojných klientov' },
    { value: '15+', label: 'Procedúr' },
    { value: '100%', label: 'Bezpečnosť' },
  ]

  const certificates = [
    'Certifikovaná príslušníčka v odbore estetická medicína',
    'Špecializácia na aplikáciu botulotoxínu a kyseliny hyalurónové',
    'Medzinárodné certifikáty pre permanentný make-up',
    'Pravidelné školenia a účasť na konferenciách',
  ]

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-br from-white via-brand-50/20 to-[#CDA882]/10 py-16 sm:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-10 left-10 h-48 w-48 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[#CDA882]/15 blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Left - Image */}
          <FadeIn direction="left" className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 h-full w-full rounded-2xl bg-gradient-to-br from-brand-200 to-[#CDA882]/50" />
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-brand-200" />
              
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/services/doctor-portrait.jpg"
                  alt="MUDr. Julia Svehlová - Estetická medicína"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg">
                <span className="text-2xl font-bold">10+</span>
                <span className="text-xs">rokov</span>
              </div>
            </div>
          </FadeIn>

          {/* Right - Text Content */}
          <FadeIn direction="right" delay={0.2} className="mt-12 lg:mt-0 lg:col-span-7">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">O nás</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
                MUDr. Julia Svehlová
              </h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  Vítajte v <span className="font-medium text-gray-900">Julia Estetic Clinic</span>, kde sa krása stretáva s odbornosťou. S viac ako
                  10-ročnou praxou v estetickej medicíne pomáham klientom dosiahnuť ich estetické
                  ciele bezpečným a profesionálnym spôsobom.
                </p>
                <p>
                  Moja filozofia je jednoduchá: <span className="font-medium text-brand-600">prirodzené výsledky</span>, individuálny prístup a maximálna
                  bezpečnosť. Používam len certifikované produkty a najmodernejšie techniky, aby ste
                  sa cítili krásne a sebavedomé.
                </p>
              </div>

              {/* Highlight box */}
              <div className="mt-6 rounded-xl border-l-4 border-[#CDA882] bg-gradient-to-r from-brand-50 to-white p-4 shadow-sm">
                <p className="font-medium text-brand-800">
                  Vaša spokojnosť a bezpečnosť sú mojou prioritou.
                </p>
              </div>

              <div className="mt-8">
                <Button href="/o-nas" color="secondary" size="md">
                  Zistiť viac o mne
                </Button>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* Stats & Certificates - Below */}
        <FadeIn delay={0.4}>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-brand-100 bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-3xl font-bold text-[#CDA882]">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FadeIn delay={0.5}>
            {/* Certificates */}
            <div className="rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Kvalifikácie a certifikáty
              </h3>
              <ul className="mt-4 space-y-3">
                {certificates.map((cert, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            {/* Trust Badge */}
            <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 p-8 text-center text-white shadow-lg">
              <p className="text-2xl font-semibold">Dôveryhodný odborník</p>
              <p className="mt-2 text-brand-100">
                Členom Slovenskej spoločnosti estetickej medicíny
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
