import type { Metadata, Viewport } from 'next'
import './globals.css'
import { inter, playfair } from '@/lib/fonts'
import { MainLayout } from '@/components/MainLayout'
import { MainSchemaMarkup } from '@/components/seo'
import { getBaseMetadata } from '@/lib/seo'

/**
 * Root Metadata - provides base SEO configuration for all pages
 * Using centralized SEO configuration from lib/seo
 */
export const metadata: Metadata = getBaseMetadata()

/**
 * Viewport configuration
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#B49D95',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body>
        {/* JSON-LD Structured Data for SEO */}
        <MainSchemaMarkup />
        
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
