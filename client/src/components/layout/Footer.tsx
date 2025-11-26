import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="heartbeat-footer" x="0" y="0" width="200" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10" stroke="#ffffff" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heartbeat-footer)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/mobisoins-logo.jpeg" 
                alt="MobiSoins Logo" 
                className="h-20 md:h-24 w-auto object-contain brightness-0 invert drop-shadow-sm"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Soins infirmiers professionnels à domicile. Connectez-vous avec des infirmières certifiées en quelques minutes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-navy-300 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-navy-300 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-navy-300 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-navy-300 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Pour Vous */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">Pour Vous</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Patients</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Tarification</a></li>
              <li><a href="#trust" className="hover:text-white transition-colors">Régions Couvertes</a></li>
              <li><a href="#trust" className="hover:text-white transition-colors">Témoignages</a></li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">Entreprise</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">À Propos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partenaires</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-lg">Légal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conditions d'Utilisation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politique de Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibilité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">RAMQ & Assurances</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            &copy; {new Date().getFullYear()} MobiSoins. Tous droits réservés.
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-navy-300 fill-navy-300" /> in Quebec
            </span>
          </p>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors font-medium">Français</button>
            <span>|</span>
            <button className="hover:text-white transition-colors font-medium">English</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
