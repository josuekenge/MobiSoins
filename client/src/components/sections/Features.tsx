import React from 'react';
import { Map, ShieldCheck, BadgeCheck, Clock, FileText, Star } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <Map className="h-6 w-6 text-accent" />,
      title: 'Géolocalisation en Temps Réel',
      description: 'Suivez l\'arrivée de votre infirmière sur la carte comme vous le feriez pour un taxi.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-accent" />,
      title: 'Paiement Sécurisé',
      description: 'Paiements intégrés et sécurisés via Stripe. Pas d\'échange d\'argent liquide.',
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-accent" />,
      title: 'Infirmières Certifiées',
      description: 'Tous nos professionnels sont vérifiés et membres de l\'OIIQ ou de l\'OIIAQ.',
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      title: 'Disponibilité 24/7',
      description: 'Accédez à des soins de santé quand vous en avez besoin, jour et nuit.',
    },
    {
      icon: <FileText className="h-6 w-6 text-accent" />,
      title: 'Rapports de Visite',
      description: 'Recevez un rapport détaillé après chaque consultation pour votre dossier médical.',
    },
    {
      icon: <Star className="h-6 w-6 text-accent" />,
      title: 'Évaluations & Avis',
      description: 'Système de notation transparent pour assurer la meilleure qualité de soins.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Fonctionnalités Clés</h2>
          <p className="text-gray-600 text-lg">
            Une plateforme complète conçue pour la tranquillité d'esprit des patients et des soignants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

