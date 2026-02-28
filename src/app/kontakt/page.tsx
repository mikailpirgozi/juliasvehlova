import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { KontaktPageClient } from './KontaktPageClient'

export const metadata: Metadata = generatePageMetadata('contact', {
  alternates: {
    canonical: 'https://juliaesteticclinic.sk/kontakt',
  },
})

export default function KontaktPage() {
  return <KontaktPageClient />
}
