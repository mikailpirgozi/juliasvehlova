'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'

export function AboutSection(): JSX.Element {
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
    <section id="about" className="bg-gradient-to-b from-white to-neutral-cream px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left - Text Content */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-gold">
              O nás
            </p>
            <h2 className="mb-6 font-serif text-4xl font-bold text-primary">
              MUDr. Julia Svehlová
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Vítajte v Julia Estetic Clinic, kde sa krása stretáva s odbornosťou. S viac ako
                10-ročnou praxou v estetickej medicíne pomáham klientom dosiahnuť ich estetické
                ciele bezpečným a profesionálnym spôsobom.
              </p>
              <p>
                Moja filozofia je jednoduchá: prirodzené výsledky, individuálny prístup a maximálna
                bezpečnosť. Používam len certifikované produkty a najmodernejšie techniky, aby ste
                sa cítili krásne a sebavedomé.
              </p>
              <p className="font-medium text-primary">
                Vaša spokojnosť a bezpečnosť sú mojou prioritou.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/o-nas">
                <Button variant="outline" size="lg">
                  Zistiť viac o mne →
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Stats & Certificates */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-primary/20 bg-white p-6 text-center shadow-sm"
                >
                  <p className="mb-1 font-serif text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Certificates */}
            <div className="rounded-lg border border-accent-gold/20 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-serif text-xl font-bold text-primary">
                Kvalifikácie a certifikáty
              </h3>
              <ul className="space-y-3">
                {certificates.map((cert, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1 flex-shrink-0 text-accent-gold">✓</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badge */}
            <div className="rounded-lg bg-gradient-to-br from-primary/10 to-accent-gold/10 p-6 text-center">
              <p className="mb-2 text-2xl">🏆</p>
              <p className="font-medium text-gray-900">Dôveryhodný odborník</p>
              <p className="text-sm text-gray-600">
                Členom Slovenskej spoločnosti estetickej medicíny
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

