import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, CheckCircle, Activity, Calendar, FileText, User, Mail, Search, ChevronDown, ArrowRight, Loader2, AlertCircle, XCircle } from 'lucide-react';
import { z } from 'zod';
import { useLanguage } from '../../contexts/LanguageContext';

const emailSchema = z.string().email({ message: "Email invalide" });

export const Hero = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    if (status === 'success' || status === 'error' || status === 'invalid') {
      const timer = setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    // Validate email
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setStatus('invalid');
      setErrorMessage(validation.error.issues[0].message);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_FORM_ACCESS_KEY,
          email: email,
          subject: 'Nouvelle inscription (Hero)',
          from_name: 'MobiSoins Hero Form',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

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
          {t('hero.availableInQuebec')}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-7xl font-bold text-navy-900 tracking-tight mb-6"
        >
          {t('hero.title')} <br className="hidden md:block" />
          <span className="text-blue-600">
            {t('hero.titleHighlight')}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="https://calendly.com/mobisoins-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            {t('hero.bookNow')}
          </a>
          <a 
             href="/Healthcare_Access_On_Demand.pdf#zoom=40"
             target="_blank"
             rel="noopener noreferrer"
             className="px-8 py-4 bg-white border-2 border-navy-100 text-navy-800 font-bold rounded-2xl hover:border-navy-300 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            {t('hero.pitchDeck')}
          </a>
        </motion.div>
      </div>

      {/* Central Visual & Floating Cards - Responsive Layout */}
      <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 mb-12 z-20">
        
        {/* LEFT SIDE: Priority Access Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 w-full max-w-[400px] flex flex-col justify-center z-30"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6 group-hover:scale-110 transition-transform duration-300 text-blue-600">
               <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-navy-900 text-3xl mb-3 tracking-tight">
              {t('hero.waitlistTitle')}
            </h3>
            <p className="text-base text-gray-500 leading-relaxed max-w-[280px] mx-auto">
              {t('hero.waitlistSubtitle')} <strong className="text-blue-600">{t('hero.waitlistDiscount')}</strong> {t('hero.waitlistDiscountSuffix')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative w-full mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-100 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <input 
                type="email" 
                placeholder={t('hero.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="relative w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-6 pr-14 text-base font-medium focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-300 text-navy-900"
                required
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:scale-105 active:scale-95"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : status === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Feedback Messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 right-0 top-full mt-2 p-2 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center gap-1.5 text-green-700 font-semibold text-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{t('hero.successMessage')}</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 right-0 top-full mt-2 p-2 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center gap-1.5 text-red-700 font-semibold text-xs"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{t('hero.errorMessage')}</span>
                </motion.div>
              )}
              {status === 'invalid' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 right-0 top-full mt-2 p-2 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center gap-1.5 text-orange-700 font-semibold text-xs"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMessage || t('hero.invalidEmail')}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-50">
             <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full ring-2 ring-white bg-gray-100 overflow-hidden shadow-sm">
                    <img src={`https://placehold.co/80x80/e2e8f0/475569?text=${i}`} alt="" className="h-full w-full object-cover opacity-90" loading="lazy" />
                  </div>
                ))}
             </div>
             <div className="text-left">
                <div className="text-sm font-bold text-navy-900">+2,547</div>
                <div className="text-xs font-medium text-gray-400">{t('hero.personsRegistered')}</div>
             </div>
          </div>
        </motion.div>

        {/* CENTER: Phone Mockup & RIGHT: Floating Info Cards */}
        <div className="relative flex items-center justify-center lg:justify-start">
            
          {/* Phone Mockup */}
          <motion.div 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-20 w-[300px] h-[600px] bg-navy-900 rounded-[3rem] border-[8px] border-navy-900 shadow-2xl overflow-hidden shrink-0"
          >
            {/* Status Bar */}
            <div className="h-8 bg-white flex items-center justify-between px-6 pt-3 pb-1 shrink-0">
              <span className="text-xs font-bold text-navy-900">9:41</span>
              <div className="flex gap-1 items-center">
                <div className="w-4 h-2.5 bg-navy-900 rounded-[1px]"></div>
                <div className="w-0.5 h-2.5 bg-navy-900 rounded-[1px]"></div>
              </div>
            </div>

            {/* App Content */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden h-full">
                <div className="flex justify-end px-6 pt-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex-1 px-6 py-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-center mb-6">
                          <img src="/mobisoins-logo.jpeg" alt="MobiSoins" className="h-12 w-auto object-contain mix-blend-multiply" />
                      </div>
                      <h2 className="text-xl font-bold text-navy-900 text-center mb-6">
                          {t('hero.getStarted')}
                      </h2>

                      {/* Input */}
                      <div className="mb-4">
                          <label className="text-xs font-medium text-gray-500 mb-1.5 block">{t('hero.phoneNumber')}</label>
                          <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2 shadow-sm">
                            <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center text-white text-[8px] font-bold shadow-sm">ID</div>
                            <span className="text-sm font-medium text-navy-900">+62</span>
                            <ChevronDown className="w-3 h-3 text-gray-300" />
                            <div className="flex-1 h-4 border-l border-gray-100 ml-2 pl-2">
                                <span className="text-xs text-gray-400">(201) 555-0123</span>
                            </div>
                          </div>
                      </div>

                      {/* Button */}
                      <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-sm mb-4 shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                          {t('hero.continueButton')}
                      </button>

                      {/* Divider */}
                      <div className="flex items-center gap-3 mb-4">
                          <div className="flex-1 h-px bg-gray-100"></div>
                          <span className="text-[10px] text-gray-400 font-medium">{t('hero.or')}</span>
                          <div className="flex-1 h-px bg-gray-100"></div>
                      </div>

                      {/* Socials */}
                      <div className="space-y-2.5">
                          <button className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-navy-900 hover:bg-gray-100 transition-colors">
                            <span className="text-lg">🍎</span>
                            {t('hero.continueWithApple')}
                          </button>
                          <button className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-navy-900 hover:bg-gray-100 transition-colors">
                            <span className="text-lg text-blue-600">G</span>
                            {t('hero.continueWithGoogle')}
                          </button>
                          <button className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-navy-900">
                            <Mail className="w-3 h-3 text-gray-500" />
                            {t('hero.continueWithEmail')}
                          </button>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="space-y-3 pb-4">
                       <button className="w-full flex items-center justify-center gap-2 text-xs text-blue-600 font-medium hover:text-blue-700">
                          <Search className="w-3 h-3" />
                          {t('hero.findAccount')}
                       </button>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Stacked Info Cards */}
          <div className="hidden xl:flex flex-col justify-center gap-5 ml-8 z-10 relative">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-5 rounded-3xl shadow-lg border border-gray-100 w-56 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy-900 leading-none">10K+</div>
                  <div className="text-[10px] text-gray-500 font-medium mt-1">{t('hero.patientsServed')}</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white p-5 rounded-3xl shadow-lg border border-gray-100 w-64 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-xs font-bold text-navy-900 mb-3 uppercase tracking-wide text-gray-400">{t('hero.nextAppointment')}</div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                 <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-lg border border-gray-100">👩‍⚕️</div>
                 <div>
                    <div className="text-xs font-bold text-navy-900">Inf. Sarah</div>
                    <div className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                       <Clock className="w-3 h-3" /> 14:00 - 15:00
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white p-5 rounded-3xl shadow-lg border border-gray-100 w-60 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-xs font-bold text-navy-900 mb-3 uppercase tracking-wide text-gray-400">{t('hero.highlights')}</div>
              <div className="space-y-2.5">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{t('hero.satisfaction')}</span>
                    <span className="font-bold text-navy-900 flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> 4.9/5</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{t('hero.network')}</span>
                    <span className="font-bold text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 500+ {t('hero.nurses')}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{t('hero.zone')}</span>
                    <span className="font-bold text-navy-900">{t('hero.quebec')}</span>
                 </div>
              </div>
            </motion.div>

          </div>

        </div>

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
              loading="lazy"
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
              loading="lazy"
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
