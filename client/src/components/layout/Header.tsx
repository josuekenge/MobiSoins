import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('header.howItWorks'), href: '#how-it-works' },
    { name: t('header.features'), href: '#features' },
    { name: t('header.services'), href: '#services' },
    { name: t('header.faq'), href: '#faq' },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <motion.img 
            src="/mobisoins-logo.jpeg" 
            alt="MobiSoins Logo" 
            className="h-[80px] md:h-[92px] w-auto object-contain mix-blend-multiply"
            style={{
              objectFit: 'contain',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-gray-700 hover:text-navy-800 transition-colors group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setLanguage('FR')}
              className={clsx(
                "px-3 py-1 rounded-full text-xs font-medium transition-all",
                language === 'FR' ? "bg-white text-navy-800 shadow-sm" : "text-gray-600"
              )}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={clsx(
                "px-3 py-1 rounded-full text-xs font-medium transition-all",
                language === 'EN' ? "bg-white text-navy-800 shadow-sm" : "text-gray-600"
              )}
            >
              EN
            </button>
          </div>

          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white hover:shadow-lg transform hover:scale-105 transition-all"
          >
            {t('header.downloadApp')}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-700 hover:text-navy-800 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button className="w-full" onClick={() => {
            setIsMobileMenuOpen(false);
            document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            {t('header.downloadApp')}
          </Button>
        </motion.div>
      )}
    </header>
  );
};
