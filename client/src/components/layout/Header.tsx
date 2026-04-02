'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('header.howItWorks'), href: '#how-it-works' },
    { name: t('header.features'), href: '#features' },
    { name: t('header.services'), href: '#services' },
    { name: t('header.faq'), href: '#faq' },
    {
      name: t('header.recruitment'),
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSd_4xRpjxg-Yml0oJYwec5elHmVFI80Qfibk9HYGZMMnCREBg/viewform',
      external: true,
    },
  ];

  return (
    <header className="fixed top-3 left-0 w-full z-50 px-4 sm:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="relative backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-full px-4 py-3 pl-5 flex items-center justify-between transition-all duration-500 hover:bg-white/80 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/mobisoins-logo.jpeg"
              alt="MobiSoins"
              className="h-14 w-auto object-contain mix-blend-multiply"
            />
          </Link>

          {/* Desktop Nav - centered */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="px-4 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 uppercase tracking-wider rounded-full hover:bg-white/60 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Lang + CTA */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 bg-white/40 rounded-full p-1 border border-white/60">
              <button
                onClick={() => setLanguage('FR')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  language === 'FR' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('EN')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  language === 'EN' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-7 py-3 text-[13px] font-medium text-white uppercase tracking-widest bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5"
            >
              {t('header.downloadApp')}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-white/60 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="absolute top-full left-0 w-full px-4 mt-3"
            >
              <div className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-3 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="p-4 text-center text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 rounded-2xl transition-all"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-slate-200/50 mx-6 my-1" />
                <div className="flex items-center justify-center gap-2 p-2">
                  {(['FR', 'EN'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsMobileOpen(false);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        language === lang ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white/60'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-4 text-center text-sm font-medium text-white bg-slate-900 rounded-2xl shadow-lg"
                >
                  {t('header.downloadApp')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
