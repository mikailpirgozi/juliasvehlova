import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov - GDPR | Julia Estetic Clinic',
  description:
    'Informácie o spracovaní osobných údajov v Julia Estetic Clinic v súlade s GDPR. Vaše súkromie je pre nás prioritou.',
}

export default function PrivacyPage(): JSX.Element {
  const lastUpdated = '1. november 2025'

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-bold text-primary">
            Ochrana osobných údajov
          </h1>
          <p className="text-gray-600">Posledná aktualizácia: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">1. Úvod</h2>
            <p className="text-gray-700">
              Julia Estetic Clinic (ďalej len &quot;my&quot;, &quot;naša klinika&quot;) berie ochranu vašich osobných
              údajov veľmi vážne. Tento dokument vás informuje o tom, ako zbierame, používame a
              chránime vaše osobné údaje v súlade s nariadením GDPR (General Data Protection
              Regulation) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              2. Prevádzkovateľ osobných údajov
            </h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <p className="mb-2 font-medium text-gray-900">MUDr. Julia Svehlová</p>
              <p className="text-gray-700">Julia Estetic Clinic</p>
              <p className="text-gray-700">Malacky, Slovensko</p>
              <p className="text-gray-700">Email: info@juliaesteticclinic.sk</p>
              <p className="text-gray-700">Tel: +421 940 123 456</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              3. Aké údaje zbierame
            </h2>
            <h3 className="mb-3 font-medium text-gray-900">3.1 Údaje pri objednávaní služby:</h3>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
              <li>Meno a priezvisko</li>
              <li>Email</li>
              <li>Telefónne číslo</li>
              <li>Informácie o požadovanej službe</li>
            </ul>

            <h3 className="mb-3 font-medium text-gray-900">3.2 Zdravotné údaje (pri liečbe):</h3>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
              <li>Anamnéza</li>
              <li>Informácie o zdravotnom stave relevantné pre procedúru</li>
              <li>Fotodokumentácia (len s vaším súhlasom)</li>
              <li>Záznamy o procedúrach</li>
            </ul>

            <h3 className="mb-3 font-medium text-gray-900">3.3 Automaticky zbierané údaje:</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>IP adresa</li>
              <li>Typ prehliadača</li>
              <li>Cookies (len s vaším súhlasom)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              4. Účel spracovania údajov
            </h2>
            <p className="mb-4 text-gray-700">Vaše osobné údaje spracovávame na tieto účely:</p>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>
                <strong>Poskytovanie zdravotnej starostlivosti</strong> - právny základ: plnenie
                zmluvy, životne dôležitý záujem
              </li>
              <li>
                <strong>Komunikácia s vami</strong> - právny základ: plnenie zmluvy, oprávnený
                záujem
              </li>
              <li>
                <strong>Spracovanie objednávok</strong> - právny základ: plnenie zmluvy
              </li>
              <li>
                <strong>Zlepšovanie služieb</strong> - právny základ: oprávnený záujem
              </li>
              <li>
                <strong>Marketing (len s vaším súhlasom)</strong> - právny základ: súhlas
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              5. Doba uchovávania údajov
            </h2>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>
                <strong>Zdravotná dokumentácia:</strong> 10 rokov (podľa zákona o zdravotnej
                starostlivosti)
              </li>
              <li>
                <strong>Kontaktné údaje:</strong> do odvolania súhlasu alebo ukončenia
                spolupráce
              </li>
              <li>
                <strong>Marketingové údaje:</strong> do odvolania súhlasu
              </li>
              <li>
                <strong>Cookies:</strong> podľa typu (session/persistent)
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">6. Vaše práva</h2>
            <p className="mb-4 text-gray-700">Máte právo:</p>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>
                <strong>Právo na prístup</strong> - získať kópiu svojich osobných údajov
              </li>
              <li>
                <strong>Právo na opravu</strong> - opraviť nesprávne údaje
              </li>
              <li>
                <strong>Právo na výmaz</strong> - požiadať o vymazanie údajov (&quot;právo byť
                zabudnutý&quot;)
              </li>
              <li>
                <strong>Právo na obmedzenie</strong> - obmedziť spracovanie vašich údajov
              </li>
              <li>
                <strong>Právo na prenosnosť</strong> - získať údaje v strojovo čitateľnom formáte
              </li>
              <li>
                <strong>Právo namietať</strong> - namietať spracovanie na základe oprávneného
                záujmu
              </li>
              <li>
                <strong>Právo odvolať súhlas</strong> - kedykoľvek odvolať udelený súhlas
              </li>
              <li>
                <strong>Právo podať sťažnosť</strong> - podať sťažnosť na Úrad na ochranu
                osobných údajov SR
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              7. Bezpečnosť údajov
            </h2>
            <p className="mb-4 text-gray-700">
              Prijali sme primerané technické a organizačné opatrenia na ochranu vašich osobných
              údajov:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Šifrovanie dát pri prenose (SSL/TLS)</li>
              <li>Zabezpečené úložiská dát</li>
              <li>Obmedzený prístup k údajom len pre oprávnené osoby</li>
              <li>Pravidelné bezpečnostné audity</li>
              <li>Školenie zamestnancov o ochrane údajov</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              8. Zdieľanie údajov s tretími stranami
            </h2>
            <p className="mb-4 text-gray-700">
              Vaše osobné údaje môžeme zdieľať s týmito stranami:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>
                <strong>Poskytovatelia IT služieb</strong> - hosting, email (Resend, Vercel)
              </li>
              <li>
                <strong>Rezervačný systém</strong> - Bookio (spracovanie rezervácií)
              </li>
              <li>
                <strong>Analytické nástroje</strong> - Google Analytics (len s vaším súhlasom)
              </li>
              <li>
                <strong>Štátne orgány</strong> - len na základe právnej povinnosti
              </li>
            </ul>
            <p className="mt-4 text-gray-700">
              Všetci naši partneri spracovávajú údaje v súlade s GDPR a máme s nimi uzavreté zmluvy
              o spracovaní osobných údajov.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">9. Cookies</h2>
            <p className="mb-4 text-gray-700">
              Naša webová stránka používa cookies na zlepšenie funkčnosti a používateľskej
              skúsenosti. Používame:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>
                <strong>Nevyhnutné cookies</strong> - potrebné pre základnú funkčnosť webu
              </li>
              <li>
                <strong>Analytické cookies</strong> - Google Analytics (len s vaším súhlasom)
              </li>
            </ul>
            <p className="mt-4 text-gray-700">
              Svoj súhlas s cookies môžete kedykoľvek odvolať v nastaveniach prehliadača.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">10. Kontakt</h2>
            <p className="mb-4 text-gray-700">
              Ak máte otázky týkajúce sa ochrany vašich osobných údajov alebo chcete uplatniť svoje
              práva, kontaktujte nás:
            </p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              <p className="mb-2 font-medium text-gray-900">MUDr. Julia Svehlová</p>
              <p className="text-gray-700">Email: info@juliaesteticclinic.sk</p>
              <p className="text-gray-700">Tel: +421 940 123 456</p>
              <p className="text-gray-700">Adresa: Malacky, Slovensko</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              11. Zmeny tohto dokumentu
            </h2>
            <p className="text-gray-700">
              Tento dokument môžeme priebežne aktualizovať. O významných zmenách vás budeme
              informovať prostredníctvom našej webovej stránky alebo emailom.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              12. Úrad na ochranu osobných údajov SR
            </h2>
            <p className="mb-4 text-gray-700">
              Ak sa domnievate, že spracovávame vaše osobné údaje v rozpore so zákonom, môžete
              podať sťažnosť na:
            </p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <p className="mb-2 font-medium text-gray-900">
                Úrad na ochranu osobných údajov Slovenskej republiky
              </p>
              <p className="text-gray-700">Hraničná 12, 820 07 Bratislava 27</p>
              <p className="text-gray-700">Email: statny.dozor@pdp.gov.sk</p>
              <p className="text-gray-700">Tel: +421 2 3231 3214</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

