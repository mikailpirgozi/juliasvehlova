import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Julia Estetic Clinic',
    short_name: 'Julia Clinic',
    description: 'Profesionálne služby estetickej medicíny v Malackách',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF5F2',
    theme_color: '#B49D95',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'sk',
    categories: ['beauty', 'health', 'medical'],
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon1',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon1',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon2',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon2',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Rezervácia termínu',
        short_name: 'Rezervácia',
        url: '/rezervacia',
        description: 'Rezervujte si termín online',
        icons: [{ src: '/icon1', sizes: '192x192' }],
      },
      {
        name: 'Naše služby',
        short_name: 'Služby',
        url: '/sluzby',
        description: 'Prehľad všetkých služieb',
        icons: [{ src: '/icon1', sizes: '192x192' }],
      },
      {
        name: 'Darčekové poukážky',
        short_name: 'Poukážky',
        url: '/darcekove-poukazky',
        description: 'Darujte krásu a pohodu',
        icons: [{ src: '/icon1', sizes: '192x192' }],
      },
    ],
  }
}
