'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { certifications } from '@/data/site'
import type { Certification } from '@/data/site'

// ─── Inline SVG logos ─────────────────────────────────────────────────────────

function SemrushLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="6" fill="rgba(255,100,45,0.15)" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="18"
        fill="#FF642D"
      >
        S
      </text>
    </svg>
  )
}

function GoogleLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="24" rx="4.5" fill="rgba(255,255,255,0.06)" />
      <path
        d="M21.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC04"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function CertLogo({ logo }: { logo: 'semrush' | 'google' }) {
  return logo === 'semrush' ? <SemrushLogo /> : <GoogleLogo />
}

// ─── CertFrame ────────────────────────────────────────────────────────────────

function CertFrame({
  cert,
  index,
  onOpen,
  frameRef,
  reduced,
}: {
  cert: Certification
  index: number
  onOpen: (c: Certification) => void
  frameRef: (el: HTMLDivElement | null) => void
  reduced: boolean
}) {
  return (
    // Outer wrapper carries `group` so spotlight above and border glow react to a single hover target.
    // Opacity starts at 0 when motion is enabled; GSAP animates it to 1 on scroll reveal.
    <div
      ref={frameRef}
      className="group relative"
      style={{ paddingTop: '72px', opacity: reduced ? 1 : 0 }}
    >
      {/* Spotlight cone descending from ceiling to top of frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 opacity-50 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          height: '72px',
          background:
            'radial-gradient(ellipse 65% 100% at 50% 0%, rgba(255,184,0,0.30) 0%, transparent 100%)',
        }}
      />

      {/* Frame card */}
      <motion.article
        className="relative cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-accent/60"
        style={{
          aspectRatio: '3 / 4',
          background: 'linear-gradient(160deg, #141414 0%, #0d0d0d 60%, #121212 100%)',
          border: '1px solid rgba(0,240,255,0.18)',
          borderRadius: '4px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,240,255,0.05)',
          overflow: 'hidden',
        }}
        whileHover={reduced ? {} : { y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
        onClick={() => onOpen(cert)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen(cert)
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${cert.name} certificate details`}
      >
        {/* Vignette overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.50) 100%)',
          }}
        />

        {/* Amber wash from above — intensifies on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 opacity-15 group-hover:opacity-40 transition-opacity duration-300"
          style={{
            height: '50%',
            background:
              'radial-gradient(ellipse 80% 90% at 50% 0%, rgba(255,184,0,0.28) 0%, transparent 100%)',
          }}
        />

        {/* Cyan border glow on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            borderRadius: '4px',
            boxShadow:
              'inset 0 0 0 1px rgba(0,240,255,0.55), 0 0 40px rgba(0,240,255,0.06)',
          }}
        />

        {/* Logo watermark — top-left */}
        <div
          className="absolute top-4 left-4 opacity-60 group-hover:opacity-90 transition-opacity duration-300"
          aria-hidden="true"
        >
          <CertLogo logo={cert.logo} />
        </div>

        {/* Centered content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          style={{ padding: '3rem 1.5rem 2rem' }}
        >
          {/* Index number */}
          <span
            className="font-mono text-[9px] tracking-[0.5em] uppercase"
            style={{ color: 'rgba(255,184,0,0.38)' }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Cert name */}
          <h3
            className="font-sans font-bold text-center leading-snug text-white group-hover:text-cyan-accent transition-colors duration-200"
            style={{ fontSize: 'clamp(0.78rem, 1.4vw, 1rem)' }}
          >
            {cert.name}
          </h3>

          {/* Issuer tag */}
          <span
            className="font-mono text-[8.5px] uppercase tracking-[0.38em]"
            style={{
              color: '#00F0FF',
              background: 'rgba(0,240,255,0.07)',
              border: '1px solid rgba(0,240,255,0.20)',
              borderRadius: '2px',
              padding: '3px 10px',
            }}
          >
            {cert.issuer}
          </span>
        </div>

        {/* Hover hint */}
        <p
          className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.35em] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          style={{ color: 'rgba(0,240,255,0.40)' }}
          aria-hidden="true"
        >
          View credential
        </p>
      </motion.article>
    </div>
  )
}

// ─── CertModal ────────────────────────────────────────────────────────────────

function CertModal({
  cert,
  onClose,
}: {
  cert: Certification
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
      aria-label={`${cert.name} credential details`}
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
        className="relative w-full max-w-md"
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
            Certification
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
            aria-label="Close credential details"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-8 pt-6">
          {/* Logo + issuer row */}
          <div className="flex items-center gap-3 mb-5">
            <CertLogo logo={cert.logo} />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.4em]"
              style={{ color: 'rgba(0,240,255,0.55)' }}
            >
              {cert.issuer}
            </span>
          </div>

          {/* Cert name */}
          <h2
            className="font-sans font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.55rem)', marginBottom: '1.5rem' }}
          >
            {cert.name}
          </h2>

          {/* Meta rows */}
          <dl className="space-y-3">
            {/* Issued */}
            <div className="flex items-start gap-4">
              <dt
                className="shrink-0 font-mono text-[9px] uppercase tracking-[0.35em] pt-0.5"
                style={{ color: 'rgba(255,255,255,0.30)', minWidth: '80px' }}
              >
                Issued
              </dt>
              <dd
                className="font-sans text-sm"
                style={{ color: 'rgba(255,255,255,0.72)' }}
              >
                {cert.issued ?? `Issued by ${cert.issuer}`}
              </dd>
            </div>

            {/* Expires */}
            {cert.expires && (
              <div className="flex items-start gap-4">
                <dt
                  className="shrink-0 font-mono text-[9px] uppercase tracking-[0.35em] pt-0.5"
                  style={{ color: 'rgba(255,255,255,0.30)', minWidth: '80px' }}
                >
                  Expires
                </dt>
                <dd
                  className="font-sans text-sm"
                  style={{ color: 'rgba(255,255,255,0.72)' }}
                >
                  {cert.expires}
                </dd>
              </div>
            )}

            {/* Credential ID */}
            {cert.credentialId && (
              <div className="flex items-start gap-4">
                <dt
                  className="shrink-0 font-mono text-[9px] uppercase tracking-[0.35em] pt-0.5"
                  style={{ color: 'rgba(255,255,255,0.30)', minWidth: '80px' }}
                >
                  ID
                </dt>
                <dd
                  className="font-mono text-sm"
                  style={{ color: '#00F0FF', letterSpacing: '0.1em' }}
                >
                  {cert.credentialId}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── CertificationsWall (main export) ────────────────────────────────────────

export default function CertificationsWall() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null)
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const frameRefs = useRef<(HTMLDivElement | null)[]>([])

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = activeCert ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeCert])

  // GSAP spotlight reveal: frames fade in left to right with 200ms stagger
  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const frames = frameRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!frames.length || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(frames, {
        opacity: 1,
        duration: 0.75,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="certifications"
      ref={sectionRef}
      aria-labelledby="cert-wall-heading"
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#0A0A0A',
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Ceiling warm glow + floor shadow to evoke a real wall */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 35% at 50% 0%, rgba(255,184,0,0.04) 0%, transparent 100%),
            radial-gradient(ellipse 60% 25% at 50% 100%, rgba(0,0,0,0.5) 0%, transparent 100%),
            radial-gradient(ellipse 50% 60% at 15% 50%, rgba(0,240,255,0.015) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 85% 50%, rgba(0,240,255,0.015) 0%, transparent 70%)
          `,
        }}
      />

      {/* Subtle wall grain texture via SVG feTurbulence */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
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
            style={{ color: 'rgba(0,240,255,0.50)' }}
          >
            07 / Credentials
          </p>
          <h2
            id="cert-wall-heading"
            className="font-sans font-bold leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '1rem' }}
          >
            Certifications
          </h2>
          <p
            className="max-w-md font-sans"
            style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem', lineHeight: '1.75' }}
          >
            Verified expertise, not just words on a resume.
          </p>
        </motion.div>

        {/* ── Cert grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {certifications.map((cert, i) => (
            <CertFrame
              key={cert.name}
              cert={cert}
              index={i}
              onOpen={setActiveCert}
              frameRef={(el) => {
                frameRefs.current[i] = el
              }}
              reduced={!!reduced}
            />
          ))}
        </div>
      </div>

      {/* ── Credential modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {activeCert && (
          <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
