'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contact } from '@/data/site'

// ─── Icons ────────────────────────────────────────────────────────────────────

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#00F0FF" strokeWidth="1.5" />
      <path d="M2 7l10 7 10-7" stroke="#00F0FF" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill="#00F0FF"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#00F0FF" />
      <rect x="5.5" y="9.5" width="2.5" height="8" fill="#0A0A0A" />
      <circle cx="6.75" cy="6.75" r="1.4" fill="#0A0A0A" />
      <path
        d="M11 9.5h2.5v1.3c.55-.9 1.6-1.5 2.8-1.3 2.1.3 2.7 1.7 2.7 3.5V17.5h-2.5v-4.2c0-.9-.3-2.1-1.5-2.1-1.2 0-2 .9-2 2.1v4.2H11V9.5z"
        fill="#0A0A0A"
      />
    </svg>
  )
}

// ─── ContactForm ──────────────────────────────────────────────────────────────

type FormErrors = { name?: string; email?: string }

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [focused, setFocused] = useState<string | null>(null)

  function validate(): boolean {
    const next: FormErrors = {}
    if (!name.trim()) next.name = 'Name is required'
    if (!email.trim()) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const subject = `Portfolio Inquiry from ${name.trim()}`
    const body = message.trim()
      ? `${message.trim()}\n\nFrom: ${name.trim()} (${email.trim()})`
      : `Hi Ijaz,\n\nFrom: ${name.trim()} (${email.trim()})`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  function borderColor(field: string, hasError?: boolean): string {
    if (focused === field) return 'rgba(0,240,255,0.65)'
    if (hasError) return 'rgba(0,240,255,0.45)'
    return 'rgba(0,240,255,0.20)'
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-5">

        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-[10px] uppercase tracking-[0.18em] mb-1.5"
            style={{ color: 'rgba(0,240,255,0.70)' }}
          >
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })) }}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            autoComplete="name"
            className="w-full font-sans text-sm text-white rounded-[4px] px-3.5 py-2.5 outline-none transition-colors duration-200"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: `1px solid ${borderColor('name', !!errors.name)}`,
            }}
          />
          {errors.name && (
            <p className="mt-1 font-mono text-[11px]" style={{ color: 'rgba(0,240,255,0.75)' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-[10px] uppercase tracking-[0.18em] mb-1.5"
            style={{ color: 'rgba(0,240,255,0.70)' }}
          >
            Your Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })) }}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            autoComplete="email"
            className="w-full font-sans text-sm text-white rounded-[4px] px-3.5 py-2.5 outline-none transition-colors duration-200"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: `1px solid ${borderColor('email', !!errors.email)}`,
            }}
          />
          {errors.email && (
            <p className="mt-1 font-mono text-[11px]" style={{ color: 'rgba(0,240,255,0.75)' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono text-[10px] uppercase tracking-[0.18em] mb-1.5"
            style={{ color: 'rgba(0,240,255,0.70)' }}
          >
            What's on your mind?
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            className="w-full font-sans text-sm text-white rounded-[4px] px-3.5 py-2.5 outline-none transition-colors duration-200 resize-y"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: `1px solid ${borderColor('message')}`,
              minHeight: '100px',
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full font-sans font-bold text-sm tracking-wide py-3 px-6 rounded-[4px] transition-opacity duration-200 hover:opacity-90 cursor-pointer border-0"
          style={{ backgroundColor: '#FFB800', color: '#0A0A0A' }}
        >
          Send Message
        </button>

      </div>
    </form>
  )
}

// ─── ContactInfoCard ──────────────────────────────────────────────────────────

function ContactInfoCard() {
  const rows = [
    {
      Icon: MailIcon,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
    },
    {
      Icon: PhoneIcon,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[\s-]/g, '')}`,
      external: false,
    },
    {
      Icon: LinkedInIcon,
      label: 'LinkedIn',
      value: contact.linkedin,
      href: contact.linkedinUrl,
      external: true,
    },
  ]

  return (
    <div className="flex flex-col">
      {rows.map(({ Icon, label, value, href, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="flex items-start gap-4 p-3 rounded-[4px] no-underline"
          style={{ transition: 'background-color 0.2s' }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(0,240,255,0.05)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
          }}
        >
          <div className="mt-0.5 shrink-0">
            <Icon />
          </div>
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] mb-0.5"
              style={{ color: 'rgba(0,240,255,0.60)' }}
            >
              {label}
            </p>
            <p className="font-sans font-medium text-white" style={{ fontSize: '0.95rem' }}>
              {value}
            </p>
          </div>
        </a>
      ))}

      <p
        className="font-sans mt-5 pt-5 text-sm leading-relaxed"
        style={{
          color: 'rgba(255,255,255,0.30)',
          borderTop: '1px solid rgba(0,240,255,0.08)',
        }}
      >
        Open to on-site, remote, hybrid, and part-time work.
      </p>
    </div>
  )
}

// ─── MeetingRoom ──────────────────────────────────────────────────────────────

export default function MeetingRoom() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const colRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const cols = colRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!cols.length || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cols,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
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

  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(145deg, #141414 0%, #0d0d0d 60%, #111111 100%)',
    border: '1px solid rgba(0,240,255,0.18)',
    borderRadius: '6px',
    padding: '2rem',
    boxShadow: 'inset 0 0 24px rgba(0,240,255,0.03)',
    height: '100%',
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#0A0A0A',
        minHeight: '100vh',
        paddingTop: '7rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Ambient room light rising from bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 80% 55% at 50% 105%, rgba(255,184,0,0.07) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 45% at 50% 105%, rgba(0,240,255,0.04) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 30% at 20% 90%, rgba(0,240,255,0.025) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 30% at 80% 90%, rgba(255,184,0,0.02) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      {/* Film grain */}
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
            09 / Contact
          </p>
          <h2
            id="contact-heading"
            className="font-sans font-bold leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '1rem' }}
          >
            Let's Talk
          </h2>
          <p
            className="max-w-md font-sans"
            style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem', lineHeight: '1.75' }}
          >
            Step inside the meeting room. I'm listening.
          </p>
        </motion.div>

        {/* Two-column grid: form left, info right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Form card */}
          <div
            ref={(el) => { colRefs.current[0] = el }}
            style={{ opacity: reduced ? 1 : 0 }}
          >
            <div style={cardStyle}>
              <ContactForm />
            </div>
          </div>

          {/* Info card */}
          <div
            ref={(el) => { colRefs.current[1] = el }}
            style={{ opacity: reduced ? 1 : 0 }}
          >
            <div style={cardStyle}>
              <ContactInfoCard />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
