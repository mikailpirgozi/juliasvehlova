'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps): JSX.Element {
  useEffect(() => {
    // Log error to error tracking service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-white px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <h1 className="mb-4 font-serif text-6xl font-bold text-primary">Ups!</h1>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Niečo sa pokazilo
          </h2>
          <p className="text-gray-600">
            Ospravedlňujeme sa, vyskytla sa neočakávaná chyba. Skúste prosím obnoviť stránku.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="primary" size="lg">
            Skúsiť znova
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="outline" size="lg">
            Späť na hlavnú stránku
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 rounded-lg bg-red-50 p-4 text-left">
            <p className="mb-2 text-sm font-semibold text-red-800">Development Error:</p>
            <p className="text-xs text-red-700">{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-xs text-red-600">Digest: {error.digest}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

