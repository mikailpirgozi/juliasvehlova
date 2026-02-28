'use client'

import { useState, useEffect, useRef } from 'react'
import { env } from '@/lib/env'
import { trackBooking } from '@/lib/analytics'

const DEFAULT_HEIGHT = 1100
const BOOKIO_ORIGIN = 'https://services.bookio.com'
const BOOKIO_BASE = `${BOOKIO_ORIGIN}/julia-estetic-clinic/widget`
// Fallback timeout: reveal iframe even if neither postMessage nor onLoad fires
const REVEAL_TIMEOUT_MS = 12000

interface BookioWidgetProps {
  preselectedService?: string
  preselectedCategory?: string
  className?: string
}

function BookioSkeleton({ height }: { height: number }) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white"
      style={{ height, minHeight: DEFAULT_HEIGHT }}
      aria-hidden="true"
    >
      <div className="animate-pulse p-5">
        {/* Step 1 — service selector */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-7 w-7 rounded-full bg-brand-100" />
          <div className="h-4 w-40 rounded-full bg-gray-200" />
        </div>
        <div className="mb-2 h-11 rounded-xl bg-brand-100" />
        <div className="mb-5 h-11 rounded-xl bg-gray-100" />
        <div className="mb-8 h-11 rounded-xl border border-gray-200" />

        {/* Step 2 — service picker */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-7 w-7 rounded-full bg-brand-100" />
          <div className="h-4 w-32 rounded-full bg-gray-200" />
        </div>
        <div className="mb-8 h-11 rounded-xl border border-gray-200 bg-gray-50" />

        {/* Step 3 — calendar */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-7 w-7 rounded-full bg-brand-100" />
          <div className="h-4 w-28 rounded-full bg-gray-200" />
        </div>
        <div className="mb-3 flex items-center justify-between">
          <div className="h-5 w-24 rounded-full bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-lg bg-gray-100" />
            <div className="h-8 w-8 rounded-lg bg-brand-100" />
          </div>
        </div>
        <div className="mb-2 grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-4 rounded-full bg-gray-100" />
          ))}
        </div>
        <div className="mb-8 grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className={`h-8 rounded-lg ${i === 17 ? 'bg-brand-200' : 'bg-gray-100'}`} />
          ))}
        </div>

        {/* Step 4 — time slots */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-7 w-7 rounded-full bg-brand-100" />
          <div className="h-4 w-24 rounded-full bg-gray-200" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 rounded-lg bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function BookioWidget({ preselectedService, preselectedCategory, className }: BookioWidgetProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [iframeHeight, setIframeHeight] = useState(DEFAULT_HEIGHT)
  // Prevent reveal + trackBooking from firing more than once
  const revealedRef = useRef(false)

  const bookioUrl = env.NEXT_PUBLIC_BOOKIO_WIDGET_URL

  const reveal = (service?: string) => {
    if (revealedRef.current) return
    revealedRef.current = true
    setIsLoading(false)
    trackBooking(service)
  }

  useEffect(() => {
    // Timeout fallback: if neither postMessage nor onLoad fires, reveal anyway
    const timer = setTimeout(() => reveal(preselectedService), REVEAL_TIMEOUT_MS)

    const handler = (event: MessageEvent) => {
      // Security: only trust messages from Bookio's origin
      if (event.origin !== BOOKIO_ORIGIN) return

      if (typeof event.data?.height === 'number' && event.data.height > 0) {
        setIframeHeight(event.data.height)
        // First height message = widget has rendered → reveal immediately
        reveal(preselectedService)
      }
    }

    window.addEventListener('message', handler)
    return () => {
      window.removeEventListener('message', handler)
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!bookioUrl) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p className="mb-4 text-gray-600">
          Bookio widget nie je nakonfigurovaný. Prosím nastavte NEXT_PUBLIC_BOOKIO_WIDGET_URL v .env
        </p>
        <p className="text-sm text-gray-500">
          Dočasne nás kontaktujte telefonicky alebo emailom pre rezerváciu.
        </p>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <p className="mb-4 text-red-800">Nepodarilo sa načítať rezervačný systém.</p>
        <button
          onClick={() => {
            revealedRef.current = false
            setHasError(false)
            setIsLoading(true)
          }}
          className="text-primary hover:underline"
        >
          Skúsiť znova
        </button>
      </div>
    )
  }

  let iframeSrc = bookioUrl
  if (preselectedService) {
    iframeSrc = `${BOOKIO_BASE}?strict=true&service=${preselectedService}`
    if (preselectedCategory) {
      iframeSrc += `&category=${preselectedCategory}`
    }
  }

  return (
    // position:relative is required so the hidden iframe overlays the skeleton correctly
    <div className={`relative ${className ?? ''}`}>
      {isLoading && <BookioSkeleton height={iframeHeight} />}

      <iframe
        src={iframeSrc}
        title="Bookio rezervačný systém"
        // When loading: overlay the skeleton exactly (absolute inset-0 fills the relative wrapper)
        // When ready: normal block layout
        className={`w-full rounded-xl border border-gray-200 shadow-sm transition-opacity duration-300 ${
          isLoading ? 'pointer-events-none absolute inset-0 opacity-0' : 'relative block opacity-100'
        }`}
        style={{ height: iframeHeight, minHeight: DEFAULT_HEIGHT }}
        // onLoad = last-resort fallback if Bookio never sends a postMessage
        onLoad={() => reveal(preselectedService)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
}
