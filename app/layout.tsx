import type { Metadata } from 'next';
import { openSans, sora } from '../lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Thomas Alberola - Senior Frontend React Developer',
    template: '%s | NeedACoffee',
  },
  description:
    'Senior Frontend React Developer with over 8 years experience in fintech, SaaS, and creator economy. Expert in design systems, performance, and scalable architecture.',
  keywords: [
    'React',
    'Next.js',
    'TypeScript',
    'Frontend',
    'Developer',
    'Design Systems',
    'Performance',
  ],
  authors: [{ name: 'Thomas Alberola' }],
  creator: 'Thomas Alberola',
  publisher: 'Thomas Alberola',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cv.needacoffee.fr'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://cv.needacoffee.fr',
    title: 'Thomas Alberola - Senior Frontend React Developer',
    description:
      'Senior Frontend React Developer with over 8 years experience in fintech, SaaS, and creator economy.',
    siteName: 'NeedACoffee',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Thomas Alberola - Senior Frontend React Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thomas Alberola - Senior Frontend React Developer',
    description:
      'Senior Frontend React Developer with over 8 years experience in fintech, SaaS, and creator economy.',
    images: ['/og-image.jpg'],
    creator: '@shug0',
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
  category: 'technology',
  classification: 'Portfolio',
  other: {
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'NeedACoffee',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${openSans.variable} ${sora.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
