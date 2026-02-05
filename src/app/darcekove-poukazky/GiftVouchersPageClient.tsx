'use client'

import {
  Gift01,
  CreditCard02,
  Heart,
  CheckCircle,
  Mail01,
  Phone,
  MarkerPin01,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { PageBackground } from '@/components/ui/PageBackground'
import { FadeIn } from '@/components/ui/FadeIn'

interface VoucherOption {
  id: string
  value: number
  popular?: boolean
  description: string
}

const voucherOptions: VoucherOption[] = [
  {
    id: 'voucher-50',
    value: 50,
    description: 'Ideálne pre menšie ošetrenia a kozmetické služby',
  },
  {
    id: 'voucher-100',
    value: 100,
    popular: true,
    description: 'Najpopulárnejšia voľba pre darček k narodeninám',
  },
  {
    id: 'voucher-200',
    value: 200,
    popular: true,
    description: 'Ideálne pre kombinované procedúry',
  },
  {
    id: 'voucher-300',
    value: 300,
    description: 'Luxusný darček pre VIP zážitok',
  },
  {
    id: 'voucher-400',
    value: 400,
    description: 'Exkluzívny balík pre kompletné ošetrenia',
  },
  {
    id: 'voucher-500',
    value: 500,
    description: 'Prémiový darček pre najnáročnejších klientov',
  },
]

const howItWorks = [
  {
    step: '1',
    title: 'Vyberte hodnotu',
    description: 'Zvoľte si hodnotu poukážky z našej ponuky alebo požiadajte o vlastnú sumu',
  },
  {
    step: '2',
    title: 'Objednajte',
    description: 'Kontaktujte nás telefonicky, emailom alebo cez rezervačný formulár',
  },
  {
    step: '3',
    title: 'Prevzatie',
    description: 'Poukážku si môžete vyzdvihnúť v klinike alebo vám ju pošleme',
  },
  {
    step: '4',
    title: 'Darujte radosť',
    description: 'Obdarovaný si môže rezervovať ľubovoľnú službu podľa vlastného výberu',
  },
]

const faqItems = [
  {
    question: 'Ako dlho platí darčeková poukážka?',
    answer: 'Všetky naše darčekové poukážky majú platnosť 3 mesiace od dátumu zakúpenia.',
  },
  {
    question: 'Na aké služby môžem poukážku použiť?',
    answer:
      'Poukážka je platná na všetky naše služby - estetickú medicínu, permanentný make-up, kozmetické ošetrenia aj profesionálne líčenie.',
  },
  {
    question: 'Môžem získať poukážku aj na inú hodnotu?',
    answer:
      'Áno, vytvárame poukážky aj na mieru podľa vašich požiadaviek. Stačí nás kontaktovať s požadovanou hodnotou.',
  },
  {
    question: 'Ako si môžem poukážku objednať?',
    answer:
      'Poukážku si môžete objednať telefonicky na +421 911 992 211, emailom na info@jec.sk alebo osobne v našej klinike v Malackách.',
  },
  {
    question: 'Ako prebieha doručenie poukážky?',
    answer:
      'Poukážku si môžete vyzdvihnúť osobne v klinike alebo vám ju doručíme poštou v elegantnom balení. Možnosť expresného doručenia v Malackách a okolí.',
  },
]

export function GiftVouchersPageClient() {
  return (
    <PageBackground variant="secondary">
      <main className="min-h-screen">

      {/* Hero Section */}
      <section className="relative px-4 pb-16 pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#CDA882] to-[#B8956E] shadow-lg">
                <Gift01 className="h-8 w-8 text-white" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-brand-700 sm:text-4xl md:text-5xl">
                Darčekové poukážky
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 sm:text-xl">
                Darujte krásu, pohodu a sebadôveru. Naše darčekové poukážky sú ideálnym
                prekvapením pre vašich blízkych ku každej príležitosti.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Voucher Cards */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {voucherOptions.map((voucher) => (
                <div
                  key={voucher.id}
                  className={`group relative overflow-hidden rounded-2xl border-2 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    voucher.popular
                      ? 'border-[#CDA882] ring-2 ring-[#CDA882]/20'
                      : 'border-gray-100 hover:border-[#CDA882]/50'
                  }`}
                >
                  {/* Popular Badge */}
                  {voucher.popular && (
                    <div className="absolute -right-8 top-4 rotate-45 bg-gradient-to-r from-[#CDA882] to-[#B8956E] px-10 py-1 text-xs font-semibold text-white shadow-sm">
                      Obľúbené
                    </div>
                  )}

                  {/* Value */}
                  <div className="mb-3 text-center">
                    <span className="font-serif text-4xl font-bold text-brand-700">
                      {voucher.value}
                    </span>
                    <span className="ml-1 text-xl font-medium text-[#CDA882]">€</span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-center text-sm text-gray-500">{voucher.description}</p>

                  {/* Decorative line */}
                  <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-[#CDA882]/50 to-transparent" />

                  {/* Features */}
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <Heart className="h-3.5 w-3.5 flex-shrink-0 text-[#CDA882]" />
                      <span>Platnosť 3 mesiace</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CreditCard02 className="h-3.5 w-3.5 flex-shrink-0 text-[#CDA882]" />
                      <span>Všetky služby</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            {/* Custom Value Info */}
            <div className="mb-8 rounded-xl border border-[#CDA882]/20 bg-gradient-to-r from-[#CDA882]/5 to-brand-50/50 p-6 text-center">
              <p className="text-gray-700">
                <span className="font-semibold">Potrebujete inú hodnotu?</span> Poukážky vytvárame
                aj na mieru podľa vašich požiadaviek.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/rezervacia" color="primary" size="lg" iconLeading={Gift01}>
                Objednať poukážku
              </Button>
              <Button href="tel:+421911992211" color="secondary" size="lg">
                Zavolajte nám
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="font-serif text-2xl font-bold text-brand-700 sm:text-3xl">
                Ako to funguje?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                Objednanie darčekovej poukážky je jednoduché a rýchle
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#CDA882] to-[#B8956E] font-serif text-xl font-bold text-white shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-[#CDA882]/5 via-white to-brand-50/20 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="font-serif text-2xl font-bold text-brand-700 sm:text-3xl">
                Prečo darčeková poukážka?
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <CheckCircle className="mb-3 h-8 w-8 text-[#CDA882]" />
                <h3 className="mb-2 font-semibold text-gray-900">Univerzálny darček</h3>
                <p className="text-sm text-gray-600">
                  Obdarovaný si môže vybrať presne tú službu, ktorú chce
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <Heart className="mb-3 h-8 w-8 text-[#CDA882]" />
                <h3 className="mb-2 font-semibold text-gray-900">Osobný prístup</h3>
                <p className="text-sm text-gray-600">
                  Každá poukážka je doručená v elegantnom balení
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <CreditCard02 className="mb-3 h-8 w-8 text-[#CDA882]" />
                <h3 className="mb-2 font-semibold text-gray-900">Flexibilné použitie</h3>
                <p className="text-sm text-gray-600">
                  Platná na všetky služby estetickej medicíny a kozmetiky
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="font-serif text-2xl font-bold text-brand-700 sm:text-3xl">
                Často kladené otázky
              </h2>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="rounded-xl border border-gray-100 bg-white p-6">
                  <h3 className="mb-2 font-semibold text-gray-900">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#CDA882]/10 via-white to-brand-50/30 px-4 py-16">
        <div className="pointer-events-none absolute right-10 top-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-700 sm:text-3xl">
            Máte otázky k darčekovým poukážkam?
          </h2>
          <p className="mt-4 text-gray-600">
            Radi vám poradíme s výberom darčekovej poukážky alebo vytvoríme poukážku presne podľa
            vašich predstáv.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button href="tel:+421911992211" color="primary" size="lg" iconLeading={Phone}>
              +421 911 992 211
            </Button>
            <Button href="mailto:info@jec.sk" color="secondary" size="lg" iconLeading={Mail01}>
              info@jec.sk
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600">
            <MarkerPin01 className="h-4 w-4 text-[#CDA882]" />
            <span>Javorová 2, 901 01 Malacky</span>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Poukážky doručujeme osobne alebo poštou v elegantnom balení.
            <br />
            Možnosť vyzdvihnutia v salóne alebo expresného doručenia v Malackách a okolí.
          </p>
        </div>
      </section>
      </main>
    </PageBackground>
  )
}
