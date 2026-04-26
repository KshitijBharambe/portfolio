// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import { ScrollProvider } from "@/context/ScrollContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kshitij Pritish Bharambe | Portfolio",
  description: "Backend software engineering, AI systems, distributed systems, and cloud-native projects",
  manifest: "/favicon/manifest.json",
  icons: {
    icon: [
      {
        url: "/favicon/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
        theme-transition text-theme-primary`}
      >
        <ThemeProvider>
          <ScrollProvider>
            <Layout>
              {children}
            </Layout>
          </ScrollProvider>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
