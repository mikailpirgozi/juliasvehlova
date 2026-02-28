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
    <section id="about" className="relative overflow-hidden bg-white py-16 sm:py-24">
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Left - Image */}
          <FadeIn direction="left" className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 h-full w-full rounded-[2rem] bg-gradient-to-br from-[#8698a4]/60 to-brand-300/40 transform -rotate-3 transition-transform duration-700 hover:rotate-0" />
              <div className="absolute -bottom-6 -right-6 h-full w-full rounded-[2rem] border-2 border-[#8698a4]/30 transform rotate-3 transition-transform duration-700 hover:rotate-0" />
              
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl">
                <Image
                  src="/images/services/doctor-portrait.webp"
                  alt="MUDr. Júlia Švehlová - Estetická medicína"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                {/* Brand color vignette from bottom */}
                <div 
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(134, 152, 164, 0.65) 0%, rgba(134, 152, 164, 0.3) 25%, rgba(134, 152, 164, 0.1) 45%, transparent 65%)',
                  }}
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
          <FadeIn direction="right" delay={0.3} className="mt-12 lg:mt-0 lg:col-span-7">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#CDA882]">O nás</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Júlia Švehlová
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
              <div className="relative mt-10 rounded-2xl bg-gradient-to-r from-[#faf7f5] to-white p-8 shadow-lg border border-brand-100 overflow-hidden">
                <div className="absolute -left-4 -top-4 text-brand-200/40 text-[8rem] font-serif leading-none select-none">&ldquo;</div>
                <p className="relative font-serif text-xl italic text-gray-800 leading-relaxed z-10 text-center">
                  Vaša spokojnosť a bezpečnosť sú mojou absolútnou prioritou.
                </p>
              </div>

              <div className="mt-8">
                <Button href="/o-nas" color="primary" size="md">
                  Zistiť viac o mne
                </Button>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* Stats & Certificates - Below */}
        <FadeIn delay={0.6}>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-3xl font-bold text-[#CDA882]">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FadeIn delay={0.8}>
            {/* Certificates */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
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

          <FadeIn delay={1.0}>
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
