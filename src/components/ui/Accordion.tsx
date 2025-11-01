'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItemData {
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
  defaultOpen?: number[]
}

export function Accordion({ items, className, defaultOpen = [] }: AccordionProps): JSX.Element {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set(defaultOpen))

  const toggleItem = (index: number): void => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => (
        <div key={index} className="border border-primary/20 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 flex items-center justify-between bg-primary/5 hover:bg-primary/10 transition-colors"
            aria-expanded={openItems.has(index)}
          >
            <h3 className="text-lg font-semibold text-left">{item.title}</h3>
            <svg
              className={cn(
                'w-5 h-5 transition-transform duration-200',
                openItems.has(index) && 'rotate-180'
              )}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openItems.has(index) && (
            <div className="px-6 py-4 bg-white">
              <div className="text-gray-700">{item.content}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

