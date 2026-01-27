import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { CennikPageClient } from './CennikPageClient'

export const metadata: Metadata = generatePageMetadata('pricing')

export default function CennikPage() {
  return <CennikPageClient />
}
