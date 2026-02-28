import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

function getLogoMarkBase64() {
  const logoPath = path.join(process.cwd(), 'public/images/branding/logo-mark.svg')
  const data = readFileSync(logoPath)
  return `data:image/svg+xml;base64,${data.toString('base64')}`
}

export default function Icon() {
  const logoMark = getLogoMarkBase64()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF5F2',
          borderRadius: 5,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoMark}
          style={{
            width: 26,
            height: 26,
            objectFit: 'contain',
          }}
          alt="Julia Estetic Clinic"
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
