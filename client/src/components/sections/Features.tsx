'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-32" style={{ background: '#f7f9fa' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}
          >
            {t('features.title')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-light" style={{ color: '#5a5a6a' }}>
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-8 min-h-[800px]">

          {/* Card 1 - Large (AI Matching) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel md:col-span-2 p-10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex bg-slate-100 w-12 h-12 border border-slate-200 rounded-full shadow-inner items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-700">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="text-3xl font-semibold tracking-tight mb-3" style={{ color: '#1a1a24' }}>
                {t('features.aiMatching.title')}
              </h3>
              <p className="text-lg font-light" style={{ color: '#5a5a6a' }}>
                {t('features.aiMatching.description')}
              </p>
            </div>
            <div className="mt-10 flex flex-col md:flex-row gap-6 h-auto md:h-44">
              <div className="flex-1 bg-white/60 border border-white/80 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-sm min-h-[160px]">
                <div className="flex justify-between items-center w-full mb-4 relative z-10">
                  <div className="text-xs font-medium text-slate-500 tracking-wider uppercase">Demandes actives</div>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                </div>
                <div className="flex items-end gap-1.5 h-full pt-4 relative z-10">
                  {[30, 50, 80, 100, 60, 40, 45, 20].map((h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-t-sm relative ${i === 3 ? 'bg-slate-600/50' : 'bg-slate-300/60'}`}
                      style={{ height: `${h}%` }}
                    >
                      {i === 3 && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/3 bg-white/60 border border-white/80 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
                <div className="text-xs font-medium text-slate-500 tracking-wider uppercase mb-1">Correspondances IA</div>
                {[1, 2].map((_, i) => (
                  <div key={i} className={`flex items-center gap-3 ${i === 1 ? 'opacity-60' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-700 text-sm">
                      &#128105;&#8205;&#9877;&#65039;
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-1.5 w-full bg-slate-300 rounded-full" />
                      <div className="h-1.5 w-2/3 bg-slate-200 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Small (Real-Time Tracking) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex bg-slate-100 w-12 h-12 border border-slate-200 rounded-full shadow-inner items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-700">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight mb-3" style={{ color: '#1a1a24' }}>
                {t('features.tracking.title')}
              </h3>
              <p className="font-light" style={{ color: '#5a5a6a' }}>
                {t('features.tracking.description')}
              </p>
            </div>
            <div
              className="flex w-full h-44 mt-10 relative items-end justify-center"
              style={{
                maskImage: 'linear-gradient(180deg, transparent, black 40%)',
                WebkitMaskImage: 'linear-gradient(180deg, transparent, black 40%)',
              }}
            >
              <div className="transform group-hover:-translate-y-4 transition-transform duration-500 bg-slate-50/50 w-[85%] h-24 border border-slate-300/30 rounded-xl absolute bottom-16 shadow-sm" />
              <div className="transform group-hover:-translate-y-2 transition-transform duration-500 bg-slate-50/80 w-[92%] h-24 border border-slate-200/50 rounded-xl absolute bottom-8 shadow-md" />
              <div className="absolute w-full bottom-0 h-24 bg-white/80 border border-white/80 rounded-xl flex items-center px-4 gap-3">
                <div className="flex bg-slate-50 w-10 h-10 border border-slate-200 rounded-xl shadow-inner items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="h-2.5 bg-slate-300/80 w-1/2 rounded-full" />
                  <div className="h-2 w-1/3 bg-slate-200/80 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Small (Auto Scheduling) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex bg-slate-100 w-12 h-12 border border-slate-200 rounded-full shadow-inner items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-700">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight mb-3" style={{ color: '#1a1a24' }}>
                {t('features.scheduling.title')}
              </h3>
              <p className="font-light" style={{ color: '#5a5a6a' }}>
                {t('features.scheduling.description')}
              </p>
            </div>
            <div className="mt-10 space-y-3">
              <div className="flex items-center justify-between bg-white/70 border border-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="h-2.5 w-24 bg-slate-700 rounded-full" />
                </div>
                <div className="w-11 h-6 bg-slate-700 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow border border-slate-200" />
                </div>
              </div>
              <div className="flex items-center justify-between bg-white/40 border border-white/60 p-4 rounded-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                  </div>
                  <div className="h-2 w-28 bg-slate-400 rounded-full" />
                </div>
                <div className="w-11 h-6 bg-slate-200 rounded-full relative border border-slate-300">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm border border-slate-100" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4 - Large (24/7 Monitoring) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel md:col-span-2 p-10 flex flex-col gap-6 group"
          >
            <div>
              <div className="flex bg-slate-100 w-12 h-12 border border-slate-200 rounded-full shadow-inner items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-700">
                  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight mb-2" style={{ color: '#1a1a24' }}>
                {t('features.monitoring.title')}
              </h3>
              <p className="max-w-lg font-light" style={{ color: '#5a5a6a' }}>
                {t('features.monitoring.description')}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-5 h-auto md:h-48 mt-4">
              <div className="flex-[2] bg-white/60 border border-white/80 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-sm min-h-[160px]">
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 15,30 L 40,60 L 65,35 L 85,75" stroke="#cbd5e1" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                  <path d="M 40,60 L 55,85" stroke="#cbd5e1" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                </svg>
                {[
                  { top: '30%', left: '15%', size: '14px' },
                  { top: '60%', left: '40%', size: '20px', active: true },
                  { top: '35%', left: '65%', size: '12px' },
                  { top: '75%', left: '85%', size: '14px' },
                  { top: '85%', left: '55%', size: '10px' },
                ].map((n, i) => (
                  <div
                    key={i}
                    className={`absolute rounded-full border border-white ${n.active ? 'bg-white border-2 border-slate-200 flex items-center justify-center' : 'bg-slate-300'}`}
                    style={{
                      top: n.top,
                      left: n.left,
                      width: n.size,
                      height: n.size,
                      boxShadow: `0 0 ${n.active ? 20 : 10}px rgba(148,163,184,0.4)`,
                    }}
                  >
                    {n.active && (
                      <>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-ping absolute" />
                        <div className="w-2 h-2 bg-slate-500 rounded-full" />
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex-[1] flex flex-col gap-4">
                <div className="bg-white/60 border border-white/80 rounded-xl p-5 flex-1 flex flex-col justify-center shadow-sm">
                  <div className="text-xs font-medium text-slate-500 tracking-wider uppercase mb-1">Satisfaction</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-semibold text-slate-800">4.9</span>
                    <span className="text-sm font-medium text-slate-500">/5 &#11088;</span>
                  </div>
                  <div className="mt-3 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 w-[98%] rounded-full" />
                  </div>
                </div>
                <div className="bg-white/60 border border-white/80 rounded-xl p-5 flex-1 flex flex-col justify-center shadow-sm">
                  <div className="text-xs font-medium text-slate-500 tracking-wider uppercase mb-1">Soins complétés</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-semibold text-slate-800">10K+</span>
                  </div>
                  <div className="mt-3 flex gap-1">
                    {[70, 85, 60, 90, 75, 95, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-slate-300/60 rounded-sm" style={{ height: `${h * 0.3}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
