import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'FR' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('FR');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  FR: {
    header: {
      howItWorks: 'Comment ça marche',
      features: 'Fonctionnalités',
      services: 'Services',
      faq: 'FAQ',
      downloadApp: 'Télécharger l\'App',
    },
    hero: {
      availableInQuebec: 'Disponible au Québec',
      title: 'Soins Infirmiers',
      titleHighlight: 'Directement à Domicile',
      subtitle: 'Connectez-vous avec des infirmières qualifiées en quelques minutes. Service professionnel, sécurisé et disponible 24/7.',
      bookNow: 'Réserver Maintenant',
      pitchDeck: 'Pitch Deck',
      waitlistTitle: 'Liste d\'Attente',
      waitlistSubtitle: 'Soyez le premier averti et obtenez',
      waitlistDiscount: '20% de rabais',
      waitlistDiscountSuffix: 'au lancement.',
      emailPlaceholder: 'votre@email.com',
      successMessage: 'Inscrit !',
      errorMessage: 'Erreur',
      invalidEmail: 'Email invalide',
      personsRegistered: 'Personnes inscrites',
      patientsServed: 'Patients Traités',
      nextAppointment: 'Prochain Soin',
      highlights: 'Highlights',
      satisfaction: 'Satisfaction',
      network: 'Réseau',
      nurses: 'Inf.',
      zone: 'Zone',
      quebec: 'Québec',
      continueButton: 'Continuer',
      or: 'OU',
      continueWithApple: 'Continuer avec Apple',
      continueWithGoogle: 'Continuer avec Google',
      continueWithEmail: 'Continuer avec une adresse e-mail',
      findAccount: 'Retrouver votre compte',
      phoneNumber: 'Numéro de téléphone',
      getStarted: 'C\'est parti avec MobiSoins',
    },
    howItWorks: {
      title: 'Comment ça marche',
      subtitle: 'Obtenez des soins infirmiers professionnels en 3 étapes simples',
      step1Title: 'Réservez en ligne',
      step1Description: 'Choisissez le service dont vous avez besoin et sélectionnez un créneau horaire qui vous convient.',
      step2Title: 'Confirmation instantanée',
      step2Description: 'Recevez une confirmation immédiate avec les détails de votre rendez-vous.',
      step3Title: 'Soins à domicile',
      step3Description: 'Une infirmière qualifiée arrive à votre domicile à l\'heure prévue.',
    },
    features: {
      title: 'Fonctionnalités',
      subtitle: 'Une plateforme complète pour vos besoins en soins infirmiers',
      feature1: 'Réservation 24/7',
      feature1Description: 'Réservez à tout moment, jour et nuit',
      feature2: 'Infirmières Certifiées',
      feature2Description: 'Toutes nos infirmières sont certifiées OIIQ',
      feature3: 'Suivi en Temps Réel',
      feature3Description: 'Suivez l\'arrivée de votre infirmière en direct',
      feature4: 'Paiement Sécurisé',
      feature4Description: 'Transactions sécurisées et confidentielles',
      feature5: 'Historique Médical',
      feature5Description: 'Accédez à votre historique de soins',
      feature6: 'Support Client',
      feature6Description: 'Assistance disponible 24/7',
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Des soins professionnels adaptés à vos besoins',
      service1: 'Prélèvements Sanguins',
      service1Description: 'Analyses sanguines à domicile',
      service2: 'Soins de Plaies',
      service2Description: 'Traitement professionnel des plaies',
      service3: 'Injections',
      service3Description: 'Administration de médicaments',
      service4: 'Suivi Post-Opératoire',
      service4Description: 'Surveillance après chirurgie',
      service5: 'Soins Palliatifs',
      service5Description: 'Accompagnement et confort',
      service6: 'Évaluation Santé',
      service6Description: 'Bilan de santé complet',
    },
    trust: {
      title: 'Ce que disent nos patients',
      subtitle: 'Des milliers de patients satisfaits à travers le Québec',
    },
    blog: {
      title: 'Dernières Actualités',
      subtitle: 'Restez informé sur la santé et les soins à domicile',
      readMore: 'Lire la suite',
    },
    faq: {
      title: 'Questions Fréquentes',
      subtitle: 'Trouvez les réponses à vos questions',
    },
    newsletter: {
      title: 'Rejoignez la liste d\'attente',
      subtitle: 'Commencez dès aujourd\'hui',
      description: 'Soyez parmi les premiers à profiter de l\'expérience MobiSoins et bénéficiez d\'avantages exclusifs au lancement.',
      emailPlaceholder: 'votre@email.com',
      submitButton: 'M\'inscrire',
      submitting: 'Envoi...',
      successTitle: 'Merci !',
      successMessage: 'Vous êtes inscrit à la liste d\'attente.',
      errorTitle: 'Erreur',
      errorMessage: 'Une erreur s\'est produite. Veuillez réessayer.',
      invalidEmailTitle: 'Email invalide',
      priorityAccess: 'Accès prioritaire',
      noCardRequired: 'Pas de carte requise',
    },
    footer: {
      description: 'MobiSoins révolutionne l\'accès aux soins de santé à domicile au Québec.',
      company: 'Entreprise',
      aboutUs: 'À propos',
      careers: 'Carrières',
      press: 'Presse',
      blog: 'Blog',
      services: 'Services',
      forPatients: 'Pour les patients',
      forNurses: 'Pour les infirmières',
      pricing: 'Tarification',
      insurance: 'Assurances',
      support: 'Support',
      helpCenter: 'Centre d\'aide',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      legal: 'Légal',
      privacyPolicy: 'Politique de confidentialité',
      termsOfService: 'Conditions d\'utilisation',
      cookies: 'Politique de cookies',
      allRightsReserved: 'Tous droits réservés.',
    },
  },
  EN: {
    header: {
      howItWorks: 'How It Works',
      features: 'Features',
      services: 'Services',
      faq: 'FAQ',
      downloadApp: 'Download App',
    },
    hero: {
      availableInQuebec: 'Available in Quebec',
      title: 'Nursing Care',
      titleHighlight: 'Directly at Home',
      subtitle: 'Connect with qualified nurses in minutes. Professional, secure service available 24/7.',
      bookNow: 'Book Now',
      pitchDeck: 'Pitch Deck',
      waitlistTitle: 'Waiting List',
      waitlistSubtitle: 'Be the first to know and get',
      waitlistDiscount: '20% off',
      waitlistDiscountSuffix: 'at launch.',
      emailPlaceholder: 'your@email.com',
      successMessage: 'Registered!',
      errorMessage: 'Error',
      invalidEmail: 'Invalid email',
      personsRegistered: 'People registered',
      patientsServed: 'Patients Served',
      nextAppointment: 'Next Appointment',
      highlights: 'Highlights',
      satisfaction: 'Satisfaction',
      network: 'Network',
      nurses: 'Nurses',
      zone: 'Zone',
      quebec: 'Quebec',
      continueButton: 'Continue',
      or: 'OR',
      continueWithApple: 'Continue with Apple',
      continueWithGoogle: 'Continue with Google',
      continueWithEmail: 'Continue with email address',
      findAccount: 'Find your account',
      phoneNumber: 'Phone number',
      getStarted: 'Get started with MobiSoins',
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Get professional nursing care in 3 simple steps',
      step1Title: 'Book Online',
      step1Description: 'Choose the service you need and select a time slot that suits you.',
      step2Title: 'Instant Confirmation',
      step2Description: 'Receive immediate confirmation with your appointment details.',
      step3Title: 'Home Care',
      step3Description: 'A qualified nurse arrives at your home at the scheduled time.',
    },
    features: {
      title: 'Features',
      subtitle: 'A complete platform for your nursing care needs',
      feature1: '24/7 Booking',
      feature1Description: 'Book anytime, day or night',
      feature2: 'Certified Nurses',
      feature2Description: 'All our nurses are OIIQ certified',
      feature3: 'Real-Time Tracking',
      feature3Description: 'Track your nurse\'s arrival in real-time',
      feature4: 'Secure Payment',
      feature4Description: 'Secure and confidential transactions',
      feature5: 'Medical History',
      feature5Description: 'Access your care history',
      feature6: 'Customer Support',
      feature6Description: '24/7 assistance available',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Professional care tailored to your needs',
      service1: 'Blood Draws',
      service1Description: 'Blood tests at home',
      service2: 'Wound Care',
      service2Description: 'Professional wound treatment',
      service3: 'Injections',
      service3Description: 'Medication administration',
      service4: 'Post-Operative Care',
      service4Description: 'Post-surgery monitoring',
      service5: 'Palliative Care',
      service5Description: 'Support and comfort',
      service6: 'Health Assessment',
      service6Description: 'Complete health check-up',
    },
    trust: {
      title: 'What Our Patients Say',
      subtitle: 'Thousands of satisfied patients across Quebec',
    },
    blog: {
      title: 'Latest News',
      subtitle: 'Stay informed about health and home care',
      readMore: 'Read more',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to your questions',
    },
    newsletter: {
      title: 'Join the Waiting List',
      subtitle: 'Get Started Today',
      description: 'Be among the first to experience MobiSoins and enjoy exclusive benefits at launch.',
      emailPlaceholder: 'your@email.com',
      submitButton: 'Sign Up',
      submitting: 'Sending...',
      successTitle: 'Thank you!',
      successMessage: 'You are registered on the waiting list.',
      errorTitle: 'Error',
      errorMessage: 'An error occurred. Please try again.',
      invalidEmailTitle: 'Invalid email',
      priorityAccess: 'Priority access',
      noCardRequired: 'No card required',
    },
    footer: {
      description: 'MobiSoins is revolutionizing access to home healthcare in Quebec.',
      company: 'Company',
      aboutUs: 'About Us',
      careers: 'Careers',
      press: 'Press',
      blog: 'Blog',
      services: 'Services',
      forPatients: 'For Patients',
      forNurses: 'For Nurses',
      pricing: 'Pricing',
      insurance: 'Insurance',
      support: 'Support',
      helpCenter: 'Help Center',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms',
      legal: 'Legal',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookies: 'Cookie Policy',
      allRightsReserved: 'All rights reserved.',
    },
  },
};

