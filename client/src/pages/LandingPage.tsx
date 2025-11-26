import React, { lazy, Suspense } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';

// Lazy load sections below the fold for faster initial load
const HowItWorks = lazy(() => import('../components/sections/HowItWorks').then(m => ({ default: m.HowItWorks })));
const Features = lazy(() => import('../components/sections/Features').then(m => ({ default: m.Features })));
const Services = lazy(() => import('../components/sections/Services').then(m => ({ default: m.Services })));
const Trust = lazy(() => import('../components/sections/Trust').then(m => ({ default: m.Trust })));
const Blog = lazy(() => import('../components/sections/Blog').then(m => ({ default: m.Blog })));
const FAQ = lazy(() => import('../components/sections/FAQ').then(m => ({ default: m.FAQ })));
const Newsletter = lazy(() => import('../components/sections/Newsletter').then(m => ({ default: m.Newsletter })));

// Loading placeholder
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Features />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Trust />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Blog />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Newsletter />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

