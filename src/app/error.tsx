'use client'

import { useEffect } from 'react'
import { Button } from '@/components/base/buttons/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-100">
          <svg className="h-6 w-6 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Niečo sa pokazilo</h1>
        <p className="mt-2 text-gray-500">
          Ospravedlňujeme sa, vyskytla sa neočakávaná chyba. Skúste prosím obnoviť stránku.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} color="primary" size="md">
            Skúsiť znova
          </Button>
          <Button onClick={() => (window.location.href = '/')} color="secondary" size="md">
            Späť na hlavnú stránku
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 rounded-lg border border-error-200 bg-error-50 p-4 text-left">
            <p className="text-sm font-medium text-error-800">Development Error:</p>
            <p className="mt-1 text-xs text-error-700">{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-xs text-error-600">Digest: {error.digest}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
