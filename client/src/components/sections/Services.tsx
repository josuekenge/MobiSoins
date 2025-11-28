import { motion } from 'framer-motion';
import { Activity, Filter, Layout } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Services = () => {
  const { t } = useLanguage();
  
  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[50%] h-[50%] bg-blue-50/60 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-blue-50/60 rounded-full blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="text-blue-600 font-semibold mb-4">{t('services.badge')}</div>
          <h2 className="text-4xl lg:text-6xl font-bold text-navy-900">
            {t('services.mainTitle')} <br className="hidden md:block" />
            {t('services.mainTitlePrefix')} <span className="bg-blue-600 text-white px-4 py-1 rounded-full transform -rotate-2 inline-block shadow-lg text-3xl lg:text-5xl align-middle mx-2">{t('services.mainTitleHighlight')}</span> {t('services.mainTitleSuffix')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Service 1: Monitoring */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            className="group"
          >
            {/* Visual Mockup */}
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 mb-8 h-64 shadow-sm group-hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-6 left-6 font-bold text-navy-900 text-sm">{t('services.card1Visual')}</div>
              
              {/* Mock Dashboard UI */}
              <div className="w-full space-y-3 mt-4 px-2">
                 <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-xs">📅</div>
                      <div>
                        <div className="text-[10px] font-bold text-navy-900">{t('services.card1Item1')}</div>
                        <div className="text-[9px] text-gray-500">{t('services.card1Item1Detail')}</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                 </div>

                 <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-xs">💊</div>
                      <div>
                        <div className="text-[10px] font-bold text-navy-900">{t('services.card1Item2')}</div>
                        <div className="text-[9px] text-gray-500">{t('services.card1Item2Detail')}</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                 </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4">
              <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                <Layout className="w-5 h-5" />
                <span>{t('services.card1Badge')}</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{t('services.card1Title')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('services.card1Description')}
              </p>
            </div>
          </motion.div>

          {/* Service 2: Filters/Matching */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            {/* Visual Mockup */}
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 mb-8 h-64 shadow-sm group-hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute top-6 left-6 font-bold text-navy-900 text-sm">{t('services.card2Visual')}</div>
              
              {/* Mock Search UI */}
              <div className="w-full max-w-[200px] space-y-3 mt-2">
                <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg border border-blue-100">
                   <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[10px]">📍</div>
                   <div className="h-1.5 bg-blue-200 rounded-full w-20"></div>
                </div>
                <div className="flex justify-center">
                  <div className="h-6 w-[1px] bg-gray-200"></div>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                   <div className="w-8 h-8 bg-navy-900 rounded-full flex items-center justify-center text-white text-xs">👩‍⚕️</div>
                   <div>
                      <div className="h-1.5 bg-navy-100 rounded-full w-24 mb-1"></div>
                      <div className="h-1 bg-gray-100 rounded-full w-16"></div>
                   </div>
                   <div className="ml-auto text-green-500 text-xs">✓</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4">
              <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                <Filter className="w-5 h-5" />
                <span>{t('services.card2Badge')}</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{t('services.card2Title')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('services.card2Description')}
              </p>
            </div>
          </motion.div>

          {/* Service 3: Data/Analytics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            {/* Visual Mockup */}
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 mb-8 h-64 shadow-sm group-hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-6 left-6 font-bold text-navy-900 text-sm">{t('services.card3Visual')}</div>

              {/* Mock Graph UI */}
              <div className="w-full mt-4 px-2 relative h-32 flex items-end justify-between gap-2">
                {/* Bars */}
                <div className="w-1/5 bg-blue-100 rounded-t-lg h-[40%] group-hover:h-[50%] transition-all duration-500 relative"></div>
                <div className="w-1/5 bg-blue-200 rounded-t-lg h-[60%] group-hover:h-[70%] transition-all duration-500 delay-75 relative"></div>
                <div className="w-1/5 bg-blue-300 rounded-t-lg h-[45%] group-hover:h-[55%] transition-all duration-500 delay-150 relative"></div>
                <div className="w-1/5 bg-blue-500 rounded-t-lg h-[80%] group-hover:h-[90%] transition-all duration-500 delay-200 relative shadow-lg shadow-blue-200">
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-[9px] px-1.5 py-0.5 rounded">Top</div>
                </div>
                
                {/* Line overlay */}
                <div className="absolute inset-0 pointer-events-none">
                   <svg className="w-full h-full overflow-visible">
                     <path d="M 10 80 Q 60 40 110 60 T 200 20" fill="none" stroke="#003366" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" className="opacity-30" />
                   </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4">
              <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold">
                <Activity className="w-5 h-5" />
                <span>{t('services.card3Badge')}</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{t('services.card3Title')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('services.card3Description')}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
