import type { Metadata } from 'next'
import { Button } from '@/components/base/buttons/button'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('promotions')

export default function AkciePage() {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-brand-100/20 px-4 py-16 sm:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-20 right-10 h-64 w-64 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-80 w-80 rounded-full bg-[#CDA882]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/20 blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 shadow-lg">
            <svg
              className="h-8 w-8 text-brand-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold text-brand-700 sm:text-4xl">
            Pripravujeme
          </h1>
          <p className="mt-4 text-gray-600">
            Momentálne pripravujeme pre vás špeciálne akcie a ponuky. Sledujte náš web a
            sociálne siete, kde budeme pravidelne zverejňovať atraktívne zľavy a balíčky služieb.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-900">Sledujte nás na sociálnych sieťach:</p>
          <div className="flex justify-center gap-3">
            <a
              href="https://www.facebook.com/people/Julia-Estetic-Clinic/61560460323854/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-gray-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-brand-50 hover:shadow-lg"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/juliaesteticclinic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-gray-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-brand-50 hover:shadow-lg"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@juliaesteticclinic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-gray-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-brand-50 hover:shadow-lg"
              aria-label="TikTok"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
          <p className="text-sm text-gray-600">Chcete byť informovaní o nových akciách?</p>
          <div className="mt-4">
            <Button href="/kontakt" color="primary" size="md">
              Kontaktujte nás
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
