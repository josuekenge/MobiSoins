'use client';

import dynamic from 'next/dynamic';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { LogoCloud } from '../components/sections/LogoCloud';

function SectionLoader() {
  return (
    <div className="w-full h-24 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
    </div>
  );
}

const HowItWorks = dynamic(
  () => import('../components/sections/HowItWorks').then((m) => ({ default: m.HowItWorks })),
  { loading: () => <SectionLoader /> }
);
const Features = dynamic(
  () => import('../components/sections/Features').then((m) => ({ default: m.Features })),
  { loading: () => <SectionLoader /> }
);
const Services = dynamic(
  () => import('../components/sections/Services').then((m) => ({ default: m.Services })),
  { loading: () => <SectionLoader /> }
);
const Trust = dynamic(
  () => import('../components/sections/Trust').then((m) => ({ default: m.Trust })),
  { loading: () => <SectionLoader /> }
);
const FAQ = dynamic(
  () => import('../components/sections/FAQ').then((m) => ({ default: m.FAQ })),
  { loading: () => <SectionLoader /> }
);
const Newsletter = dynamic(
  () => import('../components/sections/Newsletter').then((m) => ({ default: m.Newsletter })),
  { loading: () => <SectionLoader /> }
);
const Stats = dynamic(
  () => import('../components/sections/Stats').then((m) => ({ default: m.Stats })),
  { loading: () => <SectionLoader /> }
);
const Pillars = dynamic(
  () => import('../components/sections/Pillars').then((m) => ({ default: m.Pillars })),
  { loading: () => <SectionLoader /> }
);
const Contact = dynamic(
  () => import('../components/sections/Contact').then((m) => ({ default: m.Contact })),
  { loading: () => <SectionLoader /> }
);
const NursingMapSection = dynamic(
  () => import('../components/sections/NursingMapSection').then((m) => ({ default: m.NursingMapSection })),
  { loading: () => <SectionLoader /> }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'transparent', backdropFilter: 'none' }}>
      <Header />
      <main className="flex-grow">
        <Hero />
        <LogoCloud />
        <Stats />
        <HowItWorks />
        <NursingMapSection />
        <Features />
        <Services />
        <Trust />
        <Pillars />
        <FAQ />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
