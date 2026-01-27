import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obchodné podmienky | Julia Estetic Clinic',
  description:
    'Všeobecné obchodné podmienky Julia Estetic Clinic. Informácie o poskytovaní služieb, rezervácii termínov a storno politike.',
}

export default function TermsPage() {
  const lastUpdated = '1. november 2025'

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Obchodné podmienky
          </h1>
          <p className="mt-2 text-sm text-gray-500">Posledná aktualizácia: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">1. Všeobecné ustanovenia</h2>
            <p className="mt-4 text-gray-600">
              Tieto všeobecné obchodné podmienky (ďalej len &quot;VOP&quot;) upravujú vzťah medzi
              prevádzkovateľom Julia Estetic Clinic (ďalej len &quot;poskytovateľ&quot;) a klientom pri
              poskytovaní služieb estetickej medicíny.
            </p>
            <p className="mt-3 text-gray-600">
              Návštevou našej kliniky a využitím našich služieb súhlasíte s týmito obchodnými
              podmienkami.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">2. Poskytovateľ</h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="font-medium text-gray-900">MUDr. Julia Svehlová</p>
              <p className="text-sm text-gray-600">Julia Estetic Clinic</p>
              <p className="text-sm text-gray-600">Malacky, Slovensko</p>
              <p className="text-sm text-gray-600">Email: info@juliaesteticclinic.sk</p>
              <p className="text-sm text-gray-600">Tel: +421 940 123 456</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">3. Rezervácia termínu</h2>
            <h3 className="mt-4 text-base font-medium text-gray-900">3.1 Spôsoby rezervácie:</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
              <li>Online cez rezervačný systém Bookio</li>
              <li>Telefonicky na tel. čísle: +421 940 123 456</li>
              <li>Emailom: info@juliaesteticclinic.sk</li>
            </ul>

            <h3 className="mt-4 text-base font-medium text-gray-900">3.2 Potvrdenie rezervácie:</h3>
            <p className="mt-2 text-gray-600">
              Po odoslaní rezervácie dostanete potvrdzujúci email. Rezervácia je platná až po našom
              potvrdení.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">4. Storno podmienky</h2>
            <div className="mt-4 rounded-lg border border-warning-200 bg-warning-50 p-4">
              <h3 className="text-base font-medium text-warning-800">Zrušenie termínu klientom:</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-warning-700">
                <li><strong>Viac ako 24 hodín vopred:</strong> Zrušenie je bezplatné</li>
                <li><strong>Menej ako 24 hodín vopred:</strong> Storno poplatok 50% z ceny služby</li>
                <li><strong>Nedostavenie sa bez ohlásenia:</strong> Storno poplatok 100% z ceny služby</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">5. Ceny a platba</h2>
            <p className="mt-4 text-gray-600">
              Aktuálny cenník je dostupný na našej webovej stránke a v klinike. Ceny sú uvedené v
              eurách vrátane DPH.
            </p>
            <h3 className="mt-4 text-base font-medium text-gray-900">Spôsoby platby:</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
              <li>Hotovosť</li>
              <li>Platobná karta</li>
              <li>Bankový prevod (pre firemných klientov)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">6. Zdravotná starostlivosť</h2>
            <p className="mt-4 text-gray-600">
              Pred každou procedúrou prebieha bezplatná konzultácia, kde sa posúdi vhodnosť zákroku
              a riziká. Klient je povinný pravdivo informovať o svojom zdravotnom stave.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">7. Výsledky a garancie</h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Dôležité upozornenie:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                <li>Nemôžeme garantovať konkrétne výsledky</li>
                <li>Každý organizmus reaguje individuálne</li>
                <li>Výsledky môžu vyžadovať viac ako jedno ošetrenie</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900">8. Ochrana osobných údajov</h2>
            <p className="mt-4 text-gray-600">
              Spracovanie osobných údajov je upravené v samostatnom dokumente{' '}
              <a href="/ochrana-udajov" className="font-medium text-brand-600 hover:text-brand-700">
                Ochrana osobných údajov
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Kontakt</h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="font-medium text-gray-900">Julia Estetic Clinic</p>
              <p className="text-sm text-gray-600">Email: info@juliaesteticclinic.sk</p>
              <p className="text-sm text-gray-600">Tel: +421 940 123 456</p>
              <p className="text-sm text-gray-600">Adresa: Malacky, Slovensko</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
