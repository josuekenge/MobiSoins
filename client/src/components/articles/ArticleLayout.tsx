'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { useLanguage } from '../../contexts/LanguageContext';

export interface ArticleSection {
  title: string;
  content: string[];
  list?: string[];
}

export interface ArticleData {
  slug: string;
  tag: string;
  date: string;
  title: string;
  subtitle: string;
  readTime: string;
  image: string;
  sections: ArticleSection[];
  conclusion: {
    title: string;
    content: string[];
  };
}

interface ArticleLayoutProps {
  article: {
    FR: ArticleData;
    EN: ArticleData;
  };
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ article }) => {
  const { language, t } = useLanguage();
  const data = article[language];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#ffffff' }}>
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero image */}
        <div className="relative w-full" style={{ height: 'clamp(280px, 45vw, 520px)' }}>
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{ background: 'rgba(78,102,69,0.9)', color: '#fff' }}
              >
                {data.tag}
              </span>
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {data.date}
              </span>
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                &middot; {data.readTime}
              </span>
            </div>
            <h1
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight"
              style={{ letterSpacing: '-0.03em' }}
            >
              {data.title}
            </h1>
          </div>
        </div>

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16"
        >
          {/* Subtitle / lede */}
          <p
            className="text-lg md:text-xl font-medium leading-relaxed mb-10"
            style={{ color: '#1a1a24', letterSpacing: '-0.01em' }}
          >
            {data.subtitle}
          </p>

          {/* Sections */}
          {data.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2
                className="text-xl md:text-2xl font-semibold mb-4 tracking-tight"
                style={{ color: '#1a1a24', letterSpacing: '-0.02em' }}
              >
                {section.title}
              </h2>
              {section.content.map((paragraph, j) => (
                <p
                  key={j}
                  className="text-base leading-relaxed mb-4"
                  style={{ color: '#5a5a6a' }}
                >
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {section.list.map((item, k) => (
                    <li key={k} className="text-base leading-relaxed" style={{ color: '#5a5a6a' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <section className="mb-10 p-6 md:p-8 rounded-2xl" style={{ background: '#f7f9fa', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h2
              className="text-xl md:text-2xl font-semibold mb-4 tracking-tight"
              style={{ color: '#1a1a24', letterSpacing: '-0.02em' }}
            >
              {data.conclusion.title}
            </h2>
            {data.conclusion.content.map((paragraph, j) => (
              <p
                key={j}
                className="text-base leading-relaxed mb-3 last:mb-0"
                style={{ color: '#5a5a6a' }}
              >
                {paragraph}
              </p>
            ))}
          </section>

          {/* Footer / copyright */}
          <div className="border-t pt-8 mt-12" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <p className="text-xs mb-2" style={{ color: '#94a3b8' }}>
              &copy; 2026 MobiSoins &mdash; {language === 'FR' ? 'Tous droits r\u00e9serv\u00e9s.' : 'All rights reserved.'}
            </p>
            <p className="text-xs" style={{ color: '#94a3b8' }}>
              {language === 'FR'
                ? 'Ce contenu est prot\u00e9g\u00e9. Toute reproduction, distribution ou utilisation sans autorisation est interdite.'
                : 'This content is protected. Any reproduction, distribution, or use without permission is prohibited.'}
            </p>
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 text-sm font-medium transition-colors duration-200"
            style={{ color: '#4e6645' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {language === 'FR' ? 'Retour \u00e0 l\u2019accueil' : 'Back to home'}
          </Link>
        </motion.article>
      </main>
      <Footer />
    </div>
  );
};
