import { ChevronRight, Syringe, Activity, FileHeart, Droplet, Stethoscope, Thermometer, Baby, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const Services = () => {
  const services = [
    {
      icon: <Syringe className="h-6 w-6" />,
      title: 'Injection & Vaccination',
      description: 'Vaccins de voyage, grippe, rappels. Administration de médicaments et injections thérapeutiques.',
      price: 'À partir de 45$',
      popular: true,
    },
    {
      icon: <Droplet className="h-6 w-6" />,
      title: 'Prise de Sang à Domicile',
      description: 'Analyses sanguines, tests réguliers. Prélèvements confortables avec transport rapide au laboratoire.',
      price: 'À partir de 65$',
      popular: true,
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: 'Soins de Plaies',
      description: 'Pansements, sutures, plaies chroniques. Changement de pansements et évaluation de cicatrisation.',
      price: 'À partir de 55$',
      popular: false,
    },
    {
      icon: <FileHeart className="h-6 w-6" />,
      title: 'Soins Post-Opératoires',
      description: 'Suivi après hospitalisation, surveillance des signes vitaux et gestion de la douleur.',
      price: 'À partir de 75$',
      popular: true,
    },
    {
      icon: <Thermometer className="h-6 w-6" />,
      title: 'Gestion du Diabète',
      description: 'Surveillance glycémie, éducation. Contrôle de la glycémie et administration d\'insuline.',
      price: 'À partir de 50$',
      popular: false,
    },
    {
      icon: <Stethoscope className="h-6 w-6" />,
      title: 'Thérapie IV',
      description: 'Hydratation, vitamines, médication. Administration de thérapies intraveineuses à domicile.',
      price: 'À partir de 95$',
      popular: false,
    },
    {
      icon: <FileHeart className="h-6 w-6" />,
      title: 'Soins Palliatifs',
      description: 'Confort, gestion douleur, support. Accompagnement et soins de confort pour les personnes en fin de vie.',
      price: 'Prix sur consultation',
      popular: false,
    },
    {
      icon: <Baby className="h-6 w-6" />,
      title: 'Soins Pédiatriques',
      description: 'Soins pour enfants, nouveau-nés. Services spécialisés pour les plus jeunes patients.',
      price: 'À partir de 60$',
      popular: false,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy-900 mb-4">Nos Services</h2>
            <p className="text-gray-600 text-lg">
              Une gamme complète de soins infirmiers dispensés par des professionnels qualifiés.
            </p>
          </div>
          <a href="#" className="text-navy-900 font-semibold hover:text-navy-700 inline-flex items-center gap-1 group">
            Voir tous les services <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={clsx(
                "group relative p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-navy-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2",
                service.popular && "ring-2 ring-navy-200"
              )}
            >
              {service.popular && (
                <div className="absolute -top-3 -right-3 bg-navy-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Populaire
                </div>
              )}
              
              <div className="w-14 h-14 bg-navy-50 rounded-xl flex items-center justify-center text-navy-800 mb-4 group-hover:bg-navy-800 group-hover:text-white transition-colors duration-300 group-hover:scale-110 group-hover:rotate-3">
                {service.icon}
              </div>
              
              <h3 className="text-lg font-bold text-navy-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-semibold text-navy-900">{service.price}</span>
                <a href="#" className="text-sm font-semibold text-navy-800 hover:gap-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Réserver <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
