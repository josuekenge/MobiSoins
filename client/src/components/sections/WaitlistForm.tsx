import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Sparkles, ArrowRight, Loader2, Instagram, Facebook, Linkedin } from 'lucide-react';
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
  const [waitlistNumber] = useState(Math.floor(Math.random() * 3000) + 2000);
  const [role, setRole] = useState<'Patient' | 'Nurse'>('Patient');
  const [name, setName] = useState('');

  const onSubmit = async (data: WaitlistFormData) => {
    setStatus('loading');
    setName(data.fullName);
    try {
      await axios.post('/api/waitlist', { ...data, role });
      setStatus('success');
      reset();
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <section id="waitlist" className="relative py-24 bg-primary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="heartbeat-waitlist" x="0" y="0" width="200" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10" stroke="#ffffff" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heartbeat-waitlist)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Soyez Parmi les Premiers
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Inscrivez-vous maintenant et obtenez{' '}
            <span className="text-white font-semibold">20% de rabais</span>
            {' '}sur votre première visite
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-navy-800" />
                </motion.div>

                <h3 className="text-3xl font-bold text-navy-900 mb-4">
                  Bienvenue dans la Famille MobiSoins!
                </h3>

                <p className="text-lg text-gray-600 mb-2">
                  Merci de votre inscription, <strong>{name}</strong>!
                </p>

                <p className="text-gray-500 mb-6">
                  Vous recevrez un email de confirmation dans quelques minutes.
                  <br />
                  Vous êtes le <strong className="text-navy-800">#{waitlistNumber}</strong> sur notre liste d'attente.
                </p>

                {/* Social Links */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">Suivez-nous sur les réseaux sociaux</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-navy-100 transition-colors">
                      <Instagram className="w-5 h-5 text-gray-600" />
                    </a>
                    <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-navy-100 transition-colors">
                      <Facebook className="w-5 h-5 text-gray-600" />
                    </a>
                    <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-navy-100 transition-colors">
                      <Linkedin className="w-5 h-5 text-gray-600" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Role Selection - Two Column Tabs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Je suis:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRole('Patient')}
                      className={`p-4 border-2 rounded-xl font-medium transition-all ${
                        role === 'Patient'
                          ? 'border-navy-800 bg-navy-50 text-navy-800'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">👤</div>
                      Patient
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('Nurse')}
                      className={`p-4 border-2 rounded-xl font-medium transition-all ${
                        role === 'Nurse'
                          ? 'border-navy-800 bg-navy-50 text-navy-800'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">👨‍⚕️</div>
                      Infirmière
                    </button>
                  </div>
                  <input type="hidden" {...register('role', { required: true })} value={role} />
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom Complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    {...register('fullName', { required: 'Le nom est requis' })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-navy-800 focus:ring-4 focus:ring-navy-100 transition-all outline-none"
                    placeholder="Jean Tremblay"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    {...register('email', {
                      required: 'L\'email est requis',
                      pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-navy-800 focus:ring-4 focus:ring-navy-100 transition-all outline-none"
                    placeholder="jean@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone <span className="text-gray-400">(Optionnel)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-navy-800 focus:ring-4 focus:ring-navy-100 transition-all outline-none"
                    placeholder="514-123-4567"
                  />
                </div>

                {/* City Dropdown */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    Ville/Région <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    required
                    {...register('city', { required: 'La ville est requise' })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none appearance-none bg-white"
                  >
                    <option value="">Sélectionnez votre ville...</option>
                    <option value="montreal">Montréal</option>
                    <option value="quebec">Québec</option>
                    <option value="laval">Laval</option>
                    <option value="gatineau">Gatineau</option>
                    <option value="longueuil">Longueuil</option>
                    <option value="sherbrooke">Sherbrooke</option>
                    <option value="other">Autre</option>
                  </select>
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Langue Préférée
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Français"
                        {...register('language', { required: true })}
                        defaultChecked
                        className="w-5 h-5 text-navy-800 focus:ring-navy-800"
                      />
                      <span className="text-gray-700">Français</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="English"
                        {...register('language', { required: true })}
                        className="w-5 h-5 text-navy-800 focus:ring-navy-800"
                      />
                      <span className="text-gray-700">English</span>
                    </label>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    required
                    {...register('consent', { required: 'Votre consentement est requis' })}
                    className="mt-1 w-5 h-5 text-navy-800 focus:ring-navy-800 rounded"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    J'accepte de recevoir des communications de MobiSoins et j'ai lu la{' '}
                    <a href="/privacy" className="text-navy-800 hover:underline">
                      Politique de confidentialité
                    </a>
                  </label>
                </div>
                {errors.consent && <p className="text-sm text-red-500">{errors.consent.message}</p>}

                {/* Error Message */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 border border-red-200"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Submit Button - Full Width Green Gradient */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-navy-800 text-white font-semibold rounded-xl hover:bg-navy-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      Rejoindre la Liste d'Attente
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Social Proof */}
                <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-navy-800" />
                  Plus de <strong className="text-gray-700">2,547</strong> personnes déjà inscrites
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
