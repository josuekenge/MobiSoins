'use client';

import { motion } from 'framer-motion';
import { GpsMap } from '../ui/gps-map';
import { useLanguage } from '../../contexts/LanguageContext';

export function NursingMapSection() {
  const { t } = useLanguage();

  const bullets = [
    t('map.bullet1'),
    t('map.bullet2'),
    t('map.bullet3'),
  ];

  return (
    <section
      id="platform"
      className="py-24"
      style={{ background: 'rgba(255,255,255,0.82)' }}
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3">
              {t('map.badge')}
            </p>

            <h2
              className="text-4xl font-semibold tracking-tight mb-5"
              style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}
            >
              {t('map.title')}
            </h2>

            <p
              className="text-base font-light leading-relaxed mb-8 max-w-md"
              style={{ color: '#5a5a6a' }}
            >
              {t('map.description')}
            </p>

            <ul className="flex flex-col gap-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  {/* Green dot */}
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-green-600 flex-shrink-0" />
                  <span className="text-base font-light" style={{ color: '#5a5a6a' }}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right: map card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Edge-to-edge map card — no padding */}
            <div className="rounded-2xl border border-black/12 shadow-lg bg-white overflow-hidden p-0 relative">

              {/* Floating legend — top-left overlay */}
              <div
                className="absolute top-3 left-3 z-10 rounded-lg p-2 shadow text-xs flex flex-col gap-1.5"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                }}
              >
                {/* Infirmière en route */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-0.5 rounded-full flex-shrink-0"
                    style={{ background: '#4285f4', opacity: 0.8 }}
                  />
                  <span className="text-slate-600">Infirmière en route</span>
                </div>
                {/* Patient */}
                <div className="flex items-center gap-2">
                  <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true" className="flex-shrink-0">
                    <circle cx="5" cy="4" r="4" fill="#4e6645" />
                    <polygon points="5,12 2,7 8,7" fill="#4e6645" />
                  </svg>
                  <span className="text-slate-600">Patient</span>
                </div>
                {/* MobiSoins hub */}
                <div className="flex items-center gap-2">
                  <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true" className="flex-shrink-0">
                    <circle cx="5" cy="4" r="4" fill="#003366" />
                    <polygon points="5,12 2,7 8,7" fill="#003366" />
                  </svg>
                  <span className="text-slate-600">MobiSoins</span>
                </div>
              </div>

              <GpsMap className="w-full h-72 md:h-96" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
