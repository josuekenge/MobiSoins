# MobiSoins — Project Context

> This file provides context for new Claude Code sessions. For design system details, see [CLAUDE.md](CLAUDE.md).

---

## What is MobiSoins?

MobiSoins is a **nursing-on-demand mobile app** for Quebec, Canada. Think "Uber for home nursing." Patients book OIIQ-certified nurses for at-home care; nurses accept requests, navigate to patients, deliver care, and get paid automatically.

**Target market:** Montreal, Quebec — French-first (FR/EN bilingual). Users with a French browser language are auto-defaulted to FR.

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

## Landing Page

The landing page at `client/` is a Next.js 16 site with **Orion-style design** (clean white, muted green/dark palette, glassmorphism-lite). It showcases both apps and collects waitlist signups.

### Current Section Order (in `page.tsx`)
1. **Hero** — Split layout: headline + clay phone mockup + App Store/Play Store badges + inline waitlist form
2. **LogoCloud** — Marquee ticker of Quebec partner logos
3. **Stats** — Horizontal stats bar (patients, nurses, satisfaction, 24/7, cities)
4. **HowItWorks** — Left-right two-column layout: 3-step horizontal roadmap (left) + animated phone mockup with notification feed loop (right)
5. **NursingMapSection** — Live dispatch map with animated GPS vehicles + feature bullets
6. **Features** — Bento grid: GPS tracking + dotted map (top-left), animated chat bubbles (top-right), stat bar (full-width), area chart (full-width bottom)
7. **Services** — 3 service cards (scheduling, matching, health chart) + flat North America map CTA banner
8. **Trust** — Glass testimonial cards with star ratings
9. **Pillars** — CircularTestimonials carousel with 4 Quebec patient/nurse testimonials
10. **FAQ** — Searchable accordion
11. **Contact** — Form via Web3Forms
12. **Newsletter** — Waitlist CTA banner

> **Removed:** Pricing section was removed. Blog section was removed from the page body.

### Design Language (Orion Style)
- **Background:** `rgba(255,255,255,0.82)` on sections, `#f7f9fa` overall
- **Primary dark:** `#1a1a24` (headings, dark buttons)
- **Primary green:** `#4e6645` (icons, highlights, active states)
- **Light green:** `#98B690` (secondary accent)
- **Muted text:** `#5a5a6a`
- **Cards:** `bg-white rounded-2xl border border-[rgba(26,26,36,0.1)] shadow-sm`
- **Letter spacing:** `-0.03em` on headings
- **Animations:** Framer Motion with `viewport={{ once: true }}`, word-by-word blur-fade on key headings

---

## Header (`Header.tsx`)

Fully rewritten — clean horizontal 3-column navbar:
- **Left:** MobiSoins logo (`h-20`)
- **Center:** Nav links (Comment ça marche, Fonctionnalités, Services, FAQ)
- **Right:** Language toggle (FR/EN) + Download App CTA button

**Scroll behavior:** Header hides on scroll down past 80px; only reappears when `scrollY < 60` (near top). Uses `motion.header` with `animate={{ y: hidden ? '-100%' : '0%' }}`.

**Background:** `linear-gradient(to bottom, rgba(255,255,255,0.96) 60%, rgba(255,255,255,0))` — fades at the bottom edge.

**Articles dropdown:** "Articles" subsection in the nav opens a `w-[380px]` animated panel with 3 article cards (thumbnail + tag + title + arrow). Outside-click handler closes it. Mobile: inline article list in the drawer.

---

## HowItWorks (`HowItWorks.tsx`)

Two-column layout:
- **Left:** Section title + 3-step horizontal roadmap with icons, step numbers, and a connecting line
- **Right:** Phone mockup card with `AnimatedNotificationList` — 4 notifications cycle in a loop (Réservation confirmée → Infirmière en route → Arrivée confirmée → Soins terminés), then reset after a pause

Animation ease uses `"easeOut" as const` (not array tuples) to avoid Framer Motion TypeScript errors.

---

## Blog (`Blog.tsx`)

Bento-grid layout (`md:grid-cols-5`):
- **Featured card** (col-span-3): full-bleed image, dark gradient overlay, tags at top, content at bottom
- **Two small cards** (col-span-2, stacked): image thumbnail + green tag pills + title + ArrowUpRight hover badge

Blog articles are **not rendered on the page** — they are accessible via the **Articles dropdown in the Header navbar**.

---

## NursingMapSection (`NursingMapSection.tsx`)

Live dispatch map section with:
- Animated SVG GPS map (`gps-map.tsx`) showing 5 vehicles moving along routes
- Vehicle animation speeds: Route A 8s, B 11s, C 7s, D 9.5s, E 7.5s (deliberately slow/realistic)
- Feature bullets: matching time, certified nurses, GPS tracking
- All text uses `t('map.*')` keys

---

## Features (`Features.tsx`)

Bento 2×2 grid built inside a single bordered container:
- **Top-left:** GPS tracking label + dotted map of Canada (DottedMap height=55) with Quebec pin at `cx=35.5, cy=14.8` (equirectangular: x=(106.4/360)×120, y=(44.5/180)×60). Single center dot + 2 animated pulse rings.
- **Top-right:** Animated chat bubbles (patient → system pill → typing indicator → nurse reply), loops automatically
- **Stat bar (full-width):** `< 2 min` matching, `98%` satisfaction, `24/7` availability
- **Area chart (full-width):** Platform growth (soins + matchs IA, Jan–Jun)

Chat messages are computed inside the component using `t('features.chat.*')` keys.

---

## Services (`Services.tsx`)

- 3 service cards: personalized tracking (scheduling UI), precise matching (doctor icon + connector), clinical monitoring (health area chart)
- **CTA banner:** Flat North America dotted map (`FlatNAMap` from `globe.tsx`) on the right, text + CTA button on left
- All text uses `t('services.*')` keys

---

## Globe / Map (`client/src/components/ui/globe.tsx`)

Two exports:
- **`Globe`** — original 3D cobe WebGL globe (kept for backward compat, not currently used on page)
- **`FlatNAMap`** — flat SVG dotted map of North America using DottedMap (height=80). Filters points to NA bounds (x: 4–63, y: 7–36), viewBox `3.5 6.5 60 30`. Montreal marker at `MTL_X=51.4, MTL_Y=20.8`. Single solid dot + 2 animated pulse rings.

**Important:** DottedMap's `getPoints()` returns `{x, y}` coordinates, NOT `{lat, lng}`. Always filter/position using `p.x` and `p.y` directly.

---

## GPS Map (`client/src/components/ui/gps-map.tsx`)

Animated SVG with 5 nurse vehicles moving along preset SVG paths using `<animateMotion>`. Speeds are deliberately slow (7–11s per loop) to look realistic.

---

## Pillars (`Pillars.tsx`)

Uses `CircularTestimonials` component with 4 Quebec patient/nurse testimonials (hardcoded in French — intentional, they are authentic-sounding Quebec voices). Section header uses `t('pillars.*')` keys.

---

## CircularTestimonials (`client/src/components/ui/circular-testimonials.tsx`)

3D fan carousel:
- Active testimonial centered at full scale
- Left/right neighbors fan back (`rotateY(±15deg)`, `scale(0.85)`, offset by calculated `gap`)
- Word-by-word blur-fade animation on quote text
- Prev/next arrow buttons, dot indicators, 5s autoplay
- Colors/font sizes fully configurable via props
- Uses inline styles (not Tailwind) to avoid className conflicts

---

## i18n (`LanguageContext.tsx`)

- **Auto-detection:** On mount, checks `navigator.language.startsWith('fr')` → defaults to `FR`; otherwise `EN`. SSR defaults to `FR`.
- **Translation keys by section:** `header.*`, `hero.*`, `howItWorks.*`, `features.*` (incl. `chat.*`, `stat.*`, `activity.*`), `map.*`, `services.*`, `trust.*`, `blog.*`, `faq.*`, `contact.*`, `stats.*`, `pillars.*`, `newsletter.*`, `footer.*`
- All user-facing strings in every section use `t('key')` — no hardcoded French or English in JSX

---

## New UI Components Added

| File | Purpose |
|---|---|
| `client/src/components/ui/globe.tsx` | `Globe` (3D cobe) + `FlatNAMap` (flat dotted SVG) |
| `client/src/components/ui/gps-map.tsx` | Animated SVG nurse dispatch map |
| `client/src/components/ui/circular-testimonials.tsx` | 3D fan testimonial carousel |
| `client/src/components/ui/chart.tsx` | shadcn ChartContainer, ChartTooltip wrappers (recharts) |
| `client/src/components/ui/card.tsx` | shadcn Card component |
| `client/src/components/ui/scroll-area.tsx` | Radix ScrollArea wrapper |
| `client/src/components/ui/x-scroll.tsx` | Horizontal scroll container |
| `client/src/components/sections/NursingMapSection.tsx` | Live dispatch map section |

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
| `client/src/contexts/LanguageContext.tsx` | FR/EN translations + browser language auto-detection |
| `client/src/components/layout/Header.tsx` | Scroll-hide navbar with Articles dropdown |
| `client/src/components/sections/*.tsx` | One file per landing page section |
| `client/src/components/ui/globe.tsx` | Globe (3D) + FlatNAMap (flat SVG dotted map) |
| `client/src/components/ui/gps-map.tsx` | Animated GPS dispatch map |
| `client/src/components/ui/circular-testimonials.tsx` | Testimonial carousel |
| `client/prisma/schema.prisma` | Database schema (WaitlistEntry) |
| `video/src/MobiSoinsPromo.tsx` | Video timeline + brand colors |

---

## Important Conventions

- **i18n:** All user-facing strings use `t('key')` from `useLanguage()`. Add keys to both FR and EN in `LanguageContext.tsx`. Browser language auto-detects on first load.
- **Colors:** Never hardcode hex — use Tailwind classes from `@theme` in `globals.css`. (Note: many components currently use inline `style={{ color: '#4e6645' }}` — acceptable for Orion design, but new additions should use Tailwind classes.)
- **Tailwind v4:** `@theme` block is source of truth. `tailwind.config.js` is NOT auto-loaded.
- **Components:** All with hooks/motion need `'use client'` directive.
- **Icons:** No brand icons from lucide-react (removed in v1) — use inline SVGs.
- **Framer Motion easing:** Use `"easeOut" as const` (or named strings) — NOT array tuples like `[0.16, 1, 0.3, 1]` which cause TypeScript errors with strict Framer Motion types.
- **DottedMap coordinates:** `getPoints()` returns `{x, y}`, NOT `{lat, lng}`. Use equirectangular projection to convert geo coords to map coords.
- **Prisma:** v6 only. Do not upgrade to v7 — breaks the schema URL syntax.
- **Deploy:** Netlify + `@netlify/plugin-nextjs`. Push to `main` triggers auto-deploy.
- **Pricing section:** Removed from the landing page — do not re-add unless explicitly requested.
- **Blog section:** Removed from page body — accessible only via the Articles dropdown in the Header.
