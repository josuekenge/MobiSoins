'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, MapPin, MessageCircle, Clock } from 'lucide-react';
import DottedMap from 'dotted-map';
import { Area, AreaChart, CartesianGrid, Bar, BarChart, XAxis } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

/* ─── Dotted map of Canada/Quebec ──────────────────────────── */

const map = new DottedMap({ height: 55, grid: 'diagonal' });
const points = map.getPoints();

const MapView = () => (
  <svg
    viewBox="0 0 120 60"
    className="w-full"
    style={{ background: 'transparent', color: '#4e6645' }}
    aria-hidden
  >
    {points.map((point, i) => (
      <circle key={i} cx={point.x} cy={point.y} r={0.18} fill="currentColor" opacity={0.45} />
    ))}
    {/* Montréal / Québec — single dot */}
    <circle cx={35.5} cy={14.8} r={1.6} fill="#4e6645" opacity={0.9} />
    {/* Pulse ring */}
    <circle cx={35.5} cy={14.8} r={3} fill="none" stroke="#4e6645" strokeWidth={0.45} opacity={0.45}>
      <animate attributeName="r" values="3;6.5;3" dur="2.5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.45;0;0.45" dur="2.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

/* ─── Monitoring chart ──────────────────────────────────────── */

const chartData = [
  { month: 'Jan', soins: 56, matchs: 48 },
  { month: 'Fév', soins: 82, matchs: 75 },
  { month: 'Mar', soins: 126, matchs: 110 },
  { month: 'Avr', soins: 205, matchs: 188 },
  { month: 'Mai', soins: 280, matchs: 260 },
  { month: 'Juin', soins: 410, matchs: 390 },
];

const chartConfig = {
  soins: { label: 'Soins complétés', color: '#4e6645' },
  matchs: { label: 'Correspondances IA', color: '#98B690' },
} satisfies ChartConfig;

const MonitoringChart = () => (
  <ChartContainer className="aspect-auto h-72 md:h-80 w-full" config={chartConfig}>
    <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 8 }}>
      <defs>
        <linearGradient id="fillSoins" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4e6645" stopOpacity={0.35} />
          <stop offset="70%" stopColor="#4e6645" stopOpacity={0.02} />
        </linearGradient>
        <linearGradient id="fillMatchs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#98B690" stopOpacity={0.35} />
          <stop offset="70%" stopColor="#98B690" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <CartesianGrid vertical={false} stroke="#f1f5f9" />
      <XAxis
        dataKey="month"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        style={{ fontSize: '11px', fill: '#94a3b8' }}
      />
      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
      <Area
        strokeWidth={2}
        dataKey="matchs"
        type="natural"
        fill="url(#fillMatchs)"
        stroke="#98B690"
        stackId="a"
      />
      <Area
        strokeWidth={2}
        dataKey="soins"
        type="natural"
        fill="url(#fillSoins)"
        stroke="#4e6645"
        stackId="a"
      />
    </AreaChart>
  </ChartContainer>
);

/* ─── Animated chat bubbles ──────────────────────────────────── */

// Delays between each step (ms)
const STEP_DELAYS = [700, 1600, 1400, 2800];

type ChatMessage = { from: string; text: string; time?: string };

function AnimatedChat({ messages }: { messages: ChatMessage[] }) {
  const [step, setStep] = useState(0);
  // step 0 = empty, 1 = patient msg, 2 = system pill, 3 = nurse msg, 4 = pause → reset

  useEffect(() => {
    const delay = STEP_DELAYS[Math.min(step, STEP_DELAYS.length - 1)];
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep((s) => s + 1);
      } else {
        // pause then reset
        setTimeout(() => setStep(0), 2200);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-[160px]">
      <AnimatePresence>

        {/* Patient bubble */}
        {step >= 1 && (
          <motion.div
            key="patient"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center justify-center w-5 h-5 rounded-full border border-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              </span>
              <span className="text-xs" style={{ color: '#94a3b8' }}>{messages[0].time}</span>
            </div>
            <div className="bg-white border border-black/12 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs w-4/5 shadow-sm" style={{ color: '#1a1a24' }}>
              {messages[0].text}
            </div>
          </motion.div>
        )}

        {/* System pill */}
        {step >= 2 && (
          <motion.div
            key="system"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="bg-green-50 border border-green-200 rounded-full px-3 py-1 text-[10px] font-medium" style={{ color: '#4e6645' }}>
              ✓ {messages[1].text}
            </div>
          </motion.div>
        )}

        {/* Typing indicator — shows briefly before nurse reply */}
        {step === 2 && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-end"
          >
            <div className="bg-slate-900 rounded-2xl rounded-tr-none px-4 py-3 flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block"
                  style={{ animation: `bounce 1s ease-in-out ${i * 0.18}s infinite` }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Nurse reply */}
        {step >= 3 && (
          <motion.div
            key="nurse"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            className="flex flex-col items-end"
          >
            <div className="bg-slate-900 rounded-2xl rounded-tr-none px-3.5 py-2.5 text-xs text-white w-4/5">
              {messages[2].text}
            </div>
            <span className="text-[10px] mt-1 mr-1" style={{ color: '#94a3b8' }}>{messages[2].time}</span>
          </motion.div>
        )}

      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────── */

export const Features = () => {
  const { t } = useLanguage();

  const chatMessages: ChatMessage[] = [
    { from: 'patient', text: t('features.chat.patient'), time: t('features.chat.patientTime') },
    { from: 'system', text: t('features.chat.system') },
    { from: 'nurse', text: t('features.chat.nurse'), time: t('features.chat.nurseTime') },
  ];

  return (
    <section id="features" className="py-24" style={{ background: 'rgba(255,255,255,0.82)' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}
          >
            {t('features.title')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-light" style={{ color: '#5a5a6a' }}>
            {t('features.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto grid max-w-5xl border border-black/12 bg-white rounded-2xl overflow-hidden md:grid-cols-2">

            {/* ── Top-left: GPS tracking + dotted map ── */}
            <div className="flex flex-col">
              <div className="p-6 sm:p-10">
                <span className="flex items-center gap-2 text-sm font-medium" style={{ color: '#5a5a6a' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#4e6645' }} />
                  {t('features.gpsLabel')}
                </span>
                <p className="mt-6 text-2xl font-semibold tracking-tight" style={{ color: '#1a1a24' }}>
                  {t('features.gpsTitle')}
                </p>
              </div>

              {/* Map visual */}
              <div aria-hidden className="relative flex-1 min-h-[180px] overflow-hidden">
                {/* Location badge */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 bg-white border border-black/12 rounded-full px-3 py-1.5 text-xs font-medium shadow-md">
                      <span>🇨🇦</span>
                      <span style={{ color: '#1a1a24' }}>{t('features.quebecLabel')}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="bg-white border border-black/8 rounded-xl px-3 py-2 text-xs shadow-sm" style={{ color: '#5a5a6a' }}>
                      {t('features.activeNurses')}
                    </div>
                  </div>
                </div>
                {/* Fade overlay */}
                <div className="absolute inset-0 z-[1]"
                  style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.85) 100%)' }} />
                <MapView />
              </div>
            </div>

            {/* ── Top-right: Chat / messaging ── */}
            <div className="flex flex-col overflow-hidden border-t border-black/12 bg-slate-50/50 p-6 sm:p-10 md:border-t-0 md:border-l">
              <span className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: '#5a5a6a' }}>
                <MessageCircle className="w-4 h-4" style={{ color: '#4e6645' }} />
                {t('features.messagingLabel')}
              </span>
              <p className="text-2xl font-semibold tracking-tight mb-8" style={{ color: '#1a1a24' }}>
                {t('features.messagingTitle')}
              </p>

              {/* Animated chat */}
              <AnimatedChat messages={chatMessages} />
            </div>

            {/* ── Full-width stat bar ── */}
            <div className="col-span-full border-y border-black/12 px-12 py-10 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 bg-white">
              {[
                { value: t('features.stat.matchTime'), label: t('features.stat.matchLabel'), icon: <Activity className="w-4 h-4" style={{ color: '#4e6645' }} /> },
                { value: '98 %', label: t('features.stat.satisfactionLabel'), icon: <span className="text-base">★</span> },
                { value: '24/7', label: t('features.stat.availabilityLabel'), icon: <Clock className="w-4 h-4" style={{ color: '#4e6645' }} /> },
              ].map((stat) => (
                <div key={stat.label} className="text-center flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color: '#94a3b8' }}>
                    {stat.icon}
                    {stat.label}
                  </div>
                  <p className="text-4xl sm:text-5xl font-semibold tracking-tight" style={{ color: '#1a1a24', letterSpacing: '-0.03em' }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Full-width chart: activity feed ── */}
            <div className="relative col-span-full overflow-hidden bg-white">
              <div className="absolute z-10 max-w-sm px-6 pt-6 md:px-10 md:pt-10">
                <span className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: '#5a5a6a' }}>
                  <Activity className="w-4 h-4" style={{ color: '#4e6645' }} />
                  {t('features.activity.label')}
                </span>
                <p className="text-2xl font-semibold tracking-tight" style={{ color: '#1a1a24' }}>
                  {t('features.activity.title')}{' '}
                  <span style={{ color: '#94a3b8' }}>
                    {t('features.activity.subtitle')}
                  </span>
                </p>
              </div>
              <div className="pt-36 md:pt-40">
                <MonitoringChart />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
