import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'MDX Blog',
    template: '%s | MDX Blog'
  },
  description: 'A beautiful MDX blog with shadcn/ui components.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'MDX Blog',
    description: 'A beautiful MDX blog with shadcn/ui components.',
    siteName: 'MDX Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MDX Blog',
    description: 'A beautiful MDX blog with shadcn/ui components.',
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
