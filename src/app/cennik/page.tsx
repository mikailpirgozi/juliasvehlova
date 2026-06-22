import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { PageBreadcrumbSchema } from '@/components/seo/page-schemas'
import { CennikPageClient } from './CennikPageClient'

export const metadata: Metadata = generatePageMetadata('pricing')

export default function CennikPage() {
  return (
    <>
      <PageBreadcrumbSchema name="Cenník" path="/cennik" />
      <CennikPageClient />
    </>
  )
}
