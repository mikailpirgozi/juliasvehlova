import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui'

export const metadata: Metadata = {
  title: 'O nás - MUDr. Julia Svehlová | Julia Estetic Clinic',
  description:
    'Spoznajte MUDr. Juliu Svehlovú - špecialista na estetickú medicínu s viac ako 10-ročnou praxou. Certifikácie, kvalifikácie a filozofia kliniky.',
  keywords: [
    'MUDr. Julia Svehlová',
    'estetický lekár Malacky',
    'lekár estetickej medicíny',
    'o klinike',
    'certifikácie',
  ],
}

export default function AboutPage(): JSX.Element {
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
      icon: '🎯',
      title: 'Prirodzené výsledky',
      description:
        'Verím v jemné vylepšenia, ktoré zvýrazňujú vašu prirodzenú krásu. Nie v radikálne zmeny, ktoré vyzerajú umelé.',
    },
    {
      icon: '🔒',
      title: 'Bezpečnosť na prvom mieste',
      description:
        'Používam len certifikované produkty od renomovaných výrobcov. Sterilné prostredie a dodržiavanie všetkých protokolov.',
    },
    {
      icon: '💎',
      title: 'Individuálny prístup',
      description:
        'Každý klient je jedinečný. Venujeme čas konzultácii, aby sme pochopili vaše potreby a ciele.',
    },
    {
      icon: '📚',
      title: 'Neustále vzdelávanie',
      description:
        'Pravidelne sa zúčastňujem školení a konferencií, aby som vám mohla ponúknuť najmodernejšie techniky.',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-gold">
            O klinike
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold text-primary md:text-5xl">
            MUDr. Julia Svehlová
          </h1>
          <p className="text-xl text-gray-700">
            Špecialista na estetickú medicínu s vášňou pre prirodzenú krásu a bezpečné procedúry
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <p className="text-lg leading-relaxed text-gray-700">
              Vítajte v Julia Estetic Clinic. Som MUDr. Julia Svehlová a estetická medicína je
              mojou vášňou už viac ako 10 rokov. Moja cesta začala na Lekárskej fakulte
              Univerzity Komenského, kde som získala pevné medicínske základy.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Počas svojej kariéry som sa špecializovala na neinvazívne estetické procedúry s
              dôrazom na prirodzené výsledky. Verím, že krása je o sebadôvere a pocite pohody vo
              vlastnej koži - nie o radikálnych zmenách.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Moja klinika v Malackách je priestorom, kde sa stretáva odbornosť s jemným,
              individuálnym prístupom. Každému klientovi venujem dostatočný čas na konzultáciu,
              aby som pochopila ich potreby a mohla navrhnúť optimálne riešenie.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-cream px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-primary">Moja filozofia</h2>
            <p className="text-lg text-gray-600">Hodnoty, ktoré ma vedú v každodennej práci</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-lg border border-primary/10 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="mb-3 font-serif text-xl font-bold text-primary">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-primary">Moja cesta</h2>
            <p className="text-lg text-gray-600">Od medicíny k estetickej špecializácii</p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 text-right" style={{ width: '80px' }}>
                  <span className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-bold text-white">
                    {item.year}
                  </span>
                </div>
                <div className="relative flex-1 pb-8">
                  {index < timeline.length - 1 && (
                    <div className="absolute left-0 top-8 h-full w-0.5 bg-gray-200" />
                  )}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-2 font-serif text-xl font-bold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="bg-gradient-to-b from-white to-neutral-cream px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
              Certifikácie a vzdelávanie
            </h2>
            <p className="text-lg text-gray-600">
              Neustále sa vzdelávam, aby som vám priniesla najlepšie služby
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="rounded-lg border border-accent-gold/20 bg-white p-6 shadow-sm"
              >
                <p className="mb-3 text-sm font-medium text-accent-gold">{cert.year}</p>
                <h3 className="mb-2 font-serif text-lg font-bold text-primary">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-primary/20 bg-white p-8 text-center shadow-sm">
            <p className="mb-2 text-2xl">🎓</p>
            <p className="font-medium text-gray-900">
              Pravidelná účasť na medzinárodných konferenciách
            </p>
            <p className="text-sm text-gray-600">
              IMCAS World Congress (Paríž), Aesthetic Medicine Congress (Londýn), Face Congress
              (Mníchov)
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="mb-2 font-serif text-4xl font-bold text-primary">10+</p>
              <p className="text-gray-600">Rokov skúseností</p>
            </div>
            <div className="text-center">
              <p className="mb-2 font-serif text-4xl font-bold text-primary">5000+</p>
              <p className="text-gray-600">Spokojných klientov</p>
            </div>
            <div className="text-center">
              <p className="mb-2 font-serif text-4xl font-bold text-primary">15+</p>
              <p className="text-gray-600">Procedúr</p>
            </div>
            <div className="text-center">
              <p className="mb-2 font-serif text-4xl font-bold text-primary">100%</p>
              <p className="text-gray-600">Bezpečnosť</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-white to-primary/10 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
            Pripravení začať svoju transformáciu?
          </h2>
          <p className="mb-8 text-lg text-gray-700">
            Objednajte sa na bezplatnú konzultáciu a spoločne vytvoríme plán pre vašu krásu.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <LinkButton href="#kontakt" variant="primary" size="lg">
              Rezervovať konzultáciu
            </LinkButton>
            <LinkButton href="/sluzby" variant="outline" size="lg">
              Pozrieť služby
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  )
}

