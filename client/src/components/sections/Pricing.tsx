'use client';

import { motion } from 'framer-motion';

const plans = [
  {
    tier: 'Particulier',
    price: '0',
    unit: '/mois',
    desc: "Pour les patients qui débutent avec les soins à domicile.",
    features: ["Jusqu'à 3 soins/mois", 'Accès aux infirmières certifiées', 'Support par courriel'],
    cta: 'Commencer gratuitement',
    ctaStyle: 'border border-slate-200 text-slate-800 bg-white/60 hover:bg-white/80',
    highlighted: false,
  },
  {
    tier: 'Professionnel',
    price: '49',
    unit: '/mois',
    desc: 'Pour les patients avec des besoins réguliers en soins à domicile.',
    features: ['Soins illimités', 'Matching IA prioritaire', 'Suivi de santé temps réel', 'Support 24/7'],
    cta: 'Essai gratuit 14 jours',
    ctaStyle: 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20',
    highlighted: true,
    badge: 'LE PLUS POPULAIRE',
  },
  {
    tier: 'Établissement',
    price: 'Sur mesure',
    unit: '',
    desc: 'Pour les cliniques, CHSLD et établissements de santé.',
    features: ['Facturation institutionnelle', 'Intégration RAMQ', 'Gestionnaire de compte dédié'],
    cta: 'Contacter les ventes',
    ctaStyle: 'border border-slate-200 text-slate-800 bg-white/60 hover:bg-white/80',
    highlighted: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-32" style={{ background: '#f7f9fa' }}>
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
            Tarification transparente
          </h2>
          <p className="text-lg max-w-xl mx-auto font-light" style={{ color: '#5a5a6a' }}>
            Commencez gratuitement. Évoluez selon vos besoins en soins.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-[2rem] p-8 flex flex-col backdrop-blur-xl ${
                plan.highlighted
                  ? 'bg-white/80 border-2 border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)]'
                  : 'bg-white/50 border border-white/70'
              }`}
            >
              {plan.badge && (
                <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 uppercase tracking-widest mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <p className="text-sm font-medium text-slate-500 mb-1">{plan.tier}</p>
                <div className="flex items-baseline gap-1">
                  {plan.price === 'Sur mesure' ? (
                    <span className="text-4xl font-semibold text-slate-800">Sur mesure</span>
                  ) : (
                    <>
                      <span className="text-5xl font-semibold text-slate-800">${plan.price}</span>
                      <span className="text-slate-400 font-medium">{plan.unit}</span>
                    </>
                  )}
                </div>
                <p className="text-sm font-light mt-3" style={{ color: '#5a5a6a' }}>
                  {plan.desc}
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-400 shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3.5 rounded-full text-sm font-medium transition-all duration-300 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
