import React from 'react';
import { ChevronRight, Syringe, Activity, FileHeart, Droplet, Stethoscope, Thermometer } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: <Syringe className="h-6 w-6" />,
      title: 'Injection et Vaccination',
      description: 'Administration de médicaments, vaccins grippe/voyage, et injections thérapeutiques.',
    },
    {
      icon: <Droplet className="h-6 w-6" />,
      title: 'Prise de Sang à Domicile',
      description: 'Prélèvements sanguins confortables avec transport rapide au laboratoire.',
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: 'Soins de Plaies',
      description: 'Changement de pansements, retrait de points de suture et évaluation de cicatrisation.',
    },
    {
      icon: <FileHeart className="h-6 w-6" />,
      title: 'Soins Post-Opératoires',
      description: 'Suivi après chirurgie, surveillance des signes vitaux et gestion de la douleur.',
    },
    {
      icon: <Thermometer className="h-6 w-6" />,
      title: 'Surveillance de Diabète',
      description: 'Enseignement, contrôle de la glycémie et administration d\'insuline.',
    },
    {
      icon: <Stethoscope className="h-6 w-6" />,
      title: 'Soins Palliatifs',
      description: 'Accompagnement et soins de confort pour les personnes en fin de vie à domicile.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Nos Services</h2>
            <p className="text-gray-600 text-lg">
              Une gamme complète de soins infirmiers dispensés par des professionnels qualifiés.
            </p>
          </div>
          <a href="#" className="text-primary font-semibold hover:text-primary-light inline-flex items-center gap-1 group">
            Voir tous les services <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group p-6 border border-gray-100 rounded-2xl hover:border-primary/20 hover:bg-blue-50/30 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

