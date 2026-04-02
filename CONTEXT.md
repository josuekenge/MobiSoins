# MobiSoins — Project Context

> This file provides context for new Claude Code sessions. For design system details, see [CLAUDE.md](CLAUDE.md).

---

## What is MobiSoins?

MobiSoins is a **nursing-on-demand mobile app** for Quebec, Canada. Think "Uber for home nursing." Patients book OIIQ-certified nurses for at-home care; nurses accept requests, navigate to patients, deliver care, and get paid automatically.

**Target market:** Montreal, Quebec — French-first (FR/EN bilingual).

---

## Two Apps (One Platform)

### Patient App
- Browse/search nurses by service category (Soins infirmiers, Vaccination, Suivi maladies chroniques, Bilan santé, Pédiatrie, Santé sexuelle, Ainés, Analyses)
- View nurse profiles (photo, name, role, years experience, star rating, distance, reviews)
- Book appointments (select date via calendar strip, time slot, service type)
- Payment via Stripe (line-item breakdown, Soins infirmiers $100, Cathéters $40, etc.)
- Real-time nurse tracking on map
- In-app chat with nurse
- Rate & review after service

### Nurse App
- Map-based home screen with "Passer en ligne" toggle
- Incoming request cards (distance, time, patient info, service tags, compensation)
- Accept/decline flow
- Navigation to patient location
- Patient file (Fiche du patient) with history
- Service completion + observation notes
- Priority rating system (more work = higher priority)
- Earnings dashboard

---

## Landing Page (What We're Building)

The landing page at `client/` is a Next.js 16 site with Orion-style glassmorphism design. It showcases both apps and collects waitlist signups.

### Current Section Order (in `page.tsx`)
1. **Hero** — Split layout: headline + clay phone mockup with app preview + App Store/Play Store badges
2. **LogoCloud** — Marquee ticker of Quebec partner logos
3. **Stats** — Horizontal stats bar (10K+ patients, 500+ nurses, 4.9★, 24/7, 12 cities)
4. **HowItWorks** — Phase timeline (3 steps, alternating left/right)
5. **Features** — Bento 2×2 grid with glass panels
6. **Services** — Service category cards
7. **Trust** — Glass testimonial cards with star ratings
8. **Pillars** — "Why MobiSoins" 3-column section (Safety, AI Matching, Patient Experience)
9. **Pricing** — 3-tier (Particulier $0, Professionnel $49, Établissement custom)
10. **Blog** — Latest articles
11. **FAQ** — Accordion
12. **Contact** — Glass form via Web3Forms
13. **Newsletter** — CTA banner

### Design Language
- **Glassmorphism:** `bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem]`
- **Clay phone mockup:** `bg-[#e2e8f0]` with inset shadows
- **Floating pill navbar:** `bg-white/70 backdrop-blur-xl`, centered nav links
- **Navy primary:** `#003366`
- **Green accent:** `#98B690`
- **Background:** `#f7f9fa`
- **Text:** `#1a1a24` (dark), `#5a5a6a` (muted)

---

## Remotion Video (`video/`)

A 20-second product promo video built with Remotion (1920×1080, 30fps):

| Scene | Frames | Content |
|---|---|---|
| Intro | 0–70 | Dark navy bg, MobiSoins logo + heartbeat + pulse dots |
| Booking | 60–240 | Patient app: home screen + booking calendar phones |
| Nurse | 230–430 | Nurse app: map home + incoming request phones |
| Map | 420–530 | Dark bg, animated route, live tracking phone |
| Outro | 510–600 | Logo, store badges, mobisoins.ca CTA |

**Commands:**
```bash
cd video && npm run start    # Open Remotion Studio
cd video && npm run render   # Render to out/video.mp4
```

---

## Key Files

| File | Purpose |
|---|---|
| `CLAUDE.md` | Full design system (colors, typography, components, rules) |
| `client/src/app/globals.css` | Tailwind v4 `@theme` — source of truth for design tokens |
| `client/src/app/page.tsx` | Landing page section order + lazy loading |
| `client/src/contexts/LanguageContext.tsx` | FR/EN translations (all `t()` keys) |
| `client/src/components/layout/Header.tsx` | Floating pill navbar |
| `client/src/components/sections/*.tsx` | One file per landing page section |
| `client/prisma/schema.prisma` | Database schema (WaitlistEntry) |
| `video/src/MobiSoinsPromo.tsx` | Video timeline + brand colors |
| `video/src/scenes/*.tsx` | Individual video scenes |

---

## Important Conventions

- **i18n:** All user-facing strings use `t('key')` from `useLanguage()`. Add keys to both FR and EN in `LanguageContext.tsx`.
- **Colors:** Never hardcode hex — use Tailwind classes from `@theme` in `globals.css`.
- **Tailwind v4:** `@theme` block is source of truth. `tailwind.config.js` is NOT auto-loaded.
- **Components:** All with hooks/motion need `'use client'` directive.
- **Icons:** No brand icons from lucide-react (removed in v1) — use inline SVGs.
- **Prisma:** v6 only. Do not upgrade to v7.
- **Deploy:** Netlify + `@netlify/plugin-nextjs`.
