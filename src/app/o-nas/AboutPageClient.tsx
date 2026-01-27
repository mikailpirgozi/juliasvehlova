'use client'

import { Button } from '@/components/base/buttons/button'

export function AboutPageClient() {
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

  const certificates = [
    {
      title: 'Lekárska fakulta UK Bratislava',
      description: 'Všeobecné lekárstvo',
      year: '2013',
    },
    {
      title: 'Certifikát estetickej medicíny',
      description: 'Slovenská spoločnosť estetickej medicíny',
      year: '2015',
    },
    {
      title: 'Botulotoxín & Filery',
      description: 'Advanced Aesthetic Medicine Course, Londýn',
      year: '2016',
    },
    {
      title: 'Permanentný make-up',
      description: 'PhiBrows Academy International',
      year: '2019',
    },
    {
      title: 'Laserová medicína',
      description: 'European Laser Safety Course',
      year: '2020',
    },
    {
      title: 'Master Class Lip Fillers',
      description: 'Dr. Tijion Esho Academy, Londýn',
      year: '2022',
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
              Neustále sa vzdelávam, aby som vám priniesla najlepšie služby
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-xs font-medium text-[#CDA882]">{cert.year}</p>
                <h3 className="mt-2 font-semibold text-gray-900">{cert.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
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
            Objednajte sa na bezplatnú konzultáciu a spoločne vytvoríme plán pre vašu krásu.
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
    </div>
  )
}
