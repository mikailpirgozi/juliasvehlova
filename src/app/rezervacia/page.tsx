import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ReservationPageClient } from './ReservationPageClient'

export const metadata: Metadata = generatePageMetadata('booking')

interface ReservationPageProps {
  searchParams: Promise<{ service?: string }>
}

export default async function ReservationPage({ searchParams }: ReservationPageProps) {
  const { service } = await searchParams
  return <ReservationPageClient preselectedService={service} />
}
