import React, { useState } from 'react';
import { MapPin, Calendar, Heart, UserCheck, ClipboardCheck, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

export const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'patient' | 'nurse'>('patient');

  const patientSteps = [
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: 'Réservez',
      description: 'Choisissez votre service et l\'heure qui vous convient le mieux.',
    },
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: 'Suivez',
      description: 'Voyez votre infirmière en temps réel sur la carte arrivant chez vous.',
    },
    {
      icon: <Heart className="h-8 w-8 text-white" />,
      title: 'Recevez des Soins',
      description: 'Profitez de soins professionnels dans le confort de votre domicile.',
    },
  ];

  const nurseSteps = [
    {
      icon: <UserCheck className="h-8 w-8 text-white" />,
      title: 'Inscrivez-vous',
      description: 'Créez votre profil professionnel et faites vérifier vos certifications.',
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-white" />,
      title: 'Acceptez',
      description: 'Recevez des demandes de soins près de chez vous et acceptez celles qui vous conviennent.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      title: 'Soignez',
      description: 'Fournissez des soins de qualité et augmentez vos revenus à votre rythme.',
    },
  ];

  const steps = activeTab === 'patient' ? patientSteps : nurseSteps;

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Comment ça marche?</h2>
          <p className="text-gray-600 text-lg mb-8">
            MobiSoins simplifie l'accès aux soins de santé à domicile.
          </p>
          
          <div className="inline-flex p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => setActiveTab('patient')}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all",
                activeTab === 'patient' ? "bg-white text-primary shadow-md" : "text-gray-500 hover:text-primary"
              )}
            >
              Pour les Patients
            </button>
            <button
              onClick={() => setActiveTab('nurse')}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all",
                activeTab === 'nurse' ? "bg-white text-primary shadow-md" : "text-gray-500 hover:text-primary"
              )}
            >
              Pour les Infirmières
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-primary rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center mb-6 shadow-lg">
                <div className="-rotate-3 group-hover:-rotate-6 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>
              <div className="absolute top-10 left-1/2 w-full h-1 bg-gray-100 -z-10 hidden md:block last:hidden" style={{ left: '50%' }} />
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

