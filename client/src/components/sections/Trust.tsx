import React from 'react';
import { Star } from 'lucide-react';

export const Trust = () => {
  const stats = [
    { value: '500+', label: 'Infirmières Certifiées' },
    { value: '10k+', label: 'Soins Complétés' },
    { value: '4.9/5', label: 'Évaluation Moyenne' },
    { value: '25+', label: 'Villes Couvertes' },
  ];

  const testimonials = [
    {
      quote: "Un service exceptionnel! L'infirmière est arrivée à l'heure et était très professionnelle. Je recommande fortement.",
      author: "Marie L.",
      role: "Patiente à Montréal"
    },
    {
      quote: "MobiSoins me permet de gérer mon horaire comme je le veux. C'est la liberté que je cherchais.",
      author: "Sophie B.",
      role: "Infirmière Partenaire"
    }
  ];

  return (
    <section id="trust" className="py-20 bg-primary text-white overflow-hidden">
      <div className="container-custom">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20 border-b border-white/10 pb-12">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-heading font-bold mb-2 text-secondary">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Map Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Partout au Québec</h2>
            <p className="text-gray-300 text-lg mb-8">
              Nous élargissons constamment notre réseau pour servir plus de communautés. Vérifiez si nous sommes disponibles dans votre région.
            </p>
            
            <div className="space-y-6">
               {testimonials.map((item, i) => (
                 <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/5">
                   <div className="flex gap-1 mb-3">
                     {[...Array(5)].map((_, starI) => (
                       <Star key={starI} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                     ))}
                   </div>
                   <p className="italic text-gray-200 mb-4">"{item.quote}"</p>
                   <div>
                     <p className="font-bold">{item.author}</p>
                     <p className="text-xs text-gray-400">{item.role}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Map Visual Placeholder */}
          <div className="relative h-[400px] bg-white/5 rounded-3xl border border-white/10 p-4 flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Quebec_administrative_map.svg/1200px-Quebec_administrative_map.svg.png')] bg-cover bg-center grayscale" />
             <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary/20 backdrop-blur-md mb-4 animate-pulse">
                   <div className="h-4 w-4 bg-secondary rounded-full" />
                </div>
                <p className="font-bold text-xl">Carte de Couverture</p>
                <p className="text-sm text-gray-400">Chargement de la carte...</p>
             </div>
             
             {/* Pins */}
             <div className="absolute top-1/3 left-1/3 h-3 w-3 bg-secondary rounded-full animate-ping" />
             <div className="absolute top-1/2 left-1/2 h-3 w-3 bg-secondary rounded-full animate-ping delay-300" />
             <div className="absolute bottom-1/3 right-1/3 h-3 w-3 bg-secondary rounded-full animate-ping delay-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

