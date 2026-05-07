import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Ijaz Ahmed — SEO Expert & Digital Growth Strategist',
    template: '%s | Ijaz Ahmed',
  },
  description:
    'SEO Manager at Trickle Up with 4+ years of experience. Scaled Mydecorya.com to 500K+ monthly organic visits. Expert in Technical SEO, Local SEO, AEO, GEO & AI Optimization.',
  keywords: [
    'SEO Expert',
    'SEO Manager',
    'Technical SEO',
    'Local SEO',
    'Content Marketing',
    'AEO',
    'GEO',
    'AI Optimization',
    'Ijaz Ahmed',
    'SEO Pakistan',
  ],
  authors: [{ name: 'Ijaz Ahmed', url: 'https://ijazahmed.com' }],
  creator: 'Ijaz Ahmed',
  metadataBase: new URL('https://ijazahmed.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ijazahmed.com',
    siteName: 'Ijaz Ahmed',
    title: 'Ijaz Ahmed — SEO Expert & Digital Growth Strategist',
    description: 'SEO expert who builds the websites he ranks.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ijaz Ahmed — SEO Expert',
    description: 'SEO expert who builds the websites he ranks.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-matte-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
