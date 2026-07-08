'use client'

import dynamic from 'next/dynamic'
import { HeroSection, MothersDayHero } from '@/components/home'
import type { ClinicEvent } from '@/lib/events'

// Dynamic imports for below-the-fold sections - reduces initial bundle size
const EventPromoSection = dynamic(
  () => import('@/components/home/EventPromoSection').then((mod) => mod.EventPromoSection),
  { ssr: true }
)

const ServicesSection = dynamic(
  () => import('@/components/home/ServicesSection').then((mod) => mod.ServicesSection),
  { ssr: true }
)

const AboutSection = dynamic(
  () => import('@/components/home/AboutSection').then((mod) => mod.AboutSection),
  { ssr: true }
)

const TestimonialsSection = dynamic(
  () => import('@/components/home/TestimonialsSection').then((mod) => mod.TestimonialsSection),
  { ssr: true }
)

const InstagramSection = dynamic(
  () => import('@/components/home/InstagramSection').then((mod) => mod.InstagramSection),
  { ssr: true }
)

const ContactSection = dynamic(
  () => import('@/components/home/ContactSection').then((mod) => mod.ContactSection),
  { ssr: true }
)

interface HomePageClientProps {
  showMothersDayHero: boolean
  upcomingEvent: ClinicEvent | null
}

export function HomePageClient({ showMothersDayHero, upcomingEvent }: HomePageClientProps) {
  return (
    <>
      {showMothersDayHero ? <MothersDayHero /> : <HeroSection />}
      {upcomingEvent && <EventPromoSection event={upcomingEvent} />}
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <InstagramSection />
      <ContactSection />
    </>
  )
}
