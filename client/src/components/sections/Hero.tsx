import { motion } from 'framer-motion';
import { Star, Clock, MapPin, CheckCircle, Activity, Download, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative bg-white min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f0a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Header Content */}
      <div className="container mx-auto px-6 text-center z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 text-navy-800 rounded-full text-sm font-semibold mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Disponible au Québec
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-7xl font-bold text-navy-900 tracking-tight mb-6"
        >
          Soins Infirmiers <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-navy-800 to-blue-600">
            Directement à Domicile
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Connectez-vous avec des infirmières qualifiées en quelques minutes.
          Service professionnel, sécurisé et disponible 24/7.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Télécharger l'App
          </button>
          <button 
             onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-8 py-4 bg-white border-2 border-navy-100 text-navy-800 font-bold rounded-2xl hover:border-navy-300 hover:shadow-lg transition-all flex items-center gap-2"
          >
            Devenir Partenaire
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Central Visual & Floating Cards */}
      <div className="relative w-full max-w-6xl mx-auto px-4 h-[600px] flex items-center justify-center">
        
        {/* CARD 1: Top Left - Stats */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute left-4 top-0 md:left-20 md:top-20 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 w-48 z-20 hidden md:block"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-2xl mb-4 mx-auto">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-navy-900">10K+</div>
            <div className="text-sm text-gray-500 font-medium">Patients Traités</div>
          </div>
        </motion.div>

        {/* CARD 2: Bottom Left - Patient Profile */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute left-0 bottom-10 md:left-10 md:bottom-20 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 w-64 z-20 hidden md:block"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
              JD
            </div>
            <div>
              <div className="font-bold text-navy-900">Bonjour, Jean</div>
              <div className="text-xs text-gray-500">Patient depuis 2024</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-100 rounded-full w-full"></div>
            <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-navy-600 bg-navy-50 p-2 rounded-lg">
            <MapPin className="w-3 h-3" />
            <span>Montréal, QC</span>
          </div>
        </motion.div>

        {/* CENTRAL PHONE MOCKUP */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10 w-[300px] h-[600px] bg-navy-900 rounded-[3rem] border-8 border-navy-900 shadow-2xl overflow-hidden"
        >
          {/* Phone Screen Content */}
          <div className="w-full h-full bg-white relative overflow-hidden flex flex-col">
            {/* Status Bar */}
            <div className="h-8 bg-white flex items-center justify-between px-6 pt-2">
               <span className="text-xs font-bold text-navy-900">9:41</span>
               <div className="flex gap-1">
                 <div className="w-4 h-2.5 bg-navy-900 rounded-[1px]"></div>
                 <div className="w-0.5 h-2.5 bg-navy-900 rounded-[1px]"></div>
               </div>
            </div>

            {/* App Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
               {/* Background decoration */}
               <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-navy-50 to-white rounded-b-[3rem]"></div>

               {/* Logo Area */}
               <div className="relative z-10 mb-8">
                 <img src="/mobisoins-logo.jpeg" alt="Logo" className="w-24 h-24 object-contain drop-shadow-xl rounded-2xl" />
               </div>

               <h3 className="text-2xl font-bold text-navy-900 mb-2 relative z-10">MobiSoins</h3>
               <p className="text-center text-gray-500 text-sm mb-8 relative z-10">
                 Votre santé, chez vous.<br/>Simple. Rapide. Sécurisé.
               </p>

               {/* Action Button Simulation */}
               <div className="w-full bg-navy-800 text-white py-4 rounded-xl flex items-center justify-center font-bold shadow-lg mb-3">
                 Réserver un Soin
               </div>
               <div className="w-full bg-white border-2 border-gray-100 text-navy-900 py-4 rounded-xl flex items-center justify-center font-bold">
                 Connexion
               </div>
            </div>

            {/* Bottom Indicator */}
            <div className="h-8 flex justify-center items-end pb-2">
              <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: Top Right - Nurse Arrival */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute right-4 top-10 md:right-20 md:top-32 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 w-56 z-20 hidden md:block"
        >
          <div className="text-sm font-bold text-navy-900 mb-3">Soins à venir</div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-lg">👩‍⚕️</div>
            <div>
              <div className="text-xs font-bold text-navy-900">Inf. Sarah</div>
              <div className="text-[10px] text-green-600 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 14:00 - 15:00
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 4: Bottom Right - Highlights */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="absolute right-0 bottom-20 md:right-10 md:bottom-40 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 w-64 z-20 hidden md:block"
        >
          <div className="text-sm font-bold text-navy-900 mb-4">MobiSoins Highlights</div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Satisfaction Client</span>
              <span className="font-bold text-navy-900 flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> 4.9/5
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Infirmières Dispo</span>
              <span className="font-bold text-green-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> 500+
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Couverture</span>
              <span className="font-bold text-navy-900">Québec</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
