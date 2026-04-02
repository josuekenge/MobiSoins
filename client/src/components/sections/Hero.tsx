'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText } from 'lucide-react';
import { z } from 'zod';
import { useLanguage } from '../../contexts/LanguageContext';
import { PlayStoreButton } from '../ui/play-store-button';
import { AppStoreButton } from '../ui/app-store-button';

const emailSchema = z.string().email();

export const Hero = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'invalid'>('idle');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!emailSchema.safeParse(email).success) {
      setStatus('invalid');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_FORM_ACCESS_KEY,
          email,
          subject: 'Nouvelle inscription (Hero)',
          from_name: 'MobiSoins Hero',
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
      if (data.success) setEmail('');
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      style={{ background: '#f7f9fa' }}
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-[20%] w-[300px] h-[300px] bg-purple-300/8 rounded-full blur-[90px]" />
      </div>

      <div className="container-custom w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">

          {/* Left: Text */}
          <div className="flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.04em] mb-6"
              style={{ color: '#1a1a24' }}
            >
              {t('hero.title')}<br />
              <span style={{ color: '#1a1a24' }}>{t('hero.titleHighlight')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.1rem,1.5vw,1.25rem)] max-w-[520px] leading-relaxed mb-10 font-light"
              style={{ color: '#5a5a6a' }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <a
                href="https://calendly.com/mobisoins-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-slate-800 bg-white/70 border border-white/90 backdrop-blur-md cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-white/95 group"
                style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.5)' }}
              >
                <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-500" />
                <Calendar className="w-4 h-4" />
                {t('hero.bookNow')}
              </a>
              <a
                href="/Healthcare_Access_On_Demand.pdf#zoom=40"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-medium text-slate-700 bg-white/40 border border-white/60 backdrop-blur-xl hover:bg-white/60 transition-all duration-300"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)' }}
              >
                <FileText className="w-4 h-4" />
                {t('hero.pitchDeck')}
              </a>
            </motion.div>

            {/* Store Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 mt-2"
            >
              <AppStoreButton />
              <PlayStoreButton />
            </motion.div>
          </div>

          {/* Right: Clay Phone Mockup */}
          <div className="flex items-center justify-center relative" style={{ perspective: '1400px' }}>
            {/* Ambient glow behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] bg-blue-400/10 rounded-full blur-[90px] -z-10 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[300px] h-[620px] mx-auto"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              {/* Side buttons - left volume */}
              <div
                className="absolute w-[9px] bg-[#e2e8f0] z-0 rounded-l-lg"
                style={{
                  left: '-9px',
                  top: '122px',
                  height: '28px',
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(15,23,42,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRight: 'none',
                }}
              />
              <div
                className="absolute w-[9px] bg-[#e2e8f0] z-0 rounded-l-lg"
                style={{
                  left: '-9px',
                  top: '176px',
                  height: '56px',
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(15,23,42,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRight: 'none',
                }}
              />
              <div
                className="absolute w-[9px] bg-[#e2e8f0] z-0 rounded-l-lg"
                style={{
                  left: '-9px',
                  top: '244px',
                  height: '56px',
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(15,23,42,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRight: 'none',
                }}
              />
              {/* Right power button */}
              <div
                className="absolute w-[9px] bg-[#e2e8f0] z-0 rounded-r-lg"
                style={{
                  right: '-9px',
                  top: '190px',
                  height: '78px',
                  boxShadow: 'inset -2px 2px 4px rgba(255,255,255,0.9), inset 2px -2px 4px rgba(15,23,42,0.15)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderLeft: 'none',
                }}
              />

              {/* Clay body */}
              <div
                className="absolute inset-0 bg-[#e2e8f0] rounded-[3.9rem] z-0 border-[5px] border-[#f1f5f9]"
                style={{
                  boxShadow:
                    '25px 35px 65px rgba(15,23,42,0.15), inset -6px -6px 16px rgba(15,23,42,0.08), inset 6px 6px 16px rgba(255,255,255,0.95)',
                }}
              />

              {/* Screen */}
              <div
                className="absolute inset-x-[10px] top-[10px] bottom-[10px] bg-[#f8f9fb] rounded-[3.25rem] overflow-hidden flex flex-col z-10 border border-slate-200/70"
                style={{ boxShadow: 'inset 0 0 20px rgba(15,23,42,0.06)' }}
              >
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[116px] h-[30px] bg-[#0f172a] rounded-full z-50 flex items-center justify-between px-2.5">
                  <div className="w-3 h-3 bg-[#1e293b] rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-blue-500/50 rounded-full blur-[1px]" />
                  </div>
                  <div
                    className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                    style={{ boxShadow: '0 0 4px rgba(16,185,129,0.6)' }}
                  />
                </div>

                {/* Status bar */}
                <div className="h-14 w-full pt-3 px-6 flex justify-between items-center text-[11px] font-semibold text-slate-800 z-40">
                  <span className="ml-1 tracking-tight">9:41</span>
                  <div className="flex gap-1.5 items-center opacity-80 mr-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M2 20h.01" /><path d="M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V4" />
                    </svg>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 20h.01" /><path d="M2 8.82a15 15 0 0 1 20 0" /><path d="M5 12.859a10 10 0 0 1 14 0" /><path d="M8.5 16.429a5 5 0 0 1 7 0" />
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" fill="currentColor" /><line x1="22" x2="22" y1="11" y2="13" />
                    </svg>
                  </div>
                </div>

                {/* App content */}
                <div className="flex-1 px-4 pt-2 pb-10 flex flex-col gap-3 overflow-hidden bg-gradient-to-br from-[#f8f9fb] to-[#e2e8f0]/30">
                  <div className="flex flex-col mb-1 ml-1">
                    <h2 className="text-[22px] font-semibold text-slate-800 tracking-tight leading-none">MobiSoins</h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">Infirmière disponible ✓</p>
                  </div>

                  {/* Disponibilité card */}
                  <div
                    className="bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-slate-100/80 transition-all duration-500 hover:-translate-y-1"
                    style={{ boxShadow: '0 4px 12px rgba(15,23,42,0.03), inset 0 1px 2px rgba(255,255,255,1)' }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Disponibilité</span>
                      <span className="text-3xl font-semibold text-slate-800 tracking-tight mt-1">
                        24/7<span className="text-base text-slate-400 font-medium ml-1">h</span>
                      </span>
                    </div>
                    <div className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="264" strokeDashoffset="0" strokeLinecap="round" />
                      </svg>
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100/50 text-blue-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Soins actifs chart */}
                  <div
                    className="bg-white/90 backdrop-blur-md rounded-2xl p-4 flex flex-col border border-slate-100/80 h-[168px] relative overflow-hidden"
                    style={{ boxShadow: '0 4px 12px rgba(15,23,42,0.03), inset 0 1px 2px rgba(255,255,255,1)' }}
                  >
                    <div className="flex justify-between items-center mb-2 z-10">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                          style={{ boxShadow: '0 0 5px rgba(16,185,129,0.4)' }}
                        />
                        <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Soins actifs</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-800">
                        12<span className="text-slate-400 font-normal text-[10px] ml-0.5">min</span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-end gap-[3px] z-10 w-full pt-2">
                      {[30, 45, 35, 55, 40, 75, 100, 65, 45, 30, 50, 35].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-[2px] relative ${i === 6 ? 'bg-emerald-500/60' : 'bg-blue-200/60'}`}
                          style={{ height: `${h}%` }}
                        >
                          {i === 6 && (
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Matching IA */}
                  <div
                    className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-100/80 flex flex-col justify-between relative overflow-hidden min-h-[80px] flex-1"
                    style={{ boxShadow: '0 4px 12px rgba(15,23,42,0.03), inset 0 1px 2px rgba(255,255,255,1)' }}
                  >
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-50/80 flex items-center justify-center border border-purple-100/50">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-purple-500">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-800 tracking-tight">Matching IA</h4>
                          <p className="text-[10px] text-purple-500 font-medium mt-0.5">Actif • 3 infirmières</p>
                        </div>
                      </div>
                      <div className="w-8 h-4 bg-purple-500 rounded-full relative">
                        <div className="absolute right-[2px] top-[2px] w-3 h-3 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[124px] h-[4px] bg-slate-900/10 rounded-full z-40" />
              </div>
            </motion.div>

            {/* Floating mini cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="hidden xl:flex absolute right-0 top-[20%] flex-col gap-2 w-48"
              style={{ animation: 'float 7s ease-in-out infinite 0.8s' }}
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-100/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-800 leading-none">500+</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">Infirmières OIIQ</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-100/80">
                <div className="text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">Prochain soin</div>
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="text-xl">👩‍⚕️</div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Inf. Sarah</div>
                    <div className="text-[10px] text-blue-500 font-medium">14:00 - 15:00</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};
