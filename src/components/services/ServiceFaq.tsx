import { FAQSchema, type FAQItem } from '@/components/seo/schema-org'
import { CONTACT } from '@/lib/seo/constants'
import type { MainCategory, Subcategory, SimpleService } from '@/lib/services-new'

/**
 * Answer-first FAQ for a service detail page.
 *
 * Builds a small set of genuinely useful Q&As from the service's own data
 * (price, duration, who it's for, how it works, benefits) and renders them:
 *   - as visible, always-in-the-DOM <details> content (so AI crawlers and the
 *     `.faq-answer` Speakable selector can read the answers — the answers are
 *     CSS-collapsed, never unmounted), and
 *   - as FAQPage JSON-LD.
 *
 * FAQ rich results no longer render in Google Search (deprecated 2026), but the
 * VISIBLE answer-first text is a primary GEO/AEO lever for being cited by
 * ChatGPT / Perplexity / AI Overviews, and the schema still aids understanding.
 */
export function ServiceFaq({
  service,
  category,
  subcategory,
}: {
  service: SimpleService
  category: MainCategory
  subcategory?: Subcategory
}) {
  const faqs = buildServiceFaqs(service, category, subcategory)
  if (faqs.length === 0) return null

  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <FAQSchema faqs={faqs} />
      <h2 id="faq-heading" className="mb-5 font-serif text-2xl font-bold text-gray-900">
        Často kladené otázky
      </h2>
      <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
        {faqs.map((faq, index) => (
          <details key={index} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
              <span className="faq-question">{faq.question}</span>
              <span className="ml-2 flex-shrink-0 text-brand-500 transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="faq-answer mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/** Compose answer-first FAQ items from the service data. */
function buildServiceFaqs(
  service: SimpleService,
  category: MainCategory,
  subcategory?: Subcategory,
): FAQItem[] {
  const name = service.name
  const where = 'Julia Estetic Clinic v Malackách'
  const faqs: FAQItem[] = []

  // 1) Price — the highest-intent question.
  faqs.push({
    question: `Koľko stojí ${name}?`,
    answer: `${name} v ${where} stojí ${service.price}${
      service.duration ? ` a ošetrenie trvá približne ${service.duration}` : ''
    }. Konečnú cenu vám potvrdíme na bezplatnej konzultácii podľa individuálneho plánu ošetrenia.`,
  })

  // 2) Duration.
  if (service.duration) {
    faqs.push({
      question: `Ako dlho trvá ošetrenie ${name}?`,
      answer: `Samotné ošetrenie ${name} trvá približne ${service.duration}. Počítajte prosím aj s časom na úvodnú konzultáciu pred zákrokom.`,
    })
  }

  // 3) What it is / overview.
  const overview = service.fullDescription || service.shortDescription
  if (overview) {
    faqs.push({
      question: `Čo je ${name} a ako pomáha?`,
      answer: overview,
    })
  }

  // 4) For whom.
  if (service.forWhom && service.forWhom.length > 0) {
    faqs.push({
      question: `Pre koho je ${name} vhodné?`,
      answer: `${name} odporúčame pre: ${joinList(service.forWhom)}.`,
    })
  }

  // 5) How it works (process).
  if (service.process && service.process.length > 0) {
    const steps = service.process
      .map((s, i) => `${i + 1}. ${s.title}${s.description ? ` – ${s.description}` : ''}`)
      .join(' ')
    faqs.push({
      question: `Ako prebieha ošetrenie ${name}?`,
      answer: `Priebeh ošetrenia: ${steps}`,
    })
  }

  // 6) Benefits.
  if (service.benefits && service.benefits.length > 0) {
    const benefits = service.benefits.map((b) => b.title).filter(Boolean)
    if (benefits.length > 0) {
      faqs.push({
        question: `Aké sú prínosy ošetrenia ${name}?`,
        answer: `Hlavné prínosy: ${joinList(benefits)}.`,
      })
    }
  }

  // 7) How to book — always useful, drives conversion + gives AI a clear CTA.
  faqs.push({
    question: `Ako sa objednať na ${name}?`,
    answer: `Na ${name} sa môžete objednať online cez rezervačný systém na stránke, telefonicky na ${CONTACT.phone} alebo e-mailom na ${CONTACT.email}. ${category.title} vykonávame v ${where}, ${CONTACT.address.street}, ${CONTACT.address.city}.`,
  })

  void subcategory
  return faqs
}

function joinList(items: readonly string[]): string {
  const cleaned = items.filter(Boolean)
  if (cleaned.length <= 1) return cleaned.join('')
  return `${cleaned.slice(0, -1).join(', ')} a ${cleaned[cleaned.length - 1]}`
}
