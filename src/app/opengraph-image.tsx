import { ImageResponse } from 'next/og'
import { siteContent } from '@/content/site'

export const alt = 'NILE GrowthWorks'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#141414',
          color: '#F0F1F2',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#D6B53A',
          }}
        >
          NILE GROWTHWORKS
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>
          {siteContent.hero.title}{' '}
          <span style={{ color: '#D6B53A', marginLeft: 20 }}>{siteContent.hero.titleAccent}</span>
        </div>
        <div style={{ fontSize: 32, marginTop: 32, color: '#D6D9DB', maxWidth: 900 }}>
          {siteContent.hero.subhead}
        </div>
      </div>
    ),
    { ...size }
  )
}
