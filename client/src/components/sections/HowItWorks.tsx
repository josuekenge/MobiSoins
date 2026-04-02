'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const phases = [
  {
    phase: 'ÉTAPE 01',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    titleKey: 'howItWorks.step1.title',
    descKey: 'howItWorks.step1.description',
    side: 'left',
  },
  {
    phase: 'ÉTAPE 02',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    titleKey: 'howItWorks.step2.title',
    descKey: 'howItWorks.step2.description',
    side: 'right',
  },
  {
    phase: 'ÉTAPE 03',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    titleKey: 'howItWorks.step3.title',
    descKey: 'howItWorks.step3.description',
    side: 'left',
  },
];

export const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-32" style={{ background: '#f7f9fa' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            PROCESSUS
          </div>
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}
          >
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-light" style={{ color: '#5a5a6a' }}>
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-20">
            {phases.map((phase, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-8 ${phase.side === 'right' ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: phase.side === 'left' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-5/12 bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
                >
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{phase.phase}</p>
                  <h3 className="text-2xl font-semibold tracking-tight mb-4" style={{ color: '#1a1a24' }}>
                    {t(phase.titleKey)}
                  </h3>
                  <p className="font-light leading-relaxed" style={{ color: '#5a5a6a' }}>
                    {t(phase.descKey)}
                  </p>
                </motion.div>

                {/* Center icon */}
                <div className="hidden md:flex w-2/12 items-center justify-center relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-500">
                    {phase.icon}
                  </div>
                </div>

                {/* Empty side */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
