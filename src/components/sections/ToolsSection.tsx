'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { tools } from '@/data/site'
import type { ToolEntry } from '@/data/site'

// ─── Inline SVG logos (48px) ───────────────────────────────────────────────

function SemrushIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="10" fill="rgba(255,100,45,0.13)" />
      <text
        x="24"
        y="33"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="22"
        fill="#FF642D"
      >
        Sm
      </text>
    </svg>
  )
}

function AhrefsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="10" fill="rgba(15,111,255,0.13)" />
      <text
        x="24"
        y="35"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="28"
        fill="#0F6FFF"
      >
        A
      </text>
    </svg>
  )
}

function ScreamingFrogIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="10" fill="rgba(122,184,0,0.13)" />
      <text
        x="24"
        y="33"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="20"
        fill="#7AB800"
      >
        SF
      </text>
    </svg>
  )
}

function MozIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="10" fill="rgba(20,153,255,0.13)" />
      <text
        x="24"
        y="35"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="28"
        fill="#1499FF"
      >
        M
      </text>
    </svg>
  )
}

function GoogleGIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
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

function ToolIcon({ logo }: { logo: ToolEntry['logo'] }) {
  switch (logo) {
    case 'semrush':       return <SemrushIcon />
    case 'ahrefs':        return <AhrefsIcon />
    case 'screamingfrog': return <ScreamingFrogIcon />
    case 'moz':           return <MozIcon />
    case 'searchconsole':
    case 'analytics':
    case 'keywordplanner':
      return <GoogleGIcon />
  }
}

// ─── Floating particle canvas ──────────────────────────────────────────────
// 40 particles: 70% cyan #00F0FF, 30% amber #FFB800, 1-2px, opacity 0.2-0.4

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 1200
      canvas.height = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 900
    }
    setSize()
    window.addEventListener('resize', setSize)

    const COUNT = 40
    const particles = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.5 + Math.random() * 0.5,
      op: 0.2 + Math.random() * 0.2,
      color: i < COUNT * 0.7 ? '#00F0FF' : '#FFB800',
      vx: (Math.random() - 0.5) * 0.12,
      vy: -0.04 - Math.random() * 0.10,
    }))

    let raf: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -2) p.y = canvas.height + 2
        if (p.x < -2) p.x = canvas.width + 2
        if (p.x > canvas.width + 2) p.x = -2
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.op
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('resize', setSize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}

// ─── ToolCard ──────────────────────────────────────────────────────────────

function ToolCard({ tool, reduced }: { tool: ToolEntry; reduced: boolean }) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const isTouchRef = useRef(false)

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(hover: none)').matches
  }, [])

  const onMouseEnter = useCallback(() => {
    if (!tiltRef.current) return
    // Remove transition so tilt tracks cursor instantly
    tiltRef.current.style.transition = ''
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || isTouchRef.current || !tiltRef.current) return
      // Use the event's currentTarget (div.group) so the rect stays stable
      // even when the inner card lifts on hover
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 to +0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5   // -0.5 to +0.5
      const rotateX = -y * 10   // max ±5 degrees
      const rotateY = x * 10
      tiltRef.current.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    },
    [reduced]
  )

  const onMouseLeave = useCallback(() => {
    if (!tiltRef.current) return
    tiltRef.current.style.transition =
      'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    tiltRef.current.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }, [])

  return (
    <div
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Tilt wrapper — cursor tracking rotates this element */}
      <div
        ref={tiltRef}
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        <motion.article
          className="relative w-full"
          style={{
            aspectRatio: '5 / 4',
            background: 'linear-gradient(145deg, #141414 0%, #0d0d0d 60%, #111111 100%)',
            border: '1px solid rgba(0,240,255,0.18)',
            borderRadius: '6px',
            overflow: 'hidden',
            // Drop shadow — card hovers above the surface
            boxShadow: [
              '0 16px 48px rgba(0,0,0,0.75)',
              '0 6px 16px rgba(0,0,0,0.55)',
              '0 1px 3px rgba(0,0,0,0.40)',
            ].join(', '),
          }}
          whileHover={
            reduced
              ? {}
              : { y: -8, scale: 1.02, transition: { duration: 0.22, ease: 'easeOut' } }
          }
        >
          {/* Base inner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: 'inset 0 0 28px rgba(0,240,255,0.03)' }}
          />

          {/* Amber spotlight cone from above — always faintly visible */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 transition-opacity duration-300"
            style={{
              height: '65%',
              opacity: 0.45,
              background:
                'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(255,184,0,0.12) 0%, transparent 80%)',
            }}
          />

          {/* Amber spotlight intensifies on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              height: '70%',
              background:
                'radial-gradient(ellipse 60% 50% at 50% -5%, rgba(255,184,0,0.11) 0%, transparent 80%)',
            }}
          />

          {/* Top edge highlight — thin light-catching line like premium product photography */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.13) 25%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.13) 75%, transparent 95%)',
            }}
          />

          {/* Cyan border overlay brightens on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              borderRadius: '6px',
              boxShadow:
                'inset 0 0 0 1px rgba(0,240,255,0.65), 0 0 40px rgba(0,240,255,0.07)',
            }}
          />

          {/* Ambient top cyan wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 opacity-15 transition-opacity duration-300 group-hover:opacity-45"
            style={{
              height: '55%',
              background:
                'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(0,240,255,0.10) 0%, transparent 100%)',
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center">
            {/* Logo */}
            <div className="opacity-80 transition-opacity duration-300 group-hover:opacity-100">
              <ToolIcon logo={tool.logo} />
            </div>

            {/* Name */}
            <h3
              className="font-sans font-bold leading-snug text-white transition-colors duration-200 group-hover:text-cyan-accent"
              style={{ fontSize: 'clamp(0.82rem, 1.4vw, 1rem)' }}
            >
              {tool.name}
            </h3>

            {/* Tagline */}
            <p
              className="font-sans leading-relaxed"
              style={{
                fontSize: 'clamp(0.67rem, 1vw, 0.76rem)',
                color: 'rgba(255,255,255,0.46)',
                letterSpacing: '0.025em',
                maxWidth: '20ch',
              }}
            >
              {tool.tagline}
            </p>
          </div>
        </motion.article>
      </div>
    </div>
  )
}

// ─── ToolsSection (main export) ────────────────────────────────────────────

export default function ToolsSection() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  // cardRefs: outer grid-cell divs — targeted by GSAP fade-in
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  // parallaxRefs: inner wrappers — targeted by GSAP scroll scrub (separate layer)
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    const parallaxEls = parallaxRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!cards.length || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Existing scroll-triggered fade-in (unchanged)
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        }
      )

      // Scroll parallax — applied to inner wrappers so it does not conflict
      // with the fade-in y values above (different DOM elements).
      // Top row (i < 4): drift from -12 to +12 (slower feel — far plane)
      // Bottom row (i >= 4): drift from +12 to -12 (faster feel — near plane)
      parallaxEls.forEach((el, i) => {
        const isTopRow = i < 4
        gsap.fromTo(
          el,
          { y: isTopRow ? -12 : 12 },
          {
            y: isTopRow ? 12 : -12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="toolkit"
      ref={sectionRef}
      aria-labelledby="toolkit-heading"
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#0A0A0A',
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Depth vignette — edges and corners darkened to suggest depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 130% 55% at 50% 105%, rgba(0,0,0,0.85) 0%, transparent 55%)',
            'radial-gradient(ellipse 45% 100% at 0% 50%, rgba(0,0,0,0.55) 0%, transparent 50%)',
            'radial-gradient(ellipse 45% 100% at 100% 50%, rgba(0,0,0,0.55) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* Floating particles — canvas skipped when prefers-reduced-motion */}
      {!reduced && <ParticleCanvas />}

      {/* Workbench ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 90% 40% at 50% 0%, rgba(0,240,255,0.03) 0%, transparent 100%)',
            'radial-gradient(ellipse 60% 30% at 50% 100%, rgba(0,0,0,0.5) 0%, transparent 100%)',
            'radial-gradient(ellipse 40% 60% at 0% 55%, rgba(0,240,255,0.012) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 60% at 100% 55%, rgba(255,184,0,0.010) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      {/* Film grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Content */}
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
            08 / Arsenal
          </p>
          <h2
            id="toolkit-heading"
            className="font-sans font-bold leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '1rem' }}
          >
            The Toolkit
          </h2>
          <p
            className="max-w-md font-sans"
            style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem', lineHeight: '1.75' }}
          >
            Seven tools. Every site I touch.
          </p>
        </motion.div>

        {/* Tool grid: 4-col top row, 3-col centered bottom row on desktop */}
        <div className="flex flex-wrap justify-center gap-6">
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              ref={(el) => { cardRefs.current[i] = el }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              style={{ opacity: reduced ? 1 : 0 }}
            >
              {/* Parallax wrapper — separate from cardRef so GSAP targets don't conflict */}
              <div ref={(el) => { parallaxRefs.current[i] = el }}>
                <ToolCard tool={tool} reduced={!!reduced} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
