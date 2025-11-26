import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Features } from '../components/sections/Features';
import { Services } from '../components/sections/Services';
import { Trust } from '../components/sections/Trust';
import { FAQ } from '../components/sections/FAQ';
import { WaitlistForm } from '../components/sections/WaitlistForm';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Features />
        <Services />
        <Trust />
        <WaitlistForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

