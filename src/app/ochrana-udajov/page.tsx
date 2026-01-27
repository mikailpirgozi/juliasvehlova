import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov - GDPR | Julia Estetic Clinic',
  description:
    'Informácie o spracovaní osobných údajov v Julia Estetic Clinic v súlade s GDPR. Vaše súkromie je pre nás prioritou.',
}

export default function PrivacyPage() {
  const lastUpdated = '1. november 2025'

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Ochrana osobných údajov
          </h1>
          <p className="mt-2 text-sm text-gray-500">Posledná aktualizácia: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">1. Úvod</h2>
            <p className="mt-4 text-gray-600">
              Julia Estetic Clinic (ďalej len &quot;my&quot;, &quot;naša klinika&quot;) berie ochranu vašich osobných
              údajov veľmi vážne. Tento dokument vás informuje o tom, ako zbierame, používame a
              chránime vaše osobné údaje v súlade s nariadením GDPR.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">2. Prevádzkovateľ osobných údajov</h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="font-medium text-gray-900">MUDr. Julia Svehlová</p>
              <p className="text-sm text-gray-600">Julia Estetic Clinic</p>
              <p className="text-sm text-gray-600">Malacky, Slovensko</p>
              <p className="text-sm text-gray-600">Email: info@juliaesteticclinic.sk</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">3. Aké údaje zbierame</h2>
            <h3 className="mt-4 text-base font-medium text-gray-900">3.1 Údaje pri objednávaní služby:</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
              <li>Meno a priezvisko</li>
              <li>Email</li>
              <li>Telefónne číslo</li>
              <li>Informácie o požadovanej službe</li>
            </ul>

            <h3 className="mt-4 text-base font-medium text-gray-900">3.2 Zdravotné údaje:</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
              <li>Anamnéza</li>
              <li>Informácie o zdravotnom stave relevantné pre procedúru</li>
              <li>Fotodokumentácia (len s vaším súhlasom)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">4. Účel spracovania údajov</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-gray-600">
              <li><strong>Poskytovanie zdravotnej starostlivosti</strong> - právny základ: plnenie zmluvy</li>
              <li><strong>Komunikácia s vami</strong> - právny základ: oprávnený záujem</li>
              <li><strong>Spracovanie objednávok</strong> - právny základ: plnenie zmluvy</li>
              <li><strong>Marketing (len s vaším súhlasom)</strong> - právny základ: súhlas</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">5. Doba uchovávania údajov</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-gray-600">
              <li><strong>Zdravotná dokumentácia:</strong> 10 rokov (podľa zákona)</li>
              <li><strong>Kontaktné údaje:</strong> do odvolania súhlasu</li>
              <li><strong>Marketingové údaje:</strong> do odvolania súhlasu</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">6. Vaše práva</h2>
            <p className="mt-4 text-gray-600">Máte právo:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
              <li><strong>Právo na prístup</strong> - získať kópiu svojich osobných údajov</li>
              <li><strong>Právo na opravu</strong> - opraviť nesprávne údaje</li>
              <li><strong>Právo na výmaz</strong> - požiadať o vymazanie údajov</li>
              <li><strong>Právo na obmedzenie</strong> - obmedziť spracovanie vašich údajov</li>
              <li><strong>Právo odvolať súhlas</strong> - kedykoľvek odvolať udelený súhlas</li>
              <li><strong>Právo podať sťažnosť</strong> - podať sťažnosť na Úrad na ochranu osobných údajov SR</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">7. Bezpečnosť údajov</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-gray-600">
              <li>Šifrovanie dát pri prenose (SSL/TLS)</li>
              <li>Zabezpečené úložiská dát</li>
              <li>Obmedzený prístup k údajom len pre oprávnené osoby</li>
              <li>Pravidelné bezpečnostné audity</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">8. Cookies</h2>
            <p className="mt-4 text-gray-600">
              Naša webová stránka používa cookies na zlepšenie funkčnosti. Analytické cookies
              používame len s vaším súhlasom.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">9. Kontakt</h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="font-medium text-gray-900">MUDr. Julia Svehlová</p>
              <p className="text-sm text-gray-600">Email: info@juliaesteticclinic.sk</p>
              <p className="text-sm text-gray-600">Tel: +421 940 123 456</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">10. Úrad na ochranu osobných údajov SR</h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Úrad na ochranu osobných údajov Slovenskej republiky</p>
              <p className="text-sm text-gray-600">Hraničná 12, 820 07 Bratislava 27</p>
              <p className="text-sm text-gray-600">Email: statny.dozor@pdp.gov.sk</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
