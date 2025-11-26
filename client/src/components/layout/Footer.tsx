import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center">
            <img 
              src="/mobisoins-logo.jpeg" 
              alt="MobiSoins Logo" 
              className="h-16 md:h-20 w-auto object-contain brightness-0 invert drop-shadow-sm"
            />
          </div>
          <p className="text-gray-300 text-sm">
            Connectez-vous avec des infirmières certifiées pour des soins à domicile professionnels.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white hover:text-secondary transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="text-white hover:text-secondary transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-white hover:text-secondary transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="text-white hover:text-secondary transition-colors"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-heading font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Pour les Patients</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pour les Infirmières</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tarification</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Entreprises</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-heading font-semibold mb-4">Légal</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Politique de Cookies</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-heading font-semibold mb-4">Restez informé</h3>
          <p className="text-sm text-gray-300 mb-4">Inscrivez-vous à notre newsletter pour les dernières nouvelles.</p>
          <form className="space-y-2">
            <Input 
              placeholder="Votre email" 
              className="bg-primary-light border-none text-white placeholder:text-gray-400 focus:ring-secondary"
            />
            <Button variant="secondary" size="sm" className="w-full">S'inscrire</Button>
          </form>
        </div>
      </div>

      <div className="container-custom border-t border-primary-light pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} MobiSoins. Tous droits réservés.</p>
        <div className="flex gap-4">
          <button className="hover:text-white">Français</button>
          <span>|</span>
          <button className="hover:text-white">English</button>
        </div>
      </div>
    </footer>
  );
};

