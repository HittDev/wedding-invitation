import type { Metadata } from 'next';
import { env } from '@/lib/env';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';
import '@/styles/globals.css';
import '@/styles/tokens.css';
import '@/styles/animations.css';

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'wedding invitation',
    'digital invitation',
    'RSVP',
    'wedding',
    'invitation',
  ],
  authors: [
    {
      name: 'Wedding Invitation Team',
    },
  ],
  creator: 'Wedding Invitation Team',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: env.app.url,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${env.app.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${env.app.url}/twitter-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FBF8F3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FBF8F3" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
