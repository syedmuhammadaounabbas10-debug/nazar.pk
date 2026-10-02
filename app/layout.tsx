import { Metadata } from 'next';
import "./globals.css";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
