import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

function getLogoBase64() {
  const logoPath = path.join(process.cwd(), 'public/images/branding/logo.png')
  const data = readFileSync(logoPath)
  return `data:image/png;base64,${data.toString('base64')}`
}

export default function Icon() {
  const logo = getLogoBase64()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #FAF5F2 0%, #EDD5C5 100%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          style={{
            width: 420,
            height: 420,
            objectFit: 'contain',
          }}
          alt="Julia Estetic Clinic"
        />
      </div>
    ),
    { ...size }
  )
}
