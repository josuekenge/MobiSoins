'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const testimonials = [
  {
    stars: 5,
    badge: '5.0 RATING',
    quote: '"MobiSoins a transformé ma façon de gérer les soins de ma mère. L\'infirmière est arrivée en moins de 2 heures, qualifiée et professionnelle."',
    name: 'Marie Tremblay',
    role: 'Patiente, Montréal',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    stars: 5,
    badge: 'ENTERPRISE',
    quote: '"En tant qu\'infirmière, MobiSoins me permet de choisir mes missions et de gagner 40% de plus qu\'en milieu hospitalier. La plateforme est intuitive."',
    name: 'Sarah Beauchamp',
    role: 'Infirmière OIIQ, Québec',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    stars: 5,
    badge: 'FAST IMPACT',
    quote: '"Le matching IA est impressionnant — il a trouvé une infirmière spécialisée en soins post-opératoires disponible le soir même."',
    name: 'Pierre Gagnon',
    role: 'Aidant naturel, Laval',
    avatar: 'https://i.pravatar.cc/80?img=53',
  },
];

export const Trust = () => {
  const { t } = useLanguage();

  return (
    <section id="trust" className="py-32" style={{ background: '#f7f9fa' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            TÉMOIGNAGES
          </div>
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}
          >
            {t('trust.title')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-light" style={{ color: '#5a5a6a' }}>
            {t('trust.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/50 backdrop-blur-xl border border-white/70 rounded-[2rem] p-8 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1">
                  {Array.from({ length: item.stars }).map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" className="text-yellow-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-slate-400 tracking-widest">{item.badge}</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow font-light mb-8">{item.quote}</p>
              <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
