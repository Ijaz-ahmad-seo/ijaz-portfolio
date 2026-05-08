import type { Metadata } from 'next'
import HeroHallway from '@/components/sections/HeroHallway'
import Reception from '@/components/sections/Reception'

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

      {/* ── Stage 3: Reception — About + Animated Stats + Story ── */}
      <Reception />
    </>
  )
}
