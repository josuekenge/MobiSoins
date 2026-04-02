'use client';

import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
/* ─── Inline SVG social icons ────────────────────────────────── */

const SvgFacebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const SvgInstagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const SvgLinkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const SvgYoutube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
);

/* ─── Link data ───────────────────────────────────────────────── */

const footerSections = [
  {
    label: 'Produit',
    links: [
      { title: 'Fonctionnalités', href: '#features' },
      { title: 'Services', href: '#services' },
      { title: 'Tarification', href: '#pricing' },
      { title: 'Comment ça marche', href: '#how-it-works' },
    ],
  },
  {
    label: 'Entreprise',
    links: [
      { title: 'À propos', href: '#' },
      { title: 'FAQ', href: '#faq' },
      { title: 'Carrières', href: '#' },
      { title: 'Presse', href: '#' },
    ],
  },
  {
    label: 'Légal',
    links: [
      { title: 'Confidentialité', href: '/confidentialite' },
      { title: 'Conditions', href: '/conditions' },
      { title: 'Cookies', href: '/cookies' },
      { title: 'Sécurité', href: '#' },
    ],
  },
  {
    label: 'Réseaux sociaux',
    links: [
      { title: 'Facebook', href: '#', icon: SvgFacebook },
      { title: 'Instagram', href: '#', icon: SvgInstagram },
      { title: 'LinkedIn', href: '#', icon: SvgLinkedin },
      { title: 'Youtube', href: '#', icon: SvgYoutube },
    ],
  },
];

/* ─── Animated container ─────────────────────────────────────── */

type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */

export const Footer = () => {
  return (
    <footer
      className="relative w-full"
      style={{ background: 'rgba(255,255,255,0.92)' }}
    >

      <div className="container-custom py-16 lg:py-20">
        <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-12">

          {/* Brand column */}
          <AnimatedContainer className="flex flex-col gap-5">
            <Link href="/">
              <img
                src="/mobisoins-logo.jpeg"
                alt="MobiSoins"
                className="h-14 w-auto object-contain mix-blend-multiply opacity-85"
              />
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: '#5a5a6a' }}>
              Une plateforme IA de soins infirmiers à domicile au Québec. Connecte des infirmières OIIQ certifiées avec des patients en quelques minutes.
            </p>
            <p className="text-xs font-light" style={{ color: '#94a3b8' }}>
              © {new Date().getFullYear()} MobiSoins Inc. Tous droits réservés.
            </p>
          </AnimatedContainer>

          {/* Link columns */}
          <div className="xl:col-span-2 grid grid-cols-2 gap-8 md:grid-cols-4">
            {footerSections.map((section, i) => (
              <AnimatedContainer key={section.label} delay={0.1 + i * 0.08}>
                <div>
                  <h3
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: '#1a1a24' }}
                  >
                    {section.label}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-sm font-light transition-colors duration-200"
                          style={{ color: '#5a5a6a' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a24')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#5a5a6a')}
                        >
                          {'icon' in link && link.icon && (
                            <link.icon className="w-3.5 h-3.5 shrink-0" />
                          )}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
        >
          <p className="text-xs font-light" style={{ color: '#94a3b8' }}>
            Fait avec soin au Québec 🍁
          </p>
          <div className="flex items-center gap-1">
            {[
              { label: 'Confidentialité', href: '/confidentialite' },
              { label: 'Conditions', href: '/conditions' },
              { label: 'Cookies', href: '/cookies' },
            ].map((item, i) => (
              <span key={item.label} className="flex items-center">
                {i > 0 && <span className="mx-2 text-slate-200">·</span>}
                <Link
                  href={item.href}
                  className="text-xs font-light transition-colors"
                  style={{ color: '#94a3b8' }}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
