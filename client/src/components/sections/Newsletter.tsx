import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';

const FORM_ACCESS_KEY = import.meta.env.VITE_FORM_ACCESS_KEY;

// Email validation schema
const emailSchema = z.string().email({ message: "Veuillez entrer une adresse email valide" });

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error' || submitStatus === 'invalid') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    // Validate email format
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setSubmitStatus('invalid');
      setErrorMessage(validation.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          email: email,
          subject: 'Nouvelle inscription à la liste d\'attente MobiSoins',
          from_name: 'MobiSoins Website',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[50%] -left-[20%] w-[100%] h-[100%] bg-blue-50/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-[50%] -right-[20%] w-[100%] h-[100%] bg-blue-50/50 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f05_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f05_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold mb-2 block">Commencez dès aujourd'hui</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
              Rejoignez la liste d'attente
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Soyez parmi les premiers à profiter de l'expérience MobiSoins et bénéficiez d'avantages exclusifs au lancement.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input 
                type="email"
                name="email"
                placeholder="votre@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="bg-white border-gray-200 text-navy-900 placeholder:text-gray-400 focus:ring-blue-500 h-12 rounded-full px-6"
              />
              <Button 
                type="submit"
                variant="secondary" 
                size="md"
                disabled={isSubmitting}
                className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-full px-8 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi...' : 'M\'inscrire'}
              </Button>
            </form>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-navy-900 text-sm">Merci !</div>
                      <div className="text-gray-600 text-sm">Vous êtes inscrit à la liste d'attente.</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-navy-900 text-sm">Erreur</div>
                      <div className="text-gray-600 text-sm">Une erreur s'est produite. Veuillez réessayer.</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'invalid' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-navy-900 text-sm">Email invalide</div>
                      <div className="text-gray-600 text-sm">{errorMessage}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 fill-blue-100" />
                <span>Accès prioritaire</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 fill-blue-100" />
                <span>Pas de carte requise</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
