import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { createClient } from "@/utils/supabase/server";
import { UserProvider } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://zenpersonal.app'),
  title: {
    default: 'Science-Backed Generative Meditation | ZenPersonal',
    template: '%s | ZenPersonal'
  },
  description: 'Optimize your brain. ZenPersonal is a tool that generates unique science-backed meditations in real time.',
  keywords: ['yoga nidra', 'guided meditation', 'nsdr', 'personalized meditation', 'mindfulness'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zenpersonal.app/ZenPersonal-global-og-image.png',
    title: 'Science-Backed Generative Meditation | ZenPersonal',
    description: 'Optimize your brain. ZenPersonal is a tool that generates unique science-backed meditations in real time.',
    siteName: 'ZenPersonal',
    images: [
      {
        url: "https://zenpersonal.app/ZenPersonal-global-og-image.png",
        width: 1200,
        height: 630,
        alt: "The text 'Every mind seeks peace differently - generate what works for you' with the ZenPersonal logo on black background",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Science-Backed Generative Meditation | ZenPersonal',
    description: 'Optimize your brain. ZenPersonal is a tool that generates unique science-backed meditations in real time.',
    images: ['https://zenpersonal.app/ZenPersonal-global-og-image.png'],
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🔑 await here so supabase is not a Promise
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta name="twitter:url" content="https://zenpersonal.app/" />
      <meta name="twitter:image" content="https://zenpersonal.app/ZenPersonal-global-og-image.png" />
        <script
          async
          src="https://cdn.seline.so/seline.js"
          data-token="6d48cee6fca0501"
        />
      </head>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <UserProvider user={user}>
            <Navbar />
            {children}
            <Analytics />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}