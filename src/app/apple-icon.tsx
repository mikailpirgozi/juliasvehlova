import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

function getLogoBase64() {
  const logoPath = path.join(process.cwd(), 'public/images/branding/logo.svg')
  const data = readFileSync(logoPath)
  return `data:image/svg+xml;base64,${data.toString('base64')}`
}

export default function AppleIcon() {
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
          borderRadius: 40,
        }}
      >
        <img
          src={logo}
          style={{
            width: 144,
            height: 144,
            objectFit: 'contain',
          }}
          alt="Julia Estetic Clinic"
        />
      </div>
    ),
    { ...size }
  )
}
