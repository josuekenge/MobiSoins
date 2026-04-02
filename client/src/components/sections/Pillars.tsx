'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const pillars = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    titleKey: 'pillars.card1Title',
    descKey: 'pillars.card1Desc',
    visual: (
      <div className="mt-8 rounded-2xl bg-white/60 border border-slate-100 p-5 space-y-3">
        {['OIIQ Vérifié', 'Assurance RC', 'Données chiffrées'].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <div className="h-2 rounded-full bg-slate-200/80 flex-1" style={{ width: `${75 - i * 12}%` }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    titleKey: 'pillars.card2Title',
    descKey: 'pillars.card2Desc',
    visual: (
      <div className="mt-8 rounded-2xl bg-white/60 border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Matching</div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="space-y-2.5">
          {[92, 87, 78].map((pct, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm shrink-0">👩‍⚕️</div>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-slate-400 rounded-full"
                />
              </div>
              <span className="text-[10px] font-semibold text-slate-400 w-8">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    titleKey: 'pillars.card3Title',
    descKey: 'pillars.card3Desc',
    visual: (
      <div className="mt-8 rounded-2xl bg-white/60 border border-slate-100 p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100">
          <span className="text-xs font-medium text-slate-600">Rapport clinique</span>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Disponible</span>
        </div>
        <div className="flex items-center justify-between bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100">
          <span className="text-xs font-medium text-slate-600">Prochain soin</span>
          <span className="text-[10px] font-semibold text-blue-500">Demain 14h00</span>
        </div>
        <div className="flex items-center justify-between bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100">
          <span className="text-xs font-medium text-slate-600">Satisfaction</span>
          <span className="text-[10px] font-semibold text-slate-800">⭐ 4.9 / 5</span>
        </div>
      </div>
    ),
  },
];

export const Pillars = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32" style={{ background: '#f7f9fa' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            {t('pillars.badge')}
          </div>
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}
          >
            {t('pillars.title')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-light" style={{ color: '#5a5a6a' }}>
            {t('pillars.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 flex flex-col"
            >
              <div className="flex bg-slate-100 w-12 h-12 border border-slate-200 rounded-full shadow-inner items-center justify-center text-slate-600 mb-6">
                {pillar.icon}
              </div>
              <h3
                className="text-xl font-semibold tracking-tight mb-3"
                style={{ color: '#1a1a24' }}
              >
                {t(pillar.titleKey)}
              </h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: '#5a5a6a' }}>
                {t(pillar.descKey)}
              </p>
              {pillar.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
