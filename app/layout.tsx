import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://awakening-blog.com'),
  title: {
    default: 'Awakening Blog',
    template: '%s | Awakening Blog'
  },
  description: 'A beautiful MDX blog template with shadcn/ui components. Install with one command.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Awakening Blog',
    description: 'A beautiful MDX blog template with shadcn/ui components. Install with one command.',
    siteName: 'Awakening Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awakening Blog',
    description: 'A beautiful MDX blog template with shadcn/ui components. Install with one command.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SiteHeader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
