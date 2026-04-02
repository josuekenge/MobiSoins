import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { COLORS } from '../MobiSoinsPromo';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 13, stiffness: 115 }, durationInFrames: 32 });
  const tagIn = spring({ frame: frame - 16, fps, config: { damping: 14, stiffness: 100 }, durationInFrames: 30 });
  const ctaIn = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 88 }, durationInFrames: 30 });
  const badgesIn = spring({ frame: frame - 46, fps, config: { damping: 14, stiffness: 88 }, durationInFrames: 30 });
  const urlIn = spring({ frame: frame - 58, fps, config: { damping: 14, stiffness: 88 }, durationInFrames: 30 });

  const finalFade = interpolate(frame, [80, 90], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Heartbeat pulse
  const hbPulse = interpolate(frame % 24, [0, 12, 24], [1, 1.05, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, #001229 0%, #002040 30%, ${COLORS.navy} 60%, #001a33 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
        opacity: finalFade,
        overflow: 'hidden',
      }}
    >
      {/* Rich background blobs */}
      <div style={{
        position: 'absolute', top: '-15%', right: '5%',
        width: 700, height: 700,
        background: `radial-gradient(circle, rgba(152,182,144,0.13) 0%, transparent 60%)`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', left: '-10%',
        width: 600, height: 600,
        background: `radial-gradient(circle, rgba(0,123,255,0.10) 0%, transparent 60%)`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', top: '35%', left: '35%',
        width: 350, height: 350,
        background: `radial-gradient(circle, rgba(152,182,144,0.07) 0%, transparent 60%)`,
        borderRadius: '50%',
      }} />

      {/* Grid overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
        <defs>
          <pattern id="outro-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#outro-grid)" />
      </svg>

      {/* Decorative corner dots */}
      <div style={{ position: 'absolute', top: 48, left: 72, opacity: 0.12 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {[0, 1, 2, 3].map(j => (
              <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: COLORS.green }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 48, right: 72, opacity: 0.12 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {[0, 1, 2, 3].map(j => (
              <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: COLORS.green }} />
            ))}
          </div>
        ))}
      </div>

      {/* Heartbeat above logo */}
      <div style={{
        transform: `scale(${logoIn}) scale(${hbPulse})`,
        display: 'flex', justifyContent: 'center',
      }}>
        <HeartbeatLine />
      </div>

      {/* Main logo */}
      <div style={{
        transform: `scale(${logoIn})`,
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      }}>
        {/* Logo with pulse indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <PulseDot />
          <h1 style={{
            fontSize: 108, fontWeight: 900, color: '#fff',
            letterSpacing: '-0.05em', lineHeight: 1,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            Mobi<span style={{ color: COLORS.green }}>Soins</span>
          </h1>
          <PulseDot />
        </div>

        {/* Tagline sub-line */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(152,182,144,0.14)',
          border: '1px solid rgba(152,182,144,0.24)',
          borderRadius: 100, padding: '7px 20px',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.green }} />
          <span style={{
            fontSize: 13, fontWeight: 700, color: COLORS.green,
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            Soins infirmiers à domicile · Québec
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p style={{
        fontSize: 28, color: 'rgba(255,255,255,0.68)',
        fontWeight: 400, letterSpacing: '0.01em',
        transform: `translateY(${interpolate(tagIn, [0, 1], [22, 0])}px)`,
        opacity: tagIn,
        textAlign: 'center',
        maxWidth: 720,
        lineHeight: 1.45,
      }}>
        Les soins infirmiers à domicile —{' '}
        <span style={{ color: COLORS.green, fontWeight: 600 }}>quand vous en avez besoin</span>
      </p>

      {/* Availability badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(0,51,102,0.45)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 100, padding: '10px 26px',
        opacity: ctaIn,
        transform: `translateY(${interpolate(ctaIn, [0, 1], [20, 0])}px)`,
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{
          width: 9, height: 9, borderRadius: '50%',
          background: COLORS.green,
          boxShadow: `0 0 14px ${COLORS.green}`,
        }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.green, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Bientôt disponible — Montréal, QC
        </span>
      </div>

      {/* Store buttons */}
      <div style={{
        display: 'flex', gap: 18,
        opacity: badgesIn,
        transform: `translateY(${interpolate(badgesIn, [0, 1], [22, 0])}px)`,
      }}>
        <StoreButton type="apple" />
        <StoreButton type="google" />
      </div>

      {/* URL */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        opacity: urlIn,
        transform: `translateY(${interpolate(urlIn, [0, 1], [12, 0])}px)`,
      }}>
        <div style={{ height: 1, width: 60, background: 'rgba(255,255,255,0.15)' }} />
        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', fontWeight: 500 }}>
          mobisoins.ca
        </p>
        <div style={{ height: 1, width: 60, background: 'rgba(255,255,255,0.15)' }} />
      </div>
    </AbsoluteFill>
  );
};

/* ─────────────────── Sub-components ─────────────────── */

const PulseDot: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
    <div style={{
      width: 14, height: 14, borderRadius: '50%',
      background: COLORS.green,
      boxShadow: `0 0 18px ${COLORS.green}, 0 0 36px rgba(152,182,144,0.3)`,
    }} />
    <div style={{
      width: 2, height: 22,
      background: `linear-gradient(to bottom, ${COLORS.green}aa, transparent)`,
      borderRadius: 2,
    }} />
  </div>
);

const HeartbeatLine: React.FC = () => (
  <svg width="360" height="48" viewBox="0 0 360 48">
    {/* Glow layer */}
    <polyline
      points="0,24 42,24 58,5 72,43 88,24 132,24 148,5 162,43 178,24 222,24 238,7 252,41 268,24 360,24"
      fill="none"
      stroke={COLORS.green}
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.2"
    />
    {/* Main line */}
    <polyline
      points="0,24 42,24 58,5 72,43 88,24 132,24 148,5 162,43 178,24 222,24 238,7 252,41 268,24 360,24"
      fill="none"
      stroke={COLORS.green}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Peak dots */}
    <circle cx="58" cy="5" r="4.5" fill={COLORS.green}/>
    <circle cx="148" cy="5" r="4.5" fill={COLORS.green}/>
    <circle cx="238" cy="7" r="4.5" fill={COLORS.green}/>
  </svg>
);

const StoreButton: React.FC<{ type: 'apple' | 'google' }> = ({ type }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 14,
    background: 'rgba(255,255,255,0.09)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 18, padding: '16px 28px',
    backdropFilter: 'blur(24px)',
    minWidth: 200,
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  }}>
    {type === 'apple' ? <AppleLogo /> : <GooglePlayLogo />}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{
        fontSize: 11, color: 'rgba(255,255,255,0.55)',
        textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
      }}>
        {type === 'apple' ? 'Download on the' : 'Get it on'}
      </span>
      <span style={{
        fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em',
        lineHeight: 1,
      }}>
        {type === 'apple' ? 'App Store' : 'Google Play'}
      </span>
    </div>
  </div>
);

const AppleLogo: React.FC = () => (
  <svg width="24" height="30" viewBox="0 0 814 1000" fill="white">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-108.3C27.1 766.2 0 633.6 0 506.6c0-204.9 133.4-313.1 264.4-313.1 69.4 0 127.1 45.5 170.4 45.5 41.3 0 106.1-49.2 185.8-49.2zm-181.7-111c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
  </svg>
);

const GooglePlayLogo: React.FC = () => (
  <svg width="24" height="27" viewBox="0 0 22 24" fill="none">
    <path d="M0.6 0.54L12.4 12 0.6 23.46C0.23 23.16 0 22.7 0 22.17V1.82C0 1.29 0.23.84.6.54Z" fill="#32BBFF"/>
    <path d="M16.4 8.08L12.4 12l4 3.92L21.2 13.26C22.46 12.56 22.46 11.44 21.2 10.74L16.4 8.08Z" fill="#FFD700"/>
    <path d="M0.6 23.46C0.99 23.78 1.52 23.86 2.1 23.56L14.2 16.94 12.4 12 0.6 23.46Z" fill="#FF3B30"/>
    <path d="M14.2 7.06L2.1.44C1.52.14.99.22.6.54L12.4 12 14.2 7.06Z" fill="#00E676"/>
  </svg>
);
