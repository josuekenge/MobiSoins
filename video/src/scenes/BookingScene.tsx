import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { COLORS } from '../MobiSoinsPromo';
import { PhoneFrame } from '../components/PhoneFrame';

export const BookingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneIn = spring({ frame, fps, config: { damping: 18, stiffness: 95 }, durationInFrames: 42 });
  const sceneOut = interpolate(frame, [158, 180], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const leftX = interpolate(sceneIn, [0, 1], [-220, 0]);
  const rightX = interpolate(sceneIn, [0, 1], [220, 0]);
  const textOpacity = interpolate(frame, [12, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Back phone (booking/calendar) fades in at frame 65
  const backPhoneOpacity = interpolate(frame, [65, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.slate,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 110,
        opacity: sceneOut,
        overflow: 'hidden',
      }}
    >
      {/* Rich background */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: 700, height: 700,
        background: `radial-gradient(circle, rgba(0,51,102,0.06) 0%, transparent 65%)`,
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-8%',
        width: 550, height: 550,
        background: `radial-gradient(circle, rgba(152,182,144,0.09) 0%, transparent 65%)`,
        borderRadius: '50%',
      }} />
      {/* Subtle dot grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035 }}>
        <defs>
          <pattern id="dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1.5" fill="#003366"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Left: Copy */}
      <div style={{ transform: `translateX(${leftX}px)`, opacity: textOpacity, maxWidth: 520, flexShrink: 0 }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(0,51,102,0.09)', borderRadius: 100,
          padding: '8px 20px', marginBottom: 28,
          border: '1px solid rgba(0,51,102,0.12)',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 8px ${COLORS.green}` }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Pour les patients
          </span>
        </div>

        <h2 style={{
          fontSize: 66, fontWeight: 900, color: COLORS.text,
          lineHeight: 1.02, letterSpacing: '-0.04em', marginBottom: 20,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          Réservez une<br />
          <span style={{ color: COLORS.navy }}>infirmière</span><br />
          <span style={{ color: COLORS.navy }}>en minutes</span>
        </h2>

        <p style={{ fontSize: 21, color: COLORS.muted, lineHeight: 1.65, fontWeight: 400, marginBottom: 36 }}>
          Parcourez les profils vérifiés OIIQ, choisissez votre créneau horaire, payez en toute sécurité via Stripe.
        </p>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            { n: '1', label: 'Cherchez une infirmière vérifiée OIIQ', icon: '🔍' },
            { n: '2', label: 'Sélectionnez la date, l\'heure et le service', icon: '📅' },
            { n: '3', label: 'Paiement sécurisé via Stripe', icon: '💳' },
          ].map(({ n, label, icon }) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 14,
                background: COLORS.navy, color: COLORS.white,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
                boxShadow: `0 4px 16px rgba(0,51,102,0.25)`,
              }}>
                {icon}
              </div>
              <span style={{ fontSize: 18, color: COLORS.text, fontWeight: 500, lineHeight: 1.3 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {['OIIQ Certifié', 'Paiement Stripe', 'Chat sécurisé', 'GPS temps réel'].map((badge) => (
            <div key={badge} style={{
              padding: '7px 16px', borderRadius: 100,
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(0,51,102,0.12)',
              fontSize: 13, fontWeight: 600, color: COLORS.navy,
              boxShadow: '0 2px 8px rgba(0,51,102,0.07)',
            }}>{badge}</div>
          ))}
        </div>
      </div>

      {/* Right: TWO phones stacked */}
      <div style={{
        transform: `translateX(${rightX}px)`,
        position: 'relative',
        width: 380,
        height: 760,
        flexShrink: 0,
      }}>
        {/* Back phone: booking/calendar screen */}
        <div style={{
          position: 'absolute', right: -70, top: 50,
          opacity: backPhoneOpacity,
          transform: `rotate(5.5deg) scale(0.87)`,
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 24px 48px rgba(0,51,102,0.14))',
        }}>
          <PhoneFrame scale={0.96}>
            <BookingScreen />
          </PhoneFrame>
        </div>

        {/* Front phone: patient home screen */}
        <div style={{
          position: 'absolute', left: -30, top: 0,
          transform: `rotate(-2.5deg)`,
          filter: 'drop-shadow(0 32px 64px rgba(0,51,102,0.18))',
        }}>
          <PhoneFrame scale={1.0}>
            <HomeScreen />
          </PhoneFrame>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────────────── Patient Home Screen ─────────────────── */
const HomeScreen: React.FC = () => (
  <div style={{
    height: '100%',
    background: '#f7f9fa',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }}>
    {/* Top header strip */}
    <div style={{
      background: COLORS.navy,
      padding: '14px 16px 20px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Bonjour 👋</p>
          <h3 style={{ fontSize: 19, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>Marie Tremblay</h3>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: COLORS.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, border: '2px solid rgba(255,255,255,0.3)',
        }}>
          👩
        </div>
      </div>

      {/* Search bar */}
      <div style={{
        background: 'rgba(255,255,255,0.14)',
        borderRadius: 12,
        padding: '10px 14px',
        border: '1px solid rgba(255,255,255,0.18)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 14, opacity: 0.7 }}>🔍</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>Cathéters, Vaccination...</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <FilterChip label="Immédiat" active />
          <FilterChip label="Plus tard" />
        </div>
      </div>
    </div>

    {/* Scrollable content */}
    <div style={{
      flex: 1, overflow: 'hidden',
      padding: '12px 14px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {/* Section header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: COLORS.text, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Infirmières proches
        </p>
        <span style={{ fontSize: 11, color: COLORS.navy, fontWeight: 600 }}>Voir tout ›</span>
      </div>

      {/* Nurse cards */}
      {[
        { name: 'John Yong', role: 'Aide soignant', exp: '10 ans', rating: 4.8, reviews: 112, dist: '2,1 km', emoji: '👨‍⚕️', expColor: '#003366' },
        { name: 'Cassandra D.', role: 'Infirmière OIIQ', exp: '7 ans', rating: 4.9, reviews: 87, dist: '2,3 km', emoji: '👩‍⚕️', expColor: '#7da074' },
        { name: 'Eric Mitch', role: 'Sage-femme', exp: '5 ans', rating: 4.7, reviews: 64, dist: '3,0 km', emoji: '👨‍⚕️', expColor: '#004080' },
        { name: 'Dilan New', role: 'Aide soignant', exp: '3 ans', rating: 4.5, reviews: 39, dist: '3,4 km', emoji: '👩‍⚕️', expColor: '#003366' },
      ].map((n) => (
        <NurseCard key={n.name} {...n} />
      ))}
    </div>

    {/* Bottom nav tabs */}
    <BottomNav active="home" />
  </div>
);

const FilterChip: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div style={{
    padding: '4px 10px', borderRadius: 100,
    background: active ? COLORS.green : 'rgba(255,255,255,0.15)',
    color: '#ffffff',
    fontSize: 10, fontWeight: 700,
    border: active ? 'none' : '1px solid rgba(255,255,255,0.2)',
  }}>
    {label}
  </div>
);

const NurseCard: React.FC<{
  name: string; role: string; exp: string; rating: number; reviews: number;
  dist: string; emoji: string; expColor: string;
}> = ({ name, role, exp, rating, reviews, dist, emoji, expColor }) => (
  <div style={{
    background: '#ffffff',
    borderRadius: 16,
    padding: '10px 12px',
    border: '1px solid rgba(0,51,102,0.08)',
    display: 'flex', alignItems: 'center', gap: 10,
    boxShadow: '0 2px 12px rgba(0,51,102,0.06)',
    flexShrink: 0,
  }}>
    {/* Avatar */}
    <div style={{
      width: 48, height: 48, borderRadius: 14,
      background: 'linear-gradient(135deg, #e8f0f8 0%, #dce8f4 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 24, flexShrink: 0,
      border: '1.5px solid rgba(0,51,102,0.1)',
    }}>
      {emoji}
    </div>

    {/* Info */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: COLORS.text, letterSpacing: '-0.01em' }}>{name}</p>
        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500 }}>{dist}</span>
      </div>
      <p style={{ fontSize: 11, color: '#64748b', fontWeight: 500, marginTop: 1 }}>{role}</p>
      <div style={{ display: 'flex', gap: 6, marginTop: 5, alignItems: 'center' }}>
        <span style={{
          fontSize: 9, background: expColor, color: '#fff',
          padding: '2px 8px', borderRadius: 100, fontWeight: 700,
          letterSpacing: '0.04em',
        }}>
          {exp} exp.
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <StarRow rating={rating} size={9} />
          <span style={{ fontSize: 9, color: '#64748b', marginLeft: 3 }}>({reviews})</span>
        </div>
      </div>
    </div>

    {/* Arrow */}
    <div style={{
      width: 28, height: 28, borderRadius: 8,
      background: 'rgba(0,51,102,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, color: COLORS.navy, fontWeight: 700,
      flexShrink: 0,
    }}>›</div>
  </div>
);

const StarRow: React.FC<{ rating: number; size: number }> = ({ rating, size }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{ display: 'flex', gap: 1 }}>
      {stars.map((s) => (
        <span key={s} style={{
          fontSize: size,
          color: s <= Math.floor(rating) ? '#f59e0b' : s - 0.5 <= rating ? '#f59e0b' : '#d1d5db',
        }}>★</span>
      ))}
      <span style={{ fontSize: size, color: '#64748b', marginLeft: 2, fontWeight: 600 }}>{rating}</span>
    </div>
  );
};

const BottomNav: React.FC<{ active: string }> = ({ active }) => {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Accueil' },
    { id: 'search', icon: '🔍', label: 'Recherche' },
    { id: 'orders', icon: '📋', label: 'Commandes' },
    { id: 'chat', icon: '💬', label: 'Messages' },
    { id: 'profile', icon: '👤', label: 'Compte' },
  ];
  return (
    <div style={{
      height: 58, background: '#fff',
      borderTop: '1px solid rgba(0,51,102,0.08)',
      display: 'flex', alignItems: 'center',
      paddingBottom: 8, flexShrink: 0,
    }}>
      {tabs.map(({ id, icon, label }) => (
        <div key={id} style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 2,
          paddingTop: 6,
        }}>
          <span style={{ fontSize: 16 }}>{icon}</span>
          <span style={{
            fontSize: 8, fontWeight: id === active ? 700 : 400,
            color: id === active ? COLORS.navy : '#94a3b8',
          }}>{label}</span>
          {id === active && (
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: COLORS.navy, marginTop: 1 }} />
          )}
        </div>
      ))}
    </div>
  );
};

/* ─────────────────── Booking / Calendar Screen ─────────────────── */
const BookingScreen: React.FC = () => (
  <div style={{
    height: '100%',
    background: '#f7f9fa',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }}>
    {/* Header */}
    <div style={{
      background: '#fff',
      padding: '14px 16px 12px',
      borderBottom: '1px solid rgba(0,51,102,0.07)',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 10,
          background: 'rgba(0,51,102,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: COLORS.navy,
        }}>‹</div>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: COLORS.text, letterSpacing: '-0.02em' }}>Réservation</h3>
      </div>

      {/* Selected nurse summary card */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'rgba(0,51,102,0.04)',
        borderRadius: 14, padding: '10px 12px',
        border: '1px solid rgba(0,51,102,0.1)',
      }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: 'linear-gradient(135deg, #e8f0f8, #d4e4f4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0,
        }}>👨‍⚕️</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: COLORS.text }}>Dilan New</p>
          <p style={{ fontSize: 10, color: '#64748b', marginTop: 1 }}>Aide soignant · 10 ans d'exp.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <StarRow rating={4.8} size={9} />
            <span style={{ fontSize: 9, color: '#64748b' }}>· 2,1 km</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>À partir de</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: COLORS.navy }}>40 $</p>
        </div>
      </div>
    </div>

    {/* Body */}
    <div style={{ flex: 1, overflow: 'hidden', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Service selection */}
      <div>
        <p style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          Service sélectionné
        </p>
        <div style={{
          background: '#fff', borderRadius: 12, padding: '8px 12px',
          border: '1.5px solid rgba(0,51,102,0.15)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.green, flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>Médication IM/SC</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: COLORS.navy }}>40 $</span>
        </div>
      </div>

      {/* Month label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Octobre 2025
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ fontSize: 14, color: '#94a3b8' }}>‹</span>
          <span style={{ fontSize: 14, color: COLORS.navy, fontWeight: 700 }}>›</span>
        </div>
      </div>

      {/* Calendar strip */}
      <div style={{ display: 'flex', gap: 5 }}>
        {[
          { day: 'Sam', date: 4 },
          { day: 'Dim', date: 5 },
          { day: 'Lun', date: 6 },
          { day: 'Mar', date: 7, active: true },
          { day: 'Mer', date: 8 },
          { day: 'Jeu', date: 9 },
        ].map(({ day, date, active }) => (
          <div key={date} style={{
            flex: 1, borderRadius: 12, padding: '8px 3px',
            background: active ? COLORS.navy : '#fff',
            color: active ? '#fff' : '#64748b',
            textAlign: 'center',
            border: active ? 'none' : '1px solid rgba(0,51,102,0.1)',
            boxShadow: active ? `0 4px 14px rgba(0,51,102,0.3)` : 'none',
          }}>
            <p style={{ fontSize: 9, fontWeight: 600, marginBottom: 3, opacity: active ? 0.8 : 0.7 }}>{day}</p>
            <p style={{ fontSize: 14, fontWeight: 800 }}>{date}</p>
          </div>
        ))}
      </div>

      {/* Time slots */}
      <p style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Heure du rendez-vous
      </p>
      <div style={{ display: 'flex', gap: 7 }}>
        {[
          { time: '10:00', active: false },
          { time: '11:00', active: false },
          { time: '13:00', active: true },
          { time: '14:30', active: false },
        ].map(({ time, active }) => (
          <div key={time} style={{
            flex: 1, padding: '9px 0', borderRadius: 12, textAlign: 'center',
            background: active ? COLORS.green : '#fff',
            color: active ? '#fff' : '#64748b',
            fontSize: 12, fontWeight: 700,
            border: active ? 'none' : '1px solid rgba(0,51,102,0.1)',
            boxShadow: active ? `0 4px 14px rgba(125,160,116,0.35)` : 'none',
          }}>{time}</div>
        ))}
      </div>

      {/* Price summary */}
      <div style={{
        background: '#fff', borderRadius: 14,
        padding: '10px 12px',
        border: '1px solid rgba(0,51,102,0.08)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: '#64748b' }}>Médication IM/SC</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>40,00 $</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: '#64748b' }}>Frais de déplacement</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>5,00 $</span>
        </div>
        <div style={{ height: 1, background: 'rgba(0,51,102,0.08)', marginBottom: 6 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: COLORS.text }}>Total</span>
          <span style={{ fontSize: 14, fontWeight: 900, color: COLORS.navy }}>45,00 $</span>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div style={{ padding: '10px 14px 16px', flexShrink: 0 }}>
      <div style={{
        background: COLORS.navy,
        borderRadius: 16, padding: '14px',
        textAlign: 'center', color: '#fff',
        fontSize: 14, fontWeight: 800,
        boxShadow: `0 6px 20px rgba(0,51,102,0.35)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <span>💳</span> Réserver · 45,00 $
      </div>
    </div>
  </div>
);
