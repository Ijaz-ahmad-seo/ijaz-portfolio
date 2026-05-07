'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis()

    // Keep ScrollTrigger in sync with Lenis's smoothed scroll values
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker so both animate on the same RAF
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(onTick)
    }
  }, [])

  return <>{children}</>
}
