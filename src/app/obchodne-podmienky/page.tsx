import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obchodné podmienky | Julia Estetic Clinic',
  description:
    'Všeobecné obchodné podmienky Julia Estetic Clinic. Informácie o poskytovaní služieb, rezervácii termínov a storno politike.',
}

export default function TermsPage(): JSX.Element {
  const lastUpdated = '1. november 2025'

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-bold text-primary">Obchodné podmienky</h1>
          <p className="text-gray-600">Posledná aktualizácia: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              1. Všeobecné ustanovenia
            </h2>
            <p className="text-gray-700">
              Tieto všeobecné obchodné podmienky (ďalej len &quot;VOP&quot;) upravujú vzťah medzi
              prevádzkovateľom Julia Estetic Clinic (ďalej len &quot;poskytovateľ&quot;) a klientom pri
              poskytovaní služieb estetickej medicíny.
            </p>
            <p className="mt-4 text-gray-700">
              Návštevou našej kliniky a využitím našich služieb súhlasíte s týmito obchodnými
              podmienkami.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">2. Poskytovateľ</h2>
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
              3. Rezervácia termínu
            </h2>
            <h3 className="mb-3 font-medium text-gray-900">3.1 Spôsoby rezervácie:</h3>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
              <li>Online cez rezervačný systém Bookio</li>
              <li>Telefonicky na tel. čísle: +421 940 123 456</li>
              <li>Emailom: info@juliaesteticclinic.sk</li>
            </ul>

            <h3 className="mb-3 font-medium text-gray-900">3.2 Potvrdenie rezervácie:</h3>
            <p className="mb-4 text-gray-700">
              Po odoslaní rezervácie dostanete potvrdzujúci email. Rezervácia je platná až po našom
              potvrdení.
            </p>

            <h3 className="mb-3 font-medium text-gray-900">3.3 Rezervačný vklad:</h3>
            <p className="text-gray-700">
              Pri niektorých procedúrach môže byť vyžadovaný rezervačný vklad vo výške 30% z ceny
              služby. Vklad sa započítava do konečnej ceny.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              4. Storno podmienky
            </h2>
            <div className="rounded-lg border border-accent-gold/20 bg-accent-gold/5 p-6">
              <h3 className="mb-3 font-medium text-gray-900">Zrušenie termínu klientom:</h3>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                <li>
                  <strong>Viac ako 24 hodín vopred:</strong> Zrušenie je bezplatné
                </li>
                <li>
                  <strong>Menej ako 24 hodín vopred:</strong> Storno poplatok 50% z ceny služby
                </li>
                <li>
                  <strong>Nedostavenie sa bez ohlásenia:</strong> Storno poplatok 100% z ceny
                  služby
                </li>
              </ul>
            </div>
            <p className="mt-4 text-gray-700">
              Rozumieme, že život prináša nečakané situácie. V prípade vážnych dôvodov (choroba,
              nehoda) sme ochotní riešiť každý prípad individuálne.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              5. Ceny a platba
            </h2>
            <h3 className="mb-3 font-medium text-gray-900">5.1 Cenník:</h3>
            <p className="mb-4 text-gray-700">
              Aktuálny cenník je dostupný na našej webovej stránke a v klinike. Ceny sú uvedené v
              eurách vrátane DPH.
            </p>

            <h3 className="mb-3 font-medium text-gray-900">5.2 Spôsoby platby:</h3>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
              <li>Hotovosť</li>
              <li>Platobná karta</li>
              <li>Bankový prevod (pre firemných klientov)</li>
            </ul>

            <h3 className="mb-3 font-medium text-gray-900">5.3 Faktúra:</h3>
            <p className="text-gray-700">
              Na požiadanie vystavíme faktúru. Pre vystavenie faktúry je potrebné uviesť fakturačné
              údaje pri rezervácii.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              6. Zdravotná starostlivosť
            </h2>
            <h3 className="mb-3 font-medium text-gray-900">6.1 Konzultácia:</h3>
            <p className="mb-4 text-gray-700">
              Pred každou procedúrou prebieha bezplatná konzultácia, kde sa posúdi vhodnosť zákroku
              a riziká.
            </p>

            <h3 className="mb-3 font-medium text-gray-900">6.2 Anamnéza:</h3>
            <p className="mb-4 text-gray-700">
              Klient je povinný pravdivo informovať o svojom zdravotnom stave, alergiách a
              užívaných liekoch. Zatajenie informácií môže viesť k komplikáciám, za ktoré
              poskytovateľ nezodpovedá.
            </p>

            <h3 className="mb-3 font-medium text-gray-900">6.3 Informovaný súhlas:</h3>
            <p className="text-gray-700">
              Pred procedúrou je klient povinný podpísať informovaný súhlas s procedúrou, kde sú
              uvedené riziká a možné komplikácie.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              7. Výsledky a garancie
            </h2>
            <p className="mb-4 text-gray-700">
              Výsledky estetických procedúr sú individuálne a závisia od mnohých faktorov (vek, typ
              pokožky, životný štýl, dodržiavanie aftercare pokynov).
            </p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              <p className="font-medium text-gray-900">Dôležité upozornenie:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-700">
                <li>Nemôžeme garantovať konkrétne výsledky</li>
                <li>Každý organizmus reaguje individuálne</li>
                <li>Výsledky môžu vyžadovať viac ako jedno ošetrenie</li>
                <li>Dodržiavanie aftercare pokynov je kľúčové pre dosiahnutie optimálnych výsledkov</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">8. Komplikácie</h2>
            <p className="mb-4 text-gray-700">
              Hoci sú naše procedúry bezpečné, žiadna lekárska procedúra nie je úplne bez rizika.
              Možné komplikácie zahŕňajú:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
              <li>Opuch, modriny, červenosť (dočasné)</li>
              <li>Alergická reakcia (vzácne)</li>
              <li>Infekcia (pri nedodržaní pokynov)</li>
              <li>Asymetria (môže vyžadovať korekciu)</li>
            </ul>
            <p className="text-gray-700">
              V prípade akýchkoľvek komplikácií nás okamžite kontaktujte. Poskytneme vám
              bezplatnú aftercare podporu.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              9. Fotodokumentácia
            </h2>
            <p className="mb-4 text-gray-700">
              Fotodokumentácia slúži na evidenciu výsledkov a porovnanie stavu pred/po procedúre.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Fotografie sú súčasťou zdravotnej dokumentácie</li>
              <li>Sú chránené podľa GDPR</li>
              <li>Na zverejnenie fotografií je potrebný váš písomný súhlas</li>
              <li>Súhlas môžete kedykoľvek odvolať</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">10. Reklamácie</h2>
            <h3 className="mb-3 font-medium text-gray-900">10.1 Uplatnenie reklamácie:</h3>
            <p className="mb-4 text-gray-700">
              Reklamáciu môžete uplatniť písomne na email: info@juliaesteticclinic.sk alebo osobne
              v klinike.
            </p>

            <h3 className="mb-3 font-medium text-gray-900">10.2 Vybavenie reklamácie:</h3>
            <p className="mb-4 text-gray-700">
              Reklamáciu vybavíme do 30 dní od jej doručenia. V prípade oprávnenej reklamácie
              poskytneme nápravu v podobe korekcie alebo vrátenia čiastky.
            </p>

            <h3 className="mb-3 font-medium text-gray-900">10.3 Čo nie je dôvodom reklamácie:</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Prirodzené dočasné účinky (opuch, modriny do 14 dní)</li>
              <li>Individuálna reakcia organizmu</li>
              <li>Nedodržanie aftercare pokynov</li>
              <li>Subjektívna nespokojnosť bez objektívnej vady</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              11. Ochrana osobných údajov
            </h2>
            <p className="text-gray-700">
              Spracovanie osobných údajov je upravené v samostatnom dokumente{' '}
              <a
                href="/ochrana-udajov"
                className="text-primary underline hover:text-primary-dark"
              >
                Ochrana osobných údajov
              </a>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              12. Záverečné ustanovenia
            </h2>
            <p className="mb-4 text-gray-700">
              Tieto VOP nadobúdajú účinnosť dňom {lastUpdated} a môžu byť kedykoľvek zmenené.
              Aktuálne VOP sú vždy dostupné na našej webovej stránke.
            </p>
            <p className="mb-4 text-gray-700">
              V prípade sporov sa strany zaväzujú najskôr hľadať mimosúdne riešenie. V prípade
              súdneho sporu je príslušný súd podľa sídla poskytovateľa.
            </p>
            <p className="text-gray-700">Tieto VOP sa riadia právnym poriadkom Slovenskej republiky.</p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">13. Kontakt</h2>
            <p className="mb-4 text-gray-700">
              V prípade otázok nás neváhajte kontaktovať:
            </p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              <p className="mb-2 font-medium text-gray-900">Julia Estetic Clinic</p>
              <p className="text-gray-700">Email: info@juliaesteticclinic.sk</p>
              <p className="text-gray-700">Tel: +421 940 123 456</p>
              <p className="text-gray-700">Adresa: Malacky, Slovensko</p>
              <p className="mt-4 text-gray-700">
                Otváracie hodiny: Po-Pia 9:00-18:00, So 9:00-14:00
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

