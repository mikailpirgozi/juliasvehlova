import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { AboutTeamSchema } from '@/components/seo/page-schemas'
import { AboutPageClient } from './AboutPageClient'

export const metadata: Metadata = generatePageMetadata('about')

export default function AboutPage() {
  return (
    <>
      <AboutTeamSchema />
      <AboutPageClient />
    </>
  )
}
