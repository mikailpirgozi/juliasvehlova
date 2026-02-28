'use client'

import { BookioWidget } from '@/components/booking'
import { Button } from '@/components/base/buttons/button'

interface ReservationPageClientProps {
  preselectedService?: string
  preselectedCategory?: string
}

export function ReservationPageClient({ preselectedService, preselectedCategory }: ReservationPageClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20">
      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed top-20 right-10 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-[#8698a4]/10 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/15 blur-3xl" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8698a4]/15 via-white to-brand-50/30 px-4 py-16">
        <div className="pointer-events-none absolute top-10 left-10 h-32 w-32 rounded-full bg-[#8698a4]/20 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[#8698a4]/15 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#8698a4]">Rezervácia</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
            Rezervácia termínu
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Vyberte si službu a vhodný termín. Tešíme sa na vás!
          </p>
        </div>
      </section>

      {/* Bookio Widget */}
      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <BookioWidget preselectedService={preselectedService} preselectedCategory={preselectedCategory} />

          {/* Alternative Contact */}
          <div className="mt-12 rounded-2xl border border-brand-100 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Potrebujete pomoc s rezerváciou?
            </h3>
            <p className="mt-2 text-gray-600">
              Ak máte problém s online rezerváciou, neváhajte nás kontaktovať priamo.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="tel:+421911992211">
                <Button color="primary" size="md">
                  Zavolať: +421 911 992 211
                </Button>
              </a>
              <Button href="/#kontakt" color="secondary" size="md">
                Kontaktný formulár
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative z-10 overflow-hidden bg-gradient-to-br from-[#8698a4]/12 via-white to-brand-50/30 px-4 py-16">
        <div className="pointer-events-none absolute top-10 right-10 h-32 w-32 rounded-full bg-[#8698a4]/20 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#8698a4]/15 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-2xl font-bold text-brand-700">
            Dôležité informácie
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-semibold text-gray-900">Pred rezerváciou</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Vyberte si vhodnú službu</li>
                <li>• Skontrolujte dostupné termíny</li>
                <li>• Rezervujte aspoň 2 dni vopred</li>
                <li>• Vyplňte všetky potrebné údaje</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-semibold text-gray-900">Po rezervácii</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Dostanete potvrdzujúci email</li>
                <li>• Pripomenutie 24h pred termínom</li>
                <li>• Možnosť zrušenia/presunu termínu</li>
                <li>• Príďte 10 minút skôr</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-brand-100 bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm">
            <p className="font-medium text-gray-900">Storno politika</p>
            <p className="mt-2 text-sm text-gray-600">
              Termín je možné zrušiť alebo presunúť najneskôr 24 hodín vopred. Pri neskoršom zrušení
              si vyhradzujeme právo účtovať 50% z ceny služby.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
