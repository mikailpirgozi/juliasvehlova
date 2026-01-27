'use client'

import { BookioWidget } from '@/components/booking'
import { Button, LinkButton } from '@/components/ui'
import { useEffect } from 'react'

export default function ReservationPage() {
  // Set document title for Client Component (metadata can't be used with 'use client')
  useEffect(() => {
    document.title = 'Rezervácia termínu - Julia Estetic Clinic'
  }, [])
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-serif text-4xl font-bold text-primary md:text-5xl">
            Rezervácia termínu
          </h1>
          <p className="text-xl text-gray-700">
            Vyberte si službu a vhodný termín. Tešíme sa na vás!
          </p>
        </div>
      </section>

      {/* Bookio Widget */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <BookioWidget />

          {/* Alternative Contact */}
          <div className="mt-12 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent-gold/5 p-8 text-center">
            <h3 className="mb-4 font-serif text-2xl font-bold text-primary">
              Potrebujete pomoc s rezerváciou?
            </h3>
            <p className="mb-6 text-gray-700">
              Ak máte problém s online rezerváciou, neváhajte nás kontaktovať priamo.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a href="tel:+421940123456">
                <Button variant="primary" size="lg">
                  📞 Zavolať: +421 940 123 456
                </Button>
              </a>
              <LinkButton href="/#kontakt" variant="outline" size="lg">
                ✉️ Kontaktný formulár
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-neutral-cream px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-primary">
            Dôležité informácie
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-3 font-medium text-gray-900">✓ Pred rezerváciou</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Vyberte si vhodnú službu</li>
                <li>• Skontrolujte dostupné termíny</li>
                <li>• Rezervujte aspoň 2 dni vopred</li>
                <li>• Vyplňte všetky potrebné údaje</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-3 font-medium text-gray-900">✓ Po rezervácii</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Dostanete potvrdzujúci email</li>
                <li>• Pripomenutie 24h pred termínom</li>
                <li>• Možnosť zrušenia/presunu termínu</li>
                <li>• Príďte 10 minút skôr</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-accent-gold/20 bg-white p-6 text-center">
            <p className="font-medium text-gray-900">📅 Storno politika</p>
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

