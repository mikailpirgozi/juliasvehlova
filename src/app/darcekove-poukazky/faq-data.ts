import type { FAQItem } from '@/components/seo/schema-org'

/**
 * Gift-voucher FAQ — shared between the visible UI (GiftVouchersPageClient) and
 * the FAQPage JSON-LD on the server page, so the markup always matches the page.
 */
export const giftVoucherFaqItems: FAQItem[] = [
  {
    question: 'Ako dlho platí darčeková poukážka?',
    answer: 'Všetky naše darčekové poukážky majú platnosť 3 mesiace od dátumu zakúpenia.',
  },
  {
    question: 'Na aké služby môžem poukážku použiť?',
    answer:
      'Poukážka je platná na všetky naše služby - estetickú medicínu, permanentný make-up, kozmetické ošetrenia aj profesionálne líčenie.',
  },
  {
    question: 'Môžem získať poukážku aj na inú hodnotu?',
    answer:
      'Áno, vytvárame poukážky aj na mieru podľa vašich požiadaviek. Stačí nás kontaktovať s požadovanou hodnotou.',
  },
  {
    question: 'Ako si môžem poukážku objednať?',
    answer:
      'Poukážku si môžete objednať telefonicky na +421 911 992 211, emailom na juliaesteticclinic@gmail.com alebo osobne v našej klinike v Malackách.',
  },
  {
    question: 'Ako prebieha doručenie poukážky?',
    answer:
      'Poukážku si môžete vyzdvihnúť osobne v klinike alebo vám ju doručíme poštou v elegantnom balení. Možnosť expresného doručenia v Malackách a okolí.',
  },
]
