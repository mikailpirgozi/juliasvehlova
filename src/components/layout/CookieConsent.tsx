'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/base/buttons/button'
import Link from 'next/link'

export function CookieConsent() {
  // Must start as false (same as server) to avoid hydration mismatch.
  // localStorage is only available after hydration, so we read it in useEffect.
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Defer to the next frame so we don't call setState synchronously inside the
    // effect body (avoids cascading renders); localStorage is only readable
    // after hydration, which is why we don't read it during render.
    const id = requestAnimationFrame(() => {
      setShowConsent(!localStorage.getItem('cookie-consent'))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const handleAccept = (): void => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowConsent(false)
    // Google Consent Mode v2 — unlock analytics storage after explicit consent.
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
  }

  const handleReject = (): void => {
    localStorage.setItem('cookie-consent', 'rejected')
    setShowConsent(false)
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  }

  if (!showConsent) {
    return null
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:inset-x-auto sm:right-4 sm:left-auto">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Používame cookies</h3>
          <p className="mt-1 text-sm text-gray-500">
            Používame cookies na zlepšenie vášho zážitku. Všetky cookies sú anonymné a slúžia na
            analýzu a zlepšenie našich služieb.
          </p>
        </div>
        <div className="flex gap-3">
          <Button color="secondary" size="sm" onClick={handleReject} className="flex-1">
            Odmietnuť
          </Button>
          <Button color="primary" size="sm" onClick={handleAccept} className="flex-1">
            Prijať
          </Button>
        </div>
        <Link href="/ochrana-udajov" className="block text-center text-xs text-gray-400 hover:text-gray-500">
          Viac informácií
        </Link>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
