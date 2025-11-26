import React from 'react';
import { motion } from 'framer-motion';

export const TrustBar = () => {
  const partners = [
    { name: 'OIIQ', logo: '🏥' },
    { name: 'Ministère de la Santé', logo: '🇨🇦' },
    { name: 'Association Médicale', logo: '⚕️' },
    { name: 'Hôpital Général', logo: '🏨' },
  ];

  return (
    <section className="py-8 bg-gray-50 border-y border-gray-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Confiance & Partenaires
          </p>
        </motion.div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="text-4xl grayscale group-hover:grayscale-0 transition-all">
                {partner.logo}
              </div>
              <p className="text-xs text-gray-600 font-medium">{partner.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

