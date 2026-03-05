import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Book a Luxury Mobile Massage in South Florida — Áurea Essence';
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
          background: '#1C1C1C',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left gold accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '8px',
            background: 'linear-gradient(180deg, #C9A96E 0%, #D4B896 50%, #C9A96E 100%)',
          }}
        />

        {/* Background radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.12) 0%, transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 80% 20%, rgba(183,110,121,0.10) 0%, transparent 55%)',
          }}
        />

        {/* Main layout: left text, right call box */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            padding: '60px 60px 60px 80px',
            gap: '60px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Left column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              gap: '0px',
            }}
          >
            {/* Stars */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
              {['★', '★', '★', '★', '★'].map((s, i) => (
                <span key={i} style={{ fontSize: '28px', color: '#C9A96E' }}>{s}</span>
              ))}
              <span style={{ fontSize: '20px', color: 'rgba(250,246,240,0.5)', marginLeft: '10px', alignSelf: 'center' }}>
                5.0 · 100+ Sessions
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: '72px',
                fontWeight: '500',
                color: '#FAF6F0',
                margin: '0 0 16px 0',
                lineHeight: 1.1,
                letterSpacing: '-0.5px',
              }}
            >
              Luxury Massage,
              <br />
              <span style={{ color: '#C9A96E' }}>Delivered to You</span>
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: '26px',
                color: 'rgba(250,246,240,0.65)',
                margin: '0 0 36px 0',
                lineHeight: 1.4,
              }}
            >
              Professional mobile massage anywhere in South Florida — home, hotel, or office.
            </p>

            {/* Trust pills */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Licensed & Insured', 'Same-Day Available', 'We Bring Everything'].map(t => (
                <div
                  key={t}
                  style={{
                    background: 'rgba(201,169,110,0.15)',
                    border: '1px solid rgba(201,169,110,0.35)',
                    borderRadius: '100px',
                    padding: '8px 20px',
                    fontSize: '17px',
                    color: '#C9A96E',
                    letterSpacing: '0.5px',
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — CTA card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(145deg, #C9A96E, #B8955A)',
              borderRadius: '16px',
              padding: '44px 40px',
              width: '300px',
              flexShrink: 0,
              gap: '16px',
            }}
          >
            <p style={{ fontSize: '15px', color: '#1C1C1C', margin: 0, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: '600', opacity: 0.75 }}>
              Book Now
            </p>
            <div
              style={{
                width: '48px',
                height: '48px',
                background: '#1C1C1C',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '24px' }}>📞</span>
            </div>
            <p
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1C1C1C',
                margin: 0,
                textAlign: 'center',
                letterSpacing: '-0.5px',
                fontFamily: 'sans-serif',
              }}
            >
              (305) 519-4034
            </p>
            <div style={{ width: '60px', height: '1px', background: 'rgba(28,28,28,0.2)' }} />
            <p style={{ fontSize: '15px', color: '#1C1C1C', margin: 0, opacity: 0.7, textAlign: 'center', fontFamily: 'sans-serif' }}>
              Same-day · 7 days a week
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 80px 32px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: '20px', color: 'rgba(201,169,110,0.5)', letterSpacing: '4px', textTransform: 'uppercase' }}>
            Áurea Essence Massage
          </span>
          <span style={{ fontSize: '18px', color: 'rgba(250,246,240,0.25)', fontFamily: 'sans-serif' }}>
            aureaessencemassage.com/ads
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
