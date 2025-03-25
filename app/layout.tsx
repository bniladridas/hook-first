import './globals.css';
import './prism-theme.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://synthara.ai'),
  title: 'Hook First | Synthara',
  description: 'Advanced AI-powered text analysis and inference generation system with multiple AI personalities',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'Hook First | Synthara',
    description: 'Advanced AI-powered text analysis with multiple personalities',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hook First | Synthara'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hook First | Synthara',
    description: 'Advanced AI-powered text analysis with multiple personalities',
    images: ['/twitter-image.png']
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="synthara-theme"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
