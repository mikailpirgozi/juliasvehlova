import { z } from 'zod'

// ========================================
// Zod Schemas
// ========================================

export const serviceCategorySchema = z.enum([
  'face',
  'body',
  'energy',
  'chakra_calibration',
  'botulotoxin',
  'hyaluronic_acid',
  'permanent_makeup',
  'laser_epilation',
  'face_procedures',
  'body_procedures',
  'anti_aging',
  'cosmetics',
  'eyebrows_lashes',
  'professional_makeup',
  'device_treatments',
  'mesotherapy',
  'vip_services',
  'gift_vouchers',
])

export const priceRangeSchema = z.object({
  from: z.number().positive(),
  to: z.number().positive(),
  currency: z.literal('€'),
})

export const processStepSchema = z.object({
  step: z.number().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  duration: z.string().optional(),
})

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
})

export const serviceImageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().positive(),
  height: z.number().positive(),
})

export const seoMetaSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(50).max(160),
  keywords: z.array(z.string()),
})

export const serviceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  shortDescription: z.string().min(1).max(160),
  fullDescription: z.string().min(1),
  category: serviceCategorySchema,
  subcategory: z.string().optional(), // e.g., "Estetická medicína", "Permanentný Make-up"
  tags: z.array(z.string()).default([]), // e.g., ["botox", "anti-aging", "wrinkles"]
  benefits: z.array(z.string().min(1)),
  process: z.array(processStepSchema),
  duration: z.string().min(1),
  price: z.union([priceRangeSchema, z.string()]),
  contraindications: z.array(z.string()).optional(),
  aftercare: z.array(z.string()).optional(),
  faqs: z.array(faqSchema).optional(),
  images: z.array(serviceImageSchema),
  seoMeta: seoMetaSchema,
  featured: z.boolean().default(false),
})

// ========================================
// TypeScript Types
// ========================================

export type ServiceCategory = z.infer<typeof serviceCategorySchema>
export type PriceRange = z.infer<typeof priceRangeSchema>
export type ProcessStep = z.infer<typeof processStepSchema>
export type FAQ = z.infer<typeof faqSchema>
export type ServiceImage = z.infer<typeof serviceImageSchema>
export type SEOMeta = z.infer<typeof seoMetaSchema>
export type Service = z.infer<typeof serviceSchema>

// ========================================
// Category Metadata
// ========================================

// Icon keys for categories - used to render icons from @untitledui/icons
export type CategoryIconKey =
  | 'face'
  | 'body'
  | 'energy'
  | 'chakra'
  | 'sparkle'
  | 'droplet'
  | 'brush'
  | 'laser'
  | 'star'
  | 'clock'
  | 'flower'
  | 'eye'
  | 'heart'
  | 'device'
  | 'injection'
  | 'crown'
  | 'gift'

export const categoryMetadata: Record<
  ServiceCategory,
  { title: string; description: string; iconKey: CategoryIconKey }
> = {
  face: {
    title: 'Tvár',
    description: 'Doprajte svojej tvári presne to čo potrebuje, aby ste sa cítili zdravá a krásna',
    iconKey: 'face',
  },
  body: {
    title: 'Telo',
    description: 'Rýchle a efektívne riešenia pre pohodlný a spokojný pocit vo vlastnom tele',
    iconKey: 'body',
  },
  energy: {
    title: 'Energy',
    description: 'Doprajte Vášmu telu, psychike a imunite energy booster, ktorý Vás postaví späť na nohy',
    iconKey: 'energy',
  },
  chakra_calibration: {
    title: 'Chakra Calibration',
    description: 'Odblokujte svoju energiu a cíťte sa ľahší a vitálnejší',
    iconKey: 'chakra',
  },
  botulotoxin: {
    title: 'Botulotoxín',
    description: 'Redukcia vrások a jemných línií s prírodzeným výsledkom',
    iconKey: 'injection',
  },
  hyaluronic_acid: {
    title: 'Kyselina hyalurónová',
    description: 'Hydratácia a modelovanie tváre s elegantným účinkom',
    iconKey: 'droplet',
  },
  permanent_makeup: {
    title: 'Permanentný make-up',
    description: 'Trvalý make-up pier, obočia a očných liniek',
    iconKey: 'brush',
  },
  laser_epilation: {
    title: 'Laserová epilácia',
    description: 'Bezpečné a účinné odstránenie nežiaducich chĺpkov',
    iconKey: 'laser',
  },
  face_procedures: {
    title: 'Procedúry na tvár',
    description: 'Zdravie a lesk vašej kože s modernými metódami',
    iconKey: 'star',
  },
  body_procedures: {
    title: 'Telové procedúry',
    description: 'Modelovanie postávy a redukcia tuku',
    iconKey: 'body',
  },
  anti_aging: {
    title: 'Anti-aging ošetrenia',
    description: 'Profesionálne ošetrenia pre mladistvý vzhľad',
    iconKey: 'clock',
  },
  cosmetics: {
    title: 'Kozmetika',
    description: 'Klasické kozmetické ošetrenia pre zdravú pokožku',
    iconKey: 'flower',
  },
  eyebrows_lashes: {
    title: 'Obočie a mihalnice',
    description: 'Úprava, farbenie a laminovanie obočia a mihalníc',
    iconKey: 'eye',
  },
  professional_makeup: {
    title: 'Profesionálne líčenie',
    description: 'Líčenie pre každú príležitosť',
    iconKey: 'heart',
  },
  device_treatments: {
    title: 'Prístrojové ošetrenia',
    description: 'Moderné technológie pre efektívne výsledky',
    iconKey: 'device',
  },
  mesotherapy: {
    title: 'Mezoterapia',
    description: 'Revitalizácia pokožky a vlasov',
    iconKey: 'injection',
  },
  vip_services: {
    title: 'VIP služby',
    description: 'Exkluzívne balíčky pre výnimočné zážitky',
    iconKey: 'crown',
  },
  gift_vouchers: {
    title: 'Darčekové poukážky',
    description: 'Darujte zážitok krásy a relaxácie',
    iconKey: 'gift',
  },
}

// ========================================
// Services Data
// ========================================

const services: Service[] = [
  // ========================================
  // BOTULOTOXÍN
  // ========================================
  {
    id: 'botox-vrasky',
    slug: 'botulotoxin-mimicke-vrasky',
    title: 'Botulotoxín - Úprava mimických vrások',
    shortDescription:
      'Efektívna redukcia vrások na čele, okolo očí a medzi obočím pre prirodzený a svieži vzhľad.',
    fullDescription:
      'Botulotoxín je najbežnejšou neinvazívnou estetickou procedúrou na svete. Pôsobí relaxáciou svalov zodpovedných za mimické vrásky, čo vedie k vyhladeniu pokožky a mladistvejšiemu vzhľadu. Výsledky sú viditeľné už po 3-7 dňoch a pretrvávajú 3-6 mesiacov.',
    category: 'botulotoxin',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Vyhladenie vrások na čele, okolo očí (husie labky) a medzi obočím',
      'Prirodzený výsledok bez zmeny mimiky',
      'Rýchla procedúra bez nutnosti rekonvalescencie',
      'Prevenčné pôsobenie proti vzniku nových vrások',
      'Bezpečná a overená metóda používaná už viac ako 20 rokov',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description:
          'Detailná analýza tváre, rozhovor o očakávaniach a určenie vhodných oblastí na aplikáciu.',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Príprava',
        description: 'Očistenie a dezinfekcia pokožky, fotodokumentácia pred zákrokom.',
        duration: '5 min',
      },
      {
        step: 3,
        title: 'Aplikácia',
        description:
          'Jemné vpichy veľmi tenkou ihlou do určených svalových partií. Minimálna bolesť.',
        duration: '10-15 min',
      },
      {
        step: 4,
        title: 'Aftercare',
        description: 'Odporúčania pre starostlivosť po zákroku a dohodnutie kontroly.',
        duration: '5 min',
      },
    ],
    duration: '30-40 minút',
    price: { from: 120, to: 250, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Ochorenia nervovo-svalového systému (myasthenia gravis)',
      'Infekcia v mieste aplikácie',
      'Alergia na zložky botulotoxínu',
      'Užívanie niektorých liekov (antibiotík, antikoagulancií)',
    ],
    aftercare: [
      'Prvé 4 hodiny zostať vo vzpriamenej polohe, nehýbať sa',
      '24 hodín nevykonávať náročné cvičenie ani saunu',
      'Nemasírovať ošetrené oblasti 2 týždne',
      'Vyhnúť sa alkoholu 24 hodín pred a po zákroku',
      'Výsledky sú viditeľné po 3-7 dňoch, plný efekt po 14 dňoch',
    ],
    faqs: [
      {
        question: 'Je botulotoxín bezpečný?',
        answer:
          'Áno, botulotoxín je jednou z najbezpečnejších estetických procedúr. Používa sa už viac ako 30 rokov v medicíne a je schválený regulačnými úradmi po celom svete.',
      },
      {
        question: 'Bude moja tvár vyzerať zmrzlo?',
        answer:
          'Nie, pri správnej aplikácii zostáva mimika prirodzená. Cieľom je jemné vyhladenie vrások, nie úplná strata výrazu.',
      },
      {
        question: 'Ako dlho výsledky pretrvávajú?',
        answer:
          'Výsledky typicky trvajú 3-6 mesiacov, potom je potrebné opakovať aplikáciu. Pri pravidelných aplikáciách môže efekt trvať dlhšie.',
      },
      {
        question: 'Je procedúra bolestivá?',
        answer:
          'Väčšina pacientov pociťuje len mierne štípanie. Používame veľmi tenké ihly a aplikácia trvá len niekoľko minút.',
      },
    ],
    images: [
      {
        url: '/images/services/botox-forehead.jpg',
        alt: 'Botulotoxín aplikácia na čelo',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Botulotoxín Malacky - Úprava vrások | Julia Clinic',
      description:
        'Profesionálna aplikácia botulotoxínu v Malackách. Vyhladenie vrások na čele, okolo očí a medzi obočím. Prírodný výsledok bez rekonvalescencie.',
      keywords: [
        'botulotoxín Malacky',
        'botox Malacky',
        'úprava vrások',
        'botox čelo',
        'botox oči',
        'estetická medicína Malacky',
      ],
    },
    featured: true,
  },
  {
    id: 'botox-hyperhidroza',
    slug: 'botulotoxin-hyperhidroza-potenie',
    title: 'Botulotoxín - Liečba hyperhidrózy (nadmerné potenie)',
    shortDescription:
      'Efektívne riešenie nadmerného potenia podpazušia, dlaní a chodidiel pomocou botulotoxínu.',
    fullDescription:
      'Hyperhidróza (nadmerné potenie) môže výrazne ovplyvniť kvalitu života. Botulotoxín blokuje nervové signály do potných žliaz, čím sa potenie redukuje až o 80-90%. Výsledok trvá 6-12 mesiacov.',
    category: 'botulotoxin',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Redukcia potenia až o 90%',
      'Dlhotrvajúci efekt 6-12 mesiacov',
      'Zlepšenie sebavedomia a komfortu',
      'Žiadne škvrny od potu na oblečení',
      'Bezpečná alternatíva k chirurgickým riešeniam',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia a diagnostika',
        description: 'Posúdenie závažnosti hyperhidrózy, určenie oblastí na ošetrenie.',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Príprava oblasti',
        description: 'Očistenie a označenie oblastí pre aplikáciu.',
        duration: '10 min',
      },
      {
        step: 3,
        title: 'Aplikácia botulotoxínu',
        description: 'Séria malých injekcií do postihnutej oblasti.',
        duration: '20-30 min',
      },
      {
        step: 4,
        title: 'Kontrola',
        description: 'Kontrola výsledkov po 2 týždňoch, prípadné doplnenie.',
        duration: '10 min',
      },
    ],
    duration: '45-60 minút',
    price: { from: 350, to: 500, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Infekcia v oblasti aplikácie',
      'Ochorenia nervovo-svalového systému',
      'Alergia na botulotoxín',
    ],
    aftercare: [
      '24 hodín sa vyhnúť intenzívnemu cvičeniu',
      'Nemasírovať ošetrenú oblasť',
      'Výsledky sú viditeľné po 3-7 dňoch',
      'Plný efekt nastáva po 2 týždňoch',
    ],
    images: [
      {
        url: '/images/services/hyperhidrosis.jpg',
        alt: 'Liečba hyperhidrózy botulotoxínom',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Liečba potenia Botoxom Malacky | Julia Clinic',
      description:
        'Efektívna liečba hyperhidrózy botulotoxínom v Malackách. Redukcia potenia až o 90%, efekt 6-12 mesiacov. Podpazušie, dlane, chodidlá.',
      keywords: [
        'hyperhidróza Malacky',
        'liečba potenia',
        'botox proti poteniu',
        'nadmerné potenie',
        'potenie podpazušia',
      ],
    },
    featured: false,
  },

  // ========================================
  // KYSELINA HYALURÓNOVÁ
  // ========================================
  {
    id: 'filler-pery',
    slug: 'kyselina-hyaluronova-zvacsenie-pier',
    title: 'Kyselina hyalurónová - Zväčšenie a modelovanie pier',
    shortDescription:
      'Prirodzené zväčšenie, modelovanie a hydratácia pier pre plný a zmyselný vzhľad.',
    fullDescription:
      'Filery na báze kyseliny hyalurónové sú zlatým štandardom pre modelovanie pier. Umožňujú prirodzené zväčšenie objemu, definíciu kontúr, vyrovnanie asymetrie a hydratáciu. Výsledky sú okamžite viditeľné a pretrvávajú 6-12 mesiacov.',
    category: 'hyaluronic_acid',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Prirodzené zväčšenie objemu pier',
      'Definícia kontúr a Cupidovho luku',
      'Vyrovnanie asymetrie',
      'Hydratácia a zlepšenie textúry',
      'Okamžité výsledky, reverzibilný efekt',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia a dizajn',
        description: 'Analýza tváre, určenie ideálneho tvaru a objemu pier podľa zlatého rezu.',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Anestézia',
        description: 'Aplikácia lokálnej anestézie pre maximálny komfort.',
        duration: '10 min',
      },
      {
        step: 3,
        title: 'Aplikácia filleru',
        description: 'Precízna aplikácia kyseliny hyalurónové pomocí kanily alebo ihly.',
        duration: '20-30 min',
      },
      {
        step: 4,
        title: 'Masáž a finishing',
        description: 'Jemná masáž pre rovnomerné rozloženie materiálu.',
        duration: '5 min',
      },
    ],
    duration: '45-60 minút',
    price: { from: 180, to: 350, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Aktívny herpes v oblasti pier',
      'Alergia na kyselinu hyalurónové',
      'Autoimunitné ochorenia',
      'Infekcia v oblasti aplikácie',
    ],
    aftercare: [
      '24 hodín sa vyhnúť intenzívnemu cvičeniu, saune a alkoholu',
      'Nemasírovať pery prvé 2 dni (okrem odporúčania lekára)',
      'Použiť studené obklady pri opuchoch',
      'Spať na chrbte prvé 2 noci',
      'Vyhnúť sa makeup na pery 12 hodín',
      'Piť veľa vody pre optimálnu hydratáciu',
    ],
    faqs: [
      {
        question: 'Budú moje pery vyzerať prirodzene?',
        answer:
          'Áno, moderné techniky a produkty umožňujú dosiahnuť veľmi prirodzený výsledok. Vždy sa snažíme o harmóniu s celkovou tvárou.',
      },
      {
        question: 'Ako dlho pretrvá opuch?',
        answer:
          'Mierny opuch je normálny a zvyčajne trvá 2-3 dni. Konečný výsledok je viditeľný po 2 týždňoch, keď filler úplne zabudne.',
      },
      {
        question: 'Dá sa filler rozpustiť?',
        answer:
          'Áno, filery na báze kyseliny hyalurónové sa dajú kedykoľvek rozpustiť enzýmom hyaluronidáza, čo je veľká bezpečnostná výhoda.',
      },
    ],
    images: [
      {
        url: '/images/services/lip-filler.jpg',
        alt: 'Zväčšenie pier kyselinou hyalurónovou',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Zväčšenie pier Malacky - Lip filler | Julia Clinic',
      description:
        'Prirodzené zväčšenie a modelovanie pier kyselinou hyalurónovou v Malackách. Okamžité výsledky, bezpečná procedúra. Cena od 180€.',
      keywords: [
        'zväčšenie pier Malacky',
        'lip filler',
        'kyselina hyalurónová pery',
        'modelovanie pier',
        'filler na pery',
      ],
    },
    featured: true,
  },
  {
    id: 'filler-lica',
    slug: 'kyselina-hyaluronova-modelovanie-lic',
    title: 'Kyselina hyalurónová - Modelovanie líc',
    shortDescription: 'Zvýraznenie lícnych kostí a dodanie objemu pre mladistvý a svieži vzhľad.',
    fullDescription:
      'Modelovanie líc patrí medzi najobľúbenejšie procedúry pre omladzujúci efekt. Dodanie objemu v oblasti líc opticky zdvíha tvár, redukuje únavu a vytvára harmonické proporcie. Výsledok je prirodzený a trvá 12-18 mesiacov.',
    category: 'hyaluronic_acid',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Zvýraznenie lícnych kostí',
      'Optický lifting strednej časti tváre',
      'Redukcia "unavených" rýh',
      'Harmonizácia proporcie tváre',
      'Dlhotrvajúci efekt 12-18 mesiacov',
    ],
    process: [
      {
        step: 1,
        title: 'Analýza tváre',
        description: 'Posúdenie proporcie, určenie ideálnej projekcie líc.',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Označenie bodov',
        description: 'Presné označenie injection points pre optimálny výsledok.',
        duration: '5 min',
      },
      {
        step: 3,
        title: 'Aplikácia filleru',
        description: 'Deep injection v supraperiostálnej vrstve pre stabilný lifting efekt.',
        duration: '30 min',
      },
      {
        step: 4,
        title: 'Kontrola symetrie',
        description: 'Kontrola výsledku zo všetkých uhlov, prípadné doplnenie.',
        duration: '10 min',
      },
    ],
    duration: '60 minút',
    price: { from: 250, to: 400, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Alergia na kyselinu hyalurónové',
      'Autoimunitné ochorenia',
      'Zápaly v oblasti aplikácie',
    ],
    aftercare: [
      '48 hodín žiadne intenzívne cvičenie',
      'Spať na chrbte prvých 5 nocí',
      'Nemasírovať líca 2 týždne',
      'Minimálny opuch po procedúre',
      'Konečný výsledok po 2-4 týždňoch',
    ],
    images: [
      {
        url: '/images/services/cheek-filler.jpg',
        alt: 'Modelovanie líc kyselinou hyalurónovou',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Modelovanie líc - Cheek filler Malacky | Julia Clinic',
      description:
        'Profesionálne modelovanie líc kyselinou hyalurónovou v Malackách. Zvýraznenie lícnych kostí, optický lifting. Dlhotrvajúci efekt.',
      keywords: [
        'modelovanie líc',
        'cheek filler',
        'kyselina hyalurónová líca',
        'zvýraznenie lícnych kostí',
        'filler Malacky',
      ],
    },
    featured: false,
  },
  {
    id: 'filler-nosolzne',
    slug: 'kyselina-hyaluronova-nosolzne-ryhy',
    title: 'Kyselina hyalurónová - Výplň nososlzných rýh',
    shortDescription: 'Odstránenie tmavých kruhovpod očami a unavených rýh pre svieži vzhľad.',
    fullDescription:
      'Nososlzné ryhy (tear trough) vytvárajú unavený a smutný vzhľad. Špecializovaný filler dokáže túto oblasť jemne vyplniť, odstrániť tiene a opticky omladiť pohľad. Procedúra vyžaduje vysokú expertízu kvôli citlivej anatomii.',
    category: 'hyaluronic_acid',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Odstránenie tmavých kruhov pod očami',
      'Redukcia unavného vzhľadu',
      'Optické omladzenie pohľadu',
      'Vyhladenie prechodu líce-oči',
      'Prirodzený a jemný výsledok',
    ],
    process: [
      {
        step: 1,
        title: 'Detailná analýza',
        description:
          'Posúdenie hĺbky rýh, kvality kože, prítomnosti pigmentácie. Kľúčový krok pre bezpečnosť.',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Lokálna anestézia',
        description: 'Topická anestézia pre maximálny komfort v citlivej oblasti.',
        duration: '10 min',
      },
      {
        step: 3,
        title: 'Precízna aplikácia',
        description:
          'Kanyla technika pre minimálne riziko modrín a presné umiestnenie filleru v hlbokých vrstvách.',
        duration: '30 min',
      },
      {
        step: 4,
        title: 'Post-treatment masáž',
        description: 'Jemná masáž pre optimálne rozloženie produktu.',
        duration: '5 min',
      },
    ],
    duration: '60 minút',
    price: { from: 200, to: 350, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Hernia tukovej vrecká pod očami (vyžaduje chirurgické riešenie)',
      'Výrazná pigmentácia (filler nepomôže)',
      'Aktívny zápal v oblasti očí',
    ],
    aftercare: [
      'Žiadne masírovanie oblasti prvé 2 týždne',
      'Spať na chrbte so zdvihnutou hlavou 3 noci',
      'Minimálne modriny (kanyla technika)',
      'Vyhnúť sa intenzívnemu cvičeniu 48 hodín',
      'Výsledok viditeľný ihneď, finálny po 2 týždňoch',
    ],
    images: [
      {
        url: '/images/services/tear-trough.jpg',
        alt: 'Výplň nososlzných rýh',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Tear Trough Filler Malacky | Julia Clinic',
      description:
        'Odstránenie tmavých kruhov pod očami kyselinou hyalurónovou. Profesionálna kanyla technika, prirodzený výsledok. Malacky.',
      keywords: [
        'nososlzné ryhy',
        'tear trough filler',
        'tmavé kruhy pod očami',
        'filler pod oči',
        'unavený vzhľad',
      ],
    },
    featured: false,
  },

  // ========================================
  // PERMANENTNÝ MAKE-UP
  // ========================================
  {
    id: 'pmu-microblading',
    slug: 'permanentny-makeup-microblading-oboci',
    title: 'Permanentný make-up - Microblading obočia',
    shortDescription: 'Prirodzené chlpíkové dokreslenie obočia pre perfektný a trvanlivý vzhľad.',
    fullDescription:
      'Microblading je manuálna technika permanentného make-upu, pri ktorej sa pigment vpichuje do pokožky pomocou špeciálneho nástroja s mikroihlami. Výsledkom sú jemné, prirodzené chlpíky, ktoré vyzerajú ako skutočné obočie. Efekt trvá 1-2 roky.',
    category: 'permanent_makeup',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Prirodzené chlpíkové dokreslenie',
      'Ideálne pre riedke alebo asymetrické obočie',
      'Žiadny denný makeup obočia',
      'Vodotesné a dlhotrvajúce',
      'Prispôsobené tvaru tváre a farbe vlasov',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia a dizajn',
        description:
          'Určenie ideálneho tvaru, hrúbky a farby obočia. Nakreslenie a schválenie dizajnu.',
        duration: '30 min',
      },
      {
        step: 2,
        title: 'Anestézia',
        description: 'Aplikácia topickej anestézie pre bezbolestnú procedúru.',
        duration: '20 min',
      },
      {
        step: 3,
        title: 'Microblading',
        description: 'Presné dokreslenie chlpíkov manuálnou technikou blade.',
        duration: '90 min',
      },
      {
        step: 4,
        title: 'Aftercare inštruktáž',
        description: 'Detailné odporúčania pre hojenie a starostlivosť.',
        duration: '10 min',
      },
    ],
    duration: '2,5-3 hodiny',
    price: { from: 200, to: 300, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Diabetes',
      'Kožné ochorenia v oblasti obočia (ekzém, psoriáza)',
      'Cheloidné jazvy',
      'Užívanie Accutane (rok po ukončení)',
      'Chemoterapia',
    ],
    aftercare: [
      'Prvých 7 dní udržiavať oblasť suchú',
      'Neškrabať lupienky pri hojení',
      'Aplikovať odporúčanú masť',
      '4 týždne žiadna sauna, bazén, solárium',
      '10 dní žiadny makeup na obočie',
      'Korekcia po 4-6 týždňoch (zahrnutá v cene)',
    ],
    faqs: [
      {
        question: 'Je microblading bolestivý?',
        answer:
          'S anestéziou je procedúra komfortná. Väčšina klientov pociťuje len mierne nepohodlie, podobne ako škrabanie.',
      },
      {
        question: 'Ako dlho trvá hojenie?',
        answer:
          'Povrchové hojenie trvá 7-10 dní. Kompletné uzdravenie a ustálenie farby trvá 4-6 týždňov.',
      },
      {
        question: 'Prečo je potrebná korekcia?',
        answer:
          'Prvá aplikácia je základová vrstva. Pri korekcii sa dopĺňajú chlpíky a dolaďuje farba pre dlhotrvajúci efekt.',
      },
    ],
    images: [
      {
        url: '/images/services/microblading.jpg',
        alt: 'Microblading obočia',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Microblading obočia Malacky | Julia Clinic',
      description:
        'Profesionálny microblading obočia v Malackách. Prirodzené chlpíkové dokreslenie, dlhotrvajúci efekt 1-2 roky. Korekcia zahrnutá v cene.',
      keywords: [
        'microblading Malacky',
        'permanentný makeup obočie',
        'microblading obočia',
        'PMU obočie',
        'chlpíkové obočie',
      ],
    },
    featured: true,
  },
  {
    id: 'pmu-powder-brows',
    slug: 'permanentny-makeup-powder-brows',
    title: 'Permanentný make-up - Powder Brows',
    shortDescription:
      'Jemný, púdrový efekt obočia podobný make-upu pre definovaný a elegantný vzhľad.',
    fullDescription:
      'Powder Brows (ombré brows) je technika permanentného make-upu vytvárajúca jemný, púdrový efekt podobný nalíčenému obočiu. Začiatok obočia je svetlejší, smerom k chvostu sa intenzita zvyšuje. Ideálne pre všetky typy pokožky. Efekt trvá 2-3 roky.',
    category: 'permanent_makeup',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Púdrový, makeup efekt',
      'Dlhšia životnosť ako microblading (2-3 roky)',
      'Vhodné pre všetky typy pokožky vrátane mastnnej',
      'Žiadne denné líčenie obočia',
      'Definovaný a elegantný vzhľad',
    ],
    process: [
      {
        step: 1,
        title: 'Dizajn a mapovanie',
        description: 'Presné zameranie obočia podľa zlatého rezu, výber farby.',
        duration: '30 min',
      },
      {
        step: 2,
        title: 'Anestézia',
        description: 'Topická anestézia pre komfort počas procedúry.',
        duration: '20 min',
      },
      {
        step: 3,
        title: 'Aplikácia pigmentu',
        description: 'Postupné vrstvenie pigmentu PMU strojčekom pre ombré efekt.',
        duration: '90 min',
      },
      {
        step: 4,
        title: 'Aftercare briefing',
        description: 'Inštruktáž pre optimálne hojenie.',
        duration: '10 min',
      },
    ],
    duration: '2,5-3 hodiny',
    price: { from: 220, to: 320, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Diabetes',
      'Kožné ochorenia',
      'Keloidné jazvy',
      'Chemoterapia',
    ],
    aftercare: [
      'Prvých 7 dní udržiavať oblasť suchú',
      'Neškrabať kôry počas hojenia',
      'Aplikovať ošetrovací balzam',
      '4 týždne vyhýbať sa saune, bazénu',
      'Korekcia po 4-6 týždňoch',
    ],
    images: [
      {
        url: '/images/services/powder-brows.jpg',
        alt: 'Powder brows permanentný make-up',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Powder Brows Malacky - Ombré obočie | Julia Clinic',
      description:
        'Powder brows v Malackách - púdrový efekt obočia. Dlhšia životnosť ako microblading, vhodné pre všetky typy pokožky. Cena od 220€.',
      keywords: [
        'powder brows Malacky',
        'ombré obočie',
        'permanentný makeup',
        'púdrové obočie',
        'PMU Malacky',
      ],
    },
    featured: false,
  },

  // ========================================
  // LASEROVÁ EPILÁCIA
  // ========================================
  {
    id: 'laser-tvara',
    slug: 'laserova-epilacia-tvar',
    title: 'Laserová epilácia - Tvár',
    shortDescription:
      'Trvalé odstránenie nežiaducich chĺpkov na tvári pre hladkú a bezchybú pokožku.',
    fullDescription:
      'Laserová epilácia tváre je bezpečná a účinná metóda trvalého odstránenia chĺpkov. Laser cieli na melanín v chlpovom folikule, ktorý sa zničí tepelnou energiou. Po sérii ošetrení (6-8) dochádza k trvalému oslabeniu až vymiznutiu chĺpkov.',
    category: 'laser_epilation',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Trvalé odstránenie nežiaducich chĺpkov',
      'Hladká a bezchybá pokožka',
      'Žiadne vrastanie chĺpkov',
      'Úspora času na holenie a depilácii',
      'Vhodné pre všetky oblasti tváre',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Posúdenie typu pokožky a chĺpkov, fotodokumentácia.',
        duration: '10 min',
      },
      {
        step: 2,
        title: 'Príprava',
        description: 'Očistenie pokožky, aplikácia chladiaceho gélu.',
        duration: '5 min',
      },
      {
        step: 3,
        title: 'Laserovanie',
        description: 'Aplikácia laserového lúča na cieľovú oblasť.',
        duration: '15-20 min',
      },
      {
        step: 4,
        title: 'Ukľudnenie pokožky',
        description: 'Aplikácia upokojujúceho krému, SPF ochrana.',
        duration: '5 min',
      },
    ],
    duration: '30-40 minút',
    price: 'Od 40€ za ošetrenie (balíček 6-8 ošetrení)',
    contraindications: [
      'Tehotenstvo',
      'Aktívne opálenie alebo solárium',
      'Fotosenzibilita',
      'Melasma v ošetrovanej oblasti',
      'Užívanie Accutane',
    ],
    aftercare: [
      '48 hodín vyhýbať sa slnku',
      'Používať SPF 50+',
      'Žiadna sauna ani bazén 24 hodín',
      'Neškrabať pokožku',
      'Ďalšie ošetrenie po 4-6 týždňoch',
    ],
    images: [
      {
        url: '/images/services/laser-face.jpg',
        alt: 'Laserová epilácia tváre',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Laserová epilácia tváre Malacky | Julia Clinic',
      description:
        'Trvalé odstránenie chĺpkov na tvári laserom v Malackách. Hladká pokožka, žiadne vrastanie. Bezpečná metóda. Cena od 40€.',
      keywords: [
        'laserová epilácia tvár',
        'odstránenie chĺpkov tvár',
        'laser epilácia Malacky',
        'hladká pokožka',
      ],
    },
    featured: false,
  },

  // ========================================
  // PROCEDÚRY NA TVÁR
  // ========================================
  {
    id: 'chemicky-peeling',
    slug: 'chemicky-peeling-tvar',
    title: 'Chemický peeling tváre',
    shortDescription:
      'Omladzujúca procedúra pre zlepšenie textúry pokožky, redukciu pigmentácie a akné.',
    fullDescription:
      'Chemický peeling používa kyseliny (glykolová, salicylová, TCA) na odstránenie odumretých buniek a stimuláciu obnovy pokožky. Zlepšuje textúru, redukuje jemné vrásky, pigmentáciu, akné a rozšírené póry. Ponúkame povrchový, stredný a hlboký peeling podľa potrieb.',
    category: 'face_procedures',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Zlepšenie textúry a tónu pokožky',
      'Redukcia jemných vrások a línií',
      'Odstránenie pigmentových škvŕn',
      'Liečba akné a post-akné stôp',
      'Zúženie pórov',
      'Stimulácia kolagénu',
    ],
    process: [
      {
        step: 1,
        title: 'Analýza pokožky',
        description: 'Určenie typu peelings a koncentrácie kyselín.',
        duration: '10 min',
      },
      {
        step: 2,
        title: 'Príprava',
        description: 'Hĺbkové očistenie pokožky, odmastnenie.',
        duration: '10 min',
      },
      {
        step: 3,
        title: 'Aplikácia peelingu',
        description: 'Postupná aplikácia kyselín s monitoringom reakcie pokožky.',
        duration: '15-20 min',
      },
      {
        step: 4,
        title: 'Neutralizácia a starostlivosť',
        description: 'Neutralizácia kyselín, aplikácia upokojujúcej masky.',
        duration: '15 min',
      },
    ],
    duration: '50-60 minút',
    price: { from: 60, to: 150, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Aktívny herpes',
      'Otvorené rany',
      'Nedávne laserovanie (2 týždne)',
      'Užívanie Accutane',
    ],
    aftercare: [
      'Lúpanie pokožky 3-7 dní (normálne)',
      'Neodstraňovať lúpajúce sa kúsky',
      'SPF 50+ povinné',
      'Hydratácia pokožky',
      'Žiadne agresívne výrobky 1 týždeň',
      'Opakované ošetrenia po 2-4 týždňoch',
    ],
    images: [
      {
        url: '/images/services/chemical-peel.jpg',
        alt: 'Chemický peeling tváre',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Chemický peeling Malacky | Julia Clinic',
      description:
        'Profesionálny chemický peeling v Malackách. Zlepšenie textúry pokožky, redukcia vrások a pigmentácie. Povrchový až hlboký peeling.',
      keywords: [
        'chemický peeling Malacky',
        'peeling tváre',
        'omladzovanie pokožky',
        'kyselinový peeling',
        'akné liečba',
      ],
    },
    featured: false,
  },
  {
    id: 'microneedling',
    slug: 'microneedling-tvar',
    title: 'Microneedling - Dermapen',
    shortDescription:
      'Mikroihličková terapia pre omladzenie pokožky, redukciu jaziev a zlepšenie textúry.',
    fullDescription:
      'Microneedling je minimálne invazívna procedúra, pri ktorej sa do pokožky vytvárajú mikrojemné kanáliky pomocou Dermapen zariadenia s jemnými ihlami. Stimuluje prirodzenú produkciu kolagénu a elastínu, zlepšuje absorpciu účinných látok a obnovuje pokožku.',
    category: 'face_procedures',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Omladzenie a spevnenie pokožky',
      'Redukcia jemných vrások',
      'Zmenšenie akné a post-akné jaziev',
      'Zlepšenie textúry a tónu',
      'Zúženie pórov',
      'Zmenšenie strií',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Posúdenie stavu pokožky, určenie hĺbky needlingu.',
        duration: '10 min',
      },
      {
        step: 2,
        title: 'Anestézia',
        description: 'Topická anestézia pre bezbolestnú procedúru.',
        duration: '20 min',
      },
      {
        step: 3,
        title: 'Microneedling',
        description: 'Aplikácia Dermapen s možnosťou infúzie sér (PRP, kyselina hyalurónová).',
        duration: '30-40 min',
      },
      {
        step: 4,
        title: 'Post-treatment maska',
        description: 'Upokojujúca a regeneračná maska.',
        duration: '15 min',
      },
    ],
    duration: '75-90 minút',
    price: { from: 100, to: 200, currency: '€' },
    contraindications: [
      'Tehotenstvo',
      'Aktívne akné alebo infekcie',
      'Keloidné jazvy',
      'Užívanie antikoagulancií',
      'Accutane (6 mesiacov od ukončenia)',
    ],
    aftercare: [
      'Červenosť a citlivosť 24-48 hodín',
      'Žiadny makeup prvých 12 hodín',
      'SPF 50+ povinné',
      'Jemná hydratácia',
      'Žiadne agresívne čistenie 3 dni',
      'Séria 3-6 ošetrení (odstup 4-6 týždňov)',
    ],
    images: [
      {
        url: '/images/services/microneedling.jpg',
        alt: 'Microneedling Dermapen',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Microneedling Malacky - Dermapen | Julia Clinic',
      description:
        'Microneedling (Dermapen) v Malackách. Omladzenie pokožky, redukcia jaziev, zlepšenie textúry. Stimulácia kolagénu. Cena od 100€.',
      keywords: [
        'microneedling Malacky',
        'dermapen',
        'mikroihličková terapia',
        'omladzenie pokožky',
        'akné jazvy',
      ],
    },
    featured: false,
  },

  // ========================================
  // HLAVNÉ KATEGÓRIE - TVÁR
  // ========================================
  {
    id: 'face-category',
    slug: 'sluzby-tvar',
    title: 'Služby pre tvár',
    shortDescription:
      'Komplexná ponuka služieb pre tvár - od permanentného make-upu až po estetickú medicínu.',
    fullDescription:
      'Naša klinika ponúka široké spektrum služieb pre tvár vrátane permanentného make-upu, estetickej medicíny, kozmetických ošetrení a laserových procedúr.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Permanentný make-up obočia a pier',
      'Botulotoxín a kyselina hyalurónová',
      'Profesionálne líčenie',
      'Kozmetické ošetrenia',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Výber vhodnej procedúry podľa vašich potrieb',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Procedúra',
        description: 'Profesionálne vykonanie zvoleného ošetrenia',
      },
    ],
    duration: 'Závisí od zvolenej služby',
    price: 'Podľa cenníka',
    images: [
      {
        url: '/images/services/face-category.jpg',
        alt: 'Služby pre tvár',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Služby pre tvár Malacky | Julia Clinic',
      description:
        'Komplexné služby pre tvár v Malackách - permanentný make-up, botox, fillery, kozmetika.',
      keywords: ['služby tvár', 'kozmetika Malacky', 'permanentný makeup', 'botox'],
    },
    featured: true,
  },

  // ========================================
  // HLAVNÉ KATEGÓRIE - TELO
  // ========================================
  {
    id: 'body-category',
    slug: 'sluzby-telo',
    title: 'Služby pre telo',
    shortDescription:
      'Modelovanie postavy, laserová epilácia a ďalšie procedúry pre vaše telo.',
    fullDescription:
      'Ponúkame široký výber telových procedúr od laserovej epilácie cez kryolipolýzu až po mezoterapiu.',
    category: 'body',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Laserová epilácia',
      'Redukcia tuku',
      'Mezoterapia',
      'Liečba hyperhidrózy',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Určenie vhodnej procedúry',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Procedúra',
        description: 'Vykonanie ošetrenia',
      },
    ],
    duration: 'Závisí od zvolenej služby',
    price: 'Podľa cenníka',
    images: [
      {
        url: '/images/services/body-category.jpg',
        alt: 'Služby pre telo',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Služby pre telo Malacky | Julia Clinic',
      description: 'Telové procedúry v Malackách - laserová epilácia, modelovanie, mezoterapia.',
      keywords: ['laserová epilácia', 'redukcia tuku', 'telové procedúry Malacky'],
    },
    featured: true,
  },

  // ========================================
  // ENERGY
  // ========================================
  {
    id: 'energy-boost',
    slug: 'energy-boost-infuzia',
    title: 'Energy Boost Infúzia',
    shortDescription:
      'Vitamínový koktail pre okamžitý príval energie a posilnenie imunity.',
    fullDescription:
      'Energy boost infúzia je intravenózne podanie vitamínov, minerálov a aminokyselín, ktoré vášmu telu dodá okamžitý príval energie a podporí imunitný systém.',
    category: 'energy',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Okamžitý príval energie',
      'Posilnenie imunity',
      'Zlepšenie koncentrácie',
      'Detoxikácia organizmu',
      'Podpora regenerácie',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Posúdenie zdravotného stavu a výber vhodného koktailu',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Infúzia',
        description: 'Aplikácia vitamínového koktailu',
        duration: '30-45 min',
      },
    ],
    duration: '45-60 minút',
    price: { from: 90, to: 150, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Závažné ochorenia obličiek',
      'Alergia na zložky',
    ],
    aftercare: ['Piť dostatok tekutín', 'Vyhnúť sa alkoholu 24 hodín'],
    images: [
      {
        url: '/images/services/energy-boost.jpg',
        alt: 'Energy boost infúzia',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Energy Boost Infúzia Malacky | Julia Clinic',
      description:
        'Vitamínové infúzie v Malackách. Okamžitý príval energie, posilnenie imunity. Detox organizmu.',
      keywords: ['vitamínová infúzia', 'energy boost', 'posilnenie imunity', 'detox Malacky'],
    },
    featured: true,
  },

  // ========================================
  // CHAKRA CALIBRATION
  // ========================================
  {
    id: 'chakra-calibration',
    slug: 'chakra-calibration-session',
    title: 'Chakra Calibration - Energetická harmonizácia',
    shortDescription: 'Odblokujte svoju energiu a cíťte sa ľahší a vitálnejší.',
    fullDescription:
      'Chakra Calibration je energetická terapia zameraná na harmonizáciu a vyrovnanie siedmich hlavných čakier. Pomáha odblokovať energetické blokády, podporuje samoliečenie a duševnú rovnováhu.',
    category: 'chakra_calibration',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Odblokovanie energetických blokov',
      'Zlepšenie duševnej pohody',
      'Posilnenie vitality',
      'Harmonizácia tela a mysle',
      'Podpora samoliečenia',
    ],
    process: [
      {
        step: 1,
        title: 'Úvodná konzultácia',
        description: 'Rozhovor o aktuálnom stave a očakávaniach',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Energetická diagnostika',
        description: 'Posúdenie stavu čakier',
        duration: '10 min',
      },
      {
        step: 3,
        title: 'Harmonizácia',
        description: 'Vyrovnanie a čistenie čakier',
        duration: '40 min',
      },
      {
        step: 4,
        title: 'Záver',
        description: 'Odporúčania pre udržanie harmónie',
        duration: '10 min',
      },
    ],
    duration: '60-75 minút',
    price: { from: 70, to: 100, currency: '€' },
    images: [
      {
        url: '/images/services/chakra-calibration.jpg',
        alt: 'Chakra Calibration',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Chakra Calibration Malacky | Julia Clinic',
      description:
        'Energetická harmonizácia čakier v Malackách. Odblokovanie energie, duševná pohoda, podpora samoliečenia.',
      keywords: [
        'chakra calibration',
        'energetická terapia',
        'harmonizácia čakier',
        'alternativna medicina Malacky',
      ],
    },
    featured: true,
  },

  // ========================================
  // TELOVÉ PROCEDÚRY
  // ========================================
  {
    id: 'kryolipolyza',
    slug: 'kryolipolyza-redukcia-tuku',
    title: 'Kryolipolýza - Neinvazívna redukcia tuku',
    shortDescription:
      'Zmrazenie tukových buniek pre prirodzenú redukciu tuku bez chirurgického zákroku.',
    fullDescription:
      'Kryolipolýza (CoolSculpting) je FDA schválená metóda nechirurgickej redukcie tuku. Cielené zmrazenie (-10°C) spôsobí prirodzenú smrť tukových buniek, ktoré sa potom prirodzene odstránia z tela. Viditeľné výsledky po 2-3 mesiacoch s redukciou tuku o 20-25% v ošetrenej oblasti.',
    category: 'body_procedures',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Nechirurgická alternatíva k liposukcii',
      'Žiadna anestézia ani operácia',
      'Žiadna rekonvalescencia',
      'Prirodzená redukcia tuku o 20-25%',
      'Trvalé výsledky (tukové bunky sa nevrátia)',
      'FDA schválená metóda',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia a meranie',
        description: 'Určenie problémových oblastí, meranie, fotodokumentácia.',
        duration: '20 min',
      },
      {
        step: 2,
        title: 'Označenie oblasti',
        description: 'Označenie treatment zóny, aplikácia ochranného gélu.',
        duration: '10 min',
      },
      {
        step: 3,
        title: 'Kryolipolýza',
        description:
          'Aplikácia aplikátora, kontrolované zmrazenie tuku. Môžete čítať, pracovať na laptope.',
        duration: '35-60 min/oblasť',
      },
      {
        step: 4,
        title: 'Masáž',
        description: 'Intenzívna masáž ošetrenej oblasti pre maximálny efekt.',
        duration: '2 min',
      },
    ],
    duration: '60-90 minút (1 oblasť)',
    price: { from: 250, to: 400, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Kryoglobulinémia',
      'Studená urtikária',
      'Hernias v oblasti ošetrenia',
      'BMI > 35',
    ],
    aftercare: [
      'Mierny opuch, červenosť, znecitlivenie (normálne)',
      'Žiadne obmedzenia aktivity',
      'Masáž oblasti 5 min/deň prvé 2 týždne',
      'Výsledky po 4-6 týždňoch',
      'Finálny efekt po 2-3 mesiacoch',
      'Udržiavať zdravý životný štýl pre trvalé výsledky',
    ],
    faqs: [
      {
        question: 'Koľko kíl schudnem?',
        answer:
          'Kryolipolýza nie je metóda na chudnutie, ale na modelovanie postavy. Odstráni približne 20-25% tukových buniek v ošetrenej oblasti.',
      },
      {
        question: 'Je to bolestivé?',
        answer:
          'Prvých 5-10 minút môžete cítiť chlad a ťahanie. Potom oblasť znecitliví a procedúra je komfortná.',
      },
      {
        question: 'Koľko ošetrení potrebujem?',
        answer:
          'Väčšina klientov vidí výborné výsledky po 1 ošetrení. Pre maximálny efekt sa môže odporúčať 2. ošetrenie po 2-3 mesiacoch.',
      },
    ],
    images: [
      {
        url: '/images/services/cryolipolysis.jpg',
        alt: 'Kryolipolýza - redukcia tuku',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Kryolipolýza Malacky - CoolSculpting | Julia Clinic',
      description:
        'Nechirurgická redukcia tuku kryolipolýzou v Malackách. Zmrazenie tuku bez operácie. Redukcia o 20-25%, trvalé výsledky. FDA schválená metóda.',
      keywords: [
        'kryolipolýza Malacky',
        'coolsculpting',
        'redukcia tuku',
        'zmrazenie tuku',
        'nechirurgická liposukcia',
      ],
    },
    featured: false,
  },

  // ========================================
  // TVÁR - DETAIL SLUŽBY
  // ========================================

  // PMU - Tetovanie pier
  {
    id: 'pmu-tetovanie-pier',
    slug: 'permanentny-makeup-tetovanie-pier',
    title: 'Tetovanie pier',
    shortDescription:
      'Permanentné tetovanie pier pre prirodzenú farbu a optické zväčšenie.',
    fullDescription:
      'Tetovanie pier je technológia s ktorou vyriešite mnoho problémov. Najčastejšími sú: strata pigmentu po herpesoch, asymetria pier, prirodzený úbytok prírodného hyaluronu z pier čo má na svedomí optické zmenšenie a scvrknutie pier. Pery po vytetovaní sú zjednotené a pôsobia opticky väčšie a hlavne sa zvýrazní ich farba. Používame jemné pigmenty pre prirodzený výsledok.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Zjednotenie farby pier',
      'Optické zväčšenie',
      'Korekcia asymetrie',
      'Prirodzený výsledok',
      'Dlhotrvajúci efekt',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Výber farby a určenie tvaru',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Tetovanie',
        description: 'Aplikácia pigmentu do pier',
        duration: '90 min',
      },
    ],
    duration: '120 minút',
    price: '200 €',
    images: [
      {
        url: '/images/services/lip-tattoo.jpg',
        alt: 'Tetovanie pier',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Tetovanie pier Malacky | Julia Clinic',
      description:
        'Permanentné tetovanie pier v Malackách. Prirodzená farba, optické zväčšenie. Cena 200€.',
      keywords: ['tetovanie pier', 'permanentný makeup pery', 'lip tattoo Malacky'],
    },
    featured: false,
  },

  // PMU - Hair Strokes obočie
  {
    id: 'pmu-hair-strokes',
    slug: 'permanentny-makeup-hair-strokes',
    title: 'Permanentný make-up obočie Hair Strokes',
    shortDescription:
      'Realistická chĺpková štruktúra obočia pomocou semi-permanentného tetovania.',
    fullDescription:
      'Každá žena túži mať obočie vždy upravené a pritom prirodzené. Riešenie ponúka Hairstrokes technika, ktorá je vďaka prirodzenému výsledku momentálne najžiadanejšou metódou úpravy obočia. Ide o semi-permanentné tetovanie, ktorého výsledkom je veľmi realistická chĺpková štruktúra obočia. Táto inovatívna prístrojová technika je veľmi šetrná k pokožke a je vhodná pre všetky typy pleti.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Realistická chĺpková štruktúra',
      'Prirodzený výsledok',
      'Vhodné pre všetky typy pleti',
      'Šetrná technika',
      'Korekcia tvaru a asymetrie',
    ],
    process: [
      {
        step: 1,
        title: 'Návrh tvaru',
        description: 'Individuálny návrh obočia podľa tváre',
        duration: '20 min',
      },
      {
        step: 2,
        title: 'Aplikácia',
        description: 'Precízne vytvorenie chĺpkov',
        duration: '90 min',
      },
    ],
    duration: '120 minút',
    price: '200 €',
    images: [
      {
        url: '/images/services/hair-strokes.jpg',
        alt: 'Hair Strokes obočie',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Hair Strokes obočie Malacky | Julia Clinic',
      description:
        'Permanentný makeup obočia Hair Strokes v Malackách. Realistická chĺpková štruktúra, prirodzený výsledok.',
      keywords: ['hair strokes', 'permanentný makeup obočie', 'PMU Malacky'],
    },
    featured: false,
  },

  // PMU - Powder Brows
  {
    id: 'pmu-powder-brows-detail',
    slug: 'permanentny-makeup-powder-brows-detail',
    title: 'Permanentný make-up obočie Powder Brows',
    shortDescription:
      'Púdrové obočie s prirodzeným vzhľadom bez ostrých kontúr.',
    fullDescription:
      'PowderBrows, alebo púdrové obočie, je metóda úpravy obočia, pri ktorej sa pomocou tetovacieho strojčeka do povrchovej vrstvy pokožky vpravuje postupne vrstvením pigment. Výsledkom je prirodzene pôsobiace a upravené obočie bez ostrých kontúr. Táto technika je vhodná pre všetky typy pleti a vekové kategórie.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Prirodzený púdrový efekt',
      'Bez ostrých kontúr',
      'Vhodné pre všetky typy pleti',
      'Dlhotrvajúci výsledok',
      'Postupné vrstvenie pigmentu',
    ],
    process: [
      {
        step: 1,
        title: 'Návrh tvaru',
        description: 'Individuálne navrhnutý tvar obočia',
        duration: '20 min',
      },
      {
        step: 2,
        title: 'Aplikácia pigmentu',
        description: 'Postupné vrstvenie pre púdrový efekt',
        duration: '90 min',
      },
    ],
    duration: '120 minút',
    price: '200 €',
    images: [
      {
        url: '/images/services/powder-brows-detail.jpg',
        alt: 'Powder Brows obočie',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Powder Brows Malacky | Julia Clinic',
      description:
        'Púdrové obočie Powder Brows v Malackách. Prirodzený vzhľad, vhodné pre všetky typy pleti.',
      keywords: ['powder brows', 'púdrové obočie', 'PMU obočie Malacky'],
    },
    featured: false,
  },

  // PMU - Korekcia
  {
    id: 'pmu-korekcia',
    slug: 'permanentny-makeup-korekcia',
    title: 'Permanentný make-up korekcia do 5 týždňov',
    shortDescription:
      'Korekcia permanentného make-upu po hojení pre dokonalý výsledok.',
    fullDescription:
      'Korekcia permanentného make-upu je nevyhnutná pre dosiahnutie dlhotrvajúceho a dokonalého výsledku. Vykonáva sa 4-6 týždňov po prvej aplikácii, keď je pokožka úplne zahojená. Počas korekcie sa dopĺňa pigment a dolaďuje tvar.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Dopĺňanie pigmentu',
      'Doladenie tvaru',
      'Dlhotrvajúci efekt',
      'Perfektný finálny výsledok',
    ],
    process: [
      {
        step: 1,
        title: 'Posúdenie',
        description: 'Kontrola zahojenia a hodnotenie výsledku',
        duration: '10 min',
      },
      {
        step: 2,
        title: 'Korekcia',
        description: 'Dopĺňanie a dolaďovanie',
        duration: '60 min',
      },
    ],
    duration: '60 minút',
    price: '100 €',
    images: [
      {
        url: '/images/services/pmu-correction.jpg',
        alt: 'PMU korekcia',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'PMU korekcia Malacky | Julia Clinic',
      description:
        'Korekcia permanentného make-upu v Malackách. Dopĺňanie pigmentu pre dokonalý výsledok.',
      keywords: ['PMU korekcia', 'permanentný makeup korekcia', 'touch up Malacky'],
    },
    featured: false,
  },

  // PMU - Odstránenie laserom
  {
    id: 'pmu-odstranenie-laser',
    slug: 'odstranenie-tetovania-oboci-laserom',
    title: 'Odstránenie tetovania obočia ND YAG laserom',
    shortDescription:
      'Bezpečné odstránenie nežiaduceho permanentného make-upu laserom.',
    fullDescription:
      'ND YAG laser je najefektívnejšia metóda na odstránenie permanentného make-upu obočia. Laser dokáže rozbiť pigment na menšie častice, ktoré telo prirodzene vylúči. Počet ošetrení závisí od intenzity a farby pigmentu.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Bezpečné odstránenie PMU',
      'Efektívna technológia',
      'Minimálne riziko jazvenia',
      'Postupné vyblednutie pigmentu',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Posúdenie pigmentu a plánovanie ošetrení',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Laserovanie',
        description: 'Aplikácia lasera na pigmentované oblasti',
        duration: '20 min',
      },
    ],
    duration: '60 minút',
    price: '100 €',
    images: [
      {
        url: '/images/services/laser-removal.jpg',
        alt: 'Odstránenie PMU laserom',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Odstránenie PMU laserom Malacky | Julia Clinic',
      description:
        'Odstránenie permanentného make-upu ND YAG laserom v Malackách. Bezpečná metóda.',
      keywords: ['odstránenie PMU', 'laser removal', 'ND YAG Malacky'],
    },
    featured: false,
  },

  // PMU - Očné linky
  {
    id: 'pmu-ocne-linky',
    slug: 'permanentny-makeup-ocne-linky',
    title: 'Permanentný make-up očné linky',
    shortDescription:
      'Zvýraznenie očí pomocou permanentných očných liniek.',
    fullDescription:
      'Permanentné očné linky sú ideálnym riešením pre ženy, ktoré chcú mať oči vždy zvýraznené bez nutnosti denného líčenia. Možno vytvoriť jemné prirodzené línie alebo výraznejšie eyeliner podľa vašich preferencií.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Zvýraznenie očí',
      'Žiadne denné líčenie očí',
      'Vodotesné',
      'Dlhotrvajúci efekt',
      'Rôzne štýly od jemných po výrazné',
    ],
    process: [
      {
        step: 1,
        title: 'Návrh',
        description: 'Určenie štýlu a hrúbky linky',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Aplikácia',
        description: 'Precízne vytvorenie očných liniek',
        duration: '75 min',
      },
    ],
    duration: '90 minút',
    price: { from: 120, to: 150, currency: '€' },
    images: [
      {
        url: '/images/services/eyeliner-pmu.jpg',
        alt: 'PMU očné linky',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'PMU očné linky Malacky | Julia Clinic',
      description:
        'Permanentné očné linky v Malackých. Zvýraznenie očí bez denného líčenia.',
      keywords: ['PMU očné linky', 'permanentný eyeliner', 'makeup očí Malacky'],
    },
    featured: false,
  },

  // Profesionálne líčenie - Denné
  {
    id: 'licenie-denne',
    slug: 'profesionalne-licenie-denne',
    title: 'Denné líčenie',
    shortDescription:
      'Prirodzené denné líčenie pre každodennú eleganciu.',
    fullDescription:
      'Denné líčenie je ideálne pre pracovné stretnutia, bežné aktivity alebo ľubovoľnú dennú príležitosť. Vytvárame prirodzený vzhľad, ktorý zvýrazní vašu prirodzenú krásu bez prehnania.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Prirodzený vzhľad',
      'Zvýraznenie prirodzenej krásy',
      'Dlhotrvajúce',
      'Profesionálna aplikácia',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Určenie štýlu a preferencií',
        duration: '5 min',
      },
      {
        step: 2,
        title: 'Líčenie',
        description: 'Aplikácia denného make-upu',
        duration: '25 min',
      },
    ],
    duration: '30 minút',
    price: '35 €',
    images: [
      {
        url: '/images/services/daily-makeup.jpg',
        alt: 'Denné líčenie',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Denné líčenie Malacky | Julia Clinic',
      description:
        'Profesionálne denné líčenie v Malackách. Prirodzený vzhľad pre každú príležitosť.',
      keywords: ['denné líčenie', 'profesionálny makeup', 'líčenie Malacky'],
    },
    featured: false,
  },

  // Profesionálne líčenie - Večerné
  {
    id: 'licenie-vecerne',
    slug: 'profesionalne-licenie-vecerne',
    title: 'Večerné líčenie',
    shortDescription:
      'Elegantné večerné líčenie pre špeciálne príležitosti.',
    fullDescription:
      'Večerné líčenie je výraznejšie a sofistikovanejšie ako denné. Ideálne pre večierky, galavečery, divadlo alebo akúkoľvek špeciálnu večernú udalosť. Zvýrazňujeme oči a pery pre elegantný a zmyselný vzhľad.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Elegantný výrazný vzhľad',
      'Dlhotrvajúce',
      'Zvýraznenie očí a pier',
      'Profesionálna aplikácia',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Určenie štýlu podľa príležitosti',
        duration: '5 min',
      },
      {
        step: 2,
        title: 'Líčenie',
        description: 'Aplikácia večerného make-upu',
        duration: '40 min',
      },
    ],
    duration: '45 minút',
    price: '45 €',
    images: [
      {
        url: '/images/services/evening-makeup.jpg',
        alt: 'Večerné líčenie',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Večerné líčenie Malacky | Julia Clinic',
      description:
        'Profesionálne večerné líčenie v Malackách. Elegantný vzhľad pre špeciálne príležitosti.',
      keywords: ['večerné líčenie', 'party makeup', 'elegantné líčenie Malacky'],
    },
    featured: false,
  },

  // Profesionálne líčenie - Svadobné
  {
    id: 'licenie-svadobne',
    slug: 'profesionalne-licenie-svadobne',
    title: 'Svadobné líčenie',
    shortDescription:
      'Dokonalé svadobné líčenie pre váš veľký deň.',
    fullDescription:
      'Svadobné líčenie je najprestížnejším typom líčenia. Vytvára dokonalý vzhľad, ktorý vydrží celý deň a bude vyzerať skvele na fotografiách. Používame dlhotrvajúce produkty a techniky pre perfektný výsledok.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Dokonalý vzhľad na celý deň',
      'Fotograficky perfektné',
      'Dlhotrvajúce produkty',
      'Profesionálna aplikácia',
      'Vodotesné',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Plánovanie vzhľadu podľa šiat a preferencií',
        duration: '10 min',
      },
      {
        step: 2,
        title: 'Svadobné líčenie',
        description: 'Precízna aplikácia s dlhotrvajúcimi produktmi',
        duration: '50 min',
      },
    ],
    duration: '60 minút',
    price: '60 €',
    images: [
      {
        url: '/images/services/wedding-makeup.jpg',
        alt: 'Svadobné líčenie',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Svadobné líčenie Malacky | Julia Clinic',
      description:
        'Profesionálne svadobné líčenie v Malackách. Dokonalý vzhľad pre váš veľký deň.',
      keywords: ['svadobné líčenie', 'bridal makeup', 'nevesta líčenie Malacky'],
    },
    featured: false,
  },

  // Profesionálne líčenie - Skúšobné svadobné
  {
    id: 'licenie-skusobne-svadobne',
    slug: 'skusobne-svadobne-licenie',
    title: 'Skúšobné svadobné líčenie',
    shortDescription:
      'Skúšobné líčenie pred svadbou pre nájdenie perfektného vzhľadu.',
    fullDescription:
      'Skúšobné svadobné líčenie je dôležitou prípravou pred svadbou. Spoločne nájdeme ideálny štýl, farby a techniky, ktoré budú perfektne ladené k vašim šatám a celkovému vzhľadu. Odporúčame absolvovať 1-2 mesiace pred svadbou.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Nájdenie perfektného štýlu',
      'Testovanie produktov',
      'Konzultácia s profesionálom',
      'Istota pred svadbou',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Rozhovor o svadobnom vzhľade',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Skúšobné líčenie',
        description: 'Vyskúšanie rôznych štýlov a produktov',
        duration: '45 min',
      },
    ],
    duration: '60 minút',
    price: '50 €',
    images: [
      {
        url: '/images/services/trial-wedding-makeup.jpg',
        alt: 'Skúšobné svadobné líčenie',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Skúšobné svadobné líčenie Malacky | Julia Clinic',
      description:
        'Skúšobné svadobné líčenie v Malackách. Nájdite perfektný vzhľad pre váš veľký deň.',
      keywords: ['skúšobné líčenie', 'trial makeup', 'príprava na svadbu Malacky'],
    },
    featured: false,
  },

  // Obočie a mihalnice
  {
    id: 'uprava-oboci',
    slug: 'uprava-oboci',
    title: 'Úprava obočia',
    shortDescription:
      'Profesionálna úprava obočia pre dokonalý tvar.',
    fullDescription:
      'Úprava obočia zahŕňa tvarovanie pinzetou alebo voskom, odstránenie nežiaducich chĺpkov a vytváranie ideálneho tvaru podľa vašej tváre.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Dokonalý tvar obočia',
      'Zvýraznenie očí',
      'Profesionálna úprava',
      'Dlhotrvajúci výsledok',
    ],
    process: [
      {
        step: 1,
        title: 'Úprava',
        description: 'Tvarovanie obočia podľa vašej tváre',
        duration: '15 min',
      },
    ],
    duration: '15 minút',
    price: '8 €',
    images: [
      {
        url: '/images/services/eyebrow-shaping.jpg',
        alt: 'Úprava obočia',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Úprava obočia Malacky | Julia Clinic',
      description:
        'Profesionálna úprava obočia v Malackách. Dokonalý tvar pre zvýraznenie očí. Cena 8€.',
      keywords: ['úprava obočia', 'tvarovanie obočia', 'eyebrow shaping Malacky'],
    },
    featured: false,
  },

  {
    id: 'farbenie-oboci',
    slug: 'farbenie-oboci',
    title: 'Farbenie obočia',
    shortDescription:
      'Zvýraznenie obočia pomocou profesionálneho farbenia.',
    fullDescription:
      'Farbenie obočia vytvára výraznejší a definovanejší vzhľad. Používame kvalitné farby, ktoré sú šetrné k pokožke a vytvárajú prirodzený výsledok.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Výraznejšie obočie',
      'Prirodzený vzhľad',
      'Dlhotrvajúci efekt',
      'Šetrné farby',
    ],
    process: [
      {
        step: 1,
        title: 'Výber farby',
        description: 'Určenie ideálneho odtieňa',
        duration: '5 min',
      },
      {
        step: 2,
        title: 'Farbenie',
        description: 'Aplikácia farby',
        duration: '10 min',
      },
    ],
    duration: '15 minút',
    price: '5 €',
    images: [
      {
        url: '/images/services/eyebrow-tinting.jpg',
        alt: 'Farbenie obočia',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Farbenie obočia Malacky | Julia Clinic',
      description:
        'Profesionálne farbenie obočia v Malackách. Výrazné a prirodzené obočie. Cena 5€.',
      keywords: ['farbenie obočia', 'eyebrow tinting', 'úprava obočia Malacky'],
    },
    featured: false,
  },

  {
    id: 'farbenie-mihalnic',
    slug: 'farbenie-mihalnic',
    title: 'Farbenie mihalníc',
    shortDescription:
      'Zvýraznenie mihalníc bez nutnosti používať maskaru.',
    fullDescription:
      'Farbenie mihalníc vytvára výraznejší pohľad bez potreby dennej aplikácie maskary. Ideálne pre ľudí s citlivými očami alebo aktívny životný štýl.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Výraznejšie oči',
      'Žiadna maskara',
      'Vodotesné',
      'Dlhotrvajúci efekt',
    ],
    process: [
      {
        step: 1,
        title: 'Farbenie',
        description: 'Aplikácia farby na mihalnice',
        duration: '15 min',
      },
    ],
    duration: '15 minút',
    price: '5 €',
    images: [
      {
        url: '/images/services/lash-tinting.jpg',
        alt: 'Farbenie mihalníc',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Farbenie mihalníc Malacky | Julia Clinic',
      description:
        'Profesionálne farbenie mihalníc v Malackách. Výrazný pohľad bez maskary. Cena 5€.',
      keywords: ['farbenie mihalníc', 'lash tinting', 'riasy Malacky'],
    },
    featured: false,
  },

  {
    id: 'laminovanie-oboci',
    slug: 'laminovanie-oboci',
    title: 'Laminovanie obočia',
    shortDescription:
      'Úprava a fixácia obočia pre dlhotrvajúci tvar.',
    fullDescription:
      'Laminovanie obočia je procedúra, ktorá upravuje smer rastu chĺpkov, fixuje ich a vytvára požadovaný tvar. Výsledok trvá 4-6 týždňov.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Dlhotrvajúci tvar',
      'Fixácia nepoddajných chĺpkov',
      'Optické zahustenie',
      'Prirodzený vzhľad',
    ],
    process: [
      {
        step: 1,
        title: 'Príprava',
        description: 'Čistenie a tvarovanie obočia',
        duration: '5 min',
      },
      {
        step: 2,
        title: 'Laminovanie',
        description: 'Aplikácia laminácie a fixácia',
        duration: '25 min',
      },
    ],
    duration: '30 minút',
    price: '30 €',
    images: [
      {
        url: '/images/services/brow-lamination.jpg',
        alt: 'Laminovanie obočia',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Laminovanie obočia Malacky | Julia Clinic',
      description:
        'Laminovanie obočia v Malackách. Dlhotrvajúci tvar a fixácia na 4-6 týždňov. Cena 30€.',
      keywords: ['laminovanie obočia', 'brow lamination', 'úprava obočia Malacky'],
    },
    featured: false,
  },

  {
    id: 'laminovanie-mihalnic',
    slug: 'laminovanie-mihalnic',
    title: 'Laminovanie mihalníc',
    shortDescription:
      'Zdvihnutie a zvýraznenie prirodzených mihalníc.',
    fullDescription:
      'Laminovanie mihalníc vytvára efekt očného viečka, zdvíha a zdôrazňuje prirodzené mihalnice bez nutnosti umelých rias. Výsledok trvá 6-8 týždňov.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Zdvihnuté mihalnice',
      'Výraznejší pohľad',
      'Žiadne umelé riasy',
      'Dlhotrvajúci efekt 6-8 týždňov',
    ],
    process: [
      {
        step: 1,
        title: 'Príprava',
        description: 'Čistenie mihalníc',
        duration: '5 min',
      },
      {
        step: 2,
        title: 'Laminovanie',
        description: 'Aplikácia laminácie a lifting',
        duration: '35 min',
      },
    ],
    duration: '40 minút',
    price: '40 €',
    images: [
      {
        url: '/images/services/lash-lamination.jpg',
        alt: 'Laminovanie mihalníc',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Laminovanie mihalníc Malacky | Julia Clinic',
      description:
        'Laminovanie mihalníc v Malackách. Zdvihnutie rias na 6-8 týždňov. Cena 40€.',
      keywords: ['laminovanie mihalníc', 'lash lift', 'riasy Malacky'],
    },
    featured: false,
  },

  {
    id: 'lash-lifting',
    slug: 'lash-lifting',
    title: 'Lash Lifting',
    shortDescription:
      'Profesionálny lifting mihalníc pre dokonalý zahnutý tvar.',
    fullDescription:
      'Lash Lifting je pokročilá technika zdvihnutia a zahnutia prirodzených mihalníc, ktorá vytvára efekt predĺženia a výrazný pohľad. Výsledok trvá až 8 týždňov.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Zahnuté a zdvihnuté riasy',
      'Výrazný pohľad',
      'Žiadna maskara potrebná',
      'Dlhotrvajúci efekt 8 týždňov',
    ],
    process: [
      {
        step: 1,
        title: 'Príprava',
        description: 'Čistenie a príprava mihalníc',
        duration: '10 min',
      },
      {
        step: 2,
        title: 'Lifting',
        description: 'Aplikácia liftingu pre dokonalý tvar',
        duration: '35 min',
      },
    ],
    duration: '45 minút',
    price: '45 €',
    images: [
      {
        url: '/images/services/lash-lifting.jpg',
        alt: 'Lash Lifting',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Lash Lifting Malacky | Julia Clinic',
      description:
        'Profesionálny Lash Lifting v Malackách. Zahnuté riasy na 8 týždňov. Cena 45€.',
      keywords: ['lash lifting', 'lifting mihalníc', 'zahnuté riasy Malacky'],
    },
    featured: false,
  },

  // ========================================
  // TVÁR - ESTETICKÁ MEDICÍNA - DETAILNÉ SLUŽBY
  // ========================================

  {
    id: 'biorevitalizacia-pleti',
    slug: 'biorevitalizacia-pleti',
    title: 'Biorevitalizácia pleti',
    shortDescription:
      'Hlboká hydratácia a revitalizácia pokožky pomocou kyseliny hyalurónové.',
    fullDescription:
      'Biorevitalizácia je mezoterapeutická metóda, pri ktorej sa do pokožky aplikuje kyselina hyalurónová s vitamínmi a minerálmi. Proces stimuluje tvorbu kolagénu, elastínu a zlepšuje hydratáciu pokožky. Výsledkom je sviežejší, mladistvejší a zdravší vzhľad.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Hlboká hydratácia pokožky',
      'Zlepšenie elasticity',
      'Redukcia jemných vrások',
      'Zjednotenie tónu pleti',
      'Stimulácia kolagénu',
      'Zdravý a svieži vzhľad',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Analýza pokožky a určenie vhodného preparátu',
        duration: '10 min',
      },
      {
        step: 2,
        title: 'Príprava',
        description: 'Očistenie a dezinfekcia pokožky',
        duration: '5 min',
      },
      {
        step: 3,
        title: 'Aplikácia',
        description: 'Séria mikroinjekcií do dermálnej vrstvy',
        duration: '30 min',
      },
    ],
    duration: '45 minút',
    price: { from: 120, to: 180, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Aktívny herpes',
      'Kožné infekcie',
      'Autoimunitné ochorenia',
    ],
    aftercare: [
      '24 hodín žiadny makeup',
      'Vyhnúť sa slnku 48 hodín',
      'Nemasírovať oblasť 24 hodín',
      'Séria 3-4 ošetrení (odstup 2-4 týždne)',
    ],
    images: [
      {
        url: '/images/services/biorevitalization.jpg',
        alt: 'Biorevitalizácia pleti',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Biorevitalizácia pleti Malacky | Julia Clinic',
      description:
        'Biorevitalizácia pokožky v Malackách. Hlboká hydratácia, stimulácia kolagénu, mladistvý vzhľad.',
      keywords: ['biorevitalizácia', 'hydratácia pleti', 'mezoterapia Malacky'],
    },
    featured: false,
  },

  {
    id: 'inekcna-lipoliza',
    slug: 'inekcna-lipoliza',
    title: 'Injekčná lipolíza',
    shortDescription:
      'Neinvazívna redukcia tukových buniek v problémových oblastiach.',
    fullDescription:
      'Injekčná lipolíza je metóda redukcie lokalizovaných tukových usadenín pomocou injekcií špeciálneho roztoku, ktorý rozpúšťa tukové bunky. Ideálne pre druhú bradu, líca, brucho a ďalšie problémové oblasti. Výsledky sú viditeľné po 2-3 ošetreniach.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Redukcia lokalizovaného tuku',
      'Neinvazívna metóda',
      'Definícia kontúr tváre',
      'Odstránenie druhej brady',
      'Žiadna rekonvalescencia',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Určenie problémových oblastí',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Označenie',
        description: 'Označenie injection points',
        duration: '5 min',
      },
      {
        step: 3,
        title: 'Injekcie',
        description: 'Aplikácia lipolytického roztoku',
        duration: '20 min',
      },
    ],
    duration: '40 minút',
    price: { from: 150, to: 250, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Ochorenia pečene',
      'Diabetes',
      'Zápal v oblasti aplikácie',
    ],
    aftercare: [
      'Mierny opuch 2-3 dni (normálne)',
      'Masáž oblasti odporúčaná',
      'Výsledky po 4-6 týždňoch',
      'Séria 2-4 ošetrení pre optimálny efekt',
    ],
    images: [
      {
        url: '/images/services/injection-lipolysis.jpg',
        alt: 'Injekčná lipolíza',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Injekčná lipolíza Malacky | Julia Clinic',
      description:
        'Injekčná lipolíza v Malackách. Odstránenie druhej brady, redukcia tuku neinvazívne.',
      keywords: ['injekčná lipolíza', 'druhá brada', 'redukcia tuku Malacky'],
    },
    featured: false,
  },

  {
    id: 'liftingove-nite',
    slug: 'liftingove-nite',
    title: 'Liftingové nite',
    shortDescription:
      'Nechirurgický lifting tváre pomocou resorbovateľných nití.',
    fullDescription:
      'Liftingové nite sú modernou metódou nechirurgického liftingu tváre. Pod pokožku sa zavádzajú špeciálne resorbovateľné nite, ktoré vytvárajú okamžitý lifting efekt a stimulujú tvorbu kolagénu. Výsledok je viditeľný ihneď a zlepšuje sa 3-6 mesiacov. Efekt trvá 12-18 mesiacov.',
    category: 'face',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Okamžitý lifting efekt',
      'Nechirurgická metóda',
      'Stimulácia kolagénu',
      'Žiadne jazvičky',
      'Prirodzený výsledok',
      'Minimálna rekonvalescencia',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Posúdenie tváre, určenie stratégie nití',
        duration: '20 min',
      },
      {
        step: 2,
        title: 'Lokálna anestézia',
        description: 'Znecitlivenie oblasti',
        duration: '10 min',
      },
      {
        step: 3,
        title: 'Zavedenie nití',
        description: 'Precízne umiestnenie liftingových nití',
        duration: '45 min',
      },
    ],
    duration: '75 minút',
    price: { from: 400, to: 800, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Autoimunitné ochorenia',
      'Poruchy zrážanlivosti krvi',
      'Keloidné jazvy',
    ],
    aftercare: [
      'Mierny opuch 3-5 dní',
      'Vyhnúť sa intenzívnej mimike 2 týždne',
      'Spať na chrbte 1 týždeň',
      'Žiadna sauna 2 týždne',
      'Výsledok sa zlepšuje 3-6 mesiacov',
    ],
    images: [
      {
        url: '/images/services/thread-lift.jpg',
        alt: 'Liftingové nite',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Liftingové nite Malacky | Julia Clinic',
      description:
        'Nechirurgický lifting tváre liftingovými niťami v Malackách. Okamžitý efekt, prirodzený výsledok.',
      keywords: ['liftingové nite', 'thread lift', 'nechirurgický lifting Malacky'],
    },
    featured: false,
  },

  // ========================================
  // TELO - SLUŽBY
  // ========================================

  {
    id: 'laser-epilacia-nohy-cele',
    slug: 'laserova-epilacia-nohy-cele',
    title: 'Laserová epilácia - Nohy celé (dámy)',
    shortDescription:
      'Trvalé odstránenie chĺpkov na celých nohách.',
    fullDescription:
      'Laserová epilácia celých nôh je jednou z najobľúbenejších procedúr. Po sérii 6-8 ošetrení dosiahnete trvalú redukciu až vymiznutie chĺpkov. Užívajte si hladké nohy bez nutnosti holenia.',
    category: 'body',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Trvalé odstránenie chĺpkov',
      'Hladké nohy po celý rok',
      'Žiadne vrastanie',
      'Úspora času',
      'Komfortná procedúra',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Posúdenie typu pokožky a chĺpkov',
        duration: '10 min',
      },
      {
        step: 2,
        title: 'Laserovanie',
        description: 'Aplikácia lasera na celé nohy',
        duration: '60 min',
      },
    ],
    duration: '70 minút',
    price: '120 €',
    contraindications: [
      'Tehotenstvo',
      'Aktívne opálenie',
      'Fotosenzitívna pokožka',
    ],
    aftercare: [
      'Používať SPF krém',
      '48 hodín žiadna sauna',
      'Ďalšie ošetrenie po 4-6 týždňoch',
      'Séria 6-8 ošetrení pre trvalý efekt',
    ],
    images: [
      {
        url: '/images/services/laser-legs.jpg',
        alt: 'Laserová epilácia nôh',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Laserová epilácia nôh Malacky | Julia Clinic',
      description:
        'Laserová epilácia celých nôh v Malackách. Trvalé odstránenie chĺpkov, hladká pokožka.',
      keywords: ['laserová epilácia nohy', 'odstránenie chĺpkov', 'hladké nohy Malacky'],
    },
    featured: false,
  },

  {
    id: 'laser-epilacia-podpazie',
    slug: 'laserova-epilacia-podpazie',
    title: 'Laserová epilácia - Podpazušie',
    shortDescription:
      'Trvalé odstránenie chĺpkov v podpazuší.',
    fullDescription:
      'Laserová epilácia podpazušia je rýchla a efektívna procedúra. Po sérii ošetrení dosiahnete hladké podpazušie bez nutnosti holenia alebo depilácie. Ideálne pre aktívne ženy.',
    category: 'body',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Trvalé odstránenie chĺpkov',
      'Hladké podpazušie',
      'Žiadne podráždenie',
      'Rýchla procedúra',
    ],
    process: [
      {
        step: 1,
        title: 'Príprava',
        description: 'Očistenie oblasti',
        duration: '5 min',
      },
      {
        step: 2,
        title: 'Laserovanie',
        description: 'Aplikácia lasera',
        duration: '10 min',
      },
    ],
    duration: '15 minút',
    price: '35 €',
    images: [
      {
        url: '/images/services/laser-underarms.jpg',
        alt: 'Laserová epilácia podpazušie',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Laserová epilácia podpazušie Malacky | Julia Clinic',
      description:
        'Laserová epilácia podpazušia v Malackách. Rýchla procedúra, trvalý efekt.',
      keywords: ['laserová epilácia podpazušie', 'odstránenie chĺpkov', 'laser Malacky'],
    },
    featured: false,
  },

  {
    id: 'laser-epilacia-bikini',
    slug: 'laserova-epilacia-bikini',
    title: 'Laserová epilácia - Bikini zóna',
    shortDescription:
      'Trvalé odstránenie chĺpkov v intimnej oblasti.',
    fullDescription:
      'Laserová epilácia bikini zóny je diskrétna a profesionálna procedúra. Ponúkame klasickú bikini líniu alebo Brazilian (úplné odstránenie). Po sérii ošetrení dosiahnete hladkú pokožku bez vrastania.',
    category: 'body',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Trvalé odstránenie',
      'Žiadne vrastanie chĺpkov',
      'Hladká pokožka',
      'Diskrétna procedúra',
      'Komfort a hygiena',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Výber typu ošetrenia (línia/Brazilian)',
        duration: '5 min',
      },
      {
        step: 2,
        title: 'Laserovanie',
        description: 'Profesionálna aplikácia',
        duration: '20-30 min',
      },
    ],
    duration: '35 minút',
    price: { from: 40, to: 60, currency: '€' },
    images: [
      {
        url: '/images/services/laser-bikini.jpg',
        alt: 'Laserová epilácia bikini',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Laserová epilácia bikini Malacky | Julia Clinic',
      description:
        'Laserová epilácia bikini zóny v Malackách. Diskrétna procedúra, hladká pokožka.',
      keywords: ['laserová epilácia bikini', 'Brazilian laser', 'intimná epilácia Malacky'],
    },
    featured: false,
  },

  // ========================================
  // MEZOTERAPIA
  // ========================================
  {
    id: 'mezoterapia-tvar',
    slug: 'mezoterapia-tvar',
    title: 'Mezoterapia tváre',
    shortDescription:
      'Revitalizácia a omladzenie pokožky pomocou mikroinjekcií vitamínov a kyseliny hyalurónové.',
    fullDescription:
      'Mezoterapia tváre je neinvazívna metóda omladzenia pokožky, pri ktorej sa do kože aplikujú mikroinjekcie zmesi vitamínov, minerálov, aminokyselín a kyseliny hyalurónové. Stimuluje produkciu kolagénu, zlepšuje hydratáciu a celkový vzhľad pokožky.',
    category: 'mesotherapy',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Hlboká hydratácia pokožky',
      'Stimulácia kolagénu',
      'Zlepšenie textúry a tónu',
      'Redukcia jemných vrások',
      'Rozžiarená a zdravá pleť',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Analýza stavu pokožky a určenie vhodného koktailu',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Príprava',
        description: 'Očistenie a dezinfekcia pokožky',
        duration: '10 min',
      },
      {
        step: 3,
        title: 'Aplikácia',
        description: 'Séria mikroinjekcií do dermálnej vrstvy',
        duration: '30 min',
      },
    ],
    duration: '55 minút',
    price: { from: 80, to: 150, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Aktívne kožné infekcie',
      'Alergia na zložky',
      'Poruchy zrážanlivosti krvi',
    ],
    aftercare: [
      'Žiadny makeup 24 hodín',
      'Vyhnúť sa slnku 48 hodín',
      'Mierny opuch je normálny',
      'Séria 3-6 ošetrení pre optimálny efekt',
    ],
    images: [
      {
        url: '/images/services/biorevitalization.jpg',
        alt: 'Mezoterapia tváre',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Mezoterapia tváre Malacky | Julia Clinic',
      description:
        'Mezoterapia tváre v Malackách. Revitalizácia pokožky, stimulácia kolagénu, mladistvý vzhľad.',
      keywords: ['mezoterapia tvár', 'revitalizácia pleti', 'omladzenie pokožky Malacky'],
    },
    featured: false,
  },
  {
    id: 'mezoterapia-vlasy',
    slug: 'mezoterapia-vlasova-pokozka',
    title: 'Mezoterapia vlasovej pokožky',
    shortDescription:
      'Liečba vypadávania vlasov a posilnenie vlasových korienkov mezoterapiou.',
    fullDescription:
      'Mezoterapia vlasovej pokožky je účinná metóda na liečbu vypadávania vlasov a posilnenie vlasových korienkov. Mikroinjekcie vitamínov, minerálov a rastových faktorov stimulujú rast vlasov a zlepšujú ich kvalitu.',
    category: 'mesotherapy',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Zastavenie vypadávania vlasov',
      'Stimulácia rastu nových vlasov',
      'Posilnenie vlasových korienkov',
      'Zlepšenie kvality vlasov',
      'Zdravšia vlasová pokožka',
    ],
    process: [
      {
        step: 1,
        title: 'Diagnostika',
        description: 'Analýza stavu vlasov a vlasovej pokožky',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Aplikácia',
        description: 'Mikroinjekcie do vlasovej pokožky',
        duration: '30 min',
      },
    ],
    duration: '45 minút',
    price: { from: 100, to: 180, currency: '€' },
    contraindications: [
      'Tehotenstvo a dojčenie',
      'Kožné infekcie na hlave',
      'Alergia na zložky',
    ],
    aftercare: [
      'Neumývať vlasy 24 hodín',
      'Vyhnúť sa intenzívnemu cvičeniu 24 hodín',
      'Séria 6-10 ošetrení pre optimálny efekt',
    ],
    images: [
      {
        url: '/images/services/biorevitalization.jpg',
        alt: 'Mezoterapia vlasov',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Mezoterapia vlasov Malacky | Julia Clinic',
      description:
        'Mezoterapia vlasovej pokožky v Malackách. Liečba vypadávania vlasov, posilnenie korienkov.',
      keywords: ['mezoterapia vlasy', 'vypadávanie vlasov', 'posilnenie vlasov Malacky'],
    },
    featured: false,
  },

  // ========================================
  // VIP SLUŽBY
  // ========================================
  {
    id: 'vip-balik',
    slug: 'vip-vikendovy-balik',
    title: 'VIP víkendový balík',
    shortDescription:
      'Exkluzívny balík služieb pre kompletný relax a skrášlenie.',
    fullDescription:
      'VIP víkendový balík je exkluzívna ponuka pre náročných klientov, ktorí hľadajú kompletný zážitok krásy a relaxácie. Balík zahŕňa kombináciu najobľúbenejších procedúr prispôsobených vašim potrebám.',
    category: 'vip_services',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Kompletná starostlivosť na jednom mieste',
      'Zľava oproti jednotlivým procedúram',
      'Prioritné rezervácie',
      'Exkluzívne prostredie',
      'Personalizovaný prístup',
    ],
    process: [
      {
        step: 1,
        title: 'Konzultácia',
        description: 'Výber procedúr podľa vašich potrieb',
        duration: '15 min',
      },
      {
        step: 2,
        title: 'Procedúry',
        description: 'Realizácia vybraných ošetrení',
        duration: '180-240 min',
      },
      {
        step: 3,
        title: 'Relax',
        description: 'Čas na oddych a regeneráciu',
        duration: '30 min',
      },
    ],
    duration: '3-5 hodín',
    price: { from: 300, to: 600, currency: '€' },
    images: [
      {
        url: '/images/services/face-category.jpg',
        alt: 'VIP balík služieb',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'VIP služby Malacky | Julia Clinic',
      description:
        'VIP balíky služieb v Malackách. Exkluzívna starostlivosť, kompletný relax.',
      keywords: ['VIP služby', 'balík procedúr', 'exkluzívna kozmetika Malacky'],
    },
    featured: false,
  },

  // ========================================
  // DARČEKOVÉ POUKÁŽKY
  // ========================================
  {
    id: 'darcekova-poukazka',
    slug: 'darcekova-poukazka',
    title: 'Darčeková poukážka',
    shortDescription:
      'Darujte zážitok krásy a relaxácie vašim blízkym.',
    fullDescription:
      'Darčeková poukážka na služby Julia Estetic Clinic je ideálnym darčekom pre každú príležitosť. Môžete si vybrať hodnotu poukážky alebo konkrétnu službu. Poukážka je platná 12 mesiacov od zakúpenia.',
    category: 'gift_vouchers',
    subcategory: undefined,
    tags: [],
    benefits: [
      'Ideálny darček pre každú príležitosť',
      'Výber hodnoty alebo konkrétnej služby',
      'Platnosť 12 mesiacov',
      'Elegantné balenie',
      'Možnosť online objednávky',
    ],
    process: [
      {
        step: 1,
        title: 'Výber',
        description: 'Vyberte hodnotu alebo službu',
        duration: '5 min',
      },
      {
        step: 2,
        title: 'Objednávka',
        description: 'Online alebo osobne na klinike',
        duration: '5 min',
      },
    ],
    duration: 'Podľa zvolenej služby',
    price: 'Od 50 €',
    images: [
      {
        url: '/images/services/face-category.jpg',
        alt: 'Darčeková poukážka',
        width: 800,
        height: 600,
      },
    ],
    seoMeta: {
      title: 'Darčekové poukážky Malacky | Julia Clinic',
      description:
        'Darčekové poukážky na estetické služby v Malackách. Darujte zážitok krásy.',
      keywords: ['darčeková poukážka', 'darček kozmetika', 'poukážka Malacky'],
    },
    featured: false,
  },
]

// ========================================
// Export & Validation
// ========================================

// Validate all services at build time
services.forEach((service) => {
  const result = serviceSchema.safeParse(service)
  if (!result.success) {
    console.error(`Validation failed for service: ${service.id}`)
    console.error(result.error)
    throw new Error(`Invalid service data: ${service.id}`)
  }
})

export const allServices: readonly Service[] = services

// ========================================
// Helper Functions
// ========================================

export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((service) => service.slug === slug)
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return allServices.filter((service) => service.category === category)
}

export function getFeaturedServices(): Service[] {
  return allServices.filter((service) => service.featured)
}

export function getAllServiceSlugs(): string[] {
  return allServices.map((service) => service.slug)
}

export function searchServices(query: string): Service[] {
  const lowercaseQuery = query.toLowerCase()
  return allServices.filter(
    (service) =>
      service.title.toLowerCase().includes(lowercaseQuery) ||
      service.shortDescription.toLowerCase().includes(lowercaseQuery) ||
      service.fullDescription.toLowerCase().includes(lowercaseQuery)
  )
}

export function getCategoryTitle(category: ServiceCategory): string {
  return categoryMetadata[category]?.title ?? category
}

export function getCategoryDescription(category: ServiceCategory): string {
  return categoryMetadata[category]?.description ?? ''
}

export function getRelatedServices(service: Service, limit = 4): Service[] {
  // Get services from the same category, excluding the current service
  const sameCategory = allServices.filter(
    (s) => s.category === service.category && s.id !== service.id
  )
  
  // If we have enough from the same category, return those
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }
  
  // Otherwise, add featured services from other categories
  const featured = allServices.filter(
    (s) => s.featured && s.id !== service.id && s.category !== service.category
  )
  
  const combined = [...sameCategory, ...featured]
  return combined.slice(0, limit)
}

