import type { Metadata } from 'next'
import HeroHallway from '@/components/sections/HeroHallway'

export const metadata: Metadata = {
  title: 'Ijaz Ahmed — SEO Expert & Digital Growth Strategist',
  description:
    'SEO Manager at Trickle Up. Scaled Mydecorya.com to 500K+ monthly organic visits. Specializing in Technical SEO, AEO, GEO, and AI Optimization.',
  openGraph: {
    title: 'Ijaz Ahmed — SEO Expert',
    description: 'SEO expert who builds the websites he ranks.',
  },
}

export default function HomePage() {
  return (
    <>
      {/* ── Stage 2: 3D Entry Hallway ─────────────────────────── */}
      <HeroHallway />

      {/* ── Reception (placeholder — becomes Stage 3) ─────────── */}
      <main
        id="reception"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Radial cyan glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0, 240, 255, 0.05) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
          <p className="mb-8 font-mono text-xs tracking-[0.35em] uppercase text-cyan-accent/50">
            SEO Manager · Trickle Up
          </p>

          <h1
            className="glow-text font-sans font-bold leading-none tracking-tight text-white"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
          >
            Ijaz Ahmed
          </h1>

          <p className="mt-6 max-w-md font-sans text-base text-white/40 md:text-lg">
            SEO expert who builds the websites he ranks.
          </p>
        </div>
      </main>
    </>
  )
}
