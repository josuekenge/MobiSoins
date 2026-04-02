# MobiSoins — Claude Code Guide

This file is read by Claude Code at the start of every session. It defines the design system, conventions, and rules that must be followed when making any frontend changes to this project.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 + custom `@theme` in `globals.css` |
| Animations | Framer Motion 12 |
| Icons | lucide-react v1 (no brand icons — use inline SVG instead) |
| Forms | react-hook-form + Zod validation |
| i18n | Custom `LanguageContext` (FR / EN) |
| Database | Prisma 6 + PostgreSQL |
| API | Next.js Route Handlers (`src/app/api/`) |
| Deployment | Netlify + `@netlify/plugin-nextjs` |

---

## Project Structure

```
client/
  src/
    app/                      # Next.js App Router
      layout.tsx              # Root layout (metadata, LanguageProvider)
      page.tsx                # Landing page (lazy-loads all sections)
      globals.css             # Tailwind @theme — source of truth for design tokens
      api/waitlist/route.ts   # POST handler for waitlist signups
      confidentialite/        # Privacy policy page
      conditions/             # Terms of service page
      cookies/                # Cookie policy page
    components/
      layout/
        Header.tsx            # Fixed top nav — 3-column: logo | links | lang+cta
        Footer.tsx            # 5-column grid + social icons
      sections/               # One file per landing page section
        Hero.tsx
        HowItWorks.tsx
        Features.tsx
        Services.tsx
        Trust.tsx
        Blog.tsx
        FAQ.tsx
        Newsletter.tsx
        ForNurses.tsx         # Exists but NOT rendered on landing page
      ui/
        Button.tsx            # <Button variant="primary|secondary|outline|ghost" size="sm|md|lg">
        Input.tsx             # <Input label error> with error/focus states
      legal/
        LegalLayout.tsx
        PrivacyPolicy.tsx
        TermsOfService.tsx
        CookiePolicy.tsx
    contexts/
      LanguageContext.tsx     # useLanguage() → { t, language, setLanguage }
  prisma/
    schema.prisma             # WaitlistEntry model
  next.config.ts
  tailwind.config.js          # Legacy config — DO NOT use for new tokens
```

> **Important:** Tailwind CSS v4 reads design tokens exclusively from the `@theme` block in `globals.css`. The `tailwind.config.js` file is kept for reference only and is NOT automatically loaded. Always add new colors/tokens to `globals.css`.

---

## Color System

All colors are defined in `client/src/app/globals.css` inside the `@theme` block. Never hardcode hex values in components — always use the Tailwind utility class.

### Navy Scale (primary dark-blue palette)
Used for headings, body text, dark UI elements.

| Token | Class | Hex |
|---|---|---|
| `--color-navy-50` | `navy-50` | `#f0f4f8` |
| `--color-navy-100` | `navy-100` | `#d9e2ec` |
| `--color-navy-200` | `navy-200` | `#bcccdc` |
| `--color-navy-300` | `navy-300` | `#9fb3c8` |
| `--color-navy-400` | `navy-400` | `#829ab1` |
| `--color-navy-500` | `navy-500` | `#627d98` |
| `--color-navy-600` | `navy-600` | `#486581` |
| `--color-navy-700` | `navy-700` | `#003366` |
| `--color-navy-800` | `navy-800` | `#003366` |
| `--color-navy-900` | `navy-900` | `#003366` |

**Common usage:** `text-navy-900` (headings), `text-navy-800` (nav text), `bg-navy-50` (subtle tinted backgrounds), `border-navy-100` (light borders).

### Blue Scale (custom override of Tailwind default blue)
Used for CTAs, interactive elements, links, accents.

| Token | Class | Hex |
|---|---|---|
| `--color-blue-50` | `blue-50` | `#eef6fc` |
| `--color-blue-100` | `blue-100` | `#dcebf9` |
| `--color-blue-200` | `blue-200` | `#b9d7f3` |
| `--color-blue-300` | `blue-300` | `#96c3ed` |
| `--color-blue-400` | `blue-400` | `#509ce1` |
| `--color-blue-500` | `blue-500` | `#003366` |
| `--color-blue-600` | `blue-600` | `#003366` |
| `--color-blue-700` | `blue-700` | `#003366` |
| `--color-blue-800` | `blue-800` | `#00264d` |
| `--color-blue-900` | `blue-900` | `#001f40` |

**Common usage:** `bg-blue-600` (primary CTA buttons), `text-blue-600` (links, badges, highlight text), `bg-blue-50` (icon containers, tinted section backgrounds), `ring-blue-50` (focus rings), `border-blue-100` (card borders).

> Note: `blue-500`, `blue-600`, and `blue-700` all resolve to `#003366` (navy) by design. Hover states on blue-600 buttons use `hover:bg-blue-700` but the color difference is intentional/subtle.

### Green Scale (accent — wellness/health)
Used for status indicators, success states, nature-themed accents.

| Token | Class | Hex |
|---|---|---|
| `--color-green-50` | `green-50` | `#f4f8f3` |
| `--color-green-100` | `green-100` | `#e6eee4` |
| `--color-green-200` | `green-200` | `#cddcc9` |
| `--color-green-300` | `green-300` | `#aebfa9` |
| `--color-green-400` | `green-400` | `#98B690` |
| `--color-green-500` | `green-500` | `#7da074` |
| `--color-green-600` | `green-600` | `#63825b` |
| `--color-green-700` | `green-700` | `#4e6645` |
| `--color-green-800` | `green-800` | `#3d5036` |
| `--color-green-900` | `green-900` | `#32412d` |

**Common usage:** `bg-green-400` / `bg-green-500` (live ping indicator in Hero), `bg-green-50` (subtle tinted section backgrounds).

### Semantic Tokens

| Token | Class | Hex | Usage |
|---|---|---|---|
| `--color-primary` | `primary` | `#003366` | Main brand color |
| `--color-primary-light` | `primary-light` | `#004080` | Hover state for primary |
| `--color-secondary` | `secondary` | `#98B690` | Accent green (nurse/wellness) |
| `--color-secondary-dark` | `secondary-dark` | `#7da074` | Hover state for secondary |
| `--color-accent` | `accent` | `#007BFF` | Bright blue highlight |
| `--color-accent-hover` | `accent-hover` | `#0056b3` | Hover for accent |
| `--color-background-light` | `background-light` | `#f5f7fa` | Page/body background |
| `--color-background-white` | `background-white` | `#ffffff` | Card/section white |
| `--color-surface` | `surface` | `#ffffff` | Surface elements |

### Social Icon Colors (inline SVG only — no lucide brand icons)
- Facebook: `text-blue-600` (`#003366`)
- Twitter/X: `text-blue-400` (`#509ce1`)
- Instagram: `text-pink-500`
- LinkedIn: `text-blue-700` (`#003366`)

---

## Typography

Three font families are loaded via Google Fonts.

| Token | Class | Font | Usage |
|---|---|---|---|
| `--font-sans` | `font-sans` | Inter | Body text (default) |
| `--font-heading` | `font-heading` | Poppins | All headings (h1–h6) |
| `--font-accent` | `font-accent` | Montserrat | Buttons, badges, labels |

### Heading Scale
```
Hero title:        text-5xl lg:text-7xl font-bold text-navy-900 tracking-tight
Section title:     text-4xl lg:text-5xl font-bold text-navy-900
Section subtitle:  text-xl text-gray-600 max-w-2xl mx-auto
Card title:        text-xl font-bold text-navy-900
Badge/label:       text-sm font-semibold text-blue-600
Body:              text-base text-gray-600 leading-relaxed
Small/caption:     text-sm text-gray-500
```

---

## Component Patterns

### Button (`src/components/ui/Button.tsx`)
```tsx
<Button variant="primary" size="md">Label</Button>
<Button variant="secondary" size="lg">Label</Button>
<Button variant="outline" size="sm">Label</Button>
<Button variant="ghost">Label</Button>
<Button isLoading>Label</Button>
```

| Variant | Background | Text | Ring |
|---|---|---|---|
| `primary` | `bg-primary` | white | `ring-primary` |
| `secondary` | `bg-secondary` | white | `ring-secondary` |
| `outline` | transparent | `text-primary` | `ring-primary` |
| `ghost` | transparent | `text-gray-600` | none |

All buttons: `rounded-full font-accent font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all`

> When adding inline CTA buttons in sections (not using the Button component), match the same shape: `rounded-2xl` or `rounded-full`, `font-bold`, `px-8 py-4`, `bg-blue-600 text-white hover:shadow-xl hover:scale-105 transition-all`.

### Input (`src/components/ui/Input.tsx`)
```tsx
<Input label="Email" error={errors.email?.message} {...register('email')} />
```
Shape: `rounded-lg px-4 py-2 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary`
Error: `border-red-500 focus:ring-red-500` + `<p className="text-red-500 text-sm">`

### Section Container
Every section uses this pattern:
```tsx
<section id="section-id" className="py-32 bg-white"> {/* or bg-background-light */}
  <div className="container-custom">  {/* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */}
    {/* Section header */}
    <div className="text-center mb-16">
      <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-3">Badge</p>
      <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-4">Title</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">Subtitle</p>
    </div>
    {/* Content */}
  </div>
</section>
```

### Feature / Info Card
```
bg-white p-6-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all
Icon container: w-12-14 h-12-14 bg-blue-50 rounded-2xl text-blue-600 (hover: bg-blue-600 text-white)
Title: text-xl font-bold text-navy-900
Body: text-sm text-gray-600 leading-relaxed
```

### Background Decoration (Gradient Blobs)
Reused across all sections:
```tsx
{/* Blob top-left */}
<div className="absolute top-0 left-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
{/* Blob bottom-right */}
<div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none" />
```

### Section Alternating Backgrounds
```
bg-white                  → default section
bg-background-light       → alternate section (very light gray)
bg-gradient-to-b from-blue-50 to-white  → feature-heavy section
```

---

## Animation Conventions

All scroll-triggered animations use Framer Motion with `viewport={{ once: true }}` so they fire once on scroll into view.

```tsx
// Standard card reveal
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>

// Hero elements (no whileInView — they animate on mount)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>

// Hover lift on cards
whileHover={{ y: -5 }}  // subtle
whileHover={{ y: -10 }} // prominent

// Hover scale on CTAs
className="hover:scale-105 transition-all"
```

Named animations (defined in `@theme`):
- `animate-fade-in` — `fadeIn 0.5s ease-out`
- `animate-slide-up` — `slideUp 0.5s ease-out`
- `animate-float` — `float 3s ease-in-out infinite`
- `animate-float-delayed` — float with 1.5s delay

---

## Internationalization

All user-facing strings must use the `useLanguage()` hook. Never hardcode French or English strings in JSX.

```tsx
'use client';
import { useLanguage } from '../../contexts/LanguageContext';

const MyComponent = () => {
  const { t, language, setLanguage } = useLanguage();
  return <h2>{t('section.key')}</h2>;
};
```

Translation keys are organized by section: `header.*`, `hero.*`, `howItWorks.*`, `features.*`, `services.*`, `trust.*`, `blog.*`, `faq.*`, `newsletter.*`, `footer.*`.

When adding new text, add the key to **both** `FR` and `EN` objects inside `LanguageContext.tsx`.

---

## Next.js Conventions

- All components with hooks, framer-motion, or browser APIs must have `'use client'` as the first line.
- Server Components (no `'use client'`) are only for `layout.tsx`, static page wrappers, and route handlers.
- Lazy-load all sections below the fold using `next/dynamic` in `page.tsx`.
- Navigation links use `import Link from 'next/link'` with `href=` (not `to=`).
- Environment variables use `NEXT_PUBLIC_` prefix (not `VITE_`).
- Images from external domains must be listed in `next.config.ts` under `images.remotePatterns`.

---

## Brand Icons Warning

`lucide-react` v1 removed all brand/social icons (Facebook, Twitter, Instagram, LinkedIn). These are replaced with inline SVG components in Footer.tsx and Trust.tsx. Do **not** try to import social brand icons from lucide-react.

---

## Key Rules for Making Changes

1. **Colors:** Always use Tailwind utility classes (`text-navy-900`, `bg-blue-600`). Never inline hex values. If a new color is needed, add it to the `@theme` block in `globals.css` first.

2. **New sections:** Follow the Section Container pattern above. Use `container-custom` for consistent max-width and padding. Add the new section to `src/app/page.tsx` with `next/dynamic`.

3. **New strings:** Add to both `FR` and `EN` in `LanguageContext.tsx`. Use `t('key')` in JSX.

4. **Buttons:** Use the `<Button>` component for standalone CTAs. For inline/custom CTAs, match `rounded-2xl font-bold bg-blue-600 text-white hover:scale-105 transition-all`.

5. **Responsiveness:** Mobile-first. Default styles target mobile, use `md:` and `lg:` for larger screens. Key breakpoints: stacked → 2-col at `md`, 3-col or side-by-side at `lg`.

6. **Motion:** Keep `viewport={{ once: true }}` on all scroll animations. Do not loop heavy animations. Respect `prefers-reduced-motion` (already set in `globals.css`).

7. **Prisma:** Uses v6 with `url = env("DATABASE_URL")` in `schema.prisma`. Do not upgrade to Prisma 7 — it breaks the schema URL syntax.
