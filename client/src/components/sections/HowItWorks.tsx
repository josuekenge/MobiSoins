import { Calendar, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: 'Réservez en 2 Minutes',
      description: 'Choisissez votre service, l\'heure qui vous convient, et confirmez votre adresse.',
    },
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      title: 'Suivi en Temps Réel',
      description: 'Voyez votre infirmière se déplacer vers vous sur la carte en temps réel.',
    },
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: 'Soins Professionnels',
      description: 'Profitez de soins de qualité hospitalière dans le confort de votre maison.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Comment ça marche?
          </h2>
          <p className="text-gray-500 text-lg">
            MobiSoins simplifie l'accès aux soins de santé à domicile.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-blue-100 to-transparent -z-10"></div>

          {steps.map((step, index) => (
            <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg shadow-blue-100/50 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform duration-300 z-10 relative">
                  {step.icon}
                </div>
                {/* Glow effect behind icon */}
                <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
              </div>
              
              <h3 className="text-xl font-bold text-navy-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
