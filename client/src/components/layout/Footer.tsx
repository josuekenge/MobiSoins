'use client';

import Link from 'next/link';

const links: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: 'Pour les patients', href: '#services' },
    { label: 'Pour les infirmières', href: 'https://docs.google.com/forms/d/e/1FAIpQLSd_4xRpjxg-Yml0oJYwec5elHmVFI80Qfibk9HYGZMMnCREBg/viewform' },
    { label: 'Tarification', href: '#pricing' },
    { label: 'Sécurité', href: '#' },
  ],
  Resources: [
    { label: 'Blog', href: '#blog' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Documentation', href: '#' },
  ],
  Company: [
    { label: 'À propos', href: '#' },
    { label: 'Carrières', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Presse', href: '#' },
  ],
};

export const Footer = () => {
  return (
    <footer className="pt-24 pb-12 border-t border-slate-200/30" style={{ background: '#f7f9fa' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <img
              src="/mobisoins-logo.jpeg"
              alt="MobiSoins"
              className="h-12 w-auto object-contain mix-blend-multiply mb-4"
            />
            <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: '#5a5a6a' }}>
              Une plateforme IA de soins infirmiers à domicile au Québec. Connecte des infirmières OIIQ avec des patients en quelques minutes.
            </p>
          </div>
          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-slate-800 mb-5">{section}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm font-light transition-colors hover:text-slate-800"
                      style={{ color: '#5a5a6a' }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-light" style={{ color: '#5a5a6a' }}>
            &copy; 2024 MobiSoins Inc. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/confidentialite"
              className="text-sm font-light hover:text-slate-800 transition-colors"
              style={{ color: '#5a5a6a' }}
            >
              Confidentialité
            </Link>
            <Link
              href="/conditions"
              className="text-sm font-light hover:text-slate-800 transition-colors"
              style={{ color: '#5a5a6a' }}
            >
              Conditions
            </Link>
            <Link
              href="/cookies"
              className="text-sm font-light hover:text-slate-800 transition-colors"
              style={{ color: '#5a5a6a' }}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
