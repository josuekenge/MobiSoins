'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import DottedMap from 'dotted-map';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  MapPin,
  ShieldCheck,
  Activity,
  Clock,
  Brain,
  HeartPulse,
  Plus,
  Minus,
  Star,
  Mail,
  Phone,
  Send,
  Calendar,
  Quote,
  User,
  Bell,
  CheckCircle2,
  MessageSquare,
  Home,
  Search,
  CalendarDays,
  Zap,
  Bookmark,
  Car,
} from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";
import './template.css';

/* ---------- Helpers ---------- */
function useCountUp(target: number, duration = 1600, decimals = 0) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    let raf = 0;

    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      run();
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { ref, val: decimals ? val.toFixed(decimals) : Math.round(val).toString() };
}

function useRevealOnIntersect<T extends HTMLElement>(rootMargin = '-80px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useRevealOnIntersect<HTMLDivElement>('-80px');
  return (
    <div
      ref={ref}
      className={`tp-reveal-fade ${inView ? 'tp-reveal-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

function ClipReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useRevealOnIntersect<HTMLSpanElement>('-50px');
  return (
    <span
      ref={ref}
      className={`tp-reveal-clip-outer ${inView ? 'tp-reveal-in' : ''}`}
    >
      <span
        className="tp-reveal-clip-inner"
        style={delay ? { transitionDelay: `${delay}s` } : undefined}
      >
        {children}
      </span>
    </span>
  );
}

/* ---------- UTC Clock ---------- */
function UtcClock() {
  const [time, setTime] = useState('UTC --:--:--');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getUTCHours().toString().padStart(2, '0');
      const m = d.getUTCMinutes().toString().padStart(2, '0');
      const s = d.getUTCSeconds().toString().padStart(2, '0');
      setTime(`UTC ${h}:${m}:${s}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

const RECRUITMENT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd_4xRpjxg-Yml0oJYwec5elHmVFI80Qfibk9HYGZMMnCREBg/viewform';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="absolute bottom-0 left-0 right-0 h-px bg-[var(--tp-accent)] origin-left"
      aria-hidden="true"
    />
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const { t, language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks: { name: string; href: string; external?: boolean }[] = [
    { name: t('header.howItWorks'), href: '#how-it-works' },
    { name: t('header.features'), href: '#features' },
    { name: t('header.services'), href: '#services' },
    { name: t('footer.blog'), href: '#blog' },
    { name: t('header.faq'), href: '#faq' },
    { name: t('header.recruitment'), href: RECRUITMENT_URL, external: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-[var(--tp-rule)] bg-[var(--tp-bg)]/90 backdrop-blur-xl">
      <ScrollProgress />
      <div className="flex items-center h-16 w-full px-[var(--tp-pad)] gap-6">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <svg className="w-6 h-6 text-[var(--tp-ink)]" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="13" strokeWidth="1.5" stroke="currentColor" fill="none" />
            <circle cx="16" cy="16" r="4" fill="currentColor" />
            <line x1="0" y1="16" x2="32" y2="16" strokeWidth="1.5" stroke="currentColor" />
          </svg>
          <span className="tp-heading text-sm tracking-[0.25em] uppercase tp-mono text-[var(--tp-ink)] font-semibold mt-0.5">
            MOBISOINS
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="px-3 lg:px-4 py-2 tp-mono text-[11px] uppercase tracking-widest text-[var(--tp-ink-2)] hover:text-[var(--tp-accent)] hover:bg-[var(--tp-rule-2)] transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: lang + CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0 ml-auto">
          <div className="flex items-center border border-[var(--tp-rule)] tp-mono text-[10px] uppercase tracking-widest">
            {(['FR', 'EN'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 transition-colors ${
                  language === lang
                    ? 'bg-[var(--tp-ink)] text-white'
                    : 'text-[var(--tp-ink-3)] hover:text-[var(--tp-ink)]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <a
            href="#deploy"
            className="tp-btn-glow h-9 px-5 tp-label flex items-center gap-2 font-semibold"
          >
            <span>{t('header.downloadApp')}</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden ml-auto w-10 h-10 flex items-center justify-center border border-[var(--tp-rule)] text-[var(--tp-ink)] hover:bg-[var(--tp-ink)] hover:text-white transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="md:hidden overflow-hidden border-t border-[var(--tp-rule)] bg-[var(--tp-bg)]"
      >
        <div className="flex flex-col py-4 px-[var(--tp-pad)] gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => setMobileOpen(false)}
              className="py-3 tp-mono text-xs uppercase tracking-widest text-[var(--tp-ink)] hover:text-[var(--tp-accent)] border-b border-[var(--tp-rule-2)] last:border-0"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between gap-4 mt-4 pt-4 border-t border-[var(--tp-rule)]">
            <div className="flex items-center border border-[var(--tp-rule)] tp-mono text-[10px] uppercase tracking-widest">
              {(['FR', 'EN'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 transition-colors ${
                    language === lang
                      ? 'bg-[var(--tp-ink)] text-white'
                      : 'text-[var(--tp-ink-3)]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <a
              href="#deploy"
              onClick={() => setMobileOpen(false)}
              className="tp-btn-glow h-9 px-5 tp-label flex items-center gap-2 font-semibold"
            >
              <span>{t('header.downloadApp')}</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}

function HeroStoreButton({ store }: { store: 'ios' | 'android' }) {
  const isIos = store === 'ios';
  return (
    <a
      href="#"
      className="group flex items-center gap-3 h-14 px-5 border border-[var(--tp-ink)] bg-[var(--tp-ink)] text-white hover:bg-[var(--tp-accent)] hover:border-[var(--tp-accent)] transition-colors"
      aria-label={isIos ? 'Download on the App Store' : 'Get it on Google Play'}
    >
      {isIos ? (
        <svg width="22" height="26" viewBox="0 0 814 1000" fill="white" className="shrink-0">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-108.3C27.1 766.2 0 633.6 0 506.6c0-204.9 133.4-313.1 264.4-313.1 69.4 0 127.1 45.5 170.4 45.5 41.3 0 106.1-49.2 185.8-49.2zm-181.7-111c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
        </svg>
      ) : (
        <svg width="22" height="26" viewBox="0 0 22 24" fill="none" className="shrink-0">
          <path d="M0.599609 0.540039L12.3996 12.0001L0.599609 23.4601C0.229609 23.1601 0 22.7001 0 22.1701V1.82004C0 1.29004 0.229609 0.840039 0.599609 0.540039Z" fill="#32BBFF" />
          <path d="M16.3994 8.08008L12.3994 12.0001L16.3994 15.9201L21.1994 13.2601C22.4594 12.5601 22.4594 11.4401 21.1994 10.7401L16.3994 8.08008Z" fill="#FFD700" />
          <path d="M0.599609 23.4601C0.989609 23.7801 1.51961 23.8601 2.09961 23.5601L14.1996 16.9401L12.3996 12.0001L0.599609 23.4601Z" fill="#FF3B30" />
          <path d="M14.1996 7.05957L2.09961 0.43957C1.51961 0.13957 0.989609 0.21957 0.599609 0.53957L12.3996 11.9996L14.1996 7.05957Z" fill="#00E676" />
        </svg>
      )}
      <div className="flex flex-col leading-tight">
        <span className="tp-mono text-[9px] uppercase tracking-widest text-white/70 group-hover:text-white/90 transition-colors">
          {isIos ? 'Download on the' : 'Get it on'}
        </span>
        <span className="tp-heading text-[15px] tracking-tight text-white">
          {isIos ? 'App Store' : 'Google Play'}
        </span>
      </div>
    </a>
  );
}

/* ---------- Frame Accoutrements ---------- */
function FrameAccoutrements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[90] hidden md:block mix-blend-difference text-white/40">
      <div className="absolute top-[var(--tp-pad)] left-[var(--tp-pad)] tp-mono tp-micro">SYS.001 / MOBISOINS</div>
      <div className="absolute top-[var(--tp-pad)] right-[var(--tp-pad)] tp-mono tp-micro text-right">
        <UtcClock />
      </div>
      <div className="absolute bottom-[var(--tp-pad)] left-[var(--tp-pad)] tp-mono tp-micro">
        LAT: 45.5017°N
        <br />
        LON: 73.5673°W
      </div>
      <div className="absolute bottom-[var(--tp-pad)] right-[var(--tp-pad)] tp-mono tp-micro text-right">
        PROTOCOL: V1.0
        <br />
        STATUS: ACTIVE
      </div>
      <div className="tp-crosshair top-[var(--tp-pad)] left-[var(--tp-pad)] -translate-x-1/2 -translate-y-1/2" />
      <div className="tp-crosshair top-[var(--tp-pad)] right-[var(--tp-pad)] translate-x-1/2 -translate-y-1/2" />
      <div className="tp-crosshair bottom-[var(--tp-pad)] left-[var(--tp-pad)] -translate-x-1/2 translate-y-1/2" />
      <div className="tp-crosshair bottom-[var(--tp-pad)] right-[var(--tp-pad)] translate-x-1/2 translate-y-1/2" />
    </div>
  );
}

/* ---------- Phone Mockup (brutalist app UI) ---------- */
function PhoneMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-10 px-4">
      {/* Phone frame */}
      <div className="relative w-[260px] h-[540px] bg-[var(--tp-ink)] rounded-[2.25rem] p-[6px] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.45)] shrink-0">
        <div className="relative w-full h-full bg-[var(--tp-bg)] rounded-[2rem] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[var(--tp-ink)] rounded-full z-30" />

          {/* Status bar */}
          <div className="pt-2.5 px-5 flex justify-between items-center tp-mono text-[9px] text-[var(--tp-ink)] z-10 relative">
            <span className="font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-2 border border-current rounded-sm" />
            </div>
          </div>

          {/* App content */}
          <div className="px-3 pt-3 pb-16 space-y-2.5">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="tp-heading text-[15px] text-[var(--tp-ink)] tracking-tight">MobiSoins</div>
                <div className="tp-mono text-[8px] text-[var(--tp-ink-3)] flex items-center gap-1 mt-0.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  En ligne
                </div>
              </div>
              <div className="w-7 h-7 bg-[var(--tp-accent)] flex items-center justify-center">
                <Bell className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* DISPO + PROCHAIN cards */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="border border-[var(--tp-rule)] p-2 flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="13" stroke="var(--tp-rule)" strokeWidth="3" fill="none" />
                      <circle cx="16" cy="16" r="13" stroke="var(--tp-accent)" strokeWidth="3" fill="none" strokeDasharray="82" strokeDashoffset="4" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center tp-mono text-[7px] font-semibold text-[var(--tp-ink)]">95%</div>
                  </div>
                  <div className="tp-mono text-[7px] uppercase tracking-widest text-[var(--tp-ink-3)]">DISPO</div>
                </div>
                <div className="tp-heading text-base text-[var(--tp-ink)] mt-1 leading-none">24/7</div>
              </div>
              <div className="bg-[var(--tp-ink)] text-white p-2 flex flex-col">
                <div className="tp-mono text-[7px] uppercase tracking-widest text-[var(--tp-accent)]">PROCHAIN</div>
                <div className="tp-heading text-base text-white mt-0.5 leading-none">14:00</div>
                <div className="tp-mono text-[8px] text-white/70 mt-1">Inf. Sarah B.</div>
              </div>
            </div>

            {/* Weekly chart */}
            <div className="border border-[var(--tp-rule)] p-2.5">
              <div className="flex justify-between items-center mb-1.5">
                <span className="tp-mono text-[8px] uppercase tracking-widest text-[var(--tp-ink-3)]">SOINS CETTE SEMAINE</span>
                <span className="tp-mono text-[8px] text-emerald-600 bg-emerald-50 px-1 py-0.5">+18%</span>
              </div>
              <svg viewBox="0 0 100 30" className="w-full h-9" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="phoneChart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--tp-accent)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--tp-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,25 Q15,20 25,18 T50,12 T75,7 T100,5 L100,30 L0,30 Z" fill="url(#phoneChart)" />
                <path d="M0,25 Q15,20 25,18 T50,12 T75,7 T100,5" fill="none" stroke="var(--tp-accent)" strokeWidth="1.5" />
                <circle cx="100" cy="5" r="1.5" fill="var(--tp-accent)" />
              </svg>
            </div>

            {/* Matching IA */}
            <div className="border border-[var(--tp-rule)] p-2 flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--tp-accent)] flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="tp-heading text-[10px] text-[var(--tp-ink)] leading-tight">Matching IA</div>
                <div className="tp-mono text-[8px] text-[var(--tp-ink-3)] mt-0.5">3 infirmières trouvées</div>
              </div>
              <div className="flex shrink-0">
                {[
                  { l: 'SB', c: 'bg-[var(--tp-accent)]' },
                  { l: 'ML', c: 'bg-emerald-500' },
                  { l: 'JR', c: 'bg-orange-500' },
                ].map((a, i) => (
                  <div
                    key={a.l}
                    className={`w-5 h-5 rounded-full ${a.c} text-white tp-mono text-[7px] flex items-center justify-center border border-[var(--tp-bg)] ${i > 0 ? '-ml-1.5' : ''}`}
                  >
                    {a.l}
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="border border-[var(--tp-rule)] p-2">
              <div className="tp-mono text-[8px] uppercase tracking-widest text-[var(--tp-ink-3)] mb-1.5">
                ACTIVITÉ RÉCENTE
              </div>
              <div className="space-y-1.5">
                {[
                  { icon: CheckCircle2, title: 'Soin complété', sub: 'Prise de sang — 12h30' },
                  { icon: MessageSquare, title: 'Nouveau message', sub: 'Inf. Sarah B.' },
                  { icon: CalendarDays, title: 'RDV confirmé', sub: 'Demain, 14:00' },
                ].map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-[var(--tp-rule)] flex items-center justify-center shrink-0">
                        <Icon className="w-2.5 h-2.5 text-[var(--tp-ink)]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="tp-heading text-[9px] text-[var(--tp-ink)] leading-tight">{a.title}</div>
                        <div className="tp-mono text-[7px] text-[var(--tp-ink-3)] mt-0.5">{a.sub}</div>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-[var(--tp-accent)] shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Services populaires */}
            <div>
              <div className="tp-mono text-[8px] uppercase tracking-widest text-[var(--tp-ink-3)] mb-1.5">
                SERVICES POPULAIRES
              </div>
              <div className="flex gap-1 flex-wrap">
                <span className="tp-mono text-[8px] bg-[var(--tp-ink)] text-white px-1.5 py-1 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[var(--tp-accent)]" />
                  Vaccination
                </span>
                {['Pansement', 'Bilan', 'Suivi'].map((s) => (
                  <span key={s} className="tp-mono text-[8px] border border-[var(--tp-rule)] px-1.5 py-1 text-[var(--tp-ink)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom tab bar */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--tp-rule)] bg-[var(--tp-bg)] px-2 py-1.5 grid grid-cols-5 gap-1">
            {[
              { label: 'Accueil', Icon: Home, active: true },
              { label: 'Recherche', Icon: Search, active: false },
              { label: 'Réserver', Icon: CalendarDays, active: false },
              { label: 'Messages', Icon: MessageSquare, active: false },
              { label: 'Profil', Icon: User, active: false },
            ].map((tab) => {
              const I = tab.Icon;
              return (
                <div
                  key={tab.label}
                  className={`flex flex-col items-center gap-0.5 ${
                    tab.active ? 'text-[var(--tp-accent)]' : 'text-[var(--tp-ink-3)]'
                  }`}
                >
                  <I className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <div className="tp-mono text-[7px] uppercase tracking-widest">{tab.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating card: 500+ Infirmières */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="hidden xl:flex absolute top-12 right-2 bg-[var(--tp-bg)] border border-[var(--tp-ink)] px-4 py-3 items-center gap-3 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] z-20"
      >
        <div className="w-9 h-9 bg-[var(--tp-accent)] flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <div className="tp-heading text-xl text-[var(--tp-ink)] leading-none">500+</div>
          <div className="tp-mono text-[9px] uppercase tracking-widest text-[var(--tp-ink-3)] mt-1">
            Infirmières OIIQ
          </div>
        </div>
      </motion.div>

      {/* Floating card: 4.9/5 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="hidden xl:flex absolute bottom-20 right-0 bg-[var(--tp-bg)] border border-[var(--tp-ink)] px-3 py-2.5 items-center gap-2 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] z-20"
      >
        <Star className="w-4 h-4 fill-[var(--tp-accent)] text-[var(--tp-accent)]" strokeWidth={1.5} />
        <div className="tp-heading text-base text-[var(--tp-ink)] leading-none">4.9/5</div>
        <div className="tp-mono text-[9px] uppercase tracking-widest text-[var(--tp-ink-3)] border-l border-[var(--tp-rule)] pl-2">
          Satisfaction
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Notification Panel (live booking flow) ---------- */
const BOOKING_NOTIFICATIONS = [
  { Icon: Bookmark, name: 'Réservation confirmée', desc: 'Infirmière disponible ce soir à 18h30', time: "À l'instant" },
  { Icon: Car, name: 'Infirmière en route', desc: 'Sarah B. · 8 min de chez vous', time: '2 min' },
  { Icon: Home, name: 'Infirmière arrivée', desc: 'Sarah B. est à votre porte', time: '10 min' },
  { Icon: CheckCircle2, name: 'Soin complété', desc: "Rapport clinique disponible dans l'app", time: '45 min' },
];

function NotificationPanel() {
  return (
    <div className="absolute inset-0 bg-[var(--tp-ink)] text-white p-6 lg:p-8 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--tp-accent)] animate-pulse" />
            <span className="tp-heading text-base lg:text-lg text-white tracking-tight">MobiSoins</span>
          </div>
          <div className="tp-mono text-[9px] uppercase tracking-widest text-[var(--tp-ink-4)] mt-1.5">
            Notifications en direct
          </div>
        </div>
        <div className="tp-mono text-[9px] uppercase tracking-widest text-[var(--tp-accent)] border border-[var(--tp-accent)] px-2 py-1 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[var(--tp-accent)] animate-pulse" />
          EN DIRECT
        </div>
      </div>

      {/* Notification list */}
      <div className="flex-1 flex flex-col gap-2 py-5 min-h-0">
        {BOOKING_NOTIFICATIONS.map((n, i) => (
          <NotificationCard key={n.name} item={n} delay={0.15 * i} />
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10 flex justify-between items-center tp-mono text-[9px] uppercase tracking-widest text-[var(--tp-ink-4)]">
        <span>Mise à jour en temps réel</span>
        <span className="text-[var(--tp-accent)]">/// LIVE STREAM</span>
      </div>
    </div>
  );
}

function NotificationCard({
  item,
  delay,
}: {
  item: (typeof BOOKING_NOTIFICATIONS)[number];
  delay: number;
}) {
  const { ref, inView } = useRevealOnIntersect<HTMLDivElement>('-60px');
  return (
    <div
      ref={ref}
      className={`tp-reveal-slide-x ${inView ? 'tp-reveal-in' : ''} flex items-start gap-3 border border-white/10 bg-white/[0.03] p-3 hover:bg-white/[0.06] transition-colors`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      <div className="w-9 h-9 bg-[var(--tp-accent)] flex items-center justify-center shrink-0">
        <item.Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline gap-2">
          <span className="tp-heading text-sm text-white truncate">{item.name}</span>
          <span className="tp-mono text-[9px] uppercase tracking-widest text-[var(--tp-ink-4)] shrink-0">
            {item.time}
          </span>
        </div>
        <div className="font-light text-xs text-[var(--tp-ink-4)] mt-1 leading-snug">{item.desc}</div>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const { t } = useLanguage();
  const vo2 = useCountUp(98, 1800);
  const hrv = useCountUp(847, 1800);
  const sleep = useCountUp(24, 1500);
  return (
    <section id="top" className="relative min-h-[100svh] w-full pt-16 flex flex-col tp-bg-grid scroll-mt-16">
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 w-full border-b border-[var(--tp-rule)]">
        {/* Left typographic column */}
        <div className="lg:col-span-8 flex flex-col justify-end p-[var(--tp-pad)] pb-[10vh] border-r border-[var(--tp-rule)]">
          <div className="mb-auto pt-8">
            <Reveal>
              <span className="tp-mono tp-micro bg-[var(--tp-ink)] text-[var(--tp-bg)] px-2 py-1 tracking-widest">
                [ 000 ] {t('hero.availableInQuebec').toUpperCase()}
              </span>
            </Reveal>
          </div>

          <h1 className="tp-heading text-[clamp(3rem,8vw,8.5rem)] leading-[0.88] text-[var(--tp-ink)] uppercase flex flex-col gap-2 mt-20">
            <ClipReveal delay={0.1}>{t('hero.title')}</ClipReveal>
            <ClipReveal delay={0.2}>
              <span className="tp-serif-italic normal-case tracking-normal">{t('hero.titleHighlight').split(' ').slice(0, 2).join(' ')}</span>
            </ClipReveal>
            <ClipReveal delay={0.3}>
              <span>{t('hero.titleHighlight').split(' ').slice(2).join(' ') || 'À DOMICILE.'}</span>
            </ClipReveal>
          </h1>

          <Reveal delay={0.5}>
            <p className="mt-12 font-light text-[clamp(1rem,1.4vw,1.25rem)] text-[var(--tp-ink-2)] max-w-[50ch] leading-[1.6]">
              {t('hero.subtitle')} <strong className="text-[var(--tp-ink)] font-normal">{t('pillars.title')}</strong>
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex items-center gap-4 mt-10">
              <button className="tp-btn-brutal h-14 px-8 tp-label group">
                <span className="relative z-10 flex items-center gap-3">
                  {t('hero.bookNow')}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </span>
              </button>
              <div className="hidden sm:flex flex-col tp-mono tp-micro text-[var(--tp-ink-3)] leading-relaxed border-l border-[var(--tp-rule)] pl-4">
                <span>// {t('hero.pitchDeck').toUpperCase()}</span>
                <span>// OIIQ CERTIFIED</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.75}>
            <div className="mt-8 flex flex-col gap-3">
              <div className="tp-label text-[var(--tp-ink-3)] flex items-center gap-2">
                <span className="w-4 h-px bg-[var(--tp-ink-3)]" />
                {t('tp.alsoOn').toUpperCase()}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <HeroStoreButton store="ios" />
                <HeroStoreButton store="android" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right telemetry dashboard */}
        <div className="hidden lg:flex lg:col-span-4 flex-col bg-[var(--tp-bg-card)]/50 backdrop-blur-md relative">
          <div className="absolute inset-0 tp-bg-grid opacity-50 pointer-events-none" />

          <div className="p-6 border-b border-[var(--tp-rule)] bg-[var(--tp-bg)] flex justify-between items-center z-10">
            <span className="tp-mono tp-micro tracking-widest text-[var(--tp-ink-2)]">LIVE NETWORK TELEMETRY</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--tp-accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--tp-accent)]" />
            </span>
          </div>

          <Reveal delay={0.7} className="border-b border-[var(--tp-rule)] flex-1 flex">
            <div className="p-8 flex-1 flex flex-col justify-center relative group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[var(--tp-accent-glow)] to-transparent pointer-events-none" />
              <span className="tp-label text-[var(--tp-ink-3)] mb-2">
                {t('stats.satisfaction').toUpperCase()}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="tp-heading text-6xl text-[var(--tp-ink)] tabular-nums">
                  <span ref={vo2.ref}>{vo2.val}</span>
                </span>
                <span className="tp-mono text-sm text-[var(--tp-accent-ink)] font-semibold bg-[var(--tp-accent)] px-1.5 py-0.5">%</span>
              </div>
              <svg className="w-full h-12 mt-6 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path
                  d="M0,25 Q10,25 20,20 T40,15 T60,10 T80,5 T100,2"
                  fill="none"
                  stroke="var(--tp-ink)"
                  strokeWidth="1.5"
                  className="tp-svg-spark"
                />
                <circle cx="100" cy="2" r="2" fill="var(--tp-accent)" />
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0.8} className="border-b border-[var(--tp-rule)] flex-1 flex">
            <div className="p-8 flex-1 flex flex-col justify-center relative group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[var(--tp-ink)] to-transparent pointer-events-none" />
              <span className="tp-label text-[var(--tp-ink-3)] mb-2 group-hover:text-white transition-colors">
                {t('stats.nurses').toUpperCase()} (OIIQ)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="tp-heading text-6xl text-[var(--tp-ink)] group-hover:text-white transition-colors tabular-nums">
                  <span ref={hrv.ref}>{hrv.val}</span>
                </span>
                <span className="tp-mono text-sm text-[var(--tp-ink-3)] group-hover:text-[var(--tp-accent)] transition-colors">
                  active
                </span>
              </div>
              <div className="w-full bg-[var(--tp-rule)] h-[1px] mt-8 relative">
                <div
                  className="absolute left-0 top-0 h-[1px] bg-[var(--tp-ink)] group-hover:bg-[var(--tp-accent)] transition-colors"
                  style={{ width: '78%' }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.9} className="flex-1 flex">
            <div className="p-8 flex-1 flex flex-col justify-center bg-[var(--tp-ink)] text-[var(--tp-bg)] relative overflow-hidden group">
              <span className="tp-label text-[var(--tp-ink-4)] mb-2">
                AVG. RESPONSE TIME
              </span>
              <div className="flex items-baseline gap-2">
                <span className="tp-heading text-6xl tabular-nums">
                  <span ref={sleep.ref}>{sleep.val}</span>
                </span>
                <span className="tp-mono text-sm text-[var(--tp-accent)]">min / call</span>
              </div>
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="20" />
                  <line x1="50" y1="10" x2="50" y2="90" />
                  <line x1="10" y1="50" x2="90" y2="50" />
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <CoverageMarquee />
    </section>
  );
}

const COVERAGE_REGIONS: { name: string; code: string; status: 'live' | 'soon' | 'planned' }[] = [
  { name: 'Québec', code: 'QC', status: 'live' },
  { name: 'Ontario', code: 'ON', status: 'planned' },
  { name: 'British Columbia', code: 'BC', status: 'planned' },
  { name: 'Alberta', code: 'AB', status: 'planned' },
  { name: 'Manitoba', code: 'MB', status: 'planned' },
  { name: 'Saskatchewan', code: 'SK', status: 'planned' },
  { name: 'Nova Scotia', code: 'NS', status: 'planned' },
  { name: 'New Brunswick', code: 'NB', status: 'planned' },
  { name: 'Newfoundland & Labrador', code: 'NL', status: 'planned' },
  { name: 'Prince Edward Island', code: 'PE', status: 'planned' },
  { name: 'Yukon', code: 'YT', status: 'planned' },
  { name: 'Northwest Territories', code: 'NT', status: 'planned' },
  { name: 'Nunavut', code: 'NU', status: 'planned' },
  { name: 'United States', code: 'US', status: 'soon' },
];

function CoverageMarquee() {
  const { t } = useLanguage();
  return (
    <div className="w-full border-b border-[var(--tp-rule)] bg-[var(--tp-ink)] text-[var(--tp-bg)] overflow-hidden">
      <div className="flex items-center border-b border-white/10">
        <div className="px-[var(--tp-pad)] py-2.5 tp-mono text-[10px] uppercase tracking-widest text-[var(--tp-ink-4)] border-r border-white/10 shrink-0 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--tp-accent)] animate-pulse" />
          {t('tp.coverage.regionsLabel').toUpperCase()}
        </div>
        <div className="px-[var(--tp-pad)] py-2.5 tp-mono text-[10px] uppercase tracking-widest text-[var(--tp-ink-4)] shrink-0 hidden md:flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--tp-accent)]" /> {t('tp.coverage.live').toUpperCase()}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full border border-[var(--tp-ink-4)]" /> {t('tp.coverage.expansion').toUpperCase()}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" /> {t('tp.coverage.comingSoon').toUpperCase()}
          </span>
        </div>
        <div className="ml-auto px-[var(--tp-pad)] py-2.5 tp-mono text-[10px] uppercase tracking-widest text-[var(--tp-ink-4)] border-l border-white/10 shrink-0 hidden lg:block">
          {t('tp.coverage.regionsCount')}
        </div>
      </div>
      <div className="py-3.5 tp-ticker-container cursor-ew-resize">
        <div className="tp-ticker-track flex items-center">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex items-center shrink-0">
              {COVERAGE_REGIONS.map((r, i) => (
                <CoverageItem key={`${dup}-${i}`} region={r} />
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoverageItem({ region }: { region: (typeof COVERAGE_REGIONS)[number] }) {
  const dotClass =
    region.status === 'live'
      ? 'bg-[var(--tp-accent)] animate-pulse'
      : region.status === 'soon'
        ? 'bg-white'
        : 'border border-[var(--tp-ink-4)]';
  const codeClass =
    region.status === 'live'
      ? 'bg-[var(--tp-accent)] text-white border-[var(--tp-accent)]'
      : region.status === 'soon'
        ? 'bg-white text-[var(--tp-ink)] border-white'
        : 'border-white/20 text-[var(--tp-ink-4)]';
  return (
    <span className="flex items-center gap-3 px-7 whitespace-nowrap">
      <span className={`w-2 h-2 rounded-full ${dotClass}`} />
      <span
        className={`tp-mono text-[10px] uppercase tracking-widest border px-1.5 py-0.5 ${codeClass}`}
      >
        {region.code}
      </span>
      <span className="tp-heading text-[15px] tracking-tight text-white">
        {region.name}
      </span>
      {region.status === 'soon' && (
        <span className="tp-mono text-[9px] uppercase tracking-widest text-[var(--tp-accent)] border border-[var(--tp-accent)] px-1.5 py-0.5">
          Coming Soon
        </span>
      )}
      <span className="text-[var(--tp-ink-4)] opacity-30 ml-4">///</span>
    </span>
  );
}

/* ---------- Product Showcase (phone) ---------- */
function ProductShowcase() {
  const { t } = useLanguage();
  return (
    <section className="relative px-[var(--tp-pad)] py-24 lg:py-32 bg-[var(--tp-bg)] border-b border-[var(--tp-rule)] overflow-hidden tp-bg-grid">
      <div className="max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Left: copy */}
        <Reveal className="lg:col-span-7">
          <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)] block mb-6">
            [ APP ] / LIVE PRODUCT PREVIEW
          </span>
          <h2 className="tp-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] text-[var(--tp-ink)] uppercase mb-6">
            {t('tp.showcase.title')}
            <br />
            <span className="tp-serif-italic normal-case text-[1.05em]">{t('tp.showcase.titleItalic')}</span>
          </h2>
          <p className="font-light text-lg text-[var(--tp-ink-2)] leading-[1.6] max-w-[55ch] mb-10">
            {t('tp.showcase.desc')}
            <strong className="text-[var(--tp-ink)] font-normal">{t('tp.showcase.descBold')}</strong>
            {t('tp.showcase.descTrail')}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--tp-rule)] border border-[var(--tp-rule)] mb-10">
            {[
              { k: 'INSCRIPTION', v: '60 sec' },
              { k: 'MATCHING IA', v: '< 5 sec' },
              { k: 'ETA MOY.', v: '24 min' },
              { k: 'OIIQ VÉRIFIÉ', v: '100%' },
              { k: 'RAPPORT CLIN.', v: 'IN-APP' },
              { k: 'COÛT', v: 'GRATUIT' },
            ].map((spec) => (
              <div key={spec.k} className="bg-[var(--tp-bg-card)] p-4">
                <div className="tp-label text-[var(--tp-ink-3)] mb-1">{spec.k}</div>
                <div className="tp-heading text-lg text-[var(--tp-ink)]">{spec.v}</div>
              </div>
            ))}
          </div>

          <a
            href="#deploy"
            className="tp-mono text-[10px] uppercase tracking-widest text-[var(--tp-ink)] border-b border-[var(--tp-ink)] pb-1 hover:text-[var(--tp-accent)] hover:border-[var(--tp-accent)] transition-colors inline-flex items-center gap-2"
          >
            {t('hero.bookNow')}
            <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
          </a>
        </Reveal>

        {/* Right: phone + store buttons */}
        <Reveal delay={0.2} className="lg:col-span-5">
          <div className="flex flex-col items-center gap-2 lg:gap-4">
            <PhoneMockup />
            <div className="flex flex-col items-center gap-3">
              <div className="tp-label text-[var(--tp-ink-3)] flex items-center gap-2">
                <span className="w-4 h-px bg-[var(--tp-ink-3)]" />
                {t('tp.showcase.downloadDivider')}
                <span className="w-4 h-px bg-[var(--tp-ink-3)]" />
              </div>
              <div className="flex flex-row items-center justify-center gap-3 flex-nowrap">
                <HeroStoreButton store="ios" />
                <HeroStoreButton store="android" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- /001/ Doctrine Bento ---------- */
function Doctrine() {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-32 px-[var(--tp-pad)] bg-[var(--tp-bg-alt)] scroll-mt-16">
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="tp-bento-grid shadow-2xl">
            {/* Title block */}
            <div className="col-span-12 lg:col-span-4 tp-bento-item p-10 flex flex-col justify-between aspect-square lg:aspect-auto">
              <div className="flex justify-between items-start">
                <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)] bg-[var(--tp-rule-2)] px-2 py-1">
                  [ 001 ] / {t('pillars.badge')}
                </span>
                <div className="w-10 h-10 border border-[var(--tp-ink)] rounded-full flex items-center justify-center tp-serif-italic text-xl">
                  M
                </div>
              </div>
              <h2 className="tp-heading text-[clamp(2rem,3.5vw,3.5rem)] leading-[0.95] text-[var(--tp-ink)] uppercase mt-12 lg:mt-auto">
                {t('pillars.title').replace('.', '')}{' '}
                <span className="tp-serif-italic normal-case text-[1.05em] text-[var(--tp-accent-ink)] bg-[var(--tp-accent)] px-2 block w-fit mt-2">
                  modern.
                </span>
              </h2>
            </div>

            {/* Notification panel — real product output */}
            <div className="col-span-12 lg:col-span-8 tp-bento-item relative overflow-hidden min-h-[40vh] lg:min-h-[36rem]">
              <NotificationPanel />
            </div>

            {/* Pillar 1 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 tp-bento-item p-10 group hover:bg-[var(--tp-ink)] hover:text-[var(--tp-bg)] transition-colors duration-500">
              <div className="tp-mono text-[10px] text-[var(--tp-accent)] mb-6 flex items-center gap-2">
                <div className="w-4 h-[1px] bg-current" /> 01_{t('pillars.card1Title').toUpperCase()}
              </div>
              <p className="font-light text-lg leading-[1.7] text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors">
                {t('pillars.card1Desc')}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 tp-bento-item p-10 group hover:bg-[var(--tp-ink)] hover:text-[var(--tp-bg)] transition-colors duration-500">
              <div className="tp-mono text-[10px] text-[var(--tp-accent)] mb-6 flex items-center gap-2">
                <div className="w-4 h-[1px] bg-current" /> 02_{t('pillars.card2Title').toUpperCase()}
              </div>
              <p className="font-light text-lg leading-[1.7] text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors">
                {t('pillars.card2Desc')}
              </p>
            </div>

            {/* Pillar 3 — matches the other two cards */}
            <div className="col-span-12 lg:col-span-4 tp-bento-item p-10 group hover:bg-[var(--tp-ink)] hover:text-[var(--tp-bg)] transition-colors duration-500 flex flex-col justify-between">
              <div className="tp-mono text-[10px] text-[var(--tp-accent)] mb-6 flex items-center gap-2">
                <div className="w-4 h-[1px] bg-current" /> 03_{t('pillars.card3Title').toUpperCase()}
              </div>
              <ul className="tp-mono text-xs uppercase tracking-widest space-y-3 mb-8">
                <li className="flex justify-between items-center border-b border-[var(--tp-rule)] group-hover:border-white/20 transition-colors pb-2">
                  <span className="text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors">OIIQ Members</span>
                  <span className="text-[var(--tp-ink)] group-hover:text-white transition-colors">100%</span>
                </li>
                <li className="flex justify-between items-center border-b border-[var(--tp-rule)] group-hover:border-white/20 transition-colors pb-2">
                  <span className="text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors">Encrypted Data</span>
                  <span className="text-[var(--tp-ink)] group-hover:text-white transition-colors">AES-256</span>
                </li>
                <li className="flex justify-between items-center border-b border-[var(--tp-rule)] group-hover:border-white/20 transition-colors pb-2">
                  <span className="text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors">Avg Response</span>
                  <span className="text-[var(--tp-ink)] group-hover:text-white transition-colors">{'< 25 min'}</span>
                </li>
              </ul>
              <div className="mt-auto">
                <div className="tp-serif-italic text-3xl text-[var(--tp-ink)] group-hover:text-white transition-colors mb-2">
                  {t('pillars.card3Title')}
                </div>
                <span className="tp-label text-[var(--tp-ink-3)] group-hover:text-[var(--tp-accent)] transition-colors">CORE PROMISE</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- /002/ Services Terminal ---------- */
function ServicesTerminal() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0);

  const services = [
    {
      code: 'SRV-01',
      title: t('howItWorks.step1Title'),
      desc: t('howItWorks.step1Description'),
      icon: Clock,
      specs: [
        { k: 'AVG TIME', v: '2 min' },
        { k: 'AVAILABILITY', v: '24/7' },
        { k: 'CONFIRMATION', v: 'INSTANT' },
      ],
    },
    {
      code: 'SRV-02',
      title: t('howItWorks.step2Title'),
      desc: t('howItWorks.step2Description'),
      icon: MapPin,
      specs: [
        { k: 'TRACKING', v: 'REAL-TIME' },
        { k: 'ETA UPDATES', v: 'LIVE' },
        { k: 'MAP', v: 'INTEGRATED' },
      ],
    },
    {
      code: 'SRV-03',
      title: t('howItWorks.step3Title'),
      desc: t('howItWorks.step3Description'),
      icon: HeartPulse,
      specs: [
        { k: 'QUALITY', v: 'HOSPITAL-GRADE' },
        { k: 'REPORT', v: 'IN-APP' },
        { k: 'FOLLOW-UP', v: 'INCLUDED' },
      ],
    },
    {
      code: 'SRV-04',
      title: t('features.aiMatching.title'),
      desc: t('features.aiMatching.description'),
      icon: Brain,
      specs: [
        { k: 'ALGORITHM', v: 'AI/ML' },
        { k: 'MATCH RATE', v: '98%' },
        { k: 'CRITERIA', v: 'MULTI-FACTOR' },
      ],
    },
    {
      code: 'SRV-05',
      title: t('features.monitoring.title'),
      desc: t('features.monitoring.description'),
      icon: Activity,
      specs: [
        { k: 'HISTORY', v: 'PERSISTENT' },
        { k: 'EXPORT', v: 'PDF/SHARE' },
        { k: 'PHYSICIAN', v: 'COMPATIBLE' },
      ],
    },
    {
      code: 'SRV-06',
      title: t('features.certified'),
      desc: t('features.certifiedDescription'),
      icon: ShieldCheck,
      specs: [
        { k: 'CERT', v: 'OIIQ' },
        { k: 'INSURANCE', v: 'INCLUDED' },
        { k: 'BACKGROUND', v: 'VERIFIED' },
      ],
    },
  ];

  const active = services[selected];
  const ActiveIcon = active.icon;

  return (
    <section id="how-it-works" className="py-32 px-[var(--tp-pad)] bg-[var(--tp-bg)] scroll-mt-16">
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div>
              <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)] block mb-6">
                [ 002 ] / {t('services.badge').toUpperCase()}
              </span>
              <h2 className="tp-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] text-[var(--tp-ink)] uppercase">
                {t('tp.services.title')}
                <br />
                <span className="text-[var(--tp-ink-4)]">{t('tp.services.subtitle')}</span>
              </h2>
            </div>
            <p className="font-light text-lg text-[var(--tp-ink-2)] max-w-[32ch] leading-[1.6]">
              {t('tp.services.lede')}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="border border-[var(--tp-ink)] bg-[var(--tp-bg-card)] flex flex-col lg:flex-row min-h-[45rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-8 border-b border-[var(--tp-rule)] bg-[var(--tp-bg-alt)] flex items-center px-4 gap-2 z-20">
              <div className="w-2.5 h-2.5 rounded-full border border-[var(--tp-ink-3)]" />
              <div className="w-2.5 h-2.5 rounded-full border border-[var(--tp-ink-3)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--tp-ink-3)]" />
              <span className="tp-label-sm ml-4 text-[var(--tp-ink-3)]">
                MOBISOINS_SERVICES_OS_V1
              </span>
            </div>

            {/* Left list */}
            <div className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-[var(--tp-rule)] bg-[var(--tp-bg-alt)] flex flex-col pt-8 relative z-10">
              <div className="px-6 py-4 border-b border-[var(--tp-rule)] flex justify-between items-center tp-label text-[var(--tp-ink-2)] bg-white/50 backdrop-blur">
                <span>SELECT MODULE</span>
                <span>
                  {String(selected + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto tp-scrollbar-hide">
                {services.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = i === selected;
                  return (
                    <button
                      key={s.code}
                      onClick={() => setSelected(i)}
                      className={`w-full text-left px-6 py-5 border-b border-[var(--tp-rule)] transition-colors flex items-center gap-4 group ${
                        isActive
                          ? 'bg-[var(--tp-ink)] text-white'
                          : 'hover:bg-white/50 text-[var(--tp-ink)]'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 transition-colors ${
                          isActive ? 'text-[var(--tp-accent)]' : 'text-[var(--tp-ink-3)] group-hover:text-[var(--tp-accent)]'
                        }`}
                        strokeWidth={1.5}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="tp-label-sm opacity-60 mb-1">{s.code}</div>
                        <div className="text-sm font-medium leading-tight truncate">{s.title}</div>
                      </div>
                      <ArrowUpRight
                        className={`w-4 h-4 shrink-0 transition-all ${
                          isActive ? 'text-[var(--tp-accent)] translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right detail */}
            <div className="w-full lg:w-[65%] bg-[var(--tp-bg)] pt-8 flex flex-col relative z-10">
              <div className="px-10 py-4 border-b border-[var(--tp-rule)] flex justify-between items-center tp-label text-[var(--tp-ink-2)] bg-[var(--tp-bg)]">
                <span>SPECIFICATION SHEET</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--tp-accent)] rounded-full animate-pulse" /> ONLINE
                </span>
              </div>

              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="p-10 flex-1 flex flex-col"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="tp-label text-[var(--tp-accent)] mb-3">
                      {active.code} // {t('howItWorks.title').toUpperCase()}
                    </div>
                    <h3 className="tp-heading text-[clamp(2rem,4vw,3.5rem)] text-[var(--tp-ink)] leading-[0.95]">
                      {active.title}
                    </h3>
                  </div>
                  <div className="w-16 h-16 border border-[var(--tp-ink)] flex items-center justify-center shrink-0 ml-6">
                    <ActiveIcon className="w-7 h-7 text-[var(--tp-ink)]" strokeWidth={1.25} />
                  </div>
                </div>

                <p className="font-light text-lg text-[var(--tp-ink-2)] leading-[1.7] max-w-[55ch] mb-10">{active.desc}</p>

                <div className="mt-auto grid grid-cols-3 gap-px bg-[var(--tp-rule)] border border-[var(--tp-rule)]">
                  {active.specs.map((spec) => (
                    <div key={spec.k} className="bg-[var(--tp-bg)] p-5">
                      <div className="tp-label-sm text-[var(--tp-ink-3)] mb-2">
                        {spec.k}
                      </div>
                      <div className="tp-heading text-xl text-[var(--tp-ink)]">{spec.v}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- /003/ Features Grid ---------- */
/* ---------- Coverage Map (real world map via dotted-map) ---------- */
function CoverageMap() {
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 48, grid: 'diagonal' });
    return map.getSVG({
      radius: 0.22,
      color: '#94a3b8',
      shape: 'circle',
      backgroundColor: 'transparent',
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center">
      <div
        aria-hidden
        className="w-full [&_svg]:block [&_svg]:w-full [&_svg]:h-auto opacity-55"
        dangerouslySetInnerHTML={{ __html: svgMap }}
      />
      {/* Quebec marker (Montréal ≈ 45.5°N, 73.6°W) */}
      <div className="absolute" style={{ left: '29.5%', top: '28%' }}>
        <span className="relative flex items-center justify-center">
          <span className="absolute h-5 w-5 rounded-full bg-[var(--tp-accent)] opacity-30 animate-ping" />
          <span className="absolute h-3 w-3 rounded-full border border-[var(--tp-accent)] opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-[var(--tp-accent)]" />
        </span>
      </div>
    </div>
  );
}

/* ---------- /003/ Live Infrastructure ---------- */
function FeaturesGrid() {
  const { t } = useLanguage();
  return (
    <section id="features" className="py-32 px-[var(--tp-pad)] bg-[var(--tp-ink)] text-white scroll-mt-16">
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div>
              <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-4)] block mb-6">
                [ 003 ] / {t('tp.features.sectionLabel').toUpperCase()}
              </span>
              <h2 className="tp-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] text-white uppercase">
                {t('tp.features.title')}
                <br />
                <span className="tp-serif-italic normal-case text-[1.05em] text-[var(--tp-ink-3)]">{t('tp.features.titleItalic')}</span>
              </h2>
            </div>
            <p className="font-light text-lg text-[var(--tp-ink-4)] max-w-[34ch] leading-[1.6]">
              {t('tp.features.subtitle')}
            </p>
          </div>
        </Reveal>

        <Reveal>
          {/* Top row: map + messaging */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--tp-rule)] border border-[var(--tp-rule)]">
            {/* Coverage map */}
            <div className="bg-[var(--tp-bg-card)] p-8 lg:p-10 flex flex-col min-h-[24rem] relative">
              <div className="flex items-center gap-2 tp-label text-[var(--tp-ink-3)] mb-3">
                <MapPin className="w-3.5 h-3.5 text-[var(--tp-accent)]" strokeWidth={1.5} />
                <span>{t('tp.features.coverageLabel').toUpperCase()}</span>
              </div>
              <h3 className="tp-heading text-2xl lg:text-3xl text-[var(--tp-ink)] leading-tight max-w-[28ch] mb-6">
                {t('tp.features.coverageTitle')}
              </h3>
              <div className="flex-1 relative -mx-4 lg:-mx-6 my-2">
                <CoverageMap />
                {/* Tooltip near Quebec marker */}
                <div className="absolute z-10" style={{ left: '32%', top: '28%' }}>
                  <div className="bg-[var(--tp-ink)] text-white tp-mono text-[10px] uppercase tracking-widest px-2 py-1 flex items-center gap-2 whitespace-nowrap shadow-[0_8px_20px_-6px_rgba(0,0,0,0.25)]">
                    <span className="text-[var(--tp-accent)]">CA</span>
                    <span className="w-px h-3 bg-white/20" />
                    <span>Québec</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--tp-accent)] animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--tp-rule)] flex justify-between tp-label">
                <span className="text-[var(--tp-ink-2)]">{t('tp.features.regions').toUpperCase()}</span>
                <span className="text-[var(--tp-accent)]">// LIVE</span>
              </div>
            </div>

            {/* Messaging */}
            <div className="bg-[var(--tp-ink)] text-white p-8 lg:p-10 flex flex-col min-h-[24rem] relative overflow-hidden">
              <div className="flex items-center gap-2 tp-label text-[var(--tp-ink-4)] mb-3">
                <MessageSquare className="w-3.5 h-3.5 text-[var(--tp-accent)]" strokeWidth={1.5} />
                <span>{t('tp.features.channelLabel').toUpperCase()}</span>
              </div>
              <h3 className="tp-heading text-2xl lg:text-3xl leading-tight max-w-[28ch] mb-6">
                {t('tp.features.channelTitle')}
              </h3>

              <div className="flex-1 flex flex-col gap-3 justify-end">
                <div className="tp-label text-[var(--tp-ink-4)] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--tp-ink-4)]" />
                  {t('tp.chat.timestamp')}
                </div>
                <div className="bg-white/[0.06] border border-white/10 p-3 max-w-[85%]">
                  <div className="tp-mono text-[9px] uppercase tracking-widest text-[var(--tp-ink-4)] mb-1">{t('tp.chat.patientLabel').toUpperCase()}</div>
                  <div className="font-light text-sm leading-snug">
                    {t('tp.chat.patient')}
                  </div>
                </div>
                <div className="border border-[var(--tp-accent)] bg-[var(--tp-accent)]/10 p-3 max-w-[90%] self-end">
                  <div className="tp-mono text-[9px] uppercase tracking-widest text-[var(--tp-accent)] mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-2.5 h-2.5" strokeWidth={2} />
                    {t('tp.chat.matchLabel').toUpperCase()}
                  </div>
                  <div className="font-light text-sm leading-snug">
                    {t('tp.chat.match')}
                  </div>
                </div>
                <div className="bg-[var(--tp-accent)] text-white p-3 max-w-[85%] self-end">
                  <div className="tp-mono text-[9px] uppercase tracking-widest text-white/70 mb-1">{t('tp.chat.nurseLabel').toUpperCase()}</div>
                  <div className="font-light text-sm leading-snug">
                    {t('tp.chat.nurse')}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between tp-label text-[var(--tp-ink-4)]">
                <span>{t('tp.features.encrypted').toUpperCase()}</span>
                <span className="text-[var(--tp-accent)]">// AES-256</span>
              </div>
            </div>
          </div>

          {/* Middle row: 3 metric cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--tp-rule)] border border-t-0 border-[var(--tp-rule)]">
            <MetricCard label={t('features.aiMatching.title').toUpperCase()} value="< 2 min" sub={t('tp.features.matchingSub')} status="live" />
            <MetricCard label={t('stats.satisfaction').toUpperCase()} value="98 %" sub={t('tp.features.satisfactionSub')} status="live" />
            <MetricCard label={t('stats.availability').toUpperCase()} value="24/7" sub={t('tp.features.availabilitySub')} status="live" />
          </div>

          {/* Bottom row: trajectory chart */}
          <div className="bg-[var(--tp-bg-card)] border border-t-0 border-[var(--tp-rule)] p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 tp-label text-[var(--tp-ink-3)] mb-2">
                  <Activity className="w-3.5 h-3.5 text-[var(--tp-accent)]" strokeWidth={1.5} />
                  <span>PLATFORM TRAJECTORY</span>
                </div>
                <h3 className="tp-heading text-2xl lg:text-3xl text-[var(--tp-ink)] leading-tight">
                  Projection de croissance.{' '}
                  <span className="text-[var(--tp-ink-3)]">Adoption mensuelle, suivi post-lancement.</span>
                </h3>
              </div>
              <span className="tp-label-sm text-[var(--tp-accent)] border border-[var(--tp-accent)] px-2 py-1 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[var(--tp-accent)] animate-pulse" />
                LIVE — Q3 2026
              </span>
            </div>

            <svg viewBox="0 0 1000 200" className="w-full h-44 lg:h-52" preserveAspectRatio="none">
              <defs>
                <linearGradient id="infraGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--tp-accent)" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="var(--tp-accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 50, 100, 150, 200].map((y) => (
                <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="var(--tp-rule)" strokeWidth="1" strokeDasharray="2 4" />
              ))}
              <path
                d="M0,175 C150,170 280,160 420,135 C560,108 700,72 840,40 C900,28 950,18 1000,10 L1000,200 L0,200 Z"
                fill="url(#infraGrad)"
              />
              <path
                d="M0,175 C150,170 280,160 420,135 C560,108 700,72 840,40 C900,28 950,18 1000,10"
                fill="none"
                stroke="var(--tp-accent)"
                strokeWidth="2"
              />
              <path
                d="M0,185 C200,182 380,178 540,168 C680,160 820,148 1000,130"
                fill="none"
                stroke="var(--tp-ink-3)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <circle cx="1000" cy="10" r="4" fill="var(--tp-accent)" />
              <circle cx="1000" cy="130" r="3" fill="var(--tp-ink-3)" />
            </svg>

            <div className="mt-4 pt-4 border-t border-[var(--tp-rule)] grid grid-cols-5 tp-label text-[var(--tp-ink-3)] text-center">
              <span>FÉV</span>
              <span>MAR</span>
              <span>AVR</span>
              <span>MAI</span>
              <span className="text-[var(--tp-accent)]">JUIN ●</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  sub,
  status = 'pending',
}: {
  label: string;
  value?: string;
  sub: string;
  status?: 'live' | 'pending';
}) {
  const isLive = status === 'live';
  return (
    <div className="bg-[var(--tp-bg-card)] p-8 lg:p-10 flex flex-col group hover:bg-[var(--tp-ink)] transition-colors duration-500">
      <span className="tp-label text-[var(--tp-ink-3)] group-hover:text-[var(--tp-ink-4)] transition-colors mb-8">
        {label}
      </span>
      <div className="flex items-baseline gap-3 mb-4">
        {isLive ? (
          <span className="tp-heading text-5xl lg:text-6xl text-[var(--tp-ink)] group-hover:text-[var(--tp-accent)] transition-colors tabular-nums leading-none">
            {value}
          </span>
        ) : (
          <>
            <span className="tp-heading text-5xl lg:text-6xl text-[var(--tp-ink-3)] opacity-50 group-hover:text-[var(--tp-ink-4)] transition-colors tabular-nums leading-none">
              —
            </span>
            <span className="tp-label-sm text-[var(--tp-accent)] border border-[var(--tp-accent)] px-2 py-1">
              À VENIR
            </span>
          </>
        )}
      </div>
      <p className="font-light text-sm text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors mt-auto pt-4 border-t border-[var(--tp-rule)] group-hover:border-white/10 leading-snug">
        {sub}
      </p>
    </div>
  );
}

/* ---------- /004/ Outcomes ---------- */
function Outcomes() {
  const { t } = useLanguage();
  const a = useCountUp(15000);
  const b = useCountUp(847);
  const c = useCountUp(98);
  const d = useCountUp(6);
  return (
    <section className="py-32 px-[var(--tp-pad)] bg-[var(--tp-bg-alt)] border-b border-[var(--tp-rule)] overflow-hidden">
      <div className="max-w-[100rem] mx-auto relative">
        <div className="absolute -top-10 left-0 text-[clamp(8rem,20vw,20rem)] tp-serif-italic text-[var(--tp-rule-2)] pointer-events-none leading-none select-none z-0">
          Data.
        </div>

        <Reveal>
          <div className="relative z-10 mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div>
              <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)] block mb-6">[ 004 ] / VALIDATION</span>
              <h2 className="tp-heading text-[clamp(2rem,4vw,3.5rem)] leading-[1] text-[var(--tp-ink)] max-w-[24ch]">
                {t('tp.outcomes.title')}
              </h2>
            </div>
            <div className="tp-mono text-xs text-[var(--tp-ink-2)] border-l border-[var(--tp-rule)] pl-6 max-w-[28ch]">
              <span className="text-[var(--tp-accent)]">// LIVE METRICS</span><br />
              {t('tp.outcomes.meta')}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--tp-rule)] border border-[var(--tp-rule)] relative z-10">
            <StatCard label={t('stats.patients').toUpperCase()} valueRef={a.ref} value={a.val} unit="+" note={t('tp.outcomes.notePatients')} />
            <StatCard label={t('stats.nurses').toUpperCase()} valueRef={b.ref} value={b.val} unit="" note={t('tp.outcomes.noteNurses')} />
            <StatCard label={t('stats.satisfaction').toUpperCase()} valueRef={c.ref} value={c.val} unit="%" note={t('tp.outcomes.noteSatisfaction')} />
            <StatCard label={t('stats.cities').toUpperCase()} valueRef={d.ref} value={d.val} unit="" note={t('tp.outcomes.noteCities')} />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex justify-end">
            <button className="tp-label text-[var(--tp-ink)] border-b border-[var(--tp-ink)] pb-1 hover:text-[var(--tp-accent)] hover:border-[var(--tp-accent)] transition-colors flex items-center gap-2">
              {t('hero.pitchDeck').toUpperCase()} <Download className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCard({
  label,
  valueRef,
  value,
  unit,
  note,
}: {
  label: string;
  valueRef: React.RefObject<HTMLSpanElement | null>;
  value: string;
  unit: string;
  note: string;
}) {
  return (
    <div className="bg-[var(--tp-bg-card)] p-10 flex flex-col group hover:bg-[var(--tp-ink)] transition-colors duration-500">
      <span className="tp-label text-[var(--tp-ink-3)] mb-12">{label}</span>
      <div className="mt-auto">
        <span className="tp-heading text-[clamp(4rem,7vw,6.5rem)] text-[var(--tp-ink)] group-hover:text-[var(--tp-accent)] transition-colors leading-none tracking-tighter tabular-nums flex items-baseline">
          <span ref={valueRef}>{value}</span>
          <span className="text-2xl tp-mono ml-2 opacity-60 text-[var(--tp-ink)] group-hover:text-[var(--tp-bg)] transition-colors">{unit}</span>
        </span>
        <div className="w-full h-px bg-[var(--tp-rule)] my-6 group-hover:bg-white/20 transition-colors" />
        <p className="font-light text-sm text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors">{note}</p>
      </div>
    </div>
  );
}

/* ---------- /005/ Partners ---------- */
const PARTNER_ICONS: Record<string, React.ReactElement> = {
  OIIQ: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.8l5.2 5.2-5.2 5.2L6.8 12 12 6.8z" />
    </svg>
  ),
  DESJARDINS: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L1 21h22L12 2zm0 4.5l6.5 11.5H5.5L12 6.5z" />
    </svg>
  ),
  'SUN LIFE': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeLinecap="round" />
    </svg>
  ),
  'CROIX BLEUE': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  ),
  RAMQ: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5z" />
    </svg>
  ),
  PHARMAPRIX: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9 12h6" strokeLinecap="round" />
    </svg>
  ),
  SSQ: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l10 6-10 6-10-6 10-6zm0 15.5l-10-6v4.5l10 6 10-6v-4.5l-10 6z" />
    </svg>
  ),
  STRIPE: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 6c-2-1.2-7-1-7 2 0 3 7 2.5 7 5.5s-4 3-7 1.5" strokeLinecap="round" />
    </svg>
  ),
};

function Partners() {
  const partners = [
    { name: 'OIIQ', sub: 'Ordre des Infirmières' },
    { name: 'DESJARDINS', sub: 'Partenaire financier' },
    { name: 'SUN LIFE', sub: 'Assurance santé' },
    { name: 'CROIX BLEUE', sub: 'Couverture privée' },
    { name: 'RAMQ', sub: "Régie de l'assurance maladie" },
    { name: 'PHARMAPRIX', sub: 'Réseau pharmacies' },
    { name: 'SSQ', sub: 'Assurance collective' },
    { name: 'STRIPE', sub: 'Paiements sécurisés' },
  ];
  return (
    <section id="partners" className="py-24 px-[var(--tp-pad)] bg-[var(--tp-bg)] border-y border-[var(--tp-rule)] scroll-mt-16">
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="flex justify-between items-end mb-12">
            <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)]">[ 005 ] / TRUSTED NETWORK — QC</span>
            <span className="tp-label text-[var(--tp-ink-3)] hidden md:block">
              {partners.length} VERIFIED INSTITUTIONS
            </span>
          </div>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--tp-rule)] border border-[var(--tp-rule)]">
            {partners.map((p) => (
              <div
                key={p.name}
                className="bg-[var(--tp-bg)] p-8 flex flex-col group hover:bg-[var(--tp-ink)] transition-colors duration-500 min-h-[10rem] relative"
              >
                <div className="flex justify-between items-start mb-auto">
                  <div className="tp-label-sm text-[var(--tp-ink-3)] group-hover:text-[var(--tp-accent)] transition-colors">
                    {p.sub}
                  </div>
                  <div className="w-9 h-9 text-[var(--tp-ink-3)] group-hover:text-[var(--tp-accent)] transition-colors shrink-0">
                    {PARTNER_ICONS[p.name]}
                  </div>
                </div>
                <div className="tp-heading text-2xl text-[var(--tp-ink)] group-hover:text-white transition-colors tracking-tight mt-8">
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- /006/ Testimonials ---------- */
function Testimonials() {
  const { t } = useLanguage();
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({
    code: `REP-${String(n).padStart(3, '0')}`,
    headline: t(`trust.testimonial${n}Headline`),
    text: t(`trust.testimonial${n}Text`),
    rating: n === 4 ? 4 : 5,
  }));
  return (
    <section className="py-32 px-[var(--tp-pad)] bg-[var(--tp-bg-alt)]">
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div>
              <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)] block mb-6">
                [ 006 ] / FIELD REPORTS
              </span>
              <h2 className="tp-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] text-[var(--tp-ink)] uppercase">
                {t('trust.title')}
                <br />
                <span className="tp-serif-italic normal-case text-[1.05em] text-[var(--tp-ink-3)]">
                  {t('tp.testimonials.tagline')}
                </span>
              </h2>
            </div>
            <p className="font-light text-lg text-[var(--tp-ink-2)] max-w-[32ch] leading-[1.6]">
              {t('trust.subtitle')}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--tp-rule)] border border-[var(--tp-rule)]">
            {items.map((it) => (
              <div
                key={it.code}
                className="bg-[var(--tp-bg-card)] p-10 flex flex-col group hover:bg-[var(--tp-ink)] transition-colors duration-500 relative"
              >
                <div className="flex justify-between items-start mb-8 tp-label text-[var(--tp-ink-3)] group-hover:text-[var(--tp-accent)] transition-colors">
                  <span>{it.code}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < it.rating
                            ? 'fill-[var(--tp-accent)] text-[var(--tp-accent)]'
                            : 'text-[var(--tp-ink-4)]'
                        }`}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                </div>
                <Quote
                  className="absolute top-8 right-8 w-8 h-8 text-[var(--tp-ink-4)] opacity-30 group-hover:text-[var(--tp-accent)] group-hover:opacity-100 transition-all"
                  strokeWidth={1}
                />
                <h3 className="tp-heading text-2xl text-[var(--tp-ink)] group-hover:text-white transition-colors mb-4 mt-auto">
                  {it.headline}
                </h3>
                <p className="font-light text-sm leading-[1.7] text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors">
                  {it.text}
                </p>
                <div className="mt-8 pt-6 border-t border-[var(--tp-rule)] group-hover:border-white/10 transition-colors flex justify-between tp-label-sm text-[var(--tp-ink-3)]">
                  <span>VERIFIED PATIENT</span>
                  <span>QC, CA</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- /007/ App Download CTA ---------- */
function AppDownload() {
  const { t } = useLanguage();
  return (
    <section id="deploy" className="py-32 px-[var(--tp-pad)] bg-[var(--tp-bg)] relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 tp-bg-grid opacity-50 pointer-events-none" />
      <div className="max-w-[100rem] mx-auto relative">
        <Reveal>
          <div className="text-center mb-20">
            <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)] block mb-6">
              [ 007 ] / DEPLOY — APPLICATION
            </span>
            <h2 className="tp-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] text-[var(--tp-ink)] max-w-[24ch] mx-auto uppercase">
              {t('newsletter.subtitle').replace('.', '')}
              <br />
              <span className="tp-serif-italic normal-case text-[1.05em]">{t('tp.appDownload.subtitle')}</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[var(--tp-ink)] bg-[var(--tp-bg-card)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Left visual block */}
            <div className="lg:col-span-5 bg-[var(--tp-ink)] text-white p-10 lg:p-14 flex flex-col justify-between min-h-[28rem] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, transparent 0, transparent 12px, rgba(255,255,255,0.15) 12px, rgba(255,255,255,0.15) 13px)',
                  }}
                />
              </div>
              <div className="relative z-10 flex justify-between tp-label text-[var(--tp-ink-4)]">
                <span>APP-OS / V1.0.0</span>
                <span className="text-[var(--tp-accent)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--tp-accent)] animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="relative z-10">
                <Download className="w-12 h-12 text-[var(--tp-accent)] mb-6" strokeWidth={1.25} />
                <h3 className="tp-heading text-4xl lg:text-5xl mb-4 leading-[0.95]">
                  {t('hero.getStarted').toUpperCase()}
                </h3>
                <p className="font-light text-sm text-[var(--tp-ink-4)] max-w-[40ch] leading-[1.6]">
                  {t('tp.appDownload.tagline')}
                </p>
              </div>
              <div className="relative z-10 grid grid-cols-3 gap-px tp-label border-t border-white/10 pt-6 text-[var(--tp-ink-4)]">
                <div>
                  <div className="text-[var(--tp-accent)] mb-1">iOS</div>
                  <div>15.0+</div>
                </div>
                <div>
                  <div className="text-[var(--tp-accent)] mb-1">Android</div>
                  <div>10.0+</div>
                </div>
                <div>
                  <div className="text-[var(--tp-accent)] mb-1">Size</div>
                  <div>~48 MB</div>
                </div>
              </div>
            </div>

            {/* Right CTA block */}
            <div className="lg:col-span-7 p-10 lg:p-14 flex flex-col justify-center bg-[var(--tp-bg-card)]">
              <div className="tp-label text-[var(--tp-accent)] mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-[var(--tp-accent)]" />
                {t('tp.appDownload.systemLabel').toUpperCase()}
              </div>
              <h3 className="tp-heading text-3xl lg:text-4xl text-[var(--tp-ink)] mb-3 leading-tight">
                {t('tp.appDownload.title')}
              </h3>
              <p className="font-light text-[var(--tp-ink-2)] leading-[1.7] mb-10 max-w-[55ch]">
                {t('tp.appDownload.desc')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#"
                  className="group flex items-center gap-4 border border-[var(--tp-ink)] bg-[var(--tp-ink)] text-white px-6 py-4 hover:bg-[var(--tp-accent)] hover:border-[var(--tp-accent)] transition-colors"
                >
                  <svg width="28" height="32" viewBox="0 0 814 1000" fill="white">
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-108.3C27.1 766.2 0 633.6 0 506.6c0-204.9 133.4-313.1 264.4-313.1 69.4 0 127.1 45.5 170.4 45.5 41.3 0 106.1-49.2 185.8-49.2zm-181.7-111c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="tp-label-sm text-white/70">Download on the</span>
                    <span className="tp-heading text-lg tracking-tight">App Store</span>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    strokeWidth={1.5}
                  />
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-4 border border-[var(--tp-ink)] bg-[var(--tp-ink)] text-white px-6 py-4 hover:bg-[var(--tp-accent)] hover:border-[var(--tp-accent)] transition-colors"
                >
                  <svg width="24" height="28" viewBox="0 0 22 24" fill="none">
                    <path d="M0.599609 0.540039L12.3996 12.0001L0.599609 23.4601C0.229609 23.1601 0 22.7001 0 22.1701V1.82004C0 1.29004 0.229609 0.840039 0.599609 0.540039Z" fill="#32BBFF" />
                    <path d="M16.3994 8.08008L12.3994 12.0001L16.3994 15.9201L21.1994 13.2601C22.4594 12.5601 22.4594 11.4401 21.1994 10.7401L16.3994 8.08008Z" fill="#FFD700" />
                    <path d="M0.599609 23.4601C0.989609 23.7801 1.51961 23.8601 2.09961 23.5601L14.1996 16.9401L12.3996 12.0001L0.599609 23.4601Z" fill="#FF3B30" />
                    <path d="M14.1996 7.05957L2.09961 0.43957C1.51961 0.13957 0.989609 0.21957 0.599609 0.53957L12.3996 11.9996L14.1996 7.05957Z" fill="#00E676" />
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="tp-label-sm text-white/70">Get it on</span>
                    <span className="tp-heading text-lg tracking-tight">Google Play</span>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    strokeWidth={1.5}
                  />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-px bg-[var(--tp-rule)] border border-[var(--tp-rule)]">
                {[
                  { label: 'AVG RATING', value: '4.9★' },
                  { label: 'DOWNLOADS', value: '15k+' },
                  { label: 'COST', value: 'GRATUIT' },
                ].map((s) => (
                  <div key={s.label} className="bg-[var(--tp-bg-card)] p-5">
                    <div className="tp-label-sm text-[var(--tp-ink-3)] mb-2">
                      {s.label}
                    </div>
                    <div className="tp-heading text-xl text-[var(--tp-ink)]">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- /008/ Blog ---------- */
const ARTICLE_SLUGS = ['soins-aines', 'telesante', 'premiere-visite'] as const;

function Blog() {
  const { t } = useLanguage();
  const articles = [1, 2, 3].map((n) => ({
    code: `DISP-${String(n).padStart(3, '0')}`,
    tags: [t(`blog.article${n}Tag1`), t(`blog.article${n}Tag2`)],
    title: t(`blog.article${n}Title`),
    desc: t(`blog.article${n}Description`),
    date: ['2026.04.18', '2026.04.02', '2026.03.21'][n - 1],
    slug: ARTICLE_SLUGS[n - 1],
  }));
  return (
    <section id="blog" className="py-32 px-[var(--tp-pad)] bg-[var(--tp-bg)] scroll-mt-16">
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div>
              <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)] block mb-6">
                [ 008 ] / DISPATCH — {t('blog.badge').toUpperCase()}
              </span>
              <h2 className="tp-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] text-[var(--tp-ink)] uppercase">
                {t('blog.title')}
              </h2>
            </div>
            <p className="font-light text-lg text-[var(--tp-ink-2)] max-w-[32ch] leading-[1.6]">
              {t('blog.subtitle')}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--tp-rule)] border border-[var(--tp-rule)]">
            {articles.map((a) => (
              <a
                key={a.code}
                href={`/articles/${a.slug}`}
                className="bg-[var(--tp-bg-card)] p-10 flex flex-col group hover:bg-[var(--tp-ink)] transition-colors duration-500 relative cursor-pointer min-h-[24rem]"
              >
                <div className="flex justify-between items-start mb-12 tp-label text-[var(--tp-ink-3)] group-hover:text-[var(--tp-accent)] transition-colors">
                  <span>{a.code}</span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" strokeWidth={1.5} /> {a.date}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {a.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tp-label-sm border border-[var(--tp-rule)] group-hover:border-white/20 px-2 py-1 text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="tp-heading text-2xl lg:text-3xl text-[var(--tp-ink)] group-hover:text-white transition-colors mb-4 leading-tight">
                  {a.title}
                </h3>
                <p className="font-light text-sm text-[var(--tp-ink-2)] group-hover:text-[var(--tp-ink-4)] transition-colors leading-[1.6] mb-8">
                  {a.desc}
                </p>

                <div className="mt-auto flex items-center justify-between tp-label text-[var(--tp-ink)] group-hover:text-[var(--tp-accent)] transition-colors border-t border-[var(--tp-rule)] group-hover:border-white/10 pt-6">
                  <span>{t('blog.readMore').toUpperCase()}</span>
                  <ArrowUpRight
                    className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    strokeWidth={1.5}
                  />
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- /009/ FAQ ---------- */
function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  const items = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    q: t(`faq.question${n}`),
    a: t(`faq.answer${n}`),
  }));
  return (
    <section id="faq" className="py-32 px-[var(--tp-pad)] bg-[var(--tp-bg-alt)] scroll-mt-16">
      <div className="max-w-[100rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)] block mb-6">
                [ 009 ] / QUERY_LOG
              </span>
              <h2 className="tp-heading text-[clamp(2.5rem,4vw,4rem)] leading-[0.95] text-[var(--tp-ink)] uppercase mb-6">
                {t('faq.title')}
              </h2>
              <p className="font-light text-lg text-[var(--tp-ink-2)] leading-[1.6] mb-10">
                {t('faq.subtitle')}
              </p>
              <div className="border-t border-[var(--tp-rule)] pt-6 tp-label text-[var(--tp-ink-3)] space-y-2">
                <div className="flex justify-between">
                  <span>QUERIES</span>
                  <span className="text-[var(--tp-ink)]">{items.length.toString().padStart(2, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span>RESPONSE TIME</span>
                  <span className="text-[var(--tp-accent)]">{'< 24H'}</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS</span>
                  <span className="text-[var(--tp-ink)]">RESOLVED</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8">
            <div className="border-t border-[var(--tp-rule)]">
              {items.map((it, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="border-b border-[var(--tp-rule)]">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-8 text-left group"
                    >
                      <div className="flex-1 flex items-start gap-6">
                        <span className="tp-label text-[var(--tp-ink-3)] mt-1.5 shrink-0">
                          [ {String(i + 1).padStart(2, '0')} ]
                        </span>
                        <span
                          className={`tp-heading text-xl lg:text-2xl leading-tight transition-colors ${
                            isOpen ? 'text-[var(--tp-accent)]' : 'text-[var(--tp-ink)] group-hover:text-[var(--tp-accent)]'
                          }`}
                        >
                          {it.q}
                        </span>
                      </div>
                      <div
                        className={`w-9 h-9 border flex items-center justify-center shrink-0 transition-all ${
                          isOpen
                            ? 'bg-[var(--tp-accent)] border-[var(--tp-accent)] text-white rotate-180'
                            : 'border-[var(--tp-ink)] text-[var(--tp-ink)] group-hover:bg-[var(--tp-ink)] group-hover:text-white'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" strokeWidth={1.5} />
                        ) : (
                          <Plus className="w-4 h-4" strokeWidth={1.5} />
                        )}
                      </div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-light text-[var(--tp-ink-2)] leading-[1.7] pb-8 pl-[5.5rem] pr-12 max-w-[65ch]">
                        {it.a}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- /010/ Contact + Newsletter ---------- */
function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-32 px-[var(--tp-pad)] bg-[var(--tp-bg)] scroll-mt-16">
      <div className="max-w-[100rem] mx-auto">
        <Reveal>
          <div className="mb-16">
            <span className="tp-mono tp-micro tracking-[0.2em] text-[var(--tp-ink-3)] block mb-6">
              [ 010 ] / TRANSMIT
            </span>
            <h2 className="tp-heading text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] text-[var(--tp-ink)] uppercase max-w-[20ch]">
              {t('contact.title')}
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[var(--tp-rule)] border border-[var(--tp-rule)]">
            {/* Contact form */}
            <div className="lg:col-span-8 bg-[var(--tp-bg-card)] p-10 lg:p-14">
              <div className="tp-label text-[var(--tp-accent)] mb-3 flex items-center gap-2">
                <Send className="w-3 h-3" strokeWidth={1.5} />
                MESSAGE BOARD / OPERATIONAL
              </div>
              <p className="font-light text-lg text-[var(--tp-ink-2)] leading-[1.6] mb-10 max-w-[50ch]">
                {t('contact.description')}
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ContactField label={t('contact.firstName')} placeholder={t('contact.firstNamePlaceholder')} />
                  <ContactField label={t('contact.lastName')} placeholder={t('contact.lastNamePlaceholder')} />
                </div>
                <ContactField label={t('contact.emailLabel')} placeholder={t('contact.emailPlaceholder')} type="email" />
                <ContactField label={t('contact.subject')} placeholder={t('contact.subjectPlaceholder')} />
                <div>
                  <label className="tp-label text-[var(--tp-ink-3)] block mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={5}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full border border-[var(--tp-rule)] bg-[var(--tp-bg)] px-4 py-3 font-light text-[var(--tp-ink)] placeholder:text-[var(--tp-ink-3)] focus:border-[var(--tp-accent)] focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="button"
                  className="tp-btn-brutal h-14 px-10 tp-label group"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('contact.send')}
                    <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </span>
                </button>
              </form>
            </div>

            {/* Right: details + newsletter */}
            <div className="lg:col-span-4 flex flex-col">
              {/* Contact details */}
              <div className="bg-[var(--tp-ink)] text-white p-10 flex-1">
                <div className="tp-label text-[var(--tp-accent)] mb-6">
                  COORDINATES
                </div>
                <h3 className="tp-heading text-2xl text-white mb-8">{t('contact.detailsTitle')}</h3>
                <ul className="space-y-6 mb-8">
                  <li className="flex items-start gap-4 group">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0 group-hover:border-[var(--tp-accent)] group-hover:bg-[var(--tp-accent)] transition-colors">
                      <Mail className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="tp-label text-[var(--tp-ink-4)] mb-1">
                        {t('contact.email').toUpperCase()}
                      </div>
                      <div className="font-light text-sm">hello@mobisoins.com</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0 group-hover:border-[var(--tp-accent)] group-hover:bg-[var(--tp-accent)] transition-colors">
                      <Phone className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="tp-label text-[var(--tp-ink-4)] mb-1">
                        {t('contact.phone').toUpperCase()}
                      </div>
                      <div className="font-light text-sm">+1 (514) 000-0000</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center shrink-0 group-hover:border-[var(--tp-accent)] group-hover:bg-[var(--tp-accent)] transition-colors">
                      <MapPin className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="tp-label text-[var(--tp-ink-4)] mb-1">
                        HQ
                      </div>
                      <div className="font-light text-sm">Montréal, QC, Canada</div>
                    </div>
                  </li>
                </ul>
                <div className="border-t border-white/10 pt-6 tp-label text-[var(--tp-ink-4)] flex justify-between">
                  <span>RESPONSE SLA</span>
                  <span className="text-[var(--tp-accent)]">{'< 24H'}</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-[var(--tp-accent)] text-white p-10">
                <div className="tp-label text-white/80 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  WAITLIST — OPEN
                </div>
                <h3 className="tp-heading text-2xl mb-2 leading-tight">{t('newsletter.title')}</h3>
                <p className="font-light text-sm text-white/90 leading-[1.6] mb-6">
                  {t('newsletter.description')}
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder={t('newsletter.emailPlaceholder')}
                    className="w-full border border-white/30 bg-transparent px-4 py-3 font-light placeholder:text-white/60 focus:bg-white/10 focus:border-white focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    className="bg-white text-[var(--tp-accent)] px-6 py-3 tp-label font-bold hover:bg-[var(--tp-ink)] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    {t('newsletter.submitButton')}
                    <ArrowRight className="w-3 h-3" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactField({
  label,
  placeholder,
  type = 'text',
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="tp-label text-[var(--tp-ink-3)] block mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-[var(--tp-rule)] bg-[var(--tp-bg)] px-4 py-3 font-light text-[var(--tp-ink)] placeholder:text-[var(--tp-ink-3)] focus:border-[var(--tp-accent)] focus:outline-none transition-colors"
      />
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const { t } = useLanguage();

  const indexLinks: { label: string; href: string; external?: boolean }[] = [
    { label: t('header.howItWorks'), href: '#how-it-works' },
    { label: t('header.services'), href: '#services' },
    { label: t('header.features'), href: '#features' },
    { label: t('header.faq'), href: '#faq' },
    { label: t('footer.blog'), href: '#blog' },
    { label: t('header.recruitment'), href: RECRUITMENT_URL, external: true },
  ];
  const legalLinks: { label: string; href: string }[] = [
    { label: t('footer.privacyPolicy'), href: '/confidentialite' },
    { label: t('footer.termsOfService'), href: '/conditions' },
    { label: t('footer.cookies'), href: '/cookies' },
    { label: t('footer.contact'), href: '#contact' },
  ];
  const supportLinks: { label: string; href: string; external?: boolean }[] = [
    { label: t('footer.helpCenter'), href: '#faq' },
    { label: t('footer.forPatients'), href: '#how-it-works' },
    { label: t('footer.forNurses'), href: RECRUITMENT_URL, external: true },
    { label: t('footer.insurance'), href: '#partners' },
  ];

  const renderLink = (
    link: { label: string; href: string; external?: boolean },
    key: number,
  ) => (
    <li key={key}>
      <a
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        className="hover:text-white transition-colors inline-flex items-center gap-2 group"
      >
        <span>{link.label}</span>
        {link.external && (
          <ArrowUpRight
            className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            strokeWidth={1.5}
          />
        )}
      </a>
    </li>
  );

  return (
    <footer className="bg-[var(--tp-ink)] pt-32 pb-10 text-[var(--tp-bg)] border-t-[10px] border-[var(--tp-accent)] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none opacity-5 select-none overflow-hidden">
        <span className="tp-heading text-[28vw] leading-[0.7] tracking-tighter whitespace-nowrap">MOBISOINS</span>
      </div>

      <div className="max-w-[100rem] mx-auto px-[var(--tp-pad)] relative z-10 flex flex-col h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32 border-b border-white/10 pb-20">
          <div>
            <h4 className="tp-mono text-[10px] uppercase tracking-[0.2em] text-[var(--tp-ink-3)] mb-6">QUARTIER GÉNÉRAL</h4>
            <ul className="space-y-3 font-light text-sm text-[var(--tp-ink-4)] leading-relaxed">
              <li>
                <a
                  href="https://maps.google.com/?q=Montr%C3%A9al,+QC,+Canada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Montréal, QC, Canada
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=45.5017,-73.5673"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  45.5017° N / 73.5673° W
                </a>
              </li>
              <li>
                <a href="tel:+15140000000" className="hover:text-white transition-colors">
                  +1 (514) 000-0000
                </a>
              </li>
              <li className="mt-4">
                <a
                  href="mailto:hello@mobisoins.com"
                  className="text-[var(--tp-accent)] hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                  hello@mobisoins.com
                  <ArrowUpRight
                    className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="tp-mono text-[10px] uppercase tracking-[0.2em] text-[var(--tp-ink-3)] mb-6">INDEX</h4>
            <ul className="space-y-3 font-light text-sm text-[var(--tp-ink-4)]">
              {indexLinks.map(renderLink)}
            </ul>
          </div>
          <div>
            <h4 className="tp-mono text-[10px] uppercase tracking-[0.2em] text-[var(--tp-ink-3)] mb-6">{t('footer.legal').toUpperCase()}</h4>
            <ul className="space-y-3 font-light text-sm text-[var(--tp-ink-4)]">
              {legalLinks.map(renderLink)}
            </ul>
          </div>
          <div>
            <h4 className="tp-mono text-[10px] uppercase tracking-[0.2em] text-[var(--tp-ink-3)] mb-6">{t('footer.support').toUpperCase()}</h4>
            <ul className="space-y-3 font-light text-sm text-[var(--tp-ink-4)]">
              {supportLinks.map(renderLink)}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 tp-label text-[var(--tp-ink-3)]">
          <div>© 2026 MOBISOINS — {t('footer.allRightsReserved').toUpperCase()}</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--tp-accent)] animate-pulse rounded-full" />
              SYS.STATUS — OPERATIONAL
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>BUILT IN QC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export default function TemplatePreview() {
  return (
    <div className="tp-root min-h-screen relative">
      <svg className="tp-noise">
        <filter id="tp-n">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#tp-n)" />
      </svg>
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ boxShadow: 'inset 0 0 10rem rgba(0,0,0,0.03)' }}
      />
      <FrameAccoutrements />
      <Nav />
      <main>
        <Hero />
        <ProductShowcase />
        <Blog />
        <Doctrine />
        <ServicesTerminal />
        <FeaturesGrid />
        <Outcomes />
        <Partners />
        <Testimonials />
        <AppDownload />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
