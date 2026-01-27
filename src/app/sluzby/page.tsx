import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ServicesPageClient } from './ServicesPageClient'

export const metadata: Metadata = generatePageMetadata('services')

export default function ServicesPage() {
  return <ServicesPageClient />
}
