import { Calendar, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Calendar className="h-8 w-8 text-navy-900" />,
      title: 'Réservez en 2 Minutes',
      description: 'Choisissez votre service, l\'heure qui vous convient, et confirmez votre adresse.',
    },
    {
      icon: <MapPin className="h-8 w-8 text-navy-900" />,
      title: 'Suivi en Temps Réel',
      description: 'Voyez votre infirmière se déplacer vers vous sur la carte en temps réel.',
    },
    {
      icon: <Heart className="h-8 w-8 text-navy-900" />,
      title: 'Soins Professionnels',
      description: 'Profitez de soins de qualité hospitalière dans le confort de votre maison.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Comment ça marche?
          </h2>
          <p className="text-gray-500">
            MobiSoins simplifie l'accès aux soins de santé à domicile.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center mb-8 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 border border-gray-50">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
