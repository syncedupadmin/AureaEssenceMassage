import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Áurea Essence Massage - Premium Mobile Massage Therapy';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #2D2D2D 0%, #1C1C1C 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Subtle sparkle effect overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 40%, rgba(201, 169, 110, 0.1) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 70% 60%, rgba(201, 169, 110, 0.08) 0%, transparent 50%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Business name with gold gradient */}
          <h1
            style={{
              fontSize: '88px',
              fontWeight: '400',
              background: 'linear-gradient(135deg, #D4B896 0%, #C9A96E 50%, #D4B896 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: '0 0 8px 0',
              letterSpacing: '2px',
            }}
          >
            Áurea Essence
          </h1>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '48px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #C9A96E)',
              }}
            />
            <p
              style={{
                fontSize: '24px',
                color: '#C9A96E',
                margin: 0,
                fontWeight: '400',
                letterSpacing: '6px',
                textTransform: 'uppercase',
              }}
            >
              Mobile Massage
            </p>
            <div
              style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, #C9A96E, transparent)',
              }}
            />
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '32px',
              color: '#FAF6F0',
              margin: 0,
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.3,
              fontWeight: '500',
            }}
          >
            Luxury Wellness, Delivered to Your Door
          </p>

          <p
            style={{
              fontSize: '22px',
              color: 'rgba(250, 246, 240, 0.6)',
              margin: '20px 0 0 0',
              textAlign: 'center',
            }}
          >
            Five-Star Spa Experience • Your Private Setting
          </p>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '16px',
            color: 'rgba(201, 169, 110, 0.6)',
            letterSpacing: '2px',
          }}
        >
          <span>LICENSED & INSURED</span>
          <span style={{ color: '#C9A96E' }}>•</span>
          <span>SOUTH FLORIDA</span>
          <span style={{ color: '#C9A96E' }}>•</span>
          <span>5-STAR RATED</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
