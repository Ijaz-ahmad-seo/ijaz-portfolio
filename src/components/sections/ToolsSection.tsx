'use client'

import { useEffect, useRef } from 'react'
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

// ─── ToolCard ──────────────────────────────────────────────────────────────

function ToolCard({ tool, reduced }: { tool: ToolEntry; reduced: boolean }) {
  return (
    <div className="group relative">
      <motion.article
        className="relative w-full"
        style={{
          aspectRatio: '5 / 4',
          background: 'linear-gradient(145deg, #141414 0%, #0d0d0d 60%, #111111 100%)',
          border: '1px solid rgba(0,240,255,0.18)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
        whileHover={
          reduced
            ? {}
            : { y: -6, scale: 1.02, transition: { duration: 0.22, ease: 'easeOut' } }
        }
      >
        {/* Base inner glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: 'inset 0 0 28px rgba(0,240,255,0.03)' }}
        />

        {/* Cyan border overlay brightens on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            borderRadius: '6px',
            boxShadow: 'inset 0 0 0 1px rgba(0,240,255,0.65), 0 0 40px rgba(0,240,255,0.07)',
          }}
        />

        {/* Ambient top cyan wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 opacity-15 group-hover:opacity-45 transition-opacity duration-300"
          style={{
            height: '55%',
            background:
              'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(0,240,255,0.10) 0%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center">
          {/* Logo */}
          <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <ToolIcon logo={tool.logo} />
          </div>

          {/* Name */}
          <h3
            className="font-sans font-bold text-white group-hover:text-cyan-accent transition-colors duration-200 leading-snug"
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
  )
}

// ─── ToolsSection (main export) ────────────────────────────────────────────

export default function ToolsSection() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!cards.length || !sectionRef.current) return

    const ctx = gsap.context(() => {
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
      {/* Workbench ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 40% at 50% 0%, rgba(0,240,255,0.03) 0%, transparent 100%),
            radial-gradient(ellipse 60% 30% at 50% 100%, rgba(0,0,0,0.5) 0%, transparent 100%),
            radial-gradient(ellipse 40% 60% at 0% 55%, rgba(0,240,255,0.012) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 100% 55%, rgba(255,184,0,0.010) 0%, transparent 70%)
          `,
        }}
      />

      {/* Surface grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
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
              <ToolCard tool={tool} reduced={!!reduced} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
