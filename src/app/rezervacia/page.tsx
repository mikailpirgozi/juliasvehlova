import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { PageBreadcrumbSchema } from '@/components/seo/page-schemas'
import { ReservationPageClient } from './ReservationPageClient'

export const metadata: Metadata = generatePageMetadata('booking')

interface ReservationPageProps {
  searchParams: Promise<{ service?: string; category?: string }>
}

export default async function ReservationPage({ searchParams }: ReservationPageProps) {
  const { service, category } = await searchParams
  return (
    <>
      <PageBreadcrumbSchema name="Rezervácia termínu" path="/rezervacia" />
      <ReservationPageClient preselectedService={service} preselectedCategory={category} />
    </>
  )
}
