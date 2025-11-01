'use client'

import {
  HeroSection,
  ServicesSection,
  AboutSection,
  TestimonialsSection,
  ContactSection,
} from '@/components/home'

export default function HomePage(): JSX.Element {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
