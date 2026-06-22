import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { KontaktPageClient } from './KontaktPageClient'

export const metadata: Metadata = generatePageMetadata('contact')

export default function KontaktPage() {
  return <KontaktPageClient />
}
