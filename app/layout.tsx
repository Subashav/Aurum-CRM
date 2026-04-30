import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Aurum CRM',
  description: 'Enterprise lead management and revenue operations dashboard.',
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} theme-dark`}>
      <body>
        <Toaster theme="dark" position="top-right" />
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}