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
        {/* Preconnect to Bookio — establishes TCP+TLS connection before iframe loads */}
        <link rel="preconnect" href="https://services.bookio.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://services.bookio.com" />
        {/* DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

        {/* Favicon - explicit fallback for older browsers */}
        <link rel="icon" href="/icon" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icon1" sizes="192x192" type="image/png" />
        <link rel="shortcut icon" href="/icon" />

        {/* Windows tiles (IE11, Edge, Windows start menu) */}
        <meta name="msapplication-TileColor" content="#B49D95" />
        <meta name="msapplication-TileImage" content="/apple-icon" />
        <meta name="msapplication-square70x70logo" content="/icon" />
        <meta name="msapplication-square150x150logo" content="/apple-icon" />
        <meta name="msapplication-wide310x150logo" content="/apple-icon" />
        <meta name="msapplication-square310x310logo" content="/icon2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Safari pinned tab */}
        <link rel="mask-icon" href="/images/branding/logo.svg" color="#B49D95" />

        {/* Mobile web app capable */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Julia Clinic" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Julia Clinic" />
      </head>
      <body>
        {/* JSON-LD Structured Data for SEO */}
        <MainSchemaMarkup />
        
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
