'use client'

import { useRef, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SceneProgress } from '@/components/three/HallwayScene'

// Never SSR Three.js — it needs the browser's WebGL context
const HallwayScene = dynamic(() => import('@/components/three/HallwayScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#050508' }}>
      <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-cyan-accent/40">
        Loading
      </span>
    </div>
  ),
})

export default function HeroHallway() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  // Plain mutable object — GSAP animates .value, useFrame reads it each tick
  const progress = useRef<SceneProgress>({ value: 0 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
      }

      // Master scroll driver — 0→1 over the full 400 vh runway
      gsap.to(progress.current, {
        value: 1,
        ease: 'none',
        scrollTrigger: { ...trigger, scrub: true },
      })

      // Scroll hint: fades out in the first 8 % of scroll
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        y: -12,
        scrollTrigger: { ...trigger, start: 'top top', end: '8% top', scrub: true },
      })

      // Intro phrase: fades in 5–18 %, fades out 35–50 %
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: { ...trigger, start: '5% top', end: '18% top', scrub: true },
        }
      )
      gsap.to(introRef.current, {
        opacity: 0,
        y: -18,
        scrollTrigger: { ...trigger, start: '35% top', end: '50% top', scrub: true },
      })

      // IJAZ name: fades in 48–62 % (camera close to door), fades out 66–85 % (door opens)
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: { ...trigger, start: '48% top', end: '62% top', scrub: true },
        }
      )
      gsap.to(nameRef.current, {
        opacity: 0,
        scale: 1.06,
        scrollTrigger: { ...trigger, start: '66% top', end: '85% top', scrub: true },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    // Tall outer div gives the sticky inner div its scroll runway
    <div ref={containerRef} style={{ height: '400vh' }} className="relative">
      {/* Pinned viewport — stays visible while user scrolls through 400 vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* 3D canvas fills the entire pinned viewport */}
        <div className="absolute inset-0">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center" style={{ background: '#050508' }}>
                <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-cyan-accent/40">
                  Loading
                </span>
              </div>
            }
          >
            <HallwayScene progress={progress.current} />
          </Suspense>
        </div>

        {/* ── Scroll hint ─────────────────────────────────────── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none select-none"
        >
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-white">
            Scroll to enter
          </span>
          <div className="h-10 w-px animate-pulse bg-gradient-to-b from-cyan-accent/30 to-transparent" />
        </div>

        {/* ── Intro phrase overlay ─────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <p
            ref={introRef}
            className="font-mono text-sm tracking-[0.38em] uppercase text-white opacity-0"
          >
            Step into the office of an SEO expert
          </p>
        </div>

        {/* ── IJAZ name overlay ────────────────────────────────── */}
        {/* Centered to align with the 3D door — door center is at camera lookAt y=1.5 */}
        <div
          ref={nameRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-0"
        >
          <div className="flex flex-col items-center">
            <h2
              className="font-sans font-bold tracking-[0.18em] uppercase text-cyan-accent"
              style={{
                fontSize: 'clamp(4.5rem, 16vw, 11rem)',
                textShadow:
                  '0 0 30px rgba(0,240,255,0.9), 0 0 70px rgba(0,240,255,0.5), 0 0 130px rgba(0,240,255,0.25)',
                animation: 'none',
              }}
            >
              IJAZ
            </h2>
            <h2
              className="font-sans font-bold tracking-[0.18em] uppercase text-cyan-accent"
              style={{
                fontSize: 'clamp(4.5rem, 16vw, 11rem)',
                textShadow:
                  '0 0 30px rgba(0,240,255,0.9), 0 0 70px rgba(0,240,255,0.5), 0 0 130px rgba(0,240,255,0.25)',
                animation: 'none',
              }}
            >
              AHMED
            </h2>
          </div>
        </div>

        {/* ── Bottom atmosphere fade ───────────────────────────── */}
        {/* Bleeds hallway darkness down into the top of the Reception section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{
            height: '25vh',
            background: 'linear-gradient(to bottom, transparent, #0A0A0A)',
            zIndex: 10,
          }}
        />

      </div>
    </div>
  )
}
