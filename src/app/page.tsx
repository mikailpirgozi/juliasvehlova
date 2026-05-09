import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { isMothersDayActive } from '@/lib/promotions'
import { HomePageClient } from './HomePageClient'

export const metadata: Metadata = generatePageMetadata('home')

export default function HomePage() {
  const showMothersDayHero = isMothersDayActive()
  return <HomePageClient showMothersDayHero={showMothersDayHero} />
}
