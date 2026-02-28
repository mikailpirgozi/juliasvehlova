import { z } from 'zod'

// ========================================
// Zod Schemas for New Hierarchical Structure
// ========================================

// Service benefit schema
export const serviceBenefitSchema = z.object({
  icon: z.string().optional(), // Icon key for visual representation
  title: z.string().min(1),
  description: z.string().optional(),
})

// Process step schema
export const processStepSchema = z.object({
  step: z.number().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
})

export const simpleServiceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.string().min(1),
  duration: z.string().min(1),
  popular: z.boolean().optional(),
  // Rich content fields (optional, for detailed service pages)
  tagline: z.string().optional(), // Short catchy phrase
  shortDescription: z.string().optional(), // 1-2 sentence overview
  fullDescription: z.string().optional(), // Detailed description
  benefits: z.array(serviceBenefitSchema).optional(),
  process: z.array(processStepSchema).optional(),
  forWhom: z.array(z.string()).optional(), // List of who this is for
  note: z.string().optional(), // Important note or disclaimer
})

export const subcategorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  services: z.array(simpleServiceSchema),
})

export const categoryIconKeySchema = z.enum([
  'chakra',
  'eye',
  'syringe',
  'sparkle',
  'laser',
  'massage',
  'heart',
  'piercing',
  'brush',
  'tattoo',
  'crown',
])

export const mainCategorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  iconKey: categoryIconKeySchema,
  image: z.string().min(1),
  imagePosition: z.string().optional(),
  subcategories: z.array(subcategorySchema).optional(),
  services: z.array(simpleServiceSchema).optional(),
})

// ========================================
// TypeScript Types
// ========================================

export type ServiceBenefit = z.infer<typeof serviceBenefitSchema>
export type ProcessStep = z.infer<typeof processStepSchema>
export type SimpleService = z.infer<typeof simpleServiceSchema>
export type Subcategory = z.infer<typeof subcategorySchema>
export type CategoryIconKey = z.infer<typeof categoryIconKeySchema>
export type MainCategory = z.infer<typeof mainCategorySchema>

// ========================================
// Main Categories Data
// ========================================

export const mainCategories: MainCategory[] = [
  // ========================================
  // 1. ESTETICKÁ MEDICÍNA
  // ========================================
  {
    id: 'esteticka-medicina',
    slug: 'esteticka-medicina',
    title: 'Estetická medicína',
    description: 'Profesionálne estetické zákroky vrátane botulotoxínu, výplní kyselinou hyalurónovou a liftingových nití.',
    iconKey: 'syringe',
    image: '/images/services/biorevitalizacia-pleti.webp',
    subcategories: [
      {
        id: 'biorevitalizacia',
        slug: 'biorevitalizacia-pleti',
        title: 'Biorevitalizácia pleti',
        description: 'Hlboká hydratácia a revitalizácia pokožky pre mladistvý vzhľad.',
        services: [
          {
            id: 'aquashine-ptx',
            slug: 'aquashine-ptx',
            name: 'Aquashine PTx',
            price: '250 €',
            duration: '20min.',
            tagline: 'Hlboká hydratácia pokožky',
            shortDescription: 'Prémiový biorevitalizačný prípravok s peptidmi pre intenzívnu hydratáciu a regeneráciu pleti.',
            benefits: [
              { icon: 'hydration', title: 'Intenzívna hydratácia', description: 'Hlboké zvlhčenie pokožky' },
              { icon: 'glow', title: 'Žiarivá pleť', description: 'Zdravý, svieži vzhľad' },
              { icon: 'antiaging', title: 'Anti-aging efekt', description: 'Redukcia jemných vrások' },
            ],
            forWhom: ['Pre dehydratovanú pleť', 'Pre prvé známky starnutia', 'Pre unavenú pleť'],
          },
          {
            id: 'dermaheal',
            slug: 'dermaheal',
            name: 'Dermaheal',
            price: '250 €',
            duration: '20min.',
            tagline: 'Revitalizácia a regenerácia',
            shortDescription: 'Kórejský biorevitalizačný prípravok s rastovými faktormi pre obnovu pokožky.',
            benefits: [
              { icon: 'regeneration', title: 'Regenerácia', description: 'Obnova buniek pokožky' },
              { icon: 'elasticity', title: 'Elasticita', description: 'Spevnenie pleti' },
              { icon: 'texture', title: 'Zlepšená textúra', description: 'Jemnejšia pokožka' },
            ],
            forWhom: ['Pre zrelú pleť', 'Pre stratu elasticity', 'Pre regeneráciu po zákrokoch'],
          },
          {
            id: 'jalupro',
            slug: 'kolagenovy-booster-jalupro',
            name: 'Kolagénový booster JALUPRO',
            price: '350 €',
            duration: '15min.',
            popular: true,
            tagline: 'Stimulácia tvorby kolagénu',
            shortDescription: 'Prémiový kolagénový booster pre obnovu mladistvej štruktúry pokožky zvnútra.',
            fullDescription: 'JALUPRO je jedinečný bioremodeling prípravok, ktorý stimuluje prirodzenú tvorbu kolagénu a elastínu. Na rozdiel od bežných výplní, JALUPRO pracuje na bunkovej úrovni a obnovuje kvalitu pokožky zvnútra. Výsledkom je prirodzene omladzená, pevnejšia a žiarivejšia pleť.',
            benefits: [
              { icon: 'collagen', title: 'Tvorba kolagénu', description: 'Stimulácia vlastnej produkcie' },
              { icon: 'firmness', title: 'Spevnenie pleti', description: 'Výrazne pevnejšia pokožka' },
              { icon: 'youthful', title: 'Omladenie', description: 'Prirodzený anti-aging efekt' },
              { icon: 'lasting', title: 'Dlhodobý efekt', description: 'Výsledky až 6 mesiacov' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Analýza stavu pokožky' },
              { step: 2, title: 'Príprava', description: 'Očistenie a dezinfekcia' },
              { step: 3, title: 'Aplikácia', description: 'Presná injekcia prípravku' },
              { step: 4, title: 'Starostlivosť', description: 'Inštrukcie po zákroku' },
            ],
            forWhom: ['Pre stratu objemu tváre', 'Pre povädnutú pleť', 'Pre prevenciu starnutia'],
            note: 'Odporúčame sériu 3 ošetrení v intervale 3-4 týždňov.',
          },
          {
            id: 'salmon-sperm-oci',
            slug: 'omladenie-ocneho-okolia-salmon-sperm',
            name: 'Omladenie očného okolia salmon sperm',
            price: '280 €',
            duration: '30min.',
            tagline: 'Luxusná starostlivosť o očné okolie',
            shortDescription: 'Inovatívne ošetrenie s polynukleotidmi pre dramatické omladenie citlivého očného okolia.',
            benefits: [
              { icon: 'eye', title: 'Redukcia vrások', description: 'Vyhladenie očného okolia' },
              { icon: 'brightening', title: 'Rozjasnenie', description: 'Redukcia tmavých kruhov' },
              { icon: 'hydration', title: 'Hydratácia', description: 'Hlboké zvlhčenie' },
            ],
            forWhom: ['Pre tmavé kruhy pod očami', 'Pre vrásky okolo očí', 'Pre unavený vzhľad'],
          },
          {
            id: 'profhilo',
            slug: 'profhilo-tvar',
            name: 'Profhilo tvár',
            price: '350 €',
            duration: '20min.',
            popular: true,
            tagline: 'Revolúcia v bioremodellingu',
            shortDescription: 'Najčistejšia forma kyseliny hyalurónovej pre prirodzené omladenie a hydratáciu celej tváre.',
            fullDescription: 'Profhilo je prelomový prípravok, ktorý obsahuje najvyššiu koncentráciu čistej kyseliny hyalurónovej na trhu. Neplní vrásky ako klasické výplne, ale šíri sa pod pokožkou a stimuluje tvorbu kolagénu a elastínu. Výsledkom je prirodzene omladená, hydratovaná a žiarivá pleť.',
            benefits: [
              { icon: 'purity', title: 'Najčistejšia HA', description: 'Bez prídavných látok' },
              { icon: 'natural', title: 'Prirodzený výsledok', description: 'Žiadny objemový efekt' },
              { icon: 'bioremodeling', title: 'Bioremodeling', description: 'Obnova kvality pokožky' },
              { icon: 'minimal', title: 'Minimálny downtime', description: 'Rýchle zotavenie' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Posúdenie stavu pokožky' },
              { step: 2, title: 'Aplikácia', description: '5 bodová BAP technika' },
              { step: 3, title: 'Masáž', description: 'Rozptýlenie prípravku' },
            ],
            forWhom: ['Pre stratu hydratácie', 'Pre povädnutú pleť', 'Pre komplexné omladenie'],
            note: 'Optimálne výsledky po 2 ošetreniach v rozostupe 4 týždňov.',
          },
          {
            id: 'rrs-ha',
            slug: 'rrs-ha-long-lasting',
            name: 'RRS HA Long Lasting',
            price: '300 €',
            duration: '20min.',
            tagline: 'Dlhotrvajúca hydratácia',
            shortDescription: 'Biorevitalizačný koktail s predĺženým účinkom pre náročnejšiu pleť.',
          },
          {
            id: 'revitrane',
            slug: 'revitrane',
            name: 'Revitrane',
            price: '280 €',
            duration: '20min.',
            tagline: 'Intenzívna obnova pleti',
            shortDescription: 'Revitalizačné ošetrenie pre obnovu unavej a stresovanej pokožky.',
          },
          {
            id: 'sisthaema',
            slug: 'sisthaema-hevo-t',
            name: 'Sisthaema Hevo T',
            price: '350 €',
            duration: '20min.',
            tagline: 'Prémiový anti-aging',
            shortDescription: 'Špičkový prípravok pre komplexnú regeneráciu a omladenie pleti.',
          },
          {
            id: 'skin-booster-teosyal',
            slug: 'skin-booster-teosyal',
            name: 'Skin booster Teosyal',
            price: '300 €',
            duration: '20min.',
            tagline: 'Švajčiarska kvalita',
            shortDescription: 'Prémiový skin booster od Teosyal pre hlbokú hydratáciu a žiarivosť.',
          },
        ],
      },
      {
        id: 'botulotoxin',
        slug: 'botulotoxin',
        title: 'Botulotoxín',
        description: 'Redukcia vrások a jemných línií s prírodzeným výsledkom.',
        services: [
          {
            id: 'botox-baby',
            slug: 'botulotoxin-baby-botox',
            name: 'Botulotoxin - Baby botox (1 lokalita)',
            price: '70 €',
            duration: '10min.',
            tagline: 'Jemný preventívny botox',
            shortDescription: 'Menšia dávka botoxu pre jemný, prirodzený efekt a prevenciu vrások.',
            benefits: [
              { icon: 'subtle', title: 'Jemný efekt', description: 'Prirodzená mimika' },
              { icon: 'prevention', title: 'Prevencia', description: 'Zastavenie vzniku vrások' },
              { icon: 'affordable', title: 'Dostupné', description: 'Ideálne na vyskúšanie' },
            ],
            forWhom: ['Pre mladšiu pleť', 'Pre prevenciu', 'Pre prvé skúsenosti s botoxom'],
          },
          {
            id: 'botox-barbie',
            slug: 'botulotoxin-barbie-botox',
            name: 'Botulotoxin - Barbie Botox',
            price: '300 €',
            duration: '10min.',
            tagline: 'Elegantný, štíhly krk',
            shortDescription: 'Aplikácia do trapézových svalov pre elegantnejší vzhľad krku a ramien.',
            benefits: [
              { icon: 'silhouette', title: 'Štíhlejší siluet', description: 'Opticky dlhší krk' },
              { icon: 'elegance', title: 'Elegancia', description: 'Jemnejšie ramená' },
              { icon: 'tension', title: 'Uvoľnenie', description: 'Redukcia napätia' },
            ],
            forWhom: ['Pre výrazné trapézy', 'Pre napätie v ramenách', 'Pre eleganciu'],
          },
          {
            id: 'botox-bunny',
            slug: 'botulotoxin-bunny-smile',
            name: 'Botulotoxin - Bunny smile',
            price: '90 €',
            duration: '10min.',
            tagline: 'Korekcia nosa pri úsmeve',
            shortDescription: 'Odstránenie vrások na nose, ktoré vznikajú pri úsmeve.',
          },
          {
            id: 'botox-fullface',
            slug: 'botulotoxin-fullface',
            name: 'Botulotoxin - Fullface',
            price: '450 €',
            duration: '15min.',
            popular: true,
            tagline: 'Komplexné omladenie tváre',
            shortDescription: 'Kompletné ošetrenie celej tváre botulotoxínom pre maximálny anti-aging efekt.',
            fullDescription: 'Fullface botox je komplexné ošetrenie, ktoré adresuje všetky mimické vrásky na tvári vrátane čela, glabely, očného okolia a ďalších oblastí. Výsledkom je výrazne omladená, odpočinutá a sviežia tvár pri zachovaní prirodzenej mimiky.',
            benefits: [
              { icon: 'complete', title: 'Kompletné riešenie', description: 'Celá tvár v jednom sedení' },
              { icon: 'rejuvenation', title: 'Dramatické omladenie', description: 'Viditeľné výsledky' },
              { icon: 'harmonious', title: 'Harmonický výsledok', description: 'Vyvážený efekt' },
              { icon: 'value', title: 'Výhodnejšia cena', description: 'Ušetríte oproti jednotlivým' },
            ],
            process: [
              { step: 1, title: 'Analýza', description: 'Mapovanie mimických vrások' },
              { step: 2, title: 'Plán', description: 'Určenie dávok a bodov' },
              { step: 3, title: 'Aplikácia', description: 'Precízna injekcia' },
              { step: 4, title: 'Kontrola', description: 'Po 2 týždňoch' },
            ],
            forWhom: ['Pre komplexné omladenie', 'Pre výrazné mimické vrásky', 'Pre maximálny efekt'],
            note: 'Efekt sa plne prejaví do 14 dní.',
          },
          {
            id: 'botox-fullface-krk',
            slug: 'botulotoxin-fullface-krk',
            name: 'Botulotoxin - Fullface + krk',
            price: '450 €',
            duration: '15min.',
            tagline: 'Tvár aj krk v harmónii',
            shortDescription: 'Rozšírené fullface ošetrenie vrátane krku pre kompletný anti-aging efekt.',
          },
          {
            id: 'botox-glabela',
            slug: 'botulotoxin-glabela',
            name: 'Botulotoxin - Glabela',
            price: '100 €',
            duration: '10min.',
            tagline: 'Zbavte sa zamračeného výrazu',
            shortDescription: 'Odstránenie zvislých vrások medzi obočím pre priateľnejší výraz.',
          },
          {
            id: 'botox-gummy',
            slug: 'botulotoxin-gummy-smile',
            name: 'Botulotoxin - Gummy smile',
            price: '90 €',
            duration: '10min.',
            tagline: 'Korekcia ďasnového úsmevu',
            shortDescription: 'Redukcia viditeľnosti ďasien pri úsmeve pre krajší úsmev.',
          },
          {
            id: 'botox-komplet',
            slug: 'botulotoxin-komplet',
            name: 'Botulotoxin - Komplet (čelo, očné okolie, glabela)',
            price: '280 €',
            duration: '10min.',
            popular: true,
            tagline: 'Najobľúbenejšie ošetrenie',
            shortDescription: 'Najpopulárnejšia kombinácia troch kľúčových zón pre viditeľné omladenie.',
            fullDescription: 'Kompletné ošetrenie zahŕňa tri najčastejšie ošetrované zóny: čelo, glabelu (vrásky medzi obočím) a očné okolie (vrásky okolo očí). Táto kombinácia poskytuje harmonický, vyvážený výsledok a je ideálna pre väčšinu klientov.',
            benefits: [
              { icon: 'popular', title: 'Najobľúbenejšie', description: 'Overená kombinácia' },
              { icon: 'balanced', title: 'Vyvážený efekt', description: 'Harmonické omladenie' },
              { icon: 'value', title: 'Výhodná cena', description: '3 zóny za lepšiu cenu' },
              { icon: 'natural', title: 'Prirodzený výsledok', description: 'Zachovaná mimika' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Analýza vrások' },
              { step: 2, title: 'Aplikácia', description: 'Precízna injekcia do 3 zón' },
              { step: 3, title: 'Kontrola', description: 'Overenie výsledku po 2 týždňoch' },
            ],
            forWhom: ['Pre vrásky na čele', 'Pre vrásky okolo očí', 'Pre zamračený výraz'],
            note: 'Najpredávanejšie botoxové ošetrenie.',
          },
          {
            id: 'botox-nohy',
            slug: 'botulotoxin-nohy-hyperhidroza',
            name: 'Botulotoxin - Nohy pri hyperhydróze (nadmerné potenie)',
            price: '350 €',
            duration: '20min.',
            tagline: 'Koniec nadmernému poteniu nôh',
            shortDescription: 'Efektívne riešenie nadmerného potenia nôh pomocou botulotoxínu.',
          },
          {
            id: 'botox-oci',
            slug: 'botulotoxin-ocne-okolie',
            name: 'Botulotoxin - Očné okolie',
            price: '100 €',
            duration: '10min.',
            tagline: 'Vyhladenie vraňích nôžok',
            shortDescription: 'Odstránenie vrások v oblasti očného okolia pre mladší pohľad.',
          },
          {
            id: 'botox-podpazusie',
            slug: 'botulotoxin-podpazusie-hyperhidroza',
            name: 'Botulotoxin - Podpazušíe pri hyperhydróze (nadmerné potenie)',
            price: '300 €',
            duration: '20min.',
            tagline: 'Sloboda od potenia',
            shortDescription: 'Efektívne riešenie nadmerného potenia v podpazuší na 6-12 mesiacov.',
            benefits: [
              { icon: 'freedom', title: 'Sloboda', description: 'Koniec škvrná a zápachu' },
              { icon: 'confidence', title: 'Sebavedomie', description: 'Bez obáv z potenia' },
              { icon: 'lasting', title: 'Dlhodobý efekt', description: '6-12 mesiacov' },
            ],
            forWhom: ['Pre nadmerné potenie', 'Pre sociálny komfort', 'Pre šport a aktivity'],
          },
          {
            id: 'botox-ruky',
            slug: 'botulotoxin-ruky-hyperhidroza',
            name: 'Botulotoxin - Ruky pri hyperhydróze (nadmerné potenie)',
            price: '250 €',
            duration: '20min.',
            tagline: 'Suché a sebaisté ruky',
            shortDescription: 'Riešenie nadmerného potenia rúk pre pohodlnejší každodenný život.',
          },
          {
            id: 'botox-celo',
            slug: 'botulotoxin-celo',
            name: 'Botulotoxin - Čelo',
            price: '100 €',
            duration: '10min.',
            tagline: 'Hladké čelo bez vrások',
            shortDescription: 'Odstránenie horizontálnych vrások na čele pre mladší vzhľad.',
          },
        ],
      },
      {
        id: 'injekcna-lipolyza',
        slug: 'injekcna-lipolyza',
        title: 'Injekčná lipolýza',
        description: 'Neinvazívna redukcia tukových buniek v problémových oblastiach.',
        image: '/images/services/injekcna-lipolyza-hero.png',
        services: [
          {
            id: 'lipolyza-zona',
            slug: 'injekcna-lipolyza-jedna-zona',
            name: 'Injekčná lipolýza - Jedna zóna 1ml (brucho, boky, stehná, kolená)',
            price: '100 €',
            duration: '10min.',
            tagline: 'Cielená redukcia tuku',
            shortDescription: 'Neinvazívne odstránenie lokalizovaného tuku v problémových partiách.',
            benefits: [
              { icon: 'targeted', title: 'Cielené', description: 'Presne kde potrebujete' },
              { icon: 'noninvasive', title: 'Neinvazívne', description: 'Bez chirurgie' },
              { icon: 'permanent', title: 'Trvalý efekt', description: 'Tukové bunky sa nevrátia' },
            ],
            forWhom: ['Pre lokalizované tukové vankúšiky', 'Pre odolný tuk', 'Pre konturovanie tela'],
          },
          {
            id: 'lipolyza-podbradok',
            slug: 'injekcna-lipolyza-podbradok',
            name: 'Injekčná lipolýza - Podbradok',
            price: '150 €',
            duration: '10min.',
            popular: true,
            tagline: 'Zbohom dvojitá brada',
            shortDescription: 'Nechirurgické odstránenie dvojitej brady pre definovanejšiu kontúru tváre.',
            fullDescription: 'Injekčná lipolýza podbradku je revolučná metóda pre odstránenie dvojitej brady bez chirurgického zákroku. Špeciálny prípravok rozpúšťa tukové bunky, ktoré telo prirodzene vylúči. Výsledkom je výrazne definovanejšia línia čeľuste a štíhlejší profil.',
            benefits: [
              { icon: 'definition', title: 'Definovaná čeľusť', description: 'Ostrejšia línia' },
              { icon: 'profile', title: 'Krajší profil', description: 'Štíhlejší vzhľad' },
              { icon: 'noninvasive', title: 'Bez chirurgie', description: 'Minimálny downtime' },
              { icon: 'permanent', title: 'Trvalý výsledok', description: 'Bunky sa nevrátia' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Posúdenie oblasti' },
              { step: 2, title: 'Označenie', description: 'Mapovanie injekčných bodov' },
              { step: 3, title: 'Aplikácia', description: 'Injekcia prípravku' },
              { step: 4, title: 'Monitoring', description: 'Sledovanie výsledkov' },
            ],
            forWhom: ['Pre dvojitú bradu', 'Pre plný podbradok', 'Pre definovanejší profil'],
            note: 'Zvyčajne sú potrebné 2-4 ošetrenia v intervale 6-8 týždňov.',
          },
        ],
      },
      {
        id: 'konzultacia-esteticka',
        slug: 'konzultacia',
        title: 'Konzultácia',
        description: 'Odborná konzultácia estetických zákrokov s našimi špecialistami.',
        image: '/images/services/esteticka-konzultacia-hero.png',
        services: [
          {
            id: 'konzultacia-estetickych-zakrokov',
            slug: 'konzultacia-estetickych-zakrokov',
            name: 'Konzultácia estetických zákrokov',
            price: '30 €',
            duration: '15min.',
            tagline: 'Váš prvý krok k zmene',
            shortDescription: 'Odborná konzultácia pre výber ideálneho ošetrenia podľa vašich potrieb a cieľov.',
            benefits: [
              { icon: 'expert', title: 'Odborné poradenstvo', description: 'Skúsení špecialisti' },
              { icon: 'personalized', title: 'Individuálny prístup', description: 'Riešenia na mieru' },
              { icon: 'honest', title: 'Úprimné hodnotenie', description: 'Reálne očakávania' },
            ],
            forWhom: ['Pre prvú návštevu', 'Pre plánovanie zákrokov', 'Pre otázky a obavy'],
          },
        ],
      },
      {
        id: 'liftingove-nite',
        slug: 'liftingove-nite',
        title: 'Liftingové nite',
        description: 'Nechirurgický lifting tváre pomocou resorbovateľných nití.',
        image: '/images/services/liftingove-nite.webp',
        services: [
          {
            id: 'aptos-nite',
            slug: 'aptos-vysoko-liftingove-nite',
            name: 'APTOS (vysoko liftingové nite) 1ks',
            price: 'od 100 €',
            duration: '20min.',
            popular: true,
            tagline: 'Nechirurgický facelift',
            shortDescription: 'Prémiové liftingové nite pre výrazné zdvihnutie a spevnenie pokožky bez operácie.',
            fullDescription: 'APTOS nite sú špičkové liftingové nite s háčikmi, ktoré poskytujú okamžitý a výrazný liftingový efekt. Nite sa zavádzajú pod pokožku, kde mechanicky zdvíhajú a fixujú povädnuté tkanivo. Zároveň stimulujú tvorbu kolagénu pre dlhodobé výsledky.',
            benefits: [
              { icon: 'immediate', title: 'Okamžitý efekt', description: 'Viditeľný lifting ihneď' },
              { icon: 'noninvasive', title: 'Bez operácie', description: 'Minimálny zásah' },
              { icon: 'collagen', title: 'Tvorba kolagénu', description: 'Dlhodobé zlepšenie' },
              { icon: 'lasting', title: 'Výdrž 1-2 roky', description: 'Postupné rozloženie nití' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Plán ošetrenia' },
              { step: 2, title: 'Znecitlivenie', description: 'Lokálna anestézia' },
              { step: 3, title: 'Zavedenie', description: 'Presná implantácia nití' },
              { step: 4, title: 'Modelovanie', description: 'Tvarovanie a fixácia' },
            ],
            forWhom: ['Pre povädnutú pokožku', 'Pre poklesnuté kontúry', 'Pre alternatívu k operácii'],
            note: 'Počet nití sa určuje individuálne podľa potreby.',
          },
          {
            id: 'mononite',
            slug: 'mononite-spevnovacie',
            name: 'Mononite (hladké, spevňovacie nite) 1ks',
            price: 'od 50 €',
            duration: '30min.',
            tagline: 'Jemné spevnenie pokožky',
            shortDescription: 'Hladké nite pre postupné spevnenie a zlepšenie kvality pokožky.',
            benefits: [
              { icon: 'gentle', title: 'Jemný efekt', description: 'Postupné zlepšenie' },
              { icon: 'collagen', title: 'Stimulácia kolagénu', description: 'Prirodzená obnova' },
              { icon: 'texture', title: 'Lepšia textúra', description: 'Kvalitnejšia pokožka' },
            ],
            forWhom: ['Pre jemné spevnenie', 'Pre zlepšenie kvality pleti', 'Pre kombinovanie s inými procedúrami'],
          },
        ],
      },
      {
        id: 'vyplne-kh',
        slug: 'vyplne-kyselinou-hyaluronovou',
        title: 'Výplne kyselinou hyalurónovou',
        description: 'Modelovanie a zväčšovanie pomocou kvalitných výplní na báze kyseliny hyalurónové.',
        image: '/images/services/vyplne-kyselinou-hyaluronovou-hero.png',
        services: [
          {
            id: 'brazilsky-zadocek',
            slug: 'brazilsky-zadocek-kh',
            name: 'Brazílsky zadoček KH',
            price: '800 €',
            duration: '1h',
            tagline: 'Tvarovaný zadoček bez chirurgie',
            shortDescription: 'Nechirurgické zväčšenie a tvarovanie zadočku pomocou kyseliny hyalurónovej.',
          },
          {
            id: 'modelacia-sanky-komplet',
            slug: 'kompletna-modelacia-sanky-kh',
            name: 'Kompletná modelacia sánky KH',
            price: '850 €',
            duration: '20min.',
            tagline: 'Definovaná línia čeľuste',
            shortDescription: 'Kompletná modelácia sánky pre výraznejšiu a definovanejšiu kontúru tváre.',
          },
          {
            id: 'modelacia-brady',
            slug: 'modelacia-brady-kh',
            name: 'Modelácia brady KH 1ml',
            price: '200 €',
            duration: '20min.',
            tagline: 'Harmonická brada',
            shortDescription: 'Korekcia tvaru a veľkosti brady pre vyvážený profil tváre.',
          },
          {
            id: 'modelacia-lic',
            slug: 'modelacia-lic-kh',
            name: 'Modelácia líc KH 1ml',
            price: '200 €',
            duration: '20min.',
            tagline: 'Zvýraznené lícne kosti',
            shortDescription: 'Doplnenie objemu líc pre mladistvejší a definovanejší vzhľad.',
          },
          {
            id: 'modelacia-nosa',
            slug: 'modelacia-nosa-kh',
            name: 'Modelácia nosa KH 1ml',
            price: '200 €',
            duration: '20min.',
            tagline: 'Korekcia bez operácie',
            shortDescription: 'Neinvazívna korekcia tvaru nosa bez chirurgického zákroku.',
          },
          {
            id: 'modelacia-sanky',
            slug: 'modelacia-sanky-kh',
            name: 'Modelácia sánky KH 1ml',
            price: '200 €',
            duration: '20min.',
            tagline: 'Ostrejšia línia sánky',
            shortDescription: 'Definovanie línie sánky pre výraznejší a mladistvejší vzhľad.',
          },
          {
            id: 'rozpustenie-kh',
            slug: 'rozpustenie-kh-pery',
            name: 'Rozpustenie KH pery (Hyláza)',
            price: '100 €',
            duration: '10min.',
            tagline: 'Korekcia nechcených výplní',
            shortDescription: 'Bezpečné rozpustenie predchádzajúcich výplní kyseliny hyalurónovej.',
          },
          {
            id: 'vypln-glabela',
            slug: 'vypln-glabela-kh',
            name: 'Výplň glabela KH 1ml',
            price: '200 €',
            duration: '15min.',
          },
          {
            id: 'vypln-kutiky',
            slug: 'vypln-kutiky-ust-kh',
            name: 'Výplň kútiky úst KH 1ml',
            price: '200 €',
            duration: '15min.',
          },
          {
            id: 'vypln-nasolabialnych',
            slug: 'vypln-nasolabialnych-ryh-kh',
            name: 'Výplň nasolabiálnych rýh KH 1ml',
            price: '200 €',
            duration: '15min.',
          },
          {
            id: 'zvacsenie-pier-kh',
            slug: 'zvacsenie-pier-kh',
            name: 'Zväčšenie pier KH 1ml',
            price: '220 €',
            duration: '20min.',
            popular: true,
            tagline: 'Plnšie pery, krajší úsmev',
            shortDescription: 'Profesionálne zväčšenie pier kvalitnou kyselinou hyalurónovou pre prirodzený, zmyselný výsledok.',
            fullDescription: 'Zväčšenie pier je jedným z najpopulárnejších estetických zákrokov. Používame kvalitné výplne na báze kyseliny hyalurónovej, ktoré dodajú vašim perám objem, definíciu a hydratáciu. Výsledok je prispôsobený vašim želaniam - od jemného zväčšenia po dramatickejší efekt.',
            benefits: [
              { icon: 'volume', title: 'Väčší objem', description: 'Plnšie, zmyselnejšie pery' },
              { icon: 'shape', title: 'Dokonalý tvar', description: 'Symetria a definícia' },
              { icon: 'hydration', title: 'Hydratácia', description: 'Mäkké, vláčne pery' },
              { icon: 'natural', title: 'Prirodzený výsledok', description: 'Prispôsobené vám' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Výber štýlu a objemu' },
              { step: 2, title: 'Znecitlivenie', description: 'Aplikácia anestetika' },
              { step: 3, title: 'Injekcia', description: 'Precízna aplikácia výplne' },
              { step: 4, title: 'Modelovanie', description: 'Tvarovanie a masáž' },
            ],
            forWhom: ['Pre tenké pery', 'Pre asymetrické pery', 'Pre stratu objemu s vekom'],
            note: 'Výsledok sa ustáli do 2 týždňov. Efekt trvá 6-12 mesiacov.',
          },
          {
            id: 'zvacsenie-pier-juvederm',
            slug: 'zvacsenie-pier-juvederm',
            name: 'Zväčšenie pier kyselina Juvederm 1 ml',
            price: '350 €',
            duration: '20min.',
            popular: true,
            tagline: 'Prémiová kvalita od Juvederm',
            shortDescription: 'Luxusné zväčšenie pier s prémiovou kyselinou Juvederm pre najdlhšiu výdrž.',
            fullDescription: 'Juvederm je svetovo uznávaná prémiová značka výplní od Allergan. Špeciálna technológia VYCROSS zaručuje hladký, prirodzený výsledok a dlhú výdrž. Juvederm pery sú mäkké, prirodzené a krásne až 12-18 mesiacov.',
            benefits: [
              { icon: 'premium', title: 'Prémiová kvalita', description: 'Svetová značka' },
              { icon: 'lasting', title: 'Dlhá výdrž', description: '12-18 mesiacov' },
              { icon: 'smooth', title: 'Hladký výsledok', description: 'VYCROSS technológia' },
              { icon: 'safe', title: 'Bezpečné', description: 'FDA schválené' },
            ],
            forWhom: ['Pre dlhodobý efekt', 'Pre náročných klientov', 'Pre maximálnu kvalitu'],
          },
          {
            id: 'zvacsenie-pier-restylane',
            slug: 'zvacsenie-pier-restylane-teosyal',
            name: 'Zväčšenie pier kyselina Restylane/Teosyal 1 ml',
            price: '300 €',
            duration: '20min.',
            tagline: 'Švajčiarska a švédska precíznosť',
            shortDescription: 'Kvalitné zväčšenie pier s prémiovými európskymi výplňami Restylane alebo Teosyal.',
            benefits: [
              { icon: 'quality', title: 'Európska kvalita', description: 'Švajčiarsko/Švédsko' },
              { icon: 'natural', title: 'Prirodzený efekt', description: 'Jemný, mäkký výsledok' },
              { icon: 'lasting', title: 'Výdrž 9-12 mesiacov', description: 'Dlhodobý efekt' },
            ],
          },
          {
            id: 'zvacsenie-pier-stylage',
            slug: 'zvacsenie-pier-stylage',
            name: 'Zväčšenie pier kyselina Stylage 1ml',
            price: '280 €',
            duration: '20min.',
            tagline: 'Francúzska elegancia',
            shortDescription: 'Zväčšenie pier s francúzskou kyselinou Stylage s antioxidantmi.',
            benefits: [
              { icon: 'antioxidant', title: 'S antioxidantmi', description: 'Mannitol pre dlhšiu výdrž' },
              { icon: 'soft', title: 'Mäkký výsledok', description: 'Prirodzený pocit' },
              { icon: 'value', title: 'Výhodná voľba', description: 'Kvalita za rozumnú cenu' },
            ],
          },
        ],
      },
    ],
  },

  // ========================================
  // 2. KOZMETIKA
  // ========================================
  {
    id: 'kozmetika',
    slug: 'kozmetika',
    title: 'Kozmetika',
    description: 'Profesionálne kozmetické ošetrenia pre zdravú a žiarivú pokožku.',
    iconKey: 'sparkle',
    image: '/images/services/kozmeticke-osetrenia.webp',
    subcategories: [
      {
        id: 'konzultacia-kozmeticka',
        slug: 'konzultacia',
        title: 'Konzultácia',
        description: 'Odborná konzultácia kozmetických ošetrení.',
        image: '/images/services/kozmetika-konzultacia-hero.png',
        services: [
          {
            id: 'konzultacia-kozmetickych-osetreni',
            slug: 'konzultacia-kozmetickych-osetreni',
            name: 'Konzultácia kozmetických ošetrení',
            price: '30 €',
            duration: '15min.',
            tagline: 'Prvý krok k zdravej pleti',
            shortDescription: 'Profesionálna analýza pleti a odporúčanie vhodných ošetrení pre vaše potreby.',
            benefits: [
              { icon: 'analysis', title: 'Analýza pleti', description: 'Detailné posúdenie stavu' },
              { icon: 'plan', title: 'Plán starostlivosti', description: 'Na mieru pre vás' },
              { icon: 'advice', title: 'Odborné rady', description: 'Domáca starostlivosť' },
            ],
          },
        ],
      },
      {
        id: 'kozmeticke-osetrenia',
        slug: 'kozmeticke-osetrenia',
        title: 'Kozmetické ošetrenia',
        description: 'Komplexné kozmetické ošetrenia pre všetky typy pleti.',
        image: '/images/services/kozmeticke-osetrenia-hero.png',
        services: [
          {
            id: 'age-element-maska',
            slug: 'age-element-alginatova-maska',
            name: 'Age element alginatova maska',
            price: '25 €',
            duration: '15min.',
            tagline: 'Okamžitý lifting efekt',
            shortDescription: 'Alginátová maska s anti-aging účinkami pre okamžité spevnenie a hydratáciu.',
          },
          {
            id: 'global-eyecon',
            slug: 'global-eyecon',
            name: 'Global Eyecon',
            price: '130 €',
            duration: '30min.',
            tagline: 'Luxusná starostlivosť o oči',
            shortDescription: 'Intenzívne ošetrenie očného okolia pre redukciu vrások, opuchov a tmavých kruhov.',
            benefits: [
              { icon: 'eye', title: 'Komplexné ošetrenie', description: 'Vrásky, opuchy, kruhy' },
              { icon: 'firming', title: 'Spevnenie', description: 'Okamžitý liftingový efekt' },
              { icon: 'brightening', title: 'Rozjasnenie', description: 'Sviežejší pohľad' },
            ],
          },
          {
            id: 'kozmetika-komplet',
            slug: 'kozmetika-komplet',
            name: 'Kozmetika komplet (kombinované čistenie pleti + peeling + maska + relaxačná masáž tváre a dekoltu)',
            price: '90 €',
            duration: '1h',
            popular: true,
            tagline: 'Kompletná starostlivosť o pleť',
            shortDescription: 'Najobľúbenejšie ošetrenie kombinujúce čistenie, peeling, masku a relaxačnú masáž.',
            fullDescription: 'Kompletné kozmetické ošetrenie je ideálnou voľbou pre tých, ktorí chcú dopriať svojej pleti komplexnú starostlivosť. Začíname hĺbkovým čistením, nasleduje peeling pre odstránenie odumretých buniek, potom aplikujeme masku podľa potrieb pleti a zakončíme relaxačnou masážou tváre a dekoltu.',
            benefits: [
              { icon: 'complete', title: 'Kompletné ošetrenie', description: 'Všetko v jednom' },
              { icon: 'cleansing', title: 'Hĺbkové čistenie', description: 'Čistá, priedušná pleť' },
              { icon: 'relaxation', title: 'Relaxácia', description: 'Masáž tváre a dekoltu' },
              { icon: 'glow', title: 'Žiarivá pleť', description: 'Viditeľný rozdiel' },
            ],
            process: [
              { step: 1, title: 'Čistenie', description: 'Odlíčenie a hĺbkové čistenie' },
              { step: 2, title: 'Peeling', description: 'Odstránenie odumretých buniek' },
              { step: 3, title: 'Maska', description: 'Podľa potrieb vašej pleti' },
              { step: 4, title: 'Masáž', description: 'Relaxačná masáž tváre a dekoltu' },
            ],
            forWhom: ['Pre pravidelnú starostlivosť', 'Pre únavu a stres', 'Pre všetky typy pleti'],
          },
          {
            id: 'masaz-tvare-dekoltu',
            slug: 'masaz-tvare-dekoltu-maska',
            name: 'Masáž tváre a dekoltu + upokojujúca maska',
            price: '60 €',
            duration: '1h',
            tagline: 'Hlboká relaxácia',
            shortDescription: 'Relaxačná masáž tváre a dekoltu s upokojujúcou maskou pre dokonalý oddych.',
          },
        ],
      },
      {
        id: 'liecba-akne',
        slug: 'liecba-akne',
        title: 'Liečba akné',
        description: 'Špecializované ošetrenia pre problematickú pleť a akné.',
        image: '/images/services/liecba-akne-hero.png',
        services: [
          {
            id: 'chemicky-peeling-maska',
            slug: 'chemicky-peeling-maska',
            name: 'Chemický peeling + upokojujúca maska',
            price: '60 €',
            duration: '30min.',
            tagline: 'Obnova problematickej pleti',
            shortDescription: 'Profesionálny chemický peeling pre liečbu akné a obnovu štruktúry pleti.',
            benefits: [
              { icon: 'exfoliation', title: 'Exfoliácia', description: 'Odstránenie odumretých buniek' },
              { icon: 'unclogging', title: 'Uvoľnenie pórov', description: 'Čistejšia pleť' },
              { icon: 'renewal', title: 'Obnova pleti', description: 'Jemnejšia textúra' },
            ],
          },
          {
            id: 'osetrenie-lightening',
            slug: 'osetrenie-lightening',
            name: 'Ošetrenie Lightening',
            price: '90 €',
            duration: '1h',
            tagline: 'Rozjasnenie a zjednotenie',
            shortDescription: 'Špecializované ošetrenie pre rozjasnenie pigmentácií a zjednotenie tónu pleti.',
          },
          {
            id: 'repair-peeling-akne',
            slug: 'repair-peeling-akne-maska',
            name: 'Repair Peeling na akné + upokojujúca maska',
            price: '80 €',
            duration: '30min.',
            tagline: 'Cieleá liečba akné',
            shortDescription: 'Intenzívny peeling špeciálne formulovaný pre pleť s akné a zápalovými prejavmi.',
          },
          {
            id: 'cistenie-pleti-maska',
            slug: 'cistenie-pleti-maska',
            name: 'Čistenie pleti + upokojujúca maska',
            price: '80 €',
            duration: '1h',
            popular: true,
            tagline: 'Základ zdravej pleti',
            shortDescription: 'Profesionálne hĺbkové čistenie pleti s upokojujúcou maskou pre čistú, zdravú pleť.',
            fullDescription: 'Profesionálne čistenie pleti je základom zdravej pokožky. Ošetrenie zahŕňa dôkladné odlíčenie, naparovanie, manuálnu extrakciu nečistôt, dezinfekciu a aplikáciu upokojujúcej masky. Vaša pleť bude čistá, priedušná a pripravená na ďalšiu starostlivosť.',
            benefits: [
              { icon: 'deep', title: 'Hĺbkové čistenie', description: 'Odstránenie nečistôt' },
              { icon: 'extraction', title: 'Extrakcia', description: 'Odstránenie čiernych bodiek' },
              { icon: 'soothing', title: 'Upokojenie', description: 'Redukcia začervenania' },
              { icon: 'fresh', title: 'Svieža pleť', description: 'Priedušné póry' },
            ],
            forWhom: ['Pre mastnú pleť', 'Pre akné a čierne bodky', 'Pre pravidelné čistenie'],
          },
        ],
      },
      {
        id: 'prevencia-starnutia',
        slug: 'prevencia-starnutia',
        title: 'Prevencia starnutia',
        description: 'Anti-aging ošetrenia pre mladistvý vzhľad.',
        image: '/images/services/prevencia-starnutia-hero.png',
        services: [
          {
            id: 'bio-c-peeling',
            slug: 'bio-c-peeling',
            name: 'Bio C peeling',
            price: '60 €',
            duration: '30min.',
            tagline: 'Vitamín C pre žiarivosť',
            shortDescription: 'Antioxidačný peeling s vitamínom C pre rozjasnenie a ochranu pred starnutím.',
            benefits: [
              { icon: 'antioxidant', title: 'Antioxidanty', description: 'Ochrana pred voľnými radikálmi' },
              { icon: 'brightening', title: 'Rozjasnenie', description: 'Žiarivá pleť' },
              { icon: 'prevention', title: 'Prevencia', description: 'Spomalenie starnutia' },
            ],
          },
          {
            id: 'osetrenie-cosmelan',
            slug: 'osetrenie-cosmelan',
            name: 'Ošetrenie Cosmelan',
            price: '140 €',
            duration: '1h',
            popular: true,
            tagline: 'Zlatý štandard depigmentácie',
            shortDescription: 'Profesionálne depigmentačné ošetrenie pre odstránenie pigmentových škvŕn a melazmy.',
            fullDescription: 'Cosmelan je svetovo uznávaná depigmentačná metóda od španielskej značky Mesoestetic. Ošetrenie efektívne odstraňuje pigmentové škvrny, melazmu a slnečné poškodenie. Výsledkom je rovnomerný, žiarivý tón pleti.',
            benefits: [
              { icon: 'depigmentation', title: 'Depigmentácia', description: 'Odstránenie škvŕn' },
              { icon: 'even', title: 'Rovnomerný tón', description: 'Jednotná farba pleti' },
              { icon: 'professional', title: 'Medicínska kozmetika', description: 'Overená účinnosť' },
              { icon: 'lasting', title: 'Dlhodobý efekt', description: 'S domácou starostlivosťou' },
            ],
            forWhom: ['Pre pigmentové škvrny', 'Pre melazmu', 'Pre slnečné poškodenie'],
            note: 'Vyžaduje domácu starostlivosť pre optimálne výsledky.',
          },
        ],
      },
      {
        id: 'pristrojove-osetrenia',
        slug: 'pristrojove-osetrenia',
        title: 'Prístrojové ošetrenia',
        description: 'Moderné technológie pre efektívne výsledky.',
        image: '/images/services/pristrojove-osetrenia-hero.png',
        services: [
          {
            id: 'aqua-star-exclusive',
            slug: 'aqua-star-exclusive',
            name: 'Aqua Star exclusive',
            price: '150 €',
            duration: '1h',
            popular: true,
            tagline: 'Hydrafacial novej generácie',
            shortDescription: 'Prémiové multifunkčné ošetrenie kombinujúce čistenie, hydratáciu a regeneráciu.',
            fullDescription: 'Aqua Star exclusive je najmodernejšie prístrojové ošetrenie, ktoré kombinuje vodné peeling, extrakciu, hydratáciu a výživu pleti. Vhodné pre všetky typy pleti, prináša okamžité výsledky bez downtime.',
            benefits: [
              { icon: 'multifunction', title: 'Multifunkčné', description: '4 kroky v jednom' },
              { icon: 'gentle', title: 'Šetrné', description: 'Pre všetky typy pleti' },
              { icon: 'immediate', title: 'Okamžité výsledky', description: 'Žiarivá pleť ihneď' },
              { icon: 'nodowntime', title: 'Bez downtime', description: 'Hneď do spoločnosti' },
            ],
            process: [
              { step: 1, title: 'Čistenie', description: 'Vodný peeling' },
              { step: 2, title: 'Extrakcia', description: 'Šetrné odsávanie' },
              { step: 3, title: 'Hydratácia', description: 'Séra a výživné látky' },
              { step: 4, title: 'Ochrana', description: 'Finálna starostlivosť' },
            ],
            forWhom: ['Pre všetky typy pleti', 'Pre okamžitú žiarivosť', 'Pred špeciálnou udalosťou'],
          },
          {
            id: 'aqua-star-standard',
            slug: 'aqua-star-standard',
            name: 'Aqua Star standart',
            price: '120 €',
            duration: '1h',
            tagline: 'Efektívna hydratácia',
            shortDescription: 'Štandardné Aqua Star ošetrenie pre hĺbkovú hydratáciu a čistenie pleti.',
          },
          {
            id: 'hollywood-carbon',
            slug: 'hollywood-carbon-peel',
            name: 'Hollywood Carbon peel',
            price: '90 €',
            duration: '1h',
            tagline: 'Celebritám obľúbené ošetrenie',
            shortDescription: 'Laserové ošetrenie s uhlíkovou maskou pre zmenšenie pórov a žiarivosť pleti.',
            benefits: [
              { icon: 'pores', title: 'Menšie póry', description: 'Zjemnenie textúry' },
              { icon: 'glow', title: 'Hollywood glow', description: 'Žiarivá pleť' },
              { icon: 'oil', title: 'Kontrola mastnosti', description: 'Matný vzhľad' },
            ],
            forWhom: ['Pre rozšírené póry', 'Pre mastnú pleť', 'Pre red carpet look'],
          },
          {
            id: 'mezoterapia-oci',
            slug: 'mezoterapia-ocne-okolie',
            name: 'Mezoterapia - Očné okolie (profesionálny kombi koktail podľa potrieb pleti)',
            price: '120 €',
            duration: '1h',
            tagline: 'Omladenie očného okolia',
            shortDescription: 'Cielená mezoterapia pre redukciu vrások, tmavých kruhov a opuchov okolo očí.',
          },
          {
            id: 'mezoterapia-tvar',
            slug: 'mezoterapia-tvar',
            name: 'Mezoterapia - Tvár (profesionálny kombi koktail podľa potrieb pleti)',
            price: '120 €',
            duration: '1h',
            tagline: 'Vitamínová infúzia pre pleť',
            shortDescription: 'Intenzívna mezoterapia s koktailom vitamínov a kyseliny hyalurónovej pre obnovu pleti.',
          },
          {
            id: 'ozone-plazma',
            slug: 'ozone-plazma-repair',
            name: 'Ozone Plazma Repair',
            price: '100 €',
            duration: '1h',
            tagline: 'Regenerácia ozónom',
            shortDescription: 'Inovatívne ošetrenie využívajúce ozón pre regeneráciu a dezinfekciu pleti.',
          },
          {
            id: 'plazma-dolne-viecka',
            slug: 'plazma-lifting-dolne-viecka',
            name: 'Plazma lifting - Dolné viečka',
            price: '150 €',
            duration: '1h',
            tagline: 'Nechirurgická korekcia viečok',
            shortDescription: 'Plazma lifting pre spevnenie a vyhladenie dolných viečok bez operácie.',
          },
          {
            id: 'plazma-horne-dolne',
            slug: 'plazma-lifting-horne-dolne-viecka',
            name: 'Plazma lifting - Horné + dolné viečka',
            price: '300 €',
            duration: '1h',
            tagline: 'Kompletná obnova viečok',
            shortDescription: 'Komplexný plazma lifting oboch viečok pre dramatické omladenie očného okolia.',
            benefits: [
              { icon: 'noninvasive', title: 'Bez operácie', description: 'Nechirurgický zákrok' },
              { icon: 'lifting', title: 'Liftingový efekt', description: 'Spevnenie pokožky' },
              { icon: 'rejuvenation', title: 'Omladenie', description: 'Mladší vzhľad' },
            ],
            forWhom: ['Pre previsnuté viečka', 'Pre vrásky okolo očí', 'Ako alternatíva k operácii'],
          },
          {
            id: 'plazma-horne',
            slug: 'plazma-lifting-horne-viecka',
            name: 'Plazma lifting - Horné viečka',
            price: '150 €',
            duration: '1h',
            tagline: 'Zdvihnutie previsnutých viečok',
            shortDescription: 'Plazma lifting pre korekciu previsnutých horných viečok bez chirurgie.',
          },
          {
            id: 'vlasova-mezoterapia',
            slug: 'vlasova-mezoterapia-dermapenom',
            name: 'Vlasová mezoterapia Dermapenom "c.prof hair"',
            price: '100 €',
            duration: '1h 30min.',
            tagline: 'Podpora rastu vlasov',
            shortDescription: 'Mezoterapia vlasovej pokožky pre posilnenie vlasov a stimuláciu rastu.',
            benefits: [
              { icon: 'growth', title: 'Rast vlasov', description: 'Stimulácia folikulov' },
              { icon: 'strength', title: 'Posilnenie', description: 'Silnejšie vlasy' },
              { icon: 'health', title: 'Zdravá pokožka', description: 'Výživa koreňov' },
            ],
            forWhom: ['Pre vypadávanie vlasov', 'Pre slabé vlasy', 'Pre rednúce vlasy'],
          },
          {
            id: 'mezoterapia-richesse',
            slug: 'mezoterapia-vitalinjektor-richesse',
            name: 'Mezoterapia vitalinjektor Richesse salmon sperm',
            price: '200 €',
            duration: '1h 30min.',
            popular: true,
            tagline: 'Luxusná regenerácia pleti',
            shortDescription: 'Prémiová mezoterapia s polynukleotidmi pre intenzívnu regeneráciu a omladenie.',
            benefits: [
              { icon: 'regeneration', title: 'Regenerácia', description: 'Obnova na bunkovej úrovni' },
              { icon: 'elasticity', title: 'Elasticita', description: 'Pružnejšia pokožka' },
              { icon: 'premium', title: 'Prémiová kvalita', description: 'Najnovšie ingrediencie' },
            ],
          },
          {
            id: 'mezoterapia-cocktail',
            slug: 'mezoterapia-vitalinjektor-meso-cocktail',
            name: 'Mezoterapia vitalinjektor meso cocktail',
            price: '180 €',
            duration: '2h',
            tagline: 'Vitamínový koktail pre pleť',
            shortDescription: 'Prístrojová mezoterapia s koktailom aktívnych látok pre komplexnú starostlivosť.',
          },
          {
            id: 'mikroneedling-richesse',
            slug: 'mikroneedling-richesse-salmon-sperm',
            name: 'Mikroneedling Richesse salmon sperm',
            price: '150 €',
            duration: '1h 30min.',
            tagline: 'Kolagénová indukčná terapia',
            shortDescription: 'Mikroneedling s prémiovým sérom pre stimuláciu tvorby kolagénu.',
          },
          {
            id: 'mikroneedling-meso',
            slug: 'mikroneedling-meso-cocktail',
            name: 'Mikroneedling meso cocktail',
            price: '120 €',
            duration: '1h',
            tagline: 'Obnova pokožky',
            shortDescription: 'Mikroneedling s mezoterapeutickým koktailom pre zlepšenie textúry a tónu pleti.',
          },
        ],
      },
      {
        id: 'doplnkove-kozmeticke-sluzby',
        slug: 'doplnkove-kozmeticke-sluzby',
        title: 'Doplnkové kozmetické služby',
        description: 'Laminácia, permanentný make-up a predlžovanie mihalníc pre dokonalý vzhľad.',
        image: '/images/services/laminacia-hero.png',
        services: [
          // Laminácia
          {
            id: 'korekcia-farbenie-oboci',
            slug: 'korekcia-farbenie-oboci',
            name: 'Korekcia a farbenie obočia',
            price: '20 €',
            duration: '30min.',
            tagline: 'Dokonalý rám tváre',
            shortDescription: 'Precízna úprava tvaru obočia a profesionálne farbenie pre výraznejší pohľad.',
            fullDescription: 'Obočie je rámom vašej tváre a jeho správny tvar dokáže opticky omladiť a zvýrazniť vaše črty. Naši špecialisti vám pomocou precíznej korekcie vytvoria ideálny tvar prispôsobený vašej tvári. Následné farbenie dodá obočiu hĺbku a definíciu.',
            benefits: [
              { icon: 'precision', title: 'Precízny tvar', description: 'Prispôsobený vašim črtám' },
              { icon: 'natural', title: 'Prirodzený vzhľad', description: 'Jemné a elegantné' },
              { icon: 'time', title: 'Rýchle ošetrenie', description: 'Len 30 minút' },
              { icon: 'lasting', title: 'Dlhotrvajúci efekt', description: '3-4 týždne' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Analýza tvaru tváre a výber ideálneho obočia' },
              { step: 2, title: 'Korekcia', description: 'Precízna úprava tvaru' },
              { step: 3, title: 'Farbenie', description: 'Aplikácia farby a fixácia' },
            ],
            forWhom: ['Pre tých, kto chce definované obočie', 'Pre svetlé alebo riedke obočie', 'Pre rýchlu dennú rutinu'],
          },
          {
            id: 'laminacia-kombo',
            slug: 'laminacia-kombo',
            name: 'Laminácia - Kombo (Lash Lift + Brow Lift)',
            price: '70 €',
            duration: '1h',
            popular: true,
            tagline: 'Kompletná premena pohľadu',
            shortDescription: 'Najobľúbenejšia kombinácia laminácie mihalníc a obočia pre maximálny efekt.',
            fullDescription: 'Kombo ošetrenie je ideálnou voľbou pre tých, kto chce kompletne premeniť svoj pohľad v jednom sedení. Kombinácia Lash Lift a Brow Lift vytvorí dokonalú harmóniu medzi mihalnicami a obočím. Výsledkom je otvorený, mladistvý pohľad bez potreby denného líčenia.',
            benefits: [
              { icon: 'complete', title: 'Kompletné ošetrenie', description: 'Mihalnice aj obočie naraz' },
              { icon: 'value', title: 'Výhodná cena', description: 'Ušetrite oproti jednotlivým ošetreniam' },
              { icon: 'natural', title: 'Prirodzený výsledok', description: 'Vaše vlastné riasy a obočie' },
              { icon: 'lasting', title: 'Dlhodobý efekt', description: '6-8 týždňov' },
            ],
            process: [
              { step: 1, title: 'Príprava', description: 'Očistenie a príprava mihalníc aj obočia' },
              { step: 2, title: 'Lash Lift', description: 'Zdvihnutie a tvarovanie mihalníc' },
              { step: 3, title: 'Brow Lift', description: 'Laminácia a tvarovanie obočia' },
              { step: 4, title: 'Finalizácia', description: 'Výživné sérum a záverečná úprava' },
            ],
            forWhom: ['Pre kompletný look bez líčenia', 'Pre šetrenie času', 'Pre prirodzenú krásu'],
            note: 'Najobľúbenejšie ošetrenie u našich klientov.',
          },
          {
            id: 'laminacia-mihalnic',
            slug: 'laminacia-mihalnic-lash-lift',
            name: 'Laminácia mihalníc - Lash Lift',
            price: '40 €',
            duration: '1h',
            tagline: 'Prirodzene zdvihnuté riasy',
            shortDescription: 'Lash Lift dodá vašim prirodzeným mihalniciam krásne zdvihnutie a zatočenie.',
            fullDescription: 'Lash Lift je semi-permanentné ošetrenie, ktoré zdvíha vaše vlastné mihalnice od koreňa, čím vytvára efekt otvorených očí a dlhších rias. Na rozdiel od predlžovania používame vaše prirodzené mihalnice, takže výsledok je maximálne prirodzený a nevyžaduje špeciálnu starostlivosť.',
            benefits: [
              { icon: 'natural', title: '100% prirodzené', description: 'Vaše vlastné mihalnice' },
              { icon: 'open', title: 'Otvorený pohľad', description: 'Opticky väčšie oči' },
              { icon: 'easy', title: 'Bez údržby', description: 'Žiadna špeciálna starostlivosť' },
              { icon: 'lasting', title: 'Vydrží 6-8 týždňov', description: 'Podľa rastu rias' },
            ],
            process: [
              { step: 1, title: 'Očistenie', description: 'Dôkladné odstránenie make-upu' },
              { step: 2, title: 'Aplikácia', description: 'Nanesenie na silikónové podložky' },
              { step: 3, title: 'Lifting', description: 'Zdvíhací a fixačný prípravok' },
              { step: 4, title: 'Výživa', description: 'Keratínové sérum pre zdravé riasy' },
            ],
            forWhom: ['Pre rovné alebo smerujúce nadol mihalnice', 'Pre alergikov na lepidlo', 'Pre aktívny životný štýl'],
          },
          {
            id: 'laminacia-oboci',
            slug: 'laminacia-oboci-brow-lift',
            name: 'Laminácia obočia - Brow Lift',
            price: '40 €',
            duration: '1h',
            tagline: 'Definované a plné obočie',
            shortDescription: 'Brow Lift vytvaruje a fixuje obočie do požadovaného smeru pre plný, upravený vzhľad.',
            fullDescription: 'Brow Lift je revolučná technika, ktorá umožňuje vytvarovať aj najneposlušnejšie chĺpky obočia. Ošetrenie zjemní štruktúru chĺpkov a umožní ich natrvalo zafixovať v požadovanom smere. Výsledkom je plné, upravené obočie s prirodzeným vzhľadom.',
            benefits: [
              { icon: 'fullness', title: 'Opticky plnšie', description: 'Maximálny objem' },
              { icon: 'control', title: 'Skrotené chĺpky', description: 'Koniec neposlušnému obočiu' },
              { icon: 'shape', title: 'Dokonalý tvar', description: 'Presne podľa vášho želania' },
              { icon: 'lasting', title: 'Dlhodobý efekt', description: '4-6 týždňov' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Určenie ideálneho tvaru a smeru' },
              { step: 2, title: 'Laminácia', description: 'Zjemnenie a tvarovanie chĺpkov' },
              { step: 3, title: 'Fixácia', description: 'Zafixovanie v požadovanom smere' },
              { step: 4, title: 'Farbenie', description: 'Voliteľné dofarbenie pre hĺbku' },
            ],
            forWhom: ['Pre neposlušné obočie', 'Pre riedke obočie', 'Pre moderný "fluffy brows" look'],
          },
          // Permanentný make-up
          {
            id: 'pmu-korekcia',
            slug: 'permanentny-makeup-korekcia',
            name: 'Permanentný make-up korekcia do 5 týždňov',
            price: '100 €',
            duration: '1h',
            tagline: 'Dolaďte dokonalosť',
            shortDescription: 'Korekčné ošetrenie pre doladenie tvaru a sýtosti pigmentu po prvom ošetrení.',
            fullDescription: 'Korekcia je nevyhnutnou súčasťou procesu permanentného make-upu. Po zahojení prvého ošetrenia (4-5 týždňov) vykonáme korekciu, ktorá zabezpečí rovnomerné rozloženie pigmentu a doladí tvar podľa vašich predstáv. Tento krok je kľúčový pre dlhotrvajúci a dokonalý výsledok.',
            benefits: [
              { icon: 'perfect', title: 'Dokonalý výsledok', description: 'Doladenie detailov' },
              { icon: 'lasting', title: 'Dlhšia výdrž', description: 'Lepšie uchytenie pigmentu' },
              { icon: 'color', title: 'Intenzívnejšia farba', description: 'Sýtejší odtieň' },
              { icon: 'shape', title: 'Presný tvar', description: 'Finálne úpravy' },
            ],
            process: [
              { step: 1, title: 'Zhodnotenie', description: 'Posúdenie zahojenia a farby' },
              { step: 2, title: 'Konzultácia', description: 'Diskusia o úpravách' },
              { step: 3, title: 'Korekcia', description: 'Doplnenie pigmentu' },
            ],
            forWhom: ['Pre klientov po prvom PMU', 'Pre obnovu farby', 'Pre doladenie tvaru'],
            note: 'Korekcia je zahrnutá v cene prvého ošetrenia, ak prebehne do 5 týždňov.',
          },
          {
            id: 'pmu-hair-strokes',
            slug: 'permanentny-makeup-hair-strokes',
            name: 'Permanentný make-up obočie Hair Strokes',
            price: '200 €',
            duration: '2h',
            popular: true,
            tagline: 'Chĺpok po chĺpku',
            shortDescription: 'Najrealistickejšia technika kresby jednotlivých chĺpkov pre absolútne prirodzený vzhľad.',
            fullDescription: 'Hair Strokes technika je vrcholom umenia permanentného make-upu. Každý chĺpok je ručne nakreslený tak, aby napodobňoval prirodzený rast vášho obočia. Výsledok je tak realistický, že nikto nepozná, že ide o permanentný make-up. Ideálne pre tých, kto chce jemný, prirodzený vzhľad.',
            benefits: [
              { icon: 'realistic', title: 'Ultra realistické', description: 'Nerozoznateľné od prirodzeného' },
              { icon: 'custom', title: 'Na mieru', description: 'Prispôsobené vašej tvári' },
              { icon: 'natural', title: 'Prirodzený vzhľad', description: 'Jemná, elegantná kresba' },
              { icon: 'lasting', title: 'Výdrž 1-2 roky', description: 'Podľa typu pleti' },
            ],
            process: [
              { step: 1, title: 'Návrh tvaru', description: 'Predkreslenie a konzultácia' },
              { step: 2, title: 'Príprava', description: 'Znecitlivenie oblasti' },
              { step: 3, title: 'Kresba', description: 'Precízna aplikácia jednotlivých ťahov' },
              { step: 4, title: 'Dokončenie', description: 'Ošetrenie a inštrukcie' },
            ],
            forWhom: ['Pre prirodzený look', 'Pre riedke obočie', 'Pre úplnú absenciu obočia'],
            note: 'Odporúčané pre normálnu až suchú pleť.',
          },
          {
            id: 'pmu-powder-brows',
            slug: 'permanentny-makeup-powder-brows',
            name: 'Permanentný make-up obočie Powder Brows',
            price: '200 €',
            duration: '2h',
            popular: true,
            tagline: 'Efekt púdrového make-upu',
            shortDescription: 'Jemne tieňované obočie s efektom profesionálneho make-upu, ktorý vydrží roky.',
            fullDescription: 'Powder Brows technika vytvára jemný, tieňovaný efekt podobný púdrovému make-upu. Výsledok je mäkší a menej definovaný ako Hair Strokes, čo je ideálne pre tých, kto preferuje výraznejší, ale stále prirodzený vzhľad. Táto technika je vhodná pre všetky typy pleti vrátane mastnej.',
            benefits: [
              { icon: 'soft', title: 'Mäkký efekt', description: 'Jemné tieňovanie' },
              { icon: 'makeup', title: 'Efekt make-upu', description: 'Vždy upravený vzhľad' },
              { icon: 'universal', title: 'Pre všetky typy pleti', description: 'Vrátane mastnej' },
              { icon: 'lasting', title: 'Dlhá výdrž', description: '2-3 roky' },
            ],
            process: [
              { step: 1, title: 'Návrh', description: 'Konzultácia tvaru a farby' },
              { step: 2, title: 'Príprava', description: 'Znecitlivenie' },
              { step: 3, title: 'Tieňovanie', description: 'Postupná aplikácia pigmentu' },
              { step: 4, title: 'Dokončenie', description: 'Starostlivosť po ošetrení' },
            ],
            forWhom: ['Pre mastnú pleť', 'Pre výraznejší efekt', 'Pre každodenný upravený look'],
          },
          {
            id: 'pmu-odstranenie',
            slug: 'permanentny-makeup-odstranenie',
            name: 'Permanentný make-up odstránenie obočia + umŕtvenie',
            price: '100 €',
            duration: '1h',
            tagline: 'Nový začiatok',
            shortDescription: 'Bezpečné odstránenie starého alebo nechceného permanentného make-upu.',
            fullDescription: 'Ak nie ste spokojní so starým permanentným make-upom alebo potrebujete zmenu, ponúkame bezpečné odstránenie pomocou špeciálneho roztoku. Proces postupne vybieli pigment z pokožky, čím pripraví oblasť na nové ošetrenie alebo prirodzené hojenie.',
            benefits: [
              { icon: 'safe', title: 'Bezpečné', description: 'Šetrná metóda' },
              { icon: 'fresh', title: 'Nový začiatok', description: 'Možnosť novej aplikácie' },
              { icon: 'painless', title: 'S umŕtvením', description: 'Minimálna bolesť' },
              { icon: 'professional', title: 'Odborné ošetrenie', description: 'Skúsené špecialistky' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Posúdenie stavu pigmentu' },
              { step: 2, title: 'Umŕtvenie', description: 'Aplikácia anestetika' },
              { step: 3, title: 'Odstránenie', description: 'Aplikácia odstraňovacieho roztoku' },
              { step: 4, title: 'Hojenie', description: 'Inštrukcie pre domácu starostlivosť' },
            ],
            forWhom: ['Pre nespokojných s výsledkom PMU', 'Pre zmenu tvaru', 'Pre vyblednutý starý PMU'],
            note: 'Môže byť potrebných viac sedení podľa hĺbky pigmentu.',
          },
          {
            id: 'pmu-ocne-linky',
            slug: 'permanentny-makeup-ocne-linky',
            name: 'Permanentný make-up očné linky',
            price: '200 €',
            duration: '2h',
            tagline: 'Dokonalá linka bez námahy',
            shortDescription: 'Permanentná očná linka pre výrazný pohľad bez denného maľovania.',
            fullDescription: 'Permanentné očné linky zvýraznia vaše oči a ušetria čas strávený pred zrkadlom. Ponúkame rôzne štýly od jemnej linky v koreni rias až po dramatickejšiu winged linku. Výsledok je odolný voči vode, potu a slzám.',
            benefits: [
              { icon: 'dramatic', title: 'Výrazný pohľad', description: 'Zvýraznené oči' },
              { icon: 'time', title: 'Úspora času', description: 'Žiadne denné kreslenie' },
              { icon: 'waterproof', title: 'Odolné', description: 'Voči vode a potu' },
              { icon: 'lasting', title: 'Dlhodobé', description: '2-3 roky' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Výber štýlu linky' },
              { step: 2, title: 'Príprava', description: 'Znecitlivenie viečok' },
              { step: 3, title: 'Aplikácia', description: 'Precízna kresba linky' },
              { step: 4, title: 'Dokončenie', description: 'Ochladenie a inštrukcie' },
            ],
            forWhom: ['Pre každodenný make-up look', 'Pre citlivé oči', 'Pre aktívny životný štýl'],
          },
          {
            id: 'pmu-pery',
            slug: 'permanentny-makeup-pery',
            name: 'Permanentný make-up pery',
            price: '200 €',
            duration: '2h',
            tagline: 'Plné, farebné pery 24/7',
            shortDescription: 'Permanentný rúž, ktorý zvýrazní farbu a tvar vašich pier.',
            fullDescription: 'Permanentný make-up pier dodá vašim perám krásnu farbu a definíciu. Môžeme vytvoriť jemný, prirodzený nádych farby alebo výraznejší efekt plných pier. Ošetrenie tiež opticky vyrovná asymetriu a dodá perám mladistvý vzhľad.',
            benefits: [
              { icon: 'color', title: 'Stála farba', description: 'Bez nutnosti rúžu' },
              { icon: 'shape', title: 'Definovaný tvar', description: 'Symetrické pery' },
              { icon: 'youthful', title: 'Mladistvý vzhľad', description: 'Plnšie pery' },
              { icon: 'lasting', title: 'Vydrží 2-3 roky', description: 'Dlhodobý efekt' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Výber farby a intenzity' },
              { step: 2, title: 'Predkresba', description: 'Návrh kontúry pier' },
              { step: 3, title: 'Pigmentácia', description: 'Postupná aplikácia farby' },
              { step: 4, title: 'Dokončenie', description: 'Hojivá starostlivosť' },
            ],
            forWhom: ['Pre bledé pery', 'Pre asymetrické pery', 'Pre tých, kto chce vždy krásne pery'],
          },
          // Predlžovanie mihalníc
          {
            id: 'odstranovanie-mihalnic',
            slug: 'odstranovanie-mihalnic',
            name: 'Odstraňovanie mihalníc',
            price: '20 €',
            duration: '30min.',
            tagline: 'Bezpečná starostlivosť',
            shortDescription: 'Šetrné a profesionálne odstránenie predĺžených mihalníc bez poškodenia vlastných.',
            fullDescription: 'Profesionálne odstránenie mihalníc je dôležité pre zdravie vašich prirodzených rias. Používame špeciálne gély, ktoré bezpečne rozpustia lepidlo bez ťahania a poškodenia. Po odstránení vaše prirodzené mihalnice zostávajú zdravé a pripravené na nový set.',
            benefits: [
              { icon: 'safe', title: 'Bezpečné', description: 'Šetrné k prirodzeným riasam' },
              { icon: 'professional', title: 'Profesionálne', description: 'Správna technika' },
              { icon: 'quick', title: 'Rýchle', description: 'Len 30 minút' },
              { icon: 'healthy', title: 'Zdravé riasy', description: 'Bez poškodenia' },
            ],
            process: [
              { step: 1, title: 'Aplikácia gélu', description: 'Nanesenie odstraňovača' },
              { step: 2, title: 'Pôsobenie', description: 'Rozpustenie lepidla' },
              { step: 3, title: 'Odstránenie', description: 'Jemné zloženie rias' },
              { step: 4, title: 'Ošetrenie', description: 'Výživné sérum pre prirodzené riasy' },
            ],
            forWhom: ['Pre výmenu setu', 'Pre oddych pre prirodzené riasy', 'Pre zmenu štýlu'],
          },
          {
            id: 'predlzovanie-doplnka',
            slug: 'predlzovanie-mihalnic-doplnka',
            name: 'Predlžovanie mihalníc - Doplnka (po 3 týždňoch)',
            price: '50 €',
            duration: '1h 30min.',
            tagline: 'Vždy dokonalé',
            shortDescription: 'Pravidelná údržba pre zachovanie plného a krásneho vzhľadu mihalníc.',
            fullDescription: 'Doplnka je nevyhnutná pre udržanie plného vzhľadu predĺžených mihalníc. Počas prirodzeného rastu a obnovy rias vypadávajú aj aplikované extenzie. Doplnka nahrádza vypadané riasy a udržiava váš pohľad dokonalý. Odporúčame doplnku každé 2-3 týždne.',
            benefits: [
              { icon: 'fullness', title: 'Plný vzhľad', description: 'Doplnenie medzier' },
              { icon: 'maintain', title: 'Údržba', description: 'Predĺženie životnosti setu' },
              { icon: 'value', title: 'Výhodné', description: 'Lacnejšie ako nový set' },
              { icon: 'fresh', title: 'Svieži look', description: 'Vždy upravené' },
            ],
            process: [
              { step: 1, title: 'Kontrola', description: 'Posúdenie stavu rias' },
              { step: 2, title: 'Očistenie', description: 'Odstránenie nečistôt' },
              { step: 3, title: 'Doplnenie', description: 'Aplikácia nových extenzií' },
              { step: 4, title: 'Finalizácia', description: 'Tvarovanie a kontrola' },
            ],
            forWhom: ['Pre pravidelných klientov', 'Pre udržanie plného setu', 'Pre ekonomickú voľbu'],
            note: 'Ideálny interval doplnky je 2-3 týždne.',
          },
          {
            id: 'predlzovanie-novy-set',
            slug: 'predlzovanie-mihalnic-novy-set',
            name: 'Predlžovanie mihalníc - Nový set',
            price: '80 €',
            duration: '2h',
            popular: true,
            tagline: 'Dramatická premena pohľadu',
            shortDescription: 'Kompletný nový set predĺžených mihalníc pre výrazný a sebaistý pohľad.',
            fullDescription: 'Nový set predĺžených mihalníc kompletne premení váš pohľad. Individuálne extenzie aplikujeme na každú vašu prirodzenú riasu, čím vytvoríme objem, dĺžku a tvar podľa vášho želania. Ponúkame rôzne štýly od prirodzeného po dramatický. Výsledkom sú krásne, dlhé mihalnice, ktoré zdôraznia váš pohľad.',
            benefits: [
              { icon: 'dramatic', title: 'Výrazný pohľad', description: 'Okamžitá premena' },
              { icon: 'custom', title: 'Na mieru', description: 'Štýl podľa vášho želania' },
              { icon: 'lasting', title: 'Dlhotrvajúce', description: '3-4 týždne s doplnkami' },
              { icon: 'nomakeup', title: 'Bez mascary', description: 'Ušetrite čas' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Výber štýlu, dĺžky a tvaru' },
              { step: 2, title: 'Príprava', description: 'Očistenie a ochrana dolných rias' },
              { step: 3, title: 'Aplikácia', description: 'Presná aplikácia extenzií' },
              { step: 4, title: 'Dokončenie', description: 'Inštrukcie pre starostlivosť' },
            ],
            forWhom: ['Pre novinky vo svete rias', 'Pre špeciálne príležitosti', 'Pre každodenný glamour'],
            note: 'Vyhnite sa vode a pare 24 hodín po aplikácii.',
          },
        ],
      },
    ],
  },

  // ========================================
  // 3. LASEROVÁ EPILÁCIA
  // ========================================
  {
    id: 'laserova-epilacia',
    slug: 'laserova-epilacia',
    title: 'Laserová epilácia',
    description: 'Bezpečné a účinné trvalé odstránenie nežiaducich chĺpkov laserom.',
    iconKey: 'laser',
    image: '/images/services/laserova-epilacia-hero.png',
    imagePosition: 'center center',
    subcategories: [
      {
        id: 'laser-damy',
        slug: 'laserova-epilacia-damy',
        title: 'Laserová epilácia dámy',
        description: 'Laserová epilácia pre dámy - všetky oblasti tela.',
        image: '/images/services/laserova-epilacia-damy-hero.png',
        services: [
          {
            id: 'laser-bikiny',
            slug: 'laserova-epilacia-bikiny',
            name: 'Laserová epilácia - Bikiny',
            price: '60 €',
            duration: '30min.',
            popular: true,
            tagline: 'Hladká bikini zóna',
            shortDescription: 'Trvalé odstránenie chĺpkov v oblasti bikín pre bezstarostnú sezónu.',
            benefits: [
              { icon: 'smooth', title: 'Hladká pokožka', description: 'Bez chĺpkov' },
              { icon: 'permanent', title: 'Trvalý efekt', description: 'Po sérii ošetrení' },
              { icon: 'painless', title: 'Minimálna bolesť', description: 'Chladiaci systém' },
            ],
            forWhom: ['Pre citlivú pokožku', 'Pre pohodlie', 'Pre aktívne ženy'],
          },
          {
            id: 'laser-bikiny-komplet',
            slug: 'laserova-epilacia-bikiny-komplet',
            name: 'Laserová epilácia - Bikiny komplet',
            price: '100 €',
            duration: '30min.',
            popular: true,
            tagline: 'Kompletná bikini zóna',
            shortDescription: 'Úplné odstránenie chĺpkov v celej intímnej oblasti vrátane brazílskej epilácie.',
            fullDescription: 'Bikiny komplet zahŕňa kompletné odstránenie chĺpkov v celej intímnej oblasti. Laser pôsobí na melanín vo vlasovom folikule a trvalo zastavuje rast chĺpkov. Po sérii 6-8 ošetrení dosiahnete trvalú redukciu až o 90%.',
            benefits: [
              { icon: 'complete', title: 'Kompletná epilácia', description: 'Celá intímna oblasť' },
              { icon: 'permanent', title: 'Trvalý výsledok', description: '90% redukcia chĺpkov' },
              { icon: 'hygiene', title: 'Hygiena', description: 'Lepší pocit čistoty' },
              { icon: 'confidence', title: 'Sebavedomie', description: 'Kedykoľvek pripravená' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Posúdenie typu pokožky a chĺpkov' },
              { step: 2, title: 'Príprava', description: 'Oholenie oblasti deň pred' },
              { step: 3, title: 'Ošetrenie', description: 'Laserová epilácia s chladením' },
              { step: 4, title: 'Starostlivosť', description: 'SPF a upokojujúci krém' },
            ],
            forWhom: ['Pre kompletné odstránenie chĺpkov', 'Pre pohodlie a hygienu', 'Pre aktívny životný štýl'],
            note: 'Odporúčame 6-8 ošetrení v intervale 4-6 týždňov.',
          },
          {
            id: 'laser-bikiny-nohy',
            slug: 'laserova-epilacia-bikiny-komplet-cele-nohy',
            name: 'Laserová epilácia - Bikiny komplet + celé nohy',
            price: '200 €',
            duration: '1h',
            tagline: 'Kompletný balík pre nohy',
            shortDescription: 'Výhodná kombinácia kompletných bikín a celých nôh v jednom sedení.',
          },
          {
            id: 'laser-bokombrady',
            slug: 'laserova-epilacia-bokombrady',
            name: 'Laserová epilácia - Bokombrady',
            price: '50 €',
            duration: '30min.',
            tagline: 'Hladké bokombrady',
            shortDescription: 'Odstránenie nežiaducich chĺpkov v oblasti bokombrád.',
          },
          {
            id: 'laser-brucho-d',
            slug: 'laserova-epilacia-brucho-damy',
            name: 'Laserová epilácia - Brucho',
            price: '30 €',
            duration: '30min.',
            tagline: 'Hladké brucho',
            shortDescription: 'Odstránenie jemných chĺpkov na bruchu pre hladkú pokožku.',
          },
          {
            id: 'laser-cela-tvar',
            slug: 'laserova-epilacia-cela-tvar',
            name: 'Laserová epilácia - Celá tvár',
            price: '80 €',
            duration: '30min.',
            tagline: 'Hladká tvár bez chĺpkov',
            shortDescription: 'Kompletné odstránenie chĺpkov na tvári vrátane líc, brady a hornej pery.',
          },
          {
            id: 'laser-cele-nohy',
            slug: 'laserova-epilacia-cele-nohy',
            name: 'Laserová epilácia - Celé nohy',
            price: '150 €',
            duration: '1h',
            popular: true,
            tagline: 'Hodvábne hladké nohy',
            shortDescription: 'Trvalé odstránenie chĺpkov na celých nohách pre bezstarostnú krásu.',
            fullDescription: 'Laserová epilácia celých nôh je jedným z najobľúbenejších ošetrení. Zahŕňa stehná aj lýtka od členkov po slabiny. Po sérii ošetrení budete mať trvalo hladké nohy bez potreby holenia.',
            benefits: [
              { icon: 'smooth', title: 'Hladké nohy', description: 'Bez holenia a voskovania' },
              { icon: 'timesaving', title: 'Úspora času', description: 'Koniec dennému holeniu' },
              { icon: 'permanent', title: 'Trvalý efekt', description: 'Dlhodobé výsledky' },
              { icon: 'silky', title: 'Hodvábna pokožka', description: 'Jemná a hladká' },
            ],
            forWhom: ['Pre ženy unavené z holenia', 'Pre aktívne ženy', 'Pre dokonalý vzhľad'],
          },
          {
            id: 'laser-horna-pera',
            slug: 'laserova-epilacia-horna-pera',
            name: 'Laserová epilácia - Horná pera',
            price: '30 €',
            duration: '30min.',
          },
          {
            id: 'laser-lica',
            slug: 'laserova-epilacia-lica',
            name: 'Laserová epilácia - Líca',
            price: '50 €',
            duration: '30min.',
          },
          {
            id: 'laser-lytka',
            slug: 'laserova-epilacia-lytka',
            name: 'Laserová epilácia - Lýtka',
            price: '100 €',
            duration: '30min.',
          },
          {
            id: 'laser-lytka-bikiny-podpazusie',
            slug: 'laserova-epilacia-lytka-bikiny-podpazusie',
            name: 'Laserová epilácia - Lýtka + bikiny + podpazušie',
            price: '150 €',
            duration: '1h',
          },
          {
            id: 'laser-nohy-brucho-bikiny-5x',
            slug: 'laserova-epilacia-nohy-brucho-bikiny-5x',
            name: 'Laserová epilácia - Nohy + brucho +bikiny (5 x ošetrenie)',
            price: '800 €',
            duration: '1h',
          },
          {
            id: 'laser-nohy-ruky-5x',
            slug: 'laserova-epilacia-nohy-ruky-5x',
            name: 'Laserová epilácia - Nohy + ruky (5 x ošetrenie)',
            price: '800 €',
            duration: '1h',
          },
          {
            id: 'laser-bradavky',
            slug: 'laserova-epilacia-okolie-bradaviek',
            name: 'Laserová epilácia - Okolie bradaviek',
            price: '30 €',
            duration: '30min.',
          },
          {
            id: 'laser-podpazusie-bikiny',
            slug: 'laserova-epilacia-podpazusie-bikiny',
            name: 'Laserová epilácia - Podpazušie + bikiny',
            price: '120 €',
            duration: '30min.',
          },
          {
            id: 'laser-podpazusie-bikiny-nohy',
            slug: 'laserova-epilacia-podpazusie-bikiny-cele-nohy',
            name: 'Laserová epilácia - Podpazušie + bikiny + celé nohy',
            price: '230 €',
            duration: '1h',
          },
          {
            id: 'laser-stehna',
            slug: 'laserova-epilacia-stehna',
            name: 'Laserová epilácia - Stehná',
            price: '100 €',
            duration: '30min.',
          },
          {
            id: 'laser-stehna-vnutorna',
            slug: 'laserova-epilacia-stehna-vnutorna-cast',
            name: 'Laserová epilácia - Stehná vnútorná časť',
            price: '60 €',
            duration: '30min.',
          },
          {
            id: 'laser-lytka-bikiny',
            slug: 'laserova-epilacia-lytka-bikiny',
            name: 'Laserová epilácia - Lýtka + bikiny',
            price: '120 €',
            duration: '1h',
          },
          {
            id: 'laser-brada-d',
            slug: 'laserova-epilacia-brada-damy',
            name: 'Laserová epilácia - Brada',
            price: '30 €',
            duration: '30min.',
          },
          {
            id: 'laser-podpazusie-d',
            slug: 'laserova-epilacia-podpazusie-damy',
            name: 'Laserová epilácia - Podpazušie',
            price: '60 €',
            duration: '30min.',
          },
          {
            id: 'laser-ruky-d',
            slug: 'laserova-epilacia-ruky-damy',
            name: 'Laserová epilácia - Ruky',
            price: '80 €',
            duration: '30min.',
          },
        ],
      },
      {
        id: 'laser-pani',
        slug: 'laserova-epilacia-pani',
        title: 'Laserová epilácia páni',
        description: 'Laserová epilácia pre pánov - hruď, chrbát, nohy a ďalšie.',
        image: '/images/services/laserova-epilacia-pani-hero.png',
        services: [
          {
            id: 'laser-brucho-p',
            slug: 'laserova-epilacia-brucho-pani',
            name: 'Laserová epilácia - Brucho',
            price: '80 €',
            duration: '30min.',
            tagline: 'Definovaný pas',
            shortDescription: 'Odstránenie chĺpkov na bruchu pre definovanejší vzhľad.',
          },
          {
            id: 'laser-chrbat',
            slug: 'laserova-epilacia-chrbat',
            name: 'Laserová epilácia - Chrbát',
            price: '100 €',
            duration: '30min.',
            popular: true,
            tagline: 'Hladký chrbát',
            shortDescription: 'Najobľúbenejšia služba pre pánov - trvalé odstránenie chĺpkov na chrbte.',
            fullDescription: 'Laserová epilácia chrbta je ideálna pre pánov, ktorí chcú trvalo odstrániť nežiaduce ochlpenie. Profesionálny laser bezpečne odstráni chĺpky na celom chrbte. Po sérii ošetrení dosiahnete trvalú redukciu až o 90%.',
            benefits: [
              { icon: 'smooth', title: 'Hladký chrbát', description: 'Bez ochlpenia' },
              { icon: 'permanent', title: 'Trvalý výsledok', description: '90% redukcia' },
              { icon: 'confidence', title: 'Sebavedomie', description: 'Na pláži bez obáv' },
              { icon: 'painless', title: 'Minimálna bolesť', description: 'Chladiaci systém' },
            ],
            forWhom: ['Pre športovcov', 'Pre pánov s hustým ochlpením', 'Pre estetické dôvody'],
          },
          {
            id: 'laser-chrbat-cast',
            slug: 'laserova-epilacia-chrbat-cast',
            name: 'Laserová epilácia - Chrbát časť',
            price: '60 €',
            duration: '30min.',
            tagline: 'Čiastočné ošetrenie',
            shortDescription: 'Ošetrenie vybranej časti chrbta - horná alebo dolná časť.',
          },
          {
            id: 'laser-hrud',
            slug: 'laserova-epilacia-hrud',
            name: 'Laserová epilácia - Hruď',
            price: '80 €',
            duration: '30min.',
            tagline: 'Definovaná hruď',
            shortDescription: 'Odstránenie chĺpkov na hrudi pre čistý, atletický vzhľad.',
            benefits: [
              { icon: 'athletic', title: 'Atletický look', description: 'Definované svaly' },
              { icon: 'grooming', title: 'Starostlivosť', description: 'Moderný muž' },
              { icon: 'permanent', title: 'Trvalé riešenie', description: 'Koniec holeniu' },
            ],
          },
          {
            id: 'laser-hrud-brucho',
            slug: 'laserova-epilacia-hrud-brucho',
            name: 'Laserová epilácia - Hruď + brucho',
            price: '150 €',
            duration: '30min.',
            tagline: 'Kompletný trup',
            shortDescription: 'Výhodná kombinácia hrude a brucha pre ucelený vzhľad.',
            benefits: [
              { icon: 'complete', title: 'Kompletný trup', description: 'Jednotný vzhľad' },
              { icon: 'value', title: 'Výhodná cena', description: 'Ušetríte oproti samostatným' },
              { icon: 'athletic', title: 'Fitness ready', description: 'Pre aktívnych mužov' },
            ],
          },
          {
            id: 'laser-intimne',
            slug: 'laserova-epilacia-intimne-partie',
            name: 'Laserová epilácia - Intímne partie',
            price: '100 €',
            duration: '30min.',
            tagline: 'Diskrétna starostlivosť',
            shortDescription: 'Profesionálne ošetrenie intímnej oblasti pre pánov.',
          },
          {
            id: 'laser-nohy-cele-p',
            slug: 'laserova-epilacia-nohy-cele-pani',
            name: 'Laserová epilácia - Nohy celé',
            price: '200 €',
            duration: '1h',
            tagline: 'Hladké nohy pre športovcov',
            shortDescription: 'Trvalé odstránenie chĺpkov na celých nohách - ideálne pre cyklistov a plaveckých.',
            forWhom: ['Pre cyklistov', 'Pre plavcov', 'Pre triatlonistov'],
          },
          {
            id: 'laser-podpazusie-p',
            slug: 'laserova-epilacia-podpazusie-pani',
            name: 'Laserová epilácia - Podpazušie',
            price: '60 €',
            duration: '30min.',
            tagline: 'Čisté podpazušie',
            shortDescription: 'Odstránenie chĺpkov v podpazuší pre lepšiu hygienu a menej potenia.',
          },
          {
            id: 'laser-ruky-p',
            slug: 'laserova-epilacia-ruky-pani',
            name: 'Laserová epilácia - Ruky',
            price: '80 €',
            duration: '30min.',
            tagline: 'Upravené ruky',
            shortDescription: 'Odstránenie chĺpkov na rukách pre čistý, upravený vzhľad.',
          },
        ],
      },
    ],
  },

  // ========================================
  // 4. BODY THERAPY (Masáže + Maderoterapia + Lymfodrenáž)
  // ========================================
  {
    id: 'regeneracia-tela',
    slug: 'regeneracia-tela',
    title: 'Body Therapy',
    description: 'Relaxačné masáže, lymfodrenáže a maderoterapia pre regeneráciu, uvoľnenie napätia a modelovanie postavy.',
    iconKey: 'heart',
    image: '/images/services/masaze-maderoterapia.webp',
    subcategories: [
      {
        id: 'masaze',
        slug: 'masaze',
        title: 'Masáže',
        description: 'Relaxačné a terapeutické masáže pre uvoľnenie napätia a regeneráciu tela.',
        image: '/images/services/masaze.webp',
        services: [
          {
            id: 'masaz-60',
            slug: '60-minutova-masaz',
            name: '60 minútová masáž',
            price: '40 €',
            duration: '1h',
            tagline: 'Rýchla regenerácia',
            shortDescription: 'Klasická relaxačná masáž pre uvoľnenie napätia a rýchlu regeneráciu.',
            benefits: [
              { icon: 'relaxation', title: 'Relaxácia', description: 'Hlboké uvoľnenie' },
              { icon: 'tension', title: 'Uvoľnenie napätia', description: 'Svaly bez bolesti' },
              { icon: 'energy', title: 'Nová energia', description: 'Revitalizácia tela' },
            ],
            forWhom: ['Pre pravidelnú relaxáciu', 'Pre sedavé zamestnanie', 'Pre stres'],
          },
          {
            id: 'masaz-90',
            slug: '90-minutova-masaz',
            name: '90 minútová masáž',
            price: '55 €',
            duration: '1h 30min.',
            popular: true,
            tagline: 'Hĺbková regenerácia',
            shortDescription: 'Predĺžená relaxačná masáž pre dôkladné uvoľnenie celého tela.',
            fullDescription: '90-minútová masáž poskytuje dostatok času na dôkladné ošetrenie celého tela. Masér sa môže venovať problémovým oblastiam a zabezpečiť hĺbkové uvoľnenie svalov. Ideálna voľba pre tých, kto chce skutočne oddýchnuť.',
            benefits: [
              { icon: 'complete', title: 'Kompletné ošetrenie', description: 'Celé telo' },
              { icon: 'deep', title: 'Hĺbková práca', description: 'Uvoľnenie kontraktúr' },
              { icon: 'wellbeing', title: 'Celková pohoda', description: 'Fyzická aj psychická' },
              { icon: 'value', title: 'Najobľúbenejšie', description: 'Ideálny pomer cena/čas' },
            ],
            process: [
              { step: 1, title: 'Konzultácia', description: 'Identifikácia problémových oblastí' },
              { step: 2, title: 'Zahriatie', description: 'Príprava svalov' },
              { step: 3, title: 'Hĺbková masáž', description: 'Uvoľnenie napätia' },
              { step: 4, title: 'Relaxácia', description: 'Záverečné upokojenie' },
            ],
            forWhom: ['Pre chronické napätie', 'Pre športovcov', 'Pre maximálnu relaxáciu'],
          },
        ],
      },
      {
        id: 'maderoterapia',
        slug: 'maderoterapia',
        title: 'Maderoterapia',
        description: 'Prírodná masážna technika drevenými nástrojmi pre modelovanie postavy a redukciu celulitídy.',
        image: '/images/services/masaze-maderoterapia.webp',
        services: [
          {
            id: 'maderoterapia-celotelova',
            slug: 'celotelova-maderoterapia',
            name: 'Celotelová maderoterapia',
            price: '65 €',
            duration: '1h 45min.',
            popular: true,
            tagline: 'Komplexné modelovanie postavy',
            shortDescription: 'Intenzívna celoteľová masáž drevenými nástrojmi pre redukciu celulitídy a tvarovanie postavy.',
            fullDescription: 'Celotelová maderoterapia je prírodná metóda pochádzajúca z Kolumbie. Špeciálne drevené nástroje masírujú telo, rozbíjajú tukové bunky, zlepšujú lymfatický obeh a redukujú celulitídu. Výsledkom je pevnejšia, hladšia pokožka a tvarovanejšia postava.',
            benefits: [
              { icon: 'sculpting', title: 'Modelovanie', description: 'Tvarovanie postavy' },
              { icon: 'cellulite', title: 'Redukcia celulitídy', description: 'Hladšia pokožka' },
              { icon: 'circulation', title: 'Lepší obeh', description: 'Lymfatická drenáž' },
              { icon: 'natural', title: '100% prírodné', description: 'Bez chemikálií' },
            ],
            process: [
              { step: 1, title: 'Príprava', description: 'Nanesenie oleja' },
              { step: 2, title: 'Masáž', description: 'Práca s drevenými nástrojmi' },
              { step: 3, title: 'Lymfodrenáž', description: 'Podpora odtoku lymfy' },
              { step: 4, title: 'Dokončenie', description: 'Upokojujúci krém' },
            ],
            forWhom: ['Pre redukciu celulitídy', 'Pre tvarovanie postavy', 'Pre detox tela'],
            note: 'Odporúčame sériu 8-12 ošetrení pre optimálne výsledky.',
          },
          {
            id: 'maderoterapia-trup',
            slug: 'maderoterapia-trup-horne-koncatiny',
            name: 'Maderoterapia - trup a horné končatiny',
            price: '40 €',
            duration: '1h 15min.',
            tagline: 'Spevnenie hornej časti tela',
            shortDescription: 'Cielená maderoterapia trupu a rúk pre spevnenie a tonizáciu.',
            benefits: [
              { icon: 'toning', title: 'Tonizácia', description: 'Spevnenie svalov' },
              { icon: 'arms', title: 'Pevné ruky', description: 'Redukcia povislej kože' },
              { icon: 'back', title: 'Chrbát', description: 'Uvoľnenie napätia' },
            ],
          },
          {
            id: 'maderoterapia-tvar',
            slug: 'maderoterapia-tvar',
            name: 'Maderoterapia - tvár',
            price: '22 €',
            duration: '35min.',
            tagline: 'Prirodzený liftingový efekt',
            shortDescription: 'Jemná maderoterapia tváre pre spevnenie kontúr a prirodzený anti-aging efekt.',
            benefits: [
              { icon: 'lifting', title: 'Liftingový efekt', description: 'Pevnejšie kontúry' },
              { icon: 'circulation', title: 'Lepšie prekrvenie', description: 'Žiarivá pleť' },
              { icon: 'relaxation', title: 'Relaxácia', description: 'Uvoľnenie tváre' },
            ],
            forWhom: ['Pre povädnutú pleť', 'Pre relaxáciu', 'Pre prirodzený anti-aging'],
          },
          {
            id: 'maderoterapia-zadok',
            slug: 'maderoterapia-zadok-dolne-koncatiny',
            name: 'Maderoterapia - zadok a dolné končatiny',
            price: '40 €',
            duration: '1h 15min.',
            tagline: 'Pevný zadok a stehná',
            shortDescription: 'Intenzívna maderoterapia problémových partií - zadok, stehná a lýtka.',
            benefits: [
              { icon: 'buttocks', title: 'Brazílsky zadok', description: 'Zdvihnutie a spevnenie' },
              { icon: 'thighs', title: 'Stehná bez celulitídy', description: 'Hladká pokožka' },
              { icon: 'legs', title: 'Ľahšie nohy', description: 'Redukcia opuchov' },
            ],
            forWhom: ['Pre celulitídu', 'Pre tvarovanie zadku', 'Pre ťažké nohy'],
          },
        ],
      },
      {
        id: 'lymfodrenaz',
        slug: 'lymfodrenaz',
        title: 'Lymfodrenáž',
        description: 'Špeciálna masážna technika pre podporu lymfatického systému, detox organizmu a redukciu opuchov.',
        image: '/images/services/lymfodrenaz.webp',
        services: [
          {
            id: 'lymfodrenaz-60',
            slug: 'lymfodrenaz-60min',
            name: 'Lymfodrenáž 60 min',
            price: '45 €',
            duration: '1h',
            tagline: 'Základná lymfodrenáž',
            shortDescription: 'Základná lymfodrenáž pre podporu lymfatického systému a detox organizmu.',
            benefits: [
              { icon: 'detox', title: 'Detoxikácia', description: 'Odstránenie toxínov' },
              { icon: 'drainage', title: 'Odvodnenie', description: 'Redukcia opuchov' },
              { icon: 'immunity', title: 'Imunita', description: 'Posilnenie obranyschopnosti' },
            ],
            forWhom: ['Pre ľahké opuchy', 'Pre pravidelnú údržbu', 'Pre detox'],
          },
          {
            id: 'lymfodrenaz-90',
            slug: 'lymfodrenaz-90min',
            name: 'Lymfodrenáž 90 min',
            price: '60 €',
            duration: '1h 30min.',
            tagline: 'Detox a odvodnenie',
            shortDescription: 'Špeciálna masážna technika pre podporu lymfatického systému a detox.',
            benefits: [
              { icon: 'detox', title: 'Detoxikácia', description: 'Odstránenie toxínov' },
              { icon: 'drainage', title: 'Odvodnenie', description: 'Redukcia opuchov' },
              { icon: 'immunity', title: 'Imunita', description: 'Posilnenie obranyschopnosti' },
            ],
            forWhom: ['Pre opuchy', 'Pre detox', 'Po operáciách'],
          },
          {
            id: 'lymfodrenaz-120',
            slug: 'lymfodrenaz-120min',
            name: 'Lymfodrenáž 120 min',
            price: '85 €',
            duration: '2h',
            tagline: 'Intenzívna lymfodrenáž',
            shortDescription: 'Predĺžená lymfodrenáž pre maximálny detoxikačný efekt celého tela.',
            benefits: [
              { icon: 'intensive', title: 'Intenzívna', description: 'Maximálny efekt' },
              { icon: 'complete', title: 'Celé telo', description: 'Vrátane tváre' },
              { icon: 'lasting', title: 'Dlhodobý efekt', description: 'Až niekoľko dní' },
            ],
            forWhom: ['Pre výrazné opuchy', 'Pre celulitídu', 'Pre pravidelnú detoxikáciu'],
          },
        ],
      },
    ],
  },

  // ========================================
  // 6. PIERCING
  // ========================================
  {
    id: 'piercing',
    slug: 'piercing',
    title: 'Piercing',
    description: 'Profesionálny piercing tváre, trupu a uší v sterilnom prostredí.',
    iconKey: 'piercing',
    image: '/images/services/piercing-hero.png',
    subcategories: [
      {
        id: 'microdermal',
        slug: 'microdermal',
        title: 'Microdermal',
        description: 'Microdermal piercing pre rôzne časti tela.',
        services: [
          {
            id: 'microdermal-hrudnik',
            slug: 'microdermal-hrudnik',
            name: 'Microdermal - Hrudník',
            price: '55 €',
            duration: '25min.',
            tagline: 'Unikátny šperk na hrudi',
            shortDescription: 'Microdermal piercing na hrudníku pre jedinečný a elegantný vzhľad.',
          },
          {
            id: 'microdermal-lice',
            slug: 'microdermal-lice',
            name: 'Microdermal - Líce',
            price: '55 €',
            duration: '25min.',
            tagline: 'Žiarivý akcent na tvári',
            shortDescription: 'Microdermal piercing na líci pre jedinečný a výrazný look.',
          },
        ],
      },
      {
        id: 'piercing-trupu',
        slug: 'piercing-trupu',
        title: 'Piercing trupu',
        description: 'Piercing pupka a bradaviek.',
        services: [
          {
            id: 'navel-piercing',
            slug: 'navel-piercing-pupok',
            name: 'Navel piercing - Pupok',
            price: '40 €',
            duration: '20min.',
            tagline: 'Klasika letného štýlu',
            shortDescription: 'Klasický piercing pupka pre sexy a sebavedomý look.',
            benefits: [
              { icon: 'sexy', title: 'Sexy vzhľad', description: 'Zdôraznenie postavy' },
              { icon: 'versatile', title: 'Variabilita', description: 'Množstvo šperkov' },
              { icon: 'safe', title: 'Bezpečné', description: 'Sterilné prostredie' },
            ],
          },
          {
            id: 'nipple-1x',
            slug: 'nipple-piercing-bradavka-1x',
            name: 'Nipple piercing - Bradavka 1x',
            price: '45 €',
            duration: '25min.',
            tagline: 'Diskrétny piercing',
            shortDescription: 'Nipple piercing jednej bradavky pre osobný štýl.',
          },
          {
            id: 'nipple-2x',
            slug: 'nipple-piercing-bradavka-2x',
            name: 'Nipple piercing - Bradavka 2x',
            price: '80 €',
            duration: '40min.',
            tagline: 'Symetrický look',
            shortDescription: 'Piercing oboch bradaviek za výhodnú cenu.',
          },
        ],
      },
      {
        id: 'piercing-tvare',
        slug: 'piercing-tvare',
        title: 'Piercing tváre',
        description: 'Piercing nosa, jazyka, obočia a pier.',
        services: [
          {
            id: 'nostril-piercing',
            slug: 'nostril-piercing-nos',
            name: 'Nostril piercing - Nos',
            price: '35 €',
            duration: '15min.',
            popular: true,
            tagline: 'Najobľúbenejší piercing',
            shortDescription: 'Klasický piercing nosového krídla pre jemný alebo výrazný akcent.',
            fullDescription: 'Nostril piercing je najpopulárnejší typ piercingu na tvári. Môžete si vybrať z rôznych šperkov od jemných kamienkov po výrazné krúžky. Vykonávame ho v sterilnom prostredí s kvalitným prvotným šperkom.',
            benefits: [
              { icon: 'popular', title: 'Najpopulárnejší', description: 'Overená klasika' },
              { icon: 'versatile', title: 'Veľa možností', description: 'Rôzne štýly šperkov' },
              { icon: 'quick', title: 'Rýchle', description: 'Len 15 minút' },
              { icon: 'safe', title: 'Bezpečné', description: 'Sterilné nástroje' },
            ],
            forWhom: ['Pre prvý piercing', 'Pre jemný akcent', 'Pre výrazný štýl'],
          },
          {
            id: 'piercing-jazyka',
            slug: 'piercing-jazyka',
            name: 'Piercing jazyka',
            price: '40 €',
            duration: '20min.',
            tagline: 'Odvážny a zmyselný',
            shortDescription: 'Piercing jazyka pre odvážnych a sebavedomých.',
          },
          {
            id: 'piercing-obocia',
            slug: 'piercing-obocia',
            name: 'Piercing obočia',
            price: '35 €',
            duration: '15min.',
            tagline: 'Edgy look',
            shortDescription: 'Piercing obočia pre drzý a alternatívny štýl.',
          },
          {
            id: 'piercing-pera',
            slug: 'piercing-pera-brada',
            name: 'Piercing pera/brada',
            price: '35 €',
            duration: '20min.',
            tagline: 'Výrazný detail',
            shortDescription: 'Labret, Monroe alebo Medusa piercing pre jedinečný vzhľad.',
          },
          {
            id: 'septum-piercing',
            slug: 'septum-piercing-nos',
            name: 'Septum piercing - Nos',
            price: '35 €',
            duration: '15min.',
            tagline: 'Trendy a výrazný',
            shortDescription: 'Septum piercing cez nosovú priehradku pre trendy look.',
          },
        ],
      },
      {
        id: 'piercing-usnej-chrupavky',
        slug: 'piercing-usnej-chrupavky',
        title: 'Piercing ušnej chrupavky',
        description: 'Helix, tragus, conch a ďalšie typy piercingu ušnej chrupavky.',
        services: [
          {
            id: 'conch-piercing',
            slug: 'conch-piercing',
            name: 'Conch piercing',
            price: '35 €',
            duration: '15min.',
            tagline: 'V strede ucha',
            shortDescription: 'Piercing v strednej časti ucha pre jedinečnú kombináciu šperkov.',
          },
          {
            id: 'daith-piercing',
            slug: 'daith-piercing',
            name: 'Daith piercing',
            price: '35 €',
            duration: '15min.',
            tagline: 'Elegantný a unikátny',
            shortDescription: 'Piercing vnútornej chrupavky, často sa spája aj s úľavou od migrén.',
          },
          {
            id: 'helix-piercing',
            slug: 'helix-piercing',
            name: 'Helix piercing - classic/flat/forward',
            price: '35 €',
            duration: '15min.',
            popular: true,
            tagline: 'Najobľúbenejší na uchu',
            shortDescription: 'Piercing hornej časti ucha pre elegantný alebo stacked look.',
            benefits: [
              { icon: 'popular', title: 'Veľmi obľúbený', description: 'Klasika piercingu' },
              { icon: 'stacking', title: 'Stacking', description: 'Ideálny na kombinácie' },
              { icon: 'options', title: 'Variácie', description: 'Classic, flat, forward' },
            ],
          },
          {
            id: 'industrial-piercing',
            slug: 'industrial-piercing',
            name: 'Industrial piercing',
            price: '40 €',
            duration: '15min.',
            tagline: 'Odvážny statement',
            shortDescription: 'Dva piercingové otvory spojené jednou tyčkou pre výrazný look.',
          },
          {
            id: 'rook-piercing',
            slug: 'rook-piercing',
            name: 'Rook piercing',
            price: '35 €',
            duration: '15min.',
            tagline: 'Elegantný detail',
            shortDescription: 'Piercing antihelixu pre unikátny vzhľad.',
          },
          {
            id: 'tragus-piercing',
            slug: 'tragus-piercing',
            name: 'Tragus piercing',
            price: '35 €',
            duration: '15min.',
            tagline: 'Malý ale výrazný',
            shortDescription: 'Piercing malej chrupavky pred ušným kanálom.',
          },
        ],
      },
      {
        id: 'piercing-usneho-laloka',
        slug: 'piercing-usneho-laloka',
        title: 'Piercing ušného laloka',
        description: 'Klasický piercing ušného laloka.',
        services: [
          {
            id: 'lobe-piercing',
            slug: 'lobe-piercing',
            name: 'Lobe piercing',
            price: '25 €',
            duration: '10min.',
            popular: true,
            tagline: 'Základný piercing',
            shortDescription: 'Klasický piercing laloka ucha pre náušnice.',
            benefits: [
              { icon: 'basic', title: 'Základ', description: 'Ideálny pre začiatočníkov' },
              { icon: 'quick', title: 'Rýchle hojenie', description: '6-8 týždňov' },
              { icon: 'affordable', title: 'Dostupné', description: 'Najlepšia cena' },
            ],
            forWhom: ['Pre prvý piercing', 'Pre deti', 'Pre viacnásobné piercinginy'],
          },
        ],
      },
      {
        id: 'skratenie-sperku',
        slug: 'skratenie-sperku-alebo-vymena',
        title: 'Skrátenie šperku alebo výmena',
        description: 'Servis existujúcich piercingov.',
        services: [
          {
            id: 'skratenie-vymena',
            slug: 'skratenie-vymena-sperku',
            name: 'Skrátenie/výmena šperku',
            price: '10 €',
            duration: '15min.',
            tagline: 'Profesionálna výmena',
            shortDescription: 'Bezpečná výmena alebo skrátenie šperku po zahojení piercingu.',
          },
        ],
      },
    ],
  },

  // ========================================
  // 7. PROFESIONÁLNE LÍČENIE
  // ========================================
  {
    id: 'profesionalne-licenie',
    slug: 'profesionalne-licenie',
    title: 'Profesionálne líčenie',
    description: 'Profesionálne líčenie pre každú príležitosť - svadobné, večerné, foto/TV.',
    iconKey: 'brush',
    image: '/images/services/profesionalne-licenie-hero.png',
    services: [
      {
        id: 'denne-licenie',
        slug: 'denne-licenie',
        name: 'Denné líčenie',
        price: '100 €',
        duration: '1h',
        tagline: 'Prirodzená krása',
        shortDescription: 'Profesionálne denné líčenie pre pracovné stretnutia alebo bežné dni.',
        benefits: [
          { icon: 'natural', title: 'Prirodzený look', description: 'Jemné zvýraznenie' },
          { icon: 'lasting', title: 'Celodenná výdrž', description: 'Odolné voči škvrnam' },
          { icon: 'professional', title: 'Profesionálne', description: 'Skúsení vizážisti' },
        ],
      },
      {
        id: 'foto-tv-licenie',
        slug: 'foto-tv-licenie',
        name: 'Foto/TV líčenie',
        price: '150 €',
        duration: '1h',
        tagline: 'Dokonalé pred kamerou',
        shortDescription: 'Špeciálne líčenie prispôsobené pre fotografovanie a televízne nahrávanie.',
        benefits: [
          { icon: 'camera', title: 'HD ready', description: 'Perfektné pod svetlami' },
          { icon: 'techniques', title: 'Špeciálne techniky', description: 'Konturovanie pre kameru' },
          { icon: 'flawless', title: 'Bezchybný vzhľad', description: 'Na každej fotografii' },
        ],
        forWhom: ['Pre fotenie', 'Pre video', 'Pre TV vystúpenia'],
      },
      {
        id: 'licenie-vlasy',
        slug: 'licenie-uprava-vlasov',
        name: 'Líčenie + úprava vlasov',
        price: '300 €',
        duration: '2h',
        popular: true,
        tagline: 'Kompletná premena',
        shortDescription: 'Kompletný balík profesionálneho líčenia a účesu pre špeciálnu príležitosť.',
        fullDescription: 'Tento kompletný balík zahŕňa profesionálne líčenie aj úpravu vlasov. Ideálny pre nevesty, družičky, maturantky alebo hostí na významných udalostiach. Naši vizážisti a kaderníci vás premenia podľa vašich predstáv.',
        benefits: [
          { icon: 'complete', title: 'Kompletná služba', description: 'Líčenie aj vlasy' },
          { icon: 'value', title: 'Výhodná cena', description: 'Ušetríte oproti samostatným' },
          { icon: 'coordination', title: 'Koordinácia', description: 'Zladený celkový look' },
          { icon: 'stress', title: 'Bez stresu', description: 'Všetko na jednom mieste' },
        ],
        forWhom: ['Pre svadby', 'Pre plesy', 'Pre významné udalosti'],
      },
      {
        id: 'prilezitostne-licenie',
        slug: 'prilezitostne-vecerne-licenie',
        name: 'Príležitostné / večerné líčenie',
        price: '150 €',
        duration: '1h',
        tagline: 'Elegancia na večer',
        shortDescription: 'Výraznejšie líčenie pre večerné akcie, plesy a špeciálne príležitosti.',
        benefits: [
          { icon: 'glamour', title: 'Glamour look', description: 'Dramatický efekt' },
          { icon: 'lasting', title: 'Dlhá výdrž', description: 'Celú noc' },
          { icon: 'smokey', title: 'Smokey eyes', description: 'A iné techniky' },
        ],
      },
      {
        id: 'skuska-licenia',
        slug: 'skuska-licenia',
        name: 'Skúška líčenia',
        price: '100 €',
        duration: '1h',
        tagline: 'Vyskúšajte vopred',
        shortDescription: 'Skúška líčenia pred svadbou alebo dôležitou udalosťou pre dokonalý výsledok.',
        benefits: [
          { icon: 'trial', title: 'Skúška', description: 'Vyskúšajte look vopred' },
          { icon: 'adjust', title: 'Úpravy', description: 'Doladenie detailov' },
          { icon: 'confidence', title: 'Istota', description: 'Žiadne prekvapenia' },
        ],
        forWhom: ['Pre nevesty', 'Pre významné udalosti', 'Pre istotu'],
      },
      {
        id: 'svadobne-licenie',
        slug: 'svadobne-licenie',
        name: 'Svadobné líčenie',
        price: '150 €',
        duration: '1h',
        popular: true,
        tagline: 'Váš dokonalý svadobný deň',
        shortDescription: 'Profesionálne svadobné líčenie pre najkrajší deň vášho života.',
        fullDescription: 'Svadobné líčenie je navrhnuté tak, aby vydržalo celý deň a vyzeralo dokonale na fotografiách aj naživo. Používame vysokokvalitné produkty a techniky, ktoré zvýraznia vašu prirodzenú krásu a zároveň zabezpečia, že budete žiariť od obradu až po poslednú polnočnú.',
        benefits: [
          { icon: 'lasting', title: 'Celodenná výdrž', description: 'Od rána do večera' },
          { icon: 'tears', title: 'Odolné slzám', description: 'Pre emotívne momenty' },
          { icon: 'photos', title: 'Fotogenické', description: 'Krásne na fotkách' },
          { icon: 'bridal', title: 'Svadobná krása', description: 'Zvýraznenie vašich čŕt' },
        ],
        forWhom: ['Pre nevesty', 'Pre svedkyne', 'Pre mamy nevesty'],
        note: 'Odporúčame skúšku líčenia pred svadbou.',
      },
    ],
  },

  // ========================================
  // 8. TETOVANIE
  // ========================================
  {
    id: 'tetovanie',
    slug: 'tetovanie',
    title: 'Tetovanie',
    description: 'Profesionálne tetovanie od mini motívov po veľké projekty.',
    iconKey: 'tattoo',
    image: '/images/services/tetovanie.webp',
    services: [
      {
        id: 'male-tetovanie',
        slug: 'male-tetovanie-3-6cm',
        name: 'Malé tetovanie - 3 - 6 cm',
        price: 'od 75 €',
        duration: '1h',
        tagline: 'Jemný detail',
        shortDescription: 'Malé tetovania ideálne pre jednoduché motívy, symboly alebo písmo.',
        benefits: [
          { icon: 'subtle', title: 'Jemné', description: 'Diskrétny detail' },
          { icon: 'quick', title: 'Rýchle', description: 'Hotové za hodinu' },
          { icon: 'affordable', title: 'Dostupné', description: 'Výhodná cena' },
        ],
      },
      {
        id: 'mini-tetovanie',
        slug: 'mini-tetovanie-do-3cm',
        name: 'Mini tetovanie - do 3 cm',
        price: '55 €',
        duration: '1h',
        tagline: 'Drobný, ale výrazný',
        shortDescription: 'Najmenšie tetovania pre symboly, iniciály alebo minimalistické motívy.',
        fullDescription: 'Mini tetovania sú ideálne pre tých, ktorí chcú jemný, diskrétny detail. Môže ísť o symbol, iniciálu, malý kvet alebo iný minimalistický motív. Vykonávame ich s najväčšou precíznosťou pre čistý a jasný výsledok.',
        benefits: [
          { icon: 'minimal', title: 'Minimalistické', description: 'Jemné a elegantné' },
          { icon: 'first', title: 'Prvé tetovanie', description: 'Ideálne na vyskúšanie' },
          { icon: 'versatile', title: 'Všestranné', description: 'Kdekoľvek na tele' },
          { icon: 'price', title: 'Najlepšia cena', description: 'Pevná suma' },
        ],
        forWhom: ['Pre prvé tetovanie', 'Pre diskrétny detail', 'Pre minimalistov'],
      },
      {
        id: 'stredne-tetovanie',
        slug: 'stredne-tetovanie-6-10cm',
        name: 'Stredné tetovanie - 6 - 10 cm',
        price: 'od 100 €',
        duration: '1h 30min.',
        tagline: 'Priestor pre kreativitu',
        shortDescription: 'Stredne veľké tetovania pre detailnejšie motívy a komplexnejšie návrhy.',
        benefits: [
          { icon: 'detail', title: 'Detaily', description: 'Priestor pre zložitejší návrh' },
          { icon: 'visible', title: 'Viditeľné', description: 'Výraznejší statement' },
          { icon: 'creative', title: 'Kreativita', description: 'Viac možností' },
        ],
      },
      {
        id: 'tetovanie-nad-15',
        slug: 'tetovanie-nad-15cm',
        name: 'Tetovanie nad 15 cm',
        price: 'od 170 €',
        duration: '2h 30min.',
        tagline: 'Veľký projekt',
        shortDescription: 'Veľké tetovania pre rozsiahle motívy, rukávy alebo náročné kompozície.',
        benefits: [
          { icon: 'statement', title: 'Statement piece', description: 'Výrazné dielo' },
          { icon: 'complex', title: 'Komplexné', description: 'Detailná práca' },
          { icon: 'custom', title: 'Na mieru', description: 'Unikátny návrh' },
        ],
        forWhom: ['Pre väčšie projekty', 'Pre rukávy', 'Pre chrbát a hruď'],
        note: 'Cena sa počíta individuálne podľa náročnosti.',
      },
      {
        id: 'velke-tetovanie',
        slug: 'velke-tetovanie-10-15cm',
        name: 'Veľké tetovanie - 10 - 15 cm',
        price: 'od 150 €',
        duration: '2h',
        tagline: 'Výrazný motív',
        shortDescription: 'Veľké tetovania pre výrazné motívy a detailné kresby.',
        benefits: [
          { icon: 'impactful', title: 'Výrazné', description: 'Neprehľadnuteľné' },
          { icon: 'detailed', title: 'Detailné', description: 'Precízna práca' },
          { icon: 'artistic', title: 'Umelecké', description: 'Priestor pre umenie' },
        ],
      },
    ],
  },

  // ========================================
  // 9. VÍKENDOVÉ VIP SLUŽBY
  // ========================================
  {
    id: 'vikendove-vip-sluzby',
    slug: 'vikendove-vip-sluzby',
    title: 'Víkendové VIP služby',
    description: 'Exkluzívne víkendové ošetrenia pre náročných klientov.',
    iconKey: 'crown',
    image: '/images/services/vikendove-vip-sluzby-hero.png',
    services: [
      {
        id: 'vikendove-osetrenie',
        slug: 'vikendove-osetrenie',
        name: 'Víkendové ošetrenie',
        tagline: 'Exkluzívna starostlivosť',
        shortDescription: 'VIP ošetrenia počas víkendu pre klientov, ktorí potrebujú flexibilitu.',
        fullDescription: 'Naše víkendové VIP služby sú určené pre náročných klientov, ktorí potrebujú ošetrenie mimo bežných pracovných hodín. Ponúkame kompletný rozsah našich služieb v exkluzívnom prostredí s individuálnym prístupom.',
        benefits: [
          { icon: 'exclusive', title: 'Exkluzívne', description: 'VIP prístup' },
          { icon: 'flexible', title: 'Flexibilita', description: 'Víkendové termíny' },
          { icon: 'privacy', title: 'Súkromie', description: 'Individuálna starostlivosť' },
          { icon: 'premium', title: 'Prémiové', description: 'Najvyšší štandard' },
        ],
        forWhom: ['Pre zaneprázdnených klientov', 'Pre VIP udalosti', 'Pre maximálne súkromie'],
        price: 'na vyžiadanie',
        duration: '1h',
      },
    ],
  },

  // ========================================
  // 10. CHAKRA CALIBRATION
  // ========================================
  {
    id: 'chakra-calibration',
    slug: 'chakra-calibration',
    title: 'Chakra Calibration',
    description: 'Odblokujte svoju energiu a cíťte sa ľahší a vitálnejší. Energetická harmonizácia čakier pre duševnú a fyzickú rovnováhu.',
    iconKey: 'chakra',
    image: '/images/services/chakra-calibration.webp',
    services: [
      {
        id: 'chakra-individual',
        slug: 'chakra-calibration-individualna',
        name: 'Chakra Calibration individuálna',
        price: '200 €',
        duration: '2h',
        popular: true,
        tagline: 'Obnovte vnútornú harmóniu',
        shortDescription: 'Hlbinná kalibrácia energetických centier pre obnovenie prirodzenej rovnováhy tela a mysle.',
        fullDescription: 'Chakra Calibration je holistická metóda, ktorá pracuje so siedmimi hlavnými energetickými centrami vášho tela. Počas sedenia identifikujeme bloky a nerovnováhy, ktoré môžu spôsobovať fyzické ťažkosti, emočnú nestabilitu alebo mentálnu únavu. Pomocou jemných techník a intuitívneho vedenia vám pomôžeme obnoviť prirodzený tok energie.',
        benefits: [
          {
            icon: 'energy',
            title: 'Zvýšená vitalita',
            description: 'Cíťte sa energickejšie a plní sily',
          },
          {
            icon: 'balance',
            title: 'Emočná rovnováha',
            description: 'Harmónia mysle a pocitov',
          },
          {
            icon: 'clarity',
            title: 'Mentálna jasnosť',
            description: 'Lepšia koncentrácia a rozhodovanie',
          },
          {
            icon: 'healing',
            title: 'Hlboké uvoľnenie',
            description: 'Uvoľnenie napätia a stresu',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Úvodná konzultácia',
            description: 'Preberiemo vaše potreby a aktuálny stav',
          },
          {
            step: 2,
            title: 'Diagnostika čakier',
            description: 'Identifikácia blokov a nerovnováh',
          },
          {
            step: 3,
            title: 'Kalibrácia',
            description: 'Jemná práca s energetickými centrami',
          },
          {
            step: 4,
            title: 'Integrácia',
            description: 'Ukotvenie novej energie a odporúčania',
          },
        ],
        forWhom: [
          'Pre tých, kto cíti chronickú únavu',
          'Pre ľudí v životných zmenách',
          'Pre hľadajúcich vnútorný pokoj',
          'Pre tých, kto chce hlbšie porozumieť sebe',
        ],
        note: 'Odporúčame pohodlné oblečenie a príchod v kľudnom rozpoložení.',
      },
      {
        id: 'chakra-parova',
        slug: 'chakra-calibration-parova',
        name: 'Chakra Calibration párová (2 osoby)',
        price: '300 €',
        duration: '2h',
        tagline: 'Posilnite vzájomné puto',
        shortDescription: 'Spoločná kalibrácia čakier pre páry alebo blízkych ľudí. Harmonizujte energiu medzi vami.',
        fullDescription: 'Párová Chakra Calibration je unikátna príležitosť prehĺbiť vzťah s partnerom, priateľom či rodinným príslušníkom na energetickej úrovni. Pracujeme s individuálnymi energetickými systémami oboch účastníkov a zároveň harmonizujeme vzájomnú dynamiku. Táto metóda pomáha odstrániť blokády v komunikácii, posilniť emočné spojenie a vytvoriť priestor pre hlbšie porozumenie.',
        benefits: [
          {
            icon: 'connection',
            title: 'Hlbšie spojenie',
            description: 'Posilnenie vzájomného puta',
          },
          {
            icon: 'communication',
            title: 'Lepšia komunikácia',
            description: 'Otvorenejší dialóg a porozumenie',
          },
          {
            icon: 'harmony',
            title: 'Vzájomná harmónia',
            description: 'Synchronizácia energií oboch partnerov',
          },
          {
            icon: 'growth',
            title: 'Spoločný rast',
            description: 'Podpora osobného rozvoja v páre',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Spoločný úvod',
            description: 'Definovanie spoločných cieľov sedenia',
          },
          {
            step: 2,
            title: 'Individuálna diagnostika',
            description: 'Analýza čakier každého účastníka',
          },
          {
            step: 3,
            title: 'Párová kalibrácia',
            description: 'Synchronizácia a harmonizácia energií',
          },
          {
            step: 4,
            title: 'Spoločná integrácia',
            description: 'Upevnenie spojenia a zdieľanie zážitkov',
          },
        ],
        forWhom: [
          'Pre páry túžiace po hlbšom spojení',
          'Pre rodičov s deťmi',
          'Pre priateľov na spoločnej ceste rastu',
          'Pre kohokoľvek, kto chce zdieľať túto skúsenosť',
        ],
        note: 'Ideálne pre páry, ktoré chcú posilniť svoj vzťah na hlbšej úrovni.',
      },
      {
        id: 'theta-healing',
        slug: 'theta-healing-individualne',
        name: 'Theta Healing individuálne',
        price: '100 €',
        duration: '1h',
        tagline: 'Prepíšte limitujúce vzorce',
        shortDescription: 'Transformačná technika pre zmenu hlboko zakorenených presvedčení a vzorcov správania.',
        fullDescription: 'Theta Healing je meditačná technika, ktorá pracuje s mozgovými vlnami v theta stave. V tomto stave hlbokej relaxácie máme prístup k podvedomiu, kde sú uložené naše presvedčenia, vzorce a bloky. Spoločne identifikujeme limitujúce presvedčenia, ktoré vám bránia žiť plnohodnotný život, a transformujeme ich na podporujúce.',
        benefits: [
          {
            icon: 'transform',
            title: 'Transformácia myslenia',
            description: 'Zmena limitujúcich presvedčení',
          },
          {
            icon: 'release',
            title: 'Uvoľnenie blokov',
            description: 'Zbavenie sa starých vzorcov',
          },
          {
            icon: 'peace',
            title: 'Vnútorný pokoj',
            description: 'Hlboká relaxácia a pokoj mysle',
          },
          {
            icon: 'potential',
            title: 'Nový potenciál',
            description: 'Otvorenie nových možností',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Rozhovor',
            description: 'Identifikácia témy na prácu',
          },
          {
            step: 2,
            title: 'Theta stav',
            description: 'Uvedenie do hlbokej relaxácie',
          },
          {
            step: 3,
            title: 'Práca s presvedčeniami',
            description: 'Identifikácia a transformácia blokov',
          },
          {
            step: 4,
            title: 'Integrácia',
            description: 'Ukotvenie nových vzorcov',
          },
        ],
        forWhom: [
          'Pre tých, kto chce zmeniť negatívne vzorce',
          'Pre ľudí bojujúcich s obavami a strachmi',
          'Pre hľadajúcich životné zmeny',
          'Pre kohokoľvek otvoreného transformácii',
        ],
        note: 'Sedenie prebieha v kľudnom prostredí. Prichádzajte s otvorenou mysľou.',
      },
    ],
  },
]

// ========================================
// Validation
// ========================================

// Validate all main categories at build time
mainCategories.forEach((category) => {
  const result = mainCategorySchema.safeParse(category)
  if (!result.success) {
    console.error(`Validation failed for category: ${category.id}`)
    console.error(result.error)
    throw new Error(`Invalid category data: ${category.id}`)
  }
})

// ========================================
// Helper Functions
// ========================================

/**
 * Get all main categories
 */
export function getAllMainCategories(): MainCategory[] {
  return mainCategories
}

/**
 * Get a main category by slug
 */
export function getMainCategoryBySlug(slug: string): MainCategory | undefined {
  return mainCategories.find((cat) => cat.slug === slug)
}

/**
 * Get a subcategory by slugs
 */
export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): { category: MainCategory; subcategory: Subcategory } | undefined {
  const category = getMainCategoryBySlug(categorySlug)
  if (!category || !category.subcategories) return undefined

  const subcategory = category.subcategories.find((sub) => sub.slug === subcategorySlug)
  if (!subcategory) return undefined

  return { category, subcategory }
}

/**
 * Get a service by slugs (works for both direct services and subcategory services)
 */
export function getServiceBySlug(
  categorySlug: string,
  subcategorySlug: string,
  serviceSlug: string
): { category: MainCategory; subcategory: Subcategory; service: SimpleService } | undefined {
  const result = getSubcategoryBySlug(categorySlug, subcategorySlug)
  if (!result) return undefined

  const service = result.subcategory.services.find((s) => s.slug === serviceSlug)
  if (!service) return undefined

  return { ...result, service }
}

/**
 * Get direct service from a category (for categories without subcategories)
 */
export function getDirectServiceBySlug(
  categorySlug: string,
  serviceSlug: string
): { category: MainCategory; service: SimpleService } | undefined {
  const category = getMainCategoryBySlug(categorySlug)
  if (!category || !category.services) return undefined

  const service = category.services.find((s) => s.slug === serviceSlug)
  if (!service) return undefined

  return { category, service }
}

/**
 * Get total service count for a category
 */
export function getCategoryServiceCount(category: MainCategory): number {
  if (category.services) {
    return category.services.length
  }
  if (category.subcategories) {
    return category.subcategories.reduce((total, sub) => total + sub.services.length, 0)
  }
  return 0
}

/**
 * Get all services flat (for search, cennik, etc.)
 */
export function getAllServicesFlat(): Array<{
  categorySlug: string
  categoryTitle: string
  subcategorySlug?: string
  subcategoryTitle?: string
  service: SimpleService
}> {
  const result: Array<{
    categorySlug: string
    categoryTitle: string
    subcategorySlug?: string
    subcategoryTitle?: string
    service: SimpleService
  }> = []

  mainCategories.forEach((category) => {
    if (category.services) {
      category.services.forEach((service) => {
        result.push({
          categorySlug: category.slug,
          categoryTitle: category.title,
          service,
        })
      })
    }
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        subcategory.services.forEach((service) => {
          result.push({
            categorySlug: category.slug,
            categoryTitle: category.title,
            subcategorySlug: subcategory.slug,
            subcategoryTitle: subcategory.title,
            service,
          })
        })
      })
    }
  })

  return result
}

/**
 * Search services by name
 */
export function searchServices(query: string): ReturnType<typeof getAllServicesFlat> {
  const lowerQuery = query.toLowerCase()
  return getAllServicesFlat().filter(
    (item) =>
      item.service.name.toLowerCase().includes(lowerQuery) ||
      item.categoryTitle.toLowerCase().includes(lowerQuery) ||
      (item.subcategoryTitle && item.subcategoryTitle.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Generate static params for category pages
 */
export function generateCategoryStaticParams(): { category: string }[] {
  return mainCategories.map((cat) => ({ category: cat.slug }))
}

/**
 * Generate static params for subcategory pages
 */
export function generateSubcategoryStaticParams(): { category: string; subcategory: string }[] {
  const params: { category: string; subcategory: string }[] = []

  mainCategories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        params.push({
          category: category.slug,
          subcategory: subcategory.slug,
        })
      })
    }
  })

  return params
}

/**
 * Generate static params for service detail pages
 */
export function generateServiceStaticParams(): { category: string; subcategory: string; service: string }[] {
  const params: { category: string; subcategory: string; service: string }[] = []

  mainCategories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        subcategory.services.forEach((service) => {
          params.push({
            category: category.slug,
            subcategory: subcategory.slug,
            service: service.slug,
          })
        })
      })
    }
  })

  return params
}

/**
 * Check if a category has subcategories
 */
export function categoryHasSubcategories(category: MainCategory): boolean {
  return !!category.subcategories && category.subcategories.length > 0
}

/**
 * Get all service slugs for sitemap generation
 * Returns flat array of all service routes
 */
export function getAllServiceSlugs(): string[] {
  const slugs: string[] = []
  
  mainCategories.forEach((category) => {
    // Direct services (no subcategory)
    if (category.services) {
      category.services.forEach((service) => {
        slugs.push(`${category.slug}/${service.slug}`)
      })
    }
    
    // Services in subcategories
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        subcategory.services.forEach((service) => {
          slugs.push(`${category.slug}/${subcategory.slug}/${service.slug}`)
        })
      })
    }
  })
  
  return slugs
}

/**
 * Get main category slugs for sitemap
 */
export function getAllMainCategorySlugs(): string[] {
  return mainCategories.map((cat) => cat.slug)
}
