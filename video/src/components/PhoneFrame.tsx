import React from 'react';
import { COLORS } from '../MobiSoinsPromo';

interface PhoneFrameProps {
  children: React.ReactNode;
  scale?: number;
  style?: React.CSSProperties;
  dark?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, scale = 1, style, dark = false }) => {
  const W = 320 * scale;
  const H = 680 * scale;
  const R = 54 * scale;
  const BORDER = 7 * scale;

  return (
    <div
      style={{
        width: W,
        height: H,
        borderRadius: R,
        background: dark ? '#1e293b' : '#dde3ed',
        border: `${BORDER}px solid ${dark ? '#334155' : '#eef1f7'}`,
        boxShadow: dark
          ? `${28 * scale}px ${40 * scale}px ${80 * scale}px rgba(0,0,0,0.5),
             inset -${5 * scale}px -${5 * scale}px ${14 * scale}px rgba(0,0,0,0.3),
             inset ${5 * scale}px ${5 * scale}px ${14 * scale}px rgba(255,255,255,0.06)`
          : `${28 * scale}px ${40 * scale}px ${80 * scale}px rgba(15,23,42,0.20),
             inset -${5 * scale}px -${5 * scale}px ${14 * scale}px rgba(15,23,42,0.10),
             inset ${5 * scale}px ${5 * scale}px ${14 * scale}px rgba(255,255,255,0.97)`,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Side buttons */}
      <div style={{
        position: 'absolute',
        right: -BORDER - 3 * scale,
        top: 110 * scale,
        width: 4 * scale,
        height: 52 * scale,
        background: dark ? '#334155' : '#c8d0de',
        borderRadius: `0 ${3 * scale}px ${3 * scale}px 0`,
      }} />
      <div style={{
        position: 'absolute',
        left: -BORDER - 3 * scale,
        top: 90 * scale,
        width: 4 * scale,
        height: 36 * scale,
        background: dark ? '#334155' : '#c8d0de',
        borderRadius: `${3 * scale}px 0 0 ${3 * scale}px`,
      }} />
      <div style={{
        position: 'absolute',
        left: -BORDER - 3 * scale,
        top: 140 * scale,
        width: 4 * scale,
        height: 60 * scale,
        background: dark ? '#334155' : '#c8d0de',
        borderRadius: `${3 * scale}px 0 0 ${3 * scale}px`,
      }} />
      <div style={{
        position: 'absolute',
        left: -BORDER - 3 * scale,
        top: 215 * scale,
        width: 4 * scale,
        height: 60 * scale,
        background: dark ? '#334155' : '#c8d0de',
        borderRadius: `${3 * scale}px 0 0 ${3 * scale}px`,
      }} />

      {/* Screen */}
      <div
        style={{
          position: 'absolute',
          inset: 9 * scale,
          borderRadius: (R - 10) * scale,
          background: '#f7f9fa',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 11 * scale,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 108 * scale,
            height: 30 * scale,
            background: '#0a0f1a',
            borderRadius: 18 * scale,
            zIndex: 50,
          }}
        />

        {/* Status bar */}
        <div
          style={{
            height: 50 * scale,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingInline: 22 * scale,
            paddingTop: 6 * scale,
            zIndex: 40,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 12 * scale, fontWeight: 700, color: '#0f172a', fontFamily: 'system-ui' }}>9:41</span>
          <div style={{ display: 'flex', gap: 5 * scale, alignItems: 'center' }}>
            <SignalIcon size={13 * scale} />
            <WifiIcon size={13 * scale} />
            <BatteryIcon size={18 * scale} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 8 * scale,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 118 * scale,
            height: 4 * scale,
            background: 'rgba(10,15,26,0.14)',
            borderRadius: 4 * scale,
          }}
        />
      </div>
    </div>
  );
};

const SignalIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size * 1.2} height={size} viewBox="0 0 18 12" fill="#0f172a">
    <rect x="0" y="6" width="3" height="6" rx="1" opacity="1"/>
    <rect x="4.5" y="4" width="3" height="8" rx="1" opacity="1"/>
    <rect x="9" y="2" width="3" height="10" rx="1" opacity="1"/>
    <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="1"/>
  </svg>
);

const WifiIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 20h.01" />
    <path d="M2 8.82a15 15 0 0 1 20 0" />
    <path d="M5 12.859a10 10 0 0 1 14 0" />
    <path d="M8.5 16.429a5 5 0 0 1 7 0" />
  </svg>
);

const BatteryIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 24 14" fill="none">
    <rect x="0.5" y="0.5" width="20" height="13" rx="3" stroke="#0f172a" strokeWidth="1.5"/>
    <rect x="2" y="2" width="15" height="10" rx="2" fill="#0f172a"/>
    <path d="M22 4.5v5a2 2 0 0 0 0-5z" fill="#0f172a"/>
  </svg>
);
