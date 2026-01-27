import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { HomePageClient } from './HomePageClient'

export const metadata: Metadata = generatePageMetadata('home')

export default function HomePage() {
  return <HomePageClient />
}
