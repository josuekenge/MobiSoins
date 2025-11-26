import { motion } from 'framer-motion';
import { Activity, Filter, Layout } from 'lucide-react';

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-blue-600 font-semibold mb-4">Nos Avantages</div>
          <h2 className="text-4xl lg:text-6xl font-bold text-navy-900">
            Votre santé mérite <br className="hidden md:block" />
            ces <span className="bg-blue-600 text-white px-4 py-1 rounded-full transform -rotate-2 inline-block shadow-lg text-3xl lg:text-5xl align-middle mx-2">services</span> complets
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Service 1: Monitoring */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            {/* Visual Mockup */}
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 mb-8 h-64 shadow-sm group-hover:shadow-xl transition-all relative overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-navy-900">Suivi Santé</div>
                <div className="w-1 h-4 bg-gray-200 rounded-full"></div>
              </div>
              
              {/* Mock Charts */}
              <div className="space-y-4 flex-1">
                 <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-100 rounded text-purple-500 flex items-center justify-center text-[10px]">📅</div>
                    <div className="h-2 bg-gray-100 w-20 rounded-full"></div>
                 </div>
                 <div className="h-2 bg-blue-500 w-3/4 rounded-full"></div>
                 <div className="h-2 bg-green-400 w-1/2 rounded-full"></div>
                 
                 <div className="mt-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-xs font-bold text-navy-900 mb-1">Prochain RDV</div>
                    <div className="text-[10px] text-gray-500">Demain, 14:00 avec Sarah</div>
                 </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4">
              <div className="flex items-center gap-2 mb-3 text-purple-600 font-bold">
                <Layout className="w-5 h-5" />
                <span>Tableau de Bord</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Suivi Personnalisé</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Un aperçu complet de vos rendez-vous passés et futurs, avec un accès direct à votre historique de soins.
              </p>
            </div>
          </motion.div>

          {/* Service 2: Filters/Matching */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            {/* Visual Mockup */}
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 mb-8 h-64 shadow-sm group-hover:shadow-xl transition-all relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-6 left-6 font-bold text-navy-900">Filtres Intelligents</div>
              
              {/* Mock Circles */}
              <div className="relative w-full flex justify-center gap-4 items-center mt-6">
                <div className="w-16 h-16 rounded-full border-2 border-purple-100 flex items-center justify-center relative">
                   <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">📍</div>
                </div>
                <div className="h-[1px] w-12 bg-purple-200"></div>
                <div className="w-16 h-16 rounded-full border-2 border-blue-100 flex items-center justify-center relative">
                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">💉</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4">
              <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                <Filter className="w-5 h-5" />
                <span>Matching Précis</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Trouvez l'Expert Idéal</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Notre algorithme vous connecte avec l'infirmière la plus qualifiée et la plus proche pour vos besoins spécifiques.
              </p>
            </div>
          </motion.div>

          {/* Service 3: Data/Analytics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            {/* Visual Mockup */}
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 mb-8 h-64 shadow-sm group-hover:shadow-xl transition-all relative overflow-hidden flex flex-col">
               <div className="flex justify-between items-center mb-6">
                <div className="font-bold text-navy-900">Rapports & Analyses</div>
                <div className="w-1 h-4 bg-gray-200 rounded-full"></div>
              </div>

              {/* Mock Stats Bars */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-bold w-12">Pression</span>
                   <div className="h-2 bg-blue-500 rounded-full flex-1"></div>
                   <span className="text-[10px] font-bold">120/80</span>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-bold w-12">Glycémie</span>
                   <div className="h-2 bg-purple-500 rounded-full w-3/4"></div>
                   <span className="text-[10px] font-bold">5.4</span>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-bold w-12">Poids</span>
                   <div className="h-2 bg-green-500 rounded-full w-1/2"></div>
                   <span className="text-[10px] font-bold">70kg</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4">
              <div className="flex items-center gap-2 mb-3 text-green-600 font-bold">
                <Activity className="w-5 h-5" />
                <span>Données Médicales</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Suivi Clinique</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Accédez à des graphiques détaillés de votre santé et partagez facilement vos rapports avec votre médecin.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
