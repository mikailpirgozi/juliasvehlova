import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Julia Estetic Clinic',
    short_name: 'Julia Clinic',
    description: 'Profesionálne služby estetickej medicíny v Malackách',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#B49D95',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}

