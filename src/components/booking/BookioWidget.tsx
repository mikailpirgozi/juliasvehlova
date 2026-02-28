'use client'

import { useState, useEffect } from 'react'
import { env } from '@/lib/env'
import { trackBooking } from '@/lib/analytics'

const DEFAULT_HEIGHT = 800

interface BookioWidgetProps {
  preselectedService?: string
  className?: string
}

export function BookioWidget({ preselectedService, className }: BookioWidgetProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [iframeHeight, setIframeHeight] = useState(DEFAULT_HEIGHT)

  const bookioUrl = env.NEXT_PUBLIC_BOOKIO_WIDGET_URL

  // Listen for postMessage resize events from Bookio iframe
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (typeof event.data?.height === 'number' && event.data.height > 0) {
        setIframeHeight(event.data.height)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  if (!bookioUrl) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p className="mb-4 text-gray-600">
          Bookio widget nie je nakonfigurovaný. Prosím nastavte NEXT_PUBLIC_BOOKIO_WIDGET_URL v
          .env
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

  const iframeSrc = preselectedService ? `${bookioUrl}?service=${preselectedService}` : bookioUrl

  return (
    <div className={className}>
      {isLoading && (
        <div
          className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50"
          style={{ height: iframeHeight }}
        >
          <div className="text-center">
            <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-gray-600">Načítava sa rezervačný systém...</p>
          </div>
        </div>
      )}

      <div className={isLoading ? 'hidden' : 'block'}>
        <iframe
          src={iframeSrc}
          title="Bookio rezervačný systém"
          className="w-full rounded-lg border border-gray-200 shadow-sm"
          style={{ height: iframeHeight }}
          onLoad={() => {
            setIsLoading(false)
            trackBooking(preselectedService)
          }}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      </div>
    </div>
  )
}

