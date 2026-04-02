'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

/* ─── Booking flow notifications ──────────────────────────────── */

const bookingFlow = [
  {
    icon: '📋',
    bg: '#4e6645',
    name: 'Réservation confirmée',
    description: "Infirmière disponible ce soir à 18h30",
    time: "À l'instant",
  },
  {
    icon: '🚗',
    bg: '#1a1a24',
    name: 'Infirmière en route',
    description: 'Sarah B. · 8 min de chez vous',
    time: '2 min',
  },
  {
    icon: '🏠',
    bg: '#4e6645',
    name: 'Infirmière arrivée',
    description: 'Sarah B. est à votre porte',
    time: '10 min',
  },
  {
    icon: '✅',
    bg: '#1a1a24',
    name: 'Soin complété',
    description: "Rapport clinique disponible dans l'app",
    time: '45 min',
  },
];

function AnimatedNotificationList() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (visibleCount === 0) {
      timer = setTimeout(() => setVisibleCount(1), 600);
    } else if (visibleCount < bookingFlow.length) {
      timer = setTimeout(() => setVisibleCount((v) => v + 1), 1300);
    } else {
      timer = setTimeout(() => setVisibleCount(0), 2800);
    }
    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <div className="flex flex-col gap-2.5 p-4 min-h-[240px]">
      <AnimatePresence>
        {bookingFlow.slice(0, visibleCount).map((item) => (
          <motion.figure
            key={item.name}
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: "easeOut" as const }}
            className="flex items-center gap-3 bg-white rounded-2xl p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-black/[0.06]"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0"
              style={{ background: item.bg }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold truncate" style={{ color: '#1a1a24' }}>
                  {item.name}
                </p>
                <span className="text-[11px] shrink-0" style={{ color: '#94a3b8' }}>
                  {item.time}
                </span>
              </div>
              <p className="text-xs font-light truncate" style={{ color: '#5a5a6a' }}>
                {item.description}
              </p>
            </div>
          </motion.figure>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Steps ────────────────────────────────────────────────────── */

const steps = [
  {
    num: 'ÉTAPE 01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    titleKey: 'howItWorks.step1.title',
    descKey: 'howItWorks.step1.description',
  },
  {
    num: 'ÉTAPE 02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    titleKey: 'howItWorks.step2.title',
    descKey: 'howItWorks.step2.description',
  },
  {
    num: 'ÉTAPE 03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    titleKey: 'howItWorks.step3.title',
    descKey: 'howItWorks.step3.description',
  },
];

/* ─── Section ──────────────────────────────────────────────────── */

export const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-20" style={{ background: 'rgba(255,255,255,0.82)' }}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: title + horizontal roadmap */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="mb-12"
            >
              <h2
                className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
                style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}
              >
                {t('howItWorks.title')}
              </h2>
              <p className="text-base font-light max-w-sm" style={{ color: '#5a5a6a' }}>
                {t('howItWorks.subtitle')}
              </p>
            </motion.div>

            {/* Horizontal steps */}
            <div className="relative">
              {/* Connector line behind icons */}
              <div
                className="absolute top-8 left-8 right-0 h-px hidden sm:block"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.08) 60%, transparent)' }}
              />

              <div className="grid grid-cols-3 gap-6">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" as const }}
                    className="flex flex-col"
                  >
                    {/* Icon */}
                    <div
                      className="relative z-10 w-16 h-16 rounded-2xl bg-white border flex items-center justify-center mb-5 shadow-sm"
                      style={{ borderColor: 'rgba(0,0,0,0.1)', color: '#4e6645' }}
                    >
                      {step.icon}
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#94a3b8' }}>
                      {step.num}
                    </p>
                    <h3 className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: '#1a1a24' }}>
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-xs font-light leading-relaxed" style={{ color: '#5a5a6a' }}>
                      {t(step.descKey)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: phone mockup with animated list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm">
              <div
                className="rounded-[2rem] overflow-hidden border shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                style={{ borderColor: 'rgba(0,0,0,0.09)' }}
              >
                {/* App header */}
                <div
                  className="px-5 py-4 flex items-center justify-between"
                  style={{ background: '#1a1a24' }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse block" />
                      <span className="text-white text-xs font-semibold">MobiSoins</span>
                    </div>
                    <p className="text-[11px]" style={{ color: '#94a3b8' }}>
                      Notifications en direct
                    </p>
                  </div>
                  <span className="text-2xl">🏥</span>
                </div>

                {/* Notification feed */}
                <div style={{ background: '#f8fafc' }}>
                  <AnimatedNotificationList />
                </div>

                {/* Bottom bar */}
                <div
                  className="px-5 py-3 flex items-center justify-between border-t"
                  style={{ background: '#fff', borderColor: 'rgba(0,0,0,0.07)' }}
                >
                  <span className="text-xs font-medium" style={{ color: '#5a5a6a' }}>
                    Mise à jour en temps réel
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: '#4e664520', color: '#4e6645' }}>
                    EN DIRECT
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
