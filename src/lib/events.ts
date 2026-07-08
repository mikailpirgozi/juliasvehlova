/**
 * Centrálna evidencia podujatí kliniky (stránka /eventy + homepage promo).
 *
 * Nový event = pridať objekt do `CLINIC_EVENTS`. Homepage promo aj stránka
 * /eventy sa riadia `startsAt`/`endsAt` — po skončení eventu promo zmizne
 * a event sa na /eventy označí ako uskutočnený.
 */

export interface EventCharity {
  name: string
  description: string
  /** Priamy link na online príspevok (Darujme.sk) — rovnaký cieľ ako QR kód */
  donationUrl: string
  logoSrc: string
  qrSrc: string
  photoSrc: string
  photoAlt: string
}

export interface ClinicEvent {
  slug: string
  title: string
  /** ISO 8601 s offsetom Europe/Bratislava (v lete +02:00) */
  startsAt: string
  endsAt: string
  dateLabel: string
  timeLabel: string
  admissionLabel: string
  intro: string
  /** Program / čo návštevníkov čaká */
  highlights: string[]
  outro: string
  posterSrc: string
  posterAlt: string
  /** Bookio service/category — rezervácia miesta cez /rezervacia (voliteľné) */
  bookioServiceId?: string
  bookioCategoryId?: string
  charity?: EventCharity
}

export const CLINIC_EVENTS: ClinicEvent[] = [
  {
    slug: 'den-krasy-2026',
    title: 'Deň krásy v Julia Estetic Clinic',
    startsAt: '2026-07-22T18:00:00+02:00',
    endsAt: '2026-07-22T21:00:00+02:00',
    dateLabel: '22. 7. 2026',
    timeLabel: '18:00 – 21:00',
    admissionLabel: 'Dobrovoľné vstupné',
    intro:
      'Príďte zažiť tvorivú ženskú energiu a načerpať novú inšpiráciu do bežných dní na náš prvý oficiálny Deň krásy v Julia Estetic Clinic.',
    highlights: [
      'Horúce novinky zo sveta anti-agingu a estetickej medicíny',
      'Pohyb v rytme latina',
      'Odborné prednášky od top odborníkov v obore',
      'LIVE performance estetických zákrokov',
      'Bazár oblečenia',
      'Networking a stretnutia s množstvom inšpiratívnych žien a mužov',
    ],
    outro:
      'Príďte si užiť príjemný letný večer plný inšpirácie, noviniek, pohybu a dobrej myšlienky.',
    posterSrc: '/images/events/den-krasy-2026/plagat-den-krasy.webp',
    posterAlt: 'Plagát podujatia Deň krásy v Julia Estetic Clinic — 22. 7. 2026, 18:00 – 21:00',
    bookioServiceId: '17913',
    bookioCategoryId: '40282',
    charity: {
      name: 'Deťom s rakovinou n. o.',
      description:
        'Súčasťou podujatia bude aj dobrovoľná charitatívna zbierka, ktorej celý výťažok venujeme neziskovej organizácii Deťom s rakovinou n. o. Tá pomáha deťom liečiacim sa na Klinike detskej hematológie a onkológie v Národnom ústave detských chorôb v Bratislave.',
      donationUrl: 'https://detomsrakovinou.darujme.sk/onlineplatby-18359',
      logoSrc: '/images/events/den-krasy-2026/detom-s-rakovinou-logo.webp',
      qrSrc: '/images/events/den-krasy-2026/qr-darujme.png',
      photoSrc: '/images/events/den-krasy-2026/detom-s-rakovinou-maskot.webp',
      photoAlt:
        'Maskot organizácie Deťom s rakovinou n. o. na Klinike detskej hematológie a onkológie NÚDCH v Bratislave',
    },
  },
]

/** Interný link na rezerváciu miesta (preselektne Bookio widget na /rezervacia), alebo null. */
export function getEventBookingHref(event: ClinicEvent): string | null {
  if (!event.bookioServiceId) return null
  const params = new URLSearchParams({ service: event.bookioServiceId })
  if (event.bookioCategoryId) params.set('category', event.bookioCategoryId)
  return `/rezervacia?${params.toString()}`
}

/** Event je „aktuálny" kým neskončí (vrátane dňa konania). */
export function isEventUpcoming(event: ClinicEvent, now: Date = new Date()): boolean {
  return now.getTime() <= new Date(event.endsAt).getTime()
}

/** Najbližší pripravovaný event (pre homepage promo), alebo null. */
export function getUpcomingEvent(now: Date = new Date()): ClinicEvent | null {
  const upcoming = CLINIC_EVENTS.filter((e) => isEventUpcoming(e, now)).sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )
  return upcoming[0] ?? null
}
