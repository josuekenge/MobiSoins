import { useState } from 'react';
import { MapPin, Calendar, Heart, UserCheck, ClipboardCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'patient' | 'nurse'>('patient');

  const patientSteps = [
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: 'Réservez en 2 Minutes',
      description: 'Choisissez votre service, l\'heure qui vous convient, et confirmez votre adresse. Notre algorithme trouve l\'infirmière disponible la plus proche.',
      number: '1',
    },
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: 'Suivi en Temps Réel',
      description: 'Comme Uber, voyez votre infirmière se déplacer vers vous sur la carte en temps réel. Recevez des notifications à chaque étape.',
      number: '2',
    },
    {
      icon: <Heart className="h-8 w-8 text-white" />,
      title: 'Soins Professionnels',
      description: 'Profitez de soins de qualité hospitalière dans le confort de votre maison. Rapport de visite inclus après chaque session.',
      number: '3',
    },
  ];

  const nurseSteps = [
    {
      icon: <UserCheck className="h-8 w-8 text-white" />,
      title: 'Inscrivez-vous',
      description: 'Créez votre profil professionnel et faites vérifier vos certifications. Processus simple et rapide.',
      number: '1',
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-white" />,
      title: 'Acceptez',
      description: 'Recevez des demandes de soins près de chez vous et acceptez celles qui vous conviennent. Contrôlez votre horaire.',
      number: '2',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      title: 'Soignez',
      description: 'Fournissez des soins de qualité et augmentez vos revenus à votre rythme. Paiement hebdomadaire garanti.',
      number: '3',
    },
  ];

  const steps = activeTab === 'patient' ? patientSteps : nurseSteps;

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy-900 mb-4">
            Comment ça marche?
          </h2>
          <p className="text-gray-600 text-lg">
            MobiSoins simplifie l'accès aux soins de santé à domicile en quelques étapes simples.
          </p>
          
          <div className="inline-flex p-1 bg-gray-200 rounded-full mt-8">
            <button
              onClick={() => setActiveTab('patient')}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                activeTab === 'patient' 
                  ? "bg-white text-navy-900 shadow-md scale-105" 
                  : "text-gray-500 hover:text-navy-900"
              )}
            >
              Pour les Patients
            </button>
            <button
              onClick={() => setActiveTab('nurse')}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                activeTab === 'nurse' 
                  ? "bg-white text-navy-900 shadow-md scale-105" 
                  : "text-gray-500 hover:text-navy-900"
              )}
            >
              Pour les Infirmières
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Number Badge - Navy blue */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-sm z-10">
                {step.number}
              </div>

              {/* Card */}
              <div className="w-full bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-navy-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 pt-12">
                {/* Icon - Navy background */}
                <div className="w-20 h-20 rounded-2xl bg-navy-800 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold text-navy-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow Connector (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 -translate-y-1/2 z-0">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
