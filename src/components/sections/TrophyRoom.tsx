'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { caseStudies } from '@/data/site'
import type { CaseStudy } from '@/data/site'

// ─── Constants ────────────────────────────────────────────────────────────────

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

// Short trophy metrics: numeric where available, derived from data for others
const TROPHY_METRICS = [
  '500K+',    // Mydecorya: from headlineMetric
  '40%',      // Care Pharmacy: from headlineMetric
  '#1 Local', // Batley Pharmacy: from "sustained local dominance"
  'RANKED',   // Exeter Diesels: from "ranking on Google UK"
  '15K+',     // Hope Welfare Trust: Claude MCP-driven SEO traffic
]

const TROPHY_SUBLABELS = [
  'Monthly organic visits',
  'Organic traffic increase',
  'Local dominance in UK healthcare',
  'Used vans site on Google UK',
  'CLAUDE MCP-DRIVEN SEO',
]

// 6-column grid: top row 3 cases (each spans 2 cols), bottom 2 centered (1-col gap each side)
const DESKTOP_SLOTS: React.CSSProperties[] = [
  { gridColumn: '1 / 3', gridRow: '1' },
  { gridColumn: '3 / 5', gridRow: '1' },
  { gridColumn: '5 / 7', gridRow: '1' },
  { gridColumn: '2 / 4', gridRow: '2' },
  { gridColumn: '4 / 6', gridRow: '2' },
]

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': caseStudies.map((s) => ({
    '@type': 'CreativeWork',
    '@id': `#case-study-${s.id}`,
    name: s.name,
    description: s.description,
    abstract: s.headlineMetric,
    author: { '@type': 'Person', name: 'Ijaz Ahmed' },
    dateCreated: s.year.split(' ')[0],
    keywords: s.tags.join(', '),
  })),
})

// ─── DisplayCase ──────────────────────────────────────────────────────────────

function DisplayCase({
  study,
  index,
  onOpen,
  wrapperRef,
  desktopSlot,
}: {
  study: CaseStudy
  index: number
  onOpen: (s: CaseStudy) => void
  wrapperRef: (el: HTMLDivElement | null) => void
  desktopSlot?: React.CSSProperties
}) {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  return (
    // Wrapper: GSAP animates opacity + y on this element.
    // opacity is NOT in the React style prop — only GSAP owns it to avoid
    // React reconciliation resetting it on re-renders triggered by hover state.
    <div
      ref={wrapperRef}
      style={{
        aspectRatio: desktopSlot ? '3 / 4' : undefined,
        minHeight: desktopSlot ? undefined : '220px',
        ...desktopSlot,
      }}
    >
      {/* Article: handles all hover behavior, never touched by GSAP */}
      <article
        className="group relative h-full cursor-pointer select-none overflow-hidden focus-visible:outline-none"
        style={{
          background: 'linear-gradient(160deg, #141414 0%, #0d0d0d 65%, #111111 100%)',
          borderRadius: '4px',
          padding: '1.75rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 24px rgba(0,0,0,0.7), 0 16px 60px rgba(0,0,0,0.4)',
          transform: hovered && !reduced ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.35s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(study)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen(study)
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${study.name} case study`}
      >
        {/* Amber spotlight cone descending from above — fills top portion of case */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: '65%',
            background: hovered && !reduced
              ? 'radial-gradient(ellipse 80% 150% at 50% -8%, rgba(255,184,0,0.45) 0%, rgba(255,184,0,0.18) 38%, transparent 68%)'
              : 'radial-gradient(ellipse 80% 150% at 50% -8%, rgba(255,184,0,0.22) 0%, rgba(255,184,0,0.08) 38%, transparent 68%)',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Spotlight source dot at top center */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: hovered && !reduced ? 'rgba(255,184,0,0.9)' : 'rgba(255,184,0,0.4)',
            boxShadow: hovered && !reduced
              ? '0 0 8px 4px rgba(255,184,0,0.5)'
              : '0 0 4px 2px rgba(255,184,0,0.2)',
            transition: 'all 0.4s ease',
          }}
        />

        {/* Glass edge glow: subtle cyan border, brightens on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: '4px',
            border: hovered && !reduced
              ? '1px solid rgba(0,240,255,0.85)'
              : '1px solid rgba(0,240,255,0.14)',
            boxShadow: hovered && !reduced
              ? 'inset 0 0 24px rgba(0,240,255,0.07), 0 0 48px rgba(0,240,255,0.12)'
              : 'inset 0 0 10px rgba(0,240,255,0.02)',
            transition: 'border 0.35s ease, box-shadow 0.35s ease',
          }}
        />

        {/* Glass side-edge highlights: faint vertical lines to suggest physical case walls */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(255,255,255,0.04) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(255,255,255,0.04) 100%)' }}
        />

        {/* Focus ring for keyboard navigation */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-focus-visible:opacity-100"
          style={{ borderRadius: '4px', boxShadow: '0 0 0 2px #00F0FF, 0 0 0 4px rgba(0,240,255,0.2)' }}
        />

        {/* ── Case contents ── */}
        <div className="relative z-10 flex h-full flex-col">

          {/* Roman numeral label + decorative line */}
          <div className="mb-4 flex items-center gap-3" aria-hidden="true">
            <span
              className="shrink-0 font-mono text-[10px] tracking-[0.5em]"
              style={{ color: 'rgba(0,240,255,0.5)' }}
            >
              {ROMAN[index]}
            </span>
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(to right, rgba(0,240,255,0.22), rgba(0,240,255,0.05), transparent)' }}
            />
          </div>

          {/* Push trophy toward vertical center */}
          <div className="flex-1" />

          {/* The trophy: huge amber metric number */}
          <motion.div
            className="mb-1 font-mono font-bold leading-none"
            style={{
              color: '#FFB800',
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              textShadow: '0 0 32px rgba(255,184,0,0.65), 0 0 64px rgba(255,184,0,0.28)',
              transform: hovered && !reduced ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.3s ease',
              display: 'block',
              lineHeight: 1,
            }}
            animate={reduced ? {} : { opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
          >
            {TROPHY_METRICS[index]}
          </motion.div>

          {/* Sub-label below the metric */}
          <p
            className="mb-5 font-mono text-[8.5px] uppercase tracking-[0.3em]"
            style={{ color: 'rgba(255,184,0,0.5)' }}
          >
            {TROPHY_SUBLABELS[index]}
          </p>

          {/* Thin separator */}
          <div
            className="mb-4 h-px w-10"
            aria-hidden="true"
            style={{ background: 'linear-gradient(to right, rgba(0,240,255,0.28), transparent)' }}
          />

          {/* Project name */}
          <h3
            className="mb-1 font-sans font-bold leading-snug text-white"
            style={{ fontSize: '0.95rem', letterSpacing: '0.02em' }}
          >
            {study.name}
          </h3>

          {/* Year */}
          <p
            className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em]"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            {study.year}
          </p>

          {/* Push VIEW prompt to bottom */}
          <div className="flex-1" />

          {/* VIEW CASE STUDY pulse prompt */}
          <motion.p
            className="font-mono text-[8px] uppercase tracking-[0.45em]"
            style={{ color: 'rgba(0,240,255,0.55)' }}
            animate={reduced ? {} : { opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.45 }}
            aria-hidden="true"
          >
            View Case Study
          </motion.p>
        </div>
      </article>
    </div>
  )
}

// ─── CaseStudyModal ───────────────────────────────────────────────────────────

function CaseStudyModal({
  study,
  onClose,
}: {
  study: CaseStudy
  onClose: () => void
}) {
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
      aria-label={`${study.name} case study`}
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,4,4,0.88)', backdropFilter: 'blur(10px)' }}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? {} : { opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl"
        style={{
          maxHeight: '88vh',
          overflowY: 'auto',
          background: 'linear-gradient(145deg, #141414 0%, #0d0d0d 100%)',
          border: '1px solid rgba(0,240,255,0.22)',
          borderRadius: '6px',
          boxShadow: '0 32px 96px rgba(0,0,0,0.95), 0 0 80px rgba(0,240,255,0.07)',
        }}
      >
        {/* Sticky top bar */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-7 py-4"
          style={{
            background: 'linear-gradient(to bottom, #141414 75%, transparent)',
            borderBottom: '1px solid rgba(0,240,255,0.1)',
          }}
        >
          <span
            className="font-mono text-[9px] uppercase tracking-[0.5em]"
            style={{ color: 'rgba(0,240,255,0.4)' }}
          >
            Case Study
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
            aria-label="Close case study"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="px-7 pb-12 pt-6">
          <h2
            className="font-sans font-bold leading-tight text-white"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', marginBottom: '0.35rem' }}
          >
            {study.name}
          </h2>

          <p
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em]"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            {study.year}
          </p>

          <div
            className="mb-7"
            style={{
              background: 'rgba(0,240,255,0.05)',
              border: '1px solid rgba(0,240,255,0.14)',
              borderLeft: '3px solid rgba(0,240,255,0.55)',
              borderRadius: '2px',
              padding: '1rem 1.25rem',
            }}
          >
            <p
              className="font-mono font-bold leading-snug"
              style={{
                color: '#00F0FF',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
                textShadow: '0 0 20px rgba(0,240,255,0.35)',
              }}
            >
              {study.headlineMetric}
            </p>
          </div>

          <p
            className="mb-8 font-sans text-sm leading-relaxed sm:text-base"
            style={{ color: 'rgba(255,255,255,0.68)' }}
          >
            {study.description}
          </p>

          <div className="mb-8">
            <p
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.45em]"
              style={{ color: 'rgba(0,240,255,0.45)' }}
            >
              Key Wins
            </p>
            <ul className="space-y-3" role="list">
              {study.keyWins.map((win, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: 'rgba(0,240,255,0.6)' }}
                    aria-hidden="true"
                  />
                  {win}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-[0.2em]"
                style={{
                  background: 'rgba(0,240,255,0.07)',
                  border: '1px solid rgba(0,240,255,0.18)',
                  borderRadius: '2px',
                  color: 'rgba(0,240,255,0.6)',
                  padding: '3px 8px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── TrophyRoom (main export) ─────────────────────────────────────────────────

export default function TrophyRoom() {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null)
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([])

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveStudy(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = activeStudy ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeStudy])

  // GSAP ScrollTrigger: cases fade in + rise with 150ms stagger
  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const isDesktop = window.innerWidth >= 1024
    const refs = (isDesktop ? desktopRefs : mobileRefs).current.filter(Boolean) as HTMLDivElement[]
    if (!refs.length || !sectionRef.current) return

    // Set initial invisible state imperatively — React's style prop does NOT
    // include opacity, so GSAP fully owns the inline opacity across re-renders.
    gsap.set(refs, { opacity: 0, y: 30 })

    const ctx = gsap.context(() => {
      gsap.to(refs, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'y',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [reduced])

  // prefers-reduced-motion: show all cases immediately
  useEffect(() => {
    if (!reduced) return
    const allRefs = [...desktopRefs.current, ...mobileRefs.current].filter(Boolean) as HTMLDivElement[]
    allRefs.forEach((el) => { el.style.opacity = '1' })
  }, [reduced])

  return (
    <section
      id="trophy-room"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', paddingTop: '7rem', paddingBottom: '9rem' }}
      aria-labelledby="trophy-room-heading"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />

      {/* ── Room atmosphere layers ── */}

      {/* Faint wall texture: vertical gradient lines suggesting interior paneling */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to right,
              rgba(255,255,255,0.012) 0px, transparent 1px,
              transparent 120px, rgba(255,255,255,0.012) 121px
            )
          `,
        }}
      />

      {/* Ambient radial vignette + corner cyan glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 45% 70% at 0% 50%, rgba(0,240,255,0.035) 0%, transparent 70%),
            radial-gradient(ellipse 45% 70% at 100% 50%, rgba(0,240,255,0.035) 0%, transparent 70%),
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,184,0,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0,0,0,0.3) 0%, transparent 100%)
          `,
        }}
      />

      {/* Polished gallery floor: reflective gradient in the bottom 28% */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: '28%',
          background: `
            linear-gradient(
              to top,
              rgba(255,184,0,0.04) 0%,
              rgba(0,240,255,0.025) 25%,
              transparent 100%
            )
          `,
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.7, ease: 'easeOut' }}
        >
          <p
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em]"
            style={{ color: 'rgba(0,240,255,0.5)' }}
          >
            05 / Exhibits
          </p>
          <h2
            id="trophy-room-heading"
            className="font-sans font-bold leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '1rem' }}
          >
            Trophy Room
          </h2>
          <p
            className="max-w-md font-sans"
            style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem', lineHeight: '1.75' }}
          >
            Five cases. Five wins. The numbers tell the story.
          </p>
        </motion.div>

        {/* ── Desktop: 3+2 museum grid (lg+) ── */}
        <div
          className="hidden lg:grid"
          style={{
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '1.25rem',
          }}
        >
          {caseStudies.map((study, i) => (
            <DisplayCase
              key={study.id}
              study={study}
              index={i}
              onOpen={setActiveStudy}
              wrapperRef={(el) => { desktopRefs.current[i] = el }}
              desktopSlot={DESKTOP_SLOTS[i]}
            />
          ))}
        </div>

        {/* ── Mobile + Tablet: responsive 1-2 column grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {caseStudies.map((study, i) => (
            <DisplayCase
              key={study.id}
              study={study}
              index={i}
              onOpen={setActiveStudy}
              wrapperRef={(el) => { mobileRefs.current[i] = el }}
            />
          ))}
        </div>
      </div>

      {/* ── Case study modal ── */}
      <AnimatePresence>
        {activeStudy && (
          <CaseStudyModal
            study={activeStudy}
            onClose={() => setActiveStudy(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
