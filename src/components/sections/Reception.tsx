'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useAnimation,
} from 'framer-motion'

// Never SSR — needs WebGL
const ReceptionScene = dynamic(() => import('@/components/three/ReceptionScene'), {
  ssr: false,
  loading: () => null,
})

// ── Types ─────────────────────────────────────────────────────────────────────

interface StatDef {
  end: number
  suffix: string
  label: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS: StatDef[] = [
  { end: 500, suffix: 'K+', label: 'MONTHLY ORGANIC VISITS' },
  { end: 4, suffix: '+', label: 'YEARS OF SEO EXPERIENCE' },
  { end: 15, suffix: '+', label: 'WEBSITES OPTIMIZED' },
]

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(end: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let rafId: number
    let startTime: number | null = null
    function tick(ts: number) {
      if (startTime === null) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setCount(Math.round(eased * end))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active, end, duration])
  return count
}

// ── UPGRADE 4: Interactive StatCard ───────────────────────────────────────────
// RAF-throttled cursor tilt + pulsing glow halo + lift on hover + count-finish flash

function StatCard({ end, suffix, label, delay }: StatDef & { delay: number }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(outerRef, { once: true, margin: '-80px 0px' })
  const count = useCountUp(end, 1500, inView)
  const numControls = useAnimation()

  // 3D tilt — driven by mouse position, smoothed with spring
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springCfg = { stiffness: 300, damping: 30 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springCfg)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springCfg)

  // RAF throttle: update motion values at most once per frame
  const rafRef = useRef<number | null>(null)
  const latestMouse = useRef({ x: 0, y: 0 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    latestMouse.current.x = (e.clientX - rect.left) / rect.width - 0.5
    latestMouse.current.y = (e.clientY - rect.top) / rect.height - 0.5
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      mouseX.set(latestMouse.current.x)
      mouseY.set(latestMouse.current.y)
      rafRef.current = null
    })
  }

  function onMouseLeave() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    mouseX.set(0)
    mouseY.set(0)
  }

  // Flash the number the moment counting completes
  useEffect(() => {
    if (count === end && end > 0) {
      numControls.start({
        scale: [1, 1.14, 1],
        opacity: [1, 0.55, 1],
        transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
      })
    }
  }, [count, end, numControls])

  return (
    // Parent carries perspective so rotateX/Y produce genuine 3D depth
    <div ref={outerRef} className="flex-1 min-w-0" style={{ perspective: '1000px' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        // Separate transition for entry vs hover — whileHover transition overrides locally
        transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{
          y: -10,
          scale: 1.03,
          transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, willChange: 'transform' }}
        className="group relative flex flex-col items-center justify-center p-10 rounded-xl cursor-default select-none"
      >
        {/* Base card surface */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'rgba(10,10,10,0.88)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        />

        {/* Resting pulse: scale + opacity breathe on a 3.5s loop, staggered per card */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl"
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.97, 1.01, 0.97] }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: 'easeInOut',
            delay: delay * 1.5,
          }}
          style={{
            boxShadow: '0 0 28px rgba(0,240,255,0.16), inset 0 0 20px rgba(0,240,255,0.04)',
            border: '1px solid rgba(0,240,255,0.2)',
          }}
        />

        {/* Hover overlay: intensified glow + drop shadow (CSS transition via group) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            boxShadow: '0 22px 60px rgba(0,0,0,0.65), 0 0 50px rgba(0,240,255,0.32)',
            border: '1px solid rgba(0,240,255,0.52)',
          }}
        />

        {/* Number + label */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.span
            animate={numControls}
            className="font-mono font-bold text-cyan-accent leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              textShadow: '0 0 24px rgba(0,240,255,0.45)',
            }}
          >
            {count}{suffix}
          </motion.span>
          <span className="mt-3 font-mono text-[10px] tracking-[0.28em] uppercase text-white/35">
            {label}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

// ── Cyan highlight span ───────────────────────────────────────────────────────

function Hi({ children }: { children: React.ReactNode }) {
  return <span className="text-cyan-accent font-semibold">{children}</span>
}

// ── Reception ─────────────────────────────────────────────────────────────────

export default function Reception() {
  // UPGRADE 7: scroll-synced story reveal
  const storyRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  })

  // Photo parallax: moves at ~half scroll speed (30-40px total)
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -40])

  // Heading: fades in as section enters viewport
  const headingOpacity = useTransform(scrollYProgress, [0.0, 0.12], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.0, 0.12], [20, 0])

  // Paragraphs: staggered entry, stay at full opacity once revealed (no dimming)
  // y uses numbers (px) — Framer Motion requires numeric y in style
  const p1Opacity = useTransform(scrollYProgress, [0.15, 0.30], [0, 1])
  const p1Y = useTransform(scrollYProgress, [0.15, 0.30], [30, 0])

  const p2Opacity = useTransform(scrollYProgress, [0.30, 0.50], [0, 1])
  const p2Y = useTransform(scrollYProgress, [0.30, 0.50], [30, 0])

  const p3Opacity = useTransform(scrollYProgress, [0.50, 0.70], [0, 1])
  const p3Y = useTransform(scrollYProgress, [0.50, 0.70], [30, 0])

  return (
    <section id="reception" className="relative" style={{ background: '#0A0A0A' }}>

      {/* ── Top atmosphere fade ─────────────────────────────────────────────── */}
      {/* Continues hallway darkness into the Reception — pairs with the Hallway's bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0"
        style={{
          height: '20vh',
          background: 'linear-gradient(to bottom, #0A0A0A, transparent)',
          zIndex: 5,
        }}
      />

      {/* ── Soft cyan light leak from above ─────────────────────────────────── */}
      {/* Hallway cyan atmosphere bleeding down — fades within the upper third */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0"
        style={{
          height: '33vh',
          background:
            'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,240,255,0.055) 0%, transparent 100%)',
          zIndex: 5,
        }}
      />

      {/* ── UPGRADE 1: 3D office room background ───────────────────────────── */}
      {/* Absolutely behind all content. pointer-events-none so it doesn't eat clicks. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 0 }}
      >
        <Suspense fallback={null}>
          <ReceptionScene />
        </Suspense>
      </div>

      {/* All visible content sits above the 3D canvas */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── A: Hero Moment ───────────────────────────────────────────────── */}
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,240,255,0.04) 0%, transparent 65%)',
            }}
          />

          <div className="relative flex flex-col items-center text-center px-6 select-none">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mb-8 font-mono text-xs tracking-[0.35em] uppercase text-cyan-accent/60"
            >
              SEO MANAGER · TRICKLE UP
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="glow-text font-sans font-bold leading-none tracking-tight text-white"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
            >
              Ijaz Ahmed
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 max-w-md font-sans text-base md:text-lg text-white/40"
            >
              SEO expert who builds the websites he ranks.
            </motion.p>
          </div>
        </div>

        {/* ── B: UPGRADE 4 — Floating stat cards ───────────────────────────── */}
        <div className="px-6 py-20">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.12} />
            ))}
          </div>
        </div>

        {/* ── C: UPGRADE 7 — Scroll-synced story reveal ────────────────────── */}
        <div ref={storyRef} className="relative px-6 py-24 pb-32">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/*
              Photo placeholder — parallaxes at ~0.4× scroll speed for depth.
              When ready: swap the inner <div> for:
                <Image src="/ijaz.jpg" alt="Ijaz Ahmed" fill className="object-cover rounded-2xl" />
              and add `relative overflow-hidden` to the motion.div wrapper.
            */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ y: photoY }}
              className="w-full max-w-sm mx-auto lg:mx-0"
            >
              <div
                style={{
                  aspectRatio: '3 / 4',
                  maxHeight: '520px',
                  borderRadius: '1rem',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(0,240,255,0.18)',
                  boxShadow: '0 0 50px rgba(0,240,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/20">
                  Photo coming soon
                </span>
              </div>
            </motion.div>

            {/* Story copy — each element tied to scroll position */}
            <div className="flex flex-col justify-center">

              <motion.h2
                style={{
                  opacity: headingOpacity,
                  y: headingY,
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                }}
                className="font-sans font-bold text-white mb-8 leading-tight"
              >
                The Story Behind the Numbers
              </motion.h2>

              <motion.p
                style={{ opacity: p1Opacity, y: p1Y }}
                className="font-sans text-white/60 leading-[1.8] mb-5 text-base md:text-lg"
              >
                I&apos;m Ijaz Ahmed, currently SEO Manager at Trickle Up, with <Hi>4+</Hi> years
                turning organic search into real business growth. I work across the full SEO stack:
                technical audits, on-page optimization, link strategy, content engineering, and the
                new wave of AI search (AEO, GEO, AIO).
              </motion.p>

              <motion.p
                style={{ opacity: p2Opacity, y: p2Y }}
                className="font-sans text-white/60 leading-[1.8] mb-5 text-base md:text-lg"
              >
                I&apos;ve helped UK pharmacies, charities, e-commerce brands and US clients climb
                rankings, including my personal project Mydecorya, which I scaled from zero to{' '}
                <Hi>500K+</Hi> monthly organic visits through pure search-intent-driven content.
              </motion.p>

              <motion.p
                style={{ opacity: p3Opacity, y: p3Y }}
                className="font-sans text-white/60 leading-[1.8] text-base md:text-lg"
              >
                What sets me apart? I don&apos;t just rank websites, I build them. WordPress
                development, technical SEO, content strategy, all under one roof. So you get faster
                execution, fewer agencies in the loop, and an SEO who actually understands
                what&apos;s under the hood.
              </motion.p>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
