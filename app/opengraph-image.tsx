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
          background: 'linear-gradient(135deg, #faf9f7 0%, #f5f0eb 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Decorative top border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #be8a6e 0%, #d4a88a 50%, #be8a6e 100%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          {/* Logo/Brand mark */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '60px',
              background: 'linear-gradient(135deg, #be8a6e 0%, #d4a88a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(190, 138, 110, 0.3)',
            }}
          >
            <span style={{ fontSize: '48px', color: 'white', fontWeight: 'bold' }}>Á</span>
          </div>

          {/* Business name */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: '400',
              color: '#1a1a1a',
              margin: '0 0 16px 0',
              letterSpacing: '-1px',
            }}
          >
            Áurea Essence
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: '32px',
              color: '#be8a6e',
              margin: '0 0 40px 0',
              fontWeight: '500',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Massage
          </p>

          {/* Divider */}
          <div
            style={{
              width: '80px',
              height: '2px',
              background: '#be8a6e',
              marginBottom: '32px',
            }}
          />

          {/* Description */}
          <p
            style={{
              fontSize: '28px',
              color: '#666',
              margin: 0,
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            Premium Mobile Massage Therapy
          </p>

          <p
            style={{
              fontSize: '22px',
              color: '#888',
              margin: '12px 0 0 0',
              textAlign: 'center',
            }}
          >
            Luxury Wellness, Delivered to Your Door
          </p>
        </div>

        {/* Decorative bottom border */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #be8a6e 0%, #d4a88a 50%, #be8a6e 100%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
