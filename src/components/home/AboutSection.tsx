'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'

export function AboutSection() {
  const stats = [
    { value: '10+', label: 'Rokov skúseností', icon: '⏱️' },
    { value: '5000+', label: 'Spokojných klientov', icon: '⭐' },
    { value: '15+', label: 'Procedúr', icon: '✨' },
    { value: '100%', label: 'Bezpečnosť', icon: '🛡️' },
  ]

  const certificates = [
    'Certifikovaná príslušníčka v odbore estetická medicína',
    'Špecializácia na aplikáciu botulotoxínu a kyseliny hyalurónové',
    'Medzinárodné certifikáty pre permanentný make-up',
    'Pravidelné školenia a účasť na konferenciách',
  ]

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-accent-rose via-white to-neutral-cream px-4 py-20">
      {/* Decorative elements */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left - Text Content */}
          <div className="order-2 lg:order-1">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-gold">
              O nás
            </p>
            <h2 className="mb-6 font-serif text-5xl font-bold text-primary-dark">
              MUDr. Julia Svehlová
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                Vítajte v <span className="font-semibold text-primary-dark">Julia Estetic Clinic</span>, kde sa krása stretáva s odbornosťou. S viac ako
                10-ročnou praxou v estetickej medicíne pomáham klientom dosiahnuť ich estetické
                ciele bezpečným a profesionálnym spôsobom.
              </p>
              <p>
                Moja filozofia je jednoduchá: <span className="font-semibold text-primary">prirodzené výsledky</span>, individuálny prístup a maximálna
                bezpečnosť. Používam len certifikované produkty a najmodernejšie techniky, aby ste
                sa cítili krásne a sebavedomé.
              </p>
              <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent-gold/10 to-primary/10 p-6 border-l-4 border-accent-gold">
                <p className="font-semibold text-primary-dark flex items-center gap-2">
                  <span className="text-2xl">💎</span>
                  Vaša spokojnosť a bezpečnosť sú mojou prioritou.
                </p>
              </div>
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
          <div className="order-1 lg:order-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-white p-6 text-center shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-gold/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="relative z-10">
                    <p className="mb-2 text-3xl">{stat.icon}</p>
                    <p className="mb-1 font-serif text-4xl font-bold text-primary-dark">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent-gold/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            {/* Certificates */}
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-white/80 backdrop-blur-sm p-8 shadow-xl">
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent-gold to-primary" />
              
              <h3 className="mb-6 font-serif text-2xl font-bold text-primary-dark flex items-center gap-2">
                <span className="text-3xl">📜</span>
                Kvalifikácie a certifikáty
              </h3>
              <ul className="space-y-4">
                {certificates.map((cert, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent-gold/20 text-accent-gold font-bold">
                      ✓
                    </span>
                    <span className="leading-relaxed">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badge */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-accent-gold/20 to-primary-light/20 p-8 text-center shadow-lg">
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
              
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold to-primary shadow-lg">
                  <p className="text-3xl">🏆</p>
                </div>
                <p className="mb-2 font-serif text-xl font-bold text-primary-dark">
                  Dôveryhodný odborník
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  Členom Slovenskej spoločnosti estetickej medicíny
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

