import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { Inter, Playfair_Display, Roboto_Condensed } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-condensed' });

export const metadata: Metadata = {
  metadataBase: new URL('https://kordinate.world'),
  title: {
    default: 'Kordinate News – Global Travel News & Tourism Updates',
    template: '%s | Kordinate News',
  },
  description: 'Breaking travel news, tourism updates, airline news, hotel news, cruise news, and destination guides. Your trusted global travel news source.',
  keywords: ['travel news', 'tourism news', 'airline news', 'hotel news', 'cruise news', 'destination news', 'travel deals', 'travel alerts'],
  authors: [{ name: 'Kordinate News Editorial Team' }],
  creator: 'Kordinate News',
  publisher: 'Kordinate News',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kordinate.world',
    siteName: 'Kordinate News',
    title: 'Kordinate News – Global Travel News & Tourism Updates',
    description: 'Breaking travel news, tourism updates, airline news, hotel news, cruise news, and destination guides.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kordinate News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rinovative007',
    creator: '@rinovative007',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://kordinate.world',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/icon.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#CC0000" />
        <meta name="googlebot-news" content="index, follow" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1044498378918575"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics 4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0B19BPL6B9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0B19BPL6B9');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${robotoCondensed.variable}`}>
        <a href="#main-content" className="sr-only" style={{ position: 'absolute', top: 8, left: 8, zIndex: 9999, padding: '8px 16px', background: 'var(--color-primary)', color: 'white', borderRadius: 4, fontWeight: 600 }}>

          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="page-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
