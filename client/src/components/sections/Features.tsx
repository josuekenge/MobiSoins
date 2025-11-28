import { Map, Shield, BadgeCheck, Clock, Search, Calendar, Home, User, History, Stethoscope, Syringe, Pill, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const MinimalBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Abstract clean shapes */}
    <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3" />
    
    {/* Grid pattern dots */}
    <div className="absolute inset-0 opacity-[0.03]" 
         style={{ 
           backgroundImage: 'radial-gradient(#28417A 1px, transparent 1px)', 
           backgroundSize: '32px 32px' 
         }}>
    </div>

    {/* Floating elements */}
    <motion.div 
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 5, 0]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-20 right-[10%] w-32 h-32 border border-blue-100 rounded-full opacity-20"
    />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[5%] w-24 h-24 border border-blue-100 rounded-2xl opacity-20"
        />
  </div>
);

export const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Map,
      title: t('features.geolocation'),
      description: t('features.geolocationDescription'),
      delay: 0.1
    },
    {
      icon: Shield,
      title: t('features.secure'),
      description: t('features.secureDescription'),
      delay: 0.2
    },
    {
      icon: BadgeCheck,
      title: t('features.certified'),
      description: t('features.certifiedDescription'),
      delay: 0.3
    },
    {
      icon: Clock,
      title: t('features.available'),
      description: t('features.availableDescription'),
      delay: 0.4
    }
  ];

  return (
    <section id="features" className="py-32 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <MinimalBackground />
      
      <div className="container mx-auto px-6 relative z-10">
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
                {t('features.mainTitle')} <br/>
                <span className="text-blue-600">{t('features.mainTitleHighlight')}</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-md">
                {t('features.mainSubtitle')}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay }}
                  className="group"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Visuals */}
          <div className="w-full lg:w-1/2 relative h-[600px] flex items-center justify-center">
            
            {/* Phone 1: Home Screen (Back/Left) - SWAPPED */}
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute right-0 top-0 w-[280px] h-[560px] bg-gray-900 rounded-[2.5rem] border-8 border-gray-900 shadow-2xl z-10 transform translate-x-12 translate-y-[-20px] opacity-90 overflow-hidden"
            >
              {/* UI: Home Screen */}
              <div className="w-full h-full bg-gray-50 flex flex-col relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-30"></div>
                
                {/* Header */}
                <div className="bg-white pb-4 pt-12 px-6 rounded-b-3xl shadow-sm z-10">
                   <div className="flex justify-center mb-4">
                     <img src="/mobisoins-logo.jpeg" alt="Logo" className="h-6 w-auto" loading="lazy" />
                   </div>
                   
                   {/* Search Bar */}
                   <div className="bg-gray-100 rounded-full p-3 flex items-center gap-2 mb-2">
                      <Search className="w-5 h-5 text-gray-400" />
                      <span className="text-xs text-gray-400 flex-1">Commander...</span>
                      <div className="bg-white px-2 py-1 rounded-full text-[10px] flex items-center gap-1 shadow-sm">
                        <Calendar className="w-3 h-3 text-blue-500" /> Plus tard
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
                      <div className="bg-white p-3 rounded-2xl shadow-sm h-24 flex flex-col justify-between group hover:shadow-md transition-all border border-gray-50">
                         <div className="self-end w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <Stethoscope className="w-4 h-4" />
                         </div>
                         <span className="text-xs font-medium text-gray-700">Soins infirmiers</span>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm h-24 flex flex-col justify-between group hover:shadow-md transition-all border border-gray-50">
                         <div className="self-end w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                            <Syringe className="w-4 h-4" />
                         </div>
                         <span className="text-xs font-medium text-gray-700">Vaccination</span>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm h-24 flex flex-col justify-between group hover:shadow-md transition-all border border-gray-50">
                         <div className="self-end w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                            <Pill className="w-4 h-4" />
                         </div>
                         <span className="text-[10px] font-medium leading-tight text-gray-700">Suivi maladies</span>
                      </div>
                      <div className="bg-white p-3 rounded-2xl shadow-sm h-24 flex flex-col justify-between group hover:shadow-md transition-all border border-gray-50">
                         <div className="self-end w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                            <ClipboardList className="w-4 h-4" />
                         </div>
                         <span className="text-xs font-medium text-gray-700">Bilan santé</span>
                      </div>
                   </div>

                   {/* Banner */}
                   <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-4 relative overflow-hidden h-32 text-white shadow-lg">
                      <div className="relative z-10">
                        <h4 className="font-bold text-sm mb-2">Besoin d'aide?</h4>
                        <p className="text-[10px] opacity-90 mb-3 max-w-[120px] leading-tight">
                            Nos infirmières sont prêtes à intervenir.
                        </p>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] inline-block border border-white/30">
                          Réserver maintenant
                        </div>
                      </div>
                      <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 translate-y-8 blur-xl"></div>
                      <div className="absolute right-4 top-4 text-4xl opacity-20">🏥</div>
                   </div>
                </div>

                {/* Bottom Nav */}
                <div className="bg-white border-t border-gray-100 h-16 flex justify-around items-center px-6 pb-2">
                   <div className="flex flex-col items-center gap-1 text-blue-600">
                      <Home className="w-5 h-5" />
                      <span className="text-[10px] font-medium">Accueil</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Search className="w-5 h-5" />
                      <span className="text-[10px] font-medium">Explorer</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <History className="w-5 h-5" />
                      <span className="text-[10px] font-medium">Activités</span>
                   </div>
                   <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <User className="w-5 h-5" />
                      <span className="text-[10px] font-medium">Profil</span>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Phone 2: Splash Screen (Front/Right) - SWAPPED */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative z-20 w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl right-10 md:right-20 overflow-hidden"
            >
              {/* UI: Splash Screen with Logo */}
              <div className="w-full h-full bg-white flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative z-10 p-8 flex flex-col items-center"
                >
                  <img 
                    src="/mobisoins-logo.jpeg" 
                    alt="MobiSoins Logo" 
                    className="w-64 h-auto object-contain mix-blend-multiply"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
