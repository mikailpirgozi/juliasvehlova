'use client'

import { Toaster } from 'sonner'

export function ToasterProvider(): JSX.Element {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        duration: 5000,
        style: {
          fontFamily: 'var(--font-inter)',
        },
      }}
    />
  )
}

