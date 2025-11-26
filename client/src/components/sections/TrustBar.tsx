import { motion } from 'framer-motion';

export const TrustBar = () => {
  const partners = [
    "OIIQ", "Santé Québec", "Croix Bleue", "Desjardins", "Sun Life", 
    "Manuvie", "SSQ Assurance", "La Capitale", "Cliniques Médicales", "Pharmaprix",
    "OIIQ", "Santé Québec", "Croix Bleue", "Desjardins", "Sun Life", 
    "Manuvie", "SSQ Assurance", "La Capitale", "Cliniques Médicales", "Pharmaprix"
  ];

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="container-custom mb-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
            Confiance & Partenaires
          </p>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="flex space-x-16 animate-marquee whitespace-nowrap">
          {partners.map((partner, index) => (
            <span 
              key={index} 
              className="text-2xl font-bold text-navy-800/70 hover:text-blue-600 transition-colors cursor-default select-none"
            >
              {partner}
            </span>
          ))}
        </div>
        
        <div className="absolute top-0 flex space-x-16 animate-marquee2 whitespace-nowrap">
           {partners.map((partner, index) => (
            <span 
              key={`dup-${index}`} 
              className="text-2xl font-bold text-navy-800/70 hover:text-blue-600 transition-colors cursor-default select-none"
            >
              {partner}
            </span>
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
          animation: marquee 60s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 60s linear infinite;
        }
      `}</style>
    </section>
  );
};
