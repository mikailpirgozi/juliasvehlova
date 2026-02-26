'use client'

import { useState, useEffect, useCallback } from 'react'
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

const teamMembers = [
  {
    id: 'julia-svehlova',
    name: 'Júlia Švehlová',
    role: 'Zakladateľka & CEO',
    photo: '/images/team/julia-svehlova.png',
    bio: [
      'V beauty a estetickej sfére pôsobím viac ako 28 rokov. Moja profesionálna cesta zahŕňa oblasti kozmetológie, dekoratívnej a korektívnej vizážistiky, dermopigmentácie (permanentného make-upu), stylingu mihalníc a obočia, ako aj dlhoročnú činnosť v oblasti vzdelávania, lektorskej činnosti a vedenia odborných kurzov.',
      'Roky praxe ma prirodzene priviedli k hlbšiemu pohľadu na krásu — na prepojenie tela, psychiky a vnútorného nastavenia. Svoje odborné zázemie som preto postupne rozšírila o terapeutické, psychoterapeutické a holistické prístupy, vrátane práce s energiou a vedomého vnímania človeka ako celku.',
      'Na tomto základe vznikla Julia Estetic Clinic — miesto, kde sa moderná estetická starostlivosť spája s citom, prirodzenosťou a rešpektom k jedinečnosti každého klienta.',
    ],
  },
  {
    id: 'yasmin-betakova',
    name: 'Dr. Yasmin Betáková',
    role: 'Estetická lekárka',
    photo: null,
    bio: [
      'Som lekárka so zázemím v psychiatrii, vďaka čomu vnímam estetiku v širšom kontexte psychiky a sebahodnoty. Verím, že skutočná krása vzniká v rovnováhe medzi vnútorným prežívaním a vonkajším vzhľadom.',
      'Pri ošetreniach dbám na prirodzenosť, harmóniu a rešpekt k individualite každého človeka. Moje dlhoročné skúsenosti sú podčiarknuté účasťou na medzinárodných školeniach a odborných vzdelávaniach v zahraničí, ktoré mi umožňujú prinášať moderné, bezpečné a precízne postupy.',
      'Mojím cieľom je podporiť nielen krásu tváre, ale aj pocit istoty a spokojnosti so sebou samým.',
    ],
  },
  {
    id: 'daria-shmuliak',
    name: 'Daria Shmuliak',
    role: 'Kozmetička',
    photo: '/images/team/daria-shmuliak.png',
    bio: [
      'Som kozmetička s medzinárodnými skúsenosťami v oblasti starostlivosti o pleť. Špecializujem sa na prácu s problematickou pleťou — od tínedžerského akné až po akné a postakné u dospelých.',
      'Vo svojej praxi spájam moderné protokoly, evidence-based prístup a individuálne vedenie. Verím, že zdravá pleť nie je o zakrývaní nedokonalostí, ale o systematickej a vedomej starostlivosti.',
      'Neustále sa vzdelávam, každý mesiac absolvujem nové školenia a odborné kurzy. Mojou misiou je pomôcť vám obľúbiť si svoju pleť a cítiť sa lepšie každý deň.',
    ],
  },
  {
    id: 'tatiana-kubovic',
    name: 'Bc. Tatiana Kubovič',
    role: 'Fyzioterapeutka & Piercerka',
    photo: '/images/team/tatiana-kubovic.png',
    bio: [
      'Som fyzioterapeutka v závere magisterského štúdia a piercerka, ktorá vníma telo ako jedinečné umelecké dielo. Ku každému klientovi pristupujem individuálne, s rešpektom, precíznosťou a citom pre detail.',
      'Vo svojej praxi prepájam fyzioterapiu s masážnymi technikami, mobilizáciami, bankovaním či maderoterapiou. Neponúkam iba relax, ale cielenú starostlivosť zameranú na konkrétny problém a dlhodobý výsledok.',
      'Piercing pre mňa predstavuje osobný symbol — premenu, sebavyjadrenie a krásu, ktorá môže zažiariť aj na mieste dotyku ihly.',
    ],
  },
  {
    id: 'nicol-jurkackova',
    name: 'Nicol Jurkáčková',
    role: 'Tatérka',
    photo: '/images/team/nicol-jurkackova.png',
    bio: [
      'Som tatérka a tetovanie pre mňa nie je len kresba na koži. Je to tichý detail, ktorý podčiarkne osobnosť toho, kto ho nosí. Vo svojej tvorbe sa sústreďujem najmä na menšie, subtílne a elegantné tetovania s dôrazom na čistú líniu a nadčasovosť.',
      'Najdôležitejšie je pre mňa, aby sa u mňa klienti cítili príjemne, pokojne, sebavedomo a vypočutí — aby samotný proces bol rovnako krásny ako výsledok.',
      'Ku každému pristupujem individuálne a návrh tvorím na mieru — s dôrazom na harmóniu, citlivé prevedenie a prirodzený výsledok.',
    ],
  },
  {
    id: 'dominika-stehlikova',
    name: 'Dominika Stehlíková',
    role: 'Špecialistka',
    photo: '/images/team/dominika-stehlikova.png',
    bio: [],
  },
]

export function AboutPageClient() {
  const [lightbox, setLightbox] = useState<{ certs: string[]; index: number } | null>(null)

  const openLightbox = useCallback((certs: string[], index: number) => {
    setLightbox({ certs, index })
  }, [])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const goNext = useCallback(() => {
    setLightbox((prev) => prev ? { ...prev, index: (prev.index + 1) % prev.certs.length } : prev)
  }, [])

  const goPrev = useCallback(() => {
    setLightbox((prev) => prev ? { ...prev, index: (prev.index - 1 + prev.certs.length) % prev.certs.length } : prev)
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, closeLightbox, goNext, goPrev])

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
            Náš tím
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Odborníci s vášňou pre krásu, individualitu a starostlivosť o každého klienta
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative z-10 overflow-hidden px-4 py-16 sm:py-20">
        <div className="pointer-events-none absolute top-10 right-10 h-40 w-40 rounded-full bg-brand-200/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#CDA882]/15 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">Naša vízia</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-brand-700 sm:text-3xl">
              Julia Estetic Clinic
            </h2>
          </div>
          <div className="mt-10 rounded-3xl border border-brand-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm sm:p-12">
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                V Julia Estetic Clinic veríme, že krása má zmysel vtedy, keď je v súlade s tým, ako sa žena cíti vo vnútri. Našou víziou je prepájať modernú estetickú medicínu s vnútorným pokojom, profesionalitu s ľudským prístupom a technológie s citom.
              </p>
              <p>
                Pracujeme s najnovšími technológiami a trendmi, ktoré využívame na dosiahnutie prirodzených výsledkov. Nie na zmenu tváre, ale na jemné podčiarknutie jedinečnej krásy každého klienta.
              </p>
              <p>
                Ku každej klientke pristupujeme individuálne a komplexne. Počúvame, vysvetľujeme a hľadáme riešenia, ktoré rešpektujú jej potreby, osobnosť aj prirodzenosť.
              </p>
              <p>
                Zároveň vytvárame prostredie, kde sa môžete cítiť bezpečne a ako doma — bez tlaku, bez masiek, bez pretvárky. Miesto, kde môžete byť sami sebou.
              </p>
              <p className="font-medium text-gray-700">
                Nadštandardná komunikácia, dôkladné konzultácie a starostlivosť pred aj po ošetrení sú pre nás samozrejmosťou. Pretože veríme, že skutočná krása vzniká tam, kde je dôvera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-brand-50/30 via-white to-[#CDA882]/10 px-4 py-16 sm:py-20">
        <div className="pointer-events-none absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-100/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">Ľudia za klinikou</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-brand-700 sm:text-3xl">Zoznámte sa s nami</h2>
            <p className="mt-3 text-gray-600">Každý člen nášho tímu prináša unikátnu odbornosť a vášeň pre svoju prácu</p>
          </div>

          <div className="mt-14 space-y-16">
            {teamMembers.filter(m => m.bio.length > 0).map((member, index) => (
              <div
                key={member.id}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Photo */}
                <div className="flex-shrink-0 lg:w-[340px]">
                  {member.photo ? (
                    <div className="relative mx-auto w-64 lg:w-full">
                      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand-200/40 to-[#CDA882]/30 blur-xl" />
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          width={680}
                          height={900}
                          className="aspect-[3/4] w-full object-cover object-top"
                          sizes="(max-width: 1024px) 256px, 340px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/20 via-transparent to-transparent" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative mx-auto w-64 lg:w-full">
                      <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand-200/40 to-[#CDA882]/30 blur-xl" />
                      <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-[#CDA882]/20 shadow-2xl">
                        <span className="text-6xl font-serif text-brand-300">{member.name.charAt(0)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">{member.role}</p>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">{member.name}</h3>
                  <div className="mt-1 h-0.5 w-12 rounded-full bg-gradient-to-r from-brand-400 to-[#CDA882]" />
                  <div className="mt-5 space-y-3">
                    {member.bio.map((paragraph, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Dominika - no bio, just photo card */}
            {teamMembers.filter(m => m.bio.length === 0).map(member => (
              <div key={member.id} className="flex justify-center">
                <div className="relative w-64">
                  <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand-200/40 to-[#CDA882]/30 blur-xl" />
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    {member.photo && (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={680}
                        height={900}
                        className="aspect-[3/4] w-full object-cover object-top"
                        sizes="256px"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#CDA882]">{member.role}</p>
                      <p className="mt-0.5 font-serif text-lg font-bold text-white">{member.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                        onClick={() => openLightbox(member.certificates, index)}
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
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Zavrieť"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            {lightbox.index + 1} / {lightbox.certs.length}
          </div>

          {/* Prev */}
          {lightbox.certs.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-2 sm:left-6 rounded-full bg-white/10 p-2 sm:p-3 text-white transition-colors hover:bg-white/30"
              aria-label="Predchádzajúci certifikát"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.certs[lightbox.index]!}
              alt={`Certifikát ${lightbox.index + 1} - zväčšený náhľad`}
              width={1200}
              height={900}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>

          {/* Next */}
          {lightbox.certs.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-2 sm:right-6 rounded-full bg-white/10 p-2 sm:p-3 text-white transition-colors hover:bg-white/30"
              aria-label="Nasledujúci certifikát"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
