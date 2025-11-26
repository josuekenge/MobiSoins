import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "Comment fonctionne MobiSoins?",
      answer: "MobiSoins connecte les patients avec des infirmières certifiées pour des soins à domicile. Vous réservez via l'application, suivez votre infirmière en temps réel, et payez de manière sécurisée après le service."
    },
    {
      question: "Les infirmières sont-elles vraiment certifiées?",
      answer: "Oui, absolument. Toutes nos infirmières sont membres de l'Ordre des Infirmières et Infirmiers du Québec (OIIQ), possèdent une assurance responsabilité civile, et ont passé notre processus de vérification rigoureux incluant la vérification des antécédents."
    },
    {
      question: "Quels sont les coûts?",
      answer: "Les prix varient selon le service (45$ à 95$ en moyenne). Le prix exact est affiché avant la réservation. Aucun frais caché. Paiement sécurisé par carte de crédit ou Apple Pay."
    },
    {
      question: "Quelles régions sont couvertes?",
      answer: "Actuellement disponible à Montréal, Québec, Laval, Gatineau, Longueuil, et Sherbrooke. Expansion prévue dans 10+ villes d'ici fin 2025."
    },
    {
      question: "Comment devenir infirmière partenaire?",
      answer: "Inscrivez-vous via notre formulaire 'Devenir Infirmière'. Nous vérifions votre licence OIIQ, assurance, et effectuons une entrevue. Vous pouvez commencer à accepter des missions sous 5 jours ouvrables."
    },
    {
      question: "Les paiements sont-ils sécurisés?",
      answer: "Oui, tous les paiements sont traités par Stripe, leader mondial en sécurité des paiements. Nous ne stockons jamais vos informations bancaires."
    },
    {
      question: "Puis-je choisir mon infirmière?",
      answer: "Vous pouvez voir le profil, les évaluations, et l'expérience de l'infirmière avant d'accepter la mission. Si vous avez une préférence, vous pouvez la demander pour vos prochaines visites."
    },
    {
      question: "Que se passe-t-il en cas d'urgence médicale?",
      answer: "MobiSoins n'est PAS un service d'urgence. En cas d'urgence vitale, composez le 911. Nos infirmières peuvent gérer les soins non-urgents et vous orienter vers les urgences si nécessaire."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-0 w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[10%] left-0 w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy-900 mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Trouvez des réponses à vos questions les plus courantes
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-navy-600 focus:ring-2 focus:ring-navy-100 outline-none transition-all shadow-sm bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden shadow-sm hover:border-navy-200 hover:shadow-md transition-all"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-bold text-navy-900 text-lg pr-4">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-navy-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-12">Aucune question trouvée pour votre recherche.</p>
          )}
        </div>
      </div>
    </section>
  );
};
