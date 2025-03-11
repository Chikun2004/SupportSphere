import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Logo from '@/components/logo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SupportSphere - Customer Support Platform',
  description: 'Modern customer support ticket management system',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        href: '/favicon.ico',
      },
    ],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    title: 'SupportSphere - Modern Customer Support Platform',
    description: 'Transform your customer support experience with our AI-powered platform',
    siteName: 'SupportSphere',
    url: 'https://supportsphere.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SupportSphere - Modern Customer Support Platform',
    description: 'Transform your customer support experience with our AI-powered platform',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="fixed top-0 left-0 p-4 z-50">
            <Logo />
          </header>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}