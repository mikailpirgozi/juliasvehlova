import Decimal from 'decimal.js'

/**
 * Centrálna logika pre časovo obmedzené propagačné kampane.
 *
 * Aktuálne aktívne:
 *  - Deň matiek (každoročne 7.–11. mája v časovom pásme Europe/Bratislava)
 *    → 20% zľava na vybrané procedúry
 */

const BRATISLAVA_TZ = 'Europe/Bratislava'

const MOTHERS_DAY_START_MONTH = 5 // máj
const MOTHERS_DAY_START_DAY = 7
const MOTHERS_DAY_END_DAY = 11

/**
 * Roky v ktorých je kampaň Deň matiek manuálne vypnutá (override).
 * Užitočné keď chceš zachovať kód pre budúce roky, ale aktuálnu
 * kampaň ukončiť skôr (napr. predčasne vypredané, zmenená stratégia).
 */
const MOTHERS_DAY_DISABLED_FOR_YEARS: ReadonlySet<number> = new Set([2026])

export const MOTHERS_DAY_DISCOUNT_PERCENT = 20

/**
 * Konfig pre konkrétnu službu zaradenú do akcie Deň matiek.
 * `serviceId` musí matchovať `id` v `services-new.ts`.
 */
export interface MothersDayPromoService {
  serviceId: string
  serviceName: string
  /** Cesta na detail page služby (`/sluzby/...`) */
  detailHref: string
  /** Bookio service ID (pre priamu rezerváciu cez `?service=...`) */
  bookioServiceId: string
  bookioCategoryId: string
}

/**
 * Mapovanie procedúr v akcii Deň matiek.
 * Hodnoty musia byť v synchu so `services-new.ts` (id, slugy, bookio IDs).
 */
export const MOTHERS_DAY_PROMO_SERVICES: Record<
  string,
  MothersDayPromoService
> = {
  'polynukleotidova-biorevitalizacia-salmon-sperm': {
    serviceId: 'polynukleotidova-biorevitalizacia-salmon-sperm',
    serviceName: 'Polynukleotidová biorevitalizácia pleti (Salmon Sperm)',
    detailHref:
      '/sluzby/esteticka-medicina/biorevitalizacia-pleti/polynukleotidova-biorevitalizacia-pleti-salmon-sperm',
    bookioServiceId: '151914',
    bookioCategoryId: '35837',
  },
  'aqua-star-exclusive': {
    serviceId: 'aqua-star-exclusive',
    serviceName: 'Aqua Star exclusive',
    detailHref: '/sluzby/kozmetika/pristrojove-osetrenia/aqua-star-exclusive',
    bookioServiceId: '109013',
    bookioCategoryId: '35823',
  },
}

interface DateParts {
  year: number
  month: number
  day: number
}

function getBratislavaDateParts(now: Date = new Date()): DateParts {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: BRATISLAVA_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(now)
  const get = (type: Intl.DateTimeFormatPartTypes): number => {
    const part = parts.find((p) => p.type === type)
    return part ? Number.parseInt(part.value, 10) : 0
  }
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
  }
}

/**
 * Vráti `true` ak je aktuálny dátum (Europe/Bratislava) v rozmedzí
 * 7.–11. mája a zároveň aktuálny rok nie je vo vypnutých rokoch
 * (`MOTHERS_DAY_DISABLED_FOR_YEARS`).
 */
export function isMothersDayActive(now: Date = new Date()): boolean {
  const { year, month, day } = getBratislavaDateParts(now)
  if (MOTHERS_DAY_DISABLED_FOR_YEARS.has(year)) return false
  return (
    month === MOTHERS_DAY_START_MONTH &&
    day >= MOTHERS_DAY_START_DAY &&
    day <= MOTHERS_DAY_END_DAY
  )
}

/**
 * Vráti promo config pre danú službu, ak je akcia aktívna a služba je v zozname.
 */
export function getActiveMothersDayPromo(
  serviceId: string,
  now: Date = new Date(),
): MothersDayPromoService | null {
  if (!isMothersDayActive(now)) return null
  return MOTHERS_DAY_PROMO_SERVICES[serviceId] ?? null
}

export interface DiscountedPrice {
  /** Pôvodný string ('150 €') */
  original: string
  /** Zľavnený string ('120 €') */
  discounted: string
  /** Percento zľavy (20) */
  discountPercent: number
  /** Pôvodná hodnota ako Decimal (150) */
  originalAmount: Decimal
  /** Zľavnená hodnota ako Decimal (120) */
  discountedAmount: Decimal
  /** Ušetrená suma ako Decimal (30) */
  savedAmount: Decimal
}

const PRICE_REGEX = /^(\d+(?:[.,]\d+)?)\s*€$/

const SK_PRICE_FORMATTER = new Intl.NumberFormat('sk-SK', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

function formatEuro(amount: Decimal, hasDecimals: boolean): string {
  const value = hasDecimals
    ? amount.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber()
    : amount.toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber()
  return SK_PRICE_FORMATTER.format(value)
}

/**
 * Aplikuje zľavu na cenu v tvare `'150 €'` alebo `'149,99 €'`.
 * Vráti `null` pre ceny ktoré nedokáže parsovať (napr. `'od 50 €'`,
 * `'1ml 100 €'`) — vtedy treba pôvodnú cenu nezasahovať.
 */
export function applyDiscountToPrice(
  priceString: string,
  discountPercent: number,
): DiscountedPrice | null {
  const trimmed = priceString.trim()
  const match = trimmed.match(PRICE_REGEX)
  if (!match) return null

  const numericPart = match[1]
  if (!numericPart) return null

  const originalAmount = new Decimal(numericPart.replace(',', '.'))
  const multiplier = new Decimal(100 - discountPercent).div(100)
  const discountedAmount = originalAmount.mul(multiplier)
  const savedAmount = originalAmount.minus(discountedAmount)
  const hasDecimals = numericPart.includes(',') || numericPart.includes('.')

  return {
    original: formatEuro(originalAmount, hasDecimals),
    discounted: formatEuro(discountedAmount, hasDecimals),
    discountPercent,
    originalAmount,
    discountedAmount,
    savedAmount,
  }
}
