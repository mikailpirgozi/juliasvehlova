'use client'

import { useState, useMemo } from 'react'
import type { FC } from 'react'
import {
  Stars01,
  Edit05,
  Zap,
  User01,
  Eye,
  HeartCircle,
  Brush01,
  Settings01,
  Droplets01,
  Lightning01,
  Sun,
  Clock,
  Award01,
  Gift01,
  Star01,
} from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { InputBase } from '@/components/base/input/input'

interface PriceItem {
  name: string
  price: string
  duration?: string
  popular?: boolean
}

type IconKey = 'stars' | 'edit' | 'zap' | 'user' | 'eye' | 'heart' | 'flower' | 'settings' | 'droplet' | 'lightning' | 'sun' | 'clock' | 'award' | 'gift' | 'star'

interface PricingCategory {
  id: string
  title: string
  iconKey: IconKey
  items: PriceItem[]
}

// Map icon keys to Untitled UI icon components
// Updated pricing data - February 2026
const iconComponents: Record<IconKey, FC<{ className?: string }>> = {
  stars: Stars01,
  edit: Edit05,
  zap: Zap,
  user: User01,
  eye: Eye,
  heart: HeartCircle,
  flower: Brush01,
  settings: Settings01,
  droplet: Droplets01,
  lightning: Lightning01,
  sun: Sun,
  clock: Clock,
  award: Award01,
  gift: Gift01,
  star: Star01,
}

const pricingData: PricingCategory[] = [
  {
    id: 'chakra',
    title: 'Chakra Calibration',
    iconKey: 'sun',
    items: [
      { name: 'Chakra Calibration individuálna', price: '200 €', duration: '2 hod', popular: true },
      { name: 'Chakra Calibration párová (2 osoby)', price: '300 €', duration: '2 hod' },
      { name: 'Theta Healing individuálne', price: '100 €', duration: '1 hod' },
    ],
  },
  {
    id: 'doplnkove-kozmeticke-sluzby-laminacia',
    title: 'Laminácia',
    iconKey: 'eye',
    items: [
      { name: 'Korekcia a farbenie obočia', price: '20 €', duration: '30 min' },
      { name: 'Laminácia - Kombo (Lash Lift + Brow Lift)', price: '70 €', duration: '1 hod', popular: true },
      { name: 'Laminácia mihalníc - Lash Lift', price: '40 €', duration: '1 hod' },
      { name: 'Laminácia obočia - Brow Lift', price: '40 €', duration: '1 hod' },
    ],
  },
  {
    id: 'permanentny-makeup',
    title: 'Permanentný make-up',
    iconKey: 'edit',
    items: [
      { name: 'Permanentný make-up korekcia do 5 týždňov', price: '100 €', duration: '1 hod' },
      { name: 'Permanentný make-up obočie Hair Strokes', price: '200 €', duration: '2 hod', popular: true },
      { name: 'Permanentný make-up obočie Powder Brows', price: '200 €', duration: '2 hod', popular: true },
      { name: 'Permanentný make-up odstránenie obočia + umŕtvenie', price: '100 €', duration: '1 hod' },
      { name: 'Permanentný make-up očné linky', price: '200 €', duration: '2 hod' },
      { name: 'Permanentný make-up pery', price: '200 €', duration: '2 hod' },
    ],
  },
  {
    id: 'predlzovanie-mihalnic',
    title: 'Predlžovanie mihalníc',
    iconKey: 'eye',
    items: [
      { name: 'Odstraňovanie mihalníc', price: '20 €', duration: '30 min' },
      { name: 'Predlžovanie mihalníc - Doplnka (po 3 týždňoch)', price: '50 €', duration: '1 hod 30 min' },
      { name: 'Predlžovanie mihalníc - Nový set', price: '80 €', duration: '2 hod', popular: true },
    ],
  },
  {
    id: 'esteticka-medicina-biorevitalizacia',
    title: 'Biorevitalizácia pleti',
    iconKey: 'droplet',
    items: [
      { name: 'Aquashine PTx', price: '250 €', duration: '20 min' },
      { name: 'Dermaheal', price: '250 €', duration: '20 min' },
      { name: 'Kolagénový booster JALUPRO', price: '350 €', duration: '15 min', popular: true },
      { name: 'Omladenie očného okolia salmon sperm', price: '280 €', duration: '30 min' },
      { name: 'Profhilo tvár', price: '350 €', duration: '20 min', popular: true },
      { name: 'RRS HA Long Lasting', price: '300 €', duration: '20 min' },
      { name: 'Revitrane', price: '280 €', duration: '20 min' },
      { name: 'Sisthaema Hevo T', price: '350 €', duration: '20 min' },
      { name: 'Skin booster Teosyal', price: '300 €', duration: '20 min' },
    ],
  },
  {
    id: 'esteticka-medicina-botulotoxin',
    title: 'Botulotoxín',
    iconKey: 'stars',
    items: [
      { name: 'Botulotoxin - Baby botox (1 lokalita)', price: '70 €', duration: '10 min' },
      { name: 'Botulotoxin - Barbie Botox', price: '300 €', duration: '10 min' },
      { name: 'Botulotoxin - Bunny smile', price: '90 €', duration: '10 min' },
      { name: 'Botulotoxin - Fullface', price: '450 €', duration: '15 min', popular: true },
      { name: 'Botulotoxin - Fullface + krk', price: '450 €', duration: '15 min' },
      { name: 'Botulotoxin - Glabela', price: '100 €', duration: '10 min' },
      { name: 'Botulotoxin - Gummy smile', price: '90 €', duration: '10 min' },
      { name: 'Botulotoxin - Komplet (čelo, očné okolie, glabela)', price: '280 €', duration: '10 min', popular: true },
      { name: 'Botulotoxin - Nohy pri hyperhydróze (nadmerné potenie)', price: '350 €', duration: '20 min' },
      { name: 'Botulotoxin - Očné okolie', price: '100 €', duration: '10 min' },
      { name: 'Botulotoxin - Podpazušíe pri hyperhydróze (nadmerné potenie)', price: '300 €', duration: '20 min' },
      { name: 'Botulotoxin - Ruky pri hyperhydróze (nadmerné potenie)', price: '250 €', duration: '20 min' },
      { name: 'Botulotoxin - Čelo', price: '100 €', duration: '10 min' },
    ],
  },
  {
    id: 'esteticka-medicina-injekcna-lipolyza',
    title: 'Injekčná lipolýza',
    iconKey: 'zap',
    items: [
      { name: 'Injekčná lipolýza - Jedna zóna 1ml (brucho, boky, stehná, kolená)', price: '100 €', duration: '10 min' },
      { name: 'Injekčná lipolýza - Podbradok', price: '150 €', duration: '10 min', popular: true },
    ],
  },
  {
    id: 'esteticka-medicina-konzultacia',
    title: 'Konzultácia estetických zákrokov',
    iconKey: 'heart',
    items: [
      { name: 'Konzultácia estetických zákrokov', price: '30 €', duration: '15 min' },
    ],
  },
  {
    id: 'esteticka-medicina-liftingove-nite',
    title: 'Liftingové nite',
    iconKey: 'settings',
    items: [
      { name: 'APTOS (vysoko liftingové nite) 1ks', price: 'od 100 €', duration: '20 min', popular: true },
      { name: 'Mononite (hladké, spevňovacie nite) 1ks', price: 'od 50 €', duration: '30 min' },
    ],
  },
  {
    id: 'esteticka-medicina-vyplne-kh',
    title: 'Výplne kyselinou hyalurónovou',
    iconKey: 'droplet',
    items: [
      { name: 'Brazílsky zadoček KH', price: '800 €', duration: '1 hod' },
      { name: 'Kompletná modelacia sánky KH', price: '850 €', duration: '20 min' },
      { name: 'Modelácia brady KH 1ml', price: '200 €', duration: '20 min' },
      { name: 'Modelácia líc KH 1ml', price: '200 €', duration: '30 min' },
      { name: 'Modelácia nosa KH 1ml', price: '200 €', duration: '20 min' },
      { name: 'Modelácia sánky KH 1ml', price: '200 €', duration: '20 min' },
      { name: 'Rozpustenie KH pery (Hyláza)', price: '100 €', duration: '10 min' },
      { name: 'Výplň glabela KH 1ml', price: '200 €', duration: '15 min' },
      { name: 'Výplň kútiky úst KH 1ml', price: '200 €', duration: '15 min' },
      { name: 'Výplň nasolabiálnych rýh KH 1ml', price: '200 €', duration: '15 min' },
      { name: 'Zväčšenie pier KH 1ml', price: '220 €', duration: '20 min', popular: true },
      { name: 'Zväčšenie pier kyselina Juvederm 1 ml', price: '350 €', duration: '20 min', popular: true },
      { name: 'Zväčšenie pier kyselina Restylane/Teosyal 1 ml', price: '300 €', duration: '20 min' },
      { name: 'Zväčšenie pier kyselina Stylage 1ml', price: '280 €', duration: '20 min' },
    ],
  },
  {
    id: 'kozmetika-konzultacia',
    title: 'Konzultácia kozmetických ošetrení',
    iconKey: 'heart',
    items: [
      { name: 'Konzultácia kozmetických ošetrení', price: '30 €', duration: '15 min' },
    ],
  },
  {
    id: 'kozmetika-osetrenia',
    title: 'Kozmetické ošetrenia',
    iconKey: 'flower',
    items: [
      { name: 'Age element alginatova maska', price: '25 €', duration: '15 min' },
      { name: 'Global Eyecon', price: '130 €', duration: '30 min' },
      { name: 'Kozmetika komplet (kombinované čistenie pleti + peeling + maska + relaxačná masáž tváre a dekoltu)', price: '90 €', duration: '1 hod', popular: true },
      { name: 'Masáž tváre a dekoltu + upokojujúca maska', price: '60 €', duration: '1 hod' },
    ],
  },
  {
    id: 'kozmetika-liecba-akne',
    title: 'Liečba akné',
    iconKey: 'flower',
    items: [
      { name: 'Chemický peeling + upokojujúca maska', price: '60 €', duration: '30 min' },
      { name: 'Ošetrenie Lightening', price: '90 €', duration: '1 hod' },
      { name: 'Repair Peeling na akné + upokojujúca maska', price: '80 €', duration: '30 min' },
      { name: 'Čistenie pleti + upokojujúca maska', price: '80 €', duration: '1 hod', popular: true },
    ],
  },
  {
    id: 'kozmetika-prevencia-starnutia',
    title: 'Prevencia starnutia',
    iconKey: 'clock',
    items: [
      { name: 'Bio C peeling', price: '60 €', duration: '30 min' },
      { name: 'Ošetrenie Cosmelan', price: '140 €', duration: '1 hod', popular: true },
    ],
  },
  {
    id: 'kozmetika-pristrojove',
    title: 'Prístrojové ošetrenia',
    iconKey: 'settings',
    items: [
      { name: 'Aqua Star exclusive', price: '150 €', duration: '1 hod', popular: true },
      { name: 'Aqua Star standart', price: '120 €', duration: '1 hod' },
      { name: 'Hollywood Carbon peel', price: '90 €', duration: '1 hod' },
      { name: 'Mezoterapia - Očné okolie (profesionálny kombi koktail podľa potrieb pleti)', price: '120 €', duration: '1 hod' },
      { name: 'Mezoterapia - Tvár (profesionálny kombi koktail podľa potrieb pleti)', price: '120 €', duration: '1 hod' },
      { name: 'Ozone Plazma Repair', price: '100 €', duration: '1 hod' },
      { name: 'Plazma lifting - Dolné viečka', price: '150 €', duration: '1 hod' },
      { name: 'Plazma lifting - Horné + dolné viečka', price: '300 €', duration: '1 hod' },
      { name: 'Plazma lifting - Horné viečka', price: '150 €', duration: '1 hod' },
      { name: 'Vlasová mezoterapia Dermapenom "c.prof hair"', price: '100 €', duration: '1 hod 30 min' },
      { name: 'Mezoterapia vitalinjektor Richesse salmon sperm', price: '200 €', duration: '1 hod 30 min', popular: true },
      { name: 'Mezoterapia vitalinjektor meso cocktail', price: '180 €', duration: '2 hod' },
      { name: 'Mikroneedling Richesse salmon sperm', price: '150 €', duration: '1 hod 30 min' },
      { name: 'Mikroneedling meso cocktail', price: '120 €', duration: '1 hod' },
    ],
  },
  {
    id: 'laserova-epilacia-damy',
    title: 'Laserová epilácia - Dámy',
    iconKey: 'zap',
    items: [
      { name: 'Laserová epilácia - Bikiny', price: '60 €', duration: '30 min', popular: true },
      { name: 'Laserová epilácia - Bikiny komplet', price: '100 €', duration: '30 min', popular: true },
      { name: 'Laserová epilácia - Bikiny komplet + celé nohy', price: '200 €', duration: '1 hod' },
      { name: 'Laserová epilácia - Bokombrady', price: '50 €', duration: '30 min' },
      { name: 'Laserová epilácia - Brucho', price: '30 €', duration: '30 min' },
      { name: 'Laserová epilácia - Celá tvár', price: '80 €', duration: '30 min' },
      { name: 'Laserová epilácia - Celé nohy', price: '150 €', duration: '1 hod', popular: true },
      { name: 'Laserová epilácia - Horná pera', price: '30 €', duration: '30 min' },
      { name: 'Laserová epilácia - Líca', price: '50 €', duration: '30 min' },
      { name: 'Laserová epilácia - Lýtka', price: '100 €', duration: '30 min' },
      { name: 'Laserová epilácia - Lýtka + bikiny + podpazušie', price: '150 €', duration: '1 hod' },
      { name: 'Laserová epilácia - Nohy + brucho + bikiny (5 x ošetrenie)', price: '800 €', duration: '1 hod' },
      { name: 'Laserová epilácia - Nohy + ruky (5 x ošetrenie)', price: '800 €', duration: '1 hod' },
      { name: 'Laserová epilácia - Okolie bradaviek', price: '30 €', duration: '30 min' },
      { name: 'Laserová epilácia - Podpazušie + bikiny', price: '120 €', duration: '30 min' },
      { name: 'Laserová epilácia - Podpazušie + bikiny + celé nohy', price: '230 €', duration: '1 hod' },
      { name: 'Laserová epilácia - Stehná', price: '100 €', duration: '30 min' },
      { name: 'Laserová epilácia - Stehná vnútorná časť', price: '60 €', duration: '30 min' },
      { name: 'Laserová epilácia - Lýtka + bikiny', price: '120 €', duration: '1 hod' },
      { name: 'Laserová epilácia - Brada', price: '30 €', duration: '30 min' },
      { name: 'Laserová epilácia - Podpazušie', price: '60 €', duration: '30 min' },
      { name: 'Laserová epilácia - Ruky', price: '80 €', duration: '30 min' },
    ],
  },
  {
    id: 'laserova-epilacia-pani',
    title: 'Laserová epilácia - Páni',
    iconKey: 'user',
    items: [
      { name: 'Laserová epilácia - Brucho', price: '80 €', duration: '30 min' },
      { name: 'Laserová epilácia - Chrbát', price: '100 €', duration: '30 min', popular: true },
      { name: 'Laserová epilácia - Chrbát časť', price: '60 €', duration: '30 min' },
      { name: 'Laserová epilácia - Hruď', price: '80 €', duration: '30 min' },
      { name: 'Laserová epilácia - Hruď + brucho', price: '150 €', duration: '30 min' },
      { name: 'Laserová epilácia - Intímne partie', price: '100 €', duration: '30 min' },
      { name: 'Laserová epilácia - Nohy celé', price: '200 €', duration: '1 hod' },
      { name: 'Laserová epilácia - Podpazušie', price: '60 €', duration: '30 min' },
      { name: 'Laserová epilácia - Ruky', price: '80 €', duration: '30 min' },
    ],
  },
  {
    id: 'maderoterapia',
    title: 'Maderoterapia',
    iconKey: 'flower',
    items: [
      { name: 'Celotelová maderoterapia', price: '65 €', duration: '1 hod 45 min', popular: true },
      { name: 'Maderoterapia - trup a horné končatiny', price: '40 €', duration: '1 hod 15 min' },
      { name: 'Maderoterapia - tvár', price: '22 €', duration: '35 min' },
      { name: 'Maderoterapia - zadok a dolné končatiny', price: '40 €', duration: '1 hod 15 min' },
    ],
  },
  {
    id: 'masaz',
    title: 'Masáž',
    iconKey: 'heart',
    items: [
      { name: '60 minútová masáž', price: '40 €', duration: '1 hod' },
      { name: '90 minútová masáž', price: '55 €', duration: '1 hod 30 min', popular: true },
      { name: 'Lymfodrenáž', price: '45 €', duration: '1 hod 30 min' },
      { name: 'Lymfodrenáž', price: '75 €', duration: '2 hod' },
    ],
  },
  {
    id: 'piercing-microdermal',
    title: 'Microdermal',
    iconKey: 'star',
    items: [
      { name: 'Microdermal - Hrudník', price: '55 €', duration: '25 min' },
      { name: 'Microdermal - Líce', price: '55 €', duration: '25 min' },
    ],
  },
  {
    id: 'piercing-trup',
    title: 'Piercing trupu',
    iconKey: 'star',
    items: [
      { name: 'Navel piercing - Pupok', price: '40 €', duration: '20 min' },
      { name: 'Nipple piercing - Bradavka 1x', price: '45 €', duration: '25 min' },
      { name: 'Nipple piercing - Bradavka 2x', price: '80 €', duration: '40 min' },
    ],
  },
  {
    id: 'piercing-tvar',
    title: 'Piercing tváre',
    iconKey: 'star',
    items: [
      { name: 'Nostril piercing - Nos', price: '35 €', duration: '15 min', popular: true },
      { name: 'Piercing jazyka', price: '40 €', duration: '20 min' },
      { name: 'Piercing obočia', price: '35 €', duration: '15 min' },
      { name: 'Piercing pera/brada', price: '35 €', duration: '20 min' },
      { name: 'Septum piercing - Nos', price: '35 €', duration: '15 min' },
    ],
  },
  {
    id: 'piercing-usna-chrupavka',
    title: 'Piercing ušnej chrupavky',
    iconKey: 'star',
    items: [
      { name: 'Conch piercing', price: '35 €', duration: '15 min' },
      { name: 'Daith piercing', price: '35 €', duration: '15 min' },
      { name: 'Helix piercing - classic/flat/forward', price: '35 €', duration: '15 min', popular: true },
      { name: 'Industrial piercing', price: '40 €', duration: '15 min' },
      { name: 'Rook piercing', price: '35 €', duration: '15 min' },
      { name: 'Tragus piercing', price: '35 €', duration: '15 min' },
    ],
  },
  {
    id: 'piercing-usny-lalok',
    title: 'Piercing ušného laloka',
    iconKey: 'star',
    items: [
      { name: 'Lobe piercing', price: '25 €', duration: '10 min', popular: true },
    ],
  },
  {
    id: 'piercing-skratenie',
    title: 'Skrátenie šperku alebo výmena',
    iconKey: 'settings',
    items: [
      { name: 'Skrátenie/výmena šperku', price: '10 €', duration: '15 min' },
    ],
  },
  {
    id: 'licenie',
    title: 'Profesionálne líčenie',
    iconKey: 'edit',
    items: [
      { name: 'Denné líčenie', price: '100 €', duration: '1 hod' },
      { name: 'Foto/TV líčenie', price: '150 €', duration: '1 hod' },
      { name: 'Líčenie + úprava vlasov', price: '300 €', duration: '2 hod', popular: true },
      { name: 'Príležitostné / večerné líčenie', price: '150 €', duration: '1 hod' },
      { name: 'Skúška líčenia', price: '100 €', duration: '1 hod' },
      { name: 'Svadobné líčenie', price: '150 €', duration: '1 hod', popular: true },
    ],
  },
  {
    id: 'tetovanie',
    title: 'Tetovanie',
    iconKey: 'edit',
    items: [
      { name: 'Malé tetovanie - 3 - 6 cm', price: 'od 75 €', duration: '1 hod' },
      { name: 'Mini tetovanie - do 3 cm', price: '55 €', duration: '1 hod' },
      { name: 'Stredné tetovanie - 6 - 10 cm', price: 'od 100 €', duration: '1 hod 30 min' },
      { name: 'Tetovanie nad 15 cm', price: 'od 170 €', duration: '2 hod 30 min' },
      { name: 'Veľké tetovanie - 10 - 15 cm', price: 'od 150 €', duration: '2 hod' },
    ],
  },
  {
    id: 'vikendove-vip',
    title: 'Víkendové VIP služby',
    iconKey: 'award',
    items: [
      { name: 'Víkendové ošetrenie', price: 'na vyžiadanie', duration: '1 hod' },
    ],
  },
]

export function CennikPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>(pricingData[0]?.id || '')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = useMemo(() => {
    if (!searchQuery) {
      return pricingData
    }

    const query = searchQuery.toLowerCase()
    return pricingData.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.price.toLowerCase().includes(query)
      )
    })).filter(category => category.items.length > 0)
  }, [searchQuery])

  const selectedCategoryData = useMemo(() => {
    const found = filteredCategories.find(cat => cat.id === selectedCategory)
    if (found) return found
    if (filteredCategories.length > 0) return filteredCategories[0]
    return null
  }, [selectedCategory, filteredCategories])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20">
      {/* Global decorative background elements */}
      <div className="pointer-events-none fixed top-20 right-10 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/15 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/15 blur-3xl" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute top-10 left-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#CDA882]">Cenník</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
            Transparentné ceny
          </h1>
          <p className="mt-4 text-lg text-gray-600">Kompletný prehľad cien všetkých služieb</p>
        </div>
      </section>

      {/* Main Content - Sidebar Layout */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar - Categories */}
          <aside className="lg:w-72 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <InputBase
                    type="text"
                    placeholder="Hľadať..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Category Navigation */}
              <nav className="space-y-1">
                {filteredCategories.map((category) => {
                  const IconComponent = iconComponents[category.iconKey]
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-brand-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className={`h-5 w-5 ${selectedCategory === category.id ? 'text-white' : 'text-gray-500'}`} />
                      <span className="flex-1">{category.title}</span>
                      <span className={`text-xs ${
                        selectedCategory === category.id ? 'text-white/80' : 'text-gray-400'
                      }`}>
                        {category.items.length}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content - Services Table */}
          <main className="min-w-0 flex-1">
            {selectedCategoryData ? (
              <div key={selectedCategoryData?.id || 'default'}>
                <div className="mb-6 flex items-center gap-3">
                  {(() => {
                    const IconComponent = iconComponents[selectedCategoryData.iconKey]
                    return (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50">
                        <IconComponent className="h-6 w-6 text-brand-600" />
                      </div>
                    )
                  })()}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedCategoryData.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedCategoryData.items.length} {selectedCategoryData.items.length === 1 ? 'služba' : 'služieb'}
                    </p>
                  </div>
                </div>

                {/* Services List */}
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Služba
                        </th>
                        <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">
                          Trvanie
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Cena
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {selectedCategoryData.items.map((item, index) => (
                        <tr
                          key={index}
                          className="transition-colors hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {item.popular && (
                                <span className="flex-shrink-0 text-sm text-yellow-500">★</span>
                              )}
                              <span className="font-medium text-gray-900">
                                {item.name}
                              </span>
                            </div>
                            {item.duration && (
                              <p className="mt-1 text-sm text-gray-500 sm:hidden">
                                {item.duration}
                              </p>
                            )}
                          </td>
                          <td className="hidden px-6 py-4 text-sm text-gray-500 sm:table-cell">
                            {item.duration || '—'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-lg font-semibold text-gray-900">
                              {item.price}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Popular Services Badge */}
                {selectedCategoryData.items.some(item => item.popular) && (
                  <p className="mt-4 text-xs text-gray-500">
                    ★ — Obľúbené služby
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Žiadne výsledky</h3>
                <p className="mt-1 text-sm text-gray-500">Skúste iný vyhľadávací výraz</p>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 overflow-hidden border-t border-brand-100 bg-gradient-to-br from-brand-50/50 via-white to-[#CDA882]/10 px-4 py-16">
        <div className="pointer-events-none absolute top-10 right-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-40 w-40 rounded-full bg-[#CDA882]/20 blur-2xl" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-700">
            Máte otázky k cenám?
          </h2>
          <p className="mt-4 text-gray-600">
            Objednajte sa na bezplatnú konzultáciu a získajte individuálnu cenovú ponuku.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/rezervacia" color="primary" size="lg">
              Rezervovať konzultáciu
            </Button>
            <Button href="#kontakt" color="secondary" size="lg">
              Kontaktovať
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
