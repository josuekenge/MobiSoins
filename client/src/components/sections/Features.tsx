import { Map, BadgeCheck, Clock, FileText, Star, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const Features = () => {
  const features = [
    {
      icon: <Map className="h-8 w-8 text-navy-800" />,
      title: 'Géolocalisation en Temps Réel',
      description: 'Suivez l\'arrivée de votre infirmière sur la carte comme vous le feriez pour un taxi. Notifications en temps réel.',
      stat: 'Temps d\'attente moyen: 22 minutes',
      large: false,
    },
    {
      icon: <Lock className="h-8 w-8 text-navy-800" />,
      title: 'Paiement 100% Sécurisé',
      description: 'Paiements intégrés et sécurisés via Stripe. Pas d\'échange d\'argent liquide. Support Apple Pay et Google Pay.',
      stat: '100% encrypted end-to-end',
      large: false,
    },
    {
      icon: <BadgeCheck className="h-8 w-8 text-navy-800" />,
      title: 'Infirmières Vérifiées',
      description: 'Tous nos professionnels sont vérifiés et membres de l\'OIIQ ou de l\'OIIAQ. Assurance RC incluse.',
      stat: 'Licence OIIQ vérifiée • Assurance RC',
      large: true,
    },
    {
      icon: <Clock className="h-8 w-8 text-navy-800" />,
      title: 'Disponibilité 24/7',
      description: 'Accédez à des soins de santé quand vous en avez besoin, jour et nuit. Service d\'urgence disponible.',
      stat: 'Weekends inclus • Service d\'urgence',
      large: false,
    },
    {
      icon: <FileText className="h-8 w-8 text-navy-800" />,
      title: 'Rapports Détaillés',
      description: 'Recevez un rapport détaillé après chaque consultation pour votre dossier médical. Partage avec médecin.',
      stat: 'Historique médical • Partage sécurisé',
      large: false,
    },
    {
      icon: <Star className="h-8 w-8 text-navy-800" />,
      title: 'Système d\'Évaluation',
      description: 'Système de notation transparent pour assurer la meilleure qualité de soins. Avis vérifiés uniquement.',
      stat: 'Note moyenne: 4.9/5 • 10,000+ avis',
      large: false,
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy-900 mb-4">
            Fonctionnalités Clés
          </h2>
          <p className="text-gray-600 text-lg">
            Une plateforme complète conçue pour la tranquillité d'esprit des patients et des soignants.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={clsx(
                "bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-navy-300 transform hover:-translate-y-1",
                feature.large && "md:col-span-2 lg:col-span-1"
              )}
            >
              <div className="w-16 h-16 bg-navy-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-navy-700">{feature.stat}</p>
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 mt-4 hover:gap-3 transition-all group">
                En savoir plus <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
