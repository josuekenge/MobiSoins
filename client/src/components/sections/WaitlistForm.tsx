import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import axios from 'axios';

interface WaitlistFormData {
  fullName: string;
  email: string;
  phone?: string;
  role: 'Patient' | 'Nurse';
  city: string;
  language: 'Français' | 'English';
  consent: boolean;
}

export const WaitlistForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<WaitlistFormData>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: WaitlistFormData) => {
    setStatus('loading');
    try {
      await axios.post('/api/waitlist', data);
      setStatus('success');
      reset();
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <section id="waitlist" className="py-20 bg-primary text-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Soyez Parmi les Premiers</h2>
          <p className="text-gray-200 text-lg">
            Inscrivez-vous maintenant pour obtenir un accès prioritaire lors du lancement.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-2xl text-gray-800">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Inscription Réussie!</h3>
              <p className="text-gray-600">Merci de rejoindre MobiSoins. Nous vous contacterons bientôt.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => setStatus('idle')}
              >
                Inscrire une autre personne
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Je suis</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer">
                    <input 
                      type="radio" 
                      value="Patient" 
                      className="peer sr-only"
                      {...register('role', { required: 'Veuillez choisir un rôle' })}
                    />
                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                      Patient
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input 
                      type="radio" 
                      value="Nurse" 
                      className="peer sr-only"
                      {...register('role', { required: 'Veuillez choisir un rôle' })}
                    />
                    <div className="rounded-lg border-2 border-gray-200 p-4 text-center hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all">
                      Infirmière
                    </div>
                  </label>
                </div>
                {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
              </div>

              <Input 
                label="Nom Complet" 
                placeholder="Jean Tremblay"
                {...register('fullName', { required: 'Le nom est requis' })}
                error={errors.fullName?.message}
              />

              <Input 
                label="Email" 
                type="email"
                placeholder="jean@exemple.com"
                {...register('email', { 
                  required: 'L\'email est requis',
                  pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
                })}
                error={errors.email?.message}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Input 
                  label="Téléphone (Optionnel)" 
                  placeholder="(514) 123-4567"
                  {...register('phone')}
                />
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Ville / Région</label>
                  <select 
                    {...register('city', { required: 'La ville est requise' })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Montreal">Montréal</option>
                    <option value="Quebec">Québec</option>
                    <option value="Laval">Laval</option>
                    <option value="Gatineau">Gatineau</option>
                    <option value="Sherbrooke">Sherbrooke</option>
                    <option value="Trois-Rivieres">Trois-Rivières</option>
                    <option value="Other">Autre</option>
                  </select>
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
                </div>
              </div>

              <div>
                 <label className="mb-1 block text-sm font-medium text-gray-700">Langue Préférée</label>
                 <div className="flex gap-4">
                   <label className="flex items-center gap-2">
                     <input type="radio" value="Français" {...register('language', { required: true })} defaultChecked />
                     Français
                   </label>
                   <label className="flex items-center gap-2">
                     <input type="radio" value="English" {...register('language', { required: true })} />
                     English
                   </label>
                 </div>
              </div>

              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="consent"
                  className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  {...register('consent', { required: 'Votre consentement est requis' })}
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  J'accepte de recevoir des communications de MobiSoins. Je peux me désabonner à tout moment.
                </label>
              </div>
              {errors.consent && <p className="mt-1 text-sm text-red-500">{errors.consent.message}</p>}

              {status === 'error' && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                isLoading={status === 'loading'}
              >
                Rejoindre la liste d'attente
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

