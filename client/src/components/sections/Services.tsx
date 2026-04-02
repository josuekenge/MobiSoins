'use client';

import { motion } from 'framer-motion';
import { Activity, Filter, Layout } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-32 relative overflow-hidden" style={{ background: '#f7f9fa' }}>
      <div className="container-custom relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            {t('services.badge')}
          </div>
          <h2
            className="text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}
          >
            {t('services.mainTitle')} {t('services.mainTitlePrefix')}{' '}
            <span className="text-slate-600">{t('services.mainTitleHighlight')}</span>{' '}
            {t('services.mainTitleSuffix')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Service 1: Monitoring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 group flex flex-col"
          >
            {/* Visual Mockup */}
            <div className="bg-white/60 border border-white/80 rounded-2xl p-5 mb-8 h-56 shadow-sm flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-4 left-5 font-semibold text-slate-700 text-xs uppercase tracking-widest">
                {t('services.card1Visual')}
              </div>

              <div className="w-full space-y-3 mt-4 px-1">
                <div className="flex items-center justify-between bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-xs border border-slate-100">
                      &#128197;
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-700">{t('services.card1Item1')}</div>
                      <div className="text-[9px] text-slate-400">{t('services.card1Item1Detail')}</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                </div>

                <div className="flex items-center justify-between bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-xs border border-slate-100">
                      &#128138;
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-slate-700">{t('services.card1Item2')}</div>
                      <div className="text-[9px] text-slate-400">{t('services.card1Item2Detail')}</div>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-600 font-semibold">
                <Layout className="w-4 h-4" />
                <span className="text-sm">{t('services.card1Badge')}</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3" style={{ color: '#1a1a24' }}>
                {t('services.card1Title')}
              </h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: '#5a5a6a' }}>
                {t('services.card1Description')}
              </p>
            </div>
          </motion.div>

          {/* Service 2: Filters/Matching */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-8 group flex flex-col"
          >
            {/* Visual Mockup */}
            <div className="bg-white/60 border border-white/80 rounded-2xl p-5 mb-8 h-56 shadow-sm flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute top-4 left-5 font-semibold text-slate-700 text-xs uppercase tracking-widest">
                {t('services.card2Visual')}
              </div>

              <div className="w-full max-w-[200px] space-y-3 mt-2">
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px] shadow-sm">
                    &#128205;
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full w-20" />
                </div>
                <div className="flex justify-center">
                  <div className="h-5 w-[1px] bg-slate-200" />
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs border border-slate-200">
                    &#128105;&#8205;&#9877;&#65039;
                  </div>
                  <div>
                    <div className="h-1.5 bg-slate-300 rounded-full w-24 mb-1" />
                    <div className="h-1 bg-slate-200 rounded-full w-16" />
                  </div>
                  <div className="ml-auto text-emerald-500 text-xs font-bold">&#10003;</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-600 font-semibold">
                <Filter className="w-4 h-4" />
                <span className="text-sm">{t('services.card2Badge')}</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3" style={{ color: '#1a1a24' }}>
                {t('services.card2Title')}
              </h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: '#5a5a6a' }}>
                {t('services.card2Description')}
              </p>
            </div>
          </motion.div>

          {/* Service 3: Data/Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 group flex flex-col"
          >
            {/* Visual Mockup */}
            <div className="bg-white/60 border border-white/80 rounded-2xl p-5 mb-8 h-56 shadow-sm flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-4 left-5 font-semibold text-slate-700 text-xs uppercase tracking-widest">
                {t('services.card3Visual')}
              </div>

              <div className="w-full mt-4 px-1 relative h-28 flex items-end justify-between gap-2">
                <div className="w-1/5 bg-slate-200/80 rounded-t-lg h-[40%] group-hover:h-[50%] transition-all duration-500" />
                <div className="w-1/5 bg-slate-300/80 rounded-t-lg h-[60%] group-hover:h-[70%] transition-all duration-500 delay-75" />
                <div className="w-1/5 bg-slate-300/80 rounded-t-lg h-[45%] group-hover:h-[55%] transition-all duration-500 delay-150" />
                <div className="w-1/5 bg-slate-600/70 rounded-t-lg h-[80%] group-hover:h-[90%] transition-all duration-500 delay-200 relative shadow-sm">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] px-1.5 py-0.5 rounded whitespace-nowrap">
                    Top
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full overflow-visible">
                    <path
                      d="M 10 80 Q 60 40 110 60 T 200 20"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                      className="opacity-50"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-600 font-semibold">
                <Activity className="w-4 h-4" />
                <span className="text-sm">{t('services.card3Badge')}</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3" style={{ color: '#1a1a24' }}>
                {t('services.card3Title')}
              </h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: '#5a5a6a' }}>
                {t('services.card3Description')}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
