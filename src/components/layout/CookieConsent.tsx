'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui'

export function CookieConsent(): JSX.Element | null {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie-consent')
    if (!hasConsent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = (): void => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowConsent(false)
    // Load analytics
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '')
    }
  }

  const handleReject = (): void => {
    localStorage.setItem('cookie-consent', 'rejected')
    setShowConsent(false)
  }

  if (!showConsent) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white p-4 shadow-2xl sm:max-w-md">
      <div className="space-y-4">
        <p className="text-sm text-gray-700">
          Používame cookies na zlepšenie vášho zážitku. Všetky cookies sú anonymné a slúžia na
          analýzu a zlepšenie našich služieb.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" onClick={handleReject} className="flex-1">
            Odmietnuť
          </Button>
          <Button variant="primary" size="sm" onClick={handleAccept} className="flex-1">
            Prijať
          </Button>
        </div>
        <a href="/privacy" className="text-xs text-gray-500 hover:text-gray-700">
          Viac informácií
        </a>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
