import type { Metadata } from 'next'
import './globals.css'
import { inter, playfair } from '@/lib/fonts'
import { MainLayout } from '@/components/MainLayout'

export const metadata: Metadata = {
  title: 'Julia Estetic Clinic - Profesionálne služby estetickej medicíny',
  description:
    'Komplexné služby estetickej medicíny, permanentného make-upu a profesionálneho líčenia v Malackách. Viac ako 10 rokov skúseností.',
  keywords: [
    'estetická medicína',
    'botulotoxín',
    'kyselina hyalurónová',
    'permanentný makeup',
    'laserová epilácia',
    'Malacky',
  ],
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    url: 'https://juliaesteticclinic.sk',
    siteName: 'Julia Estetic Clinic',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="sk" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
