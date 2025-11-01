'use client'

import { useState } from 'react'
import type { FAQ } from '@/lib/services'

interface ServiceFAQProps {
  faqs: FAQ[]
}

export function ServiceFAQ({ faqs }: ServiceFAQProps): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="flex w-full items-start justify-between p-6 text-left"
            aria-expanded={openIndex === index}
          >
            <span className="pr-4 font-medium text-gray-900">{faq.question}</span>
            <span className="flex-shrink-0 text-2xl text-primary">
              {openIndex === index ? '−' : '+'}
            </span>
          </button>

          {openIndex === index && (
            <div className="border-t border-gray-100 px-6 pb-6 pt-4">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

