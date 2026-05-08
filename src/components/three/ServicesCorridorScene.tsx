'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { ServiceEntry } from '@/data/site'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CorridorProgress {
  value: number
}

// ─── Door layout ──────────────────────────────────────────────────────────────

const DOOR_CONFIGS = [
  { z: -5,  side: 'left'  },
  { z: -11, side: 'right' },
  { z: -17, side: 'left'  },
  { z: -23, side: 'right' },
  { z: -29, side: 'left'  },
  { z: -35, side: 'right' },
  { z: -41, side: 'left'  },
  { z: -47, side: 'right' },
  { z: -53, side: 'left'  },
] as const

const WALL_X     = 2.025
const PANEL_W    = 1.3    // door width along Z
const PANEL_H    = 1.35   // each half height (total door = 2.7)
const PANEL_D    = 0.07   // door depth (into wall)
const CENTER_Y   = 1.5
const TOP_Y_CL   = CENTER_Y + PANEL_H / 2   // 2.175 closed
const BOT_Y_CL   = CENTER_Y - PANEL_H / 2   // 0.825 closed
const TOP_Y_OP   = 4.3                        // open (slid up past ceiling)
const BOT_Y_OP   = -1.4                       // open (slid down past floor)

// ─── Camera ───────────────────────────────────────────────────────────────────

function CameraController({ progress }: { progress: CorridorProgress }) {
  const { camera } = useThree()

  useFrame(() => {
    const p = progress.value
    const t = p * p * (3 - 2 * p) // smoothstep
    const z = THREE.MathUtils.lerp(8, -58, t)
    camera.position.set(0, 1.5, z)
    camera.lookAt(0, 1.5, z - 12)
  })

  return null
}

// ─── Corridor geometry ────────────────────────────────────────────────────────

function CorridorShell() {
  const ceilLightZ = [-3, -8, -14, -20, -26, -32, -38, -44, -50, -56]

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.025, -28]}>
        <boxGeometry args={[4, 0.05, 64]} />
        <meshStandardMaterial color="#0D0D0D" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3.025, -28]}>
        <boxGeometry args={[4, 0.05, 64]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-WALL_X, 1.5, -28]}>
        <boxGeometry args={[0.05, 3, 64]} />
        <meshStandardMaterial color="#0C0C0C" roughness={0.85} />
      </mesh>

      {/* Right wall */}
      <mesh position={[WALL_X, 1.5, -28]}>
        <boxGeometry args={[0.05, 3, 64]} />
        <meshStandardMaterial color="#0C0C0C" roughness={0.85} />
      </mesh>

      {/* Far end wall */}
      <mesh position={[0, 1.5, -60]}>
        <boxGeometry args={[4, 3, 0.05]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} />
      </mesh>

      {/* Ceiling point lights */}
      {ceilLightZ.map((z, i) => (
        <pointLight
          key={i}
          position={[0, 2.8, z]}
          color="#FFE4B0"
          intensity={0.35}
          distance={7}
          decay={0}
        />
      ))}

      {/* Emissive floor glow strips */}
      {ceilLightZ.map((z, i) => (
        <mesh key={`gs-${i}`} position={[0, 0.001, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.06, 0.6]} />
          <meshBasicMaterial color="#FFE4B0" transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  )
}

// ─── Single service door ───────────────────────────────────────────────────────

interface ServiceDoorProps {
  index: number
  doorZ: number
  side: 'left' | 'right'
  isOpen: boolean
  onDoorClick: (index: number) => void
  service: ServiceEntry
}

function ServiceDoor({ index, doorZ, side, isOpen, onDoorClick, service }: ServiceDoorProps) {
  const topRef   = useRef<THREE.Mesh>(null!)
  const botRef   = useRef<THREE.Mesh>(null!)
  const cyanRef  = useRef<THREE.PointLight>(null!)
  const warmRef  = useRef<THREE.PointLight>(null!)
  const prog     = useRef(0)
  const target   = useRef(0)

  // Wall and panel X positions
  const panelX   = side === 'left' ? -WALL_X + PANEL_D / 2 + 0.01 : WALL_X - PANEL_D / 2 - 0.01
  const labelX   = side === 'left' ? -1.4 : 1.4
  const glowSide = side === 'left' ? -1.3 : 1.3

  useEffect(() => {
    target.current = isOpen ? 1 : 0
  }, [isOpen])

  useFrame((_, delta) => {
    prog.current = THREE.MathUtils.lerp(prog.current, target.current, Math.min(delta * 4.5, 1))
    const p = prog.current

    topRef.current.position.y  = THREE.MathUtils.lerp(TOP_Y_CL, TOP_Y_OP, p)
    botRef.current.position.y  = THREE.MathUtils.lerp(BOT_Y_CL, BOT_Y_OP, p)
    cyanRef.current.intensity  = THREE.MathUtils.lerp(1.2, 0, p)
    warmRef.current.intensity  = THREE.MathUtils.lerp(0, 4.5, p)
  })

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    onDoorClick(index)
  }

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto'
  }

  const frameMat = { color: '#111111', roughness: 0.5, metalness: 0.55 } as const
  const panelMat = {
    color: '#131313',
    roughness: 0.55,
    metalness: 0.45,
    emissive: '#001515' as THREE.ColorRepresentation,
    emissiveIntensity: 0.4,
  } as const

  return (
    <group position={[0, 0, doorZ]}>
      {/* ── Door frame ─────────────────────────────────────────── */}
      {/* Top crossbar */}
      <mesh position={[panelX, 2.88, 0]}>
        <boxGeometry args={[0.04, 0.08, PANEL_W + 0.22]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* Bottom crossbar */}
      <mesh position={[panelX, 0.12, 0]}>
        <boxGeometry args={[0.04, 0.08, PANEL_W + 0.22]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* Forward vertical */}
      <mesh position={[panelX, CENTER_Y, -(PANEL_W / 2 + 0.06)]}>
        <boxGeometry args={[0.04, 2.84, 0.08]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* Back vertical */}
      <mesh position={[panelX, CENTER_Y, PANEL_W / 2 + 0.06]}>
        <boxGeometry args={[0.04, 2.84, 0.08]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* Cyan seam line (center gap between panels) */}
      <mesh position={[panelX + (side === 'left' ? 0.045 : -0.045), CENTER_Y, 0]}>
        <boxGeometry args={[0.012, 2.7, PANEL_W - 0.02]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.55} />
      </mesh>

      {/* ── Door panels ────────────────────────────────────────── */}
      {/* Top half slides up when open */}
      <mesh
        ref={topRef}
        position={[panelX, TOP_Y_CL, 0]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[PANEL_D, PANEL_H, PANEL_W]} />
        <meshStandardMaterial {...panelMat} />
      </mesh>

      {/* Bottom half slides down when open */}
      <mesh
        ref={botRef}
        position={[panelX, BOT_Y_CL, 0]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[PANEL_D, PANEL_H, PANEL_W]} />
        <meshStandardMaterial {...panelMat} />
      </mesh>

      {/* Invisible enlarged click area — extends into corridor to cover label */}
      <mesh
        position={[side === 'left' ? -1.5 : 1.5, CENTER_Y, 0]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[1.2, 3.0, PANEL_W + 0.6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* ── Lights ─────────────────────────────────────────────── */}
      {/* Cyan atmosphere (dims when open) */}
      <pointLight
        ref={cyanRef}
        position={[glowSide, 1.5, 0]}
        color="#00F0FF"
        intensity={1.2}
        distance={5}
        decay={0}
      />

      {/* Warm reveal light (fades in when open) */}
      <pointLight
        ref={warmRef}
        position={[side === 'left' ? -2.6 : 2.6, 1.8, 0]}
        color="#FFF0D0"
        intensity={0}
        distance={9}
        decay={0}
      />

      {/* ── Service name label ──────────────────────────────────── */}
      <Html position={[labelX, 1.5, 0]} center distanceFactor={11}>
        <div
          style={{
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span
            style={{
              color: 'rgba(0,240,255,0.45)',
              fontFamily: 'monospace',
              fontSize: 10,
              letterSpacing: '0.3em',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            style={{
              color: '#00F0FF',
              fontFamily: 'monospace',
              fontSize: 13,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textShadow: '0 0 14px rgba(0,240,255,0.85)',
              whiteSpace: 'nowrap',
            }}
          >
            {service.title}
          </span>
          {service.subtitle && (
            <span
              style={{
                color: 'rgba(0,240,255,0.35)',
                fontFamily: 'monospace',
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {service.subtitle}
            </span>
          )}
        </div>
      </Html>
    </group>
  )
}

// ─── Floating dust ────────────────────────────────────────────────────────────

function DustParticles() {
  const count = 140

  const system = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 3.6
      pos[i * 3 + 1] = Math.random() * 3
      pos[i * 3 + 2] = -(Math.random() * 60)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.014,
      color: '#00F0FF',
      transparent: true,
      opacity: 0.18,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    return new THREE.Points(geo, mat)
  }, [])

  const vel = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 0.0012,
        y: (Math.random() - 0.5) * 0.0007,
      })),
    []
  )

  useFrame(() => {
    const attr = system.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr  = attr.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += vel[i].x
      arr[i * 3 + 1] += vel[i].y
      if (arr[i * 3] >  1.8) arr[i * 3] = -1.8
      if (arr[i * 3] < -1.8) arr[i * 3] =  1.8
      if (arr[i * 3 + 1] > 3) arr[i * 3 + 1] = 0
      if (arr[i * 3 + 1] < 0) arr[i * 3 + 1] = 3
    }
    attr.needsUpdate = true
  })

  return <primitive object={system} />
}

// ─── Canvas export ────────────────────────────────────────────────────────────

export interface ServicesCorridorSceneProps {
  progress: CorridorProgress
  activeDoor: number | null
  onDoorClick: (index: number) => void
  services: ServiceEntry[]
}

export default function ServicesCorridorScene({
  progress,
  activeDoor,
  onDoorClick,
  services,
}: ServicesCorridorSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 8], fov: 70 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#050508' }}
    >
      <fog attach="fog" args={['#050508', 10, 45]} />
      <ambientLight intensity={0.06} color="#080814" />

      <CameraController progress={progress} />
      <CorridorShell />
      <DustParticles />

      {DOOR_CONFIGS.map((cfg, i) => (
        <ServiceDoor
          key={i}
          index={i}
          doorZ={cfg.z}
          side={cfg.side}
          isOpen={activeDoor === i}
          onDoorClick={onDoorClick}
          service={services[i]}
        />
      ))}
    </Canvas>
  )
}
