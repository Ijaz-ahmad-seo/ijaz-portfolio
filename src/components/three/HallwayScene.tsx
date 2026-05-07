'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export interface SceneProgress {
  value: number
}

// ─── Camera ──────────────────────────────────────────────────────────────────
// Glides from z=8 (entrance) toward z=-6 (just before the door at z=-9)
// over the first 60 % of scroll. Stays put while the door opens.

function CameraController({ progress }: { progress: SceneProgress }) {
  const { camera } = useThree()

  useFrame(() => {
    const p = progress.value
    const t = Math.min(p / 0.6, 1)
    // Smoothstep for cinematic ease
    const s = t * t * (3 - 2 * t)
    camera.position.set(0, 1.5, THREE.MathUtils.lerp(8, -6, s))
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
    </Canvas>
  )
}
