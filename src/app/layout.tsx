import "@/app/globals.css";
import arrownext from '@/app/mobile-arrow-next.svg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Belle Meade Village',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <meta property="og:title" content="Your Site Title" />
          <meta property="og:description" content="A short description of your site." />
          <meta property="og:image" content="https://cdn.sanity.io/images/9mpasezg/development/31fa72394fecc841ddbea9cfc0f551f88cdbc1b6-1200x630.jpg" />
          <meta property="og:url" content="https://example.com/" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Your Site Title" />
          <meta name="twitter:description" content="A short description of your site." />
          <meta name="twitter:image" content="https://cdn.sanity.io/images/9mpasezg/development/31fa72394fecc841ddbea9cfc0f551f88cdbc1b6-1200x630.jpg" />
      </head>
      <body>
        {children}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jquery-nice-select@1.1.0/css/nice-select.css" />
      </body>
    </html>
  );
}
