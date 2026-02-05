'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/base/buttons/button'
import { Tabs } from '@/components/application/tabs/tabs'

const teamCertificates = [
  {
    id: 'julia-svehlova',
    name: 'Júlia Švehlová',
    certificates: [
      '/certificates/julia-svehlova/cert-1.webp',
      '/certificates/julia-svehlova/cert-2.webp',
      '/certificates/julia-svehlova/cert-3.webp',
      '/certificates/julia-svehlova/cert-4.webp',
      '/certificates/julia-svehlova/cert-5.webp',
      '/certificates/julia-svehlova/cert-6.webp',
    ],
  },
  {
    id: 'daria-schmuliak',
    name: 'Daria Schmuliak',
    certificates: [
      '/certificates/daria-schmuliak/cert-1.webp',
      '/certificates/daria-schmuliak/cert-2.webp',
      '/certificates/daria-schmuliak/cert-3.webp',
      '/certificates/daria-schmuliak/cert-4.webp',
      '/certificates/daria-schmuliak/cert-5.webp',
      '/certificates/daria-schmuliak/cert-6.webp',
    ],
  },
  {
    id: 'tatiana-kubovic',
    name: 'Bc. Tatiana Kubovič',
    certificates: [
      '/certificates/tatiana-kubovic/cert-1.webp',
      '/certificates/tatiana-kubovic/cert-2.webp',
      '/certificates/tatiana-kubovic/cert-3.webp',
    ],
  },
  {
    id: 'yasmin-betakova',
    name: 'Dr. Yasmin Betáková',
    certificates: [
      '/certificates/yasmin-betakova/cert-1.webp',
      '/certificates/yasmin-betakova/cert-2.webp',
      '/certificates/yasmin-betakova/cert-3.webp',
      '/certificates/yasmin-betakova/cert-4.webp',
      '/certificates/yasmin-betakova/cert-5.webp',
    ],
  },
]

export function AboutPageClient() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const timeline = [
    {
      year: '2013',
      title: 'Začiatok medicínskej kariéry',
      description: 'Absolvovala Lekársku fakultu Univerzity Komenského v Bratislave',
    },
    {
      year: '2015',
      title: 'Špecializácia na estetickú medicínu',
      description: 'Získanie certifikácie v odbore estetická medicína',
    },
    {
      year: '2017',
      title: 'Medzinárodné školenia',
      description: 'Účasť na prestížnych kongresoch v Paríži a Londýne',
    },
    {
      year: '2019',
      title: 'Rozšírenie služieb',
      description: 'Certifikácia pre permanentný make-up a pokročilé filler techniky',
    },
    {
      year: '2021',
      title: 'Julia Estetic Clinic',
      description: 'Otvorenie vlastnej kliniky v Malackách',
    },
    {
      year: '2025',
      title: 'Dnes',
      description: 'Viac ako 5000 spokojných klientov a neustále vzdelávanie',
    },
  ]

  const values = [
    {
      title: 'Prirodzené výsledky',
      description:
        'Verím v jemné vylepšenia, ktoré zvýrazňujú vašu prirodzenú krásu. Nie v radikálne zmeny, ktoré vyzerajú umelé.',
    },
    {
      title: 'Bezpečnosť na prvom mieste',
      description:
        'Používam len certifikované produkty od renomovaných výrobcov. Sterilné prostredie a dodržiavanie všetkých protokolov.',
    },
    {
      title: 'Individuálny prístup',
      description:
        'Každý klient je jedinečný. Venujeme čas konzultácii, aby sme pochopili vaše potreby a ciele.',
    },
    {
      title: 'Neustále vzdelávanie',
      description:
        'Pravidelne sa zúčastňujem školení a konferencií, aby som vám mohla ponúknuť najmodernejšie techniky.',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20">
      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed top-20 right-10 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/15 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/15 blur-3xl" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16 sm:py-24">
        <div className="pointer-events-none absolute top-10 left-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">O klinike</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
            MUDr. Julia Svehlová
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Špecialista na estetickú medicínu s vášňou pre prirodzenú krásu a bezpečné procedúry
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-4 text-gray-600">
            <p>
              Vítajte v Julia Estetic Clinic. Som MUDr. Julia Svehlová a estetická medicína je
              mojou vášňou už viac ako 10 rokov. Moja cesta začala na Lekárskej fakulte
              Univerzity Komenského, kde som získala pevné medicínske základy.
            </p>
            <p>
              Počas svojej kariéry som sa špecializovala na neinvazívne estetické procedúry s
              dôrazom na prirodzené výsledky. Verím, že krása je o sebadôvere a pocite pohody vo
              vlastnej koži - nie o radikálnych zmenách.
            </p>
            <p>
              Moja klinika v Malackách je priestorom, kde sa stretáva odbornosť s jemným,
              individuálnym prístupom. Každému klientovi venujem dostatočný čas na konzultáciu,
              aby som pochopila ich potreby a mohla navrhnúť optimálne riešenie.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute top-10 right-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-brand-700">Moja filozofia</h2>
            <p className="mt-2 text-gray-600">Hodnoty, ktoré ma vedú v každodennej práci</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-brand-700">Moja cesta</h2>
            <p className="mt-2 text-gray-600">Od medicíny k estetickej špecializácii</p>
          </div>

          <div className="mt-12 space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-1 text-xs font-medium text-white shadow-md">
                    {item.year}
                  </span>
                </div>
                <div className="flex-1 rounded-2xl border border-brand-100 bg-white/80 p-4 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute top-10 left-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-brand-700">
              Certifikácie a vzdelávanie
            </h2>
            <p className="mt-2 text-gray-600">
              Náš tím neustále rozširuje svoje znalosti a odbornosť
            </p>
          </div>

          <div className="mt-12">
            <Tabs defaultSelectedKey={teamCertificates[0]?.id ?? 'julia-svehlova'}>
              <Tabs.List
                items={teamCertificates.map((m) => ({ id: m.id, label: m.name }))}
                type="underline"
                size="md"
                className="justify-center"
              >
                {(item) => (
                  <Tabs.Item key={item.id} id={item.id}>
                    {item.label}
                  </Tabs.Item>
                )}
              </Tabs.List>

              {teamCertificates.map((member) => (
                <Tabs.Panel key={member.id} id={member.id} className="mt-8">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {member.certificates.map((cert, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setLightboxImage(cert)}
                        className="group cursor-pointer overflow-hidden rounded-2xl border border-brand-100 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={cert}
                            alt={`Certifikát ${index + 1} - ${member.name}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                            <span className="rounded-full bg-white/90 p-2 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                              <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Tabs.Panel>
              ))}
            </Tabs>
          </div>

          <div className="mt-8 rounded-2xl border border-brand-100 bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm">
            <p className="font-medium text-gray-900">
              Pravidelná účasť na medzinárodných konferenciách
            </p>
            <p className="mt-1 text-sm text-gray-600">
              IMCAS World Congress (Paríž), Aesthetic Medicine Congress (Londýn), Face Congress (Mníchov)
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-4">
            {[
              { value: '10+', label: 'Rokov skúseností' },
              { value: '5000+', label: 'Spokojných klientov' },
              { value: '15+', label: 'Procedúr' },
              { value: '100%', label: 'Bezpečnosť' },
            ].map((stat, index) => (
              <div key={index} className="rounded-2xl border border-brand-100 bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <p className="text-3xl font-bold text-[#CDA882]">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute top-10 right-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-700">
            Pripravení začať svoju transformáciu?
          </h2>
          <p className="mt-4 text-gray-600">
            Objednajte sa na konzultáciu a spoločne vytvoríme plán pre vašu krásu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="#kontakt" color="primary" size="lg">
              Rezervovať konzultáciu
            </Button>
            <Button href="/sluzby" color="secondary" size="lg">
              Pozrieť služby
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Zavrieť"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt="Certifikát - zväčšený náhľad"
              width={1200}
              height={900}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}
