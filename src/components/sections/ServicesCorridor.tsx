'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/site'
import type { ServiceEntry } from '@/data/site'
import type { CorridorProgress } from '@/components/three/ServicesCorridorScene'

// ─── Dynamic import — WebGL must be client-only ───────────────────────────────

const ServicesCorridorScene = dynamic(
  () => import('@/components/three/ServicesCorridorScene'),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: '#050508' }}
      >
        <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-cyan-accent/40">
          Loading corridor
        </span>
      </div>
    ),
  }
)

// ─── Mobile card grid ─────────────────────────────────────────────────────────

function MobileGrid() {
  return (
    <div className="px-5 py-20" style={{ background: '#0A0A0A' }}>
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-cyan-accent/50 mb-3">
          04 / Services
        </p>
        <h2
          className="font-sans font-bold text-white mb-12 leading-tight"
          style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}
        >
          What I Do
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <MobileCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileCard({ service, index }: { service: ServiceEntry; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        background: 'rgba(10,10,10,0.95)',
        border: '1px solid rgba(0,240,255,0.15)',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        cursor: 'pointer',
      }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen((v) => !v) }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <span
            className="font-mono text-[9px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(0,240,255,0.4)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-mono font-bold text-cyan-accent text-sm tracking-wide mt-0.5">
            {service.title}
            {service.subtitle && (
              <span className="block font-normal text-[10px] text-cyan-accent/50 tracking-[0.15em]">
                {service.subtitle}
              </span>
            )}
          </h3>
        </div>
        <span
          className="font-mono text-cyan-accent/60 text-lg leading-none flex-shrink-0 mt-0.5 transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </div>

      <p className="font-mono text-[10px] tracking-wider uppercase text-cyan-accent/50 mb-2">
        {service.tagline}
      </p>

      {open && (
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,240,255,0.1)' }}>
          <p className="font-sans text-sm text-white/60 leading-relaxed mb-3">
            {service.longDescription}
          </p>
          <ul className="space-y-1">
            {service.offerings.map((o) => (
              <li key={o} className="flex items-start gap-2">
                <span className="text-cyan-accent/60 text-xs mt-0.5">+</span>
                <span className="font-sans text-xs text-white/55 leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── Service content panel (desktop 3D mode) ──────────────────────────────────

interface ServicePanelProps {
  service: ServiceEntry
  index: number
  onClose: () => void
  reducedMotion: boolean
}

function ServicePanel({ service, index, onClose, reducedMotion }: ServicePanelProps) {
  const panelId = `service-panel-${service.id}`

  return (
    <motion.div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} details`}
      initial={reducedMotion ? { opacity: 0 } : { x: '100%', opacity: 0 }}
      animate={reducedMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { x: '100%', opacity: 0 }}
      transition={
        reducedMotion
          ? { duration: 0.18 }
          : { type: 'spring', stiffness: 320, damping: 32 }
      }
      className="absolute right-0 top-0 h-full w-full sm:max-w-[420px] flex flex-col overflow-hidden"
      style={{
        background: 'rgba(5,5,8,0.94)',
        borderLeft: '1px solid rgba(0,240,255,0.14)',
        backdropFilter: 'blur(24px)',
        zIndex: 20,
      }}
    >
      {/* Panel header */}
      <div
        className="flex items-start justify-between px-8 pt-10 pb-6"
        style={{ borderBottom: '1px solid rgba(0,240,255,0.08)' }}
      >
        <div>
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-cyan-accent/45 block mb-2">
            {String(index + 1).padStart(2, '0')} / Service
          </span>
          <h2
            className="font-sans font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}
          >
            {service.title}
          </h2>
          {service.subtitle && (
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan-accent/50 mt-1">
              {service.subtitle}
            </p>
          )}
        </div>

        <button
          aria-label="Close panel"
          onClick={onClose}
          className="flex-shrink-0 mt-1 font-mono text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-70"
          style={{ color: '#FFB800' }}
        >
          Close
        </button>
      </div>

      {/* Panel body */}
      <div className="flex-1 overflow-y-auto px-8 py-7">
        {/* Tagline */}
        <p
          className="font-mono text-xs tracking-[0.22em] uppercase mb-5"
          style={{ color: 'rgba(0,240,255,0.65)' }}
        >
          {service.tagline}
        </p>

        {/* Description */}
        <p className="font-sans text-white/65 leading-[1.82] text-[0.92rem] mb-8">
          {service.longDescription}
        </p>

        {/* Offerings */}
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">
            Key Offerings
          </p>
          <ul className="space-y-3">
            {service.offerings.map((offering) => (
              <li key={offering} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-4 h-4 rounded-sm mt-0.5 flex items-center justify-center text-[9px]"
                  style={{ background: 'rgba(0,240,255,0.1)', color: '#00F0FF' }}
                  aria-hidden="true"
                >
                  +
                </span>
                <span className="font-sans text-[0.88rem] text-white/60 leading-relaxed">
                  {offering}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Panel footer */}
      <div
        className="px-8 py-6 flex gap-3"
        style={{ borderTop: '1px solid rgba(0,240,255,0.08)' }}
      >
        <button
          onClick={onClose}
          className="flex-1 font-mono text-[11px] tracking-[0.28em] uppercase py-3 rounded transition-all hover:opacity-80"
          style={{ border: '1px solid rgba(255,184,0,0.35)', color: '#FFB800' }}
        >
          Back to Corridor
        </button>
      </div>
    </motion.div>
  )
}

// ─── JSON-LD structured data ──────────────────────────────────────────────────

function ServiceJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SEO Services by Ijaz Ahmed',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.subtitle ? `${s.title} (${s.subtitle})` : s.title,
        description: s.longDescription,
        provider: {
          '@type': 'Person',
          name: 'Ijaz Ahmed',
          jobTitle: 'SEO Manager',
        },
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ─── ServicesCorridor (main export) ──────────────────────────────────────────

export default function ServicesCorridor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const progress = useRef<CorridorProgress>({ value: 0 })

  const [activeDoor, setActiveDoor] = useState<number | null>(null)
  const [showMobile, setShowMobile] = useState(false)
  const reducedMotion = useRef(false)

  // Detect mobile / no-WebGL on mount
  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const isMobile = window.innerWidth < 768
    let webglOk = true
    try {
      const c = document.createElement('canvas')
      if (!c.getContext('webgl') && !c.getContext('experimental-webgl')) webglOk = false
    } catch {
      webglOk = false
    }

    if (isMobile || !webglOk) setShowMobile(true)
  }, [])

  // GSAP scroll driver — same pattern as HeroHallway
  useEffect(() => {
    if (showMobile) return
    gsap.registerPlugin(ScrollTrigger)
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
      }

      // Drive progress 0 → 1 over the full 550 vh runway
      gsap.to(progress.current, {
        value: 1,
        ease: 'none',
        scrollTrigger: { ...trigger, scrub: true },
      })

      // Scroll hint fades out in first 5%
      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          opacity: 0,
          y: -10,
          scrollTrigger: { ...trigger, start: 'top top', end: '5% top', scrub: true },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [showMobile])

  // Keyboard: Escape closes panel, Tab cycles doors
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveDoor(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleDoorClick = (index: number) => {
    setActiveDoor((prev) => (prev === index ? null : index))
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section id="services" aria-label="Services section">

      {/* ── SEO: semantic HTML (always rendered, visually hidden) ────────────── */}
      <div className="sr-only" aria-hidden="false">
        <h2>SEO Services by Ijaz Ahmed</h2>
        {services.map((s) => (
          <article key={s.id} id={`service-panel-${s.id}`}>
            <h3>{s.subtitle ? `${s.title}: ${s.subtitle}` : s.title}</h3>
            <p>{s.tagline}</p>
            <p>{s.longDescription}</p>
            <ul>
              {s.offerings.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* ── Structured data ──────────────────────────────────────────────────── */}
      <ServiceJsonLd />

      {/* ── Keyboard-accessible door nav (screen-reader + tab nav) ───────────── */}
      <nav aria-label="Service doors" className="sr-only">
        {services.map((s, i) => (
          <button
            key={s.id}
            aria-expanded={activeDoor === i}
            aria-controls={`service-panel-${s.id}`}
            aria-label={`Open ${s.title} door`}
            onClick={() => handleDoorClick(i)}
          >
            {s.title}
          </button>
        ))}
        {activeDoor !== null && (
          <button aria-label="Close service panel" onClick={() => setActiveDoor(null)}>
            Close
          </button>
        )}
      </nav>

      {/* ── Mobile: card grid ─────────────────────────────────────────────────── */}
      {showMobile ? (
        <MobileGrid />
      ) : (
        // ── Desktop: 3D corridor ─────────────────────────────────────────────
        <div ref={containerRef} style={{ height: '450vh' }} className="relative">
          <div className="sticky top-0 h-screen w-full overflow-hidden">

            {/* 3D canvas */}
            <div className="absolute inset-0" aria-hidden="true">
              <Suspense
                fallback={
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: '#050508' }}
                  >
                    <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-cyan-accent/40">
                      Loading corridor
                    </span>
                  </div>
                }
              >
                <ServicesCorridorScene
                  progress={progress.current}
                  activeDoor={activeDoor}
                  onDoorClick={handleDoorClick}
                  services={services}
                />
              </Suspense>
            </div>

            {/* Section label overlay */}
            <div className="absolute top-8 left-8 pointer-events-none select-none" style={{ zIndex: 10 }}>
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25">
                04 / Services Corridor
              </p>
            </div>

            {/* Scroll hint */}
            <div
              ref={scrollHintRef}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none select-none"
              style={{ zIndex: 10 }}
            >
              <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-white/30">
                Scroll to explore
              </span>
              <div className="h-10 w-px animate-pulse bg-gradient-to-b from-cyan-accent/30 to-transparent" />
            </div>

            {/* Click hint when no panel is open */}
            <AnimatePresence>
              {activeDoor === null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-28 left-1/2 -translate-x-1/2 pointer-events-none select-none"
                  style={{ zIndex: 10 }}
                >
                  <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/18">
                    Click a door to open
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Backdrop dimmer when panel is open */}
            <AnimatePresence>
              {activeDoor !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'rgba(0,0,0,0.35)', zIndex: 15 }}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            {/* Service content panel */}
            <AnimatePresence mode="wait">
              {activeDoor !== null && (
                <ServicePanel
                  key={activeDoor}
                  service={services[activeDoor]}
                  index={activeDoor}
                  onClose={() => setActiveDoor(null)}
                  reducedMotion={reducedMotion.current}
                />
              )}
            </AnimatePresence>

          </div>
        </div>
      )}
    </section>
  )
}
