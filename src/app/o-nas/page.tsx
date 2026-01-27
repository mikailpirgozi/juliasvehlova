import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { AboutPageClient } from './AboutPageClient'

export const metadata: Metadata = generatePageMetadata('about')

export default function AboutPage() {
  return <AboutPageClient />
}
