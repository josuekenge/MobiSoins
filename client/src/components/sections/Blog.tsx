import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Blog = () => {
  const { t } = useLanguage();
  
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: [t('blog.article1Tag1'), t('blog.article1Tag2')],
      title: t('blog.article1Title'),
      description: t('blog.article1Description'),
      link: "https://www.placessenior.com/blog/conseils-places-senior/les-avantages-des-soins-domicile"
    },
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: [t('blog.article2Tag1'), t('blog.article2Tag2')],
      title: t('blog.article2Title'),
      description: t('blog.article2Description'),
      link: "https://www150.statcan.gc.ca/n1/daily-quotidien/220826/dq220826a-fra.htm"
    },
    {
      image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: [t('blog.article3Tag1'), t('blog.article3Tag2')],
      title: t('blog.article3Title'),
      description: t('blog.article3Description'),
      link: "https://www.oiiq.org/documents/20147/1456160/1478-reflexion-soutien-aines-domicile-web.pdf"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[70%] h-[70%] bg-blue-50/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-[10%] w-[70%] h-[70%] bg-blue-50/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="text-blue-600 font-semibold mb-2 block">{t('blog.badge')}</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl font-bold text-navy-900">{t('blog.title')}</h2>
            <p className="text-gray-500 max-w-lg">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <a 
              key={index} 
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              {/* Image Container */}
              <div className="rounded-3xl overflow-hidden mb-6 h-64 relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
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
                {t('blog.readMore')}
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};



