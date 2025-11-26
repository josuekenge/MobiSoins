import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, TrendingUp, DollarSign, Clock, Shield, Users } from 'lucide-react';
import { Button } from '../ui/Button';

export const ForNurses = () => {
  const benefits = [
    { icon: <Clock className="h-6 w-6" />, text: 'Choisissez vos missions' },
    { icon: <DollarSign className="h-6 w-6" />, text: 'Gagnez jusqu\'à 45$/heure' },
    { icon: <TrendingUp className="h-6 w-6" />, text: 'Paiement hebdomadaire garanti' },
    { icon: <Shield className="h-6 w-6" />, text: 'Assurance RC incluse' },
    { icon: <Users className="h-6 w-6" />, text: 'Support 24/7' },
    { icon: <Check className="h-6 w-6" />, text: 'Aucun frais d\'adhésion' },
  ];

  return (
    <section id="for-nurses" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Professional nurse" 
                  className="object-cover w-full h-full opacity-90"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
              Rejoignez Notre Équipe d'Infirmières
            </h2>
            <p className="text-2xl font-semibold text-gray-700 mb-6">
              Gagnez Plus. Travaillez Moins. <br />
              Contrôlez Votre Horaire.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    {benefit.icon}
                  </div>
                  <span className="font-medium text-gray-700">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="bg-secondary/10 rounded-xl p-6 mb-8 border border-secondary/20">
              <p className="text-gray-700 font-semibold mb-2">
                📊 En moyenne, nos infirmières gagnent <span className="text-secondary text-xl">35% de plus</span>
              </p>
              <p className="text-gray-600 text-sm">
                qu'en milieu hospitalier traditionnel
              </p>
            </div>

            <Button 
              variant="primary" 
              size="lg"
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-primary to-primary-light hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Postuler Maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

