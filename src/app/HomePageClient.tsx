'use client'

import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home'

// Dynamic imports for below-the-fold sections - reduces initial bundle size
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

export function HomePageClient() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <InstagramSection />
      <ContactSection />
    </>
  )
}
