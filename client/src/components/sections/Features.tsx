import { Map, Shield, BadgeCheck, Clock, Search, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT COLUMN: Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                Une solution complète qui <br/>
                <span className="text-blue-600">simplifie vos soins.</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-md">
                Profitez d'une technologie de pointe conçue pour vous offrir la meilleure expérience de soins à domicile.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-10">
              {/* Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  <Map className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Géolocalisation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Suivez l'arrivée de votre infirmière en temps réel sur la carte, comme pour un taxi.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">100% Sécurisé</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Vos données de santé sont chiffrées et protégées selon les normes les plus strictes.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Certifié OIIQ</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Toutes nos infirmières sont vérifiées et membres en règle de l'ordre professionnel.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">Disponible 24/7</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Des soins accessibles jour et nuit, fin de semaine incluse, pour votre tranquillité d'esprit.
                </p>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visuals */}
          <div className="w-full lg:w-1/2 relative h-[600px] flex items-center justify-center">
            
            {/* Phone 1: Nurse Profile (Back/Left) */}
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute right-0 top-0 w-[280px] h-[560px] bg-gray-900 rounded-[2.5rem] border-8 border-gray-900 shadow-2xl z-10 transform translate-x-12 translate-y-[-20px] opacity-90 overflow-hidden"
            >
              {/* UI: Nurse Profile */}
              <div className="w-full h-full bg-gray-50 relative">
                {/* Header/Photo Area */}
                <div className="h-32 bg-gray-200 relative">
                   <img 
                     src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="Nurse" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                     <span className="text-black text-lg">×</span>
                   </div>
                </div>
                
                {/* Profile Card Overlay */}
                <div className="absolute top-24 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg">
                   <h3 className="text-xl font-bold text-navy-900">Dilan New</h3>
                   <p className="text-gray-500 text-sm mb-2">Aide soignant</p>
                   <div className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-600 mb-2">
                     10 Years Exp.
                   </div>
                   <div className="flex items-center gap-4 text-xs text-gray-500">
                     <span className="flex items-center gap-1 text-orange-400">★ 4.5 (99+)</span>
                     <span className="flex items-center gap-1">📍 2km</span>
                   </div>
                </div>

                {/* Content Below */}
                <div className="mt-32 px-4">
                   <div className="flex bg-white rounded-xl p-1 mb-4">
                      <div className="flex-1 text-center py-2 bg-white font-bold text-sm border-b-2 border-navy-900">Détails</div>
                      <div className="flex-1 text-center py-2 text-gray-400 text-sm">Avis(99+)</div>
                   </div>
                   
                   <h4 className="font-bold text-sm mb-2">Service</h4>
                   <div className="flex gap-2 overflow-hidden">
                      <span className="bg-white px-3 py-1 rounded-full text-xs border">Vaccination</span>
                      <span className="bg-white px-3 py-1 rounded-full text-xs border">Soins infirmiers</span>
                   </div>

                   <h4 className="font-bold text-sm mt-4 mb-2">Positions actuel</h4>
                   <div className="h-24 bg-blue-50 rounded-xl border border-blue-100 relative overflow-hidden">
                      {/* Map Pattern */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:8px_8px]"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-sm">
                        📍 Direction
                      </div>
                   </div>
                </div>

                {/* Bottom Button */}
                <div className="absolute bottom-4 left-4 right-4">
                   <div className="bg-blue-600 text-white text-center py-3 rounded-xl font-bold text-sm shadow-lg">
                     Commandez maintenant
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Phone 2: Home Screen (Front/Right) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative z-20 w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl right-10 md:right-20 overflow-hidden"
            >
              {/* UI: Home Screen */}
              <div className="w-full h-full bg-gray-50 flex flex-col relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-30"></div>
                
                {/* Header */}
                <div className="bg-white pb-4 pt-12 px-6 rounded-b-3xl shadow-sm z-10">
                   <div className="flex justify-center mb-4">
                     <img src="/mobisoins-logo.jpeg" alt="Logo" className="h-6 w-auto" />
                   </div>
                   
                   {/* Search Bar */}
                   <div className="bg-gray-100 rounded-full p-3 flex items-center gap-2 mb-2">
                      <Search className="w-5 h-5 text-gray-400" />
                      <span className="text-xs text-gray-400 flex-1">Commander...</span>
                      <div className="bg-white px-2 py-1 rounded-full text-[10px] flex items-center gap-1 shadow-sm">
                        <Calendar className="w-3 h-3 text-green-500" /> Plus tard
                      </div>
                   </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-hidden p-6">
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-navy-900">Suggestions</h3>
                      <span className="text-xs text-blue-600">Tout afficher</span>
                   </div>

                   {/* Suggestions Grid */}
                   <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white p-3 rounded-2xl shadow-sm h-24 flex flex-col justify-between">
                         <div className="self-end text-xl">💉</div>
                         <span className="text-xs font-medium">Soins infirmiers</span>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm h-24 flex flex-col justify-between">
                         <div className="self-end text-xl">👩‍⚕️</div>
                         <span className="text-xs font-medium">Vaccination</span>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm h-24 flex flex-col justify-between">
                         <div className="self-end text-xl">💊</div>
                         <span className="text-[10px] font-medium leading-tight">Suivi maladies</span>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm h-24 flex flex-col justify-between">
                         <div className="self-end text-xl">📋</div>
                         <span className="text-xs font-medium">Bilan santé</span>
                      </div>
                   </div>

                   {/* Banner */}
                   <div className="bg-blue-100 rounded-2xl p-4 relative overflow-hidden h-32">
                      <div className="relative z-10">
                        <h4 className="font-bold text-sm text-navy-900 mb-2">Besoin d'un(e) infirmier?</h4>
                        <div className="bg-white px-3 py-1 rounded-full text-[10px] text-blue-600 inline-block shadow-sm">
                          Soignez vous avec MobiSoins
                        </div>
                      </div>
                      <div className="absolute right-0 bottom-0 w-24 h-24 bg-blue-200 rounded-full translate-x-8 translate-y-8 opacity-50"></div>
                   </div>
                </div>

                {/* Bottom Nav */}
                <div className="bg-white border-t border-gray-100 h-16 flex justify-around items-center px-6">
                   <div className="flex flex-col items-center gap-1 text-blue-600">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px]">🏠</div>
                      <span className="text-[10px]">Accueil</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-gray-400">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-md"></div>
                      <span className="text-[10px]">Services</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-gray-400">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-md"></div>
                      <span className="text-[10px]">Historique</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-gray-400">
                      <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                      <span className="text-[10px]">Compte</span>
                   </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
