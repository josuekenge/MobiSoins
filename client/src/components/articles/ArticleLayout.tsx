'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export interface ArticleSection {
  title: string;
  content: string[];
  list?: string[];
}

export interface ArticleSource {
  label: string;
  url: string;
}

export interface ArticleData {
  slug: string;
  tag: string;
  date: string;
  title: string;
  subtitle: string;
  readTime: string;
  image: string;
  fallbackImage?: string;
  sections: ArticleSection[];
  sources?: ArticleSource[];
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

const FONT_IMPORTS = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');`;

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ article }) => {
  const { language, setLanguage } = useLanguage();
  const data = article[language];

  return (
    <>
      <style>{FONT_IMPORTS}</style>
      <div
        className="min-h-screen flex flex-col selection:bg-blue-600 selection:text-white"
        style={{
          background: '#f7f9fa',
          color: '#1a1a24',
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 300,
        }}
      >
        {/* Brutalist top bar */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
          style={{ background: 'rgba(247,249,250,0.9)', borderBottom: '1px solid rgba(26,26,36,0.12)' }}
        >
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-10">
            <Link href="/template-preview" className="flex items-center gap-3 group">
              <svg className="w-6 h-6" viewBox="0 0 32 32" style={{ color: '#1a1a24' }}>
                <circle cx="16" cy="16" r="13" strokeWidth="1.5" stroke="currentColor" fill="none" />
                <circle cx="16" cy="16" r="4" fill="currentColor" />
                <line x1="0" y1="16" x2="32" y2="16" strokeWidth="1.5" stroke="currentColor" />
              </svg>
              <span
                className="text-sm tracking-[0.25em] uppercase font-semibold mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: '#1a1a24' }}
              >
                MOBISOINS
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/template-preview#blog"
                className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-widest hover:text-blue-600 transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: '#1a1a24' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {language === 'FR' ? 'TOUS LES ARTICLES' : 'ALL ARTICLES'}
              </Link>
              <div
                className="flex items-center text-[10px] uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace", border: '1px solid rgba(26,26,36,0.12)' }}
              >
                {(['FR', 'EN'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="px-3 py-1.5 transition-colors"
                    style={
                      language === lang
                        ? { background: '#1a1a24', color: '#fff' }
                        : { color: '#94a3b8' }
                    }
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow pt-16">
          {/* Masthead */}
          <div className="px-4 sm:px-6 lg:px-10 pt-12 lg:pt-20 pb-10 max-w-5xl mx-auto">
            <div
              className="text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3 flex-wrap"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}
            >
              <span
                className="px-2 py-1"
                style={{ background: '#1a1a24', color: '#f7f9fa' }}
              >
                [ DISP-{data.slug.toUpperCase()} ] / DISPATCH
              </span>
              <span style={{ color: '#2563eb' }}>{data.tag.toUpperCase()}</span>
              <span style={{ color: 'rgba(26,26,36,0.12)' }}>///</span>
              <span>{data.date}</span>
              <span style={{ color: 'rgba(26,26,36,0.12)' }}>///</span>
              <span>{data.readTime} READ</span>
            </div>

            <h1
              className="leading-[0.95] uppercase tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                letterSpacing: '-0.04em',
                fontWeight: 400,
                color: '#1a1a24',
              }}
            >
              {data.title}
            </h1>

            <p
              className="mt-10 font-light leading-relaxed max-w-[58ch]"
              style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', color: '#475569' }}
            >
              {data.subtitle}
            </p>
          </div>

          {/* Hero image — sharp corners */}
          <div className="px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full overflow-hidden"
              style={{
                height: 'clamp(220px, 38vw, 460px)',
                border: '1px solid rgba(26,26,36,0.12)',
              }}
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (data.fallbackImage) (e.target as HTMLImageElement).src = data.fallbackImage;
                }}
              />
              <div
                className="absolute top-3 left-3 text-[9px] uppercase tracking-widest px-2 py-1"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: 'rgba(26,26,36,0.85)',
                  color: '#f7f9fa',
                  backdropFilter: 'blur(8px)',
                }}
              >
                FIG.01 / COVER
              </div>
            </motion.div>
          </div>

          {/* Article body */}
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {data.sections.map((section, i) => (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="mb-12 grid grid-cols-1 md:grid-cols-12 gap-x-6"
              >
                <div className="md:col-span-2 mb-3 md:mb-0">
                  <span
                    className="text-[10px] uppercase tracking-widest"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: '#2563eb' }}
                  >
                    § {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <h2
                    className="mb-6 uppercase tracking-tight"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.3vw, 2rem)',
                      letterSpacing: '-0.03em',
                      fontWeight: 400,
                      color: '#1a1a24',
                    }}
                  >
                    {section.title}
                  </h2>
                  {section.content.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-base lg:text-lg leading-[1.75] mb-5 font-light"
                      style={{ color: '#475569' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-3 mb-5 border-l-2 pl-5" style={{ borderColor: '#2563eb' }}>
                      {section.list.map((item, k) => (
                        <li
                          key={k}
                          className="text-base lg:text-lg leading-[1.7] font-light"
                          style={{ color: '#475569' }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.section>
            ))}

            {/* Sources */}
            {data.sources && data.sources.length > 0 && (
              <section
                className="mb-12 pt-8 border-t"
                style={{ borderColor: 'rgba(26,26,36,0.12)' }}
              >
                <div
                  className="text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}
                >
                  <span className="w-4 h-px" style={{ background: '#94a3b8' }} />
                  {language === 'FR' ? 'RÉFÉRENCES' : 'REFERENCES'}
                </div>
                <ul className="space-y-2">
                  {data.sources.map((source, i) => (
                    <li key={i} className="flex items-baseline gap-3">
                      <span
                        className="text-[10px] uppercase tracking-widest shrink-0"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}
                      >
                        [{String(i + 1).padStart(2, '0')}]
                      </span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline underline-offset-4 decoration-1 transition-colors break-all"
                        style={{ color: '#2563eb' }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = '#1a1a24';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = '#2563eb';
                        }}
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Conclusion — brutalist boxed dark callout */}
            <section
              className="mb-16 p-8 lg:p-12 relative"
              style={{
                background: '#1a1a24',
                color: '#f7f9fa',
                borderTop: '4px solid #2563eb',
              }}
            >
              <div
                className="text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: '#2563eb' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {language === 'FR' ? 'CONCLUSION' : 'CONCLUSION'}
              </div>
              <h2
                className="mb-6 uppercase"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                  color: '#fff',
                }}
              >
                {data.conclusion.title}
              </h2>
              {data.conclusion.content.map((paragraph, j) => (
                <p
                  key={j}
                  className="text-base lg:text-lg leading-[1.75] mb-4 last:mb-0 font-light"
                  style={{ color: 'rgba(247,249,250,0.75)' }}
                >
                  {paragraph}
                </p>
              ))}
            </section>

            {/* Back link */}
            <div
              className="pt-8 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={{ borderColor: 'rgba(26,26,36,0.12)' }}
            >
              <Link
                href="/template-preview#blog"
                className="inline-flex items-center gap-3 px-6 py-3 text-[10px] uppercase tracking-widest transition-colors group"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  border: '1px solid #1a1a24',
                  color: '#1a1a24',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#1a1a24';
                  (e.currentTarget as HTMLElement).style.color = '#f7f9fa';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#1a1a24';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {language === 'FR' ? 'TOUS LES ARTICLES' : 'ALL ARTICLES'}
              </Link>
              <Link
                href="/template-preview"
                className="text-[10px] uppercase tracking-widest border-b pb-1 transition-colors inline-flex items-center gap-2 self-start sm:self-auto"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#1a1a24',
                  borderColor: '#1a1a24',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#2563eb';
                  (e.currentTarget as HTMLElement).style.borderColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#1a1a24';
                  (e.currentTarget as HTMLElement).style.borderColor = '#1a1a24';
                }}
              >
                {language === 'FR' ? "Retour à l'accueil" : 'Back to home'}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
          </article>
        </main>

        {/* Brutalist mini footer */}
        <footer
          className="border-t-[6px]"
          style={{
            background: '#1a1a24',
            color: '#f7f9fa',
            borderColor: '#2563eb',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="13" strokeWidth="1.5" stroke="currentColor" fill="none" />
                <circle cx="16" cy="16" r="4" fill="currentColor" />
                <line x1="0" y1="16" x2="32" y2="16" strokeWidth="1.5" stroke="currentColor" />
              </svg>
              <span
                className="text-xs tracking-[0.25em] uppercase font-semibold mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                MOBISOINS
              </span>
            </div>
            <div
              className="text-[10px] uppercase tracking-widest flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(247,249,250,0.6)' }}
            >
              <span>© 2026 MOBISOINS · {language === 'FR' ? 'TOUS DROITS RÉSERVÉS' : 'ALL RIGHTS RESERVED'}</span>
              <span className="hidden sm:inline" style={{ color: 'rgba(255,255,255,0.2)' }}>///</span>
              <span style={{ color: '#2563eb' }}>BUILT IN QC</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
