import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { COLORS } from '../MobiSoinsPromo';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 110 }, durationInFrames: 35 });
  const taglineOpacity = interpolate(frame, [22, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [22, 48], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [35, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeY = interpolate(frame, [35, 58], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [56, 70], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Pulse animation for the dot
  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.5, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, #001229 0%, ${COLORS.navy} 45%, #002244 80%, #001a33 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
        opacity: fadeOut,
        overflow: 'hidden',
      }}
    >
      {/* Rich background texture — large radial blobs */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-10%',
        width: 700, height: 700,
        background: `radial-gradient(circle, rgba(152,182,144,0.18) 0%, transparent 65%)`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-12%',
        width: 600, height: 600,
        background: `radial-gradient(circle, rgba(0,123,255,0.14) 0%, transparent 65%)`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '8%',
        width: 300, height: 300,
        background: `radial-gradient(circle, rgba(152,182,144,0.10) 0%, transparent 65%)`,
        borderRadius: '50%',
      }} />

      {/* Subtle grid overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
        <defs>
          <pattern id="intro-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#intro-grid)" />
      </svg>

      {/* Decorative corner elements */}
      <div style={{
        position: 'absolute', top: 40, left: 60,
        display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.15,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: COLORS.green }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 40, right: 60,
        display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.15,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: COLORS.green }} />
            ))}
          </div>
        ))}
      </div>

      {/* Logo card */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 36,
          padding: '44px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        }}
      >
        {/* Pulse dots + wordmark row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* Left pulse indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: COLORS.green,
              boxShadow: `0 0 ${12 * pulse}px ${COLORS.green}, 0 0 ${24 * pulse}px rgba(152,182,144,0.4)`,
            }} />
            <div style={{
              width: 2, height: 20,
              background: `linear-gradient(to bottom, ${COLORS.green}, transparent)`,
              borderRadius: 2,
            }} />
          </div>

          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
            <span style={{
              fontSize: 80,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}>
              Mobi
            </span>
            <span style={{
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.green,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}>
              Soins
            </span>
          </div>

          {/* Right pulse indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: COLORS.green,
              boxShadow: `0 0 ${12 * pulse}px ${COLORS.green}, 0 0 ${24 * pulse}px rgba(152,182,144,0.4)`,
            }} />
            <div style={{
              width: 2, height: 20,
              background: `linear-gradient(to bottom, ${COLORS.green}, transparent)`,
              borderRadius: 2,
            }} />
          </div>
        </div>

        {/* Heartbeat line */}
        <HeartbeatLine />

        {/* "Soins infirmiers à domicile" label under the line */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(152,182,144,0.15)',
          border: '1px solid rgba(152,182,144,0.25)',
          borderRadius: 100, padding: '6px 18px',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.green }} />
          <span style={{
            fontSize: 13, fontWeight: 700, color: COLORS.green,
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            Soins infirmiers à domicile
          </span>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: 'center',
        }}
      >
        <p style={{
          fontSize: 30,
          color: 'rgba(255,255,255,0.72)',
          fontWeight: 400,
          letterSpacing: '0.01em',
          lineHeight: 1.4,
        }}>
          Les soins infirmiers à domicile —{' '}
          <span style={{ color: COLORS.green, fontWeight: 600 }}>quand vous en avez besoin</span>
        </p>
      </div>

      {/* Availability badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(0,51,102,0.5)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 100, padding: '10px 28px',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Montréal · Québec · Canada
        </span>
      </div>
    </AbsoluteFill>
  );
};

const HeartbeatLine: React.FC = () => (
  <svg width="320" height="44" viewBox="0 0 320 44">
    {/* Glow layer */}
    <polyline
      points="0,22 38,22 52,4 64,40 78,22 118,22 132,4 144,40 158,22 198,22 212,6 224,38 238,22 320,22"
      fill="none"
      stroke={COLORS.green}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.25"
    />
    {/* Main line */}
    <polyline
      points="0,22 38,22 52,4 64,40 78,22 118,22 132,4 144,40 158,22 198,22 212,6 224,38 238,22 320,22"
      fill="none"
      stroke={COLORS.green}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Animated dot at peak */}
    <circle cx="52" cy="4" r="4" fill={COLORS.green} opacity="0.9" />
    <circle cx="132" cy="4" r="4" fill={COLORS.green} opacity="0.9" />
    <circle cx="212" cy="6" r="4" fill={COLORS.green} opacity="0.9" />
  </svg>
);
