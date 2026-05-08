'use client'

import { useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Room geometry ─────────────────────────────────────────────────────────────

function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[14, 18]} />
        <meshStandardMaterial color="#090909" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[14, 18]} />
        <meshStandardMaterial color="#060606" roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2, -9]}>
        <planeGeometry args={[14, 4]} />
        <meshStandardMaterial color="#070707" roughness={0.95} />
      </mesh>

      {/*
        Light beam — open cone, tip at ceiling (y=4), base at floor (y=0).
        ConeGeometry default: tip at +y, base at -y.
        Positioned at [0.6, 2, -3] so center is between floor and ceiling.
        Additive blending keeps it purely additive glow, not blocking the background.
      */}
      <mesh position={[0.6, 2, -3]}>
        <coneGeometry args={[0.85, 4, 14, 1, true]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.045}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cyan point light at top of beam (ceiling origin) */}
      <pointLight
        position={[0.6, 3.9, -3]}
        color="#00F0FF"
        intensity={1.8}
        distance={11}
        decay={0}
      />

      {/* Secondary warm ambient fill — subtle, slightly off-center */}
      <pointLight
        position={[-3.5, 2.5, 1.5]}
        color="#FFE4B0"
        intensity={0.12}
        distance={9}
        decay={0}
      />
    </group>
  )
}

// ── Dust particles ────────────────────────────────────────────────────────────

function DustParticles() {
  const count = 72

  // Build THREE.Points imperatively — avoids JSX bufferAttribute version differences
  const system = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10   // x: ±5
      positions[i * 3 + 1] = Math.random() * 4             // y: 0–4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8    // z: ±4
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.016,
      color: '#00F0FF',
      transparent: true,
      opacity: 0.22,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return new THREE.Points(geo, mat)
  }, [])

  // Per-particle drift velocities (constant, never recreated)
  const velocities = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 0.0014,
        y: (Math.random() - 0.5) * 0.0007,
      })),
    []
  )

  useFrame(() => {
    const attr = system.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += velocities[i].x
      arr[i * 3 + 1] += velocities[i].y
      // Wrap boundaries
      if (arr[i * 3] > 5)    arr[i * 3] = -5
      if (arr[i * 3] < -5)   arr[i * 3] = 5
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = 0
      if (arr[i * 3 + 1] < 0) arr[i * 3 + 1] = 4
    }
    attr.needsUpdate = true
  })

  return <primitive object={system} />
}

// ── Canvas export ─────────────────────────────────────────────────────────────

export default function ReceptionScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.8, 7], fov: 58 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
      frameloop="always"
    >
      <ambientLight intensity={0.04} color="#080814" />
      <Room />
      <DustParticles />
    </Canvas>
  )
}
