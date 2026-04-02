import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { COLORS } from '../MobiSoinsPromo';
import { PhoneFrame } from '../components/PhoneFrame';

export const MapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIn = spring({ frame, fps, config: { damping: 16, stiffness: 88 }, durationInFrames: 38 });
  const sceneOut = interpolate(frame, [88, 110], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneX = interpolate(sceneIn, [0, 1], [320, 0]);
  const textX = interpolate(sceneIn, [0, 1], [-320, 0]);
  const textOpacity = interpolate(frame, [8, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Route draw animation
  const routeProgress = interpolate(frame, [18, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ETA countdown pulse
  const etaPulse = interpolate(frame % 30, [0, 15, 30], [1, 1.04, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, #001229 0%, ${COLORS.navy} 40%, #002244 75%, #001a33 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 100,
        opacity: sceneOut,
        overflow: 'hidden',
      }}
    >
      {/* Rich background elements */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-10%',
        width: 700, height: 700,
        background: `radial-gradient(circle, rgba(152,182,144,0.10) 0%, transparent 60%)`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-15%',
        width: 600, height: 600,
        background: `radial-gradient(circle, rgba(0,123,255,0.08) 0%, transparent 60%)`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '40%',
        width: 400, height: 400,
        background: `radial-gradient(circle, rgba(152,182,144,0.06) 0%, transparent 60%)`,
        borderRadius: '50%',
      }} />

      {/* Subtle grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
        <defs>
          <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
      </svg>

      {/* Left: Text block */}
      <div style={{
        color: '#fff', maxWidth: 500, flexShrink: 0,
        transform: `translateX(${textX}px)`,
        opacity: textOpacity,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(152,182,144,0.18)',
          border: '1px solid rgba(152,182,144,0.28)',
          borderRadius: 100, padding: '8px 20px', marginBottom: 28,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: COLORS.green,
            boxShadow: `0 0 10px ${COLORS.green}`,
          }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Suivi en temps réel
          </span>
        </div>

        <h2 style={{
          fontSize: 62, fontWeight: 900, color: '#fff',
          lineHeight: 1.02, letterSpacing: '-0.04em', marginBottom: 22,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          Infirmière en<br />
          route vers<br />
          <span style={{ color: COLORS.green }}>votre domicile</span>
        </h2>

        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.60)', lineHeight: 1.65, fontWeight: 400, marginBottom: 36 }}>
          Suivez votre infirmière en direct sur la carte, recevez des notifications à chaque étape, et communiquez par chat sécurisé.
        </p>

        {/* ETA badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 16,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 20, padding: '18px 26px',
          backdropFilter: 'blur(20px)',
          transform: `scale(${etaPulse})`,
          marginBottom: 28,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'rgba(152,182,144,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
          }}>🚗</div>
          <div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 4 }}>
              Temps d'arrivée estimé
            </p>
            <p style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>
              Arrivée dans <span style={{ color: COLORS.green }}>5 min</span>
            </p>
          </div>
        </div>

        {/* Status chips */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { icon: '📍', label: '1,8 km restant', color: COLORS.green },
            { icon: '⭐', label: 'Inf. Sarah · 4.93', color: '#f59e0b' },
            { icon: '💬', label: 'Chat ouvert', color: '#60a5fa' },
          ].map(({ icon, label, color }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 100, padding: '7px 14px',
            }}>
              <span style={{ fontSize: 13 }}>{icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Phone with live map */}
      <div style={{
        transform: `translateX(${phoneX}px)`,
        filter: 'drop-shadow(0 40px 90px rgba(0,0,0,0.45))',
        flexShrink: 0,
      }}>
        <PhoneFrame scale={1.05} dark>
          <MapScreenContent routeProgress={routeProgress} />
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────────────── Map Screen Content ─────────────────── */
const MapScreenContent: React.FC<{ routeProgress: number }> = ({ routeProgress }) => {
  const ROUTE_TOTAL = 320;
  const dashOffset = ROUTE_TOTAL * (1 - routeProgress);

  return (
    <div style={{ height: '100%', background: '#e8ede8', display: 'flex', flexDirection: 'column' }}>
      {/* Map area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          viewBox="0 0 310 430"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Base */}
          <rect width="310" height="430" fill="#dce8d4"/>

          {/* City blocks */}
          <rect x="5" y="5" width="85" height="65" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="105" y="5" width="65" height="55" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="188" y="5" width="115" height="85" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="5" y="88" width="65" height="95" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="88" y="78" width="85" height="75" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="188" y="108" width="115" height="65" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="5" y="202" width="75" height="88" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="98" y="172" width="78" height="105" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="195" y="192" width="110" height="75" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="5" y="315" width="95" height="75" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="118" y="300" width="65" height="90" rx="3" fill="#cde0c2" opacity="0.9"/>
          <rect x="202" y="285" width="100" height="100" rx="3" fill="#cde0c2" opacity="0.9"/>

          {/* Main roads (white) */}
          <line x1="0" y1="162" x2="310" y2="162" stroke="#fff" strokeWidth="8" opacity="0.95"/>
          <line x1="0" y1="166" x2="310" y2="166" stroke="#dde8d4" strokeWidth="1.5" opacity="0.4"/>
          <line x1="155" y1="0" x2="155" y2="430" stroke="#fff" strokeWidth="8" opacity="0.95"/>
          <line x1="159" y1="0" x2="159" y2="430" stroke="#dde8d4" strokeWidth="1.5" opacity="0.4"/>
          <line x1="78" y1="0" x2="78" y2="430" stroke="#f0f4ec" strokeWidth="4" opacity="0.75"/>
          <line x1="232" y1="0" x2="232" y2="430" stroke="#f0f4ec" strokeWidth="4" opacity="0.75"/>
          <line x1="0" y1="278" x2="310" y2="278" stroke="#f0f4ec" strokeWidth="5" opacity="0.75"/>
          <line x1="0" y1="390" x2="310" y2="390" stroke="#f0f4ec" strokeWidth="3.5" opacity="0.6"/>
          <line x1="0" y1="82" x2="310" y2="82" stroke="#eaf0e4" strokeWidth="2.5" opacity="0.55"/>

          {/* Route path (animated) */}
          <path
            d="M 153 378 C 153 340 158 310 155 280 C 152 255 148 240 150 210 C 152 182 158 172 155 145 C 152 120 148 100 150 72 C 152 52 155 38 155 18"
            fill="none"
            stroke={COLORS.navy}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={ROUTE_TOTAL * 2.5}
            strokeDashoffset={dashOffset * 2.5}
            opacity="0.9"
          />

          {/* Route shadow for depth */}
          <path
            d="M 153 378 C 153 340 158 310 155 280 C 152 255 148 240 150 210 C 152 182 158 172 155 145 C 152 120 148 100 150 72 C 152 52 155 38 155 18"
            fill="none"
            stroke={COLORS.navy}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={ROUTE_TOTAL * 2.5}
            strokeDashoffset={dashOffset * 2.5}
            opacity="0.12"
          />

          {/* Patient home marker */}
          <circle cx="153" cy="383" r="14" fill={COLORS.navy} stroke="#fff" strokeWidth="3"/>
          <text x="153" y="387" textAnchor="middle" fontSize="11" fill="#fff">🏠</text>
          {/* Drop shadow for home */}
          <ellipse cx="153" cy="397" rx="10" ry="3" fill="rgba(0,0,0,0.15)"/>

          {/* Nurse car marker */}
          <circle cx="155" cy="22" r="16" fill={COLORS.green} stroke="#fff" strokeWidth="3.5"/>
          <circle cx="155" cy="22" r="24" fill={COLORS.green} opacity="0.18"/>
          <text x="155" y="27" textAnchor="middle" fontSize="13" fill="#fff">👩‍⚕️</text>

          {/* Distance callout */}
          <rect x="170" y="195" width="82" height="24" rx="12" fill="rgba(0,0,0,0.72)"/>
          <text x="211" y="211" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">1,8 km · 5 min</text>

          {/* Direction arrows on route */}
          <text x="145" y="115" textAnchor="middle" fontSize="11" fill={COLORS.navy} opacity="0.7">↓</text>
          <text x="145" y="245" textAnchor="middle" fontSize="11" fill={COLORS.navy} opacity="0.7">↓</text>
          <text x="145" y="335" textAnchor="middle" fontSize="11" fill={COLORS.navy} opacity="0.7">↓</text>
        </svg>

        {/* Map overlay: top left controls */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          }}>+</div>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          }}>−</div>
        </div>

        {/* Live indicator top right */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 100, padding: '5px 10px',
          display: 'flex', alignItems: 'center', gap: 5,
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#15803d' }}>EN DIRECT</span>
        </div>
      </div>

      {/* Bottom card */}
      <div style={{
        background: '#fff',
        borderTop: '1px solid rgba(0,51,102,0.08)',
        padding: '12px 14px 16px',
        display: 'flex', flexDirection: 'column', gap: 10,
        flexShrink: 0,
      }}>
        {/* Service header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 3 }}>
              Services en cours
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, background: 'rgba(0,51,102,0.08)', color: COLORS.navy, padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>1</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>Prise en charge</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, background: 'rgba(0,51,102,0.08)', color: COLORS.navy, padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>2</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>Médication IM/SC · Grippe</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>Total</p>
            <p style={{ fontSize: 16, fontWeight: 900, color: COLORS.navy }}>100 $</p>
          </div>
        </div>

        {/* Nurse info row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#f7f9fa', borderRadius: 12,
          padding: '8px 12px',
          border: '1px solid rgba(0,51,102,0.06)',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #e8f0f8, #d4e4f4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, flexShrink: 0,
            border: '2px solid rgba(0,51,102,0.1)',
          }}>👩‍⚕️</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: COLORS.text }}>Inf. Sarah B.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 10, color: '#f59e0b' }}>★</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: COLORS.text }}>4.93</span>
              <span style={{ fontSize: 10, color: '#94a3b8' }}>· En route</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: COLORS.green,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14,
            }}>💬</div>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(239,68,68,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14,
            }}>📞</div>
          </div>
        </div>

        {/* CTA button */}
        <div style={{
          background: COLORS.green,
          borderRadius: 15, padding: '13px',
          textAlign: 'center', color: '#fff',
          fontSize: 14, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: `0 6px 20px rgba(152,182,144,0.45)`,
        }}>
          <span>▶</span> Commencer le service
        </div>
      </div>
    </div>
  );
};
