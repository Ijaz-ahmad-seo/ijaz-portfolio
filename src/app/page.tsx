import type { Metadata } from 'next'
import HeroHallway from '@/components/sections/HeroHallway'
import Reception from '@/components/sections/Reception'
import ServicesCorridor from '@/components/sections/ServicesCorridor'
import TrophyRoom from '@/components/sections/TrophyRoom'
import BuiltByMeGallery from '@/components/sections/BuiltByMeGallery'
import CertificationsWall from '@/components/sections/CertificationsWall'

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

      {/* ── Stage 4: Services Corridor — 9 interactive 3D doors ── */}
      <ServicesCorridor />

      {/* ── Stage 5: Trophy Room — 5 case study modals ──────────── */}
      <TrophyRoom />

      {/* ── Stage 6: Built By Me Gallery — horizontal scroll ────── */}
      <BuiltByMeGallery />

      {/* ── Stage 7: Certifications Wall — spotlight reveal ──────── */}
      <CertificationsWall />
    </>
  )
}
