'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';

const testimonials = [
  {
    name: "Marie-Claire Tremblay",
    designation: "Patiente · Montréal",
    quote: "MobiSoins m'a permis d'avoir une infirmière à domicile en moins de 15 minutes. Le suivi était impeccable, et l'infirmière était certifiée OIIQ. Je recommande à toute ma famille.",
    src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Jean-François Lapointe",
    designation: "Proche aidant · Québec",
    quote: "Grâce à MobiSoins, j'ai pu organiser les soins de mon père âgé depuis mon bureau. L'application est intuitive, les notifications en temps réel sont rassurantes.",
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sarah Beaumont, inf.",
    designation: "Infirmière OIIQ · Laval",
    quote: "En tant qu'infirmière, MobiSoins m'offre la flexibilité de choisir mes horaires tout en assurant ma sécurité. Le système de matching IA est vraiment bien pensé.",
    src: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Amina Diallo",
    designation: "Patiente · Longueuil",
    quote: "Service exceptionnel. L'infirmière est arrivée en 20 minutes, professionnelle et bienveillante. Le rapport clinique numérique disponible le soir même était un vrai plus.",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export const Pillars = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16" style={{ background: 'rgba(255,255,255,0.82)' }}>
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#4e6645' }}>
            {t('pillars.badge')}
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-3"
            style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}
          >
            {t('pillars.title')}
          </h2>
          <p className="text-base font-light max-w-lg" style={{ color: '#5a5a6a' }}>
            {t('pillars.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <CircularTestimonials
            testimonials={testimonials}
            autoplay
            colors={{
              name: '#1a1a24',
              designation: '#94a3b8',
              testimony: '#5a5a6a',
              arrowBackground: '#1a1a24',
              arrowForeground: '#ffffff',
              arrowHoverBackground: '#4e6645',
            }}
            fontSizes={{
              name: '1.25rem',
              designation: '0.75rem',
              quote: '1rem',
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};
