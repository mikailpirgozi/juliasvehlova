import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { PageBreadcrumbSchema, ClinicEventSchema } from '@/components/seo/page-schemas'
import { CLINIC_EVENTS, isEventUpcoming } from '@/lib/events'
import { EventsPageClient } from './EventsPageClient'

export const metadata: Metadata = generatePageMetadata('events')

// ISR: re-render hourly so upcoming/past state flips without a redeploy
export const revalidate = 3600

export default function EventsPage() {
  const events = CLINIC_EVENTS.map((event) => ({
    event,
    isPast: !isEventUpcoming(event),
  }))

  return (
    <>
      <PageBreadcrumbSchema name="Eventy" path="/eventy" />
      {events
        .filter(({ isPast }) => !isPast)
        .map(({ event }) => (
          <ClinicEventSchema key={event.slug} event={event} />
        ))}
      <EventsPageClient events={events} />
    </>
  )
}
