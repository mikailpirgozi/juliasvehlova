import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ReservationPageClient } from './ReservationPageClient'

export const metadata: Metadata = generatePageMetadata('booking')

export default function ReservationPage() {
  return <ReservationPageClient />
}
