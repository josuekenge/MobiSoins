import { ArrowRight } from 'lucide-react';

export const Blog = () => {
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Santé", "Domicile"],
      title: "Les avantages des soins à domicile pour les aînés",
      description: "Découvrez comment les soins à domicile améliorent la qualité de vie et l'autonomie des personnes âgées au Québec.",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Technologie", "Innovation"],
      title: "Comment la télé-santé transforme le suivi médical",
      description: "L'impact des nouvelles technologies sur la relation patient-soignant et l'accessibilité aux soins.",
      link: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Bien-être", "Conseils"],
      title: "Préparer sa première visite infirmière",
      description: "Guide complet pour vous préparer à recevoir des soins infirmiers professionnels dans le confort de votre foyer.",
      link: "#"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[70%] h-[70%] bg-blue-50/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-[10%] w-[70%] h-[70%] bg-blue-50/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="text-blue-600 font-semibold mb-2 block">Notre Blog</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl font-bold text-navy-900">Derniers Articles</h2>
            <p className="text-gray-500 max-w-lg">
              Restez informé sur les dernières actualités en santé, les conseils de nos experts et les innovations MobiSoins.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Container */}
              <div className="rounded-3xl overflow-hidden mb-6 h-64 relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-4">
                {article.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {article.description}
              </p>

              {/* Link */}
              <div className="inline-flex items-center gap-2 text-navy-900 font-semibold text-sm border border-gray-200 rounded-full px-4 py-2 transition-all group-hover:border-blue-600 group-hover:text-blue-600">
                Lire l'article
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



