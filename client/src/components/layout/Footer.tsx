import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="/mobisoins-logo.jpeg" 
                alt="MobiSoins Logo" 
                className="h-32 w-auto object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-xs mb-6">
              MobiSoins révolutionne l'accès aux soins de santé à domicile au Québec. 
              Simple, rapide et humain.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-navy-900 text-lg mb-6">MobiSoins</h4>
            <ul className="space-y-4 text-base text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">À Propos</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Presse</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-navy-900 text-lg mb-6">Produit</h4>
            <ul className="space-y-4 text-base text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Pour Patients</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Pour Infirmières</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Tarification</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Sécurité</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-navy-900 text-lg mb-6">Légal</h4>
            <ul className="space-y-4 text-base text-gray-500">
              <li><Link to="/confidentialite" className="hover:text-blue-600 transition-colors">Confidentialité</Link></li>
              <li><Link to="/conditions" className="hover:text-blue-600 transition-colors">Conditions</Link></li>
              <li><Link to="/cookies" className="hover:text-blue-600 transition-colors">Cookies</Link></li>
              <li>
                <a 
                  href="https://calendly.com/mobisoins-info/30min" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base text-gray-400">
            © {currentYear} MobiSoins Inc. Tous droits réservés.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
