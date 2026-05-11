'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const stats = [
  { value: '10K+', labelKey: 'stats.patients' },
  { value: '500+', labelKey: 'stats.nurses' },
  { value: '4.9★', labelKey: 'stats.satisfaction' },
  { value: '24/7', labelKey: 'stats.availability' },
  { value: '12', labelKey: 'stats.cities' },
];

export const Stats = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16" style={{ background: 'rgba(255,255,255,0.82)' }}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center gap-2"
            >
              <span
                className="text-4xl md:text-5xl font-semibold tracking-tight"
                style={{ color: '#1a1a24', letterSpacing: '-0.04em' }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                {t(stat.labelKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
