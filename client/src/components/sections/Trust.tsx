import { Star, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const Trust = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      headline: t('trust.testimonial1Headline'),
      text: t('trust.testimonial1Text'),
      author: "Marie L.",
      handle: "@marie_montreal",
      platform: "instagram",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      headline: t('trust.testimonial2Headline'),
      text: t('trust.testimonial2Text'),
      author: "Jean Tremblay",
      handle: "@jtremblay",
      platform: "twitter",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      headline: t('trust.testimonial3Headline'),
      text: t('trust.testimonial3Text'),
      author: "Sophie B.",
      handle: "@sophie_b_nurse",
      platform: "facebook",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    {
      headline: t('trust.testimonial4Headline'),
      text: t('trust.testimonial4Text'),
      author: "Pierre G.",
      handle: "@pierreg_quebec",
      platform: "twitter",
      avatar: "https://i.pravatar.cc/150?img=13"
    },
    {
      headline: t('trust.testimonial5Headline'),
      text: t('trust.testimonial5Text'),
      author: "Isabelle K.",
      handle: "@isa_k",
      platform: "instagram",
      avatar: "https://i.pravatar.cc/150?img=24"
    },
    {
      headline: t('trust.testimonial6Headline'),
      text: t('trust.testimonial6Text'),
      author: "Marc A.",
      handle: "@marco_polo",
      platform: "linkedin",
      avatar: "https://i.pravatar.cc/150?img=68"
    }
  ];

  const SocialIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'twitter': return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'facebook': return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'linkedin': return <Linkedin className="w-5 h-5 text-blue-700" />;
      default: return <Star className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <section id="trust" className="py-24 bg-white relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] right-[10%] w-[60%] h-[60%] bg-blue-100/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-50/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f05_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f05_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="text-blue-600 font-semibold mb-2">{t('trust.badge')}</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-navy-900">
            {t('trust.title')} <br />
            {t('trust.subtitle')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full"
            >
              <div className="font-bold text-navy-900 mb-3 text-lg">{t.headline}</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                {t.text}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                  <div>
                    <div className="font-bold text-navy-900 text-sm">{t.author}</div>
                    <div className="text-xs text-blue-500">{t.handle}</div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                  <SocialIcon platform={t.platform} />
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};
