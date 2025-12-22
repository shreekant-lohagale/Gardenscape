import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/ui/preloader";
import { CustomCursor } from "@/components/ui/custom-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gardenscape.demo"),
  title: {
    default: "Gardenscape | Green Havens",
    template: "%s | Gardenscape"
  },
  description: "Transforming outdoor spaces into living sanctuaries. Expert landscaping, sustainable gardening, and modern design in Pune.",
  keywords: ["Landscaping", "Gardening", "Pune", "Sustainable Design", "Garden Maintenance", "Outdoor Living", "Plant Nursery"],
  authors: [{ name: "Gardenscape Team" }],
  creator: "Gardenscape",
  publisher: "Gardenscape",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Gardenscape | Green Havens",
    description: "Transform your outdoor space into a lush sanctuary. Professional landscaping and maintenance services.",
    url: "https://gardenscape.demo",
    siteName: "Gardenscape",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Gardenscape Hero Section Showcase"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gardenscape | Green Havens",
    description: "Transforming outdoor spaces into living sanctuaries.",
    creator: "@gardenscape",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Preloader />
          <div className="grain-overlay" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
