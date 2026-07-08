import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { isMothersDayActive } from '@/lib/promotions'
import { getUpcomingEvent } from '@/lib/events'
import { HomePageClient } from './HomePageClient'

export const metadata: Metadata = generatePageMetadata('home')

// ISR: re-render hourly so date-gated promos (event banner, Mothers Day hero)
// appear/disappear without a redeploy
export const revalidate = 3600

export default function HomePage() {
  const showMothersDayHero = isMothersDayActive()
  const upcomingEvent = getUpcomingEvent()
  return (
    <HomePageClient
      showMothersDayHero={showMothersDayHero}
      upcomingEvent={upcomingEvent}
    />
  )
}
