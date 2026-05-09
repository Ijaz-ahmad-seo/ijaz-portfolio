'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export interface SceneProgress {
  value: number
}

// ─── Camera ──────────────────────────────────────────────────────────────────
// Three-phase forward push:
//   0-60%  entrance: z=8 to z=-6 (smoothstep)
//   60-90% door-open: z=-6 to z=-8.5 (continues forward as door slides apart)
//   90-100% threshold: z=-8.5 to z=-8.85 (slow final approach, camera just short of door)

function CameraController({ progress }: { progress: SceneProgress }) {
  const { camera } = useThree()

  useFrame(() => {
    const p = progress.value
    let z: number

    if (p <= 0.6) {
      const t = p / 0.6
      const s = t * t * (3 - 2 * t)
      z = THREE.MathUtils.lerp(8, -6, s)
    } else if (p <= 0.9) {
      const t = (p - 0.6) / 0.3
      const s = t * t * (3 - 2 * t)
      z = THREE.MathUtils.lerp(-6, -8.5, s)
    } else {
      const t = (p - 0.9) / 0.1
      const s = t * t * (3 - 2 * t)
      z = THREE.MathUtils.lerp(-8.5, -8.85, s)
    }

    camera.position.set(0, 1.5, z)
    camera.lookAt(0, 1.5, -30)
  })

  return null
}

// ─── Corridor ────────────────────────────────────────────────────────────────
// Box-geometry walls/floor/ceiling — no rotation headaches.

function Hallway() {
  const ceilingLightZ = [-8, -5, -2, 1, 4, 7]

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.025, 0]}>
        <boxGeometry args={[4, 0.05, 22]} />
        <meshStandardMaterial color="#0D0D0D" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3.025, 0]}>
        <boxGeometry args={[4, 0.05, 22]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-2.025, 1.5, 0]}>
        <boxGeometry args={[0.05, 3, 22]} />
        <meshStandardMaterial color="#0C0C0C" roughness={0.85} />
      </mesh>

      {/* Right wall */}
      <mesh position={[2.025, 1.5, 0]}>
        <boxGeometry args={[0.05, 3, 22]} />
        <meshStandardMaterial color="#0C0C0C" roughness={0.85} />
      </mesh>

      {/* Ceiling light strips — decay=0 avoids physical attenuation issues */}
      {ceilingLightZ.map((z, i) => (
        <pointLight
          key={i}
          position={[0, 2.8, z]}
          color="#FFE4B0"
          intensity={0.35}
          distance={7}
          decay={0}
        />
      ))}

      {/* Subtle floor glow strips (emissive planes) */}
      {ceilingLightZ.map((z, i) => (
        <mesh key={`gs-${i}`} position={[0, 0.001, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.06, 0.6]} />
          <meshBasicMaterial color="#FFE4B0" transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Door ────────────────────────────────────────────────────────────────────
// Two sliding halves.  60–90 % scroll → door slides open.
// A cyan point light in front dims as the door opens; warm light from beyond
// fades in to simulate the room revealed behind.

function Door({ progress }: { progress: SceneProgress }) {
  const leftRef = useRef<THREE.Mesh>(null!)
  const rightRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.PointLight>(null!)
  const beyondRef = useRef<THREE.PointLight>(null!)

  useFrame(() => {
    const p = progress.value
    const raw = Math.max(0, Math.min((p - 0.6) / 0.3, 1))
    // Cubic ease-out for a dramatic deceleration at full-open
    const eased = 1 - Math.pow(1 - raw, 3)

    leftRef.current.position.x = THREE.MathUtils.lerp(-1, -5, eased)
    rightRef.current.position.x = THREE.MathUtils.lerp(1, 5, eased)
    glowRef.current.intensity = THREE.MathUtils.lerp(3, 0, eased)
    beyondRef.current.intensity = THREE.MathUtils.lerp(0, 10, eased)
  })

  return (
    <group position={[0, 0, -9]}>
      {/* Cyan atmosphere glow in front of door */}
      <pointLight
        ref={glowRef}
        position={[0, 1.5, 2]}
        color="#00F0FF"
        intensity={3}
        distance={8}
        decay={0}
      />

      {/* Warm reveal light behind the door */}
      <pointLight
        ref={beyondRef}
        position={[0, 2, -5]}
        color="#FFF5E8"
        intensity={0}
        distance={20}
        decay={0}
      />

      {/* Left door half */}
      <mesh ref={leftRef} position={[-1, 1.5, 0]}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial
          color="#131313"
          roughness={0.55}
          metalness={0.45}
          emissive="#001515"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Right door half */}
      <mesh ref={rightRef} position={[1, 1.5, 0]}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial
          color="#131313"
          roughness={0.55}
          metalness={0.45}
          emissive="#001515"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Cyan seam line between the two halves */}
      <mesh position={[0, 1.5, 0.06]}>
        <boxGeometry args={[0.018, 3, 0.008]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.7} />
      </mesh>

      {/* Door frame — top */}
      <mesh position={[0, 3.07, 0]}>
        <boxGeometry args={[4.22, 0.14, 0.14]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Door frame — left side */}
      <mesh position={[-2.1, 1.5, 0]}>
        <boxGeometry args={[0.14, 3.28, 0.14]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Door frame — right side */}
      <mesh position={[2.1, 1.5, 0]}>
        <boxGeometry args={[0.14, 3.28, 0.14]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  )
}

// ─── Floating Particles ──────────────────────────────────────────────────────
// Outer shell: skip entirely when prefers-reduced-motion is set

function FloatingParticles() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return null
  return <ParticlesInner />
}

const PARTICLE_COUNT = 100

function ParticlesInner() {
  const { geometry, baseX, baseY, speeds, swayPhases, swayFreqs } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const bX = new Float32Array(PARTICLE_COUNT)
    const bY = new Float32Array(PARTICLE_COUNT)
    const spd = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT)
    const freqs = new Float32Array(PARTICLE_COUNT)

    const cyan = new THREE.Color('#00F0FF')
    const amber = new THREE.Color('#FFB800')

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      bX[i] = (Math.random() - 0.5) * 3.0       // x: -1.5 to 1.5, well within walls at +-2
      bY[i] = Math.random() * 2.5 + 0.3          // y: 0.3 to 2.8
      const z = Math.random() * 16.0 - 9.0       // z: full corridor depth

      positions[i * 3] = bX[i]
      positions[i * 3 + 1] = bY[i]
      positions[i * 3 + 2] = z

      const col = Math.random() < 0.7 ? cyan : amber   // 70% cyan, 30% amber
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b

      spd[i] = (Math.random() * 0.15 + 0.04) * (Math.random() < 0.5 ? 1.0 : -1.0)
      phases[i] = Math.random() * Math.PI * 2
      freqs[i] = Math.random() * 0.4 + 0.15
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    return { geometry: geo, baseX: bX, baseY: bY, speeds: spd, swayPhases: phases, swayFreqs: freqs }
  }, [])

  useFrame(({ clock }) => {
    const positions = geometry.attributes.position.array as Float32Array
    const t = clock.elapsedTime
    const range = 2.5
    const min = 0.3

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Vertical drift: time-based, wraps continuously within corridor height
      let y = baseY[i] + t * speeds[i]
      y = ((y - min) % range + range) % range + min
      // Horizontal sway: pure sine oscillation around base X, no drift
      positions[i * 3] = baseX[i] + Math.sin(t * swayFreqs[i] + swayPhases[i]) * 0.25
      positions[i * 3 + 1] = y
      // Z stays constant per particle
    }

    geometry.attributes.position.needsUpdate = true
  })

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Amber Halo ───────────────────────────────────────────────────────────────
// Warm amber glow behind the door: a point light + oversized soft plane.
// The plane uses depthTest=false so it reads as a soft ambient warmth over the
// door area without fighting the depth buffer. Pulse skipped if reduced-motion.

function AmberHalo() {
  const planeRef = useRef<THREE.Mesh>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)
  const prefersReducedRef = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useFrame(({ clock }) => {
    if (!planeRef.current) return
    const mat = planeRef.current.material as THREE.MeshBasicMaterial
    if (prefersReducedRef.current) {
      mat.opacity = 0.18
      lightRef.current.intensity = 2.0
      return
    }
    // Breathing pulse: period ~3.5 s, amplitude 0.6 to 1.0
    const pulse = 0.6 + Math.sin(clock.elapsedTime * 1.795) * 0.2
    mat.opacity = pulse * 0.28
    lightRef.current.intensity = pulse * 2.5
  })

  return (
    <group position={[0, 1.5, -9.1]}>
      {/* Point light slightly behind door illuminates frame edges with warm amber */}
      <pointLight ref={lightRef} color="#FFB800" intensity={2.0} distance={6} decay={0} />
      {/* Softbox plane — larger than door frame, additive blended, depth-test off */}
      <mesh ref={planeRef}>
        <planeGeometry args={[5.5, 4.5]} />
        <meshBasicMaterial
          color="#FFB800"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          fog={false}
        />
      </mesh>
    </group>
  )
}

// ─── Canvas export ────────────────────────────────────────────────────────────

export default function HallwayScene({ progress }: { progress: SceneProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 8], fov: 70 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#050508' }}
    >
      {/* Fog matches canvas background for seamless depth */}
      <fog attach="fog" args={['#050508', 6, 26]} />
      <ambientLight intensity={0.06} color="#080814" />

      <CameraController progress={progress} />
      <Hallway />
      <Door progress={progress} />
      <FloatingParticles />
      <AmberHalo />
    </Canvas>
  )
}
