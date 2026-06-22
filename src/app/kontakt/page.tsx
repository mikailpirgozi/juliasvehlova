import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { PageBreadcrumbSchema } from '@/components/seo/page-schemas'
import { KontaktPageClient } from './KontaktPageClient'

export const metadata: Metadata = generatePageMetadata('contact')

export default function KontaktPage() {
  return (
    <>
      <PageBreadcrumbSchema name="Kontakt" path="/kontakt" />
      <KontaktPageClient />
    </>
  )
}
