import { motion } from 'framer-motion';
import { Star, Clock, MapPin, CheckCircle, Activity, Download, ArrowRight, User, Mail, Search, ChevronDown } from 'lucide-react';

export const Hero = () => {
  const partners = [
    { name: "OIIQ", url: "https://placehold.co/160x60/ffffff/28417A?text=OIIQ&font=montserrat" },
    { name: "Santé Québec", url: "https://placehold.co/180x60/ffffff/28417A?text=Sant%C3%A9+Qu%C3%A9bec&font=roboto" },
    { name: "Croix Bleue", url: "https://placehold.co/160x60/ffffff/28417A?text=Croix+Bleue&font=playfair" },
    { name: "Desjardins", url: "https://placehold.co/160x60/ffffff/28417A?text=Desjardins&font=lato" },
    { name: "Sun Life", url: "https://placehold.co/140x60/ffffff/28417A?text=Sun+Life&font=oswald" },
    { name: "Manuvie", url: "https://placehold.co/150x60/ffffff/28417A?text=Manuvie&font=merriweather" },
    { name: "SSQ Assurance", url: "https://placehold.co/180x60/ffffff/28417A?text=SSQ+Assurance&font=raleway" },
    { name: "La Capitale", url: "https://placehold.co/160x60/ffffff/28417A?text=La+Capitale&font=pt-sans" },
    { name: "Pharmaprix", url: "https://placehold.co/160x60/ffffff/28417A?text=Pharmaprix&font=open-sans" },
    { name: "OIIQ", url: "https://placehold.co/160x60/ffffff/28417A?text=OIIQ&font=montserrat" },
    { name: "Santé Québec", url: "https://placehold.co/180x60/ffffff/28417A?text=Sant%C3%A9+Qu%C3%A9bec&font=roboto" },
    { name: "Croix Bleue", url: "https://placehold.co/160x60/ffffff/28417A?text=Croix+Bleue&font=playfair" },
  ];

  return (
    <section className="relative bg-white min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-100/40 rounded-full blur-[120px] opacity-60"></div>
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f0a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Header Content */}
      <div className="container mx-auto px-6 text-center z-10 mb-12">
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
          <span className="text-blue-600">
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
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
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
      <div className="relative w-full max-w-6xl mx-auto px-4 h-[600px] flex items-center justify-center mb-12">
        
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
               <div className="flex gap-1 items-center">
                 <div className="w-4 h-2.5 bg-navy-900 rounded-[1px]"></div>
                 <div className="w-0.5 h-2.5 bg-navy-900 rounded-[1px]"></div>
               </div>
            </div>

            {/* App Content - Signup Screen */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
               {/* Profile Icon */}
               <div className="flex justify-end pt-3 pr-6">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                     <User className="w-4 h-4 text-gray-400" />
                  </div>
               </div>

               {/* Main Content */}
               <div className="flex-1 px-6 py-4 flex flex-col justify-between">
                  <div>
                     {/* Logo */}
                     <div className="flex justify-center mb-6">
                        <img src="/mobisoins-logo.jpeg" alt="MobiSoins Logo" className="h-12 w-auto object-contain mix-blend-multiply" />
                     </div>

                     {/* Headline */}
                     <h2 className="text-xl font-bold text-navy-900 text-center mb-6">
                        C'est parti avec MobiSoins
                     </h2>

                     {/* Phone Number Input */}
                     <div className="mb-4">
                        <label className="text-xs font-medium text-gray-600 mb-2 block">Numéro de téléphone</label>
                        <div className="bg-white border-2 border-gray-200 rounded-xl p-3 flex items-center gap-2">
                           <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center text-white text-[8px] font-bold">ID</div>
                           <span className="text-sm font-medium text-navy-900">+62</span>
                           <ChevronDown className="w-3 h-3 text-gray-400" />
                           <div className="flex-1 h-4 border-l border-gray-200 ml-2 pl-2">
                              <span className="text-xs text-gray-400">(201) 555-0123</span>
                           </div>
                        </div>
                     </div>

                     {/* Continue Button */}
                     <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-sm mb-4 shadow-lg">
                        Continuer
                     </button>

                     {/* Separator */}
                     <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-400">OU</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                     </div>

                     {/* Social Login Buttons */}
                     <div className="space-y-2.5 mb-4">
                        <button className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-navy-900">
                           <div className="w-4 h-4 bg-navy-900 rounded flex items-center justify-center">
                              <span className="text-white text-[8px] font-bold">🍎</span>
                           </div>
                           Continuer avec Apple
                        </button>
                        <button className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-navy-900">
                           <div className="w-4 h-4 bg-white rounded border border-gray-200 flex items-center justify-center">
                              <span className="text-[8px] font-bold text-blue-600">G</span>
                           </div>
                           Continuer avec Google
                        </button>
                        <button className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-navy-900">
                           <Mail className="w-3 h-3 text-gray-500" />
                           Continuer avec une adresse e-mail
                        </button>
                     </div>
                  </div>

                  <div className="space-y-3">
                     {/* Account Recovery */}
                     <button className="w-full flex items-center justify-center gap-2 text-xs text-blue-600 font-medium">
                        <Search className="w-3 h-3" />
                        Retrouver votre compte
                     </button>

                     {/* Legal Disclaimer */}
                     <p className="text-[8px] text-gray-400 leading-tight text-center px-2 pb-2">
                        En continuant, vous acceptez de recevoir des appels, des messages WhatsApp ou SMS/RCS, y compris par numéroteur automatique, de la part de Mobisoins.
                     </p>
                  </div>
               </div>
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

      {/* Partners Marquee (Integrated) */}
      <div className="w-full relative flex overflow-hidden group opacity-70 mt-8">
        {/* Gradient Masks for smooth fade effect at edges */}
        <div className="absolute top-0 left-0 z-10 w-24 h-full bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute top-0 right-0 z-10 w-24 h-full bg-gradient-to-l from-white to-transparent"></div>

        <div className="flex space-x-16 animate-marquee whitespace-nowrap items-center">
          {partners.map((partner, index) => (
            <img
              key={index}
              src={partner.url}
              alt={partner.name}
              className="h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-300"
            />
          ))}
        </div>
        
        <div className="absolute top-0 flex space-x-16 animate-marquee2 whitespace-nowrap items-center">
           {partners.map((partner, index) => (
            <img
              key={`dup-${index}`}
              src={partner.url}
              alt={partner.name}
              className="h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-300"
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
        }
      `}</style>
    </section>
  );
};
