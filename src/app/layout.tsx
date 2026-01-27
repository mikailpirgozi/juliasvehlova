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
    <html lang="sk" className={`${inter.variable} ${playfair.variable}`}>
      {/* 
        Next.js automatically creates <head> and inserts metadata from Metadata API
        No manual <head> element needed - prevents metadata rendering issues
      */}
      <body>
        {/* JSON-LD Structured Data for SEO */}
        <MainSchemaMarkup />
        
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
