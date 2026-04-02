import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { COLORS } from '../MobiSoinsPromo';
import { PhoneFrame } from '../components/PhoneFrame';

export const NurseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIn = spring({ frame, fps, config: { damping: 18, stiffness: 88 }, durationInFrames: 42 });
  const sceneOut = interpolate(frame, [170, 200], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const leftX = interpolate(sceneIn, [0, 1], [-220, 0]);
  const rightX = interpolate(sceneIn, [0, 1], [220, 0]);
  const textOpacity = interpolate(frame, [12, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Incoming request screen fades in at frame 75
  const requestOpacity = interpolate(frame, [75, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Pulsing map dot
  const mapPulse = interpolate(frame % 40, [0, 20, 40], [1, 1.6, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #f0f4f8 0%, #e8ecf2 60%, #edf2f7 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 110,
        opacity: sceneOut,
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-8%',
        width: 600, height: 600,
        background: `radial-gradient(circle, rgba(152,182,144,0.14) 0%, transparent 65%)`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', right: '-10%',
        width: 500, height: 500,
        background: `radial-gradient(circle, rgba(0,51,102,0.06) 0%, transparent 65%)`,
        borderRadius: '50%',
      }} />

      {/* Left: Two nurse app phones */}
      <div style={{
        transform: `translateX(${leftX}px)`,
        position: 'relative',
        width: 380,
        height: 760,
        flexShrink: 0,
      }}>
        {/* Back phone: incoming request */}
        <div style={{
          position: 'absolute', left: -50, top: 60,
          opacity: requestOpacity,
          transform: `rotate(-5deg) scale(0.88)`,
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 24px 48px rgba(0,51,102,0.14))',
        }}>
          <PhoneFrame scale={0.92}>
            <IncomingRequestScreen />
          </PhoneFrame>
        </div>

        {/* Front phone: nurse map home */}
        <div style={{
          position: 'absolute', right: -50, top: 0,
          transform: `rotate(3deg)`,
          filter: 'drop-shadow(0 32px 64px rgba(0,51,102,0.18))',
        }}>
          <PhoneFrame scale={1.0}>
            <NurseHomeScreen mapPulse={mapPulse} />
          </PhoneFrame>
        </div>
      </div>

      {/* Right: Copy */}
      <div style={{
        transform: `translateX(${rightX}px)`,
        opacity: textOpacity,
        maxWidth: 500,
        flexShrink: 0,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(125,160,116,0.15)', borderRadius: 100,
          padding: '8px 20px', marginBottom: 28,
          border: '1px solid rgba(125,160,116,0.25)',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.greenDark, boxShadow: `0 0 8px ${COLORS.greenDark}` }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.greenDark, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Pour les infirmières
          </span>
        </div>

        <h2 style={{
          fontSize: 66, fontWeight: 900, color: COLORS.text,
          lineHeight: 1.02, letterSpacing: '-0.04em', marginBottom: 20,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          Gérez vos<br />
          <span style={{ color: COLORS.greenDark }}>missions</span><br />
          simplement
        </h2>

        <p style={{ fontSize: 21, color: COLORS.muted, lineHeight: 1.65, fontWeight: 400, marginBottom: 36 }}>
          Acceptez des demandes en temps réel, naviguez vers le patient, et complétez la fiche clinique.
        </p>

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { icon: '🗺️', label: 'Carte en temps réel', desc: 'Voyez les demandes autour de vous' },
            { icon: '📋', label: 'Fiche patient complète', desc: 'Antécédents, allergies, ordonnances' },
            { icon: '💰', label: 'Paiement automatique', desc: 'Revenus versés directement après la visite' },
            { icon: '⭐', label: 'Système de priorité', desc: 'Plus vous travaillez, plus vous montez' },
          ].map(({ icon, label, desc }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'rgba(152,182,144,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>{icon}</div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>{label}</p>
                <p style={{ fontSize: 13, color: COLORS.muted, marginTop: 1 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature pill badges */}
        <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {['GPS intégré', 'Chat sécurisé', 'OIIQ vérifié', 'Assurance incluse'].map((f) => (
            <div key={f} style={{
              padding: '7px 16px', borderRadius: 100,
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(125,160,116,0.2)',
              fontSize: 13, fontWeight: 600, color: COLORS.greenDark,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}>{f}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────────────── Nurse Map Home Screen ─────────────────── */
const NurseHomeScreen: React.FC<{ mapPulse: number }> = ({ mapPulse }) => (
  <div style={{ height: '100%', background: '#f5f7fa', display: 'flex', flexDirection: 'column' }}>
    {/* Map area */}
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      {/* Map base */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 300 440"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Base green map */}
        <rect width="300" height="440" fill="#e8f0e4"/>

        {/* City blocks */}
        <rect x="10" y="10" width="80" height="60" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="110" y="10" width="70" height="50" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="200" y="10" width="90" height="80" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="10" y="90" width="60" height="90" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="90" y="80" width="90" height="70" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="200" y="110" width="90" height="60" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="10" y="200" width="70" height="80" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="100" y="170" width="80" height="100" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="200" y="190" width="90" height="70" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="10" y="310" width="90" height="70" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="120" y="295" width="70" height="85" rx="3" fill="#dce8d4" opacity="0.9"/>
        <rect x="210" y="280" width="80" height="100" rx="3" fill="#dce8d4" opacity="0.9"/>

        {/* Main roads */}
        <line x1="0" y1="155" x2="300" y2="155" stroke="#fff" strokeWidth="7" opacity="0.9"/>
        <line x1="0" y1="158" x2="300" y2="158" stroke="#e0e4e0" strokeWidth="1" opacity="0.5"/>
        <line x1="150" y1="0" x2="150" y2="440" stroke="#fff" strokeWidth="7" opacity="0.9"/>
        <line x1="153" y1="0" x2="153" y2="440" stroke="#e0e4e0" strokeWidth="1" opacity="0.5"/>
        <line x1="75" y1="0" x2="75" y2="440" stroke="#fff" strokeWidth="4" opacity="0.7"/>
        <line x1="225" y1="0" x2="225" y2="440" stroke="#fff" strokeWidth="4" opacity="0.7"/>
        <line x1="0" y1="270" x2="300" y2="270" stroke="#fff" strokeWidth="5" opacity="0.7"/>
        <line x1="0" y1="380" x2="300" y2="380" stroke="#fff" strokeWidth="4" opacity="0.6"/>

        {/* Secondary roads */}
        <line x1="0" y1="80" x2="300" y2="80" stroke="#f0f0ec" strokeWidth="2.5" opacity="0.6"/>
        <line x1="0" y1="390" x2="300" y2="390" stroke="#f0f0ec" strokeWidth="2" opacity="0.5"/>

        {/* Nurse location with pulse ring */}
        <circle cx="148" cy="210" r={20 * mapPulse * 0.5} fill={COLORS.green} opacity={0.15 / mapPulse}/>
        <circle cx="148" cy="210" r="14" fill={COLORS.green} stroke="#fff" strokeWidth="3"/>
        <text x="148" y="215" textAnchor="middle" fontSize="12" fill="#fff">+</text>

        {/* Nearby request pins */}
        <circle cx="90" cy="130" r="9" fill={COLORS.navy} stroke="#fff" strokeWidth="2.5"/>
        <text x="90" y="134" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">!</text>

        <circle cx="220" cy="310" r="9" fill={COLORS.navy} stroke="#fff" strokeWidth="2.5"/>
        <text x="220" y="314" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">!</text>

        {/* Distance labels */}
        <rect x="35" y="118" width="70" height="18" rx="9" fill="rgba(0,0,0,0.7)"/>
        <text x="70" y="130" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="600">2,1 km · 8 min</text>

        <rect x="167" y="298" width="70" height="18" rx="9" fill="rgba(0,0,0,0.7)"/>
        <text x="202" y="310" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="600">3,4 km · 12 min</text>
      </svg>

      {/* "Passer en ligne" big CTA button */}
      <div style={{
        position: 'absolute', bottom: 16, left: 12, right: 12,
        background: COLORS.green,
        borderRadius: 18, padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: `0 8px 28px rgba(152,182,144,0.5)`,
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: '#fff', opacity: 0.9,
        }} />
        <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '0.01em' }}>
          Passer en ligne
        </span>
      </div>

      {/* Stats widget top-right */}
      <div style={{
        position: 'absolute', top: 12, right: 10,
        background: 'rgba(255,255,255,0.94)',
        borderRadius: 14, padding: '8px 10px',
        boxShadow: '0 4px 18px rgba(0,51,102,0.1)',
      }}>
        <p style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
          Priorité
        </p>
        <p style={{ fontSize: 14, fontWeight: 800, color: COLORS.navy }}>+33 ⭐</p>
      </div>
    </div>

    {/* Stats bar */}
    <div style={{
      background: '#fff',
      padding: '10px 14px',
      borderTop: '1px solid rgba(0,51,102,0.07)',
      display: 'flex', justifyContent: 'space-around',
      flexShrink: 0,
    }}>
      <StatCell label="Commandes" value="0" />
      <div style={{ width: 1, background: '#e2e8f0' }} />
      <StatCell label="Aujourd'hui" value="0 $" green />
      <div style={{ width: 1, background: '#e2e8f0' }} />
      <StatCell label="Ce mois" value="840 $" green />
    </div>

    {/* Bottom nav */}
    <NurseBottomNav active="map" />
  </div>
);

const StatCell: React.FC<{ label: string; value: string; green?: boolean }> = ({ label, value, green }) => (
  <div style={{ textAlign: 'center', padding: '0 8px' }}>
    <p style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</p>
    <p style={{ fontSize: 14, fontWeight: 800, color: green ? COLORS.greenDark : COLORS.navy }}>{value}</p>
  </div>
);

const NurseBottomNav: React.FC<{ active: string }> = ({ active }) => {
  const tabs = [
    { id: 'map', icon: '🗺️', label: 'Commandes' },
    { id: 'money', icon: '💰', label: 'Argent' },
    { id: 'chat', icon: '💬', label: 'Chats' },
    { id: 'profile', icon: '👤', label: 'Compte' },
  ];
  return (
    <div style={{
      height: 58, background: '#fff',
      borderTop: '1px solid rgba(0,51,102,0.07)',
      display: 'flex', alignItems: 'center',
      paddingBottom: 6, flexShrink: 0,
    }}>
      {tabs.map(({ id, icon, label }) => (
        <div key={id} style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 2,
          paddingTop: 6,
        }}>
          <span style={{ fontSize: 17 }}>{icon}</span>
          <span style={{
            fontSize: 8, fontWeight: id === active ? 700 : 400,
            color: id === active ? COLORS.greenDark : '#94a3b8',
          }}>{label}</span>
          {id === active && (
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: COLORS.greenDark }} />
          )}
        </div>
      ))}
    </div>
  );
};

/* ─────────────────── Incoming Request Screen ─────────────────── */
const IncomingRequestScreen: React.FC = () => (
  <div style={{
    height: '100%',
    background: '#f7f9fa',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }}>
    {/* Header */}
    <div style={{
      background: COLORS.navy,
      padding: '14px 16px 16px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          Nouvelle demande
        </h3>
        <div style={{
          background: '#fef3c7', borderRadius: 100,
          padding: '4px 10px',
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#92400e' }}>URGENT</span>
        </div>
      </div>
    </div>

    <div style={{ flex: 1, overflow: 'hidden', padding: '14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Distance + time */}
      <div style={{
        background: '#fff', borderRadius: 16,
        padding: '14px', border: '1px solid rgba(0,51,102,0.08)',
        boxShadow: '0 2px 12px rgba(0,51,102,0.07)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', align: 'center', gap: 8 }}>
            <div style={{
              background: 'rgba(0,51,102,0.07)',
              borderRadius: 10, padding: '6px 12px',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 14 }}>📍</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 800, color: COLORS.navy }}>1,8 KM</p>
                <p style={{ fontSize: 10, color: '#64748b' }}>~10 min</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: '#94a3b8' }}>Rémunération</p>
            <p style={{ fontSize: 18, fontWeight: 900, color: COLORS.greenDark }}>40 $</p>
          </div>
        </div>

        {/* Address */}
        <div style={{
          background: '#f8f9fb', borderRadius: 10,
          padding: '8px 10px', marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 12, opacity: 0.6 }}>🏠</span>
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Rue Saint-Denis 45, Montréal</span>
        </div>

        {/* Service tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {['Médication IM/SC', 'Grippe', 'Prise en charge'].map((s) => (
            <span key={s} style={{
              fontSize: 10, background: 'rgba(0,51,102,0.09)',
              color: COLORS.navy, padding: '4px 10px',
              borderRadius: 100, fontWeight: 700,
              border: '1px solid rgba(0,51,102,0.12)',
            }}>{s}</span>
          ))}
        </div>

        {/* Patient info */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#f8f9fb', borderRadius: 12,
          padding: '10px 12px',
          border: '1px solid rgba(0,0,0,0.04)',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg, #e8f0f8, #d4e4f4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
            border: '2px solid rgba(0,51,102,0.1)',
          }}>👤</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: COLORS.text }}>Laurent</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <span style={{ fontSize: 11, color: '#f59e0b' }}>★</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.text }}>4.93</span>
              <span style={{ fontSize: 10, color: '#94a3b8' }}>· 23 commandes</span>
            </div>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,51,102,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}>💬</div>
        </div>
      </div>

      {/* Note spéciale */}
      <div style={{
        background: '#fff7ed', borderRadius: 12,
        padding: '10px 12px',
        border: '1px solid #fed7aa',
      }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#9a3412', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
          Note du patient
        </p>
        <p style={{ fontSize: 11, color: '#7c2d12', lineHeight: 1.4 }}>
          "Allergie à la pénicilline — voir ordonnance jointe"
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
        <div style={{
          flex: 1, padding: '13px 0', borderRadius: 14,
          background: '#f1f5f9',
          textAlign: 'center', color: '#64748b',
          fontSize: 13, fontWeight: 700,
          border: '1px solid rgba(0,51,102,0.1)',
        }}>
          Refuser
        </div>
        <div style={{
          flex: 2,
          background: COLORS.navy, borderRadius: 14,
          padding: '13px', textAlign: 'center',
          color: '#fff', fontSize: 14, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          boxShadow: `0 6px 20px rgba(0,51,102,0.35)`,
        }}>
          <span>✓</span> Accepter
        </div>
      </div>
    </div>
  </div>
);
