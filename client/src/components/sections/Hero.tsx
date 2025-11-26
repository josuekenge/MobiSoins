import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, ArrowRight, ChevronDown, Shield, Clock } from 'lucide-react';

const heroImages = [
  "https://images.unsplash.com/photo-1576091160550-2187d80022fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Nurse talking to patient
  "https://images.unsplash.com/photo-1584515933487-9d3005c01312?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Home care
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Nurse and senior
  "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"  // Smiling nurse
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative bg-white min-h-screen flex items-center overflow-hidden">
      {/* Animated Healthcare Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated heartbeat lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none">
          <defs>
            <pattern id="heartbeat-pattern" x="0" y="0" width="400" height="40" patternUnits="userSpaceOnUse">
              <path 
                d="M0,20 Q50,10 100,20 T200,20 T300,20 T400,20" 
                stroke="#1e3a5f" 
                strokeWidth="2" 
                fill="none"
                className="animate-pulse"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heartbeat-pattern)" />
        </svg>

        {/* Floating medical cross icons */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-navy-800/5"
              style={{
                left: `${(i * 8.33) % 100}%`,
                top: `${(i * 15) % 100}%`,
                fontSize: `${20 + (i % 3) * 10}px`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.03, 0.08, 0.03],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              ⚕
            </motion.div>
          ))}
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-green-50/10"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT COLUMN - Content */}
          <div className="space-y-8">
            {/* Small badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 border border-navy-200 rounded-full text-sm font-medium text-navy-700"
            >
              <span className="w-2 h-2 bg-navy-800 rounded-full animate-pulse"></span>
              Disponible au Québec 🇨🇦
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl lg:text-6xl font-bold text-navy-900 leading-tight"
            >
              Soins Infirmiers{' '}
              <span className="text-navy-900">Professionnels</span>{' '}
              <span className="relative">
                à Domicile
                {/* Green heartbeat underline */}
                <svg className="absolute -bottom-2 left-0 w-full h-6" viewBox="0 0 300 20" preserveAspectRatio="none">
                  <path
                    d="M0,10 L50,10 L60,5 L70,15 L80,10 L300,10"
                    stroke="#7cb342"
                    strokeWidth="3"
                    fill="none"
                    style={{
                      strokeDasharray: '1000',
                      strokeDashoffset: '1000',
                      animation: 'draw 1.5s ease-out forwards',
                    }}
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              Connectez-vous avec des infirmières qualifiées et certifiées en quelques minutes.
              Service disponible 24/7 à travers le Québec pour tous vos besoins en soins de santé.
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6 items-center pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-navy-800" />
                </div>
                <span className="text-sm font-medium text-gray-700">Infirmières Certifiées OIIQ</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-navy-800" />
                </div>
                <span className="text-sm font-medium text-gray-700">Service 24/7</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-navy-800" />
                </div>
                <span className="text-sm font-medium text-gray-700">Paiement Sécurisé</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <button
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Télécharger l'Application
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-navy-800 text-white font-semibold rounded-xl hover:bg-navy-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Devenir Infirmière Partenaire
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Social Proof Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-sm text-gray-500 flex items-center gap-2"
            >
              <span className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-navy-800"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-navy-700"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-navy-600"></div>
              </span>
              <span>
                Rejoignez <strong className="text-gray-700">2,547+</strong> Québécois déjà inscrits
              </span>
            </motion.p>
          </div>

          {/* RIGHT COLUMN - Image Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[500px] md:h-[600px] w-full"
          >
            {/* Main Image Slideshow */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode='wait'>
                <motion.img
                  key={currentImage}
                  src={heroImages[currentImage]}
                  alt="Infirmière MobiSoins avec patient"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                />
              </AnimatePresence>
              
              {/* Overlay Gradient for text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent pointer-events-none"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/4 -right-8 w-72 h-72 bg-navy-100 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -z-10 bottom-1/4 -left-8 w-64 h-64 bg-navy-50 rounded-full blur-3xl opacity-15"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};
