import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { clsx } from 'clsx';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "Comment fonctionne MobiSoins?",
      answer: "MobiSoins vous connecte avec des infirmières certifiées à proximité. Vous choisissez le service, l'heure, et une infirmière se rend à votre domicile pour prodiguer les soins."
    },
    {
      question: "Les infirmières sont-elles certifiées?",
      answer: "Oui, absolument. Toutes les infirmières sur notre plateforme sont membres en règle de l'OIIQ ou de l'OIIAQ et subissent une vérification rigoureuse de leurs antécédents."
    },
    {
      question: "Quels sont les coûts?",
      answer: "Les coûts varient selon le type de soin. Le prix est affiché clairement avant la confirmation de votre réservation. Certains soins peuvent être couverts par vos assurances privées."
    },
    {
      question: "Quelles régions sont couvertes?",
      answer: "Nous couvrons actuellement la grande région de Montréal, Québec, Laval, et Gatineau. Nous nous développons rapidement dans d'autres régions."
    },
    {
      question: "Comment devenir infirmière partenaire?",
      answer: "Vous pouvez postuler directement via notre application ou notre site web dans la section 'Devenir Infirmière'. Vous aurez besoin de votre numéro de permis et d'une pièce d'identité."
    },
    {
      question: "Les paiements sont-ils sécurisés?",
      answer: "Oui, tous les paiements sont traités via Stripe, une plateforme de paiement sécurisée reconnue mondialement. Nous ne conservons pas vos informations bancaires."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Questions Fréquentes</h2>
          <p className="text-gray-600 mb-8">Trouvez des réponses à vos questions sur nos services.</p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <div
                  className={clsx(
                    "px-6 text-gray-600 transition-all duration-300 overflow-hidden",
                    openIndex === index ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  {faq.answer}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucune question trouvée pour votre recherche.</p>
          )}
        </div>
      </div>
    </section>
  );
};

