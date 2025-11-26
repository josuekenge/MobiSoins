import React from 'react';
import { motion } from 'framer-motion';
import { Download, UserPlus, Shield, Clock, CreditCard } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background Blob */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm font-medium text-primary">Maintenant disponible au Québec</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-primary leading-tight mb-6">
            Soins Infirmiers Professionnels <span className="text-accent">à Domicile</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Connectez-vous avec des infirmières certifiées en quelques minutes. Service disponible 24/7 à travers le Québec pour vous et vos proches.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Download className="mr-2 h-5 w-5" />
              Télécharger l'App
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Devenir Infirmière
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-secondary" />
              Infirmières Certifiées
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              Service 24/7
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-secondary" />
              Paiement Sécurisé
            </div>
          </div>
        </motion.div>

        {/* Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white">
            {/* Placeholder for Hero Image */}
            <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
               <img 
                 src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                 alt="Nurse caring for patient" 
                 className="object-cover w-full h-full"
               />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block animate-slide-up">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-primary">Vérifié</p>
                  <p className="text-xs text-gray-500">Permis valide</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

