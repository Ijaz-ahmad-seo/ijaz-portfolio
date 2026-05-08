'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { builtSites } from '@/data/site'
import type { BuiltSite } from '@/data/site'

// ─── GalleryFrame (desktop) ───────────────────────────────────────────────────

function GalleryFrame({
  site,
  index,
  onOpen,
}: {
  site: BuiltSite
  index: number
  onOpen: (s: BuiltSite) => void
}) {
  const reduced = useReducedMotion()

  return (
    // Wrapper carries `group` so spotlight above AND frame react to a single hover target
    <div className="group relative shrink-0" style={{ paddingTop: '80px' }}>

      {/* Amber spotlight beam — positioned above the frame, radiates downward */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 opacity-30 group-hover:opacity-80 transition-opacity duration-300"
        style={{
          height: '100px',
          background:
            'radial-gradient(ellipse 55% 100% at 50% 100%, rgba(255,184,0,0.32) 0%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Frame card */}
      <motion.article
        className="relative overflow-hidden cursor-pointer select-none focus-visible:outline-none"
        style={{
          width: '480px',
          height: '270px',
          background: 'linear-gradient(145deg, #141414 0%, #0d0d0d 60%, #111 100%)',
          border: '1px solid rgba(0,240,255,0.18)',
          borderRadius: '4px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,240,255,0.05)',
        }}
        whileHover={
          reduced
            ? {}
            : { y: -8, scale: 1.02, transition: { duration: 0.25, ease: 'easeOut' } }
        }
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.07 }}
        onClick={() => onOpen(site)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen(site)
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${site.name} details`}
      >
        {/* Internal amber wash from the top — clipped by overflow:hidden */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 opacity-20 group-hover:opacity-55 transition-opacity duration-300"
          style={{
            height: '55%',
            background:
              'radial-gradient(ellipse 85% 80% at 50% 0%, rgba(255,184,0,0.28) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Cyan border glow — fades in on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            borderRadius: '4px',
            boxShadow:
              'inset 0 0 0 1px rgba(0,240,255,0.55), 0 0 40px rgba(0,240,255,0.07)',
          }}
          aria-hidden="true"
        />

        {/* Focus ring */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 focus-visible:opacity-100"
          style={{
            borderRadius: '4px',
            boxShadow: '0 0 0 2px #00F0FF, 0 0 0 4px rgba(0,240,255,0.2)',
          }}
          aria-hidden="true"
        />

        {/* Frame content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8">
          <span
            className="font-mono text-[9px] tracking-[0.55em] uppercase"
            style={{ color: 'rgba(255,184,0,0.40)' }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <h3
            className="font-sans font-bold text-center leading-tight text-white group-hover:text-cyan-accent transition-colors duration-200"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.25rem)', maxWidth: '340px' }}
          >
            {site.name}
          </h3>

          <span
            className="font-mono text-[8.5px] uppercase tracking-[0.35em]"
            style={{
              background: 'rgba(0,240,255,0.07)',
              border: '1px solid rgba(0,240,255,0.22)',
              borderRadius: '2px',
              color: '#00F0FF',
              padding: '3px 10px',
            }}
          >
            {site.category}
          </span>
        </div>

        {/* Hover hint */}
        <p
          className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.35em] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          style={{ color: 'rgba(0,240,255,0.40)' }}
          aria-hidden="true"
        >
          View site
        </p>
      </motion.article>
    </div>
  )
}

// ─── MobileCard ───────────────────────────────────────────────────────────────

function MobileCard({
  site,
  index,
  onOpen,
}: {
  site: BuiltSite
  index: number
  onOpen: (s: BuiltSite) => void
}) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      className="group relative cursor-pointer select-none focus-visible:outline-none"
      style={{
        background: 'linear-gradient(145deg, #141414 0%, #0d0d0d 60%, #111 100%)',
        border: '1px solid rgba(0,240,255,0.18)',
        borderRadius: '4px',
        padding: '1.5rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.55)',
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: reduced ? 0 : 0.5,
        delay: reduced ? 0 : index * 0.06,
        ease: 'easeOut',
      }}
      whileHover={reduced ? {} : { scale: 1.015, transition: { duration: 0.2 } }}
      onClick={() => onOpen(site)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(site)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${site.name} details`}
    >
      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderRadius: '4px', boxShadow: 'inset 0 0 0 1px rgba(0,240,255,0.45)' }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span
            className="mb-2 block font-mono text-[9px] uppercase tracking-[0.45em]"
            style={{ color: 'rgba(255,184,0,0.45)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className="font-sans font-bold text-white group-hover:text-cyan-accent transition-colors duration-200 leading-snug"
            style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}
          >
            {site.name}
          </h3>
          <p
            className="font-sans text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.48)' }}
          >
            {site.description}
          </p>
        </div>
        <span
          className="shrink-0 font-mono text-[8px] uppercase tracking-[0.25em]"
          style={{
            background: 'rgba(0,240,255,0.07)',
            border: '1px solid rgba(0,240,255,0.20)',
            borderRadius: '2px',
            color: '#00F0FF',
            padding: '3px 8px',
            marginTop: '2px',
          }}
        >
          {site.category}
        </span>
      </div>
    </motion.article>
  )
}

// ─── SiteModal ────────────────────────────────────────────────────────────────

function SiteModal({ site, onClose }: { site: BuiltSite; onClose: () => void }) {
  const reduced = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name} site details`}
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.90)', backdropFilter: 'blur(10px)' }}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? {} : { opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg"
        style={{
          background: 'linear-gradient(145deg, #141414 0%, #0d0d0d 100%)',
          border: '1px solid rgba(0,240,255,0.22)',
          borderRadius: '6px',
          boxShadow: '0 32px 96px rgba(0,0,0,0.95), 0 0 80px rgba(0,240,255,0.06)',
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(0,240,255,0.10)' }}
        >
          <span
            className="font-mono text-[9px] uppercase tracking-[0.5em]"
            style={{ color: 'rgba(0,240,255,0.40)' }}
          >
            Built By Me
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-200 hover:bg-amber-accent/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-accent"
            style={{
              color: '#FFB800',
              border: '1px solid rgba(255,184,0,0.35)',
              borderRadius: '2px',
              padding: '5px 12px',
            }}
            aria-label="Close"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-8 pt-6">
          {/* Category tag */}
          <span
            className="mb-3 inline-block font-mono text-[9px] uppercase tracking-[0.4em]"
            style={{
              background: 'rgba(0,240,255,0.07)',
              border: '1px solid rgba(0,240,255,0.18)',
              borderRadius: '2px',
              color: '#00F0FF',
              padding: '3px 9px',
            }}
          >
            {site.category}
          </span>

          {/* Site name */}
          <h2
            className="font-sans font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', marginBottom: '0.75rem' }}
          >
            {site.name}
          </h2>

          {/* Description */}
          <p
            className="mb-8 font-sans text-sm leading-relaxed sm:text-base"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            {site.description}
          </p>

          {/* Visit Site CTA */}
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent/60"
            style={{
              background: 'rgba(255,184,0,0.10)',
              border: '1px solid rgba(255,184,0,0.45)',
              borderRadius: '3px',
              color: '#FFB800',
              padding: '10px 22px',
              textShadow: '0 0 12px rgba(255,184,0,0.35)',
            }}
          >
            Visit Site
            <span aria-hidden="true" style={{ fontSize: '0.9em' }}>&#8599;</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── BuiltByMeGallery (main export) ──────────────────────────────────────────

export default function BuiltByMeGallery() {
  const [activeSite, setActiveSite] = useState<BuiltSite | null>(null)
  const reduced = useReducedMotion()
  // outerRef: tall div that provides the vertical scroll runway
  const outerRef = useRef<HTMLDivElement>(null)
  // trackRef: the flex row that GSAP translates horizontally
  const trackRef = useRef<HTMLDivElement>(null)

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSite(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = activeSite ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeSite])

  // GSAP horizontal scroll — desktop only, no pin:true to stay compatible with Lenis
  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined') return
    if (window.innerWidth < 1024) return
    if (!outerRef.current || !trackRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const outer = outerRef.current
    const track = trackRef.current
    const scrollDist = Math.max(0, track.scrollWidth - window.innerWidth)
    if (scrollDist === 0) return

    // Give the outer div enough height for the horizontal travel
    outer.style.height = `${window.innerHeight + scrollDist}px`

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollDist,
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          start: 'top top',
          end: `+=${scrollDist}`,
          scrub: 1,
        },
      })
    }, outer)

    return () => {
      ctx.revert()
      outer.style.height = ''
    }
  }, [reduced])

  return (
    <section
      id="built-by-me"
      aria-label="Built By Me"
      style={{ background: '#0A0A0A' }}
    >
      {/* ── Desktop: GSAP-driven horizontal gallery ────────────── */}
      <div ref={outerRef} className="hidden lg:block relative">
        {/* Sticky viewport — stays fixed while GSAP scrolls through the runway */}
        <div
          className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center"
          style={{ background: '#0A0A0A' }}
        >
          {/* Section header */}
          <motion.div
            className="shrink-0 px-20 pt-12 pb-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 0.65, ease: 'easeOut' }}
          >
            <p
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em]"
              style={{ color: 'rgba(0,240,255,0.50)' }}
            >
              06 / Built Projects
            </p>
            <h2
              className="font-sans font-bold leading-none text-white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '0.6rem' }}
            >
              Built By Me
            </h2>
            <p
              className="font-sans"
              style={{ color: 'rgba(255,255,255,0.36)', fontSize: '0.95rem', lineHeight: '1.75' }}
            >
              Six sites, designed and developed from scratch.
            </p>
          </motion.div>

          {/* Frames track — GSAP translates this on X axis */}
          <div
            ref={trackRef}
            className="flex items-end gap-12 px-20 pb-12"
            style={{ willChange: 'transform' }}
          >
            {builtSites.map((site, i) => (
              <GalleryFrame key={site.url} site={site} index={i} onOpen={setActiveSite} />
            ))}
            {/* Trailing spacer so the last frame has breathing room at the end */}
            <div className="shrink-0 w-16" aria-hidden="true" />
          </div>

          {/* Horizontal scroll hint */}
          <div
            className="absolute bottom-8 right-20 flex items-center gap-3 pointer-events-none select-none"
            aria-hidden="true"
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-accent/25" />
            <span
              className="font-mono text-[9px] uppercase tracking-[0.45em]"
              style={{ color: 'rgba(0,240,255,0.25)' }}
            >
              Scroll to explore
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-accent/25" />
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked cards ──────────────────────────────── */}
      <div className="lg:hidden px-5 py-20">
        <div className="max-w-2xl mx-auto">
          <p
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em]"
            style={{ color: 'rgba(0,240,255,0.50)' }}
          >
            06 / Built Projects
          </p>
          <h2
            className="font-sans font-bold leading-none text-white"
            style={{ fontSize: 'clamp(2rem, 7vw, 3rem)', marginBottom: '0.6rem' }}
          >
            Built By Me
          </h2>
          <p
            className="mb-12 font-sans"
            style={{ color: 'rgba(255,255,255,0.36)', fontSize: '0.9rem', lineHeight: '1.75' }}
          >
            Six sites, designed and developed from scratch.
          </p>

          <div className="space-y-4">
            {builtSites.map((site, i) => (
              <MobileCard key={site.url} site={site} index={i} onOpen={setActiveSite} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Site modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeSite && (
          <SiteModal site={activeSite} onClose={() => setActiveSite(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
