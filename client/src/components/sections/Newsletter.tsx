'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const Newsletter = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20" style={{ background: 'rgba(255,255,255,0.82)' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2
            className="text-5xl md:text-6xl font-semibold tracking-tight mb-6"
            style={{ color: '#1a1a24', letterSpacing: '-0.04em' }}
          >
            {t('newsletter.title')}
          </h2>
          <p className="text-lg max-w-xl mx-auto font-light mb-12" style={{ color: '#5a5a6a' }}>
            {t('newsletter.subtitle')}
          </p>
          <button
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative overflow-hidden inline-flex items-center gap-2 px-10 py-5 rounded-full font-medium text-slate-800 bg-white/70 border border-white/90 backdrop-blur-md cursor-pointer transition-all duration-[400ms] hover:-translate-y-1 hover:bg-white/95 group text-lg"
            style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.5)' }}
          >
            <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-500" />
            {t('newsletter.cta')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
