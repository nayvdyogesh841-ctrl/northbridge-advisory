# Northbridge Advisory

A premium marketing website for a Chartered Accountancy & business-advisory firm.
Built as a production-grade single-page experience with a "Graphite & Silk" dark
aesthetic, a Spline-powered hero, a liquid-glass design language, and a
performance-first motion system.

## Tech stack

- **[Next.js 14](https://nextjs.org/)** (App Router, static export) + **React 18**
- **TypeScript** (strict)
- **Tailwind CSS 3** with a token-driven design system
- **Framer Motion 11** for choreographed, GPU-accelerated motion
- A lazy-loaded **Spline** community scene (`Clarity Stream`, CC0) in the hero

No backend, database, or environment variables are required — the site renders
fully static.

## Getting started

Requires **Node.js 18.17+** (Node 20 LTS recommended).

```bash
# 1. install dependencies
npm install

# 2. start the dev server  →  http://localhost:3021
npm run dev
```

### Available scripts

| Script          | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the dev server on port **3021**         |
| `npm run build` | Production build (fully static prerender)      |
| `npm run start` | Serve the production build on port **3021**    |
| `npm run lint`  | Run ESLint (`next lint`)                        |

## Project structure

```
app/           # App Router entry (layout, page, providers, robots, sitemap)
components/     # Reusable UI + motion primitives (Button, glass, LiquidLight, …)
sections/       # Page sections (Hero, Services, Process, Testimonials, FAQ, …)
hooks/          # useActiveSection, useCountUp
lib/            # content.ts (all copy/data), motion.ts (shared variants)
types/          # Shared TypeScript types
utils/          # Small helpers (cn)
public/         # Static assets (advisor portrait)
```

All site copy and data lives in [`lib/content.ts`](lib/content.ts) — edit there
to update text, services, testimonials, stats, and firm details.

## Configuration notes

- **No environment variables** are needed to run or build.
- The hero embeds a public Spline viewer via `<iframe>` (desktop only, lazy,
  paused off-screen); it degrades to a hand-built CSS poster on mobile and under
  `prefers-reduced-motion`. No API key is involved.
- Canonical URL / SEO metadata is set in [`lib/content.ts`](lib/content.ts)
  (`site.url`) and consumed by `app/layout.tsx`, `sitemap.ts`, and `robots.ts`.
  Update `site.url` to your production domain before deploying.

## Deployment

The app is a static Next.js build and deploys anywhere that supports Next 14.

**Vercel (recommended):**

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Vercel
   auto-detects Next.js.
3. No environment variables to configure. Deploy.

**Any Node host:**

```bash
npm run build
npm run start   # serves on port 3021
```

## Accessibility & performance

- Semantic landmarks, skip link, focus-visible styles, ARIA on nav/FAQ/form.
- All motion honors `prefers-reduced-motion` (Framer `MotionConfig` + CSS reset).
- Animations are transform/opacity only, IntersectionObserver-gated, and paused
  when off-screen; heavy assets (Spline) are lazy and desktop-only.

## License

Private. The `Clarity Stream` hero scene is used under CC0 from the Spline
community.
