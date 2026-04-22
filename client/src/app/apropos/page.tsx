'use client';

import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { About } from '../../components/sections/About';

export default function AproposPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow pt-32">
        <About />
      </main>
      <Footer />
    </div>
  );
}
