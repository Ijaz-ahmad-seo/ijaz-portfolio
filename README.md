# Ijaz Ahmed — Portfolio

**Coming soon:** [ijazahmed.com](https://ijazahmed.com)

An immersive 3D "Office of Ideas" portfolio for **Ijaz Ahmed**, SEO Expert & Digital Growth Strategist. Visitors scroll through a cinematic dark hallway and enter rooms — each room is a section of the site. Designed for Awwwards-level polish: think Tony Stark's office designed by Apple.

---

## Sections

| # | Room | What's Inside |
|---|------|---------------|
| 1 | **Entry Hallway** | Hero — animated name reveal + door opening |
| 2 | **Reception** | About + animated stats: 500K visits, 4+ years, 15+ projects |
| 3 | **Services Corridor** | 9 doors: On-Page SEO, Off-Page SEO, Local SEO, Technical SEO, Content Marketing, AEO, GEO, AIO, WordPress Dev |
| 4 | **Trophy Room** | Case studies: Mydecorya, The Care Pharmacy, Batley Pharmacy, Exeter Diesels, Hope Welfare Trust |
| 5 | **Built By Me Gallery** | 7 live websites built from scratch |
| 6 | **Certifications Wall** | SEMrush, SEMrush × Brian Dean, Google Analytics |
| 7 | **Tools Section** | SEMrush, Ahrefs, Screaming Frog, Moz, GSC, GA, Keyword Planner |
| 8 | **Meeting Room** | Contact form + LinkedIn + email + phone |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 — App Router + TypeScript + Turbopack |
| Styling | Tailwind CSS v4 — CSS-first config with custom design tokens |
| 3D | React Three Fiber + @react-three/drei |
| Scroll animation | GSAP + ScrollTrigger |
| UI animation | Framer Motion |
| Smooth scroll | Lenis |
| Deployment | Vercel |

---

## Design System

| Token | Value | Used for |
|-------|-------|---------|
| `matte-black` | `#0A0A0A` | Base background |
| `charcoal` | `#111111` | Card surfaces |
| `cyan-accent` | `#00F0FF` | Door glows, headlines, hover states |
| `amber-accent` | `#FFB800` | CTAs, key highlights |
| Font: Display | Geist Sans | Headings + body |
| Font: Mono | Geist Mono | Labels, stat numbers, code accents |

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages + metadata
│   ├── globals.css   # Tailwind v4 theme + base styles + animations
│   ├── layout.tsx    # Root layout with SEO metadata + fonts
│   └── page.tsx      # Homepage (placeholder → 3D hallway later)
├── components/
│   ├── ui/           # Reusable primitives (buttons, cards, badges)
│   ├── sections/     # Full-page sections (Reception, Services, etc.)
│   └── three/        # React Three Fiber 3D components
├── data/
│   └── site.ts       # All content: services, case studies, certs, contact
├── lib/
│   └── utils.ts      # cn() class merging utility
└── styles/
    └── animations.css # Cinematic CSS effects (vignette, scanlines)
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm run start
```

Configured for **Vercel** — push to `main` triggers automatic deployment.

---

## Contact

**Ijaz Ahmed** · [seowithejoo@gmail.com](mailto:seowithejoo@gmail.com) · +92-330-5929561
