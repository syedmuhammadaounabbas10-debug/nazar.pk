import { Metadata, Viewport } from 'next';
import "./globals.css";
import WhatsAppFab from '@/components/WhatsAppFab';
import MotionProvider from '@/components/motion/MotionProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F4EBE1',
};

export const metadata: Metadata = {
  title: 'Nazar.pk — Premium Eyewear & Sunglasses in Pakistan',
  description: 'Shop premium frames and sunglasses from Nazar.pk. Thoughtfully selected eyewear designed for everyday clarity, comfort, and style. Cash on Delivery across Pakistan.',
  metadataBase: new URL('https://nazar.pk'),
  openGraph: {
    title: 'Nazar.pk — Premium Eyewear',
    description: 'Premium eyewear designed for everyday clarity, comfort, and style.',
    url: 'https://nazar.pk',
    siteName: 'Nazar.pk',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nazar.pk — Premium Eyewear',
    description: 'Premium eyewear designed for everyday clarity, comfort, and style.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nazar.pk',
    url: 'https://nazar.pk',
    logo: 'https://nazar.pk/logo.png',
    sameAs: [
      'https://www.instagram.com/nazar.pk.offical',
      'https://www.tiktok.com/@nazar.pk.offical'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+923245908220',
      contactType: 'customer service',
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Google Fonts preconnect + stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* No-JS fallback: motion elements ship their hidden state in the SSR
            HTML, so force them back to their final readable state when
            JavaScript is unavailable. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        {/* Global animation preferences (respects prefers-reduced-motion) */}
        <MotionProvider>
          {children}
          <WhatsAppFab />
        </MotionProvider>
      </body>
    </html>
  );
}
