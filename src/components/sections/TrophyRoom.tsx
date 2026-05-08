'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { caseStudies } from '@/data/site'
import type { CaseStudy } from '@/data/site'

// ─── Layout ───────────────────────────────────────────────────────────────────

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

// Salon-hang gallery wall: MYDECORYA (index 0) is the tall hero on the left.
// Indices 1-4 fill a 2x2 grid on the right.
const GRID_SLOTS: React.CSSProperties[] = [
  { gridColumn: '1', gridRow: '1 / 3' }, // MYDECORYA — full left column
  { gridColumn: '2', gridRow: '1' },      // CARE PHARMACY
  { gridColumn: '2', gridRow: '2' },      // BATLEY PHARMACY
  { gridColumn: '3', gridRow: '1' },      // EXETER DIESELS
  { gridColumn: '3', gridRow: '2' },      // HOPE WELFARE TRUST
]

// ─── Particles ────────────────────────────────────────────────────────────────

// Deterministic positions — no Math.random() to avoid hydration mismatch
const DUST = [
  { id: 0,  l: 8,  b: 20, d: 14, dl: 0.0,  o: 0.40 },
  { id: 1,  l: 15, b: 55, d: 9,  dl: 1.3,  o: 0.25 },
  { id: 2,  l: 23, b: 10, d: 12, dl: 0.7,  o: 0.35 },
  { id: 3,  l: 32, b: 72, d: 11, dl: 2.1,  o: 0.20 },
  { id: 4,  l: 41, b: 35, d: 8,  dl: 0.4,  o: 0.30 },
  { id: 5,  l: 5,  b: 80, d: 15, dl: 1.8,  o: 0.20 },
  { id: 6,  l: 58, b: 15, d: 10, dl: 0.9,  o: 0.40 },
  { id: 7,  l: 67, b: 60, d: 13, dl: 2.5,  o: 0.25 },
  { id: 8,  l: 75, b: 42, d: 9,  dl: 1.2,  o: 0.35 },
  { id: 9,  l: 84, b: 88, d: 16, dl: 3.0,  o: 0.20 },
  { id: 10, l: 92, b: 25, d: 11, dl: 0.3,  o: 0.30 },
  { id: 11, l: 49, b: 5,  d: 8,  dl: 1.6,  o: 0.45 },
  { id: 12, l: 19, b: 92, d: 18, dl: 2.8,  o: 0.15 },
  { id: 13, l: 36, b: 48, d: 10, dl: 0.6,  o: 0.35 },
  { id: 14, l: 71, b: 70, d: 13, dl: 1.9,  o: 0.20 },
  { id: 15, l: 88, b: 38, d: 9,  dl: 0.1,  o: 0.30 },
  { id: 16, l: 27, b: 95, d: 14, dl: 3.4,  o: 0.15 },
  { id: 17, l: 54, b: 58, d: 7,  dl: 2.2,  o: 0.40 },
  { id: 18, l: 63, b: 82, d: 11, dl: 1.0,  o: 0.25 },
  { id: 19, l: 79, b: 96, d: 12, dl: 0.5,  o: 0.20 },
  { id: 20, l: 3,  b: 65, d: 15, dl: 2.7,  o: 0.30 },
  { id: 21, l: 44, b: 30, d: 8,  dl: 1.5,  o: 0.35 },
  { id: 22, l: 96, b: 52, d: 10, dl: 3.2,  o: 0.20 },
  { id: 23, l: 11, b: 44, d: 13, dl: 0.8,  o: 0.40 },
  { id: 24, l: 37, b: 78, d: 9,  dl: 2.0,  o: 0.25 },
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

// ─── TrophyFrame ─────────────────────────────────────────────────────────────

function TrophyFrame({
  study,
  index,
  onOpen,
  isMobile = false,
}: {
  study: CaseStudy
  index: number
  onOpen: (s: CaseStudy) => void
  isMobile?: boolean
}) {
  const reduced = useReducedMotion()
  const isHero = index === 0 && !isMobile

  const frameStyle: React.CSSProperties = {
    ...(isMobile ? {} : GRID_SLOTS[index]),
    background: 'linear-gradient(145deg, #141414 0%, #0c0c0c 60%, #111 100%)',
    border: '1px solid rgba(0,240,255,0.18)',
    borderRadius: '4px',
    padding: isMobile ? '1.5rem' : '1.75rem',
    boxShadow:
      '0 4px 24px rgba(0,0,0,0.65), 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,240,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <motion.article
      style={frameStyle}
      className="group relative cursor-pointer select-none focus-visible:outline-none"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: reduced ? 0 : 0.6,
        delay: reduced ? 0 : index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={reduced ? {} : { scale: 1.025, transition: { duration: 0.2, ease: 'easeOut' } }}
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
      {/* Hover glow border overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          borderRadius: '4px',
          boxShadow:
            'inset 0 0 0 1px rgba(0,240,255,0.5), 0 0 50px rgba(0,240,255,0.1), 0 0 100px rgba(0,240,255,0.04)',
        }}
        aria-hidden="true"
      />

      {/* Focus ring (keyboard navigation) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-focus-visible:opacity-100"
        style={{
          borderRadius: '4px',
          boxShadow: '0 0 0 2px #00F0FF, 0 0 0 4px rgba(0,240,255,0.2)',
        }}
        aria-hidden="true"
      />

      {/* Roman numeral + decorative line */}
      <div className="mb-5 flex items-center gap-3" aria-hidden="true">
        <span
          className="shrink-0 font-mono text-[10px] tracking-[0.45em]"
          style={{ color: 'rgba(0,240,255,0.35)' }}
        >
          {ROMAN[index]}
        </span>
        <div
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(to right, rgba(0,240,255,0.25), rgba(0,240,255,0.05), transparent)',
          }}
        />
      </div>

      {/* Project name */}
      <h3
        className="font-sans font-bold leading-tight text-white transition-colors duration-200 group-hover:text-cyan-accent"
        style={{ fontSize: isHero ? '1.65rem' : '1.1rem', marginBottom: '0.3rem' }}
      >
        {study.name}
      </h3>

      {/* Year */}
      <p
        className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em]"
        style={{ color: 'rgba(255,255,255,0.28)' }}
      >
        {study.year}
      </p>

      {/* Headline metric — the trophy plaque text */}
      <p
        className="font-mono font-bold leading-snug"
        style={{
          color: '#00F0FF',
          fontSize: isHero ? '1rem' : '0.82rem',
          textShadow: '0 0 18px rgba(0,240,255,0.45)',
          marginBottom: 'auto',
        }}
      >
        {study.headlineMetric}
      </p>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[8.5px] uppercase tracking-[0.2em]"
            style={{
              background: 'rgba(0,240,255,0.06)',
              border: '1px solid rgba(0,240,255,0.14)',
              borderRadius: '2px',
              color: 'rgba(0,240,255,0.5)',
              padding: '2px 6px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Click hint — appears on hover */}
      <p
        className="mt-3 font-mono text-[9px] uppercase tracking-[0.3em] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ color: 'rgba(0,240,255,0.35)' }}
        aria-hidden="true"
      >
        View details
      </p>
    </motion.article>
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

  // Focus the close button when modal mounts
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
          boxShadow:
            '0 32px 96px rgba(0,0,0,0.95), 0 0 80px rgba(0,240,255,0.07)',
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
          {/* Name */}
          <h2
            className="font-sans font-bold leading-tight text-white"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', marginBottom: '0.35rem' }}
          >
            {study.name}
          </h2>

          {/* Year */}
          <p
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em]"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            {study.year}
          </p>

          {/* Headline metric block */}
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

          {/* Description */}
          <p
            className="mb-8 font-sans text-sm leading-relaxed sm:text-base"
            style={{ color: 'rgba(255,255,255,0.68)' }}
          >
            {study.description}
          </p>

          {/* Key wins */}
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

          {/* Tags */}
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

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStudy(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = activeStudy ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeStudy])

  return (
    <section
      id="trophy-room"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '9rem' }}
      aria-labelledby="trophy-room-heading"
    >
      {/* JSON-LD structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />

      {/* Gallery spotlight atmosphere (CSS radial gradients) */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 40% at 50% -8%, rgba(0,240,255,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 5% 80%, rgba(0,240,255,0.04) 0%, transparent 55%),
            radial-gradient(ellipse 50% 55% at 95% 25%, rgba(0,240,255,0.03) 0%, transparent 55%),
            #0A0A0A
          `,
        }}
      />

      {/* Drifting dust particles */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {DUST.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.l}%`,
                bottom: `${p.b}%`,
                width: '2px',
                height: '2px',
                background: `rgba(0,240,255,${p.o})`,
              }}
              animate={{
                y: [0, -32, 0],
                opacity: [p.o, Math.min(p.o * 1.7, 0.75), p.o],
              }}
              transition={{
                duration: p.d,
                delay: p.dl,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.7, ease: 'easeOut' }}
        >
          <p
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em]"
            style={{ color: 'rgba(0,240,255,0.5)' }}
          >
            05 / Selected Work
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
            Real projects. Real results. Click any frame to read the full case study.
          </p>
        </motion.div>

        {/* ── Desktop: salon-hang gallery wall ──────────────────── */}
        <div
          className="hidden lg:grid"
          style={{
            gridTemplateColumns: '1.65fr 1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '1.125rem',
          }}
        >
          {caseStudies.map((study, i) => (
            <TrophyFrame
              key={study.id}
              study={study}
              index={i}
              onOpen={setActiveStudy}
            />
          ))}
        </div>

        {/* ── Mobile: stacked cards ──────────────────────────────── */}
        <div className="space-y-4 lg:hidden">
          {caseStudies.map((study, i) => (
            <TrophyFrame
              key={study.id}
              study={study}
              index={i}
              onOpen={setActiveStudy}
              isMobile
            />
          ))}
        </div>
      </div>

      {/* ── Case study modal ─────────────────────────────────────── */}
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
